'use client';

import AdminSidebar from './components/AdminSidebar';
import { PackageSearch, PackagePlus, BadgePoundSterling, UserRoundCog, UserSearch, FileClock } from 'lucide-react';

export default function AdminPanel() {
  return (
    <main>
      <div className="page">
        <div className="page-container">
          <AdminSidebar />
          <section className="admin-panel">
            <h2>Admin Panel</h2>
            <p>Welcome to the admin panel. Here you can manage your application settings and user accounts.</p>
            <section className="admin-content">
              <div className="admin-content-sitecontent">
                <div className="admin-content-sitecontent-header">
                  <h3>Site Content</h3>
                  <p>Manage site content and product information</p>
                </div>
                <ul className="button-grid">
                  <a href="/admin-panel/admin-manage-products">
                    <li><PackageSearch />Manage Products</li>
                  </a>
                  <a href="/admin-panel/admin-add-new-product">
                    <li><PackagePlus />Add New Products</li>
                  </a>
                </ul>
              </div>

              <div className="admin-content-sitecontent">
                <div className="admin-content-sitecontent-header">
                  <h3>Users</h3>
                  <p>Manage user accounts and permissions.</p>
                </div>
                <ul className="button-grid">
                  <a href="/admin-panel/admin-manage-users">
                    <li><UserRoundCog />Manage Users</li>
                  </a>
                  <a href="/admin-panel/admin-user-audit">
                    <li><UserSearch />User Audit</li>
                  </a>
                  <a href="/admin-panel/admin-edit-log">
                    <li><FileClock />View Admin Edit Log</li>
                  </a>
                </ul>
              </div>
            </section>
          </section>
        </div>
      </div>
    </main>
  );
}