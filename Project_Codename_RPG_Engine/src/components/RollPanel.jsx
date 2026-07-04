import { useMemo, useState } from 'react';
import Icon from './Icon.jsx';

export default function RollPanel({ sheet, diceSettings, recentRolls, disabled, onRoll }) {
  const attributes = useMemo(() => Object.keys(sheet?.attributes ?? {}), [sheet]);
  const [attribute, setAttribute] = useState(attributes[0] ?? '');

  const selectedAttribute = attribute || attributes[0] || '';
  const modifier = sheet?.attributes?.[selectedAttribute] ?? 0;

  return (
    <section className="panel">
      <div className="panel-heading">
        <span>
          <Icon name="dice" />
          Dice Rolls
        </span>
        <button type="button" disabled={disabled || !sheet} onClick={() => onRoll(selectedAttribute, modifier)}>
          <Icon name="dice" />
          Roll d{diceSettings.defaultSides}
        </button>
      </div>

      <div className="roll-controls">
        <label className="field">
          <span>Attribute</span>
          <select value={selectedAttribute} disabled={disabled || !sheet} onChange={(event) => setAttribute(event.target.value)}>
            {attributes.map((name) => (
              <option key={name} value={name}>{formatLabel(name)} ({formatModifier(sheet.attributes[name])})</option>
            ))}
          </select>
        </label>
        <div className="rules-card">
          <span>Threshold</span>
          <strong>{diceSettings.successThreshold}+</strong>
        </div>
        <div className="rules-card">
          <span>Critical</span>
          <strong>{diceSettings.criticalSuccess}</strong>
        </div>
        <div className="rules-card">
          <span>Failure</span>
          <strong>{diceSettings.criticalFailure}</strong>
        </div>
      </div>

      <div className="roll-history">
        {recentRolls.map((roll) => (
          <article className={`roll-card roll-card--${roll.outcome}`} key={roll.id}>
            <strong>{roll.raw}</strong>
            <span>{formatLabel(roll.attribute)} {formatModifier(roll.modifier)} = {roll.total}</span>
            <em>{formatLabel(roll.outcome)}</em>
          </article>
        ))}
      </div>

      {!sheet && <p className="muted">Create an active sheet before rolling with attributes.</p>}
    </section>
  );
}

function formatLabel(value = '') {
  return value.replace(/([A-Z])/g, ' $1').replace(/^./, (char) => char.toUpperCase());
}

function formatModifier(value) {
  return value >= 0 ? `+${value}` : String(value);
}

