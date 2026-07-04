import { createModuleDefinition } from './createModule.js';

export default createModuleDefinition({
  id: 'diario',
  label: 'Diario',
  icon: 'diario',
  summary: 'Anotacoes, linhas do tempo, descobertas e logs narrativos.',
  fields: ['titulo', 'categoria', 'campanhaId', 'conteudo', 'tags', 'metadados'],
});

