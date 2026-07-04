const symbolLabels = {
  keyIncomplete: 'Marca da Chave',
  closedEye: 'Olho Fechado',
  closedEyeComplete: 'Olho Fechado completo',
  starBroken: 'Estrela Negra Partida',
  veilEye: 'Olho atravessado por lanca',
  deadFlame: 'Chama Morta',
  memoryTree: 'Arvore da memoria preservada',
  key: 'Chave',
  guardian: 'Guardiao',
  king: 'Rei',
  codex: 'Codice',
  seal: 'Selo',
  maskEye: 'Mascara e olho',
  boneOracle: 'Oraculo de osso',
  ritualDie: 'Dado ritual',
};

export default function VeyrholmSymbol({ type = 'closedEye', className = '', title, decorative = true }) {
  const label = title ?? symbolLabels[type] ?? 'Simbolo de Veyrholm';

  return (
    <svg
      className={`veyr-symbol veyr-symbol--${type} ${className}`.trim()}
      viewBox="0 0 64 64"
      role={decorative ? 'img' : undefined}
      aria-hidden={decorative ? 'true' : undefined}
      aria-label={decorative ? undefined : label}
      focusable="false"
    >
      {!decorative && <title>{label}</title>}
      {renderSymbol(type)}
    </svg>
  );
}

function renderSymbol(type) {
  switch (type) {
    case 'keyIncomplete':
      return (
        <>
          <path className="sigil-line sigil-line--faint" d="M32 9v46" />
          <path className="sigil-line sigil-line--broken" d="M11 33c9-12 29-12 42 0" />
          <path className="sigil-line sigil-line--broken" d="M13 33c9 11 28 11 40 0" />
          <path className="sigil-fill sigil-fill--dim" d="M19 33c8-6 19-7 29 0c-9 6-19 7-29 0Z" />
          <path className="sigil-line" d="M32 12l5 8l-5 5l-5-5Z" />
          <path className="sigil-line" d="M32 46l4 5l-4 7l-4-7Z" />
          <path className="sigil-line sigil-line--silver" d="M18 17c-4 6-5 16-1 23" />
          <path className="sigil-line sigil-line--silver" d="M48 18c3 6 3 13 0 20" />
          <path className="sigil-crack" d="M43 14l-7 8l5 5l-8 7" />
          <path className="sigil-crack" d="M49 39l-8 2l3 5" />
        </>
      );
    case 'closedEyeComplete':
      return (
        <>
          <circle className="sigil-line sigil-line--faint" cx="32" cy="32" r="24" />
          <path className="sigil-line" d="M10 32c10-14 34-14 44 0c-10 14-34 14-44 0Z" />
          <path className="sigil-fill sigil-fill--dim" d="M20 32c7-6 17-6 24 0c-7 6-17 6-24 0Z" />
          <path className="sigil-line" d="M32 8v48" />
          <path className="sigil-line sigil-line--silver" d="M16 18c9-8 23-10 35-1" />
          <path className="sigil-line sigil-line--silver" d="M16 46c9 8 23 10 35 1" />
        </>
      );
    case 'starBroken':
      return (
        <>
          <path className="sigil-fill sigil-fill--void" d="M32 6l6 18l19-1l-15 11l7 18l-17-11l-17 11l7-18l-15-11l19 1Z" />
          <path className="sigil-line sigil-line--ember" d="M32 7l-2 21l-12-7l10 14l-13 14l17-9l10 9l-6-15l11-13l-13 6Z" />
          <path className="sigil-crack sigil-crack--ember" d="M31 13l3 15l-6 8l5 15" />
          <path className="sigil-crack sigil-crack--ember" d="M13 30l16 2l12-8l10-2" />
          <path className="sigil-line sigil-line--faint" d="M9 49l46-34" />
        </>
      );
    case 'veilEye':
      return (
        <>
          <circle className="sigil-line sigil-line--faint" cx="32" cy="32" r="22" />
          <path className="sigil-line" d="M9 34c9-12 35-12 46 0c-11 11-35 11-46 0Z" />
          <path className="sigil-fill sigil-fill--dim" d="M21 34c7-5 16-5 23 0c-7 5-16 5-23 0Z" />
          <path className="sigil-line sigil-line--silver" d="M32 5v54" />
          <path className="sigil-fill sigil-fill--silver" d="M32 3l5 14h-10Z" />
          <path className="sigil-fill sigil-fill--silver" d="M32 61l-5-14h10Z" />
          <path className="sigil-line sigil-line--faint" d="M15 18l34 34" />
        </>
      );
    case 'deadFlame':
      return (
        <>
          <path className="sigil-line sigil-line--faint" d="M18 45c5 8 23 9 29 0" />
          <path className="sigil-fill sigil-fill--spectral" d="M32 8c8 13-4 17 7 28c4 4 5 10 1 15c-3 4-12 6-18 1c-7-6-5-15 0-21c4-5 8-10 10-23Z" />
          <path className="sigil-line sigil-line--silver" d="M32 10c6 12-2 17 5 27c4 6 1 14-6 15" />
          <path className="sigil-line" d="M21 51c-5-9 3-16 7-23" />
          <path className="sigil-line" d="M43 51c5-9-2-15-8-21" />
          <circle className="sigil-line sigil-line--faint" cx="32" cy="36" r="21" />
        </>
      );
    case 'memoryTree':
      return (
        <>
          <circle className="sigil-line sigil-line--faint" cx="32" cy="32" r="25" />
          <path className="sigil-line sigil-line--silver" d="M32 55c0-11 0-29 0-45" />
          <path className="sigil-line" d="M32 24c-8-5-14-4-20 1" />
          <path className="sigil-line" d="M32 24c8-5 14-4 20 1" />
          <path className="sigil-line" d="M32 33c-9-1-15 3-20 10" />
          <path className="sigil-line" d="M32 33c9-1 15 3 20 10" />
          <path className="sigil-line sigil-line--silver" d="M32 55c-8-6-13-10-22-8" />
          <path className="sigil-line sigil-line--silver" d="M32 55c8-6 13-10 22-8" />
          <path className="sigil-fill" d="M29 13l3-7l3 7l-3 5Z" />
        </>
      );
    case 'key':
      return (
        <>
          <circle className="sigil-line" cx="28" cy="21" r="10" />
          <path className="sigil-line sigil-line--silver" d="M34 28l16 16" />
          <path className="sigil-line" d="M43 37l-5 5" />
          <path className="sigil-line" d="M48 42l-5 5" />
          <path className="sigil-line sigil-line--faint" d="M16 21h24" />
        </>
      );
    case 'guardian':
      return (
        <>
          <path className="sigil-line sigil-line--silver" d="M32 7l21 9v14c0 14-8 23-21 28c-13-5-21-14-21-28v-14Z" />
          <path className="sigil-line" d="M32 14v35" />
          <path className="sigil-line" d="M20 30h24" />
          <circle className="sigil-line sigil-line--faint" cx="32" cy="31" r="13" />
        </>
      );
    case 'king':
      return (
        <>
          <path className="sigil-line" d="M12 45h40" />
          <path className="sigil-line sigil-line--silver" d="M15 43l5-24l12 14l12-14l5 24" />
          <path className="sigil-fill" d="M20 16l3 6l-6 1Z" />
          <path className="sigil-fill" d="M32 26l4 7h-8Z" />
          <path className="sigil-fill" d="M44 16l3 7l-6-1Z" />
          <circle className="sigil-line sigil-line--faint" cx="32" cy="34" r="23" />
        </>
      );
    case 'codex':
      return (
        <>
          <path className="sigil-line" d="M12 13h18c5 0 8 3 8 8v33c-2-4-5-6-10-6h-16Z" />
          <path className="sigil-line sigil-line--silver" d="M52 13h-18c-5 0-8 3-8 8v33c2-4 5-6 10-6h16Z" />
          <path className="sigil-line sigil-line--faint" d="M32 17v36" />
          <path className="sigil-line sigil-line--faint" d="M17 23h10M17 31h10M39 23h8M39 31h8" />
        </>
      );
    case 'seal':
      return (
        <>
          <circle className="sigil-line" cx="32" cy="32" r="20" />
          <circle className="sigil-line sigil-line--faint" cx="32" cy="32" r="12" />
          <path className="sigil-line sigil-line--silver" d="M32 10v44M10 32h44" />
          <path className="sigil-fill" d="M32 25l5 7l-5 7l-5-7Z" />
        </>
      );
    case 'maskEye':
      return (
        <>
          <path className="sigil-line sigil-line--silver" d="M18 10c10 6 18 6 28 0c4 18 0 35-14 46c-14-11-18-28-14-46Z" />
          <path className="sigil-line" d="M19 31c6-6 20-6 26 0c-6 6-20 6-26 0Z" />
          <path className="sigil-line sigil-line--faint" d="M32 15v37" />
          <path className="sigil-crack" d="M43 15l-8 10l5 9l-6 9" />
        </>
      );
    case 'boneOracle':
      return (
        <>
          <circle className="sigil-line sigil-line--faint" cx="32" cy="32" r="24" />
          <path className="sigil-line sigil-line--silver" d="M18 46l28-28" />
          <circle className="sigil-line" cx="18" cy="46" r="5" />
          <circle className="sigil-line" cx="46" cy="18" r="5" />
          <path className="sigil-line" d="M24 24h16v16h-16Z" />
          <path className="sigil-fill" d="M31 31h3v3h-3Z" />
          <path className="sigil-fill" d="M26 26h3v3h-3Z" />
          <path className="sigil-fill" d="M36 36h3v3h-3Z" />
        </>
      );
    case 'ritualDie':
      return (
        <>
          <path className="sigil-line sigil-line--silver" d="M32 7l24 14v22l-24 14l-24-14v-22Z" />
          <path className="sigil-line" d="M32 7v50M8 21l24 14l24-14M8 43l24-8l24 8" />
          <circle className="sigil-fill" cx="32" cy="35" r="2" />
          <circle className="sigil-fill" cx="21" cy="27" r="2" />
          <circle className="sigil-fill" cx="43" cy="27" r="2" />
        </>
      );
    default:
      return (
        <>
          <circle className="sigil-line" cx="32" cy="32" r="20" />
          <path className="sigil-line sigil-line--silver" d="M12 32h40M32 12v40" />
        </>
      );
  }
}
