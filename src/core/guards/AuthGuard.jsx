import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../app/providers/AuthContext';

/**
 * Protected Route Guard
 * Redirects to login if user is not authenticated
 */
export const AuthGuard = ({ children, requiredRole = null }) => {
  const { isLoggedIn, user } = useAuth();
  const location = useLocation();

  if (!isLoggedIn) {
    return <Navigate to="/register" state={{ from: location }} replace />;
  }

  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

/**
 * Admin Route Guard
 * Only allows admin roles
 */
export const AdminGuard = ({ children }) => {
  const { isLoggedIn, user } = useAuth();
  const location = useLocation();

  const ADMIN_ROLES = ['TENANT_ADMIN', 'API_PARTNER', 'WHITELABEL_PARTNER', 'SUPER_ADMIN'];

  if (!isLoggedIn) {
    return <Navigate to="/register" state={{ from: location }} replace />;
  }

  if (!ADMIN_ROLES.includes(user?.role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

/**
 * Guest Guard
 * Redirects to dashboard if already logged in
 */
export const GuestGuard = ({ children }) => {
  const { isLoggedIn } = useAuth();

  if (isLoggedIn) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};
