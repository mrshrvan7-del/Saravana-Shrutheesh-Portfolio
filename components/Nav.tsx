'use client';

import Link from 'next/link';

const navLinks = [
  { name: 'About', href: '/#about' },
  { name: 'Work', href: '/#work' },
  { name: 'Skills', href: '/#skills' },
  { name: 'Experience', href: '/#experience' },
  { name: 'Blog', href: '/blog' },
];

export default function Nav() {
  return (
    <header className="absolute top-0 inset-x-0 z-50 py-6 bg-transparent">
      <nav className="section-container flex items-center justify-between">
        <Link href="/" className="font-playfair text-[26px] font-extrabold text-[#1A1A0A] no-underline" style={{ fontFamily: 'var(--font-playfair)' }}>
          S<span className="text-[#8A7C38]">.</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="mono text-[12px] text-[#3D3A1A] hover:text-[#1A1A0A] transition-colors relative group uppercase tracking-wider font-semibold no-underline"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#1A1A0A] transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </div>

        <a 
          href="mailto:Saravanashrutheesh@gmail.com"
          className="mono text-[12px] uppercase tracking-wider bg-[#8A7C38] hover:bg-[#73672D] text-[#FAF7EC] px-6 py-2.5 rounded-full transition-colors font-semibold flex items-center gap-1.5 shadow-sm no-underline"
        >
          Hire Me <span className="font-sans text-[13px]">→</span>
        </a>
      </nav>
    </header>
  );
}
