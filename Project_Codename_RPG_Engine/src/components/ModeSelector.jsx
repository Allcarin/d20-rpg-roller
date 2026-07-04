import Icon from './Icon.jsx';

export default function ModeSelector({ activeMode, onModeChange }) {
  return (
    <div className="mode-selector" aria-label="Modo de uso">
      <button
        className={activeMode === 'master' ? 'is-active' : ''}
        type="button"
        onClick={() => onModeChange('master')}
      >
        <Icon name="permissions" />
        Modo Mestre
      </button>
      <button
        className={activeMode === 'player' ? 'is-active' : ''}
        type="button"
        onClick={() => onModeChange('player')}
      >
        <Icon name="personagens" />
        Modo Jogador
      </button>
    </div>
  );
}

