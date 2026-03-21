import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, School, BookOpen, Palette, Calendar, Star } from 'lucide-react';

const EVENTS = [
    {
        year: '2025',
        title: 'UI/UX Design Summer Training',
        place: 'CipherSchools',
        desc: 'Mastered design systems, wireframing in Figma, and user-centered prototyping for modern web interfaces.',
        icon: Palette,
        color: '#3b82f6',
        tag: 'Summer Training',
    },
    {
        year: '2023 – Present',
        title: 'B.Tech — Computer Science',
        place: 'Lovely Professional University (LPU)',
        desc: 'Building expertise in backend architecture, distributed systems, OS internals, DBMS, and cloud computing.',
        icon: GraduationCap,
        color: '#8b5cf6',
        tag: 'University',
        grade: { label: 'CGPA', value: '8.2 / 10' },
    },
    {
        year: '2020 – 2022',
        title: 'Class 12th — Senior Secondary',
        place: 'Secondary School Board',
        desc: 'Majored in Physics, Chemistry & Mathematics. Developed strong analytical foundations for engineering.',
        icon: School,
        color: '#10b981',
        tag: 'Academics',
        grade: { label: 'Score', value: '93.75%' },
    },
    {
        year: '2018 – 2020',
        title: 'Class 10th — Secondary',
        place: 'Secondary School Board',
        desc: 'Early interest in logic, science, and mathematics. First exposure to computers and programming concepts.',
        icon: BookOpen,
        color: '#f59e0b',
        tag: 'Academics',
        grade: { label: 'Score', value: '91.4%' },
    },
];

const TimelineItem = ({ event, index }) => {
    const isLeft = index % 2 === 0;
    const { year, title, place, desc, icon: Icon, color, tag, grade } = event;

    return (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 60px 1fr', alignItems: 'start', marginBottom: '3rem', position: 'relative' }} className="timeline-item-grid">
            {/* Left Side */}
            <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                style={{ paddingRight: '2rem', textAlign: 'right', paddingTop: '0.5rem', display: isLeft ? 'block' : 'none' }}
                className="timeline-left"
            >
                <TimelineContent year={year} title={title} place={place} desc={desc} color={color} tag={tag} grade={grade} align="right" />
            </motion.div>
            {isLeft && <div className="timeline-left-placeholder" />}

            {/* Center Node */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 10 }}>
                <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 20, delay: index * 0.1 }}
                    style={{
                        width: 56, height: 56, borderRadius: '50%',
                        background: `${color}20`,
                        border: `2px solid ${color}`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        boxShadow: `0 0 20px ${color}40`,
                    }}
                >
                    <Icon size={24} style={{ color }} />
                </motion.div>
            </div>

            {/* Right Side */}
            {!isLeft && <div className="timeline-right-placeholder" />}
            <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                style={{ paddingLeft: '2rem', textAlign: 'left', paddingTop: '0.5rem', display: isLeft ? 'none' : 'block' }}
                className="timeline-right"
            >
                <TimelineContent year={year} title={title} place={place} desc={desc} color={color} tag={tag} grade={grade} align="left" />
            </motion.div>
        </div>
    );
};

const TimelineContent = ({ year, title, place, desc, color, tag, grade, align }) => (
    <motion.div
        whileHover={{ scale: 1.02 }}
        style={{
            background: 'var(--card-bg)',
            border: '1px solid var(--card-border)',
            borderRadius: 16,
            padding: '1.25rem 1.5rem',
            boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
            textAlign: align,
        }}
    >
        {/* Tag + Year row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: align === 'right' ? 'flex-end' : 'flex-start', gap: 8, marginBottom: '0.5rem', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.65rem', background: `${color}20`, color, padding: '3px 10px', borderRadius: 999, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{tag}</span>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)', display: 'flex', alignItems: 'center', gap: 4 }}>
                <Calendar size={12} /> {year}
            </span>
        </div>

        <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.25rem', color: 'var(--text-primary)' }}>{title}</h3>
        <p style={{ fontSize: '0.78rem', color, fontWeight: 500, marginBottom: '0.5rem', fontFamily: 'var(--font-mono)' }}>{place}</p>
        <p style={{ fontSize: '0.83rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: grade ? '0.85rem' : 0 }}>{desc}</p>

        {/* Grade badge */}
        {grade && (
            <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                padding: '0.45rem 0.9rem',
                background: `${color}15`,
                border: `1px solid ${color}40`,
                borderRadius: 999,
                marginTop: 4,
            }}>
                <Star size={13} style={{ color, flexShrink: 0 }} />
                <span style={{ fontSize: '0.7rem', fontFamily: 'var(--font-mono)', color, fontWeight: 600, letterSpacing: '0.05em' }}>
                    {grade.label}:&nbsp;<strong style={{ fontSize: '0.82rem' }}>{grade.value}</strong>
                </span>
            </div>
        )}
    </motion.div>
);

const Timeline = () => (
    <section id="experience" style={{ padding: '100px 1.5rem', background: 'var(--bg-secondary)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            {/* Header */}
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
                    style={{ color: 'var(--accent-blue)', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.2em', display: 'block', marginBottom: '0.75rem' }}>
                    04. My Journey
                </motion.span>
                <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, marginBottom: '1rem', color: 'var(--text-primary)' }}>Timeline</h2>
                <div style={{ width: 60, height: 3, background: 'linear-gradient(90deg, #3b82f6, #8b5cf6)', margin: '0 auto', borderRadius: 2 }} />
            </div>

            {/* Desktop: alternating — Mobile: single column */}
            <div style={{ position: 'relative' }} className="timeline-container">
                {/* Center Line */}
                <div className="timeline-center-line" style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: 2, background: 'var(--card-border)', transform: 'translateX(-50%)' }} />

                {EVENTS.map((event, idx) => (
                    <TimelineItem key={idx} event={event} index={idx} />
                ))}
            </div>
        </div>

        <style>{`
      @media (max-width: 768px) {
        .timeline-center-line { left: 28px !important; transform: none !important; }
        .timeline-item-grid {
          grid-template-columns: 60px 1fr !important;
          margin-bottom: 2rem;
        }
        .timeline-left, .timeline-right {
          display: block !important;
          padding-left: 1rem !important;
          padding-right: 0 !important;
          text-align: left !important;
          grid-column: 2;
          grid-row: 1;
        }
        .timeline-left-placeholder, .timeline-right-placeholder { display: none !important; }
      }
    `}</style>
    </section>
);

export default Timeline;
