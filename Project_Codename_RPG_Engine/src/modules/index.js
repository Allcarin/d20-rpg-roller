import backgrounds from './backgrounds.js';
import aventuras from './aventuras.js';
import campanhas from './campanhas.js';
import classes from './classes.js';
import combate from './combate.js';
import condicoes from './condicoes.js';
import dados from './dados.js';
import diario from './diario.js';
import economia from './economia.js';
import equipamentos from './equipamentos.js';
import eventos from './eventos.js';
import handouts from './handouts.js';
import iluminacao from './iluminacao.js';
import imagens from './imagens.js';
import iniciativa from './iniciativa.js';
import inventario from './inventario.js';
import itens from './itens.js';
import loja from './loja.js';
import loot from './loot.js';
import magias from './magias.js';
import mapas from './mapas.js';
import missoes from './missoes.js';
import monstros from './monstros.js';
import musicas from './musicas.js';
import npcs from './npcs.js';
import pericias from './pericias.js';
import personagens from './personagens.js';
import racas from './racas.js';
import sessoes from './sessoes.js';
import talentos from './talentos.js';
import xp from './xp.js';

export const moduleDefinitions = [
  personagens,
  classes,
  racas,
  backgrounds,
  pericias,
  magias,
  equipamentos,
  itens,
  talentos,
  monstros,
  npcs,
  condicoes,
  missoes,
  campanhas,
  aventuras,
  mapas,
  sessoes,
  diario,
  eventos,
  combate,
  iniciativa,
  inventario,
  loot,
  xp,
  loja,
  economia,
  handouts,
  imagens,
  musicas,
  iluminacao,
  dados,
];

export const moduleDefinitionIndex = new Map(moduleDefinitions.map((module) => [module.id, module]));
