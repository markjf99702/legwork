// Case 5. A painting cut from its frame during the museum’s donors’ dinner, and the guard’s own code on the
// alarm. The thief took a copy; the question is who needed it gone, and where the real one went.

// Conditions used in more than one place.
const COPY = 'modern_canvas | weave_differs | mina_copy | no_thumbprint';
const IMOGEN_KNOWN = '@imogen | cole_contact | sign_out_log | visitor_log | mina_named | imogen_photo_story';
const PC_COLE = '(cole_missing | (cole_story & dock_camera)) & (cole_loaded | dock_loading | carrier_flakes | gallery_call | cole_browser)';
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
> Reported 9:58 p.m. Friday by F. Delaney, head of security.
> “Heron at Dusk,” Edith Carrow, 1911. Oil on canvas, 24 × 30 in.
> Insured value $420,000. Cut from frame. Discovered 9:52 p.m.
> by guard W. Szymanski on his round.
> Console: Gallery 4 motion sensor BYPASSED 21:14, RESTORED 21:25.
> User code 04 (SZYMANSKI).

“The guard’s own code switched the sensor off, and the guard says he was outside having a cigarette, alone. The museum suspended him at midnight. Everyone has decided he did it.” She folds the paper so the frame is face down. “I’d like somebody to find out.”

“The FBI’s Art Crime Team has been told. Special Agent Marcus Bell, in Chicago. He’ll take your call, but he gets a hundred of these a year, so ask him something he can answer.” She hands you the folder. “Report on my desk by noon tomorrow, {det}. Bring me the chain, not a hunch.”`,

  people: {
    walt: { name: 'Walt Szymanski', role: 'Security guard, Calder Museum', about: '61. Thirty-one years at the museum, four months from retirement. Found the empty frame. Suspended.' },
    thorne: { name: 'Julian Thorne', role: 'Director, Calder Museum', about: '54. Came from a museum in Boston six years ago. Was giving his speech when the painting was taken.' },
    bell: { name: 'Marcus Bell', role: 'Special Agent, FBI Art Crime Team', about: 'Works out of Chicago. Knows the back rooms of the art market.' },
    frank: { name: 'Frank Delaney', role: 'Head of security, Calder Museum', about: '58. A retired Port Calder patrol sergeant. Walt’s boss, and his friend.', if: '@gallery | @security' },
    nadia: { name: 'Nadia Ferrante', role: 'Conservator, Calder Museum', about: '47. Has cared for the collection for fifteen years. Wrote Heron’s last condition report, in 2019.', if: '@gallery | @nadia' },
    imogen: { name: 'Imogen Park', role: 'Registrar, Calder Museum', about: '39. Keeps the records of where every object is. Handles loans and storage, and the paperwork for the Chicago loan.', if: IMOGEN_KNOWN },
    bev: { name: 'Bev Santoro', role: 'Owner, Santoro Catering', about: 'Fifties. Catered the dinner with eighteen staff and ran the floor herself.', if: '@catering' },
    cole: { name: 'Cole Brandt', role: 'Server, Santoro Catering', about: '22. Hired three weeks ago. Worked the dinner.', if: 'cole_missing | cole_contact | @cole' },
    luis: { name: 'Luis Ocampo', role: 'Driver, Santoro Catering', about: 'Drove the catering van to the museum and back on Friday.', if: 'cole_loaded' },
    greta: { name: 'Greta Lindqvist', role: 'Widow of the donor', about: '78. Her late husband, Anders, gave Heron to the museum in 2009. Lives in Bluffside.', if: 'greta_named | @greta | @erik' },
    erik: { name: 'Erik Lindqvist', role: 'The donor’s son', about: '49. Sued to get Heron back and lost. Argued with the director at the dinner.', if: 'erik_argument | @erik' },
    lena: { name: 'Lena Moss', role: 'Freelance photographer', about: 'Photographs the museum’s collection for its catalogs.', if: 'sign_out_log | imogen_photo_story' },
    mina: { name: 'Mina Castellanos', role: 'Painting student, Calder State', about: '26. A graduate student. Copied Heron last winter under the museum’s copyist program.', if: 'mina_named' },
    fisk: { name: 'Leonard Fisk', role: 'Art dealer, Chicago', about: '67. A gallery on Oak Street and a gray reputation.', if: 'fisk | toronto_offer | condo_search' },
  },

  clues: {
    discovered: { title: 'The empty frame', text: 'Walt Szymanski found the frame in Gallery 4 empty on his 9:52 p.m. round. On his 8:50 round the painting was there.', who: ['walt'], at: 'Fri 21:52' },
    console_log: { title: 'Walt’s code on the console', text: 'The security console shows the Gallery 4 motion sensor bypassed at 9:14 p.m. and restored at 9:25, both times with user code 04: Walt Szymanski’s. A sensor can only be bypassed at the console itself.', who: ['walt'], at: 'Fri 21:14' },
    canvas_strips: { title: 'Strips left in the frame', text: 'The canvas was cut out along the inside of the stretcher bars, leaving half-inch strips still tacked to the wood. Nadia Ferrante thought their edges looked cleaner than she remembered.', who: ['nadia'] },
    service_door: { title: 'The service corridor', text: 'Gallery 4 is the only gallery with a door onto the service corridor, which runs from the kitchen past the security office to the loading dock. The caterers used it all night. Its camera has been broken since August.', who: ['frank'] },
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
    weave_differs: { title: 'Not the 2019 canvas', text: 'Under magnification the strips show an even machine weave. Nadia’s 2019 photographs of Heron show irregular hand-loomed linen. The canvas cut from the frame isn’t the one she photographed.', who: ['nadia'] },
    mina_named: { title: 'A student copied Heron', text: 'Last winter a Calder State graduate student, Mina Castellanos, copied Heron in the gallery under the copyist program. Imogen signs the permits. The rules say a copy must differ from the original by ten percent in size.', who: ['nadia', 'mina', 'imogen'] },
    modern_canvas: { title: 'The stolen canvas was a copy', text: 'Dr. Rao: machine-woven linen, an acrylic ground and titanium white, none of which Edith Carrow could have bought in 1911. The painting cut from the frame was a modern copy.' },
    flakes_match: { title: 'The carrier held the canvas', text: 'The paint flakes and threads from Santoro carrier 14 match the strips left in the frame: the same linen, the same ground, the same paint.' },
    cut_match: { title: 'The cut edges match', text: 'The ragged edges of the canvas from Cole’s closet fit the strips left in the Gallery 4 frame, cut for cut.', who: ['cole'] },
    cole_missing: { title: 'Cole was missing', text: 'Bev Santoro says Cole Brandt was gone from the floor from about 9:10 to 9:28, during the speech. He came back red in the face and said he’d been smoking on the dock.', who: ['cole', 'bev'], at: 'Fri 21:10' },
    cole_contact: { title: 'Cole’s application', text: 'Cole was hired three weeks ago on Imogen Park’s referral. His application lists her as his emergency contact (“cousin”) and his cell as 555-310-0172.', who: ['cole', 'imogen'] },
    cole_loaded: { title: 'Cole loaded the carriers', text: 'The driver, Luis Ocampo, says Cole insisted on loading the sheet-pan carriers himself on Friday night, and took one inside to wash the moment they got back.', who: ['luis', 'cole'], at: 'Fri 22:40' },
    carrier_flakes: { title: 'Flakes in carrier 14', text: 'Santoro’s carrier 14 had been washed, but the channel along its door gasket held flakes of blue-gray paint, a chalky white ground and a few stiff linen threads.' },
    cole_story: { title: 'Cole’s story', text: 'Cole says he stepped out onto the loading dock for a smoke during the speech, “like five minutes.”', who: ['cole'] },
    cole_browser: { title: 'Cole looked up Carrow', text: 'Open on Cole’s laptop: a page of Edith Carrow auction results.', who: ['cole'] },
    gallery_call: { title: 'A call about a Carrow', text: 'On Saturday morning a young man phoned Pruitt Fine Art on Bluff Avenue to ask what a Carrow would bring “without paperwork.” The call came from a cell number ending in 0172.', at: 'Sat 10:40' },
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
    cole: { title: 'Cole Brandt', where: '1418 Carver Ave · Northgate', kind: 'person', cost: 1, again: 0.5, if: 'cole_missing | cole_contact', until: 'canvas_found', closed: 'In custody' },
    interview: { title: 'Cole Brandt, in custody', where: 'Interview Room 2 · Garland St', kind: 'person', cost: 0.5, if: 'canvas_found', scene: 'cole_room' },
    greta: { title: 'Greta Lindqvist', where: 'Lake Crest Road · Bluffside', kind: 'person', cost: 1, again: 0.5, if: 'greta_named | @erik' },
    erik: { title: 'Erik Lindqvist', where: 'A loft on Mill St · The Flats', kind: 'person', cost: 1, again: 0.5, if: 'erik_argument' },
    lena: { title: 'Lena Moss', where: 'Photographer · by phone', kind: 'phone', cost: 0.5, if: 'sign_out_log | imogen_photo_story', once: true, onceNote: 'Called' },
    mina: { title: 'Mina Castellanos', where: 'Her studio · Kessler Park', kind: 'person', cost: 1, again: 0.5, if: 'mina_named' },
    warrant: { title: 'Warrants', where: 'ADA Gus Pellegrino · by phone', kind: 'phone', cost: 0.5, again: 0.5, if: 'cole_missing | cole_contact | sign_out_log | mina_copy | egret', until: 'canvas_found & condo_search', closed: 'Served' },
    condo: { title: 'Imogen Park at home', where: 'Marina Point 6B · Harbor Rd', kind: 'person', cost: 1, again: 0.5, if: `imogen_sick & (${IMOGEN_KNOWN})`, until: 'imogen_arrested', closed: 'In custody' },
  },

  scenes: {
