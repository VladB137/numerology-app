/** Master numbers — preserved during digit reduction in Pythagorean system */
export const MASTER_NUMBERS = [11, 22, 33];

/**
 * Check if a number is a master number.
 * @param {number} n
 * @returns {boolean}
 */
export function isMasterNumber(n) {
  return MASTER_NUMBERS.includes(n);
}
