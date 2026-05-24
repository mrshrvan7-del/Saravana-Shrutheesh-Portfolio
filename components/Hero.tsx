'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Briefcase, Building2, Globe, TrendingUp, BarChart3, Star, Mail } from 'lucide-react';

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden py-24 md:py-32 bg-gradient-to-b from-[#FBF9F2] via-[#FAF8F0] to-[#F5F0D8]">
      
      {/* Concentric topography circles / background graphic */}
      <div className="absolute right-0 bottom-0 pointer-events-none opacity-20 select-none z-0">
        <svg className="w-[300px] h-[300px] sm:w-[450px] sm:h-[450px] md:w-[600px] md:h-[600px] text-[#1A1A0A] transform translate-x-20 translate-y-20" viewBox="0 0 400 400" fill="none" stroke="currentColor">
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
            <p className="text-[15px] font-sans font-medium text-[#5A5530] mb-4">
              Hey, I&apos;m <span className="font-bold text-[#1A1A0A]">Saravana Shrutheesh M M</span> 👋
            </p>

            {/* Primary Title */}
            <h1 className="font-display font-extrabold text-[46px] sm:text-[56px] md:text-[68px] text-[#1A1A0A] leading-[1.08] tracking-tight mb-6">
              <span className="block">Results-Driven</span>
              <span className="block text-[#8A7C38] my-1">Operations</span>
              <span className="block">Analyst<span className="text-[#8A7C38]">.</span></span>
            </h1>

            {/* Badges row */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text.5 font-bold text-[#5A5530] tracking-wider uppercase mb-8 text-[11px]">
              <div className="flex items-center gap-1.5 bg-[#1A1A0A]/5 px-3 py-1.5 rounded-md">
                <Briefcase className="w-3.5 h-3.5 text-[#8A7C38]" />
                <span>1.8 YRS EXP</span>
              </div>
              <div className="w-[1px] h-3 bg-[#3D3A1A]/20 hidden sm:block" />
              <div className="flex items-center gap-1.5 bg-[#1A1A0A]/5 px-3 py-1.5 rounded-md">
                <Building2 className="w-3.5 h-3.5 text-[#8A7C38]" />
                <span>FORTUNE 1 COMPANIES</span>
              </div>
              <div className="w-[1px] h-3 bg-[#3D3A1A]/20 hidden sm:block" />
              <div className="flex items-center gap-1.5 bg-[#1A1A0A]/5 px-3 py-1.5 rounded-md">
                <Globe className="w-3.5 h-3.5 text-[#8A7C38]" />
                <span>GLOBAL IMPACT</span>
              </div>
            </div>

            {/* Core Narrative */}
            <p className="text-[15px] sm:text-[16px] leading-relaxed text-[#3D3A1A] max-w-xl mb-8">
              I specialize in root cause analysis, process optimization, and data-driven intelligence&mdash;bridging technical insights with business strategies to build resilient, scalable business systems.
            </p>

            {/* Call-to-Actions */}
            <div className="flex flex-wrap items-center gap-4">
              <a 
                href="#work" 
                className="bg-[#8A7C38] hover:bg-[#73672D] text-[#FAF7EC] font-semibold px-8 py-3.5 rounded-full transition-transform hover:scale-[1.02] text-[14px] flex items-center justify-center gap-2 shadow-sm select-none touch-target"
              >
                See my work <span className="font-sans text-[15px]">→</span>
              </a>
              <a 
                href="#contact" 
                className="bg-white hover:bg-[#FAF7EC] text-[#1A1A0A] border border-[#3D3A1A]/15 font-semibold px-8 py-3.5 rounded-full transition-transform hover:scale-[1.02] text-[14px] flex items-center justify-center gap-2 shadow-sm select-none touch-target"
              >
                Contact Me <Mail className="w-4 h-4 text-[#1A1A0A]/70" />
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
                <circle cx="10" cy="10" r="2" fill="#8A7C38" opacity="0.6"/>
                <circle cx="30" cy="10" r="2" fill="#8A7C38" opacity="0.6"/>
                <circle cx="50" cy="10" r="2" fill="#8A7C38" opacity="0.6"/>
                <circle cx="10" cy="30" r="2" fill="#8A7C38" opacity="0.6"/>
                <circle cx="30" cy="30" r="2" fill="#8A7C38" opacity="0.6"/>
                <circle cx="50" cy="30" r="2" fill="#8A7C38" opacity="0.6"/>
                <circle cx="10" cy="50" r="2" fill="#8A7C38" opacity="0.6"/>
                <circle cx="30" cy="50" r="2" fill="#8A7C38" opacity="0.6"/>
                <circle cx="50" cy="50" r="2" fill="#8A7C38" opacity="0.6"/>
                <circle cx="10" cy="70" r="2" fill="#8A7C38" opacity="0.6"/>
                <circle cx="30" cy="70" r="2" fill="#8A7C38" opacity="0.6"/>
                <circle cx="50" cy="70" r="2" fill="#8A7C38" opacity="0.6"/>
                <circle cx="10" cy="90" r="2" fill="#8A7C38" opacity="0.6"/>
                <circle cx="30" cy="90" r="2" fill="#8A7C38" opacity="0.6"/>
                <circle cx="50" cy="90" r="2" fill="#8A7C38" opacity="0.6"/>
                <circle cx="10" cy="110" r="2" fill="#8A7C38" opacity="0.6"/>
                <circle cx="30" cy="110" r="2" fill="#8A7C38" opacity="0.6"/>
                <circle cx="50" cy="110" r="2" fill="#8A7C38" opacity="0.6"/>
              </svg>
            </div>

            {/* Double border circles */}
            {/* Outer dotted gold circle */}
            <div className="absolute inset-[-8px] rounded-full border-2 border-dashed border-[#8A7C38]/40 animate-[spin_60s_linear_infinite] z-0" />
            {/* Inner solid gold circle */}
            <div className="absolute inset-0 rounded-full border border-[#8A7C38] z-0" />
            {/* Inner fill circle */}
            <div className="absolute inset-[8px] bg-gradient-to-tr from-[#EDE8C4]/40 to-[#F5F2E6]/10 rounded-full z-10" />

            {/* Portrait Image */}
            <div className="absolute inset-[10px] flex items-end justify-center z-20 overflow-hidden rounded-full bg-[#1A1A0A]/5">
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
            <div className="absolute bottom-[5%] right-[-10%] sm:right-[-5%] md:right-[-2%] bg-white/95 backdrop-blur-md px-4 py-3 rounded-2xl border border-[#3D3A1A]/10 shadow-lg flex items-center gap-3 z-30">
              <div className="w-10 h-10 rounded-xl bg-[#8A7C38] flex items-center justify-center text-white shrink-0">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-[12px] font-bold text-[#1A1A0A] leading-tight">Operations • Analytics • AI</span>
                <span className="text-[10px] text-[#5A5530] font-medium mt-0.5">Turning Data Into Impact</span>
              </div>
            </div>

          </motion.div>

        </div>

        {/* Bottom Horizontal Stats Bar Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          className="w-full mt-20 lg:mt-24 bg-white/95 backdrop-blur-md rounded-3xl md:rounded-full border border-[#3D3A1A]/10 shadow-[0_8px_30px_rgb(0,0,0,0.03)] p-6 md:p-8 flex flex-col md:flex-row items-stretch justify-between gap-8 md:gap-4 z-20"
        >
          {/* Stat 1 */}
          <div className="flex-1 flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-[#FAF7EC] border border-[#3D3A1A]/5 flex items-center justify-center text-[#8A7C38] shrink-0">
              <Briefcase className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-[24px] md:text-[28px] font-extrabold text-[#1A1A0A] leading-none">1.8+</span>
              <span className="text-[13px] font-bold text-[#1A1A0A] mt-1.5">Years Experience</span>
              <span className="text-[11px] text-[#5A5530] font-medium leading-tight mt-0.5">Across Fortune 1 Companies</span>
            </div>
          </div>
          
          <div className="w-[1px] bg-[#3D3A1A]/10 hidden md:block" />
          
          {/* Stat 2 */}
          <div className="flex-1 flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-[#FAF7EC] border border-[#3D3A1A]/5 flex items-center justify-center text-[#8A7C38] shrink-0">
              <Globe className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-[24px] md:text-[28px] font-extrabold text-[#1A1A0A] leading-none">2</span>
              <span className="text-[13px] font-bold text-[#1A1A0A] mt-1.5">Global Giants</span>
              <span className="text-[11px] text-[#5A5530] font-medium leading-tight mt-0.5">Walmart Global Tech & Toyota Motors India</span>
            </div>
          </div>
          
          <div className="w-[1px] bg-[#3D3A1A]/10 hidden md:block" />
          
          {/* Stat 3 */}
          <div className="flex-1 flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-[#FAF7EC] border border-[#3D3A1A]/5 flex items-center justify-center text-[#8A7C38] shrink-0">
              <BarChart3 className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-[24px] md:text-[28px] font-extrabold text-[#1A1A0A] leading-none">10+</span>
              <span className="text-[13px] font-bold text-[#1A1A0A] mt-1.5">Dashboards Built</span>
              <span className="text-[11px] text-[#5A5530] font-medium leading-tight mt-0.5">Power BI • BigQuery • Data-Driven Insights</span>
            </div>
          </div>
          
          <div className="w-[1px] bg-[#3D3A1A]/10 hidden md:block" />
          
          {/* Stat 4 */}
          <div className="flex-1 flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-[#FAF7EC] border border-[#3D3A1A]/5 flex items-center justify-center text-[#8A7C38] shrink-0">
              <Star className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-[24px] md:text-[28px] font-extrabold text-[#1A1A0A] leading-none">AI-Driven</span>
              <span className="text-[13px] font-bold text-[#1A1A0A] mt-1.5">Solutions Built</span>
              <span className="text-[11px] text-[#5A5530] font-medium leading-tight mt-0.5">Automation • NLP • Intelligence</span>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
