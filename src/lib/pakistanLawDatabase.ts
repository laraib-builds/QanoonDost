import { LawEntry } from '@/types/law';

export const PAKISTAN_STATUTORY_DATABASE: LawEntry[] = [
  // 1. POLICE & FIR (CrPC 154)
  {
    id: 'crpc-154-fir',
    category: 'criminal',
    citation: {
      actNameRomanUrdu: 'Zabta Faujdari (CrPC), 1898',
      actNameUrdu: 'مجموعہ ضابطہ فوجداری، 1898',
      actNameEnglish: 'Code of Criminal Procedure (CrPC), 1898',
      year: 1898,
      sectionOrArticle: 'Section 154',
      officialGazetteRef: 'Act V of 1898, Section 154'
    },
    titleRomanUrdu: 'Police FIR Darj Karne Ka Qanooni Haq',
    titleUrdu: 'ایف آئی آر درج کروانے کا قانونی حق',
    titleEnglish: 'Mandatory Registration of First Information Report (FIR)',
    summaryRomanUrdu: 'Chori, larai, fraud ya kisi bhi jurm par Thana ka SHO foran muft FIR darj karne ka paband hai. Police FIR darj karne se inkar nahi kar sakti aur FIR ki certified copy muft dena lazmi hai.',
    summaryUrdu: 'کسی بھی جرم کی اطلاع پر تھانے کا ایس ایچ او فوراً مفت ایف آئی آر درج کرنے کا قانونی پابند ہے۔ انکار کرنا غیر قانونی ہے۔',
    summaryEnglish: 'Police SHO is legally mandated to register a free FIR immediately upon report of a cognizable offence. Certified copy must be given free of cost.',
    statuteTextUrdu: 'دفعہ 154 ضابطہ فوجداری: ہر وہ اطلاع جو کسی قابل دست اندازی جرم سے متعلق دی جائے فوراً قلمبند کی جائے گی اور نقل مفت دی جائے گی۔',
    statuteTextEnglish: 'Section 154 CrPC: Information in cognizable cases shall be reduced to writing and copy given free of cost.',
    rightsRomanUrdu: [
      'FIR bilkul MUFT darj hoti hai, koi rishwat ya fees na dein.',
      'FIR darj hotay hi uski copy haasil karna aap ka kanooni haq hai.',
      'Sada kaghaz par Urdu ya Roman mein dar-khwast di ja sakti hai.'
    ],
    rightsUrdu: [
      'ایف آئی آر کا اندراج بالکل مفت ہے، کوئی فیس نہیں۔',
      'ایف آئی آر کی مصدقہ کاپی حاصل کرنا شہری کا حق ہے۔'
    ],
    rightsEnglish: [
      'FIR registration is 100% free; no police fee is required.',
      'Receiving a certified copy of the FIR is your legal right.'
    ],
    actionStepsRomanUrdu: [
      'Sada kaghaz par waqia ki tareekh, waqt, jagah aur mulzim ka naam/huliya likhein.',
      'Thana ja kar SHO ya Moharrar ko dein aur Diary/DD number lein.',
      'Agar SHO inkar kare to SP ya Session Judge (22-A Justice of Peace) ko dar-khwast dein.'
    ],
    actionStepsUrdu: [
      'تحریری درخواست تھانے کے ایس ایچ او کو جمع کروائیں۔',
      'انکار کی صورت میں سیشن جج (دفعہ 22-A) سے رجوع کریں۔'
    ],
    actionStepsEnglish: [
      'Submit written application to the SHO.',
      'If refused, approach the Sessions Judge under Section 22-A CrPC.'
    ],
    authorityRomanUrdu: 'Ilaqai Thana (SHO) / Sessions Court (22-A CrPC)',
    authorityUrdu: 'علاقائی تھانہ (SHO) / سیشن کورٹ (دفعہ 22-A)',
    authorityEnglish: 'Local Police Station (SHO) / Sessions Court',
    helpline: '15',
    isCognizable: true,
    keywordsUrdu: ['ایف آئی آر', 'تھانہ', 'پولیس', 'رپورٹ', 'مقدمہ'],
    keywordsRomanUrdu: ['fir', 'police', 'thana', 'sho', 'fir nahi kaat rahe', 'fir darj', 'report', 'police complaint', 'dar-khwast'],
    keywordsEnglish: ['fir', 'police station', 'first information report', 'police complaint']
  },

  // 2. JUSTICE OF PEACE 22-A (WHEN POLICE REFUSES FIR)
  {
    id: 'crpc-22a-justice-of-peace',
    category: 'criminal',
    citation: {
      actNameRomanUrdu: 'Zabta Faujdari (CrPC), 1898',
      actNameUrdu: 'مجموعہ ضابطہ فوجداری، 1898',
      actNameEnglish: 'Code of Criminal Procedure (CrPC), 1898',
      year: 1898,
      sectionOrArticle: 'Section 22-A & 22-B',
      officialGazetteRef: 'Code of Criminal Procedure (Amendment) 2002'
    },
    titleRomanUrdu: 'Police Ke Inkar Par FIR Ka Adalti Hukm (Justice of Peace 22-A)',
    titleUrdu: 'ایف آئی آر کا عدالتی حکم (جسٹس آف پیس)',
    titleEnglish: 'Court Order to Register FIR & Stop Police Harassment',
    summaryRomanUrdu: 'Agar thana ka SHO apki jaiz FIR darj na kare ya apko tang kare, to aap Sessions Judge (Justice of Peace) ko dar-khwast de sakte hain. Judge foran police ko FIR darj karne ka sakht hukm deta hai.',
    summaryUrdu: 'جب پولیس ایف آئی آر درج نہ کرے تو سیشن جج دفعہ 22-A کے تحت پولیس کو فوری مقدمہ درج کرنے کا حکم دیتا ہے۔',
    summaryEnglish: 'Sessions Judge acting as Justice of Peace under Section 22-A CrPC can direct police to register an FIR and stop police harassment.',
    statuteTextUrdu: 'دفعہ 22-A(6) ضابطہ فوجداری: جسٹس آف پیس قابل دست اندازی جرم کے اندراج کا حکم دے سکتا ہے۔',
    statuteTextEnglish: 'Section 22-A(6) CrPC: Justice of the Peace may direct registration of a criminal case.',
    rightsRomanUrdu: [
      'Police ki bad-tamizi ya inkar ke khilaf adaalat ka darwaza khula hai.',
      'Adaalat aam taur par 3 se 7 din mein police se jawab talab karti hai.',
      'Agar police thaanay bula kar bila waja pareshan kare to bhi ye dar-khwast lagti hai.'
    ],
    rightsUrdu: ['پولیس کی من مانی کے خلاف سیشن جج کو درخواست کا حق۔'],
    rightsEnglish: ['Citizens can petition Sessions Court against police non-registration.'],
    actionStepsRomanUrdu: [
      'Thana mein di gayi pehli dar-khwast ki copy sath lagayein.',
      'District Sessions Court mein Section 22-A ke tehat petition file karein.',
      'Judge sahib SHO ko talab kar ke FIR ka order jari karenge.'
    ],
    actionStepsUrdu: ['سیشن کورٹ میں دفعہ 22-A کی پٹیشن دائر کریں۔'],
    actionStepsEnglish: ['File Section 22-A petition before Sessions Judge.'],
    authorityRomanUrdu: 'District & Sessions Judge (Kachehri)',
    authorityUrdu: 'ڈسٹرکٹ اینڈ سیشن جج (کچہری)',
    authorityEnglish: 'District & Sessions Judge',
    helpline: '15',
    keywordsUrdu: ['22 اے', 'بائیس اے', 'جسٹس آف پیس', 'سیشن جج'],
    keywordsRomanUrdu: ['22a', '22 a', 'justice of peace', 'session judge', 'police inkar', 'sho ke khilaf'],
    keywordsEnglish: ['22-a crpc', 'justice of peace', 'court order fir']
  },

  // 3. WIFE & CHILD MAINTENANCE (MFLO SEC 9)
  {
    id: 'mflo-9-maintenance-kharcha',
    category: 'family',
    citation: {
      actNameRomanUrdu: 'Muslim Family Laws Ordinance, 1961',
      actNameUrdu: 'مسلم عائلی قوانین آرڈیننس، 1961',
      actNameEnglish: 'Muslim Family Laws Ordinance (MFLO), 1961',
      year: 1961,
      sectionOrArticle: 'Section 9',
      officialGazetteRef: 'Ordinance VIII of 1961, Section 9'
    },
    titleRomanUrdu: 'Biwi Aur Bachon Ka Kanooni Mahana Kharcha (Nan Nafqa)',
    titleUrdu: 'بیوی اور بچوں کا ماہانہ خرچہ (نان و نفقہ)',
    titleEnglish: 'Right of Maintenance for Wife and Children (MFLO Sec 9)',
    summaryRomanUrdu: 'Shoher par qanoonan farz hai ke wo biwi aur bachon ka khana, kapra, rehaish, school fees aur dawai ka mahana kharcha ada kare. Agar na de to biwi Family Court se foran mahana kharcha aur pichle baqaya jaat le sakti hai.',
    summaryUrdu: 'شوہر پر شرعاً و قانوناً لازم ہے کہ وہ بیوی اور بچوں کا تمام مناسب ماہانہ خرچہ ادا کرے۔ فیملی کورٹ فوری خرچہ باندھ دیتی ہے۔',
    summaryEnglish: 'Husband is under strict statutory duty to maintain wife and minor children. Family Court grants interim maintenance from first hearing.',
    statuteTextUrdu: 'دفعہ 9 مسلم عائلی قوانین: اگر شوہر مناسب نان نفقہ نہ دے تو فیملی عدالت شوہر کو خرچہ ادا کرنے کا پابند بنائے گی۔',
    statuteTextEnglish: 'Section 9 MFLO: If any husband fails to maintain his wife adequately, she may apply to the court for maintenance.',
    rightsRomanUrdu: [
      'Case shuru hotay hi Judge pehli do tareekhon mein "Aarzi Kharcha" (Interim Maintenance) baandh deta hai.',
      'Kharcha na dene par Shoher ko jail bheja ja sakta hai aur salary quraq ho sakti hai.',
      'Bachon ka kharcha baap par tab tak farz hai jab tak betay baligh na hon aur betiyan shadi shuda na hon.'
    ],
    rightsUrdu: ['کیس شروع ہوتے ہی عدالت عبوری ماہانہ خرچہ مقرر کرتی ہے۔'],
    rightsEnglish: ['Family court fixes interim maintenance right at the beginning.'],
    actionStepsRomanUrdu: [
      'Nikahnama aur bachon ke B-Form / Birth Certificate ki copy lein.',
      'Qareebi Family Court mein "Kharcha Ka Dawa" (Suit for Maintenance) karein.',
      'Adaalat shoher ki aamdani dekh kar har maah bank account mein raqam jama karwaye gi.'
    ],
    actionStepsUrdu: ['فیملی کورٹ میں خرچہ کا دعویٰ دائر کریں۔'],
    actionStepsEnglish: ['File Suit for Maintenance in Family Court.'],
    authorityRomanUrdu: 'Family Court (Senior Civil Judge) / Union Council',
    authorityUrdu: 'فیملی کورٹ / یونین کونسل',
    authorityEnglish: 'Family Court / Union Council',
    keywordsUrdu: ['خرچہ', 'نان نفقہ', 'بیوی کا خرچہ', 'بچوں کا خرچہ'],
    keywordsRomanUrdu: ['kharcha', 'nan nafqa', 'biwi ka kharcha', 'bachon ka kharcha', 'shoher kharcha nahi deta', 'family court', 'monthly kharcha'],
    keywordsEnglish: ['maintenance for wife', 'child support', 'family court maintenance']
  },

  // 4. KHULA & DOWRY (MFLO SEC 8)
  {
    id: 'mflo-8-khula-divorce',
    category: 'family',
    citation: {
      actNameRomanUrdu: 'Tansiqh-e-Nikah Act 1939 & MFLO 1961',
      actNameUrdu: 'تنسیخ نکاح مسلمین ایکٹ 1939 و مسلم عائلی قوانین',
      actNameEnglish: 'Dissolution of Muslim Marriages Act 1939 & MFLO 1961',
      year: 1961,
      sectionOrArticle: 'Section 8 MFLO',
      officialGazetteRef: 'Act VIII of 1939'
    },
    titleRomanUrdu: 'Khula Ka Kanooni Haq (Shoher Ki Ijazat Ke Baghair)',
    titleUrdu: 'خلع کا قانونی حق (تنسیخ نکاح)',
    titleEnglish: 'Right of Khula (Judicial Divorce by Wife)',
    summaryRomanUrdu: 'Agar aurat shoher ke sath nahi rehna chahti (zulm, larai, ya na-pasandeedgi), to wo Family Court se Khula le sakti hai. Khula ke liye SHOHER KI RAZAMANDI ZAROORI NAHI HAI. Adaalat khud degree jari karti hai.',
    summaryUrdu: 'اگر خاتون شوہر کے ساتھ نہ رہنا چاہے تو عدالت سے خلع لے سکتی ہے۔ خلع کے لیے شوہر کا راضی ہونا ضروری نہیں ہے۔',
    summaryEnglish: 'A Muslim wife has the unconditional right to seek Khula through Family Court. Husband consent is not required for the court to grant Khula.',
    statuteTextUrdu: 'سپریم کورٹ فیصلہ: عورت اگر عدالت میں کہہ دے کہ وہ شوہر کے ساتھ نہیں رہ سکتی تو عدالت خلع دینے کی پابند ہے۔',
    statuteTextEnglish: 'Supreme Court ruling: Wife is entitled to Khula as of right upon expressing unwillingness to live with husband.',
    rightsRomanUrdu: [
      'Shoher razi na bhi ho tab bhi judge Khula ki degree de deta hai.',
      'Jahez ka saman (Dowry) aurat ki zaati milkiyat hai aur mukammal wapis milta hai.',
      'Khula lene se bachon ka kharcha khatam nahi hota, baap par wajib rehta hai.'
    ],
    rightsUrdu: ['جہیز کا سامان مکمل واپس ملتا ہے، شوہر کا انکار نہیں چلتا۔'],
    rightsEnglish: ['Dowry articles must be returned in full.'],
    actionStepsRomanUrdu: [
      'Family Court mein "Dawa Tanseekh-e-Nikah ba-sabab Khula" dain.',
      'Adaalat shoher ko notice bhej kar sulah ki koshish kare gi.',
      'Sulah na hone par adaalat Khula ki degree de kar Union Council bhejegi.'
    ],
    actionStepsUrdu: ['فیملی کورٹ میں خلع اور سامان جہیز کا دعویٰ دائر کریں۔'],
    actionStepsEnglish: ['File Khula suit in Family Court.'],
    authorityRomanUrdu: 'Family Court (Senior Civil Judge)',
    authorityUrdu: 'فیملی کورٹ',
    authorityEnglish: 'Family Court',
    keywordsUrdu: ['خلع', 'طلاق', 'جہیز', 'علیحدگی'],
    keywordsRomanUrdu: ['khula', 'khula ka tareeqa', 'talaq', 'separation', 'jahez wapsi', 'shoher tang karta hai', 'dawa khula'],
    keywordsEnglish: ['khula', 'dissolution of marriage', 'divorce wife']
  },

  // 5. CYBERCRIME & WHATSAPP BLACKMAILING (PECA 2016)
  {
    id: 'peca-24-cyber-stalking',
    category: 'cybercrime',
    citation: {
      actNameRomanUrdu: 'Prevention of Electronic Crimes Act (PECA), 2016',
      actNameUrdu: 'پریوینشن آف الیکٹرانک کرائمز ایکٹ، 2016 (پیکا)',
      actNameEnglish: 'Prevention of Electronic Crimes Act (PECA), 2016',
      year: 2016,
      sectionOrArticle: 'Section 24 & 21',
      officialGazetteRef: 'PECA Act XL of 2016, Section 24'
    },
    titleRomanUrdu: 'WhatsApp Blackmailing, Online Harassment & Fake Videos',
    titleUrdu: 'واٹس ایپ بلیک میلنگ و سائبر ہراسانی',
    titleEnglish: 'Cyber Stalking, Blackmailing and Online Harassment',
    summaryRomanUrdu: 'Agar koi shakhs WhatsApp, Facebook ya phone par apko blackmail kare, tasweer viral karne ki dhamki de, ya ghalat message kare, to FIA Cybercrime foran usay giraftar karti hai. Iski saza 3 se 5 saal qaid aur 10 se 50 lakh jurmana hai.',
    summaryUrdu: 'آن لائن بلیک میلنگ یا ہراسانی پیکا قانون کے تحت سنگین جرم ہے۔ ایف آئی اے سائبر کرائم فوری ملزم کو ٹریس کر کے گرفتار کرتا ہے۔',
    summaryEnglish: 'Online harassment, WhatsApp blackmailing, and sharing pictures without consent is punishable under Section 24 & 21 PECA with up to 5 years jail and PKR 5M fine.',
    statuteTextUrdu: 'دفعہ 24 پیکا: جو شخص انٹرنیٹ پر کسی کو ہراساں یا بلیک میل کرے گا اسے 3 سال قید اور جرمانہ ہوگا۔',
    statuteTextEnglish: 'Section 24 PECA: Cyber-stalking and harassment carries up to 3 years imprisonment and fine.',
    rightsRomanUrdu: [
      'Blackmailer ko dar ke paise bilkul na dein; foran FIA ko report karein.',
      'Khawateen ki shanakht aur privacy mukammal tor par gupt (khufia) rakhi jati hai.',
      'FIA Cybercrime complaint bilkul muft hoti hai aur online bhi ho jati hai.'
    ],
    rightsUrdu: ['خواتین کی شناخت مکمل راز میں رکھی جاتی ہے۔'],
    rightsEnglish: ['Female victim privacy is strictly protected by FIA.'],
    actionStepsRomanUrdu: [
      'Tamam chats, audio notes, numbers aur profile links ke Screenshots lein.',
      'FIA Helpline 1991 par call karein ya complaint.fia.gov.pk par dar-khwast dein.',
      'Qareebi FIA Cybercrime Reporting Centre (CCRC) ja kar mobile saboot dikhayein.'
    ],
    actionStepsUrdu: ['اسکرین شاٹس لے کر ایف آئی اے ہیلپ لائن 1991 پر رابطہ کریں۔'],
    actionStepsEnglish: ['Save screenshots and call FIA 1991.'],
    authorityRomanUrdu: 'FIA Cyber Crime Wing (CCRC) & PTA',
    authorityUrdu: 'ایف آئی اے سائبر کرائم ونگ و پی ٹی اے',
    authorityEnglish: 'FIA Cyber Crime Wing',
    helpline: '1991',
    isCognizable: true,
    keywordsUrdu: ['سائبر کرائم', 'واٹس ایپ بلیک میل', 'ہراسانی', 'پیکا'],
    keywordsRomanUrdu: ['cyber crime', 'whatsapp blackmail', 'harassment', 'tasweer leak', 'video viral', 'blackmailing', 'fia helpline', 'online dhamki'],
    keywordsEnglish: ['cybercrime', 'whatsapp blackmail', 'online harassment', 'fia 1991']
  },

  // 6. TENANT & LANDLORD DISPUTE (RENT ACTS)
  {
    id: 'rent-eviction-rights',
    category: 'property_rent',
    citation: {
      actNameRomanUrdu: 'Punjab / Sindh Rented Premises Act',
      actNameUrdu: 'پنجاب و سندھ رینٹڈ پریمائزز ایکٹ',
      actNameEnglish: 'Rented Premises Act 2009 / 1979',
      year: 2009,
      sectionOrArticle: 'Section 15 & 19',
      officialGazetteRef: 'Punjab Act VII of 2009'
    },
    titleRomanUrdu: 'Makan Malik Ka Zabardasti Saman Bahir Phenkna Ya Talah Lagana',
    titleUrdu: 'کرائے دار کو زبردستی نکالنے پر قانونی پابندی',
    titleEnglish: 'Prohibition on Forceful Tenant Eviction',
    summaryRomanUrdu: 'Koi bhi makan malik apne kirayedar ko bina adalti faislay ke zabardasti saman bahir phenk kar, bijli/pani kaat kar ya tala laga kar nahi nikal sakta. Kirayedar ko sirf "Rent Court" ke faislay ke baad hi nikala ja sakta hai.',
    summaryUrdu: 'کوئی مالک مکان عدالت کے باقاعدہ حکم کے بغیر کرائے دار کو زبردستی بے دخل نہیں کر سکتا اور نہ بجلی پانی کاٹ سکتا ہے۔',
    summaryEnglish: 'Landlord cannot forcefully evict a tenant or cut off utility connections without formal order from the Rent Tribunal.',
    statuteTextUrdu: 'دفعہ 15 رینٹ ایکٹ: کوئی بھی مالک مکان رینٹ ٹربیونل کے حکم کے بغیر کرائے دار کو بے دخل نہیں کرے گا۔',
    statuteTextEnglish: 'Section 15: Landlord shall not evict a tenant except pursuant to an application made to the Rent Tribunal.',
    rightsRomanUrdu: [
      'Bijli, pani, ya gas ka connection kaatna jurm hai; Rent Controller foran bahal karwata hai.',
      'Zabardasti tala lagana criminal act hai, aap foran Police 15 call kar sakte hain.',
      'Agar malik kiraya lene se inkar kare to kiraya seedha Rent Court mein jama hota hai.'
    ],
    rightsUrdu: ['مالک مکان بنیادی سہولیات منقطع نہیں کر سکتا۔'],
    rightsEnglish: ['Landlord cannot disconnect electricity or water amenities.'],
    actionStepsRomanUrdu: [
      'Kirayanama (Rent Agreement) aur purani receipts apne paas rakhein.',
      'Agar malik zabardasti kare to foran 15 par Police helpline call karein.',
      'Rent Controller Court mein Stay Order (Hukm-e-Imtinai) ki dar-khwast dein.'
    ],
    actionStepsUrdu: ['پولیس 15 پر کال کریں اور رینٹ کورٹ سے اسٹے لیں۔'],
    actionStepsEnglish: ['Call Police 15 and seek injunction from Rent Controller.'],
    authorityRomanUrdu: 'Rent Tribunal / Special Rent Controller Court',
    authorityUrdu: 'رینٹ کنٹرولر کورٹ',
    authorityEnglish: 'Rent Controller Court',
    helpline: '15',
    keywordsUrdu: ['کرایہ دار', 'مکان مالک', 'خالی کروانا', 'بغیر نوٹس'],
    keywordsRomanUrdu: ['kirayedar', 'makan malik', 'dukan khali', 'saman phenk dia', 'tala laga dia', 'rent agreement', 'bina notice nikal dia'],
    keywordsEnglish: ['tenant eviction', 'landlord eviction', 'rent dispute']
  },

  // 7. CHECK BOUNCE (PPC 489-F)
  {
    id: 'ppc-489f-cheque-bounce',
    category: 'criminal',
    citation: {
      actNameRomanUrdu: 'Pakistan Penal Code (PPC), 1860',
      actNameUrdu: 'مجموعہ تعزیرات پاکستان، 1860',
      actNameEnglish: 'Pakistan Penal Code (PPC), 1860',
      year: 1860,
      sectionOrArticle: 'Section 489-F',
      officialGazetteRef: 'Criminal Law (Amendment) Ordinance, 2002'
    },
    titleRomanUrdu: 'Bank Check Bounce / Dishonor Hone Par FIR (Dhara 489-F)',
    titleUrdu: 'چیک باؤنس ہونے پر فوجداری مقدمہ (489-F)',
    titleEnglish: 'Dishonestly Issuing a Cheque (Section 489-F PPC)',
    summaryRomanUrdu: 'Agar koi shakhs apko aisa cheque de jo bank mein balance na hone par bounce ho jaye, to ye ek sangeen jurm hai. Mujrim ko 3 saal qaid ho sakti hai aur police foran 489-F ki FIR darj karti hai.',
    summaryUrdu: 'بددیانتی سے باؤنس ہونے والا چیک جاری کرنا تعزیرات پاکستان دفعہ 489-F کے تحت قابل سزا جرم ہے۔ 3 سال تک قید ہو سکتی ہے۔',
    summaryEnglish: 'Dishonestly issuing a bounced cheque is a criminal offence under Section 489-F PPC punishable with up to 3 years imprisonment.',
    statuteTextUrdu: 'دفعہ 489-F: جو کوئی بددیانتی سے چیک جاری کرے جو ڈس آنر ہو جائے اسے 3 سال تک قید اور جرمانہ ہوگا۔',
    statuteTextEnglish: 'Section 489-F PPC: Dishonest issuance of cheque towards repayment of loan that bounces carries 3 years imprisonment.',
    rightsRomanUrdu: [
      'Bank se Dishonor Memo (slip) lena aap ka haq hai, yehi sab se bara saboot hai.',
      'Check bounce hote hi mulzim ke khilaf foran criminal FIR darj hoti hai.',
      'Paise wapis lene ke liye Civil Court mein Order 37 ka recovery case bhi sath lagta hai.'
    ],
    rightsUrdu: ['بینک میمو ملتے ہی فوری ایف آئی آر کا حق۔'],
    rightsEnglish: ['FIR can be registered right after getting bank return memo.'],
    actionStepsRomanUrdu: [
      'Cheque bank mein pesh kar ke Bank Manager se signed Dishonor Memo lein.',
      'Memo aur cheque ki copy ke sath Thana mein 489-F ki FIR dar-khwast dein.',
      'Agar SHO dair kare to Sessions Judge (22-A) ko application dein.'
    ],
    actionStepsUrdu: ['بینک سے میمو لے کر تھانے میں 489-F کی درخواست دیں۔'],
    actionStepsEnglish: ['Obtain bank dishonor memo and file application under 489-F.'],
    authorityRomanUrdu: 'Ilaqai Thana (SHO) / Magistrate Court',
    authorityUrdu: 'متعلقہ تھانہ / مجسٹریٹ عدالت',
    authorityEnglish: 'Police Station / Magistrate Court',
    isCognizable: true,
    isBailable: false,
    punishmentRomanUrdu: '3 saal qaid aur jurmana',
    keywordsUrdu: ['چیک باؤنس', 'بوگس چیک', '489 ایف'],
    keywordsRomanUrdu: ['cheque bounce', 'check bounce', '489f', '489 f', 'bank memo', 'bogus cheque', 'dishonor'],
    keywordsEnglish: ['cheque bounce', 'dishonored cheque', '489-f ppc']
  },

  // 8. FRAUD & SCAMS (PPC 420)
  {
    id: 'ppc-420-cheating-fraud',
    category: 'criminal',
    citation: {
      actNameRomanUrdu: 'Pakistan Penal Code (PPC), 1860',
      actNameUrdu: 'مجموعہ تعزیرات پاکستان، 1860',
      actNameEnglish: 'Pakistan Penal Code (PPC), 1860',
      year: 1860,
      sectionOrArticle: 'Section 420 & 415',
      officialGazetteRef: 'PPC Act XLV of 1860, Section 420'
    },
    titleRomanUrdu: 'Dhoka Dahi Aur Maali Fraud (Dhara 420 PPC)',
    titleUrdu: 'دھوکہ دہی اور مالی فراڈ (دفعہ 420)',
    titleEnglish: 'Cheating and Fraud (Section 420 PPC)',
    summaryRomanUrdu: 'Agar koi shakhs jhoot bol kar ya fareb se apke paise, gari ya jaidad hadap le, to ye Dhara 420 ke tehat jurm hai. Mujrim ko 7 saal qaid hoti hai aur police giraftar karti hai.',
    summaryUrdu: 'دھوکے سے کسی کے پیسے یا جائیداد ہڑپ کرنا دفعہ 420 کے تحت 7 سال قید کی سزا کا موجب ہے۔',
    summaryEnglish: 'Cheating and dishonestly inducing delivery of property is punishable under Section 420 PPC with up to 7 years imprisonment.',
    statuteTextUrdu: 'دفعہ 420: جو کوئی دھوکہ دہی کر کے بددیانتی سے جائیداد حاصل کرے اسے 7 سال قید اور جرمانہ ہوگا۔',
    statuteTextEnglish: 'Section 420 PPC: Cheating carries imprisonment up to seven years and fine.',
    rightsRomanUrdu: [
      'Paison ki wapsi aur mujrim ko saza dilwane ke liye foran FIR ho sakti hai.',
      'Bank transaction slips, WhatsApp chats aur iqrar-nama mukammal saboot hain.'
    ],
    rightsUrdu: ['فراڈ پر فوری مقدمہ اور رقم کی قانونی وصولی۔'],
    rightsEnglish: ['Criminal prosecution and asset recovery under Section 420.'],
    actionStepsRomanUrdu: [
      'Paison ke len den ki receipts, bank statements aur chats ka print lein.',
      'Thana mein Dhara 420 aur 406 (Amanat mein khayanat) ki dar-khwast dein.',
      'Agar online ya bank fraud ho to FIA Cybercrime ko bhi complaint dein.'
    ],
    actionStepsUrdu: ['بینک رسیدیں لے کر تھانے میں 420 کی درخواست دیں۔'],
    actionStepsEnglish: ['Gather transaction proof and file complaint under Sec 420 PPC.'],
    authorityRomanUrdu: 'Ilaqai Thana / Magistrate Court / FIA',
    authorityUrdu: 'تھانہ / مجسٹریٹ عدالت',
    authorityEnglish: 'Police Station / Magistrate Court',
    isCognizable: true,
    isBailable: false,
    punishmentRomanUrdu: '7 saal tak qaid aur jurmana',
    keywordsUrdu: ['فراڈ', 'دھوکہ', '420', 'چار سو بیس'],
    keywordsRomanUrdu: ['fraud', 'dhoka', '420', 'char so bees', 'paise kha gaya', 'scam', 'fareeb'],
    keywordsEnglish: ['fraud', 'cheating 420', 'financial scam']
  },

  // 9. NADRA INHERITANCE / SUCCESSION (ACT 2020)
  {
    id: 'inheritance-nadra-succession-act',
    category: 'inheritance',
    citation: {
      actNameRomanUrdu: 'Succession Certificates Act, 2020',
      actNameUrdu: 'لیٹرز آف ایڈمنسٹریشن اینڈ سکسیشن سرٹیفکیٹس ایکٹ، 2020',
      actNameEnglish: 'Succession Certificates Act, 2020',
      year: 2020,
      sectionOrArticle: 'Section 3 & 4',
      officialGazetteRef: 'Act No. IX of 2020'
    },
    titleRomanUrdu: 'Wirasat Ka Certificate NADRA Se 15 Din Mein (Bina Adalat)',
    titleUrdu: 'وراثت کا سرٹیفکیٹ نادرا سے 15 دنوں میں',
    titleEnglish: '15-Day NADRA Succession Certificate without Civil Court Litigation',
    summaryRomanUrdu: 'Marhoom (faut hone wale) ke bank account, shares ya paison ke liye ab adalat ke chakkar lagane ki zaroorat nahi. 2020 ke kanoon ke tehat agar tamam waris razi hon to NADRA sirf 15 din mein biometric ke baad Succession Certificate jari kar deta hai.',
    summaryUrdu: '2020 کے نئے قانون کے تحت نادرا صرف 15 دنوں کے اندر بائیومیٹرک تصدیق کے بعد وراثت سرٹیفکیٹ جاری کرتا ہے۔',
    summaryEnglish: 'Heirs can obtain a Succession Certificate for bank accounts and movable assets directly from NADRA within 15 days without litigation.',
    statuteTextUrdu: 'دفعہ 3 ایکٹ 2020: نادرا اتھارٹی قانونی وارثوں کو بائیومیٹرک تصدیق کے بعد سکسیشن سرٹیفکیٹ جاری کرے گی۔',
    statuteTextEnglish: 'Section 3 Act IX of 2020: NADRA is empowered to issue succession certificates to legal heirs.',
    rightsRomanUrdu: [
      'Wakeel ki koi zaroorat nahi, waris khud NADRA Mega Center ja sakte hain.',
      'Bahar-e-mulk (overseas) waris Pakistani Embassy se biometric karwa sakte hain.',
      'Shariat ke mutabiq har waris (bewa, beta, beti) ka hissa certificate par saaf likha hota hai.'
    ],
    rightsUrdu: ['نادرا سے بلا وکیل براہ راست وراثت سرٹیفکیٹ کا حصول۔'],
    rightsEnglish: ['Direct biometric succession certificate from NADRA.'],
    actionStepsRomanUrdu: [
      'Marhoom ka Death Certificate aur NADRA se FRC (Family Certificate) lein.',
      'Tamam waris NADRA Succession Center ja kar biometric angootha lagayein.',
      '14 din ke akhbari ishtihar ke baad NADRA certificate de dega.'
    ],
    actionStepsUrdu: ['ڈیتھ سرٹیفکیٹ اور ایف آر سی لے کر نادرا سینٹر جائیں۔'],
    actionStepsEnglish: ['Apply at NADRA Succession Facilitation Center with FRC and death certificate.'],
    authorityRomanUrdu: 'NADRA Succession Facilitation Center',
    authorityUrdu: 'نادرا سکسیشن سہولت سینٹر',
    authorityEnglish: 'NADRA Succession Center',
    keywordsUrdu: ['وراثت', 'سکسیشن سرٹیفکیٹ', 'نادرا'],
    keywordsRomanUrdu: ['wirasat', 'succession certificate', 'nadra succession', 'marhoom ke paise', 'heirship', 'bank account freeze'],
    keywordsEnglish: ['succession certificate', 'nadra inheritance', 'letters of administration']
  },

  // 10. UNLAWFUL TERMINATION & GRATUITY (STANDING ORDERS 1968)
  {
    id: 'labor-standing-orders-termination',
    category: 'labor_employment',
    citation: {
      actNameRomanUrdu: 'Standing Orders Ordinance, 1968',
      actNameUrdu: 'صنعتی و تجارتی روزگار (اسٹینڈنگ آرڈرز) آرڈیننس، 1968',
      actNameEnglish: 'Industrial and Commercial Employment (Standing Orders) Ordinance, 1968',
      year: 1968,
      sectionOrArticle: 'Standing Order 12',
      officialGazetteRef: 'W.P. Ordinance No. VI of 1968'
    },
    titleRomanUrdu: 'Company Ka Bina Notice Naukri Se Nikalna Aur Gratuity Haq',
    titleUrdu: 'نوکری سے بغیر نوٹس برطرفی اور گریجویٹی کے حقوق',
    titleEnglish: 'Unlawful Termination, Notice Pay, and Statutory Gratuity Rights',
    summaryRomanUrdu: 'Koi bhi company ya factory mulazim ko zubani (oral) ya bina tehreeri waja ke naukri se nahi nikal sakti. Permanent mulazim ko nikalne ke liye 1 maah ka notice ya 1 maah ki salary dena lazmi hai, aur har saal ki service par 30 din ki Gratuity dena qanooni farz hai.',
    summaryUrdu: 'بغیر تحریری معقول وجہ اور پیشگی ایک ماہ کے نوٹس یا تنخواہ کے نوکری سے نکالنا غیر قانونی ہے۔ گریجویٹی لازمی حق ہے۔',
    summaryEnglish: 'Oral termination is void. Employers must give written reasons, one-month notice or wages in lieu, plus 30 days gratuity per year.',
    statuteTextUrdu: 'اسٹینڈنگ آرڈر 12: کسی کارکن کی ملازمت تحریری حکم کے بغیر ختم نہیں کی جائے گی اور 30 دن کی اجرت بطور گریجویٹی ادا کی جائے گی۔',
    statuteTextEnglish: 'Standing Order 12: Permanent workman services shall not be terminated except by an order in writing stating explicit reasons.',
    rightsRomanUrdu: [
      'Zubani tor par "kal se mat aana" kehna kanoonan bilkul baatil (invalid) hai.',
      'Ghair-kanooni barkhastgi par Labour Court mulazim ko pichli tamam salaries samait bahaal karti hai.',
      'Har saal ki service par 1 maah ki basic salary ke barabar Gratuity lena aap ka haq hai.'
    ],
    rightsUrdu: ['زبانی برطرفی غیر قانونی، لیبر کورٹ میں بحالی کا دعویٰ۔'],
    rightsEnglish: ['Oral termination is illegal; Labour Court orders reinstatement with back benefits.'],
    actionStepsRomanUrdu: [
      'Naukri se nikalne ke 90 din ke andar maalik ko registered daak se "Grievance Notice" bhejein.',
      'Agar 15 din mein jawab na aye to Labour Court mein case (Grievance Petition) dain.',
      'Appointment letter aur salary slips saboot ke tor par sath lagayein.'
    ],
    actionStepsUrdu: ['مالک کو نوٹس دیں اور لیبر کورٹ سے رجوع کریں۔'],
    actionStepsEnglish: ['Serve Grievance Notice and file petition in Labour Court.'],
    authorityRomanUrdu: 'Labour Court / Labour Directorate',
    authorityUrdu: 'لیبر کورٹ',
    authorityEnglish: 'Labour Court',
    keywordsUrdu: ['نوکری سے نکال دیا', 'لیبر لا', 'گریجویٹی'],
    keywordsRomanUrdu: ['naukri se nikal dia', 'job termination', 'gratuity', 'salary nahi di', 'labour court', 'firing notice'],
    keywordsEnglish: ['unlawful termination', 'labour court', 'gratuity rights']
  },

  // 11. CONSUMER COURT (DEFECTIVE GOODS)
  {
    id: 'consumer-protection-defective-goods',
    category: 'consumer_rights',
    citation: {
      actNameRomanUrdu: 'Consumer Protection Act, 2005 / 2014',
      actNameUrdu: 'کنزیومر پروٹیکشن ایکٹ 2005 / 2014',
      actNameEnglish: 'Consumer Protection Act, 2005',
      year: 2005,
      sectionOrArticle: 'Section 13 & 28',
      officialGazetteRef: 'Punjab Act II of 2005'
    },
    titleRomanUrdu: 'Kharab Cheez Par Dukandar Se Harjana Aur Paison Ki Wapsi',
    titleUrdu: 'ناقص چیز پر کنزیومر کورٹ میں مفت ہرجانہ',
    titleEnglish: 'Defective Products Redress in Consumer Court',
    summaryRomanUrdu: 'Agar koi dukandar ya company apko kharab, duplicate ya naqis cheez bech kar wapis ya tabdeel na kare, to aap District Consumer Court mein case kar sakte hain. Consumer Court mein KOI COURT FEES NAHI HOTI aur aam banda bina wakeel ke khud pesh ho sakta hai.',
    summaryUrdu: 'ناقص چیز فروخت کرنے پر دکاندار کے خلاف کنزیومر کورٹ میں بغیر کورٹ فیس دعویٰ کیا جا سکتا ہے۔ عدالت ہرجانہ دلواتی ہے۔',
    summaryEnglish: 'Manufacturers and sellers are liable for defective products. Consumer can file claim in District Consumer Court without court fees.',
    statuteTextUrdu: 'دفعہ 28: متاثرہ صارف 15 دن کا نوٹس دینے کے بعد کنزیومر کورٹ میں ہرجانے اور رقم واپسی کا دعویٰ دائر کر سکتا ہے۔',
    statuteTextEnglish: 'Section 28: Consumer may lodge claim before Consumer Court after 15 days written notice.',
    rightsRomanUrdu: [
      'Dukandar ka ye kehna ke "Kharida hua maal wapis nahi hoga" qanoonan bilkul jhoot aur ghair-kanooni hai.',
      'Consumer Court aam shehri ke liye bilkul muft hai, koi sarkari fees nahi lagti.',
      'Adaalat cheez ke paison ke sath zehni pareshani ka Harjana bhi dilwati hai.'
    ],
    rightsUrdu: ['خریدا ہوا مال واپس نہ ہونا غیر قانونی ہے۔'],
    rightsEnglish: ['"No refund" policies are legally void.'],
    actionStepsRomanUrdu: [
      'Kharidari ka bill / receipt ya warranty card sanbhaal kar rakhein.',
      'Dukandar ko registered daak se 15 din ka kanooni notice bhejein.',
      'Agar hal na ho to 30 din ke andar District Consumer Court mein sada dar-khwast dain.'
    ],
    actionStepsUrdu: ['15 دن کا نوٹس دے کر کنزیومر کورٹ میں دعویٰ کریں۔'],
    actionStepsEnglish: ['Send 15-day notice and file claim in Consumer Court.'],
    authorityRomanUrdu: 'District Consumer Court (Kachehri)',
    authorityUrdu: 'ڈسٹرکٹ کنزیومر کورٹ',
    authorityEnglish: 'District Consumer Court',
    keywordsUrdu: ['خراب چیز', 'کنزیومر کورٹ', 'دکان دار پیسے نہیں دیتا'],
    keywordsRomanUrdu: ['kharab cheez', 'consumer court', 'dukandar paise wapis nahi kar raha', 'warranty claim', 'faulty product', 'naqis samaan'],
    keywordsEnglish: ['consumer court', 'defective product', 'refund refusal']
  }
];

export const EMERGENCY_HELPLINES = [
  {
    nameRomanUrdu: 'Police Emergency Helpline',
    nameUrdu: 'پولیس ایمرجنسی ہیلپ لائن',
    nameEnglish: 'Police Emergency Helpline',
    number: '15',
    category: 'police',
    descriptionRomanUrdu: 'Khatray, larai, chori ya dacoity par 24 ghantay muft madad.'
  },
  {
    nameRomanUrdu: 'FIA Cybercrime Helpline',
    nameUrdu: 'ایف آئی اے سائبر کرائم ہیلپ لائن',
    nameEnglish: 'FIA Cyber Crime Helpline',
    number: '1991',
    category: 'cybercrime',
    descriptionRomanUrdu: 'WhatsApp blackmailing, fake tasweer, ya online fraud ki foran report.'
  },
  {
    nameRomanUrdu: 'Women Protection Helpline',
    nameUrdu: 'خواتین تحفظ ہیلپ لائن',
    nameEnglish: 'Women Protection Helpline',
    number: '1043',
    category: 'women',
    descriptionRomanUrdu: 'Khawateen par tashaddud, harassment aur jaidad ke masail ke liye.'
  },
  {
    nameRomanUrdu: 'Legal Aid Helpline (Muft Wakeel)',
    nameUrdu: 'لیگل ایڈ سوسائٹی (مفت قانونی مشورہ)',
    nameEnglish: 'Legal Aid Helpline',
    number: '0800-70806',
    category: 'legal_aid',
    descriptionRomanUrdu: 'Ghareeb aur mustahiq shehriyon ke liye bilkul muft kanooni mashwara.'
  },
  {
    nameRomanUrdu: 'Child Protection Helpline',
    nameUrdu: 'چائلڈ پروٹیکشن ہیلپ لائن',
    nameEnglish: 'Child Protection Helpline',
    number: '1121',
    category: 'children',
    descriptionRomanUrdu: 'Bachon par tashaddud ya gumshudgi ki foran itla ke liye.'
  },
  {
    nameRomanUrdu: 'Edhi Ambulance Emergency',
    nameUrdu: 'ایدھی ایمبولینس سروس',
    nameEnglish: 'Edhi Emergency Ambulance',
    number: '115',
    category: 'emergency',
    descriptionRomanUrdu: 'Medical emergency aur haadsaat par foran madad.'
  }
];
