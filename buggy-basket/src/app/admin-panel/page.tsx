import { PackageSearch } from "lucide-react";
import { PackagePlus } from "lucide-react";
import { BadgePoundSterling } from "lucide-react";
import { UserRoundCog } from "lucide-react";
import { UserSearch } from "lucide-react";
import { FileClock } from "lucide-react";
import { LayoutDashboard } from "lucide-react";
export default function About() {
  
  return (
    <main>
      <div className="page">
        <div className="page-container">
          <section className="admin-sidenav">
            <nav className="admin-nav">
              <ul>
                <li><a href="/admin"><LayoutDashboard />Dashboard</a></li>
                <li><a href="/admin/products"><PackageSearch />Manage Products</a></li>
                <li><a href="/admin/add-product"><PackagePlus />Add Product</a></li>
                <li><a href="/admin/analytics"><BadgePoundSterling />Sales Analytics</a></li>
                <li><a href="/admin/manage-users"><UserRoundCog />Manage Users</a></li>
                <li><a href="/admin/user-audit"><UserSearch />User Audit</a></li>
                <li><a href="/admin/edit-log"><FileClock />Admin Edit Log</a></li>
              </ul>
            </nav>
          </section>
          <section className="admin-panel">
            <h2>Admin Panel</h2>
            <p>
              Welcome to the admin panel. Here you can manage your application
              settings and user accounts.
            </p>
            <section className="admin-content">
              <div className="admin-content-sitecontent">
                <h3>Site Content</h3>
                <p>Manage site content and product information</p>
                <ul className="button-grid">
                  <a href="/admin/products">
                    <li className="button-grid-important"><PackageSearch />Manage Products</li>
                  </a>
                  <a href="/admin/products/new">
                    <li><PackagePlus />Add New Products</li>
                  </a>
                  <a href="/admin/analytics">
                    <li><BadgePoundSterling />View Sales Analytics</li>
                  </a>
                </ul>
              </div>

              <div className="admin-content-sitecontent">
                <h3>Users</h3>
                <p>Manage user accounts and permissions.</p>
                <ul className="button-grid">
                  <a href="/admin/users">
                    <li className="button-grid-important"><UserRoundCog />Manage Users</li>
                  </a>
                  <a href="/admin/users/audit">
                    <li><UserSearch />User Audit</li>
                  </a>
                  <a href="/admin/edit-log">
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
