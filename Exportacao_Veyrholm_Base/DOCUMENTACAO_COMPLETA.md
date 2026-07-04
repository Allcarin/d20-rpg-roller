# Documentacao Completa da Base

## Estrutura de pastas do projeto atual

```text
.
├── index.html
├── package.json
├── package-lock.json
├── PLAYBOOK.md
├── scripts/
│   └── validate-campaign.mjs
├── src/
│   ├── App.jsx
│   ├── main.jsx
│   ├── styles.css
│   ├── components/
│   │   ├── ChoicePanel.jsx
│   │   ├── DiceRoller.jsx
│   │   ├── HUD.jsx
│   │   ├── Journal.jsx
│   │   └── VeyrholmSymbol.jsx
│   └── data/
│       └── campaigns/
│           ├── ashesOfVeyrholm.js
│           └── validateCampaign.js
└── dist*/
    └── builds estaticos gerados anteriormente
```

## Estrutura desta exportacao

```text
Exportacao_Veyrholm_Base/
├── README_REUTILIZACAO.md
├── DOCUMENTACAO_COMPLETA.md
├── FLUXO_TELAS.md
├── SISTEMAS.md
├── ARQUITETURA.md
├── ENTIDADES.md
├── PALETA_E_ASSETS.md
├── examples/
│   └── campanha-exemplo.json
├── schemas/
│   ├── campaign.schema.json
│   └── savegame.schema.json
├── modelos/
│   └── modelos-entidades.md
├── componentes_reutilizaveis/
│   └── copias dos componentes React
└── assets/
    ├── dados/
    ├── estilos/
    ├── icones/
    └── fontes/
```

## Lista de componentes

- `App.jsx`: orquestrador do jogo. Carrega a campanha, valida o canone, cria o save inicial, salva estado, resolve escolhas, rolagens e transicoes.
- `ChoicePanel.jsx`: painel de escolhas e acao livre. Classifica escolhas por tipo e mostra marcadores visuais.
- `DiceRoller.jsx`: rolagem D20 com atributo, modificador, total, resultado narrativo e historico recente.
- `HUD.jsx`: estado do personagem, vida, fe, nivel, marcas, atributos e status.
- `Journal.jsx`: diario lateral com inventario, missoes, NPCs, historico e reset de save.
- `VeyrholmSymbol.jsx`: biblioteca de icones SVG inline por tipo simbolico.

## Todas as telas existentes

O app e uma SPA com uma unica rota e telas internas por estado:

- Tela principal de jogo: exibida sempre em `App`, formada por HUD, cena narrativa, painel de escolhas e diario.
- Estado de escolha livre: textarea para registrar acao sem alterar cena.
- Estado de teste pendente: `DiceRoller` aparece ao lado do painel de escolhas, que fica desabilitado.
- Estado de resolucao: mostra consequencia de rolagem antes/ao entrar na proxima cena.
- Estado de diario: inventario e missoes expansivos, NPCs e historico visiveis no painel lateral.

As cenas narrativas atuais sao:

| id | titulo | local |
| --- | --- | --- |
| `beyond-choice-revelation` | Quem Ficara Inteiro | Alem da Camara da Escolha |
| `elyr-final-testimony` | Elyr, Nao o Rei | Sob a Arvore Dourada |
| `echo-of-the-division` | A Memoria da Divisao | Lago de Memorias |
| `guardian-last-vow` | O Dever de Aster | Raizes da Arvore Dourada |
| `king-and-host` | O Peso e a Hospedeira | Margem do Lago de Memorias |
| `witnesses-of-aurel` | As Irmas de Vhal-Kar | Sob o Ceu de Memorias |
| `council-of-fragments` | O Conselho dos Fragmentos | Alem da Camara da Escolha |
| `memory-that-remains` | A Memoria que Permanece | Lago de Memorias |
| `nariel-remembrance` | Aquilo que Nariel Plantou | Arvore Dourada |
| `three-marks-aligned` | Chave, Guardiao e Rei | Circulo das Tres Marcas |
| `fifth-vigil-prepares` | A Quinta Vigilia | Margem da Camara |
| `silence-before-the-wanderer` | Nao Responda | Limite do Ceu Impossivel |
| `threshold-of-arrival` | A Ausencia Encontra a Porta | Alem da Camara da Escolha |

## Arquitetura do projeto

- Framework: React com Vite.
- Estado: `useState` no `App`, sem store externa.
- Dados: campanha em modulo local JavaScript.
- Persistencia: `localStorage`.
- Validacao: funcao local `validateCampaign`.
- Renderizacao: componentes funcionais React.
- Estilo: CSS global em `src/styles.css`.
- Build: `vite build`.

## Banco de dados utilizado

Nao ha banco de dados externo, servidor, ORM ou API. O projeto usa:

- Dados canonicos em arquivo local: `src/data/campaigns/ashesOfVeyrholm.js`.
- Save do jogador em `localStorage` com chave `veyrholm-save-${canonVersion}-v1`.
- Snapshot multiplayer em `localStorage` com chave `veyrholm-multiplayer-${canonVersion}-v1`.

## Entidades principais

- `Campaign`: campanha completa, metadados, personagem, cenas, inventario, missoes, NPCs, faccoes e lore central.
- `Scene`: unidade narrativa com corpo, local, capitulo, escolhas, flags e efeitos.
- `Choice`: opcao do jogador com tipo, proxima cena, flags, efeitos e teste opcional.
- `Check`: teste D20 com atributo, dificuldade e resultados por grau.
- `Character`: personagem ativo com vida, fe, atributos, status e titulos.
- `Item`: item de inventario com id, nome, descricao, simbolo, icone e estado equipado opcional.
- `Quest`: missao com status, progresso e marcos.
- `NPC`: personagem conhecido com papel e disposicao.
- `Faction`: faccao com postura e descricao.
- `SaveGame`: estado persistido da sessao.
- `HistoryEvent`: evento textual registrado no diario.

## Tipos de itens

O tipo visual dos itens e derivado por `iconClass`:

- `relic`: reliquias, moedas, selos e objetos especiais.
- `blade`: facas e armas curtas.
- `book`: cartas, codices e livros.
- `ember`: brasa ou item ritual de chama.

O simbolo narrativo e dado por `symbol`, com exemplos como `deadFlame`, `seal`, `maskEye`, `closedEyeComplete`, `memoryTree` e `veilEye`.

## Componentes reutilizaveis

- `HUD`: painel generico de personagem se o novo RPG tiver recursos numericos, atributos e status.
- `Journal`: diario generico para inventario, quests, NPCs e historico.
- `ChoicePanel`: sistema de escolhas e acao livre, adaptavel por `choiceKinds`.
- `DiceRoller`: rolagem D20 com modificadores por atributo.
- `VeyrholmSymbol`: reutilizavel como padrao tecnico de icones SVG; para outro cenario, recomenda-se trocar nomes e desenhos.

