'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface AnimatedSectionProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
  delay?: number;
}

export default function AnimatedSection({
  children,
  id,
  className = '',
  delay = 0,
}: AnimatedSectionProps) {
  const [isAnimating, setIsAnimating] = useState(true);

  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
        delay,
      }}
      onAnimationComplete={() => setIsAnimating(false)}
      style={{
        willChange: isAnimating ? 'transform, opacity' : 'auto',
      }}
      className={className}
    >
      {children}
    </motion.section>
  );
}
