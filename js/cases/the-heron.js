// Case 5. A painting cut from its frame during the museum’s donors’ dinner, and the guard’s own code on the
// alarm. The thief took a copy; the question is who needed it gone, and where the real one went.

// Conditions used in more than one place.
const COPY = 'modern_canvas | weave_differs | mina_copy | no_thumbprint';
const IMOGEN_KNOWN = '@imogen | cole_contact | sign_out_log | visitor_log | mina_named | imogen_photo_story';
const PC_COLE = '(cole_missing | (cole_story & dock_camera)) & (cole_loaded | dock_loading | carrier_flakes | (gallery_call & cole_contact) | cole_browser)';
const PC_IMOGEN = 'cole_flips | imogen_slip | ((modern_canvas | weave_differs | no_thumbprint) & (lena_no_booking | mina_copy | egret))';
const CONFRONT = `lena_no_booking | mina_copy | egret | greta_empty_wall | nadia_put_off | canvas_found | ${COPY}`;

export default {
  id: 'the-heron',
  n: 5,
  title: 'The Heron',
  crime: 'Art theft',
  difficulty: 3,
  summary: 'During the Calder Museum’s donors’ dinner, somebody cut Port Calder’s best-loved painting out of its frame. The alarm was switched off with the night guard’s own code.',
  days: ['Friday', 'Saturday', 'Sunday'],
  start: { day: 1, hour: 8 },
  hours: 16,

  briefing: `Lieutenant Ruth Okafor has the Saturday paper open on her desk. The photograph on the front page is an empty gold frame.

“The Calder Museum of Art had its donors’ dinner last night. Two hundred people in the atrium, a string quartet, crab cakes. And while the director was making his speech, somebody walked into Gallery 4 and cut a painting out of its frame.”

> INCIDENT 26-14172 · THEFT · CALDER MUSEUM OF ART, OLD TOWN
> Reported 9:58 p.m. Friday by O. Delaney, head of security.
> “Heron at Dusk,” Edith Carrow, 1911. Oil on canvas, 24 × 30 in.
> Insured value $420,000. Cut from frame. Discovered 9:52 p.m.
> by guard W. Szymanski on his round.
> Console: Gallery 4 motion sensor BYPASSED 21:14, RESTORED 21:25.
> User code 04 (SZYMANSKI).

“The guard’s own code switched the sensor off, and the guard says he was outside having a cigarette, alone. The museum suspended him at midnight. Everyone has decided he did it.” She folds the paper so the frame is face down. “I’d like somebody to find out.”

“The FBI’s Art Crime Team has been told. Special Agent Marcus Bell, in Chicago. He’ll take your call, but he gets a hundred of these a year, so ask him something he can answer.” She hands you the folder. “Report on my desk by noon tomorrow, {det}. Bring me the chain, not a hunch.”`,

  startClues: ['discovered', 'console_log'],

  people: {
    walt: { name: 'Walt Szymanski', role: 'Security guard, Calder Museum', about: '61. Thirty-one years at the museum, four months from retirement. Found the empty frame. Suspended.' },
    thorne: { name: 'Julian Thorne', role: 'Director, Calder Museum', about: '54. Came from a museum in Boston six years ago. Was giving his speech when the painting was taken.' },
    bell: { name: 'Marcus Bell', role: 'Special Agent, FBI Art Crime Team', about: 'Works out of Chicago. Knows the back rooms of the art market.' },
    otis: { name: 'Otis Delaney', role: 'Head of security, Calder Museum', about: '58. A retired Port Calder patrol sergeant. Walt’s boss, and his friend.', if: '@gallery | @security' },
    nadia: { name: 'Nadia Ferrante', role: 'Conservator, Calder Museum', about: '47. Has cared for the collection for fifteen years. Wrote Heron’s last condition report, in 2019.', if: '@gallery | @nadia' },
    imogen: { name: 'Imogen Park', role: 'Registrar, Calder Museum', about: '39. Keeps the records of where every object is. Handles loans and storage, and the paperwork for the Chicago loan.', if: IMOGEN_KNOWN },
    bev: { name: 'Bev Santoro', role: 'Owner, Santoro Catering', about: 'Fifties. Catered the dinner with eighteen staff and ran the floor herself.', if: '@catering' },
    cole: { name: 'Cole Brandt', role: 'Server, Santoro Catering', about: '22. Hired three weeks ago. Worked the dinner.', if: 'cole_missing | cole_contact | @cole' },
    teddy: { name: 'Teddy Brisco', role: 'Driver, Santoro Catering', about: 'Drove the catering van to the museum and back on Friday.', if: 'cole_loaded' },
    greta: { name: 'Greta Lindqvist', role: 'Widow of the donor', about: '78. Her late husband, Anders, gave Heron to the museum in 2009. Lives in Bluffside.', if: 'greta_named | @greta | @erik' },
    erik: { name: 'Erik Lindqvist', role: 'The donor’s son', about: '49. Sued to get Heron back and lost. Argued with the director at the dinner.', if: 'erik_argument | @erik' },
    lena: { name: 'Lena Moss', role: 'Freelance photographer', about: 'Photographs the museum’s collection for its catalogs.', if: 'sign_out_log | imogen_photo_story' },
    mina: { name: 'Mina Varga', role: 'Painting student, Calder State', about: '26. A graduate student. Copied Heron last winter under the museum’s copyist program.', if: 'mina_named' },
    fisk: { name: 'Leonard Fisk', role: 'Art dealer, Chicago', about: '67. A gallery on Oak Street and a gray reputation.', if: 'fisk | toronto_offer | condo_search' },
  },

  clues: {
    discovered: { title: 'The empty frame', text: 'Walt Szymanski found the frame in Gallery 4 empty on his 9:52 p.m. round. On his 8:50 round the painting was there.', who: ['walt'], at: 'Fri 21:52' },
    console_log: { title: 'Walt’s code on the console', text: 'The security console shows the Gallery 4 motion sensor bypassed at 9:14 p.m. and restored at 9:25, both times with user code 04: Walt Szymanski’s. A sensor can only be bypassed at the console itself.', who: ['walt'], at: 'Fri 21:14' },
    canvas_strips: { title: 'Strips left in the frame', text: 'The canvas was cut out along the inside of the stretcher bars, leaving half-inch strips still tacked to the wood. Nadia Ferrante thought their edges looked cleaner than she remembered.', who: ['nadia'] },
    service_door: { title: 'The service corridor', text: 'Gallery 4 is the only gallery with a door onto the service corridor, which runs from the kitchen past the security office to the loading dock. The caterers used it all night. Its camera has been broken since August.', who: ['otis'] },
    loan: { title: 'The Chicago loan', text: 'Heron is due to ship to the Art Institute of Chicago in five weeks, the centerpiece of a show of Great Lakes painters. Thorne announced it in his speech. Imogen Park handles the paperwork.', who: ['thorne', 'imogen'] },
    loan_exam: { title: 'Every loan is examined', text: 'The Art Institute’s conservators examine every incoming loan when it arrives, under raking light and ultraviolet, against the lender’s condition report.', who: ['nadia', 'imogen'] },
    code_note: { title: 'The code under the keyboard', text: 'Walt keeps his code on a yellow sticky note stuck under the console keyboard. The codes change every quarter, and since his wife died he can’t hold numbers.', who: ['walt'] },
    visitor_log: { title: 'Imogen at the console', text: 'Last Tuesday Imogen Park spent an hour at the security console desk, “reviewing camera coverage for Chicago loan.” For most of it Walt was out on a round and she was alone.', who: ['imogen', 'walt'] },
    dock_camera: { title: 'Walt alone on the dock', text: 'The loading dock camera shows Walt smoking alone from 9:11 to 9:27 p.m. Nobody else comes out onto the dock the whole time.', who: ['walt'], at: 'Fri 21:11' },
    dock_loading: { title: 'One server loads the van', text: 'At 10:38 p.m. a young server loads all six Santoro sheet-pan carriers into the van by himself, waving the driver away.', at: 'Fri 22:38' },
    valet_log: { title: 'Erik left at 8:40', text: 'The valet sheet shows Erik Lindqvist’s car brought around at 8:40 p.m. It was not parked again that night.', who: ['erik'], at: 'Fri 20:40' },
    walt_story: { title: 'Walt’s smoke break', text: 'Walt says he went out to the loading dock at ten past nine, as he does during every speech, and came back at half past. He left the security office door propped open. He saw nobody else on the dock.', who: ['walt'], at: 'Fri 21:10' },
    speech: { title: 'Thorne’s speech', text: 'Julian Thorne spoke from the atrium stage from 9:05 to 9:30 p.m., in front of two hundred guests.', who: ['thorne'], at: 'Fri 21:05' },
    erik_argument: { title: 'Erik’s threat', text: 'At about 8:30 p.m. Erik Lindqvist confronted Thorne at the bar about the Chicago loan and told him the museum would lose the painting “one way or another.”', who: ['erik', 'thorne'], at: 'Fri 20:30' },
    deficit: { title: 'The museum’s deficit', text: 'The museum lost $1.4 million last year. A $420,000 insurance payment would help, and Thorne knows how that sounds.', who: ['thorne'] },
    value_raised: { title: 'The insured value went up', text: 'In August Thorne had Heron’s insured value raised from $300,000 to $420,000. The Chicago loan agreement required a current valuation.', who: ['thorne'] },
    claim_pressure: { title: 'The adjuster wants a claim', text: 'The insurer’s adjuster is pressing Thorne to file for the full $420,000 by Monday.', who: ['thorne'] },
    sign_out_log: { title: 'Out for photography', text: 'The movement log: Heron signed out of Gallery 4 by I. Park on September 3 for “Photography (L. Moss), AIC catalog,” kept in the registrar’s storeroom, and returned on September 5.', who: ['imogen', 'lena'] },
    imogen_alibi: { title: 'Imogen by the stage', text: 'Imogen Park stood beside the stage through the whole speech, holding Thorne’s notes. The event photographer caught her in every frame from 9:05 to 9:30.', who: ['imogen'], at: 'Fri 21:05' },
    server_door: { title: 'A white jacket at 9:11', text: 'An event photograph taken at 9:11 p.m., during the speech, catches the service door swinging shut behind someone in a white catering jacket.', at: 'Fri 21:11' },
    imogen_photo_story: { title: 'Imogen’s September', text: 'Imogen says Heron came off the wall for two days in September so Lena Moss could photograph it for the Chicago catalog.', who: ['imogen', 'lena'] },
    imogen_debt: { title: 'Imogen’s debts', text: 'A second mortgage on her condo in default since May, a $38,210 credit card judgment, and a $44,600 lien from the memory-care home where her mother lived until she died last year.', who: ['imogen'] },
    egret: { title: 'Egret Holdings LLC', text: 'Formed in July with Imogen Park as organizer. Its registered address is her condo, Marina Point 6B, on Harbor Road. It has no website, no phone and no visible business.', who: ['imogen'] },
    imogen_slip: { title: '“He was supposed to burn it”', text: 'Told that Cole had kept the canvas, Imogen said, “He was supposed to burn it.” Then she asked for a lawyer.', who: ['imogen', 'cole'] },
    condo_search: { title: 'The Egret folder', text: 'In Imogen’s desk: an Egret bank statement showing $118,000 wired from Fisk Fine Art on September 12, an email from Fisk about “our friend in Toronto,” and the Art Institute’s loan schedule with its condition exam highlighted.', who: ['imogen', 'fisk'] },
    nadia_put_off: { title: 'Nadia was put off', text: 'In September Nadia asked to do the usual pre-loan check on Heron. Imogen put her off: first it was out for photography, then Chicago would do its own.', who: ['nadia', 'imogen'] },
    weave_differs: { title: 'Not the 2019 canvas', text: 'Under magnification the strips show a modern, perfectly even weave, 16 threads by 16. Nadia’s 2019 photographs of Heron show old, irregular linen with a different count. The canvas cut from the frame isn’t the one she photographed.', who: ['nadia'] },
    mina_named: { title: 'A student copied Heron', text: 'Last winter a Calder State graduate student, Mina Varga, copied Heron in the gallery under the copyist program. Imogen signs the permits. The rules say a copy must differ from the original by ten percent in size.', who: ['nadia', 'mina', 'imogen'] },
    modern_canvas: { title: 'The stolen canvas was a copy', text: 'Dr. Rao: modern commercial linen, an acrylic ground and titanium white, none of which Edith Carrow could have bought in 1911. The painting cut from the frame was a modern copy.' },
    flakes_match: { title: 'The carrier held the canvas', text: 'The paint flakes and threads from Santoro carrier 14 match the strips left in the frame: the same linen, the same ground, the same paint.' },
    cut_match: { title: 'The cut edges match', text: 'The ragged edges of the canvas from Cole’s closet fit the strips left in the Gallery 4 frame, cut for cut.', who: ['cole'] },
    cole_missing: { title: 'Cole was missing', text: 'Bev Santoro says Cole Brandt was gone from the floor from about 9:10 to 9:28, during the speech. He came back red in the face and said he’d been smoking on the dock.', who: ['cole', 'bev'], at: 'Fri 21:10' },
    cole_contact: { title: 'Cole’s application', text: 'Cole was hired three weeks ago on Imogen Park’s referral. His application lists her as his emergency contact (“cousin”) and his cell as 555-310-0172.', who: ['cole', 'imogen'] },
    cole_loaded: { title: 'Cole loaded the carriers', text: 'The driver, Teddy Brisco, says Cole insisted on loading the sheet-pan carriers himself on Friday night, and took one inside to wash the moment they got back.', who: ['teddy', 'cole'], at: 'Fri 22:40' },
    carrier_flakes: { title: 'Flakes in carrier 14', text: 'Santoro’s carrier 14 had been washed, but the channel along its door gasket held flakes of blue-gray paint, a chalky white ground and a few stiff linen threads.' },
    cole_story: { title: 'Cole’s story', text: 'Cole says he stepped out onto the loading dock for a smoke during the speech, “like five minutes.”', who: ['cole'] },
    cole_browser: { title: 'Cole looked up Carrow', text: 'Open on Cole’s laptop: a page of Edith Carrow auction results.', who: ['cole'] },
    gallery_call: { title: 'A call about a Carrow', text: 'On Saturday morning a young man phoned Lomax Fine Art on Bluff Avenue to ask what a Carrow would bring “without paperwork.” The call came from a cell number ending in 0172.', at: 'Sat 10:40' },
    canvas_found: { title: 'The canvas in the closet', text: 'In a hockey bag in Cole’s closet, wrapped in a Santoro tablecloth: a rolled canvas of a heron in the reeds at dusk, about 24 by 30 inches, with ragged cut edges.', who: ['cole'] },
    cole_flips: { title: 'Cole’s statement', text: 'Cole says Imogen planned it. She got him the job, gave him Walt’s code and told him when Walt smoked. He cut the canvas, hid it in a carrier and was told to burn it. He kept it. She paid him $2,000 and promised $8,000 more.', who: ['cole', 'imogen'] },
    greta_tired: { title: '“She looked tired”', text: 'At the dinner Greta Lindqvist stood in front of Heron and thought it looked tired and flat, “as though somebody had turned the light down in her.”', who: ['greta'], at: 'Fri 20:14' },
    greta_empty_wall: { title: 'An empty wall on September 4', text: 'Greta brought her garden club to see Heron on September 4. The wall was empty, with a card: “Temporarily off view.”', who: ['greta'] },
    no_thumbprint: { title: 'No thumbprint in the reeds', text: 'Edith Carrow pressed her thumb into the wet paint in a corner of every canvas; on Heron it’s in the reeds at the lower left. The canvas from Cole’s closet has no thumbprint.', who: ['greta', 'mina'] },
    erik_motion: { title: 'Erik’s lawsuit', text: 'At 3:52 p.m. Friday Erik’s lawyer filed a motion to block the Chicago loan under the deed of gift, which says the painting stays in Port Calder. “One way or another” meant in court.', who: ['erik'], at: 'Fri 15:52' },
    lena_no_booking: { title: 'Lena never shot Heron', text: 'Lena Moss has never photographed Heron and hasn’t worked at the museum since April. From September 3 to 5 she was shooting a wedding in Traverse City.', who: ['lena'] },
    mina_copy: { title: 'A full-size copy for Imogen', text: 'Imogen asked Mina for a copy the same size as the original, signed a waiver of the rule, supplied the canvas and paid $3,000 cash for “a donor.” Mina delivered it to Imogen’s condo in May.', who: ['mina', 'imogen'] },
    toronto_offer: { title: 'A Carrow heron in Toronto', text: 'Two weeks before the theft, Leonard Fisk offered a Toronto collector a Carrow heron at dusk, 24 by 30 inches, for $390,000. The collector’s adviser asked the FBI about it.', who: ['fisk', 'bell'] },
    fisk: { title: 'Leonard Fisk', text: 'A Chicago dealer the FBI has investigated twice and never charged. He buys from people who need money quietly.', who: ['fisk', 'bell'] },
    fisk_paid: { title: 'Fisk paid Egret', text: 'On September 12 Fisk Fine Art wired $118,000 to Egret Holdings LLC’s account at Northshore Savings. The memo line says “consultation.”', who: ['fisk', 'bell'] },
  },

  leads: {
    gallery: { title: 'Gallery 4', where: 'Calder Museum of Art · Old Town', kind: 'place', cost: 1, again: 0.5 },
    walt: { title: 'Walt Szymanski', where: 'At home · Tillman St, Northgate', kind: 'person', cost: 1, again: 0.5 },
    thorne: { title: 'Julian Thorne', where: 'Director’s office · Calder Museum', kind: 'person', cost: 1, again: 0.5 },
    bell: { title: 'FBI Art Crime Team', where: 'Special Agent Marcus Bell · by phone', kind: 'phone', cost: 0.5, again: 0.5 },
    records: { title: 'Records', where: 'Theo Marsh · Garland St basement', kind: 'records', cost: 0.5, again: 0.5 },
    security: { title: 'The security office', where: 'Calder Museum · service corridor', kind: 'place', cost: 1, again: 0.5, if: '@gallery | @walt' },
    nadia: { title: 'Nadia Ferrante', where: 'Conservation studio · Calder Museum', kind: 'person', cost: 1, again: 0.5, if: '@gallery' },
    imogen: { title: 'Imogen Park', where: 'Registrar’s office · Calder Museum', kind: 'person', cost: 1, again: 0.5, if: '@gallery | @thorne | @nadia', until: 'imogen_sick | imogen_arrested', closed: 'Not in' },
    lab: { title: 'Crime lab', where: 'Dr. Anjali Rao · Garland St', kind: 'lab', cost: 0.5, again: 0.5, if: 'canvas_strips | carrier_flakes | canvas_found' },
    catering: { title: 'Santoro Catering', where: 'Foundry St · The Flats', kind: 'place', cost: 1, again: 0.5, if: '@gallery | @walt | @security' },
    cole: { title: 'Cole Brandt', where: '1526 Carver Ave · Northgate', kind: 'person', cost: 1, again: 0.5, if: 'cole_missing | cole_contact', until: 'canvas_found', closed: 'In custody' },
    interview: { title: 'Cole Brandt, in custody', where: 'Interview Room 2 · Garland St', kind: 'person', cost: 0.5, if: 'canvas_found', scene: 'cole_room' },
    greta: { title: 'Greta Lindqvist', where: 'Lake Crest Road · Bluffside', kind: 'person', cost: 1, again: 0.5, if: 'greta_named | @erik' },
    erik: { title: 'Erik Lindqvist', where: 'A loft on Mill St · The Flats', kind: 'person', cost: 1, again: 0.5, if: 'erik_argument' },
    lena: { title: 'Lena Moss', where: 'Photographer · by phone', kind: 'phone', cost: 0.5, if: 'sign_out_log | imogen_photo_story', once: true, onceNote: 'Called' },
    mina: { title: 'Mina Varga', where: 'Her studio · Kessler Park', kind: 'person', cost: 1, again: 0.5, if: 'mina_named' },
    warrant: { title: 'Warrants', where: 'ADA Gus Pellegrino · by phone', kind: 'phone', cost: 0.5, again: 0.5, if: 'cole_missing | cole_contact | sign_out_log | mina_copy | egret', until: 'canvas_found & condo_search', closed: 'Served' },
    condo: { title: 'Imogen Park at home', where: 'Marina Point 6B · Harbor Rd', kind: 'person', cost: 1, again: 0.5, if: `imogen_sick & (${IMOGEN_KNOWN})`, until: 'imogen_arrested', closed: 'In custody' },
  },

  scenes: {
    gallery: {
      title: 'Gallery 4',
      text: `Gallery 4 is a small square room at the back of the east wing, painted a deep green that makes gold frames glow. Six paintings of the Great Lakes hang in it: ice on the harbor, a wheat field, a lighthouse in fog. On the far wall a seventh frame hangs empty, like a window somebody has bricked up.

Otis Delaney, the head of security, is waiting for you at the door, a big man in a museum blazer who still stands like the patrol sergeant he used to be. Inside, a woman in white cotton gloves is on a stepladder, photographing the empty frame: Nadia Ferrante, the conservator.

“Walt found it on his 9:52 round,” Otis says. “I had the doors locked by ten and your people here by 10:04. Didn’t matter. It was gone.”`,
      again: `Gallery 4 is closed to the public, with a strip of tape across the door. [if canvas_strips]The empty frame is still on the wall, a pale line along its inner edge where you took the strips.[else]The empty frame is still on the wall.[/if]`,
      choices: [
        {
          label: 'Look closely at the frame',
          cost: 0.5,
          text: `You climb Nadia’s stepladder with a flashlight. The gilt frame and the wooden stretcher inside it are untouched. Somebody ran a very sharp blade around the inside of the stretcher bars, fast and fairly straight, and left a margin of canvas behind, still tacked to the wood: four strips about half an inch wide, with a little orange sky along the top and a little dark water along the bottom.

Nadia has come to the foot of the ladder. “A utility knife, probably. Somebody who didn’t care about the picture.” She looks up at the strips for a long moment. “The tacking edges are cleaner than I remember. Brighter.” Then she shakes her head. “It’s these lights. I’d want them under my microscope before I said anything.”

You work the strips free with her tweezers and bag them for the lab.`,
          clues: ['canvas_strips'],
        },
        {
          label: 'Ask Otis how someone got in',
          text: `“Through there.” Otis points at a plain gray door in the corner that you took for a closet. “Gallery 4 is the only gallery with a door onto the service corridor. That’s how we move art in and out. The corridor runs from the kitchen, past my security office, to the freight elevator and the loading dock. The caterers were up and down it all night with their carts.”

“And the sensor?”

“Bypassed at the console in my office at 9:14 with Walt’s code, switched back on at 9:25. You can’t do it from anywhere else.” He rubs his jaw. “There’s a camera on that corridor. It’s been dead since August. The work order’s in.”`,
          clues: ['service_door'],
        },
        {
          label: 'Ask Otis about Walt',
          text: `“Thirty-one years. He was here before me and I figured he’d be here after.” Otis looks at the empty frame. “The board suspended him at midnight. They want a head, and his is handy.”

“You don’t think he did it.”

“Walt’s stubborn and slow on the stairs and he smokes like it’s 1975. He’s not a thief. And if he was, he wouldn’t be dumb enough to use his own code.” He shrugs. “He takes his break on the loading dock during the speeches. Every event, same time. Anybody who’s worked a night here knows that.”`,
        },
        {
          label: 'Ask who was in the building last night',
          text: `Otis has it on a card in his breast pocket. “Four guards, Walt on the east wing. Eighteen people from Santoro Catering, out of The Flats. A string quartet. The valet company. And our own people: Mr. Thorne, the development office, Nadia here, Imogen Park from the registrar’s office.” He puts the card away. “Two hundred guests. We checked every handbag on the way out. Nobody walked out the front door with a painting.”

“The back door?”

He doesn’t answer that.`,
        },
        {
          label: 'Ask Nadia about the painting',
          text: `Nadia climbs down and pulls off one glove.

“Edith Carrow painted it in 1911 from a rowboat in the marsh at the mouth of the Tamsin, where the grain elevators are now. A great blue heron in the shallows, the sky going orange behind it. She painted fast, wet into wet. It’s the best thing she ever did.” She says it as a plain fact. “Anders Lindqvist gave it to us in 2009. His widow still comes to visit it.”

“Anything unusual about it lately?”

“It goes to Chicago in five weeks, on loan to the Art Institute. That was the big excitement.” She looks at the frame. “Was.”`,
          clues: ['loan'],
          set: ['greta_named'],
        },
      ],
    },

    security: {
      title: 'The security office',
      text: `The security office is a windowless room on the service corridor, halfway between the kitchen doors and the loading dock. A bank of monitors, a coffee maker with a burned smell, and a console desk with a keyboard worn shiny. The door has a keypad lock and a rubber wedge on the floor beside it.

Otis Delaney sees you look at the wedge. “Walt props the door when he goes out to smoke, so he doesn’t have to punch the code with cold hands.” He sighs. “I’ve told him.”

On the console screen, Friday night’s event log is still up.`,
      again: `Otis has a fresh pot of coffee going. The rubber wedge is gone from the floor. Somebody has thrown it away.`,
      choices: [
        {
          label: 'Read the console log',
          text: `> FRI 21:14:07  ZONE 4E-M (GALLERY 4 MOTION)  BYPASS   USER 04
> FRI 21:25:40  ZONE 4E-M (GALLERY 4 MOTION)  RESTORE  USER 04
> FRI 21:52:18  ZONE 4E    GUARD TOUR TAG  SZYMANSKI

“A bypass shuts off one sensor and leaves the rest of the building live,” Otis says. “You have to pick the zone off a list of two hundred. Whoever did this knew which one was Gallery 4, and knew to switch it back on after, so the board looked normal when Walt came in.”`,
        },
        {
          label: 'Look under the keyboard',
          text: `You lift the keyboard. Stuck to the desk underneath, where the keyboard’s feet have kept it flat and hidden, is a yellow sticky note in shaky ballpoint: four digits, a dash, and a W.

Otis closes his eyes. “Oh, Walt.”

He doesn’t need to check his list, but he checks it anyway. It’s Walt’s current code.`,
          clues: ['code_note'],
        },
        {
          label: 'Read the visitor log',
          text: `Otis hands you a clipboard. Anyone who isn’t security signs in and out.

> TUE  14:10  I. PARK (REGISTRAR)
>             Reviewing camera coverage for Chicago loan
>       15:15  OUT

“The Art Institute sends a questionnaire before a loan: how many cameras, where, how long we keep the footage,” Otis says. “Imogen handled it. Walt sat with her.” He frowns at the clipboard. “Or he was supposed to. He had a round at two.”`,
          clues: ['visitor_log'],
        },
        {
          label: 'Watch the loading dock camera',
          cost: 1,
          text: `Otis cues it up: a fixed view of the concrete dock, the Santoro van backed in, a sand bucket for cigarette butts.

At 9:11 p.m. Walt Szymanski comes out through the steel door, lights a cigarette and leans on the rail. He smokes three, one after another, and looks at his phone. Nobody else comes out. At 9:27 he grinds out the last one and goes back inside.

Sixteen minutes, alone, forty yards from the console. You run it again at normal speed to be sure. Otis watches it both times, and his ears go red. “That’s him,” he says. “That’s him the whole time.”`,
          clues: ['dock_camera'],
        },
        {
          label: 'Keep watching until the van leaves',
          if: 'dock_camera',
          cost: 0.5,
          text: `The dinner ends, and the dock fills up with patrol officers and caterers. At 10:38 the kitchen door opens and a young server in a white jacket pushes out a stack of tall black sheet-pan carriers on a dolly. The driver steps forward to help and the kid waves him off, then loads all six into the van himself, one at a time, and shuts the doors.

A patrol officer opens two carriers from the next stack and looks inside: tablecloths, dirty napkins. She waves them through. At 10:51 the van pulls away.`,
          clues: ['dock_loading'],
        },
        {
          label: 'Ask for the valet sheet',
          if: 'erik_argument | @erik',
          text: `The valet company leaves a copy every event. Otis finds it in a tray.

> 20:40  LINDQVIST, E.  BLK AUDI  TKT 118  RETURNED TO OWNER

“Left before the speech,” Otis says. “I walked him to the door myself after he yelled at Mr. Thorne. He didn’t come back. Not by the front, anyway, and his car went with him.”`,
          clues: ['valet_log'],
        },
        {
          label: 'Walk from the console to Gallery 4',
          cost: 0.5,
          text: `You time it. Out of the security office, left down the service corridor, past the swinging kitchen doors and the freight elevator, through the gray door into Gallery 4: ninety seconds at a walk. There are no public rooms on the way, and the only camera, over the freight elevator, has a handwritten sign taped to it: OUT OF ORDER · W/O 4471.

The corridor is lined with catering things from last night: stacked chairs, a rack of glasses, a folded tablecloth. A server in a white jacket pushing a cart would be about as noticeable as the wallpaper.`,
          clues: ['service_door'],
        },
      ],
    },

    walt: {
      title: 'Walt Szymanski',
      text: `Walt Szymanski lives in a brick bungalow on Tillman Street in Northgate, with a chain-link fence and a birdbath in the yard with no water in it. He opens the door in his uniform trousers and an undershirt, as if he got halfway through dressing for work and remembered.

He is sixty-one, heavy through the shoulders, with a gray crew cut and nicotine on two fingers. On the kitchen table there is a coffee cup, an ashtray and a letter on museum letterhead. He turns the letter face down before you sit.

“Thirty-one years,” he says. “Go on. Ask.”`,
      again: `Walt lets you in without a word. The letter from the museum is still on the kitchen table, [if dock_camera]face up now.[else]still face down.[/if]`,
      choices: [
        {
          label: 'Ask about Friday night',
          text: `“Round at 8:50, like always. Gallery 4, the bird’s on the wall, same as thirty years.” He means Heron. “Then my break. I go out on the dock at ten after nine every event, when the speeches start, because nobody needs a guard during the speeches. Back at half past. Next round is 9:52, and there’s nothing in the frame.”

“Anybody see you out there?”

“Nobody out there to see. Had the dock to myself the whole time.” He taps a cigarette out of the pack and doesn’t light it. “I left the office door propped. I know how it looks. The code’s mine. I know.”`,
          clues: ['walt_story'],
        },
        {
          label: 'Ask who else knew his code',
          text: `He doesn’t answer for a while.

“They change them every quarter. Four new numbers every three months, and I’m sixty-one.” He turns the coffee cup in his hands. “My wife remembered numbers for me. Phone numbers, the bank card. She’s been gone two years.” He looks at you. “I wrote it on a sticky note and put it under the keyboard. Nobody knows. Otis would have my hide.”`,
          clues: ['code_note'],
        },
        {
          label: 'Ask who’s been in the security office lately',
          text: `“Otis. The other guys. The cleaners.” He thinks. “Imogen, from the registrar’s office, Tuesday. She had a list of questions from Chicago about the cameras. I sat with her a while, and then I had my two o’clock round, and she said go on, she’d be fine.” He shrugs. “She was still at the desk when I got back. Forty minutes, maybe. Nice girl. She brought me a coffee.”`,
          clues: ['visitor_log'],
        },
        {
          label: 'Ask about the caterers',
          text: `“Up and down the corridor all night with those big black boxes on dollies. You stop seeing them after a while.” He scratches his jaw. “On the dock, though? Nobody. Not a soul came out while I was there. I’d have bummed one of them a smoke.”`,
        },
        {
          label: 'Tell him the dock camera clears him',
          if: 'dock_camera',
          text: `You tell him what the camera shows: 9:11 to 9:27, three cigarettes, nobody else.

Walt nods slowly. He picks up the letter from the museum, reads it again, and puts it down face up.

“Thirty-one years,” he says, “and it’s a camera that vouches for me.” His voice isn’t quite steady. “Somebody used my number. Somebody read it off that stupid note and used it while I was out there smoking.” He wipes his eyes with the heel of his hand, fast, as if it were dust. “You find them.”`,
        },
      ],
    },

    thorne: {
      title: 'Julian Thorne',
      text: `The director’s office is on the top floor, with a window over Old Town and the courthouse dome. Julian Thorne is fifty-four, tall and silver-haired, in a good gray suit on a Saturday morning. He hasn’t slept either, but on him it looks deliberate.

“Detective. Please.” He has the morning paper on his desk too, with the empty frame on the front page. “Do you know what the donors’ dinner pays for? The school program. Every fourth grader in Port Calder comes through this building once. That’s what last night was for.” He pushes the paper away. “And now it’s for this.”`,
      again: `Thorne is on the phone when you come in and ends the call quickly. [if claim_pressure]“The insurance woman,” he says. “She’s very keen.”[else]“The board,” he says. “They’re very upset.”[/if]`,
      choices: [
        {
          label: 'Ask about the dinner',
          text: `“Cocktails at seven, dinner at eight, my remarks at five past nine. I spoke for twenty-five minutes, which my wife says was fifteen too many.” He almost smiles. “I announced Heron’s loan to Chicago. Two hundred people applauded. Some of them stood.”

“Not everyone was pleased?”

The smile goes. “Erik Lindqvist. Anders Lindqvist’s son. He cornered me at the bar at half past eight, in front of the mayor, and told me we would lose that painting ‘one way or another.’ Otis walked him out.” He straightens a pen. “His mother was there. Greta. She was mortified, poor woman. She’s been a friend to this museum for forty years.”`,
          clues: ['speech', 'erik_argument'],
          set: ['greta_named'],
        },
        {
          label: 'Ask about the museum’s money',
          text: `Thorne breathes out through his nose.

“We lost $1.4 million last year. Everybody’s losing money. Attendance hasn’t come back and the state cut our grant.” He looks straight at you. “And yes, I know that a $420,000 insurance check would help. I would rather have the painting. You can believe that or not.”`,
          clues: ['deficit'],
        },
        {
          label: 'Ask about the insurance',
          text: `“Heron was insured for $300,000 until August. I had it raised to $420,000.” He sees your face. “The Art Institute’s loan agreement requires a current valuation. We had it appraised in July. It’s in the file, with the appraiser’s letter.”

[if claim_pressure]He glances at the phone. “And now the adjuster wants a claim on her desk by Monday. I haven’t signed anything. I don’t want the money. I want the picture back.”[else]“If you’re asking whether I’ve filed a claim, no. Not yet.”[/if]`,
          clues: ['value_raised'],
        },
        {
          label: 'Ask about the loan agreement',
          text: `“The Art Institute is building a show around Great Lakes painters, and Heron is the centerpiece. It ships in five weeks with one of their couriers.” He counts on his fingers. “Crate, climate, courier, insurance, and a condition exam on arrival: their conservators go over it with our condition report beside them. Imogen Park, our registrar, has been doing the paperwork for months. It’s a great deal of paperwork.”`,
          clues: ['loan', 'loan_exam'],
        },
        {
          label: 'Go through the painting’s file',
          cost: 0.5,
          text: `Thorne’s assistant brings up a fat accordion folder with HERON AT DUSK · 2009.14 on the tab: the deed of gift, the appraisals, Nadia’s 2019 condition report with its photographs, the Chicago loan agreement, and a movement log listing every time the painting has left its wall.

The last four lines:

> 2019 MAR 11  G4 → CONSERVATION  Condition survey          N. FERRANTE
> 2019 MAR 29  CONSERVATION → G4                           N. FERRANTE
> SEP 03       G4 → REGISTRAR STORE  Photography (L. Moss),
>                                    AIC catalog              I. PARK
> SEP 05       REGISTRAR STORE → G4                          I. PARK`,
          clues: ['sign_out_log'],
        },
        {
          label: 'Look at the event photographer’s pictures',
          cost: 0.5,
          text: `The development office already has the photographer’s pictures, three hundred of them, each stamped with the time. You page through the speech. Thorne at the podium. Two hundred faces turned toward him. At the side of the stage, holding a folder of his notes, a slim woman in a dark blue dress: Imogen Park, the registrar, in every frame from 9:05 to 9:30.

In one wide shot at 9:11, at the very edge, the service door is swinging shut behind someone in a white jacket.

Earlier, at 8:14, there’s a picture of Gallery 4: an old woman alone in front of Heron at Dusk, very close, her hands folded behind her back. “Greta Lindqvist,” Thorne says quietly.`,
          clues: ['imogen_alibi', 'server_door'],
          set: ['greta_named'],
        },
        {
          label: 'Tell him the stolen canvas was a copy',
          if: COPY,
          text: `Thorne sits very still.

“Then what’s been hanging on our wall — ” He stops. “Since when?” You don’t answer, and he doesn’t make you. “So the insurance company would be paying for a forgery that nobody will ever see again, and the real one is somewhere else.” For the first time he looks his age. “I’ll call the adjuster. There won’t be a claim. Find the painting, Detective.”`,
        },
      ],
    },

    imogen: {
      title: 'Imogen Park',
      text: `The registrar’s office is in the basement, next to a steel door marked REGISTRAR STOREROOM · AUTHORIZED STAFF ONLY. Everything in the office is labeled: the shelves, the binders, the boxes of acid-free tissue, even the spider plant on the filing cabinet.

Imogen Park is thirty-nine, slim and composed, in an oatmeal cardigan with the sleeves pushed up. The painting’s paperwork is spread across her desk for the insurer, and she stands when you come in.

“It’s awful,” she says. “I keep thinking about Walt. He must feel terrible.” She moves a stack of folders so you can sit. “Whatever you need. I know where everything is. That’s my whole job.”`,
      again: `Imogen looks up from her desk and smiles as though she has been expecting you. [if canvas_found | modern_canvas]The smile doesn’t reach anywhere near her eyes.[/if]`,
      choices: [
        {
          label: 'Ask about Friday night',
          text: `“I was beside the stage for the speech, holding Julian’s notes. He loses his place otherwise.” She says it fondly. “Before that I was steering donors around, and after — well, after, Otis locked the doors and we all stood in the atrium for an hour while your officers went through our handbags.”`,
          clues: ['imogen_alibi'],
        },
        {
          label: 'Ask about the Chicago loan',
          text: `“Five weeks from Monday. The crate’s already built.” She touches a binder. “The Art Institute sends a courier to travel with it, and when it arrives, their conservators go over it inch by inch under raking light and ultraviolet, with our condition report beside them. Every incoming loan. It’s standard.”

She straightens a pen that was already straight. “Or it was going to be.”`,
          clues: ['loan', 'loan_exam'],
        },
        {
          label: 'Ask whether anything has happened to the painting lately',
          text: `“Nothing unusual. It came off the wall for a couple of days in September to be photographed for the Chicago catalog. Lena Moss did it; she’s our freelancer. Otherwise it’s been hanging right there since Nadia’s survey in 2019.”`,
          clues: ['imogen_photo_story'],
        },
        {
          label: 'Look over the storeroom log',
          cost: 0.5,
          text: `Imogen shows it to you without hesitating: a green clothbound ledger for the storeroom, every entry in the same small, upright hand.

> SEP 03  IN   2009.14 Carrow, HERON AT DUSK  from G4
>              Photography (L. Moss) · AIC catalog      I.P.
> SEP 05  OUT  2009.14  to G4                           I.P.

She watches you read. “All very dull,” she says.`,
          clues: ['sign_out_log'],
        },
        {
          label: 'Ask about her visit to the security office',
          if: 'visitor_log',
          text: `“For Chicago. The Art Institute sends a forty-page facility report, and a whole section is cameras: how many, where, how long we keep the footage.” She laughs a little. “I sat at Walt’s monitors for an hour writing down camera numbers. I found out the corridor camera has been broken since August, if you want a scandal.”`,
        },
        {
          label: 'Ask about her cousin Cole',
          if: 'cole_contact',
          text: `The smallest pause.

“Cole is my aunt’s boy. He’s had a hard couple of years, and Bev needed servers, so I put in a word.” She folds her hands on the desk. “He’s a good kid. A little lost. Is he in some kind of trouble?”`,
        },
        { label: 'Close the door and put it to her', if: CONFRONT, go: 'imogen_talk' },
      ],
    },

    imogen_talk: {
      title: 'Imogen Park',
      text: `You close the door. Imogen watches you do it, and for a second her hands stop moving.

“Is something wrong?”`,
      again: `Imogen sits very straight, her hands folded in her lap, and waits.`,
      choices: [
        {
          label: 'Ask why Heron was off the wall in September',
          if: '(greta_empty_wall | nadia_put_off | sign_out_log) & !lena_no_booking',
          text: `“I told you. Photography, for the Chicago catalog. Lena Moss.” She says the name easily. “Two days. It’s all in the log. You can call her.”`,
          clues: ['imogen_photo_story'],
        },
        {
          label: 'Tell her Lena Moss never photographed Heron',
          if: 'lena_no_booking & (sign_out_log | imogen_photo_story)',
          text: `“That can’t be right. It’s in the log.”

“In your handwriting. Lena was at a wedding in Traverse City from the third to the fifth. She hasn’t worked here since April.”

Imogen’s eyes go to the side, just once. “Then I’ve got the photographer wrong. We use a few. I’d have to look it up.” She doesn’t look it up.`,
        },
        {
          label: 'Tell her the stolen canvas was a copy',
          if: COPY,
          text: `For a moment her face has no expression at all. Then she finds one: shock, and very good shock. “A copy? That’s not possible. Nadia would have — ”

“Nadia asked to examine it in September. You put her off.”

“I was busy.” It comes out too fast, and she hears it too.`,
        },
        {
          label: 'Ask about Mina Varga',
          if: 'mina_copy',
          text: `“A student. The copyist program.” She shrugs. “Donors ask for all kinds of things.”

“A full-size copy, which your own rules forbid. You signed the waiver, you bought the canvas, and you paid her three thousand dollars in cash. Which donor?”

Imogen doesn’t answer. She looks at the spider plant as though it might.`,
        },
        {
          label: 'Ask about Egret Holdings',
          if: 'egret',
          text: `“It’s a little consulting company. Appraisal work, on the side. Lots of registrars do it.”

[if fisk_paid | condo_search]“Leonard Fisk wired it $118,000 on September 12. What did you appraise for him?”

She closes her eyes.[else]“What has it appraised?”

“I’d have to check my records.” For the first time she doesn’t offer to show you where they are.[/if]`,
        },
        {
          label: 'Tell her Cole kept the painting',
          if: 'canvas_found',
          text: `You tell her where you found it: rolled up in a hockey bag in Cole’s closet, wrapped in a tablecloth.

Imogen stares at you. “He *kept* it?” Her voice cracks straight up the middle. “He was supposed to burn it. I told him, the same night, I told him — ”

She stops. She heard it. You both did.

She puts her hand over her mouth. Then she takes it away and says, very quietly, “I’d like a lawyer now, please.”`,
          clues: ['imogen_slip'],
        },
        {
          label: 'Tell her what Cole told you',
          if: 'cole_flips & !imogen_slip',
          text: `You tell her all of it: the job she got him, the code, the speech, the carrier, the ten thousand dollars.

Imogen listens with her eyes on her hands. “Cole is twenty-two,” she says at last. “He says whatever the last person told him to say.” Then, more quietly: “I’d like to call a lawyer.”`,
        },
        {
          label: 'Place her under arrest',
          if: '(imogen_slip | cole_flips | condo_search) & !imogen_arrested',
          text: `She doesn’t argue. She stands, takes her cardigan from the back of the chair, and holds out her wrists before you ask.

At the door she stops. “Somebody will need to water the plants,” she says. “Nobody ever remembers the plants.”`,
          set: ['imogen_arrested'],
          go: 'board',
        },
        { label: 'Leave it there for now', go: 'board' },
      ],
    },

    condo: {
      title: 'Marina Point',
      text: `Marina Point is a glass tower at the end of Harbor Road, looking out over the grain elevators and the boats shrink-wrapped for winter. Imogen Park’s unit is 6B. She opens the door in a sweater and socks, with her phone in her hand. Behind her, on the living room floor, a suitcase lies open, half full of folded clothes.

“I’m not well,” she says. “I told Julian. I need a few days away.” She doesn’t step back to let you in. Then, after a moment, she does.`,
      again: `Imogen opens the door before you knock twice. The suitcase is closed now, standing by the door.`,
      choices: [
        {
          label: 'Ask where she’s going',
          text: `“Away. A few days. I have friends out of town.” She picks a sock off the floor and holds it. “I haven’t had a day off since my mother died, and then this. I’m allowed to be tired.”

“Which friends?”

“Friends,” Imogen says, and puts the sock in the suitcase.`,
        },
        {
          label: 'Look around the living room',
          text: `The condo is beautiful and nearly empty: good floors, a view worth paying for, and very little furniture, as if things have been sold off one at a time. On the kitchen counter, a stack of mail in windowed envelopes: FINAL NOTICE from Northshore Savings, a court notice from a credit card company, and a letter from Lakeview Gardens Memory Care, Collections Department.

On the fridge, held by a magnet shaped like a lighthouse, a photograph of an older woman in a wheelchair in a garden, laughing at something outside the picture.`,
          clues: ['imogen_debt'],
        },
        { label: 'Sit down and put it to her', if: CONFRONT, go: 'imogen_talk' },
      ],
    },

    nadia: {
      title: 'The conservation studio',
      text: `The conservation studio is the one bright room in the museum’s basement: north light from high windows, a long white table, a microscope on a swinging arm, and jars of solvent and cotton swabs laid out like surgical instruments. A small landscape lies face up on the table under a sheet of glassine.

Nadia Ferrante has swapped her gloves for reading glasses. She pulls a stool over for you. “I’ve been thinking about those strips all morning,” she says. “Sit.”`,
      again: `Nadia looks up from the microscope. “Detective.” [if modern_canvas]Dr. Rao’s report is pinned to the corkboard over her table, and she keeps glancing at it.[/if]`,
      choices: [
        {
          label: 'Compare the strips with her photographs',
          if: 'canvas_strips',
          cost: 1,
          text: `Nadia puts her 2019 condition survey on the big monitor: Heron out of its frame, photographed front and back, edges and corners, under raking light and ultraviolet. She finds the tacking edges and enlarges them until the threads look like rope.

“This is Edith’s linen. Old Belgian flax, about twenty threads to the centimeter one way and eighteen the other. See how the threads wander? Thick, thin, a slub here.” Then she puts one of your bagged strips under the microscope, through the plastic. “And this is modern. Perfectly even yarn. Sixteen by sixteen, like graph paper.”

She sits back. “That isn’t the canvas I photographed in 2019. That isn’t Edith’s canvas at all.” She takes off her glasses. “Somebody stained the edges to look old. Tea, maybe. It’s good work. It fooled me at twenty feet.”`,
          clues: ['weave_differs'],
        },
        {
          label: 'Ask when she last examined Heron',
          text: `“Properly? The 2019 survey.” She frowns. “I asked Imogen in September if I could do the pre-loan check. You always do one before a loan goes out. First it was off the wall for photography, then it was ‘Chicago will do their own on arrival,’ and then there was always something else.” She shrugs. “Imogen runs the calendar. I wait my turn.”`,
          clues: ['nadia_put_off'],
        },
        {
          label: 'Ask about the Chicago loan',
          text: `“The Art Institute’s conservators will examine it the minute it’s out of the crate. Everyone does, with every loan: raking light, ultraviolet, a loupe on every corner, and our 2019 report beside them. If there’s a scratch that isn’t in our report, it’s our scratch, not theirs.” She smiles slightly. “They’re very good. I trained with two of them.”`,
          clues: ['loan', 'loan_exam'],
        },
        {
          label: 'Ask whether anyone has copied Heron',
          text: `“Oh, everyone. It’s the most copied picture in the building.” She almost smiles. “We have a copyist program. Art students set up easels in the galleries on weekday mornings. The rules are strict: a permit, no tracing, and the copy has to be at least ten percent bigger or smaller than the original, so nobody can ever pass it off.”

She thinks. “Last winter a graduate student from Calder State was on Heron for months. Mina Varga. Very talented. Imogen signs the permits.”`,
          clues: ['mina_named'],
        },
        {
          label: 'Show her Dr. Rao’s report',
          if: 'modern_canvas',
          text: `Nadia reads it standing up. Then she sits down on her stool and reads it again.

“Titanium white,” she says. “You couldn’t buy titanium white until the 1920s. Edith never had it in her life.” She presses her fingers against her eyes. “It hung upstairs as hers, and I walked past it every day.”

After a while she says, “Where is she, then? Where’s the real one?”`,
        },
        {
          label: 'Show her the canvas from Cole’s closet',
          if: 'canvas_found',
          text: `She unrolls it on her table with more care than it deserves, and leans over it with a loupe for a long time.

“It’s very good,” she says finally. “Somebody studied her for months. But the heron’s eye was painted slowly, and Edith was never slow. And the reeds at the lower left — ” She shakes her head. “It’s the canvas those strips came from. It isn’t Edith.”`,
        },
      ],
    },

    lab: {
      title: 'The crime lab',
      text: `Dr. Anjali Rao’s lab takes up the fourth floor at Garland Street. On a Saturday there is one technician, a humming fume hood, and Dr. Rao herself at a bench, in a cardigan over her lab coat.

She hears you out without interrupting, then asks one question. “What do you want to know that you don’t already know?”`,
      again: `Dr. Rao looks up from a microscope. “More?”`,
      choices: [
        {
          label: 'Send the canvas strips',
          if: 'canvas_strips',
          text: `You tell her what you want: the canvas, the ground under the paint, the paint itself. Whether all of it could be from 1911.

“Fiber and weave, the ground layer, and the whites. The whites will tell us most, fastest.” She checks the clock on the wall. “The X-ray fluorescence unit is booked until two. Call it four hours.”`,
          timer: {
            in: 4,
            title: 'Dr. Rao',
            text: `Dr. Rao’s report arrives by email, with a line on top: *I called Ms. Ferrante to check my reference samples. She agrees with every word.*

> CALDER PD CRIME LAB · 26-14172 · CANVAS FRAGMENTS, GALLERY 4
> Support: linen, modern commercial weave, 16 × 16 threads/cm.
> Ground: acrylic dispersion, titanium dioxide white (rutile).
> Paint: oil. Pigments incl. titanium white, phthalocyanine blue.
> Tacking edges stained with a tannin solution (tea or coffee).
> Titanium white: not sold commercially before the 1920s.
> Phthalocyanine blue: not before 1935. Acrylic grounds: 1950s.
> CONCLUSION: the painting these fragments come from cannot
> have been painted in 1911.

You read it twice. The painting cut out of the frame on Friday night was a modern copy. Whatever hung in Gallery 4 during the donors’ dinner, it wasn’t Edith Carrow’s heron.

[if sign_out_log]You think about two days in September when the painting was off the wall.[/if]`,
            clues: ['modern_canvas'],
          },
        },
        {
          label: 'Send the flakes from the carrier',
          if: 'carrier_flakes',
          text: `Dr. Rao tips the evidence bag to the light: blue-gray flakes, chalky white, a few stiff threads. “Compare with the strips from the frame? That I can do quickly. Three hours.”`,
          timer: {
            in: 3,
            title: 'Dr. Rao',
            text: `A short email from Dr. Rao:

> Flakes and fibers from carrier 14 (Santoro Catering) match
> the Gallery 4 canvas fragments: same commercial linen,
> same titanium-white acrylic ground, same blue-gray paint.
> The canvas cut from the frame was inside that carrier.`,
            clues: ['flakes_match'],
          },
        },
        {
          label: 'Send the canvas from Cole’s closet',
          if: 'canvas_found',
          text: `The rolled canvas goes onto Dr. Rao’s biggest table, and the four strips from the frame go beside it. “Like fitting a torn ticket back together,” she says. “Two hours, because I’ll be careful.”`,
          timer: {
            in: 2,
            title: 'Dr. Rao',
            text: `Dr. Rao sends photographs: the canvas from Cole Brandt’s closet laid out on her table, with the four strips from Gallery 4 fitted against its edges. Every nick and wobble of the blade lines up.

> The cut edges of item 26-14172-09 (canvas, Brandt residence)
> correspond to the fragments recovered from the Gallery 4
> stretcher along all four sides. Same canvas.`,
            clues: ['cut_match'],
          },
        },
      ],
    },

    records: {
      title: 'Theo Marsh',
      text: `The records room is in the basement at Garland Street, behind a door with a hand-lettered sign: RECORDS · KNOCK · THEO. Theo Marsh is eating a doughnut over his keyboard with a paper towel tucked into his collar.

“A Saturday!” he says, delighted. “Nobody comes down here on a Saturday. What have you got for me?”`,
      again: `“Back for more?” Theo spins his chair around. “Hit me.”`,
      choices: [
        {
          label: 'Ask him to run Imogen Park',
          if: IMOGEN_KNOWN,
          text: `“The registrar? Sure. Property, liens, judgments, business filings.” He’s already typing. “Give me a couple of hours. The county site is slow on weekends, like the county.”`,
          timer: {
            in: 2,
            title: 'Theo Marsh',
            text: `Theo calls instead of emailing. “Your registrar is drowning, {name}.”

> PARK, IMOGEN J. · MARINA POINT #6B, HARBOR RD
> Second mortgage, Northshore Savings: in default since May.
> Judgment, Northway Card Services: $38,210.
> Lien, Lakeview Gardens Memory Care: $44,600 (unpaid care).

“The memory-care place is where her mother was. She died last year. And here’s why I called.”

> EGRET HOLDINGS LLC · filed July 8 · organizer: I. PARK
> Registered address: Marina Point #6B, Harbor Rd

“An LLC at her own address, formed in July. No website, no phone, no business I can find. Just a name, and I’d bet you a doughnut there’s a bank account somewhere.”`,
            clues: ['imogen_debt', 'egret'],
          },
        },
        {
          label: 'Ask him to look into the museum’s finances',
          text: `“Nonprofits file their taxes in public. Bless them.” Theo cracks his knuckles. “Hour and a half.”`,
          timer: {
            in: 1.5,
            title: 'Theo Marsh',
            text: `Theo emails a summary of the museum’s last tax filing. Revenue down, expenses up, a deficit of $1.4 million, and an endowment the board has been dipping into for three years. *They’re not broke,* he writes, *but they can see broke from here.*`,
            clues: ['deficit'],
          },
        },
        {
          label: 'Ask him to pull the Lindqvist court file',
          if: 'erik_argument | @erik | @greta',
          text: `“Lindqvist versus the museum? I remember that one. The son lost.” He makes a note. “I’ll see if there’s anything new. An hour.”`,
          timer: {
            in: 1,
            title: 'Theo Marsh',
            text: `Theo sends the docket. Erik Lindqvist lost his suit to undo his father’s gift two years ago. But there’s a new filing:

> LINDQVIST v. CALDER MUSEUM OF ART · MOTION FOR INJUNCTION
> Filed Fri 3:52 p.m. · To bar the loan of “Heron at Dusk”
> outside the City of Port Calder, per Deed of Gift §4.

*So he was planning to take it back in court,* Theo writes, *on the same afternoon somebody took it off the wall.*`,
            clues: ['erik_motion'],
          },
        },
      ],
    },

    bell: {
      title: 'Special Agent Marcus Bell',
      text: `Special Agent Marcus Bell of the FBI’s Art Crime Team picks up in Chicago on the first ring and sounds as though he’s been at his desk since five.

“Port Calder. The Carrow. I saw it on the wire this morning.” Keys clatter. “What can you tell me that the newspaper can’t?”`,
      again: `“{det}.” Bell sounds as if he’s eating lunch at his desk. “What have you got?”`,
      choices: [
        {
          label: 'Ask whether a Carrow has turned up for sale',
          text: `“Funny you should put it that way.” The typing stops. “Two weeks ago a collector in Toronto had his adviser call us. He’d been offered a Carrow: a heron in a marsh at dusk, 24 by 30, for $390,000. The provenance said ‘private collection, Wisconsin, by descent.’ The adviser didn’t like the paperwork and wanted to know if anything like it had been stolen.”

“Had it?”

“Not then.” A pause. “The dealer was Leonard Fisk, Oak Street, Chicago. And that was two weeks before your theft. Either Edith painted the same heron twice, or somebody is selling a very good fake in Toronto.”`,
          clues: ['toronto_offer', 'fisk'],
        },
        {
          label: 'Ask about Leonard Fisk',
          if: 'fisk',
          text: `“Sixty-seven. Nice gallery, nice suits. We’ve looked at him twice: a Chagall drawing with a hole in its history, and a Hopper watercolor from an estate that didn’t know it was selling. Never enough to charge.” Bell sighs. “Fisk likes paintings that come from people who need money quietly. He pays a third, sells for full, and never asks the question he doesn’t want answered.”`,
        },
        {
          label: 'Ask him to check Fisk’s payments to Egret Holdings',
          if: 'egret',
          text: `“Egret Holdings.” You hear him write it down. “Fisk’s bank records are already under subpoena from the Hopper business. Give me a few hours to get someone into them.”`,
          timer: {
            in: 3,
            title: 'Agent Bell',
            text: `Bell calls back. “Your egret flew.”

> FISK FINE ART LLC → EGRET HOLDINGS LLC
> SEP 12 · WIRE · $118,000.00 · Northshore Savings
> Memo: “Consultation”

“A hundred and eighteen thousand dollars for ‘consultation.’ I’d love to know what she consulted on. I’ve called the Mounties about Toronto. If the collector hasn’t paid the balance, he isn’t going to now.”`,
            clues: ['fisk_paid'],
          },
        },
        {
          label: 'Tell him the stolen canvas was a copy',
          if: COPY,
          text: `There’s a long silence on the line.

“Then the one in Toronto is the real one,” Bell says slowly. “And your thief stole a fake to make it look like a real one was stolen.” He laughs once, without much humor. “Nineteen years I’ve been doing this. I’ll call the RCMP.”`,
        },
      ],
    },

    catering: {
      title: 'Santoro Catering',
      text: `Santoro Catering works out of a brick warehouse in The Flats with its name painted on the loading door in letters six feet high. Inside it smells of onions and bleach. Two cooks are prepping a wedding for tonight, and the tall black sheet-pan carriers from Friday are lined up along one wall, washed and drying.

Bev Santoro is somewhere in her fifties, with reading glasses pushed up into gray curls and a clipboard she never puts down. “The museum thing,” she says. “My people didn’t take any painting. My people were carrying crab cakes.”`,
      again: `Bev is on the phone with a florist. She points you to a stool with her clipboard and keeps arguing.`,
      choices: [
        {
          label: 'Ask Bev about Friday night',
          text: `“Eighteen on staff, and I run the floor myself.” She flips the clipboard as if the night were written on it. “Speech started five after nine. I had everybody in position to clear plates after. I count heads, I always count heads, and I was one short. Cole. The new kid.”

“For how long?”

“From about ten after to twenty-five, half past. He comes back through the service door red in the face, and I say where were you, and he says ‘smoking on the dock.’” She snorts. “I figured he was on the phone with a girl.”`,
          clues: ['cole_missing'],
        },
        {
          label: 'Ask about Cole Brandt',
          if: 'cole_missing | dock_loading',
          text: `“Three weeks on the job. Cole Brandt, twenty-two. Polite, nice-looking, useless with a tray.” She finds his file in a drawer. “He came recommended. Somebody from the museum, actually. Here.”

> SANTORO CATERING · APPLICATION FOR EMPLOYMENT
> Brandt, Cole T. · 1526 Carver Ave, Apt 2 · Northgate
> Cell: 555-310-0172
> Emergency contact: Imogen Park (cousin), Calder Museum
> Referred by: I. Park

“Cousins help cousins,” Bev says. “That’s how I got my first job.”`,
          clues: ['cole_contact'],
        },
        {
          label: 'Ask whether Cole smokes',
          if: 'cole_missing',
          text: `Bev considers. “Never seen him smoke. He’s got one of those vape pens, the mango kind. You can smell it on him.” She frowns. “Why would you go out on the dock in October to vape? The kids vape in the walk-in cooler and think I don’t know.”`,
        },
        {
          label: 'Talk to the van driver',
          text: `Teddy Brisco is hosing out the van in the yard, a gray-haired man with forearms like hams. He shuts off the hose to talk.

“The new kid, Cole. We’re loading out at the museum, 10:40 or so, and I reach for a carrier and he about takes my hand off. ‘I got it, I got it.’ Loads all six himself. Never saw a new kid want to carry anything.” He wipes his hands on his jeans. “Back here, he unloads them himself too, and takes one inside to wash, first thing. Nobody washes the carriers. The dishwasher washes the carriers.”`,
          clues: ['cole_loaded'],
        },
        {
          label: 'Look over the sheet-pan carriers',
          cost: 0.5,
          text: `You go down the row with a flashlight. The carriers are insulated boxes on wheels, chest high, with a door in the front and racks inside for a dozen sheet pans. A rolled-up canvas two feet long would fit in one with room to spare.

Most have been through the machine. Number 14 has been washed by hand, and thoroughly. But in the channel along the bottom of the door, where the rubber gasket meets the plastic, there are a few flakes of paint, blue-gray and chalky white, and two or three pale, stiff threads.`,
          clues: ['carrier_flakes'],
        },
      ],
    },

    cole: {
      title: 'Cole Brandt',
      text: `1526 Carver Avenue is a two-flat with a sagging porch and three mailboxes, one of them taped shut. Cole Brandt lives upstairs. He opens the door the width of the chain: twenty-two, good-looking in an unfinished way, barefoot, in a Santoro Catering hoodie. Behind him a television is playing a car chase.

When you show him your badge he goes pale and then red. Then he takes the chain off, because he can’t think of a reason not to.`,
      again: `Cole opens the door with the chain on. “I told you everything,” he says through the gap.`,
      choices: [
        {
          label: 'Ask where he was during the speech',
          text: `“Working. Clearing plates.” He hears himself. “I mean, I took a break. Like five minutes. I was out on the loading dock, having a smoke.” He rubs the back of his neck. “Bev’s mad about it? She can dock me. Whatever.”`,
          clues: ['cole_story'],
        },
        {
          label: 'Look past him into the apartment',
          text: `There isn’t much to see: a futon, a big television on a milk crate, a mattress on the floor in the next room. A hockey stick leans in the corner with no skates anywhere. On the futon a laptop is open, and before Cole shuts it you can read the headline: **EDITH CARROW (1874–1938) · AUCTION RESULTS**.`,
          clues: ['cole_browser'],
        },
        {
          label: 'Tell him the dock camera saw nobody',
          if: 'dock_camera & cole_story',
          text: `“There’s a camera on the dock. From 9:11 to 9:27 there’s one man out there, a guard having a smoke. You’re not on it.”

Cole opens his mouth and shuts it again. “I was around the side, then. By the dumpsters. I don’t know. I didn’t look at a clock.” He is sweating. “Am I under arrest? Because if I’m not, I got to get ready for work.”`,
        },
        {
          label: 'Ask about his cousin Imogen',
          if: 'cole_contact',
          text: `“Immy?” Something crosses his face and is gone. “She got me the job. She helps me out. She’s like the only one in the family who — ” He stops. “What’s she got to do with anything?”`,
        },
        {
          label: 'Ask why he’s reading about Edith Carrow',
          if: 'cole_browser',
          text: `“It was on the news. Everybody’s reading about it.” He picks at the doorframe with a thumbnail. “Four hundred and twenty thousand dollars for a bird. That’s crazy, right? Who pays that?”`,
        },
      ],
    },

    search_cole: {
      title: 'Search warrant: 1526 Carver Ave',
      text: `The warrant comes through within the hour. Two patrol officers meet you on Carver Avenue. Cole Brandt opens the door in his catering whites, halfway out to work, and reads the warrant twice with his lips moving.

“It’s not — ” he says. “You can’t just — ” Then he sits down on the futon and puts his head in his hands.`,
      again: `The patrol officers are waiting on the landing. Cole is on the futon with his hands between his knees.`,
      choices: [
        {
          label: 'Search the apartment',
          cost: 1,
          text: `It doesn’t take long, because there is so little to search. In the bedroom closet, behind a heap of laundry, is a black hockey bag. Inside it, wrapped in a Santoro Catering tablecloth, is a roll of canvas about two feet long.

You unroll a few inches on the bed with gloved hands: dark water, reeds, the long gray leg of a bird. The edges are ragged where a knife went around the inside of a frame.

Cole watches from the doorway. “I was going to give it back,” he says, not very convincingly. “If they put up a reward.”`,
          clues: ['canvas_found'],
        },
        { label: 'Sit down with him downtown', if: 'canvas_found', go: 'cole_room' },
      ],
    },

    cole_room: {
      title: 'Interview Room 2',
      text: `Interview Room 2 at Garland Street has a table bolted to the floor and a clock that runs two minutes fast. Cole Brandt sits with his hands between his knees, still in his white catering jacket, and looks at the rolled canvas in its evidence bag on the table as if it might bite.

He hasn’t asked for a lawyer. He hasn’t asked for anything.`,
      again: `Cole looks up when you come in. Somebody has brought him a can of soda, and he hasn’t opened it.`,
      choices: [
        {
          label: 'Tell him what he’s been hiding is a copy',
          if: COPY,
          text: `You tell him in plain words. The canvas is modern. The paint is modern. [if mina_copy]A student painted it last winter.[else]Nobody painted it in 1911.[/if] It isn’t worth four hundred and twenty thousand dollars. It isn’t worth the tablecloth it was wrapped in. And whoever sent you in there with a knife knew that.

Cole laughs, and then he looks at your face and stops. “No,” he says. “She said — ” He looks at the canvas. “I could get years for this. For *that*?”

Then it comes out all at once. “Immy set it up. She got me the job with Bev. She gave me the guard’s code on a piece of paper and said he goes out to smoke at ten after nine, every time, when the speeches start, and he props the office door. Punch the code, turn off 4E, go through the gray door, cut it out, roll it, put it in a carrier, turn the sensor back on. Fifteen minutes. She said it was an insurance thing, the museum gets paid, nobody gets hurt. She gave me two thousand and said eight more after.” He swallows. “She said burn it. That night. I just thought, it’s worth four hundred grand. Who burns four hundred grand?”`,
          clues: ['cole_flips'],
        },
        {
          label: 'Ask who put him up to it',
          if: `!(${COPY})`,
          text: `“Nobody. I found it.” He folds his arms. “I’m not saying anything else.”

But he keeps looking at the canvas on the table, the way a kid looks at a lottery ticket.`,
        },
        {
          label: 'Ask about the dock',
          if: 'cole_story | cole_missing',
          text: `“I told you, I was out back.” He picks at the tab of the soda can. “Fine. I wasn’t on the dock. I don’t even smoke. I vape.” It seems to be the one thing he’s sure of.`,
        },
      ],
    },

    greta: {
      title: 'Greta Lindqvist',
      text: `Greta Lindqvist lives on Lake Crest Road in Bluffside, in a gray shingled house that leans a little toward the lake. She is seventy-eight and small, in a heavy cardigan with a dragonfly brooch, and she has coffee waiting in a silver pot before you’ve taken off your coat.

The living room is full of paintings, none of them famous. Over the fireplace there is a pale rectangle on the wallpaper where something hung for forty years.

“That was her place,” she says, “before Anders gave her away. I never had the heart to hang anything else there.”`,
      again: `Mrs. Lindqvist has the silver coffee pot out again. “I hoped you’d come back,” she says.`,
      choices: [
        {
          label: 'Ask about the painting’s history',
          text: `“Anders bought her in 1968 from Edith’s niece, for eleven hundred dollars, which was more than our car.” She smiles. “Edith painted her from a rowboat in the marsh at the river mouth. She painted everything wet and fast, before the light went. And when she finished a canvas she pressed her thumb into the wet paint in a bottom corner, like a seal. On Heron it’s in the reeds at the lower left. You have to know where to look.”

She taps her own thumb. “Anders used to put his thumb in it. I scolded him every time.”`,
        },
        {
          label: 'Ask about Friday night',
          text: `“I slipped away before the soup to say hello to her. I always do.” She turns her cup on its saucer. “Detective, this will sound like an old woman talking. She looked tired. Flat. As though somebody had turned the light down in her. The water used to move; you would swear it moved. On Friday it just lay there.”

She shakes her head. “I told myself it was the new lights. Or my eyes. I’m seventy-eight.”`,
          clues: ['greta_tired'],
        },
        {
          label: 'Ask when she saw Heron before Friday',
          text: `“I take my garden club every September. We had it on the calendar for months: the fourth.” She frowns. “And she wasn’t there. The wall was empty, with a little card, *Temporarily off view*. The girl at the desk said she was being photographed. We looked at the Winslow Homer instead, and it wasn’t the same.”`,
          clues: ['greta_empty_wall'],
        },
        {
          label: 'Ask about Erik',
          text: `She sighs. “My son is angry at a great many things, and the museum is the one that holds still.

“He wanted Heron back after his father died, and the court said a gift is a gift. Now there’s this business with Chicago. Anders’s deed says she stays in Port Calder, and Erik thinks Chicago breaks it. He shouted at Julian in front of everyone. I could have died.” She looks at her hands. “He left before the speech. He kissed me goodbye at the coat check at twenty to nine and said he wouldn’t sit there and clap.”`,
          clues: ['erik_argument'],
        },
        {
          label: 'Show her a photograph of the canvas from Cole’s closet',
          if: 'canvas_found',
          text: `She puts on her glasses and holds the photograph close, then closer, and looks for a long time at the lower left corner.

“That isn’t her,” she says. “Look. The reeds are right, the heron is right, everything is right. But there’s no thumb.” She takes off her glasses. “Somebody very clever painted that. Edith didn’t.”`,
          clues: ['no_thumbprint'],
        },
        {
          label: 'Tell her the painting in the frame was a copy',
          if: COPY,
          text: `She is quiet for a long time. Outside, a gull lands on the porch rail and leaves again.

“So I wasn’t imagining it,” she says finally. “She looked tired because she wasn’t her.” She sets down her cup very carefully. “Then my heron is somewhere, and someone has her who doesn’t know her name. Find her, Detective. I’m seventy-eight. I would like to see her once more.”`,
        },
      ],
    },

    erik: {
      title: 'Erik Lindqvist',
      text: `Erik Lindqvist lives in a converted warehouse loft on Mill Street in The Flats, all brick and steel and very little furniture. He is forty-nine, as tall as his mother is small, and he answers the door with a phone to his ear. “I’ll call you back, Irving. The police are here. Yes. I know.”

He doesn’t offer you coffee. “I assume somebody has told you I threatened Julian Thorne. I did. In front of the mayor. I’d do it again.”`,
      again: `Erik lets you in and stands by the window with his arms folded. “More?”`,
      choices: [
        {
          label: 'Ask about the argument with Thorne',
          text: `“My father gave that painting to this city. Not to the museum: to Port Calder. It’s in the deed, section four, *to be kept and exhibited in the City of Port Calder*. And Julian is shipping it to Chicago for four months so he can put the Art Institute on his résumé.”

He shrugs. “I told him he’d lose it one way or another. Everyone heard me. I’d had two glasses of wine and I meant every word.”`,
          clues: ['erik_argument'],
        },
        {
          label: 'Ask where he went after',
          text: `“Home. I got my car from the valet at twenty to nine, drove here, poured a drink and called my lawyer, who told me to go to bed.” He tilts his head at the phone. “That was him just now, telling me not to talk to you. Ask the valet. They write everything down.”`,
        },
        {
          label: 'Ask what “one way or another” meant',
          if: 'erik_argument',
          text: `“It meant this.” He takes a document off the kitchen island and hands it to you: a motion filed in Calder County Circuit Court at 3:52 Friday afternoon, asking for an injunction to stop the loan under the deed of gift.

“Filed before the dinner. I wanted Julian to find out at his own party.” He almost smiles. “Why would I steal the thing, Detective? I’m about to win it.”`,
          clues: ['erik_motion'],
        },
        {
          label: 'Ask about his father’s gift',
          text: `“Dad gave it away in 2009, when he was already sick, and he didn’t tell any of us until it was done. Mother says it was the right thing.” He looks at the brick wall, where nothing hangs. “When I was a boy I used to lie on the rug under it and try to see the heron move. I never did. I kept looking anyway.”`,
        },
      ],
    },

    lena: {
      title: 'Lena Moss',
      text: `Lena Moss answers from her car, with a wedding’s worth of camera gear clattering in the back. She pulls over to talk.

“Heron? The Carrow? I’ve never shot it. I did the museum’s big collection shoot in 2019, but Heron was in conservation that month, so they used Nadia’s pictures.” You hear her flip the pages of a paper calendar. “September? No. My last job at the museum was in April, the new acquisitions. September third to fifth I was in Traverse City shooting a wedding, three days, a hundred and ten guests and a goat. I’ve got four thousand pictures of it if you need proof.”`,
      clues: ['lena_no_booking'],
      choices: [
        {
          label: 'Ask about Imogen Park',
          text: `“Imogen books me. She’s great. Always pays on time, which is more than I can say for some places.” She stops. “Actually, funny thing. Last winter she asked me if I knew any painters who did really good copies. For a donor, she said. I told her to try the grad students at Calder State.”`,
        },
      ],
    },

    mina: {
      title: 'Mina Varga',
      text: `Mina Varga rents half a bungalow in Kessler Park, and the front room is her studio: canvases stacked against every wall, a smell of linseed oil and coffee, and a space heater aimed at a half-finished portrait of somebody’s dog. She is twenty-six, in paint-stiff overalls, and she has been crying.

“I saw the news,” she says before you can ask anything. “I’ve been sitting here all morning trying to decide whether to call you.”`,
      again: `Mina lets you in. The dog portrait has been turned to face the wall.`,
      choices: [
        {
          label: 'Ask about her copy of Heron',
          text: `“I copied it in the gallery last winter, Tuesday and Thursday mornings, February to April. That part was normal. The rule is ten percent different in size; everybody knows the rule.” She wraps her arms around herself. “But Ms. Park came to see me and said a donor wanted a copy for his summer house, exactly the same size, and she’d sign the waiver. Three thousand dollars, cash. For a student that’s — ” She doesn’t finish.

“She even brought me the canvas, already primed. She asked me to stain the edges with tea so it would ‘sit right in an old frame.’ I finished it in May and took it to her condo on Harbor Road.”

She looks up at you. “It was the one they stole, wasn’t it? Not the real one. Mine.”`,
          clues: ['mina_copy'],
        },
        {
          label: 'Show her a photograph of the canvas from Cole’s closet',
          if: 'canvas_found',
          text: `She looks at it for about three seconds. “That’s mine. That’s the heron’s eye I redid four times.” She points to the lower left. “And look, no thumbprint. Edith always left her thumb in the reeds. I left it out on purpose. It felt like forging her signature.”`,
          clues: ['no_thumbprint'],
        },
        {
          label: 'Ask whether she knew what it was for',
          if: 'mina_copy',
          text: `“A summer house. That’s what she said.” Mina laughs, and it turns into something else. “I was so proud. I told my mother a collector had commissioned me. My first commission.” She wipes her face with a painty sleeve. “Am I in trouble?”

You tell her the truth: probably not, and that what she just told you matters a great deal.`,
        },
      ],
    },

    warrant: {
      title: 'ADA Gus Pellegrino',
      text: `Assistant District Attorney Gus Pellegrino takes your call from his garage, where by the sound of it he is losing an argument with a lawnmower.

“The museum painting. Everybody wants a piece of that one.” Something metal clanks onto concrete. “What are you asking me for?”`,
      again: `“You again,” Gus says. Something clanks. “Go.”`,
      choices: [
        {
          id: 'cole-yes',
          label: 'Ask for a warrant for Cole Brandt’s apartment',
          if: `(${PC_COLE}) & !canvas_found`,
          text: `You give it to him in order. [if cole_missing]A server went missing from the floor for the whole time the sensor was off[else]A server told a story about the dock that the dock camera doesn’t support[/if][if cole_loaded | dock_loading], then insisted on loading the catering carriers himself[/if][if carrier_flakes], and one of those carriers has paint in its door seal[/if].[if gallery_call & cole_contact] This morning his phone called a dealer to ask what a Carrow would bring without paperwork.[/if][if cole_browser] He had Carrow auction prices open on his laptop.[/if][if cole_contact] And his cousin is the museum’s registrar.[/if]

“That’s a kid with the chance and a kid who moved something,” Gus says. “I’ll find a judge. Give me an hour.”`,
          go: 'search_cole',
        },
        {
          id: 'cole-no',
          label: 'Ask for a warrant for Cole Brandt’s apartment',
          if: `!(${PC_COLE}) & !canvas_found & (cole_missing | cole_contact)`,
          once: false,
          text: `He listens to the end. “So he’s the registrar’s cousin and he took a long break. Half the waiters in this city take long breaks.” A clank. “Get me something that says he was away when it happened *and* that the painting went out with him. Then call me back.”`,
        },
        {
          id: 'condo-yes',
          label: 'Ask for a warrant for Imogen Park’s condo',
          if: `(${PC_IMOGEN}) & !condo_search`,
          text: `You lay it out.[if cole_flips] Her cousin says she planned it and gave him the code.[/if][if imogen_slip] She told you herself he was supposed to burn it.[/if][if modern_canvas | weave_differs | no_thumbprint] The painting in the frame was a modern copy.[/if][if lena_no_booking] She signed it out for a photographer who was in Traverse City.[/if][if mina_copy] She commissioned a full-size copy and paid for it in cash.[/if][if egret] And there’s an LLC at her home address.[/if]

Gus is quiet for a moment. “The registrar,” he says. “The one person who knows where everything is.” He wipes his hands on something. “Yeah. I’ll call a judge.”`,
          go: 'search_condo',
        },
        {
          id: 'condo-no',
          label: 'Ask for a warrant for Imogen Park’s condo',
          if: `!(${PC_IMOGEN}) & !condo_search & (sign_out_log | mina_copy | egret)`,
          once: false,
          text: `“The registrar signed a painting out to be photographed. That’s her job.” Gus sounds almost sorry. “You want her home, show me the painting on her wall isn’t the painting, and show me she lied about why it came down. One without the other is a hunch.”`,
        },
      ],
    },

    search_condo: {
      title: 'Search warrant: Marina Point 6B',
      text: `[if imogen_arrested]Imogen Park is in a holding cell at Garland Street, so the building manager lets you into 6B with a master key and waits in the hall.[else]Imogen Park reads the warrant in the doorway of 6B, every word of it, the way she would read a loan agreement. Then she hands it back and steps aside without a word.[/if]`,
      again: `The condo looks the way searched places look: every drawer a little open.`,
      choices: [
        {
          label: 'Search the condo',
          cost: 1.5,
          text: `In the spare room there’s a desk, and in the desk a hanging file as neatly labeled as the storeroom: EGRET.

A Northshore Savings statement for Egret Holdings LLC, one deposit: $118,000, September 12, wired from Fisk Fine Art, Chicago. A printed email from L. Fisk, two weeks old: *Our friend in Toronto is very taken with the bird. No need to hurry anything at your end.* And a photocopy of the Art Institute’s incoming-loan schedule, with one line highlighted in yellow: *Carrow, Heron at Dusk · condition examination on receipt.*

On the desk blotter there’s a museum notepad. You tilt it to the window. Pressed into the top sheet from a page torn off above it are four digits, a dash and a W.`,
          clues: ['condo_search'],
        },
        { label: 'Sit down with Imogen', if: '!imogen_arrested', go: 'imogen_talk' },
      ],
    },
  },

  events: [
    {
      at: 3,
      title: 'Julian Thorne',
      text: `Julian Thorne calls. “The insurer’s adjuster is in my office. Denise Fairley, from Harrow Fine Art. She wants your report number and a claim for the full $420,000 filed by Monday, and she’s very clear that the sooner we file, the sooner we’re paid.”

A pause. “I thought you should hear that from me, before you heard it from someone who would make it sound worse.”`,
      clues: ['claim_pressure'],
    },
    {
      at: 6,
      if: '!canvas_found',
      title: 'Agent Bell',
      text: `Special Agent Bell calls from Chicago. “Something for you. A dealer on Bluff Avenue, Arthur Lomax, rang our tip line an hour ago. A young man phoned his gallery this morning asking what a Carrow would bring ‘without paperwork.’ Lomax told him to call the police, and the kid hung up.”

He reads you the number from Lomax’s caller ID: a Port Calder cell ending in 0172. “Mean anything to you?”

[if cole_contact]It does. It’s the cell number on Cole Brandt’s job application.[/if]`,
      clues: ['gallery_call'],
    },
    {
      at: 8.5,
      if: '@imogen & !imogen_arrested',
      title: 'Otis Delaney',
      text: `Otis Delaney calls. “Thought you’d want to know. Imogen Park went home at half past four. Said she felt sick, and told Mr. Thorne she needed a few days.”

He hesitates. “She took the green ledger from the storeroom with her. I only noticed because she never takes anything home.”`,
      set: ['imogen_sick'],
    },
    { at: 8.5, if: '!@imogen & !imogen_arrested', set: ['imogen_sick'] },
    {
      at: 11,
      if: 'imogen_sick & !imogen_arrested',
      title: 'Julian Thorne',
      text: `Thorne calls, sounding puzzled. “Imogen just emailed. She’s asking for two weeks’ leave, starting now, for a family emergency. She says she’s flying out tomorrow afternoon and will be hard to reach.”

A pause. “She hasn’t taken two weeks off in six years. Should I be worried about that?”`,
    },
    {
      at: 12.5,
      title: 'Otis Delaney',
      text: `[if dock_camera]Otis calls early. “The board met at seven. I showed them the dock tape. Walt’s reinstated, full pay, and the chairman is going to apologize to him in person, which I would pay money to see.” He clears his throat. “Thanks.”[else]Otis calls early, and he sounds tired. “The board met at seven. They’re going to let Walt go on Monday. Thirty-one years, four months short of his pension.” He pauses. “If there’s anything that clears him, now would be the time.”[/if]`,
    },
  ],

  report: [
    {
      id: 'who',
      q: 'Who planned the theft of Heron at Dusk?',
      options: {
        imogen: 'Imogen Park, the registrar',
        cole: 'Cole Brandt, the catering server',
        walt: 'Walt Szymanski, the guard',
        thorne: 'Julian Thorne, the director',
        erik: 'Erik Lindqvist, the donor’s son',
      },
      answer: 'imogen',
      points: 40,
      why: 'Imogen swapped the original for a copy in September, signing it out for a photographer who was in Traverse City, and staged the theft to make the copy vanish before Chicago could examine it. Cole cut the canvas, but she got him the job, gave him the code and told him when to go.',
    },
    {
      id: 'copy',
      q: 'What was cut from the frame during the dinner?',
      options: {
        copy: 'A modern copy, painted last winter',
        original: 'Edith Carrow’s 1911 original',
        print: 'A photographic reproduction hung for the evening',
      },
      answer: 'copy',
      points: 15,
      why: 'The strips left in the frame are modern linen on a titanium-white acrylic ground, which didn’t exist in 1911, and they don’t match Nadia’s 2019 photographs of the real canvas. Mina Varga painted it for Imogen.',
    },
    {
      id: 'hands',
      q: 'Who cut the canvas from the frame?',
      options: {
        cole: 'Cole Brandt',
        walt: 'Walt Szymanski',
        imogen: 'Imogen Park',
        erik: 'Erik Lindqvist',
        thorne: 'Julian Thorne',
      },
      answer: 'cole',
      points: 10,
      why: 'Cole was missing from the floor from 9:10 to 9:28, lied about being on the dock, loaded the carriers himself, and had the canvas in his closet. Imogen was beside the stage the whole time, and Walt was on the dock camera.',
    },
    {
      id: 'where',
      q: 'Where is the original painting now?',
      options: {
        toronto: 'Sold through Leonard Fisk to a collector in Toronto',
        closet: 'Rolled up in Cole Brandt’s closet',
        burned: 'Burned on Friday night',
        storage: 'Hidden in the registrar’s storeroom',
        chicago: 'Already sent to the Art Institute of Chicago',
      },
      answer: 'toronto',
      points: 15,
      why: 'Two weeks before the theft, Fisk offered a Carrow heron to a Toronto collector, and on September 12 he wired $118,000 to Egret Holdings, an LLC at Imogen’s address. What was in Cole’s closet was the copy.',
    },
    {
      id: 'why',
      q: 'Why was the theft staged now?',
      options: {
        exam: 'The Art Institute’s conservators would have spotted the copy when the loan arrived',
        insurance: 'To collect $420,000 in insurance for the museum',
        lawsuit: 'To keep Erik Lindqvist’s lawsuit out of court',
        resale: 'To sell the painting before the loan took it out of reach',
      },
      answer: 'exam',
      points: 10,
      why: 'The copy could have hung in Port Calder for years, but it wouldn’t survive a condition exam in Chicago in five weeks. A theft made it disappear without anyone asking whether it was real.',
    },
    {
      id: 'how',
      q: 'How was the Gallery 4 sensor switched off?',
      options: {
        note: 'With Walt’s code, from the sticky note under the console keyboard',
        walt: 'Walt switched it off himself before his break',
        fault: 'The sensor was faulty',
        master: 'With the director’s master code',
      },
      answer: 'note',
      points: 10,
      why: 'Walt kept his code on a note under the keyboard. Imogen sat alone at that desk last Tuesday and passed the code to Cole, who used it at 9:14 while the dock camera shows Walt smoking outside.',
    },
  ],

  outcomes: {
    imogen: `Imogen Park was charged with theft, fraud and conspiracy, and she pleaded guilty in the spring. In December the Royal Canadian Mounted Police took Heron at Dusk down from over a piano in a house in Toronto; the collector hadn’t paid the balance, and never would. Leonard Fisk was indicted in Chicago. Cole Brandt testified against his cousin and got probation.

Heron came home in February. Greta Lindqvist was in the conservation studio when Nadia opened the crate, and Nadia let her put her thumb, very gently, beside Edith’s, just this once. Walt Szymanski retired in the spring with his full pension, and Otis threw him a party on the loading dock.`,
    cole: `You named Cole Brandt as the one who planned it. He had cut the canvas, and he was charged for that. But a twenty-two-year-old waiter doesn’t know which week a painting comes off its wall or what a loan exam is, and his lawyer said so. By the time Cole told the whole story, his cousin had taken two weeks’ leave and a flight she didn’t come back from. The painting in Toronto changed hands again before anyone thought to ask about it.`,
    walt: `You named Walt Szymanski. His union lawyer played the loading dock tape at the first hearing: 9:11 to 9:27, three cigarettes, nobody else. The charge was dropped within a week, but the museum let him go anyway, four months short of his pension, for leaving his code under a keyboard. Imogen Park took two weeks’ leave and didn’t come back, and a Carrow heron hangs in a house in Toronto where nobody knows its name.`,
    thorne: `You named Julian Thorne. Lieutenant Okafor pointed out that two hundred guests and a photographer watched him speak from 9:05 to 9:30, and that raising the insured value was a condition of the loan, in writing. He was never charged. He resigned in January anyway; the board wanted someone to blame. Imogen Park left for a family emergency and stayed gone, and the painting was never found.`,
    erik: `You named Erik Lindqvist. The valet sheet had him leaving at 8:40, and his motion to block the loan had been filed that afternoon: he was trying to win the painting, not steal it. The charge didn’t survive a hearing. Greta Lindqvist never spoke to the department again, and her heron stayed wherever it was.`,
    default: `Your report didn’t name the person who planned it. Lieutenant Okafor sent it back with one line in red: “Who needed this painting gone, and why now?” By Monday Imogen Park had taken leave, and nobody at the museum could reach her.`,
  },

  solution: {
    text: `Imogen Park was drowning: a second mortgage in default, a credit card judgment, and $44,600 still owed to the memory-care home where her mother spent her last two years. As registrar she knew where every object in the museum was, and who looked closely at which. Nobody looked closely at Heron at Dusk.

Last winter she had a Calder State student, Mina Varga, paint a full-size copy, waiving the copyist program’s size rule and paying $3,000 cash for “a donor.” In July she formed Egret Holdings LLC at her own address. On September 3 she signed Heron out of Gallery 4 for “photography (L. Moss)”; Lena Moss was in Traverse City. Two days later the copy went into the frame, and the original went to Leonard Fisk in Chicago, who wired $118,000 to Egret on September 12 and offered the painting to a Toronto collector two weeks before the theft.

The trouble was the loan. In five weeks Heron was due at the Art Institute of Chicago, whose conservators examine every incoming loan against the lender’s condition report. They would have known the copy on sight. It had to disappear first, in a way nobody would question.

Imogen needed to be seen while it happened. She got her cousin Cole Brandt a job with Santoro Catering. Last Tuesday, alone at the security console for the “Chicago loan,” she found Walt’s code under the keyboard and learned the corridor camera was broken. Everyone knew Walt smoked on the dock during the speeches. At 9:11, while Imogen stood beside the stage in front of two hundred people, Cole slipped through the service door, bypassed the Gallery 4 sensor with Walt’s code at 9:14, cut the canvas from its stretcher, hid it in sheet-pan carrier 14 and restored the sensor at 9:25. At 10:38 he loaded the carriers into the van himself.

Imogen never told Cole it was a copy. She told him it was an insurance arrangement and to burn it. He kept it, believing it was worth $420,000, and on Saturday morning he phoned a dealer to ask what it would bring. When he learned it was worthless, he told the whole story.

Walt did nothing worse than write his code down; the dock camera shows him alone from 9:11 to 9:27. Julian Thorne raised the insured value because the loan agreement required it, and he was on stage throughout. Erik Lindqvist meant to take the painting back in court, where his motion was filed that afternoon, and he left the dinner at 8:40. And Greta Lindqvist was right that her heron looked tired. It hadn’t been her heron since September.`,
    chain: ['console_log', 'canvas_strips', 'modern_canvas', 'cole_missing', 'cole_contact', 'cole_loaded', 'loan_exam', 'sign_out_log', 'lena_no_booking', 'egret', 'toronto_offer', 'canvas_found', 'cole_flips', 'imogen_slip'],
    walk: [
      '@gallery', 'Look closely at the frame', 'Ask Otis how',
      '@lab', 'Send the canvas strips',
      '@catering', 'Ask Bev about Friday', 'Ask about Cole Brandt', 'Talk to the van driver',
      '@records', 'Ask him to run Imogen',
      '@imogen', 'Ask about the Chicago loan', 'Look over the storeroom log',
      '@lena',
      '@bell', 'Ask whether a Carrow',
      '@warrant', 'Ask for a warrant for Cole', 'Search the apartment', 'Sit down with him', 'Tell him what',
      '@imogen', 'Close the door', 'Tell her Cole kept', 'Place her under arrest',
    ],
  },
};
