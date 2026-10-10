import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// One component for both login and register, they only differ by the name field
export default function AuthPage({ mode }) {
  const isRegister = mode === 'register';
  const { authenticate } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setBusy(true);
    try {
      await authenticate(mode, form);
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="auth-wrap">
      <form className="card auth-card" onSubmit={handleSubmit}>
        <h1>TaskFlow</h1>
        <p className="muted">{isRegister ? 'Create your account' : 'Welcome back'}</p>

        {error && <div className="error">{error}</div>}

        {isRegister && (
          <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
        )}
        <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password (min 6 chars)" value={form.password} onChange={handleChange} required />

        <button disabled={busy}>{busy ? 'Please wait...' : isRegister ? 'Sign up' : 'Log in'}</button>

        <p className="muted">
          {isRegister ? 'Already have an account? ' : "Don't have an account? "}
          <Link to={isRegister ? '/login' : '/register'}>{isRegister ? 'Log in' : 'Sign up'}</Link>
        </p>
      </form>
    </div>
  );
}
