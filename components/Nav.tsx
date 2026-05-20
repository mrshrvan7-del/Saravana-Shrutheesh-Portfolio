'use client';

const navLinks = [
  { name: 'About', href: '#about' },
  { name: 'Work', href: '#work' },
  { name: 'Skills', href: '#skills' },
];

export default function Nav() {
  return (
    <header className="absolute top-0 inset-x-0 z-50 py-6 bg-transparent">
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
