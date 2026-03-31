import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Zap, Eye, EyeOff, ArrowRight, Mail, Lock } from 'lucide-react';

const css = `
@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@700;800&family=DM+Sans:wght@300;400;500&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

.lp {
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
  --error-bg: rgba(220,38,38,0.07);
  --error: #dc2626;
  font-family: 'DM Sans', sans-serif;
  min-height: 100vh;
  background: var(--bg);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  position: relative;
  overflow: hidden;
}

/* Background orbs */
.lp::before {
  content: '';
  position: fixed;
  top: -160px; right: -160px;
  width: 600px; height: 600px;
  background: radial-gradient(circle, rgba(167,139,250,0.22) 0%, transparent 65%);
  pointer-events: none;
}
.lp::after {
  content: '';
  position: fixed;
  bottom: -120px; left: -120px;
  width: 480px; height: 480px;
  background: radial-gradient(circle, rgba(124,58,237,0.1) 0%, transparent 65%);
  pointer-events: none;
}

/* BG watermark */
.lp-bg-text {
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
.lp-inner {
  position: relative; z-index: 2;
  display: flex;
  width: 100%; max-width: 960px;
  background: var(--white);
  border-radius: 28px;
  overflow: hidden;
  box-shadow: 0 24px 80px rgba(124,58,237,0.13), 0 4px 20px rgba(0,0,0,0.05);
  min-height: 580px;
}

/* LEFT PANEL */
.lp-left {
  flex: 1;
  background: linear-gradient(145deg, var(--purple) 0%, #4c1d95 100%);
  padding: 56px 48px;
  display: flex; flex-direction: column; justify-content: space-between;
  position: relative; overflow: hidden;
}

.lp-left::before {
  content: '';
  position: absolute; top: -80px; right: -80px;
  width: 320px; height: 320px; border-radius: 50%;
  background: rgba(255,255,255,0.06); pointer-events: none;
}
.lp-left::after {
  content: '';
  position: absolute; bottom: -60px; left: -60px;
  width: 240px; height: 240px; border-radius: 50%;
  background: rgba(255,255,255,0.04); pointer-events: none;
}

.lp-brand {
  font-family: 'Bricolage Grotesque', sans-serif;
  font-size: 22px; font-weight: 800; color: #fff;
  display: flex; align-items: center; gap: 8px; text-decoration: none;
}
.lp-brand-dot { width: 9px; height: 9px; border-radius: 50%; background: rgba(255,255,255,0.6); }

.lp-left-body { position: relative; z-index: 1; }

.lp-left-eyebrow {
  display: inline-flex; align-items: center; gap: 6px;
  background: rgba(255,255,255,0.12); border: 1px solid rgba(255,255,255,0.2);
  border-radius: 50px; padding: 5px 12px;
  font-size: 11px; font-weight: 500; color: rgba(255,255,255,0.85);
  letter-spacing: 0.06em; margin-bottom: 20px;
}

.lp-left-title {
  font-family: 'Bricolage Grotesque', sans-serif;
  font-size: clamp(1.6rem, 3vw, 2.2rem); font-weight: 800;
  color: #fff; line-height: 1.2; letter-spacing: -0.02em; margin-bottom: 14px;
}

.lp-left-sub {
  font-size: 14px; color: rgba(255,255,255,0.6);
  font-weight: 300; line-height: 1.65; margin-bottom: 32px;
}

.lp-stats { display: flex; gap: 28px; }
.lp-stat-val { font-family: 'Bricolage Grotesque', sans-serif; font-size: 1.6rem; font-weight: 800; color: #fff; line-height: 1; }
.lp-stat-lbl { font-size: 11px; color: rgba(255,255,255,0.5); margin-top: 3px; }

.lp-left-footer { font-size: 12px; color: rgba(255,255,255,0.35); font-weight: 300; position: relative; z-index: 1; }

/* RIGHT PANEL */
.lp-right {
  flex: 1; padding: 56px 48px;
  display: flex; flex-direction: column; justify-content: center;
}

.lp-right-title {
  font-family: 'Bricolage Grotesque', sans-serif;
  font-size: 1.9rem; font-weight: 800; color: var(--text);
  letter-spacing: -0.02em; margin-bottom: 6px;
}
.lp-right-sub { font-size: 14px; color: var(--muted); font-weight: 300; margin-bottom: 36px; }

/* FORM */
.lp-field { margin-bottom: 18px; }

.lp-label {
  display: block; font-size: 13px; font-weight: 500;
  color: var(--text); margin-bottom: 7px;
}

.lp-input-wrap { position: relative; }

.lp-input-icon {
  position: absolute; left: 14px; top: 50%; transform: translateY(-50%);
  color: var(--muted); pointer-events: none;
  display: flex; align-items: center;
}

.lp-input {
  width: 100%;
  height: 46px;
  padding: 0 42px 0 40px;
  background: var(--accent-soft);
  border: 1px solid var(--border);
  border-radius: 12px;
  font-family: 'DM Sans', sans-serif;
  font-size: 14px; font-weight: 400; color: var(--text);
  outline: none; transition: border-color 0.2s, box-shadow 0.2s;
}
.lp-input::placeholder { color: var(--muted); font-weight: 300; }
.lp-input:focus { border-color: var(--border-focus); box-shadow: 0 0 0 3px rgba(124,58,237,0.1); background: #fff; }

.lp-pw-toggle {
  position: absolute; right: 12px; top: 50%; transform: translateY(-50%);
  background: none; border: none; cursor: pointer; color: var(--muted);
  display: flex; align-items: center; padding: 4px; transition: color 0.2s;
}
.lp-pw-toggle:hover { color: var(--purple); }

.lp-field-row {
  display: flex; align-items: center; justify-content: space-between;
  margin-bottom: 7px;
}
.lp-forgot { font-size: 12px; font-weight: 500; color: var(--purple); text-decoration: none; transition: opacity 0.2s; }
.lp-forgot:hover { opacity: 0.75; }

/* ERROR */
.lp-error {
  background: var(--error-bg); border: 1px solid rgba(220,38,38,0.2);
  border-radius: 10px; padding: 10px 14px;
  font-size: 13px; color: var(--error); margin-bottom: 18px;
  display: flex; align-items: center; gap: 8px;
}

/* SUBMIT */
.lp-submit {
  width: 100%; height: 48px;
  background: var(--purple); color: #fff;
  font-family: 'DM Sans', sans-serif; font-size: 15px; font-weight: 500;
  border: none; border-radius: 12px; cursor: pointer;
  display: flex; align-items: center; justify-content: center; gap: 8px;
  box-shadow: 0 8px 28px rgba(124,58,237,0.3);
  transition: all 0.2s; margin-top: 4px;
}
.lp-submit:hover:not(:disabled) { background: var(--purple-mid); transform: translateY(-1px); box-shadow: 0 12px 32px rgba(124,58,237,0.38); }
.lp-submit:disabled { opacity: 0.65; cursor: not-allowed; transform: none; }

/* DIVIDER */
.lp-divider { display: flex; align-items: center; gap: 12px; margin: 22px 0; }
.lp-divider-line { flex: 1; height: 1px; background: var(--border); }
.lp-divider-txt { font-size: 11px; color: var(--muted); white-space: nowrap; }

/* SOCIAL BTNS */
.lp-socials { display: flex; gap: 10px; }
.lp-social-btn {
  flex: 1; height: 42px; border-radius: 10px;
  border: 1px solid var(--border); background: var(--white);
  display: flex; align-items: center; justify-content: center; gap: 8px;
  font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 500;
  color: var(--text); cursor: pointer; text-decoration: none; transition: all 0.2s;
}
.lp-social-btn:hover { border-color: var(--purple); color: var(--purple); background: var(--accent-soft); }

/* FOOTER */
.lp-signup { text-align: center; margin-top: 24px; font-size: 13px; color: var(--muted); }
.lp-signup a { color: var(--purple); font-weight: 500; text-decoration: none; }
.lp-signup a:hover { text-decoration: underline; }

@media (max-width: 700px) {
  .lp-inner { flex-direction: column; max-width: 440px; min-height: unset; }
  .lp-left { padding: 36px 28px; }
  .lp-left-title { font-size: 1.5rem; }
  .lp-stats { display: none; }
  .lp-right { padding: 36px 28px; }
}
`;

export function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('http://127.0.0.1:8000/api/login/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Login failed. Please check your credentials.');
      } else {
        localStorage.setItem('user', JSON.stringify(data));
        navigate('/');
      }
    } catch {
      setError('Cannot connect to server. Make sure the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="lp">
      <style>{css}</style>
      <div className="lp-bg-text">UNIACTS</div>

      <div className="lp-inner">

        {/* LEFT — brand panel */}
        <div className="lp-left">
          <Link to="/" className="lp-brand">
            <div className="lp-brand-dot"/> UniActs
          </Link>

          <div className="lp-left-body">
            <div className="lp-left-eyebrow"><Zap size={11}/> AI-Powered Campus Platform</div>
            <div className="lp-left-title">Welcome back to your campus hub</div>
            <p className="lp-left-sub">
              Access events, manage your clubs, and stay connected with everything happening at your university.
            </p>
            <div className="lp-stats">
              <div>
                <div className="lp-stat-val">12K+</div>
                <div className="lp-stat-lbl">Active students</div>
              </div>
              <div>
                <div className="lp-stat-val">340</div>
                <div className="lp-stat-lbl">Events/month</div>
              </div>
              <div>
                <div className="lp-stat-val">80+</div>
                <div className="lp-stat-lbl">Clubs</div>
              </div>
            </div>
          </div>

          <div className="lp-left-footer">© {new Date().getFullYear()} UniActs. All rights reserved.</div>
        </div>

        {/* RIGHT — form */}
        <div className="lp-right">
          <div className="lp-right-title">Sign in</div>
          <div className="lp-right-sub">Enter your credentials to access your account</div>

          {error && (
            <div className="lp-error">
              <span>⚠</span> {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Username */}
            <div className="lp-field">
              <label className="lp-label" htmlFor="username">Username or Email</label>
              <div className="lp-input-wrap">
                <span className="lp-input-icon"><Mail size={15}/></span>
                <input
                  id="username"
                  className="lp-input"
                  type="text"
                  placeholder="username or m@example.com"
                  required
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                />
              </div>
            </div>

            {/* Password */}
            <div className="lp-field">
              <div className="lp-field-row">
                <label className="lp-label" htmlFor="password" style={{ marginBottom: 0 }}>Password</label>
                <Link to="/forgot-password" className="lp-forgot">Forgot password?</Link>
              </div>
              <div className="lp-input-wrap">
                <span className="lp-input-icon"><Lock size={15}/></span>
                <input
                  id="password"
                  className="lp-input"
                  type={showPw ? 'text' : 'password'}
                  placeholder="••••••••"
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
                <button type="button" className="lp-pw-toggle" onClick={() => setShowPw(p => !p)}>
                  {showPw ? <EyeOff size={15}/> : <Eye size={15}/>}
                </button>
              </div>
            </div>

            <button className="lp-submit" type="submit" disabled={loading}>
              {loading ? 'Signing in…' : (<>Sign In <ArrowRight size={16}/></>)}
            </button>
          </form>

          <div className="lp-divider">
            <div className="lp-divider-line"/>
            <span className="lp-divider-txt">or continue with</span>
            <div className="lp-divider-line"/>
          </div>

          <div className="lp-socials">
            <a href="#" className="lp-social-btn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
              Google
            </a>
            <a href="#" className="lp-social-btn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.418 22 12c0-5.523-4.477-10-10-10z"/></svg>
              GitHub
            </a>
          </div>

          <div className="lp-signup">
            Don't have an account?{' '}
            <Link to="/register">Sign up for free</Link>
          </div>
        </div>

      </div>
    </div>
  );
}

