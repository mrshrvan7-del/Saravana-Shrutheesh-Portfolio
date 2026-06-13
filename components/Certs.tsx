'use client';

import { useEffect, useRef, useState } from 'react';

export default function Certs() {
  const [isPausedCerts, setIsPausedCerts] = useState(false);
  const [isPausedLeader, setIsPausedLeader] = useState(false);
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
    <section id="certifications" className="section-container section-padding" ref={sectionRef}>
      <h2 className="section-heading animate-on-scroll fade-up">credentials.</h2>
      
      
      <div>
        <h3 className="section-heading credentials-column-title" style={{ paddingLeft: '1rem' }}>certifications.</h3>
        
          <div className="marquee-container animate-on-scroll fade-up" style={{ marginTop: '1.5rem', marginBottom: '3rem' }}>
            <div 
              className={`marquee-content ${isPausedCerts ? 'paused' : ''}`}
              onClick={() => setIsPausedCerts(!isPausedCerts)}
              style={{ animationDuration: '30s' }}
            >
              <div className="marquee-group">
                <div className="credential-marquee-card">
              <div className="cred-meta">2025</div>
              <div className="cred-content">
                <div className="cred-title">Google Prompting Essentials</div>
                <div className="cred-issuer">Google</div>
              </div>
            </div>
            <div className="credential-marquee-card">
              <div className="cred-meta">2025</div>
              <div className="cred-content">
                <div className="cred-title">Use AI as a Creative or Expert Partner</div>
                <div className="cred-issuer">Google</div>
              </div>
            </div>
            <div className="credential-marquee-card">
              <div className="cred-meta">2024</div>
              <div className="cred-content">
                <div className="cred-title">Google Advanced Data Analytics</div>
                <div className="cred-issuer">Google</div>
              </div>
            </div>
            <div className="credential-marquee-card">
              <div className="cred-meta">2024</div>
              <div className="cred-content">
                <div className="cred-title">Microsoft Power BI Data Analyst</div>
                <div className="cred-issuer">Microsoft</div>
              </div>
            </div>
            <div className="credential-marquee-card">
              <div className="cred-meta">2023</div>
              <div className="cred-content">
                <div className="cred-title">Google Data Analytics Professional</div>
                <div className="cred-issuer">Google</div>
              </div>
            </div>
              </div>
              <div className="marquee-group" aria-hidden="true">
                <div className="credential-marquee-card">
              <div className="cred-meta">2025</div>
              <div className="cred-content">
                <div className="cred-title">Google Prompting Essentials</div>
                <div className="cred-issuer">Google</div>
              </div>
            </div>
            <div className="credential-marquee-card">
              <div className="cred-meta">2025</div>
              <div className="cred-content">
                <div className="cred-title">Use AI as a Creative or Expert Partner</div>
                <div className="cred-issuer">Google</div>
              </div>
            </div>
            <div className="credential-marquee-card">
              <div className="cred-meta">2024</div>
              <div className="cred-content">
                <div className="cred-title">Google Advanced Data Analytics</div>
                <div className="cred-issuer">Google</div>
              </div>
            </div>
            <div className="credential-marquee-card">
              <div className="cred-meta">2024</div>
              <div className="cred-content">
                <div className="cred-title">Microsoft Power BI Data Analyst</div>
                <div className="cred-issuer">Microsoft</div>
              </div>
            </div>
            <div className="credential-marquee-card">
              <div className="cred-meta">2023</div>
              <div className="cred-content">
                <div className="cred-title">Google Data Analytics Professional</div>
                <div className="cred-issuer">Google</div>
              </div>
            </div>
              </div>
            </div>
          </div>

        
        <h3 className="section-heading credentials-column-title" style={{ paddingLeft: '1rem', marginTop: '2rem' }}>leadership.</h3>
        
          <div className="marquee-container animate-on-scroll fade-up" style={{ marginTop: '1.5rem', marginBottom: '3rem' }}>
            <div 
              className={`marquee-content ${isPausedLeader ? 'paused' : ''}`}
              onClick={() => setIsPausedLeader(!isPausedLeader)}
              style={{ animationDuration: '30s' }}
            >
              <div className="marquee-group">
                <div className="credential-marquee-card">
              <div className="cred-meta">2024–25</div>
              <div className="cred-content">
                <div className="cred-title">Director, Rotaract Club</div>
                <div className="cred-description">
                  Led community initiatives and organized large-scale events, demonstrating strong project management.
                </div>
              </div>
            </div>
            <div className="credential-marquee-card">
              <div className="cred-meta">Award</div>
              <div className="cred-content">
                <div className="cred-title">Runner-up, College Hackathon</div>
                <div className="cred-description">
                  Recognized for developing an innovative and highly effective Business Intelligence dashboard under tight deadlines.
                </div>
              </div>
            </div>
            <div className="credential-marquee-card">
              <div className="cred-meta">2024–25</div>
              <div className="cred-content">
                <div className="cred-title">Director, Rotaract Club</div>
                <div className="cred-description">
                  Led community initiatives and organized large-scale events, demonstrating strong project management.
                </div>
              </div>
            </div>
            <div className="credential-marquee-card">
              <div className="cred-meta">Award</div>
              <div className="cred-content">
                <div className="cred-title">Runner-up, College Hackathon</div>
                <div className="cred-description">
                  Recognized for developing an innovative and highly effective Business Intelligence dashboard under tight deadlines.
                </div>
              </div>
            </div>
              </div>
              <div className="marquee-group" aria-hidden="true">
                <div className="credential-marquee-card">
              <div className="cred-meta">2024–25</div>
              <div className="cred-content">
                <div className="cred-title">Director, Rotaract Club</div>
                <div className="cred-description">
                  Led community initiatives and organized large-scale events, demonstrating strong project management.
                </div>
              </div>
            </div>
            <div className="credential-marquee-card">
              <div className="cred-meta">Award</div>
              <div className="cred-content">
                <div className="cred-title">Runner-up, College Hackathon</div>
                <div className="cred-description">
                  Recognized for developing an innovative and highly effective Business Intelligence dashboard under tight deadlines.
                </div>
              </div>
            </div>
            <div className="credential-marquee-card">
              <div className="cred-meta">2024–25</div>
              <div className="cred-content">
                <div className="cred-title">Director, Rotaract Club</div>
                <div className="cred-description">
                  Led community initiatives and organized large-scale events, demonstrating strong project management.
                </div>
              </div>
            </div>
            <div className="credential-marquee-card">
              <div className="cred-meta">Award</div>
              <div className="cred-content">
                <div className="cred-title">Runner-up, College Hackathon</div>
                <div className="cred-description">
                  Recognized for developing an innovative and highly effective Business Intelligence dashboard under tight deadlines.
                </div>
              </div>
            </div>
              </div>
            </div>
          </div>

      </div>
    </section>
  );
}
