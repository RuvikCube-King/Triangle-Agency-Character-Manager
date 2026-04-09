import { QAKey } from './character';

export interface PersonalizationAnswer {
  text: string;
  code: string; // e.g. "D1", "R13"
}

export interface PersonalizationPrompt {
  question: string;
  answers: [PersonalizationAnswer, PersonalizationAnswer];
}

export type OutcomeTrigger = 'success' | 'tiered' | 'failure';

export type TieredMode = 'per-three' | 'per-extra';

export interface Outcome {
  trigger: OutcomeTrigger;
  triggerLabel: string;  // "On a success", "On every third 3", "On a failure"
  description: string;
  options?: string[];    // bullet choices for tiered outcomes
}

export interface AbilityDefinition {
  name: string;
  description: string;  // flavor text + roll instruction
  rollStat: QAKey;
  outcomes: Outcome[];
  personalization: PersonalizationPrompt;
  tieredMode?: TieredMode;  // defaults to 'per-three' if absent
}

export interface AnomalyDefinition {
  id: string;           // e.g. "dream"
  name: string;         // e.g. "Dream"
  abilities: AbilityDefinition[];
}
