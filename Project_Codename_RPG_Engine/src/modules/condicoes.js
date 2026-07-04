import { createModuleDefinition } from './createModule.js';

export default createModuleDefinition({
  id: 'condicoes',
  label: 'Condicoes',
  icon: 'condicoes',
  summary: 'Estados temporarios, efeitos persistentes e marcadores mecanicos.',
  fields: ['nome', 'descricao', 'duracao', 'efeitos', 'remocao', 'metadados'],
});

