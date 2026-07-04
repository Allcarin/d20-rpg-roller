import { createModuleDefinition } from './createModule.js';

export default createModuleDefinition({
  id: 'mapas',
  label: 'Mapas',
  icon: 'mapas',
  summary: 'Mapas, cenas taticas, pontos de interesse e camadas.',
  fields: ['nome', 'tipo', 'escala', 'camadas', 'marcadores', 'assets', 'metadados'],
});

