import Icon from './Icon.jsx';

export default function Dashboard({ database }) {
  return (
    <section className="dashboard-grid">
      <Metric icon="sheet" label="Sheets" value={database.sheets.length} />
      <Metric icon="inventory" label="Inventory Records" value={database.inventoryItems.length} />
      <Metric icon="combat" label="Encounters" value={database.encounters.length} />
      <Metric icon="events" label="Events" value={database.events.length} />
    </section>
  );
}

function Metric({ icon, label, value }) {
  return (
    <article className="metric-card">
      <Icon name={icon} />
      <span>{label}</span>
      <strong>{value}</strong>
    </article>
  );
}

