import { useEffect, useState } from 'react';
import Icon from './Icon.jsx';

export default function DatabasePanel({ database, disabled, onImport, onReset }) {
  const [buffer, setBuffer] = useState('');
  const [error, setError] = useState('');
  const modules = Object.values(database.modules ?? {});
  const recordCount = modules.reduce((total, moduleState) => total + moduleState.records.length, 0);

  useEffect(() => {
    setBuffer(JSON.stringify(database, null, 2));
    setError('');
  }, [database]);

  const importBuffer = () => {
    try {
      onImport(buffer);
      setError('');
    } catch (importError) {
      setError(importError.message);
    }
  };

  return (
    <section className="panel database-panel">
      <div className="panel-heading">
        <span>
          <Icon name="database" />
          Database
        </span>
        <div className="button-row">
          <button type="button" disabled={disabled} onClick={importBuffer}>
            <Icon name="save" />
            Import JSON
          </button>
          <button type="button" disabled={disabled} onClick={onReset}>
            Reset Empty DB
          </button>
        </div>
      </div>

      <dl className="database-summary">
        <div>
          <dt>Modulos</dt>
          <dd>{modules.length}</dd>
        </div>
        <div>
          <dt>Registros</dt>
          <dd>{recordCount}</dd>
        </div>
        <div>
          <dt>Papeis</dt>
          <dd>{database.permissions.roles.length}</dd>
        </div>
        <div>
          <dt>Events</dt>
          <dd>{database.events.length}</dd>
        </div>
      </dl>

      <textarea className="json-editor" value={buffer} onChange={(event) => setBuffer(event.target.value)} spellCheck="false" />
      {error && <p className="error-text">{error}</p>}
    </section>
  );
}
