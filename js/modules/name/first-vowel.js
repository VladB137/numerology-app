import { letterValue, VOWELS } from '../../../data/letter-values.js';

/**
 * First Vowel — the first vowel in the first name.
 * Reveals your instinctive first reaction to situations.
 */
export default {
  id: 'first-vowel',
  name: { en: 'First Vowel', ro: 'Prima Vocală' },
  category: 'name',
  systems: ['pythagorean', 'chaldean'],
  inputRequires: ['fullName'],
  dependsOn: [],
  resultType: 'single',

  calculate(input, system, resolved) {
    const firstName = input.fullName.trim().split(/\s+/)[0];
    for (const ch of firstName) {
      if (VOWELS.has(ch)) {
        return { value: letterValue(ch, system) };
      }
    }
    // If no standard vowel found, treat Y as vowel
    for (const ch of firstName) {
      if (ch === 'Y') return { value: letterValue('Y', system) };
    }
    throw new Error('No vowel found in first name');
  },

  interpret(result, system) {
    const meanings = {
      1: { text: 'Your first instinct is to act independently and take charge (A). You react to situations with confidence and a desire to lead. You process new information by considering how it affects you personally.', keywords: ['independence', 'confidence', 'action'] },
      5: { text: 'Your first instinct is to seek understanding through experience (E). You react with curiosity and a desire for freedom. You process situations through your feelings and need room to explore.', keywords: ['curiosity', 'experience', 'freedom'] },
      9: { text: 'Your first instinct is to respond with compassion and emotional depth (I). You react sensitively and process situations through your ideals. You need to feel that your response aligns with your values.', keywords: ['compassion', 'sensitivity', 'idealism'] },
      6: { text: 'Your first instinct is to take responsibility and nurture (O). You react with a desire to help and create harmony. You process situations by considering how they affect your loved ones.', keywords: ['responsibility', 'nurturing', 'harmony'] },
      3: { text: 'Your first instinct is to express and communicate (U). You react intuitively and creatively. You process situations through your imagination and desire for social connection.', keywords: ['expression', 'intuition', 'creativity'] },
      7: { text: 'Your first instinct is to analyze and seek deeper understanding (Y as vowel). You react thoughtfully and may need time before responding. You process situations through careful observation.', keywords: ['analysis', 'depth', 'observation'] },
    };
    const m = meanings[result.value];
    if (!m) return { entries: [{ value: result.value, text: `First Vowel value ${result.value}.`, sources: [], keywords: [] }] };
    return { entries: [{ value: result.value, text: m.text, sources: [{ book: 'Complete Guide Vol 1', page: 48 }], keywords: m.keywords }] };
  },

  describe() {
    return {
      explanation: {
        en: 'The First Vowel of your first name reveals your instinctive first reaction — the immediate, unfiltered response you have before conscious thought kicks in. Each vowel carries a distinct reactive energy.',
        ro: 'Prima vocală a prenumelui tău dezvăluie reacția ta instinctivă — răspunsul imediat și nefiltrat pe care îl ai înainte ca gândirea conștientă să intervină.'
      },
      howCalculated: {
        en: 'Find the first vowel (A, E, I, O, U) in your first name and convert it to its numeric value. If no standard vowel exists, Y is used.',
        ro: 'Se găsește prima vocală (A, E, I, O, U) din prenume și se convertește la valoarea ei numerică. Dacă nu există vocală standard, se folosește Y.'
      }
    };
  }
};
