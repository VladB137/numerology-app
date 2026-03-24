import { letterValue, normalizeName, stripDiacritics, PYTHAGOREAN, CHALDEAN, VOWELS } from '../../data/letter-values.js';
import { assertEqual, assert, assertThrows, summary } from '../test-helper.js';

// Pythagorean mappings — spot checks
assertEqual(letterValue('A', 'pythagorean'), 1, 'A=1 Pythagorean');
assertEqual(letterValue('I', 'pythagorean'), 9, 'I=9 Pythagorean');
assertEqual(letterValue('J', 'pythagorean'), 1, 'J=1 Pythagorean (cycle restarts)');
assertEqual(letterValue('S', 'pythagorean'), 1, 'S=1 Pythagorean');
assertEqual(letterValue('Z', 'pythagorean'), 8, 'Z=8 Pythagorean');

// Pythagorean — verify full 1-9 cycle
assertEqual(PYTHAGOREAN.A, 1, 'Pyth A=1');
assertEqual(PYTHAGOREAN.B, 2, 'Pyth B=2');
assertEqual(PYTHAGOREAN.C, 3, 'Pyth C=3');
assertEqual(PYTHAGOREAN.D, 4, 'Pyth D=4');
assertEqual(PYTHAGOREAN.E, 5, 'Pyth E=5');
assertEqual(PYTHAGOREAN.F, 6, 'Pyth F=6');
assertEqual(PYTHAGOREAN.G, 7, 'Pyth G=7');
assertEqual(PYTHAGOREAN.H, 8, 'Pyth H=8');
assertEqual(PYTHAGOREAN.I, 9, 'Pyth I=9');

// Chaldean mappings — spot checks
assertEqual(letterValue('A', 'chaldean'), 1, 'A=1 Chaldean');
assertEqual(letterValue('S', 'chaldean'), 3, 'S=3 Chaldean');
assertEqual(letterValue('F', 'chaldean'), 8, 'F=8 Chaldean');
assertEqual(letterValue('O', 'chaldean'), 7, 'O=7 Chaldean');

// Chaldean — no 9 in basic mappings
const chaldeanValues = Object.values(CHALDEAN);
assert(!chaldeanValues.includes(9), 'Chaldean has no 9 in letter values');

// Case insensitive
assertEqual(letterValue('a', 'pythagorean'), 1, 'lowercase a = 1');
assertEqual(letterValue('z', 'chaldean'), 7, 'lowercase z chaldean = 7');

// Invalid letter throws
assertThrows(() => letterValue('!', 'pythagorean'), 'Exclamation throws');
assertThrows(() => letterValue('1', 'pythagorean'), 'Digit throws');

// Diacritic stripping
assertEqual(stripDiacritics('ăâîșț'), 'aaist', 'Romanian diacritics stripped (ă→a, â→a, î→i, ș→s, ț→t)');
assertEqual(stripDiacritics('María'), 'Maria', 'Spanish accent stripped');
assertEqual(stripDiacritics('François'), 'Francois', 'French cedilla stripped');
assertEqual(stripDiacritics('Müller'), 'Muller', 'German umlaut stripped');
assertEqual(stripDiacritics('ABC'), 'ABC', 'Plain ASCII unchanged');

// Romanian comma-below characters specifically
assertEqual(stripDiacritics('\u0218'), 'S', 'S-comma-below → S');
assertEqual(stripDiacritics('\u0219'), 's', 's-comma-below → s');
assertEqual(stripDiacritics('\u021A'), 'T', 'T-comma-below → T');
assertEqual(stripDiacritics('\u021B'), 't', 't-comma-below → t');

// Name normalization
assertEqual(normalizeName('Maria Elena Popescu'), 'MARIA ELENA POPESCU', 'Basic normalization');
assertEqual(normalizeName('maría josé'), 'MARIA JOSE', 'Accents + lowercase');
assertEqual(normalizeName('O\'Brien'), 'OBRIEN', 'Apostrophe removed');
assertEqual(normalizeName('Jean-Paul'), 'JEANPAUL', 'Hyphen removed');
assertEqual(normalizeName('  Extra   Spaces  '), 'EXTRA   SPACES', 'Leading/trailing trimmed');

// Vowels set
assert(VOWELS.has('A'), 'A is vowel');
assert(VOWELS.has('E'), 'E is vowel');
assert(VOWELS.has('I'), 'I is vowel');
assert(VOWELS.has('O'), 'O is vowel');
assert(VOWELS.has('U'), 'U is vowel');
assert(!VOWELS.has('Y'), 'Y not in default vowels (handled per-module)');
assert(!VOWELS.has('B'), 'B is not vowel');

summary('letter-values.js');
