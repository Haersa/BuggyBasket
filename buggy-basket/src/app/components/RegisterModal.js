'use client';

import { useState } from 'react';
import { X } from 'lucide-react';
import Link from 'next/link';

export default function RegisterModal({ onClose }) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    marketing: false,
  });
  const [error, setError] = useState('');
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
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Something went wrong.');
      } else {
        onClose();
      }
    } catch (err) {
      setError('Network error. Please try again.');
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
          <button onClick={onClose}>Log in</button>
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

          {error && <p className="modal-error">{error}</p>}

          <button type="submit" className="modal-submit" disabled={loading}>
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>

          <p className="modal-terms">
            By registering you agree to our{' '}
            <Link href="/privacy">Privacy Policy</Link>{' '}
            and <Link href="/terms">Terms & Conditions</Link>.
          </p>
        </form>
      </div>
    </>
  );
}