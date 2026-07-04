import { createModuleDefinition } from './createModule.js';

export default createModuleDefinition({
  id: 'imagens',
  label: 'Imagens',
  icon: 'imagens',
  summary: 'Galeria de imagens, referencias visuais e midia enviada pelo Mestre.',
  fields: ['nome', 'campanhaId', 'url', 'arquivo', 'descricao', 'liberado', 'metadados'],
});

