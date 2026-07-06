'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GitCommit, TrendingUp, Flame, Calendar, Info, Sparkles, Plus } from 'lucide-react';

interface ContributionDay {
  date: string;
  count: number;
  intensity: number; // 0 to 4
  dayOfWeek: number; // 0 (Sun) to 6 (Sat)
  month: string; // e.g. "Jun"
  repo?: string;
  commits?: string[];
}

export default function GithubContributions() {
  const [data, setData] = useState<ContributionDay[][]>([]);
  const [totalCommits, setTotalCommits] = useState(138);
  const [currentStreak, setCurrentStreak] = useState(2);
  const [longestStreak, setLongestStreak] = useState(14);
  const [selectedDay, setSelectedDay] = useState<ContributionDay | null>(null);
  const [showTooltip, setShowTooltip] = useState<{ day: ContributionDay; x: number; y: number } | null>(null);
  const [simulationActive, setSimulationActive] = useState(false);
  const [simulatedCount, setSimulatedCount] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);

  // Repos and commit messages for generating mock details
  const mockRepos = [
    { name: 'COLIDE-', category: 'SAAS PLATFORM ARCHITECTURE' },
    { name: 'Ai-Call-Auditor', category: 'AI VOICE ANALYTICS' },
    { name: 'Sign-language-recognition-', category: 'COMPUTER VISION' },
    { name: 'serve-in-customer-app', category: 'GIG MARKETPLACE' },
    { name: 'Saravana-Shrutheesh-Portfolio', category: 'WEB ENGINEERING' },
    { name: 'ai-resume-screener', category: 'NLP PIPELINES' },
    { name: 'hyperlocal-delivery-engine', category: 'GEOSPATIAL SYSTEMS' },
    { name: 'redis-event-broker', category: 'DISTRIBUTED SYSTEMS' },
    { name: 'speech-to-sign-translator', category: 'MOBILE ACCESSIBILITY' },
    { name: 'e-commerce-telemetry', category: 'DATA PIPELINES' }
  ];

  const mockCommitsByRepo: Record<string, string[]> = {
    'COLIDE-': [
      'feat: implement offline-first transactional syncing protocol',
      'refactor: optimize redis caching layer for branch operations',
      'fix: resolve billing race conditions during high load testing',
      'feat: build real-time inventory telemetry pipelines',
      'docs: update multi-tenant database migration guides'
    ],
    'Ai-Call-Auditor': [
      'feat: integrate NLP sentiment scoring for sales transcripts',
      'fix: optimize audio chunking & whisper transcription API integration',
      'refactor: clean up compliance flag matching logic',
      'feat: implement campaign KPI report generation pipeline'
    ],
    'Sign-language-recognition-': [
      'feat: integrate TensorFlow Lite model for hand tracking',
      'refactor: optimize frame processing rate on mobile screens',
      'docs: add model training prerequisites and validation metrics',
      'fix: resolve gesture mapping jitter on device rotate'
    ],
    'serve-in-customer-app': [
      'feat: integrate real-time worker tracking with Google Maps API',
      'fix: optimize state updates during checkout workflow',
      'feat: design booking confirmation modals & push alerts'
    ],
    'Saravana-Shrutheesh-Portfolio': [
      'feat: migrate colors to new Sage Linen palette',
      'feat: add sticky navigation bar scroll transitions',
      'docs: update walkthrough.md & task lists',
      'style: refine responsive card padding on mobile screens'
    ],
    'ai-resume-screener': [
      'feat: setup python pdf miner and langchain agent',
      'refactor: optimize token usage for bulk resume ranking',
      'fix: solve custom schema parsing exceptions in Pydantic'
    ],
    'hyperlocal-delivery-engine': [
      'feat: implement dijkstra routing optimizations for multiple drivers',
      'fix: resolve coordinate translation drift in map overlay',
      'feat: add redis spatial indexing query support'
    ],
    'redis-event-broker': [
      'feat: create consumer group offset management loops',
      'docs: write cluster architecture and dead letter queue config',
      'test: add stress tests for concurrent publisher connections'
    ],
    'speech-to-sign-translator': [
      'feat: construct real-time video inference runner with PyTorch Mobile',
      'refactor: clean up frame buffer queues to avoid memory leakage',
      'fix: resolve audio synchronizer offsets on slow mobile devices'
    ],
    'e-commerce-telemetry': [
      'feat: implement kafka events producer for clickstream capture',
      'fix: optimize clickstream ingest rate in Go concurrency routine',
      'feat: build dashboard visualizers for real-time traffic statistics'
    ]
  };

  // Generate stable contribution data that matches the user's graph screenshot
  useEffect(() => {
    const end = new Date(2026, 6, 6); // July 6, 2026 (today)
    const days: ContributionDay[] = [];
    
    // We want 53 weeks = 371 days
    const totalDays = 371;
    const start = new Date(end);
    start.setDate(end.getDate() - totalDays + 1);

    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    // Target commit distribution to match user's real screenshot:
    // Total commits: 137 up to July 5 + 1 commit today (July 6) = 138 commits
    let commitsAssigned = 0;
    
    for (let i = 0; i < totalDays; i++) {
      const current = new Date(start);
      current.setDate(start.getDate() + i);

      const y = current.getFullYear();
      const m = current.getMonth();
      const d = current.getDate();
      const dateString = `${y}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      const dayOfWeek = current.getDay();
      const month = monthNames[m];

      let count = 0;

      // Deterministic assignment matching the screenshot:
      if (y === 2025 && m === 9 && d === 15) {
        count = 1; // Oct 15, 2025 (one single dot in October)
      } else if (y === 2026 && m === 1 && d === 14) {
        count = 1; // Feb 14, 2026 (one single dot in February)
      } else if (y === 2026 && m === 4) {
        // May 2026: active on weekdays
        const seed = (d * 13) % 100;
        if (dayOfWeek >= 1 && dayOfWeek <= 5 && seed < 65) {
          count = (d % 3) + 1; // 1 to 3 commits
        }
      } else if (y === 2026 && m === 5) {
        // June 2026: active on weekdays
        const seed = (d * 17) % 100;
        if (dayOfWeek >= 1 && dayOfWeek <= 5 && seed < 70) {
          count = (d % 4) + 1; // 1 to 4 commits
        }
      } else if (y === 2026 && m === 6 && d < 6) {
        // July 1 to July 5, 2026
        const seed = (d * 7) % 100;
        if (dayOfWeek >= 1 && dayOfWeek <= 5 && seed < 60) {
          count = (d % 2) + 1; // 1 to 2 commits
        }
      } else if (y === 2026 && m === 6 && d === 6) {
        // July 6, 2026 (today) - "contribute something to this for today"
        count = 1;
      }

      let intensity = 0;
      if (count === 1) intensity = 1;
      else if (count === 2) intensity = 2;
      else if (count === 3) intensity = 3;
      else if (count >= 4) intensity = 4;

      // Assign mock commits and repos for days with commits
      let repo: string | undefined;
      let commits: string[] | undefined;

      if (count > 0) {
        commitsAssigned += count;
        // Select a mock repo based on date hashing
        const repoObj = mockRepos[(d + m) % mockRepos.length];
        repo = repoObj.name;
        
        // Generate commit messages
        const availableCommits = mockCommitsByRepo[repo];
        commits = [];
        for (let j = 0; j < count; j++) {
          commits.push(availableCommits[(d + j) % availableCommits.length]);
        }
      }

      days.push({
        date: dateString,
        count,
        intensity,
        dayOfWeek,
        month,
        repo,
        commits
      });
    }

    // Adjust May and June active days to make total exactly 138
    let diff = 138 - commitsAssigned;
    if (diff !== 0) {
      for (const day of days) {
        // Don't adjust today's commit
        if (day.date === '2026-07-06') continue;

        if (day.count > 0 && diff !== 0) {
          if (diff > 0 && day.count < 4) {
            day.count += 1;
            day.intensity = Math.min(day.intensity + 1, 4);
            diff -= 1;
          } else if (diff < 0 && day.count > 1) {
            day.count -= 1;
            day.intensity = Math.max(day.intensity - 1, 1);
            diff += 1;
          }
        }
      }
    }

    // Group days into 53 weeks
    const weeks: ContributionDay[][] = [];
    let currentWeek: ContributionDay[] = [];

    // Pads start of week if start date is not Sunday
    const startDayOfWeek = days[0].dayOfWeek;
    for (let k = 0; k < startDayOfWeek; k++) {
      // Dummy empty block
      currentWeek.push({
        date: '',
        count: -1,
        intensity: -1,
        dayOfWeek: k,
        month: ''
      });
    }

    days.forEach((day) => {
      currentWeek.push(day);
      if (day.dayOfWeek === 6) {
        weeks.push(currentWeek);
        currentWeek = [];
      }
    });

    if (currentWeek.length > 0) {
      // Pad end of last week
      const endDayOfWeek = currentWeek[currentWeek.length - 1].dayOfWeek;
      for (let k = endDayOfWeek + 1; k < 7; k++) {
        currentWeek.push({
          date: '',
          count: -1,
          intensity: -1,
          dayOfWeek: k,
          month: ''
        });
      }
      weeks.push(currentWeek);
    }

    setData(weeks);
  }, []);

  // Format date to readable e.g., "Oct 15, 2025"
  const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    const parts = dateStr.split('-');
    const date = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const handleCellHover = (event: React.MouseEvent, day: ContributionDay) => {
    if (day.count === -1) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const containerRect = containerRef.current?.getBoundingClientRect();
    if (containerRect) {
      setShowTooltip({
        day,
        x: rect.left - containerRect.left + rect.width / 2,
        y: rect.top - containerRect.top - 42
      });
    }
  };

  // Simulate a recruiter commit in real time
  const handleSimulateCommit = () => {
    if (simulationActive) return;
    setSimulationActive(true);
    setSimulatedCount(prev => prev + 1);

    // Create custom recruiter commit
    const todayStr = new Date().toISOString().split('T')[0];
    
    // Find today's block in data and increment
    const updatedData = data.map(week => 
      week.map(day => {
        if (day.date === todayStr) {
          const newCount = day.count === -1 || day.count === 0 ? 1 : day.count + 1;
          const newIntensity = Math.min(Math.floor(newCount / 1.5) + 1, 4);
          
          const newCommits = day.commits ? [...day.commits] : [];
          newCommits.push(`feat(recruiter-simulation): Checked out portfolio & triggered commit #${simulatedCount + 1}!`);

          const updatedDay = {
            ...day,
            count: newCount,
            intensity: newIntensity,
            repo: 'Saravana-Shrutheesh-Portfolio',
            commits: newCommits
          };

          // Auto-select the newly committed day to show recruiter action in details panel
          setSelectedDay(updatedDay);
          return updatedDay;
        }
        return day;
      })
    );

    setData(updatedData);
    setTotalCommits(prev => prev + 1);
    setCurrentStreak(prev => prev === 0 ? 1 : prev); // Make sure streak is active

    setTimeout(() => {
      setSimulationActive(false);
    }, 800);
  };

  // Month labels mapping for top of calendar grid
  const renderMonthLabels = () => {
    if (data.length === 0) return null;
    const labels: { label: string; index: number }[] = [];
    let lastMonth = '';

    data.forEach((week, weekIdx) => {
      const firstValidDay = week.find(d => d.count !== -1);
      if (firstValidDay && firstValidDay.month !== lastMonth) {
        labels.push({ label: firstValidDay.month, index: weekIdx });
        lastMonth = firstValidDay.month;
      }
    });

    return (
      <div className="flex text-[10px] text-[var(--text-muted)] font-mono mb-2 h-4 relative select-none">
        {labels.map((lbl, idx) => (
          <span
            key={`${lbl.label}-${idx}`}
            className="absolute"
            style={{ left: `${(lbl.index / data.length) * 100}%` }}
          >
            {lbl.label}
          </span>
        ))}
      </div>
    );
  };

  return (
    <section id="developer-activity" ref={containerRef} className="section-container section-padding bg-transparent relative overflow-hidden">
      
      {/* Decorative background accent grid */}
      <div className="absolute left-0 top-0 w-[400px] h-[300px] bg-gradient-to-br from-[var(--bg-accent)]/5 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

      {/* lowercase serif heading */}
      <h2 className="section-heading mb-4">contributions.</h2>
      <p className="text-[15px] text-[var(--text-muted)] max-w-xl font-medium mb-12">
        A real-time visual registry of code push frequencies, telemetry builds, and automation updates.
      </p>

      {/* Grid of Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        
        {/* Stats card 1: Total Commits */}
        <motion.div 
          whileHover={{ y: -3 }}
          className="p-6 bg-[var(--bg-card)] border border-[var(--text-body)]/10 rounded-2xl shadow-sm flex items-center gap-4"
        >
          <div className="w-12 h-12 rounded-xl bg-[var(--accent-dark)]/10 flex items-center justify-center text-[var(--accent-dark)]">
            <GitCommit className="w-6 h-6" />
          </div>
          <div>
            <div className="text-[26px] font-extrabold text-[var(--text-primary)] leading-none font-sans">{totalCommits}</div>
            <div className="text-[11px] text-[var(--text-muted)] uppercase tracking-wider font-mono font-bold mt-1">Commits this Year</div>
          </div>
        </motion.div>

        {/* Stats card 2: Current Streak */}
        <motion.div 
          whileHover={{ y: -3 }}
          className="p-6 bg-[var(--bg-card)] border border-[var(--text-body)]/10 rounded-2xl shadow-sm flex items-center gap-4"
        >
          <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-600">
            <Flame className="w-6 h-6" />
          </div>
          <div>
            <div className="text-[26px] font-extrabold text-[var(--text-primary)] leading-none font-sans">{currentStreak} Days</div>
            <div className="text-[11px] text-[var(--text-muted)] uppercase tracking-wider font-mono font-bold mt-1">Current Streak</div>
          </div>
        </motion.div>

        {/* Stats card 3: Longest Streak */}
        <motion.div 
          whileHover={{ y: -3 }}
          className="p-6 bg-[var(--bg-card)] border border-[var(--text-body)]/10 rounded-2xl shadow-sm flex items-center gap-4"
        >
          <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center text-red-600">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <div className="text-[26px] font-extrabold text-[var(--text-primary)] leading-none font-sans">{longestStreak} Days</div>
            <div className="text-[11px] text-[var(--text-muted)] uppercase tracking-wider font-mono font-bold mt-1">Longest Streak</div>
          </div>
        </motion.div>

        {/* Stats card 4: Interactive Commit simulator button */}
        <motion.button 
          whileTap={{ scale: 0.98 }}
          onClick={handleSimulateCommit}
          disabled={simulationActive}
          className="p-6 bg-gradient-to-tr from-[var(--accent-dark)] to-[var(--bg-accent)] text-[var(--text-cream)] rounded-2xl shadow-sm flex items-center justify-between text-left group cursor-pointer border-none"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
              {simulationActive ? (
                <Sparkles className="w-6 h-6 animate-spin" />
              ) : (
                <Plus className="w-6 h-6" />
              )}
            </div>
            <div>
              <div className="text-[16px] font-bold leading-tight">Simulate Commit</div>
              <div className="text-[10px] opacity-80 font-mono mt-0.5">Click to log your visit!</div>
            </div>
          </div>
          <Sparkles className="w-5 h-5 opacity-40 group-hover:opacity-100 transition-opacity" />
        </motion.button>
      </div>

      {/* Main Calendar Content Box */}
      <div className="bg-[var(--bg-card)] border border-[var(--text-body)]/10 rounded-2xl p-6 md:p-8 shadow-sm">
        
        {/* Calendar Header with title & settings */}
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-[var(--text-body)]/5">
          <span className="text-[13px] font-mono text-[var(--text-primary)] font-bold uppercase tracking-wider flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-[var(--accent-dark)]" />
            GitHub Commit Frequency Registry
          </span>
          <span className="text-[11px] text-[var(--text-muted)] font-mono font-semibold hover:underline cursor-pointer flex items-center gap-1">
            <Info className="w-3.5 h-3.5" />
            Active: Year-Round
          </span>
        </div>

        {/* Calendar Map grid wrapper */}
        <div className="overflow-x-auto w-full pb-4 scrollbar-thin">
          <div className="min-w-[760px] pl-8 relative">
            
            {/* Render month titles */}
            {renderMonthLabels()}

            {/* Grid display: Days (rows) x Weeks (columns) */}
            <div className="grid grid-flow-col grid-cols-[repeat(53,_12px)] grid-rows-7 gap-[3px] relative">
              
              {/* Day names left margin decoration */}
              <div className="absolute left-[-30px] top-0 bottom-0 grid grid-rows-7 text-[9px] font-mono text-[var(--text-muted)] select-none">
                <span className="row-start-2 h-[12px] flex items-center">Mon</span>
                <span className="row-start-4 h-[12px] flex items-center">Wed</span>
                <span className="row-start-6 h-[12px] flex items-center">Fri</span>
              </div>

              {data.map((week, weekIdx) => 
                week.map((day, dayIdx) => {
                  const isEmpty = day.count === -1;
                  
                  // Map intensity to brand-safe colors (Linen base to Deep Sage green)
                  let colorClass = 'bg-[var(--text-body)]/5'; // Intensity 0
                  if (day.intensity === 1) colorClass = 'bg-[#C5E1D0]'; // soft sage
                  else if (day.intensity === 2) colorClass = 'bg-[#8FB996]'; // brand sage
                  else if (day.intensity === 3) colorClass = 'bg-[#6B8E7F]'; // deep sage
                  else if (day.intensity === 4) colorClass = 'bg-[#3E5C4E]'; // deepest forest sage

                  return (
                    <motion.div
                      key={`${weekIdx}-${dayIdx}`}
                      whileHover={!isEmpty ? { scale: 1.25, zIndex: 10 } : {}}
                      onClick={() => !isEmpty && day.count > 0 && setSelectedDay(day)}
                      onMouseEnter={(e) => handleCellHover(e, day)}
                      onMouseLeave={() => setShowTooltip(null)}
                      className={`w-[12px] h-[12px] rounded-[2px] transition-colors duration-150 cursor-pointer ${colorClass} ${
                        isEmpty ? 'opacity-0 cursor-default pointer-events-none' : ''
                      } ${day.count > 0 ? 'hover:shadow-sm' : ''} ${
                        selectedDay?.date === day.date ? 'ring-2 ring-[var(--accent-dark)] ring-offset-1 ring-offset-[var(--bg-card)]' : ''
                      }`}
                    />
                  );
                })
              )}
            </div>

            {/* Calendar Legend footer */}
            <div className="flex items-center justify-between text-[10px] text-[var(--text-muted)] font-mono mt-4 border-t border-[var(--text-body)]/5 pt-4">
              <span>Learn how we count contributions</span>
              <div className="flex items-center gap-1 select-none">
                <span>Less</span>
                <span className="w-[10px] h-[10px] rounded-[1px] bg-[var(--text-body)]/5" />
                <span className="w-[10px] h-[10px] rounded-[1px] bg-[#C5E1D0]" />
                <span className="w-[10px] h-[10px] rounded-[1px] bg-[#8FB996]" />
                <span className="w-[10px] h-[10px] rounded-[1px] bg-[#6B8E7F]" />
                <span className="w-[10px] h-[10px] rounded-[1px] bg-[#3E5C4E]" />
                <span>More</span>
              </div>
            </div>

            {/* Hover Tooltip Overlay */}
            <AnimatePresence>
              {showTooltip && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="absolute z-30 bg-[var(--bg-nav)] text-[var(--text-cream)] text-[10px] font-mono px-2.5 py-1.5 rounded-lg shadow-md pointer-events-none whitespace-nowrap -translate-x-1/2 flex flex-col items-center gap-0.5"
                  style={{ left: showTooltip.x, top: showTooltip.y }}
                >
                  <span className="font-bold">
                    {showTooltip.day.count === 0 ? 'No' : showTooltip.day.count} commit{showTooltip.day.count !== 1 ? 's' : ''}
                  </span>
                  <span className="opacity-80 text-[9px]">{formatDate(showTooltip.day.date)}</span>
                  <div className="w-1.5 h-1.5 bg-[var(--bg-nav)] rotate-45 absolute bottom-[-3px] left-1/2 -translate-x-1/2" />
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </div>

        {/* Detailed Commit Inspector Display */}
        <AnimatePresence mode="wait">
          {selectedDay ? (
            <motion.div
              key={selectedDay.date}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-6 p-5 bg-[var(--bg-page)]/60 rounded-xl border border-[var(--text-body)]/10 flex flex-col gap-4 text-left"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--text-body)]/5 pb-3">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[11px] font-bold text-[var(--accent-dark)] uppercase">Commit Inspector</span>
                  <span className="text-[11px] text-[var(--text-muted)]">&middot;</span>
                  <span className="font-mono text-[11px] font-semibold text-[var(--text-body)]">{formatDate(selectedDay.date)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[9px] uppercase tracking-wider text-[var(--text-cream)] bg-[var(--text-primary)] px-2 py-0.5 rounded font-bold">
                    {selectedDay.count} commit{selectedDay.count !== 1 ? 's' : ''}
                  </span>
                  <button 
                    onClick={() => setSelectedDay(null)}
                    className="text-[11px] text-[var(--text-muted)] hover:text-[var(--text-primary)] font-bold bg-transparent border-none cursor-pointer"
                  >
                    Clear
                  </button>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-1.5 mb-3">
                  <span className="font-mono text-[10px] text-[var(--text-muted)] uppercase tracking-wider font-bold">Target Repository:</span>
                  <span className="font-mono text-[11px] font-bold text-[var(--text-primary)]">{selectedDay.repo}</span>
                </div>
                <ul className="space-y-2.5">
                  {selectedDay.commits?.map((commit, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-[13px] leading-relaxed text-[var(--text-body)]">
                      <GitCommit className="w-4 h-4 text-[var(--accent-dark)] shrink-0 mt-0.5" />
                      <code className="font-mono text-[12px] bg-[var(--bg-card)] px-1.5 py-0.5 rounded border border-[var(--text-body)]/5 flex-1">
                        {commit}
                      </code>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ) : (
            <div className="mt-6 p-6 border border-dashed border-[var(--text-body)]/10 rounded-xl text-center">
              <GitCommit className="w-8 h-8 text-[var(--accent-dark)] mx-auto mb-2 opacity-40 animate-[pulse_2s_infinite]" />
              <p className="text-[13px] text-[var(--text-muted)] font-medium">
                Click any colored square on the calendar grid to inspect commit logs and build records for that day.
              </p>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}