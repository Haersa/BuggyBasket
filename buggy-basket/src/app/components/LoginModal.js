'use client';

import { useState, useRef, useEffect } from 'react';
import { toast } from 'react-toastify';

export default function LoginModal({ onClose, onSwitchToRegister, onLoginSuccess }) {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [onClose]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || 'Something went wrong.');
      } else {
        localStorage.setItem('token', data.token);
        localStorage.setItem('role', data.user.role);

        if (data.user.role === 'admin') {
          sessionStorage.setItem('session_alive', 'true');
          toast.success('Welcome back!');
          onClose();
          window.location.href = '/admin-panel';
        } else {
          toast.success('Welcome back!');
          onLoginSuccess();
          onClose();
        }
      }
    } catch (err) {
      toast.error('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-dropdown" ref={ref}>
      <form onSubmit={handleSubmit} className="login-dropdown-form">
        <div className="modal-field">
          <label className="modal-label">Email</label>
          <input
            type="email"
            name="email"
            placeholder="you@example.com"
            value={formData.email}
            onChange={handleChange}
            required
            className="modal-input"
          />
        </div>

        <div className="modal-field">
          <label className="modal-label">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
            className="modal-input"
          />
          <a href="/forgot-password" className="modal-forgot">Forgot password?</a>
        </div>

        <button type="submit" className="modal-submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Log In'}
        </button>

        <p className="login-dropdown-register">
          Don&apos;t have an account?{' '}
          <button type="button" onClick={onSwitchToRegister}>Register</button>
        </p>
      </form>
    </div>
  );
}