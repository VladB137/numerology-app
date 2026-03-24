import { reduceToDigit } from '../../../data/reduce.js';
import { letterValue } from '../../../data/letter-values.js';

/**
 * Rational Thought Number — first name + birth day.
 * Reveals thinking style and approach to problem-solving.
 */
export default {
  id: 'rational-thought',
  name: { en: 'Rational Thought', ro: 'Gândirea Rațională' },
  category: 'special',
  systems: ['pythagorean', 'chaldean'],
  inputRequires: ['birthdate', 'fullName'],
  dependsOn: [],
  resultType: 'single',

  calculate(input, system, resolved) {
    const firstName = input.fullName.trim().split(/\s+/)[0];
    let nameSum = 0;
    for (const ch of firstName) {
      nameSum += letterValue(ch, system);
    }
    const day = input.birthdate.getDate();
    const total = reduceToDigit(nameSum, false) + reduceToDigit(day, false);
    return { value: reduceToDigit(total, false) };
  },

  interpret(result, system) {
    const meanings = {
      1: { text: 'You think independently and originally. Your approach to problem-solving is direct and innovative — you prefer to find your own solutions rather than follow established methods.', keywords: ['independent thinking', 'innovation', 'directness'] },
      2: { text: 'Your thinking is intuitive and considerate. You naturally factor in others\' perspectives and seek harmonious solutions that work for everyone involved.', keywords: ['intuitive thinking', 'consideration', 'harmony'] },
      3: { text: 'Your thinking is creative and imaginative. You approach problems with optimism and often find solutions through lateral thinking and creative connections.', keywords: ['creative thinking', 'imagination', 'optimism'] },
      4: { text: 'Your thinking is methodical and practical. You break problems down systematically and build solutions step by step with careful attention to detail.', keywords: ['methodical thinking', 'practicality', 'detail'] },
      5: { text: 'Your thinking is quick, adaptable, and unconventional. You process information rapidly and are comfortable with multiple solutions simultaneously.', keywords: ['quick thinking', 'adaptability', 'unconventionality'] },
      6: { text: 'Your thinking is responsible and community-oriented. You naturally consider the impact of decisions on those around you and seek just, fair solutions.', keywords: ['responsible thinking', 'fairness', 'community'] },
      7: { text: 'Your thinking is analytical and deep. You probe beneath the surface and are not satisfied until you understand the underlying principles at work.', keywords: ['analytical thinking', 'depth', 'understanding'] },
      8: { text: 'Your thinking is strategic and goal-oriented. You naturally assess situations in terms of outcomes, efficiency, and practical results.', keywords: ['strategic thinking', 'efficiency', 'results'] },
      9: { text: 'Your thinking is broad, philosophical, and humanitarian. You see the big picture and consider the wider implications of ideas and actions.', keywords: ['philosophical thinking', 'broad perspective', 'wisdom'] },
    };
    const m = meanings[result.value];
    if (!m) return { entries: [{ value: result.value, text: `Rational Thought ${result.value}.`, sources: [], keywords: [] }] };
    return { entries: [{ value: result.value, text: m.text, sources: [{ book: 'Complete Guide Vol 1', page: 48 }], keywords: m.keywords }] };
  },

  describe() {
    return {
      explanation: {
        en: 'The Rational Thought number reveals your thinking style — how you process information, approach problems, and arrive at conclusions. It blends the energy of your first name with your birthday.',
        ro: 'Numărul Gândirii Raționale dezvăluie stilul tău de gândire — cum procesezi informația, abordezi problemele și ajungi la concluzii.'
      },
      howCalculated: {
        en: 'Sum the letter values of your first name and reduce to a single digit. Add the reduced birth day. Reduce the total to a single digit.',
        ro: 'Se adună valorile literelor prenumelui și se reduce la o cifră. Se adaugă ziua nașterii redusă. Se reduce totalul la o singură cifră.'
      }
    };
  }
};
