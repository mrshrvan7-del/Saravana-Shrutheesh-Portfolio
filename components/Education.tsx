'use client';

import FadeUp from './ui/FadeUp';

export default function Education() {
  return (
    <section
      id="education"
      style={{
        backgroundColor: 'var(--color-section-alt)',
      }}
    >
      <div className="section-container">
        <div style={{ textAlign: 'left', marginBottom: '3rem' }}>
          <span className="micro-text" style={{ marginBottom: '1rem' }}>
            ACADEMICS
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
            Education & Qualifications
          </h2>
        </div>

        <div style={{ position: 'relative', paddingLeft: '2.5rem' }}>
          {/* Vertical timeline line */}
          <div
            style={{
              position: 'absolute',
              left: '8px',
              top: '10px',
              bottom: '10px',
              width: '1px',
              backgroundColor: 'var(--color-border)',
            }}
          />

          {/* BCA Entry */}
          <FadeUp className="relative" style={{ marginBottom: '4rem', textAlign: 'left' }}>
            {/* Dot & Tick Node */}
            <div
              style={{
                position: 'absolute',
                left: '-2.5rem',
                top: '10px',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              {/* Bullet Node */}
              <div
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--color-accent)',
                }}
              />
              {/* Horizontal Tick */}
              <div
                style={{
                  width: '12px',
                  height: '1px',
                  backgroundColor: 'var(--color-border)',
                }}
              />
            </div>

            {/* Content Card */}
            <div>
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  gap: '0.75rem',
                  marginBottom: '0.5rem',
                }}
              >
                <span className="micro-text" style={{ color: 'var(--color-accent-text)' }}>
                  2021 - 2024
                </span>
                <span
                  style={{
                    backgroundColor: 'var(--color-tag-bg)',
                    color: 'var(--color-tag-text)',
                    borderRadius: '4px',
                    padding: '2px 8px',
                    fontSize: '0.75rem',
                    fontFamily: 'var(--font-sans)',
                    fontWeight: 500,
                  }}
                >
                  Surana College
                </span>
              </div>

              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(20px, 2.5vw, 26px)',
                  fontWeight: 400,
                  color: 'var(--color-text-primary)',
                  margin: '0 0 0.25rem 0',
                  lineHeight: 1.25,
                }}
              >
                Bachelor of Computer Applications (BCA)
              </h3>
              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.9rem',
                  color: 'var(--color-text-secondary)',
                  marginBottom: '1.25rem',
                }}
              >
                Bangalore, India
              </p>

              {/* Bullets */}
              <ul
                style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.6rem',
                }}
              >
                <li
                  style={{
                    position: 'relative',
                    paddingLeft: '1.5rem',
                    fontSize: '0.95rem',
                    lineHeight: 1.6,
                    color: 'var(--color-text-secondary)',
                  }}
                >
                  <span style={{ position: 'absolute', left: 0, color: 'var(--color-accent)', fontWeight: 700 }}>—</span>
                  Specialized in Computer Applications with a focus on Data Analysis, database management systems, and software development fundamentals.
                </li>
                <li
                  style={{
                    position: 'relative',
                    paddingLeft: '1.5rem',
                    fontSize: '0.95rem',
                    lineHeight: 1.6,
                    color: 'var(--color-text-secondary)',
                  }}
                >
                  <span style={{ position: 'absolute', left: 0, color: 'var(--color-accent)', fontWeight: 700 }}>—</span>
                  Successfully bridged theoretical computing modules with practical data dashboarding and analytics.
                </li>
              </ul>
            </div>
          </FadeUp>

          {/* PUC Entry */}
          <FadeUp className="relative" style={{ textAlign: 'left' }}>
            {/* Dot & Tick Node */}
            <div
              style={{
                position: 'absolute',
                left: '-2.5rem',
                top: '10px',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              {/* Bullet Node */}
              <div
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--color-border)',
                  border: '1.5px solid var(--color-accent)',
                }}
              />
              {/* Horizontal Tick */}
              <div
                style={{
                  width: '12px',
                  height: '1px',
                  backgroundColor: 'var(--color-border)',
                }}
              />
            </div>

            {/* Content Card */}
            <div>
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  gap: '0.75rem',
                  marginBottom: '0.5rem',
                }}
              >
                <span className="micro-text" style={{ color: 'var(--color-text-muted)' }}>
                  2018 - 2021
                </span>
                <span
                  style={{
                    backgroundColor: 'var(--color-tag-bg)',
                    color: 'var(--color-tag-text)',
                    borderRadius: '4px',
                    padding: '2px 8px',
                    fontSize: '0.75rem',
                    fontFamily: 'var(--font-sans)',
                    fontWeight: 500,
                  }}
                >
                  Surana College
                </span>
              </div>

              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(20px, 2.5vw, 26px)',
                  fontWeight: 400,
                  color: 'var(--color-text-primary)',
                  margin: '0 0 0.25rem 0',
                  lineHeight: 1.25,
                }}
              >
                Pre-University Course (PUC)
              </h3>
              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.9rem',
                  color: 'var(--color-text-secondary)',
                  marginBottom: '1.25rem',
                }}
              >
                Bangalore, India
              </p>

              {/* Bullets */}
              <ul
                style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.6rem',
                }}
              >
                <li
                  style={{
                    position: 'relative',
                    paddingLeft: '1.5rem',
                    fontSize: '0.95rem',
                    lineHeight: 1.6,
                    color: 'var(--color-text-secondary)',
                  }}
                >
                  <span style={{ position: 'absolute', left: 0, color: 'var(--color-accent)', fontWeight: 700 }}>—</span>
                  Completed pre-university education with a concentration on computer science, mathematics, and science stream foundations.
                </li>
              </ul>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
