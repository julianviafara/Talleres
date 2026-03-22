import { useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import Header from './components/Header';
import Challenge04 from './components/Challenge04';
import Challenge05 from './components/Challenge05';
import Challenge06 from './components/Challenge06';
import PrivateRoute from './components/PrivateRoute';
import './index.css';

// ─── App ──────────────────────────────────────────────────────────────────────
// AuthProvider wraps everything so any component can access auth state via
// useAuth() without prop drilling. Tab state lives here and is passed down
// to Header so it can redirect after logout.
type Tab = "ch04" | "ch05" | "ch06";
export default function App() {
  const [tab, setTab] = useState<Tab>('ch04');

  // Redirect helper used by PrivateRoute when auth is missing
  function redirectToLogin() {
    setTab('ch06');
  }

  return (
    <AuthProvider>
      <Header active={tab} onChange={setTab} />

      {/* Ch04 and Ch05 are private — only accessible when logged in */}
      {tab === 'ch04' && (
        <PrivateRoute onRedirect={redirectToLogin}>
          <Challenge04 />
        </PrivateRoute>
      )}
      {tab === 'ch05' && (
        <PrivateRoute onRedirect={redirectToLogin}>
          <Challenge05 />
        </PrivateRoute>
      )}

      {/* Ch06 handles its own auth display (login form vs private content) */}
      {tab === 'ch06' && <Challenge06 />}
    </AuthProvider>
  );
}