// Pythagorean letter-to-number mapping (1-9 cycle)
// Source: to be filled during extraction from books
export const PYTHAGOREAN = {
  A: 1, B: 2, C: 3, D: 4, E: 5, F: 6, G: 7, H: 8, I: 9,
  J: 1, K: 2, L: 3, M: 4, N: 5, O: 6, P: 7, Q: 8, R: 9,
  S: 1, T: 2, U: 3, V: 4, W: 5, X: 6, Y: 7, Z: 8
};

// Chaldean letter-to-number mapping (1-8 only, no 9)
// Source: to be verified during extraction from books
export const CHALDEAN = {
  A: 1, B: 2, C: 3, D: 4, E: 5, F: 8, G: 3, H: 5, I: 1,
  J: 1, K: 2, L: 3, M: 4, N: 5, O: 7, P: 8, Q: 1, R: 2,
  S: 3, T: 4, U: 6, V: 6, W: 6, X: 5, Y: 1, Z: 7
};

// Vowels for Soul Urge / Heart's Desire calculation
// Y is conditionally a vowel — handled per-module
export const VOWELS = new Set(['A', 'E', 'I', 'O', 'U']);

/**
 * Get the numeric value of a letter in the given system.
 * @param {string} letter - Single uppercase letter A-Z
 * @param {string} system - 'pythagorean' or 'chaldean'
 * @returns {number} The numeric value (1-9 for Pythagorean, 1-8 for Chaldean)
 */
export function letterValue(letter, system) {
  const map = system === 'chaldean' ? CHALDEAN : PYTHAGOREAN;
  const val = map[letter.toUpperCase()];
  if (val === undefined) {
    throw new Error(`No mapping for letter: ${letter}`);
  }
  return val;
}

/**
 * Strip diacritics from a string, converting to base Latin letters.
 * ă→a, ș→s, ț→t, é→e, etc.
 * @param {string} str
 * @returns {string}
 */
export function stripDiacritics(str) {
  // Handle Romanian S-comma-below (U+0218/0219) and S-cedilla (U+015E/015F)
  // Handle Romanian T-comma-below (U+021A/021B) and T-cedilla (U+0162/0163)
  return str
    .replace(/[\u0218\u015E]/g, 'S')
    .replace(/[\u0219\u015F]/g, 's')
    .replace(/[\u021A\u0162]/g, 'T')
    .replace(/[\u021B\u0163]/g, 't')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

/**
 * Normalize a name for calculation: strip diacritics, uppercase, keep only A-Z and spaces.
 * @param {string} name
 * @returns {string}
 */
export function normalizeName(name) {
  return stripDiacritics(name).toUpperCase().replace(/[^A-Z\s]/g, '').trim();
}
