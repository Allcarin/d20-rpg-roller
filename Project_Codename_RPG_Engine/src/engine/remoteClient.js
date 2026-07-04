const API_BASE = import.meta.env.VITE_API_BASE ?? '';

export async function loginRemote(mode, secret) {
  const response = await fetch(`${API_BASE}/api/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ mode, secret }),
  });

  if (!response.ok) {
    const error = await readError(response);
    throw withStatus(error || 'Falha no login remoto.', response.status);
  }

  return response.json();
}

export async function fetchRemoteDatabase(token) {
  const response = await fetch(`${API_BASE}/api/database`, {
    headers: authHeaders(token),
  });

  if (!response.ok) {
    const error = await readError(response);
    throw withStatus(error || 'Falha ao carregar banco remoto.', response.status);
  }

  return response.json();
}

export async function saveRemoteDatabase(database, token) {
  const response = await fetch(`${API_BASE}/api/database`, {
    method: 'PUT',
    headers: {
      ...authHeaders(token),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(database),
  });

  if (!response.ok) {
    const error = await readError(response);
    throw withStatus(error || 'Falha ao salvar banco remoto.', response.status);
  }

  return response.json();
}

function withStatus(message, status) {
  const error = new Error(message);
  error.status = status;
  return error;
}

export function createRemoteRealtimeClient({ token, onDatabase }) {
  if (!token || typeof EventSource === 'undefined') return null;

  const source = new EventSource(`${API_BASE}/api/realtime?token=${encodeURIComponent(token)}`);
  source.addEventListener('database', (event) => {
    try {
      onDatabase(JSON.parse(event.data));
    } catch {
      // Ignore malformed remote events.
    }
  });

  return {
    close() {
      source.close();
    },
  };
}

function authHeaders(token) {
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function readError(response) {
  try {
    const body = await response.json();
    return body.error;
  } catch {
    return response.statusText;
  }
}
