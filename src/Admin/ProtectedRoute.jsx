import { Navigate, useLocation } from 'react-router-dom';
import { useAdminAuth } from './AdminAuthContext';

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAdminAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#0B2317',
        color: '#E8CA65',
        fontFamily: 'var(--font-sans, sans-serif)',
      }}>
        <div style={{
          width: 48,
          height: 48,
          border: '3px solid rgba(232, 202, 101, 0.2)',
          borderTopColor: '#E8CA65',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
        }} />
        <p style={{ marginTop: 16, fontSize: '0.95rem', letterSpacing: '1px' }}>VERIFYING SANCTUARY ACCESS...</p>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return children;
}
