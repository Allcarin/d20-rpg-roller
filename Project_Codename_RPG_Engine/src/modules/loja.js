import { createModuleDefinition } from './createModule.js';

export default createModuleDefinition({
  id: 'loja',
  label: 'Loja',
  icon: 'loja',
  summary: 'Catalogos, vendedores, disponibilidade e transacoes comerciais.',
  fields: ['nome', 'vendedorId', 'estoque', 'regrasDePreco', 'localizacao', 'metadados'],
});

