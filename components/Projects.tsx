'use client';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

// Project data reflecting the repositories in the GitHub profile
const projects = [
  {
    meta: '01 / SAAS PLATFORM ARCHITECTURE',
    title: 'Colide',
    image: '/colide.png',
    description: 'An enterprise-grade multi-branch retail operations and business intelligence platform. Centralizes real-time sales intelligence, inventory management, cash flow tracking, billing operations, and AI-driven business insights across distributed store/warehouse locations.',
    role: 'Platform architect, backend database design, and real-time offline-first sync engine designer.',
    impact: 'Designed a resilient multi-tenant architecture for retail operations. Supports real-time monitoring and offline branch resiliency.',
    coreTech: 'Next.js 15 · Node.js/FastAPI · PostgreSQL · Redis · WebSockets · TailwindCSS',
    repo: 'https://github.com/mrshrvan7-del/COLIDE-',
  },
  {
    meta: '02 / AI VOICE ANALYTICS',
    title: 'Ai-Call-Auditor',
    image: '/ai_call_auditor.png',
    description: 'An AI-powered call auditing system designed to automatically analyze and evaluate sales and customer support call recordings. Leverages Natural Language Processing (NLP) to extract customer sentiment, compliance flags, and key performance metrics.',
    role: 'Concept design, business operations workflow mapping, and prototype development.',
    impact: 'Proposed automation concepts to reduce support auditing SLA times by 80%. Prototype code is fully available.',
    coreTech: 'Python · NLP · OpenAI API',
    repo: 'https://github.com/mrshrvan7-del/Ai-Call-Auditor',
  },
  {
    meta: '03 / COMPUTER VISION',
    title: 'Sign-language-recognition-',
    image: '/sign_language_recognition.png',
    description: 'Real-time Sign Language Recognition system using Computer Vision and Deep Learning. Translates hand gestures into text and speech to bridge communication barriers, optimized for high-performance mobile deployment.',
    role: 'Concept design, mobile accessibility design, and deep learning model integration.',
    impact: 'Proposed ideas for inclusive workplace communications. Full prototype code is available.',
    coreTech: 'Flutter · Dart · TensorFlow Lite',
    repo: 'https://github.com/mrshrvan7-del/Sign-language-recognition-',
  },
  {
    meta: '04 / GIG MARKETPLACE SYSTEMS',
    title: 'serve-in-customer-app',
    image: '/hyperlocal_marketplace.png',
    description: 'A real-time hyperlocal service marketplace mobile application connecting customers with nearby service providers. Integrates live tracking and interactive interfaces for seamless scheduling and booking.',
    role: 'Frontend mobile app development, state management, and API integration.',
    impact: 'Proposed user workflows for gig workers, optimizing order dispatching. Prototype code is fully available.',
    coreTech: 'Flutter · Dart · Google Maps API',
    repo: 'https://github.com/mrshrvan7-del/serve-in-customer-app',
  },
  {
    meta: '05 / WEB ENGINEERING',
    title: 'Saravana-Shrutheesh-Portfolio',
    image: '/portfolio_theme.png',
    description: 'A high-end personal portfolio website built with Next.js and custom CSS. Features an editorial warm-cream UI, custom animations, responsive bento grids, and interactive showcases for global recruiters.',
    role: 'Full-stack web engineering, CSS architecture, and animation orchestration.',
    impact: 'Built a professional digital presence to optimize recruiter vetting and stakeholder engagement. Code fully available.',
    coreTech: 'Next.js · React · TypeScript · Vanilla CSS',
    repo: 'https://github.com/mrshrvan7-del/Saravana-Shrutheesh-Portfolio',
  },
];

export default function Projects() {
  const [isPaused, setIsPaused] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

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
