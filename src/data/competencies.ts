import { CompetencyDefinition } from '../types/competency';

export const COMPETENCY_DEFINITIONS: CompetencyDefinition[] = [
  {
    id: 'public-relations',
    name: 'Public Relations',
    primeDirective: 'Keep everything above board. Each time you lie, receive 1 Demerit.',
    sanctionedBehaviors: [
      'Create a distraction.',
      'Give a great excuse.',
      'Ensure they will never speak of this again.',
    ],
    initialRequisition: {
      name: 'Printing Press Release',
      pageCode: '',
      effect:
        "This ancient, unwieldy printing press is kept in an old recreation room on an unused floor in your Agency headquarters. Once each mission, you may use the press to print a story which is then immediately published across all major local publications. If you're on the go, you can send your story to the others in your department to run it through the press.",
    },
    selfAssessment: [
      {
        question: 'When a coworker embarrasses themselves in public, I...',
        options: [
          { text: 'Loudly say "How avant garde!"', qaKey: 'presence' },
          { text: 'Repeat their behavior until it seems normal.', qaKey: 'persistence' },
        ],
      },
      {
        question: 'When one of our products causes a serious tragedy, my messaging...',
        options: [
          { text: 'Communicates our regret.', qaKey: 'duplicity' },
          { text: 'Explains how it hurts us, too.', qaKey: 'empathy' },
        ],
      },
      {
        question: 'A coworker has been murdered! I am...',
        options: [
          { text: 'The murderer.', qaKey: 'initiative' },
          { text: 'Due for a promotion.', qaKey: 'subtlety' },
        ],
      },
    ],
    quote: "A crisis is just a gala you haven't thrown yet!",
  },
  {
    id: 'research-and-development',
    name: 'Research & Development',
    primeDirective: 'Out with the old. Each time you do the same thing twice, receive 1 Demerit.',
    sanctionedBehaviors: [
      'Uncover what someone really needs.',
      'Reinvent the wheel.',
      "Change someone's life. Permanently.",
    ],
    initialRequisition: {
      name: 'Rubber Duck',
      pageCode: '',
      effect:
        "The squeaker within this bath toy foretells great possibility. Once per mission, you may describe an outcome to this pocket-sized duck toy. The toy will speak back: your GM will tell you the 3 steps you must take to achieve that outcome. Any outcome you request becomes possible, no matter how improbable it seems. If you ask the Rubber Duck about Anomalies directly, it will melt into a useless lump instead.",
    },
    selfAssessment: [
      {
        question: "If at first you don't succeed...",
        options: [
          { text: 'Never let them see you cry.', qaKey: 'professionalism' },
          { text: 'Try try try try try try try.', qaKey: 'persistence' },
        ],
      },
      {
        question: "When I'm solving an equation and the conclusion seems impossible, I...",
        options: [
          { text: "Remind myself it's natural to make mistakes.", qaKey: 'empathy' },
          { text: 'Eliminate all other possibilities.', qaKey: 'dynamism' },
        ],
      },
      {
        question: "I've been framed! I defend myself by...",
        options: [
          { text: 'Destroying all incriminating evidence.', qaKey: 'subtlety' },
          { text: 'Scapegoating a more likely suspect.', qaKey: 'attentiveness' },
        ],
      },
    ],
    quote: "I had spaghetti walls put up; I was tired of all the throwing.",
  },
  {
    id: 'barista',
    name: 'Barista',
    primeDirective: "Keep the mood fresh. Each time you say someone's name correctly, receive 1 Demerit.",
    sanctionedBehaviors: [
      'Make someone feel welcome.',
      'Show off your specialized knowledge.',
      'Get some blood flowing.',
    ],
    initialRequisition: {
      name: 'Triple Shot Glass',
      pageCode: '',
      effect:
        "The Barista has a special shot glass from the Vault Cafe. Once each mission, if this shot glass is used when pulling espresso from any espresso machine, the resulting shot can be poured into the mouth of a dead body to return them to life for ten minutes. Whether Anomalous or Mundane, they cannot survive any amount of Harm.",
    },
    selfAssessment: [
      {
        question: 'A coworker asks me to cover their shift because of a breakup. I...',
        options: [
          { text: 'Cover their shift.', qaKey: 'empathy' },
          { text: 'Get them back together.', qaKey: 'professionalism' },
        ],
      },
      {
        question: "Someone's drink was stolen by a stranger! I handle it by...",
        options: [
          { text: "Pretending I didn't notice.", qaKey: 'duplicity' },
          { text: 'Making two of every drink ahead of time.', qaKey: 'initiative' },
        ],
      },
      {
        question: "A customer complained about my service. I'm more likely to...",
        options: [
          { text: 'Add something to the brew.', qaKey: 'subtlety' },
          { text: 'Add them to the brew.', qaKey: 'dynamism' },
        ],
      },
    ],
    quote: 'You can talk to me anytime, before or after your coffee.',
  },
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
  {
    id: 'intern',
    name: 'Intern',
    primeDirective: "They wouldn't ask if it wasn't important. Each time you deny a request, receive 1 Demerit.",
    sanctionedBehaviors: [
      'Confidently fail.',
      "Embarrass yourself for others' benefit.",
      'Bring something screeching to a halt.',
    ],
    initialRequisition: {
      name: 'Inherited Nametag',
      pageCode: '',
      effect:
        "All Interns are given an endless packet of blank nametags. Once each mission, you may write the name of someone you met today on a nametag and apply it somewhere on your person. Everyone except other Agents will treat you as the named person for as long as you keep the nametag on.",
    },
    selfAssessment: [
      {
        question: 'When acquiring new skills, I am a...',
        options: [
          { text: 'Visual learner.', qaKey: 'attentiveness' },
          { text: 'Pain-consequence learner.', qaKey: 'persistence' },
        ],
      },
      {
        question: "I've suddenly come into a large inheritance. I will definitely...",
        options: [
          { text: 'Invest it in the Agency for mutual benefit.', qaKey: 'initiative' },
          { text: 'Donate it to an Agency branch in need.', qaKey: 'empathy' },
        ],
      },
      {
        question: 'My direct supervisor has been secretly committing felonies! I...',
        options: [
          { text: 'Edit their calendar to create strong alibis.', qaKey: 'subtlety' },
          { text: 'Turn myself in for their crimes.', qaKey: 'presence' },
        ],
      },
    ],
    quote: '"Oops!"',
  },
  {
    id: 'gravedigger',
    name: 'Gravedigger',
    primeDirective: "Don't dirty innocent hands. Each time you touch something living, receive 1 Demerit.",
    sanctionedBehaviors: [
      'Dig up some dirt.',
      'Clean up a mess.',
      'Bury a problem.',
    ],
    initialRequisition: {
      name: "Dracula's Coffin",
      pageCode: '',
      effect:
        "The coffin of the man himself lies deep in the vault, buried under layers of earth. You can exhume the coffin once each mission to place something inside that can fit. When the coffin is returned to the earth, whatever you placed inside never existed. All memories of it are erased, and every effect it had on the world is ascribed to other sources.",
    },
    selfAssessment: [
      {
        question: 'When training new employees in my field, I emphasize...',
        options: [
          { text: 'Shovel technique.', qaKey: 'attentiveness' },
          { text: 'Creating demand.', qaKey: 'initiative' },
        ],
      },
      {
        question: "I'm in charge of the quarterly earnings reports. To ensure a good impression on shareholders, I...",
        options: [
          { text: 'Repeat the presentation until I get the desired response.', qaKey: 'persistence' },
          { text: 'Bury the bad numbers under positive energy.', qaKey: 'presence' },
        ],
      },
      {
        question: "I handle my higher-than-average knowledge of humanity's infinite pain by...",
        options: [
          { text: 'Enjoying the smell of tea and other small pleasures.', qaKey: 'subtlety' },
          { text: "Developing a higher-than-average knowledge of humanity's infinite joys to match.", qaKey: 'professionalism' },
        ],
      },
    ],
    quote: "I've seen things you wouldn't imagine. Because you are probably imagining more interesting things.",
  },
  {
    id: 'reception',
    name: 'Reception',
    primeDirective: 'Remain ever vigilant. Choose one: Each time you sit down, receive 1 Demerit. Each time you leave a question unanswered, receive 1 Demerit.',
    sanctionedBehaviors: [
      'Interrogate someone.',
      'Commandeer belongings.',
      'Close a door forever.',
    ],
    initialRequisition: {
      name: 'Moebius Circuit TV',
      pageCode: '',
      effect:
        "An endless room in the Vault made entirely of television screens. Once each mission, you may use any internet-connected device to access a feed from one of the TVs in this room. The screen shows you up to thirty minutes of footage of any moment in time from a place you've visited that day.",
    },
    selfAssessment: [
      {
        question: 'A coworker of four years has never learned my name. I...',
        options: [
          { text: 'Clearly and loudly introduce myself until they get the picture.', qaKey: 'presence' },
          { text: 'Forget theirs.', qaKey: 'duplicity' },
        ],
      },
      {
        question: "Somebody isn't who they claim to be. I verify their identity by...",
        options: [
          { text: 'Interrogating them.', qaKey: 'persistence' },
          { text: 'Interrogating them.', qaKey: 'dynamism' },
        ],
      },
      {
        question: 'A criminal is breaking into my building while it is being evacuated due to a fire. I...',
        options: [
          { text: 'Ensure the fire is not interrupted.', qaKey: 'professionalism' },
          { text: 'Recognize them as first responders and let them through.', qaKey: 'attentiveness' },
        ],
      },
    ],
    quote: "I'll untie the ropes when you make an appointment.",
  },
  {
    id: 'hotline',
    name: 'Hotline',
    primeDirective: 'Never say "unfortunately." Each time you deliver bad news, receive 1 Demerit.',
    sanctionedBehaviors: [
      'Help someone unburden themselves.',
      "Take the blame for something you didn't do.",
      'Connect someone to an unexpected fate.',
    ],
    initialRequisition: {
      name: 'Hold Music, Vol. 1',
      pageCode: '',
      effect:
        "You have a powerful tape player with a built-in speaker and one tape of bland, cheerful music. Once each mission, you can press play to immediately transport you and any nearby allies to a perfectly safe waiting room for up to one hour. When you return, all affected can place themselves anywhere in the room they left and no time has passed in the world around you.",
    },
    selfAssessment: [
      {
        question: 'A customer has a problem I have been unable to fix in my own life. I...',
        options: [
          { text: 'Share the approaches that have failed, to save them time.', qaKey: 'empathy' },
          { text: 'Assure them we can find a solution together.', qaKey: 'duplicity' },
        ],
      },
      {
        question: 'A customer has a broken product and a convincing story. I...',
        options: [
          { text: 'Pull every string necessary to get their refund.', qaKey: 'persistence' },
          { text: 'Make it clear that all sales are final.', qaKey: 'dynamism' },
        ],
      },
      {
        question: "A customer's call disconnected. I...",
        options: [
          { text: 'Call them back and submit an error report to IT.', qaKey: 'professionalism' },
          { text: 'Complete the call without them.', qaKey: 'presence' },
        ],
      },
    ],
    quote: 'Your call is important to us. Your time is important to us. Everything you do, think, and are is important to us.',
  },
  {
    id: 'clown',
    name: 'Clown',
    primeDirective: 'Keep them laughing. Each time you talk about feelings, receive 1 Demerit.',
    sanctionedBehaviors: [
      'Put on a show.',
      'Expose an embarrassing truth.',
      'Demand a smile.',
    ],
    initialRequisition: {
      name: "The Fool's Cap",
      pageCode: '',
      effect:
        "Once each mission, you may don the Fool's Cap given to all Agency Clowns. For one minute, anything you do inspires laughter and enjoyment, no matter the action. Following this minute, mundane viewers will remember all actions you took fondly. This does not protect you from later viewers of the consequences.",
    },
    selfAssessment: [
      {
        question: 'When I catch a thief making off with my balloon animals, I...',
        options: [
          { text: 'Teach them to make their own.', qaKey: 'empathy' },
          { text: "Show them balloons aren't the only thing I can tie into novel shapes.", qaKey: 'dynamism' },
        ],
      },
      {
        question: 'My car holds...',
        options: [
          { text: 'A regular number of people.', qaKey: 'duplicity' },
          { text: 'Everyone who needs a ride.', qaKey: 'persistence' },
        ],
      },
      {
        question: 'Finish this sentence: "But doctor..."',
        options: [
          { text: "I'm the doctor!", qaKey: 'presence' },
          { text: 'I saw what happened to Pagliacci. The chaos. The carnage. The wars that followed. I would appreciate a more effective medical prescription.', qaKey: 'professionalism' },
        ],
      },
    ],
    quote: "I understand you're going through a lot right now, but I need you to take a moment to please consider: honk.",
  },
];
