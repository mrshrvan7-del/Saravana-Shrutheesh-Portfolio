'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  GitCommit, TrendingUp, Flame, Calendar, Info, 
  Sparkles, Plus, Volume2, VolumeX, Award, Palette, Shuffle, Terminal
} from 'lucide-react';

interface ContributionDay {
  date: string;
  count: number;
  intensity: number; // 0 to 4
  dayOfWeek: number; // 0 (Sun) to 6 (Sat)
  month: string; // e.g. "Jun"
  repo?: string;
  commits?: string[];
}

// 4 different interactive color themes for the contributions grid
const THEMES = {
  sage: {
    name: 'Sage Linen',
    colors: ['rgba(26, 26, 22, 0.05)', '#C5E1D0', '#8FB996', '#6B8E7F', '#3E5C4E'],
    accent: '#8FB996'
  },
  classic: {
    name: 'Classic Green',
    colors: ['rgba(26, 26, 22, 0.05)', '#9be9a8', '#40c463', '#30a14e', '#216e39'],
    accent: '#30a14e'
  },
  cyber: {
    name: 'Cyber Neon',
    colors: ['rgba(26, 26, 22, 0.05)', '#b3f0ff', '#00d2ff', '#d800ff', '#ff007f'],
    accent: '#ff007f'
  },
  sunset: {
    name: 'Sunset Orange',
    colors: ['rgba(26, 26, 22, 0.05)', '#ffe6cc', '#ff9933', '#e65c00', '#993d00'],
    accent: '#e65c00'
  }
};

type ThemeKey = keyof typeof THEMES;

const DEV_FORTUNES = [
  "In case of fire: git commit, git push, run.",
  "A branch a day keeps the merge conflicts away.",
  "There are 10 types of people: those who understand binary, and those who don't.",
  "Git status: 0 commits, 100 cups of coffee consumed.",
  "If at first you don't succeed, search StackOverflow.",
  "May your commits be atomic and your merges conflict-free.",
  "One developer's bug is another recruiter's feature.",
  "Do not force push to main on Friday afternoon.",
  "Clean code is not written, it is rewritten.",
  "Git happens. Roll with the branches.",
  "Talk is cheap. Show me the code. — Linus Torvalds"
];

export default function GithubContributions() {
  const [data, setData] = useState<ContributionDay[][]>([]);
  const [totalCommits, setTotalCommits] = useState(4565);
  const [currentStreak, setCurrentStreak] = useState(203);
  const [longestStreak, setLongestStreak] = useState(214);
  const [selectedDay, setSelectedDay] = useState<ContributionDay | null>(null);
  const [showTooltip, setShowTooltip] = useState<{ day: ContributionDay; x: number; y: number } | null>(null);
  const [simulationActive, setSimulationActive] = useState(false);
  const [simulatedCount, setSimulatedCount] = useState(0);

  // New interactive states
  const [activeTheme, setActiveTheme] = useState<ThemeKey>('sage');
  const [isMuted, setIsMuted] = useState(false);
  const [cellClicksCount, setCellClicksCount] = useState(0);
  const [unlockedAchievements, setUnlockedAchievements] = useState<string[]>([]);
  const [activeFortune, setActiveFortune] = useState(DEV_FORTUNES[0]);
  const [showNotification, setShowNotification] = useState<string | null>(null);

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
    const days: ContributionDay[] = [];
    const start = new Date(2026, 0, 1); // January 1, 2026
    const today = new Date();
    // Cap end date at Dec 31, 2026 to stay within the 2026 year
    const end = today.getFullYear() === 2026 ? today : new Date(2026, 11, 31);
    const diffTime = Math.max(0, end.getTime() - start.getTime());
    const totalDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    // Target commits: 138 (exactly 137 up to July 5 + 1 on July 6)
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

      // High-density assignment matching the newly backfilled dark-green commits:
      if (dayOfWeek >= 1 && dayOfWeek <= 5) {
        // Weekdays: 80% chance of being highly active (intensity 4 - dark green)
        const seed = (d * 17 + m * 31) % 100;
        if (seed < 80) {
          count = 4 + (d % 6); // 4 to 9 commits (intensity 4)
        } else if (seed < 92) {
          count = 2 + (d % 2); // 2 to 3 commits (intensity 2 or 3)
        }
      } else {
        // Weekends: 25% chance of moderate activity
        const seed = (d * 11 + m * 7) % 100;
        if (seed < 25) {
          count = 1 + (d % 3); // 1 to 3 commits
        }
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

    const startDayOfWeek = days[0].dayOfWeek;
    for (let k = 0; k < startDayOfWeek; k++) {
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

  // Browser-native Web Audio Synth sound maker (Mechanical keyboard click pop)
  const playSound = (freq = 800, duration = 0.04, volume = 0.05) => {
    if (isMuted || typeof window === 'undefined') return;
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();

      osc.connect(gainNode);
      gainNode.connect(audioCtx.destination);

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.5, audioCtx.currentTime + duration);

      gainNode.gain.setValueAtTime(volume, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);

      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch (e) {
      console.error(e);
    }
  };

  // Click-clack pop variations
  const playClick = () => {
    const pitch = 300 + Math.random() * 200; // tactile clack pitch
    playSound(pitch, 0.04, 0.03);
  };

  const playHoverClick = () => {
    const pitch = 600 + Math.random() * 100; // tiny scroll typewriter tick
    playSound(pitch, 0.015, 0.008);
  };

  const playChime = () => {
    if (isMuted || typeof window === 'undefined') return;
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const now = audioCtx.currentTime;
      
      const osc1 = audioCtx.createOscillator();
      const gain1 = audioCtx.createGain();
      osc1.frequency.setValueAtTime(659.25, now); // E5
      gain1.gain.setValueAtTime(0.08, now);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
      osc1.connect(gain1);
      gain1.connect(audioCtx.destination);
      osc1.start(now);
      osc1.stop(now + 0.15);

      const osc2 = audioCtx.createOscillator();
      const gain2 = audioCtx.createGain();
      osc2.frequency.setValueAtTime(783.99, now + 0.08); // G5
      gain2.gain.setValueAtTime(0.08, now + 0.08);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
      osc2.connect(gain2);
      gain2.connect(audioCtx.destination);
      osc2.start(now + 0.08);
      osc2.stop(now + 0.25);
    } catch (e) {
      console.error(e);
    }
  };

  // Format date to readable e.g., "Oct 15, 2025"
  const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    const parts = dateStr.split('-');
    const date = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const handleCellHover = (event: React.MouseEvent, day: ContributionDay) => {
    if (day.count === -1) return;
    playHoverClick();
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

  const handleDayClick = (day: ContributionDay) => {
    playClick();
    setSelectedDay(day);
    
    // Increment cell click counts for Sound Explorer badge
    const newClicks = cellClicksCount + 1;
    setCellClicksCount(newClicks);
    checkAchievements(simulatedCount, newClicks);

    // Shuffle fortunes on cell clicks
    const randomFortune = DEV_FORTUNES[Math.floor(Math.random() * DEV_FORTUNES.length)];
    setActiveFortune(randomFortune);
  };

  // Track and trigger Session Achievements
  const checkAchievements = (commits: number, clicks: number) => {
    const activeBadges = [...unlockedAchievements];
    let justUnlocked = null;

    if (commits >= 1 && !activeBadges.includes('First Push')) {
      activeBadges.push('First Push');
      justUnlocked = '🥉 Achievement Unlocked: First Push!';
    }
    if (commits >= 5 && !activeBadges.includes('Branch Manager')) {
      activeBadges.push('Branch Manager');
      justUnlocked = '🥈 Achievement Unlocked: Branch Manager!';
    }
    if (commits >= 10 && !activeBadges.includes('Git Deity')) {
      activeBadges.push('Git Deity');
      justUnlocked = '🥇 Achievement Unlocked: Git Deity Status!';
    }
    if (clicks >= 3 && !activeBadges.includes('Sound Explorer')) {
      activeBadges.push('Sound Explorer');
      justUnlocked = '🎵 Achievement Unlocked: Tactile Explorer!';
    }

    if (justUnlocked) {
      setUnlockedAchievements(activeBadges);
      setShowNotification(justUnlocked);
      playChime();
      setTimeout(() => setShowNotification(null), 3000);
    }
  };

  // Rotate fortunes manually
  const handleShuffleFortune = () => {
    playClick();
    const random = DEV_FORTUNES[Math.floor(Math.random() * DEV_FORTUNES.length)];
    setActiveFortune(random);
  };

  // Simulate a recruiter commit in real time
  const handleSimulateCommit = () => {
    if (simulationActive) return;
    playClick();
    setSimulationActive(true);
    const nextSimCount = simulatedCount + 1;
    setSimulatedCount(nextSimCount);

    const todayStr = new Date().toISOString().split('T')[0];
    
    const updatedData = data.map(week => 
      week.map(day => {
        if (day.date === todayStr) {
          const newCount = day.count === -1 || day.count === 0 ? 1 : day.count + 1;
          const newIntensity = Math.min(Math.floor(newCount / 1.5) + 1, 4);
          
          const newCommits = day.commits ? [...day.commits] : [];
          newCommits.push(`feat(recruiter-simulation): Checked out portfolio & triggered commit #${nextSimCount}!`);

          const updatedDay = {
            ...day,
            count: newCount,
            intensity: newIntensity,
            repo: 'Saravana-Shrutheesh-Portfolio',
            commits: newCommits
          };

          setSelectedDay(updatedDay);
          return updatedDay;
        }
        return day;
      })
    );

    setData(updatedData);
    setTotalCommits(prev => prev + 1);
    setCurrentStreak(prev => prev === 0 ? 1 : prev);

    checkAchievements(nextSimCount, cellClicksCount);

    setTimeout(() => {
      setSimulationActive(false);
    }, 600);
  };

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
      
      {/* Dynamic Floating Achievement Alerts */}
      <AnimatePresence>
        {showNotification && (
          <motion.div 
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 16, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-[var(--text-primary)] text-[var(--text-cream)] px-5 py-3 rounded-full font-mono text-[11px] font-bold shadow-lg border border-[var(--bg-accent)]/30 flex items-center gap-2"
          >
            <Award className="w-4 h-4 text-yellow-500 animate-bounce" />
            <span>{showNotification}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute left-0 top-0 w-[400px] h-[300px] bg-gradient-to-br from-[var(--bg-accent)]/5 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

      <h2 className="section-heading mb-4">contributions.</h2>
      <p className="text-[15px] text-[var(--text-muted)] max-w-xl font-medium mb-12">
        A tactile registry of code push frequencies, local telemetry builds, and interactive visitor actions.
      </p>

      {/* Grid of Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 font-sans">
        
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
      </div>

      {/* Main Calendar Content Box */}
      <div className="bg-[var(--bg-card)] border border-[var(--text-body)]/10 rounded-2xl p-6 md:p-8 shadow-sm">
        
        {/* Calendar Header with title & settings */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-[var(--text-body)]/5">
          <span className="text-[13px] font-mono text-[var(--text-primary)] font-bold uppercase tracking-wider flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-[var(--accent-dark)]" />
            GitHub Commit Frequency Registry
          </span>
          
          {/* Controls: Audio mute and Theme Swapper */}
          <div className="flex items-center gap-4">
            
            {/* Theme Selector icons */}
            <div className="flex items-center gap-1.5 bg-[var(--bg-page)]/80 px-2.5 py-1.5 rounded-lg border border-[var(--text-body)]/5">
              <Palette className="w-3.5 h-3.5 text-[var(--text-muted)] mr-1" />
              {(Object.keys(THEMES) as ThemeKey[]).map((themeKey) => {
                const isActive = activeTheme === themeKey;
                return (
                  <button
                    key={themeKey}
                    onClick={() => { playClick(); setActiveTheme(themeKey); }}
                    style={{ backgroundColor: THEMES[themeKey].colors[3] }}
                    className={`w-3.5 h-3.5 rounded-full border-none cursor-pointer hover:scale-110 transition-transform ${
                      isActive ? 'ring-2 ring-[var(--text-primary)] ring-offset-1 ring-offset-[var(--bg-card)]' : 'opacity-60'
                    }`}
                    title={THEMES[themeKey].name}
                  />
                );
              })}
            </div>

            {/* Mute button */}
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="p-1.5 bg-[var(--bg-page)]/80 hover:bg-[var(--text-body)]/5 rounded-lg border border-[var(--text-body)]/5 cursor-pointer text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
              title={isMuted ? 'Unmute key sounds' : 'Mute key sounds'}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
            
            <span className="text-[11px] text-[var(--text-muted)] font-mono font-semibold hover:underline cursor-pointer flex items-center gap-1">
              <Info className="w-3.5 h-3.5" />
              Active: Year-Round
            </span>
          </div>
        </div>

        {/* Calendar Map grid wrapper */}
        <div className="overflow-x-auto w-full pb-4 scrollbar-thin flex justify-center">
          <div className="relative inline-block pl-8 pr-2">
            
            {/* Render month titles */}
            {renderMonthLabels()}

            {/* Grid display: Days (rows) x Weeks (columns) */}
            <div 
              style={{ gridTemplateColumns: `repeat(${data.length || 28}, 15px)` }}
              className="grid grid-flow-col grid-rows-7 gap-[4px] relative"
            >
              
              {/* Day names left margin decoration */}
              <div className="absolute left-[-32px] top-0 bottom-0 grid grid-rows-7 gap-[4px] text-[10px] font-mono text-[var(--text-muted)] select-none">
                <span className="row-start-2 h-[15px] flex items-center">Mon</span>
                <span className="row-start-4 h-[15px] flex items-center">Wed</span>
                <span className="row-start-6 h-[15px] flex items-center">Fri</span>
              </div>

              {data.map((week, weekIdx) => 
                week.map((day, dayIdx) => {
                  const isEmpty = day.count === -1;
                  
                  // Map intensity to active theme colors dynamically
                  const currentThemeData = THEMES[activeTheme];
                  let colorValue = 'rgba(26, 26, 22, 0.05)';
                  if (day.intensity > 0) {
                    colorValue = currentThemeData.colors[day.intensity];
                  }

                  return (
                    <motion.div
                      key={`${weekIdx}-${dayIdx}`}
                      whileHover={!isEmpty ? { 
                        scale: 1.7, 
                        zIndex: 10,
                        boxShadow: '0 4px 12px rgba(0,0,0,0.12)'
                      } : {}}
                      transition={{ type: 'spring', stiffness: 450, damping: 12 }}
                      onClick={() => !isEmpty && handleDayClick(day)}
                      onMouseEnter={(e) => handleCellHover(e, day)}
                      onMouseLeave={() => setShowTooltip(null)}
                      style={{ backgroundColor: isEmpty ? 'transparent' : colorValue }}
                      className={`w-[15px] h-[15px] rounded-[3px] transition-colors duration-150 cursor-pointer ${
                        isEmpty ? 'opacity-0 cursor-default pointer-events-none' : ''
                      } ${day.count > 0 ? 'hover:shadow-sm' : ''} ${
                        selectedDay?.date === day.date ? 'ring-2 ring-[var(--text-primary)] ring-offset-1 ring-offset-[var(--bg-card)]' : ''
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
                <span 
                  style={{ backgroundColor: THEMES[activeTheme].colors[0] }} 
                  className="w-[10px] h-[10px] rounded-[1px]" 
                />
                <span 
                  style={{ backgroundColor: THEMES[activeTheme].colors[1] }} 
                  className="w-[10px] h-[10px] rounded-[1px]" 
                />
                <span 
                  style={{ backgroundColor: THEMES[activeTheme].colors[2] }} 
                  className="w-[10px] h-[10px] rounded-[1px]" 
                />
                <span 
                  style={{ backgroundColor: THEMES[activeTheme].colors[3] }} 
                  className="w-[10px] h-[10px] rounded-[1px]" 
                />
                <span 
                  style={{ backgroundColor: THEMES[activeTheme].colors[4] }} 
                  className="w-[10px] h-[10px] rounded-[1px]" 
                />
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



      </div>
    </section>
  );
}