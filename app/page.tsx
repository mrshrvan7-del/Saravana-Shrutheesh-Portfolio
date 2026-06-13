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
  return (
    <main>
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
    </main>
  );
}
