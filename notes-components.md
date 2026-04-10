# Triangle Agency — Components, Persistence & CSS

## Component Map

| Component | Role |
|---|---|
| `CharacterRoster` | List view; create/view/edit/delete |
| `CharacterSheet` | Tabbed sheet (Overview, Anomaly, Relationships, Requisitions); inline edits for counters, pips, toggles; WLB button in header |
| `CharacterForm` | Full edit form for all text and structural fields |
| `AnomalyPanel` | Ability cards with roll buttons, personalization checkboxes, practiced toggle |
| `RealityPanel` | Reality track boxes, burnout toggle, 3 relationship cards with connection pips |
| `RequisitionsPanel` | Displays character requisitions from competency |
| `WorkLifeBalancePage` | WLB page: 3 snake tracks, MVP/Probation/Neither award buttons, earned codes list |
| `WLBTrack` | Single WLB track: 30 boxes in snake layout with arrows, rank labels, box codes |
| `WLBRewardModal` | Reward picker modal triggered on box mark (Competency/Reality/Anomaly variants) |
| `TriscendenceModal` | Modal for triscendence rolls: QA spend, commend, or dismiss |
| `QASpendModal` | Modal for spending QA to modify roll result; shows live chaos preview |

---

## Persistence

`useCharacters` hook (`src/hooks/useCharacters.ts`) manages state and syncs to `localStorage` via `useEffect`. Key: `ta-characters`. Characters have UUIDs from `crypto.randomUUID()`.

**`migrateCharacter()`** runs on every load and handles old saves:
1. Converts `competency: string` → `competency: null` (old schema)
2. Deletes deprecated fields: `primeDirective`, `sanctionedBehaviors`
3. Backfills `workLifeBalance` using `createDefaultWorkLifeBalance()` if missing

---

## CSS Conventions

- CSS variables for accent colors: `--color-anomaly` (#1b3a8c), `--color-reality` (#c89a00), `--color-competency` (#b82020), `--color-chaos` (#7b2d8b, purple)
- `--color-muted`, `--color-surface`, `--color-border`, `--color-bg`
- QA pips use a triangle `clip-path: polygon(50% 0%, 0% 100%, 100% 100%)`
- Connection pips use `border-radius: 50%` (circular) to be visually distinct from QA pips
- Burnout badge and relationship active badge: green when activated, red when inactive
- `.ability-practiced-label` turns `--color-anomaly` when checked, grey otherwise
- `.roll-result-chaos` displays chaos in `--color-chaos` purple
- Mobile-responsive via `@media (max-width: 640px)`: single-column layouts, touch targets (counter-adj 44px, qa-pip 26px), WLB tracks scroll horizontally per track

---

## Game Rules Reference (as implemented)

- **Reality Trigger**: GM spends 3 Chaos to trigger. For Romantic: notice a Vibe; if ignored, closest relationship loses 1 Connection; existing relationship blocking a new one marks a track box; all 4 boxes full = reset.
- **Burnout Release**: condition under which a character ignores all Burnout. For Romantic: when doing something to look more attractive or sympathetic.
- **Prime Directive**: broken = 1 Demerit. Text sourced from `CompetencyDefinition`, not stored on `Character`.
- **Sanctioned Behaviors**: all 3 completed in one mission = 3 Commendations bonus. Text sourced from `CompetencyDefinition`.
- **Connection = 9**: relationship is NETWORKED.
- **Practiced**: per-ability boolean on the Anomaly; set via WLB Anomaly reward (Practice/Be Known).
- **Chaos**: every roll produces chaos = (non-effective-3 dice) + (burned dice). Zero on triscendence or if exactly 3 effective threes. GM uses chaos to trigger Reality Triggers and other effects.
- **Triscendence**: rolling exactly 3 raw threes (before burnout) triggers a special modal — player may spend QA, take +3 commendations, or dismiss.
- **WLB Strike**: marking one track strikes the last empty box of the other two tracks.
- **WLB Rewards**: Competency → +3 commendations + QA max/current +1; Reality → chosen relationship gains connection; Anomaly → set practiced on any ability.
- **MVP/Probation**: counter-tracked awards that mark a box without triggering strikes.
