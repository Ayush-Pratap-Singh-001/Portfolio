import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, Mail, Download, ChevronRight, ChevronDown, Code2, Cpu, Star } from 'lucide-react';

const ROLES = ['Backend Developer', 'Software Engineer', 'Java Developer', 'UI Designer'];

const TERMINAL_LINES = [
  { type: 'cmd', text: 'whoami' },
  { type: 'out', text: 'Ayush — Backend Developer & Machine Learning Enthusiast specializing in Java, Spring Boot, and data-driven systems.' },
  { type: 'cmd', text: 'ls projects/' },
  { type: 'out', text: 'LibraryManagementSystem/ LeadGenChatBot/ MemoryManagementVisualiser/' },
  { type: 'cmd', text: 'cat skills.json' },
  { type: 'tag', items: ['Java', 'Spring Boot', 'Python', 'MySQL', 'Scikit-learn', 'Git'] },
  { type: 'cmd', text: 'git log --oneline -1' },
  { type: 'out', text: 'a3c9f12 feat: building scalable systems, one commit at a time' },
];

const TerminalLine = ({ line, visible }) => {
  if (!visible) return null;
  if (line.type === 'cmd') return (
    <p className="flex gap-2 items-center">
      <span style={{ color: '#10b981' }}>❯</span>
      <span style={{ color: '#f8fafc' }}>{line.text}</span>
    </p>
  );
  if (line.type === 'tag') return (
    <div className="flex flex-wrap gap-2 pl-4">
      {line.items.map(t => (
        <span key={t} style={{ background: 'rgba(59,130,246,0.15)', color: '#3b82f6', padding: '2px 8px', borderRadius: 4, fontSize: '0.75rem', fontFamily: 'monospace' }}>{t}</span>
      ))}
    </div>
  );
  return <p style={{ color: '#94a3b8', paddingLeft: '1rem', fontSize: '0.8rem' }}>{line.out || line.text}</p>;
};

const Hero = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayRole, setDisplayRole] = useState('');
  const [deleting, setDeleting] = useState(false);
  const [terminalStep, setTerminalStep] = useState(0);

  // Role typing effect
  useEffect(() => {
    const full = ROLES[roleIndex];
    if (!deleting && displayRole.length < full.length) {
      const t = setTimeout(() => setDisplayRole(full.slice(0, displayRole.length + 1)), 80);
      return () => clearTimeout(t);
    } else if (!deleting && displayRole.length === full.length) {
      const t = setTimeout(() => setDeleting(true), 2000);
      return () => clearTimeout(t);
    } else if (deleting && displayRole.length > 0) {
      const t = setTimeout(() => setDisplayRole(displayRole.slice(0, -1)), 45);
      return () => clearTimeout(t);
    } else if (deleting && displayRole.length === 0) {
      setDeleting(false);
      setRoleIndex((roleIndex + 1) % ROLES.length);
    }
  }, [displayRole, deleting, roleIndex]);

  // Terminal progressive reveal
  useEffect(() => {
    if (terminalStep < TERMINAL_LINES.length) {
      const t = setTimeout(() => setTerminalStep(s => s + 1), 600);
      return () => clearTimeout(t);
    }
  }, [terminalStep]);

  const STATS = [
    { icon: Code2, value: '5+', label: 'Projects' },
    { icon: Star, value: '150+', label: 'LeetCode' },
    { icon: Cpu, value: '2+', label: 'Years Coding' },
  ];

  return (
    <section id="home" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '80px 1.5rem 40px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', width: '100%' }}>
        <div className="hero-grid">
          {/* Left Side */}
          <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}>
            <motion.span
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              style={{ color: '#3b82f6', fontFamily: 'var(--font-mono)', fontSize: '1rem', marginBottom: '1rem', display: 'block', letterSpacing: '0.05em' }}
            >
              &gt; Hello, I'm
            </motion.span>

            <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', fontWeight: 800, lineHeight: 1.05, marginBottom: '1rem', fontFamily: 'var(--font-heading)' }}>
              Ayush
            </h1>
            <h2 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.8rem)', fontWeight: 700, marginBottom: '1.5rem', fontFamily: 'var(--font-heading)', minHeight: '3.5rem' }}>
              <span style={{ background: 'linear-gradient(90deg, #3b82f6, #8b5cf6, #10b981)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                {displayRole}
              </span>
              <span style={{ color: '#3b82f6', animation: 'blink 1s step-end infinite' }}>|</span>
            </h2>

            <p style={{ color: '#94a3b8', fontSize: '1.05rem', maxWidth: 480, lineHeight: 1.8, marginBottom: '2rem' }}>
              Designing <strong style={{ color: '#f8fafc' }}>scalable backend systems and intelligent solutions</strong> using Java, Spring Boot, and machine learning. Passionate about system design, cloud architecture, and data-driven innovation.
            </p>

            {/* Stats Row */}
            <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
              {STATS.map(({ icon: Icon, value, label }) => (
                <motion.div
                  key={label}
                  whileHover={{ scale: 1.05 }}
                  style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, padding: '0.75rem 1.25rem', minWidth: 80 }}
                >
                  <Icon size={18} style={{ color: '#3b82f6', marginBottom: 4 }} />
                  <span style={{ fontWeight: 700, fontSize: '1.1rem', color: '#f8fafc' }}>{value}</span>
                  <span style={{ fontSize: '0.7rem', color: '#64748b', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</span>
                </motion.div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
              <motion.a
                href="#projects"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '0.85rem 2rem', background: '#3b82f6', color: '#fff', borderRadius: 10, fontWeight: 600, fontSize: '0.95rem', boxShadow: '0 0 24px rgba(59,130,246,0.3)' }}
              >
                View Projects <ChevronRight size={18} />
              </motion.a>
              <motion.a
                href="https://drive.google.com/file/d/1TLd8xwvrob6ehsvy9SxhMc2-BEwWexWm/view?usp=sharing"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '0.85rem 2rem', border: '1px solid #3b82f6', color: '#3b82f6', borderRadius: 10, fontWeight: 600, fontSize: '0.95rem', background: 'transparent' }}
              >
                <Download size={18} /> Download CV
              </motion.a>
            </div>

            {/* Social Links */}
            <div style={{ display: 'flex', gap: '1.25rem' }}>
              {[
                { icon: Github, href: 'https://github.com/Ayush-Pratap-Singh-001', label: 'GitHub' },
                { icon: Linkedin, href: 'https://www.linkedin.com/in/ayushpsingh001', label: 'LinkedIn' },
                { icon: Mail, href: 'mailto:singhpratapayush001@gmail.com', label: 'Email' },
              ].map(({ icon: Icon, href, label }) => (
                <motion.a key={label} href={href} target="_blank" rel="noopener noreferrer"
                  whileHover={{ y: -3, color: '#3b82f6' }}
                  style={{ color: '#64748b', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, transition: 'color 0.2s' }}
                  aria-label={label}
                >
                  <Icon size={22} />
                  <span style={{ fontSize: '0.6rem', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Right Side — Terminal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            style={{ position: 'relative' }}
            className="hero-terminal"
          >
            {/* Glow */}
            <div style={{ position: 'absolute', inset: -20, background: 'linear-gradient(135deg, rgba(59,130,246,0.15), rgba(139,92,246,0.15))', borderRadius: 24, filter: 'blur(30px)', zIndex: 0 }} />

            <div style={{ position: 'relative', zIndex: 1, background: 'rgba(15,23,42,0.85)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 16, overflow: 'hidden', boxShadow: '0 25px 60px rgba(0,0,0,0.4)' }}>
              {/* Tab Bar */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1rem', borderBottom: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.03)' }}>
                <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ff5f57' }} />
                <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ffc629' }} />
                <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#28c840' }} />
                <span style={{ marginLeft: 12, fontSize: '0.75rem', color: '#aeb2b8', fontFamily: 'var(--font-mono)' }}>ayush@dev: ~</span>
                <span style={{ marginLeft: 'auto', fontSize: '0.65rem', color: '#aeb2b8', fontFamily: 'var(--font-mono)', background: 'rgba(255,255,255,0.05)', padding: '2px 8px', borderRadius: 4 }}>shell</span>
              </div>

              {/* Terminal Body */}
              <div style={{ padding: '1.25rem', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', lineHeight: 1.8, minHeight: 280, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {TERMINAL_LINES.map((line, idx) => (
                  <AnimatePresence key={idx}>
                    {terminalStep > idx && (
                      <motion.div
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <TerminalLine line={line} visible={true} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                ))}
                <p style={{ color: '#10b981', display: 'flex', gap: 8 }}>
                  <span>❯</span>
                  <span style={{ animation: 'blink 1s step-end infinite' }}>_</span>
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '3rem', color: '#334155', gap: 4 }}
        >
          <span style={{ fontSize: '0.65rem', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.15em' }}>Scroll</span>
          <ChevronDown size={20} />
        </motion.div>
      </div>

      <style>{`
        @keyframes blink { 50% { opacity: 0; } }
        .hero-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 3rem;
          align-items: center;
        }
        .hero-terminal { display: none; }
        @media (min-width: 1024px) {
          .hero-grid { grid-template-columns: 1fr 1fr; }
          .hero-terminal { display: block; }
        }
      `}</style>
    </section>
  );
};

export default Hero;
