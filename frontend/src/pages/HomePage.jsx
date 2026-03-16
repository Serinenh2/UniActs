import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Calendar, Users, ArrowRight, Star, Zap, ChevronRight } from 'lucide-react';
import { getEvents } from '@/data/mockEvents';

/* ─────────────────────────────────────────
   Design Direction: "Dark Editorial Luxury"
   Palette: Near-black + warm white + electric
   amber accent. Inspired by high-end tech
   publications and modern SaaS landing pages.
   Font pairing: Playfair Display (display) +
   DM Sans (body). Lots of asymmetry, bold
   type scale, subtle grain overlay.
───────────────────────────────────────── */

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@300;400;500;600&display=swap');

  .hp-root {
    --bg-dark: #0a0a0b;
    --bg-card: #111113;
    --bg-card-hover: #18181b;
    --accent: #f59e0b;
    --accent-light: #fcd34d;
    --accent-dim: rgba(245,158,11,0.12);
    --text-primary: #fafaf9;
    --text-muted: #a1a1aa;
    --text-dim: #52525b;
    --border: rgba(255,255,255,0.07);
    --border-hover: rgba(245,158,11,0.3);
    font-family: 'DM Sans', sans-serif;
    background: var(--bg-dark);
    color: var(--text-primary);
    overflow-x: hidden;
  }

  /* Grain texture overlay */
  .hp-root::before {
    content: '';
    position: fixed;
    inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
    pointer-events: none;
    z-index: 1000;
    opacity: 0.35;
  }

  /* ── HERO ── */
  .hp-hero {
    min-height: 100vh;
    display: grid;
    grid-template-rows: 1fr auto;
    position: relative;
    padding: 0 clamp(1.5rem, 6vw, 6rem);
    overflow: hidden;
  }

  .hp-hero-bg {
    position: absolute;
    inset: 0;
    background:
      radial-gradient(ellipse 80% 60% at 70% 40%, rgba(245,158,11,0.07) 0%, transparent 60%),
      radial-gradient(ellipse 50% 50% at 20% 80%, rgba(245,158,11,0.04) 0%, transparent 50%),
      var(--bg-dark);
  }

  .hp-hero-grid {
    position: absolute;
    inset: 0;
    background-image: linear-gradient(var(--border) 1px, transparent 1px),
                      linear-gradient(90deg, var(--border) 1px, transparent 1px);
    background-size: 80px 80px;
    mask-image: radial-gradient(ellipse 70% 70% at 50% 50%, black 0%, transparent 70%);
  }

  .hp-hero-content {
    position: relative;
    z-index: 2;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-top: 120px;
    padding-bottom: 80px;
    max-width: 900px;
  }

  .hp-eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: var(--accent-dim);
    border: 1px solid rgba(245,158,11,0.2);
    border-radius: 100px;
    padding: 6px 16px;
    font-size: 12px;
    font-weight: 600;
    color: var(--accent-light);
    letter-spacing: 0.08em;
    text-transform: uppercase;
    margin-bottom: 2rem;
    width: fit-content;
    animation: fadeUp 0.6s ease both;
  }

  .hp-hero h1 {
    font-family: 'Playfair Display', serif;
    font-size: clamp(3rem, 8vw, 7rem);
    font-weight: 900;
    line-height: 1.0;
    letter-spacing: -0.02em;
    margin: 0 0 1.5rem;
    animation: fadeUp 0.6s 0.1s ease both;
  }

  .hp-hero h1 em {
    font-style: italic;
    color: var(--accent);
  }

  .hp-hero-sub {
    font-size: clamp(1rem, 2vw, 1.2rem);
    color: var(--text-muted);
    font-weight: 300;
    max-width: 520px;
    line-height: 1.7;
    margin-bottom: 2.5rem;
    animation: fadeUp 0.6s 0.2s ease both;
  }

  .hp-hero-actions {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
    animation: fadeUp 0.6s 0.3s ease both;
  }

  .hp-btn-primary {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: var(--accent);
    color: #0a0a0b;
    font-family: 'DM Sans', sans-serif;
    font-size: 15px;
    font-weight: 600;
    padding: 14px 28px;
    border-radius: 8px;
    text-decoration: none;
    border: none;
    cursor: pointer;
    transition: background 0.2s, transform 0.15s;
  }
  .hp-btn-primary:hover { background: var(--accent-light); transform: translateY(-1px); }

  .hp-btn-ghost {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: transparent;
    color: var(--text-primary);
    font-family: 'DM Sans', sans-serif;
    font-size: 15px;
    font-weight: 500;
    padding: 14px 28px;
    border-radius: 8px;
    border: 1px solid var(--border);
    text-decoration: none;
    cursor: pointer;
    transition: border-color 0.2s, background 0.2s;
  }
  .hp-btn-ghost:hover { border-color: rgba(255,255,255,0.2); background: rgba(255,255,255,0.04); }

  .hp-hero-stats {
    position: relative;
    z-index: 2;
    display: flex;
    gap: 2.5rem;
    padding-bottom: 3rem;
    border-top: 1px solid var(--border);
    padding-top: 2rem;
    animation: fadeUp 0.6s 0.4s ease both;
  }

  .hp-stat-value {
    font-family: 'Playfair Display', serif;
    font-size: 2rem;
    font-weight: 700;
    color: var(--text-primary);
  }

  .hp-stat-label {
    font-size: 12px;
    color: var(--text-dim);
    font-weight: 500;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    margin-top: 2px;
  }

  /* ── FEATURES ── */
  .hp-features {
    padding: clamp(5rem, 10vw, 9rem) clamp(1.5rem, 6vw, 6rem);
    position: relative;
  }

  .hp-section-label {
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--accent);
    margin-bottom: 1rem;
  }

  .hp-section-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(2rem, 4vw, 3.2rem);
    font-weight: 700;
    line-height: 1.15;
    margin: 0 0 1rem;
    max-width: 480px;
  }

  .hp-features-layout {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 1px;
    background: var(--border);
    border: 1px solid var(--border);
    border-radius: 16px;
    overflow: hidden;
    margin-top: 4rem;
  }

  @media (max-width: 768px) {
    .hp-features-layout { grid-template-columns: 1fr; }
  }

  .hp-feature-card {
    background: var(--bg-card);
    padding: 2.5rem 2rem;
    transition: background 0.2s;
    position: relative;
    overflow: hidden;
  }

  .hp-feature-card::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: var(--accent);
    transform: scaleX(0);
    transition: transform 0.3s ease;
    transform-origin: left;
  }

  .hp-feature-card:hover { background: var(--bg-card-hover); }
  .hp-feature-card:hover::after { transform: scaleX(1); }

  .hp-feature-icon {
    width: 44px;
    height: 44px;
    border-radius: 10px;
    background: var(--accent-dim);
    border: 1px solid rgba(245,158,11,0.15);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1.5rem;
    color: var(--accent);
  }

  .hp-feature-title {
    font-size: 17px;
    font-weight: 600;
    margin: 0 0 0.75rem;
    color: var(--text-primary);
  }

  .hp-feature-desc {
    font-size: 14px;
    line-height: 1.65;
    color: var(--text-muted);
    font-weight: 300;
    margin: 0;
  }

  /* ── EVENTS ── */
  .hp-events {
    padding: clamp(5rem, 10vw, 9rem) clamp(1.5rem, 6vw, 6rem);
    background: var(--bg-card);
    border-top: 1px solid var(--border);
    border-bottom: 1px solid var(--border);
  }

  .hp-events-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 3rem;
    flex-wrap: wrap;
    gap: 1rem;
  }

  .hp-link-arrow {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 14px;
    font-weight: 500;
    color: var(--accent);
    text-decoration: none;
    transition: gap 0.2s;
  }
  .hp-link-arrow:hover { gap: 10px; }

  .hp-events-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
  }

  @media (max-width: 900px) {
    .hp-events-grid { grid-template-columns: 1fr 1fr; }
  }

  @media (max-width: 600px) {
    .hp-events-grid { grid-template-columns: 1fr; }
  }

  .hp-event-card {
    background: var(--bg-dark);
    border: 1px solid var(--border);
    border-radius: 12px;
    overflow: hidden;
    text-decoration: none;
    display: block;
    transition: border-color 0.2s, transform 0.2s;
  }

  .hp-event-card:hover {
    border-color: var(--border-hover);
    transform: translateY(-3px);
  }

  .hp-event-img {
    width: 100%;
    height: 180px;
    object-fit: cover;
    display: block;
    filter: saturate(0.7);
    transition: filter 0.3s;
  }

  .hp-event-card:hover .hp-event-img { filter: saturate(1); }

  .hp-event-body { padding: 1.25rem; }

  .hp-event-category {
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--accent);
    margin-bottom: 0.5rem;
  }

  .hp-event-title {
    font-size: 16px;
    font-weight: 600;
    color: var(--text-primary);
    margin: 0 0 0.5rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    transition: color 0.2s;
  }

  .hp-event-card:hover .hp-event-title { color: var(--accent-light); }

  .hp-event-desc {
    font-size: 13px;
    color: var(--text-muted);
    font-weight: 300;
    line-height: 1.5;
    margin: 0 0 1rem;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .hp-event-meta {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 0.75rem;
    border-top: 1px solid var(--border);
    font-size: 12px;
    color: var(--text-dim);
  }

  .hp-event-meta-left {
    display: flex;
    align-items: center;
    gap: 5px;
  }

  .hp-price-badge {
    font-size: 12px;
    font-weight: 600;
    background: var(--accent-dim);
    color: var(--accent-light);
    padding: 3px 10px;
    border-radius: 20px;
  }

  /* ── CTA ── */
  .hp-cta {
    padding: clamp(6rem, 12vw, 11rem) clamp(1.5rem, 6vw, 6rem);
    text-align: center;
    position: relative;
    overflow: hidden;
  }

  .hp-cta-bg {
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse 60% 80% at 50% 50%, rgba(245,158,11,0.06) 0%, transparent 70%);
  }

  .hp-cta-border {
    max-width: 680px;
    margin: 0 auto;
    border: 1px solid var(--border);
    border-radius: 20px;
    padding: clamp(3rem, 6vw, 5rem) clamp(2rem, 5vw, 4rem);
    position: relative;
    z-index: 2;
    background: var(--bg-card);
  }

  .hp-cta h2 {
    font-family: 'Playfair Display', serif;
    font-size: clamp(2rem, 4vw, 3rem);
    font-weight: 700;
    margin: 0 0 1rem;
    line-height: 1.15;
  }

  .hp-cta p {
    color: var(--text-muted);
    font-size: 16px;
    font-weight: 300;
    margin: 0 0 2.5rem;
    line-height: 1.65;
  }

  /* Animations */
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }
`;

export function HomePage() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const data = await getEvents();
      if (mounted) setEvents(data);
    })();
    return () => { mounted = false; };
  }, []);

  const featuredEvents = events.slice(0, 3);

  return (
    <div className="hp-root">
      <style>{styles}</style>

      {/* ── Hero ── */}
      <section className="hp-hero">
        <div className="hp-hero-bg" />
        <div className="hp-hero-grid" />

        <div className="hp-hero-content">
          <div className="hp-eyebrow">
            <Zap size={11} />
            University Life, Reimagined
          </div>

          <h1>
            Your campus.<br />
            Your <em>community.</em>
          </h1>

          <p className="hp-hero-sub">
            Discover events, lead clubs, and connect with thousands of students
            who share your interests — all in one place.
          </p>

          <div className="hp-hero-actions">
            <Link to="/events" className="hp-btn-primary">
              Browse Events <ChevronRight size={16} />
            </Link>
            <Link to="/register" className="hp-btn-ghost">
              Join a Club
            </Link>
          </div>
        </div>

        <div className="hp-hero-stats">
          {[
            { value: '12K+', label: 'Active Students' },
            { value: '340',  label: 'Events this month' },
            { value: '80+',  label: 'Student Clubs' },
          ].map(s => (
            <div key={s.label}>
              <div className="hp-stat-value">{s.value}</div>
              <div className="hp-stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Features ── */}
      <section className="hp-features">
        <div className="hp-section-label">Why UniActs</div>
        <h2 className="hp-section-title">
          Everything your campus needs, in one platform.
        </h2>

        <div className="hp-features-layout">
          {[
            {
              icon: <Calendar size={20} />,
              title: 'Easy Event Discovery',
              desc: 'Find workshops, parties, and seminars near you. Filter by date, category, or club — and RSVP in seconds.',
            },
            {
              icon: <Users size={20} />,
              title: 'Club Management',
              desc: 'Run your student organization smoothly. Manage members, post announcements, and schedule events in one dashboard.',
            },
            {
              icon: <Star size={20} />,
              title: 'Engage & Lead',
              desc: 'Track your participation, earn certificates, and build a leadership portfolio that stands out.',
            },
          ].map(f => (
            <div key={f.title} className="hp-feature-card">
              <div className="hp-feature-icon">{f.icon}</div>
              <h3 className="hp-feature-title">{f.title}</h3>
              <p className="hp-feature-desc">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Events ── */}
      <section className="hp-events">
        <div className="hp-events-header">
          <div>
            <div className="hp-section-label">On the horizon</div>
            <h2 className="hp-section-title" style={{ margin: 0 }}>Upcoming Events</h2>
          </div>
          <Link to="/events" className="hp-link-arrow">
            View all <ArrowRight size={14} />
          </Link>
        </div>

        <div className="hp-events-grid">
          {featuredEvents.map(event => (
            <Link key={event.id} to={`/events/${event.id}`} className="hp-event-card">
              <img src={event.image} alt={event.title} className="hp-event-img" />
              <div className="hp-event-body">
                <div className="hp-event-category">{event.category}</div>
                <div className="hp-event-title">{event.title}</div>
                <p className="hp-event-desc">
                  {event.description || 'Join us for this amazing event!'}
                </p>
                <div className="hp-event-meta">
                  <div className="hp-event-meta-left">
                    <Calendar size={12} />
                    {event.date}
                  </div>
                  <span className="hp-price-badge">{event.price}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="hp-cta">
        <div className="hp-cta-bg" />
        <div className="hp-cta-border">
          <h2>Ready to get involved?</h2>
          <p>
            Create an account today to register for events, join clubs,
            and start building your university story.
          </p>
          <Link to="/register" className="hp-btn-primary" style={{ margin: '0 auto' }}>
            Get Started — it's free <ChevronRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
