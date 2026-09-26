// Case 6. The last case in the book, and the only murder: a drowning that everyone reads as an accident.
// The water in the lungs, a phone that kept counting, and a hot tub drained a few hours too late.

export default {
  id: 'low-water',
  n: 6,
  title: 'Low Water',
  crime: 'Homicide',
  difficulty: 3,
  summary: 'A charter captain with a blood alcohol of .14 is found face down beside his own boat. Everyone on the dock says he fell in. The lieutenant wants to be sure.',
  days: ['Thursday', 'Friday', 'Saturday'],
  start: { day: 1, hour: 8 },
  hours: 18,

  briefing: `Lieutenant Ruth Okafor is at the window when you come in, looking at nothing. She hands you a folder with one sheet in it.

“Ben Tolliver. Fifty-two. Ran a charter boat out of Calder Marina, salmon and lake trout. Thirty years on the same dock.”

> INCIDENT 26-12207 · DEATH INVESTIGATION · CALDER MARINA, B DOCK
> Reported 6:44 a.m. Friday by Gordon Nilsen, dockmaster.
> Adult male face down in the water between the vessel SECOND WIND
> (slip B-14) and the dock. Found by a dockhand at approx. 6:40 a.m.
> Red and black flannel shirt, canvas jacket. Laceration, left side
> of the head. Blood alcohol 0.14. Pronounced at the scene.

“Everyone on that dock will tell you he drank at the Anchor, slept on his boat half the week and fell off it about once a summer. The first read is that he did it again, hit his head going in and drowned.” She taps the sheet. “The first read may be right. Dr. Achebe has him this morning. His phone was in his jacket; it’s at the lab, drying out. His wife is Lorna Tolliver. They’re separated. She’s been told.”

She picks up her coffee. “A man is dead, {det}, and the people who liked him best are going to want it to be nobody’s fault. If it’s an accident, I want to be sure it’s an accident. Report on my desk by two tomorrow afternoon. Bring me the chain, not a hunch.”`,

  people: {
    ben: { name: 'Ben Tolliver', role: 'The victim', about: '52. Owner of Tolliver Charters, sport fishing out of Calder Marina. Five foot eight, loud, generous and a drinker. His boat is the Second Wind.' },
    lorna: { name: 'Lorna Tolliver', role: 'Ben’s wife, separated', about: '49. A surgical nurse at Mercy General. Filed for divorce in June. Lives in Lakeview.' },
    gordy: { name: 'Gordy Nilsen', role: 'Dockmaster, Calder Marina', about: 'Has run the marina for twenty-two years. Called it in.', if: '@marina' },
    dex: { name: 'Dex Moreau', role: 'Ben’s deckhand', about: '38. Has crewed on the Second Wind for nine seasons and wanted to buy into the business.', if: 'dex_named | anchor_fight' },
    kayla: { name: 'Kayla Burns', role: 'Dex’s girlfriend', about: 'A nursing-home aide. Rents the downstairs of a two-flat on Carver Avenue.', if: '@kayla' },
    lyle: { name: 'Lyle Pruitt', role: 'Kayla’s neighbor', about: 'Works the evening shift at the grain elevators. Writes a lot of notes.', if: 'neighbor_truck' },
    norma: { name: 'Norma Grady', role: 'Bartender, the Anchor', about: 'Has tended bar across Harbor Road from the marina for thirty-one years.', if: '@anchor' },
    hollis: { name: 'Hollis Crane', role: 'Captain of the Margaret C.', about: '60. Runs a rival charter from C dock and lives aboard. Ben reported him to the DNR in June.', if: 'hollis_feud | dex_story' },
    ian: { name: 'Ian Whitlock', role: 'Whitlock Wealth Partners', about: '44. A one-man investment firm, run from his house on Cliff Road in Bluffside. Managed Ben’s savings.', if: 'ian_name' },
    pat: { name: 'Pat Olander', role: 'Ian Whitlock’s neighbor', about: 'Retired. Walks a fifteen-year-old basset hound at one in the morning.', if: '@pat' },
    dolores: { name: 'Dolores Fenwick', role: 'Lives across from Ian', about: '81. Watches the ten o’clock news with the window open.', if: 'voices_ten' },
    mae: { name: 'Mae Kinsella', role: 'Owner, Kinsella’s Hardware', about: 'Sells nails by the pound on Bluff Avenue.', if: '@hardware' },
    carla: { name: 'Carla Espinoza', role: 'Examiner, state Securities Division', about: 'Took a call from Ben on Tuesday.', if: '@securities' },
  },

  clues: {
    gate_card: { title: 'Ben’s gate card at 3:04 a.m.', text: 'The marina’s vehicle gate logged Ben’s card at 3:04 a.m. Friday. In two years of the log he never once used the card; he always punched his code. He kept the card clipped to his truck’s sun visor.', who: ['ben', 'gordy'], at: 'Fri 3:04' },
    dock_cart: { title: 'A dock cart left out', text: 'Someone left a dock cart at the far end of B dock, past Ben’s slip, instead of in the rack. Gordy saw it at 6:15 a.m. and sent the dockhand to fetch it. That is how Ben was found.', who: ['gordy'], at: 'Fri 6:15' },
    hollis_feud: { title: 'Hollis Crane’s feud', text: 'Hollis Crane, a rival charter captain who lives aboard on C dock, fought Ben over slips for ten years. In June Ben reported him to the DNR for over-limit catches. Hollis was fined and lost his charter license for thirty days in August.', who: ['hollis', 'ben'] },
    no_hat: { title: 'Ben never wore a hat', text: 'Everyone who knew Ben says the same thing: he never wore a hat, in any weather. He said they gave him headaches.', who: ['ben'] },
    bunk_unslept: { title: 'Nobody slept aboard', text: 'The Second Wind’s cabin was locked, and Ben’s keys were in his truck. His bunk hadn’t been slept in; the sleeping bag was still rolled and tied.', who: ['ben'] },
    complaint_draft: { title: 'A draft complaint', text: 'On Ben’s laptop: an unfinished complaint to the state Securities Division against Ian Whitlock. Ben writes that his statements show $371,812 at a custodian that says it has no account for him, and that Ian’s license lapsed two years ago. Last saved Wednesday.', who: ['ben', 'ian'] },
    ben_email: { title: 'Ben’s ultimatum to Ian', text: 'Wednesday evening Ben emailed Ian: unless Ian could show him his money was real, he would file with the Securities Division on Monday. Ian wrote back at 10:12 p.m.: “Come up to the house Thursday night and we’ll go through it line by line.”', who: ['ben', 'ian'] },
    statements: { title: 'Ben’s statements', text: 'Quarterly statements from Whitlock Wealth Partners show Ben’s $340,000 grown to $371,812, held at Meridian Clearing Corp., account ending 4471. On the newest one Ben has written: “NO SUCH ACCT.”', who: ['ben', 'ian'] },
    seat_back: { title: 'Set for a taller driver', text: 'The driver’s seat in Ben’s pickup is in its last notch, and the mirrors are tilted up. The seat rails are worn shiny at the front notches, where five-foot-eight Ben kept it for years. The last notch has a fresh scrape.', who: ['ben'] },
    tailgate_blood: { title: 'Blood on the tailgate', text: 'The smear on the tailgate is human blood, type O positive like Ben’s, wiped rather than dripped. The tarp in the truck bed has the same blood on its underside, and it was wet with water that held bromine.', who: ['ben'] },
    lividity: { title: 'Lividity on his back', text: 'Ben’s blood had settled and fixed along his back and the backs of his legs. He was found face down, so he lay on his back for hours after he died before he went into the water.', who: ['ben'] },
    wound_square: { title: 'A square-edged wound', text: 'The head wound was made by a heavy object with a straight edge and a square corner, about 4 cm along the edge. The dock edge is a rounded timber with a rubber bumper and could not have made it.', who: ['ben'] },
    shoulder_bruises: { title: 'Bruises on his shoulders', text: 'Fingertip bruises on the backs of both of Ben’s shoulders, made around the time he died. Dr. Achebe: someone held him under.', who: ['ben'] },
    lung_water: { title: 'Not lake water', text: 'The water in Ben’s lungs had none of the diatoms that lake water is full of, and it held bromine, the sanitizer used in hot tubs. Swimming pools and city water use chlorine.', who: ['ben'] },
    tod: { title: 'Time of death', text: 'Dr. Achebe puts the time of death between about 10 p.m. and midnight Thursday.', who: ['ben'], at: 'Thu 22:00' },
    phone_location: { title: 'Where Ben’s phone was', text: 'Ben’s phone was at 31 Cliff Road in Bluffside, Ian Whitlock’s house, from 9:31 p.m. Thursday until 2:47 a.m. Friday. Then it moved at driving speed to Calder Marina, arriving by 3:02.', who: ['ben', 'ian'], at: 'Thu 21:31' },
    steps_stop: { title: 'His steps stop at 10:21', text: 'Ben’s phone counted his steps until 10:21 p.m. Thursday and never counted another. Being carried or driven doesn’t register as walking.', who: ['ben'], at: 'Thu 22:21' },
    filter_hair: { title: 'Ben in the filter', text: 'Dr. Rao: the gray hairs in Ian’s hot tub filter are consistent with Ben’s in every way she can measure, and the red and black fibers match his flannel shirt in dye, weave and twist. DNA will take weeks.', who: ['ben', 'ian'] },
    lantern_match: { title: 'The lantern base fits', text: 'The corner of the surviving lantern’s bronze base fits Ben’s head wound: the straight edge, the right angle, 4.1 cm. That lantern is clean. Whatever hit Ben was one exactly like it.', who: ['ben', 'ian'] },
    lorna_alibi: { title: 'Lorna’s evening', text: 'Lorna was at her book club in Lakeview until about 10:30 p.m. Thursday, then home alone. Nobody can vouch for her after that.', who: ['lorna'], at: 'Thu 22:30' },
    lorna_pool: { title: 'Lorna’s pool is chlorinated', text: 'Lorna has a swimming pool behind her house. It’s treated with chlorine: tablets in a floater, and the pool service’s tag on the gate from Thursday.', who: ['lorna'] },
    ian_name: { title: 'Ian Whitlock', text: 'Ian Whitlock of Whitlock Wealth Partners, a one-man firm in Bluffside, managed Ben’s savings: $340,000 from the sale of his late father’s house.', who: ['ian', 'ben'] },
    ben_scared: { title: 'Ben was scared about money', text: 'All summer Ben called Lorna worried that his numbers didn’t look right and that money he asked for wasn’t coming. Ian kept telling him it was fine.', who: ['lorna', 'ben', 'ian'] },
    policy: { title: 'Half a million in life insurance', text: 'Ben had a $500,000 life policy with Tamsin Mutual. Lorna is still the beneficiary; the divorce isn’t final. She called the insurer at 9:20 Friday morning.', who: ['lorna', 'ben'], at: 'Fri 9:20' },
    ian_has_tub: { title: 'Ian has a hot tub', text: 'Ian Whitlock has a hot tub on his patio overlooking the lake. At a dinner there years ago Ben refused to get in. He called hot tubs “soup.”', who: ['ian', 'lorna'] },
    voicemail: { title: 'Ben’s last voicemail', text: 'At 9:22 p.m. Thursday Ben left Lorna a voicemail: he was going up to Ian’s “to have it out with him,” and he was sorry about the money.', who: ['ben', 'lorna', 'ian'], at: 'Thu 21:22' },
    anchor_fight: { title: 'The argument at the Anchor', text: 'Around 8 p.m. Thursday Ben and Dex argued at the Anchor about Dex buying into the business. Dex said, “You’ll be sorry,” loud enough for the room. He left with Kayla Burns at 9.', who: ['ben', 'dex', 'norma'], at: 'Thu 20:00' },
    ben_left: { title: 'Ben left at 9:15', text: 'Ben left the Anchor at about 9:15 p.m., drunk, and drove himself. He told Norma he was going “up the hill to look my money man in the eye.”', who: ['ben', 'norma'], at: 'Thu 21:15' },
    dex_story: { title: 'Dex’s side of it', text: 'Dex offered his $45,000 in savings for a third of Tolliver Charters, and Ben said no. “You’ll be sorry” meant Dex would take Hollis Crane’s offer to run his second boat.', who: ['dex', 'ben', 'hollis'] },
    dex_alibi: { title: 'Dex says he was at Kayla’s', text: 'Dex says he left the Anchor with Kayla Burns at 9 and spent the night on her couch on Carver Avenue.', who: ['dex', 'kayla'] },
    money_guy: { title: 'Ben’s “money guy”', text: 'Since August Ben had told Dex his retirement money was “in trouble” and his money guy was dragging his feet. Thursday night he said he was going to see him.', who: ['dex', 'ben'] },
    neighbor_truck: { title: 'Dex’s truck never moved', text: 'At 11:40 p.m. Thursday Lyle Pruitt put a note under the wiper of Dex’s truck, which was blocking his driveway on Carver Avenue. At 6 a.m. the note was still there, soaked with dew.', who: ['lyle', 'dex'], at: 'Thu 23:40' },
    hollis_saw: { title: 'What Hollis saw', text: 'At about 3:10 a.m. Friday Hollis saw Ben’s pickup come in, then a man he took for Ben push a dock cart down B dock with something heavy under a tarp. He assumed Ben was drunk again and went back to bed.', who: ['hollis'], at: 'Fri 3:10' },
    hollis_cap: { title: 'The man wore a ball cap', text: 'The man with the cart wore a ball cap and was tall, over six feet, Hollis thinks. Ben was five foot eight.', who: ['hollis'] },
    ian_story: { title: 'Ian’s account', text: 'Ian says Ben turned up around 9:30 Thursday, drunk and upset about a soft year in the market. They talked on the patio, Ben calmed down, and he drove himself away at about 10:15.', who: ['ian'], at: 'Thu 22:15' },
    hottub_drained: { title: 'The hot tub is drained', text: 'Ian drained his hot tub early Friday morning. He says the heater has been tripping the breaker and a service man is coming Monday.', who: ['ian'] },
    ian_bromine: { title: 'Ian’s tub uses bromine', text: 'On the shelf by Ian’s hot tub: a tub of brominating tablets “for spas and hot tubs,” and a floating dispenser.', who: ['ian'] },
    new_lantern: { title: 'A new lantern', text: 'A pair of bronze lanterns stands at the top of Ian’s patio steps. One is weathered green. The other is new, with a Kinsella’s Hardware price sticker still on its base.', who: ['ian'] },
    ian_height: { title: 'Ian is tall', text: 'Ian Whitlock is about six foot two.', who: ['ian'] },
    ian_story2: { title: 'Ian’s second account', text: 'Confronted, Ian changed his story. Ben passed out on a lounger by the hot tub; Ian covered him with a blanket and went to bed; at six Ben and the truck were gone.', who: ['ian'] },
    ian_story3: { title: 'Ian’s third account', text: 'Ian now says Ben slipped getting into the hot tub, hit his head on the rim and drowned while Ian was inside. He says he panicked and at about 2:45 a.m. drove Ben’s body to the marina in Ben’s truck. Then he asked for a lawyer.', who: ['ian'] },
    pat_truck: { title: 'The pickup in Ian’s driveway', text: 'At 1:05 a.m. Friday Pat Olander saw a white pickup marked TOLLIVER CHARTERS in Ian Whitlock’s driveway, with Ian’s patio lights on. At 6 the truck was gone and water from Ian’s yard was running down the gutter.', who: ['pat', 'ian'], at: 'Fri 1:05' },
    voices_ten: { title: 'Voices on the patio', text: 'A little after 10 p.m. Thursday Dolores Fenwick heard two men shouting on Ian’s patio, one of them about “Monday.” Then a heavy metallic clang, and then quiet.', who: ['dolores', 'ian'], at: 'Thu 22:10' },
    license_lapsed: { title: 'Ian’s license lapsed', text: 'Ian Whitlock’s registration as an investment adviser lapsed two years ago and was never renewed. His firm has filed nothing about custody or audits since.', who: ['ian'] },
    no_account: { title: 'No account at Meridian', text: 'Meridian Clearing has no account ending 4471 and has never had an account in Ben’s name. Whitlock Wealth Partners’ own account there was closed two years ago.', who: ['ian', 'carla'] },
    lantern_receipt: { title: 'A lantern bought Friday', text: 'Kinsella’s Hardware sold Ian Whitlock one bronze post lantern at 7:14 a.m. Friday. He wanted the exact model, to match a pair.', who: ['ian', 'mae'], at: 'Fri 7:14' },
    path_walker: { title: 'A walker at 3:31 a.m.', text: 'The city camera at the Harbor Road underpass shows a tall man in a ball cap walking east on the lakefront path, away from the marina, at 3:31 a.m. Friday. The path leads to the Bluff Stairs, which come up at the end of Cliff Road.', at: 'Fri 3:31' },
    filter_seized: { title: 'The filter was never changed', text: 'Ian drained his hot tub but left the filter in. Caught in its pleats: short gray hairs and red and black fibers.', who: ['ian'] },
    twin_lantern: { title: 'One lantern of the pair is gone', text: 'Only one of Ian’s original pair of lanterns is left. Its base is a heavy square block of bronze with sharp corners. Its twin isn’t in the house, the garage, the bins or the car.', who: ['ian'] },
    fake_statements: { title: 'Statements made at home', text: 'On Ian’s computer: a Meridian Clearing statement template and years of made-up quarterly statements for Ben and eleven other clients. Nothing from any real custodian.', who: ['ian'] },
  },

  leads: {
    marina: { title: 'Calder Marina', where: 'B dock and the dockmaster’s office · The Harbor', kind: 'place', cost: 1, again: 0.5 },
    boat: { title: 'The Second Wind', where: 'Slip B-14 · Calder Marina', kind: 'place', cost: 1, again: 0.5, if: '@marina' },
    truck: { title: 'Ben’s pickup', where: 'Marina lot, by the bait shed', kind: 'place', cost: 0.75, again: 0.25, if: '@marina' },
    morgue: { title: 'Medical examiner', where: 'Dr. Samuel Achebe · County Building, Old Town', kind: 'place', cost: 1, again: 0.5 },
    lab: { title: 'Crime lab', where: 'Dr. Anjali Rao · Garland Street', kind: 'lab', cost: 0.5, again: 0.5 },
    theo: { title: 'Theo Marsh', where: 'Records · the basement, Garland Street', kind: 'records', cost: 0.5, again: 0.5 },
    lorna: { title: 'Lorna Tolliver', where: '40 Heron Court · Lakeview', kind: 'person', cost: 1.75, again: 0.75 },
    anchor: { title: 'The Anchor', where: 'Harbor Road, across from the marina gate', kind: 'place', cost: 1, again: 0.5, if: 'anchor_named' },
    dex: { title: 'Dex Moreau', where: 'Over Pike’s Bait & Tackle · Harbor Road', kind: 'person', cost: 1, again: 0.5, if: 'dex_named | anchor_fight' },
    kayla: { title: 'Kayla Burns', where: '1127 Carver Ave · Northgate', kind: 'person', cost: 1.25, again: 0.5, if: 'dex_alibi' },
    hollis: { title: 'Hollis Crane', where: 'Aboard the Margaret C. · C dock, Calder Marina', kind: 'person', cost: 1, again: 0.5, if: 'hollis_feud | dex_story', until: 'time >= 12', closed: 'Out on the lake' },
    ian: { title: 'Ian Whitlock', where: '31 Cliff Road · Bluffside', kind: 'person', cost: 1.5, again: 0.75, if: 'ian_name | phone_location', until: 'ian_lawyer', closed: 'Has a lawyer' },
    pat: { title: 'Cliff Road', where: 'Ian Whitlock’s neighbors · Bluffside', kind: 'place', cost: 1.25, again: 0.5, if: '@ian | phone_location' },
    securities: { title: 'State Securities Division', where: 'Enforcement section · by phone', kind: 'phone', cost: 0.5, if: 'complaint_draft | license_lapsed', once: true, onceNote: 'Called' },
    hardware: { title: 'Kinsella’s Hardware', where: '410 Bluff Ave · Bluffside', kind: 'place', cost: 1, if: 'new_lantern', once: true, onceNote: 'Visited' },
    path: { title: 'Underpass camera', where: 'Public Works · Harbor Road underpass', kind: 'records', cost: 2, if: 'underpass_cam', once: true, onceNote: 'Watched' },
    warrant: { title: 'Search warrant', where: 'ADA Gus Pellegrino · by phone', kind: 'phone', cost: 0.5, again: 0.25, if: 'lung_water & (ian_bromine | hottub_drained | ian_has_tub | phone_location | pat_truck)', until: 'search_done', closed: 'Served' },
  },

  scenes: {
    marina: {
      title: 'Calder Marina',
      text: `Calder Marina is three hundred slips behind a chain-link fence on Harbor Road, with the grain elevators standing over it like a row of giants. [if day = 1]This morning it’s[else]It’s still[/if] quiet the way a place is quiet after an ambulance. The tape at the foot of B dock is down, and someone has hosed the boards. Ben’s white pickup is nosed into its spot by the bait shed.

The dockmaster, Gordy Nilsen, meets you at the office door: a heavy, weathered man in a marina polo with a pen behind each ear. His eyes are red.

“I called it in,” he says. “Jonah found him. My dockhand, he’s nineteen. I sent him home.” He holds the door for you. “Thirty years Ben was on this dock. Thirty years.”`,
      again: `Gordy looks up from the office counter, where he’s been pretending to do the fuel invoices. “Anything you need, Detective.”`,
      choices: [
        {
          label: 'Ask Gordy about Ben',
          text: `“Ben Tolliver.” Gordy sits on the edge of the counter. “Best salmon captain on the lake and the worst tenant I’ve got. Late on his slip fees every October, paid every November with a bottle of Jameson on top.” He almost smiles. “Since Lorna put him out he sleeps on the boat half the week, after the Anchor across the road. [if day = 1]Last night[else]Thursday[/if] he was in there with Dex, his deckhand. I hear they had words.”

“Could he have fallen in?”

“Could have. Did once, two summers ago. Dex fished him out.” Gordy rubs his eyes. “You want to know who Ben was? A bald little man with a sunburn who never wore a hat in his life. Said they gave him headaches.”`,
          clues: ['no_hat'],
          set: ['anchor_named', 'dex_named'],
        },
        {
          label: 'Ask who had trouble with Ben',
          text: `Gordy looks out the window toward C dock, where a blue-hulled charter boat is tied up with a big gray man on the back deck, coiling line and not looking this way.

“Hollis Crane. The *Margaret C.* He lives aboard.” Gordy lowers his voice. “Him and Ben had a slip war going ten years. Then in June Ben called the DNR on him for keeping over-limit fish. Hollis got fined and lost his charter license for thirty days. In August, the middle of the season.” He shrugs. “Hollis said some things. Everybody on a dock says things.”`,
          clues: ['hollis_feud'],
        },
        {
          label: 'Pull the gate log',
          cost: 0.5,
          text: `The gate system runs on a computer older than Jonah. Gordy prints the vehicle gate’s log for Thursday and Friday, and then, because you ask, two years of entries for Ben.

> VEHICLE GATE · CALDER MARINA
> THU 14:48  CODE 0514  TOLLIVER B.
> THU 18:06  CODE 2291  CRANE H.
> FRI 03:04  CARD 0117  TOLLIVER B.
> FRI 05:52  CODE 1100  NILSEN G.

“That’s not right,” Gordy says, with his finger on 3:04. “Ben doesn’t use his card. He lost two, so I made him clip the new one to his sun visor, and he never touched it again. He punches the code. Oh-five-one-four, the day the *Second Wind* went in the water.” He runs his finger down the long printout: two years of 0514, and not one card. “Until three o’clock this morning.”`,
          clues: ['gate_card'],
        },
        {
          label: 'Walk out to where he was found',
          cost: 0.25,
          text: `B dock runs straight out into the harbor, forty slips long. The *Second Wind* is near the end, a 31-foot sportfisher with her name in blue script on the transom. Between her and the dock there are about three feet of green water.

The dock edge is a timber rubrail with a rubber bumper strip along it, rounded and soft.

Past the last slip, at the very end of the dock, a four-wheeled dock cart stands by itself. “That was out there when I turned the lights on at quarter past six,” Gordy says. “Carts go in the rack, or I fine you twenty bucks. I sent Jonah down to bring it back at twenty to seven.” He looks at the water. “That’s how he found Ben.”`,
          clues: ['dock_cart'],
        },
        {
          label: 'Ask how someone would leave without a car',
          if: 'gate_card | seat_back | hollis_saw',
          text: `Gordy thinks about it. “Walk out the pedestrian gate. It opens from the inside, no card. Puts you right on the lakefront path.” He points east along the shore. “That runs two and a half miles to the foot of the bluff. The Bluff Stairs come up in Bluffside.”

He snaps his fingers. “And the city put a camera on the path last spring, at the Harbor Road underpass, after all the bike thefts. Public Works has it. They’ll make you ask nicely.”`,
          set: ['underpass_cam'],
        },
      ],
    },

    boat: {
      title: 'The Second Wind',
      text: `Gordy lets you aboard the *Second Wind* with the marina’s spare key. The cabin was locked when the police came, he says, and Ben’s keys were in his truck.

It smells of diesel, coffee and old bait. Everything is shipshape in the way of a man who lives in a small space: rods racked overhead, charts rolled, a coffee can full of pens. A ball cap with the Tolliver Charters salmon on it hangs on the wheel with its price tag still on. On the chart table there’s a laptop with a sticker on the lid and a folder held shut with a rubber band.

Up in the bow, the bunk is made. The sleeping bag is rolled tight and tied, the way you’d pack it for the winter.`,
      again: `The *Second Wind* rocks a little as you step aboard. Nobody has touched anything since you were here.`,
      clues: ['bunk_unslept'],
      choices: [
        {
          label: 'Go through the laptop',
          cost: 0.5,
          text: `The laptop isn’t locked. On the desktop there’s a document called COMPLAINT, last saved Wednesday at 4:52 p.m.

> TO: State Securities Division, Enforcement
> RE: Ian Whitlock, Whitlock Wealth Partners, Bluffside
> Four years ago I gave Mr. Whitlock $340,000 from the sale of my
> father’s house. His statements say I have $371,812 at Meridian
> Clearing. I called Meridian and they have no account for me.
> The state website says his license ran out two years ago.
> I want my money back and I want him

It stops there. His email is open too.

> WED 18:40 · TO: Ian Whitlock
> Meridian says there is no account. The state says you are not
> licensed. I am filing with the Securities Division on Monday
> unless you show me my money is real. Ben
>
> WED 22:12 · FROM: Ian Whitlock
> Ben, please don’t do anything hasty. There is an explanation for
> all of it. Come up to the house Thursday night and we’ll go
> through it line by line. I.

Ben didn’t answer. He didn’t need to. He went.`,
          clues: ['complaint_draft', 'ben_email', 'ian_name'],
        },
        {
          label: 'Read the statements in the folder',
          cost: 0.25,
          text: `Quarterly statements on heavy cream paper, with a little lighthouse in the letterhead: WHITLOCK WEALTH PARTNERS, *Prepared for Benjamin R. Tolliver.* The balance climbs gently, quarter by quarter, the way numbers do in brochures.

> WHITLOCK WEALTH PARTNERS · QUARTERLY STATEMENT
> Custodian: Meridian Clearing Corp. · Account XXXX-4471
> Balance as of September 30: $371,812.40

Across the top of the newest one, in ballpoint pressed hard enough to tear the paper, Ben has written **NO SUCH ACCT**. Under it there’s a phone number with a box drawn around it, and the word **STATE?**`,
          clues: ['statements', 'ian_name'],
        },
        {
          label: 'Look at the photographs',
          text: `There are snapshots taped all along the bulkhead, curling at the corners. Ben at twenty, holding a salmon half as long as he is. Ben and an older man in a grain elevator jacket, the same jaw on both of them. Ben and Lorna on this deck, younger, laughing at whoever held the camera. Ben and a lanky young man in a ball cap, both of them holding up a lake trout: Dex, you’d guess.

In every picture, whatever the year and whatever the weather, Ben’s head is bare and sunburned.`,
          clues: ['no_hat'],
        },
      ],
    },

    truck: {
      title: 'Ben’s pickup',
      text: `Ben’s pickup is a white Ford with TOLLIVER CHARTERS and a leaping salmon on both doors, nosed into its usual spot by the bait shed. [if gate_card]The gate card is still clipped to the sun visor, right where Gordy said it would be.[else]A marina gate card is clipped to the driver’s sun visor.[/if]

The doors aren’t locked. The first officers on the scene found Ben’s keys in the cupholder and left them there. A gull on the roof of the bait shed watches you with professional interest.`,
      again: `Ben’s truck is where it was, with the gull now sitting on the tailgate.`,
      choices: [
        {
          label: 'Sit in the driver’s seat',
          cost: 0.25,
          text: `You get in behind the wheel, and your knees don’t touch anything. The seat is racked all the way back, in the last notch. The rearview mirror is tilted up, and the side mirrors show you mostly sky.

You lean down and look at the seat rails. The front notches are rubbed shiny from years of use. The back ones are dull with dust, except for the very last, which has a bright fresh scrape.

Ben was five foot eight. Whoever drove his truck last was a good deal taller.`,
          clues: ['seat_back'],
        },
        {
          label: 'Look at the bed and the tailgate',
          cost: 0.25,
          text: `A blue tarp lies in the bed, folded badly, still damp on its underside although the morning has been dry. Along the top edge of the tailgate there’s a smear of something dark about the length of your hand, wiped rather than splashed.

You swab the smear and bag the tarp for Dr. Rao.`,
          set: ['tailgate_swab'],
        },
      ],
    },

    morgue: {
      title: 'Dr. Samuel Achebe',
      text: `The medical examiner’s office is in the basement of the County Building, at the end of a corridor that smells of floor polish and something sharper underneath. [if lung_water]Dr. Samuel Achebe has finished the post and is writing it up at a steel desk, in fountain pen.[else]Dr. Samuel Achebe is gowned and about to begin the post. He pulls his mask down to talk to you.[/if]

He is a big, soft-spoken man who talks to families as if he has all the time in the world, and to detectives as if he has none.

“You’re here for Mr. Tolliver,” he says. “I’ll tell you what I can, and I won’t tell you what I can’t.”`,
      again: `[if lung_water]Dr. Achebe looks up from his report and caps his pen. “Detective.”[else]Dr. Achebe is still at the table. He holds up a gloved hand: five minutes.[/if]`,
      choices: [
        {
          label: 'Look at him with Dr. Achebe',
          cost: 0.5,
          text: `Ben Tolliver lies under a sheet on a steel table, and Dr. Achebe folds it back only as far as he needs to. Ben was short and broad, with a sunburned face and scalp. Like most of the dead, he looks smaller than people said.

“Look here.” Achebe turns him a little, gently, as though he might mind. Along Ben’s back and the backs of his legs the skin is an even purple-red. “Lividity. When the heart stops, the blood settles to whatever side is down, and after some hours it fixes there. He was found face down. But his blood settled along his back.” He lays him flat again. “He lay on his back for hours after he died. Then somebody turned him over and put him in the water.”`,
          clues: ['lividity'],
        },
        {
          label: 'Ask about the head wound',
          text: `“One blow, left side, above the ear.” Achebe draws it on a notepad for you rather than show you: a straight line with a right angle at one end, like a carpenter’s square. “Something heavy with a straight edge and a square corner. The straight part is about four centimeters. Hard enough to stun him. Not, I think, hard enough to kill him.”

“The edge of the dock?”

“I went down to the dock and looked. The edge is a rounded timber with a rubber bumper on it.” He taps the right angle. “It didn’t make this.”`,
          clues: ['wound_square'],
        },
        {
          label: 'Ask about the water in his lungs',
          if: 'lung_water',
          text: `“Two things: what’s missing, and what’s there.” He counts on his fingers. “Lake water in October is full of diatoms, algae with shells made of glass. Breathe it in with a beating heart and they’re all through the lungs. There are none.

“And the water that is there has bromine in it. Bromine is what people put in hot tubs, because it holds up in hot water. Swimming pools use chlorine. So does the city. If he’d drowned in a bathtub, I’d find chlorine.”`,
        },
        {
          label: 'Ask whether it could have been an accident',
          if: 'lung_water',
          text: `Achebe takes his time answering, which is how you know he’s sure.

“There are bruises on the backs of both his shoulders.” He touches his own, just below the collar. “Four on one side, three on the other, the size of fingertips, made around the time he died.” He puts his hands flat on the desk. “A man who slips into a hot tub and hits his head doesn’t get those. Someone held him under, {name}. He was drunk and he was stunned. It wouldn’t have taken long.”`,
          clues: ['shoulder_bruises'],
        },
        {
          label: 'Ask if a hot tub’s rim could have made the wound',
          if: 'ian_story3 | hottub_drained | ian_has_tub',
          text: `“A hot tub rim is molded acrylic, rounded like the edge of a bathtub, so nobody cuts themselves getting in.” He taps his drawing, the right angle. “This is a corner. Something square, and heavy. If someone tells you he hit his head on the rim, someone is telling you a story.”`,
        },
      ],
    },

    lab: {
      title: 'Dr. Anjali Rao',
      text: `The crime lab takes up the third floor at Garland Street: long white benches, the hum of fume hoods, and a radio playing classical music low enough to ignore. Dr. Anjali Rao looks up from a microscope and doesn’t smile. It isn’t unfriendly. She just hasn’t finished thinking yet.

Ben Tolliver’s phone sits in a plastic tub of silica beads at the corner of her bench, like something being pickled.`,
      again: `Dr. Rao glances up from her bench. [if phone_sent & !phone_location]“The phone is still drying. I said five hours, and I meant five hours.”[else]“What have you brought me?”[/if]`,
      choices: [
        {
          label: 'Ask her to get into Ben’s phone',
          text: `“It spent at least three hours in the lake. It’s rated for water. Not for that.” She lifts the lid, looks in, puts it back. “It needs the rest of the morning to dry before I risk putting power to it. If it comes up, I can take the location history and the health data straight off the device, without anybody’s servers.” She writes your name on a strip of tape and sticks it to the tub. “Call it five hours.”`,
          set: ['phone_sent'],
          timer: {
            in: 5,
            title: 'Dr. Rao',
            text: `Dr. Rao calls. “The phone came up.”

> BEN TOLLIVER · LOCATION HISTORY
> THU 21:15  Harbor Rd (the Anchor), moving
> THU 21:31  31 Cliff Rd, Bluffside, stationary
> FRI 02:47  31 Cliff Rd, moving at vehicle speed
> FRI 03:02  Calder Marina, stationary
>
> STEP COUNT · THU
> Last step recorded 22:21. None after.

“Five hours and sixteen minutes at that Cliff Road address. Theo ran it for me: it’s the home of an Ian Whitlock.” A pause. “The phone counts steps from the rhythm of walking. Being carried or driven doesn’t look like walking. After 10:21 he didn’t take another step.”`,
            clues: ['phone_location', 'steps_stop', 'ian_name'],
          },
        },
        {
          label: 'Hand her the swab and the tarp from the truck',
          if: 'tailgate_swab',
          text: `Dr. Rao holds the swab tube up to the light, then unfolds a corner of the tarp with a gloved finger and sniffs it, which surprises you. “Two hours for the type,” she says. “DNA takes weeks, so don’t ask me for it.”`,
          timer: {
            in: 2,
            title: 'Dr. Rao',
            text: `Dr. Rao calls about the truck. “The smear on the tailgate is human blood, type O positive. Ben Tolliver was O positive. It was wiped, not dripped: something bleeding was dragged over that edge.

“The tarp has the same blood on its underside. And it was wet, so I tested the water.” The smallest pause. “Bromine.”`,
            clues: ['tailgate_blood'],
          },
        },
        {
          label: 'Hand her the hot tub filter',
          if: 'filter_seized',
          text: `She turns the bag slowly under the lamp, looking at the pleats. “Hair and fiber I can do by microscope today. Two hours.”`,
          timer: {
            in: 2,
            title: 'Dr. Rao',
            text: `Dr. Rao calls about the filter. “The hairs are human, gray, cut short, and consistent with Ben Tolliver’s in every way I can measure. The fibers are cotton flannel, red and black. They match the shirt he was found in: the same dye, the same weave, the same twist.”

She adds, because she is exact: “*Consistent with.* DNA will take weeks. That’s what I can tell you today.”`,
            clues: ['filter_hair'],
          },
        },
        {
          label: 'Hand her the lantern',
          if: 'twin_lantern',
          text: `“Heavy,” she says, taking it in both hands. She sets it down on its square base and looks at the corners for a long moment. “I’m going to ask Dr. Achebe to come up with his measurements.”`,
          timer: {
            in: 2,
            title: 'Dr. Rao and Dr. Achebe',
            text: `Dr. Rao calls with Dr. Achebe on the line.

“There’s no blood on this lantern and no damage to it,” Rao says. “It isn’t the weapon.”

“But its twin could be,” Achebe says. “The corner of the base fits the wound: the straight edge, the right angle, the depth. Four point one centimeters. Whatever hit Ben Tolliver was one of these.”`,
            clues: ['lantern_match'],
          },
        },
      ],
    },

    theo: {
      title: 'Theo Marsh',
      text: `Theo Marsh has the basement records room arranged like a nest: three monitors, a space heater, a bowl of clementines, and a calendar with every City Hall clerk’s birthday circled in red. He spins his chair around when you come in.

“{det}! The man in the marina.” He takes a clementine and starts peeling it in one long spiral. “[if policy]You’ve had the insurance from me already. What else?[else]The lieutenant had me start on the usual. What do you want first?[/if]”`,
      again: `Theo spins around. “Back already? I’ve got clementines and I’ve got time.”`,
      choices: [
        {
          label: 'Ask what he has on Ben so far',
          if: '!policy',
          text: `“Life insurance: Tamsin Mutual, five hundred thousand, term, and the beneficiary is Lorna Tolliver, same since they bought their house. The divorce was filed in June, and it isn’t final.” He taps a sticky note on his monitor. “And here’s the good part. Tamsin Mutual says Mrs. Tolliver phoned them at 9:20 this morning. That’s fast.”`,
          clues: ['policy'],
        },
        {
          label: 'Look up Whitlock Wealth Partners',
          if: 'ian_name',
          cost: 0.25,
          text: `“Investment adviser, one-man shop, Bluffside.” He’s already typing. “The state registry’s been down all week, so I’ll call Doreen in Corporations. She owes me for the clementines. Give me an hour and a half.”`,
          timer: {
            in: 1.5,
            title: 'Theo Marsh',
            text: `Theo calls. “Doreen came through.”

> WHITLOCK WEALTH PARTNERS LLC · Sole member: Ian R. Whitlock
> Investment adviser registration: LAPSED two years ago, not renewed
> Custody and audit filings: none since the lapse
> 31 Cliff Road: second mortgage last year; county tax lien in April

“So he hasn’t been licensed to manage anybody’s money for two years,” Theo says, “and his own house is mortgaged twice and behind on its taxes. For a money man, he’s not great with money.”`,
            clues: ['license_lapsed'],
          },
        },
        {
          label: 'Pull Hollis Crane’s DNR case',
          if: 'hollis_feud',
          cost: 0.25,
          text: `“The DNR is slow, but they’re friendly. An hour.”`,
          timer: {
            in: 1,
            title: 'Theo Marsh',
            text: `Theo calls back about Hollis Crane.

> DNR · CRANE, HOLLIS · Charter vessel MARGARET C.
> Complaint (June): over-limit chinook salmon, 4 fish
> Fine: $1,850 · Charter license suspended 30 days (August)
> Appeal: denied

“The complainant’s name is blacked out,” Theo says, “but the call came from the Tolliver Charters phone. So Hollis would know.”`,
          },
        },
      ],
    },

    lorna: {
      title: 'Lorna Tolliver',
      text: `Lorna Tolliver’s house is a tidy split-level at the end of a cul-de-sac in Lakeview, with a pool out back behind a chain-link fence. She opens the door in a Mercy General scrub top and a cardigan, holding her car keys as if she meant to go somewhere and has forgotten where.

“I’ve been told,” she says. “By a patrolman younger than my car. He said he was sorry for my loss. I said, which one.” She looks at you for a long moment. “You might as well come in. Everybody else has been calling.”`,
      again: `Lorna opens the door and leaves it open for you, and goes back to the kitchen table without a word.`,
      timer: {
        in: 3,
        title: 'Lorna Tolliver',
        text: `Lorna Tolliver calls your cell. For a moment she doesn’t say anything.

“I don’t listen to his voicemails,” she says. “I haven’t since June. They were always from the Anchor, and they were always about how sorry he was. After you left, I listened to them.” She takes a breath. “There’s one from Thursday night.”

She plays it for you, holding one phone up to the other.

> THU 9:22 PM · BEN (MOBILE) · 0:31
> Lorn. It’s me. I’m going up to Ian’s to have it out with him.
> I should’ve told you how bad it was. I’m sorry about the money.
> I’m sorry about all of it. Okay. Okay. Bye.

“He never called me Lorn when he was sober,” she says, and hangs up.`,
        clues: ['voicemail'],
      },
      choices: [
        {
          label: 'Ask where she was Thursday night',
          text: `“Book club. At Janet Hale’s, two streets over. We were meant to be discussing a novel about a lighthouse keeper, and we talked about Janet’s knee.” She folds her arms. “I left at ten-thirty. I came home. I watched something with the sound off and went to bed. Alone, Detective. Nobody tucked me in. Nobody watched me brush my teeth.” A beat. “Go ahead. Write it down.”`,
          clues: ['lorna_alibi'],
        },
        {
          label: 'Ask about the divorce',
          text: `“I filed in June. Twenty-four years.” She looks out at the pool. “Ben loved that boat more than he loved me, and I’m counting the years he loved me a lot. Ask at the Anchor. They saw more of him than I did.”

She says the next part before you can ask. “He has a life insurance policy. Five hundred thousand, with me as the beneficiary, since the year we bought this house. The divorce isn’t final, so I get it.” Her chin comes up. “And yes, I called the insurance company [if day = 1]this morning[else]yesterday morning[/if], at twenty after nine, before I’d even cried. You’d have found out. You might as well hear it from me.”`,
          clues: ['policy'],
          set: ['anchor_named'],
        },
        {
          label: 'Ask about Ben’s money',
          text: `Something in her face changes.

“His father’s house on Ferris Street. When his dad died it sold for three hundred and forty thousand, and Ben had never had more than eleven hundred dollars at one time in his life.” She rubs her thumb along the edge of the table. “I’m the one who gave him Ian Whitlock’s card. I met Ian at a hospital fundraiser. Nice suit, lives on the bluff. I thought a man who lives up there must know what he’s doing with money.”

“Was Ben worried?”

“All summer. We weren’t speaking, and he’d call me anyway. The numbers didn’t look right. He wanted forty thousand out for a new engine, and it wasn’t coming.” She stops. “Ben was scared about money, and Ian kept telling him it was fine.”`,
          clues: ['ian_name', 'ben_scared'],
        },
        {
          label: 'Look at the pool',
          cost: 0.25,
          text: `The pool is small and very blue, still open and heated this late in the year, with a few yellow leaves turning on the surface. A white floater bobs in the corner with tablets in it, and a tag hangs on the gate:

> BLUEWAVE POOL CARE · THU
> Free chlorine 2.5 ppm · pH 7.4 · Tablets added

The whole yard smells faintly of the public pool on a July afternoon. When you come back in, Lorna says, “It’s chlorine. The pool man comes Thursdays. If you want to drain it and look for bodies, you’re paying for the refill.”`,
          clues: ['lorna_pool'],
        },
        {
          label: 'Sit with her a while',
          cost: 0.5,
          text: `You don’t ask anything for a while. She makes coffee that neither of you drinks.

“He never wore a hat,” she says eventually. “Did anybody tell you that? Thirty years on the water. I bought him a hat every Christmas for ten years, and he put them on the dog.” She laughs, and then she isn’t laughing. “From May to October his head was like a boiled ham. I used to put the aloe on it.”

She wipes her face with the heel of her hand, angrily. “I don’t know why I’m crying. I filed. I’m the one who filed.”`,
          clues: ['no_hat'],
        },
        {
          label: 'Ask why she called the insurance company',
          if: 'policy',
          text: `She looks at her hands for a long time.

“Because in June he said he was going to take me off. He said a lot of things in June.” Her voice is flat. “If he had, I’d know he was finished with me. So I called and asked.”

“Had he?”

“No.” She almost smiles. “He never got around to anything, Ben. That was the whole trouble with him.”`,
        },
        {
          label: 'Tell her Ben drowned in hot tub water',
          if: 'lung_water',
          text: `She stares at you. “A hot tub? Ben *hated* hot tubs. He called them soup. People soup.”

Then her face goes very still, and you watch her arrive somewhere.

“Ian has one. On his patio, looking out at the lake. He had us to dinner the first year, and Ian and the wife he had then got in with their wine, and Ben wouldn’t. He sat on the steps with a beer and made jokes about soup all night.” Her voice drops almost to nothing. “[if voicemail]He told me he was going up there. It’s on the message.[else]Is that where he was? Was he up there?[/if]”`,
          clues: ['ian_has_tub'],
        },
      ],
    },

    anchor: {
      title: 'The Anchor',
      text: `The Anchor is a low cinderblock bar across Harbor Road from the marina gate, with a neon anchor in the window that lost its chain sometime in the nineties. [if hour < 11]It isn’t open yet; Norma Grady lets you in the side door.[else]It’s open, barely: two men at the rail and a ballgame on with the sound off.[/if]

Norma Grady has tended bar here for thirty-one years. She’s cutting limes when you come in and she keeps cutting them while she talks, which you gather is how she handles things.

“Ben’s stool is the one on the end,” she says, without looking up. “Nobody’s sat on it today. Nobody’s going to.”`,
      again: `Norma sets a coffee in front of you without asking. Ben’s stool at the end of the bar is still empty.`,
      choices: [
        {
          label: 'Ask about Thursday night',
          text: `“He came in quarter to six. Bourbon, beer back, same as always. Dex came in about seven with his girl, Kayla.” Norma halves a lime with more force than a lime needs. “Around eight they got into it. Dex wants to buy in on the boat, has for a year. Ben said no, and not nicely. Dex said, ‘You’ll be sorry,’ loud enough that the whole room turned around. Then he sat at the far end and sulked for an hour, and at nine he and Kayla left.”`,
          clues: ['anchor_fight'],
        },
        {
          label: 'Ask when Ben left',
          text: `“Quarter past nine. He paid. He always paid, I’ll give him that. And he said, ‘I’m going up the hill to look my money man in the eye.’” She finally stops cutting. “I asked for his keys. I always ask. He laughed at me and went out and got in that truck.”

She puts the knife down. “I’ve been thinking about that all day. I always ask, and he always laughs.”`,
          clues: ['ben_left'],
        },
        {
          label: 'Talk to the regulars',
          cost: 0.5,
          text: `A few regulars are at the rail with coffee that has something in it. The oldest, a retired lake freighter captain named Augie, knew Ben’s father.

“Ben asked me last week how you find out if a money man’s licensed,” Augie says. “I told him, what do I know, I keep mine in a coffee can. He said, ‘Whitlock. Ian Whitlock, up on the bluff. I think he’s robbing me, Augie.’” He turns his cup around on the bar. “I thought he was drunk. He was drunk. Didn’t mean he was wrong.”`,
          clues: ['ian_name'],
        },
      ],
    },

    dex: {
      title: 'Dex Moreau',
      text: `Dex Moreau lives in two rooms over Pike’s Bait & Tackle, up an outside stair that smells of minnows. He opens the door before you knock. He’s six foot one, in a Calder Blue Herons ball cap he doesn’t take off, and you can see he’s been crying and would fight you about it.

“I know what they’re saying,” he says. “The whole harbor heard me. Come in, then. Ask.”`,
      again: `Dex opens the door and stands back to let you in. He still hasn’t taken off the cap.`,
      choices: [
        {
          label: 'Ask about the argument with Ben',
          text: `“I’ve crewed for Ben nine seasons. I’ve got forty-five thousand saved, and I offered him all of it for a third of the business. He’s been saying ‘next year’ for three years.” Dex sits on the arm of the couch. “Thursday he said no. Not next year. No. He said, ‘I’m not selling you a third of a boat I might have to sell.’ What does that even mean? He wouldn’t say.”

“And ‘you’ll be sorry’?”

He looks at the floor. “Hollis Crane’s been after me to run his second boat. I meant Ben would be sorry when I took it. When he had to fish with some kid off the dock.” His voice cracks. “That’s the worst thing I ever said to him, and it’s the last thing.”`,
          clues: ['dex_story'],
        },
        {
          label: 'Ask where he went after the bar',
          text: `“Kayla’s. Carver Avenue, in Northgate. We left at nine, picked up a pizza, and I fell asleep on her couch in my boots.” He rubs his face. “Ask her. Ask the guy next door. There was a note under my wiper in the morning, all in capitals, because I’d blocked his driveway.”`,
          clues: ['dex_alibi'],
        },
        {
          label: 'Ask what Ben was worried about',
          text: `Dex thinks about it longer than you expect.

“Money. Since August. He wanted to repower the boat, a new diesel, forty grand, and he said his money guy was dragging his feet. Then it was, ‘My money’s in trouble, Dex.’” He looks up. “After we fought, he said he was going to go see his money guy. Right then. Some guy up in Bluffside. I said, ‘Ben, you can’t drive,’ and he told me where I could go.” A pause. “I should’ve taken his keys.”`,
          clues: ['money_guy'],
        },
        {
          label: 'Ask about the dock cart',
          if: 'dock_cart | hollis_saw',
          text: `Dex frowns. “Ben? Push a dock cart?” He shakes his head. “Ben carried everything. Coolers, batteries, a whole outboard once. He said carts were for yacht people. I never saw him touch one in nine years.”`,
        },
        {
          label: 'Tell him what Hollis saw',
          if: 'hollis_cap',
          text: `When you get to the ball cap, Dex touches the brim of his own and then takes it off, for the first time since you came in, and turns it around in his hands.

“Half the harbor wears a cap,” he says. “I was on Kayla’s couch.” Then, quieter: “But Ben never. I bought him one for his fiftieth, Tolliver Charters, the salmon on the front. He hung it on the wheel of the boat, and it’s been there two years with the tag on.”`,
          clues: ['no_hat'],
        },
      ],
    },

    kayla: {
      title: 'Kayla Burns',
      text: `Kayla Burns rents the downstairs of a two-flat on Carver Avenue, with a porch full of plants that have given up for the year. She’s in purple scrubs, [if hour < 14]getting ready for an afternoon shift at a nursing home[else]just back from a shift at a nursing home[/if], and her hair is still wet.

“Dex called me,” she says. “He said you’d come.” She doesn’t sit, and doesn’t ask you to. “He didn’t do anything to Ben. He loved Ben. He’s been crying since six o’clock [if day = 1]this morning[else]yesterday morning[/if], and I never saw him cry before, not even at his mother’s funeral.”`,
      again: `Kayla opens the door with her car keys in her hand. “I’ve got five minutes.”`,
      choices: [
        {
          label: 'Ask about Thursday night',
          text: `“We left the Anchor at nine. Got a pepperoni from Sal’s on the way. It’s still in the fridge, if you want to count the slices.” She crosses her arms. “He fell asleep on the couch around eleven with his boots on. I went to bed. At six, when my alarm went off, he was still there, snoring.”

“Could he have left and come back?”

“He could have,” Kayla says. “He didn’t. I sleep light. He doesn’t do anything quietly.”`,
        },
        {
          label: 'Knock next door',
          cost: 0.5,
          text: `Lyle Pruitt lives upstairs in the next house. He works the evening shift at the grain elevators and comes to the door in his socks, and he knows exactly which truck you mean.

“Parked right across my driveway. I got home twenty to twelve and couldn’t get in, so I parked on the street and put a note under his wiper.” He holds up his phone to show you: a photo of the note, BLOCKING MY DRIVEWAY, in capitals, timestamped 11:41 p.m.

“Six o’clock I went out for the paper, and it was still there. Note and all. Soaked with dew, stuck to the glass.” He looks satisfied. “That truck didn’t go anywhere. I write a lot of notes. I notice.”`,
          clues: ['neighbor_truck'],
        },
      ],
    },

    hollis: {
      title: 'Hollis Crane',
      text: `The *Margaret C.* is a 36-foot charter boat with a blue hull and a wheelhouse full of trophies nobody has dusted in years. Hollis Crane is on the back deck working a splice into a line, a big gray man with forearms like hawsers and reading glasses on a cord.

He doesn’t look up. “I know why you’re here. Everybody on this dock has told you by now that I hated Ben Tolliver.” He pulls the splice tight. “I didn’t hate him. I disliked him professionally. There’s a difference, if you’ve ever been in business.”

From where he sits, you can look straight across the fairway at the end of B dock and the *Second Wind*.`,
      again: `Hollis looks up from his splice, sees it’s you, and looks down again. “You’re back.”`,
      choices: [
        {
          label: 'Ask about the DNR report',
          text: `“He cost me August. You know what August is worth to a charter captain? Eleven thousand dollars, in a good year.” Hollis works the fid through the rope. “Did I keep a few fish over? I kept four for a customer’s kid who’d never caught anything in his life. And Ben Tolliver picked up the phone.”

He sets the rope down. “If I killed every man who ever cost me money, there wouldn’t be anybody left on this lake to fish with.”`,
        },
        {
          label: 'Ask where he was last night',
          text: `“Here. Where else? I live here. Alone, since my wife passed; the *Margaret C.* is her.” He gestures with the splice. “My back’s bad, so I’m up and down all night. Go ahead and write that down too.”`,
        },
        {
          label: 'Ask if he saw anything in the night',
          if: '!hollis_saw',
          text: `“I sleep with the hatch shut, Detective.” He doesn’t look at you. “I didn’t see anything, and I didn’t hear anything, and I’d like to get this splice done before the weather comes in.”

It’s the first thing he’s said that doesn’t sound like him.`,
          set: ['hollis_stonewall'],
        },
        {
          label: 'Tell him Ben’s card came through the gate at 3:04',
          if: 'hollis_stonewall & gate_card & !hollis_saw',
          text: `Hollis stops splicing. “Ben’s card,” he says. “Ben doesn’t use his card.”

“No. So somebody else was driving Ben’s truck at 3:04 this morning, Captain, and your boat looks straight down B dock. You’re up and down all night. You told me so.”

He looks at you over his glasses for a long moment.`,
          go: 'hollis_talks',
        },
        {
          label: 'Tell him about the dock cart at the end of B dock',
          if: 'hollis_stonewall & dock_cart & !hollis_saw',
          text: `“Somebody pushed a cart to the end of B dock last night and left it there,” you say. “Right across from you. Those carts squeal.”

Hollis’s jaw works. He puts down the fid.`,
          go: 'hollis_talks',
        },
        {
          label: 'Wait him out',
          if: 'hollis_stonewall & !hollis_saw',
          cost: 0.75,
          text: `You lean on the rail and say nothing. Hollis splices. He finishes the splice and starts another one he doesn’t need. A gull lands on the piling, looks at the two of you, and leaves.

Forty minutes in, he puts the rope down.`,
          go: 'hollis_talks',
        },
        { label: 'Go over what he saw again', if: 'hollis_saw', go: 'hollis_talks' },
      ],
    },

    hollis_talks: {
      title: 'Hollis Crane',
      text: `“Ten past three,” Hollis says. “By the clock on my bulkhead. My back wakes me up, and I come out here and have a cigarette I’m not supposed to have.” He nods across the fairway. “Ben’s truck came in the gate. You can’t mistake it, with the fish on the door. A few minutes later there’s Ben, I figured, pushing one of Gordy’s carts down B dock with something big on it under a tarp. Heavy. He was leaning into it.”

“What did you think it was?”

“I thought it was Ben, drunk, moving a cooler at three in the morning, because that’s the kind of thing Ben does.” He looks at the strip of water between the *Second Wind* and the dock. “I went back to bed.”`,
      again: `Hollis tells it again, the same way, nearly word for word: ten past three, the truck, the cart, the tarp. He doesn’t look at B dock while he does it.`,
      clues: ['hollis_saw'],
      choices: [
        {
          label: 'Ask what the man looked like',
          text: `Hollis frowns, and you can see him seeing it again.

“Ball cap,” he says slowly. “He had a ball cap on. And he was —” He stops. “Ben’s a short fella. Was. Five-eight in his boots. This one was tall. Six foot, more. I told myself it was the dock lights, the way they throw a shadow.” He takes his glasses off. “Ben Tolliver never wore a hat in his life. Everybody on this lake knows that. I knew it at three o’clock this morning, and I went back to bed.”`,
          clues: ['hollis_cap', 'no_hat'],
        },
        {
          label: 'Ask why he didn’t go over',
          text: `“Because I’ve walked Ben Tolliver down that dock three times at three in the morning and put him in his bunk, and every time he told me exactly what he thought of me while I did it.” Hollis turns the reading glasses over in his fingers. “I thought, not tonight. Let him sleep it off on the deck.”

[if lung_water]You tell him what Dr. Achebe found: Ben had been dead for hours before that cart came down the dock. Nothing Hollis could have done at ten past three would have mattered.

He nods, and says thank you, and doesn’t look as though it helped.[else]He is quiet for a while. “If I’d gone over,” he says, and doesn’t finish.[/if]`,
        },
      ],
    },

    ian: {
      title: 'Ian Whitlock',
      text: `Thirty-one Cliff Road is gray shingle and white trim, with a lawn somebody else mows and a view straight out over the lake. [if phone_location]This is where Ben’s phone spent most of Thursday night.[/if]

Ian Whitlock opens the door before you reach it. He’s tall, six foot two or so, and has to duck a wind chime in his own doorway: fleece vest, reading glasses pushed up into good hair, eyes red at the rims.

“You’re here about Ben.” He steps back to let you in. “Somebody posted it on the marina’s Facebook page. I haven’t been able to do anything since.” He takes his glasses off and looks at them. “I shouldn’t have let him drive. That’s all I keep thinking. I shouldn’t have let him drive.”`,
      again: `[if ian_story2]Ian opens the door and doesn’t step back this time. “Detective. Should I be calling someone?”[else]Ian lets you in. The coffee’s still on, and he pours you a cup you didn’t ask for.[/if]`,
      clues: ['ian_height'],
      choices: [
        {
          label: 'Ask about Thursday night',
          text: `“He just turned up. Half past nine or so. Drunk, Detective. Not falling-down, but.” He shakes his head. “He was upset about his account. It’s had a soft year. Everybody’s has. We sat out on the patio and I went through it all with him, and he calmed down.

“About quarter past ten he said he was going back to the boat. I offered to drive him. He said nobody drives his truck but him.” A small, sad laugh. “That was Ben.”`,
          clues: ['ian_story'],
        },
        {
          label: 'Ask how he came to manage Ben’s money',
          text: `“Through Lorna, actually. We met at a hospital fundraiser years ago. When Ben’s father died and the house sold, she gave him my card.” Ian looks out at the lake. “Three hundred and forty thousand dollars. To Ben, that was the whole world. His dad worked forty years at the grain elevators for that house.

“He trusted me with it,” Ian says. “That’s the part I can’t get past.”`,
        },
        {
          label: 'Ask to see the patio',
          cost: 0.5,
          text: `He takes you out through a kitchen with nothing on the counters. The patio is flagstone, with the whole lake in front of it; off to the west you can just make out the marina’s masts.

The hot tub sits in a cedar surround at the edge of the flagstones, its cover folded back. It’s empty and bone dry. A garden hose runs from its drain valve across the lawn toward the street.

“Heater keeps tripping the breaker,” Ian says. “I drained it first thing so the service man can get at it Monday.”

On a shelf in the surround: a floating dispenser, and a white tub of **BROMINATING TABLETS · FOR SPAS AND HOT TUBS**.

Two bronze lanterns on square bronze bases stand at the top of the patio steps. One has weathered to a soft green. The other is bright as a new penny, with a price sticker on its base: **KINSELLA’S HARDWARE · $89.99**. A navy ball cap hangs on a hook by the door.`,
          clues: ['hottub_drained', 'ian_bromine', 'new_lantern'],
        },
        {
          label: 'Ask about the new lantern',
          if: 'new_lantern',
          text: `“Oh, that.” He glances at it. “The wind took one over Wednesday night and cracked the glass. I picked that one up [if day = 1]this morning[else]yesterday morning[/if]. Once you notice things don’t match, you can’t stop noticing.”

“Where’s the broken one?”

“Garage, I think.” He waves a hand. “I’ll get it to the dump one of these days.”`,
          set: ['lantern_excuse'],
        },
        {
          label: 'Ask about Ben’s complaint',
          if: 'complaint_draft | ben_email',
          text: `Ian’s face does something careful.

“Complaint.”

“To the state Securities Division. About you.”

“Ben was angry, Detective. When Ben was angry, he said things.” He puts his glasses back on. “He never filed anything.”

[if ben_email]You tell him you’ve read his email. *Come up to the house Thursday night and we’ll go through it line by line.*

There’s a pause just long enough to notice. “I wanted to reassure him,” Ian says. “Is that a crime now?”[else]“He meant to. On Monday.”

“Ben meant to do a lot of things,” Ian says, and smiles at you sadly, as if you both knew Ben.[/if]`,
        },
        {
          label: 'Ask about his license',
          if: 'license_lapsed',
          text: `“That’s an administrative thing.” He says it quickly, as if he has said it before. “Continuing-education credits. My compliance people dropped the ball, and it’s being fixed.”

“You don’t have compliance people, Mr. Whitlock. You don’t have any people.”

He smiles at you, and it doesn’t reach anywhere. [if no_account]When you mention that Meridian Clearing has never heard of Ben’s account, he says only, “Meridian is a very large company.”[/if]`,
        },
        {
          id: 'story2-phone',
          label: 'Show him Ben’s phone record',
          if: 'phone_location & ian_story & !ian_story2 & !ian_lawyer',
          text: `You read it to him: Ben’s phone at this address from 9:31 until 2:47 in the morning[if steps_stop], and not one step after 10:21[/if].

Ian sits down.

“All right.” He rubs his face with both hands. “All right. He didn’t leave at quarter past ten. He passed out. On the lounger out there, by the tub. I couldn’t move him, he’s solid, so I put a blanket over him and went to bed.” He looks up. “I was embarrassed, all right? I let a drunk man sleep in the cold, and in the middle of the night he got up and drove, and now he’s dead. When I came down at six he was gone, and the truck was gone, and I thought, good. He got home.”`,
          clues: ['ian_story2'],
        },
        {
          id: 'story2-pat',
          label: 'Tell him a neighbor saw Ben’s truck in his driveway at 1 a.m.',
          if: 'pat_truck & ian_story & !ian_story2 & !ian_lawyer',
          text: `“Pat Olander,” Ian says, after a moment. “And the dog. Of course.”

He sits down. “All right. He didn’t leave at quarter past ten. He passed out on the lounger by the tub, and I couldn’t move him, so I put a blanket over him and went to bed. I was embarrassed.” He looks up. “When I came down at six, he was gone and the truck was gone, and I thought, good. He got home.”`,
          clues: ['ian_story2'],
        },
        {
          id: 'tub-early',
          label: 'Tell him Ben drowned in hot tub water',
          if: 'lung_water & !ian_story2 & !ian_lawyer',
          text: `Ian listens with his head tilted, like a man hearing about the weather somewhere else.

“Then he went somewhere after he left here,” he says. “Half of Bluffside has a hot tub, Detective. The Yacht Club has two.” He spreads his hands. “He left at quarter past ten. I don’t know where he went. I wish to God I did.”

[if hottub_drained]His eyes don’t go to his own tub, and you notice how carefully they don’t.[/if]`,
        },
        {
          id: 'tub-late',
          label: 'Tell him Ben drowned in hot tub water',
          if: 'lung_water & ian_story2 & !ian_lawyer',
          text: `You tell him what Dr. Achebe found: no lake water in Ben’s lungs, and bromine[if ian_bromine], like the tablets on the shelf by his tub[/if].

Ian looks out at the lake for a long time.

“He wanted to get in the tub to sober up,” he says at last. “I told him not to. I went inside for a glass of water, and when I came back he’d slipped and hit his head on the rim, and he was under.” His voice is very steady. “I pulled him out. I did everything they tell you to do. And then I sat there with him.”

“For five hours.”

“I kept thinking how it would look. The account. The license.” He swallows. “He always said he’d die on that boat. So I took him to his boat, in his truck, about quarter to three.” He stands. “I’d like to call my attorney now. And I’d like you to leave.”`,
          clues: ['ian_story3'],
          set: ['ian_lawyer'],
          go: 'board',
        },
      ],
    },

    pat: {
      title: 'Cliff Road',
      text: `Cliff Road runs along the top of the bluff: old houses set well back, stone walls, hedges trimmed square. At the end of the street a flight of concrete steps, the Bluff Stairs, drops down through the trees to the lakefront path.

Two doors down from Ian Whitlock’s, a very old basset hound is lying across a front walk like a sandbag, and a person in a quilted vest is waiting for him to decide to move. That’s Pat Olander, who introduces the dog first.

“This is Biscuit. He’s fifteen. He runs this house.”`,
      again: `Biscuit is on the front walk again, in the same spot, as if he never left. Pat waves.`,
      choices: [
        {
          label: 'Ask about Thursday night',
          text: `“Biscuit has to go out at one. His bladder is older than he is. So at one o’clock every night, there I am on this sidewalk in my bathrobe.” Pat nods toward Ian’s house. “Thursday there was a pickup in Ian’s driveway. White, with a fish on the door and TOLLIVER CHARTERS. Not the kind of thing that parks on Cliff Road. Five past one; I looked at my phone. And Ian’s patio lights were on out back. You can see the glow over the fence.”

“Anything else?”

“At six, when I went for the paper, the truck was gone. And there was water running out of Ian’s yard and down the gutter, steaming a little. Smelled like a hotel spa.” Pat shrugs. “I thought, well, he’s draining the tub. I didn’t think anything of it.”`,
          clues: ['pat_truck'],
        },
        {
          label: 'Ask about Ian',
          text: `Pat considers this with care.

“Charming. He remembers your grandchildren’s names. He also owes the neighborhood association two years of dues and leases a car that costs more than my first house.” Biscuit sighs heavily. “Since his wife left he’s up at all hours. The lights are always on over there.”`,
        },
        {
          label: 'Keep knocking on doors',
          cost: 0.75,
          text: `Most of Cliff Road is at work or pretending not to be home. Across the street from Ian’s, Dolores Fenwick, eighty-one, invites you in for a cup of tea that you drink standing up.

“A little after ten on Thursday,” she says. “The news had just started. I keep the window open a crack; I like the air. Two men out on Ian’s patio, shouting. One of them kept saying ‘Monday.’ *Monday, Ian. Monday.*” She sets her cup down. “Then something fell over. A clang, like a pot lid, only heavier. And then it was quiet, and I thought, good, they’ve gone inside.”`,
          clues: ['voices_ten'],
        },
      ],
    },

    securities: {
      title: 'State Securities Division',
      text: `The state Securities Division puts you through to an examiner named Carla Espinoza, who sounds as though she has three phones on her desk and all of them are ringing.

“Tolliver,” she says, when you explain. “Oh, no. I talked to him.” Papers move. “Tuesday afternoon. He wanted to know how to file against an unregistered adviser. I told him to send the form and his statements. He said he’d have it in by Monday. He said, ‘I’m giving the son of a gun till Monday.’ I wrote it down because I liked it.”

She looks up Ian Whitlock while you wait. His registration lapsed two years ago and was never renewed.`,
      clues: ['license_lapsed'],
      choices: [
        {
          label: 'Read her the account number from Ben’s statements',
          if: 'statements',
          text: `She takes it down and reads it back. “Meridian Clearing has a regulatory line, and they’ll answer me today when they wouldn’t answer him. Give me a couple of hours.”`,
          timer: {
            in: 2,
            title: 'Carla Espinoza',
            text: `Carla Espinoza calls back from the Securities Division.

“Meridian has no account ending 4471. They have no account in Ben Tolliver’s name, and they never have. Whitlock Wealth Partners had a firm account there, and it was closed two years ago, right about when his registration lapsed.”

A pause. “We’ve had two other calls about Mr. Whitlock this year. Both elderly, both about withdrawals that never came. I think you’re about to make my month very busy.”`,
            clues: ['no_account'],
          },
        },
        {
          label: 'Ask what happens to Ben’s complaint now',
          text: `“It doesn’t need him anymore,” she says. “Send me whatever he had. His draft, his statements, anything. I’ll file it for him myself.” She’s quiet for a second. “Monday, if you like. He wanted Monday.”`,
        },
      ],
    },

    hardware: {
      title: 'Kinsella’s Hardware',
      text: `Kinsella’s Hardware is the kind of store that still sells nails by the pound, on the one commercial block of Bluff Avenue. Mae Kinsella, the owner, is up a ladder restocking birdseed. She comes down when she sees your badge, wiping her hands on her apron.

“If this is about the parking,” she says, “I told the city, that sign was already bent.”`,
      choices: [
        {
          label: 'Ask about the bronze lanterns',
          text: `“The Portside post lanterns. We sell a few a year to people up here.” She goes to the register and scrolls. “Here. [if day = 1]This morning[else]Yesterday morning[/if], 7:14.” She turns the screen so you can read it.

> KINSELLA’S HARDWARE · FRI 07:14
> 1 PORTSIDE POST LANTERN 18-IN BRONZE    89.99
> VISA XXXX-2206 · WHITLOCK/IAN R

“He was my first customer. I’d barely got the lights on. He wanted the exact same one, said he had a pair and needed them to match.” She frowns. “He looked like he’d slept in his clothes. And after he paid, he came back from the door and asked if I carried filter cartridges for a hot tub. I said no, try Pool & Spa out on the highway. He said he’d go Monday.”`,
          clues: ['lantern_receipt'],
        },
        {
          label: 'Ask whether he’s a regular',
          text: `“Mr. Whitlock? He had a house account. I closed it in the spring. He was ninety days behind on a hundred and forty dollars.” Mae shrugs. “Nice man. Beautiful manners. I don’t take manners at the register.”`,
        },
      ],
    },

    path: {
      title: 'Underpass camera',
      text: `Public Works keeps the footage from the Harbor Road underpass on a server in a room that also stores road salt. A technician sits you down in front of it and leaves.

The camera looks along the lakefront path where it ducks under Harbor Road, a few hundred yards east of the marina gate. You start at 3:00 a.m. at four times speed. A raccoon. Nothing. Nothing.

At 3:31 a man comes through from the marina side, walking east, fast, hands in the pockets of a dark jacket. He’s tall, and he has a ball cap pulled low. He never looks up. Eleven seconds, and he’s gone, toward the Bluff Stairs two and a half miles away.

Nobody else uses the path until a jogger at 5:48.`,
      clues: ['path_walker'],
      choices: [],
    },

    warrant: {
      title: 'ADA Gus Pellegrino',
      text: `ADA Gus Pellegrino answers from what sounds like a paint aisle; a kid in the background wants to know if they can get the blue.

“A search warrant for a house in Bluffside,” he says. “On a drowning. Okay. The judge is going to ask me why, so you tell me why.”`,
      again: `Gus picks up. “You again. Tell me you’ve got more.”`,
      choices: [
        {
          id: 'pc-yes',
          label: 'Walk him through what you have',
          if: 'lung_water & (ian_bromine | hottub_drained | ian_has_tub) & (phone_location | pat_truck | ian_story2)',
          text: `You give it to him in order. Ben drowned in hot tub water, not the lake. Ian Whitlock has a hot tub[if hottub_drained], and he drained it a few hours after Ben died[/if]. And Ben was at Ian’s house long after Ian says he left[if phone_location]: Ben’s own phone puts him there until 2:47 a.m.[else]: a neighbor saw his truck in the driveway at 1 a.m.[/if][if ian_story3] Ian has admitted driving the body to the marina.[/if]

Gus is quiet for a second. “Yeah,” he says. “That’s a house I want to see the inside of. Judge Halloran’s on call. Give me an hour.”`,
          go: 'search',
        },
        {
          id: 'pc-no',
          label: 'Walk him through what you have',
          if: '!(lung_water & (ian_bromine | hottub_drained | ian_has_tub) & (phone_location | pat_truck | ian_story2))',
          text: `He listens to the end.

[if !(ian_bromine | hottub_drained | ian_has_tub)]“He drowned in a hot tub. Great. There are four thousand hot tubs in this county. Whose?”[else]“So the man has a hot tub. Lots of people have hot tubs. What puts Ben Tolliver at that house after the guy says he left?”[/if]

“Call me back,” Gus says. “I don’t go to a judge with a feeling.”`,
        },
      ],
    },

    search: {
      title: 'Search warrant · 31 Cliff Road',
      text: `The warrant comes through a little after the hour, signed by Judge Halloran. [if ian_lawyer]Ian Whitlock’s lawyer, Celia Marchetti, meets you at the door and reads every page before she steps aside. Ian stands in the kitchen with his arms folded and doesn’t look at you.[else]Ian Whitlock reads it in his doorway, twice. Then he steps aside, takes out his phone and calls a lawyer.[/if]

Two uniformed officers and an evidence technician from Dr. Rao’s lab come in behind you. There’s time to do this properly, but not everywhere at once.`,
      set: ['search_done', 'ian_lawyer'],
      choices: [
        {
          label: 'Search the patio and the hot tub',
          cost: 1,
          text: `The filter housing is behind a panel in the side of the cedar surround. The cartridge is still in it: a white pleated cylinder the size of a coffee can, damp and smelling of chemicals. Ian drained the water. He didn’t think about the filter.

The technician lifts it into a bag and holds it to the light. Caught deep in the pleats are short gray hairs and a scatter of fibers, red and black.

At the top of the steps, the old lantern stands beside the new one. Its base is a square block of bronze with sharp corners, heavy enough that the technician grunts lifting it. [if lantern_excuse]There is no broken lantern in the garage, where Ian said it would be. There isn’t one in the bins, the basement or his car.[else]You look for its missing twin in the garage, the bins, the basement and the car. It isn’t anywhere.[/if]`,
          clues: ['filter_seized', 'twin_lantern'],
        },
        {
          label: 'Search the house and the office',
          cost: 1.5,
          text: `Ian’s office looks out at the lake and has nothing on its walls but his diplomas. On the desktop computer there’s a folder called CLIENTS. Inside it: a Meridian Clearing statement template, with the logo copied off the internet, and filled-in quarterly statements for Ben and eleven other people, going back years. Every one shows a balance rising gently, quarter by quarter. There is nothing from Meridian itself, or from any real custodian at all.

In the kitchen recycling, under an empty wine bottle, there’s a register receipt from Kinsella’s Hardware: Friday, 7:14 a.m., one bronze lantern.`,
          clues: ['fake_statements', 'lantern_receipt'],
        },
      ],
    },
  },

  events: [
    {
      at: 3,
      if: '!policy',
      title: 'Theo Marsh',
      text: `Theo Marsh calls up from the basement. “The lieutenant had me run the usual on your victim. Life insurance: Tamsin Mutual, five hundred thousand, and the beneficiary is still the wife, Lorna. The divorce isn’t final.” He pauses for effect. “And Tamsin Mutual says she called them at 9:20 this morning to ask about it. That’s fast.”`,
      clues: ['policy'],
    },
    {
      at: 5.5,
      title: 'Dr. Achebe',
      text: `Dr. Achebe calls from the morgue, and he doesn’t waste words.

“He drowned, {name}. But not in the lake. Lake water is full of diatoms, tiny algae with glass shells. There are none in his lungs. And the water that is there has bromine in it. Bromine is what people put in hot tubs. Swimming pools use chlorine, and so does the city.”

> PRELIMINARY · TOLLIVER, BENJAMIN R. · 52
> Cause of death: drowning
> Water in airways: no diatoms; bromine present
> Blood alcohol: 0.14
> Time of death: approx. 22:00 to 00:00 Thursday

“He drowned in a hot tub and spent the night on his back somewhere. Then someone put him in the lake.”[if !@morgue] A pause. “Come and see me. There’s more you’ll want to see for yourself.”[/if]`,
      clues: ['lung_water', 'tod'],
    },
    {
      at: 8,
      if: '(hollis_feud | dex_story) & !hollis_saw',
      title: 'Gordy Nilsen',
      text: `Gordy Nilsen calls from the marina office. “Thought you’d want to know. Hollis is fueling up the *Margaret C.* He’s got a three-day charter up the shore and he leaves at first light tomorrow.” A pause. “Or that’s what he says. I’m just telling you.”`,
    },
    {
      at: 11.5,
      title: 'Lt. Okafor',
      text: `Lieutenant Okafor stops at your desk on her way out, with her coat over her arm.

“The captain would like to sign this off as an accidental drowning,” she says. “He’d like to do it on Monday.” She glances at your notes, at the word *bromine* underlined twice. “Two o’clock tomorrow, {name}.”

She doesn’t wait for an answer.`,
    },
    {
      at: 13,
      if: '!ian_lawyer',
      title: 'Celia Marchetti',
      text: `A call comes in for you at 9:02 from Celia Marchetti, a defense attorney with an office in Old Town and a voice like a door closing.

“I represent Ian Whitlock. [if @ian]My client has already been more than generous with his time.[else]I understand my client’s name has come up in your investigation.[/if] He won’t be answering any more questions. Anything you want from him comes through me.” She gives you her number, and she doesn’t say goodbye.`,
      set: ['ian_lawyer'],
    },
  ],

  report: [
    {
      id: 'who',
      q: 'Who killed Ben Tolliver?',
      options: {
        ian: 'Ian Whitlock, his financial adviser',
        lorna: 'Lorna Tolliver, his estranged wife',
        dex: 'Dex Moreau, his deckhand',
        hollis: 'Hollis Crane, the rival captain',
        nobody: 'Nobody. It was an accident',
      },
      answer: 'ian',
      points: 40,
      why: 'Ben’s phone stayed at Ian’s house until 2:47 a.m., hours after Ian says he drove away, and his steps stopped there at 10:21. He drowned in bromine-treated water like the water in Ian’s hot tub, which Ian drained the next morning. The bruises on his shoulders say he was held under.',
    },
    {
      id: 'where',
      q: 'Where did Ben die?',
      options: {
        tub: 'In Ian Whitlock’s hot tub, in Bluffside',
        marina: 'In the lake at Calder Marina, beside his boat',
        pool: 'In Lorna Tolliver’s swimming pool',
        anchor: 'In the harbor near the Anchor, after he left the bar',
      },
      answer: 'tub',
      points: 15,
      why: 'His lungs held bromine, which is used in hot tubs, and none of the diatoms in lake water. Lorna’s pool is chlorinated. Ian’s tub uses bromine, and his neighbor heard the argument on the patio a little after ten.',
    },
    {
      id: 'moved',
      q: 'How did his body get to the marina?',
      options: {
        truck: 'In his own pickup, driven by the killer at about 3 a.m.',
        drove: 'He drove himself back from Bluffside around 10:15 p.m.',
        boat: 'By boat, across the harbor',
        dex: 'In Dex Moreau’s truck',
      },
      answer: 'truck',
      points: 15,
      why: 'His phone left Ian’s at 2:47 and reached the marina by 3:02, and his gate card, which he never used, opened the gate at 3:04. Hollis saw a tall man in a ball cap push a loaded cart down B dock, and the truck’s seat was set for someone much taller than Ben.',
    },
    {
      id: 'why',
      q: 'Why was he killed?',
      options: {
        theft: 'Ian had stolen his savings, and Ben was about to report him',
        insurance: 'For his $500,000 life insurance',
        buyin: 'Over Dex’s offer to buy into Tolliver Charters',
        dnr: 'Revenge for the DNR report',
      },
      answer: 'theft',
      points: 15,
      why: 'Ben’s $340,000 was never in any account. Ian, unlicensed for two years, had been sending him made-up statements. Ben told Ian he would file with the Securities Division on Monday, and Ian asked him up to the house on Thursday night.',
    },
    {
      id: 'proof',
      q: 'What proves Ben didn’t drown in the lake?',
      options: {
        lungs: 'Bromine and no diatoms in his lungs, and lividity on his back',
        chlorine: 'Chlorinated water in his lungs',
        wound: 'The head wound doesn’t match the edge of the dock',
        card: 'His gate card was used at 3:04 a.m.',
      },
      answer: 'lungs',
      points: 15,
      why: 'Lake water would have left diatoms and no bromine. His blood had settled along his back although he was found face down, so he lay on his back for hours before anyone put him in the water. The wound and the gate card show someone else was involved, but not where he drowned.',
    },
  ],

  outcomes: {
    ian: `Ian Whitlock was charged with murder on Monday, the day Ben had meant to file. His lawyer called it a tragic accident and a panicked mistake, right up until Dr. Rao’s report on the filter and Dr. Achebe’s testimony about the bruises on Ben’s shoulders. In March he pleaded guilty to second-degree murder and twelve counts of securities fraud.

The Securities Division found $1.9 million missing across twelve clients. Ben’s money had been gone for years before he ever asked for it. In May a police diver found the other bronze lantern in eight feet of water off the end of B dock.

Lorna and Dex scattered Ben’s ashes from the *Second Wind* on the first calm morning of spring. Across the fairway, Hollis Crane stood on his own deck with his cap in his hands.`,
    lorna: `You named Lorna Tolliver. She had half a million reasons and no one to vouch for her after 10:30, and for a week that looked like enough. Then her lawyer asked the question you couldn’t answer: her pool is chlorinated, and the water in Ben’s lungs was not. Ben’s own phone had him on Cliff Road all night. The charge was dropped before the preliminary hearing.

By then Ian Whitlock had put a new filter in his hot tub, and Ben’s complaint was still unfinished on a laptop in an evidence room.`,
    dex: `You named Dex Moreau, on the strength of three words shouted across a bar. Kayla Burns, and Lyle Pruitt’s soggy note under the wiper, put him on Carver Avenue all night, and the district attorney wouldn’t file. Dex went to work for Hollis Crane in the spring. He doesn’t go into the Anchor anymore.

Ian Whitlock went to Ben’s funeral and shook everyone’s hand.`,
    hollis: `You named Hollis Crane: the feud, the fine, the boat across the fairway. His lawyer pointed out that the only man who had seen Ben’s killer on B dock was her client, and that he had told you so. Hollis was released after two days and hasn’t spoken to a police officer since.

Nobody else was ever charged. Ian Whitlock refilled his hot tub, and his patio lanterns match again.`,
    default: `Your report called it an accident: a drunk man, a wet dock, cold water. Lieutenant Okafor read it twice and signed it, and on Monday the captain closed the case.

Tamsin Mutual paid Lorna in December. Ben’s complaint was never filed. Ian Whitlock sent white lilies to the funeral, with a card that said *He trusted me, and I will never forget it.* Eleven other people went on getting their quarterly statements, and the numbers kept going gently up.`,
  },

  solution: {
    text: `Ben Tolliver trusted Ian Whitlock with $340,000 from the sale of his late father’s house. For years Ian had kept a slow Ponzi afloat, paying some clients with other clients’ money and sending everyone statements he made on his own computer. His license lapsed two years ago. Ben’s money was long gone. When Ben asked for $40,000 this summer and it didn’t come, he called Meridian Clearing, the custodian on his statements, and learned he had no account there. He found the lapsed license, drafted a complaint to the Securities Division, and on Wednesday told Ian he would file on Monday. Ian asked him up to the house on Thursday night.

On Thursday Ben drank at the Anchor, quarreled with Dex over the buy-in, and at 9:15 drove up the hill, drunk, leaving Lorna a voicemail on the way. On Ian’s patio they argued; a neighbor heard “Monday!” and then a clang. Ian hit Ben with one of his bronze patio lanterns, Ben fell into the hot tub, and Ian held him under. Ben’s phone recorded its last step at 10:21.

Ian pulled him out and left him on his back on the patio for more than four hours, which is the lividity. At 1:05 a.m. a neighbor saw Ben’s truck in the driveway. At 2:47 Ian put Ben and the lantern in the bed of Ben’s pickup under the tarp and drove to the marina. He came in at 3:04 on the gate card from the visor, which Ben never used, pushed Ben down B dock on a cart, rolled him into the water beside the *Second Wind*, threw the lantern off the end of the dock and left the cart there. Hollis Crane saw a tall man in a ball cap and told himself it was Ben. Ian parked the truck with the seat still racked back for his own legs and walked home along the lakefront path, past the underpass camera at 3:31. At dawn he drained the hot tub, and at 7:14 he bought a lantern to match the one that was left. He forgot the filter. The water in Ben’s lungs told the rest: no diatoms, and bromine.

The others were hiding smaller things. Lorna, who stood to collect $500,000, called the insurer that morning to find out whether Ben had taken her off the policy; her pool is chlorinated, and Ben’s phone was on Cliff Road all night. Dex’s “you’ll be sorry” meant he was going to work for Hollis, and he spent the night on Kayla’s couch while a neighbor’s note sat under his wiper. Hollis lied at first because he had watched it happen from his deck and gone back to bed.`,
    chain: [
      'ian_story', 'phone_location', 'steps_stop', 'lung_water', 'lividity', 'ian_bromine', 'hottub_drained',
      'gate_card', 'complaint_draft', 'ben_email', 'license_lapsed', 'wound_square', 'shoulder_bruises',
      'ian_story3', 'filter_seized', 'twin_lantern',
    ],
    walk: [
      '@lab', 'Ask her to get into',
      '@marina', 'Ask Gordy about Ben', 'Pull the gate log',
      '@boat', 'Go through the laptop',
      '@ian', 'Ask about Thursday', 'Ask to see the patio', 'Show him Ben’s phone', 'Tell him Ben drowned',
      '@morgue', 'Look at him with', 'Ask about the head wound', 'Ask whether it could',
      '@theo', 'Look up Whitlock',
      '@warrant', 'Walk him through', 'Search the patio',
    ],
  },
};
