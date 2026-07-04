import { createModuleDefinition } from './createModule.js';

export default createModuleDefinition({
  id: 'inventario',
  label: 'Inventario',
  icon: 'inventario',
  summary: 'Posse, carga, recipientes e distribuicao de itens.',
  fields: ['nome', 'proprietarioId', 'itens', 'capacidade', 'moeda', 'metadados'],
});

