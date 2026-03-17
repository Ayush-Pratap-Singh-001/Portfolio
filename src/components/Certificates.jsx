import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, ExternalLink, X, ChevronRight, BadgeCheck, Calendar } from 'lucide-react';

const CERTIFICATES = [
    {
        title: 'AWS Cloud Practitioner Essentials',
        issuer: 'Amazon Web Services (AWS)',
        shortDesc: 'Foundational understanding of AWS Cloud infrastructure, services, security, and pricing models.',
        longDesc: 'Completed the AWS Cloud Practitioner Essentials certification covering core AWS services, cloud concepts, security best practices, architecture principles, and pricing/support models for cloud infrastructure.',
        skills: ['Cloud Computing', 'AWS S3 & EC2', 'IAM & Security', 'Cloud Architecture', 'Cost Optimization'],
        category: 'Cloud',
        date: '2024',
        credentialId: 'AWS-CPE-2024',
        link: '#',
        color: '#f59e0b',
    },
    {
        title: 'Java Programming Masterclass',
        issuer: 'Udemy — Tim Buchalka',
        shortDesc: 'Comprehensive Java programming covering OOP, data structures, generics, collections, and multi-threading.',
        longDesc: 'Mastered Java from fundamentals to advanced topics including Object-Oriented Programming, Collections Framework, Generics, Lambda Expressions, Streams API, and multi-threaded application development.',
        skills: ['OOP', 'Collections', 'Lambda & Streams', 'Multi-threading', 'Design Patterns'],
        category: 'Programming',
        date: '2023',
        credentialId: 'UC-JAVA-2023',
        link: '#',
        color: '#3b82f6',
    },
    {
        title: 'Full Stack Web Development',
        issuer: 'Coursera — Meta',
        shortDesc: 'End-to-end web development with React, Node.js, databases, APIs, and deployment workflows.',
        longDesc: 'A comprehensive full-stack curriculum covering HTML/CSS, JavaScript, React.js, Node.js, REST APIs, relational and non-relational databases, version control, and cloud deployment pipelines.',
        skills: ['React.js', 'Node.js', 'REST APIs', 'SQL', 'Docker'],
        category: 'Web Dev',
        date: '2024',
        credentialId: 'META-FSWD-2024',
        link: '#',
        color: '#8b5cf6',
    },
    {
        title: 'Python for Data Science & AI',
        issuer: 'IBM — Coursera',
        shortDesc: 'Python programming for data science including NumPy, Pandas, Matplotlib, and ML fundamentals.',
        longDesc: 'Covered Python programming principles with a data science focus — data manipulation with Pandas, numerical computing with NumPy, data visualization with Matplotlib/Seaborn, and introductory machine learning with Scikit-learn.',
        skills: ['Python', 'Pandas', 'NumPy', 'Matplotlib', 'Scikit-learn'],
        category: 'Data Science',
        date: '2023',
        credentialId: 'IBM-PDS-2023',
        link: '#',
        color: '#10b981',
    },
    {
        title: 'Spring Boot & Microservices',
        issuer: 'Udemy — Chad Darby',
        shortDesc: 'Building production-grade REST APIs and microservices with Spring Boot, JPA, and Spring Security.',
        longDesc: 'Deep dive into Spring Boot ecosystem — Spring MVC, Spring Data JPA, Spring Security with JWT, microservices architecture, service discovery with Eureka, and API gateway configuration.',
        skills: ['Spring Boot', 'REST APIs', 'Spring Security', 'JPA/Hibernate', 'Microservices'],
        category: 'Backend',
        date: '2024',
        credentialId: 'UD-SB-2024',
        link: '#',
        color: '#ec4899',
    },
    {
        title: 'Database Design & SQL',
        issuer: 'Oracle Academy',
        shortDesc: 'Relational database design principles, SQL querying, normalization, and performance optimization.',
        longDesc: 'Comprehensive course on relational database concepts including entity-relationship modeling, schema normalization (1NF–3NF), advanced SQL queries, indexing strategies, transactions, and ACID compliance.',
        skills: ['SQL', 'Database Design', 'Normalization', 'Indexing', 'Query Optimization'],
        category: 'Database',
        date: '2023',
        credentialId: 'ORA-DB-2023',
        link: '#',
        color: '#06b6d4',
    },
];

const FILTERS = ['All', 'Cloud', 'Programming', 'Web Dev', 'Data Science', 'Backend', 'Database'];

const CertModal = ({ cert, onClose }) => (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.75)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', backdropFilter: 'blur(8px)' }}
    >
        <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.85, opacity: 0 }}
            onClick={e => e.stopPropagation()}
            style={{ background: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 20, maxWidth: 580, width: '100%', overflow: 'hidden', boxShadow: `0 0 60px ${cert.color}20` }}
        >
            {/* Header stripe */}
            <div style={{ height: 4, background: `linear-gradient(90deg, ${cert.color}, ${cert.color}55)` }} />

            {/* Header */}
            <div style={{ padding: '1.5rem 1.5rem 1rem', borderBottom: '1px solid rgba(255,255,255,0.07)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                    <div style={{ width: 40, height: 40, borderRadius: 10, background: `${cert.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.75rem' }}>
                        <Award size={22} style={{ color: cert.color }} />
                    </div>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 700, lineHeight: 1.3, marginBottom: '0.4rem' }}>{cert.title}</h3>
                    <p style={{ color: '#94a3b8', fontSize: '0.82rem' }}>{cert.issuer}</p>
                    <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem', flexWrap: 'wrap' }}>
                        <span style={{ fontSize: '0.68rem', background: `${cert.color}20`, color: cert.color, padding: '2px 10px', borderRadius: 999, fontFamily: 'var(--font-mono)' }}>{cert.category}</span>
                        <span style={{ fontSize: '0.68rem', background: 'rgba(255,255,255,0.07)', color: '#94a3b8', padding: '2px 10px', borderRadius: 999, fontFamily: 'var(--font-mono)', display: 'flex', alignItems: 'center', gap: 4 }}>
                            <Calendar size={10} /> {cert.date}
                        </span>
                    </div>
                </div>
                <button onClick={onClose} style={{ background: 'rgba(255,255,255,0.07)', border: 'none', color: '#94a3b8', borderRadius: 8, padding: '0.4rem', cursor: 'pointer', display: 'flex', flexShrink: 0 }}>
                    <X size={18} />
                </button>
            </div>

            {/* Body */}
            <div style={{ padding: '1.5rem' }}>
                <p style={{ color: '#94a3b8', lineHeight: 1.8, marginBottom: '1.25rem' }}>{cert.longDesc}</p>

                <h4 style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: cert.color, fontFamily: 'var(--font-mono)', marginBottom: '0.75rem' }}>Skills Covered</h4>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', marginBottom: '1.5rem' }}>
                    {cert.skills.map(s => (
                        <li key={s} style={{ display: 'flex', gap: 8, color: '#94a3b8', fontSize: '0.875rem' }}>
                            <ChevronRight size={16} style={{ color: cert.color, flexShrink: 0, marginTop: 2 }} /> {s}
                        </li>
                    ))}
                </ul>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem 1rem', background: 'rgba(255,255,255,0.04)', borderRadius: 10, marginBottom: '1rem', fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: '#64748b' }}>
                    <span>Credential ID</span>
                    <span style={{ color: '#94a3b8' }}>{cert.credentialId}</span>
                </div>

                <a href={cert.link} target="_blank" rel="noopener noreferrer"
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '0.8rem', background: cert.color, color: '#fff', borderRadius: 10, fontWeight: 600, fontSize: '0.875rem' }}>
                    <ExternalLink size={15} /> View Certificate
                </a>
            </div>
        </motion.div>
    </motion.div>
);

const CertCard = ({ cert, onClick }) => (
    <motion.div
        layout
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.92 }}
        whileHover={{ y: -6, boxShadow: `0 20px 50px ${cert.color}18` }}
        onClick={onClick}
        style={{
            background: 'rgba(15,23,42,0.8)',
            border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: 16,
            overflow: 'hidden',
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            transition: 'border-color 0.2s',
        }}
    >
        {/* Top accent bar */}
        <div style={{ height: 4, background: `linear-gradient(90deg, ${cert.color}, ${cert.color}55)` }} />

        {/* Icon area */}
        <div style={{ height: 130, background: `linear-gradient(135deg, ${cert.color}12, ${cert.color}06)`, display: 'flex', alignItems: 'center', justifyContent: 'center', borderBottom: '1px solid rgba(255,255,255,0.05)', position: 'relative' }}>
            <Award size={52} style={{ color: `${cert.color}45` }} />
            <div style={{ position: 'absolute', top: 10, right: 10 }}>
                <BadgeCheck size={16} style={{ color: cert.color }} />
            </div>
        </div>

        <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8, marginBottom: '0.4rem' }}>
                <h3 style={{ fontSize: '0.95rem', fontWeight: 700, lineHeight: 1.3 }}>{cert.title}</h3>
            </div>
            <p style={{ color: cert.color, fontSize: '0.72rem', fontFamily: 'var(--font-mono)', marginBottom: '0.5rem' }}>{cert.issuer}</p>
            <p style={{ color: '#94a3b8', fontSize: '0.8rem', lineHeight: 1.65, marginBottom: '1rem', flex: 1 }}>{cert.shortDesc}</p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem', marginBottom: '0.75rem' }}>
                {cert.skills.slice(0, 3).map(s => (
                    <span key={s} style={{ fontSize: '0.65rem', fontFamily: 'var(--font-mono)', background: `${cert.color}15`, color: cert.color, padding: '3px 8px', borderRadius: 5, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{s}</span>
                ))}
                {cert.skills.length > 3 && <span style={{ fontSize: '0.65rem', fontFamily: 'var(--font-mono)', color: '#64748b', padding: '3px 8px' }}>+{cert.skills.length - 3} more</span>}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.68rem', fontFamily: 'var(--font-mono)', color: '#64748b', display: 'flex', alignItems: 'center', gap: 4 }}>
                    <Calendar size={11} /> {cert.date}
                </span>
                <span style={{ fontSize: '0.72rem', color: '#64748b', fontFamily: 'var(--font-mono)', display: 'flex', alignItems: 'center', gap: 4 }}>
                    View details <ChevronRight size={12} />
                </span>
            </div>
        </div>
    </motion.div>
);

const Certificates = () => {
    const [filter, setFilter] = useState('All');
    const [selected, setSelected] = useState(null);

    const filtered = filter === 'All' ? CERTIFICATES : CERTIFICATES.filter(c => c.category === filter);

    return (
        <section id="certificates" style={{ padding: '100px 1.5rem' }}>
            <div style={{ maxWidth: 1200, margin: '0 auto' }}>

                {/* Header */}
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', gap: '1.5rem', marginBottom: '2.5rem' }}>
                    <div>
                        <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
                            style={{ color: '#10b981', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.2em', display: 'block', marginBottom: '0.5rem' }}>
                            05. Credentials
                        </motion.span>
                        <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800 }}>Certificates</h2>
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                        {FILTERS.map(f => (
                            <button key={f} onClick={() => setFilter(f)}
                                style={{
                                    padding: '0.45rem 1rem', borderRadius: 999, border: 'none', cursor: 'pointer',
                                    fontSize: '0.75rem', fontFamily: 'var(--font-mono)',
                                    background: filter === f ? '#10b981' : 'rgba(255,255,255,0.07)',
                                    color: filter === f ? '#fff' : '#94a3b8',
                                    transition: 'all 0.2s',
                                    boxShadow: filter === f ? '0 0 14px rgba(16,185,129,0.35)' : 'none',
                                }}>
                                {f}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Grid */}
                <motion.div layout style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.25rem' }}>
                    <AnimatePresence mode="popLayout">
                        {filtered.map(c => (
                            <CertCard key={c.title} cert={c} onClick={() => setSelected(c)} />
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>

            {/* Modal */}
            <AnimatePresence>
                {selected && <CertModal cert={selected} onClose={() => setSelected(null)} />}
            </AnimatePresence>
        </section>
    );
};

export default Certificates;
