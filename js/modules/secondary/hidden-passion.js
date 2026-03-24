import { letterValue } from '../../../data/letter-values.js';

/**
 * Hidden Passion — the most frequently occurring number in the name.
 * Reveals the dominant drive or passion.
 */
export default {
  id: 'hidden-passion',
  name: { en: 'Hidden Passion', ro: 'Pasiunea Ascunsă' },
  category: 'secondary',
  systems: ['pythagorean', 'chaldean'],
  inputRequires: ['fullName'],
  dependsOn: [],
  resultType: 'list',

  calculate(input, system, resolved) {
    const freq = {};
    for (const ch of input.fullName) {
      if (ch === ' ') continue;
      const v = letterValue(ch, system);
      freq[v] = (freq[v] || 0) + 1;
    }
    const maxFreq = Math.max(...Object.values(freq));
    const passions = Object.entries(freq)
      .filter(([, f]) => f === maxFreq)
      .map(([v]) => parseInt(v, 10))
      .sort((a, b) => a - b);
    return { values: passions };
  },

  interpret(result, system) {
    const meanings = {
      1: { text: 'Your hidden passion is a powerful drive toward independence, leadership, and originality. You are most energized when pioneering new ideas or taking charge.', keywords: ['leadership', 'independence', 'originality'] },
      2: { text: 'Your hidden passion is a deep need for partnership, harmony, and emotional connection. You are most alive in collaborative relationships.', keywords: ['partnership', 'harmony', 'connection'] },
      3: { text: 'Your hidden passion is creative expression. You have an intense drive to communicate, create, and bring joy to others through art, words, or performance.', keywords: ['creativity', 'expression', 'joy'] },
      4: { text: 'Your hidden passion is building and organizing. You feel most fulfilled when creating order, structure, and tangible results through disciplined effort.', keywords: ['building', 'structure', 'discipline'] },
      5: { text: 'Your hidden passion is freedom and sensory experience. You are driven by an intense need for variety, adventure, and the exploration of new horizons.', keywords: ['freedom', 'adventure', 'variety'] },
      6: { text: 'Your hidden passion is nurturing and responsibility. You are driven by a deep need to care for others, create beauty, and maintain harmonious relationships.', keywords: ['nurturing', 'beauty', 'responsibility'] },
      7: { text: 'Your hidden passion is the search for truth and understanding. You are driven by an insatiable curiosity about the deeper nature of reality.', keywords: ['truth', 'understanding', 'analysis'] },
      8: { text: 'Your hidden passion is achievement and material mastery. You are driven by a powerful need to succeed, manage resources, and exercise authority.', keywords: ['achievement', 'authority', 'mastery'] },
      9: { text: 'Your hidden passion is humanitarian service. You are driven by a deep compassion and a desire to make the world a better, more tolerant place.', keywords: ['humanitarianism', 'compassion', 'service'] },
    };

    return {
      entries: result.values.map(v => ({
        value: v,
        text: meanings[v]?.text || `Hidden Passion ${v}.`,
        sources: [{ book: 'Complete Guide Vol 1', page: 48 }, { book: 'Phillips — Complete Book of Numerology', page: 30 }],
        keywords: meanings[v]?.keywords || []
      }))
    };
  },

  describe() {
    return {
      explanation: {
        en: 'The Hidden Passion reveals your dominant inner drive — the number that appears most frequently in your name. When multiple numbers tie for the highest frequency, you have multiple hidden passions competing for expression.',
        ro: 'Pasiunea Ascunsă dezvăluie impulsul tău interior dominant — numărul care apare cel mai frecvent în numele tău. Când mai multe numere au aceeași frecvență maximă, ai mai multe pasiuni ascunse care concurează pentru expresie.'
      },
      howCalculated: {
        en: 'Convert each letter of your full birth name to its number value and count the frequency of each number (1-9). The number(s) with the highest frequency is your Hidden Passion.',
        ro: 'Se convertește fiecare literă a numelui complet în valoarea ei numerică și se numără frecvența fiecărui număr (1-9). Numărul cu frecvența cea mai mare este Pasiunea Ascunsă.'
      }
    };
  }
};
