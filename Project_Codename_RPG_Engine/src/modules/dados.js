import { createModuleDefinition } from './createModule.js';

export default createModuleDefinition({
  id: 'dados',
  label: 'Dados',
  icon: 'dados',
  summary: 'Perfis de rolagem, formulas, tabelas e resultados.',
  fields: ['nome', 'formula', 'alvo', 'modificadores', 'resultados', 'metadados'],
});

