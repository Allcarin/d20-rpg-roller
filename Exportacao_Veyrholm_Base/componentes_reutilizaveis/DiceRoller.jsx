import { useEffect, useMemo, useRef, useState } from 'react';
import VeyrholmSymbol from './VeyrholmSymbol.jsx';

const outcomeLabels = {
  criticalFailure: 'Falha Critica',
  failure: 'Falha',
  success: 'Sucesso',
  criticalSuccess: 'Sucesso Critico',
};

const outcomeNarratives = {
  criticalFailure: 'O osso cai contra o pressagio. Algo no escuro percebe a tentativa.',
  failure: 'O sinal se fecha. Veyrholm exige um preco antes de ceder passagem.',
  success: 'As marcas se alinham. O caminho responde a vontade de Allcarin.',
  criticalSuccess: 'Por um instante, as cinzas lembram o nome verdadeiro do mundo.',
};

export default function DiceRoller({ attributes, checkPrompt, recentRolls = [], onRoll }) {
  const attributeNames = useMemo(() => Object.keys(attributes), [attributes]);
  const [selectedAttribute, setSelectedAttribute] = useState(checkPrompt?.attribute ?? attributeNames[0] ?? 'corpo');
  const [lastRoll, setLastRoll] = useState(null);
  const [isRolling, setIsRolling] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);
  const timersRef = useRef([]);

  useEffect(() => {
    if (checkPrompt?.attribute && attributes[checkPrompt.attribute] !== undefined) {
      setSelectedAttribute(checkPrompt.attribute);
    }
  }, [attributes, checkPrompt]);

  useEffect(() => () => timersRef.current.forEach(clearTimeout), []);

  const rollD20 = () => {
    if (isRolling) return;

    const raw = Math.floor(Math.random() * 20) + 1;
    const modifier = attributes[selectedAttribute] ?? 0;
    const total = raw + modifier;
    const outcome = getOutcome(raw);
    const payload = {
      raw,
      modifier,
      total,
      attribute: selectedAttribute,
      outcome,
      label: outcomeLabels[outcome],
    };

    setIsRolling(true);
    setLastRoll(null);

    timersRef.current = [setTimeout(() => {
      setLastRoll(payload);
      setIsRolling(false);
    }, 520)];
  };

  const confirmRoll = () => {
    if (!lastRoll || isConfirming) return;
    setIsConfirming(true);
    onRoll(lastRoll);
  };

  const displayedRolls = lastRoll ? [lastRoll, ...recentRolls].slice(0, 5) : recentRolls.slice(0, 5);

  return (
    <section className="dice dice--called ornament-panel" aria-label="Rolagem de dados">
      <div className="section-heading">
        <p className="eyebrow">Oraculo de Osso</p>
        <h2>
          <VeyrholmSymbol type="boneOracle" className="dice__heading-symbol" />
          D20
        </h2>
      </div>

      <div className="dice-call">
        <VeyrholmSymbol type="ritualDie" className="dice-call__symbol" />
        <strong>{isRolling ? 'As cinzas se movem' : 'O rito aguarda'}</strong>
        <span>{formatAttribute(checkPrompt.attribute)}</span>
        <p>{checkPrompt.reason}</p>
      </div>

      <label className="field-label" htmlFor="attribute">
        Atributo invocado
      </label>
      <select
        id="attribute"
        disabled={isRolling || Boolean(lastRoll)}
        value={selectedAttribute}
        onChange={(event) => setSelectedAttribute(event.target.value)}
      >
        {attributeNames.map((attribute) => (
          <option key={attribute} value={attribute}>
            {formatAttribute(attribute)} ({formatModifier(attributes[attribute])})
          </option>
        ))}
      </select>

      <button
        className={`dice__button ${isRolling ? 'is-rolling' : ''}`}
        type="button"
        disabled={isRolling || Boolean(lastRoll)}
        onClick={rollD20}
      >
        <VeyrholmSymbol type="ritualDie" />
        <span>{isRolling ? 'Consultando os ossos...' : 'Rolar D20'}</span>
      </button>

      {isRolling && !lastRoll && (
        <div className="roll-pending" aria-live="polite">
          <span />
          <p>O dado atravessa a cinza.</p>
        </div>
      )}

      {lastRoll && (
        <div className={`roll-revelation roll-revelation--${lastRoll.outcome}`} aria-live="assertive">
          <VeyrholmSymbol type="ritualDie" className="roll-revelation__sigil" />
          <p className="roll-revelation__label">D20</p>
          <strong className="roll-revelation__number">{lastRoll.raw}</strong>
          <dl className="roll-revelation__details">
            <div>
              <dt>Atributo</dt>
              <dd>{formatAttribute(lastRoll.attribute)}</dd>
            </div>
            <div>
              <dt>Modificador</dt>
              <dd>{formatModifier(lastRoll.modifier)}</dd>
            </div>
            <div>
              <dt>Total</dt>
              <dd>{lastRoll.total}</dd>
            </div>
          </dl>
          <div className="roll-revelation__verdict">
            <span>Resultado</span>
            <strong>{lastRoll.label}</strong>
          </div>
          <p className="roll-revelation__narrative">{outcomeNarratives[lastRoll.outcome]}</p>
          <button
            className="roll-revelation__confirm"
            type="button"
            disabled={isConfirming}
            onClick={confirmRoll}
          >
            <VeyrholmSymbol type="seal" />
            <span>{isConfirming ? 'Selando resultado...' : 'Confirmar pressagio'}</span>
          </button>
        </div>
      )}

      {displayedRolls.length > 0 && (
        <section className="roll-history" aria-label="Ultimas rolagens">
          <h3>Ultimas revelacoes</h3>
          <ol>
            {displayedRolls.map((roll, index) => (
              <li key={`${roll.raw}-${roll.attribute}-${index}`}>
                <span className={`roll-history__die roll-history__die--${roll.outcome}`}>{roll.raw}</span>
                <span>
                  <strong>{formatAttribute(roll.attribute)}</strong>
                  <small>Total {roll.total}</small>
                </span>
                <em>{roll.label}</em>
              </li>
            ))}
          </ol>
        </section>
      )}
    </section>
  );
}

function getOutcome(rawRoll) {
  if (rawRoll === 1) return 'criticalFailure';
  if (rawRoll === 20) return 'criticalSuccess';
  if (rawRoll >= 10) return 'success';
  return 'failure';
}

function formatAttribute(attribute = '') {
  return attribute.charAt(0).toUpperCase() + attribute.slice(1);
}

function formatModifier(modifier) {
  return modifier >= 0 ? `+${modifier}` : `${modifier}`;
}
