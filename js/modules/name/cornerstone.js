import { letterValue } from '../../../data/letter-values.js';

/**
 * Cornerstone — the first letter of the first name.
 * Reveals how you approach new situations and challenges.
 */
export default {
  id: 'cornerstone',
  name: { en: 'Cornerstone', ro: 'Piatra de Temelie' },
  category: 'name',
  systems: ['pythagorean', 'chaldean'],
  inputRequires: ['fullName'],
  dependsOn: [],
  resultType: 'single',

  calculate(input, system, resolved) {
    const firstName = input.fullName.trim().split(/\s+/)[0];
    if (!firstName || firstName.length === 0) throw new Error('No first name found');
    return { value: letterValue(firstName[0], system) };
  },

  interpret(result, system) {
    const meanings = {
      1: { text: 'You approach new situations with independence and determination. You prefer to take the lead and are not afraid to forge your own path. First impressions show a confident, self-starting individual.', keywords: ['determination', 'leadership', 'confidence'] },
      2: { text: 'You approach new situations with sensitivity and a cooperative spirit. You prefer to listen and observe before acting, seeking harmony with those around you.', keywords: ['sensitivity', 'cooperation', 'observation'] },
      3: { text: 'You approach new situations with enthusiasm, creativity, and social ease. Your natural charm helps you make connections quickly and find the positive angle.', keywords: ['enthusiasm', 'creativity', 'charm'] },
      4: { text: 'You approach new situations methodically and practically. You want to understand the rules, assess the structure, and build a solid plan before committing.', keywords: ['method', 'practicality', 'planning'] },
      5: { text: 'You approach new situations with curiosity and adaptability. You embrace change and are energized by the unknown, ready to explore all possibilities.', keywords: ['curiosity', 'adaptability', 'exploration'] },
      6: { text: 'You approach new situations with a sense of responsibility and care. You naturally consider how your actions will affect others and seek to create harmony.', keywords: ['responsibility', 'care', 'harmony'] },
      7: { text: 'You approach new situations thoughtfully and analytically. You need time to observe and understand before engaging, preferring depth over speed.', keywords: ['analysis', 'observation', 'depth'] },
      8: { text: 'You approach new situations with confidence and a focus on results. You quickly assess the power dynamics and position yourself for success.', keywords: ['confidence', 'results', 'strategic'] },
      9: { text: 'You approach new situations with openness, compassion, and a broad perspective. You see the big picture and are willing to give generously of yourself.', keywords: ['openness', 'compassion', 'big picture'] },
    };
    const m = meanings[result.value];
    if (!m) return { entries: [{ value: result.value, text: `Cornerstone ${result.value}.`, sources: [], keywords: [] }] };
    return { entries: [{ value: result.value, text: m.text, sources: [{ book: 'Complete Guide Vol 1', page: 48 }], keywords: m.keywords }] };
  },

  describe() {
    return {
      explanation: {
        en: 'The Cornerstone is the first letter of your first name. It reveals your initial approach to new situations, challenges, and opportunities — your instinctive first response.',
        ro: 'Piatra de Temelie este prima literă a prenumelui tău. Dezvăluie abordarea ta inițială în situații noi, provocări și oportunități — răspunsul tău instinctiv.'
      },
      howCalculated: {
        en: 'Take the first letter of your first name and convert it to its numeric value in the selected system.',
        ro: 'Se ia prima literă a prenumelui și se convertește la valoarea ei numerică în sistemul selectat.'
      }
    };
  }
};
