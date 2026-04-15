'use client';

import { useState } from 'react';

import { PackageSearch } from "lucide-react";
import { PackagePlus } from "lucide-react";
import { BadgePoundSterling } from "lucide-react";
import { UserRoundCog } from "lucide-react";
import { UserSearch } from "lucide-react";
import { FileClock } from "lucide-react";
import { LayoutDashboard } from "lucide-react";
import Link from 'next/link';

export default function ManageUsers() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    letterSubscription: false,
    role: 'user', //Could be "user", "admin", "moderator"
    status: 'active',
    registrationDate: ''
  });



  return (
    <main>
      <div className="page">
        <div className="page-container">
          <section className="admin-sidenav">
            <nav className="admin-nav">
              <ul>
                <li>
                  <a href="/admin-panel">
                    <LayoutDashboard />
                    Dashboard
                  </a>
                </li>
                <li>
                  <a href="/admin/products">
                    <PackageSearch />
                    Manage Products
                  </a>
                </li>
                <li>
                  <a href="/admin-panel/admin-add-new-product">
                    <PackagePlus />
                    Add Product
                  </a>
                </li>
                <li>
                  <a href="/admin/analytics">
                    <BadgePoundSterling />
                    Sales Analytics
                  </a>
                </li>
                <li>
                  <a href="/admin-panel/admin-manage-users">
                    <UserRoundCog />
                    Manage Users
                  </a>
                </li>
                <li>
                  <a href="/admin-panel/admin-user-audit">
                    <UserSearch />
                    User Audit
                  </a>
                </li>
                <li>
                  <a href="/admin-panel/admin-edit-log">
                    <FileClock />
                    Admin Edit Log
                  </a>
                </li>
              </ul>
            </nav>
          </section>

          
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
      <td>
        <input type="checkbox" />
      </td>
      <td>Admin</td>
      <td>Active</td>
      <td>2026-02-10</td>
      
      
      <td>
          <button type="button">Update</button>
      </td>

      <td>
          <button type="button">Delete</button>
      </td>
    </tr>


        <tr>

      <td>user@test.com</td>
      <td>••••••••••</td>
      <td>
        <input type="checkbox" />
      </td>
      <td>User</td>
      <td>Active</td>
      <td>2026-04-25</td>
      
      
      <td>
          <button type="button">Update</button>
      </td>

      <td>
          <button type="button">Delete</button>
      </td>
    </tr>


        <tr>

      <td>gooduser@test.com</td>
      <td>••••••••••</td>
      <td>
        <input type="checkbox" />
      </td>
      <td>User</td>
      <td>Active</td>
      <td>2026-04-28</td>
      
      
      <td>
          <button type="button">Update</button>
      </td>

      <td>
          <button type="button">Delete</button>
      </td>
    </tr>

  </tbody>

</table>





          </section>
        </div>
      </div>
    </main>
  );





























}