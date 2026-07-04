import { createModuleDefinition } from './createModule.js';

export default createModuleDefinition({
  id: 'xp',
  label: 'XP',
  icon: 'xp',
  summary: 'Experiencia, progresso, marcos e distribuicao de recompensas.',
  fields: ['nome', 'campanhaId', 'destinatarios', 'valor', 'motivo', 'aplicado', 'metadados'],
});

