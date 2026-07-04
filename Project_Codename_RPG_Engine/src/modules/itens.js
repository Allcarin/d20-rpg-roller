import { createModuleDefinition } from './createModule.js';

export default createModuleDefinition({
  id: 'itens',
  label: 'Itens',
  icon: 'itens',
  summary: 'Objetos gerais, consumiveis, recursos e notas de item.',
  fields: ['nome', 'tipo', 'quantidade', 'custo', 'peso', 'propriedades', 'metadados'],
});

