import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Experience from '@/components/Experience';
import Education from '@/components/Education';
import Projects from '@/components/Projects';
import Skills from '@/components/Skills';
import Certs from '@/components/Certs';
import Contact from '@/components/Contact';

export default function Home() {
  return (
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
      
      <Skills />
      
      <div className="section-divider section-container">
        <span>+</span>
      </div>
      
      <Certs />
      
      <div className="section-divider section-container">
        <span>+</span>
      </div>
      
      <Contact />
    </main>
  );
}
