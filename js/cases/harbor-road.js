// Case 3. A hit-and-run on Harbor Road. The car is easy to find; the hard part is the family's story
// about who was driving it. Two records (a valet book and a doorbell camera) break it.

export default {
  id: 'harbor-road',
  n: 3,
  title: 'Harbor Road',
  crime: 'Hit-and-run',
  difficulty: 2,
  summary: 'A nurse riding home from the night shift was struck on Harbor Road and left in the street. Finding the car turns out to be the easy part.',
  days: ['Wednesday', 'Thursday', 'Friday'],
  start: { day: 1, hour: 9 },
  hours: 14,

  briefing: `Lieutenant Ruth Okafor is standing at her window when you come in, looking toward the lake as if she could see Harbor Road from here.

“At ten past six this morning a car came up behind a woman on a bicycle on Harbor Road, by the grain elevators, and put her in the road. Then it drove away.” She turns around. “She’s a nurse. ICU, Mercy General. She was riding home from her shift. Now she’s in her own unit, and her own people are keeping her alive.”

> INCIDENT 26-12207 · HIT-AND-RUN, SERIOUS INJURY
> Harbor Rd at the Calder Grain gate · The Harbor
> 911 call 6:18 a.m. Thursday. Victim: IBÁÑEZ, CARMEN, 34, cyclist.
> Transported to Mercy General. Critical.
> Recovered: silver paint transfer on rear wheel and fender;
> broken corner of a headlight housing, partial part no. …145-4E9…

“The man who called it in works at the elevator. Hank Dorsey. His pickup is silver, and the front of it is pushed in. He told patrol he hit a deer last week, and patrol didn’t like the way he said it.” She hands you the sheet. “Dr. Rao has the bike and the fragment. Theo’s downstairs. Report on my desk by eleven Friday morning, {det}. Bring me the chain, not a hunch.”`,

  people: {
    carmen: { name: 'Carmen Ibáñez', role: 'The cyclist', about: '34. An ICU nurse at Mercy General for eleven years. Rides her bike home along Harbor Road after every night shift.' },
    hank: { name: 'Hank Dorsey', role: 'Dock worker, Calder Grain', about: '58. Found Carmen and called 911. Drives a silver Ford pickup with a smashed front end.' },
    salazar: { name: 'Officer Anita Salazar', role: 'Patrol', about: 'First officer on the scene, at 6:24 a.m.', if: '@scene' },
    wendell: { name: 'Wendell Ames', role: 'Night charge nurse, Mercy General ICU', about: 'Has worked beside Carmen for nine years. Hasn’t gone home.', if: '@mercy' },
    roz: { name: 'Roz Petrakis', role: 'Delivery driver, Sorrento Bakery', about: 'Drives the early bread route. The Harbor Club is her first stop.', if: 'roz_tip' },
    graham: { name: 'Graham Sutter', role: 'Manager, the Harbor Club', about: 'Polished, and very careful about his members.', if: '@club' },
    shay: { name: 'Shay Brennan', role: 'Bartender, the Harbor Club', about: 'Worked the after-party in the Commodore Room until nearly six.', if: '@club' },
    luis: { name: 'Luis Fuentes', role: 'Valet, the Harbor Club', about: '22. Worked the valet stand overnight on Wednesday.', if: 'luis_known' },
    dale: { name: 'Dale Whitcomb', role: 'City councilman', about: '56. Six foot four, gray hair. Owns a silver 2021 Lexus RX. Lives in Bluffside.', if: 'rx_list | bodyshop | voigt_call | shay_tab | valet_log | luis_drunk | nav_log' },
    brooke: { name: 'Brooke Whitcomb', role: 'Dale’s wife', about: 'Five foot four. Chairs half the charity boards in Bluffside.', if: '@whitcomb | bodyshop | ray_job' },
    tyler: { name: 'Tyler Whitcomb', role: 'Dale’s son', about: '17. Five foot seven. A junior at Calder Prep. No record.', if: '@whitcomb | voigt_call' },
    voigt: { name: 'Preston Voigt', role: 'The Whitcombs’ lawyer', about: 'Bow tie, soft voice, no wasted words.', if: '@whitcomb | voigt_call' },
    maddie: { name: 'Maddie Cho', role: 'Tyler’s girlfriend', about: '17. Lives with her mother in Kessler Park.', if: 'maddie_known' },
    grace: { name: 'Grace Cho', role: 'Maddie’s mother', about: 'A tax accountant who works from home and runs every morning at a quarter to six.', if: '@cho' },
    ray: { name: 'Ray Castellano', role: 'Owner, Castellano Collision', about: 'Has been straightening Bluffside’s fenders in the Flats for thirty years.', if: 'bodyshop | brooke_repair' },
  },

  clues: {
    paint_transfer: { title: 'Silver paint on the bike', text: 'Silver metallic paint is smeared across the rear wheel and rear fender of Carmen’s blue bicycle.', who: ['carmen'] },
    fragment: { title: 'A piece of headlight', text: 'A broken corner of a headlight housing, found in the road. Part of a number is molded into the plastic: …145-4E9…' },
    hank_first: { title: 'The man who called 911', text: 'Hank Dorsey called 911 at 6:18 a.m. His silver pickup has a smashed front end. He told patrol he hit a deer last week.', who: ['hank'], at: 'Thu 6:18' },
    struck_behind: { title: 'Hit from behind', text: 'Carmen was riding east near the edge of Harbor Road with her rear light flashing. She was hit from directly behind by a vehicle going the same way.', who: ['carmen'], at: 'Thu 6:10' },
    road_marks: { title: 'The driver stopped', text: 'No braking before the impact. About forty feet past where Carmen fell, hard tire marks and a scatter of headlight plastic: the vehicle stopped there, then went on east.' },
    carmen_route: { title: 'Carmen’s ride home', text: 'Carmen clocked out at 5:51 a.m. She rides the same way every morning: over the Canal Street bridge, east on Harbor Road past the elevators, up past the Route 9 light to Carver Avenue.', who: ['carmen', 'wendell'], at: 'Thu 5:51' },
    carmen_account: { title: 'What Carmen saw', text: 'Headlights behind her, and a big silver SUV. After she fell, the driver got out and stood over her: a big, tall man, older, with gray hair. He didn’t say anything. He got back in and drove away.', who: ['carmen'], at: 'Thu 6:10' },
    paint_lexus: { title: 'The paint is Lexus silver', text: 'The transfer on the bike is Celestine Silver Metallic, Lexus paint code 1K9. It was used only on the Lexus RX, model years 2020 to 2022.' },
    headlight_match: { title: 'The headlight fits', text: 'The fragment from Harbor Road fits the broken corner of the headlight from Castellano’s scrap bin, edge for edge. Blue paint on its lens matches the frame of Carmen’s bike.', who: ['carmen'] },
    hank_lab: { title: 'Deer, not a bicycle', text: 'The hair in Hank Dorsey’s grille is white-tailed deer, with deer blood. His truck’s paint is a plain Ford silver, without the pearl flake in the transfer.', who: ['hank'] },
    part_rx: { title: 'A Lexus headlight', text: 'The partial number belongs to a left headlight housing for a Lexus RX, 2020 to 2022.' },
    rx_list: { title: 'Silver RXs in the county', text: 'Twenty-six silver 2020–2022 Lexus RXs are registered in Calder County. Four are in Bluffside, at the top of Bluff Road. One is Councilman Dale Whitcomb’s 2021, plate CKW 4471.', who: ['dale'] },
    bodyshop: { title: 'A rush job at Castellano’s', text: 'Castellano Collision in the Flats has a silver 2021 RX in for a headlight, bumper cover and paint. Booked by phone Thursday morning, rush, under the name Whitcomb.', who: ['ray', 'brooke'] },
    no_cab: { title: 'No cab home', text: 'No cab or rideshare took anyone from the Harbor Club to Bluffside on Wednesday night, and none stopped at 40 Bluff Crest Drive.', who: ['dale'] },
    hank_record: { title: 'Hank’s old DUI', text: 'Hank Dorsey was convicted of drunk driving in 2014 and lost his license for a year. Nothing on his record since.', who: ['hank'] },
    hank_grille: { title: 'Hank’s truck up close', text: 'Fresh damage to the middle of the grille, low down, with coarse gray-brown hair and dried blood caught in it. Both headlights are intact.', who: ['hank'] },
    hank_deer: { title: 'Hank hit a deer this morning', text: 'Hank hit a deer on Route 9 at about 5:30, dragged it off the road, called it in and spent half an hour strapping his hood shut. He lied to patrol about when because of his record.', who: ['hank'], at: 'Thu 5:30' },
    hank_saw_suv: { title: 'An SUV at the Route 9 light', text: 'At about 6:13, as Hank turned onto Harbor Road, a big silver SUV passed him going east, fast, with its left headlight out. It turned up Bluff Road.', who: ['hank'], at: 'Thu 6:13' },
    gate_video: { title: 'The gate camera', text: 'At 6:10 an SUV hits the bike and stops. The driver walks back and stands over Carmen for half a minute: a tall man, his head well above the roof of the SUV. At 6:16 Hank’s pickup arrives from the east.', who: ['hank', 'carmen'], at: 'Thu 6:10' },
    deer_report: { title: 'A deer on Route 9', text: 'Animal control logged a call at 5:35 a.m.: a struck deer on the Route 9 shoulder near mile marker 4. The caller gave the name Hank and Hank Dorsey’s cell number.', who: ['hank'], at: 'Thu 5:35' },
    roz_saw: { title: 'Out of the Harbor Club', text: 'Just after six, a big silver Lexus SUV pulled out of the Harbor Club’s valet circle, swerved across both lanes and went east on Harbor Road. The valet ran into the road after it.', who: ['roz'], at: 'Thu 6:03' },
    shay_tab: { title: 'The Commodore Room tab', text: 'The after-party tab ran on Dale Whitcomb’s member number from 11:14 p.m. Wednesday to the last pour at 5:40 a.m. Thursday: $1,160, most of it scotch.', who: ['dale', 'shay'], at: 'Thu 5:40' },
    luis_drunk: { title: 'The councilman took the car', text: 'At 5:58 a.m. Luis brought the silver RX around for Councilman Whitcomb, who could barely stand. He tipped a fifty, waved off a cab, and drove away across both lanes. Graham Sutter told Luis to forget it.', who: ['luis', 'dale', 'graham'], at: 'Thu 5:58' },
    valet_log: { title: 'The valet book', text: 'Ticket 0417: silver Lexus RX, plate CKW 4471. In at 7:12 p.m. Wednesday. Out at 5:58 a.m. Thursday, to “Mr. W (Councilman).”', who: ['dale', 'luis'], at: 'Thu 5:58' },
    ray_job: { title: 'Brooke’s rush job', text: 'Brooke Whitcomb called Ray at 10:15 a.m. Thursday: headlight, bumper cover and paint, rush, $3,400 cash. “My son hit a deer.” She asked him to fetch the car from her garage, and he did at 11:30.', who: ['brooke', 'ray'], at: 'Thu 10:15' },
    no_deer: { title: 'No deer did that', text: 'No hair or blood anywhere on the Lexus. Instead, a blue scuff on the bumper cover and a small orange bicycle reflector jammed in the fog light grille.', who: ['ray'] },
    ray_seat: { title: 'The seat was racked back', text: 'When Ray got into the Lexus in the Whitcombs’ garage, the driver’s seat was all the way back and the mirrors were aimed high. Ray is five foot nine and couldn’t reach the pedals.', who: ['ray'], at: 'Thu 11:30' },
    old_headlight: { title: 'The old headlight', text: 'Ray kept the Lexus’s broken left headlight in his scrap bin, the way he always does for the core charge. One corner of the housing is missing.', who: ['ray'] },
    hang_tag: { title: 'A valet tag in the Lexus', text: 'In the Lexus’s cupholder: a Harbor Club valet hang tag, number 0417.', who: ['dale'] },
    dale_story: { title: 'The councilman’s account', text: 'Dale says he left his fundraiser at the Harbor Club around 1 a.m., took a cab home and was asleep by half past. The Lexus was in the garage all night.', who: ['dale'], at: 'Thu 1:00' },
    brooke_repair: { title: 'Brooke says it was a deer', text: 'Brooke says Tyler hit a deer on his way to his girlfriend Maddie Cho’s, and that she had Ray Castellano collect the car for repair.', who: ['brooke', 'tyler', 'ray'] },
    tyler_story: { title: 'Tyler’s story', text: 'Tyler says he took his father’s car from the garage at about 5:45 to drive to Maddie’s, felt something hit on Harbor Road, didn’t stop, and drove home.', who: ['tyler'], at: 'Thu 5:45' },
    family_break: { title: 'Tyler takes it back', text: 'Shown the doorbell footage and the valet log, Tyler said he slept at Maddie’s and his mother picked him up at 7:41. He never drove the car.', who: ['tyler', 'brooke'] },
    brooke_truth: { title: 'Brooke’s account', text: 'Dale came home at twenty past six and said he’d hit a deer. After the news, Brooke fetched Tyler, called Voigt and called Ray. Voigt’s reasoning: a sober seventeen-year-old with no record gets probation, and a drunk councilman goes to prison.', who: ['brooke', 'dale', 'tyler', 'voigt'], at: 'Thu 6:20' },
    grace_check: { title: 'Grace checked on Tyler', text: 'Grace Cho saw Tyler asleep on her basement couch at 5:40 a.m., before she went out for her run.', who: ['grace', 'tyler'], at: 'Thu 5:40' },
    doorbell: { title: 'The Chos’ doorbell camera', text: 'Tyler arrives at 11:02 p.m. Wednesday and leaves at 7:41 a.m. Thursday, in his mother’s white Volvo. In between, the only person through the door is Grace, out for her run and back.', who: ['grace', 'tyler', 'brooke'], at: 'Wed 23:02' },
    maddie_why: { title: 'What Tyler told Maddie', text: 'At noon Tyler told Maddie his father had hit someone, and that the lawyer said a seventeen-year-old with no record and no drinking gets probation, where his dad would go to prison. At 12:14 he texted her to say he was home all night.', who: ['maddie', 'tyler', 'dale', 'voigt'], at: 'Thu 12:05' },
    voigt_call: { title: 'Voigt says Tyler drove', text: 'Preston Voigt says Tyler was driving his father’s Lexus on Harbor Road Thursday morning. He stresses that Tyler is seventeen, has no record and hadn’t been drinking. Statement Friday at 9 a.m.', who: ['voigt', 'tyler'], at: 'Thu 14:30' },
    confession: { title: 'Tyler’s formal statement', text: 'Tyler’s signed statement: he took the Lexus from the home garage at 5:45 a.m., hit something on Harbor Road, stopped, got out, saw a person, panicked and drove home.', who: ['tyler', 'voigt'], at: 'Fri 9:00' },
    nav_log: { title: 'The Lexus’s trip log', text: 'The Lexus sat in the Harbor Club lot from 7:12 p.m. Wednesday until 5:57 a.m. Thursday. It left at 6:03, braked hard and stopped for 48 seconds on Harbor Road at 6:10, and was parked at 40 Bluff Crest Drive at 6:21.', who: ['dale'], at: 'Thu 6:03' },
  },

  startClues: ['paint_transfer', 'fragment', 'hank_first'],

  leads: {
    scene: { title: 'Harbor Road', where: 'At the Calder Grain gate · The Harbor', kind: 'place', cost: 1.5, again: 0.5 },
    mercy: { title: 'Mercy General ICU', where: 'Fourth floor · Mercy General', kind: 'place', cost: 1, again: 0.5 },
    lab: { title: 'Crime lab', where: 'Dr. Anjali Rao · Garland St', kind: 'lab', cost: 0.5, again: 0.5 },
    theo: { title: 'Theo Marsh', where: 'Records · the basement', kind: 'records', cost: 0.5, again: 0.5 },
    hank: { title: 'Hank Dorsey', where: 'Calder Grain · Harbor Rd', kind: 'person', cost: 1, again: 0.5 },
    animal: { title: 'Animal control', where: 'County dispatch · by phone', kind: 'phone', cost: 0.5, if: 'hank_grille | hank_deer', once: true, onceNote: 'Called' },
    roz: { title: 'Roz Petrakis', where: 'Sorrento Bakery · Canal St · the Flats', kind: 'person', cost: 0.5, if: 'roz_tip', until: 'time >= 6', closed: 'Off shift' },
    club: { title: 'The Harbor Club', where: 'Marina end of Harbor Rd', kind: 'place', cost: 1, again: 0.5, if: 'roz_saw | club_known | dale_story | hang_tag' },
    luis: { title: 'Luis Fuentes', where: 'At home · Ferris St · Northgate', kind: 'person', cost: 1, again: 0.5, if: 'luis_known' },
    whitcomb: { title: 'The Whitcomb house', where: '40 Bluff Crest Dr · Bluffside', kind: 'place', cost: 1, again: 0.5, if: 'rx_list | bodyshop | voigt_call | shay_tab | valet_log | luis_drunk | nav_log' },
    cho: { title: 'The Cho house', where: 'Juniper St · Kessler Park', kind: 'person', cost: 1, again: 0.5, if: 'maddie_known' },
    castellano: { title: 'Castellano Collision', where: 'Tannery St · the Flats', kind: 'place', cost: 1, again: 0.5, if: 'bodyshop | brooke_repair' },
    warrant: { title: 'ADA Gus Pellegrino', where: 'District Attorney’s office · by phone', kind: 'phone', cost: 0.5, if: 'club_refused | bodyshop | brooke_repair', until: 'nav_log & (subpoena_sent | !club_refused)', closed: 'Served' },
    carmen: { title: 'Carmen Ibáñez', where: 'Bed 12 · Mercy General ICU', kind: 'person', cost: 1, if: 'carmen_awake', once: true, onceNote: 'Sleeping' },
  },

  scenes: {
    scene: {
      title: 'Harbor Road',
      text: `Harbor Road runs flat and straight here, two lanes between the lake fence and the Calder Grain elevators, which stand over everything like a row of concrete organ pipes. Pigeons walk the shoulder. A grain truck goes by and the whole road shakes.

The evidence techs finished an hour ago. What’s left is orange spray paint on the asphalt: an outline where the bicycle lay, a circle where the fragment was found, a smaller one around a dark stain. Somebody from the elevator has set a traffic cone beside it, as if she might still be there.

Officer Anita Salazar, first on scene, is leaning on her cruiser with a coffee she hasn’t touched. Above the Calder Grain gate, a security camera looks out over the road.`,
      again: `The cone is still there by the Calder Grain gate. [if carmen_awake]Someone has tied a bunch of grocery-store carnations to it.[else]Trucks roll past it all day without slowing down.[/if]`,
      choices: [
        {
          label: 'Ask Officer Salazar what she found',
          text: `“Call came in 6:18. I got here 6:24.” She looks at the cone. “She was on her side by the fence. Her bike was in the lane with the back wheel folded in half, and her taillight was still going. Blinking, blinking, right there in the road. I switched it off. I don’t know why that’s the part I keep thinking about.”

She clears her throat. “She was eastbound, same as the car. Hit square from behind. The guy who called it in, Dorsey, was kneeling next to her with his coat over her. His truck’s silver and the front end’s caved. Said a deer did it, last week. Wouldn’t look at me when he said it.”

She nods at the gate. “Elevator has a camera. The guard wouldn’t play it without the foreman.”`,
          clues: ['struck_behind'],
        },
        {
          label: 'Walk the road',
          cost: 0.5,
          text: `You walk east from the outline with your head down. Before the impact there’s nothing: no skid, no swerve, no scuff. The car never braked.

Forty feet past the outline, that changes. Two short black marks where the tires locked, and in the gutter beside them a glitter of clear and silver plastic too small for the techs to bother with. The car stopped here. Then the marks go on, fainter, east toward the Route 9 light and the bottom of Bluff Road.

Whoever it was, they stopped. They had a moment to think about it. Then they left.`,
          clues: ['road_marks'],
        },
        {
          label: 'Knock on doors along Harbor Road',
          cost: 1,
          text: `There aren’t many doors. The elevator office, a boarded-up bait shop, a marine supply that opens at ten. At the marina gate you find the night security guard finishing a crossword in his booth.

“Six in the morning? Quiet. Always quiet.” He thinks. “Except the Harbor Club. Some party over there went all night, big cars in the lot till dawn. Around six somebody came out of there and went east like his hair was on fire. I heard the tires. Didn’t see what.” He shrugs. “You’d be amazed what shape people drive home from that place in.”`,
          set: ['club_known'],
        },
      ],
    },

    mercy: {
      title: 'Mercy General ICU',
      text: `The ICU is on the fourth floor, behind double doors that open with a badge. Inside it’s dim and busy and quiet all at once: monitors chiming, a nurse gowning up in a doorway, a radio playing low at the station.

Carmen Ibáñez is in bed 12, behind glass. You can see dark hair on the pillow, a collar on her neck, and a lot of machinery doing her breathing for her.

The man at the nurses’ station is still in navy night-shift scrubs at midmorning. His badge says **WENDELL AMES, RN, CHARGE**. He looks at your badge, and then at bed 12.

“I was her charge nurse last night,” he says. “I’m not going home. Don’t tell me to go home.”`,
      again: `[if carmen_awake]Wendell meets you at the double doors with something close to a smile. “She’s awake. Go easy.”[else]Wendell is still at the station. In bed 12, Carmen hasn’t moved.[/if]`,
      choices: [
        {
          label: 'Ask Wendell about Carmen',
          text: `“Eleven years in this unit. She takes the patients nobody wants, the angry ones, the ones whose families yell. She brings clementines for night shift in a bag on her handlebars.” He almost smiles. “She bikes because it’s twenty minutes of quiet after twelve hours of alarms. Her words.”

“Same way every morning?”

“Every morning. Out the staff gate, over the Canal Street bridge, east on Harbor Road past the elevators, up past the Route 9 light to her place on Carver. Flat the whole way. She clocked out at 5:51. I watched her go.” His jaw tightens. “She charges her lights at the station every shift. Front and back. Every single shift.”`,
          clues: ['carmen_route'],
        },
        {
          label: 'Ask how she’s doing',
          text: `“Skull fracture, pelvis, left femur. Swelling on the brain, so they’re keeping her under.” He says it the flat, fast way nurses say the worst things. “If the pressure comes down overnight, they’ll lighten the sedation in the morning and see what she gives us.”

He looks at the glass. “She’s the one who tells families that being tough doesn’t matter in here. I hate that she’s right.”`,
        },
        {
          label: 'Sit with her sister',
          cost: 0.5,
          text: `Lucía Ibáñez is in the family room with a vending-machine coffee and a phone she keeps turning over and over. She teaches third grade in Northgate. She came still wearing her school lanyard.

“We were going to see a house today. At two. On Carver, four doors down from her apartment. It has a porch.” She laughs, and the laugh breaks in the middle. “She wanted a porch so bad. She was going to sleep till one, and I was going to pick her up.”

You sit with her a while. Before you go she asks you, very politely, to find the person who did it, and you tell her you will.`,
        },
        {
          label: 'Tell Wendell what you’ve found',
          if: '(luis_drunk | valet_log | shay_tab) & (doorbell | family_break)',
          text: `You tell him as much as you can: a man who drank until nearly six and got into his car anyway, who stopped and looked and drove away, and a family that put its seventeen-year-old in front of him.

Wendell doesn’t say anything for a long time. Then he gets up, goes to the glass and stands there with one hand flat against it.

“She’ll want to know it wasn’t the kid,” he says at last. “That’s the kind of thing she worries about.”`,
        },
      ],
    },

    carmen: {
      title: 'Carmen Ibáñez',
      text: `The attending gives you five minutes and stands in the doorway to make sure you mean it.

They took the breathing tube out at seven. Carmen Ibáñez is propped up with her left leg in a frame and a bandage where the right side of her hair used to be. Her eyes are open. They find you, then they find Wendell at the foot of the bed, and something in her face lets go a little.

“This is the detective,” Wendell tells her. “About the road.”

“Okay,” she says. Her voice is sandpaper. “Okay. Ask.”`,
      choices: [
        {
          label: 'Ask her what she remembers',
          text: `“Light behind me. Getting big. The engine too loud.” She stops to breathe. “I thought, he sees me. I’m lit up like a Christmas tree. He sees me.”

Then the road, she says, and the sky, and not being able to feel her legs. A car door. Footsteps.

“He came back and stood there. In the headlights. Big man. Tall. Gray hair, older, like my dad’s age. White shirt open at the neck.” Her eyes fill. “I said help. I think I said it. He looked right at me.” A long breath. “Then he walked back and got in. Big silver car, the tall kind. And he went.”

[if news_tyler & !family_break]Wendell says quietly, “The news says it was a boy. Seventeen.”

Carmen closes her eyes. “It wasn’t a boy.”[/if]`,
          clues: ['carmen_account'],
        },
        {
          label: 'Tell her you know who it was',
          if: 'family_break | ((luis_drunk | valet_log) & doorbell)',
          text: `You tell her his name, and that he had been drinking all night, and that his family tried to put it on their son.

She listens with her eyes on the ceiling. When you finish she’s quiet so long you think she’s drifted off.

“His son,” she says. “God.” Then, to Wendell, in her work voice: “Somebody needs to check on that kid.”

The attending taps the door frame. Your five minutes are up.`,
        },
      ],
    },

    lab: {
      title: 'Crime lab',
      text: `Carmen’s bicycle stands in the middle of Dr. Anjali Rao’s lab like something in a museum: a blue city bike with a wire basket, a bent kickstand and a rear wheel folded nearly in half. The rear fender is streaked with silver.

Dr. Rao has the headlight fragment in an evidence bag under her lamp. “Paint first,” she says. “There’s a pearl flake in the color coat, which narrows things. I’ll run the layers against the automotive database. Three hours.”

She turns the fragment over. “This is the corner of a headlight housing. The number on it is a part number, and Theo can look that up faster than I can. If you find the rest of this headlight, bring it to me.”`,
      again: `Dr. Rao looks up from her microscope. [if headlight_match]“The Lexus headlight is logged and photographed. It’s a good fit, {name}. Better than good.”[else]“Anything new for me?”[/if]`,
      timer: {
        in: 3,
        title: 'Dr. Rao: the paint',
        text: `Dr. Rao sends her results on the paint from Carmen Ibáñez’s bicycle:

> PAINT TRANSFER · REAR FENDER AND WHEEL RIM
> Four layers: e-coat, primer, color (metallic, pearl flake), clear.
> Color layer consistent with CELESTINE SILVER METALLIC,
> Lexus paint code 1K9. Offered on Lexus RX, model years 2020–2022 only.

She adds a line of her own: “Nothing else was ever painted this color.”`,
        clues: ['paint_lexus'],
      },
      choices: [
        {
          label: 'Go over the bike with her',
          cost: 0.5,
          text: `She walks you around it with a pen for a pointer. The damage is all at the back: the rear wheel crushed straight forward into the frame, the fender bent up, the paint transfer at bumper height. “Struck from directly behind,” she says. “No side impact at all.”

The rear light is still clipped under the saddle. She shows you its switch, set to flash, and the battery, two-thirds full. “It was on.” One of the orange spoke reflectors is missing from the rear wheel, snapped off at the clip.`,
          clues: ['struck_behind'],
        },
        {
          label: 'Hand her the old headlight from Castellano’s',
          if: 'old_headlight',
          text: `She lifts the cracked headlight out of its bag with both hands and sets it beside the fragment. “Two hours,” she says. “I want to photograph the edges under magnification before I let them touch.”`,
          timer: {
            in: 2,
            title: 'Dr. Rao: the headlight',
            text: `Dr. Rao calls instead of emailing, which she almost never does.

“The fragment from Harbor Road fits the broken corner of the Lexus headlight. Every ridge of the fracture lines up, and the part number completes: 81145-4E922. That is a physical match, {name}. That piece of plastic came off that headlight.” A pause. “And there’s blue paint on the lens. Same paint as the frame of Ms. Ibáñez’s bicycle.”`,
            clues: ['headlight_match'],
          },
        },
        {
          label: 'Give her the hair from Hank Dorsey’s grille',
          if: 'hank_grille',
          text: `She holds the envelope up to the light. “Hair and dried blood. Two hours. I’ll take a scraping of his paint too, so we can put it next to the transfer.”`,
          timer: {
            in: 2,
            title: 'Dr. Rao: Hank Dorsey’s truck',
            text: `Dr. Rao reports on the samples from Hank Dorsey’s pickup:

> HAIR: guard hairs, white-tailed deer. BLOOD: deer.
> PAINT: single-stage Ford silver, no pearl flake.
> Not consistent with the transfer on the Ibáñez bicycle.
> No blue paint. No material from the bicycle.

“He hit a deer,” she writes. “Not her.”`,
            clues: ['hank_lab'],
          },
        },
      ],
    },

    theo: {
      title: 'Theo Marsh',
      text: `Theo Marsh’s corner of the basement has three monitors, a space heater and a cactus wearing a tiny baseball cap. He swivels around before you’ve said a word.

“Harbor Road! I heard.” The cheer goes out of his face. “The nurse. That’s awful.” Then it comes back, because it always does. “Okay. Paint, parts, plates. Cars are my favorite. Cars leave paperwork everywhere they go. What have you got?”`,
      again: `Theo spins his chair around. “Back for more? I love it when people come back for more.”`,
      choices: [
        {
          label: 'Give him the partial part number',
          cost: 0.25,
          text: `He types *145-4E9* into a parts catalog that looks older than he is.

“So Toyota and Lexus number their parts by system. 81145 is a left headlight housing. A 4E9 suffix is Lexus, and it’s the—” scroll, scroll “—RX. Model years 2020 through 2022, left side.” He writes it on a sticky note and hands it over. “Somebody’s missing a corner of their headlight.”`,
          clues: ['part_rx'],
        },
        {
          label: 'Ask him to list the silver RXs in the county',
          if: 'part_rx | paint_lexus',
          cost: 0.25,
          text: `“Registered in Calder County, 2020 to 2022, silver. The state lumps silver and gray together, so I’ll get some grays too. Give me an hour and a half.”`,
          timer: {
            in: 1.5,
            title: 'Theo: silver RXs',
            text: `Theo emails a spreadsheet and a note:

> 26 LEXUS RX, 2020–2022, SILVER/GRAY, REGISTERED IN CALDER COUNTY
> Sorted by address. 4 in Bluffside, all off Bluff Road,
> which is where Harbor Road takes you if you keep going east.

“One of the four is a 2021 registered to **Dale and Brooke Whitcomb**, 40 Bluff Crest Drive, plate CKW 4471. As in *Councilman* Whitcomb. I’m not saying anything. I’m just saying it.”`,
            clues: ['rx_list'],
          },
        },
        {
          label: 'Ask him to call the body shops',
          if: 'part_rx | paint_lexus',
          cost: 0.25,
          text: `“Oh, I love a canvass. A nice SUV with a smashed headlight goes to a body shop the same day, every time.” He cracks his knuckles. “Thirty-one shops in the county. Two hours.”`,
          timer: {
            in: 2,
            title: 'Theo: body shops',
            text: `Theo calls back, a little hoarse.

“Thirty-one shops. Twenty-nine said no. One guy in Lakeview tried to sell me an extended warranty. And Castellano Collision, on Tannery Street in the Flats, has a silver 2021 RX in the bay right now for a left headlight, a bumper cover and paint. Booked this morning by phone, rush job. The kid who answered says the name on the ticket is Whitcomb.”`,
            clues: ['bodyshop'],
          },
        },
        {
          label: 'Ask him to check the cabs and rideshares',
          if: 'dale_story',
          cost: 0.25,
          text: `“Cabs are easy, they have to log every trip with the city. Rideshare takes a phone call to a very bored lawyer. An hour and a half.”`,
          timer: {
            in: 1.5,
            title: 'Theo: cabs and rideshares',
            text: `Theo sends the trip records for Wednesday night:

> PICKUPS AT THE HARBOR CLUB, 1 MARINA DR · WED 22:00 – THU 03:00
> 23:48  Calder Yellow   → Lakeview
> 00:20  Rideshare       → Old Town
> 02:10  Harbor Cab      → Northgate
> DROP-OFFS AT 40 BLUFF CREST DR · WED–THU: none

“Nothing from the club to Bluffside all night,” he writes. “Unless the councilman walked three miles uphill in dress shoes, somebody else drove him home. Or nobody did.”`,
            clues: ['no_cab'],
          },
        },
        {
          label: 'Ask him about Hank Dorsey',
          cost: 0.25,
          text: `Theo pulls him up. “Henry Dorsey, fifty-eight. Owns a 2012 Ford pickup, silver. And—” he winces “—a DUI in 2014. Point one four, on Route 9. Lost his license for a year, did the classes, got it back. Nothing since. Not so much as a parking ticket.”

He looks at you over his glasses. “That’s not great, huh. For him.”`,
          clues: ['hank_record'],
        },
      ],
    },

    hank: {
      title: 'Calder Grain',
      text: `The Calder Grain office is a trailer at the foot of the elevators. The foreman, Earl Boyce, looks at your badge and sighs through his nose. “He’s on the dock. I’ll get him.”

Hank Dorsey comes in wiping his hands on a rag: a big, slow man in a feed cap and a canvas coat with a dark stain down the front that you realize, after a moment, is hers. Out the window his silver Ford sits in the lot with its hood held down by an orange ratchet strap.

He doesn’t sit. “I told the officer already. I found her. That’s all I did.”`,
      again: `[if hank_deer]Hank nods to you from the dock, like a man who has stopped waiting for handcuffs.[else]Hank sees you crossing the lot and sets his jaw.[/if]`,
      choices: [
        {
          label: 'Ask him how he found her',
          text: `“I was late. Came in off Route 9, and there’s a bike in the lane and something by the fence I thought was a bag of trash.” He turns the rag over. “It wasn’t.

“I called 911. I put my coat on her. She kept trying to say something, and I kept telling her don’t talk, they’re coming.” He looks down at the stain. “I held her hand till the ambulance. That’s all.”`,
        },
        {
          label: 'Ask about the damage to his truck',
          text: `“Deer.” He says it to the window. “Last week.”

You look out at the truck: the strap, the bright creases in the metal, not a speck of rust in any of them.

“Last week,” he says again.`,
        },
        {
          label: 'Look over his truck',
          cost: 0.25,
          text: `The damage is dead center and low: grille pushed in, bumper creased, hood buckled so it won’t latch. Caught in the grille are tufts of coarse gray-brown hair and a smear of something dried dark. Both headlights are intact.

You bag some of the hair. Hank watches from the trailer door and doesn’t try to stop you.`,
          clues: ['hank_grille'],
        },
        {
          label: 'Ask the foreman for the gate camera',
          cost: 0.75,
          text: `Earl finds the footage on the third try. Past the gate, a slice of Harbor Road, gray and grainy in the dark.

At 6:09:48 a blinking red light slides east along the far lane. At 6:10:03 headlights swell behind it, and the red light is gone. An SUV brakes hard and stops at the edge of the frame, one headlight dark.

A man gets out, walks back into the glow of the good headlight and stands there looking down for about thirty seconds. As he walks back, his head and shoulders show above the SUV’s roof. At 6:10:51 it pulls away east.

At 6:16:20 a pickup comes in from the east, and a big man in a canvas coat runs to the fence.`,
          clues: ['gate_video'],
        },
        {
          label: 'Tell him you know it wasn’t last week',
          if: 'hank_grille | gate_video | deer_report',
          text: `[if gate_video]“The camera shows you pulling up six minutes after she was hit. [else]“There’s fresh blood in your grille, Hank. [/if]Nobody thinks you hit her. So why lie about the deer?”

He sits down all at once on a folding chair.

“Hit it this morning. Route 9, five-thirty. I dragged it off the road so nobody else would hit it, and I called it in. Took me half an hour with the strap to get the hood to stay down. That’s why I was late.” He rubs his face. “I got a DUI on my record. Twelve years ago. Sober eleven.” He shows you a bronze coin and puts it away. “Guy with my record, busted-up truck, lady in the road? I know how that goes. So I said last week. Stupid.”`,
          clues: ['hank_deer'],
        },
        {
          id: 'saw-shut',
          label: 'Ask what he saw on the way in',
          if: '!hank_deer',
          text: `“Nothing. It was dark. I was late.” He says it too fast.`,
        },
        {
          id: 'saw-open',
          label: 'Ask what he saw on the way in',
          if: 'hank_deer',
          text: `This time he thinks about it.

“At the light, Route 9 and Harbor, where I turn. Big silver SUV comes past me going east, flying. Left headlight out. I thought, there’s another guy who hit a deer.” He stops. “It went up Bluff Road. That’d be 6:13, about. A couple minutes before I found her.”

He stares at you. “That was him. I watched him go.”`,
          clues: ['hank_saw_suv'],
        },
      ],
    },

    animal: {
      title: 'Animal control',
      text: `The Calder County animal control dispatcher is eating something crunchy and doesn’t apologize for it. She reads you Thursday morning’s log.

> 05:35  STRUCK DEER, ADULT DOE · RT 9 NB SHOULDER NEAR MM 4
> Caller: “Hank,” cell on file. Says he moved it off the road.
> 07:50  Crew dispatched.   08:15  Carcass removed.

The cell number is the one Hank Dorsey gave patrol this morning.

“Most people just drive off and leave them lying there,” she adds. “Nice of him.”`,
      clues: ['deer_report'],
      choices: [],
    },

    roz: {
      title: 'Roz Petrakis',
      text: `Sorrento Bakery is a brick storefront on Canal Street that smells so strongly of bread you can taste it from the sidewalk. Out back by the loading door, Roz Petrakis sits on an upturned milk crate in a hairnet, eating a roll with butter and nothing else.

“I heard it on the radio at my second stop and I had to pull over,” she says. “That road. I’m on that road every morning of my life.” She brushes crumbs off her apron. “I almost didn’t call. You call the police, you spend all day on the phone. But I kept thinking about it.”`,
      again: `Roz is loading tomorrow’s trays. “You again. Take a roll.”`,
      choices: [
        {
          label: 'Ask her what she saw',
          text: `“My first stop is the Harbor Club kitchen, six o’clock. I’m backing up to the kitchen door, scanner says 6:03, and this big silver SUV comes out of the valet circle like it’s shot out of a cannon. Up over the curb, across both lanes, almost takes my mirror off. Then it straightens out and goes east.” She shows you with the roll. “A Lexus. My brother-in-law has one, with the grille like a big mouth.

“And the valet kid runs out into the road after it, waving his arms. Like you could stop that with your arms.”`,
          clues: ['roz_saw'],
        },
        {
          label: 'Ask whether she saw the driver',
          text: `“No. The windows were dark and it was going too fast.” She thinks. “Just one person. Nobody in the passenger seat, I’d have seen a head. A big shape.” She shrugs. “Somebody had a night, I said to myself. I said it out loud.”`,
        },
        {
          label: 'Ask about the valet',
          if: 'roz_saw',
          text: `“Nice boy. Luis. When I’m running late he carries the trays in for me.” Her face changes. “He was white as a sheet, standing there in the road. I asked was he okay, and he just said, ‘He shouldn’t be driving, he shouldn’t be driving.’ Then his boss yelled from the door and he went back in.”`,
        },
      ],
    },

    club: {
      title: 'The Harbor Club',
      text: `The Harbor Club sits at the marina end of Harbor Road: white clapboard, a wide porch, a flagpole flying a pennant nobody outside the club could name. The valet stand by the front steps is empty at this hour, its podium locked.

The manager, Graham Sutter, meets you in the foyer before you’re through the door. He’s trim and silver at the temples, with a smile that is mostly teeth. “Detective. How can the Club help?”

Behind him, through a door marked COMMODORE ROOM, somebody is running a vacuum. From the bar down the hall comes the clink of bottles being counted.`,
      again: `Graham Sutter sees you in the foyer, and his smile gets a little thinner. [if shay_tab]Down the hall, Shay lifts a hand from behind the bar.[/if]`,
      choices: [
        {
          label: 'Ask Sutter about Wednesday night',
          text: `“The Councilman’s reelection fundraiser. Seven until eleven, in the ballroom. Two hundred guests, very successful.” He folds his hands. “Afterward a few members stayed on in the Commodore Room, as members do. I went home at eleven. I really couldn’t tell you who stayed, or how late.”

“Your valet would know.”

“I’m sure he would,” Sutter says, and smiles.`,
        },
        {
          label: 'Ask to see the valet book and the bar tabs',
          text: `“Our members’ comings and goings are private, Detective. I’m sure you understand. If the District Attorney sends us a subpoena, we will of course cooperate fully.”

He opens the front door for you. When you don’t go through it, he closes it again, and his expression doesn’t change at all.`,
          set: ['club_refused'],
        },
        {
          label: 'Look into the Commodore Room',
          cost: 0.25,
          text: `A paneled room with a fireplace, leather chairs and a ship model in a glass case. It hasn’t aired out: cigars, scotch, the sweet rot of spilled mixer. A housekeeper is vacuuming around a low table crowded with glasses.

On the sideboard a folded card still stands: **RESERVED · COUNCILMAN D. WHITCOMB & GUESTS**. Beside it are two empty bottles of eighteen-year-old Macallan and a third with an inch left in the bottom.`,
        },
        {
          label: 'Talk to the kitchen staff',
          cost: 0.5,
          text: `The kitchen is between lunch and dinner, and the dishwasher, a lanky kid named Andre, is happy to talk as long as he can keep scrubbing.

“The after-party? I was here till six doing their glasses.” He grins, then remembers why you’re asking and stops. “Quarter to six, maybe, the Councilman comes down the back hall looking for the bathroom and walks into the ice machine. Like, full on. Says ‘Excuse me’ to it.” He rinses a pot. “It was funny at the time.”`,
        },
        { label: 'Talk to the bartender', go: 'shay' },
      ],
    },

    shay: {
      title: 'Shay Brennan',
      text: `Shay Brennan is behind the bar with a clipboard, counting bottles and keeping her pen in her teeth between counts. She’s in her forties, with swallows tattooed on both wrists and the particular calm of somebody who has been awake for a very long time.

“I worked the Commodore Room till almost six,” she says. “Then I came back at eleven, because somebody has to close out last night’s tabs and it isn’t going to be Graham.” She glances toward the foyer. “He told us not to talk to anybody. So talk fast.”`,
      again: `Shay is still counting. “Go on.”`,
      choices: [
        {
          label: 'Ask about the after-party',
          text: `“Started with a dozen, eleven-ish. By three it was four of them. By five it was just him.” She doesn’t have to say who. “The Councilman. His tab, his member number.”

She turns her screen around, and you photograph it.

> COMMODORE RM · TAB 88 · MBR 0212 WHITCOMB, D.
> OPENED  WED 23:14
> MACALLAN 18 (BTL) × 2 · MACALLAN 18 (BTL, PARTIAL) × 1 ...
> LAST ITEM  THU 05:40 · TOTAL $1,160.00

“At 5:40 I stopped pouring. I told him the bar was closed, and he tried to tip me with his credit card. Called me Sharon.” She shakes her head. “He could not stand up, Detective. He had to hold on to the bar to get his coat on.”`,
          clues: ['shay_tab'],
        },
        {
          label: 'Ask about the valet',
          text: `“Luis. Luis Fuentes. He was on the stand all night.” She lowers her voice. “I went out and told him, whatever you do, don’t bring the Councilman his car. Stall him. Lose the keys. Call him a cab. But Luis is twenty-two, and it’s the *Councilman*.”

She writes an address on a bar napkin. “He went home around seven, upset. Lives with his grandmother on Ferris Street. Graham told him to keep his mouth shut, so he won’t come to you. You’ll have to go to him.”`,
          set: ['luis_known'],
        },
        { label: 'Go back to the foyer', go: 'club' },
      ],
    },

    luis: {
      title: 'Luis Fuentes',
      text: `Luis Fuentes’s grandmother lets you into a kitchen with a plastic tablecloth, a saint’s candle by the stove and a pot of beans going. “He hasn’t slept,” she tells you, in a way that means you are not to make it worse.

Luis is twenty-two and still in his Harbor Club polo, the red one with the gold anchor on the chest. He stands up when you come in, then doesn’t know what to do and sits back down.

“Is she okay?” he says, before you’ve said anything. “The lady. On the radio. Is she okay?”`,
      again: `Luis’s grandmother sets a coffee in front of you without asking. Luis looks up from his phone. “Is she okay?”`,
      choices: [
        {
          label: 'Ask about the councilman’s car',
          text: `“He came out like 5:55. Holding the railing. He says, ‘Son, bring the car around.’” Luis swallows. “Shay told me don’t. So I said, sir, let me call you a cab, it’s on me. He laughs, he says, ‘I know where my keys are,’ and he reaches over the podium for the key board. So I just — I brought it. 5:58.

“He gave me a fifty. Then he sits in the car with the engine running, two, three minutes. I thought maybe he’d fall asleep, that’d be good. Then he goes over the curb and across the whole road.” His voice cracks. “I ran after him, like an idiot. And when I told Mr. Sutter, he said the Councilman was never here after midnight, and if I wanted to keep my job I’d remember that.”`,
          clues: ['luis_drunk'],
        },
        {
          label: 'Ask to see the valet book',
          text: `“It stays at the stand. Mr. Sutter has it.” He hesitates, then unlocks his phone. “But I took a picture. Right after. I don’t know why. My hands wanted something to do.”

The photo is time-stamped 6:02 a.m. It shows a page of the valet book in his square, careful printing.

> #0417 · LEXUS RX · SILV · CKW 4471
> IN 7:12P (WED)
> OUT 5:58A · MR W (COUNCILMAN)

He sends it to you. “Is that going to get me fired?”

“Probably not,” you tell him, which is the most honest thing you can say.`,
          clues: ['valet_log'],
        },
        {
          label: 'Ask why he didn’t call the police',
          if: 'luis_drunk',
          text: `He looks at his grandmother, who is pretending not to listen.

“Because he’s the Councilman, and Mr. Sutter signs my check. And because I thought, it’s six in the morning, he’s just going up the hill, nobody’s out.” He puts his face in his hands. “Somebody was out.”`,
        },
      ],
    },

    whitcomb: {
      title: 'The Whitcomb house',
      text: `40 Bluff Crest Drive is gray stone at the top of the bluff, with the lake laid out behind it like hammered tin. One garage bay holds a white Volvo. The other is empty and swept very clean.

A small bald man in a bow tie opens the door before you ring. “Preston Voigt. I represent the family.” [if voigt_call]“As I told your lieutenant, Tyler will make a full statement at nine tomorrow. But come in.”[else]“Come in. We have nothing to hide.”[/if]

Brooke Whitcomb stands at the living room window with her arms folded. Dale Whitcomb fills an armchair by the fireplace: six foot four, gray hair, reading glasses. On the stairs, a thin boy in a hoodie sits with his knees pulled up, watching you.`,
      again: `[if family_break]Voigt lets you in without a word. Brooke is in the kitchen with the door shut, and Tyler is nowhere you can see. Dale hasn’t moved from his chair.[else]Voigt opens the door. “Detective. Again.” Nobody has moved.[/if]`,
      choices: [
        {
          label: 'Ask the councilman where he was Wednesday night',
          text: `Dale Whitcomb takes off his glasses. He has a good voice for a council chamber, deep and unhurried.

“At my fundraiser at the Harbor Club. I stayed to thank some supporters and left around one. Took a cab. I was asleep by one-thirty, and the car was in the garage all night.” He glances at Voigt, who nods. “I knew nothing about any of this until Brooke woke me at nine.

“My son made a terrible mistake, Detective. We’re going to help him own it.”`,
          clues: ['dale_story'],
        },
        {
          label: 'Ask Mrs. Whitcomb about the car',
          text: `“Tyler hit a deer.” Brooke says it to the window. “On his way to Maddie’s. Maddie Cho, his girlfriend, in Kessler Park. He came home in such a state, and I didn’t want him to have to look at it. So I called Ray Castellano. He’s done my Volvo for years. He came and got it before lunch.”

“The same morning.”

“It was a *deer*,” she says. And then, when nobody answers: “That’s what I thought.”`,
          clues: ['brooke_repair'],
          set: ['maddie_known'],
        },
        {
          label: 'Look in the garage',
          cost: 0.25,
          text: `Voigt follows you out, pleasant and watchful. The empty bay smells of floor cleaner. In the trash can by the door there’s a dustpan’s worth of sweepings: grit, a leaf, and a scatter of clear and silver plastic chips, like the ones in the gutter on Harbor Road.

“Mrs. Whitcomb is a very tidy person,” Voigt says.`,
        },
        {
          label: 'Ask the councilman about the after-party',
          if: '(shay_tab | valet_log | luis_drunk | roz_saw) & dale_story & !family_break',
          text: `“My client has told you when he left,” Voigt says, before Dale can open his mouth.

[if valet_log]You set your phone on the coffee table, showing Luis Fuentes’s photo of the valet book: *OUT 5:58A · MR W (COUNCILMAN).* Dale looks at it for a long moment. Brooke doesn’t look at it at all.

“A valet’s snapshot of his own handwriting,” Voigt says pleasantly.[else]Dale looks at you over his glasses. “I left at one. I’ve said so.”[/if]

The councilman says nothing else. He looks at the fireplace, which isn’t lit.`,
        },
        {
          label: 'Tell Mrs. Whitcomb what Ray Castellano noticed',
          if: 'ray_seat & !family_break',
          text: `“When Ray got into the Lexus in your garage, the seat was all the way back and the mirrors were set for someone very tall.”

Brooke’s eyes go, for a second, to her husband’s long legs stretched out in front of the armchair. Then to Tyler on the stairs, five foot seven in his socks.

“Tyler likes the seat back,” she says. Nobody believes it, including her.`,
        },
        { label: 'Talk to Tyler', if: '!family_break', go: 'tyler' },
        {
          label: 'Ask the councilman if he has anything to say',
          if: 'family_break',
          text: `Dale Whitcomb looks at you for a long time. Whatever he’s thinking, it doesn’t reach his face.

“Talk to my lawyer,” he says. Voigt is already on the phone.`,
        },
      ],
    },

    tyler: {
      title: 'Tyler Whitcomb',
      text: `Tyler Whitcomb comes down off the stairs when his mother says his name. He’s seventeen and looks younger: narrow shoulders, bitten nails, a Calder Prep hoodie with the sleeves pulled over his hands. Voigt sits beside him on the couch, close enough to touch.

Across the room his father watches from the armchair. Tyler doesn’t look at him once.`,
      again: `Tyler sits on the edge of the couch with Voigt at his elbow. [if doorbell]He sees your face, and his knee starts to bounce.[/if]`,
      choices: [
        {
          label: 'Ask Tyler what happened this morning',
          text: `He has it ready. You can tell he has said it to a mirror.

“I couldn’t sleep, so I took Dad’s car out of the garage, like, quarter to six. I was going to Maddie’s. On Harbor Road something — I felt it hit. I didn’t see what. I didn’t stop. I drove home and told my mom I hit a deer.” He swallows. “I’m really sorry. I’m really, really sorry.”

Voigt pats his arm. “Tyler will make a full statement tomorrow.”`,
          clues: ['tyler_story'],
          set: ['maddie_known'],
        },
        {
          label: 'Ask which way he was driving',
          if: 'tyler_story & (struck_behind | road_marks | gate_video)',
          text: `“West. Toward Maddie’s. Why?”

“She was riding east. She was hit from behind, by a car going east.”

Tyler’s mouth opens and nothing comes out. Voigt puts a hand on his knee. “He’s been awake since yesterday, Detective.”

“I turned around,” Tyler says. “I must have turned around.”`,
        },
        {
          label: 'Ask whether he stopped',
          if: 'tyler_story & (road_marks | gate_video | carmen_account)',
          text: `“No. I said. I didn’t stop.”

“Whoever hit her stopped forty feet on,” you say. “Got out. Walked back and stood over her.”

For the first time Tyler looks across the room at his father. It lasts less than a second.

“Next question,” Voigt says.`,
        },
        {
          id: 'door-only',
          label: 'Show him the doorbell footage',
          if: 'doorbell & tyler_story & !(valet_log | nav_log)',
          text: `You turn your phone around: Tyler walking up the Chos’ steps at 11:02 p.m., and not coming down them until 7:41 the next morning.

Tyler goes white. His knee stops.

“Clocks drift,” Voigt says mildly. “We’ll have our own expert look at it.” He stands. “That’s enough for today.”`,
        },
        {
          label: 'Show him the doorbell footage and the valet log',
          if: 'doorbell & tyler_story & (valet_log | nav_log) & !family_break',
          text: `You set them side by side on the coffee table: Tyler going up the Chos’ steps at 11:02 p.m. and down them at 7:41 a.m., and the valet book, *OUT 5:58A · MR W (COUNCILMAN)*.

“You were asleep in Kessler Park when that car left the Harbor Club,” you say. “Your father drove it.”

“That’s enough,” Voigt says, but Tyler is already crying the way little kids cry, with his whole face. “I was at Maddie’s. I was asleep. Mom came and got me. Mom, I *can’t* —”

“Tyler, stop,” Brooke says. Then her own face goes. “He came in at twenty past six,” she says, to nobody. “He said he hit a deer. He smelled like a distillery. Then the radio said a woman on a bicycle, and I went and got Tyler, and Preston said —” She looks at Voigt. “You said seventeen and sober and no record is probation. You said Dale would go to prison.”

Dale Whitcomb gets up, walks to the window and stands with his back to all of you.

“This conversation is over,” Voigt says. “Dale. Not one word.”`,
          clues: ['family_break', 'brooke_truth'],
          go: 'board',
        },
        { label: 'Go back to the living room', go: 'whitcomb' },
      ],
    },

    cho: {
      title: 'The Cho house',
      text: `The Chos live on Juniper Street in Kessler Park, in a brick bungalow with a porch swing and the little blue eye of a doorbell camera beside the door. Grace Cho answers with a pencil behind her ear and reading glasses pushed up into her hair. Behind her, the dining table is buried in tax binders.

“Is this about Tyler?” She doesn’t wait for an answer. “Maddie didn’t go to school today. She’s been crying since noon and she won’t tell me why.” She looks at you steadily. “Come in. I’d like to know why.”

On the stairs, a tall girl in a Calder State sweatshirt stops halfway down and grips the rail.`,
      again: `Grace lets you in. [if maddie_why]Maddie is at the dining table now, next to her mother, with a box of tissues between them.[else]Maddie is on the stairs again, listening.[/if]`,
      choices: [
        {
          label: 'Ask whether Tyler was here Wednesday night',
          text: `“Yes. He came about eleven. When he stays he sleeps on the basement couch, and the door to Maddie’s room stays open. Those are the rules.” She takes the pencil from behind her ear and sets it down. “I’m not naïve, Detective. I also check.

“I go running at a quarter to six. At twenty to, I went down to the basement for my shoes, which were in the laundry, and he was on the couch. Asleep, mouth open, one sock on.” A small, fond, exasperated shrug. “He was still asleep when I got back.”`,
          clues: ['grace_check'],
        },
        {
          label: 'Ask to see the doorbell camera',
          cost: 0.5,
          text: `She brings up the app on her laptop and scrolls back to Wednesday night. Every time the front door moves, the camera keeps a clip.

> WED 11:02 PM  Front door · Tyler arrives. Gray sedan pulls away.
> THU  5:47 AM  Front door · Grace leaves (running clothes).
> THU  6:38 AM  Front door · Grace returns.
> THU  7:41 AM  Front door · Tyler leaves. White Volvo SUV at curb.

You watch each clip. At 7:41 Tyler gets into the passenger side of the white Volvo, and you can see his mother at the wheel. She doesn’t get out.

“The back door is deadbolted from inside, and it shrieks when you open it,” Grace says. “Nobody used it.” She emails you the clips without being asked.`,
          clues: ['doorbell'],
        },
        { label: 'Talk to Maddie', go: 'maddie' },
      ],
    },

    maddie: {
      title: 'Maddie Cho',
      text: `Maddie Cho sits on the bottom stair with her phone in both hands. She’s seventeen and a couple of inches taller than Tyler, with her mother’s steady eyes, which are red and swollen now.

“I’m not supposed to talk to you,” she says. “He said not to.”

Grace sits down on the step beside her and doesn’t say anything, which seems to be exactly right.`,
      again: `Maddie looks up from her phone. “What else?”`,
      choices: [
        {
          label: 'Ask her about Wednesday night',
          text: `“He was here.” She says it fast and fierce. “He came over at eleven because things at his house are bad, they’re always bad, and he fell asleep on the couch in the basement watching a movie. He didn’t go anywhere. He didn’t *do* anything.”

She stops, hearing herself. “I mean. Whatever he says he did.”`,
        },
        {
          label: 'Ask what Tyler told her today',
          if: 'grace_check | doorbell',
          text: `She looks at her mother. Grace takes her hand.

“He called at noon. He was crying. He said his dad hit somebody with the car. A lady.” She wipes her face with the back of her wrist. “He said the lawyer said if it’s Tyler, it’s juvie. He’s seventeen, he’s got no record, he wasn’t drinking, so it’s probation. But if it’s his dad, his dad goes to prison and it’s in the paper and everything’s over.” Her voice climbs. “So they want him to say it was him. And he’s going to, because he always does what his dad wants.”

She holds out her phone. A text from Tyler, 12:14 p.m.: *if anyone asks i was home last night ok. please. ill explain*`,
          clues: ['maddie_why'],
        },
        { label: 'Go back to Mrs. Cho', go: 'cho' },
      ],
    },

    castellano: {
      title: 'Castellano Collision',
      text: `Castellano Collision is an old brick garage on Tannery Street with a hand-painted sign and a radio playing oldies to nobody. In the second bay a silver Lexus RX sits on a lift with its face torn off: no bumper cover, a raw hole where the left headlight used to be, wires hanging like roots.

Ray Castellano stands in front of it with his arms folded and an unlit cigarette in his mouth. He’s sixty-something, with forearms like hams and a gray crew cut. He looks at your badge, then back at the car.

“Yeah,” he says. “I figured.”`,
      again: `Ray is still standing in front of the Lexus. [if headlight_match]“Your lab lady called about the headlight. I’m not touching that car again till somebody tells me to.”[else]“Haven’t touched it. Not going to.”[/if]`,
      choices: [
        {
          label: 'Ask Ray about the job',
          text: `“Mrs. Whitcomb calls at quarter after ten. Left headlight, bumper cover, paint, rush, she needs it by tomorrow noon. Cash. Thirty-four hundred, and she didn’t blink.” He takes the cigarette out and looks at it. “Says her son hit a deer. Asks can I pick it up at the house, she doesn’t want to drive it. So I go up there at eleven-thirty and she’s got an envelope waiting.

“Then I’m driving it down Bluff Road and the radio says a nurse on a bike, on Harbor Road.” He puts the cigarette back. “I’ve been standing here looking at this thing ever since.”`,
          clues: ['ray_job'],
        },
        {
          label: 'Ask whether a deer could have done it',
          text: `Ray snorts. “Thirty years. You know what a deer does? Hair. In the grille, in the hood seams, in the fog lights. You’re picking it out for a week. Blood, usually.” He points with the cigarette. “Nothing. Not one hair.

“What there is, is a blue scuff on the bumper cover, and this.” He picks something off his workbench and drops it in your palm: a small orange reflector, the kind that clips onto the spokes of a bicycle wheel. “That was jammed in the fog light grille.”`,
          clues: ['no_deer'],
        },
        {
          label: 'Ask how the car was when he picked it up',
          text: `He thinks about it. “Funny you ask. I get in, in their garage, and my feet don’t reach the pedals. Seat’s racked all the way back. All the way. Mirrors pointed at the ceiling. I’m five-nine, and I had to move everything before I could back it out.”

He shrugs. “Somebody big drove that car last. Not her, she’s a little thing. And not the kid I saw in the kitchen door, either. Skinny kid. Looked about fourteen.”`,
          clues: ['ray_seat'],
        },
        {
          label: 'Ask what he did with the old headlight',
          text: `“Scrap bin. I keep the old ones for the core charge. Habit.” He walks to a steel drum by the back door and fishes it out: a Lexus headlight assembly, lens starred, housing cracked, one corner broken clean off.

He hands it over without being asked. “Take it. Take the bumper too if you want. I don’t want any of it in my shop.”`,
          clues: ['old_headlight'],
        },
        {
          label: 'Look over the Lexus',
          cost: 0.5,
          text: `Inside, the car smells like a bar at closing time: stale scotch, cigar smoke, somebody’s expensive aftershave. There’s a Harbor Club matchbook on the passenger seat. In the cupholder, where Ray tossed it when he got in, is a laminated valet hang tag: **HARBOR CLUB VALET · 0417**.

The driver’s seat is forward now, where Ray left it. There are two memory buttons on the door, marked 1 and 2.`,
          clues: ['hang_tag'],
        },
      ],
    },

    warrant: {
      title: 'ADA Gus Pellegrino',
      text: `Assistant District Attorney Gus Pellegrino picks up on the fourth ring with his mouth full. “Sorry. Desk lunch. What have you got?”

You tell him it’s the Harbor Road hit-and-run, and that it touches Councilman Dale Whitcomb.

He stops chewing. “Terrific. Okay. Tell me exactly what you want, and exactly why a judge gives it to you.”`,
      again: `Gus picks up. “You again. Tell me you’ve got more.”`,
      choices: [
        {
          id: 'car-yes',
          label: 'Ask for a warrant to seize the Lexus',
          if: '(ray_job | bodyshop | brooke_repair) & (paint_lexus | part_rx | headlight_match) & !nav_log',
          text: `You give it to him in order: the paint off the bike, [if headlight_match]the fragment that fits Castellano’s scrap-bin headlight edge for edge[else]the part number off the fragment[/if], and a silver RX with its left headlight smashed going into a body shop, rush and cash, five hours after the crash.

“Yeah,” Gus says. “That’s a car I want too. I’ll walk it over to Judge Rosenthal myself. Have a flatbed ready.”`,
          go: 'search',
        },
        {
          id: 'car-no',
          label: 'Ask for a warrant to seize the Lexus',
          if: '!((ray_job | bodyshop | brooke_repair) & (paint_lexus | part_rx | headlight_match))',
          text: `He listens to the end. “So a councilman’s wife got her car fixed. People fix their cars. What puts *that car* on Harbor Road? Bring me paint, or a part, something off the scene that says RX, and I’ll get you the car.”`,
        },
        {
          label: 'Ask for a subpoena for the Harbor Club’s records',
          if: 'club_refused',
          text: `“Valet records and bar tabs, one night, a hit-and-run with the victim in the ICU? That’s not even a hard one.” You hear him typing. “I’ll have it served on Mr. Sutter this afternoon. Two hours, maybe less, depending how long he wants to spend calling his own lawyer.”`,
          set: ['subpoena_sent'],
          timer: {
            in: 2,
            title: 'The Harbor Club’s records',
            text: `The Harbor Club’s records arrive by courier, with a cover letter from the club’s lawyers that is longer than the records.

> VALET · WED · #0417 · LEXUS RX · SILV · CKW 4471
> IN 7:12P · OUT 5:58A · MR W (COUNCILMAN)
>
> COMMODORE RM · TAB 88 · MBR 0212 WHITCOMB, D.
> OPENED WED 23:14 · LAST ITEM THU 05:40 · $1,160.00

The valet page is in a young man’s careful printing. Someone has initialed the bottom of it: *G.S.*`,
            clues: ['valet_log', 'shay_tab'],
          },
        },
      ],
    },

    search: {
      title: 'The Lexus',
      text: `The warrant comes through a little after the hour. A police flatbed backs down Tannery Street, and Ray Castellano lowers the lift himself and watches his rush job get chained down and hauled away.

At the police garage, Dr. Rao’s technician photographs the car inch by inch and bags the valet hang tag from the cupholder. Then she plugs a laptop into a port under the dash. “These things remember everything,” she says. “Where they’ve been, when, how fast. People have no idea.”`,
      clues: ['hang_tag'],
      choices: [
        {
          label: 'Go through the car’s trip log',
          cost: 1,
          once: true,
          text: `It takes an hour to pull and read. What it says takes a minute.

> 19:12 WED  Ignition off · 1 Marina Dr (Harbor Club lot)
> 05:57 THU  Ignition on  · 1 Marina Dr
> 06:03 THU  Departs 1 Marina Dr
> 06:10 THU  Hard braking, 41 mph to 0 · Harbor Rd at Calder Grain
> 06:10 THU  Stationary 0:48 · driver door opened, closed
> 06:21 THU  Ignition off · 40 Bluff Crest Dr
> No other ignition events, 19:12 Wed – 05:57 Thu.

The car never went home at one in the morning. It never left the garage at a quarter to six. It sat at the Harbor Club all night, and just after six it left.`,
          clues: ['nav_log'],
          go: 'board',
        },
      ],
    },
  },

  events: [
    {
      at: 1,
      title: 'The tip line',
      text: `The desk sergeant forwards a message from the tip line. A delivery driver for Sorrento Bakery, Roz Petrakis, heard about Harbor Road on the radio. She was on Harbor Road just after six this morning and saw “a big silver SUV driving like a lunatic.” She’s at the bakery on Canal Street until three.`,
      set: ['roz_tip'],
    },
    {
      at: 5.5,
      if: '!family_break',
      title: 'A call from Preston Voigt',
      text: `Lieutenant Okafor forwards a voicemail with a one-line note: *Convenient. Check it.*

The voice is soft and precise. “Lieutenant, this is Preston Voigt. I represent the Whitcomb family. I’m calling to tell you that Tyler Whitcomb, who is seventeen, was driving his father’s Lexus on Harbor Road early this morning and was involved in the accident there. He is a frightened boy with no record of any kind, and I want to be very clear that there was no alcohol involved. He will come in with me tomorrow at nine to make a full statement.”`,
      clues: ['voigt_call'],
    },
    {
      at: 8,
      if: '!family_break',
      title: 'Channel 6',
      text: `The five o’clock news leads with it. Someone has leaked the name. Over footage of the Whitcombs’ front gate, the anchor reads a statement from the councilman’s office:

“Our son Tyler has made a terrible mistake, and he is ready to take responsibility for it. Our hearts are with Ms. Ibáñez and her family. We ask for privacy as we support our son.”

Dale Whitcomb doesn’t appear. The station runs a file photo of him instead, cutting a ribbon, a head taller than everyone around him.`,
      set: ['news_tyler'],
    },
    {
      at: 11.25,
      title: 'Mercy General',
      text: `Wendell Ames calls your cell at a quarter past eight. He sounds as if he has been crying and is embarrassed about it.

“They lightened her sedation at six. She’s awake. She knows her name, she knows where she is, and she asked who was covering her patients.” He laughs, wetly. “The attending says you can have five minutes this morning if you come now. She wants to talk to you.”`,
      set: ['carmen_awake'],
    },
    {
      at: 12,
      if: '!family_break',
      title: 'Tyler’s statement',
      text: `At nine, in Interview Room 2 on Garland Street, with Preston Voigt at his side, Tyler Whitcomb signs a statement. A copy lands on your desk:

> At approximately 5:45 a.m. I took my father’s Lexus from our garage
> to drive to my girlfriend Maddie Cho’s house in Kessler Park. On Harbor
> Road I hit something. I stopped and got out and saw that it was a
> person on a bicycle. I panicked. I got back in the car and drove home.
> Nobody else was involved.

[if tyler_story]Yesterday Tyler told you he never stopped. Overnight, somebody has told him that the driver did.[else]It’s short and tidy, and it reads as if a lawyer wrote it.[/if]`,
      clues: ['confession'],
      set: ['maddie_known'],
    },
    {
      at: 12,
      if: 'family_break & voigt_call',
      title: 'A call from Preston Voigt',
      text: `At nine, Preston Voigt calls Lieutenant Okafor to say that Tyler Whitcomb will not be making a statement after all. Councilman Whitcomb, he adds, has retained separate counsel. Okafor passes this on to you without comment, which is its own comment.`,
    },
  ],

  report: [
    {
      id: 'who',
      q: 'Who was driving the Lexus when it hit Carmen Ibáñez?',
      options: {
        dale: 'Councilman Dale Whitcomb',
        tyler: 'Tyler Whitcomb, his son',
        brooke: 'Brooke Whitcomb, his wife',
        hank: 'Hank Dorsey, the elevator worker',
        guest: 'Another guest from the Harbor Club',
      },
      answer: 'dale',
      points: 40,
      why: 'The valet book puts the Lexus in Dale Whitcomb’s hands at the Harbor Club at 5:58 a.m., drunk, twelve minutes before the crash. Tyler was asleep in Kessler Park on the Chos’ doorbell camera, and everything known about the driver, from the gate camera to Ray’s racked-back seat to Carmen’s own memory, describes a tall, gray-haired man.',
    },
    {
      id: 'from',
      q: 'Where was the driver coming from?',
      options: {
        club: 'The after-party at the Harbor Club',
        home: 'The Whitcombs’ garage in Bluffside',
        cho: 'The Cho house in Kessler Park',
        route9: 'Route 9, east of the harbor',
      },
      answer: 'club',
      points: 15,
      why: 'The Lexus spent the night at the Harbor Club: out to “Mr. W” at 5:58 in the valet book, swerving out of the valet circle at 6:03 in front of Roz Petrakis, and on its own trip log. It was heading east, toward Bluffside, when it hit her.',
    },
    {
      id: 'repair',
      q: 'Who sent the Lexus to the body shop?',
      options: {
        brooke: 'Brooke Whitcomb',
        dale: 'Dale Whitcomb',
        tyler: 'Tyler Whitcomb',
        voigt: 'Preston Voigt',
      },
      answer: 'brooke',
      points: 15,
      why: 'Brooke called Ray Castellano at 10:15 Thursday for a rush cash job, told him her son had hit a deer, and had him collect the car from her garage.',
    },
    {
      id: 'proof',
      q: 'What proves Tyler’s confession is false?',
      options: {
        doorbell: 'The Chos’ doorbell camera',
        maddie: 'Maddie Cho says he was with her all night',
        text: 'His text asking Maddie to say he was home',
        deer: 'There was no deer hair on the car',
      },
      answer: 'doorbell',
      points: 15,
      why: 'Maddie’s word is a girlfriend’s word, and the text only shows he was asked to lie. The doorbell camera is a record: Tyler went into the Chos’ house at 11:02 p.m. and didn’t come out until his mother picked him up at 7:41 a.m., an hour and a half after the crash.',
    },
    {
      id: 'why',
      q: 'Why did the family put Tyler forward?',
      options: {
        juvenile: 'A sober seventeen-year-old with no record would get probation. The councilman had been drinking all night.',
        loyal: 'Tyler insisted on taking the blame himself',
        insurance: 'Tyler was the only one insured to drive the Lexus',
        club: 'To keep the Harbor Club out of the papers',
      },
      answer: 'juvenile',
      points: 15,
      why: 'Voigt said it himself: seventeen, no record, no alcohol. Dale had been drinking scotch until 5:40 a.m., and as the driver he faced prison and the end of his career. Tyler told Maddie the plan at noon.',
    },
  ],

  outcomes: {
    dale: `Dale Whitcomb was charged with leaving the scene of a crash causing serious injury. Without a blood test nobody could prove how drunk he was when he hit her, but the valet book, Luis Fuentes’s photograph and the Lexus’s own trip log proved he left her in the road. He never said a word to police. He resigned from the council in March and pleaded guilty in May. Brooke was charged with tampering with evidence and got probation. Tyler wasn’t charged with anything.

Carmen Ibáñez went back to Mercy General the next fall, on day shift, with a cane she hates. She drives to work now. Her sister says she bought the house with the porch.`,
    tyler: `You named Tyler Whitcomb, which was what his family wanted, and it went the way Preston Voigt said it would: juvenile court, a plea, two years’ probation and a suspended license for a boy who had been asleep on a couch in Kessler Park. Dale Whitcomb won reelection in November by four points. Carmen Ibáñez told anyone who would listen that the man who stood over her in the road had gray hair. Nobody asked Maddie Cho, and she stopped answering Tyler’s calls in the spring.`,
    brooke: `You named Brooke Whitcomb. She paid for the repair, but her phone put her in bed in Bluffside all night, and the charge was dropped within a week. Tyler signed his statement as planned, and the case closed around a seventeen-year-old who had never been on Harbor Road that morning.`,
    hank: `You named Hank Dorsey. Within days the lab had matched the hair in his grille to a deer, animal control had his 5:35 call about it, and the elevator’s own camera showed him arriving six minutes after the crash to kneel in the road beside her. The charge was dropped. Calder Grain let him go anyway, the week his name was in the paper. Tyler Whitcomb’s statement stood, and the councilman went back to work.`,
    guest: `You named a guest from the Harbor Club you couldn’t name. The valet book shows one car leaving at 5:58, with one man in it. Lieutenant Okafor sent the report back, and by the time you had rewritten it, Tyler Whitcomb’s signed statement was the only account on file.`,
    default: `Lieutenant Okafor read your report twice and sent it back. By the time you had rewritten it, Tyler Whitcomb’s signed statement was the only account on file.`,
  },

  solution: {
    text: `Dale Whitcomb spent Wednesday evening at his own reelection fundraiser at the Harbor Club, and the rest of the night in the Commodore Room drinking eighteen-year-old scotch on his own tab. Shay Brennan poured the last of it at 5:40. At 5:58, over the bartender’s warning and the valet’s offer of a cab, Luis Fuentes brought him his silver Lexus RX. He pulled out of the valet circle at 6:03, across both lanes in front of Roz Petrakis’s bakery van, and drove east on Harbor Road toward home.

At 6:10, by the Calder Grain gate, he drove into the back of Carmen Ibáñez’s bicycle. She was riding home from her shift at Mercy General with her rear light flashing. He stopped forty feet on, got out, walked back and stood over her for half a minute. Then he got back in and drove up Bluff Road with his left headlight out, past Hank Dorsey at the Route 9 light, and was home at 6:21.

He told Brooke he had hit a deer. When the radio said otherwise, Brooke picked Tyler up from Maddie Cho’s house at 7:41, called Preston Voigt, and called Ray Castellano for a rush cash repair. Voigt’s plan was simple: a sober seventeen-year-old with no record gets probation, and a councilman who drank until dawn goes to prison. So Tyler would say he took the car from the garage at 5:45.

Two records break it. The Harbor Club’s valet book has the car leaving the club at 5:58, not the garage at 5:45, and the Chos’ doorbell camera has Tyler inside their house from 11:02 p.m. to 7:41 a.m. Everything else agrees. No cab took Dale home at one. The gate camera, Ray’s racked-back seat and Carmen herself all describe a tall, gray-haired man. The Lexus’s trip log never moved from the Harbor Club lot until 5:57.

Hank Dorsey lied to patrol about his truck because he had a DUI twelve years ago and a smashed front end at a hit-and-run. He had hit a deer on Route 9 at 5:30 and called it in at 5:35, and it made him late for work. He was the one who found Carmen, and he held her hand until the ambulance came.`,
    chain: ['roz_saw', 'shay_tab', 'valet_log', 'luis_drunk', 'dale_story', 'brooke_repair', 'tyler_story', 'doorbell', 'maddie_why', 'family_break'],
    walk: [
      '@scene', 'Ask Officer Salazar',
      '@roz', 'Ask her what she saw',
      '@club', 'Talk to the bartender', 'Ask about the after-party', 'Ask about the valet',
      '@luis', 'Ask about the councilman', 'Ask to see the valet book',
      '@whitcomb', 'Ask the councilman where', 'Ask Mrs. Whitcomb', 'Talk to Tyler', 'Ask Tyler what happened',
      '@cho', 'Ask to see the doorbell', 'Talk to Maddie', 'Ask what Tyler told her',
      '@whitcomb', 'Talk to Tyler', 'Show him the doorbell footage and',
    ],
  },
};
