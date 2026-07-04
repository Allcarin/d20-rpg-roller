import { useEffect, useMemo, useState } from 'react';
import Icon from './Icon.jsx';

export default function ModulePanel({
  moduleState,
  activeRecordId,
  disabled,
  mode,
  canReveal = false,
  canCreate = true,
  onCreateRecord,
  onSelectRecord,
  onUpdateRecord,
}) {
  const activeRecord = useMemo(
    () => moduleState.records.find((record) => record.id === activeRecordId)
      ?? moduleState.records[0]
      ?? null,
    [activeRecordId, moduleState.records],
  );
  const [jsonBuffer, setJsonBuffer] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    setJsonBuffer(activeRecord ? JSON.stringify(activeRecord.data, null, 2) : '');
    setError('');
  }, [activeRecord]);

  const saveData = () => {
    if (!activeRecord) return;

    try {
      const parsed = JSON.parse(jsonBuffer);
      onUpdateRecord(moduleState.id, activeRecord.id, { data: parsed });
      setError('');
    } catch (saveError) {
      setError(saveError.message);
    }
  };

  return (
    <section className="panel module-panel">
      <div className="panel-heading">
        <span>
          <Icon name={moduleState.icon} />
          {moduleState.label}
        </span>
        <button type="button" disabled={!canCreate} onClick={() => onCreateRecord(moduleState.id)}>
          <Icon name="add" />
          Registro
        </button>
      </div>

      <p className="muted module-summary">{moduleState.summary}</p>

      <div className="module-grid">
        <aside className="record-list">
          <div className="schema-card">
            <strong>Schema</strong>
            <span>{moduleState.schema.fields.join(', ')}</span>
          </div>
          {moduleState.records.map((record) => (
            <button
              className={record.id === activeRecord?.id ? 'is-active' : ''}
              key={record.id}
              type="button"
              onClick={() => onSelectRecord(moduleState.id, record.id)}
            >
              <span>{record.label || 'Registro sem nome'}</span>
              <small>{record.id}</small>
            </button>
          ))}
          {!moduleState.records.length && (
            <p className="muted">Colecao vazia. Crie ou importe registros pelo banco.</p>
          )}
        </aside>

        <div className="record-editor">
          {activeRecord ? (
            <>
              <label className="field">
                <span>Nome do registro</span>
                <input
                  value={activeRecord.label}
                  disabled={disabled}
                  onChange={(event) => onUpdateRecord(moduleState.id, activeRecord.id, { label: event.target.value })}
                  placeholder="Defina um nome local para este registro"
                />
              </label>
              <div className="record-meta-grid">
                <label className="field">
                  <span>Visibilidade</span>
                  <select
                    value={activeRecord.visibility}
                    disabled={!canReveal}
                    onChange={(event) => onUpdateRecord(moduleState.id, activeRecord.id, { visibility: event.target.value })}
                  >
                    <option value="master">Somente Mestre</option>
                    <option value="players">Jogadores</option>
                    <option value="public">Publico</option>
                  </select>
                </label>
                <label className="field">
                  <span>Origem</span>
                  <input value={activeRecord.ownerMode ?? mode} disabled />
                </label>
              </div>
              <label className="field">
                <span>Tags</span>
                <input
                  value={activeRecord.tags.join(', ')}
                  disabled={disabled}
                  onChange={(event) => onUpdateRecord(moduleState.id, activeRecord.id, {
                    tags: event.target.value.split(',').map((tag) => tag.trim()).filter(Boolean),
                  })}
                  placeholder="tags separadas por virgula"
                />
              </label>
              <label className="field">
                <span>Dados do modulo em JSON</span>
                <textarea
                  className="json-editor module-json"
                  value={jsonBuffer}
                  disabled={disabled}
                  onChange={(event) => setJsonBuffer(event.target.value)}
                  spellCheck="false"
                />
              </label>
              <div className="button-row">
                <button type="button" disabled={disabled} onClick={saveData}>
                  <Icon name="save" />
                  Salvar JSON
                </button>
              </div>
              {error && <p className="error-text">{error}</p>}
            </>
          ) : (
            <div className="empty-state">
              <strong>Nenhum registro</strong>
              <span>Este modulo ainda nao possui dados.</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
