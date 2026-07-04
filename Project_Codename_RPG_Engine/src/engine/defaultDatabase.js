import { moduleDefinitions } from '../modules/index.js';

export const DB_STORAGE_KEY = 'rpg-campaign-platform-db-v3';

export const CAPABILITIES = {
  readDatabase: 'readDatabase',
  writeDatabase: 'writeDatabase',
  manageModules: 'manageModules',
  managePermissions: 'managePermissions',
  masterMode: 'masterMode',
  playerMode: 'playerMode',
  revealRecords: 'revealRecords',
  rollDice: 'rollDice',
  viewEvents: 'viewEvents',
};

export const ACCESS_LEVELS = {
  master: 'master',
  players: 'players',
  public: 'public',
};

export function createEmptyDatabase() {
  const now = new Date().toISOString();

  return {
    meta: {
      product: 'Project Codename: RPG Engine',
      mode: 'Generic tabletop campaign platform',
      databaseVersion: 2,
      createdAt: now,
      updatedAt: now,
    },
    settings: {
      activeModuleId: moduleDefinitions[0]?.id ?? null,
      activeRecordIdByModule: {},
      realtimeRoom: 'default-table',
      access: {
        masterPin: '0000',
        playerCode: 'mesa',
      },
    },
    permissions: {
      activeRoleId: 'admin',
      roles: [
        {
          id: 'admin',
          label: 'Mestre',
          capabilities: Object.values(CAPABILITIES),
        },
        {
          id: 'player',
          label: 'Jogador',
          capabilities: [
            CAPABILITIES.readDatabase,
            CAPABILITIES.playerMode,
            CAPABILITIES.rollDice,
            CAPABILITIES.viewEvents,
          ],
        },
        {
          id: 'viewer',
          label: 'Leitor',
          capabilities: [
            CAPABILITIES.readDatabase,
            CAPABILITIES.rollDice,
            CAPABILITIES.viewEvents,
          ],
        },
      ],
    },
    modules: Object.fromEntries(moduleDefinitions.map((definition) => [
      definition.id,
      createModuleState(definition),
    ])),
    events: [],
  };
}

export function createModuleState(definition) {
  return {
    id: definition.id,
    label: definition.label,
    icon: definition.icon,
    summary: definition.summary,
    schema: {
      fields: definition.fields,
      flexible: true,
    },
    records: [],
  };
}

export function createBlankRecord(moduleState, { visibility = ACCESS_LEVELS.master, ownerMode = 'master' } = {}) {
  const now = new Date().toISOString();

  return {
    id: createId(moduleState.id),
    label: '',
    visibility,
    ownerMode,
    data: Object.fromEntries(moduleState.schema.fields.map((field) => [field, ''])),
    links: [],
    tags: [],
    createdAt: now,
    updatedAt: now,
  };
}

export function createId(prefix) {
  return `${prefix}-${crypto.randomUUID()}`;
}
