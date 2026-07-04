export function appendEvent(database, event) {
  return {
    ...database,
    events: [
      ...database.events,
      {
        id: `event-${crypto.randomUUID()}`,
        type: event.type,
        message: event.message,
        createdAt: new Date().toISOString(),
        payload: event.payload ?? {},
      },
    ].slice(-250),
  };
}

