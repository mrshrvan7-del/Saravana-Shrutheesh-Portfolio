'use client';

import FadeUp from './ui/FadeUp';

const certifications = [
  {
    year: '2025',
    title: 'Google Prompting Essentials',
    issuer: 'Google',
  },
  {
    year: '2025',
    title: 'Use AI as a Creative or Expert Partner',
    issuer: 'Google',
  },
  {
    year: '2024',
    title: 'Google Advanced Data Analytics',
    issuer: 'Google',
  },
  {
    year: '2024',
    title: 'Microsoft Power BI Data Analyst',
    issuer: 'Microsoft',
  },
  {
    year: '2023',
    title: 'Google Data Analytics Professional',
    issuer: 'Google',
  },
];

const leadership = [
  {
    meta: '2024–25',
    title: 'Director, Rotaract Club',
    desc: 'Led community initiatives and organized large-scale events, demonstrating strong project management.',
  },
  {
    meta: 'Award',
    title: 'Runner-up, College Hackathon',
    desc: 'Recognized for developing an innovative and highly effective Business Intelligence dashboard under tight deadlines.',
  },
];

export default function Certs() {
  return (
    <section
      id="certifications"
      style={{
        backgroundColor: 'var(--color-bg)',
      }}
    >
      <div className="section-container">
        <div style={{ textAlign: 'left', marginBottom: '3rem' }}>
          <span className="micro-text" style={{ marginBottom: '1rem' }}>
            CREDENTIALS
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
            Certifications & Leadership
          </h2>
        </div>

        {/* Certifications Section */}
        <div style={{ marginBottom: '4rem', textAlign: 'left' }}>
          <h3
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.4rem',
              color: 'var(--color-text-primary)',
              fontWeight: 400,
              marginBottom: '1.5rem',
            }}
          >
            Certifications
          </h3>

          {/* Infinite Marquee */}
          <div className="marquee-container">
            <div className="marquee-content">
              {/* Group 1 */}
              <div className="marquee-group">
                {certifications.map((cert, index) => (
                  <div
                    key={`cert-g1-${index}`}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.5rem',
                      padding: '1rem 1.5rem',
                      backgroundColor: 'var(--color-surface)',
                      border: '1px solid var(--color-border)',
                      borderTop: '3px solid var(--color-accent)',
                      borderRadius: '10px',
                      boxShadow: 'var(--shadow-card)',
                      minWidth: '220px',
                      maxWidth: '320px',
                      transition: 'all 0.25s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow = 'var(--shadow-hover)';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = 'var(--shadow-card)';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        color: 'var(--color-text-muted)',
                      }}
                    >
                      {cert.year} &middot; {cert.issuer}
                    </span>
                    <span
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '0.9rem',
                        fontWeight: 500,
                        color: 'var(--color-text-primary)',
                        lineHeight: 1.4,
                      }}
                    >
                      {cert.title}
                    </span>
                  </div>
                ))}
              </div>
              
              {/* Group 2 (Duplicate for seamless loop) */}
              <div className="marquee-group" aria-hidden="true">
                {certifications.map((cert, index) => (
                  <div
                    key={`cert-g2-${index}`}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.5rem',
                      padding: '1rem 1.5rem',
                      backgroundColor: 'var(--color-surface)',
                      border: '1px solid var(--color-border)',
                      borderTop: '3px solid var(--color-accent)',
                      borderRadius: '10px',
                      boxShadow: 'var(--shadow-card)',
                      minWidth: '220px',
                      maxWidth: '320px',
                      transition: 'all 0.25s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow = 'var(--shadow-hover)';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = 'var(--shadow-card)';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        color: 'var(--color-text-muted)',
                      }}
                    >
                      {cert.year} &middot; {cert.issuer}
                    </span>
                    <span
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '0.9rem',
                        fontWeight: 500,
                        color: 'var(--color-text-primary)',
                        lineHeight: 1.4,
                      }}
                    >
                      {cert.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Leadership Section */}
        <div style={{ textAlign: 'left' }}>
          <h3
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.4rem',
              color: 'var(--color-text-primary)',
              fontWeight: 400,
              marginBottom: '1.5rem',
            }}
          >
            Leadership & Hackathons
          </h3>

          {/* 2 static cards side-by-side (collapses on mobile) */}
          <FadeUp
            staggerChildren={0.08}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {leadership.map((lead, index) => (
              <div
                key={index}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.75rem',
                  padding: '1.25rem 1.5rem',
                  backgroundColor: 'var(--color-surface)',
                  border: '1px solid var(--color-border)',
                  borderTop: '3px solid var(--color-accent)',
                  borderRadius: '10px',
                  boxShadow: 'var(--shadow-card)',
                  transition: 'all 0.25s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = 'var(--shadow-hover)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = 'var(--shadow-card)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      color: 'var(--color-text-muted)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                    }}
                  >
                    {lead.meta}
                  </span>
                </div>
                <h4
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '1.05rem',
                    fontWeight: 600,
                    color: 'var(--color-text-primary)',
                    margin: 0,
                  }}
                >
                  {lead.title}
                </h4>
                <p
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.9rem',
                    lineHeight: 1.6,
                    color: 'var(--color-text-secondary)',
                    margin: 0,
                  }}
                >
                  {lead.desc}
                </p>
              </div>
            ))}
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
