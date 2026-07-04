import { createModuleDefinition } from './createModule.js';

export default createModuleDefinition({
  id: 'monstros',
  label: 'Monstros',
  icon: 'monstros',
  summary: 'Criaturas, adversarios e ameaças configuraveis pelo sistema.',
  fields: ['nome', 'tipo', 'nivel', 'atributos', 'recursos', 'acoes', 'recompensas', 'metadados'],
});

