# Componentes reutilizaveis

Esta pasta contem copias dos componentes React atuais. Eles podem ser movidos para outro projeto, desde que os imports e os nomes de dados sejam ajustados.

## Componentes

- `ChoicePanel.jsx`: painel de escolhas, tipos de escolha e acao livre.
- `DiceRoller.jsx`: rolagem D20 e historico recente de rolagens.
- `HUD.jsx`: painel de personagem com vida, fe, nivel, atributos e status.
- `Journal.jsx`: diario de inventario, missoes, NPCs e historico.
- `VeyrholmSymbol.jsx`: icones SVG inline.

## Dependencias entre eles

- `ChoicePanel`, `DiceRoller`, `HUD` e `Journal` importam `VeyrholmSymbol`.
- Todos dependem das classes declaradas em `assets/estilos/styles.css`.
- `ChoicePanel` espera `choices` no formato documentado em `schemas/campaign.schema.json`.
- `DiceRoller` espera `attributes` como objeto `{ nomeDoAtributo: modificador }`.

## Adaptacoes recomendadas

- Renomear `VeyrholmSymbol` para uma biblioteca de icones do novo universo.
- Trocar textos fixos como "Allcarin", "Oraculo de Osso" e "Grimorio".
- Ajustar `choiceKinds` para tipos como combate, dialogo, magia, exploracao ou social.
- Se o RPG nao usar fe, adaptar `HUD` e `applyCharacterEffects`.

