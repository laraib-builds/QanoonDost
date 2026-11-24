export interface LegalTerm {
  termUrdu: string;
  pronunciationUrdu: string;
  termEnglish: string;
  meaningUrdu: string;
  meaningEnglish: string;
  practicalExampleUrdu: string;
}

export const LEGAL_GLOSSARY: LegalTerm[] = [
  {
    termUrdu: 'مدعی',
    pronunciationUrdu: 'مُدَّعِی',
    termEnglish: 'Complainant / Plaintiff',
    meaningUrdu: 'وہ شخص جو عدالت یا تھانے میں مقدمہ یا شکایت درج کرواتا ہے (کیس کرنے والا)۔',
    meaningEnglish: 'The person who files a lawsuit, complaint, or criminal report in court or police station.',
    practicalExampleUrdu: 'اگر آپ کے گھر میں چوری ہوئی اور آپ نے رپورٹ درج کروائی تو آپ "مدعی" ہیں۔'
  },
  {
    termUrdu: 'مدعا علیہ / ملزم',
    pronunciationUrdu: 'مُدَّعَا عَلَیہ / مُلزم',
    termEnglish: 'Defendant / Accused',
    meaningUrdu: 'وہ شخص جس کے خلاف مقدمہ دائر کیا گیا ہو یا جس پر جرم کا الزام لگایا گیا ہو۔',
    meaningEnglish: 'The person against whom a case is filed or who is accused of an offence.',
    practicalExampleUrdu: 'جس پر چوری کا الزام لگا ہو وہ عدالت میں "ملزم" کہلاتا ہے۔'
  },
  {
    termUrdu: 'روبکار',
    pronunciationUrdu: 'رُوبکَار',
    termEnglish: 'Release Order / Court Warrant',
    meaningUrdu: 'عدالت کا وہ سرکاری حکمنامہ جو ضمانت منظور ہونے کے بعد جیل بھیجا جاتا ہے تاکہ قیدی کو رہا کیا جائے۔',
    meaningEnglish: 'Official judicial release order issued by the court to jail authorities upon acceptance of bail.',
    practicalExampleUrdu: 'ضمانت ہونے کے بعد جج جب روبکار جاری کرتا ہے تب جیل سے رہائی ہوتی ہے۔'
  },
  {
    termUrdu: 'حکمِ امتناعی (اسٹے آرڈر)',
    pronunciationUrdu: 'حُکمِ اِمتِنَاعِی (Stay Order)',
    termEnglish: 'Injunction / Stay Order',
    meaningUrdu: 'عدالت کا وہ عارضی حکم جو کسی کام کو فوری طور پر روکنے کے لیے جاری کیا جاتا ہے، جیسے مکان توڑنے یا بے دخل کرنے سے روکنا۔',
    meaningEnglish: 'A temporary judicial order restraining a party from doing an act until final judgment.',
    practicalExampleUrdu: 'اگر کوئی آپ کی زمین پر غیر قانونی قبضہ کر رہا ہو تو آپ عدالت سے فوری اسٹے لے سکتے ہیں۔'
  },
  {
    termUrdu: 'قابلِ دست اندازی جرم',
    pronunciationUrdu: 'Cognizable Offence',
    termEnglish: 'Cognizable Offence',
    meaningUrdu: 'وہ سنگین جرم جس میں پولیس مجسٹریٹ کے وارنٹ کے بغیر ملزم کو گرفتار کر سکتی ہے اور ایف آئی آر لازمی درج ہوتی ہے۔',
    meaningEnglish: 'A serious crime for which police can arrest without warrant and must register an FIR (e.g. theft, murder).',
    practicalExampleUrdu: 'ڈکیتی، دھوکہ دہی (420) اور اغوا قابل دست اندازی جرائم ہیں۔'
  },
  {
    termUrdu: 'ناقابلِ دست اندازی جرم',
    pronunciationUrdu: 'Non-Cognizable Offence',
    termEnglish: 'Non-Cognizable Offence',
    meaningUrdu: 'معمولی جرم جس میں پولیس بنا مجسٹریٹ کے وارنٹ گرفتاری نہیں کر سکتی، صرف روزنامچے میں رپورٹ (این سی آر) درج ہوتی ہے۔',
    meaningEnglish: 'A minor offence where police cannot arrest without judicial warrant, requiring direct complaint to magistrate.',
    practicalExampleUrdu: 'معمولی تکرار یا بغیر چوٹ کے گالی گلوچ ناقابل دست اندازی شمار ہوتے ہیں۔'
  },
  {
    termUrdu: 'ضمانتی مچلکہ',
    pronunciationUrdu: 'Surety Bond / Machalka',
    termEnglish: 'Surety Bond',
    meaningUrdu: 'وہ قانونی تحریر اور مالی وعدہ جو ضامن عدالت میں جمع کرواتا ہے کہ ملزم ہر پیشی پر عدالت میں حاضر ہوگا۔',
    meaningEnglish: 'A formal undertaking given by a guarantor ensuring the accused will attend court on every date.',
    practicalExampleUrdu: '50 ہزار کا مچلکہ مطلب ضامن نے اتنی رقم کی ضمانت عدالت میں جمع کروائی ہے۔'
  },
  {
    termUrdu: 'نان و نفقہ',
    pronunciationUrdu: 'نَان و نَفَقَہ',
    termEnglish: 'Maintenance (Alimony / Child Support)',
    meaningUrdu: 'بیوی اور بچوں کی رہائش، خوراک، لباس، علاج اور تعلیم کا وہ قانونی خرچہ جو شوہر/باپ پر فرض ہے۔',
    meaningEnglish: 'The statutory financial support (food, shelter, schooling, medical) legally mandated on husband/father.',
    practicalExampleUrdu: 'علیحدگی کی صورت میں باپ عدالت کے حکم سے ہر ماہ بچوں کا خرچہ دینے کا پابند ہوتا ہے۔'
  },
  {
    termUrdu: 'خلع',
    pronunciationUrdu: 'خُلَع',
    termEnglish: 'Khula (Judicial Divorce by Wife)',
    meaningUrdu: 'عورت کا عدالت کے ذریعے شوہر سے علیحدگی (نکاح ختم کروانے) کا قانونی و شرعی حق۔',
    meaningEnglish: 'The legal right of a Muslim wife to seek judicial dissolution of marriage through the Family Court.',
    practicalExampleUrdu: 'اگر عورت شوہر کے ساتھ نہیں رہنا چاہتی تو وہ فیملی کورٹ میں خلع کا دعویٰ دائر کرتی ہے۔'
  },
  {
    termUrdu: 'حضانت',
    pronunciationUrdu: 'حِضَانَت',
    termEnglish: 'Child Custody',
    meaningUrdu: 'نابالغ بچوں کی پرورش، دیکھ بھال اور ان کو اپنے پاس رکھنے کا حق۔',
    meaningEnglish: 'Physical care and custody of minor children based primarily on the welfare of the minor.',
    practicalExampleUrdu: 'کم سن بچے کی پرورش کا پہلا حق ماں کو ملتا ہے، بشرطیکہ بچے کا نقصان نہ ہو۔'
  }
];
