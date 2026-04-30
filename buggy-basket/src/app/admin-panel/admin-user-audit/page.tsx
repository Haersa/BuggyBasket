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
              <h2>User Audit</h2>
              <div className="admin-users-actions">
                <Link href="/admin-panel/admin-manage-users">
                  <button type="button" className="admin-users-button">Manage Users</button>
                </Link>
              </div>
            </section>

            <table className='admin-users-table'>
              <thead>
                <tr>
                  <th>Date & Time</th>
                  <th>Email</th>
                  <th>Action</th>
                  <th>Details</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>13 Apr 2026, 18:13</td>
                  <td>john@gmail.com</td>
                  <td>Created Order</td>
                  <td>Oder #AB-123, Total: £30.50</td>
                  <td>Success</td>
                </tr>
                <tr>
                  <td>13 Apr 2026, 17:56</td>
                  <td>john@gmail.com</td>
                  <td>Login</td>
                  <td>Successful login from Chrome</td>
                  <td>Success</td>
                </tr>
                <tr>
                  <td>12 Apr 2026, 12:20</td>
                  <td>mike@gmail.com</td>
                  <td>Updated Profile</td>
                  <td>Subscribed to the newsletter</td>
                  <td>Success</td>
                </tr>
                <tr>
                  <td>12 Apr 2026, 12:16</td>
                  <td>mike@gmail.com</td>
                  <td>Updated Profile</td>
                  <td>Changed password</td>
                  <td>Success</td>
                </tr>
                <tr>
                  <td>12 Apr 2026, 12:10</td>
                  <td>mike@gmail.com</td>
                  <td>Login</td>
                  <td>Successful login from Edge</td>
                  <td>Success</td>
                </tr>
                <tr>
                  <td>10 Apr 2026, 15:46</td>
                  <td>sarah@gmail.com</td>
                  <td>Registered</td>
                  <td>New account registration</td>
                  <td>Success</td>
                </tr>
                <tr>
                  <td>9 Apr 2026, 10:03</td>
                  <td>tom@gmail.com</td>
                  <td>Login</td>
                  <td>Successful login from Chrome</td>
                  <td>Failed</td>
                </tr>
              </tbody>
            </table>
          </section>
        </div>
      </div>
    </main>
  );
}