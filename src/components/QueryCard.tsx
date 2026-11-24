'use client';

import React, { useState } from 'react';
import { LegalQueryResult } from '@/types/law';
import AudioPlayerButton from './AudioPlayerButton';
import {
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  MapPin,
  PhoneCall,
  Scale,
  Copy,
  Check,
  FileText,
  ChevronRight
} from 'lucide-react';

interface QueryCardProps {
  result: LegalQueryResult;
  language: 'roman_urdu' | 'urdu' | 'english';
  onOpenDrafterWithTemplate?: (templateId: string) => void;
}

export default function QueryCard({
  result,
  language,
  onOpenDrafterWithTemplate
}: QueryCardProps) {
  const [copied, setCopied] = useState(false);

  const isUrduScript = language === 'urdu';
  const isEnglish = language === 'english';

  const handleCopy = () => {
    const textToCopy = `QanoonDost Legal Guide:
Masla: ${result.userQuery}
Hal: ${result.laymanAnswerRomanUrdu}
Kanoon: ${result.citations.map(c => `${c.actNameRomanUrdu} (${c.sectionOrArticle})`).join(', ')}
Kahan Jayein: ${result.authoritiesToVisitRomanUrdu.join(', ')}`;

    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // Compile concise text for Audio
  const speechText = result.found
    ? `${result.laymanAnswerRomanUrdu}. Kanooni dhara: ${result.citations.map(c => `${c.actNameRomanUrdu} ${c.sectionOrArticle}`).join(' aur ')}. Agla qadam: ${result.practicalRoadmapRomanUrdu.join('. ')}. Kahan jayein: ${result.authoritiesToVisitRomanUrdu.join(', ')}.`
    : `${result.laymanAnswerRomanUrdu}. Baraye meherbani Bar Council ke licensed wakeel se rabta karein.`;

  // IF UNVERIFIED / NO STATUTORY PROVISION FOUND
  if (!result.found) {
    return (
      <div className="bg-white border-2 border-amber-300 rounded-2xl p-5 sm:p-6 shadow-md my-4 animate-fade-in">
        <div className="flex items-start gap-3 mb-3">
          <div className="p-2.5 bg-amber-100 text-amber-900 rounded-xl flex-shrink-0">
            <AlertTriangle className="w-5 h-5 text-amber-700" />
          </div>
          <div>
            <span className="inline-block text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300 mb-1">
              Kanooni Dhara Confirm Nahi Mili
            </span>
            <h3 className="text-base sm:text-lg font-bold text-royal-950">
              {isUrduScript ? result.laymanAnswerUrdu : isEnglish ? result.laymanAnswerEnglish : result.laymanAnswerRomanUrdu}
            </h3>
          </div>
        </div>

        {/* Audio Player */}
        <div className="my-3">
          <AudioPlayerButton textToSpeak={speechText} language={language} label="Aawaz mein suniye" />
        </div>

        {/* Clear Notice */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs sm:text-sm text-amber-950 leading-relaxed mb-4">
          {isUrduScript
            ? result.unverifiedDisclaimerUrdu
            : isEnglish
            ? result.unverifiedDisclaimerEnglish
            : result.unverifiedDisclaimerRomanUrdu}
        </div>

        {/* Next Steps */}
        <div className="space-y-1.5 mb-4">
          <span className="text-xs font-bold text-slate-700 block">Aap ko kya karna chahiye?</span>
          {(isUrduScript ? result.practicalRoadmapUrdu : result.practicalRoadmapRomanUrdu).map((step, idx) => (
            <div key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-slate-700">
              <span className="w-4 h-4 rounded-full bg-amber-200 text-amber-950 font-bold text-[10px] flex items-center justify-center flex-shrink-0">
                {idx + 1}
              </span>
              <span>{step}</span>
            </div>
          ))}
        </div>

        {/* Free Legal Aid Callout */}
        <div className="flex items-center justify-between p-3 bg-royal-900 text-white rounded-xl text-xs sm:text-sm">
          <div className="flex items-center gap-2">
            <PhoneCall className="w-4 h-4 text-gold-400" />
            <span>Muft Kanooni Helpline: <strong>0800-70806</strong></span>
          </div>
          <a
            href="tel:080070806"
            className="px-3 py-1 bg-gold-400 hover:bg-gold-500 text-royal-950 font-bold rounded-lg text-xs"
          >
            Call Karein
          </a>
        </div>
      </div>
    );
  }

  // IF FOUND - BITE-SIZED, VISUAL CARD
  const mainAnswer = isUrduScript
    ? result.laymanAnswerUrdu
    : isEnglish
    ? result.laymanAnswerEnglish
    : result.laymanAnswerRomanUrdu;

  const rights = isUrduScript
    ? result.primaryLaw?.rightsUrdu
    : isEnglish
    ? result.primaryLaw?.rightsEnglish
    : result.primaryLaw?.rightsRomanUrdu;

  const steps = isUrduScript
    ? result.practicalRoadmapUrdu
    : isEnglish
    ? result.practicalRoadmapEnglish
    : result.practicalRoadmapRomanUrdu;

  const authority = isUrduScript
    ? result.authoritiesToVisitUrdu[0]
    : isEnglish
    ? result.authoritiesToVisitEnglish[0]
    : result.authoritiesToVisitRomanUrdu[0];

  return (
    <div className="bg-white border-2 border-royal-200 rounded-2xl shadow-xl overflow-hidden my-6 transition-all animate-fade-in">
      {/* Top Banner Stripe */}
      <div className="bg-gradient-to-r from-royal-950 via-royal-900 to-royal-800 text-white px-4 py-3 flex flex-wrap items-center justify-between gap-2 border-b border-gold-500/30">
        <div className="flex items-center gap-2">
          <span className="p-1 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
            <ShieldCheck className="w-4 h-4" />
          </span>
          <span className="text-xs font-bold text-gold-400 uppercase tracking-wider">
            Verified Pakistani Statute
          </span>
        </div>

        <button
          onClick={handleCopy}
          className="flex items-center gap-1 text-xs text-slate-300 hover:text-white bg-white/10 px-2.5 py-1 rounded-lg transition-colors"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copied ? 'Copy ho gaya' : 'Copy'}</span>
        </button>
      </div>

      <div className="p-4 sm:p-6 space-y-4">
        {/* Title & Citation Chip */}
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-2">
            {result.citations.map((c, i) => (
              <span
                key={i}
                className="text-xs font-mono font-bold bg-gold-100 text-royal-950 border border-gold-300 px-2.5 py-0.5 rounded-full"
              >
                ⚖️ {c.actNameRomanUrdu} ({c.sectionOrArticle})
              </span>
            ))}
          </div>

          <h2 className="text-lg sm:text-xl font-black text-royal-950 tracking-tight">
            {isUrduScript ? result.primaryLaw?.titleUrdu : isEnglish ? result.primaryLaw?.titleEnglish : result.primaryLaw?.titleRomanUrdu}
          </h2>
        </div>

        {/* Audio Listen Bar */}
        <AudioPlayerButton textToSpeak={speechText} language={language} label="Aawaz mein suniye" />

        {/* CARD 1: Asaan Hal (Punchy 2 lines) */}
        <div className="bg-royal-50 border border-royal-100 rounded-xl p-3.5 sm:p-4 text-royal-950">
          <span className="text-[11px] font-bold uppercase tracking-wider text-royal-700 block mb-1">
            💡 Asaan Khulasa (Simple Explanation):
          </span>
          <p className="text-sm sm:text-base font-semibold leading-relaxed">
            {mainAnswer}
          </p>
        </div>

        {/* CARD 2: Aap Ke 3 Bunyadi Haqooq */}
        {rights && rights.length > 0 && (
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 sm:p-4">
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 block mb-2">
              🛡️ Aap Ke Qanooni Haqooq:
            </span>
            <ul className="space-y-1.5">
              {rights.map((r, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* CARD 3: 3-Step Action Plan */}
        <div className="bg-white border border-slate-200 rounded-xl p-3.5 sm:p-4 shadow-xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-royal-900 block mb-2">
            🚀 Aap Ko Kya Karna Hai (Next Steps):
          </span>
          <div className="space-y-2">
            {steps.map((st, idx) => (
              <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-800">
                <span className="w-5 h-5 rounded-full bg-royal-900 text-gold-400 font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <span className="leading-relaxed">{st}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CARD 4: Where to Go & Emergency Button */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
          <div className="bg-slate-100 p-3 rounded-xl border border-slate-200 flex items-center gap-2.5">
            <div className="p-2 bg-royal-900 text-white rounded-lg flex-shrink-0">
              <MapPin className="w-4 h-4 text-gold-400" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-500 uppercase block">Kahan Jana Hai:</span>
              <span className="text-xs sm:text-sm font-bold text-royal-950">{authority}</span>
            </div>
          </div>

          {result.emergencyHelpline && (
            <div className="bg-red-50 p-3 rounded-xl border border-red-200 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-red-600 uppercase block">Emergency Helpline:</span>
                <span className="text-base font-black text-red-900 font-mono">{result.emergencyHelpline.number}</span>
              </div>
              <a
                href={`tel:${result.emergencyHelpline.number}`}
                className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-1"
              >
                <PhoneCall className="w-3 h-3" />
                <span>Call Now</span>
              </a>
            </div>
          )}
        </div>

        {/* Quick Drafter Trigger */}
        {onOpenDrafterWithTemplate && (
          <button
            onClick={() => onOpenDrafterWithTemplate('fir-application-sho')}
            className="w-full flex items-center justify-between p-3 rounded-xl bg-gold-400/20 hover:bg-gold-400/30 border border-gold-400 text-royal-950 transition-colors text-xs sm:text-sm font-bold group"
          >
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-royal-900" />
              <span>Is maslay ki Tayyar Tehreeri Dar-khwast (Draft) Dekhein</span>
            </div>
            <ChevronRight className="w-4 h-4 text-royal-900 group-hover:translate-x-1 transition-transform" />
          </button>
        )}
      </div>
    </div>
  );
}
