import Icon from './Icon.jsx';

export default function SheetPanel({ sheets, activeSheetId, disabled, onCreate, onSelect, onUpdate }) {
  const activeSheet = sheets.find((sheet) => sheet.id === activeSheetId) ?? null;

  return (
    <section className="panel">
      <div className="panel-heading">
        <span>
          <Icon name="sheet" />
          Sheet System
        </span>
        <button type="button" disabled={disabled} onClick={onCreate}>
          <Icon name="add" />
          Sheet
        </button>
      </div>

      <label className="field">
        <span>Active sheet</span>
        <select value={activeSheetId ?? ''} disabled={disabled || !sheets.length} onChange={(event) => onSelect(event.target.value || null)}>
          <option value="">None</option>
          {sheets.map((sheet) => (
            <option key={sheet.id} value={sheet.id}>{sheet.label}</option>
          ))}
        </select>
      </label>

      {activeSheet ? (
        <div className="sheet-editor">
          <label className="field">
            <span>Label</span>
            <input value={activeSheet.label} disabled={disabled} onChange={(event) => onUpdate(activeSheet.id, { label: event.target.value })} />
          </label>
          <label className="field">
            <span>Owner</span>
            <input value={activeSheet.owner} disabled={disabled} onChange={(event) => onUpdate(activeSheet.id, { owner: event.target.value })} />
          </label>
          <label className="field">
            <span>Level</span>
            <input type="number" value={activeSheet.level} disabled={disabled} onChange={(event) => onUpdate(activeSheet.id, { level: Number(event.target.value) })} />
          </label>

          <div className="editor-grid">
            <div>
              <h3>Resources</h3>
              {Object.entries(activeSheet.resources).map(([key, resource]) => (
                <div className="dual-input" key={key}>
                  <span>{formatLabel(key)}</span>
                  <input type="number" value={resource.current} disabled={disabled} onChange={(event) => onUpdateResource(activeSheet, key, 'current', event.target.value, onUpdate)} />
                  <input type="number" value={resource.max} disabled={disabled} onChange={(event) => onUpdateResource(activeSheet, key, 'max', event.target.value, onUpdate)} />
                </div>
              ))}
            </div>
            <div>
              <h3>Attributes</h3>
              {Object.entries(activeSheet.attributes).map(([key, value]) => (
                <div className="dual-input" key={key}>
                  <span>{formatLabel(key)}</span>
                  <input type="number" value={value} disabled={disabled} onChange={(event) => onUpdateAttribute(activeSheet, key, event.target.value, onUpdate)} />
                </div>
              ))}
            </div>
          </div>

          <label className="field">
            <span>Notes</span>
            <textarea value={activeSheet.notes} disabled={disabled} onChange={(event) => onUpdate(activeSheet.id, { notes: event.target.value })} />
          </label>
        </div>
      ) : (
        <p className="muted">Sheets are database records. Create one to enable HUD, rolls, inventory ownership, and combat participation.</p>
      )}
    </section>
  );
}

function onUpdateResource(sheet, resourceKey, field, value, onUpdate) {
  onUpdate(sheet.id, {
    resources: {
      ...sheet.resources,
      [resourceKey]: {
        ...sheet.resources[resourceKey],
        [field]: Number(value),
      },
    },
  });
}

function onUpdateAttribute(sheet, attributeKey, value, onUpdate) {
  onUpdate(sheet.id, {
    attributes: {
      ...sheet.attributes,
      [attributeKey]: Number(value),
    },
  });
}

function formatLabel(value) {
  return value.replace(/([A-Z])/g, ' $1').replace(/^./, (char) => char.toUpperCase());
}

