import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

// ─── Login ────────────────────────────────────────────────────────────────────
// Controlled form that reads credentials, calls login() from AuthContext,
// and lets the context decide if the user is allowed in.

export default function Login() {
  const { login, error } = useAuth();
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [touched, setTouched]   = useState(false); // used to show validation hints

  function handleSubmit() {
    setTouched(true);
    if (!email || !password) return; // client-side guard before hitting context
    login(email, password);
  }

  // Allow pressing Enter inside any field to submit
  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter') handleSubmit();
  }

  return (
    <div className="login-wrapper">
      <div className="login-card">

        {/* Decorative top bar */}
        <div className="login-card__bar" />

        <p className="challenge__tag" style={{ marginBottom: '0.4rem' }}>Challenge 06</p>
        <h1 className="login-card__title">
          Sign <span>In</span>
        </h1>
        <p className="login-card__hint">
          Demo credentials: <code>user@mail.com</code> / <code>123</code>
        </p>

        {/* Email field */}
        <div className="field" style={{ marginBottom: '1rem' }}>
          <label htmlFor="login-email">Email</label>
          <input
            id="login-email"
            type="email"
            placeholder="user@mail.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            onKeyDown={handleKeyDown}
            aria-invalid={touched && !email}
          />
          {touched && !email && (
            <span className="login-field-error">Email is required.</span>
          )}
        </div>

        {/* Password field */}
        <div className="field" style={{ marginBottom: '1.5rem' }}>
          <label htmlFor="login-password">Password</label>
          <input
            id="login-password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={e => setPassword(e.target.value)}
            onKeyDown={handleKeyDown}
            aria-invalid={touched && !password}
          />
          {touched && !password && (
            <span className="login-field-error">Password is required.</span>
          )}
        </div>

        {/* Server-side error from context (wrong credentials) */}
        {error && <p className="login-error">{error}</p>}

        <button className="btn-submit" style={{ width: '100%' }} onClick={handleSubmit}>
          Login
        </button>
      </div>
    </div>
  );
}