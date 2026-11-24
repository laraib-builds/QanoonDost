'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Pause, Play, Loader2, Sparkles } from 'lucide-react';

interface AudioPlayerButtonProps {
  textToSpeak: string;
  urduTextToSpeak?: string;
  language?: 'roman_urdu' | 'urdu' | 'english';
  label?: string;
  compact?: boolean;
}

export default function AudioPlayerButton({
  textToSpeak,
  urduTextToSpeak,
  language = 'roman_urdu',
  label = 'Aawaz mein suniye (اردو آواز)',
  compact = false
}: AudioPlayerButtonProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [speechRate, setSpeechRate] = useState<number>(1.0);
  const [audioSource, setAudioSource] = useState<'api' | 'synth'>('api');

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      synthRef.current = window.speechSynthesis;
    }
    return () => {
      stopAllAudio();
    };
  }, []);

  const cleanText = (raw: string): string => {
    return raw
      .replace(/[*#_~`>]/g, ' ')
      .replace(/https?:\/\/\S+/g, '')
      .replace(/\s+/g, ' ')
      .trim();
  };

  const stopAllAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = '';
      audioRef.current = null;
    }
    if (synthRef.current) {
      synthRef.current.cancel();
    }
    setIsPlaying(false);
    setIsPaused(false);
    setIsLoading(false);
  };

  const startSpeaking = async () => {
    // If paused, simply resume
    if (isPaused) {
      if (audioRef.current && audioSource === 'api') {
        audioRef.current.playbackRate = speechRate;
        audioRef.current.play();
        setIsPaused(false);
        setIsPlaying(true);
        return;
      }
      if (synthRef.current && audioSource === 'synth') {
        synthRef.current.resume();
        setIsPaused(false);
        setIsPlaying(true);
        return;
      }
    }

    stopAllAudio();

    // Determine target language and best text for natural pronunciation
    // When in Urdu or Roman Urdu, we speak natural Urdu script so TTS engine pronounces native Urdu
    const isEnglish = language === 'english';
    const targetLang = isEnglish ? 'en' : 'ur';
    const textForTts = isEnglish
      ? cleanText(textToSpeak)
      : cleanText(urduTextToSpeak || textToSpeak);

    if (!textForTts) return;

    setIsLoading(true);

    try {
      // 1. First choice: Use high-fidelity natural Urdu TTS API (Google Urdu stream)
      const ttsUrl = `/api/tts?lang=${encodeURIComponent(targetLang)}&text=${encodeURIComponent(textForTts)}`;
      const audio = new Audio(ttsUrl);
      audio.playbackRate = speechRate;

      audio.oncanplaythrough = () => {
        setIsLoading(false);
      };

      audio.onplay = () => {
        setIsPlaying(true);
        setIsPaused(false);
        setIsLoading(false);
        setAudioSource('api');
      };

      audio.onended = () => {
        setIsPlaying(false);
        setIsPaused(false);
        audioRef.current = null;
      };

      audio.onerror = () => {
        console.warn('TTS API error, falling back to browser SpeechSynthesis');
        playWithSpeechSynthesis(textForTts, targetLang);
      };

      audioRef.current = audio;
      await audio.play();
    } catch (err) {
      console.warn('Audio playback error, fallback to SpeechSynthesis:', err);
      playWithSpeechSynthesis(textForTts, targetLang);
    }
  };

  const playWithSpeechSynthesis = (text: string, targetLang: string) => {
    if (!synthRef.current) {
      setIsLoading(false);
      return;
    }

    synthRef.current.cancel();
    setAudioSource('synth');

    const utterance = new SpeechSynthesisUtterance(text);
    const voices = synthRef.current.getVoices();

    if (targetLang === 'ur') {
      // Look for pure Urdu voices first
      const urduVoice = voices.find(
        (v) =>
          v.lang.startsWith('ur') ||
          v.name.toLowerCase().includes('urdu') ||
          v.name.toLowerCase().includes('pakistan')
      );

      // Hindi voices share identical spoken phonetics, dental consonants, and stress with Urdu
      const hindiVoice = voices.find(
        (v) => v.lang.startsWith('hi') || v.name.toLowerCase().includes('hindi')
      );

      // South Asian English voice as last phonetic resort
      const indianVoice = voices.find((v) => v.lang.includes('IN'));

      if (urduVoice) {
        utterance.voice = urduVoice;
        utterance.lang = urduVoice.lang;
      } else if (hindiVoice) {
        utterance.voice = hindiVoice;
        utterance.lang = hindiVoice.lang;
      } else if (indianVoice) {
        utterance.voice = indianVoice;
        utterance.lang = indianVoice.lang;
      } else {
        utterance.lang = 'ur-PK';
      }
    } else {
      utterance.lang = 'en-US';
      const engVoice = voices.find((v) => v.lang.startsWith('en'));
      if (engVoice) utterance.voice = engVoice;
    }

    utterance.rate = speechRate;

    utterance.onstart = () => {
      setIsPlaying(true);
      setIsPaused(false);
      setIsLoading(false);
    };

    utterance.onend = () => {
      setIsPlaying(false);
      setIsPaused(false);
    };

    utterance.onerror = () => {
      setIsPlaying(false);
      setIsPaused(false);
      setIsLoading(false);
    };

    synthRef.current.speak(utterance);
  };

  const pauseSpeaking = () => {
    if (audioSource === 'api' && audioRef.current) {
      audioRef.current.pause();
    } else if (synthRef.current) {
      synthRef.current.pause();
    }
    setIsPaused(true);
    setIsPlaying(false);
  };

  const handleRateChange = (newRate: number) => {
    setSpeechRate(newRate);
    if (audioRef.current && audioSource === 'api') {
      audioRef.current.playbackRate = newRate;
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-2 bg-gradient-to-r from-gold-50 via-amber-50 to-gold-50 border border-gold-300 rounded-xl p-2.5 text-royal-950 shadow-xs">
      <div className="flex items-center gap-2">
        {!isPlaying ? (
          <button
            onClick={startSpeaking}
            disabled={isLoading}
            className="flex items-center gap-2 px-3 py-1.5 bg-royal-900 hover:bg-royal-800 text-white rounded-lg text-xs sm:text-sm font-bold shadow-sm transition-transform active:scale-95 disabled:opacity-75"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 text-gold-400 animate-spin" />
            ) : (
              <Volume2 className="w-4 h-4 text-gold-400 animate-pulse" />
            )}
            <span>
              {isLoading
                ? 'آواز لوڈ ہو رہی ہے...'
                : isPaused
                ? 'Chalaayein (Resume)'
                : label}
            </span>
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
              onClick={stopAllAudio}
              className="flex items-center gap-1.5 px-2.5 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-semibold transition-colors"
            >
              <VolumeX className="w-3.5 h-3.5" />
              <span>Band Karein</span>
            </button>
          </>
        )}
      </div>

      {/* Speed Controls */}
      <div className="flex items-center gap-1 text-[11px] sm:text-xs text-royal-900 mr-auto">
        <span className="font-semibold text-slate-600">Speed:</span>
        <button
          onClick={() => handleRateChange(0.85)}
          className={`px-1.5 py-0.5 rounded transition-colors ${
            speechRate < 0.95
              ? 'bg-royal-900 text-white font-bold'
              : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          Slow
        </button>
        <button
          onClick={() => handleRateChange(1.0)}
          className={`px-1.5 py-0.5 rounded transition-colors ${
            speechRate >= 0.95 && speechRate <= 1.05
              ? 'bg-royal-900 text-white font-bold'
              : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          Normal
        </button>
      </div>

      {/* Live Audio Badge */}
      <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-100/70 border border-emerald-300/60 px-2 py-0.5 rounded-full">
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        <span>مستند اردو آواز</span>
      </div>
    </div>
  );
}
