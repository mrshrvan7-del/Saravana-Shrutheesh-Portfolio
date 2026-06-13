"use client";

import React, { useEffect, useState, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { generateSignaturePaths, SignaturePathData } from './generateSignaturePaths';
import { useHandwritingAnimation } from './useHandwritingAnimation';
import './SplashScreen.css';

interface SplashScreenProps {
  onComplete: () => void;
}

type AnimationPhase = 'loading' | 'writing' | 'settling' | 'tagline' | 'exit';

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const shouldReduceMotion = useReducedMotion();
  const [paths, setPaths] = useState<SignaturePathData[]>([]);
  const [pathsLoaded, setPathsLoaded] = useState(false);
  const [phase, setPhase] = useState<AnimationPhase>('loading');

  const svgRef = useRef<SVGSVGElement | null>(null);
  const pathRefs = useRef<(SVGPathElement | null)[]>([]);
  
  // Refs for direct DOM manipulation of pen tip
  const outerCircleRef = useRef<SVGCircleElement | null>(null);
  const midCircleRef = useRef<SVGCircleElement | null>(null);
  const coreCircleRef = useRef<SVGCircleElement | null>(null);

  // Initialize and load font & generate signature paths
  useEffect(() => {
    let active = true;
    generateSignaturePaths('Saravana Shrutheesh.M')
      .then((generatedPaths) => {
        if (active) {
          setPaths(generatedPaths);
          setPathsLoaded(true);
        }
      })
      .catch((err) => {
        console.error('Failed to generate signature paths:', err);
      });

    return () => {
      active = false;
    };
  }, []);

  const isWritingActive = pathsLoaded && phase === 'writing' && !shouldReduceMotion;

  // Run the sequential handwriting animation
  const { isComplete } = useHandwritingAnimation(
    paths,
    pathRefs,
    outerCircleRef,
    midCircleRef,
    coreCircleRef,
    isWritingActive
  );

  // Phase scheduling sequence
  useEffect(() => {
    if (!pathsLoaded) return;

    if (shouldReduceMotion) {
      setPhase('tagline');
      
      // Make all paths immediately fully drawn
      pathRefs.current.forEach((pathEl) => {
        if (pathEl) {
          pathEl.style.strokeDashoffset = '0';
          pathEl.setAttribute('stroke', '#2AADBA');
        }
      });

      // Show completed signature for 1.5 seconds, then transition to exit
      const exitTimer = setTimeout(() => {
        setPhase('exit');
        const completeTimer = setTimeout(() => {
          onComplete();
        }, 500);
        return () => clearTimeout(completeTimer);
      }, 1500);

      return () => clearTimeout(exitTimer);
    }

    // Standard motion sequence
    setPhase('loading');

    // Transiton from loading (glow point) to writing
    const startWritingTimer = setTimeout(() => {
      setPhase('writing');
    }, 300);

    return () => clearTimeout(startWritingTimer);
  }, [pathsLoaded, shouldReduceMotion, onComplete]);

  // Handle transitions after writing is complete
  useEffect(() => {
    if (!isComplete || shouldReduceMotion) return;

    setPhase('settling');

    // 2900ms - 3200ms: settling phase lasts 300ms
    const taglineTimer = setTimeout(() => {
      setPhase('tagline');
    }, 300);

    // 3200ms - 3700ms: tagline phase lasts 500ms
    const exitTimer = setTimeout(() => {
      setPhase('exit');
    }, 800);

    // 3700ms - 4200ms: exit phase lasts 500ms, then call onComplete
    const completeTimer = setTimeout(() => {
      onComplete();
    }, 1300);

    return () => {
      clearTimeout(taglineTimer);
      clearTimeout(exitTimer);
      clearTimeout(completeTimer);
    };
  }, [isComplete, shouldReduceMotion, onComplete]);

  // Extract start position coordinates for the first stroke
  const getStartPoint = () => {
    if (paths.length === 0) return { x: 400, y: 100 }; // fallback center-ish
    const match = paths[0].d.match(/^M\s+([-\d.]+)\s+([-\d.]+)/);
    if (match) {
      return { x: parseFloat(match[1]), y: parseFloat(match[2]) };
    }
    return { x: 400, y: 100 };
  };

  const startPt = getStartPoint();

  return (
    <motion.div
      className="splash-wrapper"
      initial={{ opacity: 1, scale: 1 }}
      animate={phase === 'exit' ? { opacity: 0, scale: 1.012 } : { opacity: 1, scale: 1 }}
      transition={{
        duration: phase === 'exit' ? 0.5 : 0.2,
        ease: phase === 'exit' ? [0.4, 0, 1, 1] : 'easeOut'
      }}
    >
      {/* Background Glow */}
      <div className="splash-bg-glow" />

      {/* Main Signature Container */}
      <div className="signature-container">
        {pathsLoaded && (
          <svg
            ref={svgRef}
            className={`signature-svg ${
              phase === 'settling' || phase === 'tagline' || phase === 'exit' ? 'glow-active' : ''
            }`}
            viewBox="0 0 800 160"
            width="min(90vw, 700px)"
            height="auto"
            preserveAspectRatio="xMidYMid meet"
            overflow="visible"
            role="img"
            aria-label="Saravana Shrutheesh.M signature"
          >
            <defs>
              {/* Pressure filter for subtle organic wobble */}
              <filter id="pressure" x="-10%" y="-10%" width="120%" height="120%">
                <feTurbulence type="fractalNoise" baseFrequency="0.015" numOctaves="2" result="noise" />
                <feDisplacementMap
                  in="SourceGraphic"
                  in2="noise"
                  scale="0.4"
                  xChannelSelector="R"
                  yChannelSelector="G"
                />
              </filter>

              {/* Blur filter for pen tip glow */}
              <filter id="pen-blur" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="0.3" />
              </filter>

              {/* Ink gradient: leading bright edges fade into settled dry color */}
              <linearGradient id="inkGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#2AADBA" />
                <stop offset="100%" stopColor="#38C9CE" />
              </linearGradient>
            </defs>

            {/* Signature Paths */}
            <g filter="url(#pressure)">
              {paths.map((pathData, idx) => (
                <path
                  key={idx}
                  ref={(el) => {
                    pathRefs.current[idx] = el;
                  }}
                  d={pathData.d}
                  fill="none"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{
                    strokeDasharray: `${pathData.length} ${pathData.length}`,
                    strokeDashoffset: pathData.length,
                    transition: 'stroke 150ms ease-out'
                  }}
                />
              ))}
            </g>

            {/* Pen Tip Assembly */}
            {!shouldReduceMotion && (
              <motion.g
                className="pen-tip-group"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: phase === 'loading' || phase === 'writing' ? 1 : 0
                }}
                transition={{
                  duration: phase === 'settling' ? 0.3 : 0.2
                }}
                style={{
                  filter: 'url(#pen-blur)'
                }}
              >
                {/* Outer halo: expands from r=3 (loading) to r=10 (writing) */}
                <motion.circle
                  ref={outerCircleRef}
                  className={`pen-outer-ring ${phase === 'loading' ? 'loading' : ''}`}
                  cx={startPt.x}
                  cy={startPt.y}
                  r={phase === 'loading' ? 3 : 10}
                  fill={phase === 'loading' ? '#38C9CE' : 'rgba(56, 201, 206, 0.08)'}
                  style={{
                    filter: phase === 'loading' ? 'drop-shadow(0 0 8px #38C9CE)' : 'none'
                  }}
                  transition={{ duration: 0.15, ease: 'easeOut' }}
                />

                {/* Mid glow */}
                <circle
                  ref={midCircleRef}
                  cx={startPt.x}
                  cy={startPt.y}
                  r="5"
                  fill={phase === 'loading' ? 'transparent' : 'rgba(56, 201, 206, 0.22)'}
                  style={{ transition: 'fill 150ms ease-out' }}
                />

                {/* Core tip */}
                <motion.circle
                  ref={coreCircleRef}
                  cx={startPt.x}
                  cy={startPt.y}
                  r={phase === 'loading' ? 3 : 1.8}
                  fill="#38C9CE"
                  transition={{ duration: 0.15, ease: 'easeOut' }}
                />
              </motion.g>
            )}
          </svg>
        )}
      </div>

      {/* Tagline */}
      {(phase === 'tagline' || phase === 'exit') && (
        <motion.div
          className="tagline"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          Operations &nbsp;&middot;&nbsp; Analytics &nbsp;&middot;&nbsp; AI
        </motion.div>
      )}
    </motion.div>
  );
}
