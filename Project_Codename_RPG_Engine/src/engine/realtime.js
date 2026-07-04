const CHANNEL_NAME = 'rpg-campaign-platform-realtime';
const STORAGE_MESSAGE_KEY = 'rpg-campaign-platform-realtime-message';

export function createRealtimeClient({ clientId, onDatabase }) {
  const channel = typeof BroadcastChannel !== 'undefined'
    ? new BroadcastChannel(CHANNEL_NAME)
    : null;

  const handleMessage = (message) => {
    if (!message || message.clientId === clientId) return;
    if (message.type === 'database-sync' && message.database) {
      onDatabase(message.database, message);
    }
  };

  if (channel) {
    channel.onmessage = (event) => handleMessage(event.data);
  }

  const storageListener = (event) => {
    if (event.key !== STORAGE_MESSAGE_KEY || !event.newValue) return;
    try {
      handleMessage(JSON.parse(event.newValue));
    } catch {
      // Ignore malformed cross-tab messages.
    }
  };

  window.addEventListener('storage', storageListener);

  return {
    publish(database) {
      const message = {
        type: 'database-sync',
        clientId,
        sentAt: new Date().toISOString(),
        database,
      };

      channel?.postMessage(message);
      localStorage.setItem(STORAGE_MESSAGE_KEY, JSON.stringify(message));
    },
    close() {
      channel?.close();
      window.removeEventListener('storage', storageListener);
    },
  };
}

export function isRemoteDatabaseNewer(current, incoming) {
  const currentTime = Date.parse(current.meta?.updatedAt ?? '') || 0;
  const incomingTime = Date.parse(incoming.meta?.updatedAt ?? '') || 0;
  return incomingTime >= currentTime;
}

