// Case 4. A missing man who isn't lost: the paper that put his nephew in charge of his money says he
// stood in front of a notary on a day the hospital says he couldn't stand at all.

export default {
  id: 'power-of-attorney',
  n: 4,
  title: 'Power of Attorney',
  crime: 'Missing person',
  difficulty: 2,
  summary: 'A retired chemistry teacher hasn’t been seen in nine days. His nephew, who holds his power of attorney, says he’s staying with a friend upstate. His neighbor says he doesn’t have one.',
  days: ['Sunday', 'Monday', 'Tuesday'],
  start: { day: 1, hour: 9 },
  hours: 14,

  briefing: `Lieutenant Ruth Okafor hands you a folder with one sheet in it.

“A welfare check that turned into a missing person,” she says.

> MISSING PERSON 26-13052 · 1416 ALDER ST · KESSLER PARK
> Reported 7:52 a.m. Monday by Dorothy Villanueva, 74, neighbor.
> Harold W. Beck, 81, retired teacher, lives alone.
> Not seen since the morning of Saturday, October 4.
> 2004 Buick LeSabre, gold, not at residence.
> Phone to voicemail. Mail accumulating.
> Nephew Kevin Beck (holds power of attorney) says he is
> “staying with a friend upstate.” Reporting party disputes.

“Mrs. Villanueva says Harold Beck has no friends upstate and has never once missed their Sunday crossword. He’s missed two.” Okafor lets that sit. “He’s eighty-one, and he’s been gone nine days. Find him. If something’s wrong, find that too. Report on my desk by eleven tomorrow, {det}.”`,

  people: {
    dot: { name: 'Dot Villanueva', role: 'Harold’s next-door neighbor', about: '74. Thirty years in the county clerk’s office, now retired. Has lived next door to Harold for twenty-six years and does the Sunday crossword with him. Reported him missing.' },
    harold: { name: 'Harold Beck', role: 'Missing', about: '81. Taught chemistry at Kessler High for thirty-one years. His wife, June, died three years ago. Lives alone at 1416 Alder Street with a cat named Bunsen.' },
    kevin: { name: 'Kevin Beck', role: 'Harold’s nephew', about: '44. Real-estate agent, Beck Realty Group. Harold’s only family. Holds a power of attorney over Harold’s money.' },
    rosa: { name: 'Rosa Delgado', role: 'Owner, Delgado’s Bakery', about: '52. One of Harold’s old chemistry students. Runs a bakery on Lake Street in Lakeview.', if: 'rosa_card | @bakery | buick_ticket | skaggs_lakeview | kevin_at_bakery' },
    sheila: { name: 'Sheila Kraft', role: 'Notary, Ship & Sign', about: 'Runs a shipping and notary shop on Dunmore Street. Her stamp is on Harold’s power of attorney.', if: 'poa_copy | sheila_kevin' },
    aaron: { name: 'Aaron Feld', role: 'Fraud officer, Northshore Savings', about: 'Fraud and security officer at the Kessler Park branch, where Harold banks. Careful, and worried.', if: '@bank' },
    osei: { name: 'Dr. Miriam Osei', role: 'Harold’s geriatrician', about: 'Runs Kessler Park Geriatrics on College Street. Harold likes her because she doesn’t shout at him.', if: 'osei_known | petition | maple_letter' },
    paula: { name: 'Paula Grant', role: 'Admissions director, Maple Crest', about: 'Fills the beds at Maple Crest Memory Care, a locked facility on the lake in Lakeview.', if: '@maplecrest' },
    skaggs: { name: 'Donnie Skaggs', role: 'Private investigator', about: 'One-man agency over a nail salon on Carver Avenue. Serves papers and finds people who owe money. Cheap.', if: 'skaggs_known | skaggs_hired' },
  },

  clues: {
    last_seen: { title: 'Last seen October 4', text: 'Dot Villanueva last saw Harold on the morning of Saturday, October 4, in his driveway. She is vague about the rest.', who: ['dot', 'harold'] },
    kevin_upstate: { title: 'Kevin’s story to Dot', text: 'On October 8 Kevin told Dot that Harold had gone to stay with a friend upstate, and brushed her off when she asked which friend. Two days earlier he had been pounding on Harold’s door.', who: ['kevin', 'dot'] },
    hip_march: { title: 'A new hip in March', text: 'Harold had his hip replaced at Mercy General in March and spent about a week in the hospital.', who: ['harold'] },
    skaggs_plate: { title: 'A man in a gray Hyundai', text: 'Sunday afternoon a man with a big mustache sat outside Harold’s house for three hours, then asked the neighbors where Harold goes and who visits him. Dot wrote down his plate.', who: ['dot'], at: 'Sun 13:30' },
    shouting: { title: 'Shouting next door', text: 'On the night of September 30 Dot heard Kevin and Harold arguing. Kevin said “for your own good,” twice. Harold told him to get out of his house.', who: ['kevin', 'harold', 'dot'] },
    dot_goodbye: { title: 'Harold’s goodbye', text: 'Harold left on his own on October 4. He gave Dot the cat and said, “If Kevin asks, you haven’t seen me.” He told her Kevin meant to put him in a home. Dot thinks he went to a former student who has a bakery in Lakeview.', who: ['harold', 'dot', 'kevin'] },
    left_on_purpose: { title: 'He packed', text: 'No sign of a struggle at 1416 Alder. A suitcase, his toiletries, his pill organizer and his cane are gone, and the bed is made.', who: ['harold'] },
    seen_leaving: { title: 'He left whistling', text: 'Early on October 4 a neighbor saw Harold load a suitcase into the Buick by himself, whistling. Nobody else was with him.', who: ['harold'] },
    rosa_card: { title: 'A card from Rosa Delgado', text: 'On Harold’s mantel, a Christmas card from Rosa of Delgado’s Bakery, 214 Lake Street, Lakeview, signed “your favorite lab disaster.”', who: ['rosa', 'harold'] },
    maple_packet: { title: 'Welcome to Maple Crest', text: 'A welcome packet from Maple Crest Memory Care, postmarked October 3, came for Harold after he left. It gives his move-in date as Monday, October 6, and promises that the doors are secured.', who: ['harold'] },
    in_hospital: { title: 'At Mercy General, March 12–18', text: 'Harold was an inpatient at Mercy General from March 12 to March 18. His hip was replaced on March 13, and he couldn’t walk without help.', who: ['harold'] },
    freezer_note: { title: '“I NEVER SIGNED THIS”', text: 'Hidden in Harold’s freezer: copies of his bank papers, with “I NEVER SIGNED THIS — H.B.” written across the power of attorney, and a note: “9/29, A. Feld, Northshore. Fraud claim.”', who: ['harold', 'aaron'] },
    statement: { title: 'Where the savings went', text: 'Harold’s savings fell from $212,406 in March to $9,012 in September, in fourteen transfers to Beck Realty Group LLC. A $190,000 home equity line opened on his house in April is fully drawn.', who: ['harold', 'kevin'] },
    poa_copy: { title: 'The power of attorney', text: 'A durable financial power of attorney naming Kevin as Harold’s agent, dated March 14. It was notarized at Ship & Sign on Dunmore Street by Sheila Kraft, who certifies that Harold “personally appeared” before her.', who: ['kevin', 'sheila', 'harold'] },
    kevin_story: { title: 'Kevin’s shifting story', text: 'Kevin said Harold was upstate with a friend named Stan, but couldn’t say Stan who. Then he said Harold has dementia and wandered off, that Dr. Osei had written a letter, and that a bed was waiting at Maple Crest.', who: ['kevin'] },
    cash_4000: { title: '$4,000 in cash', text: 'On October 3, the day before he left, Harold withdrew $4,000 in cash from Northshore Savings.', who: ['harold'] },
    skaggs_hired: { title: 'Kevin hired a PI', text: 'Kevin is paying Donnie Skaggs, a private investigator, $65 an hour to find Harold.', who: ['kevin', 'skaggs'] },
    kevin_debts: { title: 'Kevin’s flip went bad', text: 'Beck Realty Group bought 12 Overlook Drive for $610,000 on a hard-money loan. The lender filed to foreclose in March; in May, Kevin paid $186,000 to stop it. There are still $140,000 in contractors’ liens on the house.', who: ['kevin'] },
    buick_ticket: { title: 'A ticket in Lakeview', text: 'Harold’s Buick was ticketed at 6:52 a.m. on Thursday, October 9, in the loading zone at 214 Lake Street, Lakeview. That’s Delgado’s Bakery.', who: ['harold'] },
    library_card: { title: 'Library books in Lakeview', text: 'Harold’s phone has been off since 8:12 a.m. on October 4. On Friday his library card checked out two books at the Lakeview branch.', who: ['harold'] },
    sheila_kevin: { title: 'Sheila is Kevin’s girlfriend', text: 'Sheila Kraft, the notary who stamped Harold’s power of attorney, is Kevin Beck’s girlfriend.', who: ['sheila', 'kevin'] },
    aaron_met_harold: { title: 'Harold went to the bank', text: 'On September 29 Harold brought his statement to Northshore Savings and said he never signed a power of attorney. Aaron Feld found him sharp and certain, opened a fraud claim and stopped the bank from honoring the POA.', who: ['aaron', 'harold'] },
    bank_records: { title: 'Northshore’s records', text: 'Acting under the POA, Kevin sent Harold’s statements to his own office on April 2, opened the $190,000 home equity line on April 21, and moved $203,393 of Harold’s savings to Beck Realty Group. The only withdrawal Harold made himself was $4,000 in cash, in person, on October 3.', who: ['kevin', 'harold', 'aaron'] },
    journal_entry: { title: 'The notary journal', text: 'Sheila Kraft’s journal records Harold Beck appearing at 4:40 p.m. on March 14 to sign a power of attorney, identified by his driver’s license. The signature is big and shaky. There’s a thumbprint.', who: ['sheila', 'harold'] },
    sheila_confesses: { title: 'Sheila never saw Harold', text: 'Harold never came into Ship & Sign. Kevin brought the power of attorney already signed, with Harold’s driver’s license, and said Harold was waiting in the car. Sheila didn’t check. Kevin pressed the thumbprint.', who: ['sheila', 'kevin'] },
    osei_screen: { title: 'Twenty-eight out of thirty', text: 'In August Dr. Osei gave Harold a standard cognitive screen. He scored 28 out of 30.', who: ['osei', 'harold'] },
    kevin_asked_osei: { title: 'Kevin wanted a letter', text: 'In early September Kevin asked Dr. Osei for a letter “documenting his uncle’s decline.” She told him there was no decline to document.', who: ['kevin', 'osei'] },
    osei_denies: { title: 'Dr. Osei didn’t write it', text: 'Dr. Osei never wrote the dementia letter. It’s on letterhead from an office suite she left last year, and she has never signed her name that way.', who: ['osei', 'kevin'] },
    maple_app: { title: 'The Maple Crest application', text: 'Kevin toured Maple Crest on September 12 and applied on September 22, listing advanced dementia. A room was held for October 6. He planned to pay from the sale of Harold’s house.', who: ['kevin', 'paula'] },
    maple_letter: { title: 'A letter from “Dr. Osei”', text: 'Kevin’s Maple Crest application included a letter dated September 19, signed as Dr. Miriam A. Osei, saying Harold has advanced vascular dementia and can’t manage his affairs.', who: ['kevin', 'osei', 'paula'] },
    rosa_lying: { title: 'A gold Buick under a tarp', text: 'Harold’s gold Buick is under a tarp behind Delgado’s Bakery, and Sunday’s crossword is on Rosa’s counter, done in ink in small capitals.', who: ['rosa', 'harold'] },
    harold_found: { title: 'Harold is safe', text: 'Harold Beck is alive, well and entirely himself, living in Rosa Delgado’s spare room above the bakery. He came on his own.', who: ['harold', 'rosa'] },
    harold_story: { title: 'Why Harold ran', text: 'When Harold confronted him about the money, Kevin said he was “getting confused” and that he had a place for him at Maple Crest, “for his own good.” Harold believed he could make it happen, and ran.', who: ['harold', 'kevin'] },
    cash_explained: { title: 'The $4,000', text: 'The $4,000 is Harold’s own living money. He took it out so Kevin couldn’t, and spends it on the bakery’s flour because Rosa won’t take rent.', who: ['harold', 'rosa'] },
    petition: { title: 'Guardianship petition', text: 'Kevin filed an emergency petition to be made Harold’s guardian. He swears Harold signed the POA in his presence on March 14 and now has dementia, and attaches the Osei letter. Hearing: Wednesday, 9 a.m.', who: ['kevin', 'harold'], at: 'Mon 15:10' },
    lab_result: { title: 'Not Harold’s hand', text: 'Dr. Rao: the signature in the notary journal wasn’t written by Harold Beck, and the thumbprint isn’t his.', who: ['harold', 'sheila'] },
    search_found: { title: 'The search of Beck Realty', text: 'In Kevin’s office: a legal pad with Harold’s signature practiced twenty-two times, Harold’s missing bank statements, and a file of Dr. Osei’s old letterhead.', who: ['kevin'] },
    kevin_at_bakery: { title: 'Kevin at the bakery', text: 'At 7:25 p.m. Monday Kevin pounded on the back door of Delgado’s Bakery, shouting for his uncle, until Rosa called 911. Lakeview police sent him home.', who: ['kevin', 'rosa'], at: 'Mon 19:25' },
    skaggs_lakeview: { title: 'Skaggs found him', text: 'By Monday morning Donnie Skaggs had traced Harold’s Buick to Delgado’s Bakery, 214 Lake Street, Lakeview. He was making sure before he told Kevin.', who: ['skaggs', 'kevin', 'rosa'], at: 'Mon 7:30' },
    kevin_caught: { title: 'Kevin blamed the notary', text: 'Told that Harold was in Mercy General on March 14, Kevin said he must have had a day pass, then that “Sheila” got the date wrong. Then he asked for a lawyer.', who: ['kevin', 'sheila'] },
  },

  leads: {
    dot: { title: 'Dot Villanueva', where: '1418 Alder St · Kessler Park', kind: 'person', cost: 1, again: 0.25 },
    house: { title: 'Harold Beck’s house', where: '1416 Alder St · Dot has a key', kind: 'place', cost: 0.5, again: 0.25, if: '@dot' },
    kevin: { title: 'Kevin Beck', where: 'Beck Realty Group · University Ave', kind: 'person', cost: 1, again: 0.5, until: 'kevin_lawyer', closed: 'Lawyered up' },
    theo: { title: 'Theo Marsh', where: 'Records · the basement, Garland St', kind: 'records', cost: 0.5, again: 0.25 },
    bank: { title: 'Northshore Savings', where: 'Kessler Park branch · fraud office', kind: 'place', cost: 1, again: 0.5, if: 'northshore | freezer_note | statement | poa_copy | cash_4000' },
    ada: { title: 'ADA Gus Pellegrino', where: 'District Attorney’s office · by phone', kind: 'phone', cost: 0.5, again: 0.25, if: 'need_subpoena | poa_copy' },
    shipsign: { title: 'Ship & Sign', where: '2380 Dunmore St · Northgate', kind: 'place', cost: 1, again: 0.5, if: 'poa_copy | sheila_kevin' },
    mercy: { title: 'Mercy General', where: 'Records office · dates of treatment', kind: 'records', cost: 1, if: 'hip_march', once: true, onceNote: 'Requested' },
    osei: { title: 'Dr. Miriam Osei', where: 'Kessler Park Geriatrics · College St', kind: 'person', cost: 1, again: 0.5, if: 'osei_known | petition | maple_letter' },
    maplecrest: { title: 'Maple Crest Memory Care', where: 'Shore Drive · Lakeview', kind: 'place', cost: 1.5, again: 1, if: 'maple_known | maple_packet | petition' },
    bakery: { title: 'Delgado’s Bakery', where: '214 Lake St · Lakeview', kind: 'place', cost: 1.5, again: 1, if: 'rosa_card | dot_goodbye | buick_ticket | skaggs_lakeview | kevin_at_bakery' },
    lab: { title: 'Crime lab', where: 'Dr. Anjali Rao · handwriting and prints', kind: 'lab', cost: 0.5, if: 'journal_entry', once: true, onceNote: 'Submitted' },
    skaggs: { title: 'Donnie Skaggs', where: 'Skaggs Investigations · Carver Ave', kind: 'person', cost: 1, again: 0.5, if: 'skaggs_known | skaggs_hired' },
  },

  scenes: {
    dot: {
      title: 'Dot Villanueva',
      text: `Dot Villanueva lives at 1418 Alder, in a yellow bungalow with a concrete goose on the porch dressed as a witch. She opens the door before you reach it, small and round and white-haired, and a large gray cat is trying to get past her ankles.

“Don’t let him out. That’s Bunsen. He’s Harold’s. He hates me.” She scoops him up, and he goes limp with contempt. “Come in. I made coffee cake, and nobody’s here to eat it.”

On her kitchen table is Sunday’s crossword, untouched, with a pencil laid across it.`,
      again: `Dot has the door open before you reach it. [if harold_found]“Well? Is he eating?”[else]“Well?” Bunsen glares at you from the top of the refrigerator.[/if]`,
      choices: [
        {
          label: 'Ask when she last saw Harold',
          text: `“Saturday before last. The fourth. In the morning.” She fusses with the cake knife. “He was in his driveway. He waved.”

“Did he say where he was going?”

“He *waved*.” She cuts you a slice the size of a brick and doesn’t look up. Dot Villanueva is, you suspect, the worst liar on Alder Street, and she knows it.`,
          clues: ['last_seen'],
        },
        {
          label: 'Ask about Harold',
          text: `“Thirty-one years teaching chemistry at Kessler High. June passed three years ago. After that it was the cat, the library and me.” Dot sits. “Sundays we do the crossword. He uses pen. I use pencil, so I can fix his mistakes.”

She counts on her fingers. “Healthy as a horse. Had the hip done at Mercy in March, and I drove him home, because Kevin had an open house. He sees Dr. Osei on College Street. He banks at the Northshore on University.” She sniffs. “He is not *confused*. He does the crossword in pen.”`,
          clues: ['hip_march'],
          set: ['osei_known', 'northshore'],
        },
        {
          label: 'Ask about Kevin',
          text: `“His brother’s boy.” Dot’s mouth goes thin. “Monday the sixth, Kevin was over there at eight in the morning, pounding on the door. Wednesday I asked where Harold was, and Kevin said, ‘He went to stay with a friend upstate, Dot.’ I said what friend. He said, ‘Don’t worry about it, sweetheart.’” She puts her cup down hard. “I’m seventy-four. I am not his sweetheart. And Harold doesn’t have friends upstate. Harold barely has friends downstate.”`,
          clues: ['kevin_upstate'],
        },
        {
          label: 'Ask why she called the police',
          text: `“Because he missed the crossword again on Sunday. That’s two.” She takes a pharmacy receipt off the refrigerator. “And because Sunday afternoon a man sat out front in a gray car for three hours, then went door to door asking about Harold. Where does he go, who comes to see him. Mustache like a push broom.”

On the back of the receipt, in firm capitals, is a license plate.

“Thirty years at the county clerk’s office,” Dot says. “I write things down.”`,
          clues: ['skaggs_plate'],
        },
        {
          label: 'Ask if anything happened before he left',
          text: `“The Tuesday before. The thirtieth. These walls are nothing.” She turns her cup by the handle. “Kevin said ‘for your own good.’ Twice. Then Harold said, ‘Get out of my house.’ Thirty-one years of teenagers, Detective, and Harold never once raised his voice. He raised it then.”`,
          clues: ['shouting'],
        },
        {
          label: 'Tell Dot you think she’s holding something back',
          if: '!dot_goodbye',
          text: `Dot lifts her chin. “I’m seventy-four. I’m holding back all kinds of things.”

Then, more quietly: “I want you to find him. I don’t want you to find him *for Kevin*. Kevin has a paper that says he’s in charge of Harold, and the police go by the paper.” She picks up the cat, who allows it. “Show me I’m wrong.”`,
        },
        {
          label: 'Tell Dot what Kevin has done',
          if: '!dot_goodbye & (freezer_note | statement | bank_records | osei_denies | sheila_confesses | (poa_copy & in_hospital) | petition)',
          text: `You tell her [if petition]that Kevin has asked a court to declare Harold incompetent, and [/if]what you’ve found. She listens without interrupting, which you gather is a first.

“I knew it, and he made me promise.” She takes a breath. “He came over that Saturday with a suitcase and the cat. He said Kevin was going to put him in a home with locked doors and tell everybody he’s senile. He said, ‘Dorothy, if Kevin asks, you haven’t seen me.’ Nobody calls me Dorothy but him.

“He didn’t say where. But every Christmas a girl he taught sends him pan dulce from her bakery out in Lakeview.” She wipes her eyes with the heel of her hand. “If you find him, tell him Dorothy says the crossword’s waiting. Then he’ll know you’re all right.”`,
          clues: ['dot_goodbye'],
          set: ['dot_message'],
        },
        {
          label: 'Tell Dot that Harold is safe',
          if: 'harold_found',
          text: `Dot sits down hard and, for once, says nothing at all.

Then: “Lakeview. The pan dulce.” She laughs, and blows her nose. “Tell him he owes me two crosswords. Tell him I did them both without him, in pen.” She glances at the pencil. “Don’t tell him about the pencil.”`,
        },
        {
          label: 'Knock on doors along Alder Street',
          cost: 0.75,
          text: `You work Alder Street a door at a time. The Moreno girl, home from college, saw Harold early on the fourth, loading a suitcase into the Buick by himself. “He had his cane, and he was whistling,” she says. “Like he was going on vacation.”

The mail carrier says nobody asked her to hold Harold’s mail. “Funny thing, though. Nothing from his bank since spring. Old folks always get a bank statement.”`,
          clues: ['seen_leaving'],
        },
      ],
    },

    house: {
      title: '1416 Alder Street',
      text: `Harold’s house is the twin of Dot’s in brick, with a neat row of mums along the walk. Dot unlocks the door and stays on the porch, arms folded. “I’ll wait here. It feels like snooping.”

Inside it smells of old books and furniture polish. Nine days of mail sit squared off on the hall table, where Dot has been stacking it. Everything here is labeled, and everything is where it belongs.`,
      again: `Dot lets you in again and takes up her post on the porch. [if harold_found]Now that you know where he is, the house looks as if it’s waiting for him.[else]The house is as quiet as before.[/if]`,
      choices: [
        {
          label: 'Walk through the house',
          text: `Nothing broken, nothing forced. The bed is made with hospital corners. In the closet a clean rectangle in the dust shows where a suitcase stood. The toothbrush, the razor and the pill organizer are gone, and so is the cane that should be by the door.

On the refrigerator, in small upright printing: *Dr. Osei, Oct. 20, 10:15*. In the trash under the sink, torn neatly in half, is a glossy brochure for Maple Crest Memory Care, with a Beck Realty Group business card still clipped to it.`,
          clues: ['left_on_purpose'],
          set: ['osei_known', 'maple_known'],
        },
        {
          label: 'Look at the mantel',
          text: `A wedding photo: June, laughing at something out of frame. A Kessler High plaque, TEACHER OF THE YEAR. And last year’s Christmas cards, still standing in October. “June kept them up till the new ones came,” Dot calls from the porch. “He never stopped.”

One is a photo card of a bakery, a woman in an apron out front. Inside: *Merry Christmas, Mr. B. Come see us. Your favorite lab disaster, Rosa.* The return address on the envelope: **Delgado’s Bakery, 214 Lake Street, Lakeview**.`,
          clues: ['rosa_card'],
        },
        {
          label: 'Sort through the mail',
          cost: 0.25,
          text: `Circulars, a Medicare summary, a seed catalog. Nothing from Northshore Savings, or from any bank at all.

At the bottom is a thick envelope from Maple Crest Memory Care, postmarked October 3, with a folder inside.

> Welcome to the Maple Crest family, Harold!
> Your move-in date: Monday, October 6
> Your suite: Lakeside 14
> Please bring comfortable clothes and a few
> favorite things. For your safety, all our
> doors are secured.`,
          clues: ['maple_packet'],
          set: ['maple_known'],
        },
        {
          label: 'Go through his filing cabinet',
          cost: 0.5,
          text: `The filing cabinet is labeled in the same small printing as the note on the fridge. One folder says *Buick, oil changes (1–50)*.

MEDICAL has Mercy General discharge papers: admitted March 12, hip replaced March 13, discharged March 18 “with walker; assistance required for all transfers.”

LEGAL has the deed, two wills and a health care proxy naming Kevin, signed three years ago in a small, upright hand: *H. W. Beck*. There’s no power of attorney.

BANK has statements through March. Then nothing.`,
          clues: ['in_hospital', 'hip_march'],
          set: ['saw_signature'],
        },
        {
          label: 'Search the house top to bottom',
          cost: 1.25,
          text: `Drawers, mattress, closets. Nothing, until you open the freezer. Behind the peas is a sealed bag of papers: copies of Northshore statements and a power of attorney, with a summary on top in small upright printing.

> SAVINGS, MAR 22 .................. $212,406.18
> 14 TRANSFERS TO BECK REALTY GROUP, APR–SEP
> SAVINGS, SEP 22 .................... $9,012.55
> HOME EQUITY LINE, OPENED APR 21 .. $190,000.00

The power of attorney names Kevin as agent. It’s dated March 14 and notarized at Ship & Sign on Dunmore Street by Sheila Kraft, who swears Harold “personally appeared.” Across it, in capitals pressed hard enough to dent the paper: **I NEVER SIGNED THIS — H.B.** A sticky note: *9/29, A. Feld, Northshore. Fraud claim.*

Dot, who has come in after all, reads over your shoulder and says a word that surprises you both.`,
          clues: ['freezer_note', 'statement', 'poa_copy'],
        },
      ],
    },

    kevin: {
      title: 'Beck Realty Group',
      text: `Beck Realty Group is a storefront between a vape shop and a tax preparer. Kevin Beck comes out from behind his desk with his hand already out: forty-four, a good suit gone a little tight, very white teeth. [if kevin_at_bakery]The knuckles of his right hand are scraped raw.[else]His phone buzzes face down on the desk, and he ignores it.[/if]

“Detective. Kevin. Sit, sit. Dot called you. Of course Dot called you.” [if petition]His raincoat is still on; he’s just back from somewhere. [/if]“Look, I appreciate the concern. I do.”`,
      again: `[if kevin_at_bakery]Kevin looks as if he hasn’t slept. “They treated me like a criminal,” he says. “In front of the whole street.”[else]Kevin gets up again, with a little less enthusiasm. “Detective. What else can I do for you?”[/if]`,
      choices: [
        {
          label: 'Ask where Harold is',
          text: `“Upstate. With a friend. An old teaching buddy, Stan.”

“Stan who?”

“Stan…” He snaps his fingers. You wait. He sits back. “Okay. Honestly? I don’t know where he is. I said upstate so the street wouldn’t be in his business. He’s been going downhill since Aunt June died. Leaving the stove on, getting lost. His doctor, Osei, wrote a letter. I had a place lined up, Maple Crest, and he got scared and wandered off.” He spreads his hands. “I’ve got a professional looking. I didn’t want to make it a police thing.”`,
          clues: ['kevin_story'],
          set: ['osei_known', 'maple_known'],
        },
        {
          label: 'Ask about the power of attorney',
          text: `He brightens. “All legal. Notarized, recorded with the county. I drove him down to sign it myself.” He slides a copy across.

> DURABLE POWER OF ATTORNEY (FINANCIAL)
> I, HAROLD W. BECK, appoint KEVIN M. BECK my
> attorney-in-fact for all financial matters…
> Signed March 14.                 *Harold Beck*
> Personally appeared before me: Harold W. Beck.
> SHEILA A. KRAFT, NOTARY PUBLIC · SHIP & SIGN

The signature is big, loopy and shaky. [if saw_signature]It looks nothing like the small, upright *H. W. Beck* on the health care proxy in Harold’s files.[/if]`,
          clues: ['poa_copy'],
        },
        {
          label: 'Ask about Harold’s money',
          text: `“I handle his bills, his bank, all of it.” He leans in. “Right before he took off, he went into the bank and took out four thousand dollars. Cash. Somebody’s working him, Detective. Some woman, some church. That’s what keeps me up at night.”`,
          clues: ['cash_4000'],
        },
        {
          label: 'Ask who he hired to find Harold',
          if: 'kevin_story',
          text: `“Donnie Skaggs. Skaggs Investigations. Not cheap.” He says it as though it proves something. “Donnie says old guys are easy. They have routines.”

He seems to find this comforting.`,
          clues: ['skaggs_hired'],
          set: ['skaggs_known'],
        },
        {
          label: 'Look around the office while he takes a call',
          cost: 0.5,
          text: `Kevin takes a call from someone named Marco in the back hallway. It isn’t going well. On his desk: a flyer for 12 Overlook Drive, “Bluffside Queen Anne, Fully Restored,” stamped PRICE REDUCED twice. A stack of envelopes with red stripes. A Maple Crest folder. And a framed photo of Kevin on a pontoon boat, his arm around a blond woman in big sunglasses.

Kevin comes back with his smile on again. “Contractors,” he says.`,
          set: ['saw_photo', 'maple_known'],
        },
        {
          label: 'Wait outside and follow him when he leaves',
          if: '!sheila_kevin',
          cost: 1,
          once: true,
          text: `You wait in your car across University Avenue. At twenty past, Kevin comes out, checks the street and drives north, to a narrow shop on Dunmore Street called **Ship & Sign**, with S. KRAFT, NOTARY PUBLIC painted on the glass. Through the window you watch him lean across the counter and kiss the blond woman behind it. They talk with their heads close together. She shakes hers a lot. When he leaves, she stands at the counter a long time without moving.

[if poa_copy]Ship & Sign: where Harold’s power of attorney was notarized.[/if]`,
          clues: ['sheila_kevin'],
          go: 'board',
        },
        {
          label: 'Tell him where Harold was on March 14',
          if: 'poa_copy & in_hospital',
          text: `“At Ship & Sign,” Kevin says. “I drove him.”

You tell him about Mercy General: admitted the twelfth, a new hip on the thirteenth, home on the eighteenth with a walker.

He doesn’t move. “They must have let him out for the afternoon.”

“The day after a hip replacement.”

“Then the date’s wrong. Sheila must have written—” He stops. [if sheila_kevin | sheila_confesses]He can see you know exactly who Sheila is.[else]You hadn’t told him the notary’s first name.[/if]

[if osei_denies | statement | bank_records]You lay out the rest. “I was going to put it back,” he tells the desk. “Overlook was going to sell. He’d never have known.”[else]He looks at the door, then at his phone.[/if]

“I think,” Kevin Beck says, “I should call a lawyer.”`,
          clues: ['kevin_caught'],
          set: ['kevin_lawyer'],
          go: 'board',
        },
      ],
    },

    theo: {
      title: 'Theo Marsh',
      text: `Theo Marsh’s corner of the basement has a space heater, three monitors and a cactus in a tiny Santa hat. He spins his chair around.

“Harold Beck! Eighty-one, gold Buick, nine days.” He cracks his knuckles. “I love a missing person. Everybody leaves a trail. They just don’t know it’s a trail. What do you need?”`,
      again: `Theo spins his chair around. “Back for more? I’m running a special.”`,
      choices: [
        {
          label: 'Ask Theo to trace Harold’s Buick',
          cost: 0.25,
          text: `“Plates, tickets, tows.” He types. “Nothing in the city. But Lakeview writes its own parking tickets and doesn’t share, because Lakeview.” He reaches for the phone. “I know the clerk out there. Give me an hour and a half.”`,
          timer: {
            in: 1.5,
            title: 'Theo Marsh',
            text: `Theo calls back. “Your Buick got a ticket. Thursday the ninth, 6:52 a.m., in the loading zone in front of 214 Lake Street, Lakeview. Unpaid.” Keys clatter. “And 214 Lake is Delgado’s Bakery. Bring me back something with sprinkles.”`,
            clues: ['buick_ticket'],
          },
        },
        {
          label: 'Ask Theo about Harold’s phone and cards',
          cost: 0.5,
          text: `“Phone first.” Theo keeps the carrier’s emergency form in a drawer. “Off since 8:12 a.m. on the fourth, last ping by his house. He switched it off.”

He scrolls. “Cards I can’t see without a subpoena. But the library’s one county system, and I know the head of circulation.” More keys. “His card was used Friday at the Lakeview branch. A history of the periodic table and a large-print Maigret.”`,
          clues: ['library_card'],
        },
        {
          label: 'Ask Theo to pull the county records on Harold’s house',
          cost: 0.25,
          text: `“Deeds, mortgages, liens.” The recorder’s site comes up. “Paid off in 1994. And then—huh.” He turns a monitor toward you. “April 21 this year. A home equity mortgage for $190,000 on 1416 Alder, Northshore Savings. Signed ‘Kevin M. Beck, attorney-in-fact for Harold W. Beck.’ They recorded the power of attorney with it.” He zooms in. “Dated March 14. The notary’s Sheila Kraft, Ship & Sign, Dunmore Street. She swears he personally appeared.”`,
          clues: ['poa_copy'],
        },
        {
          label: 'Ask Theo to look into Kevin Beck’s business',
          cost: 0.5,
          text: `“Beck Realty Group LLC. One member, Kevin. Last year it bought 12 Overlook Drive in Bluffside for $610,000 on a hard-money loan at fourteen percent. The lender filed to foreclose in March. In May somebody paid $186,000 and the case went away. There are still $140,000 in contractors’ liens on it, and it’s been for sale eight months.” He leans back. “Your nephew’s been underwater since Christmas.”`,
          clues: ['kevin_debts'],
        },
        {
          label: 'Ask Theo to run the plate Dot wrote down',
          if: 'skaggs_plate',
          cost: 0.25,
          text: `“Gray Hyundai, registered to Skaggs Investigations. That’s Donnie Skaggs, licensed private investigator, office over a nail salon on Carver.” Theo makes a face. “Process serving, cheating spouses, skip tracing. Cheap, and not bad. Somebody hired him to find your guy.”`,
          set: ['skaggs_known'],
        },
        {
          label: 'Ask Theo to run Sheila Kraft',
          if: 'poa_copy & !sheila_kevin',
          cost: 0.25,
          text: `“Notary commission, good through next year. Owns Ship & Sign.” Keys clatter. “Car’s a white Lexus, registered at 19 Canal Street, Unit 4, in the Flats.” He stops. “Hang on.” More keys. “That’s Kevin Beck’s address. His license, his voter registration, his LLC. They live together, {name}.”`,
          clues: ['sheila_kevin'],
        },
      ],
    },

    bank: {
      title: 'Northshore Savings',
      text: `Aaron Feld, the fraud officer at the Kessler Park branch of Northshore Savings, has a glass office, a bow tie and the careful manner of a man who has read every regulation that applies to him.

He closes the door. “Mr. Beck is missing? Is he all right?” He hears himself and adjusts. “I’ll help you as far as the law allows, Detective. I’ll also tell you exactly where that line is.”`,
      again: `Aaron Feld takes off his reading glasses. “Detective. Any word on Mr. Beck?”`,
      choices: [
        {
          label: 'Ask to see Harold’s accounts',
          text: `“Not without a subpoena. I’m sorry.” He means it. “Have the district attorney send one and I’ll put everything in your hands the same afternoon. Ask for everything from March on.” He holds your eye. “*Everything*.”`,
          set: ['need_subpoena'],
        },
        {
          label: 'Tell him why you’re worried',
          if: 'freezer_note | kevin_story | poa_copy',
          text: `[if freezer_note]You show him the sticky note from Harold’s freezer, with his name on it.[else]You tell him Kevin Beck says his uncle has dementia.[/if] Aaron is quiet. Then he decides something.

“Mr. Beck came in on September 29 with his statement and sat in that chair for an hour. He was not confused. He found an error in our fee schedule while he waited.” He straightens a pen. “He said he never signed a power of attorney. I opened a fraud claim and flagged it, so we won’t honor it. I told him to go to the police. He said, ‘He’s my brother’s boy. I’ll talk to him first.’”`,
          clues: ['aaron_met_harold'],
        },
      ],
    },

    ada: {
      title: 'ADA Gus Pellegrino',
      text: `ADA Gus Pellegrino answers on the fourth ring with his mouth full. From the clatter of trays, it’s the courthouse cafeteria.

“An eighty-one-year-old who’s gone missing, and a nephew with a power of attorney,” he says when you’re done. “I already don’t like it. What do you need?”`,
      again: `“{det}.” Gus is somewhere with an echo. “Talk fast, I’m due back in court.”`,
      choices: [
        {
          label: 'Ask for a subpoena for Harold’s bank records',
          text: `“Easy. A missing man and money moving under a power of attorney.” You hear him writing. “Banks are slow even when they’re trying. Figure three hours.”`,
          timer: {
            in: 3,
            title: 'Northshore Savings',
            text: `Aaron Feld sends the records himself: *As promised. Everything. —A.F.*

> APR 2   Statements redirected to BECK REALTY GROUP
>         (K. Beck, by POA)
> APR 21  Home equity line opened, $190,000 (by POA)
> MAY 5   Line fully drawn → Beck Realty Group
> APR–SEP 14 transfers from savings → Beck Realty
>         Group, total $203,393.63 (by POA)
> SEP 29  Fraud claim opened (A. Feld). POA flagged.
> OCT 3   Cash withdrawal $4,000.00, teller window.
>         Signed H. W. Beck, in person.

The only money Harold touched himself was the $4,000.`,
            clues: ['bank_records', 'cash_4000'],
          },
        },
        {
          id: 'warrant-yes',
          label: 'Ask for a warrant to search Kevin’s office',
          if: 'poa_copy & in_hospital & (statement | bank_records | kevin_debts) & !search_found',
          text: `You give him the power of attorney, the hospital dates and the money.

“A notary swears the old man stood in front of her on a day he was flat on his back at Mercy, and the money went to the nephew’s company,” Gus says. “That’s forgery and theft. I’ll walk it over to Judge Halvorsen myself. Give me an hour.”`,
          go: 'search',
        },
        {
          id: 'warrant-no',
          label: 'Ask for a warrant to search Kevin’s office',
          if: '!(poa_copy & in_hospital & (statement | bank_records | kevin_debts)) & !search_found',
          text: `“What have you got? A nephew with a power of attorney. That’s legal until you show me it isn’t.” Gus swallows something. “Show me the paper’s a lie. Show me where the money went. Then call me back.”`,
        },
      ],
    },

    search: {
      title: 'Search warrant',
      text: `The warrant comes through a little after the hour. Kevin Beck meets you at the door of Beck Realty Group [if kevin_lawyer]with his lawyer, a tired man in a raincoat who reads every line and tells his client to sit down and say nothing.[else]with his phone to his ear. He reads the warrant twice, says “This is insane,” and goes out to the sidewalk to call a lawyer.[/if]`,
      choices: [
        {
          label: 'Search the office',
          cost: 1,
          text: `The bottom desk drawer is locked, and the key is on Kevin’s ring. Inside is a folder marked UNCLE H: Harold’s statements from April through August, all opened. Under it is a legal pad covered in signatures, *Harold Beck, Harold Beck*, twenty-two of them, getting shakier on purpose toward the bottom.

On the computer, in a folder called MISC: the letterhead of Kessler Park Geriatric Associates, Suite 200, with a signature pasted in as a picture.

In the inbox tray is a note from Skaggs Investigations, in pencil, dated Monday: *Gold Buick behind 214 Lake St., Lakeview. Confirming.*`,
          clues: ['search_found', 'skaggs_lakeview'],
          set: ['kevin_lawyer'],
          go: 'board',
        },
      ],
    },

    shipsign: {
      title: 'Ship & Sign',
      text: `Ship & Sign is a narrow shop of cardboard boxes, packing peanuts and greeting cards nobody has touched since spring. A sign by the register says NOTARY ON DUTY. The woman on duty is taping a box harder than it needs: late forties, long nails, reading glasses pushed up into blond hair.

At Harold Beck’s name, the tape gun stops. “I don’t know him,” Sheila Kraft says. “I mean, I might have notarized something. I do thirty a week.”`,
      again: `Sheila Kraft sees you through the window and [if sheila_confesses]turns the sign on the door to CLOSED. She lets you in anyway.[else]puts the tape gun down. “What now?”[/if]`,
      choices: [
        {
          label: 'Ask to see her notary journal',
          text: `“Fine.” She flips a bound book open to March and turns it around. “By the book. ID, signature, thumbprint.” She even lets you photograph the page, as if that proves her point.

> NO. 0417 · MAR 14 · 4:40 PM
> DURABLE POWER OF ATTORNEY (FINANCIAL)
> SIGNER: HAROLD W. BECK · 1416 ALDER ST
> ID: STATE DRIVER LICENSE B200-3317-8841
> SIGNATURE: *Harold Beck*
> THUMBPRINT: [ink print]

The signature sprawls across the box in big, trembling loops. [if saw_signature]Harold signs *H. W. Beck*, small and upright. This is somebody else’s idea of an old man’s handwriting.[/if]`,
          clues: ['journal_entry'],
        },
        {
          label: 'Ask about her and Kevin',
          if: 'saw_photo | sheila_kevin',
          text: `[if saw_photo]You mention the photo on Kevin’s desk: the pontoon boat, the big sunglasses.[else]You tell her you know about Kevin.[/if]

Sheila goes red from the collar up. “So we live together. That isn’t illegal. I can notarize for my boyfriend. I mean, for his *uncle*.” She hears it. “It was all legal.”`,
          clues: ['sheila_kevin'],
        },
        {
          label: 'Tell her where Harold was on March 14',
          if: 'in_hospital & (journal_entry | poa_copy)',
          text: `You tell her: Mercy General, admitted the twelfth, surgery on the thirteenth, home on the eighteenth with a walker.

Sheila sits down on a stack of flattened boxes.

“Kevin said Harold was in the car,” she says. “He came in at twenty to five with it already signed, and Harold’s license. He said his uncle was too sore to come in, and could I just do it, because it was family. It was raining. I didn’t go out. Kevin did the thumbprint.” She presses a hand flat on the counter to stop it shaking. “Nobody was in the car. Were they.”`,
          clues: ['sheila_confesses'],
        },
        {
          label: 'Read through the rest of the journal',
          if: 'journal_entry',
          cost: 0.5,
          text: `Car titles, affidavits, loan closings. Kevin Beck’s name comes up eleven times this year, on real-estate papers of his own. On April 21 there’s one more: a home equity mortgage on 1416 Alder Street, signed by Kevin as “attorney-in-fact for Harold W. Beck.” Sheila stamped that too. Both entries have thumbprints. You’re no fingerprint examiner, but Dr. Rao is.`,
        },
      ],
    },

    mercy: {
      title: 'Mercy General',
      text: `Mercy General’s records office is in the basement. The privacy officer, Wendell Pryce, has a laminated copy of the federal privacy rule taped to his monitor.

“For a missing person, I can give you dates of treatment and where he was in the building,” he says, tapping the laminate. “Not why. Not what.” He writes down Harold’s date of birth. “Two hours. Everything down here takes two hours.”`,
      timer: {
        in: 2,
        title: 'Mercy General',
        text: `Wendell Pryce faxes (faxes) a single page:

> BECK, HAROLD W. · ADMISSION RECORD
> Admitted:   03/12 07:10 · Orthopedics, 4 West, bed 12
> Discharged: 03/18 13:30 · Home, with assistance
> Leave of absence: none recorded

Below it, in pen: *Patients on 4 West don’t leave the floor. He was here all six days. —W.P.*`,
        clues: ['in_hospital'],
      },
      choices: [],
    },

    osei: {
      title: 'Dr. Miriam Osei',
      text: `Kessler Park Geriatrics has large-print magazines and chairs with arms to push up from. Dr. Miriam Osei sees you between patients: fifties, brisk, half-moon glasses, a pen she clicks while she thinks.

“Harold Beck is *missing*?” The pen stops. “Sit down. I have eleven minutes.”`,
      again: `Dr. Osei holds up one finger, finishes a note and turns to you. “Seven minutes this time. Go.”`,
      choices: [
        {
          label: 'Ask about Harold’s memory',
          text: `“I can’t discuss his chart. That’s the law.” She clicks the pen twice. “But he’s missing, and someone is telling people he’s demented, so I’ll defend this to the licensing board: in August I gave Harold Beck a cognitive screen. He scored twenty-eight out of thirty. He lost one point on a drawing and one on a word he says I pronounced wrong.” She almost smiles. “He was right.”`,
          clues: ['osei_screen'],
        },
        {
          label: 'Ask whether Kevin Beck has been in touch',
          text: `“The nephew.” Click. “He called in early September wanting a letter ‘documenting his uncle’s decline,’ for a care facility. I told him there was no decline to document, and that if he was worried he could bring Harold in and I’d see them both.” She shrugs. “He hung up on my receptionist.”`,
          clues: ['kevin_asked_osei'],
        },
        {
          label: 'Show her the letter with her name on it',
          if: 'maple_letter | petition',
          text: `She reads it once fast and once slowly, and her face does something you wouldn’t want aimed at you.

“That’s our old letterhead. We’ve been in Suite 310 since January of last year.” She taps the signature. “I sign *M. Osei*. I have never once used my middle initial. And ‘advanced vascular dementia’? In a man who beats me at Scrabble?” She picks up her phone. “I didn’t write this. I’m calling Adult Protective Services, then my lawyer, and then that nephew.”

“Please don’t do the last one.”

“Fine,” she says. “Two out of three.”`,
          clues: ['osei_denies'],
        },
      ],
    },

    maplecrest: {
      title: 'Maple Crest Memory Care',
      text: `Maple Crest sits on a lawn that runs down to the lake, all gray shingle and white trim, with Adirondack chairs nobody is sitting in. The front door opens with a buzz. The inner doors need a code.

Paula Grant, the admissions director, has a brochure in your hand before you’ve said your name. When you say why you’re here, her friendliness turns careful. “Mr. Beck. Yes. We were expecting him.”`,
      again: `Paula Grant meets you in the lobby again, without a brochure this time.`,
      choices: [
        {
          label: 'Ask about Harold Beck’s admission',
          text: `She pulls up the file. “His nephew toured us September 12 and applied on the 22nd. Advanced vascular dementia. We held Lakeside 14 for October 6. He said his uncle had agreed to come.” She scrolls. “He called that morning to say there’d been a delay. We haven’t heard since.”

“Who was paying?”

“Private pay, from the sale of Mr. Beck’s home. The nephew has power of attorney. He was very clear about that.” She glances up. “It’s ninety-four hundred a month, Detective. Families plan.”`,
          clues: ['maple_app'],
        },
        {
          label: 'Ask to see the doctor’s letter',
          text: `She hesitates, then turns her screen.

> KESSLER PARK GERIATRIC ASSOCIATES
> 1200 College Street, Suite 200
> September 19
> To whom it may concern: My patient Harold W. Beck
> suffers from advanced vascular dementia with
> significant decline. He cannot manage his finances
> or live safely alone. I support his placement in a
> secure memory care setting.
> Miriam A. Osei, MD

“A standard letter,” Paula says. “With one of these, we don’t always do our own assessment.” She hears herself. “We didn’t, this time.”`,
          clues: ['maple_letter'],
          set: ['osei_known'],
        },
        {
          label: 'Take the tour',
          cost: 0.5,
          text: `It’s clean and bright and kind, as these places go. By a window a woman folds the same napkin over and over, and an aide sits beside her and folds one too.

Lakeside 14 is at the end of the hall: a bed, a chair, a view of gray water. The window opens four inches and stops. The door at the end of the corridor has a keypad, and the code is in Paula’s pocket.

You think of Harold being told this was for his own good.`,
        },
      ],
    },

    bakery: {
      title: 'Delgado’s Bakery',
      text: `Delgado’s Bakery smells of butter, anise and burnt sugar. Rosa Delgado is fifty-two, short and fast, with flour to the elbows and reading glasses on a beaded chain.

[if kevin_at_bakery]A Lakeview squad car sits at the curb, and there’s a crack across the glass of the back door. Rosa is waiting for you with her arms folded. “The sergeant says you’re the one who’s really been looking for him. Not Kevin’s kind of looking. Is it all right now?”[else]There’s a line to the door, a wall of pan dulce behind the glass and a cork board of photographs by the register. When you show Rosa your badge she doesn’t stop ringing. “Give me ten minutes,” she says. It takes twenty.[/if]`,
      again: `[if harold_found]Rosa waves you toward the stairs without stopping. “He alphabetized my spices. Then he decided that was unscientific and did them again by molecular weight.”[else]Rosa sees you come in and keeps working. “Still no.”[/if]`,
      choices: [
        {
          label: 'Ask Rosa about Harold Beck',
          if: '!harold_found & !kevin_at_bakery',
          text: `“Mr. Beck? My chemistry teacher?” She wipes down a spotless counter. “I haven’t seen him since his wife’s funeral. Three years.” She keeps wiping. “He’s a wonderful man. I hope he’s all right.”

“He’s been missing nine days.”

“Then I hope you find him.” She doesn’t ask a single question about it, which is the first thing about Rosa Delgado that doesn’t add up.`,
        },
        {
          label: 'Look around the bakery',
          if: '!harold_found',
          text: `On the cork board, a teenage girl in safety goggles and a scorched lab coat grins while a much younger Harold Beck pretends to faint behind her.

By the register, under the tip jar, is Sunday’s crossword, finished in ink in small upright capitals.

Through the swinging door you can see the back lot. Beside the dumpster, under a blue tarp, a gold fender shows where the tarp doesn’t reach.`,
          clues: ['rosa_lying'],
        },
        {
          label: 'Tell Rosa you’re not working for Kevin',
          if: '!harold_found & !kevin_at_bakery',
          text: `Rosa laughs, without much fun in it.

“A man came in [if day = 1]this morning[else]yesterday morning[/if] and said he was a grandson. Bought one cinnamon roll and asked had I seen an old man who drives a gold Buick.” She taps her upper lip. “Mustache like a push broom. Everybody’s somebody’s grandson, Detective. You’ll have to do better.”`,
        },
        {
          label: 'Tell Rosa what Kevin did',
          if: '!harold_found & !kevin_at_bakery & (freezer_note | statement | bank_records | osei_denies | sheila_confesses | (poa_copy & in_hospital) | lab_result | search_found)',
          text: `You take her into the back, among the proofing racks, and tell her what you know about Kevin Beck and the power of attorney. Not all of it. Enough.

When you’re done she takes her glasses off and puts them back on.

“He said the only person who’d come looking for him the right way would be somebody who’d read the papers,” she says. “Kevin doesn’t read.” She unties her apron. “Upstairs.”`,
          go: 'harold',
        },
        {
          label: 'Give Rosa Dot’s message',
          if: 'dot_message & !harold_found & !kevin_at_bakery',
          text: `“Dorothy says the crossword’s waiting.”

Rosa stops with a tray of conchas halfway to the case. For a second she looks about seventeen.

“He talks about a Dorothy,” she says. “Every day. Dorothy would’ve gotten that one. Dorothy would say I put too much sugar in these.” She sets the tray down. “Come on. Upstairs.”`,
          go: 'harold',
        },
        { label: 'Go upstairs to Harold', if: 'harold_found | kevin_at_bakery', go: 'harold' },
      ],
    },

    harold: {
      title: 'Harold Beck',
      text: `Rosa’s spare room is under the eaves, over the ovens, warm as a greenhouse: a bed made with hospital corners, a suitcase squared against the wall, library books stacked by size.

Harold Beck is in the armchair with a cane across his knees. He is small and neat, in a cardigan with leather elbow patches, and he stands when you come in, carefully, because of the hip, and because he was raised to.

“You’ll be the detective,” he says, dry and exact. “I suppose it was Dorothy. It was always going to be Dorothy.” His hand shakes, just slightly, when he offers it. “Please sit. I’ll tell it in order.”`,
      again: `Harold looks up from his book[if kevin_at_bakery], and past you at the stairs, before he relaxes[/if]. “Detective. Come in. Rosa has made coffee strong enough to titrate.”`,
      clues: ['harold_found'],
      choices: [
        {
          label: 'Ask Harold what happened',
          text: `“In September a bank statement came to the house. They’d stopped coming in the spring; I thought the bank had gone paperless.” He folds his hands on the cane. “My savings were gone, and there was a loan on my house I never asked for, all signed by Kevin ‘as attorney-in-fact.’ I went to the bank. Then I asked Kevin to come over.

“He told me I was getting confused. He said it very kindly. He had a place for me at Maple Crest, for my own good, and my doctor agreed. He had a brochure.” Harold looks at his hands. “I taught chemistry for thirty-one years, Detective. I can read a bank statement. But I could see how it would go: Kevin with his papers, and an old man saying *I didn’t sign that*. Whom would you believe?”`,
          clues: ['harold_story'],
          set: ['maple_known'],
        },
        {
          label: 'Ask about the power of attorney',
          text: `“I never signed one. Not for money.” He says it the way he must once have said *six point oh two times ten to the twenty-third*. “After June died I signed a health care proxy, because someone has to tell the doctors when to stop. That is all.”

He smiles, not nicely. “The bank showed me the date. On the fourteenth of March I was in a bed at Mercy General, the day after my new hip, attached to a morphine pump. I couldn’t have signed for a pizza.”`,
          clues: ['hip_march'],
        },
        {
          label: 'Ask about the $4,000',
          if: 'cash_4000',
          text: `Harold looks faintly offended. “It’s mine. I took it out on the Friday, before Kevin could.” He nods at the dresser. “Rosa won’t take a penny in rent, so I buy her flour, fifty pounds at a time, and she pretends not to notice. She was a terrible chemist and she is a superb baker. Baking is only chemistry you can eat.”`,
          clues: ['cash_explained'],
        },
        {
          label: 'Ask why he didn’t go to the police',
          text: `“And say what? That my nephew, who has a notarized paper and a doctor’s letter, says I’m senile, and I say I’m not?” He isn’t angry, only tired. “A colleague of mine taught physics. His son told a judge he was confused, and the judge believed the son, and he died behind a keypad. He wasn’t confused. He was *sad*.” He turns the cane in his hands. “So I went to the one person Kevin had never heard of, to think. I’m afraid I have mostly baked.”`,
        },
        {
          label: 'Tell him about the guardianship petition',
          if: 'petition',
          text: `He listens, then writes the date inside the cover of his library book.

“I’ll be there at a quarter to nine, in a tie, and the judge may ask me anything she likes. The date. The president. Avogadro’s number.” He caps the pen. “And Dorothy will come whether she can or not.”`,
        },
        {
          label: 'Go through the papers Harold brought',
          cost: 0.5,
          text: `Harold brought the originals in a school accordion file labeled *KEVIN*. He has been through the September statement with a ruler and a red pen and built a table in the margin: fourteen transfers, dated, totaled and checked twice.

> TOTAL TO BECK REALTY GRP ........ $203,393.63
> HOME EQUITY LINE (NOT MINE) ..... $190,000.00
> REMAINING .......................... $9,012.55

At the bottom, underlined twice: *POA dated March 14. Where was I?*`,
          clues: ['statement'],
        },
        { label: 'Go back down to Rosa', go: 'bakery' },
      ],
    },

    lab: {
      title: 'Dr. Anjali Rao',
      text: `Dr. Anjali Rao zooms in on your photo of the journal page until the signature breaks into pixels.

“I’ll compare the signature with his known ones, from the DMV and the bank’s signature card. The print I can check against his fingerprint card: teachers in this state are printed for their license.” She makes a note. “Three hours. I’ll tell you what the evidence says, not what you’d like it to say.”`,
      timer: {
        in: 3,
        title: 'Dr. Rao',
        text: `Dr. Rao’s report is two paragraphs, as usual.

> SIGNATURE, JOURNAL NO. 0417: not written by Harold W.
> Beck. Tremor is simulated: the pen lifts and restarts
> mid-stroke, as in slow copying. Known signatures
> (DMV, bank) are small and fluent: “H. W. Beck.”
> THUMBPRINT: excluded as Harold W. Beck. Enough detail
> to exclude him; not enough to identify anyone else.

She adds nothing to it. She never does.`,
        clues: ['lab_result'],
      },
      choices: [],
    },

    skaggs: {
      title: 'Donnie Skaggs',
      text: `Skaggs Investigations is one room over a nail salon. Donnie Skaggs sits behind a metal desk eating a sandwich out of wax paper: fifties, a mustache like a push broom, a vape pen he waves when he talks.

“A cop.” He doesn’t get up. “If this is about the thing at the Tamsin Motel, the guy was served. I got a picture.”`,
      again: `Donnie Skaggs looks up from another sandwich. “You again.”`,
      choices: [
        {
          label: 'Ask who hired him',
          text: `“Client confidentiality.” He takes a bite, chews and reconsiders. “It’s no big secret. Kevin Beck. His uncle’s got dementia and wandered off, and he’s worried sick. Sixty-five an hour plus mileage.” He shrugs. “Old guys are easy. They got routines. Library, doctor, the same diner.”`,
          clues: ['skaggs_hired'],
        },
        {
          label: 'Ask what he’s found',
          text: `“I’m close.” He waves the vape. “Gold Buick. You know how many gold Buicks there are? Not many. Once I see the old man with my own eyes, my client gets a call.” He goes back to his sandwich. “Nothing illegal about finding a guy.”`,
        },
        {
          label: 'Tell him what his client did',
          if: 'freezer_note | statement | bank_records | osei_denies | sheila_confesses | (poa_copy & in_hospital) | search_found',
          text: `You tell him about the power of attorney and where the money went. He stops chewing halfway through.

“He said dementia.” He puts the sandwich down. “I got a mother in Lakeview, Detective.”

[if kevin_at_bakery]“I already called him. I told him the bakery.” He rubs his face. “That’s on me.”[else]He opens a notebook. “Delgado’s Bakery, 214 Lake Street. The Buick’s out back under a tarp. I went in Monday morning and bought a cinnamon roll.” He tears out the page. “I’ll tell Kevin it was the wrong Buick. Then I’ll send him my bill.”[/if]`,
          clues: ['skaggs_lakeview'],
          set: ['skaggs_warned'],
        },
      ],
    },
  },

  events: [
    {
      at: 6.5,
      if: '!kevin_lawyer & !search_found',
      title: 'Theo Marsh',
      text: `Theo calls from City Hall, where he knows everybody. “Your nephew just filed in probate court. Emergency guardianship of Harold W. Beck, 3:10 p.m. The clerk flagged it because Harold’s on the missing list.”

Paper rustles. “Kevin swears Harold signed the power of attorney ‘in my presence’ on March 14. It’s attached, notarized by a Sheila Kraft at Ship & Sign. He says Harold has advanced dementia and is ‘at grave risk.’ There’s a letter from a Dr. Miriam Osei, and a bed waiting at Maple Crest. Hearing’s Wednesday at nine.”

[if harold_found]A pause. “It says nobody knows where Harold is. You know, don’t you?”[else]He’s sending you the file.[/if]`,
      clues: ['petition', 'poa_copy'],
      set: ['maple_known', 'osei_known'],
    },
    {
      at: 10.5,
      if: '!skaggs_warned & !kevin_lawyer & !search_found',
      title: 'Lakeview PD',
      text: `A Lakeview sergeant calls at 7:30. Five minutes ago a man pounded on the back door of Delgado’s Bakery, shouting “Uncle Harold!” until the glass cracked, and Rosa Delgado called 911. The man was Kevin Beck. [if harold_found]The sergeant sent him home and is keeping a car on Lake Street tonight. The old man upstairs asked her to spell her name so he could write it down.[else]He waved a power of attorney and said Ms. Delgado was keeping his confused uncle from him to get at his money.

“Thing is,” the sergeant says, “I went upstairs and met the uncle. He corrected my grammar. Then he asked for you by name.” She’s keeping a car outside tonight.[/if]`,
      clues: ['kevin_at_bakery'],
    },
  ],

  report: [
    {
      id: 'who',
      q: 'Who stole from Harold Beck?',
      options: {
        kevin: 'Kevin Beck, his nephew',
        sheila: 'Sheila Kraft, the notary',
        rosa: 'Rosa Delgado, his former student',
        nobody: 'Nobody. Harold signed the papers and forgot.',
        dot: 'Dot Villanueva, the neighbor with his key',
      },
      answer: 'kevin',
      points: 40,
      why: 'Kevin used a power of attorney Harold never signed to move $203,393 of Harold’s savings and a $190,000 loan on his house into Beck Realty Group, to keep his failing flip on Overlook Drive afloat.',
    },
    {
      id: 'where',
      q: 'Where has Harold been for the last nine days?',
      options: {
        rosa_free: 'In Rosa Delgado’s spare room, above her bakery, by his own choice',
        rosa_held: 'At Rosa Delgado’s, where she was keeping him from his family',
        upstate: 'Upstate, staying with a friend',
        maple: 'At Maple Crest Memory Care',
        car: 'Living in his car, lost and confused',
      },
      answer: 'rosa_free',
      points: 15,
      why: 'Harold packed his own suitcase, left the cat with Dot, asked her to cover for him and drove to Rosa’s. The Buick ticket, the library card and his own account all put him in Lakeview, free to come and go.',
    },
    {
      id: 'proof',
      q: 'What proves the power of attorney is a forgery?',
      options: {
        hospital: 'It says Harold appeared before the notary on March 14, when he was an inpatient at Mercy General',
        dementia: 'Dr. Osei’s cognitive screen shows Harold doesn’t have dementia',
        cash: 'Harold withdrew $4,000 in cash the day before he left',
        recorded: 'It wasn’t recorded with the county until April 21',
        stan: 'Kevin couldn’t name the friend upstate',
      },
      answer: 'hospital',
      points: 15,
      why: 'The notary certifies that Harold “personally appeared” at Ship & Sign on March 14. Mercy General has him in bed on 4 West from March 12 to 18, a day out of surgery on the 14th, with no leave. He can’t have been in both places. The cognitive screen shows he’s competent, not that he didn’t sign.',
    },
    {
      id: 'helper',
      q: 'Who made the forged power of attorney look legal?',
      options: {
        sheila: 'Sheila Kraft, the notary who stamped it',
        skaggs: 'Donnie Skaggs, the private investigator',
        osei: 'Dr. Miriam Osei',
        feld: 'Aaron Feld at Northshore Savings',
        alone: 'Nobody. Kevin did it alone.',
      },
      answer: 'sheila',
      points: 15,
      why: 'Sheila Kraft, who lives with Kevin, notarized it and entered it in her journal as if Harold had stood in front of her. He was in the hospital. Kevin brought his license and pressed the thumbprint himself.',
    },
    {
      id: 'why',
      q: 'Why did Harold go into hiding?',
      options: {
        maple: 'Kevin threatened to have him committed to memory care',
        confused: 'He was confused and wandered off',
        rosa: 'Rosa talked him into it to get at his money',
        debts: 'He was hiding from debts of his own',
        hurt: 'Kevin threatened to hurt him',
      },
      answer: 'maple',
      points: 15,
      why: 'When Harold confronted him, Kevin said he was “getting confused” and had a room at Maple Crest waiting “for his own good,” backed by a forged doctor’s letter. The move-in date was October 6. Harold left on the fourth.',
    },
  ],

  outcomes: {
    kevin: `Kevin Beck was arrested on Tuesday afternoon for forgery and financial exploitation of an elder, and his guardianship petition was withdrawn. Harold went to court on Wednesday anyway, in a tie, and sat between Dot and Dr. Osei.

Sheila Kraft surrendered her notary commission and agreed to testify. Northshore voided the home equity line. The savings were harder: most of the money was in Overlook Drive, which sold at a loss.

He went home to Alder Street on Thursday. That Sunday he and Dot finished the crossword by eleven. She let him use pen.`,
    sheila: `You named Sheila Kraft. She had stamped the paper, and she lost her commission for it, but the money went straight past her into Beck Realty Group. Lieutenant Okafor sent the report back with one line circled: *Whose account?*

Meanwhile Kevin Beck stood up in probate court with a doctor’s letter and a sad face. Harold stood up too, and the judge questioned him until she was satisfied. The petition was denied, but the case against Kevin took months longer than it should have.`,
    rosa: `You named Rosa Delgado. On Wednesday Kevin Beck brought your report to probate court as proof that his uncle had fallen in with someone after his money, and the judge made Kevin his temporary guardian.

Harold spent eleven days in Lakeside 14 before Dr. Osei, Aaron Feld and a legal aid lawyer got him out. He wrote Lieutenant Okafor a letter afterward, three pages, with footnotes. Rosa has asked that you not come into the bakery.`,
    nobody: `Your report said Harold Beck signed the papers and forgot. It was exactly what Kevin had been telling everyone, and on Wednesday the probate judge made Kevin his uncle’s temporary guardian.

It took Aaron Feld’s fraud file, Dr. Osei’s testimony and six weeks to undo. Harold spent those weeks at Maple Crest, by a window that opened four inches. Dot came every Sunday with the crossword.`,
    dot: `You named Dot Villanueva, who reported Harold missing, took in his cat and still had his key. Lieutenant Okafor read the report twice and asked whether you had actually met Dot.

Harold laughed until he had to sit down. Nobody else did. Kevin Beck’s petition went to a hearing on Wednesday with no police report to answer it, and it was a closer thing than it should have been.`,
    default: `Lieutenant Okafor read your report and set it down. “The money went to Beck Realty Group,” she said. “Whose company is that?” By the time you had rewritten it, Kevin Beck had had his day in probate court.`,
  },

  solution: {
    text: `Harold Beck never signed a financial power of attorney. From March 12 to 18 he was on 4 West at Mercy General with a new hip. Meanwhile his nephew Kevin, who was minding his wallet, took a forged power of attorney and Harold’s driver’s license to Ship & Sign. The notary, Sheila Kraft, is Kevin’s girlfriend. Kevin said Harold was waiting in the car; she didn’t check, wrote that Harold “personally appeared” on March 14, and let Kevin press the thumbprint.

Kevin’s flip on Overlook Drive was in foreclosure. With the power of attorney he redirected Harold’s statements, borrowed $190,000 against Harold’s house and moved $203,393 of Harold’s savings into Beck Realty Group. By September it was gone, so he forged a letter from Dr. Osei, who had just scored Harold 28 out of 30, and reserved a room at Maple Crest. With Harold locked away, Kevin could sell the house, and nobody would believe an old man who said he never signed anything.

Then a statement reached Alder Street. Harold took it to Aaron Feld at Northshore, then confronted Kevin, who told him he was confused and that Maple Crest was for his own good. Harold withdrew $4,000, hid copies of the papers in his freezer, left the cat with Dot and drove to Rosa Delgado, a former student Kevin had never heard of. Kevin’s investigator, Donnie Skaggs, the man in the gray car, found the bakery on Monday; that afternoon Kevin petitioned to be made Harold’s guardian.

The dementia story was Kevin’s cover. Rosa lied to protect Harold, not to use him, and the $4,000 was his living money. Dot held back because Harold asked her to.`,
    chain: ['poa_copy', 'in_hospital', 'statement', 'sheila_kevin', 'harold_found', 'harold_story'],
    walk: [
      '@dot', 'Ask about Harold', 'Ask about Kevin',
      '@house', 'Look at the mantel', 'Go through his filing', 'Search the house',
      '@kevin', 'Ask where Harold is', 'Tell him where Harold was',
      '@theo', 'Ask Theo to run Sheila',
      '@bakery', 'Tell Rosa what Kevin did', 'Ask Harold what happened',
    ],
  },
};
