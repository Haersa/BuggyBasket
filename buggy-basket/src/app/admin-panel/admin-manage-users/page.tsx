'use client';

import { useState } from 'react';
import Link from 'next/link';
import AdminSidebar from '../components/AdminSidebar';

export default function ManageUsers() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    letterSubscription: false,
    role: 'user',
    status: 'active',
    registrationDate: ''
  });

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
                <button type="button" className="admin-users-button">Add a User</button>
              </div>
            </section>

            <table className='admin-users-table'>
              <thead>
                <tr>
                  <th>Email</th>
                  <th>Password</th>
                  <th>Letter Sub.</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Registration Date</th>
                  <th>Update</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>admin@test.com</td>
                  <td>••••••••••</td>
                  <td><input type="checkbox" /></td>
                  <td>Admin</td>
                  <td>Active</td>
                  <td>2026-02-10</td>
                  <td><button type="button">Update</button></td>
                  <td><button type="button">Delete</button></td>
                </tr>
                <tr>
                  <td>user@test.com</td>
                  <td>••••••••••</td>
                  <td><input type="checkbox" /></td>
                  <td>User</td>
                  <td>Active</td>
                  <td>2026-04-25</td>
                  <td><button type="button">Update</button></td>
                  <td><button type="button">Delete</button></td>
                </tr>
                <tr>
                  <td>gooduser@test.com</td>
                  <td>••••••••••</td>
                  <td><input type="checkbox" /></td>
                  <td>User</td>
                  <td>Active</td>
                  <td>2026-04-28</td>
                  <td><button type="button">Update</button></td>
                  <td><button type="button">Delete</button></td>
                </tr>
              </tbody>
            </table>
          </section>
        </div>
      </div>
    </main>
  );
}