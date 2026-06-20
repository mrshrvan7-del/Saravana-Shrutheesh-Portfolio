'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const navLinks = [
  { name: 'About', href: '/#about' },
  { name: 'Work', href: '/#work' },
  { name: 'Skills', href: '/#skills' },
  { name: 'Experience', href: '/#experience' },
  { name: 'Blog', href: '/blog' },
];

export default function Nav() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'py-4 bg-[var(--bg-page)]/90 backdrop-blur-md shadow-sm' 
        : 'py-6 bg-transparent'
    }`}>
      <nav className="section-container flex items-center justify-between">
        <Link href="/" className="font-playfair text-[26px] font-extrabold text-[var(--text-primary)] no-underline" style={{ fontFamily: 'var(--font-playfair)' }}>
          S<span className="text-[var(--accent-dark)]">.</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="mono text-[12px] text-[var(--text-body)] hover:text-[var(--text-primary)] transition-colors relative group uppercase tracking-wider font-semibold no-underline"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[var(--text-primary)] transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </div>

        <a 
          href="mailto:Saravanashrutheesh@gmail.com"
          className="mono text-[12px] uppercase tracking-wider text-[var(--text-cream)] px-6 py-2.5 rounded-full transition-opacity hover:opacity-90 font-semibold flex items-center gap-1.5 shadow-sm no-underline"
          style={{ background: 'linear-gradient(135deg, #6B8E7F 0%, #8FB996 50%, #A8C9B3 100%)' }}
        >
          Hire Me <span className="font-sans text-[13px]">→</span>
        </a>
      </nav>

      {/* Bottom Gradient Accent Line (revealed on scroll) */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#6B8E7F] via-[#8FB996] to-[#A8C9B3] transition-all duration-300 origin-left"
        style={{
          opacity: isScrolled ? 1 : 0,
          transform: isScrolled ? 'scaleX(1)' : 'scaleX(0)',
        }}
      />
    </header>
  );
}
