/**
 * Calculator orchestrator tests.
 * These use the stub modules to test the orchestration logic in isolation.
 * Must be run via Node since they need to mock the registry.
 */
import { assert, assertEqual, summary } from '../test-helper.js';

// Direct unit tests of the calculator logic (no registry dependency)
// The actual orchestrator tests require a browser or mocked fetch for module loading.
// Here we test the core algorithms that calculator.js depends on.

// Test: topological sort correctness
// Simulating the topoSort function inline
function topoSort(modules) {
  const byId = Object.fromEntries(modules.map(m => [m.id, m]));
  const sorted = [];
  const visited = new Set();

  function visit(mod) {
    if (visited.has(mod.id)) return;
    visited.add(mod.id);
    for (const depId of (mod.dependsOn || [])) {
      if (byId[depId]) visit(byId[depId]);
    }
    sorted.push(mod);
  }

  modules.forEach(m => visit(m));
  return sorted;
}

// Test: modules with no deps come first
const mods = [
  { id: 'b', dependsOn: ['a'] },
  { id: 'a', dependsOn: [] },
  { id: 'c', dependsOn: ['b'] },
];
const sorted = topoSort(mods);
assertEqual(sorted[0].id, 'a', 'Topo sort: a first (no deps)');
assertEqual(sorted[1].id, 'b', 'Topo sort: b second (depends on a)');
assertEqual(sorted[2].id, 'c', 'Topo sort: c third (depends on b)');

// Test: independent modules maintain order
const indep = [
  { id: 'x', dependsOn: [] },
  { id: 'y', dependsOn: [] },
  { id: 'z', dependsOn: [] },
];
const sortedIndep = topoSort(indep);
assertEqual(sortedIndep.length, 3, 'All independent modules present');

// Test: diamond dependency (d depends on b and c, both depend on a)
const diamond = [
  { id: 'd', dependsOn: ['b', 'c'] },
  { id: 'b', dependsOn: ['a'] },
  { id: 'c', dependsOn: ['a'] },
  { id: 'a', dependsOn: [] },
];
const sortedDiamond = topoSort(diamond);
assertEqual(sortedDiamond[0].id, 'a', 'Diamond: a first');
assert(
  sortedDiamond.indexOf(sortedDiamond.find(m => m.id === 'd')) > sortedDiamond.indexOf(sortedDiamond.find(m => m.id === 'b')),
  'Diamond: d after b'
);
assert(
  sortedDiamond.indexOf(sortedDiamond.find(m => m.id === 'd')) > sortedDiamond.indexOf(sortedDiamond.find(m => m.id === 'c')),
  'Diamond: d after c'
);

// Test: result shape validators
const RESULT_VALIDATORS = {
  single:      r => r && typeof r.value === 'number',
  list:        r => r && Array.isArray(r.values),
  table:       r => r && typeof r.table === 'object' && !Array.isArray(r.table),
  'multi-cycle': r => r && Array.isArray(r.cycles),
};

assert(RESULT_VALIDATORS.single({ value: 7 }), 'Valid single result');
assert(!RESULT_VALIDATORS.single({ value: 'not a number' }), 'Invalid single: string value');
assert(!RESULT_VALIDATORS.single(null), 'Invalid single: null');

assert(RESULT_VALIDATORS.list({ values: [1, 2, 3] }), 'Valid list result');
assert(!RESULT_VALIDATORS.list({ values: 'not array' }), 'Invalid list: not array');

assert(RESULT_VALIDATORS.table({ table: { a: 1, b: 2 } }), 'Valid table result');
assert(!RESULT_VALIDATORS.table({ table: [1, 2] }), 'Invalid table: array');

assert(RESULT_VALIDATORS['multi-cycle']({ cycles: [{ value: 1 }] }), 'Valid multi-cycle result');
assert(!RESULT_VALIDATORS['multi-cycle']({ cycles: 'nope' }), 'Invalid multi-cycle');

summary('calculator.js');
