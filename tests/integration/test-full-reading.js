/**
 * Integration test: import all 26 modules, run a full reading, verify outputs.
 */
import lifePath from '../../js/modules/core/life-path.js';
import expression from '../../js/modules/core/expression.js';
import soulUrge from '../../js/modules/core/soul-urge.js';
import personality from '../../js/modules/core/personality.js';
import birthday from '../../js/modules/core/birthday.js';
import maturity from '../../js/modules/core/maturity.js';
import balance from '../../js/modules/secondary/balance.js';
import karmicLessons from '../../js/modules/secondary/karmic-lessons.js';
import karmicDebt from '../../js/modules/secondary/karmic-debt.js';
import hiddenPassion from '../../js/modules/secondary/hidden-passion.js';
import subconsciousSelf from '../../js/modules/secondary/subconscious-self.js';
import cornerstone from '../../js/modules/name/cornerstone.js';
import capstone from '../../js/modules/name/capstone.js';
import firstVowel from '../../js/modules/name/first-vowel.js';
import planesOfExpression from '../../js/modules/name/planes-of-expression.js';
import inclusionChart from '../../js/modules/name/inclusion-chart.js';
import personalYear from '../../js/modules/timing/personal-year.js';
import personalMonth from '../../js/modules/timing/personal-month.js';
import pinnacles from '../../js/modules/timing/pinnacles.js';
import challenges from '../../js/modules/timing/challenges.js';
import transits from '../../js/modules/timing/transits.js';
import essence from '../../js/modules/timing/essence.js';
import bridgeNumbers from '../../js/modules/special/bridge-numbers.js';
import rationalThought from '../../js/modules/special/rational-thought.js';
import chaldeanCompound from '../../js/modules/special/chaldean-compound.js';
import masterNumbers from '../../js/modules/special/master-numbers.js';
import { assert, assertEqual, summary } from '../test-helper.js';

const ALL_MODULES = [
  lifePath, expression, soulUrge, personality, birthday, maturity,
  balance, karmicLessons, karmicDebt, hiddenPassion, subconsciousSelf,
  cornerstone, capstone, firstVowel, planesOfExpression, inclusionChart,
  personalYear, personalMonth, pinnacles, challenges, transits, essence,
  bridgeNumbers, rationalThought, chaldeanCompound, masterNumbers,
];

// === Contract validation for ALL modules ===
for (const mod of ALL_MODULES) {
  assert(typeof mod.id === 'string' && mod.id.length > 0, `${mod.id || 'unknown'}: has id`);
  assert(mod.name && mod.name.en && mod.name.ro, `${mod.id}: bilingual name`);
  assert(typeof mod.category === 'string', `${mod.id}: has category`);
  assert(Array.isArray(mod.systems), `${mod.id}: has systems`);
  assert(Array.isArray(mod.inputRequires), `${mod.id}: has inputRequires`);
  assert(Array.isArray(mod.dependsOn), `${mod.id}: has dependsOn`);
  assert(typeof mod.calculate === 'function', `${mod.id}: has calculate`);
  assert(typeof mod.interpret === 'function', `${mod.id}: has interpret`);
  assert(typeof mod.describe === 'function', `${mod.id}: has describe`);
  const desc = mod.describe();
  assert(desc.explanation && desc.explanation.en && desc.explanation.ro, `${mod.id}: bilingual explanation`);
  assert(desc.howCalculated && desc.howCalculated.en && desc.howCalculated.ro, `${mod.id}: bilingual howCalculated`);
}

// === Full Pythagorean reading simulation ===
const input = { fullName: 'MARIA ELENA POPESCU', birthdate: new Date(1990, 2, 15) };
const system = 'pythagorean';
const resolved = {};

// Phase 1: no-dependency modules
const noDeps = ALL_MODULES.filter(m => m.dependsOn.length === 0 && m.systems.includes(system));
for (const mod of noDeps) {
  const satisfied = mod.inputRequires.every(r => r === 'birthdate' || r === 'fullName');
  if (!satisfied) continue;
  try {
    const result = mod.calculate(input, system, resolved);
    resolved[mod.id] = result;
    const interp = mod.interpret(result, system);
    assert(interp && interp.entries, `${mod.id}: interpret returns entries`);
    assert(interp.entries.length > 0, `${mod.id}: has at least one entry`);
    for (const e of interp.entries) {
      assert(Array.isArray(e.sources), `${mod.id}: entry has sources array`);
      assert(Array.isArray(e.keywords), `${mod.id}: entry has keywords array`);
    }
  } catch (err) {
    console.error(`${mod.id} failed:`, err.message);
  }
}

// Phase 2: dependent modules
const withDeps = ALL_MODULES.filter(m => m.dependsOn.length > 0 && m.systems.includes(system));
for (const mod of withDeps) {
  const depsOk = mod.dependsOn.every(d => resolved[d] !== undefined);
  if (!depsOk) { continue; }
  try {
    const result = mod.calculate(input, system, resolved);
    resolved[mod.id] = result;
    const interp = mod.interpret(result, system);
    assert(interp && interp.entries, `${mod.id}: interpret returns entries`);
  } catch (err) {
    console.error(`${mod.id} failed:`, err.message);
  }
}

// Verify key results
assertEqual(resolved['life-path']?.value, 1, 'MARIA ELENA POPESCU, Mar 15 1990: Life Path = 1');
assert(resolved['expression'] !== undefined, 'Expression computed');
assert(resolved['soul-urge'] !== undefined, 'Soul Urge computed');
assert(resolved['personality'] !== undefined, 'Personality computed');
assertEqual(resolved['birthday']?.value, 6, 'Birthday (15th) = 6');
assert(resolved['maturity'] !== undefined, 'Maturity computed');
assert(resolved['karmic-lessons']?.values !== undefined, 'Karmic Lessons computed');
assert(resolved['subconscious-self'] !== undefined, 'Subconscious Self computed');
assert(resolved['hidden-passion']?.values?.length > 0, 'Hidden Passion found');
assert(resolved['personal-year'] !== undefined, 'Personal Year computed');
assert(resolved['pinnacles']?.cycles?.length === 4, 'Pinnacles has 4 cycles');
assert(resolved['challenges']?.cycles?.length === 4, 'Challenges has 4 cycles');
assert(resolved['transits']?.table !== undefined, 'Transits computed');
assert(resolved['essence'] !== undefined, 'Essence computed');
assert(resolved['bridge-numbers']?.values !== undefined, 'Bridge Numbers computed');
assert(resolved['master-numbers']?.values !== undefined, 'Master Numbers computed');

// Count successfully resolved modules
const resolvedCount = Object.keys(resolved).length;
console.log(`\nResolved ${resolvedCount} modules for Pythagorean reading.`);
assert(resolvedCount >= 22, `At least 22 modules resolved (got ${resolvedCount})`);

// === Chaldean reading (subset) ===
const chaldeanResolved = {};
const chaldeanInput = { fullName: 'JOHN SMITH', birthdate: new Date(1985, 5, 22) };
const chaldeanMods = ALL_MODULES.filter(m => m.systems.includes('chaldean') && m.dependsOn.length === 0);
for (const mod of chaldeanMods) {
  try {
    const result = mod.calculate(chaldeanInput, 'chaldean', chaldeanResolved);
    chaldeanResolved[mod.id] = result;
  } catch (err) {
    console.error(`Chaldean ${mod.id} failed:`, err.message);
  }
}
assert(Object.keys(chaldeanResolved).length >= 8, 'At least 8 Chaldean modules resolved');
assert(chaldeanResolved['chaldean-compound']?.value > 9, 'Chaldean compound is multi-digit');

summary('full-reading-integration');
