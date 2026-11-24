import { NextResponse } from 'next/server';
import { queryPakistaniLaw } from '@/lib/legalEngine';

export async function GET() {
  const testCases = [
    {
      query: 'WhatsApp par koi blackmail kar raha hai, kya karein?',
      expectedLawId: 'peca-24-cyber-stalking',
      category: 'Cybercrime / WhatsApp Blackmail'
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

  const results = testCases.map((tc) => {
    const result = queryPakistaniLaw(tc.query);
    const passed =
      tc.expectedFound === false
        ? !result.found
        : result.found && result.primaryLaw?.id === tc.expectedLawId;

    return {
      query: tc.query,
      category: tc.category,
      expected: tc.expectedFound === false ? 'NOT_FOUND' : tc.expectedLawId,
      actual: result.found ? result.primaryLaw?.id : 'NOT_FOUND',
      citation: result.found ? result.citations[0]?.sectionOrArticle : null,
      passed
    };
  });

  const allPassed = results.every((r) => r.passed);

  return NextResponse.json({
    success: allPassed,
    total: results.length,
    passedCount: results.filter((r) => r.passed).length,
    failedCount: results.filter((r) => !r.passed).length,
    results
  });
}
