import { useState } from 'react';
import Icon from './Icon.jsx';

export default function AuthGate({ access, onLogin }) {
  const [mode, setMode] = useState('master');
  const [secret, setSecret] = useState('');
  const [error, setError] = useState('');

  const submit = async (event) => {
    event.preventDefault();
    try {
      await onLogin(mode, secret, access);
      setError('');
    } catch (loginError) {
      setError(loginError.message);
    }
  };

  return (
    <main className="auth-shell">
      <section className="auth-panel panel">
        <div className="brand auth-brand">
          <strong>Campaign Platform</strong>
          <span>Acesso separado para Mestre e Jogador</span>
        </div>

        <div className="mode-selector auth-mode-selector">
          <button
            className={mode === 'master' ? 'is-active' : ''}
            type="button"
            onClick={() => {
              setMode('master');
              setSecret('');
              setError('');
            }}
          >
            <Icon name="permissions" />
            Modo Mestre
          </button>
          <button
            className={mode === 'player' ? 'is-active' : ''}
            type="button"
            onClick={() => {
              setMode('player');
              setSecret('');
              setError('');
            }}
          >
            <Icon name="personagens" />
            Modo Jogador
          </button>
        </div>

        <form className="auth-form" onSubmit={submit}>
          <label className="field">
            <span>{mode === 'master' ? 'PIN do Mestre' : 'Codigo da mesa'}</span>
            <input
              autoFocus
              type={mode === 'master' ? 'password' : 'text'}
              value={secret}
              onChange={(event) => setSecret(event.target.value)}
              placeholder={mode === 'master' ? 'PIN padrao: 0000' : 'Codigo padrao: mesa'}
            />
          </label>
          <button type="submit">
            <Icon name="save" />
            Entrar
          </button>
          {error && <p className="error-text">{error}</p>}
        </form>

        <p className="muted auth-note">
          Esta e uma separacao local de prototipo. Para acesso seguro em rede, a proxima etapa e um servidor com usuarios, sessoes e WebSocket.
        </p>
      </section>
    </main>
  );
}
