'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Briefcase, Building2, Globe, TrendingUp, BarChart3, Star, Mail, FileText } from 'lucide-react';

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden py-24 md:py-32 bg-transparent">
      
      {/* Concentric topography circles / background graphic */}
      <div className="absolute right-0 bottom-0 pointer-events-none opacity-20 select-none z-0">
        <svg className="w-[300px] h-[300px] sm:w-[450px] sm:h-[450px] md:w-[600px] md:h-[600px] text-[var(--text-primary)] transform translate-x-20 translate-y-20" viewBox="0 0 400 400" fill="none" stroke="currentColor">
          <circle cx="200" cy="200" r="180" strokeWidth="1.5" strokeDasharray="4 4" />
          <circle cx="200" cy="200" r="140" strokeWidth="1" />
          <circle cx="200" cy="200" r="100" strokeWidth="1" strokeDasharray="6 6" />
          <circle cx="200" cy="200" r="60" strokeWidth="1" />
          <circle cx="200" cy="200" r="220" strokeWidth="1" strokeDasharray="8 8" />
        </svg>
      </div>

      <div className="section-container z-10 w-full flex-grow flex flex-col justify-center">
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-16 lg:gap-8 mt-4">
          
          {/* Left Column Content */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex-1 flex flex-col items-start w-full text-left"
          >
            {/* Sub-header */}
            <p className="text-[15px] font-sans font-medium text-[var(--text-muted)] mb-4">
              Hey, I&apos;m <span className="font-bold text-[var(--text-primary)]">Saravana Shrutheesh M</span>
            </p>

            {/* Primary Title */}
            <h1 className="font-display font-extrabold text-[46px] sm:text-[56px] md:text-[68px] text-[var(--text-primary)] leading-[1.08] tracking-tight mb-6">
              <span className="block">Results-Driven</span>
              <span className="block text-[var(--accent-dark)] my-1">Operations</span>
              <span className="block">Analyst<span className="text-[var(--accent-dark)]">.</span></span>
            </h1>

            {/* Badges row */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 font-bold text-[var(--text-muted)] tracking-wider uppercase mb-8 text-[11px]">
              <div className="flex items-center gap-1.5 bg-[var(--text-primary)]/5 px-3 py-1.5 rounded-md">
                <Briefcase className="w-3.5 h-3.5 text-[var(--accent-dark)]" />
                <span>1.8 YRS EXP</span>
              </div>
              <div className="w-[1px] h-3 bg-[var(--text-body)]/20 hidden sm:block" />
              <div className="flex items-center gap-1.5 bg-[var(--text-primary)]/5 px-3 py-1.5 rounded-md">
                <Building2 className="w-3.5 h-3.5 text-[var(--accent-dark)]" />
                <span>FORTUNE 1 COMPANIES</span>
              </div>
              <div className="w-[1px] h-3 bg-[var(--text-body)]/20 hidden sm:block" />
              <div className="flex items-center gap-1.5 bg-[var(--text-primary)]/5 px-3 py-1.5 rounded-md">
                <Globe className="w-3.5 h-3.5 text-[var(--accent-dark)]" />
                <span>GLOBAL IMPACT</span>
              </div>
            </div>

            {/* Core Narrative */}
            <p className="text-[15px] sm:text-[16px] leading-relaxed text-[var(--text-body)] max-w-xl mb-8">
              I specialize in root cause analysis, process optimization, and data-driven intelligence&mdash;bridging technical insights with business strategies to build resilient, scalable business systems.
            </p>

            {/* Call-to-Actions */}
            <div className="flex flex-wrap items-center gap-4">
              <a 
                href="#work" 
                className="text-[var(--text-cream)] font-semibold px-8 py-3.5 rounded-full transition-opacity hover:opacity-90 text-[14px] flex items-center justify-center gap-2 shadow-sm select-none touch-target"
                style={{ background: 'linear-gradient(135deg, #6B8E7F 0%, #8FB996 50%, #A8C9B3 100%)' }}
              >
                See my work <span className="font-sans text-[15px]">→</span>
              </a>
              <a 
                href="/Saravana_Shrutheesh_CV.pdf" 
                download="Saravana_Shrutheesh_CV.pdf"
                className="bg-white hover:bg-[var(--bg-page)] text-[var(--text-primary)] border border-[var(--text-body)]/15 font-semibold px-8 py-3.5 rounded-full transition-transform hover:scale-[1.02] text-[14px] flex items-center justify-center gap-2 shadow-sm select-none touch-target no-underline"
              >
                Download CV <FileText className="w-4 h-4 text-[var(--text-primary)]/70" />
              </a>
            </div>

          </motion.div>

          {/* Right Column Content - Avatar Frame */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            className="relative flex-shrink-0 w-[290px] h-[290px] sm:w-[360px] sm:h-[360px] md:w-[430px] md:h-[430px] flex items-center justify-center select-none"
          >
            {/* Dot grid decoration top-right */}
            <div className="absolute -top-6 -right-6 pointer-events-none select-none z-0 hidden sm:block">
              <svg width="60" height="120" viewBox="0 0 60 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="10" cy="10" r="2" fill="var(--accent-dark)" opacity="0.6"/>
                <circle cx="30" cy="10" r="2" fill="var(--accent-dark)" opacity="0.6"/>
                <circle cx="50" cy="10" r="2" fill="var(--accent-dark)" opacity="0.6"/>
                <circle cx="10" cy="30" r="2" fill="var(--accent-dark)" opacity="0.6"/>
                <circle cx="30" cy="30" r="2" fill="var(--accent-dark)" opacity="0.6"/>
                <circle cx="50" cy="30" r="2" fill="var(--accent-dark)" opacity="0.6"/>
                <circle cx="10" cy="50" r="2" fill="var(--accent-dark)" opacity="0.6"/>
                <circle cx="30" cy="50" r="2" fill="var(--accent-dark)" opacity="0.6"/>
                <circle cx="50" cy="50" r="2" fill="var(--accent-dark)" opacity="0.6"/>
                <circle cx="10" cy="70" r="2" fill="var(--accent-dark)" opacity="0.6"/>
                <circle cx="30" cy="70" r="2" fill="var(--accent-dark)" opacity="0.6"/>
                <circle cx="50" cy="70" r="2" fill="var(--accent-dark)" opacity="0.6"/>
                <circle cx="10" cy="90" r="2" fill="var(--accent-dark)" opacity="0.6"/>
                <circle cx="30" cy="90" r="2" fill="var(--accent-dark)" opacity="0.6"/>
                <circle cx="50" cy="90" r="2" fill="var(--accent-dark)" opacity="0.6"/>
                <circle cx="10" cy="110" r="2" fill="var(--accent-dark)" opacity="0.6"/>
                <circle cx="30" cy="110" r="2" fill="var(--accent-dark)" opacity="0.6"/>
                <circle cx="50" cy="110" r="2" fill="var(--accent-dark)" opacity="0.6"/>
              </svg>
            </div>

            {/* Double border circles */}
            {/* Outer dotted gold circle */}
            <div className="absolute inset-[-8px] rounded-full border-2 border-dashed border-[var(--accent-dark)]/40 animate-[spin_60s_linear_infinite] z-0" />
            {/* Inner solid gold circle */}
            <div className="absolute inset-0 rounded-full border border-[var(--accent-dark)] z-0" />
            {/* Inner fill circle */}
            <div className="absolute inset-[8px] bg-gradient-to-tr from-[var(--bg-card)]/40 to-[var(--bg-page)]/10 rounded-full z-10" />

            {/* Portrait Image */}
            <div className="absolute inset-[10px] flex items-end justify-center z-20 overflow-hidden rounded-full bg-[var(--text-primary)]/5">
              <Image 
                src="/profile.png" 
                alt="Saravana Shrutheesh" 
                width={500} 
                height={500}
                className="w-[105%] h-[105%] object-contain object-bottom transform hover:scale-[1.03] transition-transform duration-700"
                priority
              />
            </div>

            {/* Floating Status Badge Card */}
            <div className="absolute bottom-[5%] right-[-10%] sm:right-[-5%] md:right-[-2%] bg-white/95 backdrop-blur-md px-4 py-3 rounded-2xl border border-[var(--text-body)]/10 shadow-lg flex items-center gap-3 z-30">
              <div className="w-10 h-10 rounded-xl bg-[var(--accent-dark)] flex items-center justify-center text-white shrink-0">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-[12px] font-bold text-[var(--text-primary)] leading-tight">Operations • Analytics • AI</span>
                <span className="text-[10px] text-[var(--text-muted)] font-medium mt-0.5">Turning Data Into Impact</span>
              </div>
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
}
