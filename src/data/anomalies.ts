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
        tieredMode: 'per-extra',
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
  {
    id: 'whisper',
    name: 'Whisper',
    abilities: [
      {
        name: 'Say Again?',
        description: 'You may respond to a spoken sentence with the phrase "Say again?" and then tell the group what the target says instead of what they said initially. Roll Presence.',
        rollStat: 'presence',
        tieredMode: 'six-plus',
        outcomes: [
          { trigger: 'success', triggerLabel: 'On a success', description: 'The target believes that the new sentence is what they meant.' },
          { trigger: 'tiered',  triggerLabel: 'On six or more 3s', description: 'You may speak for the target at any time in the next hour.' },
          { trigger: 'failure', triggerLabel: 'On a failure', description: 'The target is unaffected, and for the next 3 hours you can only speak using the words in the sentence you intended for them.' },
        ],
        personalization: {
          question: 'When someone interrupts me, I give them...',
          answers: [
            { text: 'The benefit of the doubt.', code: 'T2' },
            { text: 'A piece of my mind.', code: 'P4' },
          ],
        },
      },
      {
        name: 'Tip of the Tongue',
        description: 'Open your mind to the thoughts of someone nearby. Let their words reach your voice and roll Empathy.',
        rollStat: 'empathy',
        outcomes: [
          { trigger: 'success', triggerLabel: 'On a success', description: 'You say what the target wishes they were saying right now.' },
          { trigger: 'tiered',  triggerLabel: 'On every third 3', description: 'You may ask a question about something currently relevant to the target and receive an answer from the GM. The question and answer must be spoken out loud by your character.' },
          { trigger: 'failure', triggerLabel: 'On a failure', description: "You admit something you don't want anyone to know." },
        ],
        personalization: {
          question: 'When I need to fit in somewhere, I...',
          answers: [
            { text: 'Jump in and act like I belong.', code: 'A11' },
            { text: 'Gradually infiltrate after a long period of careful reconnaissance.', code: 'B9' },
          ],
        },
      },
      {
        name: 'Silence',
        description: 'Open your mouth and emit a sound that adjusts frequency to cancel out the noises you make. Roll Subtlety.',
        rollStat: 'subtlety',
        tieredMode: 'per-extra',
        outcomes: [
          { trigger: 'success', triggerLabel: 'On a success', description: 'None of your actions make a sound until after you make another roll or close your mouth.' },
          { trigger: 'tiered',  triggerLabel: 'For each additional 3', description: 'You can silence the actions of one additional target until this effect ends.' },
          { trigger: 'failure', triggerLabel: 'On a failure', description: 'Your frequency becomes imbalanced and you greatly amplify all sounds you make for the next hour.' },
        ],
        personalization: {
          question: 'I go quiet...',
          answers: [
            { text: 'So others can speak.', code: 'S10' },
            { text: 'So my next words hit harder.', code: 'S8' },
          ],
        },
      },
    ],
  },
  {
    id: 'catalogue',
    name: 'Catalogue',
    abilities: [
      {
        name: "What's That Over There?",
        description: 'Point somewhere nearby and say "what\'s that over there?" Roll Attentiveness.',
        rollStat: 'attentiveness',
        tieredMode: 'per-extra',
        outcomes: [
          { trigger: 'success', triggerLabel: 'On a success', description: "You create an object where you're pointing. It can be any mundane thing you imagine that fits comfortably and harmlessly inside the space, but can only feature details or information you would know." },
          { trigger: 'tiered',  triggerLabel: 'For each additional 3', description: 'You may add another object nearby.' },
          { trigger: 'failure', triggerLabel: 'On a failure', description: 'The GM will describe a different object that is now there, and it is either obviously out of place or extremely inconvenient.' },
        ],
        personalization: {
          question: 'My friends would never hurt me, because...',
          answers: [
            { text: "They don't know how.", code: 'Y1' },
            { text: 'I hired them.', code: 'I5' },
          ],
        },
      },
      {
        name: 'You Might Also Like...',
        description: 'Hold any object small enough to carry and roll Dynamism.',
        rollStat: 'dynamism',
        outcomes: [
          { trigger: 'success', triggerLabel: 'On a success', description: 'The object changes to a similar–but different–version of the object. (A green coat becomes a blue coat, a stuffed bear becomes a stuffed tiger, room key #203 becomes #204, etc.)' },
          { trigger: 'tiered',  triggerLabel: 'On every third 3', description: 'You may give the object an additional variant you can freely swap it between, such as giving a cane an alternate self as a sword. This effect is permanent but it can only swap when you are handling the object.' },
          { trigger: 'failure', triggerLabel: 'On a failure', description: 'The object is replaced with something entirely different. It can no longer be changed by this ability.' },
        ],
        personalization: {
          question: 'To me, the customer is always...',
          answers: [
            { text: 'Wrong.', code: 'L2' },
            { text: 'Right.', code: 'J1' },
          ],
        },
      },
      {
        name: 'Your Best Self',
        description: 'Open a container large enough to fit you entirely inside. Roll Duplicity.',
        rollStat: 'duplicity',
        tieredMode: 'six-plus',
        outcomes: [
          { trigger: 'success', triggerLabel: 'On a success', description: 'An alternate version of you is inside. They have one particular skill that is useful to your current situation (whittling, whistling, whisking, etc). They disappear from your world within the hour.' },
          { trigger: 'tiered',  triggerLabel: 'On six or more 3s', description: 'You can create an additional alternate self.' },
          { trigger: 'failure', triggerLabel: 'On a failure', description: 'The alternate version you reveal is evil from your perspective. They have goals and priorities opposite yours and are committed to getting in your way until dealt with. They leave your world voluntarily only when satisfied by the changes they made to it.' },
        ],
        personalization: {
          question: 'The enemy of my enemy is...',
          answers: [
            { text: 'My friend.', code: 'Y5' },
            { text: 'Me.', code: 'P5' },
          ],
        },
      },
    ],
  },
  {
    id: 'drain',
    name: 'Drain',
    abilities: [
      {
        name: 'Would You Like Some More?',
        description: 'To you, desire is a bucket. Poke a hole in it by saying "Would you like some more?" and roll Empathy.',
        rollStat: 'empathy',
        tieredMode: 'per-extra',
        outcomes: [
          { trigger: 'success', triggerLabel: 'On a success', description: "The person you are speaking to becomes very interested in more of the last thing they enjoyed (attention, affection, ice cream, rest, etc.) as identified by you and the player of the character. This does not create an addiction or a compulsion, but makes that thing, if it's available, into leverage or distraction far beyond its worth." },
          { trigger: 'tiered',  triggerLabel: 'For each additional 3', description: 'You may spread their desire to one other nearby target to similar effect.' },
          { trigger: 'failure', triggerLabel: 'On a failure', description: 'The target develops a loathing for the last thing they enjoyed. Your suggestion of more is insulting to them, and even thinking about that thing is revolting to them from now on.' },
        ],
        personalization: {
          question: 'I can lead a horse to water...',
          answers: [
            { text: 'But who drinks water?', code: 'Y4' },
            { text: "But I'm drinking first.", code: 'C1' },
          ],
        },
      },
      {
        name: 'Borrow',
        description: 'You may choose a feature of a mundane target and take it for yourself. Their face, their voice, their love, their fingerprints—now you have it, and they do not. Roll Duplicity.',
        rollStat: 'duplicity',
        tieredMode: 'per-extra',
        outcomes: [
          { trigger: 'success', triggerLabel: 'On a success', description: 'This effect lasts for up to one hour.' },
          { trigger: 'tiered',  triggerLabel: 'For each additional 3', description: 'Choose one:', options: ["The target keeps a flawed version of what's borrowed.", 'The effect lasts an additional hour.', "You may share what's borrowed with one other target."] },
          { trigger: 'failure', triggerLabel: 'On a failure', description: "The target loses what you've taken permanently, and no one gets it. They remember what they have lost." },
        ],
        personalization: {
          question: 'People love me because...',
          answers: [
            { text: "If they don't, I find new people.", code: 'R9' },
            { text: "I make sure I'm flawless.", code: 'S15' },
          ],
        },
      },
      {
        name: 'Universal Recipient',
        description: 'When you receive Harm or are hurt in any way, you may roll Persistence.',
        rollStat: 'persistence',
        tieredMode: 'per-extra',
        outcomes: [
          { trigger: 'success', triggerLabel: 'On a success', description: 'Select a nearby living person or Anomaly other than what hurt you. They are hurt instead, and you are unhurt.' },
          { trigger: 'tiered',  triggerLabel: 'For each additional 3', description: 'You may choose an additional target who receives that same hurt.' },
          { trigger: 'failure', triggerLabel: 'On a failure', description: 'Your pain cycles back on itself, and you are dealt that hurt triply. If there would be Harm remaining after your death, it finds additional nearby targets until it is all dealt.' },
        ],
        personalization: {
          question: 'When someone hurts me...',
          answers: [
            { text: "It's a chance for a valuable lesson.", code: 'S19' },
            { text: 'They should not have done that. Why did they do that?', code: 'B11' },
          ],
        },
      },
    ],
  },
  {
    id: 'timepiece',
    name: 'Timepiece',
    abilities: [
      {
        name: "We've Got Time.",
        description: 'When you or a target are in a hurry to complete a task (fix a car, escape a pursuer, etc.) check any clock and say the phrase "We\'ve got time." Roll Professionalism.',
        rollStat: 'professionalism',
        tieredMode: 'per-extra',
        outcomes: [
          { trigger: 'success', triggerLabel: 'On a success', description: "You're right. If the task is focused on and approached genuinely, it will be completed before the impending deadline." },
          { trigger: 'tiered',  triggerLabel: 'For each additional 3', description: 'You gain an additional minute of preparation before the deadline hits for other activities.' },
          { trigger: 'failure', triggerLabel: 'On a failure', description: "You are catastrophically, terribly wrong — and you don't know until it's too late. Your pursuer takes you by surprise, the deadline has already passed...where did all the time go?" },
        ],
        personalization: {
          question: 'I know...',
          answers: [
            { text: 'The deep magic.', code: 'W3' },
            { text: 'Kung-fu.', code: 'C10' },
          ],
        },
      },
      {
        name: 'Overclock',
        description: 'When you or an ally rolls for an Anomaly ability other than this one, after seeing the result, punch a clock and roll Initiative.',
        rollStat: 'initiative',
        tieredMode: 'per-extra',
        outcomes: [
          { trigger: 'success', triggerLabel: 'On a success', description: 'You send the target back in time to assist themselves, allowing them to use the same ability a second time with an identical number of 3s. This second use can affect new targets and does not generate Chaos or Triscendence effects.' },
          { trigger: 'tiered',  triggerLabel: 'For each additional 3', description: 'You add one 3 to the second use. This effect can make a roll exceed six 3s.' },
          { trigger: 'failure', triggerLabel: 'On a failure', description: 'The original roll becomes a failure, and then the ability fails a second time. The second failure repeats on the same target or moves to a new target, whichever is worse. Chaos is not generated by the copied failure.' },
        ],
        personalization: {
          question: "I'll sleep when...",
          answers: [
            { text: "I'm tired.", code: 'P13' },
            { text: "I'm dead.", code: 'O7' },
          ],
        },
      },
      {
        name: 'Remember When',
        description: 'Make someone feel an overwhelming rush of nostalgia for the time they let slip away. Hum a tune and roll Empathy.',
        rollStat: 'empathy',
        outcomes: [
          { trigger: 'success', triggerLabel: 'On a success', description: "All past events, even recent ones, feel wistfully far away. The target is desperate to talk about their past and easily led toward subjects you're interested in—even typically secret or classified ones." },
          { trigger: 'tiered',  triggerLabel: 'On every third 3', description: 'You may request a particular memory or sequence be described in perfect detail—the GM will paint the entire scene, and it will not suffer the natural decay of memory. This effect can reveal information behind even Anomalous memory blockages or wipes.' },
          { trigger: 'failure', triggerLabel: 'On a failure', description: 'The target becomes lost in their memories. They are overcome with emotion, and are useless for gathering information. Returning to the present will take time and care. Their condition generates at least one Loose End.' },
        ],
        personalization: {
          question: "I'm more likely to ask...",
          answers: [
            { text: 'Where are they now?', code: 'O6' },
            { text: 'Where are they going?', code: 'F3' },
          ],
        },
      },
    ],
  },
  {
    id: 'growth',
    name: 'Growth',
    abilities: [
      {
        name: "I'll Cover You!",
        description: 'When a nearby target would be hurt by an external force, you may say "I\'ll cover you!" and extend your flesh to protect them. Roll Persistence.',
        rollStat: 'persistence',
        outcomes: [
          { trigger: 'success', triggerLabel: 'On a success', description: 'You grow rapidly around them and take the attack for them. Any hurt, Harm, or death is dealt to you instead of them.' },
          { trigger: 'tiered',  triggerLabel: 'On every third 3', description: "You armor yourself in extra layers of protective flesh. This instance of Harm is reduced by one, and any extra is applied to future Harm. (Higher numbers will create an obvious change in your physical body until it's lost to absorb the harm.)" },
          { trigger: 'failure', triggerLabel: 'On a failure', description: 'You and the target both take the original harm. Your body grows beyond your intent and remains overgrown in an obvious way until you have at least an hour to rest and recuperate.' },
        ],
        personalization: {
          question: 'I protect people because...',
          answers: [
            { text: "I want them to know who's tougher.", code: 'F5' },
            { text: 'They cannot protect themselves.', code: 'L6' },
          ],
        },
      },
      {
        name: 'Limbs',
        description: 'Expand your physical possibility with additional limbs similar to the ones you already possess. Roll Dynamism.',
        rollStat: 'dynamism',
        tieredMode: 'per-extra',
        outcomes: [
          { trigger: 'success', triggerLabel: 'On a success', description: 'You gain reach and control far beyond typical combatants, and can easily engage any mundane or Minor Anomaly target into a stalemate.' },
          { trigger: 'tiered',  triggerLabel: 'For each additional 3', description: 'Choose one:', options: ['Disarm a target.', 'Engage one more target.', 'Render an engaged target unconscious.', 'Kill an unconscious target.'] },
          { trigger: 'failure', triggerLabel: 'On a failure', description: 'You become only limbs. All other features disappear and you become a conscious pile of whatever limbs you were hoping to create. You are extremely awkward and vulnerable to Harm for an hour.' },
        ],
        personalization: {
          question: 'When I run into a wall, I...',
          answers: [
            { text: 'Eat the wall.', code: 'S13' },
            { text: 'Step over the wall.', code: 'G9' },
          ],
        },
      },
      {
        name: 'Eyes',
        description: 'Open a few more eyes. Roll Professionalism.',
        rollStat: 'professionalism',
        tieredMode: 'per-one',
        outcomes: [
          { trigger: 'success', triggerLabel: 'On a success', description: 'You sprout new eyes on your body, with potent new abilities.' },
          { trigger: 'tiered',  triggerLabel: 'Spend your 3s', description: 'Choose vision types to unlock, each lasting 1 hour:', options: ['1 three: Heat, Night, or Telescopic', '2 threes: Fingerprint or X-Ray', '3 threes: Reality (Cuts through illusions and obfuscations)', '4 threes: Plant Sign Language, Anomaly Tracking', '6 threes: Weakness', '7 threes: Future Sight'] },
          { trigger: 'failure', triggerLabel: 'On a failure', description: 'You see A Vision of the End. You receive a piece of forbidden knowledge about the end of all things, too big for your mind to comprehend. You suffer from an additional Burnout on all rolls until the end of the mission.' },
        ],
        personalization: {
          question: 'Have I seen a Vision of the End? (Only you answer this question.)',
          answers: [
            { text: 'No. Also, I like plants!', code: 'G6' },
            { text: 'Yes.', code: 'R7' },
          ],
        },
      },
    ],
  },
  {
    id: 'gun',
    name: 'Gun',
    abilities: [
      {
        name: 'Eliminate',
        description: 'You can remove a mundane object or person from the equation permanently. Once, they existed. Now they do not. Aim your Gun and roll Dynamism.',
        rollStat: 'dynamism',
        tieredMode: 'six-plus',
        outcomes: [
          { trigger: 'success', triggerLabel: 'On a success', description: 'The target disappears without a trace.' },
          { trigger: 'tiered',  triggerLabel: 'On six or more 3s', description: "Choose any number of targets you can see from where you're standing. They disappear without a trace." },
          { trigger: 'failure', triggerLabel: 'On a failure', description: 'The target is killed. An object is destroyed, a living creature dies. This fact is visible, obvious, and potentially horrifying.' },
        ],
        personalization: {
          question: 'Will you remember them all? (Only you answer this question.)',
          answers: [
            { text: 'No.', code: 'S6' },
            { text: 'Yes.', code: 'T5' },
          ],
        },
      },
      {
        name: 'Quick Draw',
        description: 'When something tries to hurt you, fire your Gun and roll Initiative.',
        rollStat: 'initiative',
        tieredMode: 'per-extra',
        outcomes: [
          { trigger: 'success', triggerLabel: 'On a success', description: 'You shot first. The aggressor takes one Harm before their attack and they do not succeed at hurting you.' },
          { trigger: 'tiered',  triggerLabel: 'For each additional 3', description: "You may choose an additional target to Harm or Eliminate a target you've already Harmed with this ability." },
          { trigger: 'failure', triggerLabel: 'On a failure', description: 'You misfire. Something or someone important to you is damaged, and the original attack against you proceeds as planned.' },
        ],
        personalization: {
          question: 'I shoot...',
          answers: [
            { text: 'Carefully.', code: 'G4' },
            { text: 'Immediately.', code: 'A12' },
          ],
        },
      },
      {
        name: 'Open Carry',
        description: 'The threat of your Gun is so great that even the mundane can sense it. Make your options clear and roll Presence.',
        rollStat: 'presence',
        tieredMode: 'per-extra',
        outcomes: [
          { trigger: 'success', triggerLabel: 'On a success', description: 'A target you are focusing on is intimidated enough to do what you want. However, the GM chooses one consequence from the following. The target will:', options: ['Remember your face', 'Contact the authorities', 'React with extreme fear', 'Seek retribution'] },
          { trigger: 'tiered',  triggerLabel: 'For each additional 3', description: 'You may either remove an option from the possible consequences or add an additional target. For example, six 3s could mean no consequences and 2 targets, or 5 targets and all potential consequences.' },
          { trigger: 'failure', triggerLabel: 'On a failure', description: 'The target is unafraid. They become immune to all effects of your Gun, and will likely retaliate in immediate and dangerous ways.' },
        ],
        personalization: {
          question: 'Friends are...',
          answers: [
            { text: 'Everywhere, if you know how to look.', code: 'D6' },
            { text: "Enemies I haven't made yet.", code: 'W11' },
          ],
        },
      },
    ],
  },
  {
    id: 'manifold',
    name: 'Manifold',
    abilities: [
      {
        name: 'I Know a Shortcut!',
        description: 'When you want to get somewhere in a hurry, say the phrase "I know a shortcut!" and then describe a short path to the discussed location. Roll Initiative.',
        rollStat: 'initiative',
        tieredMode: 'per-extra',
        outcomes: [
          { trigger: 'success', triggerLabel: 'On a success', description: 'Your directions are correct, no matter how impossible, for yourself. This shortcut disappears once it has been used.' },
          { trigger: 'tiered',  triggerLabel: 'For each additional 3', description: 'An additional person may use your shortcut before it disappears.' },
          { trigger: 'failure', triggerLabel: 'On a failure', description: 'Your shortcut leads somewhere very inconvenient instead of the desired location, and it is persistent and visible to everyone on both ends.' },
        ],
        personalization: {
          question: 'The world is...',
          answers: [
            { text: 'As I see it.', code: 'F9' },
            { text: 'As I make it.', code: 'S16' },
          ],
        },
      },
      {
        name: 'Just Keep Walking...',
        description: 'When you give someone directions, are fleeing from a pursuer, or know where someone is going, you may attempt to trap them in a maze or endless hallway. Tie a knot and roll Persistence.',
        rollStat: 'persistence',
        tieredMode: 'per-extra',
        outcomes: [
          { trigger: 'success', triggerLabel: 'On a success', description: 'You trap them in a complex, repeating path of your own design. They cannot exit until you make another roll.' },
          { trigger: 'tiered',  triggerLabel: 'For each additional 3', description: 'You may trap an additional target or make the maze last for additional rolls past the first.' },
          { trigger: 'failure', triggerLabel: 'On a failure', description: 'You speed them immediately along to their destination—they reach their target, or catch you, immediately.' },
        ],
        personalization: {
          question: 'I spend time with people...',
          answers: [
            { text: 'I want to understand.', code: 'A5' },
            { text: 'Who are already like me.', code: 'M9' },
          ],
        },
      },
      {
        name: 'Gyre the Gimbal',
        description: 'Adjust your balance and roll Professionalism.',
        rollStat: 'professionalism',
        tieredMode: 'per-extra',
        outcomes: [
          { trigger: 'success', triggerLabel: 'On a success', description: "You change the orientation of gravity up to 90 degrees in a direction of your choosing. If you're in a room, it affects only that room. If you're outside, it affects everything within about 30 yards. This effect lasts until you make another roll." },
          { trigger: 'tiered',  triggerLabel: 'For each additional 3', description: 'Choose one:', options: ["The change doesn't affect a single target, such as yourself.", 'The range is infinite for a single target.', 'Gravity for a single target is rotated further than 90 degrees.'] },
          { trigger: 'failure', triggerLabel: 'On a failure', description: 'You become unmoored from gravity. For at least an hour your body acts as if it is in a zero gravity environment. Anyone who sees this will become a Loose End.' },
        ],
        personalization: {
          question: 'When in crisis, I...',
          answers: [
            { text: 'Fly.', code: 'P6' },
            { text: 'Fight.', code: 'S18' },
          ],
        },
      },
    ],
  },
  {
    id: 'absence',
    name: 'Absence',
    abilities: [
      {
        name: 'Missed!',
        description: 'They never seem to know where you are. When something might touch or hurt you, you can say "Missed!" and roll Duplicity.',
        rollStat: 'duplicity',
        tieredMode: 'per-extra',
        outcomes: [
          { trigger: 'success', triggerLabel: 'On a success', description: 'You were always somewhere else nearby—perhaps behind or on top of whatever tried to touch you.' },
          { trigger: 'tiered',  triggerLabel: 'For each additional 3', description: 'Another willing, nearby target may be moved with you to the new location.' },
          { trigger: 'failure', triggerLabel: 'On a failure', description: 'The target moves instead—to hurt another, to an angle that deals additional Harm, or to a very inconvenient place.' },
        ],
        personalization: {
          question: "In an argument, I'll win by...",
          answers: [
            { text: 'Identifying gaps in logic.', code: 'I2' },
            { text: 'Never backing down.', code: 'M10' },
          ],
        },
      },
      {
        name: 'Negatives',
        description: 'Inspect the place where something once was. Roll Attentiveness.',
        rollStat: 'attentiveness',
        outcomes: [
          { trigger: 'success', triggerLabel: 'On a success', description: "You can see the lost history of the place you're inspecting. If a note was removed, you know what it read—if an object was stolen, you know what it was and how it left." },
          { trigger: 'tiered',  triggerLabel: 'On every third 3', description: 'You may say one sentence about what is lost, and that sentence is true.' },
          { trigger: 'failure', triggerLabel: 'On a failure', description: "There's too much loss. You become overwhelmed by the history of the location you're in, and receive one Harm—in addition to any Loose Ends caused by your visible, painful reaction." },
        ],
        personalization: {
          question: 'To fill empty space, I tend to...',
          answers: [
            { text: 'Make conversation.', code: 'W5' },
            { text: 'Take up more of it.', code: 'C6' },
          ],
        },
      },
      {
        name: 'Unbound',
        description: 'If something is in your way or holding you back, relax your body and roll Subtlety.',
        rollStat: 'subtlety',
        outcomes: [
          { trigger: 'success', triggerLabel: 'On a success', description: 'You pass directly through it. You become intangible and can move easily through walls, chains, and other obstructions for one hour.' },
          { trigger: 'tiered',  triggerLabel: 'On every third 3', description: 'Choose one:', options: ['You become invisible.', 'You become inaudible.', 'You become unmemorable to one observer.', 'You bring one person with you any time you pass through an obstacle while using this ability.'] },
          { trigger: 'failure', triggerLabel: 'On a failure', description: 'You lose control of your physical form and become unstable. You are unable to feel, hold, or interact with physical objects, but can still be Harmed for the remainder of the mission or until you die, whichever comes first.' },
        ],
        personalization: {
          question: "I'd rather be...",
          answers: [
            { text: 'The distraction.', code: 'U3' },
            { text: 'Undercover.', code: 'O3' },
          ],
        },
      },
    ],
  },
];
