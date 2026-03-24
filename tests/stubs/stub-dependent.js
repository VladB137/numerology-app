/** Stub module for testing — depends on stub-core */
export default {
  id: 'stub-dependent',
  name: { en: 'Stub Dependent', ro: 'Stub Dependent' },
  category: 'core',
  systems: ['pythagorean'],
  inputRequires: ['birthdate'],
  dependsOn: ['stub-core'],
  resultType: 'single',

  calculate(input, system, resolved) {
    const coreResult = resolved['stub-core'];
    if (!coreResult) throw new Error('Missing stub-core dependency');
    return { value: coreResult.value + 1 };
  },

  interpret(result, system) {
    return {
      entries: [{
        value: result.value,
        text: `Dependent result: ${result.value}`,
        sources: [{ book: 'Test Book', page: 2 }],
        keywords: ['dependent']
      }]
    };
  },

  describe() {
    return {
      explanation: { en: 'Depends on stub-core.', ro: 'Depinde de stub-core.' },
      howCalculated: { en: 'Adds 1 to stub-core value.', ro: 'Adaugă 1 la valoarea stub-core.' }
    };
  }
};
