'use client';

import { motion } from 'framer-motion';
import { Database, Cpu, Send } from 'lucide-react';

const agents = [
  { name: 'Claude', useCase: 'Analytical reasoning & nuanced prompt orchestration.', color: 'from-amber-500 to-orange-600' },
  { name: 'ChatGPT', useCase: 'Rapid prototyping, general-purpose logical scripting.', color: 'from-green-500 to-emerald-700' },
  { name: 'Gemini', useCase: 'Large context deep-dives and direct multimodal integration.', color: 'from-blue-500 to-indigo-700' },
];

export default function AISection() {
  return (
    <section className="py-32 relative overflow-hidden bg-bg-elevated border-y border-white/5">
      {/* Section grid bg specific layer */}
      <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20 space-y-6">
          <h2 className="font-display text-4xl md:text-5xl mb-4 tracking-tight">Next-Gen AI Integration</h2>
          <p className="text-[var(--text-2)] max-w-2xl mx-auto text-lg">Leveraging machine learning architectures to automate critical pipelines and amplify operator intelligence. We don&apos;t just build tools; we engineer ecosystems.</p>
        </div>

        {/* CSS-only Animated Flow Diagram */}
        <div className="mb-24 relative flex flex-col md:flex-row items-center justify-center gap-8 lg:gap-24">
          {/* Step 1: Raw Input */}
          <div className="flex flex-col items-center gap-4 relative group">
             <div className="w-20 h-20 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-accent-2 transition-colors duration-500">
               <Database size={32} className="text-[var(--text-2)] group-hover:text-accent-2 transition-colors" />
             </div>
             <span className="font-code text-xs text-[var(--text-3)]">UNSTRUCTURED DATA</span>
          </div>

          {/* Connector 1 with moving dot */}
          <div className="hidden md:block relative w-32 h-1 bg-white/5 overflow-hidden rounded-full">
             <div className="absolute top-0 left-0 h-full w-12 bg-gradient-to-r from-transparent via-accent-2 to-transparent animate-flow-right" />
          </div>
          {/* Mobile connector */}
          <div className="md:hidden h-16 w-1 bg-white/5 overflow-hidden rounded-full relative">
             <div className="absolute top-0 left-0 w-full h-12 bg-gradient-to-b from-transparent via-accent-2 to-transparent animate-flow-down" />
          </div>

          {/* Step 2: The Engine */}
          <div className="flex flex-col items-center gap-4 relative group">
             <div className="absolute inset-0 bg-accent-1/20 blur-2xl rounded-full animate-pulse-slow z-0" />
             <div className="relative z-10 w-28 h-28 rounded-full bg-gradient-to-br from-accent-1 to-accent-2 p-[2px]">
               <div className="w-full h-full rounded-full bg-bg-elevated flex items-center justify-center">
                 <Cpu size={40} className="text-white animate-spin-slow" style={{ animationDuration: '12s' }} />
               </div>
             </div>
             <span className="font-code text-xs text-accent-1 font-bold relative z-10">AGENTIC LAYER</span>
          </div>

          {/* Connector 2 */}
          <div className="hidden md:block relative w-32 h-1 bg-white/5 overflow-hidden rounded-full">
             <div className="absolute top-0 left-0 h-full w-12 bg-gradient-to-r from-transparent via-emerald-400 to-transparent animate-flow-right" style={{ animationDelay: '0.7s' }} />
          </div>
          {/* Mobile connector 2 */}
          <div className="md:hidden h-16 w-1 bg-white/5 overflow-hidden rounded-full relative">
             <div className="absolute top-0 left-0 w-full h-12 bg-gradient-to-b from-transparent via-emerald-400 to-transparent animate-flow-down" style={{ animationDelay: '0.7s' }} />
          </div>

          {/* Step 3: Execution */}
          <div className="flex flex-col items-center gap-4 relative group">
             <div className="w-20 h-20 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-emerald-400 transition-colors duration-500">
               <Send size={32} className="text-[var(--text-2)] group-hover:text-emerald-400 transition-colors" />
             </div>
             <span className="font-code text-xs text-[var(--text-3)]">AUTOMATED IMPACT</span>
          </div>
        </div>

        {/* 3 Agent Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {agents.map((agent, i) => (
            <motion.div
              key={agent.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="glass p-8 rounded-2xl border border-white/5 hover:border-white/10 transition-colors relative group overflow-hidden"
            >
              <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${agent.color} opacity-40 group-hover:opacity-100 transition-opacity duration-500`} />
              
              <h4 className="text-2xl font-display text-white mb-3 flex items-center gap-2">
                {agent.name}
              </h4>
              <p className="text-[var(--text-2)] text-sm font-body leading-relaxed">
                {agent.useCase}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Define keyframes for the animation flows if inline CSS permits or we append to main CSS.
          I'll use standard Tailwind arbitrary variant since we need it inline or update main CSS. 
          I will update globals.css later or just render a style tag here if needed. Let's add to global config for robustness. */}
    </section>
  );
}
