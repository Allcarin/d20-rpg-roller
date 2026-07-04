# PLAYBOOK CANÔNICO

## As Cinzas de Veyrholm

Este projeto deve seguir o cânone da campanha “As Cinzas de Veyrholm”.

## Regra principal

A bíblia de campanha é fonte de verdade. Nenhum componente, mock, gerador ou função narrativa pode criar lore que contradiga a bíblia.

## Cânone obrigatório

Protagonista:

* Allcarin.
* Acólito da Chama Morta.
* A Chave.
* Fragmento de Elyr.

Entidade central:

* O Andarilho.
* Ele devora memórias, nomes e identidades.
* Ele não é demônio comum, monstro comum ou deus genérico.

Mitologia central:

* Elyr fechou a Primeira Ruptura.
* Ao fazer isso, trouxe parte do Andarilho dentro de si.
* Elyr se dividiu para aprisionar o Andarilho.
* Os três fragmentos são:

  * Chave: memórias.
  * Guardião: dever.
  * Rei: peso.

Personagens canônicos:

* Allcarin.
* Elyr.
* Aster, o Guardião.
* Nariel.
* Maelis.
* Serah.
* Lysandra.
* O Rei.
* O Andarilho.

Facções canônicas:

* Os Sete.
* Portadores das Cinzas.
* Caçadores do Véu.
* Filhos da Estrela Negra.

Locais canônicos:

* Veyrholm.
* Gravenfall.
* Elyr’s Rest.
* Vhal-Kar.
* Sepultura.
* Primeiro Descanso.
* Santuário das Raízes.
* Câmara da Escolha.

Sistema:

* Vida.
* Fé.
* D20.
* Relíquias.
* Missões.
* NPCs.
* Facções.
* Bestiário.
* Linha do tempo.

## Proibido

Não criar:

* outro protagonista principal sem autorização;
* outra origem para Elyr;
* outra origem para o Andarilho;
* outra explicação para Chave, Guardião e Rei;
* facções substitutas para as facções canônicas;
* loops narrativos sem progressão;
* cenas que voltam para a mesma cena sem intenção clara;
* história paralela como campanha principal.

## Estrutura obrigatória de cenas

Cada cena deve ter:

* id único;
* título;
* capítulo;
* local;
* texto narrativo;
* escolhas;
* efeitos opcionais;
* próxima cena.

Cada escolha deve ter:

* id;
* texto;
* tipo;
* `nextSceneId` válido ou ação livre.

Tipos possíveis:

* comum;
* teste;
* perigosa;
* espiritual;
* investigação;
* combate;
* diálogo.

## Validação obrigatória

Sempre que alterar cenas:

* verificar se todos os `nextSceneId` existem;
* verificar se nenhuma cena ficou órfã;
* verificar se escolhas não retornam para a própria cena sem intenção;
* verificar se a campanha ativa é `ashes-of-veyrholm`.

## Campanhas futuras

Campanhas futuras podem acontecer:

* antes da Primeira Ruptura;
* durante os 800 anos;
* depois da Escolha.

Mas a campanha padrão do app deve ser a jornada de Allcarin.
