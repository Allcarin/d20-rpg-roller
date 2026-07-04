import DiceWorkbench from './DiceWorkbench.jsx';
import EventsPanel from './EventsPanel.jsx';
import Icon from './Icon.jsx';
import ModeSelector from './ModeSelector.jsx';
import ModuleDashboard from './ModuleDashboard.jsx';
import ModulePanel from './ModulePanel.jsx';
import TableChannel from './TableChannel.jsx';

const playerTabs = [
  { id: 'dashboard', label: 'Mesa', icon: 'dashboard' },
  { id: 'dice', label: 'Dados', icon: 'dados' },
  { id: 'events', label: 'Eventos', icon: 'events' },
];

export default function PlayerShell({
  database,
  modules,
  activeTab,
  activeModule,
  activeRecordId,
  diceModule,
  canRollDice,
  canCreateRecord,
  canEditRecord,
  onSetActiveTab,
  onSetMode,
  onOpenModule,
  onCreateRecord,
  onSelectRecord,
  onUpdateRecord,
  onRoll,
  onLogout,
  onSendTableMessage,
}) {
  return (
    <div className="app-shell mode-player">
      <nav className="sidebar">
        <div className="brand">
          <strong>Mesa do Jogador</strong>
          <span>Somente dados liberados</span>
        </div>
        <ModeSelector activeMode="player" onModeChange={onSetMode} />
        <button type="button" onClick={onLogout}>
          <Icon name="next" />
          Sair
        </button>
        {playerTabs.map((tab) => (
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
        <div className="sidebar-divider">Area do Jogador</div>
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
            <p>Jogador acessa fichas proprias e informacoes liberadas pelo Mestre</p>
            <h1>{activeModule?.label ?? playerTabs.find((tab) => tab.id === activeTab)?.label}</h1>
          </div>
          <span className="status-dot">Sincronizado com a mesa</span>
        </header>

        {activeTab === 'dashboard' && <ModuleDashboard modules={modules} onOpenModule={onOpenModule} />}
        {activeTab === 'dashboard' && (
          <TableChannel events={database.events} mode="player" onSendMessage={onSendTableMessage} />
        )}
        {activeTab === 'dice' && <DiceWorkbench diceModule={diceModule} disabled={!canRollDice} onRoll={onRoll} />}
        {activeTab === 'events' && <EventsPanel events={database.events} />}
        {activeModule && (
          <ModulePanel
            moduleState={activeModule}
            activeRecordId={activeRecordId}
            disabled={!canEditRecord(activeModule.id)}
            mode="player"
            canReveal={false}
            canCreate={canCreateRecord(activeModule.id)}
            onCreateRecord={onCreateRecord}
            onSelectRecord={onSelectRecord}
            onUpdateRecord={onUpdateRecord}
          />
        )}
      </main>
    </div>
  );
}
