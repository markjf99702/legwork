// Case 2. An arson with an obvious suspect. The fire starts at one man’s door, and it was meant for the building next door.

export default {
  id: 'shared-wall',
  n: 2,
  title: 'The Shared Wall',
  crime: 'Arson',
  difficulty: 2,
  summary: 'A forty-year-old hardware store burned in the night and took half the laundromat next door with it. The Fire Marshal says the owner did it, and he wants to charge him in the morning.',
  days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday'],
  start: { day: 2, hour: 10 },
  hours: 12,

  briefing: `Lieutenant Okafor has the Fire Marshal’s preliminary report open on her desk and a cup of tea going cold beside it. She turns the report around so you can read it.

> INCIDENT 26-13052 · ARSON · 1840–1842 CARVER AVE
> Reported 3:12 a.m. Tuesday. Origin: rear (alley) door,
> Delacroix Hardware, 1840 Carver. Accelerant: gasoline.
> Fire extended through party wall to Carver Coin Laundry,
> 1842 Carver, with apartment above. One occupant rescued
> by ladder: ABERNATHY, WALTER, 84. To Mercy General.

“Delacroix Hardware,” she says. “Same family on Carver Avenue for forty years. It went up at ten past three this morning, and it went through the wall into the laundromat next door. There was a man asleep over the laundromat. The ladder company carried him down. He’s eighty-four.”

She lets that sit.

“The Deputy Fire Marshal is Frank Lowry. Frank says the owner did it. Pete Delacroix is three months behind on his mortgage, the door was opened with a key, and the gas can in the alley is the kind Pete sells. Frank wants to charge him tomorrow. He has Gus Pellegrino at eleven.” She takes off her glasses. “Frank has been doing this for thirty-one years, and he’s usually right. I want to know whether he’s right this time. Report on my desk by ten tomorrow morning, {det}. Bring me the chain, not a hunch.”`,

  people: {
    lowry: { name: 'Frank Lowry', role: 'Deputy Fire Marshal', about: 'Thirty-one years in the fire service. Up since the fire, and sure it was the owner.' },
    pete: { name: 'Pete Delacroix', role: 'Owner, Delacroix Hardware', about: '58. Runs the store his father opened in 1985. Three months behind on its mortgage.' },
    marie: { name: 'Marie Delacroix', role: 'Pete’s wife', about: 'Keeps the store’s books from home.', if: '@delacroix' },
    gary: { name: 'Gary Lusk', role: 'Owner, Carver Coin Laundry', about: '49. Owns the laundromat and the building it’s in, next door to the hardware store, with an apartment upstairs.' },
    walter: { name: 'Walter Abernathy', role: 'Tenant over the laundromat', about: '84. Cooked on the lake ore boats for twenty-six years. Has lived over the laundromat for nine. In Mercy General with smoke inhalation.' },
    yolanda: { name: 'Yolanda Pierce', role: 'Neighbor across the alley', about: 'Sixties. Worked thirty years of nights at the postal sorting center, and still doesn’t sleep.', if: 'yolanda_seen | walter_yolanda' },
    curtis: { name: 'Curtis Webb', role: 'Former clerk, Delacroix Hardware', about: '24. Pete fired him two weeks ago.', if: 'curtis_threat | curtis_gas' },
    jada: { name: 'Jada Price', role: 'Curtis’s girlfriend', about: 'Works nights at Calder Downs and studies days.', if: '@curtis' },
    nora: { name: 'Nora Kessling', role: 'Site manager, Harborline Development', about: 'Has been buying up the 1800 block of Carver for a condo project.', if: 'harborline_heard | nora_voicemail' },
    beth: { name: 'Beth Haskins', role: 'Fraud investigator, Great Lakes Mutual', about: 'Twenty-two years a sheriff’s deputy before she went to work for the insurer. Handles the claims that don’t smell right.', if: 'great_lakes' },
  },

  clues: {
    pour_trail: { title: 'The pour trail', text: 'Gasoline was poured just inside the hardware store’s alley door and in a trail about twenty feet along the base of the wall the store shares with the laundromat. It was lit from the doorway at about 3:10 a.m.', who: ['lowry'], at: 'Tue 3:10' },
    door_key: { title: 'The door was unlocked', text: 'The hardware store’s steel alley door wasn’t forced. Its deadbolt was drawn back: whoever came in unlocked it with a key.', who: ['lowry'] },
    can_found: { title: 'The gas can', text: 'A red five-gallon Surefill gas can with a yellow spout, melted, found in the alley six feet from the hardware store’s door.', who: ['lowry'] },
    lowry_case: { title: 'Lowry’s case against Pete', text: 'Pete is three months behind on the store’s mortgage, the door was opened with a key, and the can is a brand he sells. The fire department called him at 3:40. He called back at 4:58, reached the fire at 5:25, and told Lowry he had been home asleep.', who: ['lowry', 'pete'], at: 'Tue 5:25' },
    curtis_gas: { title: 'Curtis bought gas at 1:50', text: 'At 1:50 a.m. Tuesday, Curtis Webb’s card paid for $28.60 of gas at pump 3 of the Speedy Mart, four blocks up Carver from the fire.', who: ['curtis'], at: 'Tue 1:50' },
    curtis_threat: { title: '“This dump should burn”', text: 'Pete fired Curtis Webb two weeks ago for taking $200 from the register. On the sidewalk, in front of customers, Curtis yelled, “This dump should burn.”', who: ['curtis', 'pete'] },
    gary_thinks_away: { title: 'Gary thought upstairs was empty', text: 'Gary says he was home alone in Kessler Park and heard about the fire on the six o’clock news. He thanked God the apartment upstairs was empty: Walter Abernathy, he said, was at his daughter’s in Milwaukee until Sunday.', who: ['gary', 'walter'], at: 'Tue 6:00' },
    empty_spaces: { title: 'Four empty spaces', text: 'The four washer spaces nearest the burned wall are empty: bolt holes, water lines capped with clean brass caps, and a sign reading “4 WASHERS OUT FOR REPAIR.” There are no burned machines in them.', who: ['gary'] },
    gary_repair: { title: 'Washers “out for repair”', text: 'Gary says his four newest washers had bad bearings, and Tri-County Commercial Laundry Service picked them up for repair on Sunday.', who: ['gary'] },
    gary_dvr_story: { title: 'Gary says his camera broke', text: 'Gary says the recorder for his security camera “beeped and died” on Saturday night, and he hadn’t had it fixed.', who: ['gary'] },
    gary_no_can: { title: 'Gary has no gas can', text: 'Gary says he doesn’t own a gas can and has no use for one: no mower, no boat, nothing that takes gas.', who: ['gary'] },
    back_key: { title: 'Only Gary has the back key', text: 'Nobody but Gary has a key to the laundromat’s back door. He let his morning attendant go last year.', who: ['gary'] },
    pete_er: { title: 'Pete was at St. Brigid’s', text: 'Pete was in the emergency room at St. Brigid’s with his wife, Marie, from 11:40 p.m. Monday until she was discharged at 4:52 a.m. Tuesday. Her discharge papers show it.', who: ['pete', 'marie'], at: 'Mon 23:40' },
    marie_chemo: { title: 'Marie is in chemo', text: 'Marie has been in chemotherapy since August, and that is where the money went. She asked Pete to tell no one on the block, which is why he told Lowry he was home.', who: ['marie', 'pete'] },
    pete_insurance: { title: 'Pete gains nothing', text: 'The store is insured on Pete’s father’s old policy: $190,000 on the building, paid to Northshore Savings first, and Pete owes the bank more than that. He hasn’t even called his insurer.', who: ['pete'] },
    gary_key: { title: 'Gary has Pete’s key', text: 'Pete and Gary swapped spare keys in 2009. Gary’s key to the hardware store’s alley door hangs on a hook by the laundromat’s back door, on a brass tag marked DELACROIX.', who: ['gary', 'pete'] },
    one_can: { title: 'One can on that truck', text: 'The sticker on the can is Pete’s, dated 9-25, the day the stock came in. Only one Surefill came in on that delivery, and it sold in early October.', who: ['pete'] },
    ledger: { title: 'Marie’s account book', text: 'Marie’s copy of the house accounts: “10/7 LUSK · Surefill 5 gal can · 1 ea · 24.99 · on acct.” The store’s copy burned. Hers was at home.', who: ['marie', 'gary'] },
    nora_voicemail: { title: 'Harborline’s voicemail', text: 'Sunday at 4:12 p.m., Nora Kessling of Harborline Development left Pete a voicemail: “You’re going to regret holding out, Pete.”', who: ['nora', 'pete'], at: 'Sun 16:12' },
    gary_broke: { title: 'The laundromat is failing', text: 'Since a competitor opened on Dunmore two years ago, the laundromat’s water use is down 41 percent. Gary is two years behind on his property taxes ($18,400) and got a water shutoff notice in June.', who: ['gary'] },
    truck_rental: { title: 'A truck and a storage unit', text: 'Gary Lusk rented a 15-foot box truck from Lakeshore Truck & Storage on Harbor Road at 8:35 p.m. Sunday and returned it at 7:50 a.m. Monday. On the same account: storage unit 214, three months paid in cash.', who: ['gary'], at: 'Sun 20:35' },
    can_sticker: { title: 'Pete’s price sticker', text: 'Under the melt on the can’s base, the lab found a price sticker: “DELACROIX HDW · $24.99 · 9-25.” The can came from Pete’s store. It held gasoline. No usable prints.', who: ['pete'] },
    dvr_unplugged: { title: 'The recorder was unplugged', text: 'Nothing is wrong with Gary’s camera recorder. Its log shows no faults in eleven months, then a power loss at 10:14 p.m. Saturday. Someone pulled the plug.', who: ['gary'] },
    buzzer: { title: 'The back door at 2:55', text: 'Walter heard the laundromat’s after-hours door buzzer at 2:55 a.m., and again a minute or two later. About ten minutes after that he smelled smoke. At night it only ever goes at ten, when Gary locks up.', who: ['walter', 'gary'], at: 'Tue 2:55' },
    gary_asked: { title: 'Gary asked when he’d be away', text: 'Last week Gary asked Walter twice when he was leaving for his daughter’s and when he’d be back, and wrote it on his hand. In nine years he had never asked Walter about anything but the rent.', who: ['gary', 'walter'] },
    walter_home: { title: 'Walter came home early', text: 'Walter was supposed to be in Milwaukee until Sunday. He missed his cat, took the bus home Monday, let himself in at 9:40 p.m. and told no one.', who: ['walter'], at: 'Mon 21:40' },
    truck_sunday: { title: 'Washers out the back door', text: 'Around 11 p.m. Sunday, Yolanda Pierce watched a white Lakeshore rental truck back up to the laundromat. Two men loaded four of the newest washers onto it while Gary held the door and a flashlight.', who: ['yolanda', 'gary'], at: 'Sun 23:00' },
    no_ticket: { title: 'Tri-County never had them', text: 'Tri-County Commercial Laundry has no service call at Carver Coin Laundry since a dryer lock a year ago March. Nobody there works Sundays, and they repair washers where they stand.' },
    coverage_raised: { title: 'Coverage raised five weeks ago', text: 'Five weeks before the fire, Gary raised his building and contents coverage with Great Lakes Mutual, by a lot. That sent the loss straight to the insurer’s fraud unit.', who: ['gary', 'beth'] },
    coverage_file: { title: 'The new numbers', text: 'Since 9/23, Gary’s building has been insured for $650,000 instead of $380,000, and its contents for $160,000 instead of $85,000. His premium nearly doubled, and he had been paying the old one late.', who: ['gary', 'beth'] },
    claim_washers: { title: 'The claim', text: 'Gary filed his claim in person at 2:50 p.m. Tuesday: building and contents a total loss. It lists all sixteen washers as destroyed, including four Harwood front-loaders at $8,400 apiece.', who: ['gary', 'beth'], at: 'Tue 14:50' },
    er_confirmed: { title: 'St. Brigid’s visitor log', text: 'Pete badged into St. Brigid’s emergency department at 11:42 p.m. and turned the badge in at 4:55 a.m. Anyone who stepped out would have had to badge back in. He never did.', who: ['pete'], at: 'Mon 23:42' },
    curtis_pushed: { title: 'The pump camera', text: 'At 1:47 a.m. Curtis and Jada push a dead silver Civic up to pump 3 at the Speedy Mart. He fills the car’s tank. There’s no can. They drive away at 1:54.', who: ['curtis', 'jada'], at: 'Tue 1:47' },
    curtis_story: { title: 'Curtis’s night', text: 'Curtis says his car ran out of gas on Carver after he picked Jada up from work at one. They pushed it into the Speedy Mart, filled it and were home by two. Jada says he didn’t go out again.', who: ['curtis', 'jada'], at: 'Tue 2:00' },
    nora_meaning: { title: 'Both buildings or neither', text: 'Harborline offered $700,000 for Pete’s building and $650,000 for Gary’s, but only for both together, and only until Friday. The fire stalls the deal: adjusters, a nervous lender, and a landmarks review of the block.', who: ['nora'] },
    nora_alibi: { title: 'Nora was in Toronto', text: 'Nora Kessling had dinner with Harborline’s lender in Toronto on Monday night and flew home on the 7:05 a.m. flight. She has the boarding pass and the hotel bill.', who: ['nora'], at: 'Mon 19:00' },
    gary_wanted_sell: { title: 'Gary wanted to sell', text: 'Gary would have signed with Harborline in August, and called Nora every week. Twice he asked whether Harborline would buy his building alone. She said no.', who: ['gary', 'nora'] },
    storage_search: { title: 'Unit 214', text: 'In Gary’s storage unit: four Harwood washers, shrink-wrapped, and a box holding the laundromat’s framed first dollar and an old family photograph.', who: ['gary'] },
    gary_walter: { title: '“I asked him twice”', text: 'Confronted, Gary said, “I didn’t know he was home. I asked him. I asked him twice.” Then he asked for a lawyer.', who: ['gary', 'walter'] },
  },

  leads: {
    scene: { title: 'The fire on Carver Avenue', where: 'Delacroix Hardware, 1840 Carver Ave · Northgate', kind: 'place', cost: 1, again: 0.5 },
    laundromat: { title: 'Carver Coin Laundry', where: '1842 Carver Ave · Gary Lusk', kind: 'place', cost: 1, again: 0.5, until: 'gary_walter', closed: 'Lawyered up' },
    delacroix: { title: 'Pete Delacroix', where: 'At home · 311 Ramsey St, lower flat', kind: 'person', cost: 1, again: 0.5 },
    abernathy: { title: 'Walter Abernathy', where: 'Mercy General, room 412', kind: 'person', cost: 1, again: 0.5, if: 'walter_awake' },
    yolanda: { title: 'Yolanda Pierce', where: 'Back porch across the alley · Holt St', kind: 'person', cost: 1, again: 0.5, if: 'yolanda_seen | walter_yolanda' },
    curtis: { title: 'Curtis Webb', where: 'Over a nail salon · Ferris St', kind: 'person', cost: 1, again: 0.5, if: 'curtis_threat | curtis_gas' },
    harborline: { title: 'Harborline Development', where: 'Nora Kessling · site trailer, 1830 Carver Ave', kind: 'person', cost: 1, again: 0.5, if: 'harborline_heard | nora_voicemail' },
    speedy: { title: 'Speedy Mart', where: 'Pump cameras · Carver Ave at Holt', kind: 'records', cost: 1, if: 'curtis_gas', once: true, onceNote: 'Watched' },
    stbrigids: { title: 'St. Brigid’s Hospital', where: 'Emergency department', kind: 'place', cost: 1, if: 'pete_er', once: true, onceNote: 'Checked' },
    theo: { title: 'Theo Marsh', where: 'Records · basement, Garland St', kind: 'records', cost: 0.5, again: 0.5 },
    lab: { title: 'Crime lab', where: 'Dr. Anjali Rao · Garland St', kind: 'lab', cost: 0.5, again: 0.5, if: 'can_found | dvr_taken' },
    insurer: { title: 'Great Lakes Mutual', where: 'Beth Haskins, fraud unit · by phone', kind: 'phone', cost: 0.5, again: 0.5, if: 'great_lakes' },
    tricounty: { title: 'Tri-County Commercial Laundry', where: 'Service desk · by phone', kind: 'phone', cost: 0.5, if: 'gary_repair', once: true, onceNote: 'Called' },
    pellegrino: { title: 'ADA Gus Pellegrino', where: 'By phone', kind: 'phone', cost: 0.5, again: 0.5, if: 'beth_request | truck_rental' },
  },

  scenes: {
    scene: {
      title: 'Carver Avenue',
      text: `Carver Avenue smells like a wet fireplace. One engine is still here, idling, and a hose line runs across the sidewalk and in through the front of Delacroix Hardware, where the windows used to be. Above the empty frames, the painted sign, DELACROIX HARDWARE · SINCE 1985, has blistered off the brick at one end.

Next door, Carver Coin Laundry’s windows are covered with plywood, and gray water is still seeping out under its door. The windows of the apartment upstairs are black around the edges.

The Deputy Fire Marshal stands in the middle of it with a clipboard and a paper cup. Frank Lowry is sixty or close to it, with a gray mustache and a turnout coat that has seen a lot of mornings like this one. He looks at your badge, then at you.

“Ruth Okafor’s,” he says. “Good. Come see what he did.”`,
      again: `Frank Lowry is still on Carver Avenue, [if time >= 10]back early with a fresh coffee and yesterday’s shirt[else]arguing with a city engineer about whether the front wall will stand[/if]. [if lowry_convinced]He nods to you the way he’d nod to a partner.[else]He lifts his cup to you. “Detective.”[/if]`,
      choices: [
        {
          label: 'Ask how the fire started',
          text: `Lowry walks you down the passage beside the store to the alley and stops at a steel door hanging from one hinge.

“Right here. He opened this door, poured inside, walked it along the wall, and lit it from the doorway.” He points with his pen at a dark stain on the concrete floor that runs from the threshold along the base of the right-hand wall. “Pour trail. Gasoline soaks into concrete and burns there, and it leaves a mark you can read like handwriting. Twenty feet along the wall the store shares with the laundromat. Ten after three, give or take.” He points up, at the hole where the wall used to be. “Up and through.”`,
          clues: ['pour_trail'],
        },
        {
          label: 'Ask about the alley door',
          text: `The door is steel in a steel frame, blistered but whole. You look for pry marks and find none: no bent edge, no chewed paint around the strike plate.

“Now look at the bolt,” Lowry says. The deadbolt is drawn back inside the door. “If it had been locked when the fire hit, that bolt would be sitting out in the frame. It isn’t. Somebody unlocked this door.”

“With a key.”

“With a key,” Lowry says. “And Pete’s got a key.”`,
          clues: ['door_key'],
        },
        {
          label: 'Walk through the burned store with him',
          cost: 0.5,
          text: `Lowry finds you a helmet and takes you in through the alley door.

The stockroom is a black box, dripping. Steel shelving has folded over like wet cardboard. Along the right-hand wall the floor is scorched in a long dark ribbon, and above it the old brick has burned through to a hole you could crawl into. Through the hole you can see the back of the laundromat: a row of blackened washers under a fallen ceiling.

On the far side of the stockroom, the shelves of paint thinner, lamp oil and charcoal lighter are scorched by the heat, and still full.

“He wanted it all to go,” Lowry says, with his flashlight on the hole. “Wall and all.”

You look at the full shelves of thinner, and then at the wall.`,
          clues: ['pour_trail'],
        },
        {
          label: 'Ask about the gas can',
          text: `Lowry leads you to his truck and lifts a paper evidence bag out of a crate in the back. Inside is a red plastic gas can, five gallons, slumped sideways by the heat like a candle. The yellow spout has survived, and so has part of the name molded into the side: SUREFILL.

“Found it in the alley, six feet from the door,” he says. “Pete sells Surefills. Or sold.” He holds out the bag. “State lab’s backed up three weeks. If your lab’s faster, take it. Sign for it.”

You sign for it.`,
          clues: ['can_found'],
        },
        {
          label: 'Ask what he has on Pete',
          text: `Lowry counts it off on thick fingers.

“One. Pete’s three months behind on the store mortgage. Northshore Savings filed a notice, it’s at the county. Two. That door was opened with a key, and Pete has the key. Three. The can’s a Surefill, and Pete sells Surefills.” He gets to four. “Fire department called his cell at 3:40. He didn’t pick up. He called back at 4:58 and got here at 5:25. His store’s burning down and it takes him an hour and forty-five minutes. Told me he was home asleep with the phone in the kitchen.”

He finishes his coffee. “Thirty-one years, Detective. It’s the owner. It is nearly always the owner.”`,
          clues: ['lowry_case'],
        },
        {
          label: 'Ask whether anyone else had a reason',
          text: `“Pete gave me two names, which is what they do.” Lowry flips back a page. “A kid he fired two weeks ago for taking two hundred out of the register. Curtis Webb. Kid stood out on the sidewalk and told him, ‘This dump should burn.’ And a developer, a woman from Harborline who left Pete a voicemail he didn’t like.”

“Anything on the kid?”

“Funny you should ask. I went up to the Speedy Mart at six, the only gas for half a mile. Card at pump three, ten to two this morning: Curtis Webb, twenty-eight sixty.” He shrugs. “Maybe he filled his car. Maybe he filled a can. The night man didn’t know the camera password. But that kid doesn’t have a key to this door, and Pete does.”`,
          clues: ['curtis_threat', 'curtis_gas'],
          set: ['harborline_heard'],
        },
        {
          label: 'Ask about the laundromat',
          text: `“Burned through the shared wall into the back half. Front half is smoke and water.” Lowry tips his cup at the plywood. “Owner’s Gary Lusk. He’s been in there since six-thirty with a squeegee, which I told him not to do. Nice guy. Poor guy.”

He almost smiles. “His insurance company’s already on it. A woman from Great Lakes Mutual’s fraud unit called me at nine. They call on every fire. Makes them feel useful.”`,
          set: ['great_lakes'],
        },
        {
          label: 'Ask about the rescue',
          text: `“Cab driver called it in at 3:12. Engine 6 was here at 3:17, and by then the back of the laundromat was going too.” Lowry nods up at the apartment windows. “Old man was at the front window in his pajamas, holding a cat. Ladder had him down at 3:24. Cat went over the ladderman’s shoulder and took off down Carver like it had someplace to be.”

He turns the empty cup in his fingers. “Old man cried about that cat the whole way to the ambulance. Not about himself. The cat.”`,
        },
        {
          label: 'Walk the alley',
          cost: 0.5,
          text: `The alley behind the 1800 block is one lane of broken concrete between the backs of the Carver storefronts and the back porches of the two-flats on Holt Street. It’s full of wet plaster and charred shelving the firefighters threw out.

Six feet past the hardware store’s door, where the two buildings meet, is the laundromat’s back door: steel, with a small gray box mounted over the frame and a wire running from it inside. Higher up, under the laundromat’s eave, a security camera looks straight down the alley at both doors.

Across the alley, on a second-floor back porch, a woman in a quilted coat is watching you over a mug. By the look of her, she has been watching everything.`,
          set: ['saw_camera', 'yolanda_seen'],
        },
        {
          label: 'Canvass what’s left of the block',
          cost: 0.5,
          text: `There isn’t much still open on this end of Carver: a barbershop, a phone repair counter, a taquería with its chairs up on the tables.

Sal the barber has cut hair across the street for thirty years. “Pete lent me a ladder in 2014 and never asked for it back. That’s Pete.” He lowers his scissors. “The kid he fired, though. Stood right there yelling, ‘This dump should burn.’ Everybody heard it.”

At the phone repair counter, a young woman says Pete has been closing early on Thursdays since August, which isn’t like him.

Sal catches you on the way out. “Gary had a sign up Monday, four washers out for repair. My wife does the church tablecloths there Mondays. She was not happy.” He points across the street with his comb. “Ask Yolanda, over the alley. She sees everything. She never sleeps.”`,
          clues: ['curtis_threat'],
          set: ['repair_sign', 'yolanda_seen'],
        },
        {
          label: 'Tell him where Pete really was',
          if: 'pete_er',
          text: `You tell Lowry about St. Brigid’s: Marie, the fever, the chemo, the discharge papers.

He’s quiet for a moment. “I didn’t know about his wife,” he says. Then he writes it down, because he’s a professional. [if er_confirmed]“And a visitor log. In at 11:42, out at 4:55.” He taps the pen on the clipboard. “All right. That’s something.”[else]“St. Brigid’s is four miles from here, and hospitals have doors. Get me something better than his wife’s word.”[/if]`,
        },
        {
          label: 'Tell him Gary Lusk has a key to this door',
          if: 'gary_key',
          text: `“Lusk?” Lowry looks over at the laundromat’s plywood. “Lusk is the victim here.”

But he writes it down, and he looks at the plywood a while longer than he needs to.`,
        },
        {
          id: 'convince-yes',
          label: 'Lay out the case against Gary Lusk',
          if: '(pete_er | er_confirmed) & ledger & (buzzer | truck_sunday | claim_washers | storage_search)',
          text: `You give it to him in the alley, standing at the door he showed you this morning. The can with Pete’s sticker on it, the only Surefill on Pete’s last delivery, on Gary’s account since October 7th. Pete at St. Brigid’s all night. [if gary_key]A spare key to this door on a hook in Gary’s back room. [/if][if buzzer]Walter hearing Gary’s back door at 2:55. [/if][if truck_sunday]Four washers going into a rental truck on Sunday night. [/if][if coverage_raised]Gary’s coverage raised five weeks ago.[/if]

Lowry doesn’t say anything for a while. He looks down at the pour trail, the dark ribbon running along the base of the shared wall.

“I read that as Pete wanting the whole building,” he says at last. “It isn’t. It’s somebody who wanted the *wall*.” He takes off his helmet and runs a hand over his head. “Thirty-one years. It’s nearly always the owner.”

He puts the helmet back on. “It was the owner. Just the other one.”`,
          set: ['lowry_convinced'],
        },
        {
          id: 'convince-no',
          label: 'Lay out the case against Gary Lusk',
          if: '!((pete_er | er_confirmed) & ledger & (buzzer | truck_sunday | claim_washers | storage_search)) & (gary_key | buzzer | truck_sunday | ledger)',
          text: `Lowry hears you out with his arms folded.

“Maybe,” he says. “Maybe. But what I’ve got is [if can_sticker]a can off Pete’s own shelf[else]a can like the ones Pete sells[/if], a door opened with a key Pete has, and a man who lied to me about where he was. You want me to look at Lusk, bring me something that puts that can in Lusk’s hands, and puts Pete somewhere else. Paper, Detective. Not stories.”`,
        },
      ],
    },

    laundromat: {
      title: 'Carver Coin Laundry',
      text: `Carver Coin Laundry is half a laundromat. The front half is still rows of washers and dryers, soaked and gray with soot. The back half, against the wall it shares with the hardware store, is a black cave where the ceiling has come down in wet sheets. Everything drips.

Gary Lusk is pushing an inch of black water toward the floor drain with a squeegee. He’s forty-nine, soft around the middle, in a Carver Coin Laundry windbreaker. When he sees your badge he leans the squeegee against a dryer and comes over with his hand out.

“Detective. God. Watch your step, it’s slick.” His hand is damp. “Forty years Pete’s been next door. Forty years. I don’t know what to say to him. I don’t know what to say to anybody.”`,
      again: `[if gary_told]Gary is sitting on the folding table with the squeegee across his knees. He doesn’t get up this time.[else]Gary is still pushing water toward the drain. “Detective,” he says. “Any news?”[/if]`,
      choices: [
        {
          label: 'Ask Gary about last night',
          text: `“Home. Asleep. I’ve got a place in Kessler Park, over a dentist’s office.” He rubs his face with both hands. “I heard it on the radio at six, can you believe that? The six o’clock news. I came straight down.”

He looks up at the ceiling, where the water is still coming through. “Radio said nobody was hurt, thank God. And Walter, my tenant upstairs, he’s at his daughter’s in Milwaukee till Sunday. Thank God for that. Can you imagine?”`,
          clues: ['gary_thinks_away'],
        },
        {
          label: 'Tell him Mr. Abernathy was upstairs',
          if: 'gary_thinks_away & !gary_told',
          text: `You tell him. Walter came home on Monday night. The ladder company carried him down from his front window at 3:24 in his pajamas, and he’s at Mercy General with smoke in his lungs.

Gary doesn’t say anything. His face goes the color of the water on the floor. He puts a hand out for the folding table and sits down on it, and it creaks.

“No,” he says. “No, he’s — he told me Sunday. He told me. I asked — ” He stops. “Is he all right? Is he going to be all right?”

[if @abernathy]“He’s asking about his cat,” you say, and Gary puts his face in his hands.[else]You tell him you don’t know yet. It’s the truth.[/if]`,
          set: ['gary_told'],
        },
        {
          label: 'Look over the back of the laundromat',
          cost: 0.5,
          text: `Gary says he’d rather you didn’t, it isn’t safe, and follows you anyway.

Along the shared wall, eight washer spaces are stenciled on the floor, 9 through 16. The first four hold machines, blistered and black. The last four, nearest the hole in the wall, are under a sheet of fallen ceiling tin. You drag it back. The spaces under it are empty: bolt holes in the concrete, and water lines capped off with clean brass caps. Taped to the wall above them, curled by the heat, is a sheet of paper: **4 WASHERS OUT FOR REPAIR · SORRY! · MGMT**.

By the back door there’s a small gray buzzer box and a row of hooks. Most of the keys are the laundromat’s. One hangs by itself on a brass tag stamped DELACROIX.

Up front in the office, where the fire didn’t reach, a camera recorder sits on a shelf under a film of soot. Its power cord is coiled neatly on top of it.`,
          clues: ['empty_spaces', 'gary_key'],
          set: ['saw_dvr'],
        },
        {
          label: 'Ask about the missing washers',
          if: 'empty_spaces | truck_sunday | repair_sign',
          text: `“Out for repair.” It comes out fast. “The four new ones. Bearings, all four, they were screaming like cats. Tri-County came and got them Sunday.”

He wipes his hands on his windbreaker, though they’re dry. “Tri-County Commercial. They do everybody.”`,
          clues: ['gary_repair'],
        },
        {
          label: 'Ask about the security camera',
          if: 'saw_camera | saw_dvr',
          text: `“Broke.” Gary shakes his head. “Saturday night. The recorder beeped and died. I was going to call somebody Monday, and then, well.” He spreads his hands at the ruin. “Figures, right? The one week you need it.”`,
          clues: ['gary_dvr_story'],
        },
        {
          label: 'Take the recorder for the lab',
          if: 'gary_dvr_story & !dvr_taken',
          text: `“It’s dead,” Gary says. “But sure. Sure, take it.”

He watches you lift it off the shelf, with its cord still coiled on top, and carry it out to your car.`,
          set: ['dvr_taken'],
        },
        {
          label: 'Ask whether he owns a gas can',
          if: 'can_found',
          text: `“A gas can?” He laughs, once. “What would I do with a gas can? I don’t have a mower. I don’t have a boat. I take the bus half the time.” The laugh goes away. “Is that what they found? A gas can?”`,
          clues: ['gary_no_can'],
        },
        {
          label: 'Ask who has keys to the back door',
          text: `“Me. Just me.” He says it without thinking. “I had a kid, Luis, who opened up mornings, but I let him go last year. I couldn’t carry him.”`,
          clues: ['back_key'],
        },
        {
          label: 'Ask about his insurance',
          text: `“Great Lakes Mutual. I called my agent at eight.” He waves at the dripping ceiling. “They’re sending an adjuster Thursday. Thursday! Look at this place.”`,
          set: ['great_lakes'],
        },
        {
          label: 'Ask about Harborline',
          text: `“The developers.” Gary sighs. “They wanted this whole end of the block. Both buildings, mine and Pete’s, together or nothing. I’d have signed in August.”

He picks up the squeegee and puts it down again. “Pete wouldn’t. His father’s store, forty years, I get it, I do. But some of us don’t have a father’s store. Some of us have a laundromat.”`,
          set: ['harborline_heard'],
        },
        {
          label: 'Show him Marie’s account book',
          if: 'ledger & gary_no_can',
          text: `You read him the line from Marie’s book: *10/7, Lusk, Surefill 5 gal can, 1 ea., $24.99, on acct.*

Gary looks at it for a long time.

“Oh,” he says. “Oh, that. That was for a friend. For his mower. I forgot all about it.”

“Which friend?”

“I’d have to think.” He doesn’t think. He looks at the squeegee.`,
        },
        {
          label: 'Tell him what the lab found in his recorder',
          if: 'dvr_unplugged & gary_dvr_story',
          text: `“It didn’t break,” you tell him. “Somebody pulled the plug at 10:14 on Saturday night.”

Gary blinks. “Maybe it got knocked. I clean in there. I’m always cleaning.” He looks at the empty shelf in the office where it used to sit. “I’m always cleaning,” he says again.`,
        },
        {
          label: 'Tell him Tri-County never had his washers',
          if: 'no_ticket & gary_repair',
          text: `Gary opens his mouth and closes it. “Not Tri-County. Did I say Tri-County? A guy. A guy I use sometimes. I’d have to find his card.”

He pats his windbreaker pockets, one and then the other, and finds nothing in either.`,
        },
        { label: 'Lay it all out for him', if: 'ledger & (buzzer | truck_sunday | storage_search | claim_washers)', go: 'confront' },
      ],
    },

    confront: {
      title: 'Gary Lusk',
      text: `You pull two folding chairs out of the dry end of the room and sit in one. After a while, Gary sits in the other.

Then you give it to him, in order. The can in the alley, with Pete’s sticker on the bottom and the date the stock came in: the only Surefill on that delivery, on Gary’s account on October 7th in Marie Delacroix’s handwriting. [if pete_er]Pete at St. Brigid’s all night, holding his wife’s hand. [/if][if gary_key]Pete’s key on the hook by Gary’s back door. [/if][if buzzer]Walter hearing that back door at 2:55. [/if][if truck_sunday]A rental truck in the alley on Sunday night, and four washers going up the lift. [/if][if storage_search]The same four washers in unit 214 on Harbor Road, with the first dollar on top. [/if][if claim_washers]A claim that says they burned.[/if]

Gary listens with his hands hanging between his knees. Water drips. Somewhere under the floor, a pump runs and stops.`,
      choices: [
        {
          label: 'Ask him why',
          text: `For a while he doesn’t answer. Then he says, to the floor, “Do you know what a laundromat makes now? Do you know what my water bill is?” He laughs, and it isn’t one. “Two years I’ve been paying people to wash their clothes.”

He rubs his thumb across the back of his other hand, as if something were written there. “Harborline was the way out. Six-fifty and I’m done, I’m out, I’m in Arizona. And Pete — ” He shakes his head. “Pete had his father’s store.”`,
        },
        {
          label: 'Ask him about Walter Abernathy',
          text: `[if gary_told]“Walter,” you say, and that’s all it takes.[else]You tell him Walter Abernathy came home on Monday night, and the ladder company carried him down from his window at 3:24.[/if]

Gary makes a sound you don’t often hear from a grown man.

“I didn’t know he was home. I asked him. I asked him *twice*. He said Sunday, he told me Sunday.” He wipes his face with both hands. “I checked. I would never — I *checked*.”

Then he looks up at you, and whatever he was going to say next, he decides against it.

“I think I want a lawyer,” Gary Lusk says.`,
          clues: ['gary_walter'],
          go: 'board',
        },
      ],
    },

    delacroix: {
      title: 'The Delacroix home',
      text: `Pete and Marie Delacroix rent the lower flat of a two-flat on Ramsey Street. There’s a new handrail on the front steps, bright unpainted pine, the kind of thing a hardware man builds on a Sunday.

Pete opens the door before you knock. He’s fifty-eight, thick through the shoulders, in a Delacroix Hardware sweatshirt that still smells of smoke. He hasn’t slept, and he doesn’t pretend he has.

“The fire marshal already had me,” he says. “Twice.”

Behind him, on the couch, a woman in a knit cap is sitting under an afghan with a mug of broth. There’s a plastic hospital bracelet on her wrist.

“Let them in, Pete,” she says. “You’re letting the heat out.”`,
      again: `[if pete_er]Marie answers the door this time, slowly, with one hand on the new rail.[else]Pete answers the door again, and doesn’t look happy about it.[/if] [if ledger]The green ledger is still on the kitchen table where she left it.[/if]`,
      choices: [
        {
          label: 'Ask Pete where he was last night',
          if: '!pete_er',
          text: `“Home,” Pete says. “Asleep. My phone was in the kitchen. I told Lowry all this.”

On the couch, Marie puts down her mug and looks at her husband, and doesn’t say anything at all.`,
        },
        {
          label: 'Ask Marie about the hospital bracelet',
          text: `Marie looks at her wrist as though she’d forgotten it was there.

“Tell them, Pete.”

“Marie.”

“Tell them, or I will, and I’m tired.”

Pete sits down on the arm of the couch. “She’s in chemo,” he says. “Since August. Last night her fever went to a hundred and three, and when that happens you don’t wait, they tell you, you go. We got to St. Brigid’s at twenty to twelve. They let us go home at five to five.” He rubs his eyes. “My phone was in my coat. I didn’t see the fire department till after.”

Marie finds a folded paper on the side table and holds it out.

> ST. BRIGID’S HOSPITAL · EMERGENCY DEPT · DISCHARGE
> DELACROIX, MARIE A.
> Arrived 23:40 MON · Discharged 04:52 TUE
> Neutropenic fever. Accompanied by spouse.

“He told Lowry he was home because I asked him not to tell anybody,” Marie says. “I didn’t want the whole block bringing casseroles. That’s on me, not him. So is the money.”`,
          clues: ['pete_er', 'marie_chemo'],
        },
        {
          label: 'Ask who has keys to the store',
          text: `“Me and Marie,” Pete says. “And Gary next door. We swapped spares in ’09, the winter his pipes froze and nobody could get in. He keeps mine on a hook by his back door. I kept his in a drawer at the store.” He stops. “Kept.”

“Curtis Webb?”

“Gave his back when I let him go. I took it off his ring myself.”`,
          clues: ['gary_key'],
        },
        {
          label: 'Ask who’d want to burn him out',
          text: `Pete doesn’t want to answer that. Marie answers for him.

“Curtis Webb,” she says. “The boy Pete let go.”

“He took two hundred out of the register,” Pete says. “So I let him go. And he stood out on the sidewalk and yelled, ‘This dump should burn.’ In front of Mrs. Ocampo and her grandson.” He shakes his head. “He’s a kid with a mouth. I don’t want to put this on a kid.”

“And the developer,” Marie says.

“And the developer,” Pete says.`,
          clues: ['curtis_threat'],
          set: ['harborline_heard'],
        },
        {
          label: 'Ask about the developer',
          if: 'harborline_heard',
          text: `Pete takes out his phone, finds the message and puts it on speaker.

> SUN 4:12 PM · NORA KESSLING (HARBORLINE)
> “Pete, it’s Nora Kessling. The board meets Friday, and after
> that the number’s gone. You’re going to regret holding out,
> Pete. Call me.”

“They want the store and Gary’s building together,” Pete says. “Condos. I said no.”

“I told him to sell,” Marie says quietly. “He thinks as long as the store’s open, nothing’s changed.”

Pete doesn’t answer that.`,
          clues: ['nora_voicemail'],
        },
        {
          label: 'Look through the papers on the table',
          cost: 0.5,
          text: `The kitchen table is a filing system: pill bottles in a row, a calendar with every Thursday circled, and a stack of mail. You go through it with Marie’s permission and Pete’s silence.

A Northshore Savings notice: three payments missed on 1840 Carver, August through October. Two bills from St. Brigid’s. And in a folder that has been opened and closed a lot, the store’s insurance policy, with a typed endorsement from 1998 and not much since.

> TAMSIN MUTUAL · POLICY CP 20-66114 · DELACROIX HARDWARE
> Building: $190,000        Contents: $60,000
> Mortgagee / loss payee: NORTHSHORE SAVINGS

Marie watches you read it. “The building money goes to the bank first,” she says. “We owe them more than that. He hasn’t even called the insurance. He doesn’t want to hear it.”`,
          clues: ['pete_insurance'],
        },
        {
          id: 'can-early',
          label: 'Ask about the gas can',
          if: 'can_found & !can_sticker',
          text: `“Red Surefill, yellow spout?” Pete shrugs. “I sell those. Sold. So does every hardware store and half the gas stations in the county.” He looks at you. “Lowry thinks it’s mine. Find out if it’s mine. Then ask me.”`,
        },
        {
          id: 'can-late',
          label: 'Ask about the gas can',
          if: 'can_sticker',
          text: `You read him the lab’s note: *DELACROIX HDW · $24.99 · 9-25.*

Pete closes his eyes. “That’s my sticker. My dad dated every sticker with the day the stock came in, so you’d know what was sitting. I still do it.” He opens them. “Nine twenty-five was the last truck I got. The distributor had me on cash by then, so I bought singles. There was one Surefill on that truck. One.”

“And it sold?”

“A couple weeks later. I don’t know who to. The slips were in the store.”

Marie sets down her mug. “Unless it went on account,” she says.`,
          clues: ['one_can'],
        },
        {
          label: 'Ask who bought the last one',
          if: 'one_can',
          text: `Marie goes to the kitchen, slowly, and comes back with a green clothbound ledger.

“The store keeps a carbon book at the register,” she says. “I copy it in here every Sunday night and send the statements on the first. It’s something I can do from the couch.” She turns pages with a licked thumb. Then she stops, and turns the book around.

> OCT
> 10/2  OCAMPO  furnace filter 16x25   1 ea    8.49  on acct
> 10/7  LUSK    Surefill 5 gal can     1 ea   24.99  on acct
> 10/7  LUSK    mop heads              2 ea   13.98  on acct

Pete reads it over her shoulder, and sits down hard.

“Gary,” he says. “Gary doesn’t own anything that takes gas.”

“He hasn’t paid his account since August,” Marie says. “You said leave it. You said Gary’s having a hard time too.”`,
          clues: ['ledger'],
        },
        {
          label: 'Tell Pete what Gary said about him',
          if: 'gary_called',
          text: `Pete stares at you. “I never said that.”

“You didn’t,” Marie says from the couch. “Gary did. At the block party, about the laundromat. You came home and told me. You said, ‘Gary shouldn’t talk like that, somebody’ll take him serious.’”

Pete sits down on the arm of the couch. “He said it and laughed,” he says. “I told him don’t talk like that.”`,
        },
        {
          label: 'Tell them what you’ve found',
          if: 'ledger & (buzzer | truck_sunday | gary_walter | lowry_convinced)',
          text: `You tell them what you can. Pete listens to it standing up, and then he isn’t standing anymore.

“Walter was up there,” he says. “Walter was up there, and Gary — ” He doesn’t finish.

Marie reaches over and takes his hand, the way you’d take the hand of someone about to step off a curb.

“Pete,” she says. “Call the insurance.”`,
        },
      ],
    },

    abernathy: {
      title: 'Mercy General',
      text: `Walter Abernathy is in a double room on the fourth floor of Mercy General, by the window, with oxygen in his nose and the news on mute. He is a big man gone thin, with a cook’s forearms; the backs of his hands are freckled with old burn scars. When you show him your badge, he doesn’t look at it.

“Did anybody find my cat?” His voice is a rasp. “Gray. One white foot. Her name is Pearl. She went over the fireman’s shoulder and that was the last I saw of her.”

A nurse in the doorway holds up ten fingers at you, then thinks about it and makes it five.`,
      again: `[if time >= 8]Walter’s daughter, Diane, has driven down from Milwaukee and is sitting by the bed with her coat still on. She looks at you as though you might be one more person who is going to upset her father. [/if]Walter lifts a hand off the blanket. [if yolanda_cat]“Tell me about Pearl again,” he says.[else]“Anything on my cat?”[/if]`,
      choices: [
        {
          label: 'Ask what he heard last night',
          text: `He closes his eyes to get it right.

“Gary’s back door has a buzzer. After he locks up, it goes off when the door opens, and it sits right under my bed. Nine years I’ve slept over it. Every night at ten: buzz, that’s Gary going home. That’s how I know it’s ten.”

“And last night?”

“Ten o’clock, like always. Then I was asleep. Then it went again. I looked at the clock: 2:55. Then again, a minute later, maybe two.” He opens his eyes. “Twenty-six years in the galley on the ore boats. You learn to sleep through the engine and wake up for a dropped spoon. I lay there thinking, who’s in Gary’s at three in the morning? Then I smelled the smoke.”`,
          clues: ['buzzer'],
        },
        {
          label: 'Ask who has keys to Gary’s back door',
          if: 'buzzer',
          text: `“Gary. Just Gary.” Walter doesn’t have to think about it. “There was a boy, Luis, who opened up mornings. Gary let him go last year. Couldn’t afford him. Luis used to bring me the paper.”`,
          clues: ['back_key'],
        },
        {
          label: 'Ask why he came home early',
          text: `“I was supposed to be at my daughter’s in Milwaukee till Sunday. Diane has a guest room with a television the size of a garage door.” He almost smiles. “I lasted two nights. I missed the cat. I got the bus Monday afternoon and came up my own stairs at twenty to ten. I didn’t tell anybody. Who would I tell?”

He coughs for a while. “Diane is very angry with me. She’s driving down now to be angry in person.”`,
          clues: ['walter_home'],
        },
        {
          label: 'Ask about Gary Lusk',
          text: `“Gary’s all right. Keeps the heat on. Nine years, the only thing he ever asked me about was the rent.” He frowns at the ceiling. “Last week he asked me twice when I was leaving for Diane’s. Tuesday, and then again Thursday: when are you going, when are you back. He wrote it on the back of his hand with a pen.”

A cough takes him, and he waits it out. “I thought he was going to fix my kitchen faucet while I was gone. Surprise me. That’s what I thought.”`,
          clues: ['gary_asked'],
        },
        {
          label: 'Ask who has been feeding Pearl',
          text: `“Yolanda Pierce, across the alley. She has my spare key.” He shifts on the pillow. “She’s up all night anyway. She says it gives her somewhere to go.”`,
          set: ['walter_yolanda'],
        },
        {
          label: 'Ask about Pete Delacroix',
          text: `“Pete carries my light bulbs up so I don’t have to stand on a chair.” He lowers his voice, as though Pete might be out in the hall. “His wife’s sick. He doesn’t say so. But I see him help her into the car on Thursdays, and she wears a hat indoors now.”

He shakes his head on the pillow. “Pete Delacroix wouldn’t strike a match without asking whose it was.”`,
        },
        {
          label: 'Tell him Pearl is safe',
          if: 'yolanda_cat',
          text: `You tell him: gray, one white foot, singed whiskers, asleep in a laundry basket on Yolanda Pierce’s porch.

Walter turns his face to the window, and for a while he doesn’t say anything.

“She went to Yolanda’s,” he says at last. “Of course she did. Yolanda feeds her better than I do.” He wipes his eyes with the heel of his hand, carefully, around the oxygen. “Tell her the salmon, not the chicken. Pearl won’t eat the chicken.”`,
        },
      ],
    },

    yolanda: {
      title: 'Yolanda Pierce',
      text: `Yolanda Pierce’s back porch is on the second floor of a two-flat on Holt Street, straight across the alley from the burned stores. There’s a folding chair, a space heater on an orange extension cord, a thermos, and a laundry basket lined with a towel. In the basket a gray cat with one white foot is asleep, her whiskers singed into little curls.

Yolanda is in her sixties, in a quilted coat over a bathrobe, with reading glasses pushed up into her gray hair. [if yolanda_seen]“I saw you down there,” she says. “Poking around. You took your time coming up.”[else]“Walter sent you,” she says. “Good. Sit. Mind the cat.”[/if]`,
      again: `Yolanda is still on the porch, [if hour >= 17]under the porch light, [/if]with Pearl in her lap. “Twice in one day,” she says. “People will talk.”`,
      choices: [
        {
          label: 'Ask about last night',
          text: `“I slept.” She says it like a confession. “Thirty years of nights at the sorting center on Harbor Road, and I retire, and now I sleep two nights a week if I’m lucky. Monday was one of them. Of course it was.”

The sirens woke her at twenty past three. She went down to Carver in her slippers and watched the ladder go up to Walter’s front window and come down with Walter on it.

“I didn’t know he was home,” she says. “Nobody knew. I fed Pearl at eight Monday night, and his place was dark as a drawer.”`,
        },
        {
          label: 'Ask whether she’s noticed anything in the alley',
          text: `“Sunday.” She doesn’t have to think about it. “Sunday I was up. Eleven o’clock, a box truck backs down the alley with no lights on. A rental, white, with a blue sailboat on the side and LAKESHORE in big letters. It stops at Gary’s back door.”

She points with her mug. “A big young fellow in a knit cap, and another one running the lift. Gary held the door and a flashlight and told them where to push. They brought out four washers on a dolly, the big new ones from the back row. I know those machines, I do my sheets there.” She shrugs. “Half an hour, and gone. I thought, good for Gary, he’s finally getting something fixed. Monday there was a sign up: out for repair.”`,
          clues: ['truck_sunday'],
          set: ['repair_sign'],
        },
        {
          label: 'Ask about the cat in the basket',
          text: `“That’s Pearl. Walter’s. I’ve been feeding her while he was away.” Yolanda looks down at the basket. “She came up my stairs at six this morning smelling like a campfire and cried at the door till I let her in. She’s eaten twice. She won’t eat the chicken.”

[if @abernathy]“You tell Walter she’s fine,” she says. “Tell him she’s mad at him.”[else]“Somebody ought to tell Walter,” she says. “The hospital won’t put me through. I’m not family.”[/if]`,
          set: ['yolanda_cat'],
        },
        {
          label: 'Ask about Gary Lusk',
          text: `“Gary’s a worrier.” Yolanda sips. “That place used to be full on a Saturday, you couldn’t get a dryer. Then the SpinCity opened on Dunmore, with the televisions and the free Wi-Fi, and now it’s me and three college kids.”

She sniffs. “Last winter he was going around turning off half the dryers to save on the gas bill. I told him, Gary, people can see you doing that.”`,
        },
      ],
    },

    curtis: {
      title: 'Curtis Webb',
      text: `Curtis Webb and Jada Price live over a nail salon on Ferris Street, up a staircase that smells of acetone. Curtis opens the door on the chain. He’s twenty-four and skinny, in a Blue Herons hoodie, and he has been expecting somebody.

“I know what this is,” he says through the gap. “Pete told you what I said.”

From inside, a woman’s voice: “Curtis. Let them in or shut the door, it’s cold.”

He lets you in. Jada Price is at the kitchen table with a textbook and a yellow highlighter. A black work vest from Calder Downs hangs on the back of her chair.`,
      again: `Jada lets you in this time. Curtis is on the couch with his hood up. [if curtis_pushed]“Well?” he says.[else]“What now?”[/if]`,
      choices: [
        {
          label: 'Ask where he was last night',
          text: `“Picked Jada up at the Downs at one. She gets off at one.” He’s talking fast. “Gas light’s been on since Saturday, okay, I know. It died on Carver, right by the tire place. We pushed it. Like two blocks. Into the Speedy Mart.”

“I pushed,” Jada says, without looking up. “In work shoes.”

“We filled it up and came home. Home by two. That’s it. I bought gas for my *car*. That’s not a crime.”

Jada caps her highlighter. “He was here the rest of the night. He snores. I’d know.”`,
          clues: ['curtis_story'],
        },
        {
          label: 'Ask about what he yelled at the store',
          if: 'curtis_threat',
          text: `Curtis looks at the floor.

“I took it,” he says. “The two hundred. Rent was short, and Jada was already covering — I was going to put it back Friday. He counted the drawer Thursday.” He shrugs, hard. “And yeah, I said it. ‘This dump should burn.’ I was mad. You say stuff. I worked there eight months. I *liked* it there.”

Jada doesn’t look up from her book, but she stops highlighting.`,
        },
        {
          label: 'Ask about Pete',
          text: `“Pete’s all right.” Curtis says it grudgingly, and then less grudgingly. “He hired me with my record when nobody would. He’d leave me alone in the store Thursday mornings so he could take his wife somewhere.”

He stops. “That’s when I took it. When he left me alone. When he trusted me.”

Jada looks at him for a long moment, and he doesn’t look back.`,
        },
        {
          label: 'Tell him the camera clears him',
          if: 'curtis_pushed',
          text: `You tell him about the pump camera: the two of them pushing the Civic in, the nozzle, no can.

Curtis sits down on the couch as though someone had cut a string. For a while he doesn’t say anything.

“Is Pete okay?” he says finally. “Tell him — no. I’ll tell him.”

“You’ll pay him back,” Jada says, “is what you’ll do.”`,
        },
      ],
    },

    speedy: {
      title: 'Speedy Mart',
      text: `The Speedy Mart is four blocks up Carver at Holt: six pumps, a car wash that’s been broken since summer, and a day manager named Amrit who has already heard from the Fire Marshal. “He wanted my password at six in the morning,” Amrit says. “I was asleep. I have the password now.”

The pump cameras are good ones. You run pump three from half past one.

At 1:47 a silver Civic rolls into the frame with its lights off and no one in the driver’s seat. Pushing it are a skinny young man in a hoodie, steering through the open door, and a young woman in a black vest and work shoes who stops twice to yell at him. At 1:50 he swipes a card and fills the car’s tank. There’s no can. There’s nothing in his hands but the nozzle.

The woman goes inside and comes out with two coffees. At 1:54 the Civic pulls out with its lights on.`,
      clues: ['curtis_pushed'],
      choices: [
        {
          label: 'Keep watching until the fire',
          cost: 0.5,
          text: `You run it at eight times speed. A man buys cigarettes at 2:20. A raccoon inspects the trash can at 2:41. At 3:16 the first engine goes south down Carver with everything on, and at 3:19 the second. Nobody walks past on foot. Nobody fills a can.

At 3:52 a cab stops for coffee. The driver stands at the counter pointing south and talking with both hands, and Amrit says that was the man who called it in.`,
        },
      ],
    },

    harborline: {
      title: 'Harborline Development',
      text: `Harborline Development’s site office is a white trailer on the corner lot at 1830 Carver, where the Rialto bakery stood until Harborline bought it and knocked it down. Nora Kessling is inside with a phone at each ear, a hard hat pushed back on her head, and a carry-on suitcase by the door with an airline tag on the handle.

She hangs up on both phones. “You’re police. Good. I’ve had the alderman, two reporters and my lender since nine, and none of them could tell me anything.” She’s in her forties, sharp and quick, and not bothering to be charming. “I got off a plane at eight-forty and my block was on the front page.”`,
      again: `Nora Kessling is on the phone again. She holds up one finger, finishes, and hangs up. “Detective. What now?”`,
      choices: [
        {
          label: 'Ask about Harborline’s offer',
          text: `“We wanted both buildings. Eighteen-forty and eighteen-forty-two, one parcel. Seven hundred thousand for Pete’s, six-fifty for Gary’s.” She taps a site plan pinned to the trailer wall. “Either one alone is too narrow to build on. So it was both or nothing, and the board gave me until Friday. After that the money goes to a site in Lakeview and we build around them.”

“And now?”

She laughs, not happily. “Now I have a fire. Adjusters, a Fire Marshal’s seal, lawyers, and a lender who called me at the gate. And at nine this morning the alderman asked for a landmarks review of the whole block before anybody knocks anything down. Six months if I’m lucky.” She drops into her chair. “A fire is the worst thing that could have happened to my deal, Detective. Write that down.”`,
          clues: ['nora_meaning'],
        },
        {
          label: 'Ask about the voicemail',
          if: 'nora_voicemail',
          text: `She winces. “Sunday afternoon. I’d had a glass of wine and a bad call with my board.” She quotes herself without being asked: “‘You’re going to regret holding out.’”

She shrugs. “He is going to. The offer dies Friday, and that store loses money every month it stays open. I meant the price, Detective. I don’t do matches. I do spreadsheets.”`,
        },
        {
          label: 'Ask where she was last night',
          text: `“Toronto.” She turns her phone around: a boarding pass, Toronto to Port Calder, 7:05 this morning. “Dinner with our lender at seven, which went until eleven, because bankers love to talk about bankers. A hotel by the airport. I can have the bill emailed to you.”

She puts the phone face down on the desk. “I found out about the fire when I turned this on at the gate.”`,
          clues: ['nora_alibi'],
        },
        {
          label: 'Ask about Gary Lusk',
          text: `“Gary would have signed in August. He called me every week, some weeks twice.” She says it without affection. “Gary was the easy one. Twice he asked whether we’d take his building by itself. It’s thirty-two feet wide. Nobody builds on thirty-two feet. I told him no, both or nothing, and he said, ‘Then I’m stuck.’”

She shrugs. “I told him to work on Pete.”`,
          clues: ['gary_wanted_sell'],
        },
      ],
    },

    stbrigids: {
      title: 'St. Brigid’s Hospital',
      text: `St. Brigid’s emergency department at midday is a roofer holding his wrist, a toddler with a bead up his nose, and a television nobody is watching. The charge nurse is on the phone with the lab, then with a family, then with the lab again.

The security desk is easier. Visitor badges aren’t medical records, the guard says, and he turns the log around for you.

> ST. BRIGID’S ED · VISITOR LOG · MON–TUE
> 23:42  BADGE V-114  DELACROIX, PETER   BAY 9
> 04:55  BADGE V-114  RETURNED

“The doors to the back only open with a badge,” he adds. “Anybody who steps out for a smoke has to badge back in, and it shows up right here. He didn’t.”`,
      clues: ['er_confirmed'],
      choices: [
        {
          label: 'Wait for the charge nurse',
          cost: 0.5,
          text: `It takes a while. Dee Feeney worked last night and is working today, because two people called in sick, and she talks to you while she walks.

“Bay 9? Mr. Delacroix. He never left her. I brought him coffee at three because he looked like he needed it, and he fell asleep sitting up with his hand through the bed rail.” She signs something on a clipboard without breaking stride. “That’s the third time they’ve been in since August. Somebody should tell that man he’s allowed to go home and sleep.”`,
        },
      ],
    },

    theo: {
      title: 'Theo Marsh',
      text: `Theo Marsh has the basement records office to himself: two monitors, a space heater and a bag of pretzels the size of a pillow. “Carver Avenue!” he says, before you’ve sat down. “I saw it on the news. What do you need?”`,
      again: `Theo spins his chair around. “Back for more?”`,
      choices: [
        {
          label: 'Ask about the laundromat’s money',
          cost: 0.5,
          text: `Theo types while he talks. “Gary Lusk owns 1842 Carver outright, which is the good news. The bad news: two years behind on property taxes, eighteen thousand four hundred. A water shutoff notice in June, paid late.”

He taps the screen. “Here’s the one I like. Laundromats live on water. City water records: his usage is down forty-one percent in two years. The SpinCity on Dunmore opened two years ago this month.” He crunches a pretzel. “He isn’t washing half the clothes he used to.”`,
          clues: ['gary_broke'],
        },
        {
          label: 'Ask about Pete’s money',
          cost: 0.5,
          text: `“Northshore Savings recorded a notice of default on 1840 Carver on October 15th. Three payments missed: August, September, October.” Theo scrolls. “And a collections judgment in September. St. Brigid’s Hospital against Peter and Marie Delacroix, fourteen thousand three hundred.”

He stops scrolling and looks at you. “That’s not a store problem. That’s somebody sick.”`,
        },
        {
          label: 'Ask him to trace the Lakeshore truck',
          if: 'truck_sunday',
          text: `“A white truck with a sailboat on it? That’s Lakeshore Truck & Storage, on Harbor Road. There’s only the one.” He’s already dialing. “They’ll say they need a subpoena and then they’ll tell me anyway. Give me an hour and a half.”`,
          timer: {
            in: 1.5,
            title: 'Theo Marsh',
            text: `Theo calls back, pleased with himself.

> LAKESHORE TRUCK & STORAGE · 2600 HARBOR RD
> Truck L-3318 (15-ft box) · Renter: LUSK, GARY
> Out: SUN 20:35 · In: MON 07:50
> Same account: storage unit 214 (10x15), from SUN.
> Three months paid in advance, cash.

“Same counter, same night,” Theo says. “He rented the truck and the unit in one go.”`,
            clues: ['truck_rental'],
          },
        },
        {
          label: 'Ask him to run Curtis Webb',
          if: 'curtis_threat | curtis_gas',
          text: `“Curtis Webb, twenty-four. Retail theft at nineteen, a phone charger from a drugstore, paid the fine. Nothing since. Lives on Ferris with a Jada Price, who works nights at Calder Downs. A silver ’09 Civic, and forty-one dollars in parking tickets.” Theo grins. “Not exactly a criminal mastermind.”`,
        },
        {
          label: 'Ask about Harborline Development',
          if: 'harborline_heard | nora_voicemail',
          text: `“Harborline has bought four parcels on the 1800 block of Carver in fourteen months: the old bakery, the shoe repair, the two-flat on the corner and a parking lot. Clean deals, all of them.” He pulls up a map. “The last two buildings on that end of the block are 1840 and 1842.” He shrugs. “Pete’s and Gary’s. The hole in the doughnut.”`,
        },
      ],
    },

    lab: {
      title: 'Crime lab',
      text: `The crime lab is two floors under police headquarters, and it smells of solvent and burned coffee. Dr. Anjali Rao is at a bench with a magnifier on an arm, doing something delicate to a scrap of cloth. She finishes before she looks up.

“Detective. What have you brought me?”`,
      again: `Dr. Rao looks up from her bench. “Detective. What else have you got?”`,
      choices: [
        {
          label: 'Hand her the gas can',
          if: 'can_found',
          text: `Dr. Rao turns the evidence bag under the light without opening it.

“Surefill, five gallon. The base slumped, but it didn’t burn through.” She tilts it. “It sat in a puddle from the hoses. Water protects things. There’s paper on the bottom, under the melt. A label.” She sets it down. “Three hours. I’ll send you what I find, and only what I find.”`,
          timer: {
            in: 3,
            title: 'Dr. Rao',
            text: `Dr. Rao’s report on the gas can:

> ITEM 1: Fuel can, red polyethylene, 5 gal. Surefill SF-5.
> Residue: gasoline.
> Base: paper price label, partly legible under infrared:
> “DELACROIX HDW · $24.99 · 9-25”
> Latent prints: none usable (surface melted).

Under it she has written, by hand: *The water saved the label. The heat took everything else.*`,
            clues: ['can_sticker'],
          },
        },
        {
          label: 'Hand her the camera recorder',
          if: 'dvr_taken',
          text: `Dr. Rao draws a finger through the soot on the recorder’s case and looks at it.

“Smoke and water on the outside. The inside may be fine.” She lifts the coiled cord off the top, looks at the clean plug, and then at you. “Two hours.”`,
          timer: {
            in: 2,
            title: 'Dr. Rao',
            text: `Dr. Rao on the laundromat’s camera recorder:

> ITEM 2: 8-channel DVR, Carver Coin Laundry.
> Exterior: soot, water. Interior: dry. Powers on normally.
> Event log, 11 months: no disk, fan or overheat faults.
> Last entry: SAT 22:14:07  POWER LOSS
> Footage ends SAT 22:14.

Her note: *Nothing wrong with it. Somebody pulled the plug.*`,
            clues: ['dvr_unplugged'],
          },
        },
        {
          label: 'Ask about the fire debris',
          text: `“Frank Lowry’s debris samples went to the state lab. They’ll come back gasoline in three weeks.” Dr. Rao doesn’t look up. “They always do. Nobody burns down a building with lemonade.”`,
        },
      ],
    },

    insurer: {
      title: 'Great Lakes Mutual',
      text: `Beth Haskins of Great Lakes Mutual’s special investigations unit picks up in her car. She was a sheriff’s deputy for twenty-two years before this, she tells you, so she knows what you can and can’t say, and she’d appreciate the same courtesy.

“Carver Coin Laundry,” she says. “I wondered when somebody from Port Calder PD would call. [if time >= 5]He filed his claim this afternoon, by the way. In person.[else]He hasn’t filed yet. He will.[/if]”`,
      again: `Beth Haskins picks up on the second ring. “Detective. Tell me something good.”`,
      set: ['beth_called'],
      choices: [
        {
          label: 'Ask about Gary’s coverage',
          text: `“He called his agent at 8:02 this morning to report the loss. Our system flagged it before he hung up, because five weeks ago he raised his limits. A lot. Building and contents both.” A turn signal ticks. “A fire five weeks after a big increase lands on my desk automatically.

“For the numbers and the paper, I need a written request from the DA’s office under the arson reporting act. Get me that, and you can have the whole file. I’d like you to have it.”`,
          clues: ['coverage_raised'],
          set: ['beth_request'],
        },
        {
          label: 'Ask whether he has filed a claim',
          if: 'time >= 5 & !claim_washers',
          text: `“Ten to three, in person, at our office on Garland Street. Building and contents, total loss.” Paper rustles. “He stapled the equipment schedule from his policy to the form and wrote ‘all destroyed’ across it. Sixteen washers. Four of them are Harwood forty-pound front-loaders, bought last year, eighty-four hundred apiece.” A pause. “I’ll be out Thursday to count them.”`,
          clues: ['claim_washers'],
        },
        {
          label: 'Tell her about the missing washers',
          if: 'truck_sunday | gary_repair | empty_spaces',
          text: `Beth is quiet on the line for a moment. You can hear her writing.

[if claim_washers]“Those four Harwoods are on his claim,” she says. “Destroyed in the fire, it says. Eighty-four hundred apiece.”[else]“When he files,” she says, “I’ll be looking for four Harwoods.”[/if] [if truck_rental]“And a storage unit on Harbor Road. Detective, if those machines are in unit 214, I will buy you lunch for a year. Get a warrant. I can’t.”[else]“Find me those machines, Detective, and I’ll buy you lunch for a year.”[/if]`,
        },
      ],
    },

    tricounty: {
      title: 'Tri-County Commercial Laundry',
      text: `Tri-County Commercial Laundry Service answers on the fourth ring. “Tri-County, this is Rhonda.” Behind her there’s a radio, and a man swearing at a dryer drum.

She looks up Carver Coin Laundry while you wait. “Lusk, 1842 Carver. We were out there a year ago March, a door lock on a dryer. That’s the last ticket.” Keys clack. “Nothing this month. Nothing Sunday. Hon, nobody here works Sundays. And we don’t haul washers anywhere. We fix them where they stand. That’s the whole business.”

A pause. “Who told you we had four of his machines?”`,
      clues: ['no_ticket'],
      choices: [
        {
          label: 'Ask what four new Harwoods are worth',
          text: `“The forty-pound front-loaders? Eight thousand, eighty-five hundred apiece, new.” Rhonda whistles. “Why? Somebody lose four?”`,
        },
      ],
    },

    pellegrino: {
      title: 'ADA Gus Pellegrino',
      text: `Assistant District Attorney Gus Pellegrino takes your call in a courthouse stairwell between hearings, and his voice echoes. “Carver Avenue,” he says. “Frank Lowry already has me at eleven tomorrow. Are you calling to help him or to ruin his morning?”`,
      again: `Gus picks up on the first ring. “Go.”`,
      choices: [
        {
          label: 'Ask him to request Great Lakes Mutual’s file',
          if: 'beth_request',
          text: `“The arson reporting act. Insurers have to hand over what they’ve got when we ask in writing, and nobody can sue them for it.” Keys clatter. “It’s a form letter. It’ll be in her inbox in ten minutes. Give her an hour.”`,
          timer: {
            in: 1,
            title: 'Beth Haskins',
            text: `Beth Haskins emails the file, with a note: *As promised. B.H.*

> GREAT LAKES MUTUAL · POLICY CPP-44-81920
> LUSK, GARY · dba CARVER COIN LAUNDRY · 1842 CARVER AVE
> Endorsement effective 9/23:
>   Building            $380,000  ->  $650,000
>   Business property    $85,000  ->  $160,000
>   Annual premium        $4,920  ->    $8,760
> Premium history: 3 of last 6 installments paid late.

[if nora_meaning]$650,000. You’ve heard that number today. It’s what Harborline offered Gary for his building.[/if]`,
            clues: ['coverage_file'],
          },
        },
        {
          id: 'warrant-yes',
          label: 'Ask for a warrant for unit 214',
          if: 'truck_rental & !storage_search & (claim_washers | no_ticket | empty_spaces)',
          text: `You give it to him in order: four washers out the back door into a Lakeshore truck on Sunday night, a storage unit rented at the same counter, [if no_ticket]a repair company that never saw them, [/if][if empty_spaces]four empty spaces with the water lines capped, [/if][if claim_washers]and a claim this afternoon that says they burned.[else]and a man telling everybody they were out for repair.[/if]

“That’s insurance fraud before it’s arson,” Gus says, “and I like it either way. Judge Moravec is in chambers. Give me forty minutes.”`,
          go: 'storage',
        },
        {
          id: 'warrant-no',
          label: 'Ask for a warrant for unit 214',
          if: 'truck_rental & !storage_search & !(claim_washers | no_ticket | empty_spaces)',
          text: `“He rented a truck and a storage unit,” Gus says. “Half of Port Calder has a storage unit. What’s in it that shouldn’t be, and why should a judge care? Bring me that.”`,
        },
      ],
    },

    storage: {
      title: 'Lakeshore Truck & Storage',
      text: `The warrant comes through. Lakeshore Truck & Storage is a long cinder-block building on Harbor Road with its rental trucks lined up out front, white, a blue sailboat on every one. The manager walks you down a corridor of orange roll-up doors to number 214 and cuts the padlock with bolt cutters. He seems to enjoy it.`,
      again: `The manager is waiting by unit 214 with his bolt cutters over his shoulder.`,
      choices: [
        {
          label: 'Open the unit',
          cost: 1,
          text: `The door rattles up.

Four washers stand in a row on pallets, shrink-wrapped: Harwood front-loaders, forty-pound, the stainless still bright under the plastic. [if claim_washers]You read the serial plates off against Beth Haskins’s copy of the claim. All four are on it, marked *destroyed*.[else]You photograph each serial plate for Great Lakes Mutual.[/if]

On top of the last one is a cardboard box. Inside, wrapped in a bath towel, are a framed dollar bill with *Carver Coin Laundry · first dollar · 1998* written on the mat, and an old photograph of a woman in cat-eye glasses standing in front of the laundromat on its opening day.

He saved the things he couldn’t replace. You stand there with that for a moment before you call it in.`,
          clues: ['storage_search'],
          go: 'board',
        },
      ],
    },
  },

  events: [
    {
      at: 2,
      title: 'Mercy General',
      text: `A nurse from Mercy General calls. Walter Abernathy is awake, off the mask and asking about his cat. “He can talk,” she says. “Ten minutes. Don’t make him laugh, it makes him cough.”`,
      set: ['walter_awake'],
    },
    {
      at: 5,
      if: 'beth_called',
      title: 'Beth Haskins',
      text: `Beth Haskins calls back. “He filed. Ten to three, in person, at our office on Garland Street. Building and contents, total loss.” Paper rustles. “He stapled the equipment schedule from his policy to the form and wrote ‘all destroyed’ across it. Sixteen washers. Four of them are Harwood forty-pound front-loaders, bought last year, eighty-four hundred apiece.”

A pause. “I’ll be out Thursday to count them.”`,
      clues: ['claim_washers'],
    },
    {
      at: 6.5,
      if: '@laundromat & !gary_walter',
      title: 'Gary Lusk',
      text: `Gary Lusk calls your cell. He’s outside somewhere; you can hear buses.

“Detective, it’s Gary. Gary Lusk. I didn’t want to say this this morning, Pete’s my neighbor. But at the block party in August, Pete had a couple of beers, and he said to me, ‘Some days I’d like to put a match to the whole place and walk away.’” A pause. “I figured he was joking. Now I don’t know. I just thought you should know.”`,
      set: ['gary_called'],
    },
    {
      at: 8,
      if: '!lowry_convinced',
      title: 'Frank Lowry',
      text: `Frank Lowry calls as the day shift goes home. “Courtesy call. Pete Delacroix comes in at nine tomorrow, and I see Pellegrino at eleven with the file.” He sounds as tired as he must be. “If you’ve got something else, Detective, now’s the time.”`,
    },
    {
      at: 8,
      if: 'lowry_convinced',
      title: 'Frank Lowry',
      text: `Frank Lowry calls as the day shift goes home. “I told Pete he doesn’t need to come in tomorrow. Told him myself, on his porch. His wife made me take a coffee cake.” A pause. “I’ll walk the Lusk file over to Pellegrino in the morning. Put my name next to yours.”`,
    },
  ],

  report: [
    {
      id: 'who',
      q: 'Who set the fire?',
      options: {
        gary: 'Gary Lusk, who owns the laundromat',
        pete: 'Pete Delacroix, who owns the hardware store',
        curtis: 'Curtis Webb, the clerk Pete fired',
        nora: 'Nora Kessling, or someone Harborline hired',
        stranger: 'Someone else, a stranger off the street',
      },
      answer: 'gary',
      points: 40,
      why: 'The can was the one Surefill on Pete’s last delivery, and Marie’s book puts it on Gary’s account. Gary had a key to Pete’s alley door, and Walter heard Gary’s back door at 2:55. Pete was at St. Brigid’s all night, Curtis was filling his car, and Nora was in Toronto.',
    },
    {
      id: 'target',
      q: 'Whose building was the fire really meant to destroy?',
      options: {
        laundromat: 'Gary’s laundromat, through the shared wall',
        hardware: 'Pete’s hardware store',
        scare: 'Neither: it was meant to scare Pete into selling',
      },
      answer: 'laundromat',
      points: 15,
      why: 'The gasoline ran along the shared wall and nowhere near Pete’s thinner and lamp oil, so the fire would climb the wall and go through it. The laundromat was the building whose coverage had just gone up and whose best machines had just gone out. Starting at Pete’s door was the frame.',
    },
    {
      id: 'motive',
      q: 'Why did he do it?',
      options: {
        insurance: 'To collect on the laundromat’s insurance',
        grudge: 'To get even with Pete for killing the Harborline sale',
        harborline: 'Harborline paid him to clear the block',
        mortgage: 'To get out from under a mortgage he couldn’t pay',
      },
      answer: 'insurance',
      points: 15,
      why: 'The laundromat had been losing money for two years, and Harborline wouldn’t buy it without Pete’s building. Five weeks before the fire Gary raised his coverage, the building to $650,000, Harborline’s price. The afternoon after the fire he filed a claim.',
    },
    {
      id: 'can',
      q: 'What ties Gary to the gas can?',
      options: {
        ledger: 'Marie Delacroix’s house-account book',
        sticker: 'The Delacroix price sticker on the can',
        prints: 'His fingerprints on the handle',
        witness: 'Yolanda Pierce saw him carry it',
      },
      answer: 'ledger',
      points: 15,
      why: 'The sticker only says the can came from Pete’s store. Its date says it was the one Surefill on the 9-25 delivery, and Marie’s book shows that can going on Gary’s account on 10/7. The store’s copy burned; hers was at home.',
    },
    {
      id: 'before',
      q: 'What did Gary take out of the laundromat before the fire?',
      options: {
        washers: 'His four newest washers',
        cash: 'The cash from the coin boxes',
        records: 'His books and records',
        nothing: 'Nothing. He lost everything.',
      },
      answer: 'washers',
      points: 15,
      why: 'Yolanda Pierce watched four washers go into a Lakeshore truck on Sunday night. Tri-County never had them, and the truck and a storage unit were rented in Gary’s name. His claim lists them as burned.',
    },
  ],

  outcomes: {
    gary: `Gary Lusk was charged on Wednesday afternoon with aggravated arson of an occupied building and with insurance fraud. Great Lakes Mutual denied his claim and took the four washers. He pleaded guilty in February, and asked his lawyer to pass a letter to Walter Abernathy. Walter didn’t open it.

Frank Lowry called Pete himself. Pete called his insurance company that Wednesday, because Marie made him, and the building money went to Northshore Savings, as she had said it would. In the spring Harborline bought both lots, Pete’s from Pete and Gary’s from his bankruptcy trustee, for less than they had offered in October. It was enough to pay the bank and St. Brigid’s. Marie finished her chemo in January. Walter spent the winter in Milwaukee, in Diane’s guest room, and took Pearl.`,
    pete: `Pete Delacroix was brought in at nine on Wednesday morning, as Frank Lowry had planned, and charged at noon. His legal aid lawyer had St. Brigid’s visitor log by Thursday: badge in at 11:42 p.m., badge out at 4:55 a.m., and a charge nurse who had brought him coffee at three. The charge was dropped the next week. By then the whole block knew about Marie, which was the one thing she had asked for. In March, Beth Haskins of Great Lakes Mutual found four washers in a storage unit on Harbor Road, and the case came back to your desk with a note from Lieutenant Okafor that said only: *Chain.*`,
    curtis: `Curtis Webb was arrested at the apartment on Ferris Street, in front of Jada. His public defender had the Speedy Mart footage the next morning: two people pushing a dead Civic up to pump three, and a young man filling its tank. The charge was dropped. Frank Lowry went back to Pete Delacroix, which was where he had wanted to be all along, and it took a hospital visitor log to stop him. Gary Lusk’s claim sat on Beth Haskins’s desk, unpaid, into the spring.`,
    nora: `Your report named Nora Kessling. Harborline’s lawyers sent Lieutenant Okafor a boarding pass, a Toronto hotel bill and a letter explaining in some detail why a fire was the worst thing that could have happened to their deal. Nothing tied Nora to Carver Avenue but a voicemail. Frank Lowry charged Pete Delacroix instead, and it took St. Brigid’s records to undo it.`,
    default: `Your report blamed a stranger. Lieutenant Okafor asked how a stranger came to have a key to Pete’s alley door and a gas can off Pete’s shelf, and you didn’t have an answer. Frank Lowry charged Pete Delacroix on Wednesday morning. Gary Lusk went back to his squeegee and waited for Great Lakes Mutual to pay.`,
  },

  solution: {
    text: `Gary Lusk’s laundromat had been dying for two years, ever since the SpinCity opened on Dunmore. His water use was down by forty percent and his property taxes were two years behind. The one way out he could see was Harborline’s offer of $650,000 for his building. But Harborline wanted both buildings or neither, and Pete Delacroix wouldn’t sell.

So Gary found the money somewhere else. Five weeks before the fire he raised his coverage with Great Lakes Mutual, the building to $650,000, Harborline’s number. On October 7th he bought a Surefill gas can at Delacroix Hardware and put it on his house account, because a can off Pete’s shelf would look like Pete’s. It was the only Surefill on Pete’s last delivery.

Then he got ready. Last week he asked his tenant, Walter Abernathy, twice when he was leaving for his daughter’s and when he’d be back. On Saturday night he pulled the plug on his camera recorder, and later said it broke. On Sunday night he rented a truck and a storage unit on Harbor Road and, with two hired men, loaded his four newest washers out the back door while Yolanda Pierce watched from her porch. On Monday he put up a sign: out for repair.

At 2:55 on Tuesday morning he let himself in the laundromat’s back door to get the can, and never thought about the buzzer. He opened Pete’s alley door with the spare key the two men had swapped in 2009, poured gasoline along the base of the wall the buildings share, and lit it from the doorway at about 3:10. He left the can in the alley for the Fire Marshal to find. The fire was meant to climb that wall and take his own building with it, and it very nearly did.

He didn’t know Walter was home. Walter had missed his cat and taken the Monday bus back from Milwaukee, and the ladder company carried him down at 3:24. That afternoon Gary filed a claim that listed the four hidden washers as destroyed.

Pete Delacroix was at St. Brigid’s all night with his wife, Marie, who is in chemotherapy. He lied to Lowry about where he was because she didn’t want the block to know, and her illness is where the money went. His store was underinsured, and any payout goes to the bank. Curtis Webb, who said the store should burn, bought gas at 1:50 because his car had run dry, and the Speedy Mart camera shows him filling its tank. Nora Kessling was in Toronto, and she meant that Pete would regret the price. The fire was the worst thing that could have happened to her deal.

The can gave Gary away. The store’s copy of the house accounts burned. Marie’s didn’t.`,
    chain: ['pour_trail', 'door_key', 'gary_key', 'pete_er', 'can_sticker', 'one_can', 'ledger', 'buzzer', 'gary_asked', 'truck_sunday', 'coverage_raised'],
    walk: [
      '@scene', 'Ask how the fire', 'Ask about the alley', 'Ask about the gas', 'Ask about the laundromat',
      '@lab', 'Hand her the gas',
      '@delacroix', 'Ask Marie', 'Ask who has keys',
      '@abernathy', 'Ask what he heard', 'Ask about Gary', 'Ask who has been',
      '@yolanda', 'Ask whether',
      '@insurer', 'Ask about Gary',
      '@delacroix', 'Ask about the gas can', 'Ask who bought',
    ],
  },
};
