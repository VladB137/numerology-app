import { letterValue } from '../../../data/letter-values.js';

/**
 * Inclusion Chart — frequency of each number (1-9) in the name.
 * A complete intensity profile of all numeric energies.
 */
export default {
  id: 'inclusion-chart',
  name: { en: 'Inclusion Chart', ro: 'Tabelul de Incluziune' },
  category: 'name',
  systems: ['pythagorean', 'chaldean'],
  inputRequires: ['fullName'],
  dependsOn: [],
  resultType: 'table',

  calculate(input, system, resolved) {
    const freq = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 };
    for (const ch of input.fullName) {
      if (ch === ' ') continue;
      const v = letterValue(ch, system);
      freq[v]++;
    }
    return { table: freq };
  },

  interpret(result, system) {
    const avgDesc = {
      1: { avg: 3, meaning: 'individuality and leadership' },
      2: { avg: 1, meaning: 'cooperation and sensitivity' },
      3: { avg: 1, meaning: 'expression and creativity' },
      4: { avg: 1, meaning: 'practicality and discipline' },
      5: { avg: 3, meaning: 'freedom and change' },
      6: { avg: 1, meaning: 'responsibility and nurturing' },
      7: { avg: 1, meaning: 'analysis and spirituality' },
      8: { avg: 1, meaning: 'authority and achievement' },
      9: { avg: 2, meaning: 'humanitarianism and compassion' },
    };

    const entries = [];
    for (const [num, count] of Object.entries(result.table)) {
      const info = avgDesc[num];
      let intensity;
      if (count === 0) intensity = 'absent (karmic lesson)';
      else if (count <= info.avg) intensity = 'average';
      else intensity = 'intensified';

      if (count === 0 || count > info.avg + 1) {
        entries.push({
          value: parseInt(num, 10),
          text: `Number ${num} (${info.meaning}): ${count} occurrences — ${intensity}. ${count === 0 ? 'This is an area requiring conscious development.' : 'This is a particularly strong influence in your character.'}`,
          sources: [{ book: 'Complete Guide Vol 1', page: 48 }],
          keywords: [intensity, info.meaning.split(' and ')[0]]
        });
      }
    }

    if (entries.length === 0) {
      entries.push({
        value: 0,
        text: 'Your inclusion chart shows a balanced distribution of numeric energies. No extreme intensifications or absences are present.',
        sources: [{ book: 'Complete Guide Vol 1', page: 48 }],
        keywords: ['balance', 'distribution']
      });
    }

    return { entries };
  },

  describe() {
    return {
      explanation: {
        en: 'The Inclusion Chart (also called the Intensity Table) counts how many times each number (1-9) appears in your name. Numbers with high frequency indicate intense energies; absent numbers are Karmic Lessons.',
        ro: 'Tabelul de Incluziune (numit și Tabelul de Intensitate) numără de câte ori apare fiecare număr (1-9) în numele tău. Numerele cu frecvență mare indică energii intense; numerele absente sunt Lecții Karmice.'
      },
      howCalculated: {
        en: 'Convert every letter in your full birth name to its number value and count the frequency of each number from 1 to 9.',
        ro: 'Se convertește fiecare literă din numele complet în valoarea ei numerică și se numără frecvența fiecărui număr de la 1 la 9.'
      }
    };
  }
};
