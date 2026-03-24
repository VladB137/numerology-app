/**
 * Module Registry — loads modules from modules.json and provides access.
 */

// Use import.meta.url so paths resolve correctly for both fetch() and import()
const MODULE_BASE = new URL('./modules/', import.meta.url).href;
let _modules = [];

export class CalculationError extends Error {
  constructor(moduleId, message) {
    super(`[${moduleId}] ${message}`);
    this.moduleId = moduleId;
  }
}

/**
 * Load all modules listed in modules.json.
 * Validates dependsOn references and detects cycles.
 * @returns {Promise<Array>} Loaded modules
 */
export async function loadModules() {
  const resp = await fetch(MODULE_BASE + 'modules.json');
  const { modules: paths } = await resp.json();

  _modules = [];
  for (const path of paths) {
    try {
      const mod = await import(MODULE_BASE + path);
      _modules.push(mod.default);
    } catch (err) {
      console.error(`Failed to load module: ${path}`, err);
    }
  }

  // Validate dependsOn references
  const ids = new Set(_modules.map(m => m.id));
  for (const mod of _modules) {
    for (const dep of (mod.dependsOn || [])) {
      if (!ids.has(dep)) {
        console.error(`Module "${mod.id}" depends on unknown module "${dep}"`);
      }
    }
  }

  // Detect cycles via topological sort attempt
  const visited = new Set();
  const visiting = new Set();
  const cycleModules = new Set();

  function visit(id) {
    if (visiting.has(id)) { cycleModules.add(id); return false; }
    if (visited.has(id)) return true;
    visiting.add(id);
    const mod = _modules.find(m => m.id === id);
    if (mod) {
      for (const dep of (mod.dependsOn || [])) {
        if (!visit(dep)) { cycleModules.add(id); }
      }
    }
    visiting.delete(id);
    visited.add(id);
    return true;
  }

  for (const mod of _modules) visit(mod.id);

  if (cycleModules.size > 0) {
    console.error(`Dependency cycle detected in modules: ${[...cycleModules].join(', ')}`);
    _modules = _modules.filter(m => !cycleModules.has(m.id));
  }

  return _modules;
}

/**
 * Get all loaded modules.
 * @returns {Array}
 */
export function getModules() {
  return _modules;
}

/**
 * Get modules filtered by category.
 * @param {string} category
 * @returns {Array}
 */
export function getModulesByCategory(category) {
  return _modules.filter(m => m.category === category);
}
