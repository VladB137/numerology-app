import { letterValue } from '../../../data/letter-values.js';

/**
 * Capstone — the last letter of the first name.
 * Reveals how you finish projects and handle conclusions.
 */
export default {
  id: 'capstone',
  name: { en: 'Capstone', ro: 'Piatra de Încheiere' },
  category: 'name',
  systems: ['pythagorean', 'chaldean'],
  inputRequires: ['fullName'],
  dependsOn: [],
  resultType: 'single',

  calculate(input, system, resolved) {
    const firstName = input.fullName.trim().split(/\s+/)[0];
    if (!firstName || firstName.length === 0) throw new Error('No first name found');
    return { value: letterValue(firstName[firstName.length - 1], system) };
  },

  interpret(result, system) {
    const meanings = {
      1: { text: 'You finish what you start with decisive, independent action. You bring projects to completion through sheer willpower and prefer to finalize things on your own terms.', keywords: ['decisiveness', 'independence', 'willpower'] },
      2: { text: 'You bring things to conclusion through cooperation and attention to detail. You ensure that all parties are satisfied and that endings are harmonious.', keywords: ['cooperation', 'detail', 'harmony'] },
      3: { text: 'You complete projects with creative flair and enthusiasm. Your conclusions tend to be expressive and memorable, leaving a positive impression.', keywords: ['creative flair', 'enthusiasm', 'expression'] },
      4: { text: 'You finish projects methodically and thoroughly. No detail is left unattended, and the final product reflects your commitment to quality and completeness.', keywords: ['thoroughness', 'quality', 'completeness'] },
      5: { text: 'You bring things to conclusion with adaptability and sometimes with a dramatic flourish. You may struggle with endings but adapt quickly when they come.', keywords: ['adaptability', 'flexibility', 'transition'] },
      6: { text: 'You complete things with care and responsibility, ensuring that the outcome serves everyone involved. Your conclusions are nurturing and considerate.', keywords: ['care', 'responsibility', 'consideration'] },
      7: { text: 'You bring things to conclusion thoughtfully and reflectively. You want the ending to make sense and often review the process before declaring something truly finished.', keywords: ['reflection', 'analysis', 'thoughtfulness'] },
      8: { text: 'You finish projects with authority and a focus on results. The final outcome must meet your high standards and demonstrate tangible achievement.', keywords: ['authority', 'results', 'standards'] },
      9: { text: 'You complete things with generosity and a sense of fulfillment. You find satisfaction in endings that benefit others and contribute to the greater good.', keywords: ['generosity', 'fulfillment', 'service'] },
    };
    const m = meanings[result.value];
    if (!m) return { entries: [{ value: result.value, text: `Capstone ${result.value}.`, sources: [], keywords: [] }] };
    return { entries: [{ value: result.value, text: m.text, sources: [{ book: 'Complete Guide Vol 1', page: 48 }], keywords: m.keywords }] };
  },

  describe() {
    return {
      explanation: {
        en: 'The Capstone is the last letter of your first name. It reveals how you handle endings, completions, and the final stages of projects — your follow-through ability.',
        ro: 'Piatra de Încheiere este ultima literă a prenumelui tău. Dezvăluie modul în care gestionezi finalurile, completările și etapele finale ale proiectelor.'
      },
      howCalculated: {
        en: 'Take the last letter of your first name and convert it to its numeric value in the selected system.',
        ro: 'Se ia ultima literă a prenumelui și se convertește la valoarea ei numerică în sistemul selectat.'
      }
    };
  }
};
