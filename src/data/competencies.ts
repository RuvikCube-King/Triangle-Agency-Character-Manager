import { CompetencyDefinition } from '../types/competency';

export const COMPETENCY_DEFINITIONS: CompetencyDefinition[] = [
  {
    id: 'ceo',
    name: 'CEO',
    primeDirective: 'Maintain the hierarchy. Each time you take an order, receive 1 Demerit.',
    sanctionedBehaviors: [
      'Make someone do what you want.',
      'Enjoy one of the finer things in life.',
      'Make a necessary sacrifice.',
    ],
    initialRequisition: {
      name: 'Expense Account',
      pageCode: '',
      effect:
        "This enormous accountant's ledger is rumored to contain every purchase made in the history of mankind. Once each mission, you may write that the Agency has acquired something specific in the ledger and it becomes Agency property. You may use it during this mission, but the Agency makes decisions about it going forward.",
    },
    selfAssessment: [
      {
        question: 'My management style is best described as...',
        options: [
          { text: 'Hands-on.', qaKey: 'dynamism' },
          { text: 'Treating employees like family.', qaKey: 'duplicity' },
        ],
      },
      {
        question: 'I inspire my team with my...',
        options: [
          { text: 'Oil Portrait.', qaKey: 'presence' },
          { text: 'Automated out-of-office response.', qaKey: 'professionalism' },
        ],
      },
      {
        question: 'When cuts are unavoidable, I terminate the employee who...',
        options: [
          { text: 'Was late most often.', qaKey: 'attentiveness' },
          { text: 'Was late today.', qaKey: 'initiative' },
        ],
      },
    ],
    quote: 'Anyone can work overtime; only I can chip this in for par.',
  },
];
