'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, X, Sparkles } from 'lucide-react';

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

  // Auto dismiss after 7 seconds
  useEffect(() => {
    if (!visible) return;
    const timer = setTimeout(() => {
      setVisible(false);
    }, 7000);
    return () => clearTimeout(timer);
  }, [visible]);

  if (!visible || count === null) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed bottom-6 right-6 z-40 max-w-sm w-[calc(100vw-3rem)]"
          initial={{ opacity: 0, y: 40, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 350, damping: 22 }}
        >
          <div className="relative bg-[var(--bg-nav)] text-[var(--text-cream)] p-4 sm:p-5 rounded-2xl border-2 border-[var(--accent-dark)] shadow-[0_20px_50px_rgba(0,0,0,0.35)] backdrop-blur-md overflow-hidden">
            
            {/* Top accent glow line */}
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[var(--accent-dark)] via-[var(--bg-accent)] to-[var(--accent-dark)]" />

            {/* Close button */}
            <button
              onClick={() => setVisible(false)}
              className="absolute top-3 right-3 text-[var(--text-cream)]/50 hover:text-[var(--text-cream)] bg-transparent border-0 cursor-pointer p-1 rounded-full hover:bg-[var(--text-cream)]/10 transition-all"
              aria-label="Close notification"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-start gap-3.5 pr-6">
              <div className="w-10 h-10 rounded-xl bg-[var(--bg-accent)]/15 border border-[var(--bg-accent)]/30 flex items-center justify-center text-[var(--bg-accent)] shrink-0 mt-0.5">
                <Sparkles className="w-5 h-5 animate-pulse" />
              </div>

              <div className="flex flex-col">
                <span className="text-[11px] font-mono font-bold tracking-widest text-[var(--bg-accent)] uppercase mb-1 flex items-center gap-1">
                  <Zap className="w-3 h-3 inline-block" /> Welcome Visitor
                </span>
                <p className="text-[13.5px] leading-snug font-sans text-[var(--text-cream)]/90">
                  You are the <span className="font-extrabold text-[var(--bg-accent)] underline decoration-[var(--bg-accent)]/40 underline-offset-2">{getOrdinalSuffix(count)}</span> visitor to this website. Thank you for stopping by!
                </p>
              </div>
            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
