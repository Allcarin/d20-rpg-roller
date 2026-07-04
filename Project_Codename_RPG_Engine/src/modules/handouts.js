import { createModuleDefinition } from './createModule.js';

export default createModuleDefinition({
  id: 'handouts',
  label: 'Handouts',
  icon: 'handouts',
  summary: 'Materiais liberaveis para jogadores, como textos, pistas, documentos e anexos.',
  fields: ['nome', 'campanhaId', 'tipo', 'conteudo', 'assets', 'liberado', 'metadados'],
});

