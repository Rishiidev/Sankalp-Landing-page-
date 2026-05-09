'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Playfair_Display } from 'next/font/google';
import Link from 'next/link';
import { ArrowLeft, Download, Check } from 'lucide-react';
import * as htmlToImage from 'html-to-image';

const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' });

const questions = [
  {
    id: 1,
    query: "Where is your focus bleeding out?",
    options: [
      "The Endless Scroll",
      "Shadows of the Past",
      "Illusions of the Future",
      "External Validation"
    ]
  },
  {
    id: 2,
    query: "What anchor do you require?",
    options: [
      "Absolute Stillness",
      "Unbreakable Focus",
      "Fierce Discipline",
      "Deep Surrender"
    ]
  },
  {
    id: 3,
    query: "How many suns will witness your rebirth?",
    options: [
      "21 Days",
      "41 Days",
      "108 Days"
    ]
  }
];

export function OracleGenerator() {
  const [step, setStep] = useState(-1); // -1 is intro, 0-2 questions, 3 is generating, 4 is contract
  const [answers, setAnswers] = useState<string[]>([]);
  const contractRef = useRef<HTMLDivElement>(null);
  const [isSaved, setIsSaved] = useState(false);

  const handleStart = () => setStep(0);

  const handleAnswer = (answer: string) => {
    setAnswers((prev) => [...prev, answer]);
    if (step < questions.length - 1) {
      setStep((prev) => prev + 1);
    } else {
      setStep(3); // Generating phase
    }
  };

  useEffect(() => {
    if (step === 3) {
      const timer = setTimeout(() => {
        setStep(4);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [step]);

  const saveContract = async () => {
    if (contractRef.current) {
      try {
        const dataUrl = await htmlToImage.toPng(contractRef.current, {
          quality: 1.0,
          pixelRatio: 2,
          backgroundColor: '#020617' // slate-950
        });
        const link = document.createElement('a');
        link.download = 'Sankalp-Contract.png';
        link.href = dataUrl;
        link.click();
        setIsSaved(true);
        setTimeout(() => setIsSaved(false), 3000);
      } catch (err) {
        console.error('Failed to save contract', err);
      }
    }
  };

  return (
    <div className={`relative w-full min-h-[100dvh] bg-slate-950 text-slate-200 overflow-hidden ${playfair.variable}`}>
      <Link href="/" className="absolute top-6 left-6 z-50 text-slate-500 hover:text-white transition-colors p-2" onClick={(e) => step !== 4 && e.stopPropagation()}>
        <ArrowLeft className="w-6 h-6" />
      </Link>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-950/20 via-slate-950 to-slate-950 pointer-events-none" />

      <div className="relative z-10 w-full h-[100dvh] flex flex-col items-center justify-center px-4">
        <AnimatePresence mode="wait">
          {step === -1 && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, filter: 'blur(10px)' }}
              animate={{ opacity: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, filter: 'blur(10px)' }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
              className="text-center max-w-xl"
            >
              <h1 className="text-4xl md:text-5xl font-serif text-white mb-8 tracking-wide leading-tight">
                Seek the Oracle
              </h1>
              <p className="text-slate-400 text-lg mb-12 font-light leading-relaxed">
                You seek discipline, yet your energy is scattered. Sit in stillness. Answer truthfully. For every vow unbroken begins with confronting the truth.
              </p>
              <button
                onClick={handleStart}
                className="px-8 py-3 bg-transparent border border-amber-500/30 text-amber-500 rounded-full font-serif font-medium tracking-widest hover:bg-amber-500 hover:text-slate-950 transition-all duration-500 uppercase text-sm"
              >
                Approach
              </button>
            </motion.div>
          )}

          {step >= 0 && step < questions.length && (
            <motion.div
              key={`q-${step}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 1.2, ease: 'easeInOut' }}
              className="text-center max-w-2xl w-full"
            >
              <h2 className="text-3xl md:text-5xl font-serif text-white mb-16 tracking-wide leading-tight">
                {questions[step].query}
              </h2>
              <div className="flex flex-col gap-4">
                {questions[step].options.map((option, idx) => (
                  <motion.button
                    key={option}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: idx * 0.2 }}
                    onClick={() => handleAnswer(option)}
                    className="p-4 border border-slate-800 text-slate-300 hover:border-amber-500/50 hover:text-amber-400 rounded-lg text-lg font-serif transition-all duration-500 bg-slate-900/50 backdrop-blur-sm"
                  >
                    {option}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="generating"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2 }}
              className="text-center"
            >
              <motion.div 
                animate={{ scale: [0.9, 1.1, 0.9], opacity: [0.3, 0.8, 0.3] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="w-24 h-24 bg-amber-500/20 rounded-full blur-2xl mx-auto mb-8"
              />
              <p className="text-amber-500/70 font-serif text-xl tracking-widest italic">
                Scribing your vow into the ether...
              </p>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div
              key="contract"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
              className="flex flex-col items-center w-full max-w-md pb-12 overflow-y-auto max-h-[100dvh] pt-16"
            >
              {/* The Contract Card */}
              <div 
                ref={contractRef}
                className="relative w-full aspect-[3/4] bg-slate-950 border border-slate-800 rounded-xl p-8 flex flex-col justify-between overflow-hidden shadow-[0_0_50px_rgba(245,158,11,0.05)]"
              >
                {/* Visual texture */}
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none" />
                <div className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-900/10 via-transparent to-transparent opacity-50 pointer-events-none" />

                <div className="relative z-10 text-center flex flex-col h-full">
                  <div>
                    <h3 className="text-amber-500 font-serif text-sm tracking-[0.3em] uppercase mb-12">Sacred Vow</h3>
                    
                    <div className="text-slate-300 font-serif leading-relaxed text-lg md:text-xl text-left space-y-6">
                      <p>I commit to reclaiming my scattered energy from <span className="text-white border-b border-amber-500/30 font-medium inline-block pb-0.5">{answers[0]}</span>.</p>
                      <p>For <span className="text-white border-b border-amber-500/30 font-medium inline-block pb-0.5">{answers[2]}</span>, I will forge <span className="text-white border-b border-amber-500/30 font-medium inline-block pb-0.5">{answers[1]}</span>.</p>
                    </div>
                  </div>

                  {/* Abstract Visual Centerpiece */}
                  <div className="flex-1 flex items-center justify-center py-8">
                     <div className="w-16 h-16 border border-amber-500/20 rounded-full flex items-center justify-center relative">
                        <div className="w-10 h-10 border border-amber-500/40 rotate-45" />
                        <div className="absolute w-2 h-2 bg-amber-500/60 rounded-full" />
                     </div>
                  </div>

                  <div className="text-left mt-auto">
                    <p className="text-slate-500 font-serif text-xs uppercase tracking-widest mb-3">Sealed By</p>
                    <div className="border-b border-slate-800 w-full mb-2" />
                    <p className="text-slate-400 font-serif italic text-sm">Self</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-4 w-full">
                <button
                  onClick={saveContract}
                  className="flex-1 py-4 bg-slate-900 border border-slate-800 text-slate-300 rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-slate-800 transition-colors"
                >
                  {isSaved ? <Check className="w-5 h-5 text-green-500" /> : <Download className="w-5 h-5" />}
                  {isSaved ? "Saved to Device" : "Save Contract"}
                </button>
                <Link
                  href={`/?vow=${answers[2]?.split(' ')[0] || '21'}`}
                  className="flex-1 py-4 bg-amber-600/10 border border-amber-600/30 text-amber-500 rounded-lg font-medium flex items-center justify-center hover:bg-amber-600/20 hover:text-amber-400 transition-all font-serif"
                >
                  Enter Sanctuary
                </Link>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}
