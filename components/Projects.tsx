'use client';

import FadeUp from './ui/FadeUp';

const projects = [
  {
    num: '01',
    label: 'SaaS Platform Architecture',
    title: 'Colide',
    description: 'An enterprise-grade multi-branch retail operations and business intelligence platform. Centralizes real-time sales intelligence, inventory management, cash flow tracking, billing operations, and AI-driven business insights across distributed store/warehouse locations.',
    techs: ['Next.js 15', 'Node.js/FastAPI', 'PostgreSQL', 'Redis', 'WebSockets', 'TailwindCSS'],
    repo: 'https://github.com/mrshrvan7-del/COLIDE-',
  },
  {
    num: '02',
    label: 'AI Voice Analytics',
    title: 'Ai-Call-Auditor',
    description: 'An AI-powered call auditing system designed to automatically analyze and evaluate sales and customer support call recordings. Leverages Natural Language Processing (NLP) to extract customer sentiment, compliance flags, and key performance metrics.',
    techs: ['Python', 'NLP', 'OpenAI API'],
    repo: 'https://github.com/mrshrvan7-del/Ai-Call-Auditor',
  },
  {
    num: '03',
    label: 'Computer Vision',
    title: 'Sign-Language-Recognition',
    description: 'Real-time Sign Language Recognition system using Computer Vision and Deep Learning. Translates hand gestures into text and speech to bridge communication barriers, optimized for high-performance mobile deployment.',
    techs: ['Flutter', 'Dart', 'TensorFlow Lite'],
    repo: 'https://github.com/mrshrvan7-del/Sign-language-recognition-',
  },
  {
    num: '04',
    label: 'Gig Marketplace Systems',
    title: 'Serve-In Customer App',
    description: 'A real-time hyperlocal service marketplace mobile application connecting customers with nearby service providers. Integrates live tracking and interactive interfaces for seamless scheduling and booking.',
    techs: ['Flutter', 'Dart', 'Google Maps API'],
    repo: 'https://github.com/mrshrvan7-del/serve-in-customer-app',
  },
  {
    num: '05',
    label: 'AI Interview Systems',
    title: 'ARIA',
    description: 'An AI-powered mock interview platform designed to simulate realistic coding and behavioral interview environments. Leverages generative models to ask dynamic follow-up questions, evaluate response quality, and output structured scorecards with detailed feedback.',
    techs: ['Next.js', 'React', 'Web Speech API', 'OpenAI API', 'WebSockets'],
    repo: 'https://github.com/mrshrvan7-del/ARIA',
  },
];

export default function Projects() {
  return (
    <section
      id="work"
      style={{
        backgroundColor: 'var(--color-bg)',
      }}
    >
      <div className="section-container">
        <div style={{ textAlign: 'left', marginBottom: '3.5rem' }}>
          <span className="micro-text" style={{ marginBottom: '1rem' }}>
            MY WORK
          </span>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(28px, 4vw, 44px)',
              lineHeight: 1.15,
              color: 'var(--color-text-primary)',
              margin: 0,
            }}
          >
            Featured Projects & Systems
          </h2>
        </div>

        {/* CSS Grid with 2 columns, collapses to 1 column on mobile */}
        <FadeUp
          staggerChildren={0.08}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {projects.map((proj, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                borderRadius: '14px',
                padding: '2rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '1.5rem',
                boxShadow: 'var(--shadow-card)',
                transition: 'all 0.25s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = 'var(--shadow-hover)';
                e.currentTarget.style.transform = 'translateY(-3px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = 'var(--shadow-card)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div>
                {/* Top Row */}
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '1rem',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-mono), monospace',
                      fontSize: '0.85rem',
                      color: 'var(--color-text-muted)',
                      fontWeight: 500,
                    }}
                  >
                    {proj.num}
                  </span>
                  <span
                    style={{
                      backgroundColor: 'var(--color-tag-bg)',
                      color: 'var(--color-tag-text)',
                      borderRadius: '4px',
                      padding: '2px 8px',
                      fontSize: '0.7rem',
                      fontFamily: 'var(--font-sans)',
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: '0.03em',
                    }}
                  >
                    {proj.label}
                  </span>
                </div>

                {/* Title */}
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.5rem',
                    color: 'var(--color-text-primary)',
                    fontWeight: 400,
                    marginBottom: '0.75rem',
                  }}
                >
                  {proj.title}
                </h3>

                {/* Description */}
                <p
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.9rem',
                    lineHeight: 1.6,
                    color: 'var(--color-text-secondary)',
                    margin: 0,
                  }}
                >
                  {proj.description}
                </p>
              </div>

              <div>
                {/* Tech tags */}
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '0.5rem',
                    marginBottom: '1.25rem',
                  }}
                >
                  {proj.techs.map((tech, techIdx) => (
                    <span
                      key={techIdx}
                      style={{
                        backgroundColor: 'var(--color-tag-bg)',
                        color: 'var(--color-tag-text)',
                        fontSize: '0.72rem',
                        borderRadius: '4px',
                        padding: '2px 8px',
                        fontFamily: 'var(--font-sans)',
                        fontWeight: 500,
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Bottom Row Link */}
                <a
                  href={proj.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    color: 'var(--color-accent)',
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    transition: 'opacity 0.2s ease',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.8'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.opacity = '1'; }}
                >
                  View Repository &rarr;
                </a>
              </div>
            </div>
          ))}
        </FadeUp>
      </div>
    </section>
  );
}
