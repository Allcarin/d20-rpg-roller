# Fluxo entre telas e cenas

## Fluxo de interface

```mermaid
flowchart TD
  A["App inicia"] --> B["Valida campanha ativa"]
  B --> C["Carrega save do localStorage ou cria save inicial"]
  C --> D["Renderiza HUD + Cena + Escolhas + Diario"]
  D --> E{"Jogador escolhe"}
  E -->|"Escolha sem teste"| F["Aplica efeitos e flags"]
  F --> G["Avanca para proxima cena"]
  G --> H["Registra historico e salva localStorage"]
  H --> D
  E -->|"Escolha com teste"| I["Cria pendingCheck"]
  I --> J["Mostra DiceRoller e bloqueia escolhas"]
  J --> K["Rola D20"]
  K --> L["Confirma pressagio"]
  L --> M["Aplica outcome + efeitos + proxima cena"]
  M --> H
  E -->|"Acao livre"| N["Registra feedback narrativo"]
  N --> H
```

## Fluxo narrativo atual

```mermaid
flowchart TD
  start["beyond-choice-revelation"] --> elyr["elyr-final-testimony"]
  start --> echo["echo-of-the-division"]
  start --> aster["guardian-last-vow"]
  start --> king["king-and-host"]
  start --> witnesses["witnesses-of-aurel"]
  elyr --> council["council-of-fragments"]
  echo --> council
  aster --> council
  king --> council
  witnesses --> council
  council --> memory["memory-that-remains"]
  council --> nariel["nariel-remembrance"]
  council --> marks["three-marks-aligned"]
  council --> vigil["fifth-vigil-prepares"]
  council --> silence["silence-before-the-wanderer"]
  memory --> threshold["threshold-of-arrival"]
  nariel --> threshold
  marks --> threshold
  vigil --> threshold
  silence --> threshold
  threshold --> free["acao livre ate continuidade autorizada"]
```

## Regras de transicao

- A cena inicial e `activeSceneId`.
- Uma escolha comum avanca para `choice.nextSceneId` ou, se ausente, para `scene.nextSceneId`.
- Uma escolha com `check` cria `pendingCheck` e so avanca apos a confirmacao da rolagem.
- Uma escolha com `action: "free"` nao muda cena.
- `flagsSet` da escolha e da cena sao adicionadas ao save sem duplicar.
- `flagsRequired` em escolhas filtra opcoes visiveis.
- `flagsRequired` em cenas existe no modelo, mas o app atual nao bloqueia diretamente a renderizacao por cena.

