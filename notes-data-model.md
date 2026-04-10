# Triangle Agency — Data Model

## `Character` (`src/types/character.ts`)

```typescript
interface Character {
  id: string;
  // Identity
  name: string;
  pronouns: string;
  agencyTitle: string;
  agencyStanding: string;
  // ARC Stats
  anomaly: CharacterAnomaly | null;
  reality: CharacterReality | null;
  competency: CharacterCompetency | null;
  // Progression
  requisitions: Requisition[];
  workLifeBalance: WorkLifeBalance;
  // Counters
  commendations: number;
  demerits: number;
  additionalBurnout: number;
  // Quality Assurances
  qualityAssurances: Record<QAKey, QualityAssurance>;
}
```

### Quality Assurances

Nine QA stats, each with `{ current: number; max: number }`. The nine keys (in `QA_KEYS`):
`attentiveness`, `duplicity`, `dynamism`, `empathy`, `initiative`, `persistence`, `presence`, `professionalism`, `subtlety`

Displayed as pip tracks on the sheet. Clicking the last-filled pip unfills it (toggle behavior).

### Counters

`commendations`, `demerits`, `additionalBurnout` — non-negative integers, adjustable with +/− buttons on both the sheet and the form.

### Competency (`CharacterCompetency`)

```typescript
interface CharacterCompetency {
  competencyId: string;
  selfAssessmentCompleted: boolean;
}
```

Selected from `COMPETENCY_DEFINITIONS` in `src/data/competencies.ts`. Currently 1 defined: **CEO**.

- **Prime Directive**: "Maintain the hierarchy. Each time you take an order, receive 1 Demerit."
- **Sanctioned Behaviors**: 3 strings — sourced from `CompetencyDefinition`, not stored on `Character`
- **Initial Requisition**: Expense Account (create/acquire mundane items once per mission)
- **Self-Assessment**: 3 questions, each with 2 QA options (e.g. dynamism vs duplicity)

`primeDirective` and `sanctionedBehaviors` are no longer fields on `Character` — they come from the definition.

### Requisitions

```typescript
interface Requisition {
  name: string;
  pageCode: string;
  effect: string;
  fromCompetencyId?: string;
}
```

Custom abilities/items. The initial requisition is auto-added when a Competency is selected.

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

Selected from `ANOMALY_DEFINITIONS` in `src/data/anomalies.ts`. Currently **9 anomalies** defined:

| Anomaly | Abilities |
|---|---|
| Dream | Nightmare, Naptime, Site Visit |
| Whisper | Say Again?, Tip of the Tongue, Silence |
| Catalogue | What's That Over There?, You Might Also Like..., Your Best Self |
| Drain | Would You Like Some More?, Borrow, Universal Recipient |
| Timepiece | We've Got Time., Overclock, Remember When |
| Growth | I'll Cover You!, Limbs, Eyes |
| Gun | Eliminate, Quick Draw, Open Carry |
| Manifold | I Know a Shortcut!, Just Keep Walking..., Gyre the Gimbal |
| Absence | Missed!, Negatives, Unbound |

Each ability has:
- Name, flavor description, and `rollStat` (a `QAKey`)
- Three outcome types: `success` (▲), `tiered` (★), `failure` (✕) — tiered outcomes can have bullet `options`
- Optional `tieredMode` (defaults to `'per-three'`)
- A personalization prompt with two answers, each with a 3-checkbox track and a code string (e.g. "D1", "R13")
- A **practiced** boolean — shown as a checkbox at the top of the ability card in `AnomalyPanel`

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

Selected from `REALITY_DEFINITIONS` in `src/data/realities.ts`. Currently 1 defined: **Romantic**.

- **Reality Trigger** — "Oh No, They're Hot": 4-box track (`realityTriggerBoxes`) for the "Settled" mechanic
- **Burnout Release** — "That's Right, I'm Hot": toggle (`burnoutRelease.activated`)
- **Relationship Matrix** — 3 relationships, each with a connection pip track (0–9); at 9 the relationship is "NETWORKED"

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
  tieredMode?: TieredMode; // defaults to 'per-three'
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

### `CompetencyDefinition` (`src/types/competency.ts`)

```typescript
interface SelfAssessmentOption { text: string; qaKey: QAKey; }
interface SelfAssessmentQuestion {
  question: string;
  options: [SelfAssessmentOption, SelfAssessmentOption];
}

interface CompetencyDefinition {
  id: string;
  name: string;
  primeDirective: string;
  sanctionedBehaviors: [string, string, string];
  initialRequisition: { name: string; pageCode: string; effect: string };
  selfAssessment: [SelfAssessmentQuestion, SelfAssessmentQuestion, SelfAssessmentQuestion];
  quote?: string;
}
```
