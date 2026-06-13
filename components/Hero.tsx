'use client';

import Image from 'next/image';
import FadeUp from './ui/FadeUp';

export default function Hero() {
  return (
    <section
      id="home"
      style={{
        background: 'var(--color-hero-gradient)',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: '8rem',
        paddingBottom: '6rem',
      }}
    >
      <div className="section-container">
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '3rem',
            alignItems: 'center',
          }}
          className="md:grid-cols-[1.2fr_0.8fr]"
        >
          {/* Left Column Content */}
          <FadeUp staggerChildren={0.08} className="flex flex-col items-start text-left">
            {/* Micro-label */}
            <span className="micro-text" style={{ marginBottom: '1.25rem' }}>
              Business Analyst & Operations Strategist
            </span>

            {/* Main H1 Headline */}
            <h1
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(44px, 5.5vw, 72px)',
                lineHeight: 1.1,
                color: 'var(--color-text-primary)',
                fontWeight: 400,
                marginBottom: '1.5rem',
              }}
            >
              <span style={{ fontStyle: 'italic', display: 'block' }}>Results-Driven</span>
              <span style={{ display: 'block' }}>Operations Analyst.</span>
            </h1>

            {/* Subtitle / Core Narrative */}
            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '1.05rem',
                lineHeight: 1.7,
                color: 'var(--color-text-secondary)',
                maxWidth: '520px',
                marginBottom: '2.5rem',
              }}
            >
              I specialize in root cause analysis, process optimization, and data-driven intelligence—bridging technical insights with business strategies to build resilient, scalable business systems.
            </p>

            {/* Call-to-Actions */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '1rem',
                width: '100%',
              }}
            >
              <a
                href="#work"
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.9rem',
                  fontWeight: 500,
                  backgroundColor: 'var(--color-text-primary)',
                  color: '#FFFFFF',
                  padding: '0.65rem 1.4rem',
                  borderRadius: '6px',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  transition: 'opacity 0.2s ease',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.9'; }}
                onMouseLeave={(e) => { e.currentTarget.style.opacity = '1'; }}
              >
                See my work
              </a>
              <a
                href="#contact"
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.9rem',
                  fontWeight: 500,
                  border: '1.5px solid var(--color-border)',
                  backgroundColor: 'transparent',
                  color: 'var(--color-text-primary)',
                  padding: '0.65rem 1.4rem',
                  borderRadius: '6px',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  transition: 'border-color 0.2s ease, background-color 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--color-text-primary)';
                  e.currentTarget.style.backgroundColor = 'var(--color-bg-subtle)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--color-border)';
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                Contact Me
              </a>
            </div>
          </FadeUp>

          {/* Right Column Profile Image */}
          <FadeUp delay={0.2} className="flex justify-center">
            <div
              style={{
                borderRadius: '16px',
                overflow: 'hidden',
                aspectRatio: '4/5',
                boxShadow: 'var(--shadow-card)',
                width: '100%',
                maxWidth: '360px',
                position: 'relative',
              }}
            >
              <Image
                src="/profile.png"
                alt="Saravana Shrutheesh"
                fill
                sizes="(max-width: 768px) 100vw, 360px"
                style={{
                  objectFit: 'cover',
                  objectPosition: 'center',
                }}
                priority
              />
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
