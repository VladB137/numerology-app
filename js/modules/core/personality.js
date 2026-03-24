import { reduceToDigit } from '../../../data/reduce.js';
import { letterValue, VOWELS } from '../../../data/letter-values.js';

/**
 * Personality Number — derived from the consonants in the full birth name.
 * Reveals how others perceive you — the outer you, the first impression.
 */
export default {
  id: 'personality',
  name: { en: 'Personality', ro: 'Personalitatea' },
  category: 'core',
  systems: ['pythagorean', 'chaldean'],
  inputRequires: ['fullName'],
  dependsOn: [],
  resultType: 'single',

  calculate(input, system, resolved) {
    const name = input.fullName;
    let total = 0;
    for (const ch of name) {
      if (ch === ' ') continue;
      if (!VOWELS.has(ch)) {
        total += letterValue(ch, system);
      }
    }
    return { value: reduceToDigit(total, true) };
  },

  interpret(result, system) {
    const meanings = {
      1: {
        text: 'Others see you as a strong, confident individual who exudes independence and self-assurance. You project an image of someone who knows where they are going and is not afraid to go there alone. First impressions convey decisiveness and pioneering energy. Be aware that this can sometimes come across as intimidating or aloof.',
        sources: [{ book: 'Phillips — Complete Book of Numerology', page: 21 }, { book: 'Complete Guide Vol 1', page: 48 }],
        keywords: ['confidence', 'independence', 'strength', 'decisiveness']
      },
      2: {
        text: 'Others perceive you as gentle, approachable, and warmly supportive. You project an image of cooperation and diplomacy that puts people at ease. People sense that you are a good listener and a trustworthy confidant. The risk is that others may underestimate your strength or take advantage of your accommodating nature.',
        sources: [{ book: 'Phillips — Complete Book of Numerology', page: 69 }, { book: 'Complete Guide Vol 1', page: 48 }],
        keywords: ['gentleness', 'approachability', 'diplomacy', 'trustworthiness']
      },
      3: {
        text: 'Others see you as charming, expressive, and socially magnetic. You project warmth, humor, and creative flair that draws people to you. Your appearance and manner tend toward the colorful and distinctive. People enjoy your company because you make social interaction feel effortless and fun.',
        sources: [{ book: 'Phillips — Complete Book of Numerology', page: 71 }, { book: 'Complete Guide Vol 1', page: 260 }],
        keywords: ['charm', 'expressiveness', 'humor', 'social magnetism']
      },
      4: {
        text: 'Others perceive you as reliable, disciplined, and solidly grounded. You project an image of someone who can be counted on — no drama, no surprises, just steady competence. Your appearance tends toward the practical and well-organized. People trust you instinctively with important responsibilities.',
        sources: [{ book: 'Phillips — Complete Book of Numerology', page: 74 }, { book: 'Complete Guide Vol 1', page: 48 }],
        keywords: ['reliability', 'discipline', 'groundedness', 'trustworthiness']
      },
      5: {
        text: 'Others see you as exciting, dynamic, and full of life. You project an adventurous spirit and a love of freedom that makes you fascinating to be around. Your style tends toward the unconventional and your energy is infectious. People are drawn to your enthusiasm but may wonder if you will stick around.',
        sources: [{ book: 'Phillips — Complete Book of Numerology', page: 76 }, { book: 'Complete Guide Vol 1', page: 48 }],
        keywords: ['dynamism', 'excitement', 'freedom', 'unconventionality']
      },
      6: {
        text: 'Others perceive you as nurturing, responsible, and warm. You project an image of domestic harmony and creative taste. People sense that you are someone who cares deeply about family and community. Your appearance often reflects an appreciation for beauty and comfort. Others may lean on you more than you realize.',
        sources: [{ book: 'Phillips — Complete Book of Numerology', page: 78 }, { book: 'Complete Guide Vol 1', page: 48 }],
        keywords: ['nurturing', 'warmth', 'responsibility', 'taste']
      },
      7: {
        text: 'Others see you as thoughtful, reserved, and somewhat mysterious. You project an air of intellectual depth and quiet dignity. People sense that there is much going on beneath the surface, which both attracts and intrigues them. You do not reveal yourself easily, which can make you seem distant but also fascinatingly enigmatic.',
        sources: [{ book: 'Phillips — Complete Book of Numerology', page: 81 }, { book: 'Complete Guide Vol 1', page: 48 }],
        keywords: ['thoughtfulness', 'reserve', 'mystery', 'intellectual depth']
      },
      8: {
        text: 'Others perceive you as authoritative, successful, and naturally commanding. You project an image of material competence and professional achievement. Your bearing conveys confidence and people expect you to take charge. This can work in your favor in business settings but may intimidate in more casual environments.',
        sources: [{ book: 'Phillips — Complete Book of Numerology', page: 82 }, { book: 'Complete Guide Vol 1', page: 48 }],
        keywords: ['authority', 'success', 'command', 'professionalism']
      },
      9: {
        text: 'Others see you as compassionate, worldly, and sophisticated. You project an image of tolerance and broad-mindedness that transcends cultural and social boundaries. People sense your generosity of spirit and are drawn to your warmth. You appear to have experienced much and judged little.',
        sources: [{ book: 'Phillips — Complete Book of Numerology', page: 85 }, { book: 'Complete Guide Vol 1', page: 48 }],
        keywords: ['compassion', 'sophistication', 'tolerance', 'worldliness']
      },
      11: {
        text: 'Others perceive you as unusually intuitive, inspiring, and spiritually aware. Your presence carries an otherworldly quality that people find compelling. You project an image of heightened sensitivity and vision that sets you apart. This magnetic quality can attract followers but also unsolicited emotional demands.',
        sources: [{ book: 'Complete Guide Vol 1', page: 48 }],
        keywords: ['intuition', 'inspiration', 'spiritual awareness', 'magnetism']
      },
      22: {
        text: 'Others see you as exceptionally capable, with the bearing of someone destined for significant achievement. You project practical authority on a grand scale. People instinctively recognize your potential for transformative work and may place enormous expectations on you.',
        sources: [{ book: 'Complete Guide Vol 1', page: 102 }],
        keywords: ['capability', 'grand authority', 'achievement', 'transformation']
      },
      33: {
        text: 'Others perceive you as selflessly devoted and profoundly caring. You project an aura of spiritual nurturing that draws those in need of guidance. Your presence is healing, and people sense your willingness to give without expectation of return.',
        sources: [{ book: 'Complete Guide Vol 1', page: 48 }],
        keywords: ['devotion', 'spiritual nurturing', 'healing presence', 'selflessness']
      }
    };

    const m = meanings[result.value];
    if (!m) {
      return { entries: [{ value: result.value, text: `No interpretation available for Personality ${result.value}.`, sources: [], keywords: [] }] };
    }
    return { entries: [{ value: result.value, text: m.text, sources: m.sources, keywords: m.keywords }] };
  },

  describe() {
    return {
      explanation: {
        en: 'The Personality number is derived from the consonants in your full birth name. It represents your outer self — the face you show the world, the first impression others have of you. It acts as a filter for who and what you allow into your inner world.',
        ro: 'Numărul Personalității se calculează din consoanele numelui complet de la naștere. Reprezintă eul tău exterior — fața pe care o arăți lumii, prima impresie pe care o au ceilalți despre tine. Acționează ca un filtru pentru ce și pe cine lași în lumea ta interioară.'
      },
      howCalculated: {
        en: 'Sum the numeric values of only the CONSONANTS in your full birth name (everything except A, E, I, O, U), then reduce to a single digit or master number.',
        ro: 'Se adună valorile numerice ale CONSOANELOR din numele complet de la naștere (toate literele exceptând A, E, I, O, U), apoi se reduce la o singură cifră sau un număr maestru.'
      }
    };
  }
};
