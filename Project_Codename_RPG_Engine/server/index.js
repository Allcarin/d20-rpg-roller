import http from 'node:http';
import { mkdir, readFile, stat, writeFile } from 'node:fs/promises';
import { createReadStream } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createEmptyDatabase } from '../src/engine/defaultDatabase.js';
import { MODES, PLAYER_MODULE_IDS, filterModuleForMode } from '../src/engine/access.js';
import { normalizeDatabase } from '../src/engine/storage.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');
const distDir = process.env.RPG_STATIC_DIR
  ? path.resolve(process.env.RPG_STATIC_DIR)
  : path.join(projectRoot, 'dist');
const dataDir = process.env.RPG_DATA_DIR
  ? path.resolve(process.env.RPG_DATA_DIR)
  : path.join(__dirname, 'data');
const dbPath = path.join(dataDir, 'database.json');
const port = Number(process.env.PORT ?? 8080);
const sessions = new Map();
const realtimeClients = new Set();

await mkdir(dataDir, { recursive: true });

const server = http.createServer(async (request, response) => {
  try {
    const url = new URL(request.url, `http://${request.headers.host}`);

    if (request.method === 'OPTIONS') {
      response.writeHead(204, corsHeaders());
      response.end();
      return;
    }

    if (url.pathname === '/api/health') {
      return sendJson(response, 200, { ok: true, mode: 'fullstack' });
    }

    if (url.pathname === '/api/login' && request.method === 'POST') {
      return handleLogin(request, response);
    }

    if (url.pathname === '/api/database' && request.method === 'GET') {
      return handleGetDatabase(request, response);
    }

    if (url.pathname === '/api/database' && request.method === 'PUT') {
      return handlePutDatabase(request, response);
    }

    if (url.pathname === '/api/realtime' && request.method === 'GET') {
      return handleRealtime(url, response);
    }

    return serveStatic(url, response);
  } catch (error) {
    return sendJson(response, 500, { error: error.message });
  }
});

server.listen(port, '0.0.0.0', () => {
  console.log(`RPG Campaign Platform listening on http://0.0.0.0:${port}`);
});

async function handleLogin(request, response) {
  const body = await readJson(request);
  const mode = body.mode === MODES.player ? MODES.player : MODES.master;
  const database = await readDatabase();
  const access = database.settings.access;
  const expected = mode === MODES.master ? access.masterPin : access.playerCode;

  if (!body.secret || body.secret !== expected) {
    return sendJson(response, 401, { error: 'Credencial invalida.' });
  }

  const token = crypto.randomUUID();
  sessions.set(token, {
    mode,
    createdAt: new Date().toISOString(),
  });

  return sendJson(response, 200, { ok: true, mode, token });
}

async function handleGetDatabase(request, response) {
  const session = getSession(request);
  if (!session) return sendJson(response, 401, { error: 'Sessao invalida.' });

  const database = await readDatabase();
  return sendJson(response, 200, filterDatabaseForSession(database, session));
}

async function handlePutDatabase(request, response) {
  const session = getSession(request);
  if (!session) return sendJson(response, 401, { error: 'Sessao invalida.' });

  const incoming = normalizeDatabase(await readJson(request));
  const current = await readDatabase();
  const next = session.mode === MODES.master
    ? incoming
    : mergePlayerDatabase(current, incoming);

  await writeDatabase(next);
  broadcastDatabase(next);
  return sendJson(response, 200, filterDatabaseForSession(next, session));
}

async function handleRealtime(url, response) {
  const token = url.searchParams.get('token');
  const session = sessions.get(token);
  if (!session) {
    response.writeHead(401, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify({ error: 'Sessao invalida.' }));
    return;
  }

  const client = { response, session };
  realtimeClients.add(client);

  response.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    Connection: 'keep-alive',
    ...corsHeaders(),
  });
  response.write('event: ready\ndata: {}\n\n');

  requestClose(response, () => {
    realtimeClients.delete(client);
  });
}

async function readDatabase() {
  try {
    const raw = await readFile(dbPath, 'utf8');
    return normalizeDatabase(JSON.parse(raw));
  } catch {
    const database = createEmptyDatabase();
    await writeDatabase(database);
    return database;
  }
}

async function writeDatabase(database) {
  const next = normalizeDatabase({
    ...database,
    meta: {
      ...database.meta,
      updatedAt: new Date().toISOString(),
    },
  });
  await writeFile(dbPath, JSON.stringify(next, null, 2), 'utf8');
  return next;
}

function filterDatabaseForSession(database, session) {
  if (session.mode === MODES.master) return sanitizeForTransport(database);

  const modules = Object.fromEntries(PLAYER_MODULE_IDS
    .map((moduleId) => database.modules[moduleId])
    .filter(Boolean)
    .map((moduleState) => {
      const filtered = filterModuleForMode(moduleState, MODES.player);
      return [filtered.id, filtered];
    }));

  return sanitizeForTransport({
    ...database,
    settings: {
      ...database.settings,
      access: {
        masterPin: '',
        playerCode: '',
      },
    },
    permissions: {
      ...database.permissions,
      activeRoleId: 'player',
      roles: database.permissions.roles.filter((role) => role.id === 'player'),
    },
    modules,
    events: database.events.filter((event) => (
      event.type === 'tableMessage'
      || event.type === 'dice'
      || event.type === 'system'
    )),
  });
}

function mergePlayerDatabase(current, incoming) {
  const writableModules = new Set(['personagens', 'inventario', 'diario', 'dados']);
  const modules = { ...current.modules };

  writableModules.forEach((moduleId) => {
    const currentModule = current.modules[moduleId];
    const incomingModule = incoming.modules[moduleId];
    if (!currentModule || !incomingModule) return;

    const masterRecords = currentModule.records.filter((record) => record.ownerMode !== MODES.player);
    const playerRecords = incomingModule.records
      .filter((record) => record.ownerMode === MODES.player)
      .map((record) => ({
        ...record,
        ownerMode: MODES.player,
        visibility: record.visibility === 'master' ? 'players' : record.visibility,
      }));

    modules[moduleId] = {
      ...currentModule,
      records: [...masterRecords, ...playerRecords],
    };
  });

  const currentEventIds = new Set(current.events.map((event) => event.id));
  const allowedIncomingEvents = incoming.events.filter((event) => (
    !currentEventIds.has(event.id)
    && (event.type === 'tableMessage' || event.type === 'dice')
  ));

  return normalizeDatabase({
    ...current,
    modules,
    events: [...current.events, ...allowedIncomingEvents].slice(-500),
  });
}

function broadcastDatabase(database) {
  [...realtimeClients].forEach((client) => {
    const payload = JSON.stringify(filterDatabaseForSession(database, client.session));
    client.response.write(`event: database\ndata: ${payload}\n\n`);
  });
}

function getSession(request) {
  const header = request.headers.authorization ?? '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;
  return token ? sessions.get(token) : null;
}

async function serveStatic(url, response) {
  const safePath = url.pathname === '/' ? '/index.html' : url.pathname;
  const target = path.normalize(path.join(distDir, safePath));

  if (!target.startsWith(distDir)) {
    return sendJson(response, 403, { error: 'Forbidden.' });
  }

  try {
    const info = await stat(target);
    if (!info.isFile()) throw new Error('Not file');
    response.writeHead(200, { 'Content-Type': getMimeType(target) });
    createReadStream(target).pipe(response);
  } catch {
    const fallback = path.join(distDir, 'index.html');
    response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    createReadStream(fallback).pipe(response);
  }
}

function readJson(request) {
  return new Promise((resolve, reject) => {
    let body = '';
    request.on('data', (chunk) => {
      body += chunk;
      if (body.length > 10_000_000) {
        reject(new Error('Payload muito grande.'));
      }
    });
    request.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch {
        reject(new Error('JSON invalido.'));
      }
    });
    request.on('error', reject);
  });
}

function sendJson(response, status, body) {
  response.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    ...corsHeaders(),
  });
  response.end(JSON.stringify(body));
}

function corsHeaders() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, OPTIONS',
  };
}

function sanitizeForTransport(database) {
  return normalizeDatabase(JSON.parse(JSON.stringify(database)));
}

function requestClose(response, onClose) {
  response.on('close', onClose);
  response.on('finish', onClose);
}

function getMimeType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  return {
    '.html': 'text/html; charset=utf-8',
    '.js': 'text/javascript; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.svg': 'image/svg+xml',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.webp': 'image/webp',
  }[ext] ?? 'application/octet-stream';
}
