'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Volume2, X, Check, AlertCircle } from 'lucide-react';

interface VoiceInputButtonProps {
  onTranscript: (transcript: string) => void;
  language?: 'roman_urdu' | 'urdu' | 'english';
}

declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

export default function VoiceInputButton({
  onTranscript,
  language = 'roman_urdu'
}: VoiceInputButtonProps) {
  const [isListening, setIsListening] = useState(false);
  const [liveTranscript, setLiveTranscript] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [audioLevel, setAudioLevel] = useState(0);
  const [isSupported, setIsSupported] = useState(true);
  const [showVoiceModal, setShowVoiceModal] = useState(false);

  const recognitionRef = useRef<any>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const animFrameRef = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (!SpeechRecognition) {
        setIsSupported(false);
      }
    }
    return () => {
      cleanupAudio();
    };
  }, []);

  const cleanupAudio = () => {
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
    }
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach(track => track.stop());
      mediaStreamRef.current = null;
    }
    if (audioContextRef.current) {
      audioContextRef.current.close().catch(() => {});
      audioContextRef.current = null;
    }
  };

  const startAudioMeter = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaStreamRef.current = stream;

      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      const audioCtx = new AudioContextClass();
      audioContextRef.current = audioCtx;

      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 64;
      analyserRef.current = analyser;

      const source = audioCtx.createMediaStreamSource(stream);
      source.connect(analyser);

      const dataArray = new Uint8Array(analyser.frequencyBinCount);

      const updateMeter = () => {
        if (!analyserRef.current) return;
        analyserRef.current.getByteFrequencyData(dataArray);
        let sum = 0;
        for (let i = 0; i < dataArray.length; i++) {
          sum += dataArray[i];
        }
        const avg = sum / dataArray.length;
        setAudioLevel(Math.min(100, Math.round((avg / 128) * 100)));
        animFrameRef.current = requestAnimationFrame(updateMeter);
      };

      updateMeter();
    } catch (err: any) {
      console.warn('Audio meter init error (mic permission may be denied):', err);
    }
  };

  const startListening = async () => {
    setErrorMessage('');
    setLiveTranscript('');
    setShowVoiceModal(true);

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setErrorMessage('Aap ke browser mein voice recognition ki support nahi hai. Google Chrome ya Edge use karein.');
      return;
    }

    try {
      await startAudioMeter();

      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;

      // Smart language selection: For Roman Urdu and English, en-US or ur-PK
      // en-US/en-PK captures Roman Urdu phonetically very effectively, while ur-PK captures pure Urdu
      recognition.lang = language === 'urdu' ? 'ur-PK' : 'en-US';

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        let interim = '';
        let final = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const trans = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            final += trans;
          } else {
            interim += trans;
          }
        }

        const currentText = final || interim;
        if (currentText) {
          setLiveTranscript(currentText);
        }
      };

      recognition.onerror = (event: any) => {
        console.warn('Speech Recognition Event Error:', event.error);
        if (event.error === 'not-allowed') {
          setErrorMessage('Microphone ki permission block hai. Browser address bar mein mic icon par click kar ke Allow karein.');
        } else if (event.error === 'network') {
          // If network error on ur-PK, fallback to en-US
          if (recognition.lang === 'ur-PK') {
            recognition.lang = 'en-US';
            try { recognition.start(); return; } catch (e) {}
          }
          setErrorMessage('Internet ya speech service mein masla hai. Neeche sample sawal par tap karein ya text likhein.');
        } else if (event.error === 'no-speech') {
          // Keep listening or inform user
        } else {
          setErrorMessage(`Aawaz capture karne mein masla: ${event.error}`);
        }
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (err: any) {
      console.error('Start recognition error:', err);
      setErrorMessage('Microphone start nahi ho saka. Baraye meherbani Mic access Allow karein.');
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {}
    }
    cleanupAudio();
    setIsListening(false);
  };

  const handleConfirmTranscript = (overrideText?: string) => {
    const textToSend = overrideText || liveTranscript;
    if (textToSend.trim()) {
      onTranscript(textToSend.trim());
      setShowVoiceModal(false);
      stopListening();
    }
  };

  const handleCancel = () => {
    stopListening();
    setShowVoiceModal(false);
    setLiveTranscript('');
    setErrorMessage('');
  };

  // Sample voice prompts for instant testing
  const sampleVoicePrompts = [
    'Police FIR darj nahi kar rahi',
    'Biwi aur bachon ka monthly kharcha',
    'WhatsApp blackmailing FIA complaint',
    'Check bounce dhara 489-F',
    'Makan malik bina notice nikal raha hai'
  ];

  return (
    <>
      {/* Yellow Pulsing Mic Button */}
      <button
        type="button"
        onClick={startListening}
        title="Bolein (Urdu / Roman Urdu)"
        className="relative flex items-center justify-center w-12 h-12 rounded-full bg-gold-400 hover:bg-gold-500 text-royal-950 font-bold shadow-md hover:shadow-lg transition-all active:scale-95"
      >
        <Mic className="w-6 h-6 text-royal-950" />
        <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white animate-ping" />
      </button>

      {/* Interactive Voice Assistant Modal */}
      {showVoiceModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-royal-950/75 backdrop-blur-sm animate-fade-in">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl border-2 border-gold-400 overflow-hidden text-center p-6 flex flex-col items-center">
            
            {/* Top Close */}
            <div className="w-full flex justify-between items-center mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-royal-800 bg-gold-100 px-2.5 py-1 rounded-full border border-gold-300">
                🎙️ Voice Assistant
              </span>
              <button
                onClick={handleCancel}
                className="p-1 rounded-lg text-slate-400 hover:text-royal-950 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Big Animated Mic with Audio Waves */}
            <div className="relative my-4 flex items-center justify-center">
              <div
                className={`w-24 h-24 rounded-full flex items-center justify-center transition-transform ${
                  isListening
                    ? 'bg-gradient-to-tr from-gold-500 to-amber-400 shadow-xl'
                    : 'bg-slate-200'
                }`}
                style={{
                  transform: `scale(${1 + (audioLevel / 250)})`
                }}
              >
                <Mic className={`w-12 h-12 ${isListening ? 'text-royal-950 animate-pulse' : 'text-slate-500'}`} />
              </div>

              {/* Pulsing rings */}
              {isListening && (
                <>
                  <div className="absolute inset-0 rounded-full border-4 border-gold-400/40 animate-ping pointer-events-none" />
                  <div className="absolute -inset-3 rounded-full border border-gold-400/30 animate-pulse pointer-events-none" />
                </>
              )}
            </div>

            {/* Live Volume Meter Bar */}
            {isListening && (
              <div className="w-48 h-2 bg-slate-100 rounded-full overflow-hidden mb-3 border border-slate-200">
                <div
                  className="h-full bg-gradient-to-r from-emerald-500 via-gold-500 to-red-500 transition-all duration-75"
                  style={{ width: `${Math.max(8, audioLevel)}%` }}
                />
              </div>
            )}

            {/* Status Heading */}
            <h3 className="text-lg font-bold text-royal-950 mb-1">
              {isListening ? 'Aap ki aawaz sun rahe hain...' : 'Sunna band ho gaya'}
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Urdu ya Roman Urdu mein apna masla bolein (jaise: "Police FIR nahi kaat rahi")
            </p>

            {/* Real-time Live Transcript Box */}
            <div className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 min-h-[75px] max-h-[120px] overflow-y-auto mb-4 text-sm text-slate-800 text-center flex items-center justify-center">
              {liveTranscript ? (
                <span className="font-semibold text-royal-900 text-base">"{liveTranscript}"</span>
              ) : (
                <span className="text-xs text-slate-400 italic">
                  {isListening ? '...kuch bolein, alfaaz yahan nazar aayenge...' : 'Koi aawaz capture nahi hui'}
                </span>
              )}
            </div>

            {/* Error Message if Any */}
            {errorMessage && (
              <div className="w-full bg-red-50 border border-red-200 rounded-xl p-3 mb-4 text-left flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-red-700 leading-relaxed font-medium">{errorMessage}</p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="w-full flex gap-2 mb-4">
              {liveTranscript ? (
                <button
                  onClick={() => handleConfirmTranscript()}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-4 bg-royal-900 hover:bg-royal-800 text-white rounded-xl text-sm font-bold shadow-md transition-colors"
                >
                  <Check className="w-4 h-4 text-gold-400" />
                  <span>Sawal Poochein</span>
                </button>
              ) : (
                <button
                  onClick={isListening ? stopListening : startListening}
                  className={`flex-1 py-2.5 px-4 rounded-xl text-sm font-bold transition-colors ${
                    isListening
                      ? 'bg-slate-200 hover:bg-slate-300 text-slate-800'
                      : 'bg-gold-500 hover:bg-gold-600 text-royal-950'
                  }`}
                >
                  {isListening ? 'Rokein (Pause)' : 'Dobara Bolein (Retry)'}
                </button>
              )}

              <button
                onClick={handleCancel}
                className="py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-sm font-bold"
              >
                Band Karein
              </button>
            </div>

            {/* Instant Tap-to-Test Prompts */}
            <div className="w-full pt-3 border-t border-slate-100 text-left">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                Ya direct sawal par tap karein:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {sampleVoicePrompts.slice(0, 3).map((prompt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleConfirmTranscript(prompt)}
                    className="text-xs py-1 px-2.5 bg-slate-100 hover:bg-gold-100 hover:text-royal-950 border border-slate-200 rounded-lg text-slate-700 transition-colors text-left"
                  >
                    💬 {prompt}
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
