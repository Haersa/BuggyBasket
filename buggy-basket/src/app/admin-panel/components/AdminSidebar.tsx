'use client';

import { useRouter, usePathname } from 'next/navigation';
import { 
  PackageSearch, 
  PackagePlus, 
  UserRoundCog, 
  UserSearch, 
  FileClock, 
  LayoutDashboard, 
  LogOut 
} from 'lucide-react';
import { toast } from 'react-toastify';

const navLinks = [
  { href: '/admin-panel', label: 'Dashboard', icon: <LayoutDashboard /> },
  { href: '/admin-panel/admin-manage-products', label: 'Manage Products', icon: <PackageSearch /> },
  { href: '/admin-panel/admin-add-new-product', label: 'Add Product', icon: <PackagePlus /> },
  { href: '/admin-panel/admin-manage-users', label: 'Manage Users', icon: <UserRoundCog /> },
  { href: '/admin-panel/admin-user-audit', label: 'User Audit', icon: <UserSearch /> },
  { href: '/admin-panel/admin-edit-log', label: 'Admin Edit Log', icon: <FileClock /> },
];

export default function AdminSidebar() {
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('guest_basket');
    toast.success('You have been logged out.');
    router.push('/');
  };

  return (
    <section className="admin-sidenav">
      <nav className="admin-nav">
        <ul>
          {navLinks.map(({ href, label, icon }) => (
            <li key={href}>
              <a href={href} className={pathname === href ? 'active' : ''}>
                {icon}{label}
              </a>
            </li>
          ))}
        </ul>
        <div className="admin-nav-footer">
          <button className="admin-logout-btn" onClick={handleLogout}>
            <LogOut size={16} />
            Log Out
          </button>
        </div>
      </nav>
    </section>
  );
}