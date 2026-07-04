# Paleta, assets, icones e fontes

## Paleta de cores

| token | valor | uso |
| --- | --- | --- |
| `--bg` | `#050403` | fundo principal |
| `--panel` | `rgba(20, 17, 13, 0.94)` | paineis |
| `--panel-raised` | `rgba(27, 23, 17, 0.96)` | paineis elevados |
| `--panel-soft` | `rgba(43, 35, 25, 0.7)` | superficies suaves |
| `--ink` | `#efe6cf` | texto principal |
| `--muted` | `#b8a98a` | texto secundario |
| `--gold` | `#8c7440` | ouro envelhecido |
| `--gold-bright` | `#d8c17a` | destaque dourado |
| `--faith` | `#c9c2a3` | fe/chama morta |
| `--blood` | `#4a1412` | vermelho escuro |
| `--blood-bright` | `#8e2b24` | vermelho ativo |
| `--spectral` | `#8fb6c7` | azul espectral |
| `--line` | `rgba(140, 116, 64, 0.54)` | bordas |
| `--line-soft` | `rgba(216, 193, 122, 0.18)` | bordas suaves |
| `--shadow` | `rgba(0, 0, 0, 0.68)` | sombras |

## Fontes

- Fonte principal: `"Trebuchet MS", "Segoe UI", system-ui, sans-serif`.
- Fonte de titulos: `Georgia, "Times New Roman", serif`.
- Nao ha arquivos de fonte externos no projeto.

## Assets existentes

- Nao ha pasta `public/` ou imagens raster originais.
- Os assets visuais sao implementados como CSS e SVG inline.
- Builds antigos em `dist*` contem bundles gerados, mas nao devem ser tratados como fonte primaria.

## Icones

Biblioteca SVG em `VeyrholmSymbol.jsx`:

- `keyIncomplete`
- `closedEye`
- `closedEyeComplete`
- `starBroken`
- `veilEye`
- `deadFlame`
- `memoryTree`
- `key`
- `guardian`
- `king`
- `codex`
- `seal`
- `maskEye`
- `boneOracle`
- `ritualDie`

Icones pixelados em CSS para itens:

- `pixel-item--ember`
- `pixel-item--book`
- `pixel-item--blade`
- `pixel-item--relic`

Status visuais em CSS:

- `status-mark--ash`
- `status-mark--vow`
- `status-mark--throat`
- `status-mark--echo`

