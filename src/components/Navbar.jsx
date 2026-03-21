import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Code2, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('home');
    const { isDark, toggleTheme } = useTheme();

    const navLinks = [
        { name: 'About', href: '#about', id: 'about' },
        { name: 'Skills', href: '#skills', id: 'skills' },
        { name: 'Projects', href: '#projects', id: 'projects' },
        { name: 'Academics', href: '#experience', id: 'experience' },
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

    const navBg = isDark
        ? scrolled ? 'rgba(2, 6, 23, 0.92)' : 'transparent'
        : scrolled ? 'rgba(240, 244, 255, 0.92)' : 'transparent';

    const navBorder = scrolled
        ? isDark ? '1px solid rgba(255,255,255,0.07)' : '1px solid rgba(0,0,0,0.08)'
        : 'none';

    const logoColor = isDark ? '#fff' : '#0f172a';
    const linkColor = isDark ? '#ffffff' : '#0f172a';
    const mobileMenuBg = isDark ? 'rgba(2,6,23,0.97)' : 'rgba(240,244,255,0.98)';
    const mobileMenuBorder = isDark ? '1px solid rgba(255,255,255,0.07)' : '1px solid rgba(0,0,0,0.08)';
    const mobileLinkColor = isDark ? '#94a3b8' : '#475569';
    const mobileToggleColor = isDark ? '#f8fafc' : '#0f172a';

    return (
        <nav style={{
            position: 'fixed', top: 0, width: '100%', zIndex: 100,
            transition: 'all 0.3s ease',
            background: navBg,
            backdropFilter: scrolled ? 'blur(20px)' : 'none',
            borderBottom: navBorder,
            padding: scrolled ? '0.6rem 0' : '1.1rem 0',
        }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
            {/* Logo — left aligned */}
            <a href="#home" style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
                    <div style={{ width: 36, height: 36, background: '#3b82f6', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'transform 0.2s' }}>
                        <Code2 size={20} style={{ color: '#fff' }} />
                    </div>
                    <span style={{ fontSize: '1.1rem', fontWeight: 800, fontFamily: 'var(--font-heading)', letterSpacing: '-0.03em', color: logoColor }}>
                        AYUSH PORTFOLIO<span style={{ color: '#3b82f6' }}></span>
                    </span>
                </a>

                {/* Desktop Links + Toggle */}
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
                                    color: isActive ? '#3b82f6' : linkColor,
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

                    {/* Theme Toggle Button */}
                    <ThemeToggleButton isDark={isDark} toggleTheme={toggleTheme} />
                </div>

                {/* Mobile: Toggle + Menu */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }} className="nav-mobile-group">
                    <ThemeToggleButton isDark={isDark} toggleTheme={toggleTheme} small />
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        style={{ background: 'none', border: 'none', color: mobileToggleColor, padding: 4, display: 'block' }}
                        className="nav-mobile-toggle"
                    >
                        {isOpen ? <X size={26} /> : <Menu size={26} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        style={{ overflow: 'hidden', borderTop: mobileMenuBorder, background: mobileMenuBg }}
                    >
                        <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                            {navLinks.map((link, i) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setIsOpen(false)}
                                    style={{ fontFamily: 'var(--font-mono)', color: activeSection === link.id ? '#3b82f6' : mobileLinkColor, fontSize: '1rem' }}
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
          .nav-mobile-group { display: none !important; }
        }
        @media (max-width: 767px) {
          .nav-mobile-group { display: flex !important; }
        }
      `}</style>
        </nav>
    );
};

/* ─── Animated Sun / Moon Toggle ──────────────────────── */
const ThemeToggleButton = ({ isDark, toggleTheme, small }) => {
    const size = small ? 32 : 38;
    const iconSize = small ? 14 : 16;

    return (
        <motion.button
            id="theme-toggle-btn"
            onClick={toggleTheme}
            whileTap={{ scale: 0.88 }}
            whileHover={{ scale: 1.08 }}
            aria-label="Toggle light/dark mode"
            title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            style={{
                width: size * 1.75,
                height: size,
                borderRadius: size,
                background: isDark
                    ? 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)'
                    : 'linear-gradient(135deg, #bfdbfe 0%, #ddd6fe 100%)',
                border: isDark ? '1.5px solid rgba(255,255,255,0.12)' : '1.5px solid rgba(37,99,235,0.25)',
                display: 'flex',
                alignItems: 'center',
                padding: '3px',
                cursor: 'pointer',
                position: 'relative',
                flexShrink: 0,
                boxShadow: isDark
                    ? '0 0 12px rgba(59,130,246,0.25)'
                    : '0 0 12px rgba(250,204,21,0.35)',
            }}
        >
            {/* Sliding pill */}
            <motion.div
                layout
                animate={{ x: isDark ? 0 : size * 0.75 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                style={{
                    width: size - 6,
                    height: size - 6,
                    borderRadius: '50%',
                    background: isDark
                        ? 'linear-gradient(135deg, #3b82f6, #8b5cf6)'
                        : 'linear-gradient(135deg, #facc15, #fb923c)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: isDark
                        ? '0 2px 8px rgba(139,92,246,0.5)'
                        : '0 2px 8px rgba(251,146,60,0.5)',
                    flexShrink: 0,
                }}
            >
                <AnimatePresence mode="wait" initial={false}>
                    {isDark ? (
                        <motion.span
                            key="moon"
                            initial={{ rotate: -45, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: 45, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                        >
                            <Moon size={iconSize} color="#fff" />
                        </motion.span>
                    ) : (
                        <motion.span
                            key="sun"
                            initial={{ rotate: 45, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: -45, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                        >
                            <Sun size={iconSize} color="#fff" />
                        </motion.span>
                    )}
                </AnimatePresence>
            </motion.div>
        </motion.button>
    );
};

export default Navbar;
