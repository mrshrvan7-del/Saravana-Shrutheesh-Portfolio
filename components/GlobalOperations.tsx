'use client';

import { motion } from 'framer-motion';

export default function GlobalOperations() {
  // Abstract static locations matching rough coordinates on a normalized map grid for visual vibe
  const locations = [
    { name: 'US (HQ Alignment)', top: '35%', left: '20%' },
    { name: 'EU (Ops)', top: '30%', left: '48%' },
    { name: 'India (Current Hub)', top: '52%', left: '68%', primary: true },
    { name: 'Singapore (APAC)', top: '65%', left: '75%' },
    { name: 'Australia (Regional)', top: '78%', left: '85%' },
  ];

  return (
    <section className="py-32 bg-bg-base relative z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 text-center relative z-20 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-4 mb-12 pointer-events-auto"
        >
          <h2 className="font-display text-4xl md:text-5xl">Global Operations</h2>
          <p className="text-[var(--text-2)] text-lg font-medium uppercase font-code tracking-wide">
            Cross-timezone. Cross-cultural. <span className="text-accent-1">Always aligned.</span>
          </p>
        </motion.div>
      </div>

      <div className="relative h-[500px] w-full max-w-5xl mx-auto bg-white/[0.02] rounded-[3rem] border border-white/5 overflow-hidden">
        {/* Background abstract dot grid that looks like map dots */}
        <div 
          className="absolute inset-0 opacity-[0.08] grayscale"
          style={{ 
            backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', 
            backgroundSize: '20px 20px'
          }} 
        />
        
        {/* Glowing location indicators */}
        {locations.map((loc, i) => (
          <motion.div
            key={loc.name}
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 + (i * 0.15), duration: 0.5 }}
            className="absolute cursor-pointer group"
            style={{ top: loc.top, left: loc.left }}
          >
            <div className="relative">
              <span className={`absolute -inset-3 rounded-full ${loc.primary ? 'bg-accent-1/40' : 'bg-accent-2/30'} animate-ping`} />
              <span className={`absolute -inset-3 rounded-full ${loc.primary ? 'bg-accent-1/20' : 'bg-accent-2/10'} animate-pulse`} />
              <div className={`relative h-4 w-4 rounded-full ${loc.primary ? 'bg-accent-1 shadow-[0_0_15px_rgba(124,58,237,0.8)]' : 'bg-accent-2'} border border-white/20`} />
              
              {/* Tooltip Label */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-bg-elevated border border-white/10 px-3 py-1.5 rounded-lg text-xs font-code text-white whitespace-nowrap pointer-events-none">
                {loc.name}
              </div>
            </div>
          </motion.div>
        ))}

        {/* Simplified connecting arch lines (SVG) */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" style={{ overflow: 'visible' }}>
          <defs>
            <linearGradient id="archGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="var(--accent-2)" stopOpacity="0" />
              <stop offset="50%" stopColor="var(--accent-1)" stopOpacity="0.3" />
              <stop offset="100%" stopColor="var(--accent-2)" stopOpacity="0" />
            </linearGradient>
          </defs>
          
          {/* Sample arc pathways linking global hub */}
          {/* Path from India to US */}
          <motion.path
            d="M 680 260 Q 440 100 200 175"
            stroke="url(#archGradient)"
            strokeWidth="1.5"
            fill="none"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 2, delay: 0.5 }}
            // Using percentage coord translation isn't easy in static SVG width, using placeholder vectors that look reasonable on big containers
            className="opacity-60"
          />
          <motion.path
            d="M 680 260 Q 580 150 480 150"
            stroke="url(#archGradient)"
            strokeWidth="1.5"
            fill="none"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: 0.8 }}
          />
        </svg>
      </div>
    </section>
  );
}
