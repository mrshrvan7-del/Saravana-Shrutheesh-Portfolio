'use client';
import { useEffect, useRef, useState } from 'react';

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const [copied, setCopied] = useState(false);
  const email = "Saravanashrutheesh@gmail.com";

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

  const handleCopy = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <section id="contact" className="section-container section-padding pb-32" ref={sectionRef}>
        <h2 className="section-heading animate-on-scroll fade-up">contact.</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mt-8">
          
          {/* Left Column - Relocation Status Hub */}
          <div className="lg:col-span-5 flex flex-col justify-between p-8 bg-gradient-to-br from-[var(--bg-card)] to-[#EAE4B8]/30 border border-[#9C8E35]/20 rounded-xl relative overflow-hidden shadow-sm min-h-[380px] animate-on-scroll fade-up" style={{ transitionDelay: '150ms' }}>
            {/* Decorative background grid */}
            <div className="absolute inset-0 opacity-[0.07] pointer-events-none" style={{
              backgroundImage: 'linear-gradient(var(--text-primary) 1px, transparent 1px), linear-gradient(90deg, var(--text-primary) 1px, transparent 1px)',
              backgroundSize: '24px 24px'
            }} />
            
            <div className="relative z-10">
              {/* Pulsing Status indicator */}
              <div className="flex items-center gap-2 w-fit px-3 py-1 bg-[#1A1A0A] rounded-full border border-[#9C8E35]/20 mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#A3963C] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#A3963C]"></span>
                </span>
                <span className="font-mono text-[10px] tracking-wider text-[#FAF7EC] uppercase font-bold">Actively Open</span>
              </div>

              <h3 className="font-display font-extrabold text-[36px] md:text-[44px] text-[#1A1A0A] leading-tight mb-4 mt-6">
                Open for <br />
                <span className="text-[#9C8E35]">Relocation</span>
              </h3>
            </div>
          </div>

          {/* Right Column - Interaction & Links */}
          <div className="lg:col-span-7 flex flex-col justify-center animate-on-scroll fade-up" style={{ transitionDelay: '300ms' }}>
            <p className="text-[18px] md:text-[22px] font-bold text-[#1A1A0A] leading-relaxed mb-8 max-w-2xl">
              I hope I have made my impact. <span className="text-[#9C8E35]">Let&apos;s connect and get my interview scheduled.</span>
            </p>

            {/* Action Buttons Row */}
            <div className="flex flex-col sm:flex-row items-center gap-4 mb-8 w-full">
              <button 
                onClick={handleCopy}
                className="w-full sm:w-auto px-8 py-4 bg-[#1A1A0A] hover:bg-[#9C8E35] text-[#FAF7EC] font-sans font-semibold text-[14px] cursor-pointer transition-all duration-300 rounded-full flex items-center justify-center gap-2 shadow-md hover:scale-[1.02] transform"
              >
                {copied ? (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                    </svg>
                    <span>Copy Email Address</span>
                  </>
                )}
              </button>
              
              <a
                href="/Saravana_Shrutheesh_CV.pdf"
                download="Saravana_Shrutheesh_CV.pdf"
                aria-label="Download Saravana Shrutheesh's CV as PDF"
                className="w-full sm:w-auto text-center px-8 py-4 border-[1.5px] border-[#1A1A0A] bg-transparent hover:bg-[#1A1A0A] hover:text-[#FAF7EC] text-[#1A1A0A] font-sans font-semibold text-[14px] cursor-pointer transition-all duration-300 rounded-full flex items-center justify-center gap-2 shadow-md hover:scale-[1.02] transform no-underline"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                <span>Download Resume</span>
              </a>
            </div>

            {/* Social Link Cards Stack */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
              
              {/* Email Link Card */}
              <a 
                href="mailto:Saravanashrutheesh@gmail.com" 
                className="group flex flex-col p-5 bg-[var(--bg-card)] border border-[#9C8E35]/10 rounded-xl hover:border-[#9C8E35]/40 hover:bg-[#1A1A0A]/5 transition-all duration-300 relative overflow-hidden no-underline"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2.5 bg-[#E6DFB3]/40 rounded-lg text-[#9C8E35]">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                  </div>
                  <span className="text-[16px] text-[#9C8E35] opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300">→</span>
                </div>
                <span className="font-mono text-[10px] tracking-wider text-[#5A5530] uppercase mb-1">Direct Mail</span>
                <span className="font-sans font-semibold text-[13px] text-[#1A1A0A] truncate">Saravanashrutheesh@gmail.com</span>
              </a>

              {/* LinkedIn Link Card */}
              <a 
                href="https://www.linkedin.com/in/saravana-shrutheesh-m-001402344" 
                target="_blank" 
                rel="noreferrer"
                className="group flex flex-col p-5 bg-[var(--bg-card)] border border-[#9C8E35]/10 rounded-xl hover:border-[#9C8E35]/40 hover:bg-[#1A1A0A]/5 transition-all duration-300 relative overflow-hidden no-underline"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2.5 bg-[#E6DFB3]/40 rounded-lg text-[#9C8E35]">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
                    </svg>
                  </div>
                  <span className="text-[16px] text-[#9C8E35] opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300">→</span>
                </div>
                <span className="font-mono text-[10px] tracking-wider text-[#5A5530] uppercase mb-1">Professional</span>
                <span className="font-sans font-semibold text-[13px] text-[#1A1A0A] truncate">linkedin.com/in/saravana-shrutheesh-m-001402344</span>
              </a>

              {/* GitHub Link Card */}
              <a 
                href="https://github.com/mrshrvan7-del" 
                target="_blank" 
                rel="noreferrer"
                className="group flex flex-col p-5 bg-[var(--bg-card)] border border-[#9C8E35]/10 rounded-xl hover:border-[#9C8E35]/40 hover:bg-[#1A1A0A]/5 transition-all duration-300 relative overflow-hidden no-underline"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2.5 bg-[#E6DFB3]/40 rounded-lg text-[#9C8E35]">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
                    </svg>
                  </div>
                  <span className="text-[16px] text-[#9C8E35] opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300">→</span>
                </div>
                <span className="font-mono text-[10px] tracking-wider text-[#5A5530] uppercase mb-1">Repositories</span>
                <span className="font-sans font-semibold text-[13px] text-[#1A1A0A] truncate">github.com/mrshrvan7-del</span>
              </a>

            </div>
          </div>

        </div>
      </section>

      <footer className="bg-[var(--bg-nav)] py-8">
        <div className="section-container flex flex-col md:flex-row justify-between items-center gap-4 text-[12px] text-[var(--bg-page)] opacity-50">
          <p>© 2026 Saravana Shrutheesh · Bengaluru, India</p>
          <p>Built with intent. Open to opportunities.</p>
        </div>
      </footer>
    </>
  );
}
