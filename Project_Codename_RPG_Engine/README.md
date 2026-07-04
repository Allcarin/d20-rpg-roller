# Project Codename: RPG Engine

Generic modular tabletop campaign platform.

This project contains no official system content, no setting, no campaign, no city, no monster, no faction, no item, and no narrative text. All playable data is created, imported, or edited through the local database.

## Modes

The app has two separated interfaces:

- `Modo Mestre`: full campaign control, hidden information, record visibility, combat, maps, loot, XP, NPCs, monsters, handouts, images, future lighting/audio modules, permissions and database tools.
- `Modo Jogador`: player table only. It shows player-visible records and player-owned records. It does not expose master tools, database management, permissions, hidden records, monsters, NPC prep, XP distribution, loot control, lighting, music controls, or unrestricted sheet editing.

The current real-time layer uses `BroadcastChannel` plus a `localStorage` fallback for same-origin browser tabs/sessions. The adapter is isolated in `src/engine/realtime.js` so a future WebSocket/server transport can replace it without changing modules.

## Modules

- Personagens
- Classes
- Racas
- Backgrounds
- Pericias
- Magias
- Equipamentos
- Itens
- Talentos
- Monstros
- NPCs
- Condicoes
- Missoes
- Campanhas
- Aventuras
- Mapas
- Sessoes
- Diario
- Eventos
- Combate
- Iniciativa
- Inventario
- Loot
- XP
- Loja
- Economia
- Handouts
- Imagens
- Musicas
- Iluminacao
- Dados

Each module is an independent database collection with its own schema and `records: []` on first load.

## Run

```powershell
cd "C:\Users\User\OneDrive\Documentos\chat RPGT\Project_Codename_RPG_Engine"
& "C:\Program Files\nodejs\npm.cmd" install
& "C:\Program Files\nodejs\npm.cmd" run dev
```

## Data model

The database is stored in `localStorage` under `rpg-campaign-platform-db-v3`. Use the Banco tab in Modo Mestre to export or import JSON.
