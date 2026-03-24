import { reduceToDigit } from '../../../data/reduce.js';
import { letterValue } from '../../../data/letter-values.js';

/**
 * Balance Number — derived from the initials of each name part.
 * Reveals how you handle challenges and emotional crises.
 */
export default {
  id: 'balance',
  name: { en: 'Balance', ro: 'Echilibru' },
  category: 'secondary',
  systems: ['pythagorean', 'chaldean'],
  inputRequires: ['fullName'],
  dependsOn: [],
  resultType: 'single',

  calculate(input, system, resolved) {
    const parts = input.fullName.trim().split(/\s+/);
    let total = 0;
    for (const part of parts) {
      if (part.length > 0) {
        total += letterValue(part[0], system);
      }
    }
    return { value: reduceToDigit(total, false) };
  },

  interpret(result, system) {
    const meanings = {
      1: { text: 'When facing challenges, you rely on your independence and inner strength. You prefer to handle problems on your own and trust your instincts. Assert yourself directly but be careful not to push others away when you most need support.', sources: [{ book: 'Complete Guide Vol 1', page: 48 }], keywords: ['independence', 'self-reliance', 'directness'] },
      2: { text: 'In times of crisis, your strength lies in diplomacy and cooperation. Seek out a trusted partner or friend — working through problems with another person brings you balance. Your sensitivity becomes an asset when you use it to mediate rather than absorb.', sources: [{ book: 'Complete Guide Vol 1', page: 48 }], keywords: ['diplomacy', 'cooperation', 'partnership'] },
      3: { text: 'When challenges arise, creative expression is your natural coping mechanism. Talk about your feelings, write them down, or channel them into art. Your optimism is a genuine resource — use it to reframe difficulties as opportunities for growth.', sources: [{ book: 'Complete Guide Vol 1', page: 48 }], keywords: ['expression', 'creativity', 'optimism'] },
      4: { text: 'You handle crises by getting organized and taking practical, methodical action. Break the problem into manageable pieces and work through each one systematically. Your stability is your greatest strength during turbulent times.', sources: [{ book: 'Complete Guide Vol 1', page: 48 }], keywords: ['organization', 'practicality', 'method'] },
      5: { text: 'When facing challenges, you need freedom and flexibility to find solutions. Avoid rigid thinking — your strength lies in adaptability and the willingness to try unconventional approaches. Change itself can be your ally.', sources: [{ book: 'Complete Guide Vol 1', page: 48 }], keywords: ['flexibility', 'adaptability', 'unconventionality'] },
      6: { text: 'In times of crisis, you find balance through nurturing others and accepting responsibility. Focusing on your loved ones and creating harmony in your immediate environment restores your equilibrium. Accept help as readily as you give it.', sources: [{ book: 'Complete Guide Vol 1', page: 48 }], keywords: ['nurturing', 'responsibility', 'harmony'] },
      7: { text: 'You handle challenges best by withdrawing to think and analyze. Solitude and reflection are not avoidance — they are your process. Trust your analytical mind to find the root cause, but remember to eventually share your conclusions with those affected.', sources: [{ book: 'Complete Guide Vol 1', page: 48 }], keywords: ['analysis', 'reflection', 'solitude'] },
      8: { text: 'In crisis, you draw on your executive ability and sense of authority. Take command of the situation, organize resources, and make decisive moves. Your confidence steadies others, but be willing to delegate when the burden becomes too great.', sources: [{ book: 'Complete Guide Vol 1', page: 48 }], keywords: ['authority', 'decisiveness', 'command'] },
      9: { text: 'When facing challenges, your broad perspective and compassion are your greatest assets. Step back to see the bigger picture. Letting go of what you cannot control — and focusing your energy on what truly matters — brings you back into balance.', sources: [{ book: 'Complete Guide Vol 1', page: 48 }], keywords: ['perspective', 'compassion', 'letting go'] },
    };
    const m = meanings[result.value];
    if (!m) return { entries: [{ value: result.value, text: `No interpretation for Balance ${result.value}.`, sources: [], keywords: [] }] };
    return { entries: [{ value: result.value, text: m.text, sources: m.sources, keywords: m.keywords }] };
  },

  describe() {
    return {
      explanation: {
        en: 'The Balance number reveals your natural approach to handling challenges and emotional crises. It suggests strategies that are most effective for you when life feels off-kilter.',
        ro: 'Numărul Echilibrului dezvăluie abordarea ta naturală în fața provocărilor și crizelor emoționale. Sugerează strategiile cele mai eficiente pentru tine când viața pare dezechilibrată.'
      },
      howCalculated: {
        en: 'Take the first letter (initial) of each part of your full birth name, convert each to its numeric value, sum them, and reduce to a single digit.',
        ro: 'Se ia prima literă (inițiala) din fiecare parte a numelui complet, se convertește fiecare la valoarea ei numerică, se adună și se reduce la o singură cifră.'
      }
    };
  }
};
