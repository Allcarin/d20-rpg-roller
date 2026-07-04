import { useState } from 'react';
import VeyrholmSymbol from './VeyrholmSymbol.jsx';

const choiceKinds = {
  common: {
    label: 'Comum',
    hint: 'A vontade segue sem invocar o Oraculo.',
    symbol: 'key',
  },
  test: {
    label: 'Teste',
    hint: 'Os ossos decidirao o peso desta tentativa.',
    symbol: 'seal',
  },
  danger: {
    label: 'Perigosa',
    hint: 'Falhar pode deixar uma marca duradoura.',
    symbol: 'starBroken',
  },
  spiritual: {
    label: 'Espiritual',
    hint: 'A Chama Morta e as memorias escutam.',
    symbol: 'deadFlame',
  },
  investigation: {
    label: 'Investigacao',
    hint: 'Procura vestigios, memoria ou verdade oculta.',
    symbol: 'closedEye',
  },
};

export default function ChoicePanel({ choices, disabled, onChoice, onFreeAction }) {
  const [freeAction, setFreeAction] = useState('');

  const submitFreeAction = (event) => {
    event.preventDefault();
    const action = freeAction.trim();

    if (!action) return;

    onFreeAction(action);
    setFreeAction('');
  };

  return (
    <section className="choice-panel ornament-panel" aria-label="Escolhas do jogador">
      <div className="section-heading">
        <p className="eyebrow">Vontade</p>
        <h2>Escolhas</h2>
      </div>

      <div className="choice-list">
        {choices.map((choice, index) => {
          const kind = getChoiceKind(choice);
          const kindInfo = choiceKinds[kind];

          return (
            <button
              className={`choice-button choice-button--${kind}`}
              key={choice.id}
              type="button"
              disabled={disabled}
              onClick={() => onChoice(choice)}
            >
              <span className="choice-button__number">{String(index + 1).padStart(2, '0')}</span>
              <VeyrholmSymbol type={kindInfo.symbol} className="choice-button__mark" />
              <span className="choice-button__copy">
                <strong>{choice.label}</strong>
                <small>{kindInfo.hint}</small>
              </span>
              <span className="choice-button__tags">
                <em>{kindInfo.label}</em>
                {choice.check && <em className="choice-button__test">D20</em>}
              </span>
            </button>
          );
        })}
      </div>

      <form className="free-action" onSubmit={submitFreeAction}>
        <div className="free-action__heading">
          <VeyrholmSymbol type="codex" />
          <span>
            <strong>Registro livre</strong>
            <small>Escreva uma vontade que ainda nao recebeu nome.</small>
          </span>
        </div>
        <label className="field-label" htmlFor="free-action">
          Acao de Allcarin
        </label>
        <textarea
          id="free-action"
          disabled={disabled}
          value={freeAction}
          onChange={(event) => setFreeAction(event.target.value)}
          placeholder="Descreva o que Allcarin tenta fazer..."
          rows="4"
        />
        <button className="free-action__submit" type="submit" disabled={disabled}>
          <VeyrholmSymbol type="keyIncomplete" />
          <span>Enviar acao</span>
        </button>
      </form>
    </section>
  );
}

function getChoiceKind(choice) {
  if (choiceKinds[choice.kind]) return choice.kind;

  const text = `${choice.label} ${choice.check?.reason ?? ''}`.toLowerCase();
  const failureConsequence = choice.check?.outcomes?.failure?.consequence ?? {};
  const hasDangerousCost = Boolean(
    failureConsequence.life || failureConsequence.faith || failureConsequence.status,
  );

  if (hasDangerousCost || /(confront|atac|sangue|morto|puxar|exigir|ameaca|sacrific)/.test(text)) {
    return 'danger';
  }

  if (/(prece|rez|oracao|chama|fe|visao|espirito|santo|altar|brasa|elyr|memoria)/.test(text)) {
    return 'spiritual';
  }

  if (choice.check?.attribute === 'mente' || /(examinar|investig|procur|observar|buscar|vestig|inscricao|interpret)/.test(text)) {
    return 'investigation';
  }

  if (choice.check) return 'test';
  return 'common';
}
