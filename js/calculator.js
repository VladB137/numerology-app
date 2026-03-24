import { getModules, CalculationError } from './registry.js';

const RESULT_VALIDATORS = {
  single:      r => r && typeof r.value === 'number',
  list:        r => r && Array.isArray(r.values),
  table:       r => r && typeof r.table === 'object' && !Array.isArray(r.table),
  'multi-cycle': r => r && Array.isArray(r.cycles),
  map:         r => r && typeof r.table === 'object',
};

/**
 * Topological sort of modules by dependsOn.
 * @param {Array} modules
 * @returns {Array} sorted modules
 */
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

/**
 * Run all applicable modules for the given input and system(s).
 * @param {Object} input - { fullName, birthdate, timeOfBirth?, locationOfBirth? }
 * @param {string|string[]} systems - 'pythagorean', 'chaldean', or 'both'
 * @returns {Array<{module, system, result, interpretation, error?}>}
 */
export function generateReading(input, systems) {
  const modules = getModules();
  const systemList = systems === 'both'
    ? ['pythagorean', 'chaldean']
    : [systems];

  // Determine available input fields
  const availableInputs = new Set(['fullName', 'birthdate']);
  if (input.timeOfBirth) availableInputs.add('timeOfBirth');
  if (input.locationOfBirth) availableInputs.add('locationOfBirth');

  // Filter to modules whose inputs are satisfied
  const applicable = modules.filter(m =>
    (m.inputRequires || []).every(req => availableInputs.has(req) || req === 'birthdate' || req === 'fullName')
  );

  // Topological sort
  const sorted = topoSort(applicable);

  // Execute per system
  const results = [];
  for (const system of systemList) {
    const resolved = {};

    for (const mod of sorted) {
      if (!mod.systems.includes(system)) continue;

      try {
        const result = mod.calculate(input, system, resolved);

        // Validate result shape
        const validator = RESULT_VALIDATORS[mod.resultType];
        if (validator && !validator(result)) {
          throw new CalculationError(mod.id, `Result shape mismatch for resultType "${mod.resultType}"`);
        }

        resolved[mod.id] = result;
        const interpretation = mod.interpret(result, system);

        results.push({ module: mod, system, result, interpretation });
      } catch (err) {
        results.push({ module: mod, system, result: null, interpretation: null, error: err.message });
      }
    }
  }

  return results;
}
