import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Zap, Search, Calendar, MapPin, Users, ArrowRight, Filter, SlidersHorizontal } from 'lucide-react';
import { getEvents } from '@/data/mockEvents';

const css = `
@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@700;800&family=DM+Sans:wght@300;400;500;600&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

.ep {
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
.ep::before {
  content: '';
  position: fixed;
  top: -160px; right: -160px;
  width: 600px; height: 600px;
  background: radial-gradient(circle, rgba(167,139,250,0.22) 0%, transparent 65%);
  pointer-events: none;
}
.ep::after {
  content: '';
  position: fixed;
  bottom: -120px; left: -120px;
  width: 480px; height: 480px;
  background: radial-gradient(circle, rgba(124,58,237,0.1) 0%, transparent 65%);
  pointer-events: none;
}

/* BG watermark */
.ep-bg-text {
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
.ep-inner {
  position: relative; z-index: 2;
  width: 100%; max-width: 1200px;
  margin: 0 auto;
}

/* HEADER */
.ep-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 32px;
}

.ep-title-group h1 {
  font-family: 'Bricolage Grotesque', sans-serif;
  font-size: 2.2rem; font-weight: 800;
  color: var(--text); letter-spacing: -0.02em; margin-bottom: 6px;
}
.ep-title-group p {
  font-size: 15px; color: var(--muted); font-weight: 300;
}

/* SEARCH BAR */
.ep-search {
  display: flex; gap: 12px;
  margin-bottom: 28px;
}

.ep-search-input-wrap {
  flex: 1; position: relative; max-width: 420px;
}

.ep-search-icon {
  position: absolute; left: 16px; top: 50%; transform: translateY(-50%);
  color: var(--muted); pointer-events: none;
}

.ep-search-input {
  width: 100%;
  height: 50px;
  padding: 0 16px 0 46px;
  background: var(--white);
  border: 1px solid var(--border);
  border-radius: 14px;
  font-family: 'DM Sans', sans-serif;
  font-size: 14px; font-weight: 400; color: var(--text);
  outline: none; transition: border-color 0.2s, box-shadow 0.2s;
}
.ep-search-input::placeholder { color: var(--muted); font-weight: 300; }
.ep-search-input:focus { border-color: var(--border-focus); box-shadow: 0 0 0 3px rgba(124,58,237,0.1); }

.ep-filter-btn {
  height: 50px; padding: 0 20px;
  background: var(--white); border: 1px solid var(--border); border-radius: 14px;
  font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 500;
  color: var(--text); cursor: pointer; display: flex; align-items: center; gap: 8px;
  transition: all 0.2s;
}
.ep-filter-btn:hover { border-color: var(--purple); color: var(--purple); }

/* GRID */
.ep-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 20px;
}

/* EVENT CARD */
.ep-card {
  background: var(--white);
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 4px 24px rgba(124,58,237,0.08);
  transition: all 0.3s;
  display: flex; flex-direction: column;
}
.ep-card:hover { transform: translateY(-4px); box-shadow: 0 12px 40px rgba(124,58,237,0.15); }

.ep-card-img {
  height: 180px; width: 100%; object-fit: cover;
}

.ep-card-badge {
  position: absolute; top: 14px; left: 14px;
  background: rgba(255,255,255,0.92);
  padding: 5px 12px; border-radius: 20px;
  font-size: 11px; font-weight: 600; color: var(--purple);
  letter-spacing: 0.02em;
}

.ep-card-body { padding: 20px; flex: 1; display: flex; flex-direction: column; }

.ep-card-meta {
  display: flex; align-items: center; gap: 6px;
  font-size: 12px; color: var(--muted); margin-bottom: 10px;
}
.ep-card-meta svg { color: var(--purple-light); }

.ep-card-title {
  font-family: 'Bricolage Grotesque', sans-serif;
  font-size: 1.25rem; font-weight: 700;
  color: var(--text); line-height: 1.3; margin-bottom: 8px;
}

.ep-card-loc {
  display: flex; align-items: center; gap: 6px;
  font-size: 13px; color: var(--muted); margin-bottom: 16px;
}

.ep-card-footer {
  margin-top: auto; padding-top: 14px; border-top: 1px solid var(--border);
  display: flex; justify-content: space-between; align-items: center;
}

.ep-card-org { font-size: 12px; color: var(--muted); }
.ep-card-org span { color: var(--text); font-weight: 500; }

.ep-card-link {
  font-size: 13px; font-weight: 600; color: var(--purple);
  text-decoration: none; display: flex; align-items: center; gap: 4px;
  transition: gap 0.2s;
}
.ep-card-link:hover { gap: 8px; }

/* EMPTY STATE */
.ep-empty {
  text-align: center; padding: 60px 20px;
}
.ep-empty-icon {
  width: 72px; height: 72px; margin: 0 auto 20px;
  background: var(--accent-soft); border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  color: var(--purple);
}
.ep-empty h3 { font-family: 'Bricolage Grotesque', sans-serif; font-size: 1.3rem; font-weight: 700; color: var(--text); margin-bottom: 6px; }
.ep-empty p { font-size: 14px; color: var(--muted); margin-bottom: 16px; }
.ep-empty-btn {
  background: var(--purple); color: #fff;
  font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 500;
  border: none; border-radius: 10px; padding: 10px 20px; cursor: pointer;
  transition: background 0.2s;
}
.ep-empty-btn:hover { background: var(--purple-mid); }

@media (max-width: 768px) {
  .ep-header { flex-direction: column; align-items: flex-start; gap: 20px; }
  .ep-search { flex-direction: column; }
  .ep-search-input-wrap { max-width: 100%; }
}
`;

export function EventsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [events, setEvents] = useState([]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const data = await getEvents();
      if (mounted) setEvents(data);
    })();
    return () => { mounted = false; };
  }, []);

  const filteredEvents = events.filter(event => 
    event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="ep">
      <style>{css}</style>
      <div className="ep-bg-text">EVENTS</div>

      <div className="ep-inner">
        <header className="ep-header">
          <div className="ep-title-group">
            <h1>Browse Events</h1>
            <p>Discover what's happening around campus</p>
          </div>
        </header>

        <div className="ep-search">
          <div className="ep-search-input-wrap">
            <span className="ep-search-icon"><Search size={18}/></span>
            <input
              className="ep-search-input"
              type="text"
              placeholder="Search events by name or category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="ep-filter-btn">
            <Filter size={16}/> Filter
          </button>
          <button className="ep-filter-btn">
            <SlidersHorizontal size={16}/> Sort
          </button>
        </div>

        {filteredEvents.length > 0 ? (
          <div className="ep-grid">
            {filteredEvents.map((event) => (
              <div key={event.id} className="ep-card">
                <div className="relative">
                  <img 
                    src={event.image} 
                    alt={event.title} 
                    className="ep-card-img"
                  />
                  <span className="ep-card-badge">{event.category}</span>
                </div>
                <div className="ep-card-body">
                  <div className="ep-card-meta">
                    <Calendar size={14}/>
                    <span>{event.date} • {event.time}</span>
                  </div>
                  <h3 className="ep-card-title">{event.title}</h3>
                  <div className="ep-card-loc">
                    <MapPin size={14}/>
                    <span>{event.location}</span>
                  </div>
                  <div className="ep-card-footer">
                    <span className="ep-card-org">By <span>{event.organizer}</span></span>
                    <Link to={`/events/${event.id}`} className="ep-card-link">
                      Details <ArrowRight size={14}/>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="ep-empty">
            <div className="ep-empty-icon">
              <Search size={32}/>
            </div>
            <h3>No events found</h3>
            <p>Try adjusting your search or filters.</p>
            <button className="ep-empty-btn" onClick={() => setSearchTerm('')}>Clear all filters</button>
          </div>
        )}
      </div>
    </div>
  );
}
