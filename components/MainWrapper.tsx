'use client';

import { motion, useScroll, useSpring } from 'framer-motion';

export default function MainWrapper({ children }: { children: React.ReactNode }) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 150,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <>
      {/* Fixed thin scroll progress bar at the very top */}
      <motion.div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '2px',
          backgroundColor: 'var(--color-accent)',
          zIndex: 9999,
          transformOrigin: '0%',
          scaleX,
        }}
      />

      <div>
        {children}
      </div>
    </>
  );
}
