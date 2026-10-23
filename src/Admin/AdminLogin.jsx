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

  const fillChurchLogin = () => {
    setUsername('christtabernacle@gmail.com');
    setPassword('christ@750');
    setError('');
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#F8FAF9',
        padding: '24px',
        position: 'relative',
        fontFamily: 'var(--font-sans, sans-serif)',
      }}
    >
      {/* Subtle background decoration */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 280,
          background: 'linear-gradient(180deg, #EAF4EF 0%, #F8FAF9 100%)',
          pointerEvents: 'none',
        }}
      />

      {/* Main Login Card */}
      <div
        style={{
          width: '100%',
          maxWidth: 460,
          background: '#FFFFFF',
          borderRadius: 20,
          border: '1px solid #E2E8F0',
          boxShadow: '0 20px 45px rgba(18, 45, 36, 0.08), 0 1px 3px rgba(0, 0, 0, 0.04)',
          padding: '44px 36px',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Top Header */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 16,
              background: 'linear-gradient(135deg, #184332 0%, #122D24 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px',
              boxShadow: '0 8px 20px rgba(24, 67, 50, 0.22)',
              color: '#D6B66B',
              fontSize: '1.7rem',
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
              color: '#184332',
              fontWeight: 700,
              background: '#EAF4EF',
              padding: '4px 12px',
              borderRadius: 20,
              marginBottom: 10,
            }}
          >
            Sanctuary Administration Portal
          </span>
          <h1
            style={{
              fontFamily: 'var(--font-serif, serif)',
              fontSize: '1.85rem',
              color: '#122D24',
              margin: '0 0 6px',
              fontWeight: 700,
            }}
          >
            Christ's Tabernacle
          </h1>
          <p style={{ color: '#64748B', fontSize: '0.9rem', margin: 0 }}>
            Sign in to manage dynamic banners, testimonies, gallery & worship lyrics
          </p>
        </div>

        {/* Error notification */}
        {error && (
          <div
            style={{
              background: '#FEF2F2',
              border: '1px solid #FCA5A5',
              color: '#B91C1C',
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
                fontWeight: 700,
                color: '#184332',
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
                  color: '#94A3B8',
                  fontSize: '0.9rem',
                }}
              />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="e.g. admin"
                required
                style={{
                  width: '100%',
                  padding: '12px 14px 12px 40px',
                  background: '#FFFFFF',
                  border: '1.5px solid #CBD5E1',
                  borderRadius: 10,
                  color: '#0F172A',
                  fontSize: '0.95rem',
                  outline: 'none',
                  transition: 'border 0.2s, box-shadow 0.2s',
                  boxSizing: 'border-box',
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#184332';
                  e.target.style.boxShadow = '0 0 0 3px rgba(24, 67, 50, 0.12)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#CBD5E1';
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
                fontWeight: 700,
                color: '#184332',
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
                  color: '#94A3B8',
                  fontSize: '0.9rem',
                }}
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password..."
                required
                style={{
                  width: '100%',
                  padding: '12px 14px 12px 40px',
                  background: '#FFFFFF',
                  border: '1.5px solid #CBD5E1',
                  borderRadius: 10,
                  color: '#0F172A',
                  fontSize: '0.95rem',
                  outline: 'none',
                  transition: 'border 0.2s, box-shadow 0.2s',
                  boxSizing: 'border-box',
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#184332';
                  e.target.style.boxShadow = '0 0 0 3px rgba(24, 67, 50, 0.12)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#CBD5E1';
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
              background: 'linear-gradient(135deg, #184332 0%, #122D24 100%)',
              color: '#FFFFFF',
              fontWeight: 700,
              fontSize: '1rem',
              letterSpacing: '0.5px',
              border: 'none',
              borderRadius: 10,
              cursor: loading ? 'not-allowed' : 'pointer',
              boxShadow: '0 6px 18px rgba(24, 67, 50, 0.25)',
              transition: 'transform 0.15s, opacity 0.2s, box-shadow 0.2s',
              opacity: loading ? 0.7 : 1,
            }}
            onMouseEnter={(e) => {
              if (!loading) {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(24, 67, 50, 0.35)';
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 6px 18px rgba(24, 67, 50, 0.25)';
            }}
          >
            {loading ? 'Authenticating...' : 'Sign In to Dashboard →'}
          </button>
        </form>

        {/* Quick Demo Helper */}
        <div
          style={{
            marginTop: 20,
            padding: '14px 16px',
            background: '#F1F5F9',
            borderRadius: 10,
            border: '1px dashed #CBD5E1',
            fontSize: '0.82rem',
            color: '#334155',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
            <div>
              <span style={{ color: '#184332', fontWeight: 700 }}>Church Admin: </span>
              <code style={{ background: '#E2E8F0', padding: '2px 6px', borderRadius: 4, fontWeight: 600 }}>christtabernacle@gmail.com</code>
            </div>
            <button
              type="button"
              onClick={fillChurchLogin}
              style={{
                background: '#184332',
                border: 'none',
                color: '#FFFFFF',
                fontSize: '0.75rem',
                padding: '4px 10px',
                borderRadius: 6,
                cursor: 'pointer',
                fontWeight: 700,
              }}
            >
              Fill (.env)
            </button>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <span style={{ color: '#184332', fontWeight: 700 }}>Default: </span>
              <code style={{ background: '#E2E8F0', padding: '2px 6px', borderRadius: 4, fontWeight: 600 }}>admin</code> /{' '}
              <code style={{ background: '#E2E8F0', padding: '2px 6px', borderRadius: 4, fontWeight: 600 }}>admin123</code>
            </div>
            <button
              type="button"
              onClick={fillDemo}
              style={{
                background: '#FFFFFF',
                border: '1.5px solid #184332',
                color: '#184332',
                fontSize: '0.75rem',
                padding: '3px 10px',
                borderRadius: 6,
                cursor: 'pointer',
                fontWeight: 700,
              }}
            >
              Fill Default
            </button>
          </div>
        </div>

        {/* Back to Sanctuary Home */}
        <div style={{ textAlign: 'center', marginTop: 24 }}>
          <Link
            to="/"
            style={{
              color: '#64748B',
              fontSize: '0.88rem',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              fontWeight: 500,
              transition: 'color 0.2s',
            }}
            onMouseEnter={(e) => (e.target.style.color = '#184332')}
            onMouseLeave={(e) => (e.target.style.color = '#64748B')}
          >
            <FaArrowLeft style={{ fontSize: '0.8rem' }} /> Return to Sanctuary Website
          </Link>
        </div>
      </div>
    </div>
  );
}
