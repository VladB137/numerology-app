import { isMasterNumber } from '../../../data/master-numbers.js';

/**
 * Master Numbers overview — identifies which core calculations yielded master numbers.
 */
export default {
  id: 'master-numbers',
  name: { en: 'Master Numbers', ro: 'Numere Maestru' },
  category: 'special',
  systems: ['pythagorean'],
  inputRequires: ['birthdate', 'fullName'],
  dependsOn: ['life-path', 'expression', 'soul-urge', 'personality', 'birthday', 'maturity'],
  resultType: 'list',

  calculate(input, system, resolved) {
    const found = [];
    const checks = ['life-path', 'expression', 'soul-urge', 'personality', 'birthday', 'maturity'];
    for (const id of checks) {
      const r = resolved[id];
      if (r && isMasterNumber(r.value)) {
        found.push(r.value);
      }
    }
    return { values: [...new Set(found)].sort((a, b) => a - b) };
  },

  interpret(result, system) {
    if (result.values.length === 0) {
      return { entries: [{ value: 0, text: 'No master numbers appear in your core calculations. This is perfectly normal — most people do not have master numbers. Your single-digit numbers carry their own full power and significance.', sources: [{ book: 'Complete Guide Vol 1', page: 48 }], keywords: ['no master numbers'] }] };
    }

    const desc = {
      11: { text: 'Master Number 11 — the Master Intuitive. You carry heightened spiritual sensitivity, visionary gifts, and the ability to inspire others through intuition and idealism. The 11 amplifies the qualities of 2 (cooperation, sensitivity) to a spiritual level. The challenge is managing nervous tension and the gap between vision and reality.', keywords: ['intuition', 'vision', 'spiritual sensitivity', 'inspiration'] },
      22: { text: 'Master Number 22 — the Master Builder. You possess the rare ability to manifest grand visions into practical reality. The 22 amplifies the qualities of 4 (discipline, structure) to an extraordinary scale. You can build institutions, movements, and legacies. The challenge is the immense pressure and potential for self-doubt.', keywords: ['master builder', 'practical vision', 'legacy', 'discipline'] },
      33: { text: 'Master Number 33 — the Master Teacher. You carry the highest expression of nurturing, healing, and selfless service. The 33 amplifies the qualities of 6 (love, responsibility) to a universal level. Your very presence can be transformative. This is the rarest and most demanding master number.', keywords: ['master teacher', 'healing', 'selfless service', 'transformation'] },
    };

    return {
      entries: result.values.map(v => ({
        value: v,
        text: desc[v]?.text || `Master Number ${v} is present in your chart.`,
        sources: [{ book: 'Complete Guide Vol 1', page: 48 }, { book: 'Phillips — Complete Book of Numerology', page: 16 }],
        keywords: desc[v]?.keywords || ['master number']
      }))
    };
  },

  describe() {
    return {
      explanation: {
        en: 'Master Numbers (11, 22, 33) represent heightened spiritual potential. This module identifies which of your core calculations contain master numbers and explains their elevated significance in your chart.',
        ro: 'Numerele Maestru (11, 22, 33) reprezintă potențial spiritual amplificat. Acest modul identifică care dintre calculele tale de bază conțin numere maestru și explică semnificația lor elevată.'
      },
      howCalculated: {
        en: 'Reviews all core calculations (Life Path, Expression, Soul Urge, Personality, Birthday, Maturity) and identifies any that resulted in 11, 22, or 33.',
        ro: 'Se revizuiesc toate calculele de bază (Calea Vieții, Expresia, Dorința Sufletului, Personalitatea, Ziua Nașterii, Maturitatea) și se identifică cele care au rezultat în 11, 22 sau 33.'
      }
    };
  }
};
