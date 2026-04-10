import { WorkLifeBalance, WLBTrackState } from './workLifeBalance';
export type { WorkLifeBalance };

export function createDefaultWLBTrack(): WLBTrackState {
  return { boxes: Array(30).fill('empty') as WLBTrackState['boxes'] };
}

export function createDefaultWorkLifeBalance(): WorkLifeBalance {
  return {
    competency: createDefaultWLBTrack(),
    reality: createDefaultWLBTrack(),
    anomaly: createDefaultWLBTrack(),
    earnedCodes: [],
    mvpCount: 0,
    probationCount: 0,
  };
}

export interface QualityAssurance {
  current: number;
  max: number;
}

export type AnswerCheckboxes = [boolean, boolean, boolean];

export interface AbilityProgress {
  practiced: boolean;
  answers: [AnswerCheckboxes, AnswerCheckboxes];
}

export interface OutcomeAddition {
  targetAbilityName: string;
  outcome: import('./anomaly').Outcome;
  personalization?: import('./anomaly').PersonalizationPrompt;
  sourceCode?: string;
}

export interface CharacterAnomaly {
  anomalyId: string;
  // keyed by ability name
  personalizationProgress: Partial<Record<string, AbilityProgress>>;
  // abilities added via playwalled documents
  additionalAbilities?: import('./anomaly').AbilityDefinition[];
  // outcome injections into existing abilities via playwalled documents
  outcomeAdditions?: OutcomeAddition[];
}

export interface Relationship {
  name: string;
  playedBy: string;
  description: string;
  connection: number; // 0-9
  connectionBonus: string;
  active: boolean;
}

export interface CharacterCompetency {
  competencyId: string;
  selfAssessmentCompleted: boolean;
}

export function createDefaultCompetency(competencyId: string): CharacterCompetency {
  return { competencyId, selfAssessmentCompleted: false };
}

export interface Requisition {
  name: string;
  pageCode: string; // "Page/PD Code" from the sheet
  effect: string;   // multi-line free text
  fromCompetencyId?: string; // marks the auto-inserted initial requisition
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
  competency: CharacterCompetency | null;
  requisitions: Requisition[];
  // Counters
  commendations: number;
  demerits: number;
  additionalBurnout: number;
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
  // Work/Life Balance
  workLifeBalance: WorkLifeBalance;
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

export function createDefaultRequisition(): Requisition {
  return { name: '', pageCode: '', effect: '' };
}

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
    competency: null,
    requisitions: [],
    commendations: 0,
    demerits: 0,
    additionalBurnout: 0,
    qualityAssurances: {
      attentiveness: { current: 0, max: 9 },
      duplicity: { current: 0, max: 9 },
      dynamism: { current: 0, max: 9 },
      empathy: { current: 0, max: 9 },
      initiative: { current: 0, max: 9 },
      persistence: { current: 0, max: 9 },
      presence: { current: 0, max: 9 },
      professionalism: { current: 0, max: 9 },
      subtlety: { current: 0, max: 9 },
    },
    workLifeBalance: createDefaultWorkLifeBalance(),
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
