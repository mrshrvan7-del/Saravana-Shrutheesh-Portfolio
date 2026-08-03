'use client';
import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface SkillChip {
  name: string;
  detail: string;
}

interface BentoCard {
  id: string;
  meta: string;
  title: string;
  defaultDescription: string;
  category: string;
  sizeClass: string;
  extraClass?: string;
  bgClass: string;
  chips: SkillChip[];
  icon: React.ReactNode;
}

const filterOptions = [
  { label: 'All', value: 'all' },
  { label: 'Operations', value: 'operations' },
  { label: 'Analytics', value: 'analytics' },
  { label: 'AI & Tech', value: 'ai' },
  { label: 'Office Suite', value: 'office' },
  { label: 'Languages & DB', value: 'technical' },
];

function BentoCardItem({
  card,
  cardStyle,
  hoveredDetails,
  setHoveredDetails
}: {
  card: BentoCard;
  cardStyle: React.CSSProperties;
  hoveredDetails: Record<string, string>;
  setHoveredDetails: React.Dispatch<React.SetStateAction<Record<string, string>>>;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Subtle 3D tilt (max 6 degrees) to ensure interactive chips remain easy to target
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [6, -6]), { damping: 22, stiffness: 220 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-6, 6]), { damping: 22, stiffness: 220 });

  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
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

  const activeDetail = hoveredDetails[card.id];

  return (
    <motion.div
      style={{
        ...cardStyle,
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className={`bento-item ${card.sizeClass} ${card.extraClass || ''} ${card.bgClass} cursor-pointer`}
    >
      {/* Dynamic light spotlight following cursor */}
      {isHovered && (
        <div 
          className="absolute inset-0 pointer-events-none rounded-[28px] overflow-hidden"
          style={{
            background: `radial-gradient(circle 200px at ${coords.x}px ${coords.y}px, rgba(255, 255, 255, 0.35), transparent)`,
            mixBlendMode: 'overlay',
            zIndex: 1,
          }}
        />
      )}

      {/* Floating metadata & icon header */}
      <div 
        style={{ transform: 'translateZ(15px)' }} 
        className="bento-card-header relative z-10"
      >
        <span className="bento-meta">{card.meta}</span>
        {card.icon}
      </div>

      {/* Floating text description */}
      <div 
        style={{ transform: 'translateZ(25px)', transformStyle: 'preserve-3d' }} 
        className="bento-card-body relative z-10"
      >
        <h3 className="bento-title">{card.title}</h3>
        <p className="bento-desc">
          {activeDetail ? (
            <>
              <strong>{activeDetail.split(':')[0]}:</strong>
              {activeDetail.split(':').slice(1).join(':')}
            </>
          ) : (
            card.defaultDescription
          )}
        </p>
      </div>

      {/* Floating interactive chips */}
      <div 
        style={{ transform: 'translateZ(10px)' }} 
        className="bento-chips relative z-10"
      >
        {card.chips.map((chip) => (
          <span
            key={chip.name}
            className="bento-chip"
            onMouseEnter={() => setHoveredDetails(prev => ({
              ...prev,
              [card.id]: `${chip.name}: ${chip.detail}`
            }))}
            onMouseLeave={() => setHoveredDetails(prev => {
              const updated = { ...prev };
              delete updated[card.id];
              return updated;
            })}
          >
            <span className="chip-indicator"></span>
            {chip.name}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

export default function Skills() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [hoveredDetails, setHoveredDetails] = useState<Record<string, string>>({});

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

  const bentoCards: BentoCard[] = [
    {
      id: 'ops',
      meta: '01 / Process & Systems',
      title: 'Ops & Governance',
      defaultDescription: 'Designing root cause frameworks, conducting user acceptance testing (UAT), documenting standard operating procedures, and managing ticket queues.',
      category: 'operations',
      sizeClass: 'bento-item-large-1',
      bgClass: 'bento-item-ops',
      chips: [
        { name: 'Root Cause Analysis', detail: 'Investigating operational failures, identifying systemic bottlenecks, and implementing corrective actions.' },
        { name: 'UAT Testing', detail: 'Designing test cases, coordinating user acceptance testing, and validating product features before launch.' },
        { name: 'JIRA', detail: 'Tracking tasks, managing sprint backlogs, and organizing ticket workflows for cross-functional teams.' },
        { name: 'ServiceNow', detail: 'Handling incident queues, managing service requests, and maintaining SLA compliance.' },
        { name: 'Process Documentation', detail: 'Drafting standard operating procedures (SOPs), flowcharts, and operational handbooks.' },
        { name: 'Change Governance', detail: 'Structuring change requests, assessing risk impacts, and managing stakeholder approvals.' }
      ],
      icon: (
        <svg className="bento-icon" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="6" height="6" rx="1"></rect>
          <rect x="15" y="15" width="6" height="6" rx="1"></rect>
          <path d="M9 6h6a2 2 0 0 1 2 2v7"></path>
          <path d="M8 12h8"></path>
        </svg>
      )
    },
    {
      id: 'analytics',
      meta: '02 / Analytics & Reporting',
      title: 'Core Analytics',
      defaultDescription: 'Building interactive telemetry dashboards, corporate reporting structures, and data aggregation frameworks to drive daily decision-making.',
      category: 'analytics',
      sizeClass: 'bento-item-tall',
      bgClass: 'bento-item-analytics',
      chips: [
        { name: 'Power BI', detail: 'Designing interactive dashboards, data pipelines, and executive reporting views.' },
        { name: 'Advanced Excel', detail: 'Building complex financial models, pivot tables, nested formulas, and macros.' },
        { name: 'Google Data Studio', detail: 'Creating visual reports and marketing dashboards integrated with cloud data sources.' },
        { name: 'BigQuery', detail: 'Writing optimized SQL queries to analyze multi-million row datasets in Google Cloud.' },
        { name: 'MIS Reporting', detail: 'Generating weekly and monthly management information system reports to track business performance.' }
      ],
      icon: (
        <svg className="bento-icon" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="20" x2="18" y2="10"></line>
          <line x1="12" y1="20" x2="12" y2="4"></line>
          <line x1="6" y1="20" x2="6" y2="14"></line>
        </svg>
      )
    },
    {
      id: 'ai',
      meta: '03 / AI Productivity',
      title: 'Cognitive Workflows',
      defaultDescription: 'Applying LLMs and developer co-pilots to automate routine tasks, draft operations docs, and accelerate strategic research.',
      category: 'ai',
      sizeClass: 'bento-item-medium',
      bgClass: 'bento-item-ai',
      chips: [
        { name: 'Claude AI', detail: 'Leveraging Claude for drafting documentation, code analysis, and executive correspondence.' },
        { name: 'ChatGPT', detail: 'Utilizing advanced prompt engineering to automate text summarization and content generation.' },
        { name: 'Gemini', detail: 'Employing Gemini\'s multimodal capabilities for analysis and workflow optimization.' }
      ],
      icon: (
        <svg className="bento-icon" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 3a9 9 0 0 0 9 9 9 9 0 0 0-9 9 9 9 0 0 0-9-9 9 9 0 0 0 9-9Z"></path>
        </svg>
      )
    },
    {
      id: 'office',
      meta: '04 / Office Suite',
      title: 'Enterprise Systems',
      defaultDescription: 'Constructing slides, formula sheets, database pivots, and professional reports for corporate communications.',
      category: 'office',
      sizeClass: 'bento-item-medium',
      bgClass: 'bento-item-office',
      chips: [
        { name: 'Excel', detail: 'Analyzing data, managing records, and creating sheets for operations.' },
        { name: 'Word', detail: 'Drafting contracts, whitepapers, proposals, and official correspondence.' },
        { name: 'PowerPoint', detail: 'Structuring premium slide decks for executive presentations and client pitches.' },
        { name: 'Outlook', detail: 'Managing calendar bookings, inbox triage, and professional communication queues.' }
      ],
      icon: (
        <svg className="bento-icon" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
          <line x1="9" y1="3" x2="9" y2="21"></line>
          <line x1="15" y1="3" x2="15" y2="21"></line>
          <line x1="3" y1="9" x2="21" y2="9"></line>
          <line x1="3" y1="15" x2="21" y2="15"></line>
        </svg>
      )
    },
    {
      id: 'languages',
      meta: '05 / Technical Familiarity',
      title: 'Manageable Level Interface',
      defaultDescription: 'Operational understanding of core coding languages and database queries. This level of technical interface enables seamless collaboration, direct communication, and rapid bridging of scopes with engineering and developer teams.',
      category: 'technical',
      sizeClass: 'bento-item-wide',
      extraClass: 'bento-item-manageable',
      bgClass: 'bento-item-tech',
      chips: [
        { name: 'Python', detail: 'Writing automated script pipelines, data scraping scripts, and automating tasks.' },
        { name: 'SQL', detail: 'Querying relational databases, joining tables, and profiling data for business analysts.' }
      ],
      icon: (
        <svg className="bento-icon" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="16 18 22 12 16 6"></polyline>
          <polyline points="8 6 2 12 8 18"></polyline>
          <line x1="14" y1="4" x2="10" y2="20"></line>
        </svg>
      )
    }
  ];

  return (
    <section id="skills" className="section-container section-padding" ref={sectionRef}>
      <h2 className="section-heading animate-on-scroll fade-up">skills.</h2>

      {/* Category Filters */}
      <div className="skills-filters animate-on-scroll fade-up" style={{ transitionDelay: '100ms' }}>
        {filterOptions.map((opt) => (
          <button
            key={opt.value}
            className={`filter-btn ${selectedFilter === opt.value ? 'active' : ''}`}
            onClick={() => setSelectedFilter(opt.value)}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {/* Bento Grid */}
      <div className="bento-grid animate-on-scroll fade-up" style={{ transitionDelay: '200ms' }}>
        {bentoCards.map((card) => {
          const isSelected = selectedFilter === 'all' || card.category === selectedFilter;
          
          const cardStyle: React.CSSProperties = {
            opacity: isSelected ? 1 : 0.25,
            transform: selectedFilter === 'all' 
              ? 'none' 
              : isSelected 
                ? 'scale(1.02)' 
                : 'scale(0.97)',
            borderColor: isSelected && selectedFilter !== 'all'
              ? 'var(--text-primary)'
              : 'rgba(255, 255, 255, 0.7)',
            pointerEvents: isSelected ? 'auto' : 'none',
            zIndex: isSelected && selectedFilter !== 'all' ? 2 : 1,
            transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
          };

          return (
            <BentoCardItem
              key={card.id}
              card={card}
              cardStyle={cardStyle}
              hoveredDetails={hoveredDetails}
              setHoveredDetails={setHoveredDetails}
            />
          );
        })}
      </div>
    </section>
  );
}
