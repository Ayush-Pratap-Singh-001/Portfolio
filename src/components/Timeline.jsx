import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, School, BookOpen, Palette, Calendar } from 'lucide-react';

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
    },
    {
        year: '2019 – 2021',
        title: 'Class 12th — Senior Secondary',
        place: 'Secondary School Board',
        desc: 'Majored in Physics, Chemistry & Mathematics. Developed strong analytical foundations for engineering.',
        icon: School,
        color: '#10b981',
        tag: 'Academics',
    },
    {
        year: '2019 – 2020',
        title: 'Class 10th — Secondary',
        place: 'Secondary School Board',
        desc: 'Early interest in logic, science, and mathematics. First exposure to computers and programming concepts.',
        icon: BookOpen,
        color: '#f59e0b',
        tag: 'Academics',
    },
];

const TimelineItem = ({ event, index }) => {
    const isLeft = index % 2 === 0;
    const { year, title, place, desc, icon: Icon, color, tag } = event;

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
                <TimelineContent year={year} title={title} place={place} desc={desc} color={color} tag={tag} align="right" />
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
                <TimelineContent year={year} title={title} place={place} desc={desc} color={color} tag={tag} align="left" />
            </motion.div>
        </div>
    );
};

const TimelineContent = ({ year, title, place, desc, color, tag, align }) => (
    <motion.div
        whileHover={{ scale: 1.02 }}
        style={{
            background: 'rgba(15,23,42,0.8)',
            border: `1px solid rgba(255,255,255,0.08)`,
            borderRadius: 16,
            padding: '1.25rem 1.5rem',
            transition: 'border-color 0.2s',
            textAlign: align,
        }}
    >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: align === 'right' ? 'flex-end' : 'flex-start', gap: 8, marginBottom: '0.5rem', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.65rem', background: `${color}20`, color, padding: '3px 10px', borderRadius: 999, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{tag}</span>
            <span style={{ fontSize: '0.72rem', color: '#64748b', fontFamily: 'var(--font-mono)', display: 'flex', alignItems: 'center', gap: 4 }}>
                <Calendar size={12} /> {year}
            </span>
        </div>
        <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.25rem', color: '#f8fafc' }}>{title}</h3>
        <p style={{ fontSize: '0.78rem', color, fontWeight: 500, marginBottom: '0.5rem', fontFamily: 'var(--font-mono)' }}>{place}</p>
        <p style={{ fontSize: '0.83rem', color: '#94a3b8', lineHeight: 1.7 }}>{desc}</p>
    </motion.div>
);

const Timeline = () => (
    <section id="experience" style={{ padding: '100px 1.5rem', background: 'rgba(15,23,42,0.3)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            {/* Header */}
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
                    style={{ color: '#3b82f6', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.2em', display: 'block', marginBottom: '0.75rem' }}>
                    04. My Journey
                </motion.span>
                <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, marginBottom: '1rem' }}>Timeline</h2>
                <div style={{ width: 60, height: 3, background: 'linear-gradient(90deg, #3b82f6, #8b5cf6)', margin: '0 auto', borderRadius: 2 }} />
            </div>

            {/* Desktop: alternating — Mobile: single column */}
            <div style={{ position: 'relative' }} className="timeline-container">
                {/* Center Line */}
                <div className="timeline-center-line" style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: 2, background: 'rgba(255,255,255,0.06)', transform: 'translateX(-50%)' }} />

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
