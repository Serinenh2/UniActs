import React from 'react';
import { Link } from 'react-router-dom';
import { Twitter, Instagram, Linkedin, Mail, MapPin, ArrowUpRight, Zap } from 'lucide-react';

const css = `
@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@700;800&family=DM+Sans:wght@300;400;500&display=swap');

.ft {
  --bg: #f0eefa;
  --bg2: #e8e1f7;
  --purple: #7c3aed;
  --purple-light: #a78bfa;
  --text: #1a0a3c;
  --muted: #6b7280;
  --border: rgba(124,58,237,0.1);
  --white: #ffffff;
  font-family: 'DM Sans', sans-serif;
  background: var(--bg2);
  color: var(--text);
  position: relative;
  overflow: hidden;
}

.ft::before {
  content: '';
  position: absolute;
  bottom: -120px; left: -120px;
  width: 500px; height: 500px;
  background: radial-gradient(circle, rgba(124,58,237,0.1) 0%, transparent 65%);
  pointer-events: none;
}

/* TOP BAND */
.ft-cta-band {
  background: var(--purple);
  padding: 44px 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  flex-wrap: wrap;
  position: relative;
  overflow: hidden;
}

.ft-cta-band::before {
  content: 'UNIACTS';
  position: absolute;
  right: -20px; top: 50%;
  transform: translateY(-50%);
  font-family: 'Bricolage Grotesque', sans-serif;
  font-size: 120px; font-weight: 800;
  color: rgba(255,255,255,0.05);
  white-space: nowrap; pointer-events: none;
  letter-spacing: -0.02em;
}

.ft-cta-title {
  font-family: 'Bricolage Grotesque', sans-serif;
  font-size: clamp(1.4rem, 3vw, 2rem);
  font-weight: 800;
  color: #fff;
  letter-spacing: -0.02em;
  line-height: 1.2;
}

.ft-cta-sub {
  font-size: 14px;
  color: rgba(255,255,255,0.6);
  font-weight: 300;
  margin-top: 4px;
}

.ft-cta-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: #fff;
  color: var(--purple);
  font-family: 'DM Sans', sans-serif;
  font-size: 14px; font-weight: 600;
  padding: 12px 24px;
  border-radius: 50px;
  text-decoration: none;
  border: none; cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s;
  box-shadow: 0 4px 20px rgba(0,0,0,0.15);
  flex-shrink: 0;
}
.ft-cta-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 28px rgba(0,0,0,0.2); }

/* MAIN FOOTER GRID */
.ft-main {
  padding: 64px 64px 48px;
  display: grid;
  grid-template-columns: 1.4fr 1fr 1fr 1fr;
  gap: 48px;
  max-width: 1200px;
  margin: 0 auto;
  position: relative; z-index: 1;
}

@media (max-width: 900px) {
  .ft-main { grid-template-columns: 1fr 1fr; padding: 48px 24px 36px; gap: 36px; }
  .ft-cta-band { padding: 36px 24px; }
}
@media (max-width: 540px) {
  .ft-main { grid-template-columns: 1fr; }
}

/* BRAND COL */
.ft-logo {
  font-family: 'Bricolage Grotesque', sans-serif;
  font-weight: 800; font-size: 22px;
  color: var(--text); text-decoration: none;
  display: flex; align-items: center; gap: 7px;
  margin-bottom: 16px;
}
.ft-logo-dot { width: 9px; height: 9px; border-radius: 50%; background: var(--purple); }

.ft-brand-desc {
  font-size: 14px; font-weight: 300;
  color: var(--muted); line-height: 1.7;
  margin-bottom: 24px; max-width: 240px;
}

.ft-socials { display: flex; gap: 10px; }
.ft-social-btn {
  width: 38px; height: 38px; border-radius: 10px;
  background: var(--white);
  border: 1px solid var(--border);
  display: flex; align-items: center; justify-content: center;
  color: var(--muted); text-decoration: none;
  transition: all 0.2s;
}
.ft-social-btn:hover { background: var(--purple); color: #fff; border-color: var(--purple); transform: translateY(-2px); }

/* LINK COLS */
.ft-col-title {
  font-family: 'Bricolage Grotesque', sans-serif;
  font-size: 14px; font-weight: 700;
  color: var(--text); margin-bottom: 20px;
  display: flex; align-items: center; gap: 6px;
}

.ft-col-title::before {
  content: '';
  width: 4px; height: 14px;
  background: var(--purple);
  border-radius: 2px;
  display: inline-block;
}

.ft-links { list-style: none; display: flex; flex-direction: column; gap: 11px; }
.ft-links a {
  font-size: 14px; font-weight: 300;
  color: var(--muted); text-decoration: none;
  display: inline-flex; align-items: center; gap: 4px;
  transition: color 0.2s, gap 0.2s;
}
.ft-links a:hover { color: var(--purple); gap: 7px; }

/* CONTACT */
.ft-contact-item {
  display: flex; align-items: flex-start; gap: 10px;
  font-size: 14px; font-weight: 300;
  color: var(--muted); margin-bottom: 12px;
  line-height: 1.5;
}
.ft-contact-icon { color: var(--purple); flex-shrink: 0; margin-top: 1px; }

.ft-badge {
  display: inline-flex; align-items: center; gap: 6px;
  background: rgba(124,58,237,0.08);
  border: 1px solid rgba(124,58,237,0.15);
  border-radius: 50px; padding: 5px 12px;
  font-size: 11px; font-weight: 500; color: var(--purple);
  margin-top: 16px;
}

/* BOTTOM BAR */
.ft-bottom {
  border-top: 1px solid var(--border);
  padding: 20px 64px;
  display: flex; align-items: center; justify-content: space-between;
  flex-wrap: wrap; gap: 12px;
  position: relative; z-index: 1;
}

@media (max-width: 768px) { .ft-bottom { padding: 20px 24px; flex-direction: column; text-align: center; } }

.ft-copy { font-size: 12px; color: var(--muted); font-weight: 300; }
.ft-copy strong { color: var(--purple); font-weight: 500; }

.ft-bottom-links { display: flex; gap: 20px; }
.ft-bottom-links a { font-size: 12px; color: var(--muted); text-decoration: none; font-weight: 300; transition: color 0.2s; }
.ft-bottom-links a:hover { color: var(--purple); }
`;

export function Footer() {
  return (
    <footer className="ft">
      <style>{css}</style>

      {/* CTA band */}
      <div className="ft-cta-band">
        <div>
          <div className="ft-cta-title">Ready to transform your campus life?</div>
          <div className="ft-cta-sub">Join 12,400+ students already on UniActs — it's free.</div>
        </div>
        <Link to="/register" className="ft-cta-btn">
          Get Started Now <ArrowUpRight size={15}/>
        </Link>
      </div>

      {/* Main grid */}
      <div className="ft-main">

        {/* Brand */}
        <div>
          <Link to="/" className="ft-logo">
            <div className="ft-logo-dot"/>UniActs
          </Link>
          <p className="ft-brand-desc">
            The ultimate platform for university events and student clubs. Connect, participate, and lead.
          </p>
          <div className="ft-socials">
            <a href="#" className="ft-social-btn" aria-label="Twitter"><Twitter size={16}/></a>
            <a href="#" className="ft-social-btn" aria-label="Instagram"><Instagram size={16}/></a>
            <a href="#" className="ft-social-btn" aria-label="LinkedIn"><Linkedin size={16}/></a>
          </div>
          <div className="ft-badge"><Zap size={11}/> AI-Powered Platform</div>
        </div>

        {/* Platform */}
        <div>
          <div className="ft-col-title">Platform</div>
          <ul className="ft-links">
            <li><Link to="/events">Browse Events <ArrowUpRight size={11}/></Link></li>
            <li><Link to="/clubs">Clubs & Societies <ArrowUpRight size={11}/></Link></li>
            <li><Link to="/create-event">Host an Event <ArrowUpRight size={11}/></Link></li>
            <li><Link to="/dashboard">Dashboard <ArrowUpRight size={11}/></Link></li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <div className="ft-col-title">Resources</div>
          <ul className="ft-links">
            <li><Link to="/about">About Us <ArrowUpRight size={11}/></Link></li>
            <li><Link to="/contact">Contact Support <ArrowUpRight size={11}/></Link></li>
            <li><Link to="/terms">Terms of Service <ArrowUpRight size={11}/></Link></li>
            <li><Link to="/privacy">Privacy Policy <ArrowUpRight size={11}/></Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <div className="ft-col-title">Contact</div>
          <div className="ft-contact-item">
            <Mail size={15} className="ft-contact-icon"/>
            <span>support@uniacts.com</span>
          </div>
          <div className="ft-contact-item">
            <MapPin size={15} className="ft-contact-icon"/>
            <span>123 University Ave,<br/>Campus Center</span>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="ft-bottom">
        <div className="ft-copy">
          © {new Date().getFullYear()} <strong>UniActs</strong>. All rights reserved.
        </div>
        <div className="ft-bottom-links">
          <Link to="/terms">Terms</Link>
          <Link to="/privacy">Privacy</Link>
          <Link to="/cookies">Cookies</Link>
        </div>
      </div>
    </footer>
  );
}
