import Icon from './Icon.jsx';

export default function ModuleDashboard({ modules, onOpenModule }) {
  return (
    <section className="dashboard-grid module-dashboard">
      {modules.map((moduleState) => (
        <button className="module-card" type="button" key={moduleState.id} onClick={() => onOpenModule(moduleState.id)}>
          <Icon name={moduleState.icon} />
          <span>{moduleState.label}</span>
          <strong>{moduleState.records.length}</strong>
          <small>{moduleState.summary}</small>
        </button>
      ))}
    </section>
  );
}

