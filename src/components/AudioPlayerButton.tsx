'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Pause, Play } from 'lucide-react';

interface AudioPlayerButtonProps {
  textToSpeak: string;
  language?: 'roman_urdu' | 'urdu' | 'english';
  label?: string;
  compact?: boolean;
}

export default function AudioPlayerButton({
  textToSpeak,
  language = 'roman_urdu',
  label = 'Audio Suniye (Aawaz mein samjhein)',
  compact = false
}: AudioPlayerButtonProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [speechRate, setSpeechRate] = useState<number>(0.95);
  const synthRef = useRef<SpeechSynthesis | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      synthRef.current = window.speechSynthesis;
    }
    return () => {
      if (synthRef.current) {
        synthRef.current.cancel();
      }
    };
  }, []);

  const cleanText = (raw: string): string => {
    return raw
      .replace(/[*#_~`>]/g, ' ')
      .replace(/https?:\/\/\S+/g, '')
      .replace(/\s+/g, ' ')
      .trim();
  };

  const startSpeaking = () => {
    if (!synthRef.current) return;

    if (isPaused) {
      synthRef.current.resume();
      setIsPaused(false);
      setIsPlaying(true);
      return;
    }

    synthRef.current.cancel();

    const clean = cleanText(textToSpeak);
    if (!clean) return;

    const utterance = new SpeechSynthesisUtterance(clean);

    // Pick best available voice
    const voices = synthRef.current.getVoices();
    if (language === 'urdu') {
      utterance.lang = 'ur-PK';
      const urduVoice = voices.find(v => v.lang.startsWith('ur') || v.name.toLowerCase().includes('urdu'));
      if (urduVoice) utterance.voice = urduVoice;
    } else {
      // For Roman Urdu, English/Hindi voices read phonetic words very clearly
      utterance.lang = 'en-US';
      const clearVoice = voices.find(v => v.lang.includes('IN') || v.lang.includes('US'));
      if (clearVoice) utterance.voice = clearVoice;
    }

    utterance.rate = speechRate;

    utterance.onstart = () => {
      setIsPlaying(true);
      setIsPaused(false);
    };

    utterance.onend = () => {
      setIsPlaying(false);
      setIsPaused(false);
    };

    utterance.onerror = () => {
      setIsPlaying(false);
      setIsPaused(false);
    };

    synthRef.current.speak(utterance);
  };

  const pauseSpeaking = () => {
    if (!synthRef.current) return;
    synthRef.current.pause();
    setIsPaused(true);
    setIsPlaying(false);
  };

  const stopSpeaking = () => {
    if (!synthRef.current) return;
    synthRef.current.cancel();
    setIsPlaying(false);
    setIsPaused(false);
  };

  return (
    <div className="flex flex-wrap items-center gap-2 bg-gold-50 border border-gold-300/80 px-3 py-2 rounded-xl text-royal-950 shadow-xs">
      <div className="flex items-center gap-2">
        {!isPlaying ? (
          <button
            onClick={startSpeaking}
            className="flex items-center gap-2 px-3 py-1.5 bg-royal-900 hover:bg-royal-800 text-white rounded-lg text-xs sm:text-sm font-bold shadow-sm transition-transform active:scale-95"
          >
            <Volume2 className="w-4 h-4 text-gold-400 animate-pulse" />
            <span>{isPaused ? 'Chalaayein (Resume)' : label}</span>
          </button>
        ) : (
          <>
            <button
              onClick={pauseSpeaking}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-gold-500 hover:bg-gold-600 text-royal-950 font-bold rounded-lg text-xs sm:text-sm shadow-sm transition-colors"
            >
              <Pause className="w-4 h-4" />
              <span>Rokein (Pause)</span>
            </button>
            <button
              onClick={stopSpeaking}
              className="flex items-center gap-1.5 px-2.5 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-semibold transition-colors"
            >
              <VolumeX className="w-3.5 h-3.5" />
              <span>Band Karein</span>
            </button>
          </>
        )}
      </div>

      <div className="flex items-center gap-1.5 text-xs text-royal-900 mr-auto">
        <span className="font-medium text-slate-600">Speed:</span>
        <button
          onClick={() => setSpeechRate(0.85)}
          className={`px-2 py-0.5 rounded text-xs transition-colors ${
            speechRate < 0.9 ? 'bg-royal-900 text-white font-bold' : 'bg-white text-slate-700 border border-slate-200'
          }`}
        >
          Slow
        </button>
        <button
          onClick={() => setSpeechRate(1.0)}
          className={`px-2 py-0.5 rounded text-xs transition-colors ${
            speechRate >= 0.9 ? 'bg-royal-900 text-white font-bold' : 'bg-white text-slate-700 border border-slate-200'
          }`}
        >
          Normal
        </button>
      </div>

      {isPlaying && (
        <span className="text-xs text-emerald-700 font-bold animate-pulse flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          Aawaz chal rahi hai...
        </span>
      )}
    </div>
  );
}
