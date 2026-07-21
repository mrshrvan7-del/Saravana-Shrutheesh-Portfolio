'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useScroll, useVelocity, useTransform } from 'framer-motion';

export default function Cursor() {
  const [mounted, setMounted] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  // Spring settings to introduce smooth lag
  const springConfig = { damping: 25, stiffness: 250 };
  const ringX = useSpring(cursorX, springConfig);
  const ringY = useSpring(cursorY, springConfig);

  // Scroll velocity tracking for stretch effects
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);

  // Transform absolute scroll speed into a normalized stretch factor (0 to 0.6)
  const stretchY = useTransform(scrollVelocity, (vel) => {
    const speed = Math.abs(vel);
    return Math.min(speed / 3000, 0.6); // Clamp max stretch to 0.6
  });

  // Apply spring physics to the stretch factor for bouncy jelly transitions
  const springStretch = useSpring(stretchY, { damping: 15, stiffness: 120 });

  // Map stretch factor to scale: vertical elongation (scaleY) and horizontal contraction (scaleX)
  const scaleY = useTransform(springStretch, [0, 0.6], [1, 1.6]);
  const scaleX = useTransform(springStretch, [0, 0.6], [1, 0.7]);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 10);
    
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        window.getComputedStyle(target).cursor === 'pointer' ||
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [cursorX, cursorY]);

  if (!mounted) return null;

  return (
    <>
      {/* Inner Dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <div className="w-2 h-2 bg-white rounded-full" />
      </motion.div>

      {/* Outer Ring with dynamic scroll jelly stretch */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] border rounded-full transition-colors duration-300 mix-blend-difference"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
          width: isHovering ? 56 : 32,
          height: isHovering ? 56 : 32,
          scaleX,
          scaleY,
          backgroundColor: isHovering ? 'rgba(255, 255, 255, 0.15)' : 'transparent',
          borderColor: isHovering ? 'rgba(255, 255, 255, 0.6)' : 'rgba(255, 255, 255, 0.3)',
        }}
      />
    </>
  );
}

