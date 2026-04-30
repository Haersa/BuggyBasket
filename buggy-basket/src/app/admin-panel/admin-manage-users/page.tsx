'use client';

import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Link from 'next/link';
import AdminSidebar from '../components/AdminSidebar';

interface User {
  id: number;
  email: string;
  newsletter: number;
  role: string;
  created_at: string;
}

interface EditState {
  role: string;
  newsletter: boolean;
}

export default function ManageUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [edits, setEdits] = useState<Record<number, EditState>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/users')
      .then(res => res.json())
      .then(data => {
        setUsers(data);
        const initialEdits: Record<number, EditState> = {};
        data.forEach((u: User) => {
          initialEdits[u.id] = { role: u.role, newsletter: u.newsletter === 1 };
        });
        setEdits(initialEdits);
        setLoading(false);
      });
  }, []);

  const handleUpdate = async (id: number) => {
    const res = await fetch(`/api/admin/users/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(edits[id]),
    });

    if (res.ok) {
      toast.success('User updated successfully.');
    } else {
      toast.error('Failed to update user.');
    }
  };

  const handleDelete = async (id: number, email: string) => {
    if (!confirm(`Are you sure you want to delete ${email}?`)) return;

    const res = await fetch(`/api/admin/users/${id}`, { method: 'DELETE' });

    if (res.ok) {
      setUsers(prev => prev.filter(u => u.id !== id));
      toast.success('User deleted.');
    } else {
      toast.error('Failed to delete user.');
    }
  };

  return (
    <main>
      <div className="page">
        <div className="page-container">
          <AdminSidebar />
          <section className="admin-panel">
            <section className="admin-users-header">
              <h2>Manage Users</h2>
              <div className="admin-users-actions">
                <Link href="/admin-panel/admin-user-audit">
                  <button type="button" className="admin-users-button">User Audit</button>
                </Link>
              </div>
            </section>

            {loading ? (
              <p>Loading users...</p>
            ) : (
              <table className="admin-users-table">
                <thead>
                  <tr>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Newsletter</th>
                    <th>Registered</th>
                    <th>Update</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(user => (
                    <tr key={user.id}>
                      <td>{user.email}</td>
                      <td>
                        <select
                          value={edits[user.id]?.role}
                          onChange={e => setEdits(prev => ({
                            ...prev,
                            [user.id]: { ...prev[user.id], role: e.target.value }
                          }))}
                        >
                          <option value="customer">Customer</option>
                          <option value="moderator">Moderator</option>
                          <option value="admin">Admin</option>
                        </select>
                      </td>
                      <td>
                        <input
                          type="checkbox"
                          checked={edits[user.id]?.newsletter}
                          onChange={e => setEdits(prev => ({
                            ...prev,
                            [user.id]: { ...prev[user.id], newsletter: e.target.checked }
                          }))}
                        />
                      </td>
                      <td>{new Date(user.created_at).toLocaleDateString('en-GB')}</td>
                      <td>
                        <button type="button" onClick={() => handleUpdate(user.id)}>Update</button>
                      </td>
                      <td>
                        <button type="button" onClick={() => handleDelete(user.id, user.email)}>Delete</button>
                      </td>
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