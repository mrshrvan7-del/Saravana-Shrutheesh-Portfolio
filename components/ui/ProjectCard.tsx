'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

interface ProjectProps {
  title: string;
  description: string;
  tags: string[];
  metric: string;
  metricLabel: string;
  spanClass?: string;
  gradientClass: string;
}

export default function ProjectCard({
  title,
  description,
  tags,
  metric,
  metricLabel,
  spanClass = "",
  gradientClass,
}: ProjectProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6 }}
      className={`group relative overflow-hidden rounded-3xl border border-white/10 bg-bg-elevated ${spanClass} flex flex-col h-full`}
    >
      {/* Background Gradient Visual / Abstract data viz replacement */}
      <div className={`absolute top-0 right-0 w-full h-full opacity-[0.07] transition-all duration-700 group-hover:opacity-[0.15] bg-gradient-to-br ${gradientClass} z-0`} />
      
      {/* Decorative Geometric accents in the bg */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-10 -right-10 w-40 h-40 border border-white/5 rounded-full scale-0 group-hover:scale-150 transition-transform duration-1000 ease-out" />
        <div className="absolute -top-20 -right-20 w-60 h-60 border border-white/5 rounded-full scale-0 group-hover:scale-150 transition-transform duration-1000 ease-out delay-75" />
      </div>

      <div className="relative z-10 p-8 md:p-10 flex flex-col h-full">
        <div className="flex justify-between items-start mb-auto">
          <div className="flex gap-2">
            {tags.map(t => (
              <span key={t} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-code text-[var(--text-3)] uppercase tracking-wider font-bold">
                {t}
              </span>
            ))}
          </div>
          
          <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-accent-1 group-hover:border-accent-1 transition-all duration-300 text-[var(--text-2)] group-hover:text-white">
            <ArrowUpRight size={20} />
          </div>
        </div>

        <div className="mt-12 space-y-4">
          <h3 className="font-display text-3xl text-[var(--text-1)] group-hover:text-gradient transition-colors leading-tight">
            {title}
          </h3>
          <p className="text-[var(--text-2)] text-base leading-relaxed max-w-xl">
            {description}
          </p>
          
          <div className="pt-6 mt-6 border-t border-white/5 flex gap-8">
            <div className="space-y-1">
              <div className="text-3xl font-display text-[var(--text-1)] tracking-tighter flex items-baseline gap-1">
                {metric}
              </div>
              <div className="text-[var(--text-3)] text-xs font-code uppercase tracking-wider">
                {metricLabel}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
