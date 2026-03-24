import { letterValue } from '../../../data/letter-values.js';

/**
 * Planes of Expression — categorizes all letters into Physical, Mental, Emotional, Intuitive.
 * Reveals the balance of energies in your character.
 */

// Letter classification by plane (Pythagorean standard)
const PLANES = {
  // Physical: D, E, M, W
  D: 'physical', E: 'physical', M: 'physical', W: 'physical',
  // Mental: A, G, H, J, L, N, P
  A: 'mental', G: 'mental', H: 'mental', J: 'mental', L: 'mental', N: 'mental', P: 'mental',
  // Emotional: B, I, O, R, S, T, X, Z
  B: 'emotional', I: 'emotional', O: 'emotional', R: 'emotional', S: 'emotional', T: 'emotional', X: 'emotional', Z: 'emotional',
  // Intuitive: C, F, K, Q, U, V, Y
  C: 'intuitive', F: 'intuitive', K: 'intuitive', Q: 'intuitive', U: 'intuitive', V: 'intuitive', Y: 'intuitive',
};

export default {
  id: 'planes-of-expression',
  name: { en: 'Planes of Expression', ro: 'Planurile Expresiei' },
  category: 'name',
  systems: ['pythagorean'],
  inputRequires: ['fullName'],
  dependsOn: [],
  resultType: 'table',

  calculate(input, system, resolved) {
    const counts = { physical: 0, mental: 0, emotional: 0, intuitive: 0 };
    for (const ch of input.fullName) {
      if (ch === ' ') continue;
      const plane = PLANES[ch];
      if (plane) counts[plane]++;
    }
    return { table: counts };
  },

  interpret(result, system) {
    const total = Object.values(result.table).reduce((s, v) => s + v, 0);
    const dominant = Object.entries(result.table).sort((a, b) => b[1] - a[1])[0];
    const weak = Object.entries(result.table).sort((a, b) => a[1] - b[1])[0];

    const planeDescs = {
      physical: 'practical action, material concerns, and bodily awareness',
      mental: 'thought, analysis, logic, and intellectual pursuits',
      emotional: 'feelings, relationships, sensitivity, and artistic expression',
      intuitive: 'inner knowing, spiritual awareness, and creative vision',
    };

    let text = `Your dominant plane is ${dominant[0]} (${dominant[1]} of ${total} letters), emphasizing ${planeDescs[dominant[0]]}. `;
    if (weak[1] === 0) {
      text += `Your ${weak[0]} plane has no letters, suggesting this area requires conscious development.`;
    } else {
      text += `Your ${weak[0]} plane is least represented (${weak[1]} letters), an area for growth.`;
    }

    return {
      entries: [{
        value: dominant[0],
        text,
        sources: [{ book: 'Complete Guide Vol 1', page: 48 }],
        keywords: [dominant[0], 'balance', 'character', 'expression']
      }]
    };
  },

  describe() {
    return {
      explanation: {
        en: 'The Planes of Expression categorize every letter of your name into four planes: Physical (action), Mental (thought), Emotional (feeling), and Intuitive (inner knowing). The distribution reveals which energies dominate your character.',
        ro: 'Planurile Expresiei clasifică fiecare literă a numelui în patru planuri: Fizic (acțiune), Mental (gândire), Emoțional (simțire) și Intuitiv (cunoaștere interioară). Distribuția arată ce energii domină caracterul tău.'
      },
      howCalculated: {
        en: 'Each letter of the alphabet is assigned to one of four planes. Count how many letters in your name fall on each plane: Physical (D,E,M,W), Mental (A,G,H,J,L,N,P), Emotional (B,I,O,R,S,T,X,Z), Intuitive (C,F,K,Q,U,V,Y).',
        ro: 'Fiecare literă a alfabetului este atribuită unuia dintre cele patru planuri. Se numără câte litere din numele tău se află pe fiecare plan: Fizic (D,E,M,W), Mental (A,G,H,J,L,N,P), Emoțional (B,I,O,R,S,T,X,Z), Intuitiv (C,F,K,Q,U,V,Y).'
      }
    };
  }
};
