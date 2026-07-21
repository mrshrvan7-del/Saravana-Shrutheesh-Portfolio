'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, X, Sparkles, ArrowRight } from 'lucide-react';

function getOrdinalSuffix(n: number): string {
  const s = ['th', 'st', 'nd', 'rd'];
  const v = n % 100;
  return n.toLocaleString() + (s[(v - 20) % 10] || s[v] || s[0]);
}

export default function VisitorPopup() {
  const [count, setCount] = useState<number | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Only show popup once per browser session
    if (sessionStorage.getItem('visitor_popup_shown')) return;

    let isMounted = true;

    async function fetchVisitorCount() {
      try {
        const hasVisitedSession = sessionStorage.getItem('portfolio_visited');
        const action = hasVisitedSession ? 'fetch' : 'increment';

        const res = await fetch('/api/visit', {
          method: action === 'increment' ? 'POST' : 'GET',
          headers: action === 'increment' ? { 'Content-Type': 'application/json' } : undefined,
          body: action === 'increment' ? JSON.stringify({ action: 'increment' }) : undefined,
        });

        if (res.ok) {
          const data = await res.json();
          if (isMounted && typeof data.count === 'number') {
            setCount(data.count);
            if (!hasVisitedSession) {
              sessionStorage.setItem('portfolio_visited', 'true');
            }
            // Small delay after splash screen fade for maximum impact
            setTimeout(() => {
              if (isMounted) {
                setVisible(true);
                sessionStorage.setItem('visitor_popup_shown', 'true');
              }
            }, 600);
          }
        }
      } catch {
        // Silently ignore network errors
      }
    }

    fetchVisitorCount();

    return () => {
      isMounted = false;
    };
  }, []);

  // Auto dismiss after 8 seconds
  useEffect(() => {
    if (!visible) return;
    const timer = setTimeout(() => {
      setVisible(false);
    }, 8000);
    return () => clearTimeout(timer);
  }, [visible]);

  if (!visible || count === null) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={(e) => { if (e.target === e.currentTarget) setVisible(false); }}
        >
          <motion.div
            className="relative w-full max-w-md bg-[var(--bg-nav)] text-[var(--text-cream)] p-6 sm:p-8 rounded-3xl border-2 border-[var(--accent-dark)] shadow-[0_25px_70px_rgba(0,0,0,0.6)] text-center overflow-hidden"
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            transition={{ type: 'spring', stiffness: 300, damping: 22 }}
          >
            {/* Top glowing accent bar */}
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[var(--accent-dark)] via-[var(--bg-accent)] to-[var(--accent-dark)]" />

            {/* Corner close button */}
            <button
              onClick={() => setVisible(false)}
              className="absolute top-4 right-4 text-[var(--text-cream)]/50 hover:text-[var(--text-cream)] bg-transparent border-0 cursor-pointer p-1.5 rounded-full hover:bg-[var(--text-cream)]/10 transition-all"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Glowing Icon Badge */}
            <div className="w-14 h-14 rounded-2xl bg-[var(--bg-accent)]/15 border border-[var(--bg-accent)]/30 flex items-center justify-center text-[var(--bg-accent)] mx-auto mb-4 shadow-inner">
              <Sparkles className="w-7 h-7 animate-pulse" />
            </div>

            {/* Sub-label */}
            <div className="inline-flex items-center gap-1.5 text-[11px] font-mono font-bold tracking-widest text-[var(--bg-accent)] uppercase mb-2">
              <Zap className="w-3.5 h-3.5" /> Welcome Visitor
            </div>

            {/* Hero Number Display */}
            <div className="my-4 py-4 px-6 bg-[var(--text-cream)]/5 border border-[var(--text-cream)]/10 rounded-2xl flex flex-col items-center justify-center shadow-inner">
              <span className="text-[11px] font-mono tracking-widest text-[var(--text-cream)]/50 uppercase">YOU ARE OUR</span>
              <span className="text-[40px] sm:text-[48px] font-display font-extrabold text-[var(--bg-accent)] leading-tight my-0.5 tracking-tight drop-shadow-sm">
                {getOrdinalSuffix(count)}
              </span>
              <span className="text-[12px] font-mono text-[var(--text-cream)]/70 tracking-wider">VISITOR TO THIS WEBSITE</span>
            </div>

            {/* Body Text */}
            <p className="text-[14px] leading-relaxed text-[var(--text-cream)]/80 mb-6 font-sans">
              Thank you for stopping by! I hope you enjoy exploring my work, operational insights, and projects.
            </p>

            {/* Primary Action Button */}
            <button
              onClick={() => setVisible(false)}
              className="w-full py-3.5 px-6 rounded-xl font-mono text-[13px] font-bold text-[var(--bg-nav)] tracking-wider uppercase flex items-center justify-center gap-2 cursor-pointer transition-all hover:opacity-95 transform hover:-translate-y-0.5 shadow-md border-0"
              style={{ background: 'linear-gradient(135deg, #6B8E7F 0%, #8FB996 50%, #A8C9B3 100%)' }}
            >
              <span>Explore Portfolio</span>
              <ArrowRight className="w-4 h-4" />
            </button>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
