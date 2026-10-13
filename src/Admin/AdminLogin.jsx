import { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAdminAuth } from './AdminAuthContext';
import { FaCross, FaLock, FaUser, FaArrowLeft, FaShieldAlt } from 'react-icons/fa';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAdminAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/admin';

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username.trim() || !password) {
      setError('Please enter both username and password.');
      return;
    }

    setError('');
    setLoading(true);

    try {
      await login(username.trim(), password);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message || 'Login failed. Please verify credentials.');
    } finally {
      setLoading(false);
    }
  };

  const fillDemo = () => {
    setUsername('admin');
    setPassword('admin123');
    setError('');
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'radial-gradient(ellipse at top, #143627 0%, #0A1C14 70%, #050E0A 100%)',
        padding: '24px',
        position: 'relative',
        fontFamily: 'var(--font-sans, sans-serif)',
      }}
    >
      {/* Background glow & subtle pattern */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at 50% 30%, rgba(214, 182, 107, 0.12) 0%, transparent 60%)',
          pointerEvents: 'none',
        }}
      />

      {/* Main Login Card */}
      <div
        style={{
          width: '100%',
          maxWidth: 460,
          background: 'linear-gradient(160deg, rgba(24, 67, 50, 0.94) 0%, rgba(12, 34, 25, 0.98) 100%)',
          borderRadius: 20,
          border: '1px solid rgba(214, 182, 107, 0.3)',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.6), 0 0 40px rgba(214, 182, 107, 0.1)',
          padding: '44px 36px',
          position: 'relative',
          zIndex: 1,
          backdropFilter: 'blur(16px)',
        }}
      >
        {/* Top Header */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div
            style={{
              width: 68,
              height: 68,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #E0C47A 0%, #D6B66B 50%, #A88A42 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px',
              boxShadow: '0 8px 24px rgba(214, 182, 107, 0.35)',
              color: '#0C2219',
              fontSize: '1.8rem',
            }}
          >
            <FaCross />
          </div>
          <span
            style={{
              display: 'inline-block',
              fontSize: '0.75rem',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              color: '#D6B66B',
              fontWeight: 600,
              marginBottom: 6,
            }}
          >
            Pastor & Administrator Portal
          </span>
          <h1
            style={{
              fontFamily: 'var(--font-serif, serif)',
              fontSize: '1.85rem',
              color: '#FAF6EE',
              margin: '0 0 6px',
              fontWeight: 700,
            }}
          >
            Christ's Tabernacle
          </h1>
          <p style={{ color: '#8BA698', fontSize: '0.9rem', margin: 0 }}>
            Sign in to manage dynamic banners, testimonies, gallery & lyrics
          </p>
        </div>

        {/* Error notification */}
        {error && (
          <div
            style={{
              background: 'rgba(235, 87, 87, 0.15)',
              border: '1px solid rgba(235, 87, 87, 0.4)',
              color: '#FFA2A2',
              padding: '12px 16px',
              borderRadius: 10,
              fontSize: '0.88rem',
              marginBottom: 20,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <FaShieldAlt style={{ flexShrink: 0 }} />
            <span>{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit}>
          {/* Username */}
          <div style={{ marginBottom: 18 }}>
            <label
              style={{
                display: 'block',
                fontSize: '0.82rem',
                fontWeight: 600,
                color: '#D6B66B',
                marginBottom: 6,
                letterSpacing: '0.5px',
                textTransform: 'uppercase',
              }}
            >
              Username / Email
            </label>
            <div style={{ position: 'relative' }}>
              <FaUser
                style={{
                  position: 'absolute',
                  left: 14,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#709180',
                  fontSize: '0.9rem',
                }}
              />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="e.g. admin or admin@christtabernacle.org"
                required
                style={{
                  width: '100%',
                  padding: '12px 14px 12px 40px',
                  background: 'rgba(10, 26, 18, 0.8)',
                  border: '1px solid rgba(214, 182, 107, 0.25)',
                  borderRadius: 10,
                  color: '#FAF6EE',
                  fontSize: '0.95rem',
                  outline: 'none',
                  transition: 'border 0.2s, box-shadow 0.2s',
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#D6B66B';
                  e.target.style.boxShadow = '0 0 10px rgba(214, 182, 107, 0.3)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'rgba(214, 182, 107, 0.25)';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>
          </div>

          {/* Password */}
          <div style={{ marginBottom: 24 }}>
            <label
              style={{
                display: 'block',
                fontSize: '0.82rem',
                fontWeight: 600,
                color: '#D6B66B',
                marginBottom: 6,
                letterSpacing: '0.5px',
                textTransform: 'uppercase',
              }}
            >
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <FaLock
                style={{
                  position: 'absolute',
                  left: 14,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#709180',
                  fontSize: '0.9rem',
                }}
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter sanctuary key..."
                required
                style={{
                  width: '100%',
                  padding: '12px 14px 12px 40px',
                  background: 'rgba(10, 26, 18, 0.8)',
                  border: '1px solid rgba(214, 182, 107, 0.25)',
                  borderRadius: 10,
                  color: '#FAF6EE',
                  fontSize: '0.95rem',
                  outline: 'none',
                  transition: 'border 0.2s, box-shadow 0.2s',
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#D6B66B';
                  e.target.style.boxShadow = '0 0 10px rgba(214, 182, 107, 0.3)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'rgba(214, 182, 107, 0.25)';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '14px',
              background: 'linear-gradient(135deg, #E0C47A 0%, #D6B66B 50%, #A88A42 100%)',
              color: '#0C2219',
              fontWeight: 700,
              fontSize: '1rem',
              letterSpacing: '0.5px',
              border: 'none',
              borderRadius: 10,
              cursor: loading ? 'not-allowed' : 'pointer',
              boxShadow: '0 6px 20px rgba(214, 182, 107, 0.35)',
              transition: 'transform 0.15s, opacity 0.2s',
              opacity: loading ? 0.7 : 1,
            }}
            onMouseEnter={(e) => {
              if (!loading) e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            {loading ? 'Authenticating...' : 'Sign In to Dashboard →'}
          </button>
        </form>

        {/* Quick Demo Helper */}
        <div
          style={{
            marginTop: 20,
            padding: '12px 16px',
            background: 'rgba(214, 182, 107, 0.08)',
            borderRadius: 10,
            border: '1px dashed rgba(214, 182, 107, 0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '0.82rem',
            color: '#FAF6EE',
          }}
        >
          <div>
            <span style={{ color: '#D6B66B', fontWeight: 600 }}>Default Admin: </span>
            <code style={{ background: 'rgba(0,0,0,0.3)', padding: '2px 5px', borderRadius: 4 }}>admin</code> /{' '}
            <code style={{ background: 'rgba(0,0,0,0.3)', padding: '2px 5px', borderRadius: 4 }}>admin123</code>
          </div>
          <button
            type="button"
            onClick={fillDemo}
            style={{
              background: 'rgba(214, 182, 107, 0.2)',
              border: '1px solid #D6B66B',
              color: '#E8CC8F',
              fontSize: '0.75rem',
              padding: '4px 10px',
              borderRadius: 6,
              cursor: 'pointer',
              fontWeight: 600,
            }}
          >
            Auto-fill
          </button>
        </div>

        {/* Back to Sanctuary Home */}
        <div style={{ textAlign: 'center', marginTop: 24 }}>
          <Link
            to="/"
            style={{
              color: '#8BA698',
              fontSize: '0.88rem',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              transition: 'color 0.2s',
            }}
            onMouseEnter={(e) => (e.target.style.color = '#D6B66B')}
            onMouseLeave={(e) => (e.target.style.color = '#8BA698')}
          >
            <FaArrowLeft style={{ fontSize: '0.8rem' }} /> Return to Sanctuary Website
          </Link>
        </div>
      </div>
    </div>
  );
}
