'use client';

import React from 'react';
import { Phone, ShieldAlert, HeartHandshake, Laptop, Users, Siren } from 'lucide-react';
import { EMERGENCY_HELPLINES } from '@/lib/pakistanLawDatabase';

interface HelplineBannerProps {
  language: 'roman_urdu' | 'urdu' | 'english';
}

export default function HelplineBanner({ language }: HelplineBannerProps) {
  const isUrduScript = language === 'urdu';

  const getIcon = (category: string) => {
    switch (category) {
      case 'police': return <Siren className="w-4 h-4 text-red-600" />;
      case 'cybercrime': return <Laptop className="w-4 h-4 text-blue-600" />;
      case 'women': return <Users className="w-4 h-4 text-purple-600" />;
      case 'legal_aid': return <HeartHandshake className="w-4 h-4 text-emerald-600" />;
      default: return <Phone className="w-4 h-4 text-amber-600" />;
    }
  };

  return (
    <div className="bg-gradient-to-br from-royal-950 to-royal-900 text-white rounded-2xl p-3.5 sm:p-4 shadow-md border border-gold-500/30 my-4">
      <div className="flex items-center justify-between gap-2 mb-3 pb-2 border-b border-royal-800">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-gold-400" />
          <h3 className="text-xs sm:text-sm font-bold text-white">
            {isUrduScript ? 'اہم سرکاری و مفت ہیلپ لائنز (ڈائریکٹ کال کریں):' : 'Emergency & Muft Legal Helplines (Tap to Call):'}
          </h3>
        </div>
        <span className="text-[10px] text-slate-300 font-mono">24/7 Free</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
        {EMERGENCY_HELPLINES.map((item) => (
          <a
            key={item.number}
            href={`tel:${item.number}`}
            className="flex flex-col items-center justify-center p-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 hover:border-gold-400/50 transition-all text-center group active:scale-95"
            title={`${item.nameRomanUrdu}: ${item.number}`}
          >
            <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center mb-1 shadow-xs group-hover:scale-105 transition-transform">
              {getIcon(item.category)}
            </div>
            <span className="text-sm font-black text-gold-400 font-mono">
              {item.number}
            </span>
            <span className="text-[10px] font-semibold text-slate-200 line-clamp-1">
              {isUrduScript ? item.nameUrdu : item.nameRomanUrdu}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}
