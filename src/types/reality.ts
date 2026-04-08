export interface RealityDefinition {
  id: string;
  name: string;
  realityTrigger: {
    name: string;
    description: string;
  };
  burnoutRelease: {
    name: string;
    description: string;
    activated: boolean;
  };
  onboardingQuestions: string[];
  relationshipMatrixQuestions: [string, string, string];
  hasRealityTrack: boolean;
}
