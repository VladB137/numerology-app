import { reduceToDigit } from '../../../data/reduce.js';

/**
 * Personal Year — theme of the current year.
 * Derived from birth month + birth day + current year.
 */
export default {
  id: 'personal-year',
  name: { en: 'Personal Year', ro: 'Anul Personal' },
  category: 'timing',
  systems: ['pythagorean', 'chaldean'],
  inputRequires: ['birthdate'],
  dependsOn: [],
  resultType: 'single',

  calculate(input, system, resolved) {
    const d = input.birthdate;
    const month = d.getMonth() + 1;
    const day = d.getDate();
    const currentYear = new Date().getFullYear();
    const sum = reduceToDigit(month, false) + reduceToDigit(day, false) + reduceToDigit(currentYear, false);
    return { value: reduceToDigit(sum, true) };
  },

  interpret(result, system) {
    const currentYear = new Date().getFullYear();
    const meanings = {
      1: { text: `${currentYear} is a Personal Year 1 for you — a year of new beginnings, fresh starts, and planting seeds. Take initiative, start projects, and assert your independence. This is the start of a new 9-year cycle.`, keywords: ['new beginnings', 'initiative', 'fresh start'] },
      2: { text: `${currentYear} is a Personal Year 2 — a year of patience, cooperation, and developing relationships. Partnerships deepen and details matter. Allow things planted last year to grow; avoid forcing results.`, keywords: ['patience', 'cooperation', 'relationships'] },
      3: { text: `${currentYear} is a Personal Year 3 — a year of creative expression, social activity, and joy. Your creative energy peaks; express yourself through art, writing, or social gatherings. Enjoy life but avoid scattering energy.`, keywords: ['creativity', 'expression', 'social joy'] },
      4: { text: `${currentYear} is a Personal Year 4 — a year of hard work, discipline, and building foundations. Focus on practical matters, organize your affairs, and lay solid groundwork. Effort invested now pays off later.`, keywords: ['hard work', 'discipline', 'foundation'] },
      5: { text: `${currentYear} is a Personal Year 5 — a year of change, freedom, and unexpected opportunities. Embrace variety and new experiences. Travel, new relationships, and career shifts are all possible. Stay flexible.`, keywords: ['change', 'freedom', 'opportunity'] },
      6: { text: `${currentYear} is a Personal Year 6 — a year focused on home, family, and responsibility. Relationships require attention and commitment. Your nurturing qualities are called upon. Beautify your environment.`, keywords: ['family', 'responsibility', 'home'] },
      7: { text: `${currentYear} is a Personal Year 7 — a year of reflection, analysis, and spiritual growth. Step back from the busy world and look inward. Study, meditate, and deepen your understanding. Solitude is productive.`, keywords: ['reflection', 'spiritual growth', 'analysis'] },
      8: { text: `${currentYear} is a Personal Year 8 — a year of achievement, recognition, and material reward. Business and financial matters take center stage. Exercise your authority wisely and reap what you have sown.`, keywords: ['achievement', 'recognition', 'reward'] },
      9: { text: `${currentYear} is a Personal Year 9 — a year of completion, letting go, and humanitarian concerns. Release what no longer serves you. Endings make room for the new cycle beginning next year.`, keywords: ['completion', 'letting go', 'endings'] },
      11: { text: `${currentYear} is a master Personal Year 11 — a year of heightened intuition, spiritual insight, and inspiration. Pay attention to dreams and inner guidance. You may feel called to a higher purpose.`, keywords: ['intuition', 'spiritual insight', 'inspiration'] },
      22: { text: `${currentYear} is a master Personal Year 22 — a year of extraordinary potential for large-scale achievement. Your practical vision can manifest great things if you maintain discipline and stay grounded.`, keywords: ['master builder', 'large-scale achievement', 'vision'] },
    };
    const m = meanings[result.value];
    if (!m) return { entries: [{ value: result.value, text: `Personal Year ${result.value}.`, sources: [], keywords: [] }] };
    return { entries: [{ value: result.value, text: m.text, sources: [{ book: 'Complete Guide Vol 2', page: 38 }], keywords: m.keywords }] };
  },

  describe() {
    return {
      explanation: {
        en: 'The Personal Year number reveals the theme and energy of your current year. It runs in 9-year cycles, each year building on the previous. Understanding your Personal Year helps you align your actions with the prevailing energy.',
        ro: 'Numărul Anului Personal dezvăluie tema și energia anului curent. Funcționează în cicluri de 9 ani, fiecare an construind pe cel anterior.'
      },
      howCalculated: {
        en: 'Add your birth month + birth day + current calendar year, reducing each to a single digit first, then reduce the total.',
        ro: 'Se adună luna nașterii + ziua nașterii + anul calendaristic curent, reducând fiecare la o singură cifră, apoi se reduce totalul.'
      }
    };
  }
};
