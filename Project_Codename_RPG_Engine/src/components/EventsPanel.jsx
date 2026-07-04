import Icon from './Icon.jsx';

export default function EventsPanel({ events }) {
  return (
    <section className="panel">
      <div className="panel-heading">
        <span>
          <Icon name="events" />
          Event Log
        </span>
      </div>

      <ol className="event-log">
        {events.slice(-20).reverse().map((event) => (
          <li key={event.id}>
            <span>{event.type}</span>
            <p>{event.message}</p>
            <time>{new Date(event.createdAt).toLocaleString()}</time>
          </li>
        ))}
      </ol>
    </section>
  );
}

