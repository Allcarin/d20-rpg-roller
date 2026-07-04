import { useState } from 'react';
import VeyrholmSymbol from './VeyrholmSymbol.jsx';

const itemIcons = {
  'ember-censer': 'ember',
  'ash-prayerbook': 'book',
  'rusted-dagger': 'blade',
};

export default function Journal({ inventory, quests, knownNpcs, history, onReset }) {
  const [openSections, setOpenSections] = useState({
    inventory: false,
    quests: false,
  });

  const toggleSection = (section) => {
    setOpenSections((current) => ({
      ...current,
      [section]: !current[section],
    }));
  };

  return (
    <aside className="journal ornament-panel" aria-label="Diario da campanha">
      <div className="section-heading">
        <p className="eyebrow">Registro</p>
        <h2>Grimorio</h2>
      </div>

      <JournalSection
        title="Inventario"
        count={inventory.length}
        symbol="codex"
        isCollapsible
        isOpen={openSections.inventory}
        onToggle={() => toggleSection('inventory')}
      >
        <div className="inventory-list">
          {inventory.map((item) => (
            <div className="inventory-item" key={item.id} tabIndex="0" title={`${item.name}: ${item.description}`}>
              <VeyrholmSymbol type={item.symbol ?? getItemSymbol(item)} className="inventory-item__faction-mark" />
              <span className={`pixel-item pixel-item--${item.iconClass ?? itemIcons[item.id] ?? 'relic'}`} aria-hidden="true" />
              <strong>{item.name}</strong>
              <span className="item-tooltip">
                <b>{item.name}</b>
                {item.description}
              </span>
            </div>
          ))}
        </div>
      </JournalSection>

      <JournalSection
        title="Missoes"
        count={quests.length}
        symbol="deadFlame"
        isCollapsible
        isOpen={openSections.quests}
        onToggle={() => toggleSection('quests')}
      >
        <div className="quest-list">
          {quests.map((quest) => {
            const progress = getQuestProgress(quest);

            return (
              <article className="quest-row" key={quest.id} tabIndex="0" title={`${quest.title}: ${quest.description}`}>
                <div className="quest-row__top">
                  <strong>{quest.title}</strong>
                  <span>{progress}%</span>
                </div>
                <div className="quest-progress" aria-label={`Conclusao ${progress}%`}>
                  <div style={{ width: `${progress}%` }} />
                </div>
                <small>
                  {quest.stepsDone ?? Math.round(progress / 34)} de {quest.stepsTotal ?? 3} marcos
                </small>
              </article>
            );
          })}
        </div>
      </JournalSection>

      <JournalSection title="NPCs conhecidos" symbol="maskEye">
        {knownNpcs.map((npc) => (
          <article className="journal-card" key={npc.id}>
            <div className="journal-card__title">
              <h3>{npc.name}</h3>
              <span>{npc.disposition}</span>
            </div>
            <p>{npc.role}</p>
          </article>
        ))}
      </JournalSection>

      <JournalSection title="Historico" symbol="codex">
        <ol className="history-list">
          {history.slice(-10).map((event, index) => (
            <li key={`${event.type}-${index}`}>
              <span>{event.type}</span>
              <p>{event.text}</p>
            </li>
          ))}
        </ol>
      </JournalSection>

      <button className="ghost-button" type="button" onClick={onReset}>
        Restaurar save inicial
      </button>
    </aside>
  );
}

function JournalSection({ title, count, symbol, isCollapsible = false, isOpen = true, onToggle, children }) {
  if (isCollapsible) {
    return (
      <section className={`journal-section journal-section--tab ${isOpen ? 'is-open' : ''}`}>
        <button className="journal-tab" type="button" onClick={onToggle} aria-expanded={isOpen}>
          <span>
            {symbol && <VeyrholmSymbol type={symbol} className="journal-section__symbol" />}
            {title}
          </span>
          <strong>{count}</strong>
        </button>
        {isOpen && children}
      </section>
    );
  }

  return (
    <section className="journal-section">
      <h2>
        {symbol && <VeyrholmSymbol type={symbol} className="journal-section__symbol" />}
        {title}
      </h2>
      {children}
    </section>
  );
}

function getQuestProgress(quest) {
  if (typeof quest.progress === 'number') {
    return Math.max(0, Math.min(100, quest.progress));
  }

  if (quest.status === 'concluida') return 100;
  if (quest.status === 'ativa') return 35;
  return 0;
}

function getItemSymbol(item) {
  const text = `${item.id} ${item.name} ${item.description}`.toLowerCase();

  if (/(estrela negra|ruptura|sentinela|andarilho)/.test(text)) return 'starBroken';
  if (/(veu|vigilia|cacador|lanterna negra|faca da vigilia)/.test(text)) return 'veilEye';
  if (/(brasa|chama|turibulo|fe)/.test(text)) return 'deadFlame';
  if (/(codice|livro|pagina|oracao)/.test(text)) return 'codex';
  if (/(nariel|elyr|arvore|raiz|memoria)/.test(text)) return 'memoryTree';

  return 'seal';
}
