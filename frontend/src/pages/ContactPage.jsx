import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, ArrowRight, Zap, Send, MessageSquare, Clock, CheckCircle } from 'lucide-react';

const css = `
@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@700;800&family=DM+Sans:wght@300;400;500&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

.cp {
  --bg: #f0eefa;
  --purple: #7c3aed;
  --purple-mid: #6d28d9;
  --purple-light: #a78bfa;
  --accent-soft: rgba(124,58,237,0.08);
  --white: #ffffff;
  --text: #1a0a3c;
  --muted: #6b7280;
  --border: rgba(124,58,237,0.15);
  --border-focus: rgba(124,58,237,0.5);
  font-family: 'DM Sans', sans-serif;
  min-height: 100vh;
  background: var(--bg);
  color: var(--text);
  padding: 80px 24px;
  position: relative;
  overflow-x: hidden;
}

.cp::before {
  content: '';
  position: fixed;
  top: -160px; right: -160px;
  width: 600px; height: 600px;
  background: radial-gradient(circle, rgba(167,139,250,0.22) 0%, transparent 65%);
  pointer-events: none; z-index: 0;
}
.cp::after {
  content: '';
  position: fixed;
  bottom: -120px; left: -120px;
  width: 480px; height: 480px;
  background: radial-gradient(circle, rgba(124,58,237,0.1) 0%, transparent 65%);
  pointer-events: none; z-index: 0;
}

.cp-bg-text {
  position: fixed;
  top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  font-family: 'Bricolage Grotesque', sans-serif;
  font-size: clamp(80px, 16vw, 180px); font-weight: 800;
  color: rgba(124,58,237,0.04);
  white-space: nowrap; pointer-events: none; user-select: none;
  letter-spacing: -0.02em; z-index: 0;
}

.cp-inner {
  position: relative; z-index: 2;
  max-width: 1080px; margin: 0 auto;
}

/* HEADER */
.cp-header { text-align: center; margin-bottom: 64px; }

.cp-eyebrow {
  display: inline-flex; align-items: center; gap: 7px;
  background: rgba(124,58,237,0.08); border: 1px solid rgba(124,58,237,0.15);
  border-radius: 50px; padding: 6px 14px;
  font-size: 12px; font-weight: 500; color: var(--purple);
  letter-spacing: 0.04em; margin-bottom: 20px;
}

.cp-title {
  font-family: 'Bricolage Grotesque', sans-serif;
  font-size: clamp(2.2rem, 5vw, 3.6rem); font-weight: 800;
  letter-spacing: -0.03em; line-height: 1.1;
  color: var(--text); margin-bottom: 16px;
}

.cp-title span {
  display: inline-block;
  background: linear-gradient(135deg, var(--purple) 0%, var(--purple-light) 100%);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  background-clip: text;
}

.cp-sub {
  font-size: 16px; font-weight: 300; color: var(--muted);
  max-width: 480px; margin: 0 auto; line-height: 1.7;
}

/* GRID */
.cp-grid {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 24px;
  align-items: start;
}

@media (max-width: 820px) { .cp-grid { grid-template-columns: 1fr; } }

/* FORM CARD */
.cp-form-card {
  background: var(--white);
  border: 1px solid rgba(124,58,237,0.08);
  border-radius: 24px;
  padding: 44px 40px;
  box-shadow: 0 8px 40px rgba(124,58,237,0.08);
}

.cp-form-title {
  font-family: 'Bricolage Grotesque', sans-serif;
  font-size: 1.35rem; font-weight: 800; color: var(--text);
  letter-spacing: -0.02em; margin-bottom: 6px;
}
.cp-form-sub { font-size: 13px; color: var(--muted); font-weight: 300; margin-bottom: 28px; }

.cp-row { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 16px; }
.cp-field { margin-bottom: 16px; }

.cp-label {
  display: block; font-size: 13px; font-weight: 500;
  color: var(--text); margin-bottom: 7px;
}

.cp-input, .cp-textarea {
  width: 100%;
  background: var(--accent-soft);
  border: 1px solid var(--border);
  border-radius: 12px;
  font-family: 'DM Sans', sans-serif;
  font-size: 14px; font-weight: 400; color: var(--text);
  outline: none; transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
}
.cp-input { height: 46px; padding: 0 16px; }
.cp-textarea { padding: 14px 16px; min-height: 130px; resize: vertical; line-height: 1.6; }
.cp-input::placeholder, .cp-textarea::placeholder { color: var(--muted); font-weight: 300; }
.cp-input:focus, .cp-textarea:focus {
  border-color: var(--border-focus);
  box-shadow: 0 0 0 3px rgba(124,58,237,0.1);
  background: #fff;
}

.cp-submit {
  width: 100%; height: 50px; margin-top: 4px;
  background: var(--purple); color: #fff;
  font-family: 'DM Sans', sans-serif; font-size: 15px; font-weight: 500;
  border: none; border-radius: 12px; cursor: pointer;
  display: flex; align-items: center; justify-content: center; gap: 8px;
  box-shadow: 0 8px 28px rgba(124,58,237,0.3);
  transition: all 0.2s;
}
.cp-submit:hover { background: var(--purple-mid); transform: translateY(-1px); box-shadow: 0 12px 32px rgba(124,58,237,0.38); }

/* SUCCESS */
.cp-success {
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  text-align: center; padding: 40px 20px; gap: 14px;
}
.cp-success-icon { color: #10b981; }
.cp-success-title { font-family: 'Bricolage Grotesque', sans-serif; font-size: 1.3rem; font-weight: 800; color: var(--text); }
.cp-success-sub { font-size: 14px; color: var(--muted); font-weight: 300; line-height: 1.6; max-width: 280px; }

/* RIGHT COLUMN */
.cp-right { display: flex; flex-direction: column; gap: 16px; }

/* INFO CARD */
.cp-info-card {
  background: linear-gradient(145deg, var(--purple) 0%, #4c1d95 100%);
  border-radius: 24px; padding: 36px 32px;
  position: relative; overflow: hidden;
  box-shadow: 0 12px 40px rgba(124,58,237,0.25);
}
.cp-info-card::before {
  content: '';
  position: absolute; top: -60px; right: -60px;
  width: 240px; height: 240px; border-radius: 50%;
  background: rgba(255,255,255,0.06); pointer-events: none;
}

.cp-info-title {
  font-family: 'Bricolage Grotesque', sans-serif;
  font-size: 1.2rem; font-weight: 800; color: #fff;
  letter-spacing: -0.02em; margin-bottom: 6px;
  position: relative; z-index: 1;
}
.cp-info-sub { font-size: 13px; color: rgba(255,255,255,0.55); font-weight: 300; margin-bottom: 28px; position: relative; z-index: 1; }

.cp-info-items { display: flex; flex-direction: column; gap: 18px; position: relative; z-index: 1; }
.cp-info-item { display: flex; align-items: flex-start; gap: 13px; }
.cp-info-icon {
  width: 38px; height: 38px; border-radius: 10px;
  background: rgba(255,255,255,0.12);
  display: flex; align-items: center; justify-content: center;
  color: rgba(255,255,255,0.9); flex-shrink: 0;
}
.cp-info-label { font-size: 11px; color: rgba(255,255,255,0.45); font-weight: 500; text-transform: uppercase; letter-spacing: 0.07em; margin-bottom: 3px; }
.cp-info-value { font-size: 14px; color: #fff; font-weight: 400; line-height: 1.5; }

/* FAQ CARD */
.cp-faq-card {
  background: var(--white);
  border: 1px solid rgba(124,58,237,0.08);
  border-radius: 20px; padding: 28px;
  box-shadow: 0 4px 20px rgba(124,58,237,0.06);
}
.cp-faq-header { display: flex; align-items: center; gap: 10px; margin-bottom: 10px; }
.cp-faq-icon { width: 38px; height: 38px; border-radius: 10px; background: var(--accent-soft); display: flex; align-items: center; justify-content: center; color: var(--purple); }
.cp-faq-title { font-family: 'Bricolage Grotesque', sans-serif; font-size: 15px; font-weight: 700; color: var(--text); }
.cp-faq-desc { font-size: 13px; color: var(--muted); font-weight: 300; line-height: 1.6; margin-bottom: 18px; }
.cp-faq-btn {
  width: 100%; height: 42px;
  background: transparent; color: var(--purple);
  font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 500;
  border: 1px solid rgba(124,58,237,0.2); border-radius: 10px; cursor: pointer;
  display: flex; align-items: center; justify-content: center; gap: 7px;
  text-decoration: none; transition: all 0.2s;
}
.cp-faq-btn:hover { background: var(--purple); color: #fff; border-color: var(--purple); }

/* HOURS CARD */
.cp-hours-card {
  background: var(--white);
  border: 1px solid rgba(124,58,237,0.08);
  border-radius: 20px; padding: 24px 28px;
  box-shadow: 0 4px 20px rgba(124,58,237,0.06);
  display: flex; align-items: center; gap: 14px;
}
.cp-hours-icon { width: 42px; height: 42px; border-radius: 12px; background: var(--accent-soft); display: flex; align-items: center; justify-content: center; color: var(--purple); flex-shrink: 0; }
.cp-hours-title { font-size: 14px; font-weight: 500; color: var(--text); margin-bottom: 3px; }
.cp-hours-val { font-size: 12px; color: var(--muted); font-weight: 300; line-height: 1.5; }
`;

export function ContactPage() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', subject: '', message: '' });

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = e => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="cp">
      <style>{css}</style>
      <div className="cp-bg-text">CONTACT</div>

      <div className="cp-inner">

        {/* Header */}
        <div className="cp-header">
          <div className="cp-eyebrow"><Zap size={11}/> We're here to help</div>
          <h1 className="cp-title">Get in <span>Touch</span></h1>
          <p className="cp-sub">Have questions or feedback? We'd love to hear from you. Our team usually responds within 24 hours.</p>
        </div>

        {/* Main grid */}
        <div className="cp-grid">

          {/* Form card */}
          <div className="cp-form-card">
            {sent ? (
              <div className="cp-success">
                <CheckCircle size={52} className="cp-success-icon"/>
                <div className="cp-success-title">Message sent!</div>
                <p className="cp-success-sub">Thanks for reaching out. We'll get back to you within 24 hours.</p>
                <button className="cp-submit" style={{ width: 'auto', padding: '0 28px' }} onClick={() => setSent(false)}>
                  Send another <ArrowRight size={15}/>
                </button>
              </div>
            ) : (
              <>
                <div className="cp-form-title">Send us a message</div>
                <div className="cp-form-sub">Fill in the form and we'll get back to you shortly.</div>

                <form onSubmit={handleSubmit}>
                  <div className="cp-row">
                    <div>
                      <label className="cp-label" htmlFor="firstName">First name</label>
                      <input className="cp-input" id="firstName" name="firstName" placeholder="John" required value={form.firstName} onChange={handleChange}/>
                    </div>
                    <div>
                      <label className="cp-label" htmlFor="lastName">Last name</label>
                      <input className="cp-input" id="lastName" name="lastName" placeholder="Doe" required value={form.lastName} onChange={handleChange}/>
                    </div>
                  </div>

                  <div className="cp-field">
                    <label className="cp-label" htmlFor="email">Email</label>
                    <input className="cp-input" id="email" name="email" type="email" placeholder="john@example.com" required value={form.email} onChange={handleChange}/>
                  </div>

                  <div className="cp-field">
                    <label className="cp-label" htmlFor="subject">Subject</label>
                    <input className="cp-input" id="subject" name="subject" placeholder="How can we help?" required value={form.subject} onChange={handleChange}/>
                  </div>

                  <div className="cp-field">
                    <label className="cp-label" htmlFor="message">Message</label>
                    <textarea className="cp-textarea" id="message" name="message" placeholder="Type your message here…" required value={form.message} onChange={handleChange}/>
                  </div>

                  <button className="cp-submit" type="submit">
                    Send Message <Send size={15}/>
                  </button>
                </form>
              </>
            )}
          </div>

          {/* Right column */}
          <div className="cp-right">

            {/* Contact info — purple card */}
            <div className="cp-info-card">
              <div className="cp-info-title">Contact information</div>
              <div className="cp-info-sub">Reach us through any of these channels</div>
              <div className="cp-info-items">
                <div className="cp-info-item">
                  <div className="cp-info-icon"><Mail size={17}/></div>
                  <div>
                    <div className="cp-info-label">Email</div>
                    <div className="cp-info-value">support@uniacts.com</div>
                  </div>
                </div>
                <div className="cp-info-item">
                  <div className="cp-info-icon"><Phone size={17}/></div>
                  <div>
                    <div className="cp-info-label">Phone</div>
                    <div className="cp-info-value">+1 (555) 123-4567</div>
                  </div>
                </div>
                <div className="cp-info-item">
                  <div className="cp-info-icon"><MapPin size={17}/></div>
                  <div>
                    <div className="cp-info-label">Office</div>
                    <div className="cp-info-value">123 University Ave<br/>Campus Center, Room 404</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Hours */}
            <div className="cp-hours-card">
              <div className="cp-hours-icon"><Clock size={20}/></div>
              <div>
                <div className="cp-hours-title">Support hours</div>
                <div className="cp-hours-val">Mon – Fri: 9:00 AM – 6:00 PM<br/>Weekends: 10:00 AM – 3:00 PM</div>
              </div>
            </div>

            {/* FAQ */}
            <div className="cp-faq-card">
              <div className="cp-faq-header">
                <div className="cp-faq-icon"><MessageSquare size={18}/></div>
                <div className="cp-faq-title">Help Center & FAQ</div>
              </div>
              <p className="cp-faq-desc">Check our frequently asked questions for quick answers to the most common queries about events, clubs, and your account.</p>
              <Link to="/faq" className="cp-faq-btn">
                Visit Help Center <ArrowRight size={14}/>
              </Link>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
