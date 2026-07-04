import { useMemo, useState } from 'react';

const DICE = [
  { sides: 4, label: 'D4', tone: 'amber' },
  { sides: 6, label: 'D6', tone: 'steel' },
  { sides: 8, label: 'D8', tone: 'verdant' },
  { sides: 10, label: 'D10', tone: 'ember' },
  { sides: 12, label: 'D12', tone: 'violet' },
  { sides: 20, label: 'D20', tone: 'gold' },
];

const MIN_QUANTITY = 1;
const MAX_QUANTITY = 12;
const ROLL_TICKS = 18;

export default function DiceApp() {
  const [selectedSides, setSelectedSides] = useState(20);
  const [quantity, setQuantity] = useState(1);
  const [modifier, setModifier] = useState(0);
  const [isRolling, setIsRolling] = useState(false);
  const [previewValues, setPreviewValues] = useState([20]);
  const [lastRoll, setLastRoll] = useState(null);
  const [history, setHistory] = useState([]);

  const selectedDie = useMemo(
    () => DICE.find((die) => die.sides === selectedSides) ?? DICE[5],
    [selectedSides],
  );

  const rollDice = () => {
    if (isRolling) return;

    const count = Number(quantity);
    const die = selectedDie;
    const currentModifier = Number(modifier) || 0;
    const finalValues = Array.from({ length: count }, () => rollDie(die.sides));
    const subtotal = finalValues.reduce((sum, value) => sum + value, 0);
    const total = subtotal + currentModifier;
    const id = globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random()}`;

    setIsRolling(true);
    setPreviewValues(Array.from({ length: count }, () => rollDie(die.sides)));

    let tick = 0;
    const intervalId = window.setInterval(() => {
      tick += 1;

      if (tick >= ROLL_TICKS) {
        window.clearInterval(intervalId);
        const resolvedRoll = {
          id,
          die,
          values: finalValues,
          modifier: currentModifier,
          subtotal,
          total,
          createdAt: new Date().toLocaleTimeString('pt-BR', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
          }),
        };

        setPreviewValues(finalValues);
        setLastRoll(resolvedRoll);
        setHistory((current) => [resolvedRoll, ...current].slice(0, 8));
        setIsRolling(false);
        return;
      }

      setPreviewValues(Array.from({ length: count }, () => rollDie(die.sides)));
    }, 58);
  };

  const clearHistory = () => {
    setHistory([]);
    setLastRoll(null);
    setPreviewValues([selectedSides]);
  };

  const changeQuantity = (nextQuantity) => {
    if (isRolling) return;

    const boundedQuantity = Math.min(MAX_QUANTITY, Math.max(MIN_QUANTITY, nextQuantity));
    setQuantity(boundedQuantity);
    setPreviewValues(Array.from({ length: boundedQuantity }, () => selectedSides));
  };

  const resultTone = getResultTone(lastRoll);

  return (
    <main className="dice-app-shell">
      <section className="roller-panel" aria-labelledby="app-title">
        <div className="roller-panel__header">
          <div>
            <p className="eyebrow">Bancada de rolagem</p>
            <h1 id="app-title">D20 RPG Roller</h1>
          </div>
          <span className="status-pill">{selectedDie.label} ativo</span>
        </div>

        <div className="stage" aria-live="polite">
          <div className={`die-orbit ${isRolling ? 'die-orbit--rolling' : ''}`}>
            <DieVisual
              die={selectedDie}
              isRolling={isRolling}
              value={previewValues[0] ?? selectedDie.sides}
            />
          </div>

          <div className="roll-summary">
            <span className="roll-summary__label">
              {quantity}x{selectedDie.label}
              {modifier ? ` ${formatModifier(modifier)}` : ''}
            </span>
            <strong className={`roll-summary__total roll-summary__total--${resultTone}`}>
              {isRolling ? previewValues.reduce((sum, value) => sum + value, 0) : (lastRoll?.total ?? selectedDie.sides)}
            </strong>
            <small>{getResultLabel(lastRoll, isRolling)}</small>
          </div>
        </div>

        <div className="roll-strip" aria-label="Resultados individuais">
          {previewValues.map((value, index) => (
            <span className={isRolling ? 'roll-chip roll-chip--rolling' : 'roll-chip'} key={`${value}-${index}`}>
              {value}
            </span>
          ))}
        </div>

        <div className="controls" aria-label="Controles de rolagem">
          <fieldset className="control-group">
            <legend>Tipo de dado</legend>
            <div className="dice-picker">
              {DICE.map((die) => (
                <button
                  className={die.sides === selectedSides ? 'die-button die-button--selected' : 'die-button'}
                  key={die.sides}
                  onClick={() => {
                    setSelectedSides(die.sides);
                    setPreviewValues(Array.from({ length: quantity }, () => die.sides));
                  }}
                  type="button"
                >
                  {die.label}
                </button>
              ))}
            </div>
          </fieldset>

          <div className="field">
            <span>Multiplicador</span>
            <div className="quantity-stepper" aria-label="Multiplicador de rolagens">
              <button
                aria-label="Diminuir multiplicador"
                disabled={isRolling || quantity <= MIN_QUANTITY}
                onClick={() => changeQuantity(quantity - 1)}
                type="button"
              >
                &minus;
              </button>
              <strong>{quantity}x</strong>
              <button
                aria-label="Aumentar multiplicador"
                disabled={isRolling || quantity >= MAX_QUANTITY}
                onClick={() => changeQuantity(quantity + 1)}
                type="button"
              >
                +
              </button>
            </div>
          </div>

          <label className="field">
            <span>Modificador</span>
            <input
              max="99"
              min="-99"
              onChange={(event) => setModifier(Number(event.target.value))}
              type="number"
              value={modifier}
            />
          </label>

          <button className="roll-button" disabled={isRolling} onClick={rollDice} type="button">
            {isRolling ? 'Rolando...' : `Rolar ${selectedDie.label}`}
          </button>
        </div>
      </section>

      <aside className="side-panel" aria-label="Historico de rolagens">
        <div className="side-panel__header">
          <h2>Historico</h2>
          <button className="ghost-button" onClick={clearHistory} type="button">
            Limpar
          </button>
        </div>

        {lastRoll ? (
          <ResultCard featured roll={lastRoll} />
        ) : (
          <div className="empty-state">
            <strong>Pronto para rolar</strong>
            <span>D20 comeca no centro, os demais ja estao no seletor.</span>
          </div>
        )}

        <ol className="history-list">
          {history.slice(1).map((roll) => (
            <li key={roll.id}>
              <ResultCard roll={roll} />
            </li>
          ))}
        </ol>
      </aside>
    </main>
  );
}

function DieVisual({ die, value, isRolling }) {
  return (
    <div
      aria-label={`${die.label}: ${value}`}
      className={`poly-die poly-die--${die.tone} poly-die--d${die.sides} ${isRolling ? 'poly-die--rolling' : ''}`}
    >
      <span>{value}</span>
      <i />
      <b />
    </div>
  );
}

function ResultCard({ roll, featured = false }) {
  const tone = getResultTone(roll);

  return (
    <article className={featured ? `result-card result-card--featured result-card--${tone}` : `result-card result-card--${tone}`}>
      <div>
        <span>{roll.createdAt}</span>
        <strong>
          {roll.values.length}x{roll.die.label}
        </strong>
      </div>
      <p>{roll.values.join(' + ')}</p>
      <em>
        {roll.modifier ? `${roll.subtotal} ${formatModifier(roll.modifier)} = ` : ''}
        {roll.total}
      </em>
    </article>
  );
}

function rollDie(sides) {
  return Math.floor(Math.random() * sides) + 1;
}

function getResultTone(roll) {
  if (!roll || roll.die.sides !== 20 || roll.values.length !== 1) return 'neutral';
  if (roll.values[0] === 20) return 'critical';
  if (roll.values[0] === 1) return 'danger';
  return 'neutral';
}

function getResultLabel(roll, isRolling) {
  if (isRolling) return 'O dado esta em movimento';
  if (!roll) return 'Clique em rolar para resolver';
  if (roll.die.sides === 20 && roll.values.length === 1 && roll.values[0] === 20) return 'ACERTO CRITICO! Impacto maximo na mesa.';
  if (roll.die.sides === 20 && roll.values.length === 1 && roll.values[0] === 1) return 'FALHA CRITICA! Algo saiu perigosamente errado.';
  return `${roll.values.length} rolagem${roll.values.length > 1 ? 's' : ''} resolvida${roll.values.length > 1 ? 's' : ''}`;
}

function formatModifier(value) {
  return value >= 0 ? `+${value}` : `${value}`;
}
