import { reduceToDigit } from '../../../data/reduce.js';

/**
 * Personal Month — monthly influence within the Personal Year.
 */
export default {
  id: 'personal-month',
  name: { en: 'Personal Month', ro: 'Luna Personală' },
  category: 'timing',
  systems: ['pythagorean', 'chaldean'],
  inputRequires: ['birthdate'],
  dependsOn: ['personal-year'],
  resultType: 'single',

  calculate(input, system, resolved) {
    const personalYear = resolved['personal-year'];
    if (!personalYear) throw new Error('Missing personal-year dependency');
    const currentMonth = new Date().getMonth() + 1;
    const sum = personalYear.value + currentMonth;
    return { value: reduceToDigit(sum, false) };
  },

  interpret(result, system) {
    const monthNames = ['', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const currentMonth = monthNames[new Date().getMonth() + 1];
    const meanings = {
      1: 'A month for new beginnings and taking initiative.',
      2: 'A month for patience, cooperation, and attending to details.',
      3: 'A month for creative expression and social enjoyment.',
      4: 'A month for hard work, organization, and practical progress.',
      5: 'A month of change, variety, and new experiences.',
      6: 'A month focused on home, family, and responsibilities.',
      7: 'A month for reflection, study, and inner growth.',
      8: 'A month of achievement, business matters, and recognition.',
      9: 'A month for completion, generosity, and letting go.',
    };
    const text = `${currentMonth} is Personal Month ${result.value}: ${meanings[result.value] || 'A month of mixed energies.'}`;
    return { entries: [{ value: result.value, text, sources: [{ book: 'Complete Guide Vol 2', page: 38 }], keywords: ['monthly cycle', 'timing'] }] };
  },

  describe() {
    return {
      explanation: {
        en: 'The Personal Month adds a monthly layer to your Personal Year, revealing the specific energy of the current month within your annual cycle.',
        ro: 'Luna Personală adaugă un strat lunar Anului Personal, dezvăluind energia specifică a lunii curente în cadrul ciclului tău anual.'
      },
      howCalculated: {
        en: 'Add your Personal Year number to the current calendar month number, then reduce to a single digit.',
        ro: 'Se adună numărul Anului Personal cu numărul lunii calendaristice curente, apoi se reduce la o singură cifră.'
      }
    };
  }
};
