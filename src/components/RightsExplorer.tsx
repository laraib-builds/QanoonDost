'use client';

import React from 'react';
import { Shield, Users, Laptop, Home, Scale, Briefcase, ShoppingBag, CreditCard, ChevronRight } from 'lucide-react';

interface RightsExplorerProps {
  language: 'roman_urdu' | 'urdu' | 'english';
  onSelectQuery: (query: string) => void;
}

export default function RightsExplorer({ language, onSelectQuery }: RightsExplorerProps) {
  const isUrduScript = language === 'urdu';

  const topics = [
    {
      id: 'fir-police',
      title: isUrduScript ? 'تھانہ و ایف آئی آر' : 'Police & FIR Masail',
      desc: isUrduScript ? 'ایف آئی آر درج نہ ہو تو کیا کریں؟' : 'Police FIR darj na kare to kya karein? Sec 154 / 22-A',
      query: 'Police agar FIR darj na kare to aam shehri kya kare?',
      icon: <Shield className="w-5 h-5 text-red-600" />,
      badge: 'Section 154 / 22-A CrPC',
      bgColor: 'bg-red-50/70 hover:bg-red-50 border-red-200'
    },
    {
      id: 'family-kharcha',
      title: isUrduScript ? 'بیوی و بچوں کا خرچہ' : 'Biwi & Bachon Ka Kharcha',
      desc: isUrduScript ? 'ماہانہ نان نفقہ کا قانونی حق' : 'Shoher kharcha na de to Family Court se recovery',
      query: 'Biwi aur bachon ka monthly kanooni kharcha',
      icon: <Users className="w-5 h-5 text-purple-600" />,
      badge: 'MFLO Section 9',
      bgColor: 'bg-purple-50/70 hover:bg-purple-50 border-purple-200'
    },
    {
      id: 'cybercrime',
      title: isUrduScript ? 'سائبر کرائم و بلیک میلنگ' : 'WhatsApp Blackmailing & Scam',
      desc: isUrduScript ? 'آن لائن ہراسانی پر ایف آئی اے کارروائی' : 'Fake tasweer, video ya blackmailing par FIA 1991',
      query: 'WhatsApp par blackmailing ya harassment ki complaint',
      icon: <Laptop className="w-5 h-5 text-blue-600" />,
      badge: 'PECA Act 2016',
      bgColor: 'bg-blue-50/70 hover:bg-blue-50 border-blue-200'
    },
    {
      id: 'property-tenancy',
      title: isUrduScript ? 'کرایہ داری و مکان خالی' : 'Makan Malik & Kirayedar',
      desc: isUrduScript ? 'زبردستی تالا لگانے پر پابندی' : 'Bina notice saman nikalna ya tala lagana jurm',
      query: 'Makan malik bina adalti notice nikal sakta hai?',
      icon: <Home className="w-5 h-5 text-emerald-600" />,
      badge: 'Rented Premises Act',
      bgColor: 'bg-emerald-50/70 hover:bg-emerald-50 border-emerald-200'
    },
    {
      id: 'check-bounce',
      title: isUrduScript ? 'چیک باؤنس (489-F)' : 'Bank Check Bounce (489-F)',
      desc: isUrduScript ? 'بوگس چیک پر 3 سال قید' : 'Check dishonor hone par foran police FIR',
      query: 'Check bounce hone par dhara 489-F',
      icon: <CreditCard className="w-5 h-5 text-amber-600" />,
      badge: 'Section 489-F PPC',
      bgColor: 'bg-amber-50/70 hover:bg-amber-50 border-amber-200'
    },
    {
      id: 'khula-rights',
      title: isUrduScript ? 'خلع اور جہیز کی واپسی' : 'Khula & Jahez Wapsi',
      desc: isUrduScript ? 'شوہر کی اجازت کے بغیر خلع' : 'Shoher ki marzi ke baghair adalat se Khula',
      query: 'Khula ka tareeqa aur jahez wapsi',
      icon: <Scale className="w-5 h-5 text-indigo-600" />,
      badge: 'Family Courts Act',
      bgColor: 'bg-indigo-50/70 hover:bg-indigo-50 border-indigo-200'
    },
    {
      id: 'wirasat-nadra',
      title: isUrduScript ? 'نادرا وراثت سرٹیفکیٹ' : 'Wirasat (Inheritance) NADRA',
      desc: isUrduScript ? '15 دن میں جانشینی سرٹیفکیٹ' : 'Marhoom ke bank account ke liye 15 din mein certificate',
      query: 'Wirasat succession certificate nadra se kaise banega',
      icon: <Briefcase className="w-5 h-5 text-teal-600" />,
      badge: 'Succession Act 2020',
      bgColor: 'bg-teal-50/70 hover:bg-teal-50 border-teal-200'
    },
    {
      id: 'consumer-rights',
      title: isUrduScript ? 'کنزیومر کورٹ مفت ہرجانہ' : 'Kharab Cheez & Consumer Court',
      desc: isUrduScript ? 'ناقص مال پر دکاندار سے رقم واپسی' : 'Dukandar paise wapis na kare to bila fees Consumer Court',
      query: 'Dukandar kharab cheez wapis na kare to consumer court',
      icon: <ShoppingBag className="w-5 h-5 text-rose-600" />,
      badge: 'Consumer Protection',
      bgColor: 'bg-rose-50/70 hover:bg-rose-50 border-rose-200'
    }
  ];

  return (
    <div className="my-6">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h2 className="text-base sm:text-lg font-black text-royal-950">
            {isUrduScript ? 'عام شہریوں کے اہم قانونی موضوعات' : 'Aam Shehriyon Ke Roz-Marrah Masail (Tap to View):'}
          </h2>
          <p className="text-xs text-slate-500">
            {isUrduScript ? 'کسی بھی کارڈ پر کلک کر کے فوری قانونی حل جانئے:' : 'Kisi bhi card par tap karein aur foran kanoon aur dhara dekhein:'}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
        {topics.map((t) => (
          <div
            key={t.id}
            onClick={() => onSelectQuery(t.query)}
            className={`p-3.5 rounded-xl border transition-all cursor-pointer shadow-xs hover:shadow-md hover:border-gold-400 group flex flex-col justify-between ${t.bgColor}`}
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="p-1.5 rounded-lg bg-white shadow-xs">
                  {t.icon}
                </div>
                <span className="text-[10px] font-mono font-bold bg-white text-royal-950 border border-slate-200 px-2 py-0.5 rounded-full">
                  {t.badge}
                </span>
              </div>
              <h3 className="text-sm font-bold text-royal-950 mb-0.5 group-hover:text-royal-700 transition-colors">
                {t.title}
              </h3>
              <p className="text-xs text-slate-600 leading-snug">
                {t.desc}
              </p>
            </div>

            <div className="mt-2.5 pt-2 border-t border-slate-200/50 flex items-center justify-between text-xs font-bold text-royal-800">
              <span className="text-[11px]">Hal Dekhein</span>
              <ChevronRight className="w-3.5 h-3.5 text-gold-600 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
