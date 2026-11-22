import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function DashboardPage() {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();

  function handleLogout() {
    logout();
    navigate('/login', { replace: true });
  }

  const displayName = user && user.name ? user.name : 'Team Member';

  return (
    <main className="dashboard-shell">
      <header className="dashboard-header">
        <div>
          <h1 className="dashboard-brand">TaskMatrix</h1>
          <p className="dashboard-welcome">Welcome, {displayName}</p>
        </div>
        <button type="button" className="secondary-btn" onClick={handleLogout}>
          Logout
        </button>
      </header>

      <section className="dashboard-card">
        <h2>Authentication Session</h2>
        <p>
          Status: <strong>{isAuthenticated ? 'Active session token stored' : 'No active session token found'}</strong>
        </p>
        {!isAuthenticated && (
          <p className="dashboard-hint">
            You are viewing the basic dashboard placeholder. <Link to="/login">Go to Login</Link> or{' '}
            <Link to="/register">Register</Link> to start a session.
          </p>
        )}
      </section>
    </main>
  );
}