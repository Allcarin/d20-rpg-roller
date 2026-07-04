import { createModuleDefinition } from './createModule.js';

export default createModuleDefinition({
  id: 'missoes',
  label: 'Missoes',
  icon: 'missoes',
  summary: 'Objetivos, etapas, recompensas e progresso narrativo/mecanico.',
  fields: ['nome', 'status', 'progresso', 'etapas', 'recompensas', 'notas', 'metadados'],
});

