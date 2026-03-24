/** Stub module that always throws — for testing error handling */
export default {
  id: 'stub-error',
  name: { en: 'Stub Error', ro: 'Stub Error' },
  category: 'core',
  systems: ['pythagorean'],
  inputRequires: ['birthdate'],
  dependsOn: [],
  resultType: 'single',

  calculate(input, system, resolved) {
    throw new Error('Intentional test error');
  },

  interpret(result, system) {
    return { entries: [] };
  },

  describe() {
    return {
      explanation: { en: 'Always errors.', ro: 'Mereu eroare.' },
      howCalculated: { en: 'Throws.', ro: 'Aruncă.' }
    };
  }
};
