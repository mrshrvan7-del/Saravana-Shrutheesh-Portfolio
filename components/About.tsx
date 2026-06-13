'use client';

import { TrendingUp, Settings, Sparkles, Users } from 'lucide-react';
import FadeUp from './ui/FadeUp';

const bringItems = [
  {
    title: 'Data-driven insights',
    desc: 'that drive measurable impact',
    icon: <TrendingUp size={20} style={{ color: 'var(--color-accent)' }} />,
  },
  {
    title: 'Process optimization',
    desc: 'with a scalable mindset',
    icon: <Settings size={20} style={{ color: 'var(--color-accent)' }} />,
  },
  {
    title: 'AI-augmented workflows',
    desc: 'for smarter operations',
    icon: <Sparkles size={20} style={{ color: 'var(--color-accent)' }} />,
  },
  {
    title: 'Cross-functional collaboration',
    desc: 'across global teams',
    icon: <Users size={20} style={{ color: 'var(--color-accent)' }} />,
  },
];

export default function About() {
  return (
    <section
      id="about"
      style={{
        backgroundColor: 'var(--color-section-alt)',
      }}
    >
      <div className="section-container">
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '3.5rem',
            alignItems: 'start',
          }}
          className="md:grid-cols-[1.1fr_0.9fr]"
        >
          {/* Left Column - Heading, Headline, & Paragraphs */}
          <FadeUp staggerChildren={0.08} className="flex flex-col text-left">
            <span className="micro-text" style={{ marginBottom: '1rem' }}>
              WHO I AM
            </span>

            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(28px, 4vw, 44px)',
                lineHeight: 1.15,
                color: 'var(--color-text-primary)',
                marginBottom: '2rem',
              }}
            >
              I turn complexity into clarity and data into{' '}
              <span style={{ fontStyle: 'italic', color: 'var(--color-accent)' }}>decisions.</span>
            </h2>

            <div
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '1rem',
                lineHeight: 1.7,
                color: 'var(--color-text-secondary)',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.25rem',
              }}
            >
              <p>
                I am a results-driven Business Analyst and Operations Strategist with over 1.8 years of experience driving operational excellence at global leaders like{' '}
                <span style={{ color: 'var(--color-accent-text)', fontWeight: 600 }}>Walmart Global Tech</span> and{' '}
                <span style={{ color: 'var(--color-accent-text)', fontWeight: 600 }}>Toyota Motors India</span>.
              </p>
              <p>
                Having a strong foundation in Computer Applications and Data Analysis, I thrive at the intersection of process optimization and business intelligence.
              </p>
              <p>
                By integrating AI-augmented workflows and advanced telemetry dashboards into daily operations, I help enterprises shift from reactive troubleshooting to proactive, scalable forecasting.
              </p>
              <p>
                My ambition is to bring this structured clarity and technical bridge to global teams, engineering operational intelligence that scales across borders, timezones, and complex organizational layers.
              </p>
            </div>
          </FadeUp>

          {/* Right Column - WHAT I BRING cards in 2x2 grid */}
          <FadeUp delay={0.15} className="flex flex-col text-left">
            <span className="micro-text" style={{ marginBottom: '1.5rem' }}>
              WHAT I BRING
            </span>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                gap: '1rem',
              }}
            >
              {bringItems.map((item, index) => (
                <div
                  key={index}
                  style={{
                    backgroundColor: 'var(--color-surface)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '10px',
                    padding: '1.25rem',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    gap: '0.75rem',
                    boxShadow: 'var(--shadow-card)',
                    transition: 'box-shadow 0.2s ease, transform 0.2s ease',
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
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <h4
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontWeight: 500,
                        fontSize: '0.95rem',
                        color: 'var(--color-text-primary)',
                        margin: 0,
                      }}
                    >
                      {item.title}
                    </h4>
                    <p
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '0.8rem',
                        color: 'var(--color-text-secondary)',
                        marginTop: '0.25rem',
                        margin: 0,
                        lineHeight: 1.4,
                      }}
                    >
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
