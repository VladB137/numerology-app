import { reduceToDigit } from '../../../data/reduce.js';

/**
 * Maturity Number — Life Path + Expression, reduced.
 * Reveals who you become in the second half of life (typically after age 45).
 */
export default {
  id: 'maturity',
  name: { en: 'Maturity', ro: 'Maturitatea' },
  category: 'core',
  systems: ['pythagorean', 'chaldean'],
  inputRequires: ['birthdate', 'fullName'],
  dependsOn: ['life-path', 'expression'],
  resultType: 'single',

  calculate(input, system, resolved) {
    const lifePath = resolved['life-path'];
    const expression = resolved['expression'];
    if (!lifePath || !expression) {
      throw new Error('Maturity requires life-path and expression results');
    }
    const sum = lifePath.value + expression.value;
    return { value: reduceToDigit(sum, true) };
  },

  interpret(result, system) {
    const meanings = {
      1: {
        text: 'As you mature, you grow into greater independence and self-reliance. The second half of life brings opportunities to lead, innovate, and assert your individuality with the confidence that only experience can provide. You become less concerned with others\' opinions and more focused on your unique contribution.',
        sources: [{ book: 'Complete Guide Vol 1', page: 48 }, { book: 'Phillips — Complete Book of Numerology', page: 21 }],
        keywords: ['independence', 'leadership', 'self-reliance', 'individuality']
      },
      2: {
        text: 'Maturity brings a deepening capacity for partnership, cooperation, and emotional sensitivity. In the second half of life, you find your greatest fulfillment through meaningful relationships and collaborative endeavors. Patience and diplomacy become your strongest assets.',
        sources: [{ book: 'Complete Guide Vol 1', page: 48 }, { book: 'Phillips — Complete Book of Numerology', page: 69 }],
        keywords: ['partnership', 'cooperation', 'emotional depth', 'diplomacy']
      },
      3: {
        text: 'As you mature, creative self-expression becomes central to your identity. The second half of life is marked by artistic flowering, social engagement, and the joy of sharing your gifts with others. You become more comfortable in the spotlight and less afraid of vulnerability.',
        sources: [{ book: 'Complete Guide Vol 1', page: 48 }, { book: 'Phillips — Complete Book of Numerology', page: 71 }],
        keywords: ['creative expression', 'artistic flowering', 'joy', 'social engagement']
      },
      4: {
        text: 'Maturity brings a grounding in practical accomplishment and the satisfaction of well-built foundations. In the second half of life, you reap the rewards of disciplined effort and find contentment in the structures you have created — family, career, community, and legacy.',
        sources: [{ book: 'Complete Guide Vol 1', page: 48 }, { book: 'Phillips — Complete Book of Numerology', page: 74 }],
        keywords: ['practical accomplishment', 'stability', 'legacy', 'discipline']
      },
      5: {
        text: 'As you mature, you embrace a new freedom and openness to experience. The second half of life brings travel, adventure, and the courage to break free from patterns that no longer serve you. Change becomes less frightening and more invigorating.',
        sources: [{ book: 'Complete Guide Vol 1', page: 48 }, { book: 'Phillips — Complete Book of Numerology', page: 76 }],
        keywords: ['freedom', 'adventure', 'openness', 'renewal']
      },
      6: {
        text: 'Maturity deepens your capacity for love, service, and creative nurturing. The second half of life centers on family, community, and the responsible stewardship of the things you cherish most. You become a pillar of strength for those around you.',
        sources: [{ book: 'Complete Guide Vol 1', page: 48 }, { book: 'Phillips — Complete Book of Numerology', page: 78 }],
        keywords: ['love', 'service', 'family', 'stewardship']
      },
      7: {
        text: 'As you mature, your intellectual and spiritual pursuits take center stage. The second half of life is a time of deepening wisdom, philosophical reflection, and inner discovery. You may be drawn to study, meditation, or spiritual practice with renewed intensity.',
        sources: [{ book: 'Complete Guide Vol 1', page: 48 }, { book: 'Phillips — Complete Book of Numerology', page: 81 }],
        keywords: ['wisdom', 'spiritual growth', 'reflection', 'inner discovery']
      },
      8: {
        text: 'Maturity brings material mastery and the full expression of your executive abilities. The second half of life often coincides with peak achievement, financial success, and positions of significant authority. You learn to use power with wisdom and generosity.',
        sources: [{ book: 'Complete Guide Vol 1', page: 48 }, { book: 'Phillips — Complete Book of Numerology', page: 82 }],
        keywords: ['material mastery', 'achievement', 'authority', 'wise leadership']
      },
      9: {
        text: 'As you mature, humanitarian concerns and a broad, compassionate worldview come to the fore. The second half of life is marked by generosity, letting go of the personal, and devoting your energy to causes that benefit others. Wisdom and tolerance deepen with each passing year.',
        sources: [{ book: 'Complete Guide Vol 1', page: 48 }, { book: 'Phillips — Complete Book of Numerology', page: 85 }],
        keywords: ['humanitarianism', 'compassion', 'wisdom', 'generosity']
      },
      11: {
        text: 'Maturity awakens your master intuitive potential. In the second half of life, spiritual insights intensify and you may find yourself drawn to teaching, counseling, or creative work that channels higher inspiration. Your sensitivity becomes a source of strength rather than vulnerability.',
        sources: [{ book: 'Complete Guide Vol 1', page: 48 }],
        keywords: ['spiritual awakening', 'intuition', 'teaching', 'inspiration']
      },
      22: {
        text: 'Maturity unlocks the master builder within you. The second half of life brings the opportunity to create something of lasting significance — a project, institution, or legacy that serves far beyond your personal circle. Patience and vision converge at their peak.',
        sources: [{ book: 'Complete Guide Vol 1', page: 102 }],
        keywords: ['master builder', 'lasting significance', 'legacy', 'vision']
      },
      33: {
        text: 'As you mature, the master teacher emerges in full expression. The second half of life is devoted to healing, guiding, and uplifting others at the deepest level. Your compassion and creative gifts find their highest purpose in selfless service.',
        sources: [{ book: 'Complete Guide Vol 1', page: 48 }],
        keywords: ['master teacher', 'healing', 'selfless service', 'compassion']
      }
    };

    const m = meanings[result.value];
    if (!m) {
      return { entries: [{ value: result.value, text: `No interpretation available for Maturity ${result.value}.`, sources: [], keywords: [] }] };
    }
    return { entries: [{ value: result.value, text: m.text, sources: m.sources, keywords: m.keywords }] };
  },

  describe() {
    return {
      explanation: {
        en: 'The Maturity number is the sum of your Life Path and Expression numbers, reduced to a single digit or master number. It reveals who you are becoming in the second half of life — typically manifesting its influence most strongly after age 45. It represents the blending of your life purpose with your natural talents.',
        ro: 'Numărul Maturității este suma numerelor Căii Vieții și Expresiei, redusă la o singură cifră sau număr maestru. Dezvăluie cine devii în a doua parte a vieții — de obicei manifestându-și influența cel mai puternic după vârsta de 45 de ani. Reprezintă îmbinarea scopului vieții cu talentele tale naturale.'
      },
      howCalculated: {
        en: 'Add your Life Path number and your Expression number together, then reduce the sum to a single digit or master number (11, 22, 33).',
        ro: 'Se adună numărul Căii Vieții cu numărul Expresiei, apoi se reduce suma la o singură cifră sau un număr maestru (11, 22, 33).'
      }
    };
  }
};
