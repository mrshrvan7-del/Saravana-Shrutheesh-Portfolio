'use client';
import { useEffect, useRef } from 'react';

export default function Education() {
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
    <section id="education" className="section-container section-padding" ref={sectionRef}>
      <h2 className="section-heading animate-on-scroll fade-up">education.</h2>
      
      <div className="timeline">
        
        {/* Degree */}
        <div className="timeline-item animate-on-scroll fade-up" style={{ transitionDelay: '150ms' }}>
          <div className="timeline-dot" />
          <div className="timeline-content">
            <span className="timeline-date">2021 - 2024</span>
            <h3 className="timeline-title">Bachelor of Computer Applications (BCA)</h3>
            <p className="timeline-desc">Surana College &middot; Bangalore, India</p>
            <ul className="timeline-bullets">
              <li>Specialized in Computer Applications with a focus on Data Analysis, database management systems, and software development fundamentals.</li>
              <li>Successfully bridged theoretical computing modules with practical data dashboarding and analytics.</li>
            </ul>
          </div>
        </div>

        {/* Pre-University */}
        <div className="timeline-item animate-on-scroll fade-up" style={{ transitionDelay: '300ms' }}>
          <div className="timeline-dot" />
          <div className="timeline-content">
            <span className="timeline-date">2018 - 2021</span>
            <h3 className="timeline-title">Pre-University Course (PUC)</h3>
            <p className="timeline-desc">Surana College &middot; Bangalore, India</p>
            <ul className="timeline-bullets">
              <li>Completed pre-university education with a concentration on computer science, mathematics, and science stream foundations.</li>
            </ul>
          </div>
        </div>

      </div>
    </section>
  );
}
