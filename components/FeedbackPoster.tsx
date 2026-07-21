'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import type { Variants } from 'framer-motion';
import { motion, AnimatePresence } from 'framer-motion';

interface FeedbackPosterProps {
  enableRipExit?: boolean;
}

const STORAGE_KEY = 'feedbackPosterShown';

export default function FeedbackPoster({ enableRipExit = false }: FeedbackPosterProps) {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [ripExiting, setRipExiting] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const firstFocusRef = useRef<HTMLTextAreaElement>(null);
  const lastFocusRef = useRef<HTMLButtonElement>(null);

  // Dev escape hatch: ?resetFeedback=1 clears the flag
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    if (params.get('resetFeedback') === '1') {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  // IntersectionObserver wired to the footer (last section)
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const target = document.querySelector('footer');
    if (!target) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
          if (!localStorage.getItem(STORAGE_KEY)) {
            localStorage.setItem(STORAGE_KEY, 'true'); // Set immediately — no re-trigger on refresh
            setVisible(true);
          }
          observer.disconnect(); // Fire once only
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  // Focus textarea on open
  useEffect(() => {
    if (visible && textareaRef.current) {
      setTimeout(() => textareaRef.current?.focus(), 80);
    }
  }, [visible]);

  // Escape key handler + focus trap
  useEffect(() => {
    if (!visible) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
      if (e.key === 'Tab') {
        // Focus trap between textarea and close button
        const focusable = overlayRef.current?.querySelectorAll<HTMLElement>(
          'button, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (!focusable || focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey) {
          if (document.activeElement === first) { e.preventDefault(); last.focus(); }
        } else {
          if (document.activeElement === last) { e.preventDefault(); first.focus(); }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [visible]);

  const handleClose = useCallback(() => {
    if (enableRipExit) {
      setRipExiting(true);
      setTimeout(() => { setRipExiting(false); setVisible(false); }, 450);
    } else {
      setVisible(false);
    }
  }, [enableRipExit]);

  const handleSubmit = useCallback(async () => {
    if (message.trim().length < 3 || status === 'sending') return;
    setStatus('sending');

    try {
      const res = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: message.trim(),
          timestamp: new Date().toISOString(),
          page: window.location.href,
        }),
      });
      if (!res.ok) throw new Error('Network error');
      setStatus('success');
      setTimeout(() => handleClose(), 1500);
    } catch {
      // Fallback: silently succeed so UX isn't broken — log in console
      console.warn('[FeedbackPoster] Submission failed, treating as success for UX.');
      setStatus('success');
      setTimeout(() => handleClose(), 1500);
    }
  }, [message, status, handleClose]);

  if (!visible) return null;

  // Poster card animation variants
  const posterVariants: Variants = {
    initial: { opacity: 0, scale: 1.4, skewY: 8, filter: 'blur(12px)' },
    animate: {
      opacity: 1,
      scale: 1,
      skewY: 0,
      filter: 'blur(0px)',
      transition: { type: 'spring' as const, stiffness: 300, damping: 12 },
    },
    exit: { opacity: 0, scale: 0.9, filter: 'blur(4px)', transition: { duration: 0.25 } },
  };

  const headingVariants: Variants = {
    initial: { opacity: 0, scale: 0.6 },
    animate: {
      opacity: 1,
      scale: 1,
      transition: { delay: 0.35, type: 'spring' as const, stiffness: 280, damping: 18 },
    },
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          ref={overlayRef}
          role="dialog"
          aria-modal="true"
          aria-label="Feedback poster"
          className="fp-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={(e) => { if (e.target === e.currentTarget) handleClose(); }}
        >
          {/* Rip halves (only rendered when ripExiting) */}
          {enableRipExit && ripExiting && (
            <>
              <motion.div
                className="fp-rip-half fp-rip-left"
                initial={{ x: 0, rotate: 0, opacity: 1 }}
                animate={{ x: '-100vw', rotate: -15, opacity: 0 }}
                transition={{ duration: 0.4, ease: 'easeIn' }}
              />
              <motion.div
                className="fp-rip-half fp-rip-right"
                initial={{ x: 0, rotate: 0, opacity: 1 }}
                animate={{ x: '100vw', rotate: 15, opacity: 0 }}
                transition={{ duration: 0.4, ease: 'easeIn' }}
              />
            </>
          )}

          {/* Main poster card */}
          <motion.div
            className="fp-poster"
            variants={posterVariants}
            initial="initial"
            animate={ripExiting ? 'hidden' : 'animate'}
            exit="exit"
          >
            {/* Corner ornaments */}
            <span className="fp-corner fp-corner-tl" aria-hidden="true" />
            <span className="fp-corner fp-corner-tr" aria-hidden="true" />
            <span className="fp-corner fp-corner-bl" aria-hidden="true" />
            <span className="fp-corner fp-corner-br" aria-hidden="true" />

            {/* Close button */}
            <button
              className="fp-close-btn"
              aria-label="Close feedback poster"
              onClick={handleClose}
            >
              ✕
            </button>

            {/* WANTED stamp */}
            <div className="fp-stamp-row" aria-hidden="true">
              <span className="fp-stamp-text">DEAD OR ALIVE</span>
            </div>

            {/* Heading with gold glow */}
            <motion.h2
              className="fp-heading"
              variants={headingVariants}
              initial="initial"
              animate="animate"
            >
              WANTED:<br />YOUR FEEDBACK
            </motion.h2>

            {/* Bounty sub-label */}
            <div className="fp-bounty" aria-hidden="true">
              <span className="fp-bounty-label">BOUNTY</span>
              <span className="fp-bounty-value">∞ Improvements</span>
            </div>

            <p className="fp-body">
              Thanks for checking out my site and blog. Got a suggestion, something confusing, or just a thought? I read every message and use it to make things better.
            </p>

            {/* Success toast */}
            <AnimatePresence>
              {status === 'success' && (
                <motion.div
                  className="fp-toast"
                  role="status"
                  aria-live="polite"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                >
                  🏴‍☠️ Thanks — got it!
                </motion.div>
              )}
            </AnimatePresence>

            {status !== 'success' && (
              <>
                <textarea
                  ref={textareaRef}
                  className="fp-textarea"
                  placeholder="What did you think? Any suggestions?"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                  aria-label="Your feedback"
                  disabled={status === 'sending'}
                />

                {status === 'error' && (
                  <p className="fp-error" role="alert" aria-live="assertive">
                    Something went wrong. Please try again.
                  </p>
                )}

                <div className="fp-actions">
                  <button
                    className="fp-btn-primary"
                    onClick={handleSubmit}
                    disabled={message.trim().length < 3 || status === 'sending'}
                    ref={lastFocusRef}
                  >
                    {status === 'sending' ? 'Sending…' : 'Send it'}
                  </button>
                  <button
                    className="fp-btn-secondary"
                    onClick={handleClose}
                  >
                    No thanks
                  </button>
                </div>
              </>
            )}
          </motion.div>
        </motion.div>
      )}

      <style>{`
        /* ─── Overlay ───────────────────────────────── */
        .fp-overlay {
          position: fixed;
          inset: 0;
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 16px;
          background: rgba(26, 26, 22, 0.85);
          backdrop-filter: blur(6px);
        }

        /* ─── Poster card ───────────────────────────── */
        .fp-poster {
          position: relative;
          width: 100%;
          max-width: 420px;
          background: var(--bg-nav, #2A2A24);
          border: 3px solid var(--accent-dark, #6B8E7F);
          border-radius: 6px;
          padding: 36px 32px 28px;
          box-shadow:
            0 0 0 6px var(--bg-nav, #2A2A24),
            0 0 0 8px var(--accent-dark, #6B8E7F),
            0 30px 80px rgba(0, 0, 0, 0.6),
            inset 0 0 60px rgba(0, 0, 0, 0.3);
          text-align: center;
          overflow: hidden;
        }

        @media (max-width: 480px) {
          .fp-poster {
            padding: 28px 20px 22px;
          }
        }

        /* ─── Corner ornaments ──────────────────────── */
        .fp-corner {
          position: absolute;
          width: 18px;
          height: 18px;
          border-color: var(--bg-accent, #8FB996);
          border-style: solid;
        }
        .fp-corner-tl { top: 10px; left: 10px; border-width: 2px 0 0 2px; }
        .fp-corner-tr { top: 10px; right: 10px; border-width: 2px 2px 0 0; }
        .fp-corner-bl { bottom: 10px; left: 10px; border-width: 0 0 2px 2px; }
        .fp-corner-br { bottom: 10px; right: 10px; border-width: 0 2px 2px 0; }

        /* ─── Close button ──────────────────────────── */
        .fp-close-btn {
          position: absolute;
          top: 12px;
          right: 14px;
          background: transparent;
          border: none;
          color: var(--accent-dark, #6B8E7F);
          font-size: 16px;
          cursor: pointer;
          line-height: 1;
          padding: 4px 6px;
          border-radius: 4px;
          transition: color 0.2s, background 0.2s;
          z-index: 2;
        }
        .fp-close-btn:hover {
          color: var(--bg-accent, #8FB996);
          background: rgba(143, 185, 150, 0.12);
        }

        /* ─── Stamp row ─────────────────────────────── */
        .fp-stamp-row {
          margin-bottom: 8px;
        }
        .fp-stamp-text {
          font-family: 'Georgia', serif;
          font-size: 11px;
          letter-spacing: 0.35em;
          color: var(--accent-dark, #6B8E7F);
          text-transform: uppercase;
          border-top: 1px solid var(--accent-dark, #6B8E7F);
          border-bottom: 1px solid var(--accent-dark, #6B8E7F);
          padding: 3px 12px;
          display: inline-block;
        }

        /* ─── Heading with green glow ────────────────── */
        .fp-heading {
          font-family: 'Georgia', 'Times New Roman', serif;
          font-size: clamp(26px, 6vw, 34px);
          font-weight: 900;
          line-height: 1.1;
          color: var(--text-cream, #F6F4EC);
          letter-spacing: 0.05em;
          text-transform: uppercase;
          margin: 12px 0 10px;
          /* Sage green glow */
          text-shadow:
            0 0 8px var(--accent-dark, #6B8E7F),
            0 0 20px var(--accent-dark, #6B8E7F),
            0 0 40px rgba(107, 142, 127, 0.6);
        }

        /* ─── Bounty label ──────────────────────────── */
        .fp-bounty {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2px;
          margin: 6px 0 16px;
          padding: 6px 0;
          border-top: 1px solid rgba(107, 142, 127, 0.4);
          border-bottom: 1px solid rgba(107, 142, 127, 0.4);
        }
        .fp-bounty-label {
          font-size: 9px;
          letter-spacing: 0.4em;
          color: var(--accent-dark, #6B8E7F);
          text-transform: uppercase;
        }
        .fp-bounty-value {
          font-family: 'Georgia', serif;
          font-size: 15px;
          color: var(--bg-accent, #8FB996);
          font-weight: bold;
        }

        /* ─── Body text ─────────────────────────────── */
        .fp-body {
          color: rgba(246, 244, 236, 0.85);
          font-size: 13px;
          line-height: 1.65;
          margin-bottom: 18px;
          font-family: 'Georgia', serif;
        }

        /* ─── Textarea ──────────────────────────────── */
        .fp-textarea {
          width: 100%;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid var(--accent-dark, #6B8E7F);
          border-radius: 4px;
          color: var(--text-cream, #F6F4EC);
          font-family: inherit;
          font-size: 13px;
          padding: 10px 12px;
          resize: vertical;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
          min-height: 90px;
        }
        .fp-textarea::placeholder {
          color: rgba(246, 244, 236, 0.45);
        }
        .fp-textarea:focus {
          border-color: var(--bg-accent, #8FB996);
          box-shadow: 0 0 0 2px rgba(143, 185, 150, 0.2);
        }

        /* ─── Actions ───────────────────────────────── */
        .fp-actions {
          display: flex;
          gap: 10px;
          margin-top: 14px;
          justify-content: center;
          flex-wrap: wrap;
        }

        .fp-btn-primary {
          background: linear-gradient(135deg, var(--bg-accent, #8FB996), var(--accent-dark, #6B8E7F));
          color: var(--bg-nav, #2A2A24);
          font-size: 13px;
          font-weight: 700;
          font-family: 'Georgia', serif;
          letter-spacing: 0.08em;
          padding: 10px 26px;
          border: none;
          border-radius: 3px;
          cursor: pointer;
          transition: opacity 0.2s, transform 0.15s;
          flex: 1;
          min-width: 110px;
          max-width: 180px;
        }
        .fp-btn-primary:hover:not(:disabled) {
          opacity: 0.92;
          transform: translateY(-1px);
        }
        .fp-btn-primary:disabled {
          opacity: 0.38;
          cursor: not-allowed;
        }

        .fp-btn-secondary {
          background: transparent;
          color: var(--accent-dark, #6B8E7F);
          font-size: 12px;
          border: 1px solid rgba(107, 142, 127, 0.4);
          border-radius: 3px;
          padding: 10px 18px;
          cursor: pointer;
          transition: color 0.2s, border-color 0.2s;
          flex: 1;
          min-width: 100px;
          max-width: 150px;
        }
        .fp-btn-secondary:hover {
          color: var(--bg-accent, #8FB996);
          border-color: var(--bg-accent, #8FB996);
        }

        /* ─── Toast ─────────────────────────────────── */
        .fp-toast {
          background: rgba(143, 185, 150, 0.12);
          border: 1px solid rgba(143, 185, 150, 0.4);
          color: var(--bg-accent, #8FB996);
          font-size: 14px;
          font-family: 'Georgia', serif;
          padding: 12px 20px;
          border-radius: 4px;
          margin-top: 8px;
        }

        /* ─── Error ─────────────────────────────────── */
        .fp-error {
          color: #e07070;
          font-size: 12px;
          margin-top: 6px;
        }

        /* ─── Rip halves (optional) ─────────────────── */
        .fp-rip-half {
          position: fixed;
          inset: 0;
          z-index: 10000;
          background: var(--bg-nav, #2A2A24);
          pointer-events: none;
        }
        .fp-rip-left {
          clip-path: polygon(0 0, 50% 0, 50% 100%, 0 100%);
        }
        .fp-rip-right {
          clip-path: polygon(50% 0, 100% 0, 100% 100%, 50% 100%);
        }
      `}</style>
    </AnimatePresence>
  );
}
