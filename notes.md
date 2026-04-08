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

## Data Model (`src/types/character.ts`)

### `Character`

```typescript
interface Character {
  id: string;
  // Identity
  name: string;
  pronouns: string;
  agencyTitle: string;
  agencyStanding: string;
  // ARC Stats — all strings/objects, NOT numbers
  anomaly: CharacterAnomaly | null;
  reality: CharacterReality | null;
  competency: string;
  // Counters
  commendations: number;
  demerits: number;
  additionalBurnout: number;
  // Mechanics
  primeDirective: string;
  sanctionedBehaviors: [string, string, string];
  // Quality Assurances
  qualityAssurances: Record<QAKey, QualityAssurance>;
}
```

### Quality Assurances

Nine QA stats, each with `{ current: number; max: number }`. The nine keys (in `QA_KEYS`):
`attentiveness`, `duplicity`, `dynamism`, `empathy`, `initiative`, `persistence`, `presence`, `professionalism`, `subtlety`

Displayed as pip tracks on the sheet. If `max === 0`, the sheet renders 9 pips. Clicking the last-filled pip unfills it (toggle behavior).

### Counters

`commendations`, `demerits`, `additionalBurnout` — non-negative integers, adjustable with +/− buttons on both the sheet and the form.

### Mechanics (narrative)

- **Prime Directive** — a rule the character follows; receive 1 Demerit if broken
- **Sanctioned Behaviors** — 3 strings; bonus 3 Commendations if all 3 done in a single mission
- **Reality Trigger** and **Burnout Release** — sourced from the Reality definition (not freeform text)

---

## ARC Stats

### Anomaly (`CharacterAnomaly`)

```typescript
interface CharacterAnomaly {
  anomalyId: string;
  personalizationProgress: Partial<Record<string, AbilityProgress>>;
}

interface AbilityProgress {
  practiced: boolean;
  answers: [AnswerCheckboxes, AnswerCheckboxes]; // each AnswerCheckboxes = [boolean, boolean, boolean]
}
```

The anomaly is selected from `ANOMALY_DEFINITIONS` in `src/data/anomalies.ts`. Currently one anomaly defined: **Dream** (3 abilities: Nightmare, Naptime, Site Visit).

Each ability has:
- A name, flavor description, and `rollStat` (a `QAKey`)
- Three outcome types: `success` (▲), `tiered` (★), `failure` (✕) — tiered outcomes can have bullet `options`
- A personalization prompt with two answers, each with a 3-checkbox track and a code string (e.g. "D1", "R13")
- A **practiced** boolean — shown as a checkbox in the top of the ability card in `AnomalyPanel`

### Reality (`CharacterReality`)

```typescript
interface CharacterReality {
  realityId: string;
  burnoutRelease: { activated: boolean };
  realityTriggerBoxes: [boolean, boolean, boolean, boolean];
  relationships: [Relationship, Relationship, Relationship];
}

interface Relationship {
  name: string;
  playedBy: string;
  description: string;
  connection: number; // 0–9
  connectionBonus: string;
  active: boolean;
}
```

The reality is selected from `REALITY_DEFINITIONS` in `src/data/realities.ts`. Currently one reality defined: **Romantic**.

- **Reality Trigger** — "Oh No, They're Hot": 4-box track (`realityTriggerBoxes`) for the "Settled" mechanic
- **Burnout Release** — "That's Right, I'm Hot": toggle (`burnoutRelease.activated`)
- **Relationship Matrix** — 3 relationships, each with a connection pip track (0–9); at 9 the relationship is "NETWORKED"

The static definition (`RealityDefinition`) holds the display text, question labels, and `hasRealityTrack` flag. The dynamic state (`CharacterReality`) holds the runtime values.

### Competency

Freeform string — not numerical.

---

## Static Definition Types

### `AnomalyDefinition` (`src/types/anomaly.ts`)

```typescript
interface AnomalyDefinition {
  id: string;
  name: string;
  abilities: AbilityDefinition[];
}

interface AbilityDefinition {
  name: string;
  description: string;
  rollStat: QAKey;
  outcomes: Outcome[];
  personalization: PersonalizationPrompt;
}
```

### `RealityDefinition` (`src/types/reality.ts`)

```typescript
interface RealityDefinition {
  id: string;
  name: string;
  realityTrigger: { name: string; description: string };
  burnoutRelease: { name: string; description: string; activated: boolean };
  onboardingQuestions: string[];
  relationshipMatrixQuestions: [string, string, string];
  hasRealityTrack: boolean;
}
```

---

## Component Map

| Component | Role |
|---|---|
| `CharacterRoster` | List view, create/view/edit/delete |
| `CharacterSheet` | Full read-only sheet; inline edits for counters, pips, track boxes, toggles |
| `CharacterForm` | Full edit form for all text and structural fields |
| `AnomalyPanel` | Renders all abilities with outcomes, personalization checkboxes, and practiced toggle |
| `RealityPanel` | Renders reality track boxes, burnout toggle, and 3 relationship cards with connection pips |

---

## Persistence

`useCharacters` hook (`src/hooks/useCharacters.ts`) manages state and syncs to `localStorage` via `useEffect`. Key: `ta-characters`. Characters have UUIDs from `crypto.randomUUID()`.

---

## CSS Conventions

- CSS variables for accent colors: `--color-anomaly` (anomaly accent), `--color-reality` (gold for Reality UI), `--color-muted`, `--color-surface`, `--color-border`
- QA pips use a triangle clip-path polygon
- Connection pips use `border-radius: 50%` (circular) to be visually distinct
- Burnout badge and relationship active badge: green when activated, red when inactive
- `ability-practiced-label` turns `--color-anomaly` when checked; grey (`--color-muted`) otherwise

---

## Extending the Game Data

### Adding a new Anomaly
Add an entry to `ANOMALY_DEFINITIONS` in `src/data/anomalies.ts` following the `AnomalyDefinition` shape. No type changes needed.

### Adding a new Reality
Add an entry to `REALITY_DEFINITIONS` in `src/data/realities.ts` following the `RealityDefinition` shape. Set `hasRealityTrack: true` if the Reality uses the 4-box track mechanic. No type changes needed.

---

## Game Rules Reference (as implemented)

- **Reality Trigger**: GM spends 3 Chaos to trigger. For Romantic: notice a Vibe; if ignored, closest relationship loses 1 Connection; existing relationship blocking a new one marks a track box; all 4 boxes full = reset.
- **Burnout Release**: condition under which a character ignores all Burnout. For Romantic: when doing something to look more attractive or sympathetic.
- **Prime Directive**: broken = 1 Demerit.
- **Sanctioned Behaviors**: all 3 completed in one mission = 3 Commendations bonus.
- **Connection = 9**: relationship is NETWORKED.
- **Practiced**: per-ability boolean on the Anomaly; meaning is game/table-defined.
