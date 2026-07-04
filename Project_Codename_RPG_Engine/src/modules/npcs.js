import { createModuleDefinition } from './createModule.js';

export default createModuleDefinition({
  id: 'npcs',
  label: 'NPCs',
  icon: 'npcs',
  summary: 'Personagens nao controlados por jogadores.',
  fields: ['nome', 'papel', 'localizacao', 'motivacoes', 'relacoes', 'notas', 'metadados'],
});

