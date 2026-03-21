import React, { useState } from 'react';
import { motion } from 'framer-motion';

const SKILL_GROUPS = [
    {
        category: 'Languages',
        color: '#3b82f6',
        skills: [
            { name: 'Java', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' },
            { name: 'Python', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
            { name: 'C++', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg' },
            { name: 'JavaScript', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
        ]
    },
    {
        category: 'Frameworks',
        color: '#8b5cf6',
        skills: [
            { name: 'Spring Boot', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg' },
            { name: 'FastAPI', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg' },
            { name: 'Hibernate', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/hibernate/hibernate-original.svg' },
            { name: 'React', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
        ]
    },
    {
        category: 'Databases',
        color: '#10b981',
        skills: [
            { name: 'MySQL', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
            { name: 'PostgreSQL', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
            { name: 'MongoDB', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
            { name: 'Redis', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg' },
        ]
    },
    {
        category: 'DevOps & Cloud',
        color: '#f59e0b',
        skills: [
            { name: 'Docker', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
            { name: 'Git', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
            { name: 'Linux', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg' },
            { name: 'AWS', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg' },
        ]
    }
];

const SkillBadge = ({ name, logo, color }) => (
    <motion.div
        whileHover={{ y: -6, boxShadow: `0 10px 30px ${color}30` }}
        style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 10,
            padding: '1.25rem 1rem',
            background: 'var(--card-bg)',
            border: '1px solid var(--card-border)',
            borderRadius: 14,
            transition: 'all 0.25s ease',
            cursor: 'default',
            width: 110,
            flexShrink: 0,
            boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
        }}
    >
        <img
            src={logo}
            alt={name}
            style={{ width: 40, height: 40, objectFit: 'contain' }}
            onError={e => { e.target.style.display = 'none'; }}
        />
        <span style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)', textAlign: 'center' }}>{name}</span>
    </motion.div>
);

const Skills = () => {
    const [active, setActive] = useState('All');

    const categories = ['All', ...SKILL_GROUPS.map(g => g.category)];
    const displayed = active === 'All' ? SKILL_GROUPS : SKILL_GROUPS.filter(g => g.category === active);

    return (
        <section id="skills" style={{ padding: '100px 1.5rem', background: 'var(--bg-secondary)' }}>
            <div style={{ maxWidth: 1200, margin: '0 auto' }}>

                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
                        style={{ color: 'var(--accent-blue)', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.2em', display: 'block', marginBottom: '0.75rem' }}>
                        02. Technical Arsenal
                    </motion.span>
                    <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, marginBottom: '1rem', color: 'var(--text-primary)' }}>Skills & Technologies</h2>
                    <div style={{ width: 60, height: 3, background: 'linear-gradient(90deg, #3b82f6, #8b5cf6)', margin: '0 auto 2rem', borderRadius: 2 }} />

                    {/* Filter tabs */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.5rem' }}>
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setActive(cat)}
                                style={{
                                    padding: '0.45rem 1.1rem',
                                    borderRadius: 999,
                                    border: '1px solid ' + (active === cat ? 'transparent' : 'var(--card-border)'),
                                    fontSize: '0.78rem',
                                    fontFamily: 'var(--font-mono)',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s',
                                    background: active === cat ? 'var(--accent-blue)' : 'var(--card-bg)',
                                    color: active === cat ? '#fff' : 'var(--text-secondary)',
                                    boxShadow: active === cat ? '0 0 16px rgba(59,130,246,0.35)' : 'none',
                                }}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Skill Groups */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                    {displayed.map(({ category, color, skills }) => (
                        <motion.div key={category} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
                                <div style={{ height: 2, width: 28, background: color, borderRadius: 2 }} />
                                <h3 style={{ fontSize: '0.82rem', color, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.12em' }}>{category}</h3>
                                <div style={{ height: 2, width: 28, background: color, borderRadius: 2 }} />
                            </div>
                            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.875rem' }}>
                                {skills.map(s => <SkillBadge key={s.name} {...s} color={color} style={{ width: 110 }} />)}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;
