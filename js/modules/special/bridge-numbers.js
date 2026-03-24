/**
 * Bridge Numbers — differences between core numbers.
 * Reveals how to reconcile conflicting aspects of your personality.
 */
export default {
  id: 'bridge-numbers',
  name: { en: 'Bridge Numbers', ro: 'Numere Punte' },
  category: 'special',
  systems: ['pythagorean', 'chaldean'],
  inputRequires: ['birthdate', 'fullName'],
  dependsOn: ['life-path', 'expression', 'soul-urge', 'personality'],
  resultType: 'list',

  calculate(input, system, resolved) {
    const pairs = [
      ['life-path', 'expression'],
      ['soul-urge', 'personality'],
      ['life-path', 'soul-urge'],
    ];
    const values = [];
    for (const [a, b] of pairs) {
      if (resolved[a] && resolved[b]) {
        const va = resolved[a].value > 9 ? resolved[a].value % 10 || 9 : resolved[a].value;
        const vb = resolved[b].value > 9 ? resolved[b].value % 10 || 9 : resolved[b].value;
        values.push(Math.abs(va - vb));
      }
    }
    return { values };
  },

  interpret(result, system) {
    const advice = {
      0: 'No bridge needed — these aspects are naturally harmonious.',
      1: 'Be more independent and assertive. Trust your own judgment more.',
      2: 'Be more considerate and patient. Listen more and cooperate.',
      3: 'Express yourself more openly. Use creativity to bridge the gap.',
      4: 'Get more organized and disciplined. Build practical habits.',
      5: 'Embrace change and be more flexible. Try new approaches.',
      6: 'Take more responsibility in relationships. Open your heart.',
      7: 'Spend more time in reflection and analysis. Seek inner truth.',
      8: 'Focus on practical achievement. Set clear goals and pursue them.',
    };
    const labels = ['Life Path ↔ Expression', 'Soul Urge ↔ Personality', 'Life Path ↔ Soul Urge'];
    return {
      entries: result.values.map((v, i) => ({
        value: v,
        text: `${labels[i]}: Bridge ${v}. ${advice[v] || 'Work on integrating these aspects.'}`,
        sources: [{ book: 'Complete Guide Vol 1', page: 48 }],
        keywords: ['bridge', 'integration', 'harmony']
      }))
    };
  },

  describe() {
    return {
      explanation: {
        en: 'Bridge Numbers reveal the gap between key aspects of your numerology profile. Each bridge suggests specific actions to reconcile seemingly conflicting energies in your character.',
        ro: 'Numerele Punte dezvăluie diferența dintre aspectele cheie ale profilului tău numerologic. Fiecare punte sugerează acțiuni specifice pentru reconcilierea energiilor aparent conflictuale.'
      },
      howCalculated: {
        en: 'Calculate the absolute difference between pairs of core numbers: Life Path & Expression, Soul Urge & Personality, Life Path & Soul Urge.',
        ro: 'Se calculează diferența absolută între perechile de numere de bază: Calea Vieții și Expresia, Dorința Sufletului și Personalitatea, Calea Vieții și Dorința Sufletului.'
      }
    };
  }
};
