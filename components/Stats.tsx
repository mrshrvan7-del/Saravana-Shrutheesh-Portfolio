'use client';

import FadeUp from './ui/FadeUp';
import AnimatedCounter from './ui/AnimatedCounter';

const stats = [
  {
    value: 1.8,
    suffix: '+',
    label: 'Years Experience',
  },
  {
    value: 2,
    suffix: '',
    label: 'Fortune Companies',
  },
  {
    value: 10,
    suffix: '+',
    label: 'Dashboards Built',
  },
  {
    value: 3,
    suffix: '',
    label: 'AI Systems Built',
  },
];

export default function Stats() {
  return (
    <section
      style={{
        paddingTop: '4rem',
        paddingBottom: '4rem',
        backgroundColor: 'var(--color-bg-subtle)',
        borderTop: '1px solid var(--color-border)',
        borderBottom: '1px solid var(--color-border)',
      }}
    >
      <div className="section-container">
        <FadeUp
          staggerChildren={0.08}
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {stats.map((stat, index) => {
            const hasDecimals = stat.value % 1 !== 0;
            return (
              <div
                key={index}
                style={{
                  backgroundColor: 'var(--color-surface)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '12px',
                  padding: '1.5rem 2rem',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  textAlign: 'left',
                  boxShadow: 'var(--shadow-card)',
                  transition: 'box-shadow 0.25s ease, transform 0.25s ease',
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
                    fontFamily: 'var(--font-display)',
                    fontSize: '2.5rem',
                    color: 'var(--color-text-primary)',
                    fontWeight: 400,
                    lineHeight: '1.2',
                    marginBottom: '0.5rem',
                  }}
                >
                  <AnimatedCounter
                    value={stat.value}
                    decimals={hasDecimals ? 1 : 0}
                    suffix={stat.suffix}
                  />
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.85rem',
                    color: 'var(--color-text-secondary)',
                    fontWeight: 500,
                    lineHeight: '1.4',
                  }}
                >
                  {stat.label}
                </div>
              </div>
            );
          })}
        </FadeUp>
      </div>
    </section>
  );
}
