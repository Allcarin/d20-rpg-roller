import { createModuleDefinition } from './createModule.js';

export default createModuleDefinition({
  id: 'classes',
  label: 'Classes',
  icon: 'classes',
  summary: 'Arquivos de progressao, regras e habilidades de classe.',
  fields: ['nome', 'descricao', 'progressao', 'habilidades', 'restricoes', 'metadados'],
});

