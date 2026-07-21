'use client';

import { useEffect, useState } from 'react';
import { Zap } from 'lucide-react';

export default function VisitorCounter() {
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

  return (
    <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[var(--text-cream)]/10 border border-[var(--text-cream)]/15 rounded-full text-[11px] font-mono text-[var(--text-cream)]/80 tracking-wide select-none">
      <Zap className="w-3 h-3 text-[var(--bg-accent)] animate-pulse shrink-0" />
      <span>{count.toLocaleString()} Total Visits</span>
    </div>
  );
}
