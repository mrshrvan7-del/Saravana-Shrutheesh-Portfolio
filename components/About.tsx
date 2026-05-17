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
            if (entry.target.classList.contains('draw-line-container')) {
              const line = entry.target.querySelector('.draw-line') as SVGLineElement;
              if (line) {
                line.style.strokeDashoffset = '0';
              }
            }
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
    <section id="about" className="section-container section-padding" ref={sectionRef}>
      <h2 className="section-heading animate-on-scroll fade-up">about.</h2>
      
      <div className="max-w-3xl mb-16 animate-on-scroll fade-up" style={{ transitionDelay: '150ms' }}>
        <p className="text-[15px] leading-relaxed">
          I am a Business Analyst and Operations Strategist who thrives at the intersection of process optimization and data analytics. By integrating AI-augmented workflows into daily operations, I help enterprises shift from reactive firefighting to proactive, scalable forecasting. My ambition is to bring this structured clarity to global teams, engineering operational intelligence that scales across borders and timezones.
        </p>
      </div>

      <div className="relative ml-2 animate-on-scroll draw-line-container fade-in" style={{ transitionDelay: '300ms' }}>
        {/* SVG Connecting Line */}
        <svg 
          className="absolute left-[5px] top-3 h-[calc(100%-24px)] w-[2px]" 
          preserveAspectRatio="none"
        >
          <line 
            x1="0" y1="0" x2="0" y2="100%" 
            stroke="var(--border-color)" 
            strokeWidth="2"
            pathLength="1"
            className="draw-line"
            style={{
              strokeDasharray: '1',
              strokeDashoffset: '1',
              transition: 'stroke-dashoffset 1.5s ease-out 300ms'
            }}
          />
        </svg>

        <div className="pl-10 relative mb-12 animate-on-scroll fade-in" style={{ transitionDelay: '450ms' }}>
          <div className="absolute left-0 top-1.5 w-3 h-3 bg-[var(--text-primary)] rounded-full" />
          <div className="mono text-[13px] mb-1 text-[var(--text-body)] font-medium">2022 — Present</div>
          <div className="text-[14px] text-[var(--text-body)] max-w-2xl">
            Started at Walmart Global Tech as Process Analyst. Led SLA intelligence initiatives and automated root cause analysis pipelines, driving impactful scale.
          </div>
        </div>

        <div className="pl-10 relative mb-12 animate-on-scroll fade-in" style={{ transitionDelay: '600ms' }}>
          <div className="absolute left-0 top-1.5 w-3 h-3 bg-[var(--text-primary)] rounded-full" />
          <div className="mono text-[13px] mb-1 text-[var(--text-body)] font-medium">2020 — 2022</div>
          <div className="text-[14px] text-[var(--text-body)] max-w-2xl">
            Business & Marketing Analyst at Toyota Motors India. Built executive-ready dashboards and aligned cross-functional teams to hit regional targets.
          </div>
        </div>

        <div className="pl-10 relative animate-on-scroll fade-in" style={{ transitionDelay: '750ms' }}>
          <div className="absolute left-0 top-1.5 w-3 h-3 bg-[var(--text-primary)] rounded-full" />
          <div className="mono text-[13px] mb-1 text-[var(--text-body)] font-medium">2016 — 2020</div>
          <div className="text-[14px] text-[var(--text-body)] max-w-2xl">
            BCA at Surana College, Bengaluru. Developed the technical foundation for bridging complex data systems with business strategy.
          </div>
        </div>
      </div>
    </section>
  );
}
