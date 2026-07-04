# Modelos de entidades reutilizaveis

## Novo RPG

Use estes modelos como contratos de dados. Eles sao independentes do universo de Veyrholm quando nomes, lore, simbolos e atributos sao substituidos.

```js
export const minhaCampanha = {
  id: 'minha-campanha',
  title: 'Minha Campanha',
  appTitle: 'Codice da Minha Campanha',
  canonVersion: 'base-1',
  tone: 'fantasia sombria',
  activeSceneId: 'inicio',
  initialFlags: [],
  character: personagemInicial,
  inventory: [],
  quests: [],
  knownNpcs: [],
  factions: [],
  centralEntity: null,
  centralMystery: '',
  initialHistory: [],
  scenes: [],
};
```

## Personagem

```js
const personagemInicial = {
  id: 'hero',
  name: 'Nome',
  class: 'Classe',
  titles: [],
  level: 1,
  life: 10,
  maxLife: 10,
  faith: 0,
  maxFaith: 10,
  faithLabel: null,
  attributes: {
    vigor: 0,
    conhecimento: 0,
    presenca: 0,
  },
  statuses: [],
};
```

## Cena

```js
const cena = {
  id: 'inicio',
  chapter: 'Capitulo 1',
  title: 'Inicio',
  location: 'Local',
  body: 'Texto narrativo.',
  choices: [],
  effects: [],
  flagsRequired: [],
  flagsSet: [],
  nextSceneId: null,
  freeActionResponse: 'Resposta padrao para acao livre.',
};
```

## Escolha

```js
const escolha = {
  id: 'seguir',
  label: 'Seguir adiante',
  kind: 'common',
  effects: [],
  flagsRequired: [],
  flagsSet: ['seguiu_adiante'],
  nextSceneId: 'proxima-cena',
  check: null,
  action: 'scene',
};
```

## Teste D20

```js
const teste = {
  attribute: 'vigor',
  difficulty: 10,
  reason: 'atravessar um obstaculo',
  outcomes: {
    criticalSuccess: { body: 'Resultado excepcional.', summary: 'Sucesso critico.', effects: [] },
    success: { body: 'Resultado positivo.', summary: 'Sucesso.', effects: [] },
    failure: { body: 'Resultado com custo.', summary: 'Falha.', effects: [{ type: 'life', amount: -1 }] },
    criticalFailure: { body: 'Resultado grave.', summary: 'Falha critica.', effects: [{ type: 'life', amount: -3 }] },
  },
};
```

