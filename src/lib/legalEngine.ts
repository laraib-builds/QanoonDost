import { PAKISTAN_STATUTORY_DATABASE, EMERGENCY_HELPLINES } from './pakistanLawDatabase';
import { LegalQueryResult, LawEntry, StatutoryCitation } from '@/types/law';

export function detectLanguage(text: string): 'roman_urdu' | 'urdu' | 'english' {
  const urduCharCount = (text.match(/[\u0600-\u06FF]/g) || []).length;
  if (urduCharCount > text.length * 0.25) {
    return 'urdu';
  }

  const lower = text.toLowerCase();
  const romanUrduMarkers = [
    'kya', 'hai', 'hain', 'kaise', 'tareeqa', 'nhi', 'nahi', 'mujhe', 'mera', 'meri',
    'shoher', 'biwi', 'bachon', 'bacha', 'hisaab', 'wirasat', 'kirayedar', 'thana',
    'paise', 'bhai', 'karwaye', 'chahiye', 'karna', 'kren', 'hoga', 'wali', 'wala',
    'nikal', 'dhoka', 'darj', 'police', 'check', 'cheque', 'makan', 'aurat', 'jaidad'
  ];
  const markerCount = romanUrduMarkers.filter(m => lower.includes(m)).length;
  if (markerCount >= 1) {
    return 'roman_urdu';
  }

  return 'english';
}

export function queryPakistaniLaw(query: string): LegalQueryResult {
  const cleanQuery = query.trim().toLowerCase();
  const lang = detectLanguage(query);

  if (!cleanQuery) {
    return {
      found: false,
      userQuery: query,
      languageDetected: lang,
      relatedLaws: [],
      citations: [],
      laymanAnswerRomanUrdu: 'Baraye meherbani apna kanooni sawal type karein ya mic par bolein.',
      laymanAnswerUrdu: 'براہ کرم اپنا قانونی سوال تحریر فرمائیں یا مائیک پر بولیں۔',
      laymanAnswerEnglish: 'Please describe your legal query or speak using the mic.',
      practicalRoadmapRomanUrdu: [],
      practicalRoadmapUrdu: [],
      practicalRoadmapEnglish: [],
      authoritiesToVisitRomanUrdu: [],
      authoritiesToVisitUrdu: [],
      authoritiesToVisitEnglish: []
    };
  }

  // Score each law entry
  const scoredLaws: { law: LawEntry; score: number }[] = [];

  for (const law of PAKISTAN_STATUTORY_DATABASE) {
    let score = 0;

    // Check Roman Urdu keywords
    for (const rk of law.keywordsRomanUrdu) {
      if (cleanQuery.includes(rk.toLowerCase())) {
        score += 8;
      }
    }

    // Check Urdu keywords
    for (const uk of law.keywordsUrdu) {
      if (cleanQuery.includes(uk.toLowerCase())) {
        score += 8;
      }
    }

    // Check English keywords
    for (const ek of law.keywordsEnglish) {
      if (cleanQuery.includes(ek.toLowerCase())) {
        score += 7;
      }
    }

    // Title / citation matches
    if (law.titleRomanUrdu.toLowerCase().includes(cleanQuery)) score += 15;
    if (law.titleUrdu.toLowerCase().includes(cleanQuery)) score += 15;
    if (law.titleEnglish.toLowerCase().includes(cleanQuery)) score += 15;
    if (cleanQuery.includes(law.citation.sectionOrArticle.toLowerCase())) score += 20;

    if (score > 0) {
      scoredLaws.push({ law, score });
    }
  }

  scoredLaws.sort((a, b) => b.score - a.score);

  // If score is 0 or low -> EXPLICIT UNVERIFIED / NOT FOUND
  if (scoredLaws.length === 0 || scoredLaws[0].score < 5) {
    return {
      found: false,
      userQuery: query,
      languageDetected: lang,
      relatedLaws: [],
      citations: [],
      laymanAnswerRomanUrdu: 'Maaf kijiye ga, is maamlay par Pakistan ke maroojah kanoon mein koi confirmed dhara ya section nahi mila.',
      laymanAnswerUrdu: 'معاف کیجئے گا، اس معاملے پر پاکستان کے مروجہ قوانین میں کوئی تصدیق شدہ شق یا قطعی حوالہ نہیں ملا۔',
      laymanAnswerEnglish: 'No verified statutory citation or direct legal provision could be identified for this query in Pakistani law.',
      unverifiedDisclaimerRomanUrdu: '⚠️ Kanooni Notice: QanoonDost farzi ya man-gharat kanooni mashwara nahi deta. Chunkay is sawal par Pakistani kanoon mein koi confirmed dhara nahi mili, is liye baraye meherbani District Bar ke licensed advocate se rabta karein.',
      unverifiedDisclaimerUrdu: '⚠️ قانونی انتباہ: چونکہ اس سوال کا تصدیق شدہ حوالہ نہیں ملا، اس لیے کسی لائسنس یافتہ ایڈووکیٹ سے رجوع کریں۔',
      unverifiedDisclaimerEnglish: '⚠️ Legal Alert: We refuse to fabricate legal opinions without citations. Please consult an enrolled Advocate.',
      practicalRoadmapRomanUrdu: [
        'Apni qareebi District Kachehri mein Bar Association Legal Aid Desk par jayein.',
        'Agar aap mustahiq hain to Legal Aid Helpline 0800-70806 par muft kanooni madad lein.',
        'Kisi bhi ghair-tasdeeq shuda agent ko kanooni mashwaray ki raqam na dein.'
      ],
      practicalRoadmapUrdu: [
        'قریبی ڈسٹرکٹ کورٹ بار ایسوسی ایشن میں لیگل ایڈ ڈیسک سے رابطہ کریں۔',
        'لیگل ایڈ سوسائٹی ہیلپ لائن 0800-70806 پر کال کریں۔'
      ],
      practicalRoadmapEnglish: [
        'Visit District Bar Association Legal Aid Desk.',
        'Call toll-free Legal Aid Society at 0800-70806.'
      ],
      authoritiesToVisitRomanUrdu: ['District Bar Association / High Court Bar'],
      authoritiesToVisitUrdu: ['ڈسٹرکٹ بار ایسوسی ایشن'],
      authoritiesToVisitEnglish: ['District Bar Association']
    };
  }

  const primary = scoredLaws[0].law;
  const related = scoredLaws.slice(1, 3).map(s => s.law);
  const citations: StatutoryCitation[] = [primary.citation, ...related.map(r => r.citation)];

  // Match emergency helpline if relevant
  let matchedHelpline = undefined;
  if (primary.helpline) {
    const foundHl = EMERGENCY_HELPLINES.find(h => h.number === primary.helpline);
    if (foundHl) {
      matchedHelpline = {
        name: foundHl.nameRomanUrdu,
        number: foundHl.number,
        description: foundHl.descriptionRomanUrdu
      };
    }
  }

  return {
    found: true,
    userQuery: query,
    languageDetected: lang,
    category: primary.category,
    primaryLaw: primary,
    relatedLaws: related,
    citations,
    laymanAnswerRomanUrdu: primary.summaryRomanUrdu,
    laymanAnswerUrdu: primary.summaryUrdu,
    laymanAnswerEnglish: primary.summaryEnglish,
    practicalRoadmapRomanUrdu: primary.actionStepsRomanUrdu,
    practicalRoadmapUrdu: primary.actionStepsUrdu,
    practicalRoadmapEnglish: primary.actionStepsEnglish,
    authoritiesToVisitRomanUrdu: [primary.authorityRomanUrdu],
    authoritiesToVisitUrdu: [primary.authorityUrdu],
    authoritiesToVisitEnglish: [primary.authorityEnglish],
    emergencyHelpline: matchedHelpline
  };
}
