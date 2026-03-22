
import { useAuth } from '../context/AuthContext';
import Login from './Login';


// Sub-tab type only used inside Challenge 06

// ─── Challenge06 ──────────────────────────────────────────────────────────────
// Acts as a mini-router inside the Ch06 section:
//   • When logged out → show Login
//   • When logged in  → show a sub-header with two private pages (Ch04 & Ch05)
// PrivateRoute guards each sub-page; if auth is lost mid-session both pages
// redirect back to the login view automatically.

export default function Challenge06() {
  const { user } = useAuth();

  // If not logged in, just render the login screen
  if (!user) return <Login />;

  return (
    <div className="ch06-wrapper">

      {/* ── Welcome banner ─────────────────────────────────────────────────── */}
      <div className="ch06-banner">
        <div className="ch06-banner__inner">
          <p className="challenge__tag">Challenge 06 · Private Area</p>
          <h2 className="ch06-banner__title">
            Welcome, <span>{user}</span>
          </h2>
        </div>

      </div>

      
      
    </div>
  );
}