import { createModuleDefinition } from './createModule.js';

export default createModuleDefinition({
  id: 'eventos',
  label: 'Eventos',
  icon: 'eventos',
  summary: 'Eventos criados pelo Mestre para mesa, calendario, cena ou combate.',
  fields: ['nome', 'campanhaId', 'tipo', 'alvo', 'gatilho', 'efeitos', 'metadados'],
});

