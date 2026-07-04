import VeyrholmSymbol from './VeyrholmSymbol.jsx';

export default function HUD({ character }) {
  const lifePercent = Math.max(0, Math.min(100, (character.life / character.maxLife) * 100));
  const faithPercent = Math.max(0, Math.min(100, (character.faith / character.maxFaith) * 100));

  return (
    <aside className="hud ornament-panel" aria-label="Estado do personagem">
      <div className="hud__top">
        <div className="hud__seal" aria-hidden="true">
          <VeyrholmSymbol type="keyIncomplete" className="hud__seal-symbol" />
        </div>
        <div>
          <p className="eyebrow">Personagem</p>
          <h1>{character.name}</h1>
          <p className="hud__class">{character.class}</p>
        </div>
      </div>

      <div className="hud__core">
        <Meter label="Vida" value={character.life} max={character.maxLife} percent={lifePercent} tone="blood" />
        <Meter
          label="Fe"
          value={character.faith}
          max={character.maxFaith}
          displayValue={character.faithLabel}
          percent={faithPercent}
          tone="gold"
        />
        <div className="hud__level">
          <span>Nivel</span>
          <strong>{character.level}</strong>
        </div>
        <div className="hud__choice-marks" aria-label="Marcas da Camara da Escolha">
          <span className="hud__choice-mark hud__choice-mark--active" title="A Chave">
            <VeyrholmSymbol type="key" />
          </span>
          <span className="hud__choice-mark" title="O Guardiao">
            <VeyrholmSymbol type="guardian" />
          </span>
          <span className="hud__choice-mark" title="O Rei">
            <VeyrholmSymbol type="king" />
          </span>
        </div>
      </div>

      <section>
        <p className="eyebrow">Atributos</p>
        <div className="attribute-grid">
          {Object.entries(character.attributes).map(([name, value]) => (
            <div className="attribute" key={name}>
              <span>{name}</span>
              <strong>{value >= 0 ? `+${value}` : value}</strong>
            </div>
          ))}
        </div>
      </section>

      <section>
        <p className="eyebrow">Status</p>
        <div className="status-list">
          {character.statuses.length ? (
            character.statuses.map((status) => {
              const detail = normalizeStatus(status);

              return (
                <span
                  className="status-icon"
                  key={detail.id}
                  tabIndex="0"
                  title={`${detail.label}: ${detail.description}`}
                >
                  <VeyrholmSymbol type={detail.symbol} className="status-icon__symbol" />
                  <span className="status-tooltip">
                    <strong>{detail.label}</strong>
                    {detail.description}
                  </span>
                </span>
              );
            })
          ) : (
            <span className="status-icon" title="Sem condicoes ativas">-</span>
          )}
        </div>
      </section>
    </aside>
  );
}

function Meter({ label, value, max, displayValue, percent, tone }) {
  return (
    <div className="meter">
      <div className="meter__label">
        <span>{label}</span>
        <strong>{displayValue ?? `${value}/${max}`}</strong>
      </div>
      <div className="meter__track">
        <div className={`meter__fill meter__fill--${tone}`} style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
}

function normalizeStatus(status) {
  if (typeof status === 'object') {
    return {
      id: status.id,
      label: status.label,
      description: status.description,
      symbol: status.symbol ?? 'seal',
    };
  }

  return {
    id: status,
    label: status,
    description: 'Condicao registrada pela campanha ativa.',
    symbol: 'seal',
  };
}
