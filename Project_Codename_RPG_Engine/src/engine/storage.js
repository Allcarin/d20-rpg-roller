import { ACCESS_LEVELS, createEmptyDatabase, createModuleState, DB_STORAGE_KEY } from './defaultDatabase.js';
import { moduleDefinitions } from '../modules/index.js';

export function loadDatabase() {
  const stored = localStorage.getItem(DB_STORAGE_KEY);
  if (!stored) return createEmptyDatabase();

  try {
    const parsed = JSON.parse(stored);
    return normalizeDatabase(parsed);
  } catch {
    return createEmptyDatabase();
  }
}

export function saveDatabase(database) {
  const next = {
    ...database,
    meta: {
      ...database.meta,
      updatedAt: new Date().toISOString(),
    },
  };

  localStorage.setItem(DB_STORAGE_KEY, JSON.stringify(next));
  return next;
}

export function exportDatabase(database) {
  return JSON.stringify(database, null, 2);
}

export function importDatabase(json) {
  const parsed = JSON.parse(json);
  return normalizeDatabase(parsed);
}

export function normalizeDatabase(database) {
  const empty = createEmptyDatabase();
  const incomingModules = database.modules ?? {};
  const modules = Object.fromEntries(moduleDefinitions.map((definition) => {
    const existing = incomingModules[definition.id] ?? {};
    const fallback = createModuleState(definition);

    return [
      definition.id,
      {
        ...fallback,
        ...existing,
        id: definition.id,
        label: definition.label,
        icon: definition.icon,
        summary: definition.summary,
        schema: {
          ...fallback.schema,
          ...existing.schema,
          fields: Array.isArray(existing.schema?.fields)
            ? existing.schema.fields
            : fallback.schema.fields,
        },
        records: Array.isArray(existing.records)
          ? existing.records.map((record) => ({
            ...record,
            visibility: record.visibility ?? ACCESS_LEVELS.master,
            ownerMode: record.ownerMode ?? 'master',
            links: Array.isArray(record.links) ? record.links : [],
            tags: Array.isArray(record.tags) ? record.tags : [],
          }))
          : [],
      },
    ];
  }));

  return {
    ...empty,
    ...database,
    meta: { ...empty.meta, ...database.meta },
    settings: { ...empty.settings, ...database.settings },
    permissions: { ...empty.permissions, ...database.permissions },
    modules,
    events: Array.isArray(database.events) ? database.events : [],
  };
}
