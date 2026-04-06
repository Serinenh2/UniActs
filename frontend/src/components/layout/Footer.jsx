import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, MapPin, Phone, Printer, Calendar, Users, ExternalLink } from 'lucide-react';

const css = `
@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@700;800&family=DM+Sans:wght@300;400;500&display=swap');

.ft {
  --bg2: #e8e1f7;
  --purple: #7c3aed;
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

/* CTA BAND */
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

@media (max-width: 900px) { .ft-cta-band { padding: 36px 24px; } }

/* MAIN FOOTER GRID */
.ft-main {
  padding: 56px 64px 44px;
  display: grid;
  grid-template-columns: 1fr 1.4fr 1fr 1fr;
  gap: 40px;
  max-width: 1200px;
  margin: 0 auto;
  position: relative; z-index: 1;
  align-items: start;
}

@media (max-width: 960px) {
  .ft-main { grid-template-columns: 1fr 1fr; padding: 40px 24px 32px; gap: 32px; }
}
@media (max-width: 540px) {
  .ft-main { grid-template-columns: 1fr; }
}

/* ── LOGO COL ────────────────────────────────────────────── */
.ft-logo-col { display: flex; flex-direction: column; align-items: center; text-align: center; gap: 12px; }

.ft-logo-img {
  width: 80px; height: 80px;
  object-fit: contain;
  border-radius: 16px;
  background: var(--white);
  padding: 8px;
  border: 1px solid var(--border);
}

.ft-logo-name {
  font-family: 'Bricolage Grotesque', sans-serif;
  font-size: 13px; font-weight: 700;
  color: var(--text); line-height: 1.35;
  text-align: center;
}

.ft-logo-tagline {
  font-size: 11px; font-weight: 300;
  color: var(--muted); line-height: 1.5;
  max-width: 160px;
}

/* ── SECTION TITLES ──────────────────────────────────────── */
.ft-col-title {
  font-family: 'Bricolage Grotesque', sans-serif;
  font-size: 14px; font-weight: 700;
  color: var(--text); margin-bottom: 18px;
  display: flex; align-items: center; gap: 6px;
}
.ft-col-title::before {
  content: '';
  width: 4px; height: 14px;
  background: var(--purple);
  border-radius: 2px;
  display: inline-block;
}

/* ── PLATFORM COL ────────────────────────────────────────── */
.ft-platform-desc {
  font-size: 13px; font-weight: 300;
  color: var(--muted); line-height: 1.65;
  margin-bottom: 20px;
}

.ft-feat-list { list-style: none; display: flex; flex-direction: column; gap: 10px; }
.ft-feat-list li a {
  display: inline-flex; align-items: center; gap: 8px;
  font-size: 14px; font-weight: 400;
  color: var(--muted); text-decoration: none;
  transition: color 0.2s, gap 0.2s;
}
.ft-feat-list li a:hover { color: var(--purple); gap: 12px; }
.ft-feat-list li a .ft-feat-icon {
  width: 30px; height: 30px; border-radius: 8px;
  background: rgba(124,58,237,0.08);
  display: flex; align-items: center; justify-content: center;
  color: var(--purple); flex-shrink: 0;
  transition: background 0.2s;
}
.ft-feat-list li a:hover .ft-feat-icon { background: rgba(124,58,237,0.15); }

/* ── CONTACT COL ─────────────────────────────────────────── */
.ft-contact-item {
  display: flex; align-items: flex-start; gap: 10px;
  font-size: 13px; font-weight: 300;
  color: var(--muted); margin-bottom: 14px; line-height: 1.55;
}
.ft-contact-icon { color: var(--purple); flex-shrink: 0; margin-top: 2px; }
.ft-contact-label { font-size: 10px; font-weight: 600; letter-spacing: 0.07em; text-transform: uppercase; color: var(--purple); display: block; margin-bottom: 1px; }

/* ── LOCALISATION COL ────────────────────────────────────── */
.ft-map-link {
  display: flex; align-items: center; gap: 8px;
  font-size: 13px; font-weight: 400;
  color: var(--purple); text-decoration: none;
  border: 1px solid rgba(124,58,237,0.2);
  background: var(--white);
  padding: 9px 14px; border-radius: 10px;
  transition: all 0.2s; margin-bottom: 16px;
}
.ft-map-link:hover { background: var(--purple); color: #fff; border-color: var(--purple); }

.ft-map-preview {
  width: 100%; height: 130px;
  border-radius: 12px;
  border: 1px solid var(--border);
  overflow: hidden;
  background: rgba(124,58,237,0.04);
  display: flex; align-items: center; justify-content: center;
}
.ft-map-preview iframe {
  width: 100%; height: 100%;
  border: none; pointer-events: none;
  opacity: 0.9;
}

/* ── BOTTOM BAR ──────────────────────────────────────────── */
.ft-bottom {
  border-top: 1px solid var(--border);
  padding: 18px 64px;
  display: flex; align-items: center; justify-content: space-between;
  flex-wrap: wrap; gap: 12px;
  position: relative; z-index: 1;
}

@media (max-width: 768px) { .ft-bottom { padding: 18px 24px; flex-direction: column; text-align: center; } }

.ft-copy { font-size: 12px; color: var(--muted); font-weight: 300; }
.ft-copy strong { color: var(--purple); font-weight: 500; }

.ft-bottom-links { display: flex; gap: 20px; }
.ft-bottom-links a { font-size: 12px; color: var(--muted); text-decoration: none; font-weight: 300; transition: color 0.2s; }
.ft-bottom-links a:hover { color: var(--purple); }
`;

const MAP_URL = "https://www.google.com/maps/place/Universit%C3%A9+d'Alger+1+Benyoucef+Benkhedda/@36.770938,3.055558,13z/data=!4m6!3m5!1s0x128fb258e74b7123:0xa31d6cb06299dd5b!8m2!3d36.7709377!4d3.0555578!16zL20vMGQ2cTNt?hl=fr-FR&entry=ttu&g_ep=EgoyMDI2MDQwMS4wIKXMDSoASAFQAw%3D%3D";

const EMBED_URL = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3197.6!2d3.0555578!3d36.7709377!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x128fb258e74b7123%3A0xa31d6cb06299dd5b!2sUniversit%C3%A9+d'Alger+1+Benyoucef+Benkhedda!5e0!3m2!1sfr!2sdz!4v1680000000000";

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
      </div>

      {/* Main grid */}
      <div className="ft-main">

        {/* ── Logo ── */}
        <div className="ft-logo-col">
          <img src="/logo.png" alt="University of Algiers 1" className="ft-logo-img" />
          <div className="ft-logo-name">University of Algiers 1<br/>Benyoucef Benkhedda</div>
          <div className="ft-logo-tagline">Student events & clubs management platform</div>
        </div>

        {/* ── Platform ── */}
        <div>
          <div className="ft-col-title">Platform</div>
          <p className="ft-platform-desc">
            Discover campus events and join student clubs. Everything happening at the university, all in one place.
          </p>
          <ul className="ft-feat-list">
            <li>
              <Link to="/events">
                <span className="ft-feat-icon"><Calendar size={14}/></span>
                Events
              </Link>
            </li>
            <li>
              <Link to="/clubs">
                <span className="ft-feat-icon"><Users size={14}/></span>
                Clubs & Associations
              </Link>
            </li>
          </ul>
        </div>

        {/* ── Contact ── */}
        <div>
          <div className="ft-col-title">Contact</div>

          <div className="ft-contact-item">
            <MapPin size={15} className="ft-contact-icon"/>
            <div>
              <span className="ft-contact-label">Address</span>
              02 Rue Didouche Mourad, Algiers
            </div>
          </div>

          <div className="ft-contact-item">
            <Mail size={15} className="ft-contact-icon"/>
            <div>
              <span className="ft-contact-label">Mail</span>
              <a href="mailto:contact@univ-alger.dz" style={{ color: 'inherit', textDecoration: 'none' }}>
                contact@univ-alger.dz
              </a>
            </div>
          </div>

          <div className="ft-contact-item">
            <Phone size={15} className="ft-contact-icon"/>
            <div>
              <span className="ft-contact-label">Tel</span>
              +213 (0) 21 63 77 65
            </div>
          </div>

          <div className="ft-contact-item">
            <Printer size={15} className="ft-contact-icon"/>
            <div>
              <span className="ft-contact-label">Fax</span>
              +213 (0) 21 63 78 64
            </div>
          </div>
        </div>

        {/* ── Location ── */}
        <div>
          <div className="ft-col-title">Location</div>
          <a href={MAP_URL} target="_blank" rel="noopener noreferrer" className="ft-map-link">
            <MapPin size={14}/> View on Google Maps <ExternalLink size={12}/>
          </a>
          <div className="ft-map-preview">
            <iframe
              title="University of Algiers 1"
              src={EMBED_URL}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

      </div>

      {/* Bottom bar */}
      <div className="ft-bottom">
        <div className="ft-copy">
          © {new Date().getFullYear()} <strong>University of Algiers 1</strong>. All rights reserved.
        </div>
        <div className="ft-bottom-links">
          <Link to="/terms">Terms</Link>
          <Link to="/privacy">Privacy</Link>
        </div>
      </div>
    </footer>
  );
}
