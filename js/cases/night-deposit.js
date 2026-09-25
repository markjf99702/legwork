// Case 1. The tutorial: one day, a handful of leads, and a story that can be checked against the record.

export default {
  id: 'night-deposit',
  n: 1,
  title: 'The Night Deposit',
  crime: 'Theft',
  difficulty: 1,
  summary: 'Saturday’s takings from a family grocery never reached the bank. The safe wasn’t forced, and only three people know the combination.',
  days: ['Saturday', 'Sunday', 'Monday'],
  start: { day: 1, hour: 9 },
  hours: 8,

  briefing: `Lieutenant Ruth Okafor doesn’t sit down. She puts a single sheet on your desk and taps it twice.

“Kowalczyk’s Market, on Dunmore. Family grocery, same family since 1961. Saturday’s takings were supposed to go into the bank’s night drop. This morning they’re gone, and nobody broke anything to take them.”

> INCIDENT 26-11408 · THEFT · 2210 DUNMORE ST
> Reported 7:46 a.m. Sunday by Irene Kowalczyk, owner.
> Deposit bag (blue vinyl, Northshore Savings) missing
> from the office safe. $11,480. No sign of forced entry.

“Mrs. Kowalczyk says the bag spent the night in her safe. Three people know that combination. Find out which one opened it, or whether anybody did.” She’s already turning away. “Report on my desk by five, {det}. Bring me the chain, not a hunch.”`,

  people: {
    irene: { name: 'Irene Kowalczyk', role: 'Owner, Kowalczyk’s Market', about: '66. Took over the store from her parents. Found the safe empty at seven this morning.' },
    danny: { name: 'Danny Ruiz', role: 'Assistant manager', about: '31. Six years at the store, and Irene trusts him with the keys. Closed up Saturday night.', if: '@market' },
    martin: { name: 'Martin Kowalczyk', role: 'Irene’s son', about: '38. Keeps the store’s books part-time. Knows the safe combination.', if: 'combo_three' },
    tasha: { name: 'Tasha Greene', role: 'Cashier', about: '24. Closed the store with Danny on Saturday. Has a two-year-old.', if: 'danny_story' },
    vince: { name: 'Vince Amato', role: 'Owner, Amato’s Pizza, next door', about: 'Has made pizza on Dunmore Street for twenty-two years.', if: '@amato' },
    lorraine: { name: 'Lorraine Tate', role: 'Branch manager, Northshore Savings', about: 'Runs the Dunmore branch, where the night drop is.', if: '@bank' },
    gil: { name: 'Gil Brody', role: 'Landlord, Linden Court Apartments', about: 'Owns the building where Danny lives.', if: '@landlord' },
  },

  clues: {
    danny_call: { title: 'Danny’s call at 10:34', text: 'Danny phoned Irene at 10:34 p.m. Saturday. The bank’s night drop was jammed, he said, so he had come back and locked the deposit in the office safe.', who: ['danny', 'irene'], at: 'Sat 22:34' },
    float_untouched: { title: 'The float was left behind', text: 'The $800 register float was in the same safe, in its labeled trays, and nobody touched it. Whoever emptied the safe left the easiest money in it.', who: ['irene'] },
    combo_three: { title: 'Three people know the combination', text: 'Irene, her son Martin and Danny Ruiz. Irene changed it in March and told only those two.', who: ['irene', 'martin', 'danny'] },
    bands: { title: 'Irene initials her bands', text: 'Irene wraps the twenties in $500 paper bands and writes her initials, IK, on every one. Her father did the same. Saturday’s cash was banded that way.', who: ['irene'] },
    no_force: { title: 'No forced entry', text: 'The back door, the office door and the safe are undamaged. The safe is a mechanical dial safe. It keeps no record of when it’s opened.' },
    deposit_slip: { title: 'Saturday’s deposit slip', text: 'Filled out by Danny at 10:02 p.m.: $11,480. That’s $10,940 in cash and $540 in checks.', who: ['danny'], at: 'Sat 22:02' },
    keystone_name: { title: 'The alarm is monitored', text: 'A Keystone Alarm sticker on the keypad by the back door. Each employee has a code, and the monitoring center logs every one used.' },
    tasha_advance: { title: 'Tasha asked for an advance', text: 'Last month Tasha asked Irene for a $2,000 advance to cover daycare. Irene said no, and has felt bad about it since.', who: ['tasha', 'irene'] },
    danny_story: { title: 'Danny’s account', text: 'Set the alarm at about 10:08 and left with Tasha. Drove to the Northshore night drop, but its door wouldn’t open. Came back about 10:25, let himself in the back, put the bag in the safe, spun the dial, set the alarm again and went home to Linden Court.', who: ['danny'], at: 'Sat 22:25' },
    martin_debts: { title: 'Martin asked for money', text: 'Saturday afternoon Martin asked his mother for $3,000, and she refused. He bets on sports and plays blackjack at Calder Downs.', who: ['martin', 'irene'], at: 'Sat 15:40' },
    tasha_bag: { title: 'Tasha saw the bag leave', text: 'At closing, Tasha watched Danny put the blue deposit bag on the passenger seat of his car. He said he was going straight to the bank.', who: ['tasha', 'danny'], at: 'Sat 22:08' },
    danny_money: { title: 'Danny asked about a loan', text: 'Two weeks ago Danny asked Tasha whether she knew anybody who would lend money “fast, no bank.”', who: ['danny', 'tasha'] },
    vince_drop: { title: 'The night drop worked', text: 'Vince Amato made his own deposit at the Northshore night drop at 10:40 p.m. Saturday. It opened fine.', who: ['vince'], at: 'Sat 22:40' },
    vince_car: { title: 'Danny’s car sat in the lot', text: 'While he closed up, from about 10:15 to 10:35, Vince saw Danny’s blue Civic parked in the market’s lot with its engine running. It left around 10:35 and turned south, away from the bank.', who: ['vince', 'danny'], at: 'Sat 22:15' },
    drop_ok: { title: 'No fault on the night drop', text: 'The bank’s system shows no fault on the night drop all weekend. It was serviced in August.', who: ['lorraine'] },
    camera: { title: 'The night drop camera', text: 'From 10 p.m. to midnight Saturday, one person uses the night drop: Vince Amato at 10:41. Nobody from Kowalczyk’s comes near it.', who: ['lorraine'], at: 'Sat 22:41' },
    alarm_log: { title: 'The alarm log', text: 'Armed at 10:08 p.m. Saturday with code 2 (Danny). The next event is at 6:58 a.m. Sunday, disarmed with code 1 (Irene). Nothing in between: no disarm, no alarm.', who: ['danny', 'irene'], at: 'Sat 22:08' },
    martin_claim: { title: 'Martin says he was home', text: 'Martin says he was home alone all Saturday night watching the game and went to bed around midnight.', who: ['martin'] },
    valet_stub: { title: 'A valet stub', text: 'On Martin’s counter: a Calder Downs valet stub, Saturday, 9:04 p.m.', who: ['martin'], at: 'Sat 21:04' },
    martin_casino: { title: 'Martin was at Calder Downs', text: 'Martin’s players card was in play at the blackjack tables from 9:12 p.m. Saturday to 2:48 a.m. Sunday. He lost $640.', who: ['martin'], at: 'Sat 21:12' },
    rent_paid: { title: 'Danny paid his rent this morning', text: 'At 7:40 this morning Danny paid his landlord $3,150 in cash. That covers three months of back rent, and it stops an eviction hearing set for Tuesday.', who: ['danny', 'gil'], at: 'Sun 7:40' },
    rent_band: { title: 'A band marked IK', text: 'Some of Danny’s rent money was still in paper bands. Gil Brody kept one: “$500 — IK” in blue ballpoint.', who: ['danny', 'gil'] },
    danny_lawyer: { title: 'Danny stopped talking', text: 'When he saw the alarm log, Danny’s story changed twice. Then he asked for a lawyer.', who: ['danny'] },
    search_cash: { title: 'The search', text: 'In a boot box in Danny’s closet: $7,390, most of it still in bands marked IK. The blue deposit bag was under the spare tire in his trunk, with the $540 in checks still inside.', who: ['danny'] },
  },

  leads: {
    market: { title: 'Kowalczyk’s Market', where: '2210 Dunmore St · Northgate', kind: 'place', cost: 0.5 },
    amato: { title: 'Amato’s Pizza', where: 'Next door to the market', kind: 'place', cost: 0.5, if: '@market' },
    keystone: { title: 'Keystone Alarm', where: 'Monitoring center · by phone', kind: 'phone', cost: 0.5, if: 'keystone_name', once: true, onceNote: 'Log requested' },
    bank: { title: 'Northshore Savings', where: 'Lorraine Tate, branch manager · by phone', kind: 'phone', cost: 0.5, if: 'danny_story', once: true, onceNote: 'Called' },
    camera: { title: 'Night drop camera', where: 'Northshore Savings, Dunmore branch', kind: 'records', cost: 1.5, if: 'camera_offer', once: true, onceNote: 'Watched' },
    tasha: { title: 'Tasha Greene', where: 'At home · Ferris St', kind: 'person', cost: 1, again: 0.5, if: 'danny_story' },
    martin: { title: 'Martin Kowalczyk', where: 'Lakeview Towers, apt. 9C', kind: 'person', cost: 1, again: 0.5, if: 'combo_three' },
    landlord: { title: 'Linden Court Apartments', where: 'Danny’s building · off Ferris St', kind: 'place', cost: 1, again: 0.5, if: 'danny_story' },
    casino: { title: 'Calder Downs', where: 'Security office · players club records', kind: 'records', cost: 1, if: 'martin_debts | valet_stub', once: true, onceNote: 'Checked' },
    warrant: { title: 'Search warrant', where: 'ADA Gus Pellegrino · by phone', kind: 'phone', cost: 0.5, if: 'alarm_log | camera | vince_car', until: 'search_cash', closed: 'Served' },
  },

  scenes: {
    market: {
      title: 'Kowalczyk’s Market',
      text: `The market smells of floor wax, onions and coffee from a pot behind the deli counter. It’s open. Irene Kowalczyk wouldn’t hear of closing, and a few regulars are pushing carts through the aisles as though nothing has happened.

Irene meets you at the door. She is small and very straight-backed, with reading glasses on a chain and a cardigan buttoned to the neck. “Thank you for coming on a Sunday,” she says, and she means it.

In the back, a young man in a green store apron is breaking down boxes and trying hard not to look your way. That’s Danny Ruiz, the assistant manager.`,
      again: `Irene looks up from the register as you come in. [if danny_lawyer]Danny isn’t in the back anymore. He went home to wait for his lawyer.[else]Danny is still in the back, restocking the same shelf.[/if]`,
      choices: [
        {
          label: 'Ask Irene what she found this morning',
          text: `“I came in at seven, like every Sunday. I turned off the alarm and opened the safe to get the drawers out for the registers. The float was there, the trays with the change, eight hundred dollars. The deposit bag was not.”

She presses her lips together. “Danny called me last night at 10:34. I have it on my phone. He said the night drop at the bank was jammed, so he came back and put the bag in the safe. I told him fine, good, go home.”

“The float wasn’t touched?” you ask.

“Not a dollar.”`,
          clues: ['float_untouched', 'danny_call'],
        },
        {
          label: 'Ask who knows the safe combination',
          text: `“Me, my son Martin, and Danny. I changed it in March and told nobody else.” She says Martin’s name carefully. “Martin does the books on Mondays. He has no reason to be in that safe on a Saturday night.”`,
          clues: ['combo_three'],
        },
        {
          label: 'Ask how she handles the cash',
          text: `“Twenties in bands of five hundred. I write my initials on every band, IK, the way my father did. The bank teases me about it.” She almost smiles. “Tens and fives in hundreds. Danny counts the drawers at close, fills out the slip, and takes the bag to the night drop. He has done it a thousand times.”`,
          clues: ['bands'],
        },
        {
          label: 'Ask about the rest of her staff',
          if: 'combo_three',
          text: `“Tasha Greene closed with Danny. She’s a good girl, and she has a little boy.” Irene hesitates. “Last month she asked me for an advance, two thousand, for daycare. I said no. We don’t do that, we can’t start. I felt terrible.” She waves a hand. “Tasha doesn’t know the combination. She couldn’t open that safe if she tried.”`,
          clues: ['tasha_advance'],
        },
        {
          label: 'Ask Irene about Martin',
          if: 'combo_three',
          text: `Irene takes her glasses off and polishes them on her cardigan for longer than they need.

“Martin came in yesterday afternoon and asked me for three thousand dollars. I said no. I have said yes too many times.” She puts the glasses back on. “He bets. The games on his phone, and the cards at Calder Downs. But he’s my son, Detective. He’s not a thief.”`,
          clues: ['martin_debts'],
        },
        {
          label: 'Look over the office and the safe',
          cost: 0.5,
          text: `The office is a closet with ambitions: a desk, a filing cabinet, a calendar from a meat supplier, and in the corner a squat green safe with a brass dial. You check the back door, the office door, the safe’s hinges and the dial. There are no scratches, no pry marks, no drill holes. Whoever opened it knew the numbers.

The carbon of Saturday’s deposit slip is still on the desk, in Danny’s neat printing: $11,480, dated Saturday, *10:02 p.m.*

By the back door there’s an alarm keypad with a faded sticker: **KEYSTONE ALARM · 24-HOUR MONITORING**. Irene says each of them has their own code. “Mine is 1. Danny is 2, Martin is 3. Don’t ask me how it works, Danny does all that.”`,
          clues: ['no_force', 'deposit_slip', 'keystone_name'],
        },
        { label: 'Talk to Danny', if: '!danny_lawyer', go: 'danny' },
        {
          label: 'Tell Irene what the alarm log shows',
          if: 'alarm_log',
          text: `You show her the log. She reads it twice, then a third time with her finger under the line.

“Ten-oh-eight,” she says. “And then me. Nobody in between.” She sits down on the stool behind the register. “Then he never came back. Then the bag was never in my safe.”

For a while she doesn’t say anything. A customer waits with a carton of eggs, and Danny keeps his eyes on the shelf.`,
        },
      ],
    },

    danny: {
      title: 'Danny Ruiz',
      text: `Danny Ruiz is thirty-one and looks as if he hasn’t slept. He wipes his hands on his apron before he shakes yours, and his are cold.

“Whatever you need,” he says. “I’ll do whatever. Mrs. K has been good to me. This is — I feel sick about it.”`,
      again: `Danny straightens up from the boxes. “Detective.” He tries a smile, and it doesn’t come off.`,
      choices: [
        {
          label: 'Ask him to walk you through Saturday night',
          text: `“We closed at ten. I counted the drawers, did the slip, and Tasha and I walked out together. I set the alarm around ten after.”

“Then?”

“I drove to the Northshore drop, three blocks up. The door wouldn’t open. It was stuck, or frozen, I don’t know. I wasn’t going to drive around with eleven grand in my car, so I came back, maybe 10:25. Let myself in the back, put the bag in the safe, spun the dial, set the alarm, and called Mrs. K so she’d know. Then I went home.” He swallows. “Linden Court, off Ferris. I was in bed by eleven.”`,
          clues: ['danny_story'],
        },
        {
          label: 'Ask about the jammed night drop',
          if: 'danny_story',
          text: `“It just wouldn’t pull. You grab the handle and the hopper comes down. It didn’t come down.” He mimes it. “Maybe it was the cold. Maybe somebody had jammed something in it. I didn’t stand there and investigate, I had a bag full of cash.”`,
        },
        {
          label: 'Tell him the night drop worked fine',
          if: 'danny_story & (vince_drop | drop_ok | camera)',
          text: `He blinks. “Then — I don’t know. Maybe I didn’t pull hard enough. I was tired.” He picks up a box cutter, puts it down again. “I’m telling you, it wouldn’t open.”`,
        },
        {
          label: 'Ask about the rent he paid this morning',
          if: 'rent_paid & !danny_lawyer',
          text: `The color goes out of his face.

“I’ve been saving,” he says. “Cash, at home. I don’t trust banks.”

[if rent_band]“In Mrs. Kowalczyk’s bands?” you ask. “With her initials on them?”

He doesn’t answer that.[else]“Three months of it, the morning after eleven thousand dollars disappears?”

“Coincidence,” he says. He doesn’t sound like he believes it either.[/if]`,
        },
        {
          label: 'Show him the alarm log',
          if: 'alarm_log',
          text: `He reads it. You watch him look for a way out and not find one.

“Maybe I didn’t set it again when I left. The second time.”

“It shows you setting it at 10:08. If you’d come back at 10:25, you’d have had to turn it off to get in. There’s nothing.”

“Then I came in without — maybe it didn’t — ” He stops, and looks toward the front of the store, where Irene is. “I think I want to talk to a lawyer.”`,
          clues: ['danny_lawyer'],
          go: 'board',
        },
        { label: 'Go back to Irene', go: 'market' },
      ],
    },

    amato: {
      title: 'Amato’s Pizza',
      text: `Next door, Vince Amato is stretching dough for the Sunday lunch crowd, forearms white with flour to the elbow. The radio’s playing a ballgame from somewhere with better weather.

“Irene’s thing? Terrible. Terrible.” He points at you with a fist of dough. “Ask me anything. I see everything on this block, that’s my curse.”`,
      again: `Vince waves a pizza peel at you. “Back already? Sit, I’ll feed you.”`,
      choices: [
        {
          label: 'Ask if he uses the Northshore night drop',
          text: `“Every night for twenty-two years. Same bag, same drop.” He slaps the dough down. “Saturday I dropped mine, what, twenty to eleven. 10:40. Opened like always. That drop has jammed once in my life, in the ice storm of ’09.”`,
          clues: ['vince_drop'],
        },
        {
          label: 'Ask if he saw anything Saturday night',
          text: `“I’m wiping down, putting up chairs, quarter after ten to maybe 10:35. Danny’s car is out there in Irene’s lot the whole time, the blue Honda with the dent. Motor running. I figure he’s on the phone with a girl.” He shrugs. “Then he pulls out and goes south. Toward Ferris, where he lives.”

“Not north, to the bank?”

“South,” Vince says. “I watched him go.”`,
          clues: ['vince_car'],
        },
        {
          label: 'Ask about the Kowalczyks',
          text: `“Irene carried half this street through the recession. Put things on account, never asked.” He lowers his voice. “Martin, the son, owes money to people you don’t want to owe money to. Everybody knows. And Danny.” He tips his hand side to side. “Good kid. But the last few months, he’s tight. Brings his lunch. Asked me once if I needed a guy for deliveries, nights.”`,
        },
      ],
    },

    keystone: {
      title: 'Keystone Alarm',
      text: `The Keystone monitoring center answers on the second ring. The dispatcher, a patient man named Carl, confirms that 2210 Dunmore is one of theirs and that the panel reports every arm, disarm and alarm to his screen.

“I can’t read it out over the phone,” he says, “but I can have the event log for the whole weekend in your email. Give it a couple of hours. Sundays we’re thin.”

You give him your address and thank him.`,
      timer: {
        in: 2,
        title: 'Keystone Alarm',
        text: `Carl from Keystone has emailed the event log for 2210 Dunmore:

> SAT 22:08:14  ARMED AWAY    USER 2 (RUIZ D)
> SUN 06:58:40  DISARMED      USER 1 (KOWALCZYK I)

That’s all of it. No one turned the alarm off between 10:08 Saturday night and 6:58 Sunday morning, and nothing set it off.`,
        clues: ['alarm_log'],
      },
      choices: [],
    },

    bank: {
      title: 'Northshore Savings',
      text: `Lorraine Tate, manager of the Dunmore branch, takes your call from her kitchen. Children are fighting over a waffle in the background.

She logs in to something while you wait. “The night drop reports a fault if the hopper sticks. There’s nothing. Not this weekend, not this month. It was serviced in August.” A pause. “And for the record, nobody called us about it. Mr. Ruiz has our after-hours number.”`,
      clues: ['drop_ok'],
      choices: [
        {
          label: 'Ask whether the night drop has a camera',
          text: `“The ATM camera covers it. I can pull the footage, but not from here. I’d have to go in.” She sighs, not unkindly. “Meet me at the branch and I’ll sit you down in front of it.”`,
          set: ['camera_offer'],
        },
      ],
    },

    camera: {
      title: 'The night drop camera',
      text: `The branch is dark and cold, and Lorraine Tate has brought her youngest, who colors at a teller window while you watch the footage in the back office.

The ATM camera looks out at the sidewalk and the brass night drop set into the wall. You run Saturday from ten o’clock at four times speed. Cars pass. A man walks a dog. At 10:41 Vince Amato, unmistakable in his apron, pulls the drop handle, feeds in a bag and walks away. The whole thing takes six seconds.

Nobody else comes near the drop before midnight. There’s no blue Honda, and no one with a blue bag.`,
      clues: ['camera'],
      choices: [
        {
          label: 'Keep watching through the night',
          cost: 0.5,
          text: `You watch the rest at eight times speed: a street sweeper at 1:10, a raccoon at 3:22, the paper delivery at 5:45. Nothing else. Lorraine’s youngest has drawn you a picture of a police car.`,
        },
      ],
    },

    tasha: {
      title: 'Tasha Greene',
      text: `Tasha Greene lives on the second floor of a two-flat on Ferris, with a baby gate across the kitchen door and a toddler asleep on the couch under a pile of coats. She talks quietly so as not to wake him.

“Mrs. K called me this morning. I couldn’t believe it.” She glances at the sleeping boy. “Do I need a lawyer? I don’t have a lawyer.”

You tell her she’s not in trouble, and you watch her decide to believe you.`,
      again: `Tasha opens the door with the toddler on her hip. “Did you find it?”`,
      choices: [
        {
          label: 'Ask about closing up Saturday',
          text: `“We locked the front at ten. Danny counted the drawers in the office and did the bag. We went out the back together. He set the alarm, I waited, he walks me to my bus stop usually, but it was right there, so.”

“Where was the deposit bag?”

“In his hand. He put it on the front seat of his car, the passenger side, and said he was going straight to the bank. I said good night and got on my bus.” She frowns. “He was acting weird. Quiet. I thought he was just tired.”`,
          clues: ['tasha_bag'],
        },
        {
          label: 'Ask how Danny’s been lately',
          text: `She takes a while.

“He’s been stressed. Money stuff. Like two weeks ago he asked me did I know anybody who could lend him money, fast, no bank. I said like a loan shark? And he laughed it off.” She looks at you. “He’s not a bad person. He covered my shift when my son had the croup. He’s not a bad person.”`,
          clues: ['danny_money'],
        },
        {
          label: 'Ask about Martin',
          text: `“Martin came in Saturday, like three-thirty, and him and Mrs. K were in the office with the door shut. You could hear it anyway. He needed three thousand. She said no, she said *no more, Martin*.” Tasha makes a face. “He bets. He goes to Calder Downs, everybody knows. He left real mad.”`,
          clues: ['martin_debts'],
        },
        {
          label: 'Ask about the advance she asked Irene for',
          if: 'tasha_advance',
          text: `Tasha’s face goes hot. “She told you that?”

“She said she felt bad about it.”

“It was for daycare. My sister ended up covering it, so.” She lifts her chin. “I didn’t take anything, Detective. I don’t even know the combination. I don’t want to know it.”`,
        },
      ],
    },

    martin: {
      title: 'Martin Kowalczyk',
      text: `Martin Kowalczyk lives on the ninth floor of Lakeview Towers, in an apartment with a very large television and not much else. He answers the door in a Calder Blue Herons sweatshirt and looks past you into the hall, as if expecting someone else.

“My mother called me,” he says. “You think I took it.” He doesn’t invite you in, but he doesn’t stop you either.`,
      again: `Martin lets you in without a word and goes back to the couch.`,
      choices: [
        {
          label: 'Ask where he was Saturday night',
          text: `“Here. All night. Watched the game, had a couple beers, went to bed around midnight.” He gestures at the television as if it could vouch for him. “Alone, before you ask.”`,
          clues: ['martin_claim'],
        },
        {
          label: 'Look around while he talks',
          text: `While he talks you let your eyes wander: takeout containers, a stack of unopened mail with FINAL NOTICE showing through one window, a gym bag. On the kitchen counter, next to his keys, there’s a pink ticket stub: **CALDER DOWNS · VALET · SAT 9:04 PM**.`,
          clues: ['valet_stub'],
        },
        {
          label: 'Ask about the money he asked his mother for',
          if: 'martin_debts',
          text: `“It’s a loan. I pay her back. I always pay her back, eventually.” His jaw works. “She told you that? Of course she did.”`,
        },
        {
          label: 'Ask about Calder Downs',
          if: 'valet_stub | martin_casino',
          text: `He looks at the counter, then at you, and sags.

“Fine. I was at the Downs. From nine till almost three. Don’t tell my mother, she thinks I stopped.” He laughs without any fun in it. “I lost six-forty playing ten-dollar blackjack, Detective. If I had eleven grand in a bag, do you think I’d be playing ten-dollar blackjack?”`,
          clues: ['martin_casino'],
        },
      ],
    },

    casino: {
      title: 'Calder Downs',
      text: `The security office at Calder Downs is a windowless room full of monitors, and it’s the only quiet place in the building. The shift supervisor pulls up the players club records without needing to be asked twice. Cops are good for business.

> PLAYERS CLUB · KOWALCZYK, MARTIN · SAT–SUN
> 21:12  Card in · Table games, BJ-14 ($10 min)
> 23:50  Card moved · BJ-09 ($10 min)
> 02:48  Card out · Net: –$640

“And he was at the table the whole time,” the supervisor adds, tapping a monitor. “Cameras on every table. He’s not going anywhere, believe me. Guy doesn’t even get up to use the bathroom.”`,
      clues: ['martin_casino'],
      choices: [],
    },

    landlord: {
      title: 'Linden Court Apartments',
      text: `Linden Court is three stories of tan brick with a sagging awning. The landlord, Gil Brody, lives in the ground-floor unit and comes to the door in slippers, holding a crossword.

“Ruiz? Second floor, 2B.” He peers at your badge. “What’d he do?”`,
      again: `Gil Brody opens the door before you knock. “You again.”`,
      choices: [
        {
          label: 'Ask about Danny Ruiz',
          text: `“Nice fella. Quiet. Behind on the rent since summer, three months. I don’t like to do it, but I filed. Hearing was Tuesday.” He shrugs. “Was. He knocked on my door this morning, twenty to eight, and paid the whole thing. Thirty-one fifty, cash.”`,
          clues: ['rent_paid'],
        },
        {
          label: 'Ask what the money looked like',
          if: 'rent_paid',
          text: `“Twenties. Some of them still wrapped up in those paper bands, like from a bank.” He shuffles to a kitchen drawer, rummages, and comes back with a strip of brown paper. “Kept one to write the grocery list on. Waste not.”

Across the band, in blue ballpoint, someone has written **$500 — IK**.`,
          clues: ['rent_band'],
        },
        {
          label: 'Ask when Danny got home Saturday',
          text: `“Late-ish. Quarter to eleven? I heard the car. That Honda’s got a belt that screams.” He taps the crossword with his pen. “Didn’t go out again. I’d have heard that too.”`,
        },
      ],
    },

    warrant: {
      title: 'ADA Gus Pellegrino',
      text: `Assistant District Attorney Gus Pellegrino takes your call from the bleachers at his daughter’s hockey game. You can hear the puck against the boards.

“A search warrant for the assistant manager’s apartment and car. Sure. Tell me why a judge signs it on a Sunday.”`,
      again: `Gus Pellegrino picks up. “You again. Tell me you’ve got more.”`,
      choices: [
        {
          id: 'pc-yes',
          label: 'Walk him through what you have',
          if: '(alarm_log | camera | vince_car) & (rent_paid | tasha_bag)',
          text: `You give it to him in order: the bag leaving in Danny’s car, the story about coming back that the record doesn’t support, [if rent_paid]the three months of back rent paid in cash the next morning[else]Tasha watching him put the bag on his front seat[/if].

“Yeah,” Gus says, over a roar from the crowd. “Yeah, that’s enough. I’ll call Judge Amundsen. Have it in an hour.”`,
          go: 'search',
        },
        {
          id: 'pc-no',
          label: 'Walk him through what you have',
          if: '!((alarm_log | camera | vince_car) & (rent_paid | tasha_bag))',
          text: `He listens to the end. “So his story has a hole in it. Okay. People lie to cops about all kinds of things. What puts the *money* with him? I need something that says the cash left in his hands, or turned up in them. Get me that and call me back.”`,
        },
      ],
    },

    search: {
      title: 'Search warrant',
      text: `The warrant comes through a little after the hour. Danny opens the door of 2B before you knock, as though he’s been standing behind it.`,
      choices: [
        {
          label: 'Search the apartment and the car',
          cost: 1,
          text: `It doesn’t take long. In the bedroom closet, behind the winter boots, there’s a shoebox: $7,390 in twenties and tens, most of it still in paper bands with IK written on them in blue ballpoint.

The blue vinyl deposit bag is in the trunk of the Honda, under the spare tire. The $540 in checks are still inside, where he couldn’t spend them.

Danny sits at his kitchen table the whole time and doesn’t say anything. When you’re finished, he asks if he can call Mrs. Kowalczyk, and you tell him no, not today.`,
          clues: ['search_cash'],
          go: 'board',
        },
      ],
    },
  },

  events: [
    {
      at: 5,
      if: '!danny_lawyer & !search_cash',
      title: 'A call from Irene',
      text: `Irene Kowalczyk calls your cell. “Danny asked to go home early. He said he feels sick.” A pause. “I let him go. Was that wrong?”`,
    },
  ],

  report: [
    {
      id: 'who',
      q: 'Who took the deposit?',
      options: {
        danny: 'Danny Ruiz, the assistant manager',
        martin: 'Martin Kowalczyk, Irene’s son',
        tasha: 'Tasha Greene, the cashier',
        irene: 'Irene Kowalczyk herself',
        stranger: 'Someone from outside who knew the combination',
      },
      answer: 'danny',
      points: 40,
      why: 'Danny was the last person with the bag, and the only one whose account of it is contradicted by the record.',
    },
    {
      id: 'where',
      q: 'Where was the deposit bag when the store closed on Saturday night?',
      options: {
        car: 'On the front seat of Danny’s car',
        safe: 'In the office safe',
        drop: 'In the bank’s night drop',
        register: 'Still in the office, on the desk',
      },
      answer: 'car',
      points: 20,
      why: 'Tasha watched Danny put it on his passenger seat at 10:08. It never went into the drop (the camera) or back into the store (the alarm log).',
    },
    {
      id: 'proof',
      q: 'What shows Danny never put the bag in the safe?',
      options: {
        alarm: 'The alarm was never turned off between 10:08 p.m. and Irene’s arrival',
        float: 'The thief left the $800 float behind',
        force: 'The safe had been forced',
        tasha: 'Tasha says she saw him do it',
      },
      answer: 'alarm',
      points: 20,
      why: 'To come back in at 10:25 as he says, Danny would have had to disarm the alarm, and Keystone’s log shows no disarm until Irene’s code at 6:58 a.m. The untouched float is suggestive, but it isn’t proof.',
    },
    {
      id: 'why',
      q: 'Why did he do it?',
      options: {
        rent: 'He was about to be evicted for back rent',
        gambling: 'Gambling debts',
        grudge: 'A grudge against Irene',
        tasha: 'To help Tasha with daycare',
      },
      answer: 'rent',
      points: 20,
      why: 'Danny was three months behind on rent with an eviction hearing on Tuesday. He paid it all off in Irene’s banded twenties at 7:40 the next morning.',
    },
  ],

  outcomes: {
    danny: `Danny Ruiz was charged with theft on Monday morning. He pleaded guilty three weeks later, and at Irene’s request the prosecutor asked for restitution and probation rather than jail. She didn’t take him back at the store. But when his hearing came around, she was sitting in the second row.`,
    martin: `You charged Martin Kowalczyk. His lawyer had the Calder Downs records by Tuesday: his card was in play at a blackjack table from 9:12 p.m. until 2:48 a.m., on camera the whole time. The charge was dropped, and Martin hasn’t spoken to his mother since. Danny Ruiz handed in his notice the following week and left town.`,
    tasha: `You charged Tasha Greene, who didn’t know the combination and never went near the safe. The case fell apart at the first hearing. By then Danny Ruiz had quit and moved away, and Irene’s money went with him.`,
    irene: `You named Irene Kowalczyk, suggesting she had emptied her own safe for the insurance. Lieutenant Okafor read the report twice, then handed it back without a word. There was no insurance claim to speak of, and nothing tied Irene to anything but her own safe.`,
    default: `Your report named someone outside the store. Lieutenant Okafor pointed out that the alarm log shows nobody at all entered the building overnight, and sent you back to your desk. By Monday Danny Ruiz had called in sick, and then he stopped answering his phone.`,
  },

  solution: {
    text: `Danny Ruiz was three months behind on his rent, and an eviction hearing was set for Tuesday. He had asked around about a loan and found none.

On Saturday night he counted the drawers, filled out the deposit slip at 10:02, set the alarm at 10:08 and walked out with Tasha, carrying the bag. Tasha saw him put it on his front seat. He never drove to the bank. For twenty minutes he sat in the lot with the engine running, which is where Vince Amato saw him, working up his nerve. At 10:34 he called Irene with a story: the drop was jammed, and he had put the bag in the safe instead. Then he drove home, south, away from the bank.

The story would only hold up if nobody checked. The night drop worked all weekend (Vince used it at 10:40, and the camera saw nobody from Kowalczyk’s). And to put the bag back in the safe at 10:25, Danny would have had to disarm the alarm. Keystone’s log shows no disarm between his code at 10:08 p.m. and Irene’s at 6:58 a.m.

At 7:40 on Sunday morning he paid his landlord $3,150 in twenties, some of them still in bands marked IK in Irene’s handwriting.

Martin lied about where he was because he was at Calder Downs, where his mother thought he had stopped going. The untouched float was a small clue: a thief in the safe would have taken it, but the bag had never been there.`,
    chain: ['danny_story', 'tasha_bag', 'alarm_log', 'vince_drop', 'rent_paid', 'rent_band', 'bands'],
    walk: [
      '@market', 'Ask Irene what she found', 'Ask how she handles', 'Look over the office', 'Talk to Danny', 'Ask him to walk',
      '@keystone',
      '@tasha', 'Ask about closing up',
      '@landlord', 'Ask about Danny', 'Ask what the money',
      '@amato', 'Ask if he uses',
    ],
  },
};
