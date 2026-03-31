import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getClub } from '../data/api';
import { ArrowLeft, Users, Calendar, DollarSign, CheckCircle, AlertCircle, Crown, Megaphone } from 'lucide-react';

const css = `
@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@700;800&family=DM+Sans:wght@300;400;500;600;700&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

.cdp {
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
.cdp::before {
  content: '';
  position: fixed;
  top: -160px; right: -160px;
  width: 600px; height: 600px;
  background: radial-gradient(circle, rgba(167,139,250,0.22) 0%, transparent 65%);
  pointer-events: none;
}
.cdp::after {
  content: '';
  position: fixed;
  bottom: -120px; left: -120px;
  width: 480px; height: 480px;
  background: radial-gradient(circle, rgba(124,58,237,0.1) 0%, transparent 65%);
  pointer-events: none;
}

/* BG watermark */
.cdp-bg-text {
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
.cdp-inner {
  position: relative; z-index: 2;
  width: 100%; max-width: 1100px;
  margin: 0 auto;
}

/* HEADER */
.cdp-header {
  display: flex; align-items: flex-start; justify-content: space-between;
  margin-bottom: 28px;
}

.cdp-back {
  display: inline-flex; align-items: center; gap: 8px;
  font-size: 14px; font-weight: 500; color: var(--muted);
  text-decoration: none; transition: color 0.2s;
}
.cdp-back:hover { color: var(--purple); }

.cdp-title-group h1 {
  font-family: 'Bricolage Grotesque', sans-serif;
  font-size: 2.4rem; font-weight: 800;
  color: var(--text); letter-spacing: -0.02em; margin-bottom: 8px;
}

.cdp-meta {
  display: flex; gap: 20px; font-size: 14px; color: var(--muted);
}
.cdp-meta span { display: flex; align-items: center; gap: 6px; }
.cdp-meta svg { color: var(--purple-light); }

/* GRID */
.cdp-grid {
  display: grid;
  grid-template-columns: 1fr 340px;
  gap: 28px;
}

/* MAIN CONTENT */
.cdp-main {
  background: var(--white);
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 4px 24px rgba(124,58,237,0.08);
}

.cdp-content { padding: 28px 32px; }

.cdp-section {
  margin-bottom: 28px;
}
.cdp-section:last-child { margin-bottom: 0; }

.cdp-section-title {
  font-family: 'Bricolage Grotesque', sans-serif;
  font-size: 1.2rem; font-weight: 700;
  color: var(--text); margin-bottom: 14px;
}

.cdp-desc {
  font-size: 14px; color: var(--muted); line-height: 1.7;
}

.cdp-empty {
  font-size: 14px; color: var(--muted); font-style: italic;
}

/* SIDEBAR */
.cdp-sidebar { display: flex; flex-direction: column; gap: 20px; }

.cdp-card {
  background: var(--white);
  border-radius: 20px;
  padding: 24px;
  box-shadow: 0 4px 24px rgba(124,58,237,0.08);
}

.cdp-card.sticky { position: sticky; top: 24px; }

/* JOIN BUTTON */
.cdp-join-btn {
  width: 100%; height: 52px;
  background: var(--purple); color: #fff;
  font-family: 'DM Sans', sans-serif; font-size: 15px; font-weight: 600;
  border: none; border-radius: 14px; cursor: pointer;
  display: flex; align-items: center; justify-content: center; gap: 8px;
  box-shadow: 0 8px 28px rgba(124,58,237,0.3);
  transition: all 0.2s; margin-bottom: 16px;
}
.cdp-join-btn:hover:not(:disabled) { background: var(--purple-mid); transform: translateY(-1px); }
.cdp-join-btn:disabled { opacity: 0.7; cursor: not-allowed; transform: none; }

/* STATUS MESSAGE */
.cdp-status {
  padding: 12px 14px; border-radius: 12px; margin-bottom: 16px;
  font-size: 13px; display: flex; align-items: center; gap: 8px;
}
.cdp-status.success { background: rgba(34,197,94,0.1); color: #16a34a; }
.cdp-status.already { background: rgba(59,130,246,0.1); color: #3b82f6; }
.cdp-status.error { background: rgba(220,38,38,0.1); color: #dc2626; }

/* DETAILS */
.cdp-details { border-top: 1px solid var(--border); padding-top: 16px; }

.cdp-detail-row {
  display: flex; justify-content: space-between; margin-bottom: 12px;
  font-size: 13px;
}
.cdp-detail-label { color: var(--muted); }
.cdp-detail-val { color: var(--text); font-weight: 600; }

/* NOT FOUND */
.cdp-notfound {
  text-align: center; padding: 80px 20px;
}
.cdp-notfound h2 {
  font-family: 'Bricolage Grotesque', sans-serif;
  font-size: 1.8rem; font-weight: 800; color: var(--text);
  margin-bottom: 10px;
}
.cdp-notfound p { font-size: 14px; color: var(--muted); margin-bottom: 24px; }
.cdp-notfound-btn {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 12px 24px; background: var(--purple); color: #fff;
  font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 500;
  border: none; border-radius: 12px; cursor: pointer; text-decoration: none;
}
.cdp-notfound-btn:hover { background: var(--purple-mid); }

/* LOADING */
.cdp-loading {
  display: flex; flex-direction: column; gap: 16px;
}
.cdp-skeleton {
  background: linear-gradient(90deg, var(--accent-soft) 25%, rgba(124,58,237,0.1) 50%, var(--accent-soft) 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  border-radius: 12px;
}
.cdp-skeleton-h1 { height: 40px; width: 60%; }
.cdp-skeleton-img { height: 200px; width: 100%; border-radius: 16px; }

@keyframes shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

@media (max-width: 900px) {
  .cdp-grid { grid-template-columns: 1fr; }
  .cdp-sidebar { order: -1; }
  .cdp-card.sticky { position: static; }
  .cdp-header { flex-direction: column; gap: 16px; }
}
`;

const API_BASE = "http://127.0.0.1:8000/api";

export function ClubDetailsPage() {
  const { id } = useParams();
  const [club, setClub] = useState(null);
  const [loading, setLoading] = useState(true);
  const [joinStatus, setJoinStatus] = useState(null);
  const [joinMessage, setJoinMessage] = useState('');

  const handleJoin = async () => {
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    if (!user) {
      setJoinStatus('login');
      setJoinMessage('You must be logged in to join a club.');
      return;
    }
    setJoinStatus('loading');
    try {
      const res = await fetch(`${API_BASE}/clubs/${id}/join/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: user.username }),
      });
      const data = await res.json();
      if (res.status === 201) {
        setJoinStatus('success');
        setJoinMessage('You have successfully joined the club!');
        setClub(prev => prev ? { ...prev, members_count: prev.members_count + 1 } : prev);
      } else if (res.status === 200) {
        setJoinStatus('already');
        setJoinMessage('You are already a member of this club.');
      } else {
        setJoinStatus('error');
        setJoinMessage(data.error || 'Failed to join club.');
      }
    } catch {
      setJoinStatus('error');
      setJoinMessage('Cannot connect to server.');
    }
  };

  useEffect(() => {
    async function loadClub() {
      try {
        const data = await getClub(id);
        setClub(data);
      } catch (error) {
        console.error("Failed to load club", error);
      } finally {
        setLoading(false);
      }
    }
    loadClub();
  }, [id]);

  if (loading) {
    return (
      <div className="cdp">
        <style>{css}</style>
        <div className="cdp-bg-text">CLUB</div>
        <div className="cdp-inner">
          <div className="cdp-loading">
            <div className="cdp-skeleton cdp-skeleton-h1"/>
            <div className="cdp-skeleton cdp-skeleton-img"/>
          </div>
        </div>
      </div>
    );
  }

  if (!club) {
    return (
      <div className="cdp">
        <style>{css}</style>
        <div className="cdp-bg-text">CLUB</div>
        <div className="cdp-inner">
          <div className="cdp-notfound">
            <h2>Club not found</h2>
            <p>The club you are looking for does not exist.</p>
            <Link to="/clubs" className="cdp-notfound-btn">
              <ArrowLeft size={16}/> Back to Clubs
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cdp">
      <style>{css}</style>
      <div className="cdp-bg-text">CLUB</div>

      <div className="cdp-inner">
        <Link to="/clubs" className="cdp-back">
          <ArrowLeft size={16}/> Back to Clubs
        </Link>

        <div className="cdp-header">
          <div className="cdp-title-group">
            <h1>{club.name}</h1>
            <div className="cdp-meta">
              <span><Users size={16}/> {club.members_count} Members</span>
              <span><Calendar size={16}/> Created {club.created_at}</span>
            </div>
          </div>
        </div>

        <div className="cdp-grid">
          {/* Main Content */}
          <div className="cdp-main">
            <div className="cdp-content">
              <div className="cdp-section">
                <h2 className="cdp-section-title">About</h2>
                <p className="cdp-desc">{club.description}</p>
              </div>

              <div className="cdp-section">
                <h2 className="cdp-section-title">Latest Announcements</h2>
                <p className="cdp-empty">No recent announcements.</p>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="cdp-sidebar">
            <div className="cdp-card sticky">
              <button 
                className="cdp-join-btn"
                onClick={handleJoin}
                disabled={joinStatus === 'loading' || joinStatus === 'success' || joinStatus === 'already'}
              >
                {joinStatus === 'loading' ? 'Joining…' :
                 joinStatus === 'success' ? 'Joined ✓' :
                 joinStatus === 'already' ? 'Already a Member' :
                 'Join Club'}
              </button>

              {joinStatus && (
                <div className={`cdp-status ${joinStatus}`}>
                  {joinStatus === 'success' ? <CheckCircle size={16}/> : 
                   joinStatus === 'already' ? <CheckCircle size={16}/> : 
                   <AlertCircle size={16}/>}
                  {joinMessage}
                  {joinStatus === 'login' && (
                    <Link to="/login" style={{textDecoration: 'underline', marginLeft: 4}}>Log in</Link>
                  )}
                </div>
              )}

              <div className="cdp-details">
                <div className="cdp-detail-row">
                  <span className="cdp-detail-label">President</span>
                  <span className="cdp-detail-val" style={{display: 'flex', alignItems: 'center', gap: 4}}>
                    <Crown size={14} style={{color: '#f59e0b'}}/> {club.president || 'N/A'}
                  </span>
                </div>
                <div className="cdp-detail-row">
                  <span className="cdp-detail-label">Budget</span>
                  <span className="cdp-detail-val">${club.budget?.toFixed(2) || '0.00'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
