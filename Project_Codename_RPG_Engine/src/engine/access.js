import { ACCESS_LEVELS, CAPABILITIES } from './defaultDatabase.js';
import { can } from './permissions.js';

export const MODES = {
  master: 'master',
  player: 'player',
};

export const MASTER_MODULE_IDS = [
  'campanhas',
  'aventuras',
  'personagens',
  'classes',
  'racas',
  'backgrounds',
  'pericias',
  'magias',
  'equipamentos',
  'itens',
  'talentos',
  'monstros',
  'npcs',
  'condicoes',
  'missoes',
  'mapas',
  'sessoes',
  'diario',
  'eventos',
  'combate',
  'iniciativa',
  'inventario',
  'loot',
  'xp',
  'loja',
  'economia',
  'handouts',
  'imagens',
  'musicas',
  'iluminacao',
  'dados',
];

export const PLAYER_MODULE_IDS = [
  'personagens',
  'inventario',
  'diario',
  'handouts',
  'imagens',
  'missoes',
  'sessoes',
  'dados',
];

export function getModeModules(database, mode) {
  const allowedIds = mode === MODES.master ? MASTER_MODULE_IDS : PLAYER_MODULE_IDS;

  return allowedIds
    .map((moduleId) => database.modules[moduleId])
    .filter(Boolean)
    .map((moduleState) => filterModuleForMode(moduleState, mode));
}

export function filterModuleForMode(moduleState, mode) {
  if (mode === MODES.master) return moduleState;

  return {
    ...moduleState,
    records: moduleState.records.filter(isPlayerVisibleRecord),
  };
}

export function isPlayerVisibleRecord(record) {
  return record.visibility === ACCESS_LEVELS.players
    || record.visibility === ACCESS_LEVELS.public
    || record.ownerMode === MODES.player;
}

export function canEditInMode(database, mode, moduleId, record = null) {
  if (mode === MODES.master) return can(database, CAPABILITIES.manageModules);

  const playerWritableModules = new Set(['personagens', 'inventario', 'diario', 'dados']);
  if (!playerWritableModules.has(moduleId)) return false;
  if (!record) return true;
  return record.ownerMode === MODES.player;
}

export function getDefaultRecordVisibility(mode) {
  return mode === MODES.master ? ACCESS_LEVELS.master : ACCESS_LEVELS.players;
}

