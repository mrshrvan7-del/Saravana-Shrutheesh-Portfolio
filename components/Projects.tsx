'use client';
import { useEffect, useRef } from 'react';

const projects = [
  {
    title: 'SLA Intelligence Dashboard',
    date: 'Jan 2024',
    stack: 'BigQuery · SQL · Power BI',
    impact: '98.4% SLA compliance — real-time monitoring',
  },
  {
    title: 'AI-Assisted RCA Workflow',
    date: 'Aug 2023',
    stack: 'Python · Claude API · Confluence',
    impact: '40% faster root cause identification',
  },
  {
    title: 'Process Optimization Engine',
    date: 'Mar 2024',
    stack: 'n8n · Looker Studio · Jira',
    impact: '35% reduction in manual reporting hours',
  },
  {
    title: 'Stakeholder Reporting Portal',
    date: 'Nov 2023',
    stack: 'Google Sheets · Advanced Excel · Power BI',
    impact: 'Executive-ready weekly ops reports',
  },
];

export default function Projects() {
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
    <section id="work" className="section-container section-padding" ref={sectionRef}>
      <h2 className="section-heading animate-on-scroll fade-up">work.</h2>
      
      <div className="max-w-3xl mb-16 animate-on-scroll fade-up" style={{ transitionDelay: '150ms' }}>
        <p className="text-[15px] leading-relaxed">
          I build systems that transform raw data into operational clarity. Here are select projects where analytics and automation drove measurable business impact.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-12">
        {projects.map((project, index) => (
          <div 
            key={project.title}
            className="group cursor-pointer animate-on-scroll fade-up"
            style={{ transitionDelay: `${300 + (index * 100)}ms` }}
          >
            <div className="h-[240px] bg-[var(--bg-card)] mb-6 rounded-sm overflow-hidden relative transition-transform duration-300 group-hover:-translate-y-1">
              {/* Abstract Data Viz Pattern */}
              <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-300" style={{
                backgroundImage: 'radial-gradient(var(--text-primary) 1.5px, transparent 1.5px)',
                backgroundSize: '24px 24px'
              }} />
              <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-[var(--bg-card)] to-transparent" />
            </div>

            <div>
              <div className="mono text-[11px] text-[var(--text-muted)] mb-2 uppercase tracking-wide">
                {project.date}
              </div>
              <h3 className="text-[15px] font-semibold text-[var(--text-primary)] mb-2 group-hover:underline underline-offset-4 decoration-1" style={{ fontFamily: 'var(--font-dm-sans)' }}>
                {project.title}
              </h3>
              <p className="text-[13px] text-[var(--text-body)] leading-relaxed mb-1">
                <span className="font-medium text-[var(--text-primary)]">Stack:</span> {project.stack}
              </p>
              <p className="text-[13px] text-[var(--text-body)] leading-relaxed">
                <span className="font-medium text-[var(--text-primary)]">Impact:</span> {project.impact}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
