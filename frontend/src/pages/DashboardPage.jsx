import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Plus, 
  Settings,
  Calendar,
  Users,
  MapPin,
  ArrowRight
} from 'lucide-react';

const css = `
@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@400;500;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

.dp {
  --bg: #f8f7f4;
  --purple: #7c3aed;
  --purple-light: #a78bfa;
  --purple-mid: #6d28d9;
  --accent-soft: rgba(124,58,237,0.1);
  --white: #ffffff;
  --text: #1a0a3c;
  --muted: #6b7280;
  --border: #e5e5e5;
  font-family: 'DM Sans', sans-serif;
  background: var(--bg);
  color: var(--text);
  min-height: 100vh;
}

/* NAVBAR */
.dp-navbar {
  position: sticky; top: 0; z-index: 50;
  background: rgba(255,255,255,0.95); backdrop-filter: blur(20px);
  border-bottom: 1px solid var(--border);
  padding: 16px 48px;
  display: flex; align-items: center; justify-content: space-between;
}
.dp-logo { font-family:'Bricolage Grotesque',sans-serif; font-weight:800; font-size:22px; color:var(--text); text-decoration:none; display:flex; align-items:center; gap:8px; }
.dp-logo-dot { width:9px; height:9px; border-radius:50%; background:var(--purple); }

.dp-nav-links { display:flex; gap:32px; }
.dp-nav-link { font-size:15px; font-weight:500; color:var(--muted); text-decoration:none; transition:color 0.2s; }
.dp-nav-link:hover { color: var(--purple); }
.dp-nav-link.active { color: var(--purple); }

.dp-nav-actions { display:flex; gap:12px; align-items:center; }
.dp-btn { display:inline-flex; align-items:center; gap:7px; font-size:14px; font-weight:500; padding:10px 20px; border-radius:50px; text-decoration:none; cursor:pointer; transition:all 0.2s; }
.dp-btn-outline { background:transparent; color:var(--text); border:1px solid var(--border); }
.dp-btn-outline:hover { border-color:var(--purple); color:var(--purple); }
.dp-btn-purple { background:var(--purple); color:#fff; border:none; }
.dp-btn-purple:hover { background:var(--purple-mid); }
.dp-user-avatar { width:36px; height:36px; border-radius:50%; background:var(--purple-light); color:#fff; display:flex; align-items:center; justify-content:center; font-weight:600; font-size:14px; }

/* HERO */
.dp-hero {
  padding: 80px 48px;
  text-align: center;
  background: linear-gradient(180deg, #f8f7f4 0%, #efeef8 100%);
}
.dp-hero-content { max-width:720px; margin: 0 auto; }
.dp-hero h1 { font-family:'Bricolage Grotesque',sans-serif; font-size:52px; font-weight:800; line-height:1.1; margin-bottom:20px; }
.dp-hero h1 span { color:var(--purple); }
.dp-hero p { font-size:18px; color:var(--muted); margin-bottom:36px; line-height:1.6; }
.dp-hero-buttons { display:flex; gap:16px; justify-content:center; }
.dp-hero .dp-btn { padding:14px 28px; font-size:15px; }
.dp-hero .dp-btn-outline { background:var(--white); }

/* SECTIONS */
.dp-section { padding: 64px 48px; }
.dp-section-header { display:flex; align-items:center; justify-content:space-between; margin-bottom:32px; }
.dp-section-title { font-family:'Bricolage Grotesque',sans-serif; font-size:28px; font-weight:700; }
.dp-section-link { display:flex; align-items:center; gap:6px; font-size:14px; font-weight:500; color:var(--purple); text-decoration:none; }
.dp-section-link:hover { gap:10px; }

/* CARDS GRID */
.dp-cards { display:grid; grid-template-columns:repeat(auto-fill, minmax(320px, 1fr)); gap:24px; }

.dp-card {
  background:var(--white); border-radius:20px; padding:28px;
  border: 1px solid var(--border);
  text-decoration:none; color:inherit;
  transition:all 0.25s; display:block;
}
.dp-card:hover { border-color:var(--purple-light); transform:translateY(-4px); box-shadow:0 12px 32px rgba(124,58,237,0.12); }

.dp-card-icon { width:48px; height:48px; border-radius:14px; background:var(--accent-soft); color:var(--purple); display:flex; align-items:center; justify-content:center; margin-bottom:20px; }
.dp-card h3 { font-family:'Bricolage Grotesque',sans-serif; font-size:18px; font-weight:700; margin-bottom:8px; }
.dp-card p { font-size:14px; color:var(--muted); line-height:1.5; }
.dp-card-meta { display:flex; gap:16px; margin-top:20px; padding-top:16px; border-top:1px solid var(--border); font-size:13px; color:var(--muted); }
.dp-card-meta span { display:flex; align-items:center; gap:6px; }

/* EMPTY STATE */
.dp-empty { text-align:center; padding:64px 24px; color:var(--muted); font-size:15px; }

/* LOADING */
.dp-loading { text-align:center; padding:48px; color:var(--muted); }

/* FOOTER */
.dp-footer {
  padding: 32px 48px;
  border-top: 1px solid var(--border);
  text-align:center;
  font-size:14px; color:var(--muted);
}
`;

const API_BASE = "http://127.0.0.1:8000/api";

export function DashboardPage() {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('user') || 'null');
    } catch {
      return null;
    }
  });
  
  const [events, setEvents] = useState([]);
  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      fetch(`${API_BASE}/events/`).then(r => r.json()).catch(() => []),
      fetch(`${API_BASE}/clubs/`).then(r => r.json()).catch(() => []),
    ])
      .then(([eventsData, clubsData]) => {
        const safe = (d) => Array.isArray(d) ? d : [];
        setEvents(safe(eventsData).slice(0, 6));
        setClubs(safe(clubsData).slice(0, 6));
      })
      .finally(() => setLoading(false));
  }, []);

  const role = user?.role || 'student';
  const isAdmin = role === 'admin';
  const isProfessor = role === 'professor';
  const isClubPresident = role === 'club_president';

  const getWelcomeMessage = () => {
    if (isAdmin) return 'Manage system settings and view analytics for all activities.';
    if (isProfessor) return `Welcome back, ${user?.first_name || user?.username || 'Professor'}. Manage your room reservations and faculty activities.`;
    if (isClubPresident) return `Welcome back, ${user?.first_name || user?.username || 'President'}. Manage your clubs and organize events.`;
    return `Welcome back, ${user?.first_name || user?.username || 'Student'}. Discover events and connect with campus clubs.`;
  };

  return (
    <div className="dp">
      <style>{css}</style>
      
      {/* NAVBAR */}
      <nav className="dp-navbar">
        <Link to="/" className="dp-logo">
          <span className="dp-logo-dot"/> UniActs
        </Link>
        
        <div className="dp-nav-links">
          <Link to="/" className="dp-nav-link active">Home</Link>
          <Link to="/events" className="dp-nav-link">Events</Link>
          <Link to="/clubs" className="dp-nav-link">Clubs</Link>
        </div>
        
        <div className="dp-nav-actions">
          <Link to="/settings" className="dp-btn dp-btn-outline">
            <Settings size={16}/> Settings
          </Link>
          {(isClubPresident || isAdmin) && (
            <Link to="/create-event" className="dp-btn dp-btn-purple">
              <Plus size={16}/> New Event
            </Link>
          )}
          {user && (
            <div className="dp-user-avatar">
              {(user.first_name || user.username)?.[0]?.toUpperCase()}
            </div>
          )}
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="dp-hero">
        <div className="dp-hero-content">
          <h1>Welcome to <span>UniActs</span></h1>
          <p>{getWelcomeMessage()}</p>
          <div className="dp-hero-buttons">
            <Link to="/events" className="dp-btn dp-btn-purple">
              <Calendar size={16}/> Browse Events
            </Link>
            <Link to="/clubs" className="dp-btn dp-btn-outline">
              <Users size={16}/> Explore Clubs
            </Link>
          </div>
        </div>
      </section>

      {/* EVENTS LIST SECTION */}
      <section className="dp-section">
        <div className="dp-section-header">
          <h2 className="dp-section-title">Upcoming Events</h2>
          <Link to="/events" className="dp-section-link">
            View all <ArrowRight size={16}/>
          </Link>
        </div>
        
        {loading ? (
          <div className="dp-loading">Loading events...</div>
        ) : events.length === 0 ? (
          <div className="dp-empty">No upcoming events found</div>
        ) : (
          <div className="dp-cards">
            {events.map(ev => (
              <Link to={`/events/${ev.id}`} key={ev.id} className="dp-card">
                <div className="dp-card-icon"><Calendar size={22}/></div>
                <h3>{ev.title}</h3>
                <p>{ev.description?.substring(0, 100)}...</p>
                <div className="dp-card-meta">
                  <span><Calendar size={14}/> {ev.date}</span>
                  <span><MapPin size={14}/> {ev.location || 'TBA'}</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* CLUBS LIST SECTION */}
      <section className="dp-section">
        <div className="dp-section-header">
          <h2 className="dp-section-title">Featured Clubs</h2>
          <Link to="/clubs" className="dp-section-link">
            View all <ArrowRight size={16}/>
          </Link>
        </div>
        
        {loading ? (
          <div className="dp-loading">Loading clubs...</div>
        ) : clubs.length === 0 ? (
          <div className="dp-empty">No clubs found</div>
        ) : (
          <div className="dp-cards">
            {clubs.map(club => (
              <Link to={`/clubs/${club.id}`} key={club.id} className="dp-card">
                <div className="dp-card-icon"><Users size={22}/></div>
                <h3>{club.name}</h3>
                <p>{club.description?.substring(0, 100)}...</p>
                <div className="dp-card-meta">
                  <span><Users size={14}/> {club.members_count || 0} members</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* FOOTER */}
      <footer className="dp-footer">
        <p>© 2024 UniActs. All rights reserved.</p>
      </footer>
    </div>
  );
}