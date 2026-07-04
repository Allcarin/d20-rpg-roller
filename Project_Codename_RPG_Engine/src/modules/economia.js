import { createModuleDefinition } from './createModule.js';

export default createModuleDefinition({
  id: 'economia',
  label: 'Economia',
  icon: 'economia',
  summary: 'Moedas, precos, transacoes, tesouros e recursos abstratos.',
  fields: ['nome', 'moedas', 'taxas', 'transacoes', 'tesouros', 'metadados'],
});

