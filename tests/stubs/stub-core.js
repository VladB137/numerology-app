/** Stub module for testing — simulates a core module with no dependencies */
export default {
  id: 'stub-core',
  name: { en: 'Stub Core', ro: 'Stub Core' },
  category: 'core',
  systems: ['pythagorean', 'chaldean'],
  inputRequires: ['birthdate'],
  dependsOn: [],
  resultType: 'single',

  calculate(input, system, resolved) {
    // Return a deterministic value based on system
    return { value: system === 'pythagorean' ? 7 : 5 };
  },

  interpret(result, system) {
    return {
      entries: [{
        value: result.value,
        text: `Stub interpretation for ${result.value}`,
        sources: [{ book: 'Test Book', page: 1 }],
        keywords: ['test']
      }]
    };
  },

  describe() {
    return {
      explanation: { en: 'A test module.', ro: 'Un modul de test.' },
      howCalculated: { en: 'Returns a fixed value.', ro: 'Returnează o valoare fixă.' }
    };
  }
};
