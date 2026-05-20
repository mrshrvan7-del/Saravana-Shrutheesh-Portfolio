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
    <section id="about" className="section-container section-padding" ref={sectionRef}>
      <h2 className="section-heading animate-on-scroll fade-up">about.</h2>
      
      <div className="max-w-5xl animate-on-scroll fade-up" style={{ transitionDelay: '150ms' }}>
        <p className="text-[20px] sm:text-[24px] md:text-[28px] font-display font-bold leading-relaxed text-[#1A1A0A] tracking-tight">
          I am a results-driven Business Analyst and Operations Strategist with over 1.8 years of experience driving operational excellence at global leaders like Walmart Global Tech and Toyota Motors India. Having a strong foundation in Computer Applications and Data Analysis, I thrive at the intersection of process optimization and business intelligence. By integrating AI-augmented workflows and advanced telemetry dashboards into daily operations, I help enterprises shift from reactive troubleshooting to proactive, scalable forecasting. My ambition is to bring this structured clarity and technical bridge to global teams, engineering operational intelligence that scales across borders, timezones, and complex organizational layers.
        </p>
      </div>
    </section>
  );
}
