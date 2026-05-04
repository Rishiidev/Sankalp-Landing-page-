'use client';

import { motion, Variants, AnimatePresence } from 'motion/react';
import { ArrowRight, Flame, Target, ChevronDown, Shield, BookOpen, Crown, Zap, CheckCircle2, Heart, Brain, Activity, Fingerprint, Download } from 'lucide-react';
import Link from 'next/link';
import { Globe } from '@/components/globe';
import { useEffect, useState, useRef } from 'react';

export default function LandingPage() {
  const [devotees, setDevotees] = useState(312);
  const [globalDays, setGlobalDays] = useState(14500);
  const [vowDays, setVowDays] = useState(21);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isGeneratingTicket, setIsGeneratingTicket] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [showTicket, setShowTicket] = useState(false);
  const [ticketDays, setTicketDays] = useState(21);
  const [redirectSeconds, setRedirectSeconds] = useState(5);
  const [ticketNo] = useState(() => Math.floor(Math.random() * 900) + 100);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleTakeVow = () => {
    setIsGeneratingTicket(true);
    setTimeout(() => {
      setIsGeneratingTicket(false);
      setTicketDays(vowDays);
      setRedirectSeconds(5);
      setShowTicket(true);
    }, 1500);
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (showTicket && redirectSeconds > 0) {
      timer = setTimeout(() => setRedirectSeconds(s => s - 1), 1000);
    } else if (showTicket && redirectSeconds === 0) {
      window.location.href = 'https://sankalpv33.vercel.app/';
    }
    return () => clearTimeout(timer);
  }, [showTicket, redirectSeconds]);

  useEffect(() => {
    // Simulate live ticking
    const interval = setInterval(() => {
      if (Math.random() > 0.6) {
        setDevotees(prev => {
          const delta = Math.random() > 0.5 ? 1 : -1;
          return Math.max(300, prev + delta);
        });
      }
      if (Math.random() > 0.8) {
        setGlobalDays(prev => prev + 1);
      }
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 overflow-hidden font-sans">
      
      {/* Abstract divine background effects */}
      <div className="fixed inset-0 z-0 pointer-events-none flex justify-center items-start">
        <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-orange-500/20 rounded-full blur-[100px] opacity-50 mix-blend-screen" />
        <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-red-600/10 rounded-full blur-[120px] opacity-50 mix-blend-screen" />
      </div>

      <nav className="relative z-10 w-full px-6 py-6 border-b border-white/5 bg-slate-950/50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-red-600 flex items-center justify-center shadow-[0_0_15px_rgba(249,115,22,0.4)]">
              <Flame className="w-4 h-4 text-white" />
            </div>
            <span className="font-display font-bold text-xl tracking-wide text-white">Sankalp</span>
          </div>
          <div>
            <Link 
              href="https://sankalpv33.vercel.app/" 
              target="_blank"
              onClick={(e) => {
                // To keep the user in the preview if possible, we just use standard links
              }}
              className="px-5 py-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-sm font-medium transition-all duration-300 backdrop-blur-md text-white"
            >
              Enter the Sanctuary
            </Link>
          </div>
        </div>
      </nav>

      <main className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-32">
        {/* HERO SECTION */}
        <motion.section 
          className="flex flex-col items-center text-center pb-24"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-semibold uppercase tracking-widest mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
            </span>
            Awaken Your Devotion
          </motion.div>
          
          <motion.h1 
            variants={itemVariants}
            className="text-5xl md:text-7xl lg:text-8xl font-display font-bold tracking-tighter leading-[1.1] text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 mb-6"
          >
            The Ultimate <br className="hidden md:block"/> 
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-400 via-red-500 to-orange-400">
              Divine Sadhana
            </span>
          </motion.h1>
          
          <motion.p 
            variants={itemVariants}
            className="max-w-2xl text-lg md:text-xl text-slate-400 leading-relaxed mb-10 font-light"
          >
            A distraction-free, beautifully crafted space to track your daily chanting, maintain your streak, and solidify your vows. Enter God Mode.
          </motion.p>
          
          <motion.div variants={itemVariants} className="w-full max-w-lg mx-auto bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl relative overflow-hidden group mt-10">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 to-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10 flex flex-col gap-6">
              <div className="text-lg md:text-xl text-slate-300 font-medium leading-relaxed flex flex-wrap items-center justify-center gap-y-2">
                I commit to chanting the Chalisa for 
                <div className="inline-flex items-center relative mx-2 align-middle" ref={dropdownRef}>
                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="relative bg-slate-800 border border-orange-500/30 text-orange-400 rounded-xl pl-4 pr-3 py-1 font-display font-bold outline-none focus:border-orange-500 transition-colors shadow-inner cursor-pointer hover:bg-slate-700 hover:border-orange-500 overflow-hidden h-10 min-w-[125px] flex items-center justify-between gap-2"
                  >
                    <span className="block">{vowDays} Days</span>
                    <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                  </motion.button>

                  <AnimatePresence>
                    {isDropdownOpen && (
                      <motion.div 
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 mt-2 w-full bg-slate-800 border border-orange-500/30 rounded-xl shadow-[0_10px_40px_-10px_rgba(249,115,22,0.3)] overflow-hidden z-20 flex flex-col py-1"
                      >
                        {[21, 41, 108].map(days => (
                          <button
                            key={days}
                            onClick={() => {
                              setVowDays(days);
                              setIsDropdownOpen(false);
                            }}
                            className={`px-4 py-2.5 text-left font-display font-bold transition-colors text-sm ${vowDays === days ? 'text-orange-400 bg-orange-500/10' : 'text-slate-300 hover:bg-slate-700 hover:text-white'}`}
                          >
                            {days} Days
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                starting today.
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button 
                  onClick={handleTakeVow}
                  disabled={isGeneratingTicket}
                  className="flex-1 relative inline-flex items-center justify-center gap-2 px-8 py-4 bg-orange-500 text-white rounded-xl font-bold text-lg overflow-hidden transition-all hover:scale-[1.02] active:scale-95 shadow-[0_0_40px_rgba(249,115,22,0.3)] disabled:opacity-80 disabled:hover:scale-100 disabled:cursor-not-allowed group/btn"
                >
                  {isGeneratingTicket ? (
                    <span className="flex items-center gap-2">Sealing Vow <Zap className="w-5 h-5 animate-pulse text-white" /></span>
                  ) : (
                    <>
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:animate-[shimmer_1.5s_infinite]" />
                      Take the Vow <ArrowRight className="w-5 h-5 transition-transform group-hover/btn:translate-x-1" />
                    </>
                  )}
                </button>
                <Link 
                  href="#features"
                  className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium text-lg transition-colors backdrop-blur-md"
                >
                  Explore
                </Link>
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="mt-6 text-sm text-slate-500 font-medium tracking-wide">
            Takes 10 seconds. No login required to start.
          </motion.div>

          <motion.div variants={itemVariants} className="mt-10 flex flex-wrap items-center justify-center gap-2 text-sm text-slate-400 bg-white/5 px-5 py-2.5 rounded-full border border-white/5">
             <Heart className="w-4 h-4 text-red-500 fill-red-500" />
             <span>100% Free. Built out of devotion, not for profit.</span>
          </motion.div>
        </motion.section>

        {/* SOCIAL PROOF / COLLECTIVE SANGHA */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="mb-32 w-full max-w-5xl mx-auto px-4 sm:px-6"
        >
          <div className="relative rounded-3xl bg-slate-900 border border-white/5 overflow-hidden flex flex-col md:flex-row items-center">
            {/* Left Content */}
            <div className="w-full md:w-1/2 p-10 md:p-16 z-10">
              <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-semibold uppercase tracking-widest mb-6">
                <div className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </div>
                Live Sangha
              </motion.div>
              
              <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
                You are not alone.
              </motion.h2>
              
              <motion.p variants={itemVariants} className="text-slate-400 text-lg leading-relaxed mb-8">
                Spirituality can feel isolating. See the anonymous lights of other devotees chanting at this exact moment. A global collective of devotion.
              </motion.p>
              
              <motion.div variants={itemVariants} className="flex flex-col gap-6 mt-8">
                <div className="flex items-center gap-4">
                  <div className="text-4xl font-display font-bold text-white tabular-nums">
                    <AnimatePresence mode="popLayout">
                      <motion.span 
                        key={devotees}
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{ duration: 0.3 }}
                        className="block"
                      >
                        {devotees}
                      </motion.span>
                    </AnimatePresence>
                  </div>
                  <div className="text-sm text-slate-500 leading-tight">Devotees in<br/>God Mode right now</div>
                </div>
                
                <div className="h-px bg-white/5 w-full max-w-xs" />
                
                <div className="flex items-center gap-4">
                  <div className="text-4xl font-display font-bold text-white tabular-nums">
                    <AnimatePresence mode="popLayout">
                      <motion.span 
                        key={globalDays}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.2 }}
                        transition={{ duration: 0.3 }}
                        className="block"
                      >
                        {globalDays.toLocaleString()}+
                      </motion.span>
                    </AnimatePresence>
                  </div>
                  <div className="text-sm text-slate-500 leading-tight">Days of devotion<br/>completed globally this month</div>
                </div>
              </motion.div>
            </div>
            
            {/* Right Globe */}
            <div className="w-full md:w-1/2 relative h-[400px] md:h-[500px] flex items-center justify-center overflow-hidden">
               {/* Radial gradient mask to fade globe edges into background */}
               <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#0f172a_70%)] z-10 pointer-events-none" />
               <div className="absolute inset-0 bg-gradient-to-l from-transparent to-slate-900 z-10 pointer-events-none hidden md:block" />
               <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent z-10 pointer-events-none md:hidden" />
               <div className="w-[150%] max-w-[800px] transform translate-y-12 md:translate-x-12 opacity-80">
                 <Globe />
               </div>
            </div>
          </div>
        </motion.section>

        {/* BENTO GRID FEATURES */}
        <motion.section 
          id="features"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {/* Card 1: Large */}
          <motion.div variants={itemVariants} className="md:col-span-2 relative group rounded-3xl bg-gradient-to-b from-slate-900 to-slate-900/50 border border-white/5 p-8 md:p-12 overflow-hidden hover:border-orange-500/30 transition-colors flex flex-col md:flex-row gap-8 items-center">
            <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/4 group-hover:bg-orange-500/20 transition-colors" />
            
            <div className="relative z-10 flex-1 flex flex-col justify-between h-full w-full md:w-auto">
              <div className="w-14 h-14 rounded-2xl bg-orange-500/10 flex items-center justify-center border border-orange-500/20 shadow-inner mb-6 md:mb-12">
                <Target className="w-7 h-7 text-orange-400" />
              </div>
              <div>
                <h3 className="text-2xl md:text-3xl font-display font-semibold text-white mb-3">Unbreakable Streak</h3>
                <p className="text-slate-400 text-lg leading-relaxed max-w-md">Lock in your commitment. Visual tracking helps you maintain a 21 or 41-day Sankalp without missing a single day.</p>
              </div>
            </div>

            {/* Animated Progress Visual */}
            <div className="w-full md:w-1/2 relative bg-slate-950/50 rounded-2xl border border-white/5 p-6 shadow-inner border-t border-t-white/10">
              <div className="space-y-4">
                <div className="flex justify-between text-xs font-mono text-slate-500 uppercase tracking-widest">
                  <span>Current Sankalp</span>
                  <span className="text-orange-400">Day 14/21</span>
                </div>
                
                {/* Main Progress Bar */}
                <div className="h-3 w-full bg-slate-800 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: "0%" }}
                    whileInView={{ width: "66%" }}
                    transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
                    className="h-full bg-gradient-to-r from-orange-600 to-orange-400 rounded-full relative"
                  >
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
                    <div className="absolute top-0 right-0 bottom-0 w-10 bg-gradient-to-r from-transparent to-white/30" />
                  </motion.div>
                </div>

                {/* Day blocks grid */}
                <div className="grid grid-cols-7 gap-2 pt-2">
                  {Array.from({length: 21}).map((_, i) => (
                    <motion.div 
                      key={i} 
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: i * 0.05 }}
                      className={`aspect-square rounded-[4px] border flex items-center justify-center ${
                        i < 14 
                          ? 'bg-orange-500/20 border-orange-500/50 shadow-[0_0_10px_rgba(249,115,22,0.1)]' 
                          : i === 14 
                            ? 'bg-slate-800 border-orange-500/30 animate-pulse'
                            : 'bg-slate-900 border-white/5'
                      }`}
                    >
                      {i < 14 && (
                         <motion.div
                           initial={{ scale: 0 }}
                           animate={{ scale: 1 }}
                           transition={{ delay: 0.5 + (i * 0.05), type: "spring" }}
                           className="text-orange-400"
                         >
                           <Zap size={10} className="opacity-80 drop-shadow-[0_0_5px_rgba(249,115,22,0.8)]" />
                         </motion.div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Card 2: Tall/Square */}
          <motion.div variants={itemVariants} className="relative group rounded-3xl bg-gradient-to-b from-slate-900 to-slate-900/50 border border-white/5 p-8 overflow-hidden hover:border-red-500/30 transition-colors">
            <div className="relative z-10 flex flex-col h-full justify-between">
              <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center border border-red-500/20 mb-12 flex-shrink-0">
                <BookOpen className="w-6 h-6 text-red-400" />
              </div>
              <div>
                <h3 className="text-xl font-display font-semibold text-white mb-2">Sacred Texts</h3>
                <p className="text-slate-400">Quick access to Sacred Mantras, Baan, and Ashtak. Formatted perfectly for reading.</p>
              </div>
            </div>
          </motion.div>

          {/* Card 3: Square */}
          <motion.div variants={itemVariants} className="relative group rounded-3xl bg-gradient-to-b from-slate-900 to-slate-900/50 border border-white/5 p-8 overflow-hidden hover:border-yellow-500/30 transition-colors">
            <div className="relative z-10 flex flex-col h-full justify-between">
              <div className="w-12 h-12 rounded-xl bg-yellow-500/10 flex items-center justify-center border border-yellow-500/20 mb-12 flex-shrink-0">
                <Crown className="w-6 h-6 text-yellow-400" />
              </div>
              <div>
                <h3 className="text-xl font-display font-semibold text-white mb-2">Divine Focus</h3>
                <p className="text-slate-400">Zero ads, zero distractions. Only you and your spiritual practice.</p>
              </div>
            </div>
          </motion.div>

          {/* Card 4: Detailed List */}
          <motion.div variants={itemVariants} className="md:col-span-2 relative group rounded-3xl bg-gradient-to-b from-slate-900 to-slate-900/50 border border-white/5 p-8 md:p-10 overflow-hidden hover:border-orange-500/30 transition-colors flex flex-col md:flex-row gap-8 items-center">
            <div className="flex-1">
              <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center border border-orange-500/20 mb-6">
                <Shield className="w-6 h-6 text-orange-400" />
              </div>
              <h3 className="text-2xl font-display font-semibold text-white mb-3">The God Mode Experience</h3>
              <p className="text-slate-400 mb-6">Built specifically for serious practitioners who want precision and discipline.</p>
              
              <ul className="space-y-3">
                {[
                  "Clean, minimalist dark interface",
                  "Progressive web app capability",
                  "Daily reminders & accountability",
                  "Insights into your consistency"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-300">
                    <CheckCircle2 className="w-5 h-5 text-orange-500 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="w-full md:w-1/3 aspect-square rounded-2xl bg-gradient-to-tr from-slate-950 to-slate-900 border border-white/5 shadow-2xl flex items-center justify-center relative overflow-hidden">
               <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/divine/400/400')] opacity-20 mix-blend-overlay" />
               <Zap className="w-20 h-20 text-orange-500/50 absolute drop-shadow-[0_0_30px_rgba(249,115,22,0.8)]" />
            </div>
          </motion.div>

        </motion.section>

        {/* PATH OF DISCIPLINE */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="mt-32 max-w-5xl mx-auto"
        >
          <div className="text-center mb-16 px-4">
            <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-4">The Path of Discipline</h2>
            <p className="text-slate-400 text-lg max-w-xl mx-auto">Your spiritual journey ritualized. From your initial vow to an unbreakable rhythm.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative px-4">
            <div className="hidden md:block absolute top-[28px] left-[15%] right-[15%] h-[1px] bg-gradient-to-r from-orange-500/0 via-orange-500/30 to-orange-500/0" />
            
            <motion.div variants={itemVariants} className="relative flex flex-col items-center text-center group">
              <div className="w-14 h-14 rounded-full bg-slate-950 border border-white/10 flex items-center justify-center mb-6 relative z-10 transition-colors group-hover:border-orange-500/50 group-hover:shadow-[0_0_15px_rgba(249,115,22,0.2)]">
                <span className="text-orange-400 font-bold font-display text-lg">1</span>
              </div>
              <h3 className="text-xl font-display font-semibold text-white mb-2">Take the Vow</h3>
              <p className="text-slate-400 text-sm leading-relaxed max-w-xs">Commit to a Sankalp of 21, 41 or 108 days. Set your clear intention and let the journey begin.</p>
            </motion.div>

            <motion.div variants={itemVariants} className="relative flex flex-col items-center text-center group">
              <div className="w-14 h-14 rounded-full bg-slate-950 border border-white/10 flex items-center justify-center mb-6 relative z-10 transition-colors group-hover:border-orange-500/50 group-hover:shadow-[0_0_15px_rgba(249,115,22,0.2)]">
                <span className="text-orange-400 font-bold font-display text-lg">2</span>
              </div>
              <h3 className="text-xl font-display font-semibold text-white mb-2">Daily Practice</h3>
              <p className="text-slate-400 text-sm leading-relaxed max-w-xs">Chant the sacred mantras. Use the app to focus completely, free from notifications and distractions.</p>
            </motion.div>

            <motion.div variants={itemVariants} className="relative flex flex-col items-center text-center group">
              <div className="w-14 h-14 rounded-full bg-slate-950 border border-white/10 flex items-center justify-center mb-6 relative z-10 transition-colors group-hover:border-orange-500/50 group-hover:shadow-[0_0_15px_rgba(249,115,22,0.2)]">
                <span className="text-orange-400 font-bold font-display text-lg">3</span>
              </div>
              <h3 className="text-xl font-display font-semibold text-white mb-2">Unbreakable Consistency</h3>
              <p className="text-slate-400 text-sm leading-relaxed max-w-xs">Log your progress every day. Watch your streak build physically as your devotion strengthens spiritually.</p>
            </motion.div>
          </div>
        </motion.section>

        {/* WHY SANKALP / NEUROSCIENCE OF DEVOTION */}
        <motion.section 
          id="why-sankalp"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="mt-32 max-w-5xl mx-auto px-6"
        >
          <div className="text-center mb-16 px-4">
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold uppercase tracking-widest mb-6">
              <Zap className="w-3 h-3" />
              Why Sankalp?
            </motion.div>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-4">The Neuroscience of Devotion</h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">Why a 21 or 41-day Sankalp works scientifically. Bridging ancient wisdom with modern human biology.</p>
          </div>

          {/* Mind vs. Spirit Diagram */}
          <motion.div variants={itemVariants} className="w-full max-w-4xl mx-auto mb-16 relative">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
              
              {/* Mind */}
              <div className="flex-1 rounded-3xl bg-slate-900 border border-blue-500/20 p-8 text-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                <Brain className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">The Mind</h3>
                <p className="text-slate-400 text-sm">Neuroplasticity, Habit Formulation & Dopamine Regulation</p>
              </div>

              {/* Connecting Bridge */}
              <div className="flex flex-col items-center justify-center relative md:px-8">
                <div className="hidden md:block absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-blue-500/20 via-orange-500 to-orange-500/20 -z-10 -translate-y-1/2" />
                <div className="md:hidden absolute top-0 bottom-0 left-1/2 w-px bg-gradient-to-b from-blue-500/20 via-orange-500 to-orange-500/20 -z-10 -translate-x-1/2" />
                
                <div className="w-16 h-16 rounded-full bg-slate-950 border border-white/10 flex items-center justify-center relative z-10 shadow-[0_0_20px_rgba(249,115,22,0.3)]">
                  <Activity className="w-6 h-6 text-orange-500" />
                  {/* Pulse rings */}
                  <div className="absolute inset-0 rounded-full border border-orange-500 animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite]" />
                </div>
                <div className="mt-4 text-xs font-mono text-orange-400 uppercase tracking-widest text-center">
                  Vagus Nerve<br/>Stimulation
                </div>
              </div>

              {/* Spirit */}
              <div className="flex-1 rounded-3xl bg-slate-900 border border-orange-500/20 p-8 text-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                <Flame className="w-12 h-12 text-orange-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">The Spirit</h3>
                <p className="text-slate-400 text-sm">Devotion, Inner Peace & Conscious Awakening</p>
              </div>
              
            </div>
          </motion.div>

          <div className="relative rounded-3xl bg-slate-900/50 border border-white/5 p-8 md:p-12 overflow-hidden shadow-2xl">
            {/* Background effects */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.05)_0%,transparent_70%)] pointer-events-none" />
            <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
              {/* Point 1: Neuroplasticity */}
              <motion.div variants={itemVariants} className="flex flex-col relative group">
                <div className="h-0.5 w-full bg-gradient-to-r from-blue-500/50 to-transparent absolute top-6 -left-8 hidden md:block group-hover:from-blue-400 transition-colors" />
                <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-6 relative z-10 shadow-[0_0_15px_rgba(59,130,246,0.2)] group-hover:scale-110 transition-transform bg-slate-900">
                  <Brain className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-xl font-display font-semibold text-white mb-3">Neuroplasticity</h3>
                <h4 className="text-sm font-medium text-blue-400 mb-2 font-mono uppercase tracking-wider">The 21-Day Rule</h4>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Repeating a chant daily begins to prune old neural pathways (anxiety, distraction) and physically wire new ones. 21 days is the minimum biological threshold for synaptic structural changes.
                </p>
              </motion.div>

              {/* Point 2: Vagus Nerve */}
              <motion.div variants={itemVariants} className="flex flex-col relative group">
                <div className="h-0.5 w-full bg-gradient-to-r from-purple-500/50 to-transparent absolute top-6 -left-8 hidden md:block group-hover:from-purple-400 transition-colors" />
                <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mb-6 relative z-10 shadow-[0_0_15px_rgba(168,85,247,0.2)] group-hover:scale-110 transition-transform bg-slate-900">
                  <Activity className="w-6 h-6 text-purple-400" />
                </div>
                <h3 className="text-xl font-display font-semibold text-white mb-3">Vagal Toning</h3>
                <h4 className="text-sm font-medium text-purple-400 mb-2 font-mono uppercase tracking-wider">Rhythmic Breathing</h4>
                <p className="text-slate-400 text-sm leading-relaxed">
                  The rhythmic vocalization of the Chalisa acts as a biological pacemaker. It directly stimulates the vagus nerve, shifting the autonomic nervous system from &apos;fight or flight&apos; to &apos;rest and digest&apos;.
                </p>
              </motion.div>

              {/* Point 3: Dopaminergic Circuit */}
              <motion.div variants={itemVariants} className="flex flex-col relative group">
                <div className="w-12 h-12 rounded-2xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center mb-6 relative z-10 shadow-[0_0_15px_rgba(20,184,166,0.2)] group-hover:scale-110 transition-transform bg-slate-900">
                  <Fingerprint className="w-6 h-6 text-teal-400" />
                </div>
                <h3 className="text-xl font-display font-semibold text-white mb-3">Identity Shift</h3>
                <h4 className="text-sm font-medium text-teal-400 mb-2 font-mono uppercase tracking-wider">The Habit Loop</h4>
                <p className="text-slate-400 text-sm leading-relaxed">
                  By continuously completing a daily task, you provide the brain with reliable dopamine hits associated with discipline, rather than cheap pleasure, fundamentally shifting your self-identity.
                </p>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* FAQ SECTION */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="mt-32 max-w-4xl mx-auto px-6"
        >
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-4">Questions & Doubts</h2>
            <p className="text-slate-400 text-lg">Clarity for a distraction-free spiritual journey.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                q: "What if I miss a day during my Sankalp?",
                a: "A Sankalp is a vow. If missed, tradition suggests acknowledging the break humbly, resetting your streak, and beginning anew with even stronger resolve."
              },
              {
                q: "Do I need to chant at the exact same time every day?",
                a: "While chanting at the same time (like Brahmamuhurtha) builds powerful discipline, sincerity is what matters most. Try to keep a consistent window."
              },
              {
                q: "Is this app actually completely free?",
                a: "Yes. It was built as a service of devotion (Seva). There are no hidden fees, no subscriptions, and no premium features. 100% free forever."
              },
              {
                q: "Can I do a 41-day Sankalp instead of 21?",
                a: "Absolutely. The tracker allows you to visualize and commit to any duration, whether 11, 21, 41, or a lifetime of daily devotion."
              }
            ].map((faq, i) => (
              <motion.div key={i} variants={itemVariants} className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-colors">
                <h4 className="text-lg font-semibold text-orange-100 mb-2">{faq.q}</h4>
                <p className="text-slate-400 text-sm leading-relaxed">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* THE "WHY" TESTIMONIALS */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="max-w-6xl mx-auto mt-32 mb-16 px-6"
        >
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-4">Echoes of Devotion</h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">Real voices from practitioners who transformed their mindset through continuous chanting.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                text: "I used to let fear and anxiety govern me. 41 days of this strict Sankalp completely rewired my mind. The clarity is profound.",
                author: "Anonymous Practitioner"
              },
              {
                text: "The streak tracker feels different from habit apps. Missing a day isn't 'failing a habit'—it's breaking a vow. That subtle shift kept me going.",
                author: "Dedicated Devotee"
              },
              {
                text: "Finally, a clean space without colorful distractions, without gamification points. Just me, the Chalisa, and the commitment I made to God.",
                author: "Spiritual Seeker"
              }
            ].map((review, i) => (
              <motion.div key={i} variants={itemVariants} className="p-8 rounded-3xl bg-slate-900 border border-white/5 relative">
                <div className="text-4xl text-orange-500/20 absolute top-4 left-6 font-serif">&quot;</div>
                <p className="text-slate-300 relative z-10 text-lg leading-relaxed mb-6 font-light">{review.text}</p>
                <div className="flex items-center gap-3">
                  <div className="h-px bg-white/10 flex-1" />
                  <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider">{review.author}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* BOTTOM CTA */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="mt-32 relative rounded-3xl bg-gradient-to-r from-orange-600 to-red-700 p-1 px-6 md:px-12 py-16 text-center border border-white/10 shadow-[0_0_100px_rgba(249,115,22,0.2)] overflow-hidden"
        >
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
          <motion.div variants={itemVariants} className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">Commit to Greatness.</h2>
            <p className="text-orange-100 text-lg md:text-xl max-w-2xl mx-auto mb-10 font-light">Join the journey of discipline and unwavering devotion. Your Sankalp begins with a single step.</p>
            <Link 
              href="https://sankalpv33.vercel.app/" 
              target="_blank"
              className="inline-flex items-center justify-center gap-2 px-10 py-5 bg-white text-orange-600 rounded-full font-bold text-lg transition-transform hover:scale-105 active:scale-95 shadow-xl"
            >
              Begin Your Sankalp
            </Link>
          </motion.div>
        </motion.section>
      </main>

      <AnimatePresence>
        {showTicket && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-950/90 backdrop-blur-xl"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="w-full max-w-sm bg-slate-900 rounded-[2rem] shadow-[0_0_150px_rgba(249,115,22,0.4)] relative border border-orange-500/20"
              style={{
                backgroundImage: 'radial-gradient(120% 120% at 50% -20%, rgba(249,115,22,0.1), transparent)',
              }}
            >
              {/* Ticket cutouts */}
              <div className="absolute top-[80px] -left-4 w-8 h-8 rounded-full bg-slate-950 z-20 shadow-[inset_0_0_10px_rgba(0,0,0,0.5)] border-r border-orange-500/20" />
              <div className="absolute top-[80px] -right-4 w-8 h-8 rounded-full bg-slate-950 z-20 shadow-[inset_0_0_10px_rgba(0,0,0,0.5)] border-l border-orange-500/20" />
              
              <div className="absolute inset-0 rounded-[2rem] border border-white/10 overflow-hidden pointer-events-none" />

              <div className="p-6 border-b border-orange-500/20 border-dashed relative">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-transparent rounded-t-[2rem]" />
                <div className="flex items-center justify-between relative z-10">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-red-600 flex items-center justify-center shadow-[0_0_10px_rgba(249,115,22,0.5)]">
                      <Flame className="w-4 h-4 text-white" />
                    </div>
                    <span className="font-display font-black text-white tracking-[0.2em] uppercase text-sm">Sankalp</span>
                  </div>
                  <div className="text-orange-400 font-mono text-xs opacity-80 bg-orange-500/10 px-2 py-1 rounded-md border border-orange-500/20">
                    No. {ticketNo}
                  </div>
                </div>
              </div>
              
              <div className="px-8 pb-8 pt-6 text-center relative flex flex-col items-center bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 relative overflow-hidden">
                {/* Holographic animated overlay */}
                <div className="absolute inset-0 opacity-[0.05] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay z-0" />
                <motion.div 
                  animate={{ 
                    backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
                  }}
                  transition={{ duration: 15, ease: "linear", repeat: Infinity }}
                  className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage: 'linear-gradient(135deg, transparent 0%, rgba(249,115,22,0.3) 25%, transparent 50%, rgba(239,68,68,0.3) 75%, transparent 100%)',
                    backgroundSize: '200% 200%'
                  }}
                />
                
                {/* Glowing Emblem */}
                <div className="relative mb-6 mt-2">
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-500/30 to-red-600/30 blur-[30px] rounded-full" />
                  <div className="w-32 h-32 rounded-full border-2 border-orange-500/30 flex items-center justify-center bg-slate-950 relative shadow-[inset_0_0_50px_rgba(249,115,22,0.3)]">
                    <motion.div 
                      animate={{ rotate: 360 }}
                      transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                      className="absolute -inset-[2px] rounded-full border-t-4 border-orange-500 opacity-80"
                    />
                    <motion.div 
                      animate={{ rotate: -360 }}
                      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-[4px] rounded-full border-b-2 border-red-500 opacity-60"
                    />
                    <div className="absolute inset-0 rounded-full border border-white/10" />
                    <div className="relative z-10 flex flex-col items-center justify-center mt-1">
                      <span className="text-6xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-white/70 drop-shadow-[0_0_15px_rgba(255,255,255,0.4)] leading-none -ml-1 tracking-tight">{ticketDays}</span>
                    </div>
                  </div>
                </div>

                <div className="inline-flex flex-col items-center gap-1.5 mb-2 relative z-10 w-full">
                  <h3 className="text-[10px] font-mono tracking-[0.3em] text-orange-400/80 uppercase">Duration of Vow</h3>
                  <div className="flex items-center gap-3 w-full">
                    <div className="h-px bg-gradient-to-r from-transparent to-orange-500/30 flex-1" />
                    <h3 className="text-xl font-display font-bold text-slate-100 tracking-wide uppercase">Days of Devotion</h3>
                    <div className="h-px bg-gradient-to-l from-transparent to-orange-500/30 flex-1" />
                  </div>
                </div>
                
                <p className="text-slate-400 text-sm mb-6 relative z-10 font-light max-w-[240px]">The commitment has been forged. Your physical and spiritual journey begins now.</p>
                
                {/* Barcode representation */}
                <div className="w-full flex items-center justify-center relative z-10 opacity-60 mb-6">
                  <div className="flex items-end justify-center h-10 w-full gap-[3px] overflow-hidden" style={{ WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)' }}>
                    {Array.from({length: 40}).map((_, i) => (
                      <div key={i} className="bg-slate-400" suppressHydrationWarning style={{ width: [2, 4, 3, 2, 4, 3][i % 6] + 'px', height: '100%', opacity: [0.4, 0.7, 0.5, 0.8, 0.3, 0.6][i % 6] }} />
                    ))}
                  </div>
                </div>

                {/* Save Ticket Action */}
                <div className="w-full flex justify-center gap-4 mt-2 relative z-10">
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      /* Example interaction */
                    }}
                    className="px-6 py-2.5 rounded-full bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/30 text-orange-400 text-sm font-medium hover:bg-orange-500/20 hover:border-orange-500/50 hover:text-orange-300 transition-colors flex items-center gap-2 shadow-[0_0_20px_rgba(249,115,22,0.1)]"
                  >
                    <Download className="w-4 h-4" />
                    Save Ticket
                  </motion.button>
                </div>
              </div>

              <div className="px-6 py-4 bg-slate-950 flex flex-col items-center gap-3 relative z-10 rounded-b-[2rem] border-t border-orange-500/20">
                 <div className="text-[10px] text-slate-400 uppercase tracking-widest font-mono flex items-center gap-2">
                   Redirecting to Sanctuary in {redirectSeconds}s
                   <span className="flex gap-1">
                     <span className="w-1 h-1 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                     <span className="w-1 h-1 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                     <span className="w-1 h-1 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                   </span>
                 </div>
                 <div className="w-full h-1 bg-slate-900 rounded-full overflow-hidden">
                   <motion.div 
                     initial={{ width: 0 }}
                     animate={{ width: "100%" }}
                     transition={{ duration: 5, ease: "linear" }}
                     className="h-full bg-gradient-to-r from-orange-600 to-orange-400 shadow-[0_0_10px_#f97316]"
                   />
                 </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="relative z-10 border-t border-white/5 py-8 mt-12 bg-slate-950">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between text-slate-500 text-sm">
          <p>© {new Date().getFullYear()} Sankalp App. All rights reserved.</p>
          <p className="flex items-center gap-1 mt-4 md:mt-0">
            Designed for <Flame className="w-3 h-3 text-orange-500" /> Devotion
          </p>
        </div>
      </footer>

      {/* Tailwind Custom Keyframes Extension */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes shimmer {
          100% {
            transform: translateX(100%);
          }
        }
      `}} />
    </div>
  );
}
