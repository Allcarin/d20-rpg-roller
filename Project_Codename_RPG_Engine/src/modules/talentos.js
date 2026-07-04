import { createModuleDefinition } from './createModule.js';

export default createModuleDefinition({
  id: 'talentos',
  label: 'Talentos',
  icon: 'talentos',
  summary: 'Vantagens, feitos, poderes passivos ou escolhas de desenvolvimento.',
  fields: ['nome', 'preRequisitos', 'beneficios', 'regras', 'metadados'],
});

