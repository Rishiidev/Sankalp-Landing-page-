'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Link from 'next/link';
import { Globe } from '@/components/globe';
import { ArrowLeft } from 'lucide-react';

export function BreathSync() {
  const [phase, setPhase] = useState<'inhale' | 'hold' | 'exhale' | 'hold-empty'>('inhale');
  const [timeLeft, setTimeLeft] = useState(60);
  const [completed, setCompleted] = useState(false);
  const [activeUsers] = useState(() => Math.floor(Math.random() * 1000) + 3200);

  // Timer logic
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (timeLeft <= 0 && !completed) {
      timeoutId = setTimeout(() => {
        setCompleted(true);
        if (typeof navigator !== 'undefined' && navigator.vibrate) {
          navigator.vibrate([100, 50, 100, 50, 400]); // Completion pattern
        }
      }, 0);
      return;
    }

    if (!completed) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);

      return () => {
        clearInterval(timer);
        if (timeoutId) clearTimeout(timeoutId);
      };
    }
  }, [timeLeft, completed]);

  // Breathing cycle logic
  // Box breathing or 4-7-8, let's do a simple 4s inhale, 4s exhale for fluidity
  useEffect(() => {
    if (completed) return;

    let timeoutId: NodeJS.Timeout;

    const runCycle = () => {
      setPhase('inhale');
      timeoutId = setTimeout(() => {
        setPhase('exhale');
        timeoutId = setTimeout(() => {
          runCycle();
        }, 4000); // Exhale for 4s
      }, 4000); // Inhale for 4s
    };

    runCycle();

    return () => clearTimeout(timeoutId);
  }, [completed]);

  return (
    <div className={`relative w-full min-h-[100dvh] flex flex-col items-center justify-center overflow-hidden transition-colors duration-1000 ${completed ? 'bg-amber-950/40' : 'bg-slate-950'}`}>
      
      {/* Background Globe that's very dim to represent the Sangha */}
      <div className="absolute inset-0 opacity-20 pointer-events-none filter blur-sm">
         <Globe isUserLightActive={false} />
      </div>

      <Link href="/" className="absolute top-6 left-6 z-20 text-slate-500 hover:text-white transition-colors p-2" onClick={(e) => e.stopPropagation()}>
        <ArrowLeft className="w-6 h-6" />
      </Link>

      {/* Completion Flash */}
      <AnimatePresence>
        {completed && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.8, 0] }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="absolute inset-0 bg-amber-500/30 pointer-events-none z-0"
          />
        )}
      </AnimatePresence>

      <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-md mx-auto px-4 h-full">
        
        <AnimatePresence mode="wait">
          {!completed ? (
            <motion.div 
              key="breathing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex flex-col items-center w-full"
            >
              <div className="text-center mb-16 h-20">
                <p className="text-slate-400 text-sm font-medium tracking-widest uppercase mb-4">
                  Syncing your breath with {activeUsers.toLocaleString()} others
                </p>
                <AnimatePresence mode="wait">
                  <motion.h2 
                    key={phase}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.5 }}
                    className="text-4xl font-display font-light text-white tracking-wide"
                  >
                    {phase === 'inhale' ? 'Inhale...' : 'Exhale...'}
                  </motion.h2>
                </AnimatePresence>
              </div>

              {/* The Breathing Orb */}
              <div className="relative w-64 h-64 flex items-center justify-center mb-16">
                {/* Core glow */}
                <motion.div 
                  animate={{ 
                    scale: phase === 'inhale' ? 1 : 0.5,
                    opacity: phase === 'inhale' ? 0.8 : 0.3
                  }}
                  transition={{ 
                    duration: 4, 
                    ease: "easeInOut" 
                  }}
                  className="absolute w-full h-full bg-orange-500 rounded-full blur-[60px] pointer-events-none"
                />
                
                {/* Solid orb */}
                <motion.div 
                  animate={{ 
                    scale: phase === 'inhale' ? 1 : 0.6,
                    backgroundColor: phase === 'inhale' ? '#f97316' : '#ea580c' // orange-500 to orange-600
                  }}
                  transition={{ 
                    duration: 4, 
                    ease: "easeInOut" 
                  }}
                  className="w-32 h-32 rounded-full shadow-[inset_0_0_20px_rgba(255,255,255,0.5)] z-10 border border-orange-400/50"
                />
                
                {/* Expanding rings */}
                <motion.div 
                  animate={{ 
                    scale: phase === 'inhale' ? 1.5 : 0.8,
                    opacity: phase === 'inhale' ? 0 : 0.5
                  }}
                  transition={{ 
                    duration: 4, 
                    ease: "easeInOut" 
                  }}
                  className="absolute w-48 h-48 border border-orange-400/30 rounded-full z-0"
                />
              </div>

              <div className="text-slate-500 font-display text-2xl font-light tabular-nums">
                0:{timeLeft.toString().padStart(2, '0')}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="completion"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-col items-center text-center gap-6"
            >
              <h2 className="text-amber-400 text-2xl font-display font-medium tracking-wide leading-snug">
                Peace achieved. <br/> Your mind is clear.
              </h2>
              <p className="text-amber-200/70 text-base font-light max-w-sm leading-relaxed mb-4">
                Are you ready to maintain this state for 21 days?
              </p>
              <Link 
                href="/?vow=21"
                className="px-8 py-4 bg-amber-500 text-slate-900 shadow-[0_0_30px_rgba(245,158,11,0.3)] hover:scale-105 active:scale-95 rounded-full font-bold transition-all text-lg"
              >
                Start My Sankalp Tracker
              </Link>
              <Link 
                href="/"
                className="text-xs text-slate-500 hover:text-slate-400 transition-colors uppercase tracking-widest mt-2"
              >
                Return to Home
              </Link>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
