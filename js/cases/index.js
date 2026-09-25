// The casebook, in the order the cases appear. To add a case, write js/cases/<id>.js (see
// docs/WRITING.md) and list it here; npm test checks it.
import nightDeposit from './night-deposit.js';

export const CASES = [nightDeposit];
export const byId = id => CASES.find(c => c.id === id);
