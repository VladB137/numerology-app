import { MASTER_NUMBERS } from './master-numbers.js';

/**
 * Reduce a number to a single digit, optionally preserving master numbers.
 * @param {number} n - The number to reduce
 * @param {boolean} preserveMasters - If true, stop at 11, 22, 33
 * @returns {number}
 */
export function reduceToDigit(n, preserveMasters = true) {
  while (n > 9) {
    if (preserveMasters && MASTER_NUMBERS.includes(n)) {
      return n;
    }
    n = String(n).split('').reduce((sum, d) => sum + parseInt(d, 10), 0);
  }
  return n;
}

/**
 * Sum all digits of a number string (does not reduce, just one pass).
 * @param {string|number} input
 * @returns {number}
 */
export function digitSum(input) {
  return String(input).split('').filter(c => /\d/.test(c)).reduce((sum, d) => sum + parseInt(d, 10), 0);
}
