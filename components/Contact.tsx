'use client';
import { useEffect, useRef, useState } from 'react';

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const [copied, setCopied] = useState(false);
  const email = "saravana@domain.com";

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = sectionRef.current?.querySelectorAll('.animate-on-scroll');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const handleCopy = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <section id="contact" className="section-container section-padding pb-32" ref={sectionRef}>
        <h2 className="section-heading animate-on-scroll fade-up">contact.</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          <div className="w-full aspect-square bg-[var(--bg-card)] rounded-sm relative overflow-hidden animate-on-scroll fade-up" style={{ transitionDelay: '150ms' }}>
            <div className="absolute inset-0 opacity-20" style={{
              backgroundImage: 'linear-gradient(var(--text-primary) 1px, transparent 1px), linear-gradient(90deg, var(--text-primary) 1px, transparent 1px)',
              backgroundSize: '32px 32px'
            }} />
          </div>

          <div className="flex flex-col animate-on-scroll fade-up" style={{ transitionDelay: '300ms' }}>
            <p className="text-[15px] mb-8 leading-relaxed max-w-sm">
              Ready to elevate your operational efficiency? Let&apos;s connect and discuss how data can transform your workflow.
            </p>

            <div className="flex flex-col gap-4">
              <a 
                href={`mailto:${email}`} 
                onClick={handleCopy}
                className="group flex items-center text-[14px] text-[var(--text-body)] w-fit"
              >
                <span className="group-hover:underline underline-offset-4 decoration-1">{copied ? 'Copied!' : email}</span>
                <span className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200 inline-block ml-1">→</span>
              </a>
              
              <a 
                href="https://linkedin.com/in/saravanashrutheesh" 
                target="_blank" 
                rel="noreferrer"
                className="group flex items-center text-[14px] text-[var(--text-body)] w-fit"
              >
                <span className="group-hover:underline underline-offset-4 decoration-1">linkedin.com/in/saravanashrutheesh</span>
                <span className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200 inline-block ml-1">→</span>
              </a>

              <a 
                href="https://github.com/saravanashrutheesh" 
                target="_blank" 
                rel="noreferrer"
                className="group flex items-center text-[14px] text-[var(--text-body)] w-fit"
              >
                <span className="group-hover:underline underline-offset-4 decoration-1">github.com/saravanashrutheesh</span>
                <span className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200 inline-block ml-1">→</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-[var(--bg-nav)] py-8">
        <div className="section-container flex flex-col md:flex-row justify-between items-center gap-4 text-[12px] text-[var(--bg-page)] opacity-50">
          <p>© 2026 Saravana Shrutheesh · Bengaluru, India</p>
          <p>Built with intent. Open to opportunities.</p>
        </div>
      </footer>
    </>
  );
}
