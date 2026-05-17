'use client';

import { motion } from 'framer-motion';
import { Award, ExternalLink } from 'lucide-react';

const certs = [
  {
    title: 'Google Advanced Data Analytics',
    issuer: 'Google / Coursera',
    date: '2024',
    color: 'border-blue-500/30',
  },
  {
    title: 'Google Data Analytics',
    issuer: 'Google / Coursera',
    date: '2023',
    color: 'border-emerald-500/30',
  },
  {
    title: 'Power BI Data Analyst Associate',
    issuer: 'Microsoft',
    date: '2024',
    color: 'border-amber-500/30',
  },
];

export default function Certs() {
  return (
    <section className="py-32 bg-bg-surface border-t border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-baseline justify-between mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl">Verified Certifications</h2>
          <div className="hidden md:flex h-[1px] flex-grow bg-gradient-to-r from-white/10 to-transparent mx-8" />
        </motion.div>

        {/* Container with snap scroll for mobile */}
        <div className="flex flex-row gap-6 overflow-x-auto pb-8 snap-x snap-mandatory md:grid md:grid-cols-3 md:overflow-visible scrollbar-hide">
          {certs.map((cert, index) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`min-w-[85%] sm:min-w-[45%] md:min-w-0 snap-center flex flex-col justify-between glass p-8 rounded-2xl border transition-all duration-300 hover:bg-white/[0.03] ${cert.color} group h-64`}
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-[var(--text-3)] mb-6 group-hover:text-white transition-colors">
                  <Award size={24} />
                </div>
                
                <h3 className="text-xl font-heading font-semibold text-[var(--text-1)] leading-snug mb-2 group-hover:text-gradient transition-all">
                  {cert.title}
                </h3>
                <p className="text-[var(--text-3)] font-code text-sm uppercase">
                  {cert.issuer} • {cert.date}
                </p>
              </div>

              <div className="flex justify-end mt-4">
                <button className="flex items-center gap-2 text-xs font-code font-bold tracking-wider text-[var(--text-2)] group-hover:text-accent-2 transition-colors">
                  VERIFY CREDENTIAL <ExternalLink size={14} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
