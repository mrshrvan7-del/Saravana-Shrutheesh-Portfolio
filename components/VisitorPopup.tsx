'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight } from 'lucide-react';

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

  // Auto dismiss after 10 seconds
  useEffect(() => {
    if (!visible) return;
    const timer = setTimeout(() => {
      setVisible(false);
    }, 10000);
    return () => clearTimeout(timer);
  }, [visible]);

  if (!visible || count === null) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1A1A16]/20 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={(e) => { if (e.target === e.currentTarget) setVisible(false); }}
        >
          <motion.div
            className="relative w-full max-w-[420px] bg-[#F6F4EC] text-[#1A1A16] p-7 sm:p-9 rounded-[32px] border border-[#2A2A24]/10 shadow-[0_30px_80px_-15px_rgba(42,42,36,0.25)] overflow-hidden"
            initial={{ opacity: 0, scale: 0.94, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 10 }}
            transition={{ type: 'spring', stiffness: 350, damping: 24 }}
          >
            {/* Top clean accent line in theme sage */}
            <div className="absolute top-0 left-0 right-0 h-[4px] bg-[#6B8E7F]" />

            {/* Clean top-right close button */}
            <button
              onClick={() => setVisible(false)}
              className="absolute top-5 right-5 text-[#2A2A24]/40 hover:text-[#2A2A24] bg-transparent border-0 cursor-pointer p-1 rounded-full hover:bg-[#2A2A24]/5 transition-all"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Editorial Heading */}
            <div className="text-left space-y-4 font-sans text-[#1A1A16]">
              <h3 className="font-display font-extrabold text-[34px] sm:text-[38px] tracking-tight leading-none text-[#1A1A16]">
                Welcome.
              </h3>
              
              <p className="text-[15.5px] leading-relaxed text-[#2A2A24] font-medium pt-2">
                You are the <span className="font-display font-extrabold text-[28px] sm:text-[32px] text-[#6B8E7F] mx-0.5 align-middle select-all">{getOrdinalSuffix(count)}</span> visitor to my space.
              </p>
              
              <p className="text-[13.5px] leading-relaxed text-[#6B7280] pb-2 font-medium">
                Thank you for taking the time to visit. I design operational systems, data models, and business intelligence pipelines. I hope you find something interesting.
              </p>
            </div>

            {/* Sleek human-designed action button */}
            <button
              onClick={() => setVisible(false)}
              className="w-full py-3.5 px-6 rounded-xl font-sans font-bold text-[13.5px] text-[#F6F4EC] bg-[#2A2A24] hover:bg-[#3D3D35] tracking-wide flex items-center justify-center gap-2 cursor-pointer transition-all hover:opacity-95 transform hover:-translate-y-0.5 shadow-[0_4px_12px_rgba(42,42,36,0.15)] border-0"
            >
              <span>Explore work</span>
              <ArrowRight className="w-4 h-4" />
            </button>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
