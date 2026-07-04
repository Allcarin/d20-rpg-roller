import { createModuleDefinition } from './createModule.js';

export default createModuleDefinition({
  id: 'iluminacao',
  label: 'Iluminacao',
  icon: 'iluminacao',
  summary: 'Configuracoes futuras de luz, nevoa, visibilidade e camadas de mapa.',
  fields: ['nome', 'mapaId', 'camadas', 'fontesDeLuz', 'visibilidade', 'metadados'],
});

