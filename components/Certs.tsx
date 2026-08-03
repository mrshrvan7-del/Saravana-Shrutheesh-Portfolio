'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Award, GraduationCap, Sparkles } from 'lucide-react';

interface Credential {
  year: string;
  title: string;
  issuer: string;
  description?: string;
}

const certificationsList: Credential[] = [
  { year: '2025', title: 'Google Prompting Essentials', issuer: 'Google' },
  { year: '2025', title: 'Use AI as a Creative or Expert Partner', issuer: 'Google' },
  { year: '2024', title: 'Google Advanced Data Analytics', issuer: 'Google' },
  { year: '2024', title: 'Microsoft Power BI Data Analyst', issuer: 'Microsoft' },
  { year: '2023', title: 'Google Data Analytics Professional', issuer: 'Google' }
];

const leadershipList: Credential[] = [
  { 
    year: '2026–27', 
    title: 'Director of Web & Tech, Rotaract Club', 
    issuer: 'Rotaract Club',
    description: 'Currently leading digital transformations, web engineering projects, and tech infrastructure for community initiatives.'
  },
  { 
    year: '2024–25', 
    title: 'Director, Rotaract Club', 
    issuer: 'Rotaract Club',
    description: 'Led community initiatives and organized large-scale events, demonstrating strong project management.' 
  },
  { 
    year: 'Award', 
    title: 'Runner-up, College Hackathon', 
    issuer: 'Hackathon',
    description: 'Recognized for developing an innovative and highly effective Business Intelligence dashboard under tight deadlines.' 
  }
];

function CredentialCard({ cred, showDesc = false }: { cred: Credential; showDesc?: boolean }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth out mouse tracking with springs for butter-smooth physical response
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { damping: 22, stiffness: 220 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { damping: 22, stiffness: 220 });

  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Normalize coordinates to -0.5 to 0.5 range
    const mouseX = (e.clientX - rect.left) / width - 0.5;
    const mouseY = (e.clientY - rect.top) / height - 0.5;
    
    x.set(mouseX);
    y.set(mouseY);
    setCoords({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="clay-card relative p-6 flex flex-col justify-between min-h-[160px] cursor-pointer"
    >
      {/* Dynamic light spotlight following cursor */}
      {isHovered && (
        <div 
          className="absolute inset-0 pointer-events-none rounded-[28px] overflow-hidden"
          style={{
            background: `radial-gradient(circle 140px at ${coords.x}px ${coords.y}px, rgba(255, 255, 255, 0.35), transparent)`,
            mixBlendMode: 'overlay',
            zIndex: 1,
          }}
        />
      )}

      {/* Floating card content */}
      <div 
        style={{ transform: 'translateZ(15px)', transformStyle: 'preserve-3d' }} 
        className="relative z-10 flex flex-col h-full justify-between"
      >
        <div className="flex flex-col">
          <div className="flex items-center justify-between mb-3">
            <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-[var(--accent-dark)] bg-[var(--text-primary)]/5 px-2.5 py-1 rounded-md">
              {cred.year}
            </span>
            {cred.year === 'Award' ? (
              <Award className="w-4 h-4 text-amber-600" />
            ) : showDesc ? (
              <GraduationCap className="w-4 h-4 text-[var(--accent-dark)]" />
            ) : (
              <Sparkles className="w-3.5 h-3.5 text-[var(--accent-dark)]/60" />
            )}
          </div>

          <h4 className="font-sans font-bold text-[15px] text-[var(--text-primary)] leading-snug mb-1">
            {cred.title}
          </h4>
          
          <span className="text-[11px] font-mono text-[var(--text-muted)] font-semibold uppercase tracking-wider">
            {cred.issuer}
          </span>
        </div>

        {showDesc && cred.description && (
          <p 
            style={{ transform: 'translateZ(5px)' }} 
            className="text-[13px] leading-relaxed text-[var(--text-muted)] mt-4 font-sans font-medium"
          >
            {cred.description}
          </p>
        )}
      </div>
    </motion.div>
  );
}

export default function Certs() {
  const sectionRef = useRef<HTMLDivElement>(null);

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

  return (
    <section id="certifications" className="section-container section-padding" ref={sectionRef}>
      <h2 className="section-heading animate-on-scroll fade-up">credentials.</h2>
      
      {/* Certifications Section */}
      <div className="mb-16">
        <h3 className="section-heading credentials-column-title mb-6 animate-on-scroll fade-up">certifications.</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-on-scroll fade-up">
          {certificationsList.map((cert, index) => (
            <CredentialCard key={index} cred={cert} />
          ))}
        </div>
      </div>

      {/* Leadership Section */}
      <div>
        <h3 className="section-heading credentials-column-title mb-6 animate-on-scroll fade-up">leadership.</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-on-scroll fade-up">
          {leadershipList.map((lead, index) => (
            <CredentialCard key={index} cred={lead} showDesc={true} />
          ))}
        </div>
      </div>
    </section>
  );
}
