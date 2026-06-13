'use client';

import { motion } from 'framer-motion';
import AnimatedCounter from './ui/AnimatedCounter';

const stats = [
  {
    value: 2,
    prefix: '',
    suffix: '+',
    decimals: 0,
    label: 'Years @ Walmart Global Tech',
  },
  {
    value: 98.4,
    prefix: '',
    suffix: '%',
    decimals: 1,
    label: 'SLA Achievement Rate',
  },
  {
    value: 35,
    prefix: '',
    suffix: '%',
    decimals: 0,
    label: 'Process Efficiency Gain',
  },
  {
    value: 12,
    prefix: '',
    suffix: '+',
    decimals: 0,
    label: 'Cross-Functional Teams',
  },
];

export default function Stats() {
  return (
    <section className="py-20 relative bg-bg-surface border-y border-white/5 z-20 overflow-hidden">
      {/* Decorative subtle lines or grids can go here */}
      
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col items-center text-center space-y-3 relative group"
            >
              {/* Hover glow background for each element */}
              <div className="absolute inset-0 bg-accent-1/5 scale-0 group-hover:scale-100 rounded-2xl transition-transform duration-500 blur-xl opacity-0 group-hover:opacity-100" />
              
              <h3 className="font-display text-5xl md:text-6xl text-gradient relative z-10 tracking-tight">
                <AnimatedCounter 
                  value={stat.value} 
                  decimals={stat.decimals} 
                  prefix={stat.prefix} 
                  suffix={stat.suffix} 
                />
              </h3>
              
              <p className="text-[var(--text-2)] text-sm md:text-base font-medium max-w-[180px] relative z-10 uppercase tracking-wider font-heading leading-snug">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
