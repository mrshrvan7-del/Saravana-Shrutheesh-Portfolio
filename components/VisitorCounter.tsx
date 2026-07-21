'use client';

import { useEffect, useState } from 'react';
import { Zap } from 'lucide-react';

interface VisitorCounterProps {
  variant?: 'hero' | 'footer';
}

export default function VisitorCounter({ variant = 'footer' }: VisitorCounterProps) {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function handleVisit() {
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
          }
        }
      } catch {
        // Silently ignore network errors so UX remains flawless
      }
    }

    handleVisit();

    return () => {
      isMounted = false;
    };
  }, []);

  if (count === null) return null;

  if (variant === 'hero') {
    return (
      <div className="flex items-center gap-1.5 bg-[var(--text-primary)]/5 border border-[var(--text-primary)]/10 px-3 py-1.5 rounded-md font-bold text-[11px] text-[var(--text-primary)] tracking-wider uppercase shadow-xs">
        <Zap className="w-3.5 h-3.5 text-[var(--accent-dark)] animate-pulse shrink-0" />
        <span>{count.toLocaleString()} VISITS</span>
      </div>
    );
  }

  return (
    <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[var(--text-cream)]/15 border border-[var(--text-cream)]/30 rounded-full text-[12px] font-mono text-[var(--text-cream)] font-bold tracking-wide select-none shadow-sm">
      <Zap className="w-3.5 h-3.5 text-[var(--bg-accent)] animate-pulse shrink-0" />
      <span>{count.toLocaleString()} Total Visits</span>
    </div>
  );
}
