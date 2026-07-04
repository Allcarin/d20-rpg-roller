import Icon from './Icon.jsx';

export default function CombatPanel({
  encounters,
  activeEncounterId,
  sheets,
  disabled,
  onCreateEncounter,
  onSelectEncounter,
  onAddParticipant,
  onUpdateParticipant,
  onSortInitiative,
  onNextTurn,
}) {
  const activeEncounter = encounters.find((encounter) => encounter.id === activeEncounterId) ?? null;
  const currentParticipant = activeEncounter?.participants[activeEncounter.turnIndex] ?? null;

  return (
    <section className="panel">
      <div className="panel-heading">
        <span>
          <Icon name="combat" />
          Combat
        </span>
        <button type="button" disabled={disabled} onClick={onCreateEncounter}>
          <Icon name="add" />
          Encounter
        </button>
      </div>

      <div className="combat-toolbar">
        <label className="field">
          <span>Active encounter</span>
          <select value={activeEncounterId ?? ''} disabled={disabled || !encounters.length} onChange={(event) => onSelectEncounter(event.target.value || null)}>
            <option value="">None</option>
            {encounters.map((encounter) => (
              <option key={encounter.id} value={encounter.id}>{encounter.label}</option>
            ))}
          </select>
        </label>
        <button type="button" disabled={disabled || !activeEncounter} onClick={() => onSortInitiative(activeEncounter.id)}>
          Sort Initiative
        </button>
        <button type="button" disabled={disabled || !activeEncounter} onClick={() => onNextTurn(activeEncounter.id)}>
          <Icon name="next" />
          Next Turn
        </button>
      </div>

      {activeEncounter ? (
        <>
          <div className="encounter-status">
            <span>Round {activeEncounter.round}</span>
            <strong>{currentParticipant ? currentParticipant.label : 'No active turn'}</strong>
          </div>

          <div className="participant-actions">
            <button type="button" disabled={disabled} onClick={() => onAddParticipant(activeEncounter.id, null)}>
              <Icon name="add" />
              Blank Participant
            </button>
            {sheets.map((sheet) => (
              <button type="button" disabled={disabled} key={sheet.id} onClick={() => onAddParticipant(activeEncounter.id, sheet)}>
                <Icon name="add" />
                {sheet.label}
              </button>
            ))}
          </div>

          <div className="participant-list">
            {activeEncounter.participants.map((participant, index) => (
              <article className={`participant ${index === activeEncounter.turnIndex ? 'is-active' : ''}`} key={participant.id}>
                <input value={participant.label} disabled={disabled} onChange={(event) => onUpdateParticipant(activeEncounter.id, participant.id, { label: event.target.value })} />
                <label>
                  Initiative
                  <input type="number" value={participant.initiative} disabled={disabled} onChange={(event) => onUpdateParticipant(activeEncounter.id, participant.id, { initiative: Number(event.target.value) })} />
                </label>
                <label>
                  Health
                  <input type="number" value={participant.health.current} disabled={disabled} onChange={(event) => onUpdateParticipant(activeEncounter.id, participant.id, { health: { ...participant.health, current: Number(event.target.value) } })} />
                </label>
              </article>
            ))}
          </div>
        </>
      ) : (
        <p className="muted">Combat is encounter-based. Create an encounter, add participants, sort initiative, then advance turns.</p>
      )}
    </section>
  );
}

