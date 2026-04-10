# Triangle Agency — Game Systems

## Work/Life Balance

Accessed via the "Work / Life Balance" button in the `CharacterSheet` header. Renders `WorkLifeBalancePage`.

### Types (`src/types/workLifeBalance.ts`)

```typescript
type BoxState = 'empty' | 'marked' | 'struck';
type TrackName = 'competency' | 'reality' | 'anomaly';

interface WLBTrackState {
  boxes: BoxState[]; // exactly 30 entries, indices 0–29
}

interface WorkLifeBalance {
  competency: WLBTrackState;
  reality: WLBTrackState;
  anomaly: WLBTrackState;
  earnedCodes: string[];
  mvpCount: number;
  probationCount: number;
}
```

### Layout

Snake track — 15 boxes top row (left→right, indices 0–14), 15 boxes bottom row (stored left→right internally, rendered right→left visually, indices 15–29). Three tracks: Competency (red), Reality (gold), Anomaly (blue).

### Strike Mechanic

Marking a box in one track **strikes** the last empty box in each of the other two tracks. MVP and Probation award marks skip strikes.

### Rewards (triggered on mark)

- **Competency**: +3 commendations + player picks a QA with max < 9 → max and current both +1
- **Reality**: player picks a Relationship → connection +1 per Networked (connection=9) relationship plus 1 base
- **Anomaly**: Practice (set `practiced: true` on an ability) or Be Known (set `practiced: false`)

### Award Buttons (no box mark, no strikes)

| Button | Behavior |
|---|---|
| **MVP** (counter) | Increments `mvpCount`, marks Competency box without strikes, opens Competency reward |
| **Probation** (counter) | Increments `probationCount`, marks Anomaly box without strikes, opens Anomaly reward |
| **Neither** (button) | Opens Reality reward without marking any box |

### Box Codes

Static code positions defined in `src/data/workLifeBalance.ts` (`COMPETENCY_BOX_META`, `REALITY_BOX_META`, `ANOMALY_BOX_META`). Codes (e.g. "A3", "D4") are displayed inside boxes at all times. When a box is marked, its code is appended to `earnedCodes: string[]` on the character.

Competency track also shows rank label spans above each row: TRAINEE → DIRECTOR (top), REGIONAL DIRECTOR → CHAIR (bottom).

---

## Dice Mechanics

### `DiceRollResult` (`src/utils/rollDice.ts`)

```typescript
interface DiceRollResult {
  dice: number[];           // 6 dice, faces 1–4
  burnedIndices: number[];  // indices of 3s negated by burnout
  effectiveThrees: number;
  tier: 'success' | 'tiered' | 'failure';
  tieredStacks: number;
  triscendence: boolean;    // true when exactly 3 raw threes before burnout
  burnout: number;
}
```

### Tiered Modes (`TieredMode`)

`'per-three'` (default) | `'per-extra'` | `'six-plus'` | `'per-one'`

### Chaos

```
chaos = (dice.length - effectiveThrees) + burnedIndices.length
```

- 0 if `triscendence === true` or `effectiveThrees === 3`
- Displayed in purple after every roll result (`.roll-result-chaos`, CSS variable `--color-chaos: #7b2d8b`)
- Computed by `calcChaos(result: DiceRollResult)` in `src/utils/rollDice.ts`

### Triscendence

Triggered when `triscendence === true` (exactly 3 raw threes before burnout is applied). Opens `TriscendenceModal` — player may: spend a QA point to modify the roll, receive +3 commendations, or dismiss.

### QA Spend

`QASpendModal` — player spends QA current points to convert non-3 dice or un-burn burned dice. Shows a live chaos preview as the player adjusts. On Accept, the committed `DiceRollResult` is updated.
