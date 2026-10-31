import { Navigate, useLocation } from 'react-router-dom';
import { useAdminAuth } from './AdminAuthContext';

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAdminAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-green-deep text-gold font-sans">
        <div className="w-12 h-12 border-[3px] border-gold/20 border-t-gold rounded-full animate-spin" />
        <p className="mt-4 text-[0.95rem] tracking-wider uppercase font-semibold">
          VERIFYING SANCTUARY ACCESS...
        </p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return children;
}
