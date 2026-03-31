import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, MapPin, Clock, Share2, Heart, ArrowLeft, User, Users, Sparkles } from 'lucide-react';
import { getEvents } from '@/data/mockEvents';

const css = `
@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@700;800&family=DM+Sans:wght@300;400;500;600;700&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

.edp {
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
  padding: 24px;
  position: relative;
  overflow: hidden;
}

/* Background orbs */
.edp::before {
  content: '';
  position: fixed;
  top: -160px; right: -160px;
  width: 600px; height: 600px;
  background: radial-gradient(circle, rgba(167,139,250,0.22) 0%, transparent 65%);
  pointer-events: none;
}
.edp::after {
  content: '';
  position: fixed;
  bottom: -120px; left: -120px;
  width: 480px; height: 480px;
  background: radial-gradient(circle, rgba(124,58,237,0.1) 0%, transparent 65%);
  pointer-events: none;
}

/* BG watermark */
.edp-bg-text {
  position: fixed;
  top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  font-family: 'Bricolage Grotesque', sans-serif;
  font-size: clamp(80px, 16vw, 180px); font-weight: 800;
  color: rgba(124,58,237,0.045);
  white-space: nowrap; pointer-events: none; user-select: none;
  letter-spacing: -0.02em; z-index: 0;
}

/* LAYOUT */
.edp-inner {
  position: relative; z-index: 2;
  width: 100%; max-width: 1100px;
  margin: 0 auto;
}

/* BACK LINK */
.edp-back {
  display: inline-flex; align-items: center; gap: 8px;
  font-size: 14px; font-weight: 500; color: var(--muted);
  text-decoration: none; margin-bottom: 24px; transition: color 0.2s;
}
.edp-back:hover { color: var(--purple); }

/* GRID */
.edp-grid {
  display: grid;
  grid-template-columns: 1fr 340px;
  gap: 28px;
}

/* MAIN CONTENT */
.edp-main {
  background: var(--white);
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 4px 24px rgba(124,58,237,0.08);
}

.edp-hero {
  position: relative;
  height: 360px;
}

.edp-hero-img {
  width: 100%; height: 100%; object-fit: cover;
}

.edp-hero-badge {
  position: absolute; top: 20px; left: 20px;
  background: var(--white);
  padding: 6px 14px; border-radius: 20px;
  font-size: 12px; font-weight: 600; color: var(--purple);
  display: flex; align-items: center; gap: 6px;
}

.edp-content { padding: 28px 32px; }

.edp-title {
  font-family: 'Bricolage Grotesque', sans-serif;
  font-size: 2rem; font-weight: 800;
  color: var(--text); letter-spacing: -0.02em; margin-bottom: 16px;
  line-height: 1.2;
}

.edp-meta {
  display: flex; flex-wrap: wrap; gap: 20px; margin-bottom: 24px;
}

.edp-meta-item {
  display: flex; align-items: center; gap: 8px;
  font-size: 14px; color: var(--muted);
}
.edp-meta-item svg { color: var(--purple-light); }

.edp-divider {
  height: 1px; background: var(--border); margin: 24px 0;
}

.edp-section-title {
  font-family: 'Bricolage Grotesque', sans-serif;
  font-size: 1.2rem; font-weight: 700;
  color: var(--text); margin-bottom: 14px;
}

.edp-desc {
  font-size: 14px; color: var(--muted); line-height: 1.7;
  white-space: pre-line;
}

.edp-expect-list {
  list-style: none; margin-top: 12px;
}
.edp-expect-list li {
  display: flex; align-items: flex-start; gap: 10px;
  font-size: 14px; color: var(--muted); margin-bottom: 10px;
}
.edp-expect-list li::before {
  content: '✓'; color: var(--purple); font-weight: 700;
  margin-top: 2px;
}

.edp-tags {
  display: flex; flex-wrap: wrap; gap: 8px; margin-top: 20px;
}

.edp-tag {
  background: var(--accent-soft);
  padding: 5px 12px; border-radius: 20px;
  font-size: 12px; font-weight: 500; color: var(--purple);
}

/* SIDEBAR */
.edp-sidebar { display: flex; flex-direction: column; gap: 20px; }

.edp-card {
  background: var(--white);
  border-radius: 20px;
  padding: 24px;
  box-shadow: 0 4px 24px rgba(124,58,237,0.08);
}

.edp-card.sticky { position: sticky; top: 24px; }

.edp-register-btn {
  width: 100%; height: 50px;
  background: var(--purple); color: #fff;
  font-family: 'DM Sans', sans-serif; font-size: 15px; font-weight: 600;
  border: none; border-radius: 14px; cursor: pointer;
  display: flex; align-items: center; justify-content: center; gap: 8px;
  box-shadow: 0 8px 28px rgba(124,58,237,0.3);
  transition: all 0.2s; margin-bottom: 12px;
}
.edp-register-btn:hover { background: var(--purple-mid); transform: translateY(-1px); }

.edp-save-btn {
  width: 100%; height: 46px;
  background: var(--white); border: 1px solid var(--border);
  font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 500;
  color: var(--text); border-radius: 12px; cursor: pointer;
  display: flex; align-items: center; justify-content: center; gap: 8px;
  transition: all 0.2s; margin-bottom: 20px;
}
.edp-save-btn:hover { border-color: var(--purple); color: var(--purple); }

.edp-stats { border-top: 1px solid var(--border); padding-top: 16px; }

.edp-stat-row {
  display: flex; justify-content: space-between; margin-bottom: 10px;
  font-size: 13px;
}
.edp-stat-label { color: var(--muted); }
.edp-stat-val { color: var(--text); font-weight: 600; }

.edp-progress {
  height: 6px; background: var(--accent-soft); border-radius: 10px; overflow: hidden;
}
.edp-progress-bar {
  height: 100%; background: var(--purple); border-radius: 10px;
  transition: width 0.3s;
}

.edp-spots {
  font-size: 12px; color: var(--muted); text-align: center; margin-top: 8px;
}

.edp-share {
  display: flex; align-items: center; justify-content: center; gap: 8px;
  font-size: 13px; color: var(--muted); cursor: pointer;
  background: none; border: none; margin-top: 16px;
  transition: color 0.2s;
}
.edp-share:hover { color: var(--purple); }

/* ORGANIZER CARD */
.edp-org-header {
  font-family: 'Bricolage Grotesque', sans-serif;
  font-size: 1rem; font-weight: 700;
  color: var(--text); margin-bottom: 16px;
}

.edp-org-row {
  display: flex; align-items: center; gap: 14px;
}

.edp-org-avatar {
  width: 48px; height: 48px;
  background: linear-gradient(145deg, var(--purple) 0%, #4c1d95 100%);
  border-radius: 14px;
  display: flex; align-items: center; justify-content: center;
  color: #fff;
}

.edp-org-info { flex: 1; }
.edp-org-name { font-size: 14px; font-weight: 600; color: var(--text); }
.edp-org-verified { font-size: 11px; color: var(--muted); }

.edp-view-club {
  display: block;
  width: 100%; margin-top: 16px;
  padding: 10px;
  background: var(--accent-soft);
  border: none; border-radius: 10px;
  font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 500;
  color: var(--purple); cursor: pointer; text-align: center;
  text-decoration: none; transition: background 0.2s;
}
.edp-view-club:hover { background: rgba(124,58,237,0.15); }

/* NOT FOUND */
.edp-notfound {
  text-align: center; padding: 80px 20px;
}
.edp-notfound h1 {
  font-family: 'Bricolage Grotesque', sans-serif;
  font-size: 1.8rem; font-weight: 800; color: var(--text);
  margin-bottom: 10px;
}
.edp-notfound p { font-size: 14px; color: var(--muted); margin-bottom: 24px; }
.edp-notfound-btn {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 12px 24px; background: var(--purple); color: #fff;
  font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 500;
  border: none; border-radius: 12px; cursor: pointer; text-decoration: none;
  transition: background 0.2s;
}
.edp-notfound-btn:hover { background: var(--purple-mid); }

@media (max-width: 900px) {
  .edp-grid { grid-template-columns: 1fr; }
  .edp-sidebar { order: -1; }
  .edp-card.sticky { position: static; }
  .edp-hero { height: 260px; }
}
`;

export function EventDetailsPage() {
  const { id } = useParams();
  const [events, setEvents] = useState([]);
  const event = events.find(e => e.id == id);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const data = await getEvents();
      if (mounted) setEvents(data);
    })();
    return () => { mounted = false; };
  }, []);

  if (!event) {
    return (
      <div className="edp">
        <style>{css}</style>
        <div className="edp-bg-text">EVENT</div>
        <div className="edp-inner">
          <div className="edp-notfound">
            <h1>Event not found</h1>
            <p>The event you are looking for does not exist.</p>
            <Link to="/events" className="edp-notfound-btn">
              <ArrowLeft size={16}/> Back to Events
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="edp">
      <style>{css}</style>
      <div className="edp-bg-text">EVENT</div>

      <div className="edp-inner">
        <Link to="/events" className="edp-back">
          <ArrowLeft size={16}/> Back to Events
        </Link>

        <div className="edp-grid">
          {/* Main Content */}
          <div className="edp-main">
            <div className="edp-hero">
              <img src={event.image} alt={event.title} className="edp-hero-img" />
              <span className="edp-hero-badge">
                <Sparkles size={12}/> {event.category}
              </span>
            </div>
            <div className="edp-content">
              <h1 className="edp-title">{event.title}</h1>
              <div className="edp-meta">
                <div className="edp-meta-item">
                  <Calendar size={16}/> {event.date}
                </div>
                <div className="edp-meta-item">
                  <Clock size={16}/> {event.time}
                </div>
                <div className="edp-meta-item">
                  <MapPin size={16}/> {event.location}
                </div>
              </div>

              <div className="edp-divider"/>

              <h2 className="edp-section-title">About this Event</h2>
              <p className="edp-desc">{event.description}</p>

              <h2 className="edp-section-title" style={{marginTop: 24}}>What to Expect</h2>
              <ul className="edp-expect-list">
                <li>Keynote speeches from industry veterans</li>
                <li>Hands-on workshops</li>
                <li>Networking sessions with refreshments</li>
                <li>Exclusive swag for early registrants</li>
              </ul>

              <div className="edp-tags">
                {event.tags?.map(tag => (
                  <span key={tag} className="edp-tag">#{tag}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="edp-sidebar">
            <div className="edp-card sticky">
              <button className="edp-register-btn">
                Register Now
              </button>
              <button className="edp-save-btn">
                <Heart size={16}/> Save for Later
              </button>

              <div className="edp-stats">
                <div className="edp-stat-row">
                  <span className="edp-stat-label">Organizer</span>
                  <span className="edp-stat-val">{event.organizer}</span>
                </div>
                <div className="edp-stat-row">
                  <span className="edp-stat-label">Attendees</span>
                  <span className="edp-stat-val">{event.attendees} / {event.capacity}</span>
                </div>
                <div className="edp-progress">
                  <div 
                    className="edp-progress-bar" 
                    style={{ width: `${(event.attendees / event.capacity) * 100}%` }}
                  />
                </div>
                <p className="edp-spots">{event.capacity - event.attendees} spots remaining</p>
              </div>

              <button className="edp-share">
                <Share2 size={14}/> Share Event
              </button>
            </div>

            <div className="edp-card">
              <h3 className="edp-org-header">Organizer</h3>
              <div className="edp-org-row">
                <div className="edp-org-avatar">
                  <User size={22}/>
                </div>
                <div className="edp-org-info">
                  <div className="edp-org-name">{event.organizer}</div>
                  <div className="edp-org-verified">✓ Verified Club</div>
                </div>
              </div>
              <button className="edp-view-club">View Club Profile</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
