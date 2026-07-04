import { createModuleDefinition } from './createModule.js';

export default createModuleDefinition({
  id: 'loot',
  label: 'Loot',
  icon: 'loot',
  summary: 'Pacotes de recompensa, tesouros, drops e distribuicao de itens.',
  fields: ['nome', 'campanhaId', 'origem', 'itens', 'moedas', 'distribuido', 'metadados'],
});

