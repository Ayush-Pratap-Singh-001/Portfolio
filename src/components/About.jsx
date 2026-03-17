import React from 'react';
import { motion } from 'framer-motion';
import { Server, Globe, GitBranch, Zap, Cloud, Users } from 'lucide-react';

const highlights = [
    { icon: Server, title: 'Backend Engineering', desc: 'Designing scalable REST APIs and microservices with Java & Spring Boot.' },
    { icon: Cloud, title: 'Cloud & DevOps', desc: 'Exploring AWS, Docker containerization, and CI/CD pipeline automation.' },
    { icon: Globe, title: 'Full-Stack Exposure', desc: 'Building end-to-end features using Python, FastAPI, and React frontends.' },
    { icon: GitBranch, title: 'Open Source', desc: 'Contributing to projects and solving 100+ algorithmic challenges on LeetCode.' },
    { icon: Zap, title: 'Performance Focus', desc: 'Optimizing system throughput, query efficiency, and memory management.' },
    { icon: Users, title: 'Collaborative Builder', desc: 'Working in teams on real-world projects with version control and agile practices.' },
];

const Stats = [
    { value: '3+', label: 'Years Coding', color: '#3b82f6' },
    { value: '15+', label: 'Projects Built', color: '#8b5cf6' },
    { value: '100+', label: 'LeetCode Problems', color: '#10b981' },
    { value: '24/7', label: 'Passion for Code', color: '#f59e0b' },
];

const About = () => (
    <section id="about" style={{ padding: '100px 1.5rem' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>

            {/* Section Header */}
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
                    style={{ color: '#3b82f6', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.2em', display: 'block', marginBottom: '0.75rem' }}>
                    01. Introduction
                </motion.span>
                <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, marginBottom: '1rem' }}>About Me</h2>
                <div style={{ width: 60, height: 3, background: 'linear-gradient(90deg, #3b82f6, #8b5cf6)', margin: '0 auto', borderRadius: 2 }} />
            </div>

            {/* Bio Block — Photo + Text side by side */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="about-bio-grid"
            >
                {/* Profile Image */}
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <div style={{ position: 'relative' }}>
                        {/* Gradient glow ring */}
                        <div style={{
                            position: 'absolute', inset: -4,
                            borderRadius: '50%',
                            background: 'linear-gradient(135deg, #3b82f6, #8b5cf6, #10b981)',
                            zIndex: 0,
                            filter: 'blur(2px)',
                        }} />
                        {/* Circular image frame */}
                        <div style={{
                            position: 'relative', zIndex: 1,
                            width: 250, height: 250,
                            borderRadius: '50%',
                            overflow: 'hidden',
                            border: '4px solid #020617',
                        }}>
                            {/*
                             * ✏️  HOW TO ADD YOUR PHOTO:
                             *   1. Copy your photo to:  d:\Portfolio\public\profile.jpg
                             *   2. That's it — it will appear automatically.
                             *   You can also change "profile.jpg" below to any other filename.
                             */}
                            <img
                                src="/profile.jpg"
                                alt="Ayush — Backend Engineer"
                                onError={e => { e.currentTarget.style.display = 'none'; }}
                                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }}
                            />
                            {/* Placeholder shown until you add your photo */}
                            <div style={{
                                position: 'absolute', inset: 0,
                                display: 'flex', flexDirection: 'column',
                                alignItems: 'center', justifyContent: 'center',
                                background: 'linear-gradient(135deg, rgba(59,130,246,0.12), rgba(139,92,246,0.12))',
                                gap: 8,
                            }}>
                                <span style={{ fontSize: '5rem', lineHeight: 1 }}>👤</span>
                                <span style={{ fontSize: '0.65rem', fontFamily: 'var(--font-mono)', color: '#475569', letterSpacing: '0.05em' }}>
                                    /public/profile.jpg
                                </span>
                            </div>
                        </div>

                        {/* Floating "Open to work" badge */}
                        <motion.div
                            animate={{ y: [0, -6, 0] }}
                            transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
                            style={{
                                position: 'absolute', bottom: 8, right: -16, zIndex: 2,
                                background: '#0f172a',
                                border: '1px solid rgba(255,255,255,0.1)',
                                borderRadius: 12, padding: '0.4rem 0.8rem',
                                fontSize: '0.7rem', fontFamily: 'var(--font-mono)',
                                color: '#10b981',
                                display: 'flex', alignItems: 'center', gap: 6,
                                boxShadow: '0 4px 24px rgba(0,0,0,0.5)',
                                whiteSpace: 'nowrap',
                            }}
                        >
                            <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#10b981', display: 'inline-block', flexShrink: 0 }} />
                            Open to work
                        </motion.div>
                    </div>
                </div>

                {/* Bio Text */}
                <div>
                    <p style={{ color: '#94a3b8', fontSize: '1.05rem', lineHeight: 1.9, marginBottom: '1.25rem' }}>
                        Hey! I'm <span style={{ color: '#3b82f6', fontWeight: 600 }}>Ayush</span>, a software engineering student at{' '}
                        <span style={{ color: '#f8fafc', fontWeight: 500 }}>Lovely Professional University</span>, passionate about building backend systems that are fast, reliable and maintainable.
                    </p>
                    <p style={{ color: '#94a3b8', fontSize: '1.05rem', lineHeight: 1.9, marginBottom: '1.75rem' }}>
                        I thrive at the intersection of <span style={{ color: '#f8fafc', fontWeight: 500 }}>system design and clean code</span> — whether that's designing efficient database schemas, architecting RESTful APIs with Spring Boot, or experimenting with cloud infrastructure on AWS.
                    </p>
                    {/* Quick fact chips */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                        {['📍 India', '🎓 B.Tech CSE', '☕ Java Enthusiast', '🚀 Backend-First'].map(chip => (
                            <span key={chip} style={{
                                fontSize: '0.78rem', padding: '0.35rem 0.875rem',
                                background: 'rgba(255,255,255,0.05)',
                                border: '1px solid rgba(255,255,255,0.08)',
                                borderRadius: 999, color: '#94a3b8',
                            }}>
                                {chip}
                            </span>
                        ))}
                    </div>
                </div>
            </motion.div>

            {/* Highlight Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem', marginBottom: '4rem' }}>
                {highlights.map(({ icon: Icon, title, desc }, i) => (
                    <motion.div
                        key={title}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.08 }}
                        whileHover={{ y: -4, borderColor: 'rgba(59,130,246,0.4)' }}
                        style={{
                            background: 'rgba(15,23,42,0.7)',
                            border: '1px solid rgba(255,255,255,0.07)',
                            borderRadius: 14,
                            padding: '1.5rem',
                            display: 'flex',
                            gap: '1rem',
                            cursor: 'default',
                            transition: 'border-color 0.2s, transform 0.2s',
                        }}
                    >
                        <div style={{ width: 44, height: 44, borderRadius: 10, background: 'rgba(59,130,246,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                            <Icon size={22} style={{ color: '#3b82f6' }} />
                        </div>
                        <div>
                            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '0.35rem', color: '#f8fafc' }}>{title}</h4>
                            <p style={{ fontSize: '0.82rem', color: '#94a3b8', lineHeight: 1.7 }}>{desc}</p>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Stats Row */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '1rem' }}>
                {Stats.map(({ value, label, color }, i) => (
                    <motion.div
                        key={label}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                        style={{ textAlign: 'center', padding: '1.5rem', background: 'rgba(15,23,42,0.6)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 14 }}
                    >
                        <div style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', fontWeight: 800, color, fontFamily: 'var(--font-heading)' }}>{value}</div>
                        <div style={{ fontSize: '0.72rem', color: '#64748b', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: 6 }}>{label}</div>
                    </motion.div>
                ))}
            </div>
        </div>

        <style>{`
            .about-bio-grid {
                display: grid;
                grid-template-columns: 1fr;
                gap: 2.5rem;
                align-items: center;
                max-width: 880px;
                margin: 0 auto 4rem;
                text-align: center;
            }
            @media (min-width: 768px) {
                .about-bio-grid {
                    grid-template-columns: auto 1fr;
                    text-align: left;
                }
            }
        `}</style>
    </section>
);

export default About;
