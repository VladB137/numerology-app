let passed = 0, failed = 0, errors = [];

export function assert(condition, message) {
  if (condition) { passed++; }
  else { failed++; errors.push(message); console.error('FAIL:', message); }
}

export function assertEqual(actual, expected, message) {
  assert(actual === expected, `${message}: expected ${expected}, got ${actual}`);
}

export function assertDeepEqual(actual, expected, message) {
  assert(JSON.stringify(actual) === JSON.stringify(expected), `${message}: expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`);
}

export function assertThrows(fn, message) {
  try {
    fn();
    failed++;
    errors.push(`${message}: expected to throw but did not`);
    console.error('FAIL:', `${message}: expected to throw but did not`);
  } catch {
    passed++;
  }
}

export function summary(suiteName = '') {
  const prefix = suiteName ? `[${suiteName}] ` : '';
  console.log(`\n${prefix}${passed} passed, ${failed} failed`);
  if (errors.length) errors.forEach(e => console.log(`  FAIL: ${e}`));
  const ok = failed === 0;
  // Reset for next suite
  const result = { passed, failed, errors: [...errors] };
  passed = 0; failed = 0; errors = [];
  return result;
}
