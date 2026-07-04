import { useState } from 'react';
import Icon from './Icon.jsx';

export default function TableChannel({ events, mode, onSendMessage }) {
  const [message, setMessage] = useState('');
  const tableMessages = events
    .filter((event) => event.type === 'tableMessage')
    .slice(-12)
    .reverse();

  const submit = (event) => {
    event.preventDefault();
    const text = message.trim();
    if (!text) return;
    onSendMessage(text);
    setMessage('');
  };

  return (
    <section className="panel table-channel">
      <div className="panel-heading">
        <span>
          <Icon name="events" />
          Canal da Mesa
        </span>
      </div>
      <form className="channel-form" onSubmit={submit}>
        <textarea
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          placeholder={mode === 'master' ? 'Mensagem do Mestre para a mesa...' : 'Mensagem do Jogador para a mesa...'}
          rows="3"
        />
        <button type="submit">
          <Icon name="save" />
          Enviar
        </button>
      </form>
      <ol className="channel-list">
        {tableMessages.map((event) => (
          <li key={event.id}>
            <strong>{event.payload?.senderMode === 'master' ? 'Mestre' : 'Jogador'}</strong>
            <p>{event.message}</p>
            <time>{new Date(event.createdAt).toLocaleTimeString()}</time>
          </li>
        ))}
      </ol>
      {!tableMessages.length && <p className="muted">Nenhuma mensagem enviada nesta mesa.</p>}
    </section>
  );
}

