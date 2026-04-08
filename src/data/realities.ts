import { RealityDefinition } from '../types/reality';

export const REALITY_DEFINITIONS: RealityDefinition[] = [
  {
    id: 'romantic',
    name: 'Romantic',
    realityTrigger: {
      name: "Oh No, They're Hot",
      description:
        "You cannot ignore when an opportunity strikes. The GM may use Reality Trigger to have you notice a Vibe. This Vibe might be genuine or entirely imagined. If you don't shoot your shot, you dwell on the missed connection and struggle to be present: the Relationship you're closest to something real with loses 1 Connection. Each time an existing relationship gets in the way of a new one, mark the next empty box on the four-box track. When this happens while all four boxes are full, you know what you're looking for and might have already found it.",
    },
    burnoutRelease: {
      name: "That's Right, I'm Hot",
      description:
        'Whenever you\'re doing something that will make you look more attractive or sympathetic, ignore all Burnout.',
      activated: false,
    },
    onboardingQuestions: [
      "What's the most appealing trait in a person?",
      'What about you are you hoping no one gets deep enough to see?',
      'What three things would you bring with you to a deserted island?',
    ],
    relationshipMatrixQuestions: [
      'Who is your longest-term situationship?',
      'Who has never, ever found you attractive?',
      'Who are you oblivious to the romantic possibilities with?',
    ],
    hasRealityTrack: true,
  },
];
