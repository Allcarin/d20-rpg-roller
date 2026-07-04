import Icon from './Icon.jsx';

export default function InventoryPanel({ items, sheets, activeSheetId, disabled, onCreate, onUpdate }) {
  const activeItems = activeSheetId
    ? items.filter((item) => item.ownerSheetId === activeSheetId)
    : items;

  return (
    <section className="panel">
      <div className="panel-heading">
        <span>
          <Icon name="inventory" />
          Inventory
        </span>
        <button type="button" disabled={disabled} onClick={() => onCreate(activeSheetId)}>
          <Icon name="add" />
          Item
        </button>
      </div>

      <div className="table-list">
        {activeItems.map((item) => (
          <article className="table-row" key={item.id}>
            <input value={item.label} disabled={disabled} onChange={(event) => onUpdate(item.id, { label: event.target.value })} />
            <select value={item.type} disabled={disabled} onChange={(event) => onUpdate(item.id, { type: event.target.value })}>
              <option value="equipment">Equipment</option>
              <option value="consumable">Consumable</option>
              <option value="tool">Tool</option>
              <option value="currency">Currency</option>
              <option value="note">Note</option>
            </select>
            <input type="number" value={item.quantity} disabled={disabled} onChange={(event) => onUpdate(item.id, { quantity: Number(event.target.value) })} />
            <select value={item.ownerSheetId ?? ''} disabled={disabled} onChange={(event) => onUpdate(item.id, { ownerSheetId: event.target.value || null })}>
              <option value="">Unassigned</option>
              {sheets.map((sheet) => <option key={sheet.id} value={sheet.id}>{sheet.label}</option>)}
            </select>
            <label className="check">
              <input type="checkbox" checked={item.equipped} disabled={disabled} onChange={(event) => onUpdate(item.id, { equipped: event.target.checked })} />
              Equipped
            </label>
          </article>
        ))}
      </div>

      {!activeItems.length && <p className="muted">No inventory records yet.</p>}
    </section>
  );
}

