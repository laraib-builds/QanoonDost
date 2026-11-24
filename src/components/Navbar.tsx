'use client';

import React from 'react';
import { Scale, BookOpen, FileText, PhoneCall, Globe, Type } from 'lucide-react';

interface NavbarProps {
  language: 'roman_urdu' | 'urdu' | 'english';
  onChangeLanguage: (lang: 'roman_urdu' | 'urdu' | 'english') => void;
  fontSize: 'sm' | 'md' | 'lg' | 'xl';
  onChangeFontSize: (size: 'sm' | 'md' | 'lg' | 'xl') => void;
  onOpenDrafter: () => void;
  onOpenGlossary: () => void;
}

export default function Navbar({
  language,
  onChangeLanguage,
  fontSize,
  onChangeFontSize,
  onOpenDrafter,
  onOpenGlossary
}: NavbarProps) {
  const isUrduScript = language === 'urdu';

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      {/* Top Ribbon */}
      <div className="bg-gradient-to-r from-royal-950 via-royal-900 to-royal-800 text-white px-3 sm:px-4 py-1 text-xs">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-[11px] sm:text-xs">
            <span className="w-2 h-2 rounded-full bg-gold-400 animate-pulse" />
            <span className="text-slate-200 font-medium">
              {isUrduScript
                ? 'پاکستان کے مروجہ قوانین کا مصدقہ پورٹل'
                : 'Pakistan Statutory Legal Portal - Verified Citations'}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <a
              href="tel:15"
              className="flex items-center gap-1 text-gold-400 font-bold bg-white/10 px-2 py-0.5 rounded text-[11px] hover:bg-white/20 transition-colors"
            >
              <PhoneCall className="w-3 h-3" />
              <span>Police 15</span>
            </a>
            <a
              href="tel:1991"
              className="hidden sm:flex items-center gap-1 text-sky-300 font-semibold bg-white/10 px-2 py-0.5 rounded text-[11px] hover:bg-white/20 transition-colors"
            >
              <span>FIA 1991</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-6xl mx-auto px-3 sm:px-4 py-2.5 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-royal-900 text-gold-400 flex items-center justify-center shadow-sm border border-gold-400/40 relative flex-shrink-0">
            <Scale className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-gold-500 rounded-full border-2 border-white flex items-center justify-center text-[7px] text-royal-950 font-black">
              ★
            </span>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="text-lg sm:text-xl font-black text-royal-950 tracking-tight">
                قانون دوست
              </h1>
              <span className="text-[10px] font-bold uppercase tracking-wider bg-gold-500/20 text-gold-800 px-1.5 py-0.2 rounded border border-gold-400/40">
                QanoonDost
              </span>
            </div>
            <p className="text-[10px] sm:text-[11px] text-slate-500 font-medium">
              Aam Shehriyon Ka Kanooni Dost
            </p>
          </div>
        </div>

        {/* Right Action Utilities */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Drafter Button */}
          <button
            onClick={onOpenDrafter}
            className="flex items-center gap-1 px-2.5 py-1.5 bg-royal-50 hover:bg-royal-100 text-royal-900 border border-royal-200 rounded-lg text-xs font-bold transition-colors"
          >
            <FileText className="w-3.5 h-3.5 text-royal-700" />
            <span className="hidden sm:inline">FIR / Dar-khwast</span>
            <span className="sm:hidden">Draft</span>
          </button>

          {/* Glossary Button */}
          <button
            onClick={onOpenGlossary}
            className="flex items-center gap-1 px-2.5 py-1.5 bg-gold-50 hover:bg-gold-100 text-gold-950 border border-gold-300 rounded-lg text-xs font-bold transition-colors"
          >
            <BookOpen className="w-3.5 h-3.5 text-gold-600" />
            <span className="hidden sm:inline">Lughat</span>
            <span className="sm:hidden">Lughat</span>
          </button>

          {/* Language Selector Dropdown / Pills */}
          <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200 text-xs">
            <button
              onClick={() => onChangeLanguage('roman_urdu')}
              className={`px-2 py-1 rounded-md text-[11px] font-bold transition-all ${
                language === 'roman_urdu'
                  ? 'bg-royal-900 text-gold-400 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Roman
            </button>
            <button
              onClick={() => onChangeLanguage('urdu')}
              className={`px-2 py-1 rounded-md text-[11px] font-bold transition-all font-urdu ${
                language === 'urdu'
                  ? 'bg-royal-900 text-gold-400 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              اردو
            </button>
            <button
              onClick={() => onChangeLanguage('english')}
              className={`px-2 py-1 rounded-md text-[11px] font-bold transition-all ${
                language === 'english'
                  ? 'bg-royal-900 text-gold-400 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              EN
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
