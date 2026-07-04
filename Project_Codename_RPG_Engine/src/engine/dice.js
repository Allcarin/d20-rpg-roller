export function rollCheck({ sides = 20, modifier = 0, settings }) {
  const raw = Math.floor(Math.random() * sides) + 1;
  const total = raw + modifier;
  const outcome = getOutcome(raw, settings);

  return {
    id: `roll-${crypto.randomUUID()}`,
    raw,
    sides,
    modifier,
    total,
    outcome,
    createdAt: new Date().toISOString(),
  };
}

export function getOutcome(raw, settings) {
  if (raw === settings.criticalFailure) return 'criticalFailure';
  if (raw === settings.criticalSuccess) return 'criticalSuccess';
  if (raw >= settings.successThreshold) return 'success';
  return 'failure';
}

