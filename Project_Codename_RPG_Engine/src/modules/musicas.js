import { createModuleDefinition } from './createModule.js';

export default createModuleDefinition({
  id: 'musicas',
  label: 'Musicas',
  icon: 'musicas',
  summary: 'Trilhas, playlists e controles futuros de audio.',
  fields: ['nome', 'campanhaId', 'url', 'estado', 'volume', 'loop', 'metadados'],
});

