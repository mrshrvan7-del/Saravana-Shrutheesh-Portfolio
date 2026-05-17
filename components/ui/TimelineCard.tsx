'use client';

import { motion } from 'framer-motion';

interface TimelineItemProps {
  role: string;
  company: string;
  period: string;
  bullets: string[];
  tags: string[];
  isLeft?: boolean;
}

export default function TimelineCard({ role, company, period, bullets, tags, isLeft }: TimelineItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`relative w-full md:w-[45%] ${isLeft ? 'md:mr-auto md:pr-12 text-right' : 'md:ml-auto md:pl-12 text-left'}`}
    >
      {/* Content Container */}
      <div className="glass p-6 md:p-8 rounded-2xl border border-white/5 relative overflow-hidden group hover:border-accent-1/30 transition-colors">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent-1 to-accent-2 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
        
        <span className="inline-block text-xs font-code text-accent-2 mb-2 uppercase tracking-wider">
          {period}
        </span>
        
        <h3 className="text-2xl font-display mb-1 text-[var(--text-1)] group-hover:text-gradient transition-all duration-300">
          {role}
        </h3>
        
        <h4 className="text-lg font-heading font-medium text-[var(--text-2)] mb-4">
          {company}
        </h4>

        <ul className={`space-y-3 mb-6 text-sm text-[var(--text-2)] leading-relaxed ${isLeft ? 'list-none' : 'list-none'}`}>
          {bullets.map((bullet, i) => (
            <li key={i} className="relative pl-4">
              <div className={`absolute top-2 w-1.5 h-1.5 rounded-full bg-accent-1 ${isLeft ? '-right-1.5 hidden' : 'left-0'}`} />
              {bullet}
            </li>
          ))}
        </ul>

        <div className={`flex flex-wrap gap-2 ${isLeft ? 'justify-end' : 'justify-start'}`}>
          {tags.map((tag, i) => (
            <span
              key={i}
              className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-code text-[var(--text-3)] hover:text-[var(--text-1)] transition-colors"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Center Dot on timeline */}
      <div 
        className={`hidden md:block absolute top-8 w-4 h-4 rounded-full bg-accent-1 border-4 border-bg-base z-10
        ${isLeft ? '-right-[calc(10% + 8px)] translate-x-1/2' : '-left-[calc(10% + 8px)] -translate-x-1/2'}`} 
        style={isLeft ? {right: '-2px', transform: 'translateX(50%)'} : {left: '-2px', transform: 'translateX(-50%)'}}
      />
      {/* Correction: the center dot location will be managed in the parent wrapper so we align easier. I'll let parent handle dots. */}
    </motion.div>
  );
}
