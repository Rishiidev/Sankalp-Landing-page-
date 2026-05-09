'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Link from 'next/link';

import { ArrowLeft } from 'lucide-react';

export function MalaCounter() {
  const [mounted, setMounted] = useState(false);
  const [count, setCount] = useState(0);
  const [completed, setCompleted] = useState(false);
  const totalBeads = 108;

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const handleTap = useCallback(() => {
    if (completed) return;
    
    // Haptic feedback (supported on Android, ignored on iOS web mostly, but good to have)
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      navigator.vibrate(40); // simulate a heavy tactile tap
    }
    
    const newCount = count + 1;
    setCount(newCount);
    
    if (newCount >= totalBeads) {
      setCompleted(true);
      if (typeof navigator !== 'undefined' && navigator.vibrate) {
        navigator.vibrate([100, 50, 100, 50, 400]); // Completion pattern
      }
    }
  }, [count, completed]);

  // Handle keyboard (space/enter) for desktop accessibility
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.code === 'Enter') {
        e.preventDefault();
        handleTap();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleTap]);

  // Generate bead coordinates
  const radius = 150;
  const beads = Array.from({ length: totalBeads }).map((_, i) => {
    const angle = (i / totalBeads) * Math.PI * 2 - Math.PI / 2; // Start from top
    return {
      x: Number((Math.cos(angle) * radius).toFixed(3)),
      y: Number((Math.sin(angle) * radius).toFixed(3)),
      isActive: i < count,
    };
  });

  if (!mounted) {
    return (
      <div className="relative w-full min-h-[100dvh] flex flex-col items-center justify-center overflow-hidden select-none transition-colors duration-1000 bg-slate-950" />
    );
  }

  return (
    <div 
      className={`relative w-full min-h-[100dvh] flex flex-col items-center justify-center overflow-hidden select-none touch-manipulation transition-colors duration-1000 ${completed ? 'bg-amber-950/40' : 'bg-slate-950'}`}
      onClick={handleTap}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-orange-900/10 via-slate-950 to-slate-950" />
      
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

      <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-md mx-auto px-4">
        
        {/* Mandala / Bead Ring Container */}
        <div className="relative w-[340px] h-[340px] flex items-center justify-center mb-12">
          {/* Subtle glowing center that pulses with each tap */}
          <motion.div 
            key={count}
            initial={{ scale: 0.8, opacity: 0.5 }}
            animate={{ scale: 1, opacity: 0.2 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="absolute w-32 h-32 bg-orange-500 rounded-full blur-[40px] pointer-events-none"
          />

          {/* Central Counter */}
          <div className="absolute flex flex-col items-center justify-center pointer-events-none">
            <AnimatePresence mode="popLayout">
              <motion.span
                key={count}
                initial={{ y: 10, opacity: 0, filter: 'blur(4px)' }}
                animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                exit={{ y: -10, opacity: 0, filter: 'blur(4px)' }}
                transition={{ duration: 0.2 }}
                className={`text-6xl font-display font-light tabular-nums tracking-tighter ${completed ? 'text-amber-400' : 'text-white'}`}
              >
                {count}
              </motion.span>
            </AnimatePresence>
            <span className="text-slate-500 text-sm tracking-widest uppercase mt-2">
              / {totalBeads}
            </span>
          </div>

          {/* Render Beads */}
          {beads.map((bead, i) => (
            <motion.div
              key={i}
              initial={false}
              animate={{
                backgroundColor: bead.isActive ? '#fb923c' : '#334155', // orange-400 vs slate-700
                scale: bead.isActive ? 1.2 : 1,
                boxShadow: bead.isActive ? '0 0 10px rgba(249, 115, 22, 0.6)' : 'none',
              }}
              transition={{ duration: 0.3 }}
              className="absolute w-2 h-2 rounded-full transform -translate-x-1/2 -translate-y-1/2"
              style={{
                left: `calc(50% + ${bead.x}px)`,
                top: `calc(50% + ${bead.y}px)`,
              }}
            />
          ))}

          {/* Guru Bead (The 109th larger bead at the bottom) */}
          <div 
            className="absolute w-4 h-4 rounded-full bg-slate-600 transform -translate-x-1/2 -translate-y-1/2"
            style={{ left: '50%', top: `calc(50% + ${radius + 15}px)` }}
          />
        </div>

        {/* CTA Area */}
        <div className="h-40 flex flex-col items-center justify-center">
          <AnimatePresence mode="wait">
            {!completed ? (
              <motion.p 
                key="instruction"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-slate-400 text-center font-light tracking-wide pointer-events-none"
              >
                Tap anywhere to chant. <br/> Feel the rhythm.
              </motion.p>
            ) : (
              <motion.div
                key="completion"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="flex flex-col items-center text-center gap-6"
              >
                <h2 className="text-amber-400 text-xl font-display font-medium tracking-wide">
                  You have found your center.
                </h2>
                <p className="text-amber-200/70 text-sm font-light max-w-xs leading-relaxed">
                  Now, hold it. Start your 21-Day Sankalp to keep this rhythm.
                </p>
                <Link 
                  href="/?vow=21"
                  onClick={(e) => { e.stopPropagation(); }}
                  className="px-8 py-3 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-400 rounded-full font-medium transition-colors backdrop-blur-sm"
                >
                  Start My Sankalp Tracker
                </Link>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setCount(0);
                    setCompleted(false);
                  }}
                  className="text-xs text-slate-500 hover:text-slate-400 transition-colors uppercase tracking-widest mt-2"
                >
                  Reset Mala
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
