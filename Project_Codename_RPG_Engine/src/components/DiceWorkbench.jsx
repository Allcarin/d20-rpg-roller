import { useMemo, useState } from 'react';
import { rollCheck } from '../engine/dice.js';
import Icon from './Icon.jsx';

export default function DiceWorkbench({ diceModule, disabled, onRoll }) {
  const diceProfiles = useMemo(() => diceModule.records, [diceModule.records]);
  const [profileId, setProfileId] = useState('');
  const [sides, setSides] = useState(20);
  const [modifier, setModifier] = useState(0);
  const [threshold, setThreshold] = useState(10);

  const selectedProfile = diceProfiles.find((record) => record.id === profileId);

  const useProfile = (nextProfileId) => {
    setProfileId(nextProfileId);
    const profile = diceProfiles.find((record) => record.id === nextProfileId);
    if (!profile) return;
    if (Number(profile.data.sides)) setSides(Number(profile.data.sides));
    if (Number.isFinite(Number(profile.data.modifier))) setModifier(Number(profile.data.modifier));
    if (Number(profile.data.threshold)) setThreshold(Number(profile.data.threshold));
  };

  const roll = () => {
    const result = rollCheck({
      sides: Number(sides),
      modifier: Number(modifier),
      settings: {
        successThreshold: Number(threshold),
        criticalFailure: 1,
        criticalSuccess: Number(sides),
      },
    });

    onRoll({
      ...result,
      profileId: selectedProfile?.id ?? null,
      profileLabel: selectedProfile?.label ?? '',
    });
  };

  return (
    <section className="panel">
      <div className="panel-heading">
        <span>
          <Icon name="dados" />
          Bancada de Dados
        </span>
        <button type="button" disabled={disabled} onClick={roll}>
          <Icon name="dice" />
          Rolar
        </button>
      </div>

      <div className="roll-controls">
        <label className="field">
          <span>Perfil salvo no modulo Dados</span>
          <select value={profileId} disabled={disabled} onChange={(event) => useProfile(event.target.value)}>
            <option value="">Rolagem manual</option>
            {diceProfiles.map((profile) => (
              <option key={profile.id} value={profile.id}>{profile.label || profile.id}</option>
            ))}
          </select>
        </label>
        <label className="field">
          <span>Lados</span>
          <input type="number" min="2" value={sides} disabled={disabled} onChange={(event) => setSides(event.target.value)} />
        </label>
        <label className="field">
          <span>Modificador</span>
          <input type="number" value={modifier} disabled={disabled} onChange={(event) => setModifier(event.target.value)} />
        </label>
        <label className="field">
          <span>Alvo</span>
          <input type="number" value={threshold} disabled={disabled} onChange={(event) => setThreshold(event.target.value)} />
        </label>
      </div>
    </section>
  );
}

