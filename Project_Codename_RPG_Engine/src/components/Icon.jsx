export default function Icon({ name, className = '' }) {
  return (
    <span className={`icon icon--${name} ${className}`.trim()} aria-hidden="true">
      {icons[name] ?? icons.default}
    </span>
  );
}

const icons = {
  dashboard: '⌂',
  sheet: '▤',
  inventory: '▧',
  dice: '◇',
  combat: '⚔',
  database: '⌬',
  permissions: '◈',
  events: '≡',
  personagens: '◉',
  classes: '▣',
  racas: '◎',
  backgrounds: '◌',
  aventuras: '▱',
  pericias: '✦',
  magias: '✧',
  equipamentos: '▧',
  itens: '□',
  talentos: '✹',
  monstros: '▲',
  npcs: '●',
  condicoes: '◍',
  missoes: '☷',
  campanhas: '▦',
  mapas: '▥',
  sessoes: '◷',
  diario: '≣',
  eventos: '✚',
  combate: '⚔',
  iniciativa: '↕',
  inventario: '▤',
  loot: '⬙',
  xp: '↟',
  loja: '◫',
  economia: '¤',
  handouts: '▨',
  imagens: '▩',
  musicas: '♫',
  iluminacao: '☼',
  dados: '◇',
  add: '+',
  save: '✓',
  next: '›',
  default: '•',
};
