import { createModuleDefinition } from './createModule.js';

export default createModuleDefinition({
  id: 'aventuras',
  label: 'Aventuras',
  icon: 'aventuras',
  summary: 'Arcos, capitulos, cenas e preparacao de jogo vinculados a campanhas.',
  fields: ['nome', 'campanhaId', 'status', 'cenas', 'ganchos', 'recompensas', 'metadados'],
});

