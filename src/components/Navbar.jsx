import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Code2 } from 'lucide-react';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('home');

    const navLinks = [
        { name: 'About', href: '#about', id: 'about' },
        { name: 'Skills', href: '#skills', id: 'skills' },
        { name: 'Projects', href: '#projects', id: 'projects' },
        { name: 'Timeline', href: '#experience', id: 'experience' },
        { name: 'Certificates', href: '#certificates', id: 'certificates' },
        { name: 'Achievements', href: '#achievements', id: 'achievements' },
        { name: 'Contact', href: '#contact', id: 'contact' },
    ];

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 40);

            // Active section detection
            const sections = ['home', 'about', 'skills', 'projects', 'experience', 'certificates', 'achievements', 'contact'];
            let found = 'home';
            for (const id of sections) {
                const el = document.getElementById(id);
                if (el) {
                    const rect = el.getBoundingClientRect();
                    if (rect.top <= 100) found = id;
                }
            }
            setActiveSection(found);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav style={{
            position: 'fixed', top: 0, width: '100%', zIndex: 100,
            transition: 'all 0.3s ease',
            background: scrolled ? 'rgba(2, 6, 23, 0.92)' : 'transparent',
            backdropFilter: scrolled ? 'blur(20px)' : 'none',
            borderBottom: scrolled ? '1px solid rgba(255,255,255,0.07)' : 'none',
            padding: scrolled ? '0.6rem 0' : '1.1rem 0',
        }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
            {/* Logo — left aligned */}
            <a href="#home" style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
                    <div style={{ width: 36, height: 36, background: '#3b82f6', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'transform 0.2s' }}>
                        <Code2 size={20} style={{ color: '#fff' }} />
                    </div>
                    <span style={{ fontSize: '1.1rem', fontWeight: 800, fontFamily: 'var(--font-heading)', letterSpacing: '-0.03em' }}>
                        AYUSH<span style={{ color: '#3b82f6' }}>.</span>DEV
                    </span>
                </a>

                {/* Desktop Links */}
                <div style={{ display: 'none', alignItems: 'center', gap: '1.25rem' }} className="nav-desktop">
                    {navLinks.map((link, i) => {
                        const isActive = activeSection === link.id;
                        return (
                            <a
                                key={link.name}
                                href={link.href}
                                style={{
                                    fontSize: '0.78rem',
                                    fontFamily: 'var(--font-mono)',
                                    color: isActive ? '#3b82f6' : '#94a3b8',
                                    transition: 'color 0.2s',
                                    position: 'relative',
                                    paddingBottom: 4,
                                }}
                            >
                                <span style={{ color: '#3b82f6', marginRight: 4 }}>0{i + 1}.</span>
                                {link.name}
                                {isActive && (
                                    <motion.div
                                        layoutId="activeNav"
                                        style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 2, background: '#3b82f6', borderRadius: 2 }}
                                    />
                                )}
                            </a>
                        );
                    })}
                </div>

                {/* Mobile Toggle */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    style={{ background: 'none', border: 'none', color: '#f8fafc', padding: 4, display: 'block' }}
                    className="nav-mobile-toggle"
                >
                    {isOpen ? <X size={26} /> : <Menu size={26} />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        style={{ overflow: 'hidden', borderTop: '1px solid rgba(255,255,255,0.07)', background: 'rgba(2,6,23,0.97)' }}
                    >
                        <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                            {navLinks.map((link, i) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setIsOpen(false)}
                                    style={{ fontFamily: 'var(--font-mono)', color: activeSection === link.id ? '#3b82f6' : '#94a3b8', fontSize: '1rem' }}
                                >
                                    <span style={{ color: '#3b82f6', marginRight: 8 }}>0{i + 1}.</span>
                                    {link.name}
                                </a>
                            ))}
                            <a href="#contact" onClick={() => setIsOpen(false)}
                                style={{ padding: '0.75rem', background: '#3b82f6', color: '#fff', textAlign: 'center', borderRadius: 10, fontWeight: 600 }}>
                                Let's Connect
                            </a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <style>{`
        @media (min-width: 768px) {
          .nav-desktop { display: flex !important; }
          .nav-mobile-toggle { display: none !important; }
        }
      `}</style>
        </nav>
    );
};

export default Navbar;
