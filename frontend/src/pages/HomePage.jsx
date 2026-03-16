import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Users, ArrowRight, Star, Zap, ChevronRight, Play, TrendingUp, Clock } from 'lucide-react';
import { getEvents } from '@/data/mockEvents';
import { HomeNavigation } from '@/components/HomeNavigation';

const css = `
@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@400;500;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

.hp {
  --bg: #f0eefa;
  --purple: #7c3aed;
  --purple-light: #a78bfa;
  --purple-mid: #6d28d9;
  --accent-soft: rgba(124,58,237,0.1);
  --white: #ffffff;
  --text: #1a0a3c;
  --muted: #6b7280;
  font-family: 'DM Sans', sans-serif;
  background: var(--bg);
  color: var(--text);
  overflow-x: hidden;
  min-height: 100vh;
}

.hp::before {
  content: '';
  position: fixed;
  top: -200px; right: -200px;
  width: 700px; height: 700px;
  background: radial-gradient(circle, rgba(167,139,250,0.22) 0%, transparent 65%);
  pointer-events: none; z-index: 0;
}

/* NAV */
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

/* HERO */
.hp-hero { min-height:100vh; display:flex; align-items:center; padding:100px 48px 60px; position:relative; overflow:hidden; gap:40px; }
.hp-hero-left { flex:1; position:relative; z-index:2; max-width:560px; }
.hp-hero-right { flex:1; position:relative; z-index:2; display:flex; justify-content:center; align-items:center; }

.hp-bg-text { position:absolute; top:50%; left:50%; transform:translate(-50%,-54%); font-family:'Bricolage Grotesque',sans-serif; font-size:clamp(80px,14vw,160px); font-weight:800; color:rgba(124,58,237,0.055); white-space:nowrap; pointer-events:none; user-select:none; letter-spacing:-0.02em; z-index:0; }

.hp-eyebrow { display:inline-flex; align-items:center; gap:8px; background:rgba(124,58,237,0.08); border:1px solid rgba(124,58,237,0.15); border-radius:50px; padding:6px 14px; font-size:12px; font-weight:500; color:var(--purple); margin-bottom:24px; animation:fadeUp 0.5s ease both; }

.hp-hero-title { font-family:'Bricolage Grotesque',sans-serif; font-size:clamp(2.4rem,5vw,4rem); font-weight:800; line-height:1.1; letter-spacing:-0.03em; margin-bottom:20px; color:var(--text); animation:fadeUp 0.5s 0.1s ease both; }
.hp-hero-title .pill-word { display:inline-flex; align-items:center; gap:8px; background:var(--purple); color:#fff; border-radius:50px; padding:2px 18px 2px 6px; font-size:0.9em; vertical-align:middle; }
.hp-hero-title .pill-icon { width:30px; height:30px; border-radius:50%; background:rgba(255,255,255,0.22); display:inline-flex; align-items:center; justify-content:center; font-size:14px; }

.hp-hero-sub { font-size:15px; font-weight:300; color:var(--muted); line-height:1.7; max-width:420px; margin-bottom:36px; animation:fadeUp 0.5s 0.2s ease both; }
.hp-hero-btns { display:flex; gap:12px; flex-wrap:wrap; animation:fadeUp 0.5s 0.3s ease both; }

.hp-btn-purple { display:inline-flex; align-items:center; gap:8px; background:var(--purple); color:#fff; font-family:'DM Sans',sans-serif; font-size:15px; font-weight:500; padding:14px 28px; border-radius:50px; text-decoration:none; border:none; cursor:pointer; box-shadow:0 8px 28px rgba(124,58,237,0.35); transition:all 0.2s; }
.hp-btn-purple:hover { background:var(--purple-mid); transform:translateY(-2px); }
.hp-btn-ghost { display:inline-flex; align-items:center; gap:8px; background:var(--white); color:var(--text); font-family:'DM Sans',sans-serif; font-size:15px; font-weight:500; padding:14px 28px; border-radius:50px; text-decoration:none; border:1px solid rgba(124,58,237,0.15); cursor:pointer; box-shadow:0 2px 12px rgba(0,0,0,0.06); transition:all 0.2s; }
.hp-btn-ghost:hover { border-color:var(--purple); color:var(--purple); }

/* HERO IMAGE */
.hp-hero-img-wrap { position:relative; width:460px; height:500px; }
.hp-hero-img-placeholder { width:100%; height:100%; border-radius:28px; background:linear-gradient(135deg,#c4b5fd 0%,#7c3aed 50%,#4c1d95 100%); display:flex; align-items:center; justify-content:center; font-size:90px; box-shadow:0 30px 80px rgba(124,58,237,0.3); }

.hp-badge-float { position:absolute; background:var(--white); border-radius:16px; box-shadow:0 8px 32px rgba(0,0,0,0.12); display:flex; align-items:center; gap:10px; padding:12px 16px; }
.hp-badge-float-1 { top:24px; right:-24px; animation:float 3s ease-in-out infinite; }
.hp-badge-float-2 { bottom:90px; right:-32px; animation:float 5s 1s ease-in-out infinite; }
.hp-badge-float-3 { bottom:24px; left:-24px; animation:float 4s 0.5s ease-in-out infinite; }
.hp-badge-icon { width:38px; height:38px; border-radius:10px; display:flex; align-items:center; justify-content:center; flex-shrink:0; }
.hp-badge-icon.purple { background:rgba(124,58,237,0.1); color:var(--purple); }
.hp-badge-icon.green  { background:rgba(16,185,129,0.1); color:#10b981; }
.hp-badge-icon.blue   { background:rgba(59,130,246,0.1); color:#3b82f6; }
.hp-badge-label { font-size:11px; color:var(--muted); }
.hp-badge-value { font-size:14px; font-weight:700; color:var(--text); }

/* STATS */
.hp-stats { padding:60px 48px; position:relative; z-index:2; }
.hp-stats-inner { max-width:1000px; margin:0 auto; background:var(--white); border-radius:24px; padding:40px 48px; display:grid; grid-template-columns:1fr 1px 1fr 1px 1fr 1.2fr; align-items:center; box-shadow:0 8px 40px rgba(124,58,237,0.08); }
.hp-stat-divider { height:60px; background:rgba(124,58,237,0.1); }
.hp-stat-item { padding:0 28px; text-align:center; }
.hp-stat-pct { font-family:'Bricolage Grotesque',sans-serif; font-size:3rem; font-weight:800; color:var(--purple); line-height:1; margin-bottom:6px; }
.hp-stat-desc { font-size:13px; color:var(--muted); line-height:1.4; }
.hp-stat-cta { padding:0 0 0 28px; display:flex; flex-direction:column; gap:14px; }
.hp-stat-cta-title { font-family:'Bricolage Grotesque',sans-serif; font-size:17px; font-weight:700; color:var(--text); line-height:1.35; }

/* FEATURES */
.hp-features { padding:clamp(4rem,8vw,7rem) 48px; position:relative; z-index:2; }
.hp-features-header { text-align:center; margin-bottom:4rem; }
.hp-label { display:inline-flex; align-items:center; gap:6px; font-size:11px; font-weight:600; letter-spacing:0.1em; text-transform:uppercase; color:var(--purple); margin-bottom:12px; }
.hp-section-title { font-family:'Bricolage Grotesque',sans-serif; font-size:clamp(1.8rem,3.5vw,2.8rem); font-weight:800; letter-spacing:-0.02em; line-height:1.15; color:var(--text); margin-bottom:14px; }
.hp-section-sub { font-size:15px; color:var(--muted); font-weight:300; line-height:1.65; max-width:460px; margin:0 auto; }
.hp-features-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:16px; max-width:1100px; margin:0 auto; }
.hp-feat-card { background:var(--white); border:1px solid rgba(124,58,237,0.08); border-radius:20px; padding:28px 24px; transition:all 0.25s; }
.hp-feat-card:hover { transform:translateY(-5px); box-shadow:0 20px 50px rgba(124,58,237,0.12); border-color:rgba(124,58,237,0.2); }
.hp-feat-icon { width:48px; height:48px; border-radius:14px; background:rgba(124,58,237,0.08); display:flex; align-items:center; justify-content:center; color:var(--purple); margin-bottom:18px; }
.hp-feat-title { font-family:'Bricolage Grotesque',sans-serif; font-size:16px; font-weight:700; color:var(--text); margin-bottom:8px; }
.hp-feat-desc { font-size:13px; line-height:1.6; color:var(--muted); font-weight:300; }

/* EVENTS */
.hp-events { padding:clamp(4rem,8vw,7rem) 48px; background:linear-gradient(180deg,transparent 0%,rgba(124,58,237,0.04) 100%); position:relative; z-index:2; }
.hp-events-header { display:flex; align-items:flex-end; justify-content:space-between; margin-bottom:2.5rem; max-width:1100px; margin-left:auto; margin-right:auto; flex-wrap:wrap; gap:1rem; }
.hp-view-all { display:inline-flex; align-items:center; gap:6px; font-size:13px; font-weight:500; color:var(--purple); text-decoration:none; border:1px solid rgba(124,58,237,0.2); padding:8px 18px; border-radius:50px; transition:all 0.2s; background:var(--white); }
.hp-view-all:hover { background:var(--purple); color:#fff; border-color:var(--purple); }
.hp-events-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:16px; max-width:1100px; margin:0 auto; }
.hp-event-card { background:var(--white); border:1px solid rgba(124,58,237,0.07); border-radius:20px; overflow:hidden; text-decoration:none; display:block; transition:all 0.25s; }
.hp-event-card:hover { transform:translateY(-5px); box-shadow:0 20px 50px rgba(124,58,237,0.12); }
.hp-event-img-wrap { position:relative; height:190px; overflow:hidden; }
.hp-event-img { width:100%; height:100%; object-fit:cover; display:block; transition:transform 0.35s; }
.hp-event-card:hover .hp-event-img { transform:scale(1.05); }
.hp-event-price { position:absolute; top:12px; right:12px; background:var(--white); border-radius:20px; padding:4px 12px; font-size:12px; font-weight:600; color:var(--purple); box-shadow:0 2px 8px rgba(0,0,0,0.1); }
.hp-event-body { padding:1.2rem 1.4rem; }
.hp-event-cat { font-size:10px; font-weight:600; letter-spacing:0.1em; text-transform:uppercase; color:var(--purple); margin-bottom:6px; }
.hp-event-title { font-family:'Bricolage Grotesque',sans-serif; font-size:16px; font-weight:700; color:var(--text); margin-bottom:6px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; transition:color 0.2s; }
.hp-event-card:hover .hp-event-title { color:var(--purple); }
.hp-event-desc { font-size:12px; color:var(--muted); line-height:1.55; margin-bottom:12px; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden; font-weight:300; }
.hp-event-meta { display:flex; justify-content:space-between; align-items:center; padding-top:10px; border-top:1px solid rgba(124,58,237,0.07); font-size:11px; color:var(--muted); }
.hp-event-date { display:flex; align-items:center; gap:4px; }

/* DOWNLOAD */
.hp-download { max-width:1100px; margin:60px auto 0; background:var(--white); border-radius:24px; padding:36px 48px; display:flex; align-items:center; justify-content:space-between; gap:24px; flex-wrap:wrap; box-shadow:0 8px 40px rgba(124,58,237,0.08); }
.hp-download-title { font-family:'Bricolage Grotesque',sans-serif; font-size:1.6rem; font-weight:800; color:var(--text); letter-spacing:-0.02em; margin-bottom:8px; }
.hp-download-sub { font-size:14px; color:var(--muted); font-weight:300; }
.hp-store-btns { display:flex; gap:10px; flex-wrap:wrap; }
.hp-store-btn { display:inline-flex; align-items:center; gap:10px; background:var(--text); color:#fff; font-family:'DM Sans',sans-serif; font-size:13px; font-weight:500; padding:10px 20px; border-radius:12px; text-decoration:none; transition:all 0.2s; }
.hp-store-btn:hover { background:var(--purple); transform:translateY(-2px); }
.hp-store-btn span { font-size:11px; opacity:0.7; display:block; }

/* CTA */
.hp-cta { padding:clamp(5rem,10vw,8rem) 48px; text-align:center; position:relative; z-index:2; }
.hp-cta-inner { max-width:700px; margin:0 auto; background:linear-gradient(135deg,var(--purple) 0%,#4c1d95 100%); border-radius:28px; padding:clamp(3rem,6vw,5rem) clamp(2rem,5vw,4rem); position:relative; overflow:hidden; box-shadow:0 30px 80px rgba(124,58,237,0.35); }
.hp-cta-inner::before { content:''; position:absolute; top:-50px; right:-50px; width:280px; height:280px; border-radius:50%; background:rgba(255,255,255,0.05); pointer-events:none; }
.hp-cta h2 { font-family:'Bricolage Grotesque',sans-serif; font-size:clamp(1.8rem,4vw,2.8rem); font-weight:800; letter-spacing:-0.02em; color:#fff; margin-bottom:14px; }
.hp-cta p { color:rgba(255,255,255,0.65); font-size:15px; font-weight:300; line-height:1.65; margin-bottom:2.5rem; max-width:420px; margin-left:auto; margin-right:auto; }
.hp-btn-white { display:inline-flex; align-items:center; gap:8px; background:#fff; color:var(--purple); font-family:'DM Sans',sans-serif; font-size:15px; font-weight:600; padding:14px 32px; border-radius:50px; text-decoration:none; border:none; cursor:pointer; box-shadow:0 8px 30px rgba(0,0,0,0.15); transition:all 0.2s; }
.hp-btn-white:hover { transform:translateY(-2px); box-shadow:0 12px 40px rgba(0,0,0,0.2); }

@keyframes fadeUp { from{opacity:0;transform:translateY(20px);} to{opacity:1;transform:translateY(0);} }
@keyframes float { 0%,100%{transform:translateY(0);} 50%{transform:translateY(-8px);} }

@media(max-width:768px) {
  .hp-hero{flex-direction:column;padding:100px 24px 60px;}
  .hp-hero-right{margin-top:40px;}
  .hp-hero-img-wrap{width:300px;height:340px;}
  .hp-stats-inner{grid-template-columns:1fr 1fr;gap:24px;padding:24px;}
  .hp-stat-divider{display:none;}
  .hp-nav{padding:14px 20px;}
  .hp-nav-links{display:none;}
  .hp-features,.hp-events,.hp-cta,.hp-stats{padding-left:20px;padding-right:20px;}
  .hp-features-grid,.hp-events-grid{grid-template-columns:1fr;}
  .hp-download{padding:24px;flex-direction:column;}
}
`;

const features = [
  { icon: <Calendar size={22}/>, title: 'Smart Event Discovery', desc: 'Find workshops, seminars and parties near you. Filter by date, category, or club — RSVP in seconds.' },
  { icon: <Users size={22}/>, title: 'Club Management', desc: 'Run your student organization smoothly. Members, announcements, and events in one clean dashboard.' },
  { icon: <Star size={22}/>, title: 'Earn Recognition', desc: 'Track participation, earn certificates, and build a leadership portfolio that opens doors.' },
  { icon: <Zap size={22}/>, title: 'AI Recommendations', desc: 'Get personalised activity suggestions based on your interests, schedule, and campus activity.' },
  { icon: <Clock size={22}/>, title: 'Real-Time Updates', desc: 'Live attendance tracking, last-minute event changes, and instant notifications to stay in the loop.' },
  { icon: <TrendingUp size={22}/>, title: 'Analytics for Orgs', desc: 'Club admins get deep insights into member engagement, event performance, and growth trends.' },
];

const stats = [
  { pct: '95%', desc: 'Student satisfaction with UniActs event discovery' },
  { pct: '78%', desc: 'Increase in club membership after joining' },
  { pct: '89%', desc: 'Savings in admin time for club organisers' },
];

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
    <div className="hp">
      <style>{css}</style>

      <HomeNavigation />

      {/* HERO */}
      <section className="hp-hero">
        <div className="hp-bg-text">UNIACTS</div>

        <div className="hp-hero-left">
          <div className="hp-eyebrow"><Zap size={11}/> AI-Powered Campus Platform</div>
          <h1 className="hp-hero-title">
            Discover Your{' '}
            <span className="pill-word">
              <span className="pill-icon">🎓</span>
              Campus
            </span>{' '}
            Life With UniActs
          </h1>
          <p className="hp-hero-sub">Join thousands of students connecting through events, clubs, and shared passions. Your university, fully unlocked — available 24/7.</p>
          <div className="hp-hero-btns">
            <Link to="/events" className="hp-btn-purple">Browse Events <ChevronRight size={16}/></Link>
            <Link to="/register" className="hp-btn-ghost"><Play size={14}/> Join a Club</Link>
          </div>
        </div>

        <div className="hp-hero-right">
          <div className="hp-hero-img-wrap">
            <div className="hp-hero-img-placeholder">🎓</div>
            <div className="hp-badge-float hp-badge-float-1">
              <div className="hp-badge-icon purple"><Clock size={18}/></div>
              <div><div className="hp-badge-value">24/7</div><div className="hp-badge-label">Always available</div></div>
            </div>
            <div className="hp-badge-float hp-badge-float-2">
              <div className="hp-badge-icon green"><Users size={18}/></div>
              <div><div className="hp-badge-value">12,400+</div><div className="hp-badge-label">Active students</div></div>
            </div>
            <div className="hp-badge-float hp-badge-float-3">
              <div className="hp-badge-icon blue"><Star size={18}/></div>
              <div><div className="hp-badge-value">340 events</div><div className="hp-badge-label">This month</div></div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="hp-stats">
        <div className="hp-stats-inner">
          {stats.map((s, i) => (
            <React.Fragment key={s.pct}>
              <div className="hp-stat-item">
                <div className="hp-stat-pct">{s.pct}</div>
                <div className="hp-stat-desc">{s.desc}</div>
              </div>
              {i < stats.length - 1 && <div className="hp-stat-divider"/>}
            </React.Fragment>
          ))}
          <div className="hp-stat-cta">
            <div className="hp-stat-cta-title">See How UniActs Can Transform Your Campus Life</div>
            <Link to="/contact" className="hp-btn-purple" style={{fontSize:'13px',padding:'10px 20px',borderRadius:'50px',display:'inline-flex',alignItems:'center',gap:'6px',textDecoration:'none'}}>
              Speak to a Specialist <ArrowRight size={13}/>
            </Link>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="hp-features">
        <div className="hp-features-header">
          <div className="hp-label"><Zap size={11}/> Features</div>
          <h2 className="hp-section-title">Automate Your Campus<br/>Simply And Efficiently</h2>
          <p className="hp-section-sub">Our AI tools are available 24/7 — ready to connect you with events, clubs, and everything your university offers.</p>
        </div>
        <div className="hp-features-grid">
          {features.map(f => (
            <div key={f.title} className="hp-feat-card">
              <div className="hp-feat-icon">{f.icon}</div>
              <div className="hp-feat-title">{f.title}</div>
              <p className="hp-feat-desc">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* EVENTS */}
      <section className="hp-events">
        <div className="hp-events-header">
          <div>
            <div className="hp-label" style={{justifyContent:'flex-start'}}><Calendar size={11}/> Upcoming</div>
            <h2 className="hp-section-title" style={{fontSize:'clamp(1.5rem,2.5vw,2rem)',marginBottom:0}}>Don't miss what's happening</h2>
          </div>
          <Link to="/events" className="hp-view-all">View all <ArrowRight size={13}/></Link>
        </div>
        <div className="hp-events-grid">
          {featuredEvents.map(event => (
            <Link key={event.id} to={`/events/${event.id}`} className="hp-event-card">
              <div className="hp-event-img-wrap">
                <img src={event.image} alt={event.title} className="hp-event-img"/>
                <span className="hp-event-price">{event.price}</span>
              </div>
              <div className="hp-event-body">
                <div className="hp-event-cat">{event.category}</div>
                <div className="hp-event-title">{event.title}</div>
                <p className="hp-event-desc">{event.description || 'Join us for this amazing event!'}</p>
                <div className="hp-event-meta">
                  <span className="hp-event-date"><Calendar size={11}/> {event.date}</span>
                  <span style={{overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap',maxWidth:120}}>{event.location}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="hp-download">
          <div>
            <div className="hp-download-title">Download our mobile app</div>
            <div className="hp-download-sub">Available on iOS and Android — free forever.</div>
          </div>
          <div className="hp-store-btns">
            <a href="#" className="hp-store-btn"><span style={{fontSize:22}}>▶</span><div><span>Get it on</span>Google Play</div></a>
            <a href="#" className="hp-store-btn"><span style={{fontSize:22}}>⌘</span><div><span>Download on</span>App Store</div></a>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="hp-cta">
        <div className="hp-cta-inner">
          <h2>Ready to get involved?</h2>
          <p>Create an account today to register for events, join clubs, and start your university story.</p>
          <Link to="/register" className="hp-btn-white">Get Started <ChevronRight size={16}/></Link>
        </div>
      </section>
    </div>
  );
}

