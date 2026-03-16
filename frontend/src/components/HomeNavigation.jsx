import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

const navStyles = `
@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@400;500;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

.hp-nav {
  --bg: #f0eefa;
  --purple: #7c3aed;
  --purple-light: #a78bfa;
  --purple-mid: #6d28d9;
  --accent-soft: rgba(124,58,237,0.1);
  --white: #ffffff;
  --text: #1a0a3c;
  --muted: #6b7280;
  
  position: fixed; top: 0; left: 0; right: 0; z-index: 100;
  display: flex; align-items: center; justify-content: space-between;
  padding: 14px 48px;
  background: rgba(240,238,250,0.85); backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(124,58,237,0.08);
  font-family: 'DM Sans', sans-serif;
}

.hp-logo { 
  font-family:'Bricolage Grotesque',sans-serif; font-weight:800; font-size:19px; 
  color:var(--text); text-decoration:none; display:flex; align-items:center; gap:7px; 
}

.hp-logo-dot { width:8px; height:8px; border-radius:50%; background:var(--purple); }

.hp-nav-links { display:flex; gap:28px; list-style:none; align-items: center; }

.hp-nav-links a { 
  color:var(--muted); text-decoration:none; font-size:14px; font-weight:500; 
  transition:color 0.2s; 
}

.hp-nav-links a:hover { color:var(--text); }

.hp-try-btn { 
  background:var(--purple); color:#fff; font-family:'DM Sans',sans-serif; 
  font-size:14px; font-weight:500; padding:10px 22px; border-radius:50px; 
  text-decoration:none; border:none; cursor:pointer; transition:all 0.2s; 
  box-shadow:0 4px 20px rgba(124,58,237,0.3); 
}

.hp-try-btn:hover { background:var(--purple-mid); transform:translateY(-1px); }

/* Mobile */
.hp-mobile-menu {
  display: none;
}

.hp-mobile-toggle {
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  color: var(--text);
}

.hp-mobile-links {
  display: none;
  position: fixed;
  top: 60px;
  left: 0;
  right: 0;
  background: rgba(240,238,250,0.98);
  backdrop-filter: blur(20px);
  padding: 20px;
  border-bottom: 1px solid rgba(124,58,237,0.08);
  flex-direction: column;
  gap: 16px;
}

.hp-mobile-links.open {
  display: flex;
}

.hp-mobile-links a {
  color: var(--text);
  text-decoration: none;
  font-size: 16px;
  font-weight: 500;
  padding: 8px 0;
}

@media(max-width: 768px) {
  .hp-nav { padding: 14px 20px; }
  .hp-nav-links { display: none; }
  .hp-mobile-menu { display: block; }
}
`;

export function HomeNavigation() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Events', path: '/events' },
    { name: 'Clubs', path: '/clubs' },
  ];

  return (
    <>
      <style>{navStyles}</style>
      <nav className="hp-nav">
        <Link to="/" className="hp-logo">
          <div className="hp-logo-dot" />
          UniActs
        </Link>

        <ul className="hp-nav-links">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link to={item.path}>{item.name}</Link>
            </li>
          ))}
        </ul>

        <Link to="/register" className="hp-try-btn">
          Log in →
        </Link>

        {/* Mobile Toggle */}
        <div className="hp-mobile-menu">
          <button 
            className="hp-mobile-toggle" 
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`hp-mobile-links ${mobileOpen ? 'open' : ''}`}>
        {navItems.map((item) => (
          <Link 
            key={item.name} 
            to={item.path}
            onClick={() => setMobileOpen(false)}
          >
            {item.name}
          </Link>
        ))}
        <Link 
          to="/register" 
          className="hp-try-btn" 
          style={{ textAlign: 'center', display: 'inline-block' }}
          onClick={() => setMobileOpen(false)}
        >
          Try Now →
        </Link>
      </div>
    </>
  );
}
