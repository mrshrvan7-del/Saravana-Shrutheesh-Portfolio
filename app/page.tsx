"use client";

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Experience from '@/components/Experience';
import Education from '@/components/Education';
import Projects from '@/components/Projects';
import GithubContributions from '@/components/GithubContributions';
import Skills from '@/components/Skills';
import Certs from '@/components/Certs';
import BlogPreview from '@/components/BlogPreview';
import Footer from '@/components/Footer';
import SplashScreen from '@/src/components/SplashScreen/SplashScreen';

const FeedbackPoster = dynamic(() => import('@/components/FeedbackPoster'), { ssr: false });

export default function Home() {
  const [splashDone, setSplashDone] = useState(() => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem('splash-played') === 'true';
    }
    return false;
  });

  const handleSplashComplete = () => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('splash-played', 'true');
    }
    setSplashDone(true);
  };

  useEffect(() => {
    if (!splashDone) {
      document.body.style.overflow = 'hidden';
      window.scrollTo(0, 0);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [splashDone]);

  return (
    <>
      {!splashDone && (
        <SplashScreen onComplete={handleSplashComplete} />
      )}
      
      <div
        style={{
          opacity: splashDone ? 1 : 0,
          transition: 'opacity 0.5s ease-in-out',
          pointerEvents: splashDone ? 'auto' : 'none',
        }}
      >
        <main>
          <Nav />
          <Hero />
          <About />
          
          <div className="section-divider section-container">
            <span>+</span>
          </div>
          
          <Experience />
          
          <div className="section-divider section-container">
            <span>+</span>
          </div>
          
          <Education />
          
          <div className="section-divider section-container">
            <span>+</span>
          </div>
          
          <Projects />
          
          <div className="section-divider section-container">
            <span>+</span>
          </div>

          <GithubContributions />
          
          <div className="section-divider section-container">
            <span>+</span>
          </div>
          
          <Skills />
          
          <div className="section-divider section-container">
            <span>+</span>
          </div>
          
          <Certs />
          
          <div className="section-divider section-container">
            <span>+</span>
          </div>
          <BlogPreview />
        </main>
        <Footer />
        {splashDone && <FeedbackPoster />}
      </div>
    </>
  );
}
