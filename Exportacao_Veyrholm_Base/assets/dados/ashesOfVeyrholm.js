const emptyEffects = Object.freeze([]);

// Toda alteracao narrativa neste arquivo deve seguir o PLAYBOOK.md da raiz.
export const CANONICAL_CAMPAIGN_ID = 'ashes-of-veyrholm';

function createChoice({
  id,
  label,
  nextSceneId,
  kind = 'common',
  effects = emptyEffects,
  flagsRequired = emptyEffects,
  flagsSet = emptyEffects,
  check = null,
  action = 'scene',
}) {
  return {
    id,
    label,
    kind,
    effects,
    flagsRequired,
    flagsSet,
    nextSceneId: nextSceneId ?? null,
    check,
    action,
  };
}

function createScene({
  id,
  chapter,
  title,
  location,
  body,
  choices = emptyEffects,
  effects = emptyEffects,
  flagsRequired = emptyEffects,
  flagsSet = emptyEffects,
  nextSceneId = null,
  freeActionResponse,
}) {
  return {
    id,
    chapter,
    title,
    location,
    body,
    choices,
    effects,
    flagsRequired,
    flagsSet,
    nextSceneId,
    freeActionResponse,
  };
}

function createCheck({ attribute, reason, success, failure, failureEffects = emptyEffects }) {
  return {
    attribute,
    difficulty: 10,
    reason,
    outcomes: {
      criticalSuccess: {
        body: `${success} Por um instante, a memoria do mundo se abre sem resistencia.`,
        summary: 'Sucesso critico: a verdade se revela com clareza excepcional.',
        effects: [{ type: 'faith', amount: 2 }],
      },
      success: {
        body: success,
        summary: 'Sucesso: Allcarin preserva a propria vontade diante da revelacao.',
        effects: emptyEffects,
      },
      failure: {
        body: failure,
        summary: 'Falha: a revelacao avanca, mas deixa um custo em Allcarin.',
        effects: failureEffects,
      },
      criticalFailure: {
        body: `${failure} O Andarilho percebe a abertura e algo essencial vacila.`,
        summary: 'Falha critica: o contato deixa uma marca profunda.',
        effects: [...failureEffects, { type: 'faith', amount: -5 }],
      },
    },
  };
}

const councilChoices = [
  createChoice({
    id: 'carry-truth-to-council',
    label: 'Levar esta verdade ao conselho dos fragmentos',
    nextSceneId: 'council-of-fragments',
    kind: 'spiritual',
    flagsSet: ['truth_carried_to_council'],
  }),
  createChoice({
    id: 'ask-elyr-to-witness',
    label: 'Pedir que Elyr testemunhe diante de todos',
    nextSceneId: 'council-of-fragments',
    kind: 'investigation',
    flagsSet: ['elyr_will_testify'],
  }),
  createChoice({
    id: 'stand-with-aster',
    label: 'Permanecer ao lado de Aster durante a decisao',
    nextSceneId: 'council-of-fragments',
    kind: 'common',
    flagsSet: ['aster_supported'],
  }),
  createChoice({
    id: 'watch-lysandra-and-king',
    label: 'Observar a tensao entre Lysandra e o Rei',
    nextSceneId: 'council-of-fragments',
    kind: 'investigation',
    flagsSet: ['lysandra_observed'],
  }),
  createChoice({
    id: 'preserve-silence',
    label: 'Guardar silencio para que nenhuma voz seja esquecida',
    nextSceneId: 'council-of-fragments',
    kind: 'spiritual',
    flagsSet: ['silence_preserved'],
  }),
];

const scenes = [
  createScene({
    id: 'beyond-choice-revelation',
    chapter: 'Capitulo Atual - A Escolha',
    title: 'Quem Ficara Inteiro',
    location: 'Alem da Camara da Escolha',
    body:
      'Sob a arvore dourada, Elyr termina sua revelacao. Ele nao se dividiu para sobreviver: dividiu-se para aprisionar o Andarilho. Allcarin carrega as memorias como a Chave; Aster carrega o dever como o Guardiao; o Rei, desperto em Lysandra, carrega o peso. Maelis e Serah permanecem junto ao lago de lembrancas enquanto as estrelas do ceu impossivel se apagam uma a uma. O verdadeiro Andarilho encontrou o caminho. A pergunta ja nao e se Elyr deve voltar, mas quem ficara inteiro quando a ausencia chegar.',
    choices: [
      createChoice({
        id: 'question-elyr',
        label: 'Perguntar a Elyr o que ele ainda nao revelou',
        nextSceneId: 'elyr-final-testimony',
        kind: 'investigation',
        flagsSet: ['elyr_questioned'],
      }),
      createChoice({
        id: 'use-echo-of-ashes',
        label: 'Usar Eco das Cinzas sobre a memoria da divisao',
        nextSceneId: 'echo-of-the-division',
        kind: 'spiritual',
        check: createCheck({
          attribute: 'fe sombria',
          reason: 'atravessar as memorias de Elyr sem confundi-las com as suas',
          success:
            'O Eco das Cinzas mostra Elyr diante da Primeira Ruptura e confirma que a divisao foi um selo, nao uma coroacao.',
          failure:
            'As memorias de Allcarin e Elyr se sobrepoem. Por alguns instantes, a Chave nao sabe qual dos dois esta lembrando.',
          failureEffects: [{ type: 'faith', amount: -10 }],
        }),
        effects: [{ type: 'faith', amount: -10 }],
        flagsSet: ['echo_of_division_used'],
      }),
      createChoice({
        id: 'speak-with-aster',
        label: 'Perguntar a Aster se o dever ainda e dele',
        nextSceneId: 'guardian-last-vow',
        kind: 'spiritual',
        flagsSet: ['aster_confronted_with_duty'],
      }),
      createChoice({
        id: 'address-lysandra',
        label: 'Questionar Lysandra e o Rei como duas vontades',
        nextSceneId: 'king-and-host',
        kind: 'danger',
        flagsSet: ['lysandra_and_king_addressed'],
      }),
      createChoice({
        id: 'hear-maelis-serah',
        label: 'Ouvir Maelis e Serah, testemunhas de Aurel',
        nextSceneId: 'witnesses-of-aurel',
        kind: 'investigation',
        flagsSet: ['witnesses_heard'],
      }),
    ],
    effects: emptyEffects,
    flagsRequired: ['elyr_truth_revealed'],
    flagsSet: ['andarilho_approaching'],
    freeActionResponse:
      'A acao de Allcarin e registrada entre as estrelas-memorias. Todos aguardam, pois qualquer gesto agora pode alterar quem permanecera inteiro.',
  }),
  createScene({
    id: 'elyr-final-testimony',
    chapter: 'Capitulo Atual - A Escolha',
    title: 'Elyr, Nao o Rei',
    location: 'Sob a Arvore Dourada',
    body:
      'Elyr nao responde como lenda. Responde como um homem cansado. Ele fala de Nariel, de Aster e do medo que os Sete sentiram ao perceber o que voltara com ele da Primeira Ruptura. Nao pede restauracao. Repete apenas a vontade deixada em sua carta: nao escolham por mim; escolham por voces.',
    choices: councilChoices,
    effects: emptyEffects,
    flagsRequired: ['elyr_questioned'],
    flagsSet: ['elyr_humanity_witnessed'],
    nextSceneId: 'council-of-fragments',
    freeActionResponse:
      'Elyr escuta sem interromper. Aqui, pela primeira vez em seculos, uma escolha pode ser feita sem transforma-lo em simbolo.',
  }),
  createScene({
    id: 'echo-of-the-division',
    chapter: 'Capitulo Atual - A Escolha',
    title: 'A Memoria da Divisao',
    location: 'Lago de Memorias',
    body:
      'A superficie do lago se parte em tres reflexos. A Chave recebe as memorias. O Guardiao recebe o dever. O Rei recebe o peso. Atraves deles, o Andarilho permanece incompleto e incapaz de consumir o mundo inteiro. A memoria confirma o custo, mas nao oferece uma resposta pronta.',
    choices: councilChoices,
    effects: emptyEffects,
    flagsRequired: ['echo_of_division_used'],
    flagsSet: ['division_witnessed'],
    nextSceneId: 'council-of-fragments',
    freeActionResponse:
      'O lago aceita a vontade de Allcarin como mais uma memoria, mas se recusa a transforma-la em profecia.',
  }),
  createScene({
    id: 'guardian-last-vow',
    chapter: 'Capitulo Atual - A Escolha',
    title: 'O Dever de Aster',
    location: 'Raizes da Arvore Dourada',
    body:
      'Aster apoia uma mao petrificada sobre a raiz mais proxima. Durante oitocentos anos, o dever foi a unica parte dele que o tempo nao conseguiu devorar. Agora, parcialmente restaurado, ele admite que proteger a Chave nao significa decidir por ela. Se Allcarin escolher caminhar para o Andarilho, Aster caminhara junto; se escolher romper o selo, ele permanecera como escudo.',
    choices: councilChoices,
    effects: emptyEffects,
    flagsRequired: ['aster_confronted_with_duty'],
    flagsSet: ['aster_vow_renewed'],
    nextSceneId: 'council-of-fragments',
    freeActionResponse:
      'Aster recebe as palavras de Allcarin sem reverencia. Entre amigos de Elyr, promessas valem mais do que titulos.',
  }),
  createScene({
    id: 'king-and-host',
    chapter: 'Capitulo Atual - A Escolha',
    title: 'O Peso e a Hospedeira',
    location: 'Margem do Lago de Memorias',
    body:
      'Lysandra mantem a Lanterna Negra baixa, mas o Rei ergue sua presenca por tras dos olhos dela. Uma voz fala de culpa e dos nomes mortos; a outra exige que nenhuma decisao apague a mulher que carregou esse peso sem compreende-lo. Nao ha resposta simples sobre prisao ou coexistencia. Ha duas vontades dividindo o mesmo silencio.',
    choices: councilChoices,
    effects: emptyEffects,
    flagsRequired: ['lysandra_and_king_addressed'],
    flagsSet: ['lysandra_ambiguity_preserved'],
    nextSceneId: 'council-of-fragments',
    freeActionResponse:
      'Lysandra escuta. O Rei tambem. Nenhum dos dois aceita ser reduzido a ferramenta da Escolha.',
  }),
  createScene({
    id: 'witnesses-of-aurel',
    chapter: 'Capitulo Atual - A Escolha',
    title: 'As Irmas de Vhal-Kar',
    location: 'Sob o Ceu de Memorias',
    body:
      'Maelis organiza os fatos como quem protege uma chama do vento. Serah os corta com a franqueza de quem guardou o Terceiro Circulo por oitocentos anos. Juntas, lembram que os Sete agiram por medo real, mas escolheram mentira, assassinato e apagamento. Nariel tentou impedir a tragedia. Sua ausencia ainda ocupa um lugar entre todos.',
    choices: councilChoices,
    effects: emptyEffects,
    flagsRequired: ['witnesses_heard'],
    flagsSet: ['aurel_testimony_preserved'],
    nextSceneId: 'council-of-fragments',
    freeActionResponse:
      'Maelis registra a acao. Serah registra a hesitacao. As duas formas de memoria serao necessarias quando o Andarilho chegar.',
  }),
  createScene({
    id: 'council-of-fragments',
    chapter: 'Capitulo Atual - A Escolha',
    title: 'O Conselho dos Fragmentos',
    location: 'Alem da Camara da Escolha',
    body:
      'Chave, Guardiao e Rei ocupam pontos distintos sob a arvore dourada. Elyr permanece entre eles sem reivindicar nenhum trono. Maelis e Serah guardam o testemunho. Ao longe, uma bengala negra toca uma margem que ainda nao existe. O conselho deve preparar uma resposta antes que o Andarilho possa chamar qualquer um pelo nome.',
    choices: [
      createChoice({
        id: 'approach-memory-lake',
        label: 'Buscar no lago uma memoria que o Andarilho nao possa consumir',
        nextSceneId: 'memory-that-remains',
        kind: 'investigation',
        check: createCheck({
          attribute: 'conhecimento',
          reason: 'reconhecer uma memoria verdadeira entre reflexos herdados',
          success:
            'Allcarin encontra uma lembranca sem coroa ou profecia: Elyr, Nariel e Aster dividindo silencio a beira de um lago.',
          failure:
            'O lago devolve nomes demais. Cada memoria tenta convencer Allcarin de que sempre lhe pertenceu.',
          failureEffects: [{ type: 'faith', amount: -5 }],
        }),
        flagsSet: ['memory_sought'],
      }),
      createChoice({
        id: 'touch-golden-tree',
        label: 'Tocar a arvore dourada plantada a partir da memoria de Nariel',
        nextSceneId: 'nariel-remembrance',
        kind: 'spiritual',
        flagsSet: ['nariel_memory_honored'],
      }),
      createChoice({
        id: 'bind-three-marks',
        label: 'Aproximar Chave, Guardiao e Rei sem reintegrar Elyr',
        nextSceneId: 'three-marks-aligned',
        kind: 'danger',
        check: createCheck({
          attribute: 'fe sombria',
          reason: 'alinhar os fragmentos sem libertar aquilo que carregam',
          success:
            'As tres marcas respondem sem se fundir. O selo reconhece cooperacao onde antes exigia sacrificio.',
          failure:
            'As marcas se aproximam demais. Uma fome antiga atravessa o espaco entre elas antes de ser contida.',
          failureEffects: [{ type: 'life', amount: -8 }],
        }),
        flagsSet: ['three_marks_attempted'],
      }),
      createChoice({
        id: 'prepare-veil-hunters',
        label: 'Pedir a Lysandra que prepare a Quinta Vigilia',
        nextSceneId: 'fifth-vigil-prepares',
        kind: 'common',
        flagsSet: ['fifth_vigil_called'],
      }),
      createChoice({
        id: 'wait-without-answering',
        label: 'Esperar o Andarilho em silencio, sem responder ao chamado',
        nextSceneId: 'silence-before-the-wanderer',
        kind: 'danger',
        flagsSet: ['silence_chosen'],
      }),
    ],
    effects: emptyEffects,
    flagsRequired: emptyEffects,
    flagsSet: ['fragment_council_formed'],
    freeActionResponse:
      'O conselho recebe a iniciativa de Allcarin. Nenhuma voz a chama de destino; ela sera julgada pelo que preservar.',
  }),
  createScene({
    id: 'memory-that-remains',
    chapter: 'Capitulo Atual - A Escolha',
    title: 'A Memoria que Permanece',
    location: 'Lago de Memorias',
    body:
      'A lembranca encontrada nao contem poder, apenas intimidade: tres pessoas antes de se tornarem simbolos. Isso a torna dificil de consumir. O Andarilho devora historias quando elas se tornam vazias; esta ainda possui afeto, culpa e escolha.',
    choices: [
      createChoice({ id: 'carry-memory', label: 'Guardar a memoria como a Chave', nextSceneId: 'threshold-of-arrival', kind: 'spiritual', flagsSet: ['human_memory_carried'] }),
      createChoice({ id: 'share-memory', label: 'Compartilhar a memoria com Aster e Elyr', nextSceneId: 'threshold-of-arrival', kind: 'spiritual', flagsSet: ['human_memory_shared'] }),
      createChoice({ id: 'record-memory', label: 'Pedir que Maelis a registre sem altera-la', nextSceneId: 'threshold-of-arrival', kind: 'investigation', flagsSet: ['human_memory_recorded'] }),
      createChoice({ id: 'show-memory-king', label: 'Mostrar ao Rei o peso antes da coroa', nextSceneId: 'threshold-of-arrival', kind: 'danger', flagsSet: ['king_saw_human_memory'] }),
      createChoice({ id: 'offer-no-name', label: 'Levar a memoria sem dar a ela um novo nome', nextSceneId: 'threshold-of-arrival', kind: 'common', flagsSet: ['memory_left_unnamed'] }),
    ],
    effects: emptyEffects,
    flagsRequired: ['memory_sought'],
    flagsSet: ['memory_weapon_found'],
    nextSceneId: 'threshold-of-arrival',
    freeActionResponse: 'A memoria se adapta ao gesto de Allcarin sem perder as pessoas que preserva.',
  }),
  createScene({
    id: 'nariel-remembrance',
    chapter: 'Capitulo Atual - A Escolha',
    title: 'Aquilo que Nariel Plantou',
    location: 'Arvore Dourada',
    body:
      'A arvore responde com a imagem da Primeira Arvore e do lar soterrado sob Gravenfall. Nariel nao surge como promessa de retorno. Permanece como memoria de alguem que viu Elyr como pessoa e tentou impedir os Sete antes da divisao.',
    choices: [
      createChoice({ id: 'honor-nariel', label: 'Prometer que Nariel nao sera reduzida a perda', nextSceneId: 'threshold-of-arrival', kind: 'spiritual', flagsSet: ['nariel_honored'] }),
      createChoice({ id: 'remember-first-rest', label: 'Recordar o Primeiro Descanso', nextSceneId: 'threshold-of-arrival', kind: 'investigation', flagsSet: ['first_rest_remembered'] }),
      createChoice({ id: 'repeat-letter', label: 'Repetir as palavras da Carta de Elyr', nextSceneId: 'threshold-of-arrival', kind: 'spiritual', flagsSet: ['elyr_letter_spoken'] }),
      createChoice({ id: 'ask-serah', label: 'Pedir a Serah que conte o ultimo encontro com Elyr inteiro', nextSceneId: 'threshold-of-arrival', kind: 'investigation', flagsSet: ['serah_last_memory_shared'] }),
      createChoice({ id: 'touch-roots', label: 'Sentir as raizes que ainda alcancam Gravenfall', nextSceneId: 'threshold-of-arrival', kind: 'danger', flagsSet: ['gravenfall_roots_felt'] }),
    ],
    effects: emptyEffects,
    flagsRequired: ['nariel_memory_honored'],
    flagsSet: ['nariel_importance_preserved'],
    nextSceneId: 'threshold-of-arrival',
    freeActionResponse: 'A arvore guarda a acao sem fingir que a Recordada e a mulher viva que um dia a plantou.',
  }),
  createScene({
    id: 'three-marks-aligned',
    chapter: 'Capitulo Atual - A Escolha',
    title: 'Chave, Guardiao e Rei',
    location: 'Circulo das Tres Marcas',
    body:
      'A Marca incompleta de Allcarin, o dever restaurado de Aster e o peso desperto em Lysandra formam um circulo sem completar a reintegracao. Pela primeira vez, os fragmentos cooperam sem apagar as pessoas que se tornaram.',
    choices: [
      createChoice({ id: 'keep-separate', label: 'Manter os tres separados e conscientes', nextSceneId: 'threshold-of-arrival', kind: 'spiritual', flagsSet: ['fragments_remain_people'] }),
      createChoice({ id: 'ask-elyr-consent', label: 'Pedir o consentimento de Elyr antes de prosseguir', nextSceneId: 'threshold-of-arrival', kind: 'common', flagsSet: ['elyr_consent_requested'] }),
      createChoice({ id: 'trust-aster', label: 'Entregar a Aster a guarda do circulo', nextSceneId: 'threshold-of-arrival', kind: 'common', flagsSet: ['aster_guards_circle'] }),
      createChoice({ id: 'trust-lysandra', label: 'Permitir que Lysandra limite a voz do Rei', nextSceneId: 'threshold-of-arrival', kind: 'danger', flagsSet: ['lysandra_limits_king'] }),
      createChoice({ id: 'be-the-key', label: 'Assumir conscientemente a funcao da Chave', nextSceneId: 'threshold-of-arrival', kind: 'spiritual', flagsSet: ['allcarin_accepts_key'] }),
    ],
    effects: emptyEffects,
    flagsRequired: ['three_marks_attempted'],
    flagsSet: ['three_marks_aligned'],
    nextSceneId: 'threshold-of-arrival',
    freeActionResponse: 'As tres marcas respondem ao gesto sem exigir que uma vontade domine as outras.',
  }),
  createScene({
    id: 'fifth-vigil-prepares',
    chapter: 'Capitulo Atual - A Escolha',
    title: 'A Quinta Vigilia',
    location: 'Margem da Camara',
    body:
      'Lysandra ergue a Lanterna Negra e envia pelo selo um chamado aos Cacadores do Veu. Eles nao se tornam aliados simples. Ainda temem a reunificacao, mas agora conhecem a ameaca maior e a presenca do Rei entre suas proprias fileiras.',
    choices: [
      createChoice({ id: 'show-fifth-seal', label: 'Erguer o Selo da Quinta Vigilia', nextSceneId: 'threshold-of-arrival', kind: 'common', flagsSet: ['fifth_seal_shown'] }),
      createChoice({ id: 'warn-no-reunification', label: 'Prometer que nao havera reintegracao forcada', nextSceneId: 'threshold-of-arrival', kind: 'common', flagsSet: ['forced_reintegration_refused'] }),
      createChoice({ id: 'prepare-vigil-blade', label: 'Preparar a Faca da Vigilia Partida', nextSceneId: 'threshold-of-arrival', kind: 'danger', flagsSet: ['vigil_blade_ready'] }),
      createChoice({ id: 'let-lysandra-command', label: 'Deixar Lysandra comandar seus Cacadores', nextSceneId: 'threshold-of-arrival', kind: 'common', flagsSet: ['lysandra_commands_vigil'] }),
      createChoice({ id: 'watch-black-lantern', label: 'Observar a reacao da Lanterna Negra', nextSceneId: 'threshold-of-arrival', kind: 'investigation', flagsSet: ['black_lantern_observed'] }),
    ],
    effects: emptyEffects,
    flagsRequired: ['fifth_vigil_called'],
    flagsSet: ['fifth_vigil_prepared'],
    nextSceneId: 'threshold-of-arrival',
    freeActionResponse: 'Os Cacadores recebem o gesto com cautela. Cooperacao nao apaga oito seculos de medo.',
  }),
  createScene({
    id: 'silence-before-the-wanderer',
    chapter: 'Capitulo Atual - A Escolha',
    title: 'Nao Responda',
    location: 'Limite do Ceu Impossivel',
    body:
      'A bengala negra toca novamente. Uma voz sem boca tenta pronunciar o nome de Allcarin, mas ninguem responde. O silencio nao derrota o Andarilho. Apenas impede que ele atravesse usando uma identidade oferecida livremente.',
    choices: [
      createChoice({ id: 'hold-silence', label: 'Sustentar o silencio ao lado de Aster', nextSceneId: 'threshold-of-arrival', kind: 'danger', flagsSet: ['silence_held'] }),
      createChoice({ id: 'raise-dead-flame', label: 'Erguer a Brasa Funeraria sem pronunciar milagre', nextSceneId: 'threshold-of-arrival', kind: 'spiritual', flagsSet: ['funerary_ember_raised'] }),
      createChoice({ id: 'close-mark', label: 'Cobrir a Marca do Olho Fechado', nextSceneId: 'threshold-of-arrival', kind: 'spiritual', flagsSet: ['mark_guarded'] }),
      createChoice({ id: 'signal-maelis', label: 'Sinalizar para Maelis registrar o chamado', nextSceneId: 'threshold-of-arrival', kind: 'investigation', flagsSet: ['wanderer_call_recorded'] }),
      createChoice({ id: 'face-absence', label: 'Olhar para a ausencia sem lhe dar um nome', nextSceneId: 'threshold-of-arrival', kind: 'danger', flagsSet: ['absence_faced'] }),
    ],
    effects: emptyEffects,
    flagsRequired: ['silence_chosen'],
    flagsSet: ['wanderer_not_answered'],
    nextSceneId: 'threshold-of-arrival',
    freeActionResponse: 'O silencio acolhe o gesto de Allcarin. O Andarilho nao recebe nenhuma palavra para devorar.',
  }),
  createScene({
    id: 'threshold-of-arrival',
    chapter: 'Capitulo Atual - A Escolha',
    title: 'A Ausencia Encontra a Porta',
    location: 'Alem da Camara da Escolha',
    body:
      'A preparacao termina quando a primeira sombra sem origem toca as raizes douradas. Allcarin, Aster, Lysandra e o Rei permanecem distintos. Elyr nao foi reintegrado. Maelis e Serah guardam a memoria do que aconteceu. O proximo movimento pertence a campanha, e nenhuma decisao alem deste limiar sera inventada sem continuidade autorizada.',
    choices: [
      createChoice({
        id: 'await-authorized-continuation',
        label: 'Registrar outra acao antes da chegada completa do Andarilho',
        action: 'free',
        kind: 'common',
      }),
    ],
    effects: emptyEffects,
    flagsRequired: emptyEffects,
    flagsSet: ['canonical_frontier_reached'],
    nextSceneId: null,
    freeActionResponse:
      'A acao e registrada no limite atual do canone. A continuidade alem deste ponto aguarda desenvolvimento autorizado.',
  }),
];

export const ashesOfVeyrholm = {
  id: CANONICAL_CAMPAIGN_ID,
  title: 'As Cinzas de Veyrholm',
  appTitle: 'Codice de Veyrholm',
  canonVersion: 'campaign-bible-1',
  tone: 'dark fantasy espiritual, melancolica e cosmica',
  activeSceneId: 'beyond-choice-revelation',
  initialFlags: ['elyr_truth_revealed', 'aster_partially_restored', 'king_awake_in_lysandra'],
  character: {
    id: 'allcarin',
    name: 'Allcarin',
    class: 'Acolito da Chama Morta',
    titles: ['A Chave', 'Herdeiro'],
    level: 8,
    life: 88,
    maxLife: 100,
    faith: 110,
    maxFaith: 100,
    faithLabel: 'Alem do Limite',
    awakenedAshes: 1,
    attributes: {
      vigor: 2,
      'fe sombria': 4,
      conhecimento: 3,
      agilidade: 2,
      presenca: 2,
    },
    statuses: [
      {
        id: 'the-key',
        label: 'A Chave',
        description: 'Fragmento de Elyr que carrega as memorias e torna a Escolha possivel.',
        symbol: 'key',
      },
      {
        id: 'incomplete-closed-eye',
        label: 'Olho Fechado Incompleto',
        description: 'Marca fraturada da Chave, parte da Marca Completa compartilhada pelos fragmentos.',
        symbol: 'keyIncomplete',
      },
      {
        id: 'faith-beyond-limit',
        label: 'Fe Alem do Limite',
        description: 'Conexao espiritual excepcional com a Chama Morta, as memorias e a verdade alem do Veu.',
        symbol: 'deadFlame',
      },
    ],
  },
  inventory: [
    { id: 'tattered-dead-flame-mantle', name: 'Manto Esfarrapado da Chama Morta', description: 'Vestimenta dos acolitos da Chama Morta.', symbol: 'deadFlame', iconClass: 'relic' },
    { id: 'burned-bronze-symbol', name: 'Simbolo de Bronze Queimado', description: 'Objeto religioso ligado a fe inicial de Allcarin.', symbol: 'seal', iconClass: 'relic' },
    { id: 'ritual-knife', name: 'Faca Ritual', description: 'Arma simples carregada desde o inicio da jornada.', symbol: 'seal', iconClass: 'blade' },
    { id: 'copper-coins', name: '7 Moedas de Cobre', description: 'As sete moedas com que Allcarin iniciou a campanha.', symbol: 'seal', iconClass: 'relic' },
    { id: 'mask-of-silence', name: 'Mascara do Silencio', description: 'Oculta o portador de certas percepcoes espirituais. Nao esta equipada.', symbol: 'maskEye', iconClass: 'relic', equipped: false },
    { id: 'third-circle', name: 'Terceiro Circulo', description: 'Artefato preservado por Serah durante oitocentos anos.', symbol: 'closedEyeComplete', iconClass: 'relic' },
    { id: 'elyr-letter', name: 'Carta de Elyr', description: 'Contem o pedido: Nao escolham por mim. Escolham por voces.', symbol: 'memoryTree', iconClass: 'book' },
    { id: 'fifth-vigil-seal', name: 'Selo da Quinta Vigilia', description: 'Marca o contato direto de Allcarin com a lideranca dos Cacadores do Veu.', symbol: 'veilEye', iconClass: 'relic' },
    { id: 'broken-vigil-blade', name: 'Faca da Vigilia Partida', description: 'Relíquia capaz de ferir entidades ligadas ao Veu e a Ruptura.', symbol: 'veilEye', iconClass: 'blade' },
  ],
  quests: [
    { id: 'who-remains-whole', title: 'Quem Ficara Inteiro', status: 'ativa', progress: 82, stepsDone: 9, stepsTotal: 11, description: 'Decidir como enfrentar o Andarilho sem apagar as pessoas que nasceram dos fragmentos de Elyr.' },
    { id: 'preserve-memory', title: 'Preservar a Memoria do Mundo', status: 'ativa', progress: 75, stepsDone: 6, stepsTotal: 8, description: 'Impedir que o Andarilho consuma nomes, historias e identidades.' },
    { id: 'truth-of-elyr', title: 'A Verdade de Elyr', status: 'concluida', progress: 100, stepsDone: 7, stepsTotal: 7, description: 'Descobrir por que Elyr se dividiu e o que cada fragmento carrega.' },
  ],
  knownNpcs: [
    { id: 'elyr', name: 'Elyr', role: 'O homem dividido; origem da Chave, Guardiao e Rei', disposition: 'presente' },
    { id: 'aster', name: 'Aster', role: 'O Guardiao; amigo de Elyr e aliado de Allcarin', disposition: 'leal' },
    { id: 'lysandra', name: 'Lysandra', role: 'Lider da Quinta Vigilia e hospedeira do Rei', disposition: 'ambigua' },
    { id: 'maelis', name: 'Maelis', role: 'Ultima Guardia de Vhal-Kar e portadora do Codice', disposition: 'aliada' },
    { id: 'serah', name: 'Serah', role: 'Guardia do Terceiro Circulo e testemunha de Elyr inteiro', disposition: 'aliada' },
    { id: 'nariel', name: 'Nariel', role: 'Recordada ligada ao Primeiro Descanso e a humanidade de Elyr', disposition: 'preservada' },
  ],
  factions: [
    { id: 'the-seven', name: 'Os Sete', stance: 'ambigua', description: 'Trairam Elyr e apagaram a historia por medo de uma catastrofe real.' },
    { id: 'ash-bearers', name: 'Portadores das Cinzas', stance: 'legado', description: 'Ordem apagada ligada a Chama Morta e a memoria como sacramento.' },
    { id: 'veil-hunters', name: 'Cacadores do Veu', stance: 'cautelosa', description: 'Tentam impedir a reunificacao dos fragmentos por temor do que ela libertaria.' },
    { id: 'black-star-children', name: 'Filhos da Estrela Negra', stance: 'hostil', description: 'Culto que abre Rupturas e serve ao avancar do esquecimento.' },
  ],
  centralEntity: {
    id: 'wanderer',
    name: 'O Andarilho',
    nature: 'Fome e ausencia que consome memorias, nomes e identidades.',
    rule: 'Quando ouvir o Andarilho, nao responda.',
  },
  centralMystery: 'Allcarin e a Chave, fragmento de Elyr que carrega as memorias.',
  initialHistory: [
    { type: 'narrative', text: 'Elyr revelou que se dividiu para aprisionar o Andarilho. O verdadeiro Andarilho esta chegando.' },
    { type: 'world', text: 'Aster esta parcialmente restaurado. O Rei despertou em Lysandra.' },
  ],
  scenes,
};

export default ashesOfVeyrholm;
