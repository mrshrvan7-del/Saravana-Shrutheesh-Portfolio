"use client";

import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { SplashScreen } from '@/src/components/SplashScreen';
import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import Stats from '@/components/Stats';
import About from '@/components/About';
import Experience from '@/components/Experience';
import Education from '@/components/Education';
import Projects from '@/components/Projects';
import Skills from '@/components/Skills';
import Certs from '@/components/Certs';
import Contact from '@/components/Contact';

export default function Home() {
  const [splashDone, setSplashDone] = useState(() => {
    if (typeof window === 'undefined') return false;
    return sessionStorage.getItem('splash_shown') === '1';
  });

  const handleSplashComplete = () => {
    sessionStorage.setItem('splash_shown', '1');
    setSplashDone(true);
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {!splashDone && (
          <SplashScreen onComplete={handleSplashComplete} />
        )}
      </AnimatePresence>

      <div
        style={{
          opacity: splashDone ? 1 : 0,
          transition: 'opacity 0.4s ease',
          pointerEvents: splashDone ? 'auto' : 'none',
        }}
      >
        <Nav />
        <Hero />
        <Stats />
        <About />
        <Experience />
        <Education />
        <Projects />
        <Skills />
        <Certs />
        <Contact />
      </div>
    </>
  );
}
