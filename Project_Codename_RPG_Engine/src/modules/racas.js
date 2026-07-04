import { createModuleDefinition } from './createModule.js';

export default createModuleDefinition({
  id: 'racas',
  label: 'Racas',
  icon: 'racas',
  summary: 'Origens biologicas, culturais ou equivalentes definidos pelo sistema.',
  fields: ['nome', 'descricao', 'tracos', 'modificadores', 'idiomas', 'metadados'],
});

