import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, ExternalLink, FolderCode, X, ChevronRight } from 'lucide-react';

const PROJECTS = [
    {
        title: 'Library Management System',
        shortDesc: 'Enterprise-grade backend for book tracking, member management & automated fine calculation.',
        longDesc: 'A full-featured RESTful backend system built with Spring Boot and MySQL. Implements multi-role access control, automated overdue fine computation, and a Thymeleaf-driven admin dashboard.',
        highlights: ['JWT-secured multi-role auth (Admin/Member)', 'Automated fine calculation engine', 'Full CRUD with Hibernate ORM & MySQL', 'Admin dashboard via Thymeleaf templates'],
        tech: ['Spring Boot', 'MySQL', 'Thymeleaf', 'JPA/Hibernate'],
        category: 'Backend',
        github: 'https://github.com',
        live: '#',
        color: '#3b82f6',
    },
    {
        title: 'Movies Management System',
        shortDesc: 'Full-stack movie catalog with real-time search, ratings, and user review workflows.',
        longDesc: 'A full-stack application combining a FastAPI backend with a React frontend, backed by PostgreSQL. Features real-time search, user reviews, and dynamic filtering by genre and rating.',
        highlights: ['Async FastAPI with SQLAlchemy ORM', 'Real-time search with filtered endpoints', 'Pagination and sorting for large datasets', 'React SPA with REST API integration'],
        tech: ['FastAPI', 'React', 'PostgreSQL', 'SQLAlchemy'],
        category: 'Full Stack',
        github: 'https://github.com',
        live: '#',
        color: '#8b5cf6',
    },
    {
        title: 'LeetCode Auto Solver',
        shortDesc: 'Chrome extension using OpenRouter AI to auto-generate and inject solutions into LeetCode.',
        longDesc: 'A browser extension that sends the current LeetCode problem to an AI backend (FastAPI + OpenRouter) and injects the generated solution directly into the editor. Handles rate limiting and error states gracefully.',
        highlights: ['Chrome extension with content script injection', 'FastAPI AI proxy with OpenRouter API', 'Secure prompt engineering and error handling', 'DOM manipulation for code editor integration'],
        tech: ['JavaScript', 'Python', 'FastAPI', 'OpenRouter AI'],
        category: 'Automation',
        github: 'https://github.com',
        live: '#',
        color: '#10b981',
    },
    {
        title: 'File Sharing Web App',
        shortDesc: 'LAN-based peer-to-peer file sharing without internet, using WebSockets and WebRTC.',
        longDesc: 'A local-network file transfer application that requires no internet. Uses WebRTC for direct peer connections and Socket.io for signalling. Supports drag-and-drop uploads and progress tracking.',
        highlights: ['Zero-internet P2P file transfer via WebRTC', 'Socket.io signalling server with Node.js', 'Drag-and-drop UI with real-time progress', 'Multi-peer LAN discovery'],
        tech: ['Node.js', 'Socket.io', 'WebRTC', 'Express'],
        category: 'Web',
        github: 'https://github.com',
        live: '#',
        color: '#f59e0b',
    },
    {
        title: 'Personal AI Assistant',
        shortDesc: 'Voice-controlled desktop assistant for task automation, app control, and information retrieval.',
        longDesc: 'A Python-based AI assistant that responds to voice commands for launching apps, answering queries via an LLM, and automating repetitive desktop tasks. Built with SpeechRecognition and OpenRouter.',
        highlights: ['Real-time speech recognition pipeline', 'LLM integration for intelligent responses', 'Desktop automation with PyAutoGUI', 'Modular command plugin architecture'],
        tech: ['Python', 'SpeechRecognition', 'OpenRouter', 'PyAutoGUI'],
        category: 'AI',
        github: 'https://github.com',
        live: '#',
        color: '#ec4899',
    },
];

const FILTERS = ['All', 'Backend', 'Full Stack', 'AI', 'Web', 'Automation'];

const ProjectModal = ({ project, onClose }) => (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', backdropFilter: 'blur(8px)' }}
    >
        <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.85, opacity: 0 }}
            onClick={e => e.stopPropagation()}
            style={{ background: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 20, maxWidth: 600, width: '100%', overflow: 'hidden', boxShadow: `0 0 60px ${project.color}20` }}
        >
            {/* Header */}
            <div style={{ padding: '1.5rem 1.5rem 1rem', borderBottom: '1px solid rgba(255,255,255,0.07)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                    <div style={{ width: 36, height: 36, borderRadius: 10, background: `${project.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.75rem' }}>
                        <FolderCode size={20} style={{ color: project.color }} />
                    </div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>{project.title}</h3>
                    <span style={{ fontSize: '0.7rem', background: `${project.color}20`, color: project.color, padding: '2px 10px', borderRadius: 999, fontFamily: 'var(--font-mono)', marginTop: 6, display: 'inline-block' }}>{project.category}</span>
                </div>
                <button onClick={onClose} style={{ background: 'rgba(255,255,255,0.07)', border: 'none', color: '#94a3b8', borderRadius: 8, padding: '0.4rem', cursor: 'pointer', display: 'flex' }}>
                    <X size={18} />
                </button>
            </div>
            {/* Body */}
            <div style={{ padding: '1.5rem' }}>
                <p style={{ color: '#94a3b8', lineHeight: 1.8, marginBottom: '1.25rem' }}>{project.longDesc}</p>
                <h4 style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: project.color, fontFamily: 'var(--font-mono)', marginBottom: '0.75rem' }}>Key Features</h4>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.5rem' }}>
                    {project.highlights.map(h => (
                        <li key={h} style={{ display: 'flex', gap: 8, color: '#94a3b8', fontSize: '0.875rem' }}>
                            <ChevronRight size={16} style={{ color: project.color, flexShrink: 0, marginTop: 2 }} /> {h}
                        </li>
                    ))}
                </ul>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem' }}>
                    {project.tech.map(t => (
                        <span key={t} style={{ fontSize: '0.7rem', fontFamily: 'var(--font-mono)', background: 'rgba(255,255,255,0.07)', color: '#94a3b8', padding: '4px 10px', borderRadius: 6 }}>{t}</span>
                    ))}
                </div>
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <a href={project.github} target="_blank" rel="noopener noreferrer"
                        style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '0.75rem', background: 'rgba(255,255,255,0.07)', color: '#f8fafc', borderRadius: 10, fontWeight: 600, fontSize: '0.875rem' }}>
                        <Github size={16} /> GitHub
                    </a>
                    <a href={project.live} target="_blank" rel="noopener noreferrer"
                        style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '0.75rem', background: project.color, color: '#fff', borderRadius: 10, fontWeight: 600, fontSize: '0.875rem' }}>
                        <ExternalLink size={16} /> Live Demo
                    </a>
                </div>
            </div>
        </motion.div>
    </motion.div>
);

const ProjectCard = ({ project, onClick }) => (
    <motion.div
        layout
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.92 }}
        whileHover={{ y: -6, boxShadow: `0 20px 50px ${project.color}18` }}
        onClick={onClick}
        style={{
            background: 'rgba(15,23,42,0.8)',
            border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: 16,
            overflow: 'hidden',
            cursor: 'pointer',
            transition: 'border-color 0.2s, transform 0.2s',
            display: 'flex',
            flexDirection: 'column',
        }}
    >
        {/* Card top bar color */}
        <div style={{ height: 4, background: `linear-gradient(90deg, ${project.color}, ${project.color}88)` }} />

        {/* Thumbnail placeholder */}
        <div style={{ height: 140, background: `linear-gradient(135deg, ${project.color}12, ${project.color}06)`, display: 'flex', alignItems: 'center', justifyContent: 'center', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
            <FolderCode size={48} style={{ color: `${project.color}40` }} />
        </div>

        <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8, marginBottom: '0.75rem' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, lineHeight: 1.3 }}>{project.title}</h3>
                <div style={{ display: 'flex', gap: 10 }} onClick={e => e.stopPropagation()}>
                    <a href={project.github} target="_blank" rel="noopener noreferrer" style={{ color: '#64748b' }}><Github size={17} /></a>
                    <a href={project.live} target="_blank" rel="noopener noreferrer" style={{ color: '#64748b' }}><ExternalLink size={17} /></a>
                </div>
            </div>
            <p style={{ color: '#94a3b8', fontSize: '0.82rem', lineHeight: 1.7, marginBottom: '1rem', flex: 1 }}>{project.shortDesc}</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem' }}>
                {project.tech.slice(0, 3).map(t => (
                    <span key={t} style={{ fontSize: '0.65rem', fontFamily: 'var(--font-mono)', background: `${project.color}15`, color: project.color, padding: '3px 8px', borderRadius: 5, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{t}</span>
                ))}
                {project.tech.length > 3 && <span style={{ fontSize: '0.65rem', fontFamily: 'var(--font-mono)', color: '#64748b', padding: '3px 8px' }}>+{project.tech.length - 3} more</span>}
            </div>
            <div style={{ marginTop: '1rem', fontSize: '0.72rem', color: '#64748b', fontFamily: 'var(--font-mono)', display: 'flex', alignItems: 'center', gap: 4 }}>
                Click to view details <ChevronRight size={12} />
            </div>
        </div>
    </motion.div>
);

const Projects = () => {
    const [filter, setFilter] = useState('All');
    const [selected, setSelected] = useState(null);

    const filtered = filter === 'All' ? PROJECTS : PROJECTS.filter(p => p.category === filter);

    return (
        <section id="projects" style={{ padding: '100px 1.5rem' }}>
            <div style={{ maxWidth: 1200, margin: '0 auto' }}>

                {/* Header */}
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', gap: '1.5rem', marginBottom: '2.5rem' }}>
                    <div>
                        <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
                            style={{ color: '#3b82f6', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.2em', display: 'block', marginBottom: '0.5rem' }}>
                            03. Portfolio
                        </motion.span>
                        <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800 }}>Featured Projects</h2>
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                        {FILTERS.map(f => (
                            <button key={f} onClick={() => setFilter(f)}
                                style={{
                                    padding: '0.45rem 1rem', borderRadius: 999, border: 'none', cursor: 'pointer',
                                    fontSize: '0.75rem', fontFamily: 'var(--font-mono)',
                                    background: filter === f ? '#3b82f6' : 'rgba(255,255,255,0.07)',
                                    color: filter === f ? '#fff' : '#94a3b8',
                                    transition: 'all 0.2s',
                                    boxShadow: filter === f ? '0 0 14px rgba(59,130,246,0.3)' : 'none'
                                }}>
                                {f}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Grid */}
                <motion.div layout style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.25rem' }}>
                    <AnimatePresence mode="popLayout">
                        {filtered.map(p => (
                            <ProjectCard key={p.title} project={p} onClick={() => setSelected(p)} />
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>

            {/* Modal */}
            <AnimatePresence>
                {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
            </AnimatePresence>
        </section>
    );
};

export default Projects;
