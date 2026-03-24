import { reduceToDigit } from '../../../data/reduce.js';
import { letterValue } from '../../../data/letter-values.js';

/**
 * Expression / Destiny Number — derived from all letters of the full birth name.
 * Reveals natural abilities, talents, and the manner in which one expresses
 * themselves to the world.
 */
export default {
  id: 'expression',
  name: { en: 'Expression', ro: 'Expresia' },
  category: 'core',
  systems: ['pythagorean', 'chaldean'],
  inputRequires: ['fullName'],
  dependsOn: [],
  resultType: 'single',

  calculate(input, system, resolved) {
    const name = input.fullName; // already normalized: uppercase A-Z + spaces
    let total = 0;
    for (const ch of name) {
      if (ch === ' ') continue;
      total += letterValue(ch, system);
    }
    return { value: reduceToDigit(total, true) };
  },

  interpret(result, system) {
    const meanings = {
      1: {
        text: 'Your Expression number reveals a natural talent for leadership and innovation. You possess an original mind and the courage to act on your ideas. Independence is woven into the way you present yourself to the world — you are most effective when given autonomy. Creative problem-solving comes easily, and you inspire others through decisive action. Guard against arrogance and an unwillingness to collaborate.',
        sources: [{ book: 'Phillips — Complete Book of Numerology', page: 21 }, { book: 'Complete Guide Vol 1', page: 48 }],
        keywords: ['leadership', 'innovation', 'independence', 'decisiveness']
      },
      2: {
        text: 'Your Expression number reveals a gift for diplomacy, cooperation, and bringing people together. You have an innate sensitivity to the feelings of others and excel in partnerships and supportive roles. Your talents shine in mediation, counseling, and any work that requires tact and patience. You create harmony wherever you go. The challenge is developing enough assertiveness to stand up for your own needs.',
        sources: [{ book: 'Phillips — Complete Book of Numerology', page: 69 }, { book: 'Complete Guide Vol 1', page: 48 }],
        keywords: ['diplomacy', 'cooperation', 'sensitivity', 'patience']
      },
      3: {
        text: 'Your Expression number bestows exceptional creative and communicative abilities. Words — spoken, written, or sung — are your natural medium. You have a gift for uplifting others through humor, art, and enthusiastic self-expression. Social situations energize you and your optimism is infectious. The risk is spreading yourself too thin or using charm as a substitute for depth.',
        sources: [{ book: 'Phillips — Complete Book of Numerology', page: 71 }, { book: 'Complete Guide Vol 1', page: 260 }],
        keywords: ['creativity', 'communication', 'optimism', 'artistry']
      },
      4: {
        text: 'Your Expression number reveals a talent for building lasting structures — practical, dependable, and deeply committed to quality. You bring order to chaos and find satisfaction in methodical work. Engineering, management, craftsmanship, and any discipline requiring sustained effort reward you well. The challenge is avoiding rigidity and learning to embrace occasional spontaneity.',
        sources: [{ book: 'Phillips — Complete Book of Numerology', page: 74 }, { book: 'Complete Guide Vol 1', page: 48 }],
        keywords: ['structure', 'dependability', 'discipline', 'craftsmanship']
      },
      5: {
        text: 'Your Expression number indicates versatility, adaptability, and a talent for communicating new ideas. You are a natural promoter of change and thrive in dynamic environments. Travel, sales, media, and any field that rewards quick thinking suit you well. Your enthusiasm for variety keeps life exciting but can also lead to scattered energy. Learning to commit to a direction without feeling trapped is key.',
        sources: [{ book: 'Phillips — Complete Book of Numerology', page: 76 }, { book: 'Complete Guide Vol 1', page: 48 }],
        keywords: ['versatility', 'adaptability', 'change', 'communication']
      },
      6: {
        text: 'Your Expression number reveals a deep capacity for responsibility, nurturing, and artistic creation. You are drawn to roles that involve caring for others — teaching, healing, counseling, or parenthood. Your home and community matter deeply to you, and you pour creative energy into making beautiful, harmonious environments. Be mindful of taking on too much responsibility or becoming controlling in your desire to help.',
        sources: [{ book: 'Phillips — Complete Book of Numerology', page: 78 }, { book: 'Complete Guide Vol 1', page: 48 }],
        keywords: ['responsibility', 'nurturing', 'creativity', 'harmony']
      },
      7: {
        text: 'Your Expression number marks you as a natural analyst and seeker of truth. You possess a keen intellect and an insatiable curiosity about the deeper workings of life. Research, science, philosophy, and spiritual inquiry all suit your talents. You require periods of solitude to process your thoughts and recharge. The challenge is learning to share your discoveries and not retreating too far into isolation.',
        sources: [{ book: 'Phillips — Complete Book of Numerology', page: 81 }, { book: 'Complete Guide Vol 1', page: 48 }],
        keywords: ['analysis', 'intellect', 'research', 'spirituality']
      },
      8: {
        text: 'Your Expression number reveals executive ability and a talent for managing material resources on a large scale. You are organized, goal-oriented, and naturally authoritative. Business, finance, law, and administration are fields where you can excel. You understand power and how to wield it effectively. The temptation is to equate success with wealth; true mastery comes when achievement serves a purpose larger than yourself.',
        sources: [{ book: 'Phillips — Complete Book of Numerology', page: 82 }, { book: 'Complete Guide Vol 1', page: 48 }],
        keywords: ['executive ability', 'organization', 'authority', 'ambition']
      },
      9: {
        text: 'Your Expression number reveals a broad humanitarian vision and a talent for inspiring others through selfless action. You are compassionate, tolerant, and drawn to artistic or philanthropic pursuits. Your abilities serve you best when directed toward the greater good. You have a magnetic presence that attracts people from all walks of life. The challenge is learning healthy boundaries and not sacrificing your own needs for every cause.',
        sources: [{ book: 'Phillips — Complete Book of Numerology', page: 85 }, { book: 'Complete Guide Vol 1', page: 48 }],
        keywords: ['humanitarianism', 'compassion', 'artistry', 'tolerance']
      },
      11: {
        text: 'Your master Expression number confers exceptional intuition, spiritual awareness, and the ability to inspire at a profound level. You are a channel for higher ideas and may find yourself drawn to visionary endeavors in art, spirituality, or social reform. As a higher octave of 2, you possess extraordinary sensitivity — which is both your greatest gift and your greatest challenge. Nervous tension and self-doubt can undermine your potential if not managed.',
        sources: [{ book: 'Complete Guide Vol 1', page: 48 }],
        keywords: ['intuition', 'inspiration', 'spiritual awareness', 'vision']
      },
      22: {
        text: 'Your master Expression number marks you as a practical visionary with the talent to manifest large-scale projects. You combine the discipline of 4 with a vastly expanded field of operation. Architecture, international business, political leadership, and major philanthropic endeavors are natural arenas for your abilities. The pressure to achieve at this level is immense; self-care and realistic pacing are essential.',
        sources: [{ book: 'Complete Guide Vol 1', page: 102 }],
        keywords: ['master builder', 'practical vision', 'large-scale projects', 'discipline']
      },
      33: {
        text: 'Your master Expression number endows you with extraordinary gifts of nurturing, teaching, and healing on a universal scale. You are the master teacher — your very presence can uplift and transform those around you. Artistic and creative talents merge with a deep sense of responsibility for the well-being of others. This is an exceptionally demanding expression; the call to serve is constant, and you must guard against burnout.',
        sources: [{ book: 'Complete Guide Vol 1', page: 48 }],
        keywords: ['master teacher', 'healing', 'universal service', 'creativity']
      }
    };

    const m = meanings[result.value];
    if (!m) {
      return { entries: [{ value: result.value, text: `No interpretation available for Expression ${result.value}.`, sources: [], keywords: [] }] };
    }
    return { entries: [{ value: result.value, text: m.text, sources: m.sources, keywords: m.keywords }] };
  },

  describe() {
    return {
      explanation: {
        en: 'The Expression number (also called the Destiny number) is derived from all the letters in your full birth name. It reveals your natural abilities, talents, and the way you express yourself to the world. Think of it as the toolkit you were given at birth.',
        ro: 'Numărul Expresiei (numit și numărul Destinului) se calculează din toate literele numelui complet de la naștere. Dezvăluie abilitățile tale naturale, talentele și modul în care te exprimi în lume. Gândește-te la el ca la setul de instrumente cu care te-ai născut.'
      },
      howCalculated: {
        en: 'Convert each letter of your full birth name to its numeric value using the selected system (Pythagorean or Chaldean), sum all values, and reduce to a single digit or master number (11, 22, 33).',
        ro: 'Se convertește fiecare literă din numele complet de la naștere în valoarea ei numerică folosind sistemul selectat (Pitagoreean sau Caldean), se adună toate valorile și se reduce la o singură cifră sau un număr maestru (11, 22, 33).'
      }
    };
  }
};
