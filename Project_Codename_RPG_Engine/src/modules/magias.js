import { createModuleDefinition } from './createModule.js';

export default createModuleDefinition({
  id: 'magias',
  label: 'Magias',
  icon: 'magias',
  summary: 'Poderes, tecnicas, rituais ou efeitos sobrenaturais parametrizados.',
  fields: ['nome', 'circulo', 'custo', 'alcance', 'duracao', 'efeitos', 'regras', 'metadados'],
});

