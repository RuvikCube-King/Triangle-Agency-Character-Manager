import { QAKey } from './character';
import { Outcome, PersonalizationPrompt, TieredMode } from './anomaly';
import { TrackName } from './workLifeBalance';

export type DocumentSection =
  | { type: 'paragraphs'; text: string[] }
  | { type: 'list'; items: string[] }
  | { type: 'ability'; rollStat?: QAKey; setup?: string; outcomes?: Outcome[]; personalization?: PersonalizationPrompt; tieredMode?: TieredMode;}
  | { type: 'outcome-addition'; targetAbilityName: string; outcome: Outcome; personalization?: PersonalizationPrompt }
  | { type: 'callout'; text: string; variant?: 'alert' | 'goto'; gotoCode?: string };

export type UnlockCondition = {
  type: 'requires-documents';
  documentCodes: string[];
};

export interface PlaywalledDocument {
  code: string;
  title: string;
  track: TrackName;
  sections: DocumentSection[];
  unlockCondition?: UnlockCondition;
}
