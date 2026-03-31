import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Zap, Search, Users, ArrowRight, Crown } from 'lucide-react';
import { getClubs } from '../data/api';

const css = `
@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@700;800&family=DM+Sans:wght@300;400;500;600&display=swap');

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
  padding: 24px;
  position: relative;
  overflow: hidden;
}

/* Background orbs */
.cp::before {
  content: '';
  position: fixed;
  top: -160px; right: -160px;
  width: 600px; height: 600px;
  background: radial-gradient(circle, rgba(167,139,250,0.22) 0%, transparent 65%);
  pointer-events: none;
}
.cp::after {
  content: '';
  position: fixed;
  bottom: -120px; left: -120px;
  width: 480px; height: 480px;
  background: radial-gradient(circle, rgba(124,58,237,0.1) 0%, transparent 65%);
  pointer-events: none;
}

/* BG watermark */
.cp-bg-text {
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
.cp-inner {
  position: relative; z-index: 2;
  width: 100%; max-width: 1200px;
  margin: 0 auto;
}

/* HEADER */
.cp-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 32px;
}

.cp-title-group h1 {
  font-family: 'Bricolage Grotesque', sans-serif;
  font-size: 2.2rem; font-weight: 800;
  color: var(--text); letter-spacing: -0.02em; margin-bottom: 6px;
}
.cp-title-group p {
  font-size: 15px; color: var(--muted); font-weight: 300;
}

/* SEARCH BAR */
.cp-search {
  display: flex; gap: 12px;
  margin-bottom: 28px;
}

.cp-search-input-wrap {
  flex: 1; position: relative; max-width: 420px;
}

.cp-search-icon {
  position: absolute; left: 16px; top: 50%; transform: translateY(-50%);
  color: var(--muted); pointer-events: none;
}

.cp-search-input {
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
.cp-search-input::placeholder { color: var(--muted); font-weight: 300; }
.cp-search-input:focus { border-color: var(--border-focus); box-shadow: 0 0 0 3px rgba(124,58,237,0.1); }

/* GRID */
.cp-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 20px;
}

/* CLUB CARD */
.cp-card {
  background: var(--white);
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 4px 24px rgba(124,58,237,0.08);
  transition: all 0.3s;
  display: flex; flex-direction: column;
}
.cp-card:hover { transform: translateY(-4px); box-shadow: 0 12px 40px rgba(124,58,237,0.15); }

.cp-card-img {
  height: 140px; width: 100%; background: linear-gradient(145deg, var(--purple) 0%, #4c1d95 100%);
  display: flex; align-items: center; justify-content: center;
  position: relative;
}

.cp-card-img::before {
  content: '';
  position: absolute; top: -40px; right: -40px;
  width: 160px; height: 160px; border-radius: 50%;
  background: rgba(255,255,255,0.06); pointer-events: none;
}

.cp-card-logo {
  width: 70px; height: 70px; border-radius: 16px;
  background: var(--white); object-fit: cover;
  box-shadow: 0 4px 16px rgba(0,0,0,0.15);
}

.cp-card-body { padding: 20px; flex: 1; display: flex; flex-direction: column; }

.cp-card-header {
  display: flex; justify-content: space-between; align-items: flex-start;
  margin-bottom: 8px;
}

.cp-card-title {
  font-family: 'Bricolage Grotesque', sans-serif;
  font-size: 1.25rem; font-weight: 700;
  color: var(--text); line-height: 1.3;
}

.cp-card-badge {
  background: var(--accent-soft);
  padding: 4px 10px; border-radius: 20px;
  font-size: 11px; font-weight: 600; color: var(--purple);
}

.cp-card-desc {
  font-size: 13px; color: var(--muted); line-height: 1.5;
  margin-bottom: 16px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.cp-card-pres {
  display: flex; align-items: center; gap: 8px;
  font-size: 12px; color: var(--muted); margin-bottom: 16px;
}
.cp-card-pres svg { color: var(--purple-light); }

.cp-card-link {
  margin-top: auto;
  display: flex; align-items: center; justify-content: center;
  gap: 8px;
  width: 100%; height: 44px;
  background: var(--purple); color: #fff;
  font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 500;
  border: none; border-radius: 12px; cursor: pointer;
  text-decoration: none;
  transition: all 0.2s;
}
.cp-card-link:hover { background: var(--purple-mid); }

/* EMPTY STATE */
.cp-empty {
  text-align: center; padding: 60px 20px;
}
.cp-empty-icon {
  width: 72px; height: 72px; margin: 0 auto 20px;
  background: var(--accent-soft); border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  color: var(--purple);
}
.cp-empty h3 { font-family: 'Bricolage Grotesque', sans-serif; font-size: 1.3rem; font-weight: 700; color: var(--text); margin-bottom: 6px; }
.cp-empty p { font-size: 14px; color: var(--muted); }

/* LOADING */
.cp-loading {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 20px;
}
.cp-skeleton {
  background: var(--white);
  border-radius: 20px;
  height: 320px;
  animation: pulse 1.5s ease-in-out infinite;
}
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

@media (max-width: 768px) {
  .cp-header { flex-direction: column; align-items: flex-start; gap: 20px; }
  .cp-search { flex-direction: column; }
  .cp-search-input-wrap { max-width: 100%; }
}
`;

export function ClubsPage() {
  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    async function loadClubs() {
      try {
        const data = await getClubs();
        setClubs(data);
      } catch (error) {
        console.error("Failed to load clubs", error);
      } finally {
        setLoading(false);
      }
    }
    loadClubs();
  }, []);

  const filteredClubs = clubs.filter(club => 
    club.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    club.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="cp">
      <style>{css}</style>
      <div className="cp-bg-text">CLUBS</div>

      <div className="cp-inner">
        <header className="cp-header">
          <div className="cp-title-group">
            <h1>Student Clubs</h1>
            <p>Find and join clubs that match your interests</p>
          </div>
        </header>

        <div className="cp-search">
          <div className="cp-search-input-wrap">
            <span className="cp-search-icon"><Search size={18}/></span>
            <input
              className="cp-search-input"
              type="text"
              placeholder="Search clubs by name or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {loading ? (
          <div className="cp-loading">
            {[1, 2, 3].map((i) => (
              <div key={i} className="cp-skeleton" />
            ))}
          </div>
        ) : filteredClubs.length > 0 ? (
          <div className="cp-grid">
            {filteredClubs.map((club) => (
              <div key={club.id} className="cp-card">
                <div className="cp-card-img">
                  {club.logo ? (
                    <img src={club.logo} alt={`${club.name} logo`} className="cp-card-logo" />
                  ) : (
                    <span style={{color: 'rgba(255,255,255,0.6)', fontSize: '2rem', fontWeight: 700}}>
                      {club.name?.charAt(0)}
                    </span>
                  )}
                </div>
                <div className="cp-card-body">
                  <div className="cp-card-header">
                    <h3 className="cp-card-title">{club.name}</h3>
                    <span className="cp-card-badge">
                      <Users size={12} style={{marginRight: 4}}/>
                      {club.members_count} Members
                    </span>
                  </div>
                  <p className="cp-card-desc">{club.description}</p>
                  <div className="cp-card-pres">
                    <Crown size={14}/>
                    <span>President: <strong>{club.president || 'N/A'}</strong></span>
                  </div>
                  <Link to={`/clubs/${club.id}`} className="cp-card-link">
                    View Details <ArrowRight size={16}/>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="cp-empty">
            <div className="cp-empty-icon">
              <Search size={32}/>
            </div>
            <h3>No clubs found</h3>
            <p>Try adjusting your search.</p>
          </div>
        )}
      </div>
    </div>
  );
}
