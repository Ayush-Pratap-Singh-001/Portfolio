import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Timeline from './components/Timeline';
import Certificates from './components/Certificates';
import Achievements from './components/Achievements';
import { Contact, Footer } from './components/Contact';
import CustomCursor from './components/CustomCursor';

function App() {
  return (
    <div className="relative overflow-x-hidden">
      <CustomCursor />

      {/* Background Grid Pattern */}
      <div className="fixed inset-0 -z-10 h-full w-full bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:32px_32px]"></div>

      <Navbar />
      <main className="w-full">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Timeline />
        <Certificates />
        <Achievements />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
