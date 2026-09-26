# Writing a case

A case is one JavaScript file in `js/cases/` that exports a plain object. The engine (`js/engine.js`) runs it, the checker (`js/check.js`) looks for mistakes, and `npm test` plays the lieutenant's route to prove the case can be solved in the time allowed. `js/cases/night-deposit.js` is the model: read it before writing a new one.

To check one file while you work:

```sh
node tools/check-case.mjs js/cases/<id>.js
```

Then list it in `js/cases/index.js` and run `npm test`.

## What makes a good case

- **Grounded crimes.** Theft, fraud, arson, a hit-and-run, a disappearance, sometimes a death. People do these things for ordinary reasons: rent, pride, fear, a family covering for one of its own. No master criminals, no gore, no jokes at the victims’ expense.
- **Fair play.** Everything needed to solve the case is findable in the game, and the solution follows from the clues. No surprise twins.
- **The key deduction takes two clues.** A clue shouldn’t just say who did it. The culprit falls to a contradiction: a statement against a record, an alibi against a log, a timeline that doesn’t fit.
- **More than one road to the truth.** The central contradiction can be found by at least two routes, so a player who skips one lead isn’t locked out.
- **Red herrings that resolve.** The obvious suspect usually didn’t do it. Each suspect has something they’re hiding, and the player can find out what it is. Martin in case 1 lied about where he was because he was gambling, not stealing.
- **Time is the difficulty.** Budget the hours so a player can do roughly 60 to 70 percent of the work in a case. The lieutenant’s route should use about half the budget. Records and lab requests take time to come back, and timed events move the story along without the player.
- **A payoff.** A confrontation, a warrant, a search. The player should get to use what they’ve found, not only collect it.

## The world

**Port Calder** is a mid-sized Great Lakes port city of about 180,000, where the Tamsin River meets the lake. It’s the present day, so there are phones, cameras and card readers, and warrants to get at any of them. Neighborhoods:

- **Old Town**: downtown. City Hall, the courthouse, police headquarters on Garland Street, the Calder Museum of Art.
- **The Flats**: old industry along the river, brick warehouses turning into lofts.
- **Northgate**: working-class streets of two-flats and corner stores. Dunmore Street, Ferris Street, Carver Avenue.
- **Bluffside**: old money on the bluff above the lake.
- **Kessler Park**: around Calder State University. Bungalows, retirees and grad students.
- **The Harbor**: grain elevators, the marina, Harbor Road, the closed Ashby shipyard.
- **Lakeview**: a lakeside suburb to the east.
- Nearby: **Calder Downs** (racetrack and casino), **Mercy General** and **St. Brigid’s** (hospitals), **Northshore Savings** (the local bank).

**You** are a detective in the Investigations Unit. The player picks a surname; the text writes `{det}` for “Detective Surname” and `{name}` for the surname alone. Never give the player a gender, age or pronoun. The text is second person, present tense.

**The regulars.** They can appear in any case.

- **Lt. Ruth Okafor**: your lieutenant. She hands out the cases and reads your reports. Dry, exact, fair, and never raises her voice. Her line: “Bring me the chain, not a hunch.”
- **Theo Marsh**: civilian records analyst in the basement. Runs property, vehicle, phone subscriber and business filings. Cheerful and fast, and he knows every clerk at City Hall.
- **Dr. Anjali Rao**: runs the crime lab: prints, fibers, paint, handwriting, fire debris, phones. Precise. Won’t say more than the evidence does.
- **ADA Gus Pellegrino**: the assistant district attorney who takes warrant calls. Practical. He wants probable cause, not a feeling.
- **Dr. Samuel Achebe**: medical examiner. Gentle with families and blunt with detectives.

Every character outside the regulars gets a first and last name that no other case uses, minor characters in the text included, so nobody wonders whether the Wendell at Mercy General in one case is the Wendell in another. `npm test` checks the `people` lists; for everyone else, search `js/cases/` before you name them.

## Style

- Plain, concrete sentences. One telling detail beats three adjectives. Short paragraphs.
- People talk like people: interrupted, evasive, a little funny sometimes. Each suspect should sound different.
- Curly quotes and apostrophes (“ ” ’), and American spelling.
- Scene openings run about 60 to 180 words. Answers to a choice run about 30 to 150 words.
- Documents (logs, letters, receipts, lab results) go in `> ` lines, which are set in typewriter type.
- Choice labels start with a verb and say what you do: “Ask about the night drop”, “Look over the office”, “Show him the alarm log”.
- Clue titles are short (two to six words). Clue text states the fact plainly, in one to three sentences, as a detective’s note would.

## The format

```js
export default {
  id: 'night-deposit',          // file name, lowercase-with-dashes
  n: 1,                         // position in the casebook
  title: 'The Night Deposit',
  crime: 'Theft',               // one or two words for the case list
  difficulty: 1,                // 1, 2 or 3
  summary: '…',                 // one or two sentences for the case list
  days: ['Saturday', 'Sunday'], // the days the case touches, in order (for the clock and the timeline)
  start: { day: 1, hour: 9 },   // when you start: index into days, and the hour
  workday: [8, 20],             // optional: the working day; later hours carry on the next morning
  hours: 8,                     // working hours until the report is due
  briefing: `…`,                // Lt. Okafor hands you the case

  people: { id: { name, role, about, if? } },       // the notebook's People; `if` hides them until met
  clues: { id: { title, text, who?: [personIds], at?: 'Sat 22:08' } },
  startClues: [...], startFlags: [...],             // optional: known from the start

  leads: {
    id: {
      title, where,                 // "Kowalczyk’s Market", "2210 Dunmore St · Northgate"
      kind,                         // 'place' | 'person' | 'records' | 'lab' | 'phone'
      cost,                         // hours for the first visit, in quarter hours
      again?,                       // hours for later visits (default: cost)
      if?,                          // condition: when it appears (default: from the start)
      until?, closed?,              // condition: when it closes, and the word shown ("Moved away")
      once?, onceNote?,             // only one visit, and the word shown after ("Requested")
      scene?,                       // scene id (default: the lead's id)
    },
  },

  scenes: {
    id: {
      title, text, again?,          // `again` replaces `text` on later visits
      clues?, set?, timer?,         // effects the first time you enter
      choices: [{
        label,                      // what you do. Unique in the scene, unless you give an `id`
        id?,                        // to have two choices with the same label and different `if`s
        if?,                        // condition: when it's offered
        cost?,                      // extra hours
        text?,                      // what happens
        clues?, set?, unset?, timer?,
        go?,                        // another scene id, or 'board' to leave
        once?,                      // default: true if it has text and no go
        say?,                       // how the choice reads in the transcript, if not the label
      }],
    },
  },

  events: [{ at, if?, title, text, clues?, set? }],  // at = working hours in; `if` is checked at that moment

  report: [                         // the first question is always "who"
    { id, q, options: { key: 'label' }, answer: 'key' | ['key', …], points, why },
  ],
  outcomes: { optionKey: `…`, default: `…` },   // what happened after you named someone (first question)

  solution: {
    text: `…`,                      // what really happened, told plainly
    chain: [clueIds],               // the clues that prove it
    walk: ['@lead', 'Choice label prefix', '/', …],  // the lieutenant's route
  },
};
```

**Conditions** are small expressions over what you know: `pawn_ticket` (a clue or flag), `@bank` (you’ve been to that lead), `!a & (b | c)`, and `time >= 6`, `hour < 12`, `day = 1` (working hours spent, the clock’s hour, the day index). Every name must be a clue, a flag that something sets, or a lead.

**Text** uses a blank line between paragraphs, `*italic*`, `**bold**`, `> ` lines for documents, and `[if cond]…[else]…[/if]` (not nested) to change with what the player knows.

**Timers** come back later: `timer: { in: 3, title: 'Dr. Rao', text: '…', clues: ['fiber_match'] }` on a scene or choice puts a message in the inbox three working hours later and adds the clues. Lab and records leads usually work this way: visiting sends the request, and the timer brings the answer.

**The report** is usually four or five questions worth 100 points, with “who” worth 40. The others ask how, why, and one fact a lucky guess wouldn’t get: where the money went, what proves the alibi false. Every `why` explains the answer in a sentence or two. Wrong options should be tempting, built from the red herrings.

**The lieutenant’s route** (`solution.walk`) is the shortest sensible path to every clue in `chain`. The checker plays it; the result page shows it next to yours.
