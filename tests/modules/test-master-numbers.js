import { MASTER_NUMBERS, isMasterNumber } from '../../data/master-numbers.js';
import { assert, assertEqual, assertDeepEqual, summary } from '../test-helper.js';

// MASTER_NUMBERS constant
assertDeepEqual(MASTER_NUMBERS, [11, 22, 33], 'Master numbers are 11, 22, 33');

// isMasterNumber
assert(isMasterNumber(11), '11 is master');
assert(isMasterNumber(22), '22 is master');
assert(isMasterNumber(33), '33 is master');
assert(!isMasterNumber(1), '1 is not master');
assert(!isMasterNumber(9), '9 is not master');
assert(!isMasterNumber(44), '44 is not master');
assert(!isMasterNumber(0), '0 is not master');

summary('master-numbers.js');
