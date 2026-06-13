'use client';
import { useEffect, useRef } from 'react';

export default function Experience() {
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
    <section id="experience" className="section-container section-padding" ref={sectionRef}>
      <h2 className="section-heading animate-on-scroll fade-up">experience.</h2>
      
      <div className="timeline">
        
        {/* Walmart */}
        <div className="timeline-item animate-on-scroll fade-up" style={{ transitionDelay: '150ms' }}>
          <div className="timeline-dot" />
          <div className="timeline-content">
            <span className="timeline-date">Feb 2025 - Present</span>
            <h3 className="timeline-title">Resolution Specialist</h3>
            <p className="timeline-desc">Walmart Global Tech &middot; Fortune 1 company, ~$650B revenue</p>
            <ul className="timeline-bullets">
              <li>Managed payroll processing and operational workflows for a global workforce, ensuring high accuracy and SLA compliance.</li>
              <li>Conducted root cause analysis on payroll discrepancies, implementing corrective measures to prevent recurring issues.</li>
            </ul>
            
            <span className="timeline-subheading">Projects Proposed for Operational Improvement</span>
            <ul className="timeline-bullets" style={{ marginTop: '0.5rem' }}>
              <li>
                <strong>AI Support Co-pilot (In Development)</strong> &mdash; Proposed and successfully developing an AI-powered contact center co-pilot concept for Walmart support operations that provides real-time transcript analysis, intelligent KB article retrieval, guided agent assistance, and performance analytics to improve issue resolution efficiency, agent productivity, and customer experience through RAG architecture and conversational AI workflows.
              </li>
              <li>
                <a
                  href="https://github.com/mrshrvan7-del/Ai-Call-Auditor"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline text-[#8A7C38] font-bold"
                  style={{ textDecoration: 'underline' }}
                >
                  Ai-Call-Auditor (Fully Built)
                </a> &mdash; Proposed and successfully built Ai-Call-Auditor, an AI-powered call auditing system designed to automatically analyze and evaluate sales and customer support call recordings, leveraging NLP to extract customer sentiment, compliance flags, and key campaign performance metrics.
              </li>
              <li>
                <strong>SMS Paystub Assistant (Fully Built)</strong> &mdash; Developed an offline-first payroll assistance solution that enables employees to securely retrieve paystubs through simple SMS-based interactions without requiring internet access, designed specifically to support elderly, non-technical, and basic mobile phone users by improving accessibility, inclusivity, and ease of access to essential payroll information.
              </li>
            </ul>
          </div>
        </div>

        {/* Toyota */}
        <div className="timeline-item animate-on-scroll fade-up" style={{ transitionDelay: '300ms' }}>
          <div className="timeline-dot" />
          <div className="timeline-content">
            <span className="timeline-date">Jul 2024 - Feb 2025</span>
            <h3 className="timeline-title">Marketing Operations Analyst</h3>
            <p className="timeline-desc">Toyota Motors India &middot; Leading global automotive manufacturer</p>
            <ul className="timeline-bullets">
              <li>Leveraged data analytics to track and report on marketing KPIs, optimizing campaign performance.</li>
              <li>Developed MIS reports and dashboards in Power BI to provide leadership with real-time operational insights.</li>
              <li>Collaborated with regional teams to ensure seamless execution of marketing operations and process adherence.</li>
            </ul>
          </div>
        </div>

      </div>
    </section>
  );
}
