# Reutilizacao da Base Veyrholm

Este pacote documenta o projeto atual "Cinzas de Veyrholm" como uma base reutilizavel para outros RPGs narrativos em React/Vite. A exportacao nao altera a funcionalidade do projeto original.

## Pode ser reaproveitado em outros RPGs

- Estrutura de aplicacao: shell em tres areas, com HUD, painel narrativo/interativo e diario lateral.
- Motor de campanha data-driven: campanha definida por objeto JavaScript com cenas, escolhas, flags, efeitos, inventario, missoes, NPCs e historico.
- Fluxo de telas: cena atual -> escolhas -> teste opcional -> consequencia -> proxima cena.
- Sistema de save local: serializacao em `localStorage`, validacao de versao canonica, cena ativa e campanha.
- Snapshot multiplayer: estado compartilhado derivado do save, pronto para ser substituido por sincronizacao real.
- Sistema de atributos: mapa de atributos numericos usado como modificador de rolagens.
- Sistema de rolagens D20: resultado bruto, modificador, total e quatro graus narrativos.
- Sistema de efeitos: alteracoes simples em vida, fe e status.
- Sistema de flags: controle de escolhas, desbloqueio de cenas e memoria de progresso.
- Sistema de diario: inventario, missoes, NPCs conhecidos e historico recente.
- Componentes reutilizaveis: `HUD`, `Journal`, `ChoicePanel`, `DiceRoller` e o padrao de icones em SVG.
- Validador de campanha: checa ids, cenas orfas, loops diretos, proxima cena inexistente e campanha ativa.
- Layout responsivo e linguagem visual de dark fantasy, desde que a paleta e os simbolos sejam adaptados.

## Especifico de Cinzas de Veyrholm

- Campanha ativa `ashes-of-veyrholm` e `canonVersion` `campaign-bible-1`.
- Protagonista Allcarin, Acolito da Chama Morta, A Chave e Fragmento de Elyr.
- Entidade central O Andarilho, que devora memorias, nomes e identidades.
- Mitologia de Elyr, Primeira Ruptura, Chave, Guardiao e Rei.
- NPCs canonicos: Elyr, Aster, Nariel, Maelis, Serah, Lysandra, O Rei e O Andarilho.
- Facciones canonicas: Os Sete, Portadores das Cinzas, Cacadores do Veu e Filhos da Estrela Negra.
- Locais canonicos como Veyrholm, Gravenfall, Vhal-Kar, Primeiro Descanso, Santuario das Raizes e Camara da Escolha.
- Textos narrativos, respostas de acao livre, itens, missoes e nomes de cenas.
- Iconografia `VeyrholmSymbol` quando representar marcas, faccoes ou reliquias do cenario.
- Paleta atual de cinza, ouro velho, sangue, chama morta e azul espectral quando usada como identidade de Veyrholm.

## Como transformar em outro RPG

1. Crie uma nova campanha usando os schemas em `schemas/`.
2. Troque `activeCampaign` em `src/App.jsx` por sua campanha nova.
3. Atualize o `STORAGE_KEY` e o `MULTIPLAYER_SNAPSHOT_KEY` para evitar colisao de saves.
4. Substitua textos, NPCs, faccoes, itens, missoes, entidades centrais e misterio.
5. Renomeie ou substitua `VeyrholmSymbol` se a iconografia nao fizer parte do novo universo.
6. Revise `choiceKinds` em `ChoicePanel.jsx` para os tipos de escolha do novo sistema.
7. Ajuste atributos e efeitos caso o RPG use outro modelo que nao vida, fe, status e D20.
8. Execute `npm run validate:campaign` depois de alterar cenas.

