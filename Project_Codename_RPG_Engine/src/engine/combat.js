import { createBlankEncounter, createBlankParticipant } from './defaultDatabase.js';

export function createEncounter(database) {
  const encounter = createBlankEncounter();
  return {
    ...database,
    settings: {
      ...database.settings,
      activeEncounterId: encounter.id,
    },
    encounters: [...database.encounters, encounter],
  };
}

export function addParticipant(database, encounterId, sheet) {
  const participant = createBlankParticipant(sheet?.id ?? null);
  const nextParticipant = {
    ...participant,
    label: sheet?.label ?? participant.label,
    health: sheet?.resources?.health ?? participant.health,
  };

  return updateEncounter(database, encounterId, (encounter) => ({
    ...encounter,
    participants: [...encounter.participants, nextParticipant],
  }));
}

export function updateParticipant(database, encounterId, participantId, patch) {
  return updateEncounter(database, encounterId, (encounter) => ({
    ...encounter,
    participants: encounter.participants.map((participant) => (
      participant.id === participantId ? { ...participant, ...patch } : participant
    )),
  }));
}

export function sortInitiative(database, encounterId) {
  return updateEncounter(database, encounterId, (encounter) => ({
    ...encounter,
    participants: [...encounter.participants].sort((a, b) => b.initiative - a.initiative),
    turnIndex: 0,
  }));
}

export function nextTurn(database, encounterId) {
  return updateEncounter(database, encounterId, (encounter) => {
    if (!encounter.participants.length) return encounter;
    const nextIndex = (encounter.turnIndex + 1) % encounter.participants.length;
    return {
      ...encounter,
      turnIndex: nextIndex,
      round: nextIndex === 0 ? encounter.round + 1 : encounter.round,
      status: 'active',
    };
  });
}

function updateEncounter(database, encounterId, updater) {
  return {
    ...database,
    encounters: database.encounters.map((encounter) => (
      encounter.id === encounterId ? updater(encounter) : encounter
    )),
  };
}

