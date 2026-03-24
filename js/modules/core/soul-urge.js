import { reduceToDigit } from '../../../data/reduce.js';
import { letterValue, VOWELS } from '../../../data/letter-values.js';

/**
 * Soul Urge / Heart's Desire Number — derived from the vowels in the full birth name.
 * Reveals inner motivation, what the heart truly yearns for.
 */
export default {
  id: 'soul-urge',
  name: { en: "Soul Urge", ro: "Dorința Sufletului" },
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
      if (VOWELS.has(ch)) {
        total += letterValue(ch, system);
      }
    }
    return { value: reduceToDigit(total, true) };
  },

  interpret(result, system) {
    const meanings = {
      1: {
        text: 'Your soul yearns for independence, originality, and the freedom to lead. Deep within, you are driven to be first, to innovate, and to carve your own path. You desire recognition for your unique contributions and feel most alive when you are in command of your own destiny. Dependence on others frustrates you at a soul level.',
        sources: [{ book: 'Phillips — Complete Book of Numerology', page: 21 }, { book: 'Complete Guide Vol 1', page: 48 }],
        keywords: ['independence', 'originality', 'leadership', 'self-determination']
      },
      2: {
        text: 'Your soul craves harmony, partnership, and emotional connection. You are deeply motivated by love and the desire to create peaceful relationships. Behind your outer persona lies a sensitive being who needs to feel needed and valued. Music, beauty, and gentle companionship nourish your innermost self.',
        sources: [{ book: 'Phillips — Complete Book of Numerology', page: 69 }, { book: 'Complete Guide Vol 1', page: 48 }],
        keywords: ['harmony', 'partnership', 'sensitivity', 'peace']
      },
      3: {
        text: 'Your soul desires joyful self-expression, creativity, and social connection. You are inwardly driven to create — through words, art, music, or any medium that allows your imagination to flow. Laughter and inspiration are essential to your well-being. Suppressing this creative urge leads to deep dissatisfaction.',
        sources: [{ book: 'Phillips — Complete Book of Numerology', page: 71 }, { book: 'Complete Guide Vol 1', page: 260 }],
        keywords: ['self-expression', 'creativity', 'joy', 'imagination']
      },
      4: {
        text: 'Your soul seeks security, order, and the satisfaction of building something lasting. You are deeply motivated by the desire to create stable foundations — for yourself, your family, and your community. Hard work is not a burden but a calling. Inner peace comes when your environment is organized and predictable.',
        sources: [{ book: 'Phillips — Complete Book of Numerology', page: 74 }, { book: 'Complete Guide Vol 1', page: 48 }],
        keywords: ['security', 'order', 'stability', 'foundation']
      },
      5: {
        text: 'Your soul yearns for freedom, adventure, and the thrill of new experience. You are inwardly restless and need variety to feel alive. Travel, sensory stimulation, and the exploration of new ideas fuel your spirit. Any situation that feels confining or routine slowly suffocates your inner vitality.',
        sources: [{ book: 'Phillips — Complete Book of Numerology', page: 76 }, { book: 'Complete Guide Vol 1', page: 48 }],
        keywords: ['freedom', 'adventure', 'variety', 'exploration']
      },
      6: {
        text: 'Your soul craves love, family, and the chance to nurture. You are deeply motivated by responsibility to those you care about and desire a beautiful, harmonious home above all else. Your inner life revolves around relationships and the creative expression of love. Taking care of others is not duty but deep fulfillment.',
        sources: [{ book: 'Phillips — Complete Book of Numerology', page: 78 }, { book: 'Complete Guide Vol 1', page: 48 }],
        keywords: ['love', 'family', 'nurturing', 'home']
      },
      7: {
        text: 'Your soul seeks understanding, wisdom, and inner truth. You are driven by a deep need to comprehend the mysteries of existence. Solitude and contemplation are not luxuries but necessities. Your inner world is rich with questions, insights, and a spiritual yearning that material success alone can never satisfy.',
        sources: [{ book: 'Phillips — Complete Book of Numerology', page: 81 }, { book: 'Complete Guide Vol 1', page: 48 }],
        keywords: ['wisdom', 'understanding', 'contemplation', 'truth']
      },
      8: {
        text: 'Your soul desires accomplishment, influence, and material mastery. You are inwardly driven to achieve at the highest level and to be recognized for your competence. Power, status, and financial security matter deeply to you — not from greed, but from a need to prove that effort and vision produce tangible results.',
        sources: [{ book: 'Phillips — Complete Book of Numerology', page: 82 }, { book: 'Complete Guide Vol 1', page: 48 }],
        keywords: ['accomplishment', 'influence', 'mastery', 'recognition']
      },
      9: {
        text: 'Your soul yearns to serve humanity and leave the world better than you found it. You are motivated by compassion and a broad, inclusive love that extends beyond personal relationships. Artistic expression and philanthropy are natural outlets for this deep inner drive. Letting go — of possessions, grudges, and attachments — is a recurring soul lesson.',
        sources: [{ book: 'Phillips — Complete Book of Numerology', page: 85 }, { book: 'Complete Guide Vol 1', page: 48 }],
        keywords: ['humanitarianism', 'service', 'compassion', 'letting go']
      },
      11: {
        text: 'Your soul is attuned to spiritual illumination and higher truth. The master intuitive operates within you, seeking to channel divine inspiration into the material world. You may experience vivid dreams, sudden insights, or a persistent feeling that you are meant for something beyond ordinary existence. The intensity of this inner vibration can be overwhelming.',
        sources: [{ book: 'Complete Guide Vol 1', page: 48 }],
        keywords: ['spiritual illumination', 'intuition', 'higher truth', 'vision']
      },
      22: {
        text: 'Your soul desires to build something of lasting significance for humanity. The master builder within you is not content with personal success — you yearn to create structures, systems, or institutions that serve the greater good. This is an immensely powerful inner drive that demands patience and practical wisdom to fulfill.',
        sources: [{ book: 'Complete Guide Vol 1', page: 102 }],
        keywords: ['master builder', 'legacy', 'significance', 'service']
      },
      33: {
        text: 'Your soul yearns for the highest expression of love and selfless service. The master teacher within you seeks to heal, uplift, and guide others toward spiritual awakening. This is the most compassionate of all soul urges — and the most demanding. Your inner life is rich with empathy, creativity, and a sense of cosmic responsibility.',
        sources: [{ book: 'Complete Guide Vol 1', page: 48 }],
        keywords: ['master teacher', 'selfless love', 'healing', 'spiritual service']
      }
    };

    const m = meanings[result.value];
    if (!m) {
      return { entries: [{ value: result.value, text: `No interpretation available for Soul Urge ${result.value}.`, sources: [], keywords: [] }] };
    }
    return { entries: [{ value: result.value, text: m.text, sources: m.sources, keywords: m.keywords }] };
  },

  describe() {
    return {
      explanation: {
        en: 'The Soul Urge number (also called Heart\'s Desire) is derived from the vowels in your full birth name. It reveals your innermost desires, motivations, and what your heart truly yearns for — the private you that only you fully know.',
        ro: 'Numărul Dorinței Sufletului (numit și Dorința Inimii) se calculează din vocalele numelui complet de la naștere. Dezvăluie dorințele tale cele mai profunde, motivațiile și ceea ce inima ta dorește cu adevărat — eul tău privat pe care doar tu îl cunoști pe deplin.'
      },
      howCalculated: {
        en: 'Sum the numeric values of only the VOWELS (A, E, I, O, U) in your full birth name, then reduce to a single digit or master number. Y is treated as a consonant in the standard calculation.',
        ro: 'Se adună valorile numerice ale VOCALELOR (A, E, I, O, U) din numele complet de la naștere, apoi se reduce la o singură cifră sau un număr maestru. Y este tratat ca o consoană în calculul standard.'
      }
    };
  }
};
