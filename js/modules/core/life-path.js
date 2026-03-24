import { reduceToDigit, digitSum } from '../../../data/reduce.js';
import { isMasterNumber } from '../../../data/master-numbers.js';

/**
 * Life Path Number — the most important number in numerology.
 * Derived from the full date of birth, it reveals the broad lessons,
 * opportunities, and themes that will shape one's entire life journey.
 */
export default {
  id: 'life-path',
  name: { en: 'Life Path', ro: 'Calea Vieții' },
  category: 'core',
  systems: ['pythagorean', 'chaldean'],
  inputRequires: ['birthdate'],
  dependsOn: [],
  resultType: 'single',

  /**
   * Reduce month, day, and year SEPARATELY to single digits (preserving
   * master numbers), then sum those three values and reduce once more.
   */
  calculate(input, system, resolved) {
    const d = input.birthdate;
    const month = reduceToDigit(d.getMonth() + 1, true);
    const day = reduceToDigit(d.getDate(), true);
    const yearDigits = digitSum(d.getFullYear());
    const year = reduceToDigit(yearDigits, true);
    const total = month + day + year;
    return { value: reduceToDigit(total, true) };
  },

  interpret(result, system) {
    const meanings = {
      1: {
        text: 'Leadership, independence, and pioneering spirit define your Life Path. You are the individualist — self-motivated, ambitious, and original in thought and action. Your journey is about learning to stand on your own, trust your instincts, and forge new trails where none existed before. At your best you inspire others through sheer force of will and creative vision. The challenge lies in balancing that fierce independence with cooperation: stubbornness and a domineering streak can alienate the very people who want to support you.',
        sources: [{ book: 'Phillips', page: '21' }, { book: 'Complete Guide Vol 1', page: '48' }],
        keywords: ['leadership', 'independence', 'pioneering', 'ambition', 'originality']
      },
      2: {
        text: 'Cooperation, diplomacy, and sensitivity are the hallmarks of your Life Path. You are the peacemaker — intuitive, gentle, and supportive of those around you. Your life lesson revolves around partnership and learning to work harmoniously with others. You possess a rare gift for sensing the emotional undercurrents in any room and mediating conflict with grace. The shadow side of this path is oversensitivity and indecisiveness; learning to assert your own needs without guilt is part of the journey.',
        sources: [{ book: 'Phillips', page: '69' }, { book: 'Complete Guide Vol 1', page: '48' }],
        keywords: ['cooperation', 'diplomacy', 'sensitivity', 'intuition', 'peacemaking']
      },
      3: {
        text: 'Expression, creativity, and joyful social interaction illuminate your Life Path. You are the communicator — optimistic, artistic, and naturally inspiring to those you encounter. Words, images, music, or any form of creative output are your tools for making sense of the world. Your enthusiasm is contagious and you lift spirits effortlessly. The risk on this path is scattering your energy across too many projects or settling for superficiality when depth is required.',
        sources: [{ book: 'Phillips', page: '71' }, { book: 'Complete Guide Vol 1', page: '260' }],
        keywords: ['creativity', 'expression', 'communication', 'optimism', 'artistry']
      },
      4: {
        text: 'Stability, hard work, and practicality form the bedrock of your Life Path. You are the builder — methodical, reliable, and deeply disciplined. Your life purpose centers on creating solid structures, whether physical, organizational, or emotional, that endure over time. You find satisfaction in mastering systems and producing tangible results through persistent effort. The challenge is rigidity: an overly cautious approach can prevent you from seizing opportunities that require a leap of faith.',
        sources: [{ book: 'Phillips', page: '74' }, { book: 'Complete Guide Vol 1', page: '48' }],
        keywords: ['stability', 'discipline', 'practicality', 'reliability', 'structure']
      },
      5: {
        text: 'Freedom, change, and adventure call to you on this Life Path. You are the explorer — versatile, curious, and progressive in outlook. Your soul thrives on variety and new experiences; routine is your kryptonite. Travel, diverse relationships, and unconventional career paths are often part of your story. You teach others that change is not something to fear but to embrace. The shadow here is restlessness and irresponsibility — learning commitment without feeling caged is your central lesson.',
        sources: [{ book: 'Phillips', page: '76' }, { book: 'Complete Guide Vol 1', page: '48' }],
        keywords: ['freedom', 'adventure', 'versatility', 'curiosity', 'change']
      },
      6: {
        text: 'Responsibility, love, and nurturing define your Life Path. You are the caretaker — creative, compassionate, and drawn to domestic harmony. Your purpose involves accepting the weight of responsibility for others, whether family, community, or a creative vision. You have a natural talent for healing and creating beauty in your environment. The pitfall is excessive worry and a tendency toward controlling behavior; you must learn that love means allowing others their own path, not managing it for them.',
        sources: [{ book: 'Phillips', page: '78-79' }, { book: 'Complete Guide Vol 1', page: '48' }],
        keywords: ['responsibility', 'nurturing', 'compassion', 'harmony', 'service']
      },
      7: {
        text: 'Analysis, wisdom, and introspection mark your Life Path. You are the seeker — intellectual, spiritual, and uncommonly perceptive. Your journey is an inward one, driven by a relentless need to understand the deeper truths behind surface appearances. You are drawn to philosophy, science, mysticism, or any field that rewards deep investigation. Solitude recharges you. The challenge is withdrawal and excessive skepticism; at some point, the seeker must also learn to share what has been found.',
        sources: [{ book: 'Phillips', page: '81' }, { book: 'Complete Guide Vol 1', page: '48' }],
        keywords: ['analysis', 'wisdom', 'introspection', 'spirituality', 'perception']
      },
      8: {
        text: 'Achievement, authority, and material mastery characterize your Life Path. You are the powerhouse — ambitious, organized, and endowed with exceptional executive ability. Your life lesson involves learning to wield power wisely, managing resources on a large scale, and understanding the relationship between effort and reward. Financial and professional success often comes naturally, but so does the test of integrity that accompanies it. The risk is becoming materialistic or domineering, forgetting that true authority is earned through service.',
        sources: [{ book: 'Phillips', page: '82-83' }, { book: 'Complete Guide Vol 1', page: '48' }],
        keywords: ['achievement', 'authority', 'ambition', 'organization', 'mastery']
      },
      9: {
        text: 'Humanitarianism, compassion, and completion define your Life Path. You are the philanthropist — idealistic, generous, and remarkably broad-minded. Nine is the number of culmination, and your life purpose involves giving back, letting go, and serving something larger than yourself. You feel the suffering of others acutely and are drawn to causes that uplift humanity. The shadow of this path is impracticality and self-sacrifice to the point of martyrdom; you must learn that you cannot pour from an empty cup.',
        sources: [{ book: 'Phillips', page: '85-86' }, { book: 'Complete Guide Vol 1', page: '48' }],
        keywords: ['humanitarianism', 'compassion', 'idealism', 'generosity', 'completion']
      },
      11: {
        text: 'Spiritual insight, intuition, and inspiration elevate your Life Path to the master level. You are the master intuitive — illuminated, visionary, and profoundly idealistic. As a higher octave of the 2, you carry all of its sensitivity and diplomatic gifts but amplified to a spiritual frequency. You may experience flashes of insight, prophetic dreams, or an uncanny ability to sense what others cannot. Your purpose is to channel these gifts into something that inspires and uplifts. The burden is nervous tension and the gap between your lofty visions and everyday reality.',
        sources: [{ book: 'Complete Guide Vol 1', page: '48' }],
        keywords: ['intuition', 'spiritual insight', 'vision', 'inspiration', 'illumination']
      },
      22: {
        text: 'Large-scale achievement and practical vision define your master Life Path. You are the master builder — capable of turning the grandest dreams into concrete reality. As a higher octave of the 4, you share its discipline and love of structure but operate on a vastly larger canvas. Where 4 builds a house, 22 builds institutions, movements, and legacies. You have the rare combination of visionary thinking and the practical stamina to execute. The challenge is the immense pressure this path carries; self-doubt and overwhelm can paralyze if you lose sight of the step-by-step process.',
        sources: [{ book: 'Complete Guide Vol 1', page: '102' }],
        keywords: ['master builder', 'practical vision', 'legacy', 'large-scale achievement', 'discipline']
      },
      33: {
        text: 'Selfless service and spiritual teaching define your extraordinary Life Path. You are the master teacher and healer — nurturing at the highest possible level, dedicated to the spiritual upliftment of those around you. As a higher octave of the 6, you carry its compassion and sense of responsibility but directed toward universal rather than personal concerns. Your presence itself can be healing. This is the rarest and most demanding of the Life Paths; the temptation to neglect your own needs in service to others is constant, and learning self-care is essential to sustaining your mission.',
        sources: [{ book: 'Complete Guide Vol 1', page: '48' }],
        keywords: ['master teacher', 'selfless service', 'healing', 'spiritual upliftment', 'compassion']
      }
    };

    const m = meanings[result.value];
    if (!m) {
      return { entries: [{ value: result.value, text: `No interpretation available for Life Path ${result.value}.`, sources: [], keywords: [] }] };
    }
    return {
      entries: [{
        value: result.value,
        text: m.text,
        sources: m.sources,
        keywords: m.keywords
      }]
    };
  },

  describe() {
    return {
      explanation: {
        en: 'The Life Path number is the most significant number in your numerology chart. Derived from your complete date of birth, it reveals the broad lessons, challenges, and opportunities you will encounter throughout your lifetime. It represents the path you are walking and the innate traits you carry from birth.',
        ro: 'Numărul Căii Vieții este cel mai important număr din profilul tău numerologic. Derivat din data completă a nașterii, el dezvăluie lecțiile generale, provocările și oportunitățile pe care le vei întâlni de-a lungul vieții. Reprezintă drumul pe care îl parcurgi și trăsăturile înnăscute cu care te-ai născut.'
      },
      howCalculated: {
        en: 'Reduce the month, day, and year of birth SEPARATELY to single digits (preserving master numbers 11, 22, 33), then add those three values together and reduce the total to a single digit or master number. Example: March 15, 1990 — month 3, day 1+5=6, year 1+9+9+0=19 then 1+0=1 — total 3+6+1=10 then 1+0=1. Life Path = 1.',
        ro: 'Se reduc luna, ziua și anul nașterii SEPARAT la o singură cifră (păstrând numerele maestru 11, 22, 33), apoi se adună cele trei valori și se reduce totalul la o singură cifră sau un număr maestru. Exemplu: 15 martie 1990 — luna 3, ziua 1+5=6, anul 1+9+9+0=19 apoi 1+0=1 — total 3+6+1=10 apoi 1+0=1. Calea Vieții = 1.'
      }
    };
  }
};
