import { AnomalyDefinition } from '../types/anomaly';

export const ANOMALY_DEFINITIONS: AnomalyDefinition[] = [
  {
    id: 'dream',
    name: 'Dream',
    abilities: [
      {
        name: 'Nightmare',
        description: 'Project yourself into something larger-than-life. Pick a mind and wrap its shadow around yourself. Roll Presence.',
        rollStat: 'presence',
        outcomes: [
          {
            trigger: 'success',
            triggerLabel: 'On a success',
            description: 'You may adopt an illusory form and appear as that form to your target. The form can be terrifying, beautiful, or mundane—and they believe it\'s your true form.',
          },
          {
            trigger: 'tiered',
            triggerLabel: 'On every third 3',
            description: 'You may ask the player controlling the target to tell you one of the following before you take this form:',
            options: [
              'Their worst fear',
              'Their greatest goal',
              'Their most secret desire',
            ],
          },
          {
            trigger: 'failure',
            triggerLabel: 'On a failure',
            description: 'Your true identity is emblazoned onto their mind—by night they will dream about you, by day they will think about you. For today, though, maybe nothing will happen.',
          },
        ],
        personalization: {
          question: 'I tend to imagine...',
          answers: [
            { text: 'The best case scenario.', code: 'D1' },
            { text: 'The worst possible outcome.', code: 'R13' },
          ],
        },
      },
      {
        name: 'Naptime',
        description: 'Blow a pinch of sand onto a target and roll Subtlety.',
        rollStat: 'subtlety',
        outcomes: [
          {
            trigger: 'success',
            triggerLabel: 'On a success',
            description: 'You send the target into a sudden sleep. They\'ll have pleasant dreams and think they nodded off on their own after they wake up in a few minutes.',
          },
          {
            trigger: 'tiered',
            triggerLabel: 'For each additional 3',
            description: 'Choose one:',
            options: [
              'Add an additional target to this effect.',
              'The effect lasts an additional hour.',
            ],
          },
          {
            trigger: 'failure',
            triggerLabel: 'On a failure',
            description: 'Another target, an ally or perhaps even yourself, falls asleep instead. The fickle sand swirls in obvious ways, and the original target sees what you\'ve done.',
          },
        ],
        personalization: {
          question: 'My favorite dreams...',
          answers: [
            { text: 'Recur.', code: 'D8' },
            { text: 'Are completely unexpected.', code: 'S1' },
          ],
        },
      },
      {
        name: 'Site Visit',
        description: 'Imagination is real enough. Step into a painting, photograph, video, novel, or other piece of art and roll Attentiveness.',
        rollStat: 'attentiveness',
        outcomes: [
          {
            trigger: 'success',
            triggerLabel: 'On a success',
            description: 'You and any nearby allies you choose enter the world depicted. While inside you may manipulate objects, converse with people, and see from perspectives not featured in the original frame.',
          },
          {
            trigger: 'tiered',
            triggerLabel: 'On every third 3',
            description: 'Choose one:',
            options: [
              'You and your allies change appearances to fit in with the art.',
              'When you leave, this piece of art is returned to its original condition.',
            ],
          },
          {
            trigger: 'failure',
            triggerLabel: 'On a failure',
            description: 'You forget how to hide your tracks. Opportunistic characters from nearby art can follow you and enter Reality on their own.',
          },
        ],
        personalization: {
          question: 'When I finish a story, I often wish I could...',
          answers: [
            { text: 'Spend more time with the characters.', code: 'P8' },
            { text: 'Share the lesson with someone who needs it.', code: 'M4' },
          ],
        },
      },
    ],
  },
];
