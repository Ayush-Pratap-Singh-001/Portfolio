import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Star, Code, ExternalLink, TrendingUp, Users, Target, Zap } from 'lucide-react';

const PLATFORMS = [
    {
        id: 'leetcode',
        name: 'LeetCode',
        handle: '@ayush_dev',
        link: 'https://leetcode.com',
        color: '#f59e0b',
        bgColor: '#f59e0b12',
        icon: '🟡',
        rank: 'Knight',
        stats: [
            { label: 'Problems Solved', value: '450+', icon: <Code size={16} /> },
            { label: 'Contest Rating', value: '1,820', icon: <TrendingUp size={16} /> },
            { label: 'Global Rank', value: 'Top 8%', icon: <Target size={16} /> },
            { label: 'Badges Earned', value: '12', icon: <Trophy size={16} /> },
        ],
        highlights: [
            '450+ problems across Easy, Medium & Hard',
            'Consistent daily streak of 90+ days',
            'Topped weekly contest (Rank 142 globally)',
            'Solved 3 Hard DP problems in one contest',
        ],
        tags: ['Dynamic Programming', 'Graphs', 'Trees', 'Binary Search'],
    },
    {
        id: 'gfg',
        name: 'GeeksforGeeks',
        handle: '@ayush_gfg',
        link: 'https://geeksforgeeks.org',
        color: '#10b981',
        bgColor: '#10b98112',
        icon: '🟢',
        rank: '5 Star Coder',
        stats: [
            { label: 'Problems Solved', value: '600+', icon: <Code size={16} /> },
            { label: 'GFG Score', value: '2,350', icon: <TrendingUp size={16} /> },
            { label: 'Institute Rank', value: '#3', icon: <Target size={16} /> },
            { label: 'Streak', value: '120 days', icon: <Zap size={16} /> },
        ],
        highlights: [
            '600+ Problems solved across all difficulty levels',
            'Ranked #3 in institution-wide leaderboard',
            '120-day consistent problem-solving streak',
            'Contributor to GFG practice articles',
        ],
        tags: ['Arrays', 'Strings', 'Recursion', 'Sorting'],
    },
    {
        id: 'hackerrank',
        name: 'HackerRank',
        handle: '@ayush_hr',
        link: 'https://hackerrank.com',
        color: '#22c55e',
        bgColor: '#22c55e12',
        icon: '🌿',
        rank: '6 Star — Gold',
        stats: [
            { label: 'Stars Earned', value: '6 ⭐', icon: <Star size={16} /> },
            { label: 'Badges', value: '18', icon: <Trophy size={16} /> },
            { label: 'Rank', value: 'Gold', icon: <Target size={16} /> },
            { label: 'Certificates', value: '4', icon: <Users size={16} /> },
        ],
        highlights: [
            '6-Star Gold badge in Problem Solving',
            'Gold-level Java & Python domain badges',
            'Earned 4 HackerRank skill certifications',
            'Ranked in top 5% on SQL challenge track',
        ],
        tags: ['Problem Solving', 'Java', 'Python', 'SQL'],
    },
    {
        id: 'codechef',
        name: 'CodeChef',
        handle: '@ayush_cc',
        link: 'https://codechef.com',
        color: '#b45309',
        bgColor: '#b4530912',
        icon: '🍴',
        rank: '4★ Coder',
        stats: [
            { label: 'Rating', value: '1,845', icon: <TrendingUp size={16} /> },
            { label: 'Stars', value: '4 ★', icon: <Star size={16} /> },
            { label: 'Global Rank', value: 'Top 10%', icon: <Target size={16} /> },
            { label: 'Contests', value: '30+', icon: <Trophy size={16} /> },
        ],
        highlights: [
            '4-Star coder with peak rating of 1,845',
            'Participated in 30+ Division 2 & 3 contests',
            'Solved 250+ problems on the platform',
            'Top 10% globally in Long Challenge rounds',
        ],
        tags: ['Competitive', 'Number Theory', 'Greedy', 'Bit Manipulation'],
    },
    {
        id: 'codeforces',
        name: 'Codeforces',
        handle: '@ayush_cf',
        link: 'https://codeforces.com',
        color: '#3b82f6',
        bgColor: '#3b82f612',
        icon: '🔵',
        rank: 'Specialist',
        stats: [
            { label: 'Rating', value: '1,512', icon: <TrendingUp size={16} /> },
            { label: 'Division', value: 'Div. 2', icon: <Target size={16} /> },
            { label: 'Max Rank', value: '#2,140', icon: <Star size={16} /> },
            { label: 'Rounds', value: '40+', icon: <Trophy size={16} /> },
        ],
        highlights: [
            'Specialist-rated competitive programmer',
            'Competed in 40+ Div. 2 & 3 Codeforces Rounds',
            'Peak contest rank of #2,140 globally',
            'Strong in Constructive Algorithms & Math',
        ],
        tags: ['Constructive Algorithms', 'Math', 'Greedy', 'Implementation'],
    },
];

/* ── Animated counter ───────────────────────────────────────────────── */
const StatBadge = ({ label, value, icon, color }) => (
    <div style={{
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: 12,
        padding: '0.85rem 1rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.3rem',
    }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, color, opacity: 0.8 }}>
            {icon}
            <span style={{ fontSize: '0.68rem', fontFamily: 'var(--font-mono)', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{label}</span>
        </div>
        <div style={{ fontSize: '1.35rem', fontWeight: 800, fontFamily: 'var(--font-heading)', color }}>{value}</div>
    </div>
);

/* ── Platform card ──────────────────────────────────────────────────── */
const PlatformCard = ({ platform, index }) => {
    const [hovered, setHovered] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                background: hovered ? platform.bgColor : 'rgba(15,23,42,0.8)',
                border: `1px solid ${hovered ? platform.color + '40' : 'rgba(255,255,255,0.07)'}`,
                borderRadius: 20,
                overflow: 'hidden',
                transition: 'all 0.3s ease',
                boxShadow: hovered ? `0 20px 60px ${platform.color}15` : 'none',
            }}
        >
            {/* Top bar */}
            <div style={{ height: 4, background: `linear-gradient(90deg, ${platform.color}, ${platform.color}44)` }} />

            <div style={{ padding: '1.75rem' }}>
                {/* Platform header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem' }}>
                        <div style={{
                            width: 48, height: 48, borderRadius: 14,
                            background: platform.bgColor,
                            border: `1px solid ${platform.color}30`,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: '1.5rem',
                        }}>
                            {platform.icon}
                        </div>
                        <div>
                            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, lineHeight: 1.2, marginBottom: '0.15rem' }}>{platform.name}</h3>
                            <p style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: '#64748b' }}>{platform.handle}</p>
                        </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.4rem' }}>
                        <span style={{ fontSize: '0.68rem', background: `${platform.color}20`, color: platform.color, padding: '3px 10px', borderRadius: 999, fontFamily: 'var(--font-mono)', fontWeight: 600 }}>
                            {platform.rank}
                        </span>
                        <a href={platform.link} target="_blank" rel="noopener noreferrer"
                            onClick={e => e.stopPropagation()}
                            style={{ color: '#64748b', display: 'flex', alignItems: 'center', gap: 4, fontSize: '0.72rem', fontFamily: 'var(--font-mono)' }}>
                            Visit <ExternalLink size={11} />
                        </a>
                    </div>
                </div>

                {/* Stats grid */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.625rem', marginBottom: '1.25rem' }}>
                    {platform.stats.map(stat => (
                        <StatBadge key={stat.label} {...stat} color={platform.color} />
                    ))}
                </div>

                {/* Highlights */}
                <div style={{ marginBottom: '1.25rem' }}>
                    <h4 style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: platform.color, fontFamily: 'var(--font-mono)', marginBottom: '0.625rem' }}>
                        Highlights
                    </h4>
                    <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                        {platform.highlights.map(h => (
                            <li key={h} style={{ display: 'flex', gap: 8, color: '#94a3b8', fontSize: '0.82rem', lineHeight: 1.5 }}>
                                <span style={{ color: platform.color, flexShrink: 0, fontWeight: 700, marginTop: 1 }}>›</span> {h}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Tags */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem' }}>
                    {platform.tags.map(tag => (
                        <span key={tag} style={{ fontSize: '0.65rem', fontFamily: 'var(--font-mono)', background: 'rgba(255,255,255,0.06)', color: '#94a3b8', padding: '3px 9px', borderRadius: 5, letterSpacing: '0.04em' }}>
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

/* ── Summary bar ────────────────────────────────────────────────────── */
const SUMMARY_STATS = [
    { label: 'Total Problems', value: '1,800+', color: '#3b82f6', icon: <Code size={20} /> },
    { label: 'Platform Rating', value: '5 Active', color: '#10b981', icon: <Users size={20} /> },
    { label: 'Contest Rounds', value: '100+', color: '#f59e0b', icon: <Trophy size={20} /> },
    { label: 'Top Ranks', value: 'Multiple', color: '#ec4899', icon: <Star size={20} /> },
];

/* ── Main component ─────────────────────────────────────────────────── */
const Achievements = () => (
    <section id="achievements" style={{ padding: '100px 1.5rem' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>

            {/* Header */}
            <div style={{ marginBottom: '3rem' }}>
                <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
                    style={{ color: '#f59e0b', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.2em', display: 'block', marginBottom: '0.5rem' }}>
                    06. Competitive Programming
                </motion.span>
                <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, marginBottom: '1rem' }}>Achievements</h2>
                <p style={{ color: '#94a3b8', maxWidth: 560, lineHeight: 1.75, fontSize: '0.95rem' }}>
                    Consistently ranked competitive programmer across major platforms — sharpening algorithmic thinking and problem-solving skills.
                </p>
            </div>

            {/* Summary stats bar */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
                    gap: '1rem',
                    marginBottom: '3rem',
                    background: 'rgba(15,23,42,0.6)',
                    border: '1px solid rgba(255,255,255,0.07)',
                    borderRadius: 16,
                    padding: '1.5rem',
                }}
            >
                {SUMMARY_STATS.map(s => (
                    <div key={s.label} style={{ display: 'flex', alignItems: 'center', gap: '0.875rem' }}>
                        <div style={{ width: 42, height: 42, borderRadius: 11, background: `${s.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: s.color, flexShrink: 0 }}>
                            {s.icon}
                        </div>
                        <div>
                            <div style={{ fontSize: '1.25rem', fontWeight: 800, fontFamily: 'var(--font-heading)', color: s.color }}>{s.value}</div>
                            <div style={{ fontSize: '0.72rem', color: '#64748b', fontFamily: 'var(--font-mono)' }}>{s.label}</div>
                        </div>
                    </div>
                ))}
            </motion.div>

            {/* Platform cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '1.5rem' }}>
                {PLATFORMS.map((p, i) => (
                    <PlatformCard key={p.id} platform={p} index={i} />
                ))}
            </div>
        </div>
    </section>
);

export default Achievements;
