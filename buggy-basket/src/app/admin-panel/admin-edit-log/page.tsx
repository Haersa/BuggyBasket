'use client';

import AdminSidebar from '../components/AdminSidebar';

export default function ManageUsers() {
  return (
    <main>
      <div className="page">
        <div className="page-container">
          <AdminSidebar />

          <section className="admin-panel">
            <section className="admin-users-header">
              <h2>Admin Edit Log</h2>
              <div className="admin-users-actions"></div>
            </section>

            <table className='admin-users-table'>
              <thead>
                <tr>
                  <th>Date & Time</th>
                  <th>Email</th>
                  <th>Action</th>
                  <th>Target</th>
                  <th>Details</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>12 Apr 2026, 18:13</td>
                  <td>buggyadmin@buggybasket.co.uk</td>
                  <td>Updated the product</td>
                  <td>Medium Red Buggy Basket</td>
                  <td>Changed price from £49.99 to £39.99</td>
                  <td>Success</td>
                </tr>
                <tr>
                  <td>10 Apr 2026, 13:17</td>
                  <td>placeholder@gmail.com</td>
                  <td>Updated user profile</td>
                  <td>user@gmail.com</td>
                  <td>Updated the newsletter subscription</td>
                  <td>Success</td>
                </tr>
                <tr>
                  <td>10 Apr 2026, 10:51</td>
                  <td>jacobadmin@gmail.com</td>
                  <td>Deleted the user</td>
                  <td>fakeuser@gmail.com</td>
                  <td>The user has been deleted</td>
                  <td>Success</td>
                </tr>
                <tr>
                  <td>8 Apr 2026, 11:51</td>
                  <td>kyleadmin@gmail.com</td>
                  <td>Added a new product</td>
                  <td>Medium black buggy basket</td>
                  <td>A new product has been added</td>
                  <td>Success</td>
                </tr>
                <tr>
                  <td>8 Apr 2026, 10:21</td>
                  <td>jacobadmin@gmail.com</td>
                  <td>Changed User Role</td>
                  <td>emmaadmin@gmail.com</td>
                  <td>Changed role from User to Moderator</td>
                  <td>Success</td>
                </tr>
                <tr>
                  <td>3 Apr 2026, 17:28</td>
                  <td>kyleadmin@gmail.com</td>
                  <td>Added a new user</td>
                  <td>fakeuser@gmail.com</td>
                  <td>A new user has been added</td>
                  <td>Success</td>
                </tr>
              </tbody>
            </table>
          </section>
        </div>
      </div>
    </main>
  );
}