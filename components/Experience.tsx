'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const experiences = [
  {
    role: 'Resolution & Process Analyst',
    company: 'Walmart Global Tech',
    period: '2023 – Present',
    bullets: [
      'Optimized complex internal fulfillment systems using predictive analytics, leading to streamlined processing times.',
      'Drove root cause analysis using BigQuery/SQL ensuring continuous operational system health across global clusters.',
      'Collaborated with 12+ cross-functional regional units to bridge technology deployment and business goal delivery.',
      'Established resilient monitoring mechanisms, successfully achieving a sustained 98.4% SLA compliance rate.'
    ],
    tags: ['BigQuery', 'SQL', 'Power BI', 'Jira', 'ServiceNow']
  },
  {
    role: 'Business & Marketing Analyst',
    company: 'Toyota Motors India',
    period: '2021 - 2023',
    bullets: [
      'Developed interactive visualization hubs that redefined distribution trend reporting for central marketing ops.',
      'Leveraged legacy logistics logs to identify route overlaps, decreasing aggregate freight redundancy by 15%.',
      'Spearheaded data consolidation efforts resulting in precise real-time competitive positioning insights.'
    ],
    tags: ['Excel', 'Tableau', 'Analytics', 'Market Research']
  }
];

export default function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"]
  });

  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="experience" ref={ref} className="py-32 bg-bg-base relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-24 space-y-4">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-code tracking-widest text-accent-1 uppercase"
          >
            Career Timeline
          </motion.h2>
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-display"
          >
            Strategic Impact
          </motion.h3>
        </div>

        <div className="relative">
          {/* The Vertical Timeline Line Base */}
          <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-white/10 -translate-x-1/2 hidden md:block" />
          
          {/* The Animated Progress Line */}
          <motion.div 
            style={{ scaleY, originY: 0 }}
            className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-accent-1 via-accent-2 to-emerald-400 -translate-x-1/2 hidden md:block z-0"
          />

          <div className="space-y-16 relative z-10">
            {experiences.map((exp, index) => (
              <div key={index} className="relative md:flex md:items-center w-full">
                {/* The dot marker */}
                <motion.div 
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ delay: 0.2 }}
                  className="hidden md:block absolute left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-bg-base border-4 border-accent-1 z-20"
                />
                
                {/* Hand off positioning logic logic to the wrapper instead of passing logic, so we iterate simply */}
                <div className={`w-full md:w-1/2 flex ${index % 2 === 0 ? 'md:pr-16 justify-end md:text-right' : 'md:pl-16 md:ml-auto justify-start text-left'}`}>
                  <motion.div
                    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="glass p-8 rounded-2xl border border-white/5 hover:border-accent-1/20 transition-colors group w-full relative"
                  >
                     <span className="inline-block text-xs font-code text-accent-2 mb-2 uppercase tracking-wider">{exp.period}</span>
                     <h4 className="text-2xl font-display text-[var(--text-1)] group-hover:text-gradient">{exp.role}</h4>
                     <p className="text-lg font-heading font-medium text-[var(--text-3)] mb-6">{exp.company}</p>
                     
                     <ul className="space-y-4 text-sm md:text-base text-[var(--text-2)] leading-relaxed mb-8">
                       {exp.bullets.map((b, i) => (
                         <li key={i} className="flex items-start gap-3">
                           <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent-1 shrink-0" />
                           <span>{b}</span>
                         </li>
                       ))}
                     </ul>
                     
                     <div className="flex flex-wrap gap-2">
                       {exp.tags.map(t => (
                         <span key={t} className="px-3 py-1 text-xs rounded-md bg-white/5 border border-white/10 font-code text-[var(--text-3)]">{t}</span>
                       ))}
                     </div>
                  </motion.div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
