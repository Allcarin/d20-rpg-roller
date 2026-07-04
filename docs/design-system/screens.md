# RPG Engine - Especificacoes De Telas

## Login

### Objetivo

Permitir entrada segura no RPG Engine e estabelecer imediatamente o tom visual de grimorio digital.

### Componentes Visuais

- Fundo escuro com textura sutil de couro, mapa ou papel queimado.
- Marca RPG Engine em tipografia editorial.
- Formulario central compacto.
- Campos de email e senha.
- Botao primario "Entrar".
- Links para recuperar senha e criar conta.
- Opcao de continuar com provedor externo, se existir.

### Hierarquia

1. Marca e atmosfera.
2. Formulario de acesso.
3. Recuperacao/criacao de conta.
4. Mensagens de erro ou seguranca.

### Acoes Principais

- Entrar.
- Criar conta.
- Recuperar senha.
- Alternar visibilidade da senha.

### Estados Vazios

- Campos vazios mostram placeholders claros.
- Erro de login exibe mensagem curta sem quebrar layout.

### Permissoes Mestre/Jogador

Nao ha diferenca antes da autenticacao. Apos login, o usuario e direcionado para a ultima campanha ou para selecao de campanha.

## Selecao De Campanha

### Objetivo

Permitir que o usuario escolha, crie ou retome uma campanha.

### Componentes Visuais

- Grid de cards de campanha.
- Card com nome, sistema, papel do usuario, ultima sessao, participantes e status.
- Busca e filtros: Mestre, Jogador, arquivadas, recentes.
- Botao "Criar campanha".
- Convites pendentes.

### Hierarquia

1. Campanhas recentes.
2. Convites e campanhas ativas.
3. Busca/filtros.
4. Campanhas arquivadas.

### Acoes Principais

- Abrir campanha.
- Criar campanha.
- Aceitar convite.
- Arquivar ou sair de campanha.

### Estados Vazios

- Sem campanhas: mostrar chamada "Crie sua primeira campanha" e acao primaria.
- Sem resultados: sugerir limpar filtros.

### Permissoes Mestre/Jogador

- Mestre pode criar, arquivar, editar configuracoes e convidar jogadores.
- Jogador pode abrir campanhas onde participa, aceitar convites e sair quando permitido.

## Dashboard Do Mestre

### Objetivo

Oferecer uma central de comando para preparar, conduzir e monitorar a campanha.

### Componentes Visuais

- Header com nome da campanha, sistema, proxima sessao e status.
- Cards de resumo: jogadores, ganchos, NPCs, locais, encontros, pendencias.
- Linha do tempo de sessoes.
- Painel "Preparacao da sessao".
- Painel "Segredos e revelacoes".
- Atalhos para combate, IA, importador e compendio.
- Feed de atividade.

### Hierarquia

1. Estado da campanha e proxima sessao.
2. Preparacao imediata.
3. Alertas e pendencias.
4. Entidades recentes.
5. Atalhos de criacao.

### Acoes Principais

- Iniciar sessao.
- Criar encontro.
- Criar NPC/local/item.
- Abrir painel de IA.
- Revelar informacao aos jogadores.
- Importar PDF.

### Estados Vazios

- Campanha nova: checklist de preparacao inicial.
- Sem jogadores: acao para convidar.
- Sem sessao planejada: acao para agendar ou criar diario.

### Permissoes Mestre/Jogador

- Exclusivo do Mestre.
- Jogadores nao acessam segredos, preparacao privada ou controles de revelacao.

## Dashboard Do Jogador

### Objetivo

Dar ao jogador uma visao clara do seu personagem, proxima sessao e informacoes liberadas.

### Componentes Visuais

- Header com campanha e personagem ativo.
- Card de status do personagem: HP, recursos, condicoes, nivel, classe.
- Proxima sessao.
- Ultimas revelacoes.
- Atalhos para ficha, inventario, magias, diario e chat.
- Feed de mensagens ou atividades recentes.

### Hierarquia

1. Personagem ativo e status atual.
2. Proxima sessao ou sessao em andamento.
3. Atualizacoes relevantes.
4. Atalhos pessoais.

### Acoes Principais

- Abrir ficha.
- Enviar mensagem no chat.
- Atualizar recursos permitidos.
- Consultar diario.
- Ver itens ou magias.

### Estados Vazios

- Sem personagem: acao "Criar personagem" ou "Solicitar personagem ao Mestre".
- Sem revelacoes: mostrar mensagem neutra e link para diario.

### Permissoes Mestre/Jogador

- Jogador ve apenas conteudo liberado.
- Mestre pode visualizar como jogador para auditar permissões.

## Ficha De Personagem

### Objetivo

Centralizar atributos, recursos, historico, condicoes e dados mecanicos do personagem.

### Componentes Visuais

- Header com nome, retrato, classe, nivel e jogador.
- Tabs: Visao geral, Atributos, Pericias, Combate, Inventario, Magias, Notas.
- Blocos de atributos e modificadores.
- Recursos rastreaveis: HP, mana, slots, inspiracao, condicoes.
- Area de notas e historia.
- Historico de alteracoes.

### Hierarquia

1. Identidade e estado atual.
2. Dados usados em sessao.
3. Dados mecanicos detalhados.
4. Historia e notas.

### Acoes Principais

- Editar ficha.
- Rolar atributo/pericia.
- Atualizar HP e recursos.
- Adicionar condicao.
- Exportar ou duplicar personagem.

### Estados Vazios

- Ficha incompleta: checklist de campos essenciais.
- Sem notas: acao para adicionar historia.

### Permissoes Mestre/Jogador

- Jogador edita a propria ficha conforme regras da campanha.
- Mestre pode editar, bloquear campos, aprovar mudancas e ver notas privadas.

## Inventario

### Objetivo

Gerenciar itens, equipamentos, cargas, moedas e objetos narrativos.

### Componentes Visuais

- Tabela/lista de itens.
- Filtros por categoria, raridade, equipado, consumivel, magico.
- Resumo de peso/carga e moedas.
- Card de item selecionado com descricao.
- Badges de item secreto, amaldiçoado, identificado ou compartilhado.

### Hierarquia

1. Itens equipados e recursos criticos.
2. Inventario completo.
3. Detalhes do item.
4. Historico de transacoes.

### Acoes Principais

- Adicionar item.
- Equipar/desequipar.
- Consumir.
- Transferir para outro personagem.
- Identificar item.
- Dividir tesouro.

### Estados Vazios

- Sem itens: acao "Adicionar primeiro item".
- Sem resultado de filtro: sugerir limpar filtros.

### Permissoes Mestre/Jogador

- Jogador gerencia itens permitidos do proprio personagem.
- Mestre cria itens secretos, aprova transferencias e revela propriedades ocultas.

## Grimorio/Magias

### Objetivo

Organizar magias, poderes, rituais, habilidades especiais e preparacoes.

### Componentes Visuais

- Lista de magias por circulo/nível/escola.
- Filtros por classe, componente, alcance, concentracao e preparado.
- Card de magia com descricao, custo, tempo, duracao e efeitos.
- Indicador de slots ou recursos.
- Area de magias preparadas/favoritas.

### Hierarquia

1. Magias preparadas e recursos disponiveis.
2. Busca e filtros.
3. Lista completa.
4. Detalhe da magia.

### Acoes Principais

- Preparar/despreparar magia.
- Conjurar ou registrar uso.
- Adicionar magia customizada.
- Compartilhar magia com personagem.
- Consultar regras relacionadas.

### Estados Vazios

- Sem magias: acao "Adicionar magia".
- Sem preparadas: destacar lista de magias conhecidas.

### Permissoes Mestre/Jogador

- Jogador gerencia magias do proprio personagem.
- Mestre pode adicionar magias ao compendio, restringir fontes e revisar homebrew.

## Bestiario

### Objetivo

Catalogar criaturas, NPCs hostis, encontros e variantes de monstros.

### Componentes Visuais

- Lista/tabela de criaturas.
- Filtros por tipo, bioma, nivel/desafio, faccao e origem.
- Card de criatura com estatisticas, habilidades, lore e tokens.
- Badges: oficial, homebrew, secreto, revelado.
- Acoes rapidas para adicionar ao combate.

### Hierarquia

1. Busca e filtros.
2. Criaturas recentes ou favoritas.
3. Lista principal.
4. Detalhe e acoes de encontro.

### Acoes Principais

- Criar criatura.
- Editar statblock.
- Adicionar ao combate.
- Duplicar variante.
- Revelar informacao aos jogadores.

### Estados Vazios

- Sem criaturas: acao para criar ou importar de PDF.
- Sem filtros: oferecer remover filtros.

### Permissoes Mestre/Jogador

- Mestre ve e edita tudo.
- Jogador ve apenas criaturas reveladas ou registradas como conhecimento do grupo.

## Biblioteca De Regras

### Objetivo

Permitir consulta rapida e leitura confortavel de regras, sistemas, excecoes e decisoes da mesa.

### Componentes Visuais

- Busca proeminente.
- Categorias por sistema, combate, magia, equipamentos, condicoes, homebrew.
- Painel de leitura com sumario.
- Blocos de regra relacionados.
- Indicador de origem: oficial, mesa, PDF, IA revisada.

### Hierarquia

1. Busca.
2. Categorias e filtros.
3. Resultado ou artigo de regra.
4. Relacionados e notas do Mestre.

### Acoes Principais

- Buscar regra.
- Favoritar.
- Criar regra da mesa.
- Linkar regra a item/magia/encontro.
- Sugerir revisao com IA.

### Estados Vazios

- Sem regras importadas: acao "Importar PDF" ou "Criar regra".
- Busca sem resultado: acao para criar entrada.

### Permissoes Mestre/Jogador

- Jogador acessa regras liberadas.
- Mestre acessa notas privadas, homebrew em rascunho e controle de visibilidade.

## Combate/Iniciativa

### Objetivo

Conduzir encontros com ordem de turno, status, rolagens, condicoes e referencias rapidas.

### Componentes Visuais

- Tracker de iniciativa em coluna fixa.
- Participante ativo destacado.
- Painel central com detalhes do alvo/turno.
- Painel lateral com rolagens, condicoes e notas.
- Acoes de turno: proximo, atrasar, preparar, encerrar.
- Resumo de rodada e log de combate.

### Hierarquia

1. Turno atual.
2. Ordem de iniciativa.
3. Acoes imediatas.
4. Status dos participantes.
5. Log e referencias.

### Acoes Principais

- Iniciar combate.
- Adicionar/remover participante.
- Avancar turno.
- Aplicar dano/cura.
- Aplicar condicao.
- Rolar iniciativa.
- Encerrar combate e salvar resumo.

### Estados Vazios

- Sem combate ativo: acao "Criar encontro" ou "Iniciar combate rapido".
- Sem participantes: acao para adicionar personagens/criaturas.

### Permissoes Mestre/Jogador

- Mestre controla iniciativa, criaturas e estado global.
- Jogador ve turno, status permitido e pode rolar/atualizar dados autorizados.

## Diario De Sessao

### Objetivo

Registrar eventos, decisoes, pistas, resumos, recompensas e pendencias de cada sessao.

### Componentes Visuais

- Lista de sessoes por data.
- Editor de diario com titulo, participantes, resumo e blocos.
- Marcadores: pista, combate, NPC, local, tesouro, segredo, decisao.
- Controle de visibilidade por bloco.
- Sugestao de resumo por IA.

### Hierarquia

1. Sessao atual ou mais recente.
2. Resumo publico.
3. Notas privadas do Mestre.
4. Pistas e pendencias.
5. Historico.

### Acoes Principais

- Criar entrada de sessao.
- Editar resumo.
- Marcar bloco como secreto/revelado.
- Gerar resumo com IA.
- Linkar entidades.

### Estados Vazios

- Sem sessoes: acao "Criar primeiro diario".
- Sessao sem conteudo: templates de resumo, eventos e recompensas.

### Permissoes Mestre/Jogador

- Mestre cria e controla visibilidade.
- Jogador pode ler conteudo revelado e, se permitido, adicionar notas pessoais.

## Chat Da Mesa

### Objetivo

Concentrar mensagens da campanha, rolagens, avisos, conversas em personagem e comunicados.

### Componentes Visuais

- Lista de canais: mesa, off-topic, privado, combate, avisos.
- Feed de mensagens.
- Composer com anexos, rolagem de dados e mencoes.
- Badges para rolagens publicas/privadas.
- Pins e mensagens importantes.

### Hierarquia

1. Canal ativo.
2. Mensagens recentes.
3. Composer.
4. Canais e participantes.
5. Pins/contexto.

### Acoes Principais

- Enviar mensagem.
- Rolar dados.
- Mencionar usuario/personagem.
- Fixar mensagem.
- Enviar mensagem privada.

### Estados Vazios

- Canal sem mensagens: texto curto e acao para iniciar conversa.
- Sem participantes online: mostrar status da mesa.

### Permissoes Mestre/Jogador

- Mestre modera canais, cria avisos e ve logs administrativos.
- Jogador participa dos canais liberados e mensagens privadas permitidas.

## Painel De IA Assistente

### Objetivo

Auxiliar Mestre e jogadores com geracao, resumo, consulta, transformacao e organizacao de conteudo.

### Componentes Visuais

- Painel lateral ou tela dedicada.
- Seletor de contexto: campanha, sessao, personagem, regras, PDFs.
- Campo de prompt.
- Respostas estruturadas com acoes.
- Historico de prompts.
- Indicador de fonte/contexto usado.

### Hierarquia

1. Tarefa atual.
2. Contexto selecionado.
3. Prompt e resposta.
4. Acoes de aplicar resultado.
5. Historico.

### Acoes Principais

- Gerar NPC, local, encontro, item ou resumo.
- Explicar regra.
- Resumir PDF ou sessao.
- Inserir resultado no diario/compendio.
- Criar entidade a partir da resposta.

### Estados Vazios

- Sem conversa: mostrar sugestoes de tarefas uteis.
- Sem contexto selecionado: permitir pergunta geral, mas recomendar adicionar contexto.

### Permissoes Mestre/Jogador

- Mestre usa IA com acesso a segredos e documentos privados.
- Jogador usa IA apenas com contexto liberado e dados proprios.
- Resultados gerados nao devem revelar conteudo secreto por inferencia.

## Importador De PDFs

### Objetivo

Importar livros, aventuras, suplementos e documentos para extrair regras, entidades e referencias pesquisaveis.

### Componentes Visuais

- Dropzone de upload.
- Lista de arquivos importados.
- Status de processamento.
- Preview de paginas.
- Entidades detectadas: regras, monstros, itens, magias, locais.
- Tela de revisao e resolucao de conflitos.

### Hierarquia

1. Upload e status.
2. Arquivos recentes.
3. Resultados extraidos.
4. Revisao manual.
5. Publicacao no compendio.

### Acoes Principais

- Importar PDF.
- Revisar extracoes.
- Aprovar entidades.
- Corrigir metadados.
- Publicar no compendio.
- Definir visibilidade.

### Estados Vazios

- Nenhum PDF: dropzone central e explicacao curta.
- Falha de importacao: erro claro, reprocessar e baixar log.

### Permissoes Mestre/Jogador

- Mestre importa, revisa e publica.
- Jogador acessa PDFs e extracoes apenas se liberados.

## Banco De Dados/Compendio

### Objetivo

Ser o repositorio central de entidades da campanha e do sistema: regras, personagens, itens, magias, criaturas, locais, faccoes e documentos.

### Componentes Visuais

- Busca global interna.
- Navegacao por colecoes.
- Tabela densa com filtros.
- Visualizacao em card para entidades narrativas.
- Drawer de detalhes.
- Tags, fontes e permissoes.
- Relacionamentos entre entidades.

### Hierarquia

1. Busca e colecoes.
2. Filtros.
3. Resultados.
4. Detalhe.
5. Relacionamentos e historico.

### Acoes Principais

- Criar entidade.
- Editar entidade.
- Importar/exportar.
- Linkar entidades.
- Alterar visibilidade.
- Mesclar duplicatas.

### Estados Vazios

- Compendio vazio: acoes para importar PDF, criar entidade ou usar template.
- Colecao vazia: acao especifica para criar item daquela colecao.

### Permissoes Mestre/Jogador

- Mestre gerencia todas as colecoes e visibilidades.
- Jogador ve apenas entidades liberadas, proprias ou publicas da campanha.
