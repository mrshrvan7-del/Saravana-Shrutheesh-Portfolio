'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface SkillCardProps {
  title: string;
  icon: ReactNode;
  skills: string[];
  delay: number;
}

export default function SkillCard({ title, icon, skills, delay }: SkillCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -8 }}
      className="group relative glass p-8 rounded-2xl border border-white/5 overflow-hidden flex flex-col h-full transition-colors duration-300 hover:border-accent-1/30"
    >
      {/* Glowing Inner Gradient Reveal */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent-1/0 via-accent-1/0 to-accent-1/0 group-hover:from-accent-1/5 group-hover:to-accent-2/5 transition-all duration-500 z-0" />

      <div className="relative z-10 mb-6 flex items-center gap-4">
        <div className="p-3 rounded-xl bg-white/5 text-accent-1 group-hover:bg-accent-1/10 group-hover:text-accent-2 transition-colors duration-300">
          {icon}
        </div>
        <h4 className="text-xl font-heading font-semibold text-[var(--text-1)]">
          {title}
        </h4>
      </div>

      <div className="relative z-10 flex flex-wrap gap-2 mt-auto">
        {skills.map((skill, i) => (
          <span
            key={i}
            className="px-3 py-1 bg-white/5 text-xs font-code text-[var(--text-2)] rounded-md border border-transparent group-hover:border-white/10 group-hover:bg-white/10 transition-all duration-300 hover:!text-accent-2 hover:!border-accent-2/30 cursor-default"
          >
            {skill}
          </span>
        ))}
      </div>
    </motion.div>
  );
}
