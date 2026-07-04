import { createModuleDefinition } from './createModule.js';

export default createModuleDefinition({
  id: 'equipamentos',
  label: 'Equipamentos',
  icon: 'equipamentos',
  summary: 'Objetos equipaveis com propriedades mecanicas.',
  fields: ['nome', 'categoria', 'custo', 'peso', 'propriedades', 'regras', 'metadados'],
});

