import AccessPanel from './AccessPanel.jsx';
import DatabasePanel from './DatabasePanel.jsx';
import DiceWorkbench from './DiceWorkbench.jsx';
import EventsPanel from './EventsPanel.jsx';
import Icon from './Icon.jsx';
import ModeSelector from './ModeSelector.jsx';
import ModuleDashboard from './ModuleDashboard.jsx';
import ModulePanel from './ModulePanel.jsx';
import PermissionsPanel from './PermissionsPanel.jsx';
import TableChannel from './TableChannel.jsx';

const masterTabs = [
  { id: 'dashboard', label: 'Painel Mestre', icon: 'dashboard' },
  { id: 'dice', label: 'Dados', icon: 'dados' },
  { id: 'events', label: 'Log', icon: 'events' },
  { id: 'access', label: 'Acesso', icon: 'permissions' },
  { id: 'permissions', label: 'Permissoes', icon: 'permissions' },
  { id: 'database', label: 'Banco', icon: 'database' },
];

export default function MasterShell({
  database,
  modules,
  activeTab,
  activeModule,
  activeRecordId,
  diceModule,
  activeRole,
  canWriteDatabase,
  canManageModules,
  canManagePermissions,
  canRollDice,
  onSetActiveTab,
  onSetMode,
  onOpenModule,
  onCreateRecord,
  onSelectRecord,
  onUpdateRecord,
  onRoll,
  onLogout,
  onSendTableMessage,
  onSaveAccess,
  onImportJson,
  onResetDatabase,
  onSetRole,
  onToggleCapability,
}) {
  return (
    <div className="app-shell mode-master">
      <nav className="sidebar">
        <div className="brand">
          <strong>Console do Mestre</strong>
          <span>Controle completo da mesa</span>
        </div>
        <ModeSelector activeMode="master" onModeChange={onSetMode} />
        <div className="role-badge">
          <span>Papel ativo</span>
          <strong>{activeRole?.label}</strong>
        </div>
        <button type="button" onClick={onLogout}>
          <Icon name="next" />
          Sair
        </button>
        {masterTabs.map((tab) => (
          <button
            className={activeTab === tab.id ? 'is-active' : ''}
            key={tab.id}
            type="button"
            onClick={() => onSetActiveTab(tab.id)}
          >
            <Icon name={tab.icon} />
            {tab.label}
          </button>
        ))}
        <div className="sidebar-divider">Controle do Mestre</div>
        {modules.map((moduleState) => (
          <button
            className={activeTab === moduleState.id ? 'is-active' : ''}
            key={moduleState.id}
            type="button"
            onClick={() => onOpenModule(moduleState.id)}
          >
            <Icon name={moduleState.icon} />
            {moduleState.label}
            <small>{moduleState.records.length}</small>
          </button>
        ))}
      </nav>

      <main className="workspace">
        <header className="topbar">
          <div>
            <p>Mestre humano controla campanha, informacoes ocultas e estado da mesa</p>
            <h1>{activeModule?.label ?? masterTabs.find((tab) => tab.id === activeTab)?.label}</h1>
          </div>
          <span className="status-dot">Tempo real local ativo</span>
        </header>

        {activeTab === 'dashboard' && <ModuleDashboard modules={modules} onOpenModule={onOpenModule} />}
        {activeTab === 'dashboard' && (
          <TableChannel events={database.events} mode="master" onSendMessage={onSendTableMessage} />
        )}
        {activeTab === 'dice' && <DiceWorkbench diceModule={diceModule} disabled={!canRollDice} onRoll={onRoll} />}
        {activeTab === 'events' && <EventsPanel events={database.events} />}
        {activeTab === 'access' && (
          <AccessPanel access={database.settings.access} onSave={onSaveAccess} />
        )}
        {activeTab === 'permissions' && (
          <PermissionsPanel
            permissions={database.permissions}
            disabled={!canManagePermissions}
            onSetRole={onSetRole}
            onToggleCapability={onToggleCapability}
          />
        )}
        {activeTab === 'database' && (
          <DatabasePanel
            database={database}
            disabled={!canWriteDatabase}
            onImport={onImportJson}
            onReset={onResetDatabase}
          />
        )}
        {activeModule && (
          <ModulePanel
            moduleState={activeModule}
            activeRecordId={activeRecordId}
            disabled={!canManageModules}
            mode="master"
            canReveal={canManageModules}
            canCreate={canManageModules}
            onCreateRecord={onCreateRecord}
            onSelectRecord={onSelectRecord}
            onUpdateRecord={onUpdateRecord}
          />
        )}
      </main>
    </div>
  );
}
