import { reduceToDigit, digitSum } from '../../../data/reduce.js';
import { letterValue } from '../../../data/letter-values.js';

/**
 * Karmic Debt — checks for specific two-digit numbers (13, 14, 16, 19)
 * that appear in the unreduced forms of core calculations.
 */
const KARMIC_DEBTS = [13, 14, 16, 19];

export default {
  id: 'karmic-debt',
  name: { en: 'Karmic Debt', ro: 'Datorii Karmice' },
  category: 'secondary',
  systems: ['pythagorean', 'chaldean'],
  inputRequires: ['birthdate', 'fullName'],
  dependsOn: [],
  resultType: 'list',

  calculate(input, system, resolved) {
    const found = new Set();

    // Check birthdate day
    const day = input.birthdate.getDate();
    if (KARMIC_DEBTS.includes(day)) found.add(day);

    // Check Life Path intermediate sum
    const d = input.birthdate;
    const month = reduceToDigit(d.getMonth() + 1, true);
    const dayReduced = reduceToDigit(d.getDate(), true);
    const yearDigits = digitSum(d.getFullYear());
    const year = reduceToDigit(yearDigits, true);
    const lpTotal = month + dayReduced + year;
    if (KARMIC_DEBTS.includes(lpTotal)) found.add(lpTotal);

    // Check Expression intermediate sum
    let exprTotal = 0;
    for (const ch of input.fullName) {
      if (ch === ' ') continue;
      exprTotal += letterValue(ch, system);
    }
    if (KARMIC_DEBTS.includes(exprTotal)) found.add(exprTotal);

    // Check Soul Urge intermediate sum
    const VOWELS = new Set(['A', 'E', 'I', 'O', 'U']);
    let suTotal = 0;
    for (const ch of input.fullName) {
      if (ch === ' ') continue;
      if (VOWELS.has(ch)) suTotal += letterValue(ch, system);
    }
    if (KARMIC_DEBTS.includes(suTotal)) found.add(suTotal);

    // Check Personality intermediate sum
    let persTotal = 0;
    for (const ch of input.fullName) {
      if (ch === ' ') continue;
      if (!VOWELS.has(ch)) persTotal += letterValue(ch, system);
    }
    if (KARMIC_DEBTS.includes(persTotal)) found.add(persTotal);

    return { values: [...found].sort((a, b) => a - b) };
  },

  interpret(result, system) {
    const debts = {
      13: { text: 'Karmic Debt 13 (reduces to 4): In a past life, you may have taken shortcuts or avoided hard work. In this life, you are called to develop discipline, persistence, and a strong work ethic. Frustration and the temptation to give up are your tests — overcoming them builds lasting character and achievement.', keywords: ['discipline', 'persistence', 'hard work', 'patience'] },
      14: { text: 'Karmic Debt 14 (reduces to 5): This debt relates to past-life abuse of freedom or the senses. In this life, you must learn modesty, self-control, and the constructive use of freedom. There may be a tendency toward excess, addiction, or instability — the lesson is finding balance between freedom and responsibility.', keywords: ['moderation', 'self-control', 'balance', 'responsibility'] },
      16: { text: 'Karmic Debt 16 (reduces to 7): Known as the "Tower" number, this debt involves the destruction and rebuilding of the ego. Past-life vanity or misuse of love brings lessons of humility and inner transformation. You may experience sudden upheavals that force spiritual growth. The reward is profound wisdom born from genuine humility.', keywords: ['humility', 'transformation', 'ego dissolution', 'spiritual growth'] },
      19: { text: 'Karmic Debt 19 (reduces to 1): This debt relates to past-life selfishness or abuse of power. In this life, you must learn to stand alone while also being considerate of others. Independence is necessary, but so is recognizing that you cannot succeed entirely on your own. The lesson is self-reliance with empathy.', keywords: ['self-reliance', 'empathy', 'humility', 'independence'] },
    };

    if (result.values.length === 0) {
      return { entries: [{ value: 0, text: 'No karmic debts detected in your core numbers. This does not mean an absence of karmic influence, but the specific debts of 13, 14, 16, and 19 do not appear in your unreduced calculations.', sources: [{ book: 'Complete Guide Vol 1', page: 48 }], keywords: ['no debt'] }] };
    }

    return {
      entries: result.values.map(v => ({
        value: v,
        text: debts[v]?.text || `Karmic Debt ${v} detected.`,
        sources: [{ book: 'Complete Guide Vol 1', page: 48 }, { book: 'Phillips — Complete Book of Numerology', page: 16 }],
        keywords: debts[v]?.keywords || []
      }))
    };
  },

  describe() {
    return {
      explanation: {
        en: 'Karmic Debt numbers (13, 14, 16, 19) appear when the unreduced sum of a core calculation passes through one of these specific values. They indicate lessons carried from past lives that must be addressed in this lifetime.',
        ro: 'Numerele Datoriilor Karmice (13, 14, 16, 19) apar când suma neredusă a unui calcul de bază trece prin una din aceste valori specifice. Indică lecții din viețile trecute ce trebuie abordate în această viață.'
      },
      howCalculated: {
        en: 'Check the unreduced intermediate sums of your Life Path, Expression, Soul Urge, Personality, and Birthday calculations for the numbers 13, 14, 16, or 19.',
        ro: 'Se verifică sumele intermediare nereduse ale calculelor Căii Vieții, Expresiei, Dorinței Sufletului, Personalității și Zilei Nașterii pentru numerele 13, 14, 16 sau 19.'
      }
    };
  }
};
