'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const filterOptions = [
  { label: 'All', value: 'all' },
  { label: 'Operations', value: 'operations' },
  { label: 'Analytics', value: 'analytics' },
  { label: 'AI & Tech', value: 'ai' },
  { label: 'Office Suite', value: 'office' },
  { label: 'Languages & DB', value: 'technical' },
];

const skillsList = [
  { name: 'Root Cause Analysis', category: 'operations' },
  { name: 'UAT Testing', category: 'operations' },
  { name: 'JIRA', category: 'operations' },
  { name: 'ServiceNow', category: 'operations' },
  { name: 'Process Documentation', category: 'operations' },
  { name: 'Change Governance', category: 'operations' },
  
  { name: 'Power BI', category: 'analytics' },
  { name: 'Advanced Excel', category: 'analytics' },
  { name: 'Google Data Studio', category: 'analytics' },
  { name: 'BigQuery', category: 'analytics' },
  { name: 'MIS Reporting', category: 'analytics' },
  
  { name: 'Claude AI', category: 'ai' },
  { name: 'ChatGPT', category: 'ai' },
  { name: 'Gemini', category: 'ai' },
  
  { name: 'Excel', category: 'office' },
  { name: 'Word', category: 'office' },
  { name: 'PowerPoint', category: 'office' },
  { name: 'Outlook', category: 'office' },
  
  { name: 'Python', category: 'technical' },
  { name: 'SQL', category: 'technical' },
];

export default function Skills() {
  const [selectedFilter, setSelectedFilter] = useState('all');

  const filteredSkills = selectedFilter === 'all'
    ? skillsList
    : skillsList.filter(skill => skill.category === selectedFilter);

  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.04,
      },
    },
  };

  const tagVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: 'spring' as const,
        stiffness: 350,
        damping: 25,
      },
    },
  };

  return (
    <section
      id="skills"
      style={{
        backgroundColor: 'var(--color-section-alt)',
      }}
    >
      <div className="section-container">
        <div style={{ textAlign: 'left', marginBottom: '3rem' }}>
          <span className="micro-text" style={{ marginBottom: '1rem' }}>
            MY CAPABILITIES
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
            Skills & Competencies
          </h2>
        </div>

        {/* Category Filters Group */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'flex-start',
            gap: '0.6rem',
            marginBottom: '3rem',
          }}
        >
          {filterOptions.map((opt) => {
            const isActive = selectedFilter === opt.value;
            return (
              <button
                key={opt.value}
                onClick={() => setSelectedFilter(opt.value)}
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.8rem',
                  fontWeight: 500,
                  padding: '0.45rem 1.1rem',
                  borderRadius: '20px',
                  border: isActive ? '1px solid var(--color-text-primary)' : '1px solid var(--color-border)',
                  backgroundColor: isActive ? 'var(--color-text-primary)' : 'transparent',
                  color: isActive ? '#FFFFFF' : 'var(--color-text-secondary)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                {opt.label}
              </button>
            );
          })}
        </div>

        {/* Skills Tag Cloud */}
        <div style={{ minHeight: '140px', display: 'flex', justifyContent: 'flex-start' }}>
          <motion.div
            key={selectedFilter}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.75rem',
              width: '100%',
              maxWidth: '960px',
            }}
          >
            <AnimatePresence mode="popLayout">
              {filteredSkills.map((skill) => (
                <motion.div
                  key={skill.name}
                  layout
                  variants={tagVariants}
                  style={{
                    backgroundColor: 'var(--color-tag-bg)',
                    color: 'var(--color-tag-text)',
                    borderRadius: '6px',
                    padding: '0.3rem 0.8rem',
                    fontSize: '0.8rem',
                    fontFamily: 'var(--font-sans)',
                    fontWeight: 500,
                    userSelect: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    transition: 'opacity 0.2s ease',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.85'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.opacity = '1'; }}
                >
                  {skill.name}
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
