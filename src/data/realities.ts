import { RealityDefinition } from '../types/reality';

export const REALITY_DEFINITIONS: RealityDefinition[] = [
  {
    id: 'romantic',
    name: 'Romantic',
    realityTrigger: {
      name: "Oh No, They're Hot",
      description:
        "You cannot ignore when an opportunity strikes. The GM may use Reality Trigger to have you notice a Vibe. This Vibe might be genuine or entirely imagined. If you don't shoot your shot, you dwell on the missed connection and struggle to be present: the Relationship you're closest to something real with loses 1 Connection. Each time an existing relationship gets in the way of a new one, mark the next empty box on a four-box \"Settled\" track. When this happens while all four boxes are full, you know what you're looking for and might have already found it. You must choose a new Reality.",
    },
    burnoutRelease: {
      name: "That's Right, I'm Hot",
      description:
        "Whenever you're doing something that will make you look more attractive or sympathetic, ignore all Burnout.",
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
  {
    id: 'caretaker',
    name: 'Caretaker',
    realityTrigger: {
      name: 'Needy',
      description:
        "The GM may use Reality Trigger to put your Dependent in need of attention. If you ignore it, your Dependent will throw a fit now and demand your time later: the Relationship who has the least camaraderie with your Dependent loses one Connection. If you make your Dependent fix something on their own, allow them to be hurt, or place them under anyone else's supervision, your relationship with them suffers. Mark the next empty box in a four-box \"Independent\" track. When this happens while all boxes are marked, or they mature beyond your control, your Dependent no longer depends on you. You must choose a new Reality.",
    },
    burnoutRelease: {
      name: "It's Your Favorite!",
      description:
        'When you are doing something that will entertain your Dependent, ignore all Burnout.',
      activated: false,
    },
    onboardingQuestions: [
      'What is your favorite memory?',
      'What quality of yours do you hope to never teach your Dependent?',
      'Where is your dream vacation destination?',
    ],
    relationshipMatrixQuestions: [
      'Who would gain custody of your dependent if you were gone?',
      'Who misses the freedom you used to have?',
      'Who is your Dependent always excited to spend time with?',
    ],
    hasRealityTrack: true,
  },
  {
    id: 'overbooked',
    name: 'Overbooked',
    realityTrigger: {
      name: 'Work Phone',
      description:
        "You have a smartphone specifically dedicated to your Vocation. The GM may use Reality Trigger to have one of your Relationships call this phone at any time. If you ignore it, that Relationship loses one Connection. If you fail to do the necessary duties of your Vocation, or you lose your phone, mark the next empty box in a four-box \"Something Gives\" track. When this happens while all boxes are marked, your Vocation is irrevocably ended. If ended this way or through any other means, you must choose a new Reality.",
    },
    burnoutRelease: {
      name: 'Threading the Needle',
      description:
        'When you are doing something that counts as work or practice for your Vocation, ignore all Burnout.',
      activated: false,
    },
    onboardingQuestions: [
      "What is the most difficult decision you've ever made?",
      'What terrible thing will happen if you give up your responsibilities?',
      'How do you celebrate victories?',
    ],
    relationshipMatrixQuestions: [
      'Who is your other boss?',
      'Who cares the most about your health?',
      'Who are you in charge of?',
    ],
    hasRealityTrack: true,
  },
  {
    id: 'pursued',
    name: 'Pursued',
    realityTrigger: {
      name: 'On Your Trail',
      description:
        "The GM may use Reality Trigger to highlight a person who recognizes you and will report back to those looking for you. If you do not take time to put them off your scent, they go rooting around in your private life: the Relationship who knows the least about you loses one Connection and will ask some difficult questions during your next scene with them. If you reveal your new identity or location to people who would recognize you, mark the next empty box on a four-box \"Caught\" track. When this happens while all boxes are marked, your past catches up to you. When it does, through this effect or otherwise, you must choose a new Reality.",
    },
    burnoutRelease: {
      name: "Wasn't Me",
      description:
        "When you're doing something that will cover your tracks, ignore all Burnout.",
      activated: false,
    },
    onboardingQuestions: [
      'What do you miss the most from your old life?',
      'When do you feel the most powerful?',
      'If you were to run a charitable organization, what cause would it champion?',
    ],
    relationshipMatrixQuestions: [
      'Who knows about your pursuer?',
      'Who would be most hurt to find out the truth?',
      'Who is obsessed with the new you?',
    ],
    hasRealityTrack: true,
  },
  {
    id: 'star',
    name: 'Star',
    realityTrigger: {
      name: 'Your Biggest Fan',
      description:
        "You have fans everywhere, and all of them want a chance to talk to you. The GM may use Reality Trigger to have someone recognize you and become desperate for your attention. If you ignore them, they make a scene now and complain online later: the Relationship that would lose the most if you fell from fame loses one Connection. If you do something to damage your reputation, your fame starts to dwindle. Mark the next empty box in a four-box \"Fallen\" track. When the Fallen track is full, or when you give up on your goals, your rise to stardom is finished: you must choose a new Reality.",
    },
    burnoutRelease: {
      name: 'Eat It Up',
      description:
        'When you are doing something that will assert your superiority or prove your worth, ignore all Burnout.',
      activated: false,
    },
    onboardingQuestions: [
      'Who is your personal idol?',
      'What will you be forced to return to if you lose the spotlight?',
      'What animal do you feel best represents you?',
    ],
    relationshipMatrixQuestions: [
      'Who is your manager?',
      'Who remains from your former life?',
      'Who is your biggest rival?',
    ],
    hasRealityTrack: true,
  },
  {
    id: 'struggling',
    name: 'Struggling',
    realityTrigger: {
      name: 'Fly in Your Wallet',
      description:
        "The Struggling never has enough money, and the world is expensive. The GM may use Reality Trigger to make something you're obligated to pay (taxi fare, cover charge, etc.) cost more money than you can afford. If you do not find a way to escape payment, you'll have to borrow from a friend: one of your Relationships, chosen by you, loses one Connection. If you gain a large sum of money, your debts come calling and it quickly disappears. Mark the next empty box on a four-box \"Back to Zero\" track. When this happens while all four boxes are marked, or you find a way to permanently escape your responsibilities, you must choose a new Reality.",
    },
    burnoutRelease: {
      name: 'Not a Penny More',
      description:
        'When you are doing something that will get you a good deal, ignore all Burnout.',
      activated: false,
    },
    onboardingQuestions: [
      'What is the most expensive thing you wish you could buy?',
      'What will you never get back?',
      'What is the first piece of visual art you fell in love with?',
    ],
    relationshipMatrixQuestions: [
      'Who do you rely on for shelter?',
      'Who do you owe the most money to?',
      'For whom do you most want to get it together?',
    ],
    hasRealityTrack: true,
  },
  {
    id: 'newborn',
    name: 'Newborn',
    realityTrigger: {
      name: 'Still Learning',
      description:
        "The GM may use Reality Trigger to have you forget—or never have known—how to do a common everyday activity (open a door, operate a toaster, fire a gun, say the word \"earwax,\" etc.) You cannot do it right now, and need to seek assistance or an alternative path. If you do not take the time to find either, the embarrassment sends you retreating: the Relationship whose opinion you value the most loses one Connection. If you change something about yourself to fit into the world, mark the next empty box on a four-box \"Self-Made\" track. When this happens while all four boxes are marked, or you no longer feel like an outsider in your world, you must choose a new Reality.",
    },
    burnoutRelease: {
      name: 'Just Like Home',
      description:
        'When you are doing something that will make the world more like you, ignore all Burnout.',
      activated: false,
    },
    onboardingQuestions: [
      'How did you end up here?',
      'What is the last thing that made you feel completely alone?',
      'If you had an extra day in the week, how would you use it?',
    ],
    relationshipMatrixQuestions: [
      'Who is your favorite teacher?',
      'Who relies on your unusual perspective?',
      'Who loves to take advantage of your naivete?',
    ],
    hasRealityTrack: true,
  },
  {
    id: 'backbone',
    name: 'Backbone',
    realityTrigger: {
      name: 'Endless Responsibility',
      description:
        "The GM may use Reality Trigger to have one of your organization's members approach you with a need at any time. If you ignore or avoid them, you look bad to your organization and those who know it: a Relationship, chosen by the player of your successor (see Relationship Matrix) loses one Connection. If you break your Organization's rules or embarrass the other members, mark the next empty box on a four-box \"Ousted\" track. When this happens while all boxes are marked, or when you abdicate your position, your successor takes over the organization. You must choose a new Reality.",
    },
    burnoutRelease: {
      name: "Here's My Card",
      description:
        'When you are doing something that will increase the influence of your Organization, ignore all Burnout.',
      activated: false,
    },
    onboardingQuestions: [
      'What is the greatest thing that someone else has done for you?',
      'How do you react to unsolicited criticism?',
      "What's your favorite karaoke song?",
    ],
    relationshipMatrixQuestions: [
      'Who is your successor?',
      "Who threatens your organization's continued existence?",
      "Who can never even remember your organization's name?",
    ],
    hasRealityTrack: true,
  },
  {
    id: 'creature',
    name: 'Creature',
    realityTrigger: {
      name: 'Yes Right Now',
      description:
        "Your true self has needs that others may understand but could never share. The GM may use Reality Trigger to have one of these urges bubble to the surface of your consciousness. If you ignore this urge, the willpower spent ignoring it causes you to struggle to communicate with others: the Relationship who most believes your disguise loses one Connection. If the truth about yourself is confessed or exposed to someone, mark the next empty box on a four-box \"Revealed\" track. When this happens while all boxes are marked, or you are exposed publicly in a way that can't be undone, your disguise no longer functions. If you can continue to work you must choose a new Reality.",
    },
    burnoutRelease: {
      name: 'Crushing It',
      description:
        'When you are doing something that will make you seem less interesting, ignore all Burnout.',
      activated: false,
    },
    onboardingQuestions: [
      'What made you decide on a life in a different world?',
      'What is the worst thing that could happen to your friends if you let down your guard?',
      'What is your favorite idiom?',
    ],
    relationshipMatrixQuestions: [
      'Who came from the same place you did?',
      'Who taught you how to hide among regular people?',
      'Who do you wish to teach more about your first life?',
    ],
    hasRealityTrack: true,
  },
];
