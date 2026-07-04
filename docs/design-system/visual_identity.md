# RPG Engine - Identidade Visual

## Personalidade

RPG Engine deve parecer um instrumento de comando arcano: sofisticado, silencioso, profundo e confiavel. A fantasia aparece como atmosfera, materialidade e linguagem visual, nao como caricatura.

Palavras-chave:

- Elegante
- Noturno
- Editorial
- Tatico
- Arcano
- Denso
- Legivel
- Autoritativo

## Paleta De Cores

### Cores Principais

| Token | Cor | Hex | Uso |
| --- | --- | --- | --- |
| `charcoal.black` | Preto carvao | `#0B0A0C` | Fundo base, navegacao, areas profundas |
| `obsidian.panel` | Obsidiana | `#121015` | Paineis principais, modais, sidebar |
| `dark.parchment` | Pergaminho escuro | `#2A221B` | Superficies secundarias, cards editoriais |
| `aged.gold` | Dourado envelhecido | `#B08A45` | Destaques, bordas ativas, icones nobres |
| `wine.red` | Vermelho vinho | `#6F1D2B` | Acoes criticas, marcadores de conflito, alertas narrativos |
| `arcane.purple` | Roxo arcano | `#5A3E85` | IA, magia, estados sobrenaturais, foco especial |

### Cores De Apoio

| Token | Cor | Hex | Uso |
| --- | --- | --- | --- |
| `ink.text` | Tinta clara | `#E7DDCC` | Texto principal em fundo escuro |
| `muted.text` | Tinta apagada | `#A99B88` | Texto secundario, metadados |
| `line.etched` | Linha entalhada | `#3A3128` | Divisores, bordas discretas |
| `success.herb` | Verde erva escuro | `#3F6B4A` | Sucesso, cura, recursos validos |
| `warning.candle` | Luz de vela | `#D6A84F` | Avisos, pendencias |
| `danger.blood` | Sangue profundo | `#8F2638` | Erros e dano |
| `blue.steel` | Aco azulado | `#384E63` | Conteudo tecnico, regras, documentos |

## Proporcao De Uso

- 60% fundos escuros: preto carvao e obsidiana.
- 20% superficies: pergaminho escuro e placas em camadas.
- 10% texto e linhas: tinta clara, texto apagado, entalhes.
- 10% acentos: dourado, vinho, roxo e estados.

Evitar telas dominadas por roxo ou dourado. O dourado deve parecer raro e precioso; o roxo deve sinalizar magia, IA ou excepcionalidade.

## Tipografia

### Titulos

Usar fonte com aparencia editorial/fantasia, preferencialmente serifada, com bom desenho em caixa alta e numeros elegantes.

Sugestoes:

- Cinzel
- Cormorant Garamond
- EB Garamond
- Spectral

Uso:

- Nome da campanha
- Titulos de tela
- Secoes de destaque
- Capitulos do grimorio
- Nomes de criaturas ou magias

### Texto Longo

Usar fonte altamente legivel em telas escuras.

Sugestoes:

- Inter
- Source Sans 3
- IBM Plex Sans
- Noto Sans

Uso:

- Descricoes
- Regras
- Chat
- Ficha
- Listas
- Formularios

### Codigo, Dados E Metadados

Usar fonte monoespacada apenas para IDs, rolagens, formulas, logs e importacao.

Sugestoes:

- JetBrains Mono
- IBM Plex Mono

## Escala Tipografica

| Estilo | Desktop | Mobile | Uso |
| --- | ---: | ---: | --- |
| Display | 40-48px | 30-34px | Login, nome de campanha, telas vazias nobres |
| H1 | 30-36px | 26-30px | Titulo da tela |
| H2 | 22-26px | 20-22px | Blocos principais |
| H3 | 18-20px | 17-18px | Cards e subpaineis |
| Body | 15-16px | 15-16px | Leitura principal |
| Small | 13-14px | 13px | Metadados |
| Micro | 11-12px | 11px | Badges e timestamps |

Manter letter spacing em `0`. Evitar texto pequeno demais em fundos texturizados.

## Iconografia

Icones devem ser lineares, contidos e funcionais. Usar icones para acoes e categorias, nao ornamentos excessivos.

Direcoes:

- Tracos finos ou medios.
- Cantos levemente arredondados.
- Sem cartoon.
- Preferir simbolos reconheciveis: livro, mapa, dado, escudo, espada, frasco, olho, cadeado, estrela, mensagem, upload, busca.
- Icones magicos podem usar runas abstratas apenas em estados especiais.

## Texturas E Materiais

Usar textura como camada sutil:

- Granulado fino em fundos.
- Marcas cartograficas quase imperceptiveis.
- Bordas com efeito de entalhe.
- Sombras profundas e suaves.
- Superficies que lembram couro escuro, papel envelhecido escuro e metal fosco.

Evitar:

- Pergaminho amarelo claro.
- Textura pesada atras de texto longo.
- Ornamentacao barroca nos cantos.
- Molduras medievais literais.

## Bordas, Raios E Sombras

- Raio padrao: 6px.
- Cards funcionais: 6-8px.
- Inputs e botoes: 6px.
- Modais: 8px.
- Evitar pill shapes, exceto badges pequenos.
- Bordas: `1px solid #3A3128`.
- Sombra baixa: `0 8px 24px rgba(0, 0, 0, 0.28)`.
- Sombra alta: `0 18px 48px rgba(0, 0, 0, 0.42)`.

## Linguagem De Estado

| Estado | Tratamento |
| --- | --- |
| Ativo | Borda dourada, fundo levemente elevado, icone claro |
| Hover | Superficie clareia 4-6%, borda ganha contraste |
| Foco | Anel fino roxo arcano ou dourado, conforme contexto |
| Desabilitado | Opacidade reduzida, sem mudanca cromatica forte |
| Erro | Borda vinho, texto em sangue profundo, icone de alerta |
| Sucesso | Verde erva escuro, mensagem curta |
| Secreto | Cadeado, vinho escuro ou roxo profundo |
| Revelado | Olho aberto, dourado discreto |

## Layout E Composicao

- Grid desktop com sidebar fixa de 240-280px.
- Topbar contextual de 56-72px.
- Area principal com max-width apenas em telas de leitura; dashboards devem ocupar largura total.
- Espacamento base de 8px.
- Paineis em colunas devem alinhar titulos e acoes no topo.
- O conteudo importante deve aparecer acima da dobra em desktop.

## Voz Visual Por Area

- Mestre: mais tatico, denso, com dourado e vinho.
- Jogador: mais pessoal, com foco em personagem, recursos e progresso.
- IA: roxo arcano, brilho contido, area de resposta bem diferenciada.
- Biblioteca e regras: aco azulado, layout editorial e busca forte.
- Combate: vinho, dourado e indicadores de turno muito claros.
