import { PlaywalledDocument } from '../types/playwalleddocument';

export const PLAYWALLED_DOCUMENTS: PlaywalledDocument[] = [
  {
    code: 'A6',
    title: "Achilles' Heel",
    sections: [
      {
        type: 'paragraphs',
        text: [
          "You have become impervious to all forms of Harm except for one thing. Every player in the game, Agent and GM alike, secretly writes one of the following options down on a piece of paper (or any other option, approved by your GM.)",
        ],
      },
      {
        type: 'list',
        items: [
          'Sunlight',
          'Water',
          'Iron',
          'Paper',
          'A notable phrase from a popular piece of fiction [write the phrase]',
          'Prolonged eye contact',
          'Being intentionally ignored',
        ],
      },
      {
        type: 'paragraphs',
        text: [
          "Select one of the papers randomly. The selected option is your Heel, and it is now deadly to you.",
          "Any interaction with your Heel immediately deals 3 Harm. It cannot be redistributed with Universal Recipient or defended against in any way except the use of QAs.",
          "You may use Sympathetic Pain on your Heel. When you inflict the effect on another target, they experience the effect normally (in most cases, it is at worst uncomfortable) and not its unique effect on you.",
          "Once between each mission you may repeat this process to select a new Heel.",
        ],
      },
    ],
  },
  {
    code: 'A7',
    title: 'Unemployed',
    sections: [
      {
        type: 'paragraphs',
        text: [
          "Dear Agent,",
          "It is with a heavy heart that we must announce your employment is terminated immediately. Following the completed effects of all time spent in this phase, you are to report to the Vault for a debriefing interview before you are returned to the world to pursue the life of dangerous power you so clearly desire.",
          "Please clear your desk, collect all belongings, and call someone should you need transportation back home. The debriefing interview won't take more than a few minutes. We're sorry this position wasn't a good fit for you, and wish you the best in your future endeavors.",
          "Best,",
        ],
      },
      {
        type: 'callout',
        text: "They're lying. RUN.",
        variant: 'alert',
      },
      {
        type: 'callout',
        text: '[GO TO: Z1]',
        variant: 'goto',
        gotoCode: 'Z1',
      },
    ],
  },
  {
    code: 'A8',
    title: 'All The Difference',
    sections: [
      {
        type: 'ability',
        rollStat: 'duplicity',
        setup: 'When presented with two paths, take both.',
        outcomes: [
          {
            trigger: 'success',
            triggerLabel: 'On a success,',
            description: 'you experience reality down both paths simultaneously. The GM and other Agents will describe their next responses to both options up to one minute in the future, or until after one other roll is made and resolved, whichever comes first. Then, you will select which path you actually choose. Any Chaos generated while following either path remains after a path is chosen.',
          },
          {
            trigger: 'tiered',
            triggerLabel: 'For each additional 3,',
            description: 'you can harness this effect again in quick succession, such as in multiple moments of a single fight, turns of the same maze, or parts of the same conversation. When you move on from your current task, this effect ends.',
          },
          {
            trigger: 'failure',
            triggerLabel: 'On a failure,',
            description: 'you take the most dangerous of all possible options\u2014which may not even be one you realized was available\u2014chosen by the GM. Everyone must deal with the consequences.',
          },
        ],
        personalization: undefined,
        tieredMode: 'per-three',
      },
    ],
  },
];

// Remaining codes to populate:
//   Competency track: A3, D4, G3, J3, N3, Y2, W8, T3, Q3
//   Reality track:    C4, L11, E2, O4, T6, E3, H5, X3, V2
//   Anomaly track:    H4, H3, U2, X2, N1, Q2, G8, L10
