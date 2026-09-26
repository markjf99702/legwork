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
    salazar: { name: 'Officer Pete Salazar', role: 'Patrol', about: 'First officer on the scene, at 6:24 a.m.', if: '@scene' },
    wendell: { name: 'Wendell Price', role: 'Night charge nurse, Mercy General ICU', about: 'Has worked beside Carmen for nine years. Hasn’t gone home.', if: '@mercy' },
    nadia: { name: 'Nadia Ferrante', role: 'Delivery driver, Sorrento Bakery', about: 'Drives the early bread route. The Harbor Club is her first stop.', if: 'nadia_tip' },
    hollis: { name: 'Hollis Crane', role: 'Manager, the Harbor Club', about: 'Polished, and very careful about his members.', if: '@club' },
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
    nadia_saw: { title: 'Out of the Harbor Club', text: 'Just after six, a big silver Lexus SUV pulled out of the Harbor Club’s valet circle, swerved across both lanes and went east on Harbor Road. The valet ran into the road after it.', who: ['nadia'], at: 'Thu 6:04' },
    shay_tab: { title: 'The Commodore Room tab', text: 'The after-party tab ran on Dale Whitcomb’s member number from 11:14 p.m. Wednesday to the last pour at 5:40 a.m. Thursday: $1,160, most of it scotch.', who: ['dale', 'shay'], at: 'Thu 5:40' },
    luis_drunk: { title: 'The councilman took the car', text: 'At 5:58 a.m. Luis brought the silver RX around for Councilman Whitcomb, who could barely stand. He tipped a fifty, waved off a cab, and drove away across both lanes. Hollis Crane told Luis to forget it.', who: ['luis', 'dale', 'hollis'], at: 'Thu 5:58' },
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

