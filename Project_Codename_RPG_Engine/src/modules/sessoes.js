import { createModuleDefinition } from './createModule.js';

export default createModuleDefinition({
  id: 'sessoes',
  label: 'Sessoes',
  icon: 'sessoes',
  summary: 'Agendamento, pauta, resumo e eventos de sessoes de mesa.',
  fields: ['nome', 'data', 'campanhaId', 'participantes', 'resumo', 'eventos', 'metadados'],
});

