import { createModuleDefinition } from './createModule.js';

export default createModuleDefinition({
  id: 'pericias',
  label: 'Pericias',
  icon: 'pericias',
  summary: 'Competencias, treinamentos e especialidades usadas em testes.',
  fields: ['nome', 'atributoBase', 'descricao', 'usos', 'regras', 'metadados'],
});

