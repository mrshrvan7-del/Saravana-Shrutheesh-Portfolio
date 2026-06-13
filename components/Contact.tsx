'use client';

import React, { useState } from 'react';
import { Download, ArrowRight } from 'lucide-react';
import FadeUp from './ui/FadeUp';

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const myEmail = 'Saravanashrutheesh@gmail.com';

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText(myEmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <section
        id="contact"
        style={{
          backgroundColor: 'var(--color-bg-subtle)',
          borderTop: '1px solid var(--color-border)',
          width: '100%',
          paddingTop: '120px',
          paddingBottom: '120px',
        }}
      >
        <div className="section-container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr',
              gap: '4rem',
              alignItems: 'start',
            }}
            className="md:grid-cols-2"
          >
            {/* Left Column */}
            <FadeUp staggerChildren={0.08} className="flex flex-col items-start text-left">
              <span className="micro-text" style={{ marginBottom: '1.25rem' }}>
                GET IN TOUCH
              </span>
              
              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(32px, 5vw, 48px)',
                  lineHeight: 1.15,
                  color: 'var(--color-text-primary)',
                  fontWeight: 400,
                  marginBottom: '1.5rem',
                }}
              >
                Let&apos;s build something together.
              </h2>
              
              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '1rem',
                  color: 'var(--color-text-secondary)',
                  marginBottom: '2.5rem',
                  maxWidth: '440px',
                }}
              >
                I hope I have made my impact. Let&apos;s connect and get my interview scheduled.
              </p>

              {/* Relocation Status Badge */}
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  backgroundColor: '#E6FBF0',
                  color: '#1A6B41',
                  borderRadius: '6px',
                  padding: '6px 12px',
                  fontSize: '0.8rem',
                  fontFamily: 'var(--font-sans)',
                  fontWeight: 600,
                }}
              >
                <span className="pulse-dot" />
                Open for Relocation
              </div>
            </FadeUp>

            {/* Right Column - Clean Link List & Resume Button */}
            <FadeUp delay={0.15} className="flex flex-col">
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  width: '100%',
                  marginBottom: '2.5rem',
                }}
              >
                {/* Email Row */}
                <div
                  onClick={handleCopyEmail}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderBottom: '1px solid var(--color-border-subtle)',
                    padding: '1.25rem 0',
                    cursor: 'pointer',
                    transition: 'opacity 0.2s ease',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.7'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.opacity = '1'; }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.9rem',
                      color: 'var(--color-text-muted)',
                      fontWeight: 500,
                    }}
                  >
                    Email
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '0.9rem',
                        color: 'var(--color-text-primary)',
                        fontWeight: 500,
                      }}
                    >
                      {copied ? 'Copied address!' : myEmail}
                    </span>
                    <ArrowRight size={16} style={{ color: 'var(--color-text-muted)' }} />
                  </div>
                </div>

                {/* LinkedIn Row */}
                <a
                  href="https://www.linkedin.com/in/saravana-shrutheesh-m-001402344"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderBottom: '1px solid var(--color-border-subtle)',
                    padding: '1.25rem 0',
                    textDecoration: 'none',
                    transition: 'opacity 0.2s ease',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.7'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.opacity = '1'; }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.9rem',
                      color: 'var(--color-text-muted)',
                      fontWeight: 500,
                    }}
                  >
                    LinkedIn
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '0.9rem',
                        color: 'var(--color-text-primary)',
                        fontWeight: 500,
                      }}
                    >
                      Saravana Shrutheesh M
                    </span>
                    <ArrowRight size={16} style={{ color: 'var(--color-text-muted)' }} />
                  </div>
                </a>

                {/* GitHub Row */}
                <a
                  href="https://github.com/mrshrvan7-del"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderBottom: '1px solid var(--color-border-subtle)',
                    padding: '1.25rem 0',
                    textDecoration: 'none',
                    transition: 'opacity 0.2s ease',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.7'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.opacity = '1'; }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.9rem',
                      color: 'var(--color-text-muted)',
                      fontWeight: 500,
                    }}
                  >
                    GitHub
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '0.9rem',
                        color: 'var(--color-text-primary)',
                        fontWeight: 500,
                      }}
                    >
                      mrshrvan7-del
                    </span>
                    <ArrowRight size={16} style={{ color: 'var(--color-text-muted)' }} />
                  </div>
                </a>
              </div>

              {/* Download Resume Button */}
              <a
                href="/Saravana_Shrutheesh_CV.pdf"
                download="Saravana_Shrutheesh_CV.pdf"
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
                  justifyContent: 'center',
                  gap: '0.5rem',
                  width: 'fit-content',
                  transition: 'opacity 0.2s ease',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.9'; }}
                onMouseLeave={(e) => { e.currentTarget.style.opacity = '1'; }}
              >
                <Download size={16} />
                Download Resume
              </a>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        style={{
          backgroundColor: 'var(--color-surface)',
          paddingTop: '2.5rem',
          paddingBottom: '2.5rem',
          borderTop: '1px solid var(--color-border)',
        }}
      >
        <div className="section-container flex flex-col md:flex-row justify-between items-center gap-4">
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.8rem',
              color: 'var(--color-text-muted)',
              margin: 0,
              textAlign: 'center',
            }}
          >
            &copy; 2026 Saravana Shrutheesh &middot; Bengaluru, India &middot; Built with intent.
          </p>
          
          {/* Easter egg Tooltip */}
          <div
            style={{
              position: 'relative',
              display: 'inline-block',
              cursor: 'help',
            }}
            className="group"
          >
            <span
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.8rem',
                color: 'var(--color-text-muted)',
                textDecoration: 'underline',
                textDecorationStyle: 'dotted',
              }}
            >
              saravana.me
            </span>
            {/* Tooltip Popup */}
            <div
              className="invisible group-hover:visible absolute bottom-full right-0 mb-2 p-2 bg-slate-800 text-white text-[10px] rounded shadow-lg whitespace-nowrap z-50 font-mono transition-opacity duration-200"
              style={{
                backgroundColor: 'var(--color-text-primary)',
                color: 'var(--color-bg)',
                border: '1px solid var(--color-border)',
              }}
            >
              &ldquo;PRO + portfolio = Protfolio&rdquo;
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
