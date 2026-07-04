# Arquitetura

## Camadas

- Entrada: `src/main.jsx` monta `<App />` em `#root`.
- Orquestracao: `src/App.jsx` controla estado, save, validacao, transicoes, efeitos e snapshot.
- Apresentacao: `src/components/*.jsx` renderizam HUD, diario, escolhas, rolagem e icones.
- Dados: `src/data/campaigns/ashesOfVeyrholm.js` descreve a campanha ativa.
- Validacao: `src/data/campaigns/validateCampaign.js` e `scripts/validate-campaign.mjs`.
- Estilo: `src/styles.css`.

## Dependencias

- `react`
- `react-dom`
- `vite`
- `@vitejs/plugin-react`

## Estado central

`saveGame` e o objeto central. Ele contem personagem, inventario, missoes, NPCs, faccoes, cena ativa, flags, teste pendente, ultimo resultado, feedback livre e historico.

## Funcoes internas relevantes em App.jsx

- `createInitialSave()`: clona dados iniciais da campanha.
- `loadSave(sceneIndex)`: carrega save persistido, valida versao/campanha/cena e mescla atributos atuais.
- `applyChoice(choice)`: resolve escolha livre, escolha com teste ou avanco direto.
- `applyFreeAction(action)`: registra uma tentativa livre sem trocar cena.
- `resolvePendingRoll(roll)`: transforma resultado de D20 em consequencia, efeitos e nova cena.
- `advanceToScene(...)`: aplica efeitos/flags e registra historico.
- `applyCharacterEffects(...)`: aplica `life`, `faith` e `addStatus`.
- `buildMultiplayerSnapshot(saveGame)`: cria uma visao compartilhavel do estado.
- `validateCampaign(...)`: garante integridade basica do grafo de cenas.

## Pontos de extensao

- Substituir `activeCampaign` por outra campanha.
- Adicionar novos tipos de efeito em `applyCharacterEffects`.
- Adicionar novos tipos de escolha em `ChoicePanel`.
- Trocar D20 por outro motor em `DiceRoller`.
- Persistir em API remota substituindo `localStorage`.
- Sincronizar `buildMultiplayerSnapshot` com servidor real.

