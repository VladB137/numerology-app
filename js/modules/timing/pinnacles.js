import { reduceToDigit } from '../../../data/reduce.js';

/**
 * Pinnacles — four major life phases with distinct themes.
 */
export default {
  id: 'pinnacles',
  name: { en: 'Pinnacles', ro: 'Puncte Culminante' },
  category: 'timing',
  systems: ['pythagorean'],
  inputRequires: ['birthdate'],
  dependsOn: ['life-path'],
  resultType: 'multi-cycle',

  calculate(input, system, resolved) {
    const d = input.birthdate;
    const month = reduceToDigit(d.getMonth() + 1, true);
    const day = reduceToDigit(d.getDate(), true);
    const year = reduceToDigit(d.getFullYear(), true);

    const lifePath = resolved['life-path'];
    const lpVal = lifePath ? lifePath.value : reduceToDigit(month + day + year, true);

    // First Pinnacle ends at age 36 - Life Path
    const firstEnd = 36 - reduceToDigit(lpVal, false);
    const birthYear = d.getFullYear();

    const cycles = [
      { period: `Birth to age ${firstEnd} (${birthYear}-${birthYear + firstEnd})`, value: reduceToDigit(month + day, true) },
      { period: `Age ${firstEnd + 1} to ${firstEnd + 9} (${birthYear + firstEnd + 1}-${birthYear + firstEnd + 9})`, value: reduceToDigit(day + year, true) },
      { period: `Age ${firstEnd + 10} to ${firstEnd + 18} (${birthYear + firstEnd + 10}-${birthYear + firstEnd + 18})`, value: reduceToDigit(month + day + day + year, true) },
      { period: `Age ${firstEnd + 19} onward (${birthYear + firstEnd + 19}+)`, value: reduceToDigit(month + year, true) },
    ];

    return { cycles };
  },

  interpret(result, system) {
    const meanings = {
      1: 'Independence, leadership, and new directions.',
      2: 'Cooperation, patience, and emotional growth.',
      3: 'Creative expression, social expansion, and joy.',
      4: 'Hard work, building foundations, and discipline.',
      5: 'Change, freedom, and new opportunities.',
      6: 'Family responsibility, love, and domestic harmony.',
      7: 'Spiritual development, study, and inner wisdom.',
      8: 'Material achievement, authority, and recognition.',
      9: 'Completion, humanitarianism, and selfless service.',
      11: 'Spiritual illumination, intuition, and inspiration.',
      22: 'Master building, large-scale achievement, and practical vision.',
      33: 'Master teaching, selfless service, and spiritual healing.',
    };

    return {
      entries: result.cycles.map((c, i) => ({
        value: c.value,
        text: `Pinnacle ${i + 1} (${c.period}): Number ${c.value} — ${meanings[c.value] || 'Unique energy for this phase.'}`,
        sources: [{ book: 'Complete Guide Vol 2', page: 38 }],
        keywords: ['pinnacle', `phase ${i + 1}`, 'life cycle']
      }))
    };
  },

  describe() {
    return {
      explanation: {
        en: 'The four Pinnacles represent major life phases, each with its own theme and energy. They describe the broad direction and opportunities available during each period. The first Pinnacle covers youth, and the fourth extends to the end of life.',
        ro: 'Cele patru Puncte Culminante reprezintă fazele majore ale vieții, fiecare cu tema și energia sa. Descriu direcția generală și oportunitățile disponibile în fiecare perioadă.'
      },
      howCalculated: {
        en: '1st Pinnacle: month + day. 2nd: day + year. 3rd: 1st + 2nd Pinnacle. 4th: month + year. All reduced to single digit or master number. The first Pinnacle ends at age (36 minus Life Path).',
        ro: '1 Punct: luna + ziua. 2: ziua + anul. 3: Punct 1 + Punct 2. 4: luna + anul. Toate reduse la cifră sau număr maestru. Primul punct se încheie la vârsta (36 minus Calea Vieții).'
      }
    };
  }
};
