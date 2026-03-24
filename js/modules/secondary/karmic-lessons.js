import { letterValue } from '../../../data/letter-values.js';

/**
 * Karmic Lessons — numbers missing from the name.
 * Reveals weaknesses or areas needing development.
 */
export default {
  id: 'karmic-lessons',
  name: { en: 'Karmic Lessons', ro: 'Lecții Karmice' },
  category: 'secondary',
  systems: ['pythagorean', 'chaldean'],
  inputRequires: ['fullName'],
  dependsOn: [],
  resultType: 'list',

  calculate(input, system, resolved) {
    const name = input.fullName;
    const present = new Set();
    for (const ch of name) {
      if (ch === ' ') continue;
      present.add(letterValue(ch, system));
    }
    const missing = [];
    for (let n = 1; n <= 9; n++) {
      if (!present.has(n)) missing.push(n);
    }
    return { values: missing };
  },

  interpret(result, system) {
    const lessons = {
      1: { text: 'A missing 1 suggests you need to develop independence, self-confidence, and the courage to stand alone. You may tend to lean on others or avoid taking initiative. Life will present situations that challenge you to find your own strength.', keywords: ['independence', 'confidence', 'initiative'] },
      2: { text: 'A missing 2 indicates a need to develop patience, diplomacy, and sensitivity to others. You may struggle with cooperation or have difficulty considering others\' feelings. Partnerships will be your classroom.', keywords: ['patience', 'diplomacy', 'sensitivity'] },
      3: { text: 'A missing 3 suggests you need to develop self-expression and creative confidence. You may have difficulty articulating your feelings or undervalue your creative abilities. Finding your voice is a lifelong lesson.', keywords: ['self-expression', 'creativity', 'communication'] },
      4: { text: 'A missing 4 indicates a need to develop discipline, organization, and practical skills. You may resist routine or have difficulty following through on commitments. Building solid foundations requires focused effort.', keywords: ['discipline', 'organization', 'follow-through'] },
      5: { text: 'A missing 5 suggests you need to embrace change, take risks, and develop flexibility. You may cling to safety and routine, missing opportunities for growth that come through new experiences.', keywords: ['adaptability', 'risk-taking', 'flexibility'] },
      6: { text: 'A missing 6 indicates a need to develop responsibility in relationships and accept the duties of caring for others. You may avoid commitment or struggle with the demands of family and community.', keywords: ['responsibility', 'commitment', 'caring'] },
      7: { text: 'A missing 7 suggests you need to develop inner depth, analytical thinking, and spiritual awareness. You may avoid introspection or rely too heavily on surface-level understanding.', keywords: ['introspection', 'analysis', 'spiritual growth'] },
      8: { text: 'A missing 8 indicates a need to develop financial understanding, executive ability, and the responsible use of power. You may struggle with money management or avoid positions of authority.', keywords: ['financial skill', 'authority', 'power'] },
      9: { text: 'A missing 9 suggests you need to develop compassion, tolerance, and a broader worldview. You may be too focused on personal concerns and need to learn the fulfillment that comes from selfless giving.', keywords: ['compassion', 'tolerance', 'selflessness'] },
    };

    const entries = result.values.map(v => ({
      value: v,
      text: lessons[v]?.text || `Karmic lesson ${v}: area requiring development.`,
      sources: [{ book: 'Complete Guide Vol 1', page: 48 }, { book: 'Phillips — Complete Book of Numerology', page: 30 }],
      keywords: lessons[v]?.keywords || []
    }));

    if (entries.length === 0) {
      entries.push({ value: 0, text: 'No karmic lessons — all numbers 1-9 are represented in your name. This is quite rare and suggests a well-rounded set of life experiences from which to draw.', sources: [{ book: 'Complete Guide Vol 1', page: 48 }], keywords: ['completeness', 'balance'] });
    }

    return { entries };
  },

  describe() {
    return {
      explanation: {
        en: 'Karmic Lessons are the numbers (1-9) that are completely absent from your full birth name. Each missing number represents an area of weakness or inexperience that you are here to develop in this lifetime.',
        ro: 'Lecțiile Karmice sunt numerele (1-9) care lipsesc complet din numele tău complet de la naștere. Fiecare număr lipsă reprezintă o zonă de slăbiciune sau lipsă de experiență pe care trebuie să o dezvolți în această viață.'
      },
      howCalculated: {
        en: 'Convert every letter in your full birth name to its numeric value. Any number from 1-9 that does not appear at all is a Karmic Lesson.',
        ro: 'Se convertește fiecare literă din numele complet în valoarea ei numerică. Orice număr de la 1 la 9 care nu apare deloc este o Lecție Karmică.'
      }
    };
  }
};
