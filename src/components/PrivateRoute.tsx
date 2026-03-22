import { type ReactNode } from 'react';
import { useAuth } from '../context/AuthContext';

interface PrivateRouteProps {
  children: ReactNode;
  // Called when the user is NOT authenticated so the parent can redirect them.
  onRedirect: () => void;
}

// ─── PrivateRoute ─────────────────────────────────────────────────────────────
// This is a wrapper (not a React Router route) since the project uses manual
// tab-based navigation. If the user is logged out it fires onRedirect() and
// renders nothing, keeping the protected content completely hidden.

export default function PrivateRoute({ children, onRedirect }: PrivateRouteProps) {
  const { user } = useAuth();

  if (!user) {
    // Side-effect during render is OK here because it only mutates parent state,
    // not the DOM — React will re-render synchronously before painting.
    onRedirect();
    return null;
  }

  return <>{children}</>;
}