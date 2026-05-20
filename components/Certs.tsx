'use client';

import { useEffect, useRef } from 'react';

export default function Certs() {
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
      
      <div className="credentials-section-grid animate-on-scroll fade-up">
        
        {/* Certifications Column */}
        <div className="credentials-column">
          <h3 className="section-heading credentials-column-title">certifications.</h3>
          <div className="credentials-list">
            
            <div className="credential-item">
              <div className="cred-meta">2025</div>
              <div className="cred-content">
                <div className="cred-title">Google Prompting Essentials</div>
                <div className="cred-issuer">Google</div>
              </div>
            </div>

            <div className="credential-item">
              <div className="cred-meta">2025</div>
              <div className="cred-content">
                <div className="cred-title">Use AI as a Creative or Expert Partner</div>
                <div className="cred-issuer">Google</div>
              </div>
            </div>

            <div className="credential-item">
              <div className="cred-meta">2024</div>
              <div className="cred-content">
                <div className="cred-title">Google Advanced Data Analytics</div>
                <div className="cred-issuer">Google</div>
              </div>
            </div>

            <div className="credential-item">
              <div className="cred-meta">2024</div>
              <div className="cred-content">
                <div className="cred-title">Microsoft Power BI Data Analyst</div>
                <div className="cred-issuer">Microsoft</div>
              </div>
            </div>

            <div className="credential-item">
              <div className="cred-meta">2023</div>
              <div className="cred-content">
                <div className="cred-title">Google Data Analytics Professional</div>
                <div className="cred-issuer">Google</div>
              </div>
            </div>

          </div>
        </div>

        {/* Leadership Column */}
        <div className="credentials-column">
          <h3 className="section-heading credentials-column-title">leadership.</h3>
          <div className="credentials-list">
            
            <div className="credential-item">
              <div className="cred-meta">2024–25</div>
              <div className="cred-content">
                <div className="cred-title">Director, Rotaract Club</div>
                <div className="cred-description">
                  Led community initiatives and organized large-scale events, demonstrating strong project management.
                </div>
              </div>
            </div>

            <div className="credential-item">
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
    </section>
  );
}
