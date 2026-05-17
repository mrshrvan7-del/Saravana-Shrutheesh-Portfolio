'use client';
import { useEffect, useRef } from 'react';

const skillGroups = [
  {
    title: 'Analytics',
    skills: ['SQL', 'BigQuery', 'Power BI', 'Looker', 'Excel'],
  },
  {
    title: 'Operations',
    skills: ['SLA Mgmt', 'RCA', 'Jira', 'ServiceNow', 'UAT'],
  },
  {
    title: 'AI & Automation',
    skills: ['Claude', 'ChatGPT', 'n8n', 'Gemini'],
  },
];

export default function Skills() {
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
    <section id="skills" className="section-container section-padding" ref={sectionRef}>
      <h2 className="section-heading animate-on-scroll fade-up">skills.</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {skillGroups.map((group, groupIndex) => (
          <div 
            key={group.title} 
            className="animate-on-scroll fade-up"
            style={{ transitionDelay: `${150 + (groupIndex * 150)}ms` }}
          >
            <h3 className="mono text-[14px] text-[var(--bg-accent)] mb-6 uppercase tracking-wider font-semibold">
              {group.title}
            </h3>
            <div className="flex flex-wrap gap-3">
              {group.skills.map((skill) => (
                <span 
                  key={skill}
                  className="px-4 py-2 rounded-full border border-[var(--border-color)] text-[13px] text-[var(--text-body)]"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
