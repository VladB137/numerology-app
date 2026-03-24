import { letterValue } from '../../../data/letter-values.js';

/**
 * Chaldean Compound Number — the unreduced name total in Chaldean system.
 * Two-digit compound numbers (10-52) have special meanings in Chaldean numerology.
 */
export default {
  id: 'chaldean-compound',
  name: { en: 'Chaldean Compound', ro: 'Număr Compus Caldean' },
  category: 'special',
  systems: ['chaldean'],
  inputRequires: ['fullName'],
  dependsOn: [],
  resultType: 'single',

  calculate(input, system, resolved) {
    let total = 0;
    for (const ch of input.fullName) {
      if (ch === ' ') continue;
      total += letterValue(ch, 'chaldean');
    }
    // Return the unreduced two-digit compound number
    // If already single digit, return as-is (no compound meaning)
    return { value: total };
  },

  interpret(result, system) {
    const compounds = {
      10: { text: 'The Wheel of Fortune. A number of rise and fall, honor and success. It is a fortunate number if preceded by self-discipline.', keywords: ['fortune', 'cycles', 'success'] },
      11: { text: 'Hidden dangers, trials, and treachery from others. But also spiritual insight and intuitive power if used wisely.', keywords: ['hidden dangers', 'intuition', 'trials'] },
      12: { text: 'The Sacrifice. Anxiety and suffering through others. The need to sacrifice personal desires for a higher purpose.', keywords: ['sacrifice', 'service', 'anxiety'] },
      13: { text: 'Change and upheaval. Power to transform, but also the risk of misusing that power. Hard work and discipline are required.', keywords: ['transformation', 'power', 'change'] },
      14: { text: 'Movement, change, and communication. Risk of financial loss through speculation. Good for dealing with the public.', keywords: ['movement', 'communication', 'risk'] },
      15: { text: 'A number of magic and mystery. Strong material and emotional attractions. Eloquence and gift of speech.', keywords: ['magic', 'eloquence', 'attraction'] },
      16: { text: 'The Shattered Citadel. Plans may collapse; events are strange. Spiritual growth through letting go of ego and material attachments.', keywords: ['upheaval', 'spiritual growth', 'ego'] },
      17: { text: 'The Star of the Magi. Spiritual and material success through peace, intuition, and inner strength. Highly fortunate.', keywords: ['spiritual success', 'peace', 'fortune'] },
      18: { text: 'Conflict, deception, and bitter quarrels. Family and friend disputes. Watch for betrayal and hidden enemies.', keywords: ['conflict', 'deception', 'caution'] },
      19: { text: 'The Prince of Heaven. Success, happiness, and honor. One of the most fortunate compound numbers, promising fulfillment.', keywords: ['success', 'happiness', 'fulfillment'] },
      20: { text: 'Awakening. A call to action for a higher purpose. Delay in plans but eventual success through faith and determination.', keywords: ['awakening', 'faith', 'purpose'] },
      21: { text: 'The Crown of the Magi. Advancement, success, and achievement. A number of victory after long effort.', keywords: ['advancement', 'victory', 'achievement'] },
      22: { text: 'Illusion and delusion. Good plans often fall victim to the foolishness of others. Caution and careful judgment are essential.', keywords: ['illusion', 'caution', 'judgment'] },
      23: { text: 'The Royal Star of the Lion. Promise of success, help from superiors, and protection. One of the most fortunate numbers.', keywords: ['royal fortune', 'success', 'protection'] },
      24: { text: 'Love, money, and creativity. Help from associates and those in authority. Favorable for partnerships and creative ventures.', keywords: ['love', 'creativity', 'partnership'] },
      25: { text: 'Strength gained through experience and observation of others. Learning through trial and wisdom gained from past mistakes.', keywords: ['experience', 'wisdom', 'learning'] },
      26: { text: 'Partnerships may bring unforeseen catastrophe. Caution in business dealings. Unexpected changes in plans.', keywords: ['partnerships', 'caution', 'change'] },
      27: { text: 'The Sceptre. Command, authority, and a strong mind that rewards the diligent. Favorable for positions of leadership.', keywords: ['authority', 'command', 'leadership'] },
    };

    const v = result.value;
    if (v < 10) {
      return { entries: [{ value: v, text: 'Single-digit total — no compound number meaning applies. See Expression number for interpretation.', sources: [{ book: 'Chaldean Numerology for Beginners', page: 35 }], keywords: ['single digit'] }] };
    }

    const m = compounds[v];
    if (m) {
      return { entries: [{ value: v, text: `Compound Number ${v}: ${m.text}`, sources: [{ book: 'Chaldean Numerology for Beginners', page: 35 }], keywords: m.keywords }] };
    }

    return { entries: [{ value: v, text: `Compound Number ${v}: A number beyond the standard compound interpretations. Its meaning combines the energies of its constituent digits.`, sources: [{ book: 'Chaldean Numerology for Beginners', page: 35 }], keywords: ['compound', 'combined energy'] }] };
  },

  describe() {
    return {
      explanation: {
        en: 'In the Chaldean system, the unreduced total of your name has special meaning as a Compound Number. These two-digit numbers (10-52) carry symbolic and mystical interpretations that add depth to the single-digit reading.',
        ro: 'În sistemul Caldean, totalul neredus al numelui tău are o semnificație specială ca Număr Compus. Aceste numere cu două cifre (10-52) poartă interpretări simbolice care adaugă profunzime lecturii.'
      },
      howCalculated: {
        en: 'Sum all letter values in your full birth name using Chaldean values. The two-digit total before final reduction is your Compound Number.',
        ro: 'Se adună toate valorile literelor din numele complet folosind valorile Caldeane. Totalul cu două cifre de dinaintea reducerii finale este Numărul Compus.'
      }
    };
  }
};
