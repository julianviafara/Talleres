import { createContext, useContext, useReducer, type ReactNode } from 'react';

// ─── Types ───────────────────────────────────────────────────────────────────

interface AuthState {
  user: string | null;   // null = logged out, string = email of logged-in user
  error: string | null;  // holds a login error message if credentials are wrong
}

type AuthAction =
  | { type: 'LOGIN_SUCCESS'; payload: string }
  | { type: 'LOGIN_ERROR'; payload: string }
  | { type: 'LOGOUT' };

interface AuthContextValue extends AuthState {
  login: (email: string, password: string) => void;
  logout: () => void;
}

// ─── Hardcoded demo credentials ──────────────────────────────────────────────

const VALID_EMAIL    = 'user@mail.com';
const VALID_PASSWORD = '123';

// ─── Reducer ─────────────────────────────────────────────────────────────────
// Keeps state transitions predictable and testable in one place.

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return { user: action.payload, error: null };
    case 'LOGIN_ERROR':
      return { ...state, error: action.payload };
    case 'LOGOUT':
      return { user: null, error: null };
    default:
      return state;
  }
}

// ─── Context setup ───────────────────────────────────────────────────────────

// We use a non-null assertion here because the context is always provided
// by AuthProvider before any consumer can reach it.
const AuthContext = createContext<AuthContextValue>(null!);

// ─── Provider ────────────────────────────────────────────────────────────────

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, { user: null, error: null });

  // Validates credentials and dispatches the right action
  function login(email: string, password: string) {
    if (email === VALID_EMAIL && password === VALID_PASSWORD) {
      dispatch({ type: 'LOGIN_SUCCESS', payload: email });
    } else {
      dispatch({ type: 'LOGIN_ERROR', payload: 'Invalid email or password.' });
    }
  }

  function logout() {
    dispatch({ type: 'LOGOUT' });
  }

  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// ─── Custom hook ─────────────────────────────────────────────────────────────
// Consumers import useAuth() instead of dealing with the context directly.

export function useAuth() {
  return useContext(AuthContext);
}