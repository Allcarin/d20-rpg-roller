import { createModuleDefinition } from './createModule.js';

export default createModuleDefinition({
  id: 'personagens',
  label: 'Personagens',
  icon: 'personagens',
  summary: 'Fichas de personagens controladas por jogadores ou mesa.',
  fields: ['nome', 'jogador', 'nivel', 'atributos', 'recursos', 'pericias', 'inventario', 'notas'],
});

