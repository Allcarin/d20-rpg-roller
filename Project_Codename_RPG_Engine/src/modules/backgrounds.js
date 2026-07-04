import { createModuleDefinition } from './createModule.js';

export default createModuleDefinition({
  id: 'backgrounds',
  label: 'Backgrounds',
  icon: 'backgrounds',
  summary: 'Historicos, profissoes, origens sociais ou passados mecanicos.',
  fields: ['nome', 'descricao', 'beneficios', 'pericias', 'equipamentos', 'metadados'],
});

