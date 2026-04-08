export interface QualityAssurance {
  current: number;
  max: number;
}

export type AnswerCheckboxes = [boolean, boolean, boolean];

export interface AbilityProgress {
  practiced: boolean;
  answers: [AnswerCheckboxes, AnswerCheckboxes];
}

export interface CharacterAnomaly {
  anomalyId: string;
  // keyed by ability name
  personalizationProgress: Partial<Record<string, AbilityProgress>>;
}

export interface Relationship {
  name: string;
  playedBy: string;
  description: string;
  connection: number; // 0-9
  connectionBonus: string;
  active: boolean;
}

export interface CharacterReality {
  realityId: string;
  burnoutRelease: { activated: boolean };
  realityTriggerBoxes: [boolean, boolean, boolean, boolean];
  relationships: [Relationship, Relationship, Relationship];
}

export interface Character {
  id: string;
  // Identity
  name: string;
  pronouns: string;
  agencyTitle: string;
  agencyStanding: string;
  // ARC stats
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
  qualityAssurances: {
    attentiveness: QualityAssurance;
    duplicity: QualityAssurance;
    dynamism: QualityAssurance;
    empathy: QualityAssurance;
    initiative: QualityAssurance;
    persistence: QualityAssurance;
    presence: QualityAssurance;
    professionalism: QualityAssurance;
    subtlety: QualityAssurance;
  };
}

export const QA_KEYS = [
  'attentiveness',
  'duplicity',
  'dynamism',
  'empathy',
  'initiative',
  'persistence',
  'presence',
  'professionalism',
  'subtlety',
] as const;

export type QAKey = (typeof QA_KEYS)[number];

const defaultRelationship: Relationship = {
  name: '',
  playedBy: '',
  description: '',
  connection: 0,
  connectionBonus: '',
  active: false,
};

export function createDefaultCharacter(): Omit<Character, 'id'> {
  return {
    name: '',
    pronouns: '',
    agencyTitle: '',
    agencyStanding: '',
    anomaly: null,
    reality: null,
    competency: '',
    commendations: 0,
    demerits: 0,
    additionalBurnout: 0,
    primeDirective: '',
    sanctionedBehaviors: ['', '', ''],
    qualityAssurances: {
      attentiveness: { current: 0, max: 0 },
      duplicity: { current: 0, max: 0 },
      dynamism: { current: 0, max: 0 },
      empathy: { current: 0, max: 0 },
      initiative: { current: 0, max: 0 },
      persistence: { current: 0, max: 0 },
      presence: { current: 0, max: 0 },
      professionalism: { current: 0, max: 0 },
      subtlety: { current: 0, max: 0 },
    },
  };
}

export function createDefaultReality(realityId: string): CharacterReality {
  return {
    realityId,
    burnoutRelease: { activated: false },
    realityTriggerBoxes: [false, false, false, false],
    relationships: [
      { ...defaultRelationship },
      { ...defaultRelationship },
      { ...defaultRelationship },
    ],
  };
}
