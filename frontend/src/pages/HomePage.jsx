import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Users, ChevronRight, Play, Zap } from 'lucide-react';
import { getEvents } from '@/data/mockEvents';
import { HomeNavigation } from '@/components/HomeNavigation';

const API_BASE = "http://127.0.0.1:8000/api";

const css = `
@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@400;500;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

.hp {
  --bg: #f0eefa;
  --purple: #7c3aed;
  --purple-light: #a78bfa;
  --purple-mid: #6d28d9;
  --white: #ffffff;
  --text: #1a0a3c;
  --muted: #6b7280;
  font-family: 'DM Sans', sans-serif;
  background: var(--bg);
  color: var(--text);
  overflow-x: hidden;
  min-height: 100vh;
}

/* subtle ambient blob */
.hp::before {
  content: '';
  position: fixed;
  top: -200px; right: -200px;
  width: 700px; height: 700px;
  background: radial-gradient(circle, rgba(167,139,250,0.20) 0%, transparent 65%);
  pointer-events: none; z-index: 0;
}

/* ── NAV (unchanged) ──────────────────────────────────────────────── */
.hp-nav {
  position: fixed; top: 0; left: 0; right: 0; z-index: 100;
  display: flex; align-items: center; justify-content: space-between;
  padding: 14px 48px;
  background: rgba(240,238,250,0.85); backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(124,58,237,0.08);
}
.hp-logo { font-family:'Bricolage Grotesque',sans-serif; font-weight:800; font-size:19px; color:var(--text); text-decoration:none; display:flex; align-items:center; gap:7px; }
.hp-logo-dot { width:8px; height:8px; border-radius:50%; background:var(--purple); }
.hp-nav-links { display:flex; gap:28px; list-style:none; }
.hp-nav-links a { color:var(--muted); text-decoration:none; font-size:14px; font-weight:500; transition:color 0.2s; }
.hp-nav-links a:hover { color:var(--text); }
.hp-try-btn { background:var(--purple); color:#fff; font-family:'DM Sans',sans-serif; font-size:14px; font-weight:500; padding:10px 22px; border-radius:50px; text-decoration:none; border:none; cursor:pointer; transition:all 0.2s; box-shadow:0 4px 20px rgba(124,58,237,0.3); }
.hp-try-btn:hover { background:var(--purple-mid); transform:translateY(-1px); }

/* ── HERO ─────────────────────────────────────────────────────────── */
.hp-hero {
  min-height: 100vh;
  display: flex; align-items: center; justify-content: center;
  flex-direction: column; text-align: center;
  padding: 140px 48px 80px;
  position: relative; overflow: hidden;
}

.hp-bg-text {
  position: absolute; top: 50%; left: 50%; transform: translate(-50%, -54%);
  font-family: 'Bricolage Grotesque', sans-serif;
  font-size: clamp(80px, 14vw, 160px); font-weight: 800;
  color: rgba(124,58,237,0.05); white-space: nowrap;
  pointer-events: none; user-select: none; z-index: 0;
}

.hp-eyebrow {
  display: inline-flex; align-items: center; gap: 8px;
  background: rgba(124,58,237,0.08); border: 1px solid rgba(124,58,237,0.15);
  border-radius: 50px; padding: 6px 14px;
  font-size: 12px; font-weight: 500; color: var(--purple);
  margin-bottom: 24px;
  animation: fadeUp 0.5s ease both;
}

.hp-hero-title {
  font-family: 'Bricolage Grotesque', sans-serif;
  font-size: clamp(2.6rem, 6vw, 4.4rem); font-weight: 800;
  line-height: 1.08; letter-spacing: -0.03em;
  margin-bottom: 20px; color: var(--text);
  animation: fadeUp 0.5s 0.1s ease both;
  position: relative; z-index: 1;
}
.hp-hero-title .pill-word {
  display: inline-flex; align-items: center; gap: 8px;
  background: var(--purple); color: #fff;
  border-radius: 50px; padding: 2px 18px 2px 6px;
  font-size: 0.88em; vertical-align: middle;
}
.hp-hero-title .pill-icon {
  width: 30px; height: 30px; border-radius: 50%;
  background: rgba(255,255,255,0.22);
  display: inline-flex; align-items: center; justify-content: center; font-size: 14px;
}

.hp-hero-sub {
  font-size: 16px; font-weight: 300; color: var(--muted);
  line-height: 1.7; max-width: 480px;
  margin: 0 auto 40px; text-align: center;
  animation: fadeUp 0.5s 0.2s ease both;
  position: relative; z-index: 1;
}

.hp-hero-btns {
  display: flex; gap: 12px; flex-wrap: wrap; justify-content: center;
  animation: fadeUp 0.5s 0.3s ease both;
  position: relative; z-index: 1;
}

/* ── SHARED BUTTON STYLES ─────────────────────────────────────────── */
.hp-btn-purple {
  display: inline-flex; align-items: center; gap: 8px;
  background: var(--purple); color: #fff;
  font-family: 'DM Sans', sans-serif; font-size: 15px; font-weight: 500;
  padding: 14px 28px; border-radius: 50px; text-decoration: none; border: none; cursor: pointer;
  box-shadow: 0 8px 28px rgba(124,58,237,0.35); transition: all 0.2s;
}
.hp-btn-purple:hover { background: var(--purple-mid); transform: translateY(-2px); }

.hp-btn-ghost {
  display: inline-flex; align-items: center; gap: 8px;
  background: var(--white); color: var(--text);
  font-family: 'DM Sans', sans-serif; font-size: 15px; font-weight: 500;
  padding: 14px 28px; border-radius: 50px; text-decoration: none;
  border: 1px solid rgba(124,58,237,0.15); cursor: pointer;
  box-shadow: 0 2px 12px rgba(0,0,0,0.06); transition: all 0.2s;
}
.hp-btn-ghost:hover { border-color: var(--purple); color: var(--purple); }

/* ── SECTION SHARED ───────────────────────────────────────────────── */
.hp-section {
  padding: clamp(4rem, 8vw, 6rem) 48px;
  position: relative; z-index: 2;
}
.hp-section-header {
  display: flex; align-items: flex-end; justify-content: space-between;
  margin-bottom: 2rem; max-width: 1100px; margin-left: auto; margin-right: auto; flex-wrap: wrap; gap: 1rem;
}
.hp-label {
  display: inline-flex; align-items: center; gap: 6px;
  font-size: 11px; font-weight: 600; letter-spacing: 0.1em;
  text-transform: uppercase; color: var(--purple); margin-bottom: 6px;
}
.hp-section-title {
  font-family: 'Bricolage Grotesque', sans-serif;
  font-size: clamp(1.5rem, 2.5vw, 2rem); font-weight: 800;
  letter-spacing: -0.02em; color: var(--text);
}
.hp-view-all {
  display: inline-flex; align-items: center; gap: 6px;
  font-size: 13px; font-weight: 500; color: var(--purple);
  text-decoration: none; border: 1px solid rgba(124,58,237,0.2);
  padding: 8px 18px; border-radius: 50px; transition: all 0.2s;
  background: var(--white); white-space: nowrap;
}
.hp-view-all:hover { background: var(--purple); color: #fff; border-color: var(--purple); }

/* ── EVENT CARDS ──────────────────────────────────────────────────── */
.hp-events-grid {
  display: grid; grid-template-columns: repeat(3, 1fr);
  gap: 16px; max-width: 1100px; margin: 0 auto;
}
.hp-event-card {
  background: var(--white); border: 1px solid rgba(124,58,237,0.07);
  border-radius: 20px; overflow: hidden;
  text-decoration: none; display: block; transition: all 0.25s;
}
.hp-event-card:hover { transform: translateY(-5px); box-shadow: 0 20px 50px rgba(124,58,237,0.12); }
.hp-event-img-wrap { position: relative; height: 185px; overflow: hidden; }
.hp-event-img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform 0.35s; }
.hp-event-card:hover .hp-event-img { transform: scale(1.05); }
.hp-event-price {
  position: absolute; top: 12px; right: 12px;
  background: var(--white); border-radius: 20px; padding: 4px 12px;
  font-size: 12px; font-weight: 600; color: var(--purple);
  box-shadow: 0 2px 8px rgba(0,0,0,0.10);
}
.hp-event-body { padding: 1.1rem 1.3rem; }
.hp-event-cat { font-size: 10px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: var(--purple); margin-bottom: 5px; }
.hp-event-title {
  font-family: 'Bricolage Grotesque', sans-serif; font-size: 16px; font-weight: 700;
  color: var(--text); margin-bottom: 5px;
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis; transition: color 0.2s;
}
.hp-event-card:hover .hp-event-title { color: var(--purple); }
.hp-event-desc {
  font-size: 12px; color: var(--muted); line-height: 1.55; margin-bottom: 12px;
  display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; font-weight: 300;
}
.hp-event-meta {
  display: flex; justify-content: space-between; align-items: center;
  padding-top: 10px; border-top: 1px solid rgba(124,58,237,0.07);
  font-size: 11px; color: var(--muted);
}
.hp-event-date { display: flex; align-items: center; gap: 4px; }

/* ── CLUBS GRID ───────────────────────────────────────────────────── */
.hp-clubs-grid {
  display: grid; grid-template-columns: repeat(3, 1fr);
  gap: 16px; max-width: 1100px; margin: 0 auto;
}
.hp-club-card {
  background: var(--white); border: 1px solid rgba(124,58,237,0.07);
  border-radius: 20px; padding: 24px 20px;
  text-decoration: none; display: flex; align-items: center; gap: 16px;
  transition: all 0.25s;
}
.hp-club-card:hover { transform: translateY(-4px); box-shadow: 0 16px 44px rgba(124,58,237,0.11); border-color: rgba(124,58,237,0.18); }
.hp-club-emoji { width: 52px; height: 52px; border-radius: 14px; background: rgba(124,58,237,0.08); display: flex; align-items: center; justify-content: center; font-size: 24px; flex-shrink: 0; }
.hp-club-info { min-width: 0; }
.hp-club-name { font-family: 'Bricolage Grotesque', sans-serif; font-size: 15px; font-weight: 700; color: var(--text); margin-bottom: 3px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; transition: color 0.2s; }
.hp-club-card:hover .hp-club-name { color: var(--purple); }
.hp-club-cat { font-size: 11px; color: var(--muted); margin-bottom: 6px; }
.hp-club-members { display: inline-flex; align-items: center; gap: 4px; font-size: 11px; font-weight: 500; color: var(--purple); background: rgba(124,58,237,0.08); border-radius: 20px; padding: 2px 10px; }

/* ── FOOTER ───────────────────────────────────────────────────────── */
.hp-footer {
  padding: 32px 48px;
  border-top: 1px solid rgba(124,58,237,0.08);
  display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px;
  position: relative; z-index: 2;
}
.hp-footer-logo { font-family: 'Bricolage Grotesque', sans-serif; font-weight: 800; font-size: 16px; color: var(--text); display: flex; align-items: center; gap: 6px; }
.hp-footer-copy { font-size: 13px; color: var(--muted); }
.hp-footer-links { display: flex; gap: 20px; list-style: none; }
.hp-footer-links a { font-size: 13px; color: var(--muted); text-decoration: none; transition: color 0.2s; }
.hp-footer-links a:hover { color: var(--purple); }

/* ── ANIMATIONS ───────────────────────────────────────────────────── */
@keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }

/* ── RESPONSIVE ───────────────────────────────────────────────────── */
@media (max-width: 900px) {
  .hp-events-grid, .hp-clubs-grid { grid-template-columns: 1fr 1fr; }
}
@media (max-width: 640px) {
  .hp-nav { padding: 14px 20px; }
  .hp-nav-links { display: none; }
  .hp-hero { padding: 120px 24px 64px; }
  .hp-section { padding-left: 20px; padding-right: 20px; }
  .hp-events-grid, .hp-clubs-grid { grid-template-columns: 1fr; }
  .hp-footer { padding: 24px 20px; flex-direction: column; align-items: flex-start; }
}
`;

export function HomePage() {
  const [events, setEvents] = useState([]);
  const [clubs, setClubs] = useState([]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const data = await getEvents();
      if (mounted) setEvents(data);
    })();
    return () => { mounted = false; };
  }, []);

  useEffect(() => {
    fetch(`${API_BASE}/clubs/`)
      .then(res => res.json())
      .then(data => setClubs(Array.isArray(data) ? data.slice(0, 6) : []))
      .catch(() => setClubs([]));
  }, []);

  const upcomingEvents = events.slice(0, 3);
  const recentEvents  = events.slice(3, 6);

  return (
    <div className="hp">
      <style>{css}</style>

      {/* ── NAVBAR ────────────────────────────────────────────────── */}
      <HomeNavigation />

      {/* ── HERO ──────────────────────────────────────────────────── */}
      <section className="hp-hero">
        <div className="hp-bg-text">UNIACTS</div>

        <h1 className="hp-hero-title">
          Discover Your{' '}
          <span className="pill-word">
            <span className="pill-icon">🎓</span>
            Campus
          </span>{' '}
          Life With UniActs
        </h1>

        <p className="hp-hero-sub">
          Join thousands of students connecting through events, clubs, and shared passions.
          Your university, fully unlocked — available 24/7.
        </p>

        <div className="hp-hero-btns">
          <Link to="/events" className="hp-btn-purple">
            Browse Events <ChevronRight size={16} />
          </Link>
          <Link to="/register" className="hp-btn-ghost">
            <Play size={14} /> Join a Club
          </Link>
        </div>
      </section>

      {/* ── UPCOMING EVENTS ───────────────────────────────────────── */}
      <section className="hp-section">
        <div className="hp-section-header">
          <div>
            <div className="hp-label"><Calendar size={11} /> Upcoming</div>
            <h2 className="hp-section-title">Don't miss what's happening</h2>
          </div>
          <Link to="/events" className="hp-view-all">
            View all <ChevronRight size={13} />
          </Link>
        </div>

        <div className="hp-events-grid">
          {upcomingEvents.map(event => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </section>

      {/* ── RECENT EVENTS ─────────────────────────────────────────── */}
      <section className="hp-section" style={{ paddingTop: 0 }}>
        <div className="hp-section-header">
          <div>
            <div className="hp-label"><Calendar size={11} /> Recent</div>
            <h2 className="hp-section-title">Recently added events</h2>
          </div>
          <Link to="/events" className="hp-view-all">
            View all <ChevronRight size={13} />
          </Link>
        </div>

        <div className="hp-events-grid">
          {recentEvents.map(event => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </section>

      {/* ── CLUBS ─────────────────────────────────────────────────── */}
      <section className="hp-section" style={{ paddingTop: 0 }}>
        <div className="hp-section-header">
          <div>
            <div className="hp-label"><Users size={11} /> Clubs</div>
            <h2 className="hp-section-title">Popular clubs to join</h2>
          </div>
          <Link to="/clubs" className="hp-view-all">
            View all <ChevronRight size={13} />
          </Link>
        </div>

        <div className="hp-clubs-grid">
          {clubs.map(club => (
            <Link key={club.id} to={`/clubs/${club.id}`} className="hp-club-card">
              <div className="hp-club-emoji">{club.logo ? <img src={club.logo} alt="" style={{width:40,height:40,objectFit:"cover",borderRadius:8}} /> : '🏆'}</div>
              <div className="hp-club-info">
                <div className="hp-club-name">{club.name}</div>
                <div className="hp-club-cat">{club.description?.slice(0, 50) || 'Student Club'}</div>
                <span className="hp-club-members">
                  <Users size={10} /> {club.member_count || club.members || 0} members
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── FOOTER ────────────────────────────────────────────────── */}
      <footer className="hp-footer">
        <div className="hp-footer-logo">
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--purple)', display: 'inline-block' }} />
          UniActs
        </div>
        <span className="hp-footer-copy">© {new Date().getFullYear()} UniActs. All rights reserved.</span>
        <ul className="hp-footer-links">
          <li><a href="#">Privacy</a></li>
          <li><a href="#">Terms</a></li>
          <li><a href="#">Contact</a></li>
        </ul>
      </footer>
    </div>
  );
}

/* ── Shared event card sub-component ──────────────────────────────── */
function EventCard({ event }) {
  return (
    <Link to={`/events/${event.id}`} className="hp-event-card">
      <div className="hp-event-img-wrap">
        <img src={event.image} alt={event.title} className="hp-event-img" />
        <span className="hp-event-price">{event.price}</span>
      </div>
      <div className="hp-event-body">
        <div className="hp-event-cat">{event.category}</div>
        <div className="hp-event-title">{event.title}</div>
        <p className="hp-event-desc">{event.description || 'Join us for this amazing event!'}</p>
        <div className="hp-event-meta">
          <span className="hp-event-date"><Calendar size={11} /> {event.date}</span>
          <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: 120 }}>
            {event.location}
          </span>
        </div>
      </div>
    </Link>
  );
}
