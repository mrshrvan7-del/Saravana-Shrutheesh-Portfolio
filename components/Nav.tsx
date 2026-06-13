'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { name: 'About', href: '#about', id: 'about' },
  { name: 'Work', href: '#work', id: 'work' },
  { name: 'Skills', href: '#skills', id: 'skills' },
  { name: 'Experience', href: '#experience', id: 'experience' },
  { name: 'Contact', href: '#contact', id: 'contact' },
];

export default function Nav() {
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);

      const sections = ['about', 'work', 'skills', 'experience', 'contact'];
      let current = 'home';

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 140) {
            current = section;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        backgroundColor: scrolled ? 'rgba(255, 255, 255, 0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        boxShadow: scrolled ? '0 1px 0 var(--color-border)' : 'none',
        paddingTop: scrolled ? '12px' : '24px',
        paddingBottom: scrolled ? '12px' : '24px',
        transition: 'padding 0.2s ease, background-color 0.2s ease, border-color 0.2s ease, backdrop-filter 0.2s ease, box-shadow 0.2s ease',
      }}
    >
      <nav className="section-container flex items-center justify-between relative">
        {/* Logo */}
        <a
          href="#"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.4rem',
            color: 'var(--color-text-primary)',
            textDecoration: 'none',
            fontWeight: 400,
            display: 'inline-flex',
            alignItems: 'center',
          }}
        >
          S.
        </a>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.name}
                href={link.href}
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.875rem',
                  color: isActive ? 'var(--color-accent)' : 'var(--color-text-secondary)',
                  textDecoration: 'none',
                  position: 'relative',
                  paddingBottom: '4px',
                  fontWeight: 500,
                  borderBottom: isActive ? '2px solid var(--color-accent)' : '2px solid transparent',
                  transition: 'color 0.2s ease, border-color 0.2s ease',
                }}
              >
                {link.name}
              </a>
            );
          })}
        </div>

        {/* Desktop CTA Button */}
        <div className="hidden md:block">
          <a
            href="#contact"
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.875rem',
              color: 'var(--color-text-primary)',
              textDecoration: 'none',
              fontWeight: 500,
              border: '1.5px solid var(--color-text-primary)',
              borderRadius: '6px',
              padding: '0.45rem 1.1rem',
              backgroundColor: 'transparent',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--color-text-primary)';
              e.currentTarget.style.color = '#FFFFFF';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = 'var(--color-text-primary)';
            }}
          >
            Hire Me &rarr;
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          className="md:hidden flex items-center justify-center p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation menu"
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--color-text-primary)',
            cursor: 'pointer',
          }}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Drawer (Slide down) */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              style={{
                position: 'absolute',
                top: 'calc(100% + 12px)',
                left: '24px',
                right: '24px',
                backgroundColor: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                borderRadius: '8px',
                boxShadow: 'var(--shadow-hover)',
                padding: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.25rem',
                zIndex: 49,
              }}
            >
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.95rem',
                      color: isActive ? 'var(--color-accent)' : 'var(--color-text-secondary)',
                      textDecoration: 'none',
                      fontWeight: 500,
                      paddingBottom: '4px',
                      borderBottom: isActive ? '1px solid var(--color-accent)' : 'none',
                      display: 'block',
                    }}
                  >
                    {link.name}
                  </a>
                );
              })}
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.95rem',
                  color: 'var(--color-text-primary)',
                  textDecoration: 'none',
                  fontWeight: 500,
                  border: '1.5px solid var(--color-text-primary)',
                  borderRadius: '6px',
                  padding: '0.5rem 1rem',
                  textAlign: 'center',
                  display: 'block',
                  marginTop: '0.5rem',
                }}
              >
                Hire Me &rarr;
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
