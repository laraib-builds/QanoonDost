'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import VoiceInputButton from '@/components/VoiceInputButton';
import QueryCard from '@/components/QueryCard';
import RightsExplorer from '@/components/RightsExplorer';
import HelplineBanner from '@/components/HelplineBanner';
import FIRDrafterModal from '@/components/FIRDrafterModal';
import LegalGlossaryModal from '@/components/LegalGlossaryModal';
import { LegalQueryResult } from '@/types/law';
import { queryPakistaniLaw } from '@/lib/legalEngine';
import {
  Search,
  Scale,
  ShieldCheck,
  History,
  Trash2,
  Mic,
  Volume2,
  FileCheck2,
  Sparkles
} from 'lucide-react';

export default function Home() {
  // Default language is now Roman Urdu!
  const [lang, setLang] = useState<'roman_urdu' | 'urdu' | 'english'>('roman_urdu');
  const [fontSize, setFontSize] = useState<'sm' | 'md' | 'lg' | 'xl'>('md');
  const [inputQuery, setInputQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentResult, setCurrentResult] = useState<LegalQueryResult | null>(null);
  const [recentQueries, setRecentQueries] = useState<string[]>([]);

  // Modals
  const [isDrafterOpen, setIsDrafterOpen] = useState(false);
  const [initialDrafterTemplate, setInitialDrafterTemplate] = useState('fir-application-sho');
  const [isGlossaryOpen, setIsGlossaryOpen] = useState(false);

  const isUrduScript = lang === 'urdu';

  // Read saved recent queries
  useEffect(() => {
    try {
      const saved = localStorage.getItem('qanoondost_history');
      if (saved) {
        setRecentQueries(JSON.parse(saved));
      }
    } catch (e) {}
  }, []);

  // Update HTML direction and language
  useEffect(() => {
    document.documentElement.dir = isUrduScript ? 'rtl' : 'ltr';
    document.documentElement.lang = isUrduScript ? 'ur' : 'en';
  }, [isUrduScript]);

  // Adjust font size
  useEffect(() => {
    document.body.className = `font-size-${fontSize}`;
  }, [fontSize]);

  const handleSearch = async (queryText?: string) => {
    const textToSearch = (queryText !== undefined ? queryText : inputQuery).trim();
    if (!textToSearch) return;

    setIsLoading(true);

    try {
      const response = await fetch('/api/legal-query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: textToSearch })
      });

      if (response.ok) {
        const data = await response.json();
        setCurrentResult(data.result);
      } else {
        const fallback = queryPakistaniLaw(textToSearch);
        setCurrentResult(fallback);
      }

      setRecentQueries((prev) => {
        const updated = [textToSearch, ...prev.filter(q => q !== textToSearch)].slice(0, 5);
        try {
          localStorage.setItem('qanoondost_history', JSON.stringify(updated));
        } catch (e) {}
        return updated;
      });
    } catch (error) {
      console.error('Search error:', error);
      const fallback = queryPakistaniLaw(textToSearch);
      setCurrentResult(fallback);
    } finally {
      setIsLoading(false);
    }
  };

  const clearHistory = () => {
    setRecentQueries([]);
    try {
      localStorage.removeItem('qanoondost_history');
    } catch (e) {}
  };

  const handleOpenDrafterWith = (templateId: string) => {
    setInitialDrafterTemplate(templateId);
    setIsDrafterOpen(true);
  };

  const sampleQuickChips = [
    { text: 'Police FIR darj na kare to kya karein?', label: 'Police FIR Inkar' },
    { text: 'Biwi aur bachon ka monthly kanooni kharcha', label: 'Biwi Ka Kharcha' },
    { text: 'WhatsApp par blackmailing ya harassment complaint', label: 'WhatsApp Blackmail' },
    { text: 'Check bounce hone par dhara 489-F', label: 'Check Bounce' },
    { text: 'Makan malik bina adalti notice nikal sakta hai?', label: 'Kirayedar Rights' },
    { text: 'Wirasat succession certificate nadra se kaise banega', label: 'Wirasat NADRA' }
  ];

  return (
    <div className={`min-h-screen flex flex-col bg-[#F8FAFC] text-[#0F172A] ${isUrduScript ? 'font-urdu' : ''}`}>
      {/* Navbar with Roman Urdu default */}
      <Navbar
        language={lang}
        onChangeLanguage={setLang}
        fontSize={fontSize}
        onChangeFontSize={setFontSize}
        onOpenDrafter={() => setIsDrafterOpen(true)}
        onOpenGlossary={() => setIsGlossaryOpen(true)}
      />

      <main className="flex-1 max-w-5xl w-full mx-auto px-2.5 sm:px-6 py-4 sm:py-8">
        {/* HERO SECTION - COMPACT, MODERN & FRIENDLY */}
        <div className="relative rounded-2xl sm:rounded-3xl bg-gradient-to-br from-royal-950 via-royal-900 to-royal-800 text-white p-4 sm:p-8 md:p-10 shadow-xl border border-royal-700/60 overflow-hidden mb-5 sm:mb-6">
          <div className="relative z-10 max-w-2xl mx-auto text-center">
            
            {/* National Legal Emblem Badge */}
            <div className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-white/10 border border-gold-400/30 text-gold-300 text-[10px] sm:text-xs font-bold mb-2.5 sm:mb-3">
              <Scale className="w-3.5 h-3.5 text-gold-400" />
              <span>Pakistani Qanoon & Dhara - 100% Verified</span>
            </div>

            {/* Headline */}
            <h1 className="text-xl sm:text-3xl md:text-4xl font-black text-white mb-2 tracking-tight">
              {isUrduScript ? (
                'اپنا قانونی مسئلہ بیان کریں یا بولیں'
              ) : (
                <>
                  Apna Masla Batayein ya <span className="text-gold-400">Bolein</span>
                </>
              )}
            </h1>

            {/* Concise Subtitle */}
            <p className="text-xs sm:text-sm text-slate-200 mb-4 sm:mb-6 font-normal">
              {isUrduScript
                ? 'عام فہم زبان اور مستند قانونی دفعات کے ساتھ فوری حل جانئے۔'
                : 'Pakistani kanoon ab har aam shehri ki samajh mein. Mic par bolein ya likhein:'}
            </p>

            {/* SEARCH & VOICE INPUT BAR */}
            <div className="bg-white rounded-xl sm:rounded-2xl p-1.5 sm:p-2 shadow-2xl border-2 border-gold-400 flex items-center gap-1.5 sm:gap-2 text-royal-950 w-full">
              {/* Voice Input Button */}
              <div className="flex-shrink-0">
                <VoiceInputButton
                  language={lang}
                  onTranscript={(spokenText) => {
                    setInputQuery(spokenText);
                    handleSearch(spokenText);
                  }}
                />
              </div>

              {/* Text Input */}
              <input
                type="text"
                value={inputQuery}
                onChange={(e) => setInputQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                placeholder={
                  isUrduScript
                    ? 'اپنا سوال لکھیں یا مائیک دبائیں...'
                    : 'Masla likhein ya mic dabayein...'
                }
                className="min-w-0 flex-1 py-2 sm:py-2.5 px-1.5 sm:px-2 text-xs sm:text-base bg-transparent focus:outline-none text-royal-950 placeholder:text-slate-400 font-medium"
              />

              {/* Search Button */}
              <button
                onClick={() => handleSearch()}
                disabled={isLoading}
                className="flex-shrink-0 flex items-center gap-1 px-3 sm:px-5 py-2 sm:py-2.5 bg-royal-900 hover:bg-royal-800 text-white font-bold rounded-lg sm:rounded-xl text-xs sm:text-sm transition-all shadow-sm active:scale-95 disabled:opacity-50"
              >
                {isLoading ? (
                  <span className="w-4 h-4 border-2 border-gold-400 border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Search className="w-4 h-4 text-gold-400" />
                )}
                <span className="hidden xs:inline">Search</span>
              </button>
            </div>

            {/* Voice hint */}
            <div className="flex items-center justify-center gap-1.5 mt-2 text-[10px] sm:text-[11px] text-gold-300 text-center px-1">
              <Mic className="w-3 h-3 text-gold-400 animate-pulse flex-shrink-0" />
              <span>Peela mic daba kar Roman Urdu ya Urdu mein bol kar sawal poochein</span>
            </div>

            {/* 1-Tap Quick Question Chips */}
            <div className="flex flex-wrap items-center justify-center gap-1.5 mt-3 sm:mt-4">
              <span className="text-[10px] sm:text-[11px] text-slate-300 font-medium mr-1">Sample sawalat:</span>
              {sampleQuickChips.slice(0, 4).map((chip, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setInputQuery(chip.text);
                    handleSearch(chip.text);
                  }}
                  className="px-2 sm:px-2.5 py-0.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-[10px] sm:text-[11px] text-slate-200 hover:text-white transition-all"
                >
                  {chip.label}
                </button>
              ))}
            </div>

          </div>
        </div>

        {/* RECENT SEARCHES */}
        {recentQueries.length > 0 && !currentResult && (
          <div className="bg-white border border-slate-200 rounded-xl p-2 sm:p-2.5 mb-4 shadow-xs flex items-center justify-between text-xs gap-1.5 overflow-hidden w-full">
            <div className="flex items-center gap-1.5 overflow-x-auto py-0.5 min-w-0 flex-1 scrollbar-none">
              <span className="font-bold text-slate-500 flex items-center gap-1 flex-shrink-0 text-[11px] sm:text-xs">
                <History className="w-3.5 h-3.5 text-royal-700" />
                Haaliyah:
              </span>
              {recentQueries.map((q, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setInputQuery(q);
                    handleSearch(q);
                  }}
                  className="px-2 py-0.5 bg-slate-100 hover:bg-gold-50 hover:text-royal-900 border border-slate-200 rounded-lg text-slate-700 whitespace-nowrap text-[11px] sm:text-xs flex-shrink-0 max-w-[180px] sm:max-w-xs truncate"
                  title={q}
                >
                  {q}
                </button>
              ))}
            </div>
            <button
              onClick={clearHistory}
              title="Clear history"
              className="p-1 text-slate-400 hover:text-red-600 transition-colors flex-shrink-0"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* EMERGENCY HELPLINE BAR */}
        <HelplineBanner language={lang} />

        {/* LOADING STATE */}
        {isLoading && (
          <div className="bg-white border border-royal-100 rounded-2xl p-6 sm:p-8 text-center my-4 shadow-sm animate-pulse">
            <div className="w-10 h-10 rounded-full bg-gold-100 border border-gold-300 mx-auto flex items-center justify-center text-royal-900 mb-2 animate-spin">
              <Scale className="w-5 h-5 text-gold-600" />
            </div>
            <h3 className="text-sm sm:text-base font-bold text-royal-950">
              Pakistani kanoon aur dhara check ki ja rahi hai...
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Constitution, CrPC, PPC, MFLO aur PECA references cross-reference ho rahe hain
            </p>
          </div>
        )}

        {/* ACTIVE QUERY RESULT CARD */}
        {currentResult && !isLoading && (
          <QueryCard
            result={currentResult}
            language={lang}
            onOpenDrafterWithTemplate={handleOpenDrafterWith}
          />
        )}

        {/* BITE-SIZED TOPIC CARDS (RIGHTS EXPLORER) */}
        <RightsExplorer
          language={lang}
          onSelectQuery={(q) => {
            setInputQuery(q);
            handleSearch(q);
            window.scrollTo({ top: 180, behavior: 'smooth' });
          }}
        />

        {/* 3 CORE PILLARS (CLEAN & SHORT) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 my-6">
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex items-start gap-3">
            <div className="p-2 rounded-lg bg-royal-100 text-royal-900 flex-shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-royal-950">100% Asal Dhara & Section</h4>
              <p className="text-xs text-slate-500 mt-0.5">Agar kanoon mein dhara na ho to saaf inkar, koi man-gharat mashwara nahi.</p>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex items-start gap-3">
            <div className="p-2 rounded-lg bg-gold-100 text-gold-900 flex-shrink-0">
              <Volume2 className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-royal-950">Aawaz Mein Suniye</h4>
              <p className="text-xs text-slate-500 mt-0.5">Kam parhay likhay shehriyon ke liye bol kar sawal aur aawaz mein jawab.</p>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex items-start gap-3">
            <div className="p-2 rounded-lg bg-emerald-100 text-emerald-900 flex-shrink-0">
              <FileCheck2 className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-royal-950">Muft Dar-khwast / FIR Draft</h4>
              <p className="text-xs text-slate-500 mt-0.5">Thana SHO aur Session Judge ke liye tayyar kanooni dar-khwast print karein.</p>
            </div>
          </div>
        </div>

      </main>

      {/* FOOTER */}
      <footer className="bg-royal-950 text-white border-t border-royal-800 py-6 px-4 mt-8 text-xs">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gold-500 text-royal-950 flex items-center justify-center font-bold">
              <Scale className="w-4 h-4" />
            </div>
            <span className="font-bold text-sm font-urdu">قانون دوست</span>
            <span className="text-slate-400 text-[11px]">• Pakistan Public Legal Literacy</span>
          </div>

          <div className="text-slate-400 text-center sm:text-right text-[11px] leading-relaxed max-w-md">
            QanoonDost aam shehriyon ki agahi ke liye hai. Kisi adalti muqadmay ke liye Bar Council ke licensed wakeel se rabta karein.
          </div>
        </div>
      </footer>

      {/* MODALS */}
      <FIRDrafterModal
        isOpen={isDrafterOpen}
        onClose={() => setIsDrafterOpen(false)}
        isUrdu={isUrduScript}
        initialTemplateId={initialDrafterTemplate}
      />

      <LegalGlossaryModal
        isOpen={isGlossaryOpen}
        onClose={() => setIsGlossaryOpen(false)}
        isUrdu={isUrduScript}
      />
    </div>
  );
}
