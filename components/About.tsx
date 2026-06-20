'use client';
import { useEffect, useRef } from 'react';
import { Briefcase, Globe, BarChart3, Star } from 'lucide-react';

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
    <section id="about" className="section-container section-padding bg-transparent relative overflow-hidden" ref={sectionRef}>
      
      {/* Background Globe/Coordinates SVG */}
      <svg className="absolute right-0 bottom-0 w-[300px] h-[300px] md:w-[500px] md:h-[500px] opacity-[0.05] pointer-events-none translate-x-16 translate-y-16 text-[var(--text-primary)]" viewBox="0 0 400 400" fill="none" stroke="currentColor">
        <circle cx="200" cy="200" r="180" strokeWidth="1" strokeDasharray="4 4" />
        <ellipse cx="200" cy="200" rx="180" ry="60" strokeWidth="1" strokeDasharray="4 4" />
        <ellipse cx="200" cy="200" rx="180" ry="120" strokeWidth="1" strokeDasharray="4 4" />
        <ellipse cx="200" cy="200" rx="60" ry="180" strokeWidth="1" strokeDasharray="4 4" />
        <ellipse cx="200" cy="200" rx="120" ry="180" strokeWidth="1" strokeDasharray="4 4" />
        <line x1="200" y1="20" x2="200" y2="380" strokeWidth="1" strokeDasharray="4 4" />
        <line x1="20" y1="200" x2="380" y2="200" strokeWidth="1" strokeDasharray="4 4" />
      </svg>

      {/* 1. Top Metrics Bar (Sleek Horizontal Capsule, merged seamlessly with warm cream background) */}
      <div className="w-full mb-20 bg-[var(--bg-card)]/40 backdrop-blur-sm rounded-3xl md:rounded-full border border-[var(--text-body)]/10 shadow-[inset_0_1px_2px_rgba(42,42,36,0.05),_0_8px_30px_rgba(42,42,36,0.03)] p-6 md:p-8 flex flex-col md:flex-row items-stretch justify-between gap-8 md:gap-4 animate-on-scroll fade-up">
        {/* Stat 1 */}
        <div className="flex-1 flex items-start gap-4">
          <div className="w-12 h-12 rounded-full border border-[var(--text-body)]/10 flex items-center justify-center text-[var(--accent-dark)] shrink-0 bg-transparent">
            <Briefcase className="w-5 h-5" />
          </div>
          <div className="flex flex-col text-left">
            <span className="text-[22px] md:text-[24px] font-extrabold text-[var(--text-primary)] leading-none">1.8+</span>
            <span className="text-[13px] font-bold text-[var(--text-primary)] mt-1.5">Years Experience</span>
            <span className="text-[11px] text-[var(--text-muted)] font-medium leading-tight mt-0.5">Across Fortune 1 Companies</span>
          </div>
        </div>
        
        <div className="w-[1px] bg-[var(--text-body)]/10 hidden md:block" />
        
        {/* Stat 2 */}
        <div className="flex-1 flex items-start gap-4">
          <div className="w-12 h-12 rounded-full border border-[var(--text-body)]/10 flex items-center justify-center text-[var(--accent-dark)] shrink-0 bg-transparent">
            <Globe className="w-5 h-5" />
          </div>
          <div className="flex flex-col text-left">
            <span className="text-[22px] md:text-[24px] font-extrabold text-[var(--text-primary)] leading-none">2</span>
            <span className="text-[13px] font-bold text-[var(--text-primary)] mt-1.5">Global Giants</span>
            <span className="text-[11px] text-[var(--text-muted)] font-medium leading-tight mt-0.5">Walmart Global Tech & Toyota India</span>
          </div>
        </div>
        
        <div className="w-[1px] bg-[var(--text-body)]/10 hidden md:block" />
        
        {/* Stat 3 */}
        <div className="flex-1 flex items-start gap-4">
          <div className="w-12 h-12 rounded-full border border-[var(--text-body)]/10 flex items-center justify-center text-[var(--accent-dark)] shrink-0 bg-transparent">
            <BarChart3 className="w-5 h-5" />
          </div>
          <div className="flex flex-col text-left">
            <span className="text-[22px] md:text-[24px] font-extrabold text-[var(--text-primary)] leading-none">10+</span>
            <span className="text-[13px] font-bold text-[var(--text-primary)] mt-1.5">Dashboards Built</span>
            <span className="text-[11px] text-[var(--text-muted)] font-medium leading-tight mt-0.5">Power BI • BigQuery • Insights</span>
          </div>
        </div>
        
        <div className="w-[1px] bg-[var(--text-body)]/10 hidden md:block" />
        
        {/* Stat 4 */}
        <div className="flex-1 flex items-start gap-4">
          <div className="w-12 h-12 rounded-full border border-[var(--text-body)]/10 flex items-center justify-center text-[var(--accent-dark)] shrink-0 bg-transparent">
            <Star className="w-5 h-5" />
          </div>
          <div className="flex flex-col text-left">
            <span className="text-[22px] md:text-[24px] font-extrabold text-[var(--text-primary)] leading-none">AI-Driven</span>
            <span className="text-[13px] font-bold text-[var(--text-primary)] mt-1.5">Solutions Built</span>
            <span className="text-[11px] text-[var(--text-muted)] font-medium leading-tight mt-0.5">Automation • NLP • Intelligence</span>
          </div>
        </div>
      </div>

      {/* 2. Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start relative z-10">
        
        {/* Left Column - Heading, Headline, & Paragraphs */}
        <div className="lg:col-span-7 flex flex-col justify-start animate-on-scroll fade-up" style={{ transitionDelay: '150ms' }}>
          
          {/* Lowercase serif heading */}
          <h2 className="section-heading !mb-4 !mt-0 !text-left">about.</h2>
          
          <span className="font-mono text-[11px] tracking-wider text-[var(--accent-dark)] uppercase font-bold mb-3">WHO I AM</span>
          
          <h3 className="font-display font-extrabold text-[32px] sm:text-[40px] md:text-[48px] text-[var(--text-primary)] leading-[1.1] tracking-tight mb-8">
            I turn complexity into clarity <br />
            and data into <span className="text-[var(--accent-dark)]">decisions.</span>
          </h3>

          <div className="space-y-6 text-[15px] sm:text-[16px] leading-relaxed text-[var(--text-body)]">
            <p>
              I am a results-driven Business Analyst and Operations Strategist with over 1.8 years of experience driving operational excellence at global leaders like <span className="text-[var(--accent-dark)] font-semibold">Walmart Global Tech</span> and <span className="text-[var(--accent-dark)] font-semibold">Toyota Motors India</span>.
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

        {/* Right Column - WHAT I BRING Bento Card (seamlessly merged with warm cream background) */}
        <div className="lg:col-span-5 flex flex-col justify-start animate-on-scroll fade-up" style={{ transitionDelay: '300ms' }}>
          
          <div className="p-8 bg-[var(--bg-card)] border border-[var(--text-body)]/10 rounded-2xl shadow-[0_4px_30px_rgba(42,42,36,0.02)]">
            <span className="font-mono text-[11px] tracking-wider text-[var(--accent-dark)] uppercase font-bold mb-8 block">WHAT I BRING</span>
            
            <ul className="space-y-8">
              {/* Item 1 */}
              <li className="flex items-start gap-4">
                <div className="p-2 border border-[var(--text-body)]/10 rounded-lg text-[var(--accent-dark)] flex-shrink-0 mt-0.5 bg-transparent">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 002 2h2a2 2 0 002-2z" />
                  </svg>
                </div>
                <div className="text-left">
                  <h4 className="font-sans font-semibold text-[14px] text-[var(--text-primary)]">Data-driven insights</h4>
                  <p className="text-[13px] text-[var(--text-muted)] mt-0.5">that drive measurable impact</p>
                </div>
              </li>

              {/* Item 2 */}
              <li className="flex items-start gap-4">
                <div className="p-2 border border-[var(--text-body)]/10 rounded-lg text-[var(--accent-dark)] flex-shrink-0 mt-0.5 bg-transparent">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div className="text-left">
                  <h4 className="font-sans font-semibold text-[14px] text-[var(--text-primary)]">Process optimization</h4>
                  <p className="text-[13px] text-[var(--text-muted)] mt-0.5">with a scalable mindset</p>
                </div>
              </li>

              {/* Item 3 */}
              <li className="flex items-start gap-4">
                <div className="p-2 border border-[var(--text-body)]/10 rounded-lg text-[var(--accent-dark)] flex-shrink-0 mt-0.5 bg-transparent">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <div className="text-left">
                  <h4 className="font-sans font-semibold text-[14px] text-[var(--text-primary)]">AI-augmented workflows</h4>
                  <p className="text-[13px] text-[var(--text-muted)] mt-0.5">for smarter operations</p>
                </div>
              </li>

              {/* Item 4 */}
              <li className="flex items-start gap-4">
                <div className="p-2 border border-[var(--text-body)]/10 rounded-lg text-[var(--accent-dark)] flex-shrink-0 mt-0.5 bg-transparent">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                </div>
                <div className="text-left">
                  <h4 className="font-sans font-semibold text-[14px] text-[var(--text-primary)]">Cross-functional collaboration</h4>
                  <p className="text-[13px] text-[var(--text-muted)] mt-0.5">across global teams</p>
                </div>
              </li>
            </ul>
          </div>

        </div>

      </div>
    </section>
  );
}
