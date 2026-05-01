'use client';

import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
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

interface NewUserForm {
  email: string;
  password: string;
  role: string;
}

export default function ManageUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [edits, setEdits] = useState<Record<number, EditState>>({});
  const [loading, setLoading] = useState(true);
  const [updatingAll, setUpdatingAll] = useState(false);
  const [newUser, setNewUser] = useState<NewUserForm>({ email: '', password: '', role: 'admin' });
  const [creating, setCreating] = useState(false);

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

  const handleUpdateAll = async () => {
    setUpdatingAll(true);
    const results = await Promise.all(
      users.map(user =>
        fetch(`/api/admin/users/${user.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(edits[user.id]),
        })
      )
    );
    if (results.every(r => r.ok)) {
      toast.success('All users updated successfully.');
    } else {
      toast.error('Some updates failed.');
    }
    setUpdatingAll(false);
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

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreating(true);
    const res = await fetch('/api/admin/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newUser),
    });
    if (res.ok) {
      const created = await res.json();
      setUsers(prev => [...prev, created]);
      setEdits(prev => ({ ...prev, [created.id]: { role: created.role, newsletter: false } }));
      setNewUser({ email: '', password: '', role: 'admin' });
      toast.success('User created successfully.');
    } else {
      const data = await res.json();
      toast.error(data.error || 'Failed to create user.');
    }
    setCreating(false);
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
                <button
                  type="button"
                  className="admin-users-button"
                  onClick={handleUpdateAll}
                  disabled={updatingAll}
                >
                  {updatingAll ? (
                    <>
                      <span className="admin-btn-spinner" />
                      Updating...
                    </>
                  ) : 'Update All'}
                </button>
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

            <div className="admin-create-user">
              <h3>Create New User</h3>
              <form className="admin-create-user-form" onSubmit={handleCreateUser}>
                <div className="admin-create-user-fields">
                  <div className="modal-field">
                    <label className="modal-label">Email</label>
                    <input
                      type="email"
                      className="modal-input"
                      placeholder="user@example.com"
                      value={newUser.email}
                      onChange={e => setNewUser(prev => ({ ...prev, email: e.target.value }))}
                      required
                    />
                  </div>
                  <div className="modal-field">
                    <label className="modal-label">Password</label>
                    <input
                      type="password"
                      className="modal-input"
                      placeholder="Enter password"
                      value={newUser.password}
                      onChange={e => setNewUser(prev => ({ ...prev, password: e.target.value }))}
                      required
                    />
                  </div>
                  <div className="modal-field">
                    <label className="modal-label">Role</label>
                    <select
                      className="modal-input"
                      value={newUser.role}
                      onChange={e => setNewUser(prev => ({ ...prev, role: e.target.value }))}
                    >
                      <option value="customer">Customer</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>
                </div>
                <button type="submit" className="admin-users-button" disabled={creating}>
                  {creating ? 'Creating...' : 'Create User'}
                </button>
              </form>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}