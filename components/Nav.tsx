'use client';
import { useState, useEffect } from 'react';

const navLinks = [
  { name: 'About', href: '#about' },
  { name: 'Work', href: '#work' },
  { name: 'Skills', href: '#skills' },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      setScrolled(currentScrollY > 50);

      // Hide on scroll down, show on scroll up
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setHidden(true);
      } else {
        setHidden(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        hidden ? '-translate-y-full' : 'translate-y-0'
      } ${
        scrolled ? 'bg-[var(--bg-page)] py-4 shadow-sm' : 'bg-transparent py-6'
      }`}
    >
      <nav className="section-container flex items-center justify-between">
        <a href="#" className="font-playfair text-[24px] font-bold text-[var(--text-primary)]" style={{ fontFamily: 'var(--font-playfair)' }}>
          S.
        </a>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="mono text-[12px] text-[var(--text-body)] hover:text-[var(--text-primary)] transition-colors relative group uppercase tracking-wider"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[var(--text-primary)] transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>

        <a 
          href="#contact"
          className="mono text-[12px] uppercase tracking-wider bg-[var(--bg-nav)] text-[var(--bg-page)] px-5 py-2.5 rounded-full hover:bg-[var(--text-primary)] transition-colors"
        >
          Hire Me
        </a>
      </nav>
    </header>
  );
}
