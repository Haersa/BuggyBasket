'use client';

import { useEffect, useState } from 'react';
import AdminSidebar from '../components/AdminSidebar';

interface Subscriber {
  email: string;
  subscribed_at: string;
  source: 'account' | 'newsletter';
}

export default function NewsletterSubscribers() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/newsletter')
      .then(res => res.json())
      .then(data => {
        setSubscribers(data);
        setLoading(false);
      });
  }, []);

  return (
    <main>
      <div className="page">
        <div className="page-container">
          <AdminSidebar />
          <section className="admin-panel">
            <section className="admin-users-header">
              <h2>Newsletter Subscribers</h2>
              <div className="admin-users-actions">
                <span className="admin-newsletter-count">
                  {subscribers.length} subscriber{subscribers.length !== 1 ? 's' : ''}
                </span>
              </div>
            </section>

            {loading ? (
              <p>Loading subscribers...</p>
            ) : subscribers.length === 0 ? (
              <p>No subscribers yet.</p>
            ) : (
              <table className="admin-users-table">
                <thead>
                  <tr>
                    <th>Email</th>
                    <th>Source</th>
                    <th>Subscribed</th>
                  </tr>
                </thead>
                <tbody>
                  {subscribers.map((sub, index) => (
                    <tr key={index}>
                      <td>{sub.email}</td>
                      <td>
                        <span className={`admin-newsletter-badge ${sub.source === 'account' ? 'admin-newsletter-badge-account' : 'admin-newsletter-badge-newsletter'}`}>
                          {sub.source === 'account' ? 'Account' : 'Newsletter'}
                        </span>
                      </td>
                      <td>{new Date(sub.subscribed_at).toLocaleDateString('en-GB')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}