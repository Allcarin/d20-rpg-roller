import Icon from './Icon.jsx';

export default function HUD({ sheet, canCreate, onCreate }) {
  return (
    <aside className="hud panel">
      <div className="panel-heading">
        <span>
          <Icon name="dashboard" />
          HUD
        </span>
      </div>

      {sheet ? (
        <>
          <div className="hud-identity">
            <strong>{sheet.label}</strong>
            <span>Level {sheet.level}</span>
          </div>

          <div className="resource-list">
            {Object.entries(sheet.resources).map(([key, resource]) => (
              <div className="resource" key={key}>
                <div>
                  <span>{formatLabel(key)}</span>
                  <strong>{resource.current}/{resource.max}</strong>
                </div>
                <meter min="0" max={resource.max || 1} value={resource.current} />
              </div>
            ))}
          </div>

          <div className="attribute-stack">
            {Object.entries(sheet.attributes).map(([key, value]) => (
              <div className="attribute-pill" key={key}>
                <span>{formatLabel(key)}</span>
                <strong>{formatModifier(value)}</strong>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="empty-state">
          <strong>No active sheet</strong>
          <span>Create or select a sheet from the database.</span>
          <button type="button" disabled={!canCreate} onClick={onCreate}>
            <Icon name="add" />
            New Sheet
          </button>
        </div>
      )}
    </aside>
  );
}

function formatLabel(value) {
  return value.replace(/([A-Z])/g, ' $1').replace(/^./, (char) => char.toUpperCase());
}

function formatModifier(value) {
  return value >= 0 ? `+${value}` : String(value);
}

