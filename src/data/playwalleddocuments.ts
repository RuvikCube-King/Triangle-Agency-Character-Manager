import { PlaywalledDocument } from '../types/playwalleddocument';

export const PLAYWALLED_DOCUMENTS: PlaywalledDocument[] = [
  {
    code: 'A3',
    title: "Associate",
    track: 'competency',
    sections: [
      {
        type: 'paragraphs',
        text: [
          "Your commitment to the Agency’s mission has not gone unnoticed by the team, and we are pleased to announce your first promotion! The Agency has high expectations for your continued success.",
          "You may be wondering what we do with the Anomalies you’ve successfully captured. It’s simple: we study them! Our Architects create comfortable homes for them in the Vault and use their abilities to create products we sell to fund our mission.",
          "This brings us to your first Benefit.",
          "If a mission concludes with an Anomaly’s capture, you can create Requisitions from its abilities. When you spend time on your Competency, in addition to any other effects, you may choose a previously captured Anomaly and make a Vault Request.",
          "Every Agent, including the GM, can discuss what effect they believe a Requisition made from the captured Anomaly would do. After they’ve settled on an effect everyone finds reasonable, the GM assigns the Requisition a Commendation value. Only Agents with access to Vault Request can purchase these Requisitions once they are available. Only one Requisition can be created for each captured Anomaly, but it can be purchased any number of times.",
          "Use these Requisitions to make your future missions ever more efficient and successful."
        ]
      }
    ], 
  },
  {
    code: 'A4',
    title: 'A Thread (1/?)',
    track: 'anomaly',
    sections: [
      {
        type: 'ability',
        rollStat: 'professionalism',
        setup: 'Fate unspools at your whim. Tie a targets thread around your finger and roll Professionalism.',
        outcomes: [
          {
            trigger: 'success',
            triggerLabel: 'On a success,',
            description: 'you carry their thread with you and can loop it around a place, person, or object, ensuring the target makes a connection with that thing in the near future. (The targets do not have to be human, or even alive.) These threads are visible only to you and can pass through anything on their way to the destination you set.',
          },
          {
            trigger: 'tiered',
            triggerLabel: 'For each additional 3,',
            description: 'you can loop their thread around an additional thing, forming a timeline of events for their upcoming activities. Any choices they make leading them to connect to these targets will feel, to them, like natural choices they are making.',
          },
          {
            trigger: 'triscendence',
            triggerLabel: 'On Triscendence, ',
            description: 'choose one:',
            options: [
              'Knot:You can attach their thread to something that will become important for the rest of their lives. They will be unable to extricate their fate from the fate of what you have tied this knot to.',
              'Scissors: You can cut an existing thread they have with something else – a plan, a future, a possibility. Pick something to remove from their future; they will never interact with it again.',
            ], 
          },
          {
            trigger: 'failure',
            triggerLabel: 'On a failure,',
            description: 'the target has an inexorable fate leading to a pre-ordained conclusion. You see a thread leading to a troubling future event they will participate in that you are powerless to stop. You’re welcome to try, but you will fail.',
          },
        ],
        personalization: undefined,
        tieredMode: 'per-three',
      },
    ],
  },
  {
    code: 'A5',
    title: 'A to B',
    track: 'anomaly',
    sections: [
      {
        type: 'ability',
        rollStat: 'empathy',
        setup: 'You can see the shortest distance between one idea and another. State the desired thought you want a target to have (”I like this person,” “I should take a break,” “Tomorrow isn’t coming”) and roll Empathy.',
        outcomes: [
          {
            trigger: 'success',
            triggerLabel: 'On a success,',
            description: 'you know how they’ll arrive at that thought. The player portraying your target will tell you what steps need to be taken to get them there.',
          },
          {
            trigger: 'tiered',
            triggerLabel: 'On every third 3,',
            description: 'you can name an additional thought and receive a path to that thought as well.',
          },
          {
            trigger: 'triscendence',
            triggerLabel: 'On Triscendence, ',
            description: 'there’s only one step to get them to any thought, and you can decide what it is.', 
          },
          {
            trigger: 'failure',
            triggerLabel: 'On a failure,',
            description: 'the target’s mind becomes condensed, sharpened, and begins making connections it never could before. Their suspicions, especially about you, find evidence easily. You’ve created a genius, and they’re smart enough to know you did. This person is 10 Loose Ends on their own, and are already way ahead of you.',
          },
        ],
        personalization: {
          question: "I wish people would...",
          answers: [
            { text: 'Just do what I say.', code: 'H1' },
            { text: 'Try to understand me.', code: 'S4' },
          ],
        },
      },
    ],
  },
  {
    code: 'A6',
    title: "Achilles' Heel",
    track: 'anomaly',
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
    track: 'competency',
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
    track: 'anomaly',
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
  {
    code: 'A9',
    title: 'All-in-One',
    track: 'anomaly',
    sections: [
      {
        type: 'paragraphs',
        text: [
          "Select a favorite object to imbue with ultimate convenience. The object retains its original appearance (pen, crowbar, lightbulb) but it becomes the All-in-One, an object capable of anything.",
          "Any time you attempt to use it to solve a problem solvable by any mundane tool, gadget, or device, it works. Typically, the All-in-One performs one simple mundane function at a time.",
          "When you first create it, the All-in-One can also function as the following:"
        ],
      },
      {
        type: 'list',
        items: [
          'Shelter from the Elements',
          'Vehicle for two (speed of a horse)',
          'Textile factory (prints any mundane textile, one meter per minute)',
          'Meditation Guide',
          'Art & Artifact Appraiser',
        ],
      },
      {
        type: 'ability',
        rollStat: 'initiative',
        setup: 'If you would like to add additional complex tools or functions to the All-in-One, roll Initiative.',
        outcomes: [
          {
            trigger: 'success',
            triggerLabel: 'On a success,',
            description: 'you add something to the list. The All-in-One can perform the desired function forever. Remember: it always looks like the original object, and can create Loose Ends if seen performing outlandish functions',
          },
          {
            trigger: 'triscendence',
            triggerLabel: 'On Triscendence, ',
            description: ' you may add any Requisition you know about to the list as well, excluding Initial Requisitions. After being used once, the Requisition is removed from the list.', 
          },
          {
            trigger: 'failure',
            triggerLabel: 'On a failure,',
            description: 'the All-In-One can never accomplish the function you were attempting to add.',
          },
        ],
      },
      {
        type: 'paragraphs',
        text: [ 'The universe may resist the All-in-One. GMs can activate the "On a failure" result, even if the roll was a success, by spending 10 Chaos. (This can send available Chaos into the negatives.)' ],
      },
    ],
  },
  {
    code: 'A10',
    title: "Alternate Perspectives",
    track: 'anomaly',
    sections: [
      {
        type: 'paragraphs',
        text: [
          "When using Forced Perspective, you can freely change an affected object to a new size reflecting the perspective of any current observer. In addition, you can freely decide whether it interacts with the world using its new or original weight/density, and change this back and forth on a whim. This means expanded objects can be swung easily, and shrunken objects can gain speed and power after being thrown.",
        ]
      }
    ], 
  },
  {
    code: 'A11',
    title: 'Aa the Kids Say',
    track: 'anomaly',
    sections: [
      {
        type: 'ability',
        rollStat: 'duplicity',
        setup: 'You always fit in. Say any phrase to a target and roll Duplicity.',
        outcomes: [
          {
            trigger: 'success',
            triggerLabel: 'On a success,',
            description: 'the phrase becomes an accepted in-group idiom for one of the target’s demographics of your choice (teen, cellist, weeaboo, etc.). Share its meaning, and common ways it is used, with your GM and fellow Agents. People from that demographic will now use it when appropriate, and if you’ve said it any time in the past day you will be retroactively understood to have been using this meaning. Your use of this phrase marks you to others as someone “in the know.”',
          },
          {
            trigger: 'triscendence',
            triggerLabel: 'On Triscendence, ',
            description: 'the target recognizes you as a popular tastemaker in their demographic and listens closely to your every word. Anything you say might become a new phrase', 
          },
          {
            trigger: 'failure',
            triggerLabel: 'On a failure,',
            description: 'anyone who utters the chosen phrase will vividly think of you, and they won’t know why. Add Loose Ends commensurate with how common the phrase is.',
          },
        ],
        personalization: {
          question: "I think the best way to win people over is to...",
          answers: [
            { text: 'Be myself, no matter what.', code: 'O2' },
            { text: 'Match their vibe.', code: 'M7' },
          ],
        },
      },
    ],
  },
  {
    code: 'A12',
    title: 'Ask Questions Later',
    track: 'anomaly',
    sections: [
      {
        type: 'paragraphs',
        text: [
          "For up to an hour after you've killed or Eliminated someone, you can talk to them directly as if they are present.",
          "In addition, add the following text to Eliminate:",
        ],
      },
      {
        type: 'outcome-addition',
        targetAbilityName: 'Eliminate',
        outcome: {
          trigger: 'triscendence',
          triggerLabel: 'On Triscendence,',
          description: 'you may replace someone or something you just Eliminated with a previous target of Eliminate, returning them to life or existence.',
        },
        personalization: {
          question: 'Which would I rather participate in?',
          answers: [
            { text: 'A wild party.', code: 'S17' },
            { text: 'An intimate conversation.', code: 'B8' },
          ],
        },
      },
    ],
  },
  {
    code: 'B1',
    title: 'Bad Optics',
    track: 'anomaly',
    sections: [
      {
        type: 'paragraphs',
        text: [
          "You may now use Forced Perspective directly on living targets. You may also use Forced Perspective to strike or manipulate living targets without moving them as if they are the size you perceive them. (Meaning a single punch will land on a faraway target as if dealt by a giant.)",
        ],
      },
      {
        type: 'ability',
        rollStat: 'dynamism',
        setup: 'When used this way, roll Dynamism instead of Attentiveness and add the following text:',
        outcomes: [
          {
            trigger: 'tiered',
            triggerLabel: 'For each additional 3, ',
            description: 'you may target an additional person with an attack of this type.', 
          },
          {
            trigger: 'failure',
            triggerLabel: 'On a failure,',
            description: 'until the next day, you shrink or grow to the size that matches the target’s perspective of you at the time of your attack.',
          },
        ],
        tieredMode: 'per-three',
      },
    ],
  },
  {
    code: 'B2',
    title: 'Been There, Done That',
    track: 'anomaly',
    sections: [
      {
        type: 'paragraphs',
        text: [
          "Smooth over the problems of today with a little extra work later. You begin each mission with 3 Time Beacons, and may place them at any time while in the field.",
          "Placing a Time Beacon allows you to mark a spot for your future self to return and interfere. After the mission, you’ll return to these spots to help out – which means whenever you place one, the future version of you appears shortly afterwards/prior to change something in a simple way that doesn’t cause a serious paradox.",
          "Choose one of the following effects each time you activate a Time Beacon:"
        ],
      },
      {
        type: 'list',
        items: [
          "An object that would take time to find is found immediately.",
          "An object that would be useful for an adversary to have has conveniently disappeared the moment they attempt to produce it.",
          "A distraction occurs just out of sight.",
          "One of your Anomaly Abilities is activated somewhere nearby without you having to do it. (This still requires rolls, costs QAs, and creates Chaos as normal.) In the event of a failure or other consequences, your future self will have to deal with it.",
          "An instance of Harm is taken by your future self, instead of somebody present (Added back at the end of the mission. May cause Death.)",
          "Someone was prepared for your arrival with information, intimidation, or charm.",
          "Somebody or something that intended to surprise you is, instead, themselves surprised.",
        ]
      },
      {
        type: 'paragraphs',
        text: [
          "You cannot place a Time Beacon if you are dead or otherwise incapacitated.",
          "If you are unable to return to a placed Time Beacon for some reason, the resulting paradox causes severe damage to Reality: immediately add 11 Loose Ends to your Branch’s total.",
        ]
      }
    ],
  },
  {
    code: 'B3',
    title: 'Beg',
    track: 'anomaly',
    sections: [
      {
        type: 'paragraphs',
        text: [
          "Haven’t they read the stories?",
          "If you ask someone politely for any kind of help and they deny it, you may activate the “On a success” effect of Borrow and the “On six or more 3s” effect of Steal, all without rolling.",
          "If you want additional 3s to activate other effects from Borrow, roll Subtlety and spend any 3s generated by the roll. This roll cannot fail, but it does create Chaos as normal.",
        ],
      },
      {
        type: 'ability',
        rollStat: 'subtlety',
        setup: 'Roll Subtlety and spend any 3s generated by the roll. This roll cannot fail, but it does create Chaos as normal.',
        outcomes: [
        ],
      },
    ],
  },
  {
    code: 'B4',
    title: 'Big Hand',
    track: 'anomaly',
    sections: [
      {
        type: 'ability',
        rollStat: 'dynamism',
        setup: 'You create and can now wield a powerful artifact: Big Hand. Big Hand is a long, elegant, sword-like weapon that deals no Harm. It can be activated by hitting a target or by tapping it against any clock. When you wield Big Hand alone, roll Dynamism.',
        outcomes: [
          {
            trigger: 'success',
            triggerLabel: 'On a success,',
            description: 'the target is hit with Big Hand. They experience the last thing that Harmed them again, receiving an equal amount of Harm. Tapped clocks ignore this effect.',
          },
          {
            trigger: 'triscendence',
            triggerLabel: 'On Triscendence, ',
            description: 'you can experience the next 60 seconds in any order. You may bring any objects or people you can hold with you as you travel between seconds in this way.', 
          },
          {
            trigger: 'tiered',
            triggerLabel: 'For each additional 3, ',
            description: 'you may choose one of the following:',
            options: [
              "Time advances by one minute.",
              "Time rewinds by one minute.",
              "A nearby target hears a distracting “tick tock” sound in their mind that prevents them from focusing on any complex plan, math, or speech for the next minute.",
              "A nearby timer advances to its end and the task it was applied to completes. (The toast pops out, a parking meter hits its limit, etc.)",
            ] 
          },
          {
            trigger: 'failure',
            triggerLabel: 'On a failure,',
            description: 'the next thing that Harms you does so twice, for double the Harm.',
          },
        ],
        tieredMode: 'per-extra',
      }
    ]
  },
  {
    code: "B5",
    title: "Binding Vow",
    track: "anomaly",
    sections: [
      {
        type: 'paragraphs',
        text: [
          "In your presence, words carry a great weight. From now on, whenever you accept a promise from someone else or make a promise yourself, you can choose to make it a Binding Vow. Breaking a promise, or failing to fulfill it before it becomes impossible, will cause the person who made it to die immediately in a way that appears mundane.",
          "If all parties agree, the consequences of breaking the vow may include things other than immediate death (such as binding compulsions or great deals of debt). Any substitute consequences must be agreed upon before the promise becomes a Binding Vow.",
          "Even for the most skeptical, an approaching Binding Vow carries a deep feeling of weight and truth. Anyone who makes one will understand that what they said carries stakes.",
        ],
      },
    ],
  },
];
