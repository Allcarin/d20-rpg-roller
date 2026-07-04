# RPG Engine - Componentes De UI

## Fundamentos

Os componentes devem combinar densidade operacional com atmosfera dark fantasy. Cada elemento precisa ser funcional antes de ornamental. Bordas, sombras, iconografia e cor devem criar a sensacao de uma mesa de comando arcana.

## Shell Da Aplicacao

### Sidebar Principal

Uso: navegacao entre areas.

Especificacao:

- Largura desktop: 256px.
- Fundo obsidiana.
- Logo/nome da campanha no topo.
- Itens com icone, label e badge opcional.
- Estado ativo com barra lateral dourada e fundo ligeiramente elevado.
- Agrupar areas: Campanha, Personagens, Regras, Mesa, Sistema.

Permissoes:

- Mestre ve ferramentas de preparacao, compendio, IA e importador.
- Jogador ve areas liberadas e dados pessoais.

### Topbar Contextual

Uso: contexto da tela e acoes globais.

Elementos:

- Breadcrumb curto.
- Busca global.
- Seletor de campanha.
- Indicadores de sessao ativa.
- Avatar/perfil.
- Botao de notificacoes.

### Workspace

Uso: area principal.

Padroes:

- Dashboard: layout em grid responsivo.
- Leitura: coluna principal com sumario lateral.
- Ferramentas: duas ou tres colunas com paineis redimensionaveis.

## Navegacao

### Tabs

Uso: alternar subareas dentro da mesma entidade.

Exemplos:

- Ficha: Atributos, Pericias, Inventario, Magias, Notas.
- Campanha: Visao geral, Sessoes, NPCs, Locais, Segredos.

Visual:

- Linha inferior fina.
- Tab ativa em dourado envelhecido.
- Evitar tabs grandes em formato de card.

### Breadcrumb

Uso: indicar profundidade.

Exemplo:

`Campanhas / Veyrholm / Bestiario / A Noiva de Cinzas`

Visual:

- Texto pequeno.
- Separadores discretos.
- Ultimo item em tinta clara.

## Botoes

### Primario

Uso: acao principal da tela.

Visual:

- Fundo dourado envelhecido.
- Texto preto carvao.
- Hover com brilho quente contido.

Exemplos:

- Criar campanha
- Iniciar combate
- Importar PDF
- Salvar ficha

### Secundario

Uso: acoes auxiliares.

Visual:

- Fundo transparente ou obsidiana.
- Borda entalhada.
- Texto tinta clara.

### Perigoso

Uso: apagar, remover, encerrar sessao, revelar segredo irreversivel.

Visual:

- Fundo vinho ou borda vinho.
- Confirmacao obrigatoria.

### Icon Button

Uso: acoes compactas.

Icones sugeridos:

- Busca
- Filtro
- Editar
- Arquivar
- Revelar
- Ocultar
- Download
- Upload
- Fixar

Sempre incluir tooltip.

## Inputs E Formularios

### Campo De Texto

- Fundo `#121015`.
- Borda `#3A3128`.
- Texto `#E7DDCC`.
- Placeholder `#A99B88`.
- Foco com anel roxo ou dourado.

### Textarea Editorial

Uso: notas, diario, descricoes de mundo.

Especificacao:

- Altura minima generosa.
- Toolbar opcional para markdown/rich text.
- Contador discreto quando houver limite.

### Select

Uso: sistemas, classes, status, tags, permissao.

Visual:

- Menu escuro.
- Opcao ativa com fundo pergaminho escuro.
- Check discreto.

### Busca Global

Uso: localizar entidades, regras, personagens, PDFs, mensagens e notas.

Estados:

- Vazio: sugestoes recentes.
- Digitando: resultados agrupados por categoria.
- Sem resultado: oferecer criar entrada ou importar fonte.

## Cards E Paineis

### Card De Entidade

Uso: campanha, personagem, NPC, monstro, magia, item.

Elementos:

- Titulo editorial.
- Metadados.
- Badges.
- Ultima atualizacao.
- Acoes rápidas.

Visual:

- Fundo obsidiana ou pergaminho escuro.
- Borda fina.
- Raio 6px.

### Painel De Comando

Uso: dashboards e combate.

Elementos:

- Header com titulo e acoes.
- Conteudo denso.
- Footer opcional com estado.

### Painel De Leitura

Uso: regras, diario, PDFs e compendio.

Especificacao:

- Largura confortavel para leitura.
- Sumario lateral.
- Destaques e citacoes com borda dourada discreta.

## Tabelas E Listas

### Tabela Densa

Uso: compendio, inventario, combate, biblioteca.

Elementos:

- Cabecalho fixo.
- Ordenacao.
- Filtros.
- Linhas com hover.
- Acoes no fim da linha.

### Lista De Registro

Uso: diario, chat, logs de combate.

Visual:

- Agrupamento por data ou sessao.
- Timestamps discretos.
- Marcadores para eventos importantes.

## Badges

Tipos:

- Secreto
- Revelado
- Privado
- Compartilhado
- Homebrew
- Oficial
- IA
- Em combate
- Preparado
- Arquivado

Visual:

- Altura 20-24px.
- Texto micro.
- Formato levemente arredondado.
- Cores sem saturacao excessiva.

## Modais E Drawers

### Modal

Uso: confirmacoes, criacao curta, edicao pontual.

Especificacao:

- Max-width: 520-720px.
- Fundo obsidiana.
- Overlay preto com opacidade alta.
- Acoes no rodape.

### Drawer Lateral

Uso: detalhes sem sair da tela.

Exemplos:

- Ver monstro durante combate.
- Consultar regra.
- Abrir item de inventario.
- Revisar sugestao da IA.

## Estados Vazios

Estados vazios devem ser especificos e acionaveis.

Exemplos:

- "Nenhuma campanha criada" com acao "Criar campanha".
- "Nenhum PDF importado" com acao "Importar primeiro PDF".
- "Nenhuma magia preparada" com acao "Adicionar magia".

Evitar ilustração grande demais. Usar simbolo pequeno, titulo claro e uma frase curta.

## Permissoes E Visibilidade

### Indicadores

- Cadeado: privado ou secreto.
- Olho: revelado aos jogadores.
- Grupo: compartilhado com a mesa.
- Coroa ou chave: exclusivo do Mestre.

### Padroes

- Conteudo secreto nunca deve aparecer por acidente em dashboards de jogador.
- Conteudo revelado deve exibir quem revelou e quando.
- Edicoes do Jogador podem exigir aprovacao do Mestre dependendo da campanha.

## Componentes Especificos

### Dice Roller

Elementos:

- Expressao de rolagem.
- Botao rolar.
- Resultado principal grande.
- Historico compacto.
- Indicador publico/privado.

### Initiative Tracker

Elementos:

- Lista ordenada por turno.
- Destaque do participante ativo.
- HP, condicoes, defesa e notas rapidas.
- Acoes: proximo turno, atrasar, remover, adicionar criatura.

### AI Assistant Panel

Elementos:

- Campo de prompt.
- Contexto selecionado.
- Resposta estruturada.
- Acoes: inserir em diario, criar NPC, criar encontro, resumir, revelar.
- Aviso de conteudo baseado em fontes quando aplicavel.

### PDF Import Card

Elementos:

- Nome do arquivo.
- Status de processamento.
- Paginas detectadas.
- Entidades extraidas.
- Conflitos e revisao.

### Rule Reference Block

Elementos:

- Titulo da regra.
- Sistema/origem.
- Texto principal.
- Links relacionados.
- Permissao de visibilidade.
