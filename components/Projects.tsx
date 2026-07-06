'use client';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

// Project type definition
interface Project {
  meta: string;
  title: string;
  image: string;
  description: string;
  role: string;
  impact: string;
  coreTech: string;
  repo: string;
  id?: string;
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isPaused, setIsPaused] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Load projects dynamically from local JSON and localStorage
    try {
      const staticProjects = require('@/src/data/projects.json') as Project[];
      const localProjectsRaw = localStorage.getItem('portfolio-projects');
      const localProjects = localProjectsRaw ? JSON.parse(localProjectsRaw) as Project[] : [];
      // Combine: custom local projects first (newest first), then static projects
      setProjects([...localProjects, ...staticProjects]);
    } catch (e) {
      console.error('Failed to load projects', e);
    }
  }, []);

  useEffect(() => {
    const mql = window.matchMedia('(max-width: 768px)');
    setIsMobile(mql.matches);

    const onChange = (e: MediaQueryListEvent) => {
      setIsMobile(e.matches);
    };
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = sectionRef.current?.querySelectorAll('.animate-on-scroll');
    elements?.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, [isMobile]);

  return (
    <section id="work" className="section-container section-padding" ref={sectionRef}>
      <h2 className="section-heading animate-on-scroll fade-up">projects.</h2>

      {isMobile ? (
        <div className="mobile-projects-stack">
          {projects.map((proj, idx) => {
            const parts = proj.meta.split(' / ');
            const numeral = parts[0] || `0${idx + 1}`;
            const category = parts[1] || '';
            const techList = proj.coreTech.split(' · ');

            return (
              <div key={`${proj.title}-${idx}`} className="mobile-project-card">
                <div className="mobile-project-image-wrapper">
                  <Image
                    src={proj.image}
                    alt={`${proj.title} project screenshot`}
                    fill
                    sizes="(max-width: 768px) 100vw, 350px"
                    className="mobile-project-image"
                    priority={idx === 0}
                  />
                  <div className="mobile-project-numeral">{numeral}</div>
                </div>

                <div className="mobile-project-eyebrow">{category}</div>
                <h3 className="mobile-project-title">{proj.title}</h3>
                <p className="mobile-project-desc">{proj.description}</p>

                <div className="mobile-project-specs">
                  <div className="mobile-spec-row">
                    <span className="mobile-spec-label">Role</span>
                    <span className="mobile-spec-value">{proj.role}</span>
                  </div>
                  <div className="mobile-spec-row" style={{ marginTop: '0.5rem' }}>
                    <span className="mobile-spec-label">Tech Stack</span>
                    <div className="mobile-tech-chips">
                      {techList.map((tech, techIdx) => (
                        <span key={techIdx} className="mobile-tech-chip">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mobile-project-link-row">
                  <a
                    href={proj.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mobile-project-btn"
                  >
                    <span>View Repository</span>
                    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: '6px' }}>
                      <line x1="7" y1="17" x2="17" y2="7"></line>
                      <polyline points="7 7 17 7 17 17"></polyline>
                    </svg>
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="marquee-container animate-on-scroll fade-up">
          <div 
            className={`marquee-content ${isPaused ? 'paused' : ''}`}
            onClick={() => setIsPaused(!isPaused)}
          >
            {[...Array(2)].map((_, groupIdx) => (
              <div key={`marquee-group-${groupIdx}`} className="marquee-group">
                {projects.map((proj, idx) => (
                  <div key={`${proj.title}-${idx}`} className="marquee-card">
                    <div className="project-media-col">
                      <a
                        href={proj.repo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-image-link"
                        style={{ display: 'block' }}
                      >
                        <div className="project-image-wrapper">
                          <div
                            className="project-image"
                            style={{ backgroundImage: `url('${proj.image}')` }}
                          />
                          <div className="project-image-overlay" />
                        </div>
                      </a>
                    </div>
                    <div className="project-content-col">
                      <div className="project-meta mono-label">{proj.meta}</div>
                      <h3 className="project-title-editorial">
                        <a
                          href={proj.repo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="project-title-link"
                          style={{ textDecoration: 'none', color: 'inherit' }}
                        >
                          {proj.title}
                        </a>
                      </h3>
                      <p className="project-desc-editorial" style={{ flexGrow: 1, minHeight: '80px' }}>{proj.description}</p>
                      
                      <div className="project-compact-specs">
                        <div className="compact-spec-item">
                          <span className="spec-label-compact">Role:</span>
                          <span className="spec-value-compact">{proj.role}</span>
                        </div>
                        <div className="compact-spec-item">
                          <span className="spec-label-compact">Tech:</span>
                          <span className="spec-value-compact">{proj.coreTech}</span>
                        </div>
                      </div>
                      
                      <a
                        href={proj.repo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-github-btn"
                        style={{ marginTop: 'auto' }}
                      >
                        <span>View Repository</span>
                        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: '6px' }}>
                          <line x1="7" y1="17" x2="17" y2="7"></line>
                          <polyline points="7 7 17 7 17 17"></polyline>
                        </svg>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
