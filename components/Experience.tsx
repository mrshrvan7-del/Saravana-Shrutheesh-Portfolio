'use client';

import FadeUp from './ui/FadeUp';

const projects = [
  {
    title: 'AI Support Co-pilot',
    status: 'In Development',
    statusType: 'amber',
    desc: 'Proposed and successfully developing an AI-powered contact center co-pilot concept for Walmart support operations that provides real-time transcript analysis, intelligent KB article retrieval, guided agent assistance, and performance analytics to improve issue resolution efficiency, agent productivity, and customer experience through RAG architecture and conversational AI workflows.',
  },
  {
    title: 'Ai-Call-Auditor',
    status: 'Fully Built',
    statusType: 'green',
    repo: 'https://github.com/mrshrvan7-del/Ai-Call-Auditor',
    desc: 'Proposed and successfully built Ai-Call-Auditor, an AI-powered call auditing system designed to automatically analyze and evaluate sales and customer support call recordings, leveraging NLP to extract customer sentiment, compliance flags, and key campaign performance metrics.',
  },
  {
    title: 'SMS Paystub Assistant',
    status: 'Fully Built',
    statusType: 'green',
    desc: 'Developed an offline-first payroll assistance solution that enables employees to securely retrieve paystubs through simple SMS-based interactions without requiring internet access, designed specifically to support elderly, non-technical, and basic mobile phone users by improving accessibility, inclusivity, and ease of access to essential payroll information.',
  },
];

export default function Experience() {
  return (
    <section
      id="experience"
      style={{
        backgroundColor: 'var(--color-bg)',
      }}
    >
      <div className="section-container">
        <div style={{ textAlign: 'left', marginBottom: '3rem' }}>
          <span className="micro-text" style={{ marginBottom: '1rem' }}>
            CAREER PATH
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
            Professional Experience
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

          {/* Walmart Entry */}
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
                  Feb 2025 - Present
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
                  Walmart Global Tech
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
                Operations Analyst{' '}
                <span style={{ fontSize: '1.05rem', color: 'var(--color-text-secondary)', fontWeight: 400 }}>
                  (Resolution Specialist)
                </span>
              </h3>
              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.9rem',
                  color: 'var(--color-text-secondary)',
                  marginBottom: '1.25rem',
                }}
              >
                Fortune 1 company, ~$650B revenue
              </p>

              {/* Operations Bullets */}
              <ul
                style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: '0 0 1.75rem 0',
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
                  Managed payroll processing and operational workflows for a global workforce, ensuring high accuracy and SLA compliance.
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
                  Conducted root cause analysis on payroll discrepancies, implementing corrective measures to prevent recurring issues.
                </li>
              </ul>

              {/* Sub-items Label */}
              <span className="micro-text" style={{ color: 'var(--color-text-primary)', marginBottom: '1rem', display: 'block' }}>
                Projects Proposed for Operational Improvement
              </span>

              {/* Proposed Project Cards with Left Accent Border */}
              <div
                style={{
                  borderLeft: '1px solid rgba(26, 86, 219, 0.3)',
                  paddingLeft: '1.25rem',
                  marginLeft: '3px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem',
                }}
              >
                {projects.map((proj, idx) => (
                  <div
                    key={idx}
                    style={{
                      backgroundColor: 'var(--color-bg-muted)',
                      borderRadius: '8px',
                      padding: '1.25rem',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.5rem',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
                      {proj.repo ? (
                        <a
                          href={proj.repo}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            fontFamily: 'var(--font-sans)',
                            fontSize: '0.95rem',
                            fontWeight: 600,
                            color: 'var(--color-accent-text)',
                            textDecoration: 'underline',
                          }}
                        >
                          {proj.title}
                        </a>
                      ) : (
                        <strong style={{ fontFamily: 'var(--font-sans)', fontSize: '0.95rem', color: 'var(--color-text-primary)' }}>
                          {proj.title}
                        </strong>
                      )}
                      
                      <span
                        style={{
                          backgroundColor: proj.statusType === 'green' ? '#D1FAE5' : '#FEF3C7',
                          color: proj.statusType === 'green' ? '#059669' : '#D97706',
                          borderRadius: '4px',
                          padding: '2px 8px',
                          fontSize: '0.7rem',
                          fontFamily: 'var(--font-sans)',
                          fontWeight: 600,
                        }}
                      >
                        {proj.status}
                      </span>
                    </div>
                    <p style={{ fontSize: '0.85rem', lineHeight: 1.6, color: 'var(--color-text-secondary)', margin: 0 }}>
                      {proj.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </FadeUp>

          {/* Toyota Entry */}
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
                  Jul 2024 - Feb 2025
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
                  Toyota Motors India
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
                Marketing Operations Analyst
              </h3>
              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.9rem',
                  color: 'var(--color-text-secondary)',
                  marginBottom: '1.25rem',
                }}
              >
                Leading global automotive manufacturer
              </p>

              {/* Toyota Bullets */}
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
                  Leveraged data analytics to track and report on marketing KPIs, optimizing campaign performance.
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
                  Developed MIS reports and dashboards in Power BI to provide leadership with real-time operational insights.
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
                  Collaborated with regional teams to ensure seamless execution of marketing operations and process adherence.
                </li>
              </ul>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
