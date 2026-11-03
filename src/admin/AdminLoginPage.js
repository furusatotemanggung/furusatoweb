import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { loginAdmin } from './adminApi';
import { useAdminAuth } from './useAdminAuth';

function AdminLoginPage() {
  const navigate = useNavigate();
  const { user, loading } = useAdminAuth();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (loading) {
    return (
      <section className="admin-auth-page">
        <p>Memuat...</p>
      </section>
    );
  }

  if (user) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      await loginAdmin(form);
      navigate('/admin/dashboard', { replace: true });
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="admin-auth-page">
      <form className="admin-login-card" onSubmit={handleSubmit}>
        <div>
          <p className="eyebrow">Admin Furusato</p>
          <h1>Masuk Dashboard</h1>
          <p>Login terlebih dahulu untuk mengelola informasi dan gambar.</p>
        </div>

        <label>
          Email
          <input
            type="email"
            value={form.email}
            onChange={(event) => setForm({ ...form, email: event.target.value })}
            placeholder="email admin"
            required
          />
        </label>

        <label>
          Password
          <input
            type="password"
            value={form.password}
            onChange={(event) => setForm({ ...form, password: event.target.value })}
            placeholder="password"
            required
          />
        </label>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Memproses...' : 'Masuk'}
        </button>

        {error && <div className="admin-login-error">{error}</div>}
      </form>
    </section>
  );
}

export default AdminLoginPage;
