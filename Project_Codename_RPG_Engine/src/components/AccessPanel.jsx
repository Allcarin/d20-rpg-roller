import { useState } from 'react';
import Icon from './Icon.jsx';

export default function AccessPanel({ access, onSave }) {
  const [masterPin, setMasterPin] = useState(access.masterPin);
  const [playerCode, setPlayerCode] = useState(access.playerCode);

  return (
    <section className="panel access-panel">
      <div className="panel-heading">
        <span>
          <Icon name="permissions" />
          Acesso da Mesa
        </span>
      </div>
      <div className="access-grid">
        <label className="field">
          <span>PIN do Mestre</span>
          <input value={masterPin} onChange={(event) => setMasterPin(event.target.value)} />
        </label>
        <label className="field">
          <span>Codigo dos Jogadores</span>
          <input value={playerCode} onChange={(event) => setPlayerCode(event.target.value)} />
        </label>
      </div>
      <button type="button" onClick={() => onSave({ masterPin, playerCode })}>
        <Icon name="save" />
        Salvar acessos
      </button>
      <p className="muted">
        Estes codigos protegem a separacao local de modos no prototipo. Para uma mesa online real, use autenticacao no servidor.
      </p>
    </section>
  );
}

