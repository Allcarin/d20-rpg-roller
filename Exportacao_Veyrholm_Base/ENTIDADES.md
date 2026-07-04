# Entidades e estruturas

## Campaign

Campos principais:

- `id`
- `title`
- `appTitle`
- `canonVersion`
- `tone`
- `activeSceneId`
- `initialFlags`
- `character`
- `inventory`
- `quests`
- `knownNpcs`
- `factions`
- `centralEntity`
- `centralMystery`
- `initialHistory`
- `scenes`

## Scene

```js
{
  id,
  chapter,
  title,
  location,
  body,
  choices,
  effects,
  flagsRequired,
  flagsSet,
  nextSceneId,
  freeActionResponse
}
```

## Choice

```js
{
  id,
  label,
  kind,
  effects,
  flagsRequired,
  flagsSet,
  nextSceneId,
  check,
  action
}
```

## Check

```js
{
  attribute,
  difficulty,
  reason,
  outcomes: {
    criticalSuccess,
    success,
    failure,
    criticalFailure
  }
}
```

## Outcome

```js
{
  body,
  summary,
  effects
}
```

## Effect

Tipos atuais:

- `{ type: "life", amount }`
- `{ type: "faith", amount }`
- `{ type: "addStatus", status }`

## Character

```js
{
  id,
  name,
  class,
  titles,
  level,
  life,
  maxLife,
  faith,
  maxFaith,
  faithLabel,
  awakenedAshes,
  attributes,
  statuses
}
```

## SaveGame

```js
{
  canonVersion,
  campaign,
  character,
  inventory,
  quests,
  knownNpcs,
  factions,
  centralEntity,
  centralMystery,
  sceneId,
  flags,
  pendingCheck,
  lastOutcome,
  freeActionFeedback,
  history
}
```

## Entidades canonicas atuais

- Personagem: Allcarin.
- Entidade central: O Andarilho.
- NPCs conhecidos: Elyr, Aster, Lysandra, Maelis, Serah, Nariel.
- Facciones: Os Sete, Portadores das Cinzas, Cacadores do Veu, Filhos da Estrela Negra.
- Itens: 9 entradas no inventario inicial.
- Missoes: 3 entradas.
- Cenas: 13 entradas.
- Escolhas: 61 entradas.

