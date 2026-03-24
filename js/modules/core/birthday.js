import { reduceToDigit } from '../../../data/reduce.js';

/**
 * Birthday Number — derived from the day of birth only.
 * Reveals a special talent or gift that supports the Life Path.
 */
export default {
  id: 'birthday',
  name: { en: 'Birthday', ro: 'Ziua Nașterii' },
  category: 'core',
  systems: ['pythagorean', 'chaldean'],
  inputRequires: ['birthdate'],
  dependsOn: [],
  resultType: 'single',

  calculate(input, system, resolved) {
    const day = input.birthdate.getDate();
    return { value: reduceToDigit(day, true) };
  },

  interpret(result, system) {
    const meanings = {
      1: {
        text: 'Born on a day that reduces to 1, you carry the gift of initiative and original thinking. You are a natural self-starter with the courage to act independently. This talent for pioneering supports you throughout life, enabling you to create opportunities where others see only obstacles.',
        sources: [{ book: 'Phillips — Complete Book of Numerology', page: 21 }, { book: 'Complete Guide Vol 1', page: 61 }],
        keywords: ['initiative', 'originality', 'self-starting', 'courage']
      },
      2: {
        text: 'Your birthday gift is the ability to cooperate, mediate, and bring people together. You possess an intuitive sensitivity that makes you a natural peacemaker. This talent for understanding others\' emotional needs serves you well in partnerships, teamwork, and any situation requiring tact.',
        sources: [{ book: 'Phillips — Complete Book of Numerology', page: 69 }, { book: 'Complete Guide Vol 1', page: 61 }],
        keywords: ['cooperation', 'mediation', 'sensitivity', 'tact']
      },
      3: {
        text: 'Your birthday bestows a gift for creative expression and social connection. You communicate with natural charm and can uplift any room you enter. This talent for words, art, or performance is a reliable asset throughout your life, opening doors through the sheer force of your personality.',
        sources: [{ book: 'Phillips — Complete Book of Numerology', page: 71 }, { book: 'Complete Guide Vol 1', page: 61 }],
        keywords: ['creative expression', 'charm', 'communication', 'social grace']
      },
      4: {
        text: 'Your birthday gift is practical ability and organizational skill. You have a natural talent for bringing order to chaos, building systems, and managing details that others overlook. This methodical strength makes you indispensable in any endeavor requiring discipline and follow-through.',
        sources: [{ book: 'Phillips — Complete Book of Numerology', page: 74 }, { book: 'Complete Guide Vol 1', page: 61 }],
        keywords: ['practicality', 'organization', 'discipline', 'method']
      },
      5: {
        text: 'Your birthday bestows versatility and an ability to adapt to change. You have a natural talent for turning unexpected situations into opportunities. Quick thinking, resourcefulness, and an openness to new experience are gifts that keep your life dynamic and your options open.',
        sources: [{ book: 'Phillips — Complete Book of Numerology', page: 76 }, { book: 'Complete Guide Vol 1', page: 61 }],
        keywords: ['versatility', 'adaptability', 'resourcefulness', 'quick thinking']
      },
      6: {
        text: 'Your birthday gift is a deep capacity for love, responsibility, and creative nurturing. You have a natural talent for creating harmony in your environment and caring for those around you. This ability to nurture — whether people, projects, or artistic visions — is your most reliable strength.',
        sources: [{ book: 'Phillips — Complete Book of Numerology', page: 78 }, { book: 'Complete Guide Vol 1', page: 61 }],
        keywords: ['love', 'nurturing', 'responsibility', 'harmony']
      },
      7: {
        text: 'Your birthday bestows analytical ability and a gift for deep thinking. You naturally see beneath the surface of things and are drawn to investigating, researching, and contemplating. This talent for analysis and inner wisdom serves you in any field that rewards thoroughness and insight.',
        sources: [{ book: 'Phillips — Complete Book of Numerology', page: 81 }, { book: 'Complete Guide Vol 1', page: 61 }],
        keywords: ['analysis', 'deep thinking', 'insight', 'research']
      },
      8: {
        text: 'Your birthday gift is executive ability and a natural understanding of power and material resources. You have a talent for management, business, and organizing people and projects for maximum results. This strength positions you well for leadership roles and financial success.',
        sources: [{ book: 'Phillips — Complete Book of Numerology', page: 82 }, { book: 'Complete Guide Vol 1', page: 61 }],
        keywords: ['executive ability', 'management', 'leadership', 'material skill']
      },
      9: {
        text: 'Your birthday bestows a humanitarian spirit and broad compassion. You have a natural talent for inspiring others and seeing the larger picture. Generosity, tolerance, and an instinct for what serves the greater good are gifts that deepen with age and experience.',
        sources: [{ book: 'Phillips — Complete Book of Numerology', page: 85 }, { book: 'Complete Guide Vol 1', page: 61 }],
        keywords: ['humanitarianism', 'compassion', 'inspiration', 'broad vision']
      },
      11: {
        text: 'Born on the 11th or 29th, you carry the master intuitive gift. Your sensitivity and spiritual awareness are heightened beyond the ordinary. You may experience intuitive flashes, a deep empathy that borders on psychic, and a calling to inspire others through your insights.',
        sources: [{ book: 'Complete Guide Vol 1', page: 61 }],
        keywords: ['master intuition', 'spiritual awareness', 'empathy', 'inspiration']
      },
      22: {
        text: 'Born on the 22nd, you carry the master builder gift. You possess an extraordinary ability to envision large-scale projects and bring them to fruition through disciplined, practical effort. This is one of the most powerful birthday numbers, conferring both vision and the stamina to realize it.',
        sources: [{ book: 'Complete Guide Vol 1', page: 61 }],
        keywords: ['master builder', 'vision', 'large-scale ability', 'discipline']
      }
    };

    const m = meanings[result.value];
    if (!m) {
      return { entries: [{ value: result.value, text: `No specific birthday interpretation for ${result.value}.`, sources: [], keywords: [] }] };
    }
    return { entries: [{ value: result.value, text: m.text, sources: m.sources, keywords: m.keywords }] };
  },

  describe() {
    return {
      explanation: {
        en: 'The Birthday number is simply the day of the month you were born, reduced to a single digit or master number. It reveals a special talent or gift — a focused ability that supports your broader Life Path throughout your lifetime.',
        ro: 'Numărul Zilei de Naștere este pur și simplu ziua din lună în care te-ai născut, redusă la o singură cifră sau număr maestru. Dezvăluie un talent special sau un dar — o abilitate concentrată care îți susține Calea Vieții pe tot parcursul vieții.'
      },
      howCalculated: {
        en: 'Take the day of birth and reduce to a single digit. Master numbers (11, 22) are preserved. For example, born on the 29th: 2+9=11 (master number, preserved). Born on the 16th: 1+6=7. Note: 33 cannot occur as a birthday number (max day is 31).',
        ro: 'Se ia ziua nașterii și se reduce la o singură cifră. Numerele maestru (11, 22) se păstrează. De exemplu, născut pe 29: 2+9=11 (număr maestru, păstrat). Născut pe 16: 1+6=7. Notă: 33 nu poate apărea ca număr al zilei (ziua maximă este 31).'
      }
    };
  }
};
