import { useEffect, useMemo, useRef, useState } from 'react';
import AuthGate from './components/AuthGate.jsx';
import MasterShell from './components/MasterShell.jsx';
import PlayerShell from './components/PlayerShell.jsx';
import {
  canEditInMode,
  filterModuleForMode,
  getDefaultRecordVisibility,
  getModeModules,
  MODES,
} from './engine/access.js';
import { CAPABILITIES, createBlankRecord, createEmptyDatabase, DB_STORAGE_KEY } from './engine/defaultDatabase.js';
import { appendEvent } from './engine/events.js';
import { can, getActiveRole, setActiveRole, setRoleCapability } from './engine/permissions.js';
import {
  createRemoteRealtimeClient,
  fetchRemoteDatabase,
  loginRemote,
  saveRemoteDatabase,
} from './engine/remoteClient.js';
import { createRealtimeClient, isRemoteDatabaseNewer } from './engine/realtime.js';
import { importDatabase, loadDatabase, saveDatabase } from './engine/storage.js';

const SESSION_STORAGE_KEY = 'rpg-campaign-platform-session';

export default function App() {
  const [database, setDatabase] = useState(loadDatabase);
  const [session, setSession] = useState(() => loadSession());
  const [activeTab, setActiveTab] = useState('dashboard');
  const realtimeRef = useRef(null);
  const remoteRealtimeRef = useRef(null);
  const clientId = useMemo(() => crypto.randomUUID(), []);

  const mode = session?.mode ?? null;
  const activeRole = mode === MODES.player
    ? database.permissions.roles.find((role) => role.id === 'player')
    : getActiveRole(database);
  const effectiveMode = mode ?? MODES.master;
  const modules = useMemo(() => getModeModules(database, effectiveMode), [database, effectiveMode]);
  const activeModule = modules.find((moduleState) => moduleState.id === activeTab) ?? null;
  const activeRecordId = activeModule
    ? database.settings.activeRecordIdByModule[activeModule.id]
    : null;
  const diceModule = filterModuleForMode(database.modules.dados, mode);

  useEffect(() => {
    realtimeRef.current = createRealtimeClient({
      clientId,
      onDatabase: (incomingDatabase) => {
        setDatabase((current) => {
          if (!isRemoteDatabaseNewer(current, incomingDatabase)) return current;
          localStorage.setItem(DB_STORAGE_KEY, JSON.stringify(incomingDatabase));
          return incomingDatabase;
        });
      },
    });

    return () => realtimeRef.current?.close();
  }, [clientId]);

  useEffect(() => {
    if (!session?.token) return undefined;

    fetchRemoteDatabase(session.token)
      .then((remoteDatabase) => {
        const saved = saveDatabase(remoteDatabase);
        setDatabase(saved);
      })
      .catch(() => {
        // Local development fallback keeps the app usable without the backend.
      });

    remoteRealtimeRef.current?.close();
    remoteRealtimeRef.current = createRemoteRealtimeClient({
      token: session.token,
      onDatabase: (incomingDatabase) => {
        setDatabase((current) => {
          if (!isRemoteDatabaseNewer(current, incomingDatabase)) return current;
          const saved = saveDatabase(incomingDatabase);
          return saved;
        });
      },
    });

    return () => remoteRealtimeRef.current?.close();
  }, [session?.token]);

  const commit = (updater, event) => {
    setDatabase((current) => {
      const updated = typeof updater === 'function' ? updater(current) : updater;
      const withEvent = event ? appendEvent(updated, event) : updated;
      const saved = saveDatabase(withEvent);
      realtimeRef.current?.publish(saved);
      if (session?.token) {
        void saveRemoteDatabase(saved, session.token).catch(() => {
          // Keep local state; backend availability is surfaced by deployment checks.
        });
      }
      return saved;
    });
  };

  const setMode = async (nextMode, secret, access) => {
    let nextSession;

    try {
      const login = await loginRemote(nextMode, secret);
      nextSession = {
        mode: login.mode,
        token: login.token,
        remote: true,
        loggedAt: new Date().toISOString(),
      };
      const remoteDatabase = await fetchRemoteDatabase(login.token);
      setDatabase(saveDatabase(remoteDatabase));
    } catch (remoteError) {
      if (remoteError.status && remoteError.status !== 404) {
        throw remoteError;
      }
      const expected = nextMode === MODES.master ? access.masterPin : access.playerCode;
      if (secret !== expected) {
        throw new Error(nextMode === MODES.master ? 'PIN do Mestre incorreto.' : 'Codigo de Jogador incorreto.');
      }
      nextSession = {
        mode: nextMode,
        remote: false,
        loggedAt: new Date().toISOString(),
      };
    }

    localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(nextSession));
    setSession(nextSession);
    setActiveTab('dashboard');
  };

  const logout = () => {
    localStorage.removeItem(SESSION_STORAGE_KEY);
    remoteRealtimeRef.current?.close();
    setSession(null);
    setActiveTab('dashboard');
  };

  const openModule = (moduleId) => {
    const isVisible = modules.some((moduleState) => moduleState.id === moduleId);
    if (!isVisible) return;

    commit((current) => ({
      ...current,
      settings: {
        ...current.settings,
        activeModuleId: moduleId,
      },
    }));
    setActiveTab(moduleId);
  };

  const createRecord = (moduleId) => {
    const moduleState = database.modules[moduleId];
    if (!moduleState || !canEditInMode(database, mode, moduleId)) return;

    const record = createBlankRecord(moduleState, {
      visibility: getDefaultRecordVisibility(mode),
      ownerMode: mode,
    });
    commit((current) => ({
      ...current,
      settings: {
        ...current.settings,
        activeRecordIdByModule: {
          ...current.settings.activeRecordIdByModule,
          [moduleId]: record.id,
        },
      },
      modules: {
        ...current.modules,
        [moduleId]: {
          ...current.modules[moduleId],
          records: [...current.modules[moduleId].records, record],
        },
      },
    }), {
      type: 'module',
      message: `Registro criado em ${moduleState.label}.`,
      payload: { moduleId, recordId: record.id, mode },
    });
  };

  const selectRecord = (moduleId, recordId) => {
    commit((current) => ({
      ...current,
      settings: {
        ...current.settings,
        activeRecordIdByModule: {
          ...current.settings.activeRecordIdByModule,
          [moduleId]: recordId,
        },
      },
    }));
  };

  const updateRecord = (moduleId, recordId, patch) => {
    const record = database.modules[moduleId]?.records.find((entry) => entry.id === recordId);
    if (!canEditInMode(database, mode, moduleId, record)) return;

    commit((current) => ({
      ...current,
      modules: {
        ...current.modules,
        [moduleId]: {
          ...current.modules[moduleId],
          records: current.modules[moduleId].records.map((record) => (
            record.id === recordId
              ? { ...record, ...patch, updatedAt: new Date().toISOString() }
              : record
          )),
        },
      },
    }), {
      type: 'module',
      message: `Registro atualizado em ${database.modules[moduleId].label}.`,
      payload: { moduleId, recordId, mode },
    });
  };

  const registerRoll = (roll) => {
    commit((current) => current, {
      type: 'dice',
      message: `Rolagem: ${roll.raw} ${formatModifier(roll.modifier)} = ${roll.total}.`,
      payload: { roll, mode },
    });
  };

  const sendTableMessage = (message) => {
    commit((current) => current, {
      type: 'tableMessage',
      message,
      payload: { senderMode: mode },
    });
  };

  const importJson = (json) => {
    const imported = importDatabase(json);
    commit(imported, { type: 'database', message: 'Banco importado.', payload: {} });
  };

  const resetDatabase = () => {
    commit(createEmptyDatabase(), { type: 'database', message: 'Banco reiniciado sem registros.', payload: {} });
  };

  const saveAccess = (access) => {
    commit((current) => ({
      ...current,
      settings: {
        ...current.settings,
        access,
      },
    }), {
      type: 'access',
      message: 'Credenciais locais da mesa atualizadas.',
      payload: {},
    });
  };

  if (!mode) {
    return (
      <AuthGate
        access={database.settings.access}
        onLogin={setMode}
      />
    );
  }

  const setRole = (roleId) => {
    commit((current) => setActiveRole(current, roleId), {
      type: 'permission',
      message: 'Papel ativo alterado.',
      payload: { roleId },
    });
  };

  const toggleCapability = (roleId, capability, enabled) => {
    commit((current) => setRoleCapability(current, roleId, capability, enabled), {
      type: 'permission',
      message: 'Permissao alterada.',
      payload: { roleId, capability, enabled },
    });
  };

  if (mode === MODES.player) {
    return (
      <PlayerShell
        database={database}
        modules={modules}
        activeTab={activeTab}
        activeModule={activeModule}
        activeRecordId={activeRecordId}
        diceModule={diceModule}
        canRollDice={can(database, CAPABILITIES.rollDice)}
        onLogout={logout}
        canCreateRecord={(moduleId) => canEditInMode(database, mode, moduleId)}
        canEditRecord={(moduleId) => {
          const record = database.modules[moduleId]?.records.find((entry) => entry.id === activeRecordId);
          return canEditInMode(database, mode, moduleId, record);
        }}
        onSetActiveTab={setActiveTab}
        onSetMode={setMode}
        onOpenModule={openModule}
        onCreateRecord={createRecord}
        onSelectRecord={selectRecord}
        onUpdateRecord={updateRecord}
        onRoll={registerRoll}
        onSendTableMessage={sendTableMessage}
      />
    );
  }

  return (
    <MasterShell
      database={database}
      modules={modules}
      activeTab={activeTab}
      activeModule={activeModule}
      activeRecordId={activeRecordId}
      diceModule={diceModule}
      activeRole={activeRole}
      canWriteDatabase={can(database, CAPABILITIES.writeDatabase)}
      canManageModules={can(database, CAPABILITIES.manageModules)}
      canManagePermissions={can(database, CAPABILITIES.managePermissions)}
      canRollDice={can(database, CAPABILITIES.rollDice)}
      onLogout={logout}
      onSetActiveTab={setActiveTab}
      onSetMode={setMode}
      onOpenModule={openModule}
      onCreateRecord={createRecord}
      onSelectRecord={selectRecord}
      onUpdateRecord={updateRecord}
      onRoll={registerRoll}
      onSendTableMessage={sendTableMessage}
      onSaveAccess={saveAccess}
      onImportJson={importJson}
      onResetDatabase={resetDatabase}
      onSetRole={setRole}
      onToggleCapability={toggleCapability}
    />
  );
}

function formatModifier(value) {
  return value >= 0 ? `+ ${value}` : `- ${Math.abs(value)}`;
}

function loadSession() {
  try {
    const stored = localStorage.getItem(SESSION_STORAGE_KEY);
    if (!stored) return null;
    const parsed = JSON.parse(stored);
    return parsed?.mode === MODES.master || parsed?.mode === MODES.player ? parsed : null;
  } catch {
    return null;
  }
}
