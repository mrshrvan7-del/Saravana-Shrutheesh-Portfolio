'use client';
import { useEffect, useState } from 'react';

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="home" className="section-container section-padding min-h-[90vh] flex items-center mt-10 md:mt-0">
      <div className="flex flex-col md:flex-row items-center justify-between w-full gap-16 md:gap-8">
        <div className="flex-1 flex flex-col items-start w-full">
          <div 
            className={`inline-flex items-center gap-2 border border-[var(--border-color)] px-4 py-1.5 rounded-full mb-8 ${mounted ? 'fade-in visible' : 'fade-in'}`}
            style={{ transitionDelay: '150ms' }}
          >
            <span className="text-[13px] font-medium" style={{ color: 'var(--text-body)' }}>Available for Global Opportunities</span>
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse-dot" />
          </div>

          <p 
            className={`text-[16px] mb-2 ${mounted ? 'fade-up visible' : 'fade-up'}`}
            style={{ color: 'var(--text-body)', transitionDelay: '300ms' }}
          >
            Hello, I&apos;m Saravana,
          </p>

          <h1 className="flex flex-col leading-[1.1] mb-6">
            <span 
              className={`text-[48px] md:text-[64px] ${mounted ? 'slide-left visible' : 'slide-left'}`}
              style={{ transitionDelay: '450ms' }}
            >
              Business &
            </span>
            <span 
              className={`text-[48px] md:text-[64px] ${mounted ? 'slide-left visible' : 'slide-left'}`}
              style={{ transitionDelay: '550ms' }}
            >
              Ops Analyst
            </span>
          </h1>

          <p 
            className={`text-[15px] mb-8 max-w-md ${mounted ? 'fade-in visible' : 'fade-in'}`}
            style={{ color: 'var(--text-muted)', transitionDelay: '700ms' }}
          >
            based in Bengaluru, India.
          </p>

          <div 
            className={`flex items-center gap-4 ${mounted ? 'fade-up visible' : 'fade-up'}`}
            style={{ transitionDelay: '850ms' }}
          >
            <button className="bg-[var(--text-primary)] text-[var(--bg-page)] px-8 py-3 rounded-full text-[14px] font-medium hover:scale-[1.02] transition-transform">
              Resume
            </button>
            <button className="border border-[var(--border-color)] text-[var(--text-primary)] px-8 py-3 rounded-full text-[14px] font-medium hover:bg-[var(--text-primary)] hover:text-[var(--bg-page)] hover:border-[var(--text-primary)] transition-colors duration-200">
              Let&apos;s Talk →
            </button>
          </div>
        </div>

        <div 
          className={`relative flex-shrink-0 ${mounted ? 'scale-in visible' : 'scale-in'}`}
          style={{ transitionDelay: '1000ms' }}
        >
          <div className="absolute -top-6 -right-6 flex flex-col gap-1 text-[var(--text-primary)] font-bold text-2xl leading-none">
            <div className="flex gap-1"><span>+</span><span>+</span></div>
            <div className="flex gap-1 ml-4"><span>+</span><span>+</span></div>
          </div>
          
          <div className="absolute -bottom-4 -left-6 flex gap-1 text-[var(--text-primary)] font-bold text-xl transform -rotate-45">
            <span>/</span><span>/</span><span>/</span><span>/</span>
          </div>

          <div className="w-[180px] h-[180px] md:w-[240px] md:h-[240px] rounded-full border-[3px] border-[var(--text-primary)] bg-[var(--bg-accent)] flex items-center justify-center overflow-hidden hover:rotate-1 transition-transform duration-500 origin-center relative z-10">
            <span className="text-[64px] text-[var(--bg-page)] opacity-80" style={{ fontFamily: 'var(--font-playfair)' }}>SS</span>
          </div>
        </div>
      </div>
    </section>
  );
}
