import { DiceScene } from './dice/DiceScene.tsx';
import { rollDie } from './dice/diceRoller';

const DICE = [
  { sides: 4, label: 'D4', tone: 'amber' },
  { sides: 6, label: 'D6', tone: 'steel' },
  { sides: 8, label: 'D8', tone: 'verdant' },
  { sides: 10, label: 'D10', tone: 'ember' },
  { sides: 12, label: 'D12', tone: 'violet' },
  { sides: 20, label: 'D20', tone: 'gold' },
];

const MIN_QUANTITY = 1;
const MAX_QUANTITY = 12;
const ROLL_TICKS = 18;
const SOUND_STORAGE_KEY = 'd20-roller-sound-enabled';
const soundPath = (fileName) => `${import.meta.env.BASE_URL}sounds/${fileName}`;
const SOUND_PATHS = {
  failure: soundPath('critical-failure.ogg'),
  failureLayer: soundPath('critical-drop.ogg'),
  roll: soundPath('dice-roll.ogg'),
  success: soundPath('critical-success.ogg'),
  successLayer: soundPath('critical-impact.ogg'),
};

const state = {
  selectedSides: 20,
  quantity: 1,
  modifier: 0,
  soundEnabled: localStorage.getItem(SOUND_STORAGE_KEY) !== 'false',
  isRolling: false,
  criticalImpact: 'neutral',
  impactTimer: null,
  previewValues: [20],
  lastRoll: null,
  history: [],
};

const elements = {
  activeDie: document.querySelector('[data-active-die]'),
  appShell: document.querySelector('.dice-app-shell'),
  clearHistory: document.querySelector('[data-clear-history]'),
  dicePicker: document.querySelector('[data-dice-picker]'),
  diceScene: document.querySelector('[data-dice-scene]'),
  dieOverlay: document.querySelector('[data-die-overlay]'),
  dieOrbit: document.querySelector('[data-die-orbit]'),
  featuredResult: document.querySelector('[data-featured-result]'),
  historyList: document.querySelector('[data-history-list]'),
  modifier: document.querySelector('[data-modifier]'),
  quantityDecrease: document.querySelector('[data-quantity-decrease]'),
  quantityIncrease: document.querySelector('[data-quantity-increase]'),
  quantityValue: document.querySelector('[data-quantity-value]'),
  rollButton: document.querySelector('[data-roll-button]'),
  rollFormula: document.querySelector('[data-roll-formula]'),
  rollStatus: document.querySelector('[data-roll-status]'),
  rollStrip: document.querySelector('[data-roll-strip]'),
  rollTotal: document.querySelector('[data-roll-total]'),
  soundToggle: document.querySelector('[data-sound-toggle]'),
};

const diceScene = new DiceScene(elements.diceScene);
const sounds = createSoundLibrary();

init();

function init() {
  elements.dicePicker.replaceChildren(...DICE.map(createDieButton));

  elements.quantityDecrease.addEventListener('click', () => setQuantity(state.quantity - 1));
  elements.quantityIncrease.addEventListener('click', () => setQuantity(state.quantity + 1));

  elements.modifier.addEventListener('input', () => {
    state.modifier = Number(elements.modifier.value) || 0;
    render();
  });

  elements.rollButton.addEventListener('click', rollDice);
  elements.clearHistory.addEventListener('click', clearHistory);
  elements.soundToggle.addEventListener('click', toggleSound);
  render();
}

function createDieButton(die) {
  const button = document.createElement('button');
  button.className = 'die-button';
  button.textContent = die.label;
  button.type = 'button';
  button.addEventListener('click', () => {
    state.selectedSides = die.sides;
    state.previewValues = Array.from({ length: state.quantity }, () => die.sides);
    clearCriticalImpact(false);
    render();
  });
  return button;
}

function rollDice() {
  if (state.isRolling) return;

  const die = getSelectedDie();
  const finalValues = Array.from({ length: state.quantity }, () => rollDie(die.sides));
  const subtotal = finalValues.reduce((sum, value) => sum + value, 0);
  const total = subtotal + state.modifier;

  state.isRolling = true;
  state.previewValues = Array.from({ length: state.quantity }, () => rollDie(die.sides));
  clearCriticalImpact(false);
  playSound('roll');
  diceScene.rollTo(die, finalValues[0]);
  render();

  let tick = 0;
  const intervalId = window.setInterval(() => {
    tick += 1;

    if (tick >= ROLL_TICKS) {
      window.clearInterval(intervalId);
      state.isRolling = false;
      state.previewValues = finalValues;
      state.lastRoll = {
        id: globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random()}`,
        die,
        modifier: state.modifier,
        subtotal,
        total,
        values: finalValues,
        createdAt: new Date().toLocaleTimeString('pt-BR', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        }),
      };
      state.history = [state.lastRoll, ...state.history].slice(0, 8);
      playResultSound(state.lastRoll);
      triggerCriticalImpact(state.lastRoll);
      render();
      return;
    }

    state.previewValues = Array.from({ length: state.quantity }, () => rollDie(die.sides));
    render();
  }, 58);
}

function toggleSound() {
  state.soundEnabled = !state.soundEnabled;
  localStorage.setItem(SOUND_STORAGE_KEY, String(state.soundEnabled));
  render();
}

function setQuantity(nextQuantity) {
  if (state.isRolling) return;

  state.quantity = Math.min(MAX_QUANTITY, Math.max(MIN_QUANTITY, nextQuantity));
  state.previewValues = Array.from({ length: state.quantity }, () => state.selectedSides);
  render();
}

function clearHistory() {
  state.history = [];
  state.lastRoll = null;
  state.previewValues = [state.selectedSides];
  clearCriticalImpact(false);
  render();
}

function render() {
  const die = getSelectedDie();
  const tone = getResultTone(state.lastRoll);
  const impactTone = state.criticalImpact;
  const previewTotal = state.previewValues.reduce((sum, value) => sum + value, 0);
  const displayTotal = state.isRolling ? previewTotal : (state.lastRoll?.total ?? die.sides);

  elements.activeDie.textContent = `${die.label} ativo`;
  elements.rollButton.textContent = state.isRolling ? 'Rolando...' : `Rolar ${die.label}`;
  elements.rollButton.disabled = state.isRolling;
  elements.rollFormula.textContent = `${state.quantity}x${die.label}${state.modifier ? ` ${formatModifier(state.modifier)}` : ''}`;
  elements.rollTotal.textContent = String(displayTotal);
  elements.rollTotal.className = `roll-summary__total roll-summary__total--${tone}`;
  elements.rollStatus.textContent = getResultLabel(state.lastRoll, state.isRolling);
  elements.rollStatus.className = `roll-summary__status roll-summary__status--${tone}`;
  elements.quantityValue.textContent = `${state.quantity}x`;
  elements.quantityDecrease.disabled = state.isRolling || state.quantity <= MIN_QUANTITY;
  elements.quantityIncrease.disabled = state.isRolling || state.quantity >= MAX_QUANTITY;
  elements.soundToggle.textContent = state.soundEnabled ? 'Som ligado' : 'Som desligado';
  elements.soundToggle.setAttribute('aria-pressed', String(state.soundEnabled));
  elements.soundToggle.classList.toggle('sound-toggle--off', !state.soundEnabled);

  elements.appShell.classList.toggle('dice-app-shell--critical', impactTone === 'critical');
  elements.appShell.classList.toggle('dice-app-shell--danger', impactTone === 'danger');
  elements.dieOrbit.classList.toggle('die-orbit--rolling', state.isRolling);
  elements.dieOrbit.classList.toggle('die-orbit--critical', impactTone === 'critical');
  elements.dieOrbit.classList.toggle('die-orbit--danger', impactTone === 'danger');
  elements.dieOverlay.classList.toggle('dice-scene__overlay--rolling', state.isRolling);
  elements.dieOverlay.querySelector('span').textContent = die.label;
  elements.dieOverlay.querySelector('strong').textContent = String(state.previewValues[0] ?? die.sides);
  diceScene.setDie(die);

  elements.rollStrip.replaceChildren(...state.previewValues.map(createRollChip));
  Array.from(elements.dicePicker.children).forEach((button, index) => {
    button.classList.toggle('die-button--selected', DICE[index].sides === state.selectedSides);
  });

  renderFeaturedResult();
  renderHistory();
}

function createRollChip(value) {
  const chip = document.createElement('span');
  chip.className = state.isRolling ? 'roll-chip roll-chip--rolling' : 'roll-chip';
  chip.textContent = String(value);
  return chip;
}

function renderFeaturedResult() {
  if (!state.lastRoll) {
    elements.featuredResult.className = 'empty-state';
    elements.featuredResult.innerHTML = '<strong>Pronto para rolar</strong><span>D20 comeca no centro, os demais ja estao no seletor.</span>';
    return;
  }

  elements.featuredResult.replaceWith(createResultCard(state.lastRoll, true));
  elements.featuredResult = document.querySelector('[data-featured-result]');
}

function renderHistory() {
  elements.historyList.replaceChildren(
    ...state.history.slice(1).map((roll) => {
      const item = document.createElement('li');
      item.append(createResultCard(roll));
      return item;
    }),
  );
}

function createResultCard(roll, featured = false) {
  const article = document.createElement('article');
  const tone = getResultTone(roll);
  article.className = featured
    ? `result-card result-card--featured result-card--${tone}`
    : `result-card result-card--${tone}`;
  article.dataset.featuredResult = featured ? 'true' : '';
  article.innerHTML = `
    <div>
      <span>${roll.createdAt}</span>
      <strong>${roll.values.length}x${roll.die.label}</strong>
    </div>
    <p>${roll.values.join(' + ')}</p>
    <em>${roll.modifier ? `${roll.subtotal} ${formatModifier(roll.modifier)} = ` : ''}${roll.total}</em>
  `;
  return article;
}

function getSelectedDie() {
  return DICE.find((die) => die.sides === state.selectedSides) ?? DICE[5];
}

function getResultTone(roll) {
  if (!roll || roll.die.sides !== 20 || roll.values.length !== 1) return 'neutral';
  if (roll.values[0] === 20) return 'critical';
  if (roll.values[0] === 1) return 'danger';
  return 'neutral';
}

function getResultLabel(roll, isRolling) {
  if (isRolling) return 'O dado esta em movimento';
  if (!roll) return 'Clique em rolar para resolver';
  if (roll.die.sides === 20 && roll.values.length === 1 && roll.values[0] === 20) return 'ACERTO CRITICO! A mesa acende. Impacto maximo!';
  if (roll.die.sides === 20 && roll.values.length === 1 && roll.values[0] === 1) return 'FALHA CRITICA! Alerta vermelho. Tudo desandou!';
  return `${roll.values.length} rolagem${roll.values.length > 1 ? 's' : ''} resolvida${roll.values.length > 1 ? 's' : ''}`;
}

function formatModifier(value) {
  return value >= 0 ? `+${value}` : `${value}`;
}

function createSoundLibrary() {
  return Object.entries(SOUND_PATHS).reduce((library, [name, src]) => {
    const audio = new Audio(src);
    audio.preload = 'auto';
    audio.volume = getSoundVolume(name);
    library[name] = audio;
    return library;
  }, {});
}

function playResultSound(roll) {
  if (!roll || roll.die.sides !== 20 || roll.values.length !== 1) return;
  if (roll.values[0] === 20) {
    playSound('success');
    window.setTimeout(() => playSound('successLayer'), 90);
  }
  if (roll.values[0] === 1) {
    playSound('failure');
    window.setTimeout(() => playSound('failureLayer'), 75);
  }
}

function getSoundVolume(name) {
  if (name === 'roll') return 0.58;
  if (name.endsWith('Layer')) return 0.82;
  return 0.92;
}

function triggerCriticalImpact(roll) {
  const tone = getResultTone(roll);
  if (tone !== 'critical' && tone !== 'danger') return;

  clearCriticalImpact(false);
  state.criticalImpact = tone;
  state.impactTimer = window.setTimeout(() => {
    state.criticalImpact = 'neutral';
    state.impactTimer = null;
    render();
  }, 1900);
}

function clearCriticalImpact(shouldRender = true) {
  if (state.impactTimer) {
    window.clearTimeout(state.impactTimer);
    state.impactTimer = null;
  }

  state.criticalImpact = 'neutral';
  if (shouldRender) render();
}

function playSound(name) {
  if (!state.soundEnabled) return;

  const audio = sounds[name];
  if (!audio) return;

  audio.currentTime = 0;
  audio.play().catch(() => {
    // Browsers can block audio until the user has interacted with the page.
  });
}
