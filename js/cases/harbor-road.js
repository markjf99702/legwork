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
    roz_saw: { title: 'Out of the Harbor Club', text: 'Just after six, a big silver Lexus SUV pulled out of the Harbor Club’s valet circle, swerved across both lanes and went east on Harbor Road. The valet ran into the road after it.', who: ['roz'], at: 'Thu 6:04' },
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
    nav_log: { title: 'The Lexus’s trip log', text: 'The Lexus was parked at the Harbor Club from 7:05 p.m. Wednesday until 5:59 a.m. Thursday. It stopped for 48 seconds on Harbor Road at 6:10 and was parked at 40 Bluff Crest Drive at 6:21.', who: ['dale'], at: 'Thu 5:59' },
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
      text: `The Calder Grain office is a trailer at the foot of the elevators, with a coffee maker, a space heater and a foreman named Earl Boyce, who looks at your badge and sighs through his nose. “He’s on the dock. I’ll get him.”

Hank Dorsey comes in wiping his hands on a rag. He’s a big, slow man in a feed cap and a canvas coat with a dark stain down the front of it that you realize, after a moment, is hers. Out the window his pickup sits in the lot: a silver Ford with its hood held down by an orange ratchet strap.

He doesn’t sit. “I told the officer already,” he says. “I found her. That’s all I did.”`,
      again: `[if hank_deer]Hank nods to you from the dock. He looks like a man who has stopped waiting for handcuffs.[else]Hank sees you coming across the lot and sets his jaw.[/if]`,
      choices: [
        {
          label: 'Ask him how he found her',
          text: `“I was late. Came in off Route 9, turned onto Harbor Road, and there’s a bike in the lane and something by the fence I thought was a bag of trash.” He turns the rag over in his hands. “It wasn’t.

“I called 911. I put my coat on her. She kept trying to say something and I kept telling her don’t, don’t talk, they’re coming.” He looks down at the stain. “I held her hand till the ambulance. That’s all.”`,
        },
        {
          label: 'Ask about the damage to his truck',
          text: `“Deer.” He says it to the window. “Last week. Haven’t had time to get it fixed.”

You look out at the truck: the strap, the bright creases in the metal, not a speck of rust in any of them.

“Last week,” he says again.`,
        },
        {
          label: 'Look over his truck',
          cost: 0.25,
          text: `The damage is dead center and low: grille pushed in, bumper creased, the hood buckled so it won’t latch. Caught in the grille slats are tufts of coarse gray-brown hair and a smear of something dried dark. Both headlights are intact. Not a crack in either one.

You bag some of the hair. Hank watches from the trailer door and doesn’t try to stop you.`,
          clues: ['hank_grille'],
        },
        {
          label: 'Ask the foreman for the gate camera',
          cost: 0.5,
          text: `Earl Boyce finds the footage on the third try. The camera watches the gate, and past it a slice of Harbor Road, gray and grainy in the dark.

At 6:09:48 a blinking red light slides along the far lane, heading east. At 6:10:03 headlights swell behind it, and the red light is gone. An SUV brakes hard and stops at the edge of the frame with one headlight dark.

The driver’s door opens. A man walks back into the glow of the good headlight and stands there, looking down, for about thirty seconds. As he walks back to the SUV, his head and shoulders show above its roof. He gets in. At 6:10:51 it pulls away east.

At 6:16:20 a pickup comes in from the east, stops short, and a big man in a canvas coat runs to the fence.`,
          clues: ['gate_video'],
        },
        {
          label: 'Tell him you know it wasn’t last week',
          if: 'hank_grille | gate_video | deer_report',
          text: `[if gate_video]“The camera shows you pulling up six minutes after she was hit, Hank. [else]“There’s fresh blood and hair in your grille, Hank. [/if]Nobody thinks you hit her. So why lie about the deer?”

He sits down all at once on a folding chair.

“Hit it this morning. Route 9, five-thirty. A doe came up out of the ditch.” He rubs his face. “I dragged her off the road so nobody else would hit her, and I called it in. Took me half an hour with the strap to get the hood to stay down. That’s why I was late.”

“And the officer?”

“I got a DUI on my record. Twelve years ago. Sober eleven.” He takes a bronze coin out of his pocket, shows you, puts it away. “A guy with my record and a smashed-up truck, next to a lady lying in the road? I know how that goes. So I said last week. Stupid.”`,
          clues: ['hank_deer'],
        },
        {
          id: 'saw-shut',
          label: 'Ask what he saw on the way in',
          if: '!hank_deer',
          text: `“Nothing. It was dark. I was late.” He says it too fast, and goes back to looking out the window.`,
        },
        {
          id: 'saw-open',
          label: 'Ask what he saw on the way in',
          if: 'hank_deer',
          text: `This time he thinks about it.

“At the light. Route 9 and Harbor, where I turn. This big silver SUV comes past me going east, flying, sixty maybe. Left headlight out. I thought, there’s another guy who hit a deer.” He stops. “It went up Bluff Road. Up the hill. That would’ve been, what, 6:13. A couple minutes before I found her.”

He stares at you. “That was him, wasn’t it. I watched him go.”`,
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

