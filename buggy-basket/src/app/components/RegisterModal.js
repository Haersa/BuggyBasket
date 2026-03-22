'use client';

import { useState } from 'react';
import { X } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'react-toastify';

export default function RegisterModal({ onClose, onSwitchToLogin, onLoginSuccess }) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    marketing: false,
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match.');
      return;
    }

    if (formData.password.length < 8) {
      toast.error('Password must be at least 8 characters.');
      return;
    }

    setLoading(true);

    try {
      const registerRes = await fetch('/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          newsletter: formData.marketing,
        }),
      });

      const registerData = await registerRes.json();

      if (!registerRes.ok) {
        toast.error(registerData.error || 'Something went wrong.');
        return;
      }

      // Auto login after successful registration
      const loginRes = await fetch('/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const loginData = await loginRes.json();

      if (loginRes.ok) {
        localStorage.setItem('token', loginData.token);
        toast.success('Welcome to Buggy Basket!');
        onLoginSuccess();
        onClose();
      } else {
        toast.success('Account created! Please log in.');
        onClose();
      }
    } catch (err) {
      toast.error('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="modal-overlay" onClick={onClose} />
      <div className="modal-panel">
        <div className="modal-header">
          <h2 className="modal-title">Create Account</h2>
          <button className="modal-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <p className="modal-subtitle">
          Already have an account?{' '}
          <button onClick={onSwitchToLogin}>Log in</button>
        </p>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="modal-field">
            <label className="modal-label">Email Address</label>
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
              placeholder="Min. 8 characters"
              value={formData.password}
              onChange={handleChange}
              required
              className="modal-input"
            />
          </div>

          <div className="modal-field">
            <label className="modal-label">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Re-enter your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="modal-input"
            />
          </div>

          <div className="modal-checkbox-group">
            <input
              type="checkbox"
              name="marketing"
              id="marketing"
              checked={formData.marketing}
              onChange={handleChange}
              className="modal-checkbox"
            />
            <label htmlFor="marketing" className="modal-checkbox-label">
              I&apos;d like to receive updates about special news and offers via email.
            </label>
          </div>

          <button type="submit" className="modal-submit" disabled={loading}>
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>

          <p className="modal-terms">
            By registering you agree to our{' '}
            <Link href="/privacy">Privacy Policy</Link>{' '}
            and <Link href="/terms">Terms &amp; Conditions</Link>.
          </p>
        </form>
      </div>
    </>
  );
}