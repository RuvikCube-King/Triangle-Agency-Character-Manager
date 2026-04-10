# Triangle Agency Character Manager — Project Notes

## What This Is

A React + TypeScript web app for managing character sheets for the **Triangle Agency** TTRPG. Characters are stored in `localStorage` under the key `ta-characters`. No backend, no auth — fully client-side.

Tech stack: React 18, TypeScript, Vite, plain CSS (no CSS framework).

---

## Navigation Model

Three views managed in `App.tsx` via a `View = 'roster' | 'sheet' | 'edit'` state:

- **Roster** — list of all characters, with View / Edit / Delete per card, and a Create New button
- **Sheet** — read-only character display; some values (counters, pips, track boxes, toggles) are editable inline without going to the form
- **Edit** — full `CharacterForm` for all text/structural fields

Canceling from Edit goes back to Sheet if the character has a name, or to Roster if it's a brand-new unsaved character.

---

## Note Files

- [notes-data-model.md](notes-data-model.md) — Character interface, all types, ARC stats, static definitions
- [notes-systems.md](notes-systems.md) — Work/Life Balance, Dice Mechanics
- [notes-components.md](notes-components.md) — Component map, Persistence, CSS conventions, Game Rules Reference

---

## Extending the Game Data

### Adding a new Anomaly
Add an entry to `ANOMALY_DEFINITIONS` in `src/data/anomalies.ts` following the `AnomalyDefinition` shape. No type changes needed.

### Adding a new Reality
Add an entry to `REALITY_DEFINITIONS` in `src/data/realities.ts` following the `RealityDefinition` shape. Set `hasRealityTrack: true` if the Reality uses the 4-box track mechanic. No type changes needed.

### Adding a new Competency
Add an entry to `COMPETENCY_DEFINITIONS` in `src/data/competencies.ts` following the `CompetencyDefinition` shape. No type changes needed.
