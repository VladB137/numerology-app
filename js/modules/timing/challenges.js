import { reduceToDigit } from '../../../data/reduce.js';

/**
 * Challenges — four life phases showing primary obstacles to overcome.
 */
export default {
  id: 'challenges',
  name: { en: 'Challenges', ro: 'Provocări' },
  category: 'timing',
  systems: ['pythagorean'],
  inputRequires: ['birthdate'],
  dependsOn: ['life-path'],
  resultType: 'multi-cycle',

  calculate(input, system, resolved) {
    const d = input.birthdate;
    const month = reduceToDigit(d.getMonth() + 1, false);
    const day = reduceToDigit(d.getDate(), false);
    const year = reduceToDigit(d.getFullYear(), false);

    const first = Math.abs(month - day);
    const second = Math.abs(day - year);
    const third = Math.abs(first - second);
    const fourth = Math.abs(month - year);

    const lifePath = resolved['life-path'];
    const lpVal = lifePath ? reduceToDigit(lifePath.value, false) : 1;
    const firstEnd = 36 - lpVal;
    const birthYear = d.getFullYear();

    return {
      cycles: [
        { period: `Birth to age ${firstEnd}`, value: first },
        { period: `Age ${firstEnd + 1} to ${firstEnd + 9}`, value: second },
        { period: `Age ${firstEnd + 10} to ${firstEnd + 18}`, value: third },
        { period: `Age ${firstEnd + 19} onward`, value: fourth },
      ]
    };
  },

  interpret(result, system) {
    const meanings = {
      0: 'The challenge of 0 is the "challenge of choice" — all challenges are present and you must choose which to address. This is both the most difficult and most liberating challenge.',
      1: 'Challenge of independence: learning to stand on your own without being domineering or too dependent.',
      2: 'Challenge of sensitivity: learning to balance emotional awareness with resilience and self-assertion.',
      3: 'Challenge of expression: learning to communicate authentically without superficiality or self-doubt.',
      4: 'Challenge of discipline: learning to embrace hard work and order without becoming rigid or resistant to change.',
      5: 'Challenge of freedom: learning to use freedom responsibly without excess or recklessness.',
      6: 'Challenge of responsibility: learning to care for others without becoming controlling or sacrificing your own needs.',
      7: 'Challenge of faith: learning to trust your inner wisdom and develop spiritual understanding without isolation.',
      8: 'Challenge of power: learning to exercise authority and manage resources without materialism or domination.',
    };

    return {
      entries: result.cycles.map((c, i) => ({
        value: c.value,
        text: `Challenge ${i + 1} (${c.period}): ${meanings[c.value] || `Challenge number ${c.value}.`}`,
        sources: [{ book: 'Complete Guide Vol 2', page: 38 }],
        keywords: ['challenge', `phase ${i + 1}`, 'growth']
      }))
    };
  },

  describe() {
    return {
      explanation: {
        en: 'The four Challenges represent the primary obstacles or weaknesses you must overcome in each major life phase. Unlike Pinnacles (which show opportunities), Challenges show where growth is most needed.',
        ro: 'Cele patru Provocări reprezintă obstacolele sau slăbiciunile principale pe care trebuie să le depășești în fiecare fază majoră a vieții. Spre deosebire de Punctele Culminante, Provocările arată unde este cea mai mare nevoie de creștere.'
      },
      howCalculated: {
        en: '1st Challenge: |month - day|. 2nd: |day - year|. 3rd: |1st - 2nd|. 4th: |month - year|. Each value is a single digit (0-8). The timing matches the Pinnacles.',
        ro: '1 Provocare: |luna - ziua|. 2: |ziua - anul|. 3: |1 - 2|. 4: |luna - anul|. Fiecare valoare este o cifră (0-8). Perioadele corespund Punctelor Culminante.'
      }
    };
  }
};
