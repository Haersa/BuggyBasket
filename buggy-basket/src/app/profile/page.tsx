'use client';

import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { User, Lock, Bell, Trash2 } from 'lucide-react';
import ConfirmModal from '../components/ConfirmModal';

type UserData = {
  id: number;
  email: string;
  newsletter: number;
  role: string;
  created_at: string;
};

const TABS = [
  { id: 'account', label: 'Account', icon: User },
  { id: 'security', label: 'Security', icon: Lock },
  { id: 'preferences', label: 'Preferences', icon: Bell },
  { id: 'danger', label: 'Danger Zone', icon: Trash2 },
];



export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('account');
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  const [email, setEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [newsletter, setNewsletter] = useState(false);
  const [deletePassword, setDeletePassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  useEffect(() => {
    if (!token) {
      window.location.href = '/';
      return;
    }

    fetch('/api/users/profile', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
        setEmail(data.email);
        setNewsletter(data.newsletter === 1);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleUpdate = async (type: string, body: object) => {
    setSubmitting(true);
    try {
      const res = await fetch('/api/users/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ type, ...body }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || 'Something went wrong.');
      } else {
        toast.success('Updated successfully!');
        if (type === 'email') setUser((prev) => prev ? { ...prev, email } : prev);
      }
    } catch {
      toast.error('Network error. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (!deletePassword) {
      toast.error('Please enter your password to confirm.');
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch('/api/users/profile', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ password: deletePassword }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || 'Something went wrong.');
      } else {
        localStorage.removeItem('token');
        toast.success('Account deleted.');
        setTimeout(() => window.location.href = '/', 1500);
      }
    } catch {
      toast.error('Network error. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="profile-loading">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <div className="profile-container">

        <div className="profile-header">
          <h1 className="profile-title">My Account</h1>
          <p className="profile-subtitle">Manage your account details and preferences.</p>
        </div>

        <div className="profile-layout">

          {/* Tabs */}
          <div className="profile-tabs">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  className={`profile-tab ${activeTab === tab.id ? 'active' : ''} ${tab.id === 'danger' ? 'danger' : ''}`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  <Icon size={16} />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Content */}
          <div className="profile-content">

            {/* Account Tab */}
            {activeTab === 'account' && (
              <div className="profile-section">
                <h2 className="profile-section-title">Account Details</h2>
                <p className="profile-section-subtitle">Update your email address.</p>
                <div className="profile-form">
                  <div className="modal-field">
                    <label className="modal-label">Email Address</label>
                    <input
                      type="email"
                      className="modal-input"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="profile-meta">
                    <p>Member since {new Date(user?.created_at || '').toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                  </div>
                  <button
                    className="profile-save-btn"
                    onClick={() => handleUpdate('email', { email })}
                    disabled={submitting}
                  >
                    {submitting ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              </div>
            )}

            {/* Security Tab */}
            {activeTab === 'security' && (
              <div className="profile-section">
                <h2 className="profile-section-title">Security</h2>
                <p className="profile-section-subtitle">Update your password.</p>
                <div className="profile-form">
                  <div className="modal-field">
                    <label className="modal-label">Current Password</label>
                    <input
                      type="password"
                      className="modal-input"
                      placeholder="Enter current password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                    />
                  </div>
                  <div className="modal-field">
                    <label className="modal-label">New Password</label>
                    <input
                      type="password"
                      className="modal-input"
                      placeholder="Min. 8 characters"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                  </div>
                  <div className="modal-field">
                    <label className="modal-label">Confirm New Password</label>
                    <input
                      type="password"
                      className="modal-input"
                      placeholder="Re-enter new password"
                      value={confirmNewPassword}
                      onChange={(e) => setConfirmNewPassword(e.target.value)}
                    />
                  </div>
                  <button
                    className="profile-save-btn"
                    disabled={submitting}
                    onClick={() => {
                      if (newPassword !== confirmNewPassword) {
                        toast.error('Passwords do not match.');
                        return;
                      }
                      if (newPassword.length < 8) {
                        toast.error('Password must be at least 8 characters.');
                        return;
                      }
                      handleUpdate('password', { currentPassword, newPassword });
                    }}
                  >
                    {submitting ? 'Saving...' : 'Update Password'}
                  </button>
                </div>
              </div>
            )}

            {/* Preferences Tab */}
            {activeTab === 'preferences' && (
              <div className="profile-section">
                <h2 className="profile-section-title">Preferences</h2>
                <p className="profile-section-subtitle">Manage your communication preferences.</p>
                <div className="profile-form">
                  <div className="profile-preference-row">
                    <div>
                      <p className="profile-preference-label">Newsletter</p>
                      <p className="profile-preference-desc">Receive updates about new products, offers and parenting tips.</p>
                    </div>
                    <label className="profile-toggle">
                      <input
                        type="checkbox"
                        checked={newsletter}
                        onChange={(e) => setNewsletter(e.target.checked)}
                      />
                      <span className="profile-toggle-slider" />
                    </label>
                  </div>
                  <button
                    className="profile-save-btn"
                    onClick={() => handleUpdate('newsletter', { newsletter })}
                    disabled={submitting}
                  >
                    {submitting ? 'Saving...' : 'Save Preferences'}
                  </button>
                </div>
              </div>
            )}

{/* Danger Zone Tab */}
{activeTab === 'danger' && (
  <div className="profile-section">
    <h2 className="profile-section-title danger-title">Danger Zone</h2>
    <p className="profile-section-subtitle">Permanently delete your account and all associated data.</p>
    <div className="profile-form">
      <div className="danger-box">
        <p className="danger-warning">This action is irreversible. All your data including your basket and order history will be permanently deleted.</p>
        <div className="modal-field">
          <label className="modal-label">Confirm Password</label>
          <input
            type="password"
            className="modal-input"
            placeholder="Enter Password"
            value={deletePassword}
            onChange={(e) => setDeletePassword(e.target.value)}
          />
        </div>
        <button
          className="profile-delete-btn"
          onClick={() => setShowConfirm(true)}
          disabled={submitting}
        >
          {submitting ? 'Deleting...' : 'Delete My Account'}
        </button>
      </div>
    </div>

    {showConfirm && (
      <ConfirmModal
        title="Delete Account"
        message="Are you sure you want to permanently delete your account? This action cannot be undone and all your data will be lost."
        confirmText="Delete My Account"
        danger
        onCancel={() => setShowConfirm(false)}
        onConfirm={() => {
          setShowConfirm(false);
          handleDeleteAccount();
        }}
      />
    )}
  </div>
)}

          </div>
        </div>
      </div>
    </div>
  );
}