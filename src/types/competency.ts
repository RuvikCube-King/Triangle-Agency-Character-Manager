import { QAKey } from './character';

export interface SelfAssessmentOption {
  text: string;
  qaKey: QAKey; // which QA stat gets +3
}

export interface SelfAssessmentQuestion {
  question: string;
  options: [SelfAssessmentOption, SelfAssessmentOption];
}

export interface CompetencyDefinition {
  id: string;
  name: string;
  primeDirective: string; // full text including consequence sentence
  sanctionedBehaviors: [string, string, string];
  initialRequisition: { name: string; pageCode: string; effect: string };
  selfAssessment: [SelfAssessmentQuestion, SelfAssessmentQuestion, SelfAssessmentQuestion];
  quote?: string;
}
