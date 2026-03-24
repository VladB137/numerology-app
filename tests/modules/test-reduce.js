import { reduceToDigit, digitSum } from '../../data/reduce.js';
import { assertEqual, summary } from '../test-helper.js';

// reduceToDigit — basic reduction
assertEqual(reduceToDigit(28), 1, 'reduceToDigit(28) = 2+8=10, 1+0=1');
assertEqual(reduceToDigit(9), 9, 'reduceToDigit(9) = 9');
assertEqual(reduceToDigit(10), 1, 'reduceToDigit(10) = 1+0=1');
assertEqual(reduceToDigit(0), 0, 'reduceToDigit(0) = 0');
assertEqual(reduceToDigit(1), 1, 'reduceToDigit(1) = 1');
assertEqual(reduceToDigit(99), 9, 'reduceToDigit(99) = 9+9=18, 1+8=9');
assertEqual(reduceToDigit(100), 1, 'reduceToDigit(100) = 1+0+0=1');

// reduceToDigit — master numbers preserved (default)
assertEqual(reduceToDigit(11), 11, 'reduceToDigit(11) preserves master');
assertEqual(reduceToDigit(22), 22, 'reduceToDigit(22) preserves master');
assertEqual(reduceToDigit(33), 33, 'reduceToDigit(33) preserves master');
assertEqual(reduceToDigit(11, true), 11, 'reduceToDigit(11, true) preserves master');

// reduceToDigit — master numbers NOT preserved
assertEqual(reduceToDigit(11, false), 2, 'reduceToDigit(11, false) = 2');
assertEqual(reduceToDigit(22, false), 4, 'reduceToDigit(22, false) = 4');
assertEqual(reduceToDigit(33, false), 6, 'reduceToDigit(33, false) = 6');

// reduceToDigit — non-master double digits
assertEqual(reduceToDigit(13), 4, 'reduceToDigit(13) = 1+3=4');
assertEqual(reduceToDigit(14), 5, 'reduceToDigit(14) = 1+4=5');
assertEqual(reduceToDigit(16), 7, 'reduceToDigit(16) = 1+6=7');
assertEqual(reduceToDigit(19), 1, 'reduceToDigit(19) = 1+9=10, 1+0=1');

// digitSum — single pass, no reduction
assertEqual(digitSum(1990), 19, 'digitSum(1990) = 1+9+9+0 = 19');
assertEqual(digitSum('315'), 9, 'digitSum("315") = 3+1+5 = 9');
assertEqual(digitSum('1234'), 10, 'digitSum("1234") = 1+2+3+4 = 10');
assertEqual(digitSum(0), 0, 'digitSum(0) = 0');
assertEqual(digitSum('03151990'), 28, 'digitSum("03151990") = 0+3+1+5+1+9+9+0 = 28');

summary('reduce.js');
