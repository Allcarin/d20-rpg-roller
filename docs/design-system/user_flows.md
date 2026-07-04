# RPG Engine - Fluxos De Usuario

## Fluxo 1: Primeiro Acesso E Criacao De Campanha

1. Usuario acessa Login.
2. Entra ou cria conta.
3. Cai em Selecao de Campanha.
4. Clica em "Criar campanha".
5. Define nome, sistema, tom, permissões e jogadores.
6. Acessa Dashboard do Mestre.
7. Ve checklist inicial: convidar jogadores, importar regras, criar primeira sessao, criar personagens.

Pontos de UX:

- Nao exigir configuracao completa antes de entrar no dashboard.
- Permitir campanha em rascunho.
- Oferecer importacao de PDF e criacao manual como caminhos equivalentes.

## Fluxo 2: Jogador Entra Em Campanha

1. Jogador recebe convite.
2. Faz login.
3. Aceita convite em Selecao de Campanha.
4. Cria ou vincula personagem.
5. Acessa Dashboard do Jogador.
6. Consulta ficha, diario e chat.

Pontos de UX:

- Deixar claro o papel do usuario na campanha.
- Mostrar o que ainda depende de aprovacao do Mestre.
- Evitar expor ferramentas do Mestre.

## Fluxo 3: Mestre Prepara Uma Sessao

1. Mestre abre Dashboard do Mestre.
2. Consulta pendencias da campanha.
3. Abre Diario de Sessao anterior.
4. Usa IA para resumir pendencias e sugerir ganchos.
5. Cria ou edita NPCs, locais e encontros.
6. Marca informacoes como secretas ou revelaveis.
7. Agenda ou inicia sessao.

Pontos de UX:

- Acoes de preparacao devem estar no primeiro viewport.
- Conteudo secreto precisa de indicadores fortes.
- IA deve sempre permitir aplicar resultado em entidades reais.

## Fluxo 4: Consulta Rapida Durante A Sessao

1. Mestre esta no Dashboard ou Combate.
2. Usa busca global.
3. Digita nome de regra, NPC, magia ou item.
4. Resultado aparece agrupado por tipo.
5. Abre detalhe em drawer sem perder a tela atual.
6. Pode fixar ou compartilhar com jogadores.

Pontos de UX:

- Busca deve ser rapida e acessivel por teclado.
- Drawer evita perda de contexto.
- Compartilhar deve confirmar visibilidade.

## Fluxo 5: Combate Completo

1. Mestre cria encontro ou inicia combate rapido.
2. Adiciona personagens e criaturas.
3. Rola ou define iniciativa.
4. Avanca turnos.
5. Aplica dano, cura e condicoes.
6. Consulta statblocks e regras em drawers.
7. Encerra combate.
8. App salva resumo no Diario de Sessao.

Pontos de UX:

- Turno atual deve ser inequivoco.
- Controles de dano/cura precisam ser acessiveis com poucos cliques.
- Log deve ser claro, filtravel e reaproveitavel.

## Fluxo 6: Importacao De PDF Para Compendio

1. Mestre abre Importador de PDFs.
2. Arrasta arquivo para dropzone.
3. Sistema processa paginas e detecta entidades.
4. Mestre revisa extracoes.
5. Resolve duplicatas e erros.
6. Define origem e visibilidade.
7. Publica entidades no Compendio.

Pontos de UX:

- Processamento deve ter status transparente.
- Revisao deve separar aprovados, duvidosos e rejeitados.
- Publicacao deve preservar fonte e pagina quando possivel.

## Fluxo 7: Jogador Atualiza Ficha

1. Jogador abre Dashboard do Jogador.
2. Acessa Ficha de Personagem.
3. Atualiza HP, recurso ou item.
4. Se a campanha exigir, mudanca entra como pendente.
5. Mestre recebe aviso.
6. Mestre aprova ou ajusta.

Pontos de UX:

- Separar mudancas livres de mudancas que exigem aprovacao.
- Mostrar historico para evitar conflitos.
- Manter feedback imediato ao jogador.

## Fluxo 8: Registro De Sessao

1. Mestre inicia ou abre Diario de Sessao.
2. Registra blocos durante a sessao.
3. Marca cada bloco como publico, secreto ou privado.
4. Chat, combate e rolagens podem gerar entradas automaticas.
5. IA gera resumo preliminar.
6. Mestre revisa e publica resumo para jogadores.

Pontos de UX:

- Blocos precisam ter permissao individual.
- Publicar resumo deve ser uma acao explicita.
- Entradas automaticas devem ser editaveis antes da publicacao.

## Fluxo 9: Uso Da IA Com Contexto

1. Usuario abre Painel de IA.
2. Escolhe contexto: campanha, personagem, regras, PDF ou sessao.
3. Digita pedido.
4. IA responde em formato estruturado.
5. Usuario escolhe aplicar: criar entidade, inserir no diario, copiar para chat ou salvar como nota.

Pontos de UX:

- Contexto selecionado deve ficar visivel.
- Resultados precisam de acoes diretas.
- IA de jogador nao pode acessar segredos.

## Fluxo 10: Revelar Informacao Aos Jogadores

1. Mestre abre entidade, diario, regra ou item.
2. Clica em controle de visibilidade.
3. Escolhe publico alvo: todos, jogador especifico, personagem especifico.
4. Confirma revelacao.
5. Jogadores recebem atualizacao no dashboard/chat.
6. Entidade mostra historico de revelacao.

Pontos de UX:

- Revelacao deve ser reversivel apenas quando fizer sentido.
- Mostrar claramente diferenca entre privado, secreto e revelado.
- Registrar quem revelou, quando e para quem.

## Fluxo 11: Compendio Como Fonte Central

1. Usuario abre Banco de Dados/Compendio.
2. Filtra colecao ou usa busca.
3. Abre entidade.
4. Ve relacionamentos, origem e permissões.
5. Linka entidade a diario, personagem, combate ou regra.
6. Atualizacao se reflete em telas relacionadas.

Pontos de UX:

- Relacionamentos sao parte central do produto.
- Edicao deve preservar historico e fonte.
- Duplicatas devem ser detectadas e mescladas.

## Fluxo 12: Mobile De Consulta

1. Usuario abre app no celular.
2. Ve dashboard simplificado.
3. Acessa ficha, chat, diario ou busca.
4. Realiza acoes curtas: rolar dados, mandar mensagem, atualizar recurso.
5. Operacoes complexas sao direcionadas para desktop.

Pontos de UX:

- Mobile nao deve tentar replicar todos os paineis desktop.
- Priorizar toque, leitura e contexto imediato.
- Sidebar vira bottom navigation ou menu compacto.
