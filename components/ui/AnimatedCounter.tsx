'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView, animate } from 'framer-motion';

interface Props {
  value: number;
  decimals?: number;
  suffix?: string;
  prefix?: string;
}

export default function AnimatedCounter({ value, decimals = 0, suffix = '', prefix = '' }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (isInView && !hasAnimated) {
      const node = ref.current;
      if (!node) return;

      const controls = animate(0, value, {
        duration: 2,
        ease: [0.33, 1, 0.68, 1], // easeOutExpo style
        onUpdate(value) {
          node.textContent = `${prefix}${value.toFixed(decimals)}${suffix}`;
        },
      });

      setHasAnimated(true);
      return () => controls.stop();
    }
  }, [isInView, value, decimals, prefix, suffix, hasAnimated]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}0{suffix}
    </span>
  );
}
