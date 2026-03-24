import { reduceToDigit } from '../../../data/reduce.js';

/**
 * Essence Number — the sum of all active transit values.
 * Reveals the overall theme of the current year of your life.
 */
export default {
  id: 'essence',
  name: { en: 'Essence', ro: 'Esența' },
  category: 'timing',
  systems: ['pythagorean'],
  inputRequires: ['birthdate', 'fullName'],
  dependsOn: ['transits'],
  resultType: 'single',

  calculate(input, system, resolved) {
    const transits = resolved['transits'];
    if (!transits) throw new Error('Missing transits dependency');
    const sum = Object.values(transits.table).reduce((s, v) => s + v, 0);
    return { value: reduceToDigit(sum, true) };
  },

  interpret(result, system) {
    const meanings = {
      1: 'A year of new beginnings and self-assertion at a deep personal level.',
      2: 'A year requiring patience, partnership, and emotional growth.',
      3: 'A year of creative expression and social expansion.',
      4: 'A year of hard work, discipline, and building solid foundations.',
      5: 'A year of change, upheaval, and liberation from old patterns.',
      6: 'A year centered on love, family, and domestic responsibility.',
      7: 'A year of introspection, spiritual development, and inner searching.',
      8: 'A year of material advancement, authority, and practical achievement.',
      9: 'A year of endings, release, and humanitarian awareness.',
      11: 'A year of heightened spiritual awareness and intuitive breakthrough.',
      22: 'A year of extraordinary potential for manifesting vision into reality.',
      33: 'A year of selfless service, healing, and spiritual teaching.',
    };
    const text = meanings[result.value] || `Essence ${result.value}: a unique energy pattern for this year of your life.`;
    return { entries: [{ value: result.value, text, sources: [{ book: 'Complete Guide Vol 2', page: 38 }], keywords: ['essence', 'yearly theme', 'transit sum'] }] };
  },

  describe() {
    return {
      explanation: {
        en: 'The Essence number combines all active transit influences into a single theme for your current year of life. It represents the overall energy you are working with at a deep level, independent of the calendar-based Personal Year.',
        ro: 'Numărul Esenței combină toate influențele de tranzit active într-o singură temă pentru anul curent al vieții tale. Reprezintă energia generală cu care lucrezi la un nivel profund.'
      },
      howCalculated: {
        en: 'Sum the numeric values of all currently active transit letters (Physical + Mental + Spiritual), then reduce to a single digit or master number.',
        ro: 'Se adună valorile numerice ale tuturor literelor de tranzit active (Fizic + Mental + Spiritual), apoi se reduce la o singură cifră sau număr maestru.'
      }
    };
  }
};
