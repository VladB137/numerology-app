import { letterValue } from '../../../data/letter-values.js';

/**
 * Transits — letter-by-letter influence from each part of the name.
 * Shows Physical (first name), Mental (middle), Spiritual (last) transits for current age.
 */
export default {
  id: 'transits',
  name: { en: 'Transits', ro: 'Tranzite' },
  category: 'timing',
  systems: ['pythagorean'],
  inputRequires: ['birthdate', 'fullName'],
  dependsOn: [],
  resultType: 'table',

  calculate(input, system, resolved) {
    const parts = input.fullName.trim().split(/\s+/);
    const age = Math.floor((Date.now() - input.birthdate.getTime()) / (365.25 * 24 * 60 * 60 * 1000));

    function getTransitLetter(namePart, currentAge) {
      // Each letter rules for a number of years equal to its numeric value
      let yearsCovered = 0;
      let cycleAge = currentAge;
      // May need multiple passes through the name
      while (true) {
        for (const ch of namePart) {
          const duration = letterValue(ch, system);
          yearsCovered += duration;
          if (yearsCovered > cycleAge) {
            return { letter: ch, value: duration };
          }
        }
        cycleAge -= yearsCovered;
        yearsCovered = 0;
      }
    }

    const physical = parts[0] ? getTransitLetter(parts[0], age) : null;
    const mental = parts.length > 2 ? getTransitLetter(parts[1], age) : (parts[1] ? getTransitLetter(parts[1], age) : null);
    const spiritual = parts[parts.length - 1] && parts.length > 1 ? getTransitLetter(parts[parts.length - 1], age) : null;

    const table = {};
    if (physical) table[`Physical (${physical.letter})`] = physical.value;
    if (mental) table[`Mental (${mental.letter})`] = mental.value;
    if (spiritual) table[`Spiritual (${spiritual.letter})`] = spiritual.value;

    return { table };
  },

  interpret(result, system) {
    const entries = Object.entries(result.table).map(([plane, value]) => ({
      value,
      text: `${plane}: Transit letter with value ${value} is active. This influences your ${plane.split(' ')[0].toLowerCase()} experiences during this period.`,
      sources: [{ book: 'Complete Guide Vol 2', page: 38 }],
      keywords: ['transit', plane.split(' ')[0].toLowerCase(), 'timing']
    }));
    if (entries.length === 0) {
      entries.push({ value: 0, text: 'Transit information requires a multi-part name.', sources: [], keywords: ['transit'] });
    }
    return { entries };
  },

  describe() {
    return {
      explanation: {
        en: 'Transits track which letter of each name part is currently active. Each letter rules for a number of years equal to its numeric value. The first name governs Physical transits, middle name Mental, and last name Spiritual.',
        ro: 'Tranzitele urmăresc ce literă din fiecare parte a numelui este activă în prezent. Fiecare literă guvernează un număr de ani egal cu valoarea ei numerică.'
      },
      howCalculated: {
        en: 'Starting from birth, each letter of each name part "rules" for a number of years equal to its numeric value. When the name is exhausted, it cycles back to the beginning. Your current age determines which letter is active.',
        ro: 'Începând de la naștere, fiecare literă a fiecărei părți a numelui "guvernează" un număr de ani egal cu valoarea ei numerică. Când numele se termină, ciclul reîncepe.'
      }
    };
  }
};
