import { queryPakistaniLaw } from '../src/lib/legalEngine';

const testCases = [
  {
    query: 'WhatsApp par koi blackmail kar raha hai, kya karein?',
    expectedLawId: 'peca-24-cyber-stalking',
    category: 'Cybercrime / Blackmail'
  },
  {
    query: 'Police meri FIR darj karne se inkar kar rahi hai SHO nahi sun raha',
    expectedLawId: 'crpc-22a-justice-of-peace',
    category: 'Police Refusal / 22-A Justice of Peace'
  },
  {
    query: 'Shohar kharcha nahi de raha, bachon ka kanooni kharcha kaise milega?',
    expectedLawId: 'mflo-9-maintenance-kharcha',
    category: 'Maintenance / Kharcha'
  },
  {
    query: 'Mujhe shoher se khula leni hai aur saman jahez wapis chahiye',
    expectedLawId: 'mflo-8-khula-divorce',
    category: 'Khula / Dowry'
  },
  {
    query: 'Kisi ne mujhe check dia tha wo bank mein bounce ho gaya hai',
    expectedLawId: 'ppc-489f-cheque-bounce',
    category: 'Cheque Bounce 489-F'
  },
  {
    query: 'Makan malik bina adalti notice ke saman bahar phenk raha hai',
    expectedLawId: 'rent-eviction-rights',
    category: 'Tenancy / Eviction'
  },
  {
    query: 'Mere sath 420 ka fraud hua hai paise le kar bhaag gaya',
    expectedLawId: 'ppc-420-cheating-fraud',
    category: 'Fraud / 420'
  },
  {
    query: 'Walid sahab faut ho gaye hain bank account se paise nikalwane ke liye NADRA succession certificate kaise banega?',
    expectedLawId: 'inheritance-nadra-succession-act',
    category: 'Inheritance / NADRA'
  },
  {
    query: 'Company ne bina notice ke achanak naukri se nikal dia gratuity ka kya banega?',
    expectedLawId: 'labor-standing-orders-termination',
    category: 'Labor / Job Termination'
  },
  {
    query: 'Dukandar ne kharab mobile becha aur paise wapis nahi kar raha',
    expectedLawId: 'consumer-protection-defective-goods',
    category: 'Consumer Court / Defective Product'
  },
  {
    query: 'واٹس ایپ پر کوئی بلیک میل کر رہا ہے کیا کریں؟',
    expectedLawId: 'peca-24-cyber-stalking',
    category: 'Urdu Script: WhatsApp Blackmail'
  },
  {
    query: 'شوہر خرچہ نہیں دے رہا فیملی کورٹ میں نان نفقہ کا دعویٰ',
    expectedLawId: 'mflo-9-maintenance-kharcha',
    category: 'Urdu Script: Kharcha'
  },
  {
    query: 'Someone is blackmailing me on WhatsApp threatening to leak photos',
    expectedLawId: 'peca-24-cyber-stalking',
    category: 'English: WhatsApp Blackmail'
  },
  {
    query: 'Aaj Lahore ka mausam kaisa hai?',
    expectedFound: false,
    category: 'Irrelevant Query: Fallback Check'
  },
  {
    query: 'Biryani banane ka asaan tareeqa batao',
    expectedFound: false,
    category: 'Irrelevant Query: Fallback Check'
  }
];

let passed = 0;
let failed = 0;

console.log('--- RUNNING LEGAL QUERY MATCHING TESTS ---');

for (const tc of testCases) {
  const result = queryPakistaniLaw(tc.query);
  if (tc.expectedFound === false) {
    if (!result.found) {
      console.log(`[PASS] ${tc.category} -> Correctly fell back to unverified disclaimer.`);
      passed++;
    } else {
      console.error(`[FAIL] ${tc.category} -> Expected fallback, but matched ${result.primaryLaw?.id}`);
      failed++;
    }
  } else {
    if (result.found && result.primaryLaw?.id === tc.expectedLawId) {
      console.log(`[PASS] ${tc.category} -> Matched ${result.primaryLaw?.id} (${result.citations[0]?.sectionOrArticle})`);
      passed++;
    } else {
      console.error(`[FAIL] ${tc.category} -> Expected ${tc.expectedLawId}, got ${result.found ? result.primaryLaw?.id : 'NOT FOUND'}`);
      failed++;
    }
  }
}

console.log(`\nResults: ${passed} passed, ${failed} failed out of ${testCases.length} tests.`);
if (failed > 0) process.exit(1);
