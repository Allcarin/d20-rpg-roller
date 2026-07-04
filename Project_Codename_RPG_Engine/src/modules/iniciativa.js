import { createModuleDefinition } from './createModule.js';

export default createModuleDefinition({
  id: 'iniciativa',
  label: 'Iniciativa',
  icon: 'iniciativa',
  summary: 'Ordem de turnos independente para qualquer sistema.',
  fields: ['nome', 'combateId', 'ordem', 'turnoAtual', 'rodada', 'metadados'],
});

