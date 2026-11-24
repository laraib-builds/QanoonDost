'use client';

import React, { useState } from 'react';
import { LEGAL_GLOSSARY } from '@/lib/legalGlossary';
import { X, Search, BookOpen, HelpCircle } from 'lucide-react';

interface LegalGlossaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  isUrdu?: boolean;
}

export default function LegalGlossaryModal({
  isOpen,
  onClose,
  isUrdu = false
}: LegalGlossaryModalProps) {
  const [searchTerm, setSearchTerm] = useState('');

  if (!isOpen) return null;

  const filteredTerms = LEGAL_GLOSSARY.filter(t => {
    const term = searchTerm.toLowerCase();
    return (
      t.termUrdu.toLowerCase().includes(term) ||
      t.termEnglish.toLowerCase().includes(term) ||
      t.meaningUrdu.toLowerCase().includes(term) ||
      t.meaningEnglish.toLowerCase().includes(term) ||
      t.pronunciationUrdu.toLowerCase().includes(term)
    );
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-royal-950/75 backdrop-blur-sm animate-fade-in">
      <div className="bg-white w-full max-w-2xl max-h-[90vh] rounded-xl sm:rounded-2xl shadow-2xl flex flex-col border border-royal-200 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-royal-950 via-royal-900 to-royal-800 text-white p-3 sm:p-4 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-gold-400 flex-shrink-0" />
            <div className="min-w-0">
              <h3 className="text-sm sm:text-lg font-bold truncate">
                Kanooni Lughat (Court Words Asaan Matlab)
              </h3>
              <p className="text-[10px] sm:text-xs text-slate-300 truncate">
                Kachehri ke mushkil kanooni alfaz ke aam feham maani
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 sm:p-1.5 text-slate-300 hover:text-white rounded-lg flex-shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="p-3 border-b border-slate-200 bg-slate-50">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search lafz (jaise: Robkar, Mudai, Zamanat, Stay Order)..."
              className="w-full pl-9 pr-4 py-2 bg-white border border-slate-300 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-royal-700"
            />
          </div>
        </div>

        {/* Glossary Terms List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2.5">
          {filteredTerms.length === 0 ? (
            <div className="text-center py-8 text-slate-500">
              <HelpCircle className="w-8 h-8 mx-auto text-slate-300 mb-1" />
              <p className="text-sm font-bold">Koi lafz nahi mila</p>
            </div>
          ) : (
            filteredTerms.map((item, idx) => (
              <div
                key={idx}
                className="bg-slate-50 p-3 rounded-xl border border-slate-200 hover:border-gold-400 transition-all"
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <span className="text-base font-black text-royal-950">
                      {item.termUrdu}
                    </span>
                    <span className="text-xs text-slate-500 font-mono">
                      ({item.pronunciationUrdu})
                    </span>
                  </div>
                  <span className="text-[11px] font-mono font-bold text-royal-900 bg-royal-100 px-2 py-0.5 rounded">
                    {item.termEnglish}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-800 leading-relaxed mb-1.5 font-medium">
                  {item.meaningUrdu}
                </p>

                {item.practicalExampleUrdu && (
                  <div className="bg-amber-50 border border-amber-200/80 p-2 rounded-lg text-xs text-amber-950 flex items-start gap-1">
                    <span className="font-bold text-amber-900 flex-shrink-0">Misaal:</span>
                    <span>{item.practicalExampleUrdu}</span>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
