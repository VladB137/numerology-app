import lifePath from '../../js/modules/core/life-path.js';
import expression from '../../js/modules/core/expression.js';
import soulUrge from '../../js/modules/core/soul-urge.js';
import personality from '../../js/modules/core/personality.js';
import birthday from '../../js/modules/core/birthday.js';
import maturity from '../../js/modules/core/maturity.js';
import { assertEqual, assert, summary } from '../test-helper.js';

// ===== LIFE PATH =====
// March 15, 1990: month=3, day=6, year=1+9+9+0=19→1+0=1, total=3+6+1=10→1
let r = lifePath.calculate({ birthdate: new Date(1990, 2, 15) }, 'pythagorean', {});
assertEqual(r.value, 1, 'Life Path: Mar 15 1990 = 1');

// Nov 4, 1975: month=11(master), day=4, year=1+9+7+5=22(master), total=11+4+22=37→3+7=10→1
r = lifePath.calculate({ birthdate: new Date(1975, 10, 4) }, 'pythagorean', {});
assertEqual(r.value, 1, 'Life Path: Nov 4 1975 = 1');

// Dec 25, 2000: month=12→3, day=25→7, year=2→2, total=3+7+2=12→3
r = lifePath.calculate({ birthdate: new Date(2000, 11, 25) }, 'pythagorean', {});
assertEqual(r.value, 3, 'Life Path: Dec 25 2000 = 3');

// Feb 29, 1992: month=2, day=29→11(master), year=1+9+9+2=21→3, total=2+11+3=16→7
r = lifePath.calculate({ birthdate: new Date(1992, 1, 29) }, 'pythagorean', {});
assertEqual(r.value, 7, 'Life Path: Feb 29 1992 = 7');

// Test interpret returns entries with sources
let interp = lifePath.interpret({ value: 7 }, 'pythagorean');
assert(interp.entries.length > 0, 'Life Path interpret has entries');
assert(interp.entries[0].sources.length > 0, 'Life Path interpret has sources');
assert(interp.entries[0].keywords.length > 0, 'Life Path interpret has keywords');

// Test describe is bilingual
let desc = lifePath.describe();
assert(desc.explanation.en.length > 0, 'Life Path has English explanation');
assert(desc.explanation.ro.length > 0, 'Life Path has Romanian explanation');

// ===== EXPRESSION =====
// JOHN SMITH: J(1)+O(6)+H(8)+N(5)+S(1)+M(4)+I(9)+T(2)+H(8) = 44→4+4=8
r = expression.calculate({ fullName: 'JOHN SMITH' }, 'pythagorean', {});
assertEqual(r.value, 8, 'Expression: JOHN SMITH = 8');

// Chaldean: J(1)+O(7)+H(5)+N(5)+S(3)+M(4)+I(1)+T(4)+H(5) = 35→3+5=8
r = expression.calculate({ fullName: 'JOHN SMITH' }, 'chaldean', {});
assertEqual(r.value, 8, 'Expression Chaldean: JOHN SMITH = 8');

// ===== SOUL URGE (vowels only) =====
// JOHN SMITH vowels: O(6)+I(9) = 15→6
r = soulUrge.calculate({ fullName: 'JOHN SMITH' }, 'pythagorean', {});
assertEqual(r.value, 6, 'Soul Urge: JOHN SMITH = 6');

// ===== PERSONALITY (consonants only) =====
// JOHN SMITH consonants: J(1)+H(8)+N(5)+S(1)+M(4)+T(2)+H(8) = 29→11
r = personality.calculate({ fullName: 'JOHN SMITH' }, 'pythagorean', {});
assertEqual(r.value, 11, 'Personality: JOHN SMITH = 11 (master)');

// ===== BIRTHDAY =====
// Born on 15th: 1+5=6
r = birthday.calculate({ birthdate: new Date(1990, 2, 15) }, 'pythagorean', {});
assertEqual(r.value, 6, 'Birthday: 15th = 6');

// Born on 29th: 2+9=11 (master preserved)
r = birthday.calculate({ birthdate: new Date(1992, 1, 29) }, 'pythagorean', {});
assertEqual(r.value, 11, 'Birthday: 29th = 11 (master)');

// Born on 7th: 7
r = birthday.calculate({ birthdate: new Date(2000, 0, 7) }, 'pythagorean', {});
assertEqual(r.value, 7, 'Birthday: 7th = 7');

// Born on 22nd: 22 (master preserved)
r = birthday.calculate({ birthdate: new Date(1985, 5, 22) }, 'pythagorean', {});
assertEqual(r.value, 22, 'Birthday: 22nd = 22 (master)');

// ===== MATURITY =====
// Life Path 1 + Expression 8 = 9
r = maturity.calculate(
  { birthdate: new Date(1990, 2, 15), fullName: 'JOHN SMITH' },
  'pythagorean',
  { 'life-path': { value: 1 }, 'expression': { value: 8 } }
);
assertEqual(r.value, 9, 'Maturity: LP 1 + Expr 8 = 9');

// Life Path 7 + Expression 11 = 18→9
r = maturity.calculate(
  { birthdate: new Date(1990, 2, 15), fullName: 'TEST' },
  'pythagorean',
  { 'life-path': { value: 7 }, 'expression': { value: 11 } }
);
assertEqual(r.value, 9, 'Maturity: LP 7 + Expr 11 = 18→9');

// Life Path 11 + Expression 22 = 33 (master preserved)
r = maturity.calculate(
  { birthdate: new Date(1990, 2, 15), fullName: 'TEST' },
  'pythagorean',
  { 'life-path': { value: 11 }, 'expression': { value: 22 } }
);
assertEqual(r.value, 33, 'Maturity: LP 11 + Expr 22 = 33 (master)');

// ===== MODULE CONTRACT CHECKS =====
const modules = [lifePath, expression, soulUrge, personality, birthday, maturity];
for (const mod of modules) {
  assert(typeof mod.id === 'string', `${mod.id}: has id`);
  assert(mod.name.en && mod.name.ro, `${mod.id}: bilingual name`);
  assert(mod.category === 'core', `${mod.id}: category is core`);
  assert(Array.isArray(mod.systems), `${mod.id}: has systems array`);
  assert(Array.isArray(mod.inputRequires), `${mod.id}: has inputRequires`);
  assert(Array.isArray(mod.dependsOn), `${mod.id}: has dependsOn`);
  assert(typeof mod.calculate === 'function', `${mod.id}: has calculate()`);
  assert(typeof mod.interpret === 'function', `${mod.id}: has interpret()`);
  assert(typeof mod.describe === 'function', `${mod.id}: has describe()`);
}

summary('core-modules');
