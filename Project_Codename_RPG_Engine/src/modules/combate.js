import { createModuleDefinition } from './createModule.js';

export default createModuleDefinition({
  id: 'combate',
  label: 'Combate',
  icon: 'combate',
  summary: 'Encontros, participantes, turnos, acoes e estado tatico.',
  fields: ['nome', 'status', 'rodada', 'participantes', 'acoes', 'condicoes', 'metadados'],
});

