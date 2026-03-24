/**
 * Subconscious Self — 9 minus the number of Karmic Lessons.
 * Reveals inner strength and ability to handle emergencies.
 */
export default {
  id: 'subconscious-self',
  name: { en: 'Subconscious Self', ro: 'Sinele Subconștient' },
  category: 'secondary',
  systems: ['pythagorean', 'chaldean'],
  inputRequires: ['fullName'],
  dependsOn: ['karmic-lessons'],
  resultType: 'single',

  calculate(input, system, resolved) {
    const karmicLessons = resolved['karmic-lessons'];
    if (!karmicLessons) throw new Error('Missing karmic-lessons dependency');
    const numLessons = karmicLessons.values.length;
    return { value: 9 - numLessons };
  },

  interpret(result, system) {
    const meanings = {
      9: { text: 'With a Subconscious Self of 9, you have no karmic lessons — all nine numbers are present in your name. This gives you an exceptionally broad foundation of inner strength. You can draw on any quality when under pressure, making you remarkably resilient and capable in emergencies.', keywords: ['resilience', 'completeness', 'versatility', 'strength'] },
      8: { text: 'A Subconscious Self of 8 indicates strong inner reserves. Only one number is missing from your name, giving you a nearly complete set of coping strategies. You handle stress and unexpected challenges with confidence and competence.', keywords: ['confidence', 'competence', 'inner reserves'] },
      7: { text: 'A Subconscious Self of 7 gives you solid inner strength with two areas requiring conscious development. In most situations you respond capably, drawing on a deep well of experience and ability.', keywords: ['capability', 'depth', 'inner strength'] },
      6: { text: 'A Subconscious Self of 6 provides a balanced foundation of inner resources. Three numbers are absent, meaning you have specific growth areas, but overall you possess enough diversity of strength to navigate most challenges.', keywords: ['balance', 'growth', 'capability'] },
      5: { text: 'A Subconscious Self of 5 suggests moderate inner reserves with four areas needing development. You are adaptable but may feel uncertain in unfamiliar situations. Building skills in your weak areas strengthens your overall resilience.', keywords: ['adaptability', 'development', 'growth areas'] },
      4: { text: 'A Subconscious Self of 4 indicates that five numbers are missing from your name, suggesting significant areas for growth. You may feel overwhelmed in emergencies but can build strength through conscious practice of your weaker qualities.', keywords: ['growth opportunity', 'development', 'building strength'] },
      3: { text: 'A Subconscious Self of 3 suggests you have many areas requiring development. You may feel uncertain or scattered under pressure. Focus on building core competencies in your karmic lesson areas to strengthen your inner foundation.', keywords: ['development needed', 'focus', 'building foundation'] },
    };

    const m = meanings[result.value] || { text: `Subconscious Self of ${result.value}: indicates the number of strengths readily available to you.`, keywords: ['inner strength'] };
    return {
      entries: [{
        value: result.value,
        text: m.text,
        sources: [{ book: 'Complete Guide Vol 1', page: 48 }],
        keywords: m.keywords
      }]
    };
  },

  describe() {
    return {
      explanation: {
        en: 'The Subconscious Self reveals the depth of your inner strength and your instinctive response to emergencies. It represents how many different types of energy you can naturally draw upon when under pressure.',
        ro: 'Sinele Subconștient dezvăluie profunzimea forței tale interioare și răspunsul tău instinctiv în situații de urgență. Reprezintă câte tipuri diferite de energie poți accesa natural când ești sub presiune.'
      },
      howCalculated: {
        en: 'Subtract the number of Karmic Lessons (missing numbers in your name) from 9. The higher the number, the more inner resources you have available.',
        ro: 'Se scade numărul de Lecții Karmice (numere lipsă din nume) din 9. Cu cât numărul este mai mare, cu atât ai mai multe resurse interioare disponibile.'
      }
    };
  }
};
