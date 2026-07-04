import { createModuleDefinition } from './createModule.js';

export default createModuleDefinition({
  id: 'campanhas',
  label: 'Campanhas',
  icon: 'campanhas',
  summary: 'Contenedores de mundo, regras, personagens, sessoes e registros de mesa.',
  fields: ['nome', 'sistema', 'estado', 'participantes', 'modulosAtivos', 'notas', 'metadados'],
});

