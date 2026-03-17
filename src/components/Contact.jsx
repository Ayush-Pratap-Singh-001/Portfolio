import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, MapPin, Send, CheckCircle, AlertCircle, Loader } from 'lucide-react';

/* ─────────────────────────────────────────────────────────────────────
 * ✅ FORMSPREE ENDPOINT
 * Your form is now powered by Formspree. No API keys needed in code!
 * ───────────────────────────────────────────────────────────────────── */
const FORMSPREE_ENDPOINT = "https://formspree.io/f/mwvrnynk";

const CONTACTS = [
    { icon: Mail,    label: 'Email',    value: 'singhpratapayush001@gmail.com',          href: 'mailto:singhpratapayush001@gmail.com',       color: '#3b82f6' },
    { icon: Github,  label: 'GitHub',   value: 'Ayush-Pratap-Singh-001',                  href: 'https://github.com/Ayush-Pratap-Singh-001',  color: '#8b5cf6' },
    { icon: Linkedin,label: 'LinkedIn', value: 'ayushpsingh001',                          href: 'https://www.linkedin.com/in/ayushpsingh001', color: '#0ea5e9' },
    { icon: MapPin,  label: 'Location', value: 'Gorakhpur, Uttar Pradesh, India',          href: null,                                         color: '#10b981' },
];

/* ── Field component ── */
const Field = ({ label, name, value, onChange, error, placeholder, type = 'text', textarea, rows, required }) => {
    const [focused, setFocused] = useState(false);
    const inputStyle = {
        width: '100%', padding: '0.85rem 1rem',
        background: 'rgba(15,23,42,0.8)',
        border: `1px solid ${error ? 'rgba(239,68,68,0.6)' : focused ? 'rgba(59,130,246,0.6)' : 'rgba(255,255,255,0.1)'}`,
        borderRadius: 10, color: '#f8fafc', fontSize: '0.9rem',
        outline: 'none',
        transition: 'border-color 0.2s, box-shadow 0.2s',
        boxShadow: focused && !error ? '0 0 0 3px rgba(59,130,246,0.1)' : 'none',
        resize: textarea ? 'vertical' : 'none',
        fontFamily: 'var(--font-body)',
    };
    const sharedProps = {
        name, value, onChange, placeholder, required,
        onFocus: () => setFocused(true),
        onBlur:  () => setFocused(false),
        style: inputStyle,
    };
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            <label style={{ fontSize: '0.72rem', color: '#94a3b8', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                {label}
            </label>
            {textarea
                ? <textarea {...sharedProps} rows={rows} />
                : <input {...sharedProps} type={type} />
            }
            {error && (
                <span style={{ fontSize: '0.72rem', color: '#ef4444', display: 'flex', alignItems: 'center', gap: 4 }}>
                    <AlertCircle size={12} /> {error}
                </span>
            )}
        </div>
    );
};

/* ── Contact section ── */
const Contact = () => {
    const [form, setForm]     = useState({ name: '', email: '', subject: '', message: '' });
    const [errors, setErrors] = useState({});
    const [status, setStatus] = useState('idle'); // idle | sending | success | error

    const validate = () => {
        const e = {};
        if (!form.name.trim())                              e.name    = 'Name is required';
        if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = 'Valid email required';
        if (!form.subject.trim())                           e.subject = 'Subject is required';
        if (form.message.trim().length < 10)               e.message = 'Message must be at least 10 characters';
        return e;
    };

    const handleChange = e => {
        const { name, value } = e.target;
        setForm(f => ({ ...f, [name]: value }));
        if (errors[name]) setErrors(er => ({ ...er, [name]: '' }));
    };

    const handleSubmit = async e => {
        e.preventDefault();
        const errs = validate();
        if (Object.keys(errs).length > 0) { setErrors(errs); return; }

        setStatus('sending');
        
        try {
            const response = await fetch(FORMSPREE_ENDPOINT, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(form)
            });

            if (response.ok) {
                setStatus('success');
                setForm({ name: '', email: '', subject: '', message: '' });
                setTimeout(() => setStatus('idle'), 6000);
            } else {
                const data = await response.json();
                if (data.errors) {
                    setErrors(data.errors.reduce((acc, error) => ({ ...acc, [error.field]: error.message }), {}));
                    setStatus('idle');
                } else {
                    setStatus('error');
                }
            }
        } catch (err) {
            console.error('Formspree error:', err);
            setStatus('error');
            setTimeout(() => setStatus('idle'), 5000);
        }
    };

    const isSending = status === 'sending';

    return (
        <section id="contact" style={{ padding: '100px 1.5rem' }}>
            <div style={{ maxWidth: 1100, margin: '0 auto' }}>

                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
                    <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
                        style={{ color: '#3b82f6', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.2em', display: 'block', marginBottom: '0.75rem' }}>
                        07. What's Next?
                    </motion.span>
                    <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, marginBottom: '1rem' }}>Get In Touch</h2>
                    <div style={{ width: 60, height: 3, background: 'linear-gradient(90deg, #3b82f6, #8b5cf6)', margin: '0 auto 1rem', borderRadius: 2 }} />
                    <p style={{ color: '#94a3b8', maxWidth: 500, margin: '0 auto', lineHeight: 1.8 }}>
                        Whether you have an opportunity, project idea, or just want to say hi — my inbox is open.
                    </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2.5rem' }} className="contact-grid">

                    {/* Left: Contact Info */}
                    <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}
                        style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem' }}>Contact Information</h3>
                        {CONTACTS.map(({ icon: Icon, label, value, href, color }) => (
                            <motion.div key={label} whileHover={{ x: 4 }}
                                style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem 1.25rem', background: 'rgba(15,23,42,0.8)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 12, transition: 'border-color 0.2s' }}>
                                <div style={{ width: 40, height: 40, borderRadius: 10, background: `${color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                    <Icon size={20} style={{ color }} />
                                </div>
                                <div>
                                    <div style={{ fontSize: '0.68rem', color: '#64748b', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 2 }}>{label}</div>
                                    {href
                                        ? <a href={href} target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.88rem', color: '#f8fafc', fontWeight: 500 }}>{value}</a>
                                        : <div style={{ fontSize: '0.88rem', color: '#f8fafc', fontWeight: 500 }}>{value}</div>
                                    }
                                </div>
                            </motion.div>
                        ))}

                        {/* Quick mail CTA */}
                        <motion.a
                            href="mailto:singhpratapayush001@gmail.com"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.97 }}
                            style={{
                                marginTop: '0.5rem',
                                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                                padding: '0.9rem 1.25rem',
                                background: 'rgba(59,130,246,0.1)',
                                border: '1px solid rgba(59,130,246,0.3)',
                                borderRadius: 12,
                                color: '#3b82f6', fontWeight: 600, fontSize: '0.88rem',
                                transition: 'all 0.2s',
                            }}
                        >
                            <Mail size={16} /> Email me directly
                        </motion.a>
                    </motion.div>

                    {/* Right: Form */}
                    <motion.form
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        onSubmit={handleSubmit}
                        style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
                        noValidate
                    >
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }} className="form-row">
                            <Field label="Name"    name="name"  value={form.name}    onChange={handleChange} error={errors.name}    placeholder="Your Name" />
                            <Field label="Email"   name="email" type="email" value={form.email}   onChange={handleChange} error={errors.email}   placeholder="your@email.com" />
                        </div>
                        <Field label="Subject"  name="subject"    value={form.subject} onChange={handleChange} error={errors.subject} placeholder="Project Inquiry" />
                        <Field label="Message"  name="message"    value={form.message} onChange={handleChange} error={errors.message} placeholder="Tell me about your project or opportunity..." textarea rows={5} />

                        {/* Status banners */}
                        {status === 'success' && (
                            <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }}
                                style={{ display: 'flex', alignItems: 'center', gap: 10, color: '#10b981', background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)', borderRadius: 10, padding: '0.85rem 1rem', fontSize: '0.875rem' }}>
                                <CheckCircle size={18} />
                                <div>
                                    <strong>Message sent!</strong> I'll get back to you within 24 hours.
                                </div>
                            </motion.div>
                        )}

                        {status === 'error' && (
                            <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }}
                                style={{ display: 'flex', alignItems: 'center', gap: 10, color: '#ef4444', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: 10, padding: '0.85rem 1rem', fontSize: '0.875rem' }}>
                                <AlertCircle size={18} />
                                <div>
                                    Failed to send. Please try <a href="mailto:singhpratapayush001@gmail.com" style={{ color: '#ef4444', textDecoration: 'underline' }}>emailing me directly</a>.
                                </div>
                            </motion.div>
                        )}

                        <motion.button
                            type="submit"
                            disabled={isSending}
                            whileHover={!isSending ? { scale: 1.02 } : {}}
                            whileTap={!isSending ? { scale: 0.97 } : {}}
                            style={{
                                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                                padding: '1rem', borderRadius: 12, border: 'none',
                                background: isSending ? 'rgba(59,130,246,0.5)' : '#3b82f6',
                                color: '#fff', fontSize: '1rem', fontWeight: 600,
                                cursor: isSending ? 'not-allowed' : 'pointer',
                                boxShadow: isSending ? 'none' : '0 0 24px rgba(59,130,246,0.35)',
                                transition: 'all 0.2s',
                            }}
                        >
                            {isSending
                                ? <><Loader size={18} style={{ animation: 'spin 1s linear infinite' }} /> Sending…</>
                                : <><Send size={18} /> Send Message</>
                            }
                        </motion.button>

                        <p style={{ fontSize: '0.7rem', color: '#334155', fontFamily: 'var(--font-mono)', textAlign: 'center' }}>
                            Powered by Formspree · No backend required
                        </p>
                    </motion.form>
                </div>
            </div>

            <style>{`
                @media (min-width: 768px) {
                    .contact-grid { grid-template-columns: 1fr 1fr !important; }
                }
                @media (max-width: 480px) {
                    .form-row { grid-template-columns: 1fr !important; }
                }
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to   { transform: rotate(360deg); }
                }
            `}</style>
        </section>
    );
};

/* ── Footer ── */
const Footer = () => (
    <footer style={{ borderTop: '1px solid rgba(255,255,255,0.06)', padding: '2.5rem 1.5rem', textAlign: 'center', background: 'rgba(2,6,23,0.8)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1.25rem', marginBottom: '1.25rem' }}>
                {[
                    { icon: Github,   href: 'https://github.com/Ayush-Pratap-Singh-001' },
                    { icon: Linkedin, href: 'https://www.linkedin.com/in/ayushpsingh001' },
                    { icon: Mail,     href: 'mailto:singhpratapayush001@gmail.com' },
                ].map(({ icon: Icon, href }, i) => (
                    <motion.a key={i} href={href} target="_blank" rel="noopener noreferrer"
                        whileHover={{ y: -3, color: '#3b82f6' }}
                        style={{ color: '#64748b', display: 'flex', alignItems: 'center', transition: 'color 0.2s' }}>
                        <Icon size={22} />
                    </motion.a>
                ))}
            </div>
            <p style={{ color: '#334155', fontSize: '0.78rem', fontFamily: 'var(--font-mono)' }}>
                Designed & Built by <span style={{ color: '#3b82f6' }}>Ayush</span> © {new Date().getFullYear()}
            </p>
        </div>
    </footer>
);

export { Contact, Footer };
