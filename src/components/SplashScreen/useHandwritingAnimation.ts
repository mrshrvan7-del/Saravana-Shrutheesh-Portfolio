import { useState, useRef, useEffect } from 'react';
import { SignaturePath } from './signaturePaths';

export function useHandwritingAnimation(
  paths: SignaturePath[],
  pathRefs: React.RefObject<(SVGPathElement | null)[]>,
  outerCircleRef: React.RefObject<SVGCircleElement | null>,
  midCircleRef: React.RefObject<SVGCircleElement | null>,
  coreCircleRef: React.RefObject<SVGCircleElement | null>,
  active: boolean
) {
  const [isComplete, setIsComplete] = useState(false);
  const [currentStrokeIndex, setCurrentStrokeIndex] = useState(0);

  const startTimeRef = useRef<number | null>(null);
  const strokeStartTimeRef = useRef<number | null>(null);
  const currentStrokeIndexRef = useRef(0);
  const progressRef = useRef(0);
  const penPositionRef = useRef({ x: 0, y: 0 });

  const pathsRef = useRef(paths);
  pathsRef.current = paths;

  useEffect(() => {
    if (!active || isComplete) return;

    let frameId: number;
    let cancelled = false;

    // Reset refs on start/restart
    startTimeRef.current = null;
    strokeStartTimeRef.current = null;
    currentStrokeIndexRef.current = 0;

    const loop = (timestamp: number) => {
      if (cancelled) return;

      if (startTimeRef.current === null) {
        startTimeRef.current = timestamp;
        strokeStartTimeRef.current = timestamp;
        currentStrokeIndexRef.current = 0;

        // Initialize all paths as invisible
        pathRefs.current?.forEach((pathEl, idx) => {
          if (pathEl) {
            const len = pathsRef.current[idx].length;
            pathEl.style.strokeDasharray = `${len} ${len}`;
            pathEl.style.strokeDashoffset = `${len}`;
          }
        });
      }

      const currentIndex = currentStrokeIndexRef.current;
      if (currentIndex >= pathsRef.current.length) {
        setIsComplete(true);
        return;
      }

      const currentStroke = pathsRef.current[currentIndex];
      const strokeElapsed = timestamp - strokeStartTimeRef.current!;
      
      const duration = currentStroke.duration;
      let rawProgress = strokeElapsed / duration;
      if (rawProgress > 1) rawProgress = 1;

      const isCurve = currentStroke.type === 'curve';
      const t = rawProgress;
      let easedProgress = 0;
      if (isCurve) {
        easedProgress = t < 0.1
          ? 5 * t * t
          : t > 0.8
          ? 1 - 2 * (1 - t) * (1 - t)
          : 0.05 + 0.9 * Math.sin(((t - 0.1) / 0.7) * (Math.PI / 2));
      } else {
        easedProgress = t < 0.1
          ? 5 * t * t
          : t > 0.8
          ? 1 - 2 * (1 - t) * (1 - t)
          : 0.05 + 0.9 * ((t - 0.1) / 0.7);
      }

      progressRef.current = easedProgress;

      // Update current path offset in DOM
      const pathEl = pathRefs.current?.[currentIndex];
      if (pathEl) {
        const len = currentStroke.length;
        pathEl.style.strokeDashoffset = `${len * (1 - easedProgress)}`;
        pathEl.setAttribute('stroke', 'url(#inkGradient)');

        // Get pen position along the path
        try {
          const point = pathEl.getPointAtLength(easedProgress * len);
          if (point) {
            penPositionRef.current = { x: point.x, y: point.y };
            outerCircleRef.current?.setAttribute('cx', point.x.toFixed(2));
            outerCircleRef.current?.setAttribute('cy', point.y.toFixed(2));
            midCircleRef.current?.setAttribute('cx', point.x.toFixed(2));
            midCircleRef.current?.setAttribute('cy', point.y.toFixed(2));
            coreCircleRef.current?.setAttribute('cx', point.x.toFixed(2));
            coreCircleRef.current?.setAttribute('cy', point.y.toFixed(2));
          }
        } catch (e) {
          // SVG getPointAtLength could throw if element is unmounting
        }
      }

      // Transition to next stroke
      if (rawProgress >= 1) {
        if (pathEl) {
          pathEl.style.strokeDashoffset = '0';
          pathEl.setAttribute('stroke', '#1A1A0A'); // Wet ink color (Luxury Gold primary text)
        }

        const nextIndex = currentIndex + 1;
        currentStrokeIndexRef.current = nextIndex;
        strokeStartTimeRef.current = timestamp;

        setCurrentStrokeIndex(nextIndex);
      }

      frameId = requestAnimationFrame(loop);
    };

    frameId = requestAnimationFrame(loop);

    return () => {
      cancelled = true;
      cancelAnimationFrame(frameId);
    };
  }, [active, isComplete, pathRefs, outerCircleRef, midCircleRef, coreCircleRef]);

  return {
    currentStrokeIndex,
    progress: progressRef.current,
    penPosition: penPositionRef.current,
    isComplete,
  };
}
