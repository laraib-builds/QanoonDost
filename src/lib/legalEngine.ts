import { PAKISTAN_STATUTORY_DATABASE, EMERGENCY_HELPLINES } from './pakistanLawDatabase';
import { LegalQueryResult, LawEntry, StatutoryCitation } from '@/types/law';

// Conversational stop words / fillers across English, Roman Urdu, and Urdu script
const STOPWORDS = new Set([
  // Roman Urdu fillers
  'kya', 'karein', 'karen', 'karna', 'karo', 'karta', 'karte', 'karti',
  'hai', 'hain', 'ho', 'hoga', 'hogi', 'hoge', 'hona', 'hue', 'hui', 'hua',
  'par', 'pe', 'mein', 'men', 'se', 'ko', 'ka', 'ki', 'ke', 'k',
  'koi', 'raha', 'rahi', 'rahe', 'rha', 'rhi', 'rhe',
  'mujhe', 'mera', 'meri', 'mere', 'apna', 'apni', 'apne', 'hum', 'humein',
  'batao', 'batayein', 'bataen', 'batana', 'bataiye', 'pata', 'chahiye',
  'sakta', 'sakti', 'sakte', 'skta', 'skti', 'skte',
  'tha', 'thi', 'the', 'agr', 'agar', 'to', 'aur', 'bhi', 'sirf',
  'kyun', 'kyon', 'kab', 'kahan', 'kisi', 'kis', 'kisko', 'kisse',
  'unka', 'unki', 'unke', 'iska', 'iski', 'iske', 'inhe', 'unhe',
  'bolein', 'bol', 'likhein', 'jaise', 'kuch', 'ab', 'jab', 'tab',
  'wala', 'wali', 'wale', 'bhai', 'sahib', 'janab', 'dein', 'dena', 'diya',
  'kare', 'kar', 'keh', 'rahega', 'chahiye', 'hmary', 'hmara',

  // English fillers
  'what', 'how', 'to', 'is', 'are', 'am', 'was', 'were', 'do', 'does', 'did',
  'can', 'could', 'should', 'would', 'will', 'shall', 'may', 'might',
  'someone', 'somebody', 'anyone', 'anybody', 'everyone', 'nobody',
  'my', 'me', 'i', 'you', 'your', 'we', 'our', 'he', 'she', 'it', 'they', 'them',
  'the', 'a', 'an', 'in', 'on', 'at', 'for', 'from', 'with', 'about', 'against',
  'if', 'then', 'please', 'tell', 'help', 'want', 'need', 'doing', 'saying', 'there',

  // Urdu script fillers
  'کیا', 'کریں', 'کرنا', 'کرو', 'کرتا', 'کرتی', 'کرتے',
  'ہے', 'ہیں', 'ہو', 'ہوگا', 'ہوگی', 'ہوگے', 'ہوا', 'ہوئی', 'ہوئے',
  'پر', 'پہ', 'میں', 'سے', 'کو', 'کا', 'کی', 'کے',
  'کوئی', 'رہا', 'رہی', 'رہے',
  'مجھے', 'میرا', 'میری', 'میرے', 'اپنا', 'اپنی', 'اپنے', 'ہم', 'ہمیں',
  'بتاؤ', 'بتائیں', 'بتانا', 'چاہئے', 'چاہیے',
  'سکتا', 'سکتی', 'سکتے', 'تھا', 'تھی', 'تھے',
  'اگر', 'تو', 'اور', 'بھی', 'صرف', 'کیوں', 'کب', 'کہاں', 'کس', 'کسے',
  'اسکا', 'اسکی', 'اسکے', 'انکا', 'انکی', 'انکے', 'کچھ', 'اب', 'جب', 'تب'
]);

// Stem and synonym normalization map
const SYNONYM_STEMS: Record<string, string> = {
  // Blackmail & Cybercrime
  blackmail: 'blackmail',
  blackmailing: 'blackmail',
  blackmailer: 'blackmail',
  blackmaild: 'blackmail',
  بلیک: 'blackmail',
  بلیکمیل: 'blackmail',
  بلیکمیلنگ: 'blackmail',

  whatsapp: 'whatsapp',
  watsapp: 'whatsapp',
  whatsap: 'whatsapp',
  whtsapp: 'whatsapp',
  واٹس: 'whatsapp',
  واٹسایپ: 'whatsapp',

  harass: 'harass',
  harassment: 'harass',
  harassing: 'harass',
  harras: 'harass',
  harrassment: 'harass',
  tang: 'harass',
  pareshan: 'harass',
  ہراساں: 'harass',
  ہراسانی: 'harass',
  stalking: 'harass',

  tasweer: 'cyber_media',
  tasveer: 'cyber_media',
  photo: 'cyber_media',
  video: 'cyber_media',
  recording: 'cyber_media',
  تصویر: 'cyber_media',
  ویڈیو: 'cyber_media',
  leak: 'cyber_media',
  leaked: 'cyber_media',
  viral: 'cyber_media',
  وائرل: 'cyber_media',

  peca: 'peca',
  fia: 'fia',
  پیکا: 'peca',

  // FIR & Police
  fir: 'fir',
  'f.i.r': 'fir',
  ایف: 'fir',
  درج: 'fir',
  darj: 'fir',
  daraj: 'fir',
  indraj: 'fir',
  katwana: 'fir',
  اندراج: 'fir',
  report: 'fir',

  police: 'police',
  thana: 'police',
  thanah: 'police',
  sho: 'police',
  moharar: 'police',
  muharrar: 'police',
  پولیس: 'police',
  تھانہ: 'police',

  inkar: 'police_refusal',
  mana: 'police_refusal',
  refuse: 'police_refusal',
  refused: 'police_refusal',
  refusal: 'police_refusal',
  انکار: 'police_refusal',

  '22a': 'crpc22a',
  '22-a': 'crpc22a',
  justice: 'crpc22a',

  // Maintenance & Kharcha
  kharcha: 'kharcha',
  kharch: 'kharcha',
  kharche: 'kharcha',
  kharchay: 'kharcha',
  خرچہ: 'kharcha',
  nafqa: 'kharcha',
  nafqah: 'kharcha',
  maintenance: 'kharcha',
  support: 'kharcha',
  نفقہ: 'kharcha',

  biwi: 'wife',
  wife: 'wife',
  aurat: 'wife',
  khatoon: 'wife',
  بیوی: 'wife',

  bachon: 'children',
  bacha: 'children',
  bachay: 'children',
  children: 'children',
  child: 'children',
  بچوں: 'children',
  بچے: 'children',

  shohar: 'husband',
  shoher: 'husband',
  husband: 'husband',
  شوہر: 'husband',

  // Khula & Divorce
  khula: 'khula',
  khulaa: 'khula',
  خلع: 'khula',
  talaq: 'talaq',
  talak: 'talaq',
  divorce: 'talaq',
  طلاق: 'talaq',
  separation: 'khula',
  tanseekh: 'khula',
  تنسیخ: 'khula',

  jahez: 'dowry',
  jaheez: 'dowry',
  dowry: 'dowry',
  جہیز: 'dowry',

  // Cheque bounce
  cheque: 'cheque',
  check: 'cheque',
  chek: 'cheque',
  چیک: 'cheque',
  bounce: 'bounce',
  bounced: 'bounce',
  باؤنس: 'bounce',
  dishonor: 'bounce',
  dishonour: 'bounce',
  dishonored: 'bounce',
  '489f': 'ppc489f',
  '489-f': 'ppc489f',

  // Tenancy & Landlord
  kirayedar: 'tenant',
  kerayedar: 'tenant',
  kirayedaar: 'tenant',
  tenant: 'tenant',
  کرایہ: 'tenant',
  کرائے: 'tenant',
  کرایہدار: 'tenant',
  kiraya: 'rent',
  rent: 'rent',

  malik: 'landlord',
  landlord: 'landlord',
  مالک: 'landlord',

  eviction: 'eviction',
  nikalna: 'eviction',
  tala: 'eviction',
  بیدخل: 'eviction',

  // Fraud 420
  fraud: 'fraud',
  dhoka: 'fraud',
  dhokha: 'fraud',
  scam: 'fraud',
  scammer: 'fraud',
  fareb: 'fraud',
  fareeb: 'fraud',
  فراڈ: 'fraud',
  دھوکہ: 'fraud',
  '420': 'ppc420',

  // Inheritance & NADRA
  wirasat: 'inheritance',
  warasat: 'inheritance',
  wirasaat: 'inheritance',
  inheritance: 'inheritance',
  succession: 'inheritance',
  وراثت: 'inheritance',
  سکسیشن: 'inheritance',
  waris: 'heir',
  warisan: 'heir',
  وارث: 'heir',
  marhoom: 'deceased',
  faut: 'deceased',
  مرحوم: 'deceased',
  nadra: 'nadra',
  نادرا: 'nadra',

  // Labor / Employment
  naukri: 'employment',
  job: 'employment',
  mulazmat: 'employment',
  نوکری: 'employment',
  ملازمت: 'employment',
  fired: 'termination',
  firing: 'termination',
  termination: 'termination',
  terminated: 'termination',
  barkhast: 'termination',
  برطرف: 'termination',
  gratuity: 'gratuity',
  گریجویٹی: 'gratuity',
  salary: 'salary',
  tankhwah: 'salary',
  تنخواہ: 'salary',

  // Consumer Protection
  kharab: 'defective',
  naqis: 'defective',
  defective: 'defective',
  faulty: 'defective',
  خراب: 'defective',
  ناقص: 'defective',
  dukandar: 'shopkeeper',
  shopkeeper: 'shopkeeper',
  دکاندار: 'shopkeeper',
  consumer: 'consumer',
  کنزیومر: 'consumer',
  warranty: 'warranty',
  وارنٹی: 'warranty'
};

// Map each law to essential semantic trigger stems
const LAW_ESSENTIAL_STEMS: Record<string, string[]> = {
  'peca-24-cyber-stalking': ['blackmail', 'whatsapp', 'harass', 'cyber_media', 'peca', 'fia'],
  'crpc-154-fir': ['fir', 'police'],
  'crpc-22a-justice-of-peace': ['crpc22a', 'police_refusal', 'fir', 'police'],
  'mflo-9-maintenance-kharcha': ['kharcha', 'wife', 'children', 'husband'],
  'mflo-8-khula-divorce': ['khula', 'talaq', 'dowry', 'wife'],
  'rent-eviction-rights': ['tenant', 'rent', 'landlord', 'eviction'],
  'ppc-489f-cheque-bounce': ['cheque', 'bounce', 'ppc489f'],
  'ppc-420-cheating-fraud': ['fraud', 'ppc420'],
  'inheritance-nadra-succession-act': ['inheritance', 'heir', 'deceased', 'nadra'],
  'labor-standing-orders-termination': ['employment', 'termination', 'gratuity', 'salary'],
  'consumer-protection-defective-goods': ['defective', 'shopkeeper', 'consumer', 'warranty']
};

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
  const markerCount = romanUrduMarkers.filter((m) => lower.includes(m)).length;
  if (markerCount >= 1) {
    return 'roman_urdu';
  }

  return 'english';
}

/**
 * Normalizes query string:
 * - Lowercases
 * - Strips punctuation (?, ,, ., !, quotes, brackets, slashes, etc.)
 * - Normalizes Urdu characters and spaces
 */
export function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .replace(/[؟،?.,!;:۔()\[\]{}"'\\\/_\-+=*&^%$#@~`|]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Extracts normalized meaningful tokens by stripping common stop words
 */
export function extractMeaningfulTokens(normalizedText: string): string[] {
  const rawWords = normalizedText.split(' ').filter(Boolean);
  const meaningful: string[] = [];

  for (const word of rawWords) {
    if (!STOPWORDS.has(word) && word.length > 1) {
      meaningful.push(word);
    }
  }

  return meaningful;
}

/**
 * Maps a single word to its semantic stem / canonical root
 */
export function getSemanticStem(word: string): string {
  const clean = word.toLowerCase();

  // Direct map check
  if (SYNONYM_STEMS[clean]) {
    return SYNONYM_STEMS[clean];
  }

  // Prefix & root checks
  if (clean.startsWith('blackmail')) return 'blackmail';
  if (clean.startsWith('whatsapp') || clean.startsWith('watsapp')) return 'whatsapp';
  if (clean.startsWith('harass') || clean.startsWith('harras')) return 'harass';
  if (clean.startsWith('kharch')) return 'kharcha';
  if (clean.startsWith('chequ') || clean.startsWith('check')) return 'cheque';
  if (clean.startsWith('bounc')) return 'bounce';
  if (clean.startsWith('kiray') || clean.startsWith('keray')) return 'tenant';
  if (clean.startsWith('wiras') || clean.startsWith('waras')) return 'inheritance';
  if (clean.startsWith('dhok') || clean.startsWith('fraud')) return 'fraud';
  if (clean.startsWith('talaq') || clean.startsWith('talak') || clean.startsWith('divorc')) return 'talaq';
  if (clean.startsWith('khula')) return 'khula';
  if (clean.startsWith('terminat') || clean.startsWith('barkhast')) return 'termination';
  if (clean.startsWith('gratu')) return 'gratuity';
  if (clean.startsWith('consum')) return 'consumer';
  if (clean.startsWith('defect')) return 'defective';
  if (clean.startsWith('dukand') || clean.startsWith('shopkeep')) return 'shopkeeper';

  return clean;
}

export function queryPakistaniLaw(query: string): LegalQueryResult {
  const normalized = normalizeText(query);
  const lang = detectLanguage(query);

  if (!normalized) {
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

  // Tokenize and extract stems
  const tokens = extractMeaningfulTokens(normalized);
  const queryStems = new Set(tokens.map(getSemanticStem));

  // Score each law entry
  const scoredLaws: { law: LawEntry; score: number; matchReasons: string[] }[] = [];

  for (const law of PAKISTAN_STATUTORY_DATABASE) {
    let score = 0;
    const reasons: string[] = [];
    const matchedStems = new Set<string>();

    // 1. Check Essential Stems for this law
    const essentialStems = LAW_ESSENTIAL_STEMS[law.id] || [];
    for (const stem of essentialStems) {
      if (queryStems.has(stem)) {
        score += 18;
        matchedStems.add(stem);
        reasons.push(`essential_stem:${stem}`);
      }
    }

    // 2. Direct Section / Act mention bonus (Strongest legal signal)
    const secOrArticle = law.citation.sectionOrArticle.toLowerCase().replace(/[^a-z0-9]/g, '');
    const cleanNoPunct = normalized.replace(/[^a-z0-9\s]/g, '');
    if (secOrArticle && cleanNoPunct.includes(secOrArticle)) {
      score += 35;
      reasons.push(`exact_section:${secOrArticle}`);
    }

    // Check specific popular section strings
    if (law.id.includes('489f') && (normalized.includes('489') || normalized.includes('489f') || normalized.includes('489-f'))) {
      score += 30;
    }
    if (law.id.includes('154') && (normalized.includes('154') || normalized.includes('crpc 154'))) {
      score += 30;
    }
    if (law.id.includes('22a') && (normalized.includes('22a') || normalized.includes('22-a') || normalized.includes('justice of peace'))) {
      score += 30;
    }
    if (law.id.includes('420') && normalized.includes('420')) {
      score += 30;
    }
    if (law.id.includes('mflo-9') && normalized.includes('section 9')) {
      score += 30;
    }

    // 3. Match database keywords (Roman Urdu, Urdu, English)
    const allKeywords = [
      ...law.keywordsRomanUrdu,
      ...law.keywordsUrdu,
      ...law.keywordsEnglish
    ];

    for (const kw of allKeywords) {
      const normKw = normalizeText(kw);

      // Multi-word phrase exact match
      if (normKw.includes(' ') && normalized.includes(normKw)) {
        score += 20;
        reasons.push(`phrase_match:${normKw}`);
      } else {
        // Single word or stem match
        const kwStem = getSemanticStem(normKw);
        if (queryStems.has(kwStem)) {
          score += 10;
          matchedStems.add(kwStem);
        } else if (tokens.includes(normKw)) {
          score += 8;
        }
      }
    }

    // 4. Synergy & Multi-keyword combination bonus
    // If query has 2 or more distinct core stems from this law
    if (matchedStems.size >= 2) {
      score += 25 * (matchedStems.size - 1);
      reasons.push(`multi_stem_bonus:${matchedStems.size}`);
    }

    // Special category disambiguation:
    // If police refusal is present (e.g. "inkar", "nahi kaat"), favor 22-A over basic 154
    if (law.id === 'crpc-22a-justice-of-peace') {
      if (queryStems.has('police_refusal') && queryStems.has('fir')) {
        score += 30;
      }
    }

    // If cybercrime (WhatsApp + Blackmail / video / photo)
    if (law.id === 'peca-24-cyber-stalking') {
      if (queryStems.has('blackmail') || (queryStems.has('whatsapp') && (queryStems.has('harass') || queryStems.has('cyber_media')))) {
        score += 25;
      }
    }

    if (score > 0) {
      scoredLaws.push({ law, score, matchReasons: reasons });
    }
  }

  // Sort descending by match score
  scoredLaws.sort((a, b) => b.score - a.score);

  // Confidence threshold: at least 15 points required to match a verified statutory provision
  if (scoredLaws.length === 0 || scoredLaws[0].score < 15) {
    return {
      found: false,
      userQuery: query,
      languageDetected: lang,
      relatedLaws: [],
      citations: [],
      laymanAnswerRomanUrdu:
        'Maaf kijiye ga, is maamlay par Pakistan ke maroojah kanoon mein koi confirmed dhara ya section nahi mila.',
      laymanAnswerUrdu:
        'معاف کیجئے گا، اس معاملے پر پاکستان کے مروجہ قوانین میں کوئی تصدیق شدہ شق یا قطعی حوالہ نہیں ملا۔',
      laymanAnswerEnglish:
        'No verified statutory citation or direct legal provision could be identified for this query in Pakistani law.',
      unverifiedDisclaimerRomanUrdu:
        '⚠️ Kanooni Notice: QanoonDost farzi ya man-gharat kanooni mashwara nahi deta. Chunkay is sawal par Pakistani kanoon mein koi confirmed dhara nahi mili, is liye baraye meherbani District Bar ke licensed advocate se rabta karein.',
      unverifiedDisclaimerUrdu:
        '⚠️ قانونی انتباہ: چونکہ اس سوال کا تصدیق شدہ حوالہ نہیں ملا، اس لیے کسی لائسنس یافتہ ایڈووکیٹ سے رجوع کریں۔',
      unverifiedDisclaimerEnglish:
        '⚠️ Legal Alert: We refuse to fabricate legal opinions without citations. Please consult an enrolled Advocate.',
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
  const related = scoredLaws.slice(1, 3).map((s) => s.law);
  const citations: StatutoryCitation[] = [primary.citation, ...related.map((r) => r.citation)];

  // Match emergency helpline if relevant
  let matchedHelpline = undefined;
  if (primary.helpline) {
    const foundHl = EMERGENCY_HELPLINES.find((h) => h.number === primary.helpline);
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
