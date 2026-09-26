// The casebook, in the order the cases appear. To add a case, write js/cases/<id>.js (see
// docs/WRITING.md) and list it here; npm test checks it.
import nightDeposit from './night-deposit.js';
import sharedWall from './shared-wall.js';
import harborRoad from './harbor-road.js';
import powerOfAttorney from './power-of-attorney.js';
import theHeron from './the-heron.js';
import lowWater from './low-water.js';

export const CASES = [nightDeposit, sharedWall, harborRoad, powerOfAttorney, theHeron, lowWater];
export const byId = id => CASES.find(c => c.id === id);
