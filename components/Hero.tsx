'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function Hero() {
  return (
    <section id="home" className="relative min-h-[95vh] flex items-center justify-center overflow-hidden py-12 md:py-24">
      
      {/* Background stock chart/trend lines */}
      <div className="absolute inset-0 pointer-events-none opacity-40 select-none z-0">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 600" preserveAspectRatio="none">
          {/* Vertical Grid Lines */}
          <g stroke="rgba(156, 142, 53, 0.08)" strokeWidth="1">
            <line x1="100" y1="0" x2="100" y2="600" />
            <line x1="200" y1="0" x2="200" y2="600" />
            <line x1="300" y1="0" x2="300" y2="600" />
            <line x1="400" y1="0" x2="400" y2="600" />
            <line x1="500" y1="0" x2="500" y2="600" />
            <line x1="600" y1="0" x2="600" y2="600" />
            <line x1="700" y1="0" x2="700" y2="600" />
            <line x1="800" y1="0" x2="800" y2="600" />
            <line x1="900" y1="0" x2="900" y2="600" />
          </g>
          {/* Trend Line (Optimized slope showing data growth/operations trend) */}
          <path
            d="M 0 500 Q 150 480 300 420 T 600 250 T 900 120 L 1000 100"
            fill="none"
            stroke="rgba(156, 142, 53, 0.15)"
            strokeWidth="2"
            strokeDasharray="4 4"
          />
          <path
            d="M 0 450 Q 200 400 400 320 T 800 180 L 1000 150"
            fill="none"
            stroke="rgba(26, 26, 10, 0.04)"
            strokeWidth="1.5"
          />
        </svg>
      </div>

      <div className="section-container z-10">
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12 lg:gap-8">
          
          {/* Left Column Content */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex-1 flex flex-col items-start w-full"
          >
            {/* Sub-header */}
            <p className="text-[16px] font-sans font-normal text-[#3D3A1A] opacity-90 mb-3">
              Hey, I&apos;m Saravana Shrutheesh M &mdash;
            </p>

            {/* Primary Title */}
            <h1 className="font-display font-extrabold text-[44px] sm:text-[54px] md:text-[68px] text-[#1A1A0A] leading-[1.1] tracking-tight mb-4">
              <span className="block">Results-Driven</span>
              <span className="block text-[#9C8E35]">Operations</span>
              <span className="block">Analyst.</span>
            </h1>

            {/* Subtext metric line */}
            <p className="font-mono text-[12px] font-medium tracking-[0.06em] text-[#5A5530] mb-6 uppercase">
              1.8 YRS EXP • FORTUNE 1 & MULTINATIONAL COMPANIES
            </p>

            {/* Core Narrative */}
            <div className="max-w-2xl my-4 border-l-2 border-[#9C8E35]/30 pl-4 py-1">
              <p className="text-[14.5px] sm:text-[16px] leading-relaxed text-[#3D3A1A]">
                I specialize in root cause analysis, process optimization, and data-driven intelligence&mdash;bridging technical insights with business strategies to build resilient, scalable business systems.
              </p>
            </div>

            {/* Call-to-Actions */}
            <div className="flex flex-wrap items-center gap-4 mt-6">
              <a 
                href="#work" 
                className="bg-[#A3963C] hover:bg-[#9C8E35] text-[#1A1A0A] font-medium px-8 py-3.5 rounded-full transition-transform hover:scale-[1.02] text-[14px] flex items-center justify-center shadow-md select-none touch-target"
              >
                See my work &darr;
              </a>
              <a 
                href="#contact" 
                className="bg-[#1A1A0A] hover:bg-[#2A2A1A] text-[#FAF7EC] border border-[#9C8E35]/40 font-medium px-8 py-3.5 rounded-full transition-transform hover:scale-[1.02] text-[14px] flex items-center justify-center shadow-md select-none touch-target"
              >
                Contact Me
              </a>
            </div>

          </motion.div>

          {/* Right Column Content - Avatar Frame */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            className="relative flex-shrink-0 w-[280px] h-[280px] sm:w-[350px] sm:h-[350px] md:w-[420px] md:h-[420px] flex items-center justify-center select-none"
          >
            {/* Glowing gold background circle */}
            <div className="absolute inset-0 bg-[#EDE8C4]/60 rounded-full border-4 border-[#9C8E35]/10 animate-pulse duration-[6s] z-0 scale-[0.96]" />
            <div className="absolute inset-4 bg-gradient-to-tr from-[#E6DFB3] to-[#F5F2E6] rounded-full shadow-inner z-10" />

            {/* Portrait Image */}
            <div className="absolute inset-0 flex items-end justify-center z-20 overflow-hidden rounded-full">
              <Image 
                src="/profile.png" 
                alt="Saravana Shrutheesh" 
                width={500} 
                height={500}
                className="w-[110%] h-[110%] object-contain object-bottom transform hover:scale-[1.03] transition-transform duration-700"
                priority
              />
            </div>

            {/* Plus / line decorative element top-right */}
            <div className="absolute -top-4 -right-4 font-mono text-[#9C8E35] font-bold text-sm tracking-wide flex items-center gap-1 z-30 pointer-events-none select-none">
              +<span className="w-12 h-[2px] bg-[#9C8E35]/60 inline-block" />+
            </div>

            {/* Slashes decorative element bottom-left */}
            <div className="absolute -bottom-4 -left-4 font-mono text-[#9C8E35] font-bold text-lg rotate-12 z-30 pointer-events-none select-none">
              ////
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
}
