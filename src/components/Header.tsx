import { useAuth } from '../context/AuthContext';

// Tab type is shared across App and Header
export type Tab = 'ch04' | 'ch05' | 'ch06';

interface HeaderProps {
  active: Tab;
  onChange: (tab: Tab) => void;
}

// ─── Header ───────────────────────────────────────────────────────────────────
// Reads auth state from context so it can display the username and a logout
// button without needing props drilled down from App.

export default function Header({ active, onChange }: HeaderProps) {
  const { user, logout } = useAuth();

  function handleLogout() {
    logout();
    // After logging out push user back to the login page (ch06)
    onChange('ch06');
  }

  return (
    <header className="header">
      <span className="header__logo">Challenges</span>

      <nav className="header__nav">
        {(['ch04', 'ch05', 'ch06'] as Tab[]).map(tab => (
          <button
            key={tab}
            className={`header__btn${active === tab ? ' active' : ''}`}
            onClick={() => onChange(tab)}
          >
            {tab === 'ch04' && 'Challenge 04'}
            {tab === 'ch05' && 'Challenge 05'}
            {tab === 'ch06' && 'Challenge 06'}
          </button>
        ))}
      </nav>

      {/* Only render user info when someone is logged in */}
      {user && (
        <div className="header__user">
          <span className="header__username">{user}</span>
          <button className="header__logout" onClick={handleLogout}>
            Logout
          </button>
        </div>
      )}
    </header>
  );
}