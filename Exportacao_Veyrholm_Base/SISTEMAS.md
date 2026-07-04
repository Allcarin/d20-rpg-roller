# Sistemas

## Sistema de inventario

- Fonte: `saveGame.inventory`.
- Renderizacao: `Journal`.
- Entidade: `{ id, name, description, symbol, iconClass, equipped? }`.
- O item nao possui mecanica de uso ativa no app atual.
- A exibicao usa tooltip, icone pixelado por `iconClass` e simbolo SVG por `symbol`.

## Sistema de atributos

- Fonte: `saveGame.character.attributes`.
- Modelo atual: mapa de atributos para modificadores numericos.
- Atributos canonicos atuais: `vigor`, `fe sombria`, `conhecimento`, `agilidade`, `presenca`.
- Uso: HUD exibe valores; DiceRoller soma atributo ao D20.

## Sistema de rolagens

- Dado: D20.
- Formula: `raw + modifier = total`.
- O grau narrativo depende do valor bruto, nao do total:
  - `1`: `criticalFailure`.
  - `20`: `criticalSuccess`.
  - `10-19`: `success`.
  - `2-9`: `failure`.
- O `total` e exibido, mas a consequencia usa `raw`.
- Cada `check` define outcomes para os quatro graus.

## Sistema de salvamento

- Persistencia: `localStorage`.
- Chave: `veyrholm-save-${activeCampaign.canonVersion}-v1`.
- Valida ao carregar:
  - `canonVersion` igual a campanha ativa.
  - `campaign.id` igual ao id da campanha ativa.
  - `sceneId` existente.
- Se falhar, cria save inicial.
- Tambem grava snapshot multiplayer em `veyrholm-multiplayer-${canonVersion}-v1`.

## Sistema de eventos

- Eventos sao entradas em `saveGame.history`.
- Tipos usados: `narrative`, `world`, `choice`, `test`, `roll`, `consequence`, `free-action`.
- O diario mostra os ultimos 10 eventos.
- Rolagens recentes sao extraidas de eventos `type === "roll"`.

## Sistema de narrativa

- Cada cena possui `chapter`, `title`, `location`, `body` e `freeActionResponse`.
- O corpo da cena e a unidade narrativa principal.
- Consequencias de rolagem podem inserir `lastOutcome.body` antes do corpo da nova cena.
- A continuidade canonica e controlada por dados, nao por geracao dinamica.

## Sistema de IA

- Nao ha integracao com IA externa no codigo atual.
- O termo "acao livre" funciona como registro narrativo roteirizado: o jogador escreve uma acao, e o app responde com `scene.freeActionResponse`.
- Para adicionar IA real, substitua `applyFreeAction` por chamada a um modelo e mantenha validações de canone antes de aplicar efeitos ou trocar cena.

## Sistema de escolhas

- Entidade: `{ id, label, kind, effects, flagsRequired, flagsSet, nextSceneId, check, action }`.
- Tipos declarados: `common`, `test`, `danger`, `spiritual`, `investigation`.
- O PLAYBOOK tambem cita `combate` e `dialogo`, mas eles ainda nao estao implementados no `choiceKinds`.
- Escolhas podem:
  - avancar direto;
  - exigir teste D20;
  - registrar acao livre;
  - adicionar flags;
  - aplicar efeitos no personagem.

## Sistema de HUD

- Exibe personagem, classe, vida, fe, nivel, marcas, atributos e status.
- Barras de vida/fe sao percentuais calculados com clamp entre 0 e 100.
- Status podem ser string ou objeto; objetos aceitam `id`, `label`, `description` e `symbol`.

## Sistema de combate

- Nao existe sistema de combate separado no app atual.
- O combate pode ser representado por escolhas `danger` ou por checks com perda de `life`.
- O PLAYBOOK permite tipo `combate`, mas falta implementacao visual e logica dedicada.
- Para reutilizacao, o ponto natural de extensao e criar `kind: "combat"`/`"combate"` e novos efeitos como dano, defesa, iniciativa e inimigos.

## Sistema de dialogos

- Nao existe arvore de dialogo independente.
- Dialogos sao cenas e escolhas narrativas.
- O PLAYBOOK permite tipo `dialogo`, mas o componente atual nao possui estilo/logica especifica para ele.
- Para outro RPG, pode-se modelar dialogos como cenas curtas com `choices` ou criar uma entidade `dialogueNode`.

