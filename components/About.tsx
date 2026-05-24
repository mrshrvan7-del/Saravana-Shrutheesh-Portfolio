'use client';
import { useEffect, useRef } from 'react';

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = sectionRef.current?.querySelectorAll('.animate-on-scroll');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="section-container section-padding relative overflow-hidden" ref={sectionRef}>
      
      {/* Background Grid & Globe Decoration */}
      <div className="absolute top-8 right-8 opacity-[0.15] pointer-events-none select-none hidden md:block">
        <svg width="64" height="64" viewBox="0 0 64 64" fill="none" stroke="#1A1A0A" strokeWidth="1">
          <circle cx="8" cy="8" r="1.5" fill="#1A1A0A" />
          <circle cx="24" cy="8" r="1.5" fill="#1A1A0A" />
          <circle cx="40" cy="8" r="1.5" fill="#1A1A0A" />
          <circle cx="56" cy="8" r="1.5" fill="#1A1A0A" />
          <circle cx="8" cy="24" r="1.5" fill="#1A1A0A" />
          <circle cx="24" cy="24" r="1.5" fill="#1A1A0A" />
          <circle cx="40" cy="24" r="1.5" fill="#1A1A0A" />
          <circle cx="56" cy="24" r="1.5" fill="#1A1A0A" />
          <circle cx="8" cy="40" r="1.5" fill="#1A1A0A" />
          <circle cx="24" cy="40" r="1.5" fill="#1A1A0A" />
          <circle cx="40" cy="40" r="1.5" fill="#1A1A0A" />
          <circle cx="56" cy="40" r="1.5" fill="#1A1A0A" />
          <circle cx="8" cy="56" r="1.5" fill="#1A1A0A" />
          <circle cx="24" cy="56" r="1.5" fill="#1A1A0A" />
          <circle cx="40" cy="56" r="1.5" fill="#1A1A0A" />
          <circle cx="56" cy="56" r="1.5" fill="#1A1A0A" />
        </svg>
      </div>

      <svg className="absolute right-0 bottom-0 w-[300px] h-[300px] md:w-[450px] md:h-[450px] opacity-[0.08] pointer-events-none translate-x-12 translate-y-12 text-[#1A1A0A]" viewBox="0 0 400 400" fill="none" stroke="currentColor">
        <circle cx="200" cy="200" r="180" strokeWidth="1" strokeDasharray="4 4" />
        <ellipse cx="200" cy="200" rx="180" ry="60" strokeWidth="1" strokeDasharray="4 4" />
        <ellipse cx="200" cy="200" rx="180" ry="120" strokeWidth="1" strokeDasharray="4 4" />
        <ellipse cx="200" cy="200" rx="60" ry="180" strokeWidth="1" strokeDasharray="4 4" />
        <ellipse cx="200" cy="200" rx="120" ry="180" strokeWidth="1" strokeDasharray="4 4" />
        <line x1="200" y1="20" x2="200" y2="380" strokeWidth="1" strokeDasharray="4 4" />
        <line x1="20" y1="200" x2="380" y2="200" strokeWidth="1" strokeDasharray="4 4" />
      </svg>

      <h2 className="section-heading animate-on-scroll fade-up">about.</h2>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mt-8 relative z-10">
        
        {/* Left Column - WHO I AM */}
        <div className="lg:col-span-7 flex flex-col justify-start animate-on-scroll fade-up" style={{ transitionDelay: '150ms' }}>
          <span className="font-mono text-[11px] tracking-wider text-[#9C8E35] uppercase font-bold mb-3">WHO I AM</span>
          
          <h3 className="font-display font-extrabold text-[32px] sm:text-[40px] md:text-[48px] text-[#1A1A0A] leading-tight mb-8">
            I turn complexity into clarity <br />
            and data into <span className="text-[#9C8E35]">decisions.</span>
          </h3>

          <div className="space-y-6 text-[15px] sm:text-[16px] leading-relaxed text-[#3D3A1A]">
            <p>
              I am a results-driven Business Analyst and Operations Strategist with over 1.8 years of experience driving operational excellence at global leaders like <span className="text-[#9C8E35] font-semibold">Walmart Global Tech</span> and <span className="text-[#9C8E35] font-semibold">Toyota Motors India</span>.
            </p>
            <p>
              Having a strong foundation in Computer Applications and Data Analysis, I thrive at the intersection of process optimization and business intelligence.
            </p>
            <p>
              By integrating AI-augmented workflows and advanced telemetry dashboards into daily operations, I help enterprises shift from reactive troubleshooting to proactive, scalable forecasting.
            </p>
            <p>
              My ambition is to bring this structured clarity and technical bridge to global teams, engineering operational intelligence that scales across borders, timezones, and complex organizational layers.
            </p>
          </div>
        </div>

        {/* Right Column - WHAT I BRING & STATS */}
        <div className="lg:col-span-5 flex flex-col gap-10 animate-on-scroll fade-up" style={{ transitionDelay: '300ms' }}>
          
          {/* Bento Card Box */}
          <div className="p-8 bg-[#EAE4B8]/20 border border-[#9C8E35]/15 rounded-2xl">
            <span className="font-mono text-[11px] tracking-wider text-[#9C8E35] uppercase font-bold mb-6 block">WHAT I BRING</span>
            
            <ul className="space-y-6">
              {/* Item 1 */}
              <li className="flex items-start gap-4">
                <div className="p-2 bg-[#E6DFB3]/40 rounded-lg text-[#9C8E35] flex-shrink-0 mt-0.5">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 002 2h2a2 2 0 002-2z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-sans font-semibold text-[14px] text-[#1A1A0A]">Data-driven insights</h4>
                  <p className="text-[13px] text-[#5A5530] mt-0.5">that drive measurable impact</p>
                </div>
              </li>

              {/* Item 2 */}
              <li className="flex items-start gap-4">
                <div className="p-2 bg-[#E6DFB3]/40 rounded-lg text-[#9C8E35] flex-shrink-0 mt-0.5">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-sans font-semibold text-[14px] text-[#1A1A0A]">Process optimization</h4>
                  <p className="text-[13px] text-[#5A5530] mt-0.5">with a scalable mindset</p>
                </div>
              </li>

              {/* Item 3 */}
              <li className="flex items-start gap-4">
                <div className="p-2 bg-[#E6DFB3]/40 rounded-lg text-[#9C8E35] flex-shrink-0 mt-0.5">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-sans font-semibold text-[14px] text-[#1A1A0A]">AI-augmented workflows</h4>
                  <p className="text-[13px] text-[#5A5530] mt-0.5">for smarter operations</p>
                </div>
              </li>

              {/* Item 4 */}
              <li className="flex items-start gap-4">
                <div className="p-2 bg-[#E6DFB3]/40 rounded-lg text-[#9C8E35] flex-shrink-0 mt-0.5">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-sans font-semibold text-[14px] text-[#1A1A0A]">Cross-functional collaboration</h4>
                  <p className="text-[13px] text-[#5A5530] mt-0.5">across global teams</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-2 gap-6">
            <div className="text-center p-4 border border-[#9C8E35]/15 rounded-xl bg-white/50 backdrop-blur-sm">
              <span className="block font-display font-extrabold text-[28px] sm:text-[32px] text-[#9C8E35]">1.8+</span>
              <span className="block text-[11px] font-semibold text-[#5A5530] uppercase tracking-wider mt-1">Years of Experience</span>
            </div>
            <div className="text-center p-4 border border-[#9C8E35]/15 rounded-xl bg-white/50 backdrop-blur-sm">
              <span className="block font-display font-extrabold text-[28px] sm:text-[32px] text-[#9C8E35]">2</span>
              <span className="block text-[11px] font-semibold text-[#5A5530] uppercase tracking-wider mt-1">Global Companies</span>
            </div>
            <div className="text-center p-4 border border-[#9C8E35]/15 rounded-xl bg-white/50 backdrop-blur-sm">
              <span className="block font-display font-extrabold text-[28px] sm:text-[32px] text-[#9C8E35]">∞</span>
              <span className="block text-[11px] font-semibold text-[#5A5530] uppercase tracking-wider mt-1">Curiosity & Learning</span>
            </div>
            <div className="text-center p-4 border border-[#9C8E35]/15 rounded-xl bg-white/50 backdrop-blur-sm">
              <span className="block font-display font-extrabold text-[28px] sm:text-[32px] text-[#9C8E35]">100%</span>
              <span className="block text-[11px] font-semibold text-[#5A5530] uppercase tracking-wider mt-1">Commitment</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
