'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ShoppingBasket, CircleUserRound, Menu, X } from 'lucide-react';
import RegisterModal from './RegisterModal';
import LoginModal from './LoginModal';
import { toast } from 'react-toastify';


export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [modal, setModal] = useState(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) setIsLoggedIn(true);
  }, []);

  useEffect(() => {
    const handleClick = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setProfileOpen(false);
    setMenuOpen(false);
    toast.success('You have been logged out.');
  };

  return (
    <>
      <nav className="navbar">
        <Link href="/" className="navbar-logo">Buggy Basket</Link>

        <div className="navbar-links">
          <Link href="/">Home</Link>
          <Link href="/shop">Shop</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
          {isLoggedIn ? (
            <div
              className="navbar-profile-wrapper"
              ref={profileRef}
              onMouseEnter={() => setProfileOpen(true)}
              onMouseLeave={() => setProfileOpen(false)}
              onClick={() => setProfileOpen(!profileOpen)}
            >
              <button className="navbar-profile">
                <CircleUserRound size={26} />
              </button>
              {profileOpen && (
                <div className="profile-dropdown">
                  <Link href="/profile" className="profile-dropdown-item" onClick={() => setProfileOpen(false)}>
                    My Account
                  </Link>
                  <Link href="/orders" className="profile-dropdown-item" onClick={() => setProfileOpen(false)}>
                    My Orders
                  </Link>
                  <button className="profile-dropdown-item profile-dropdown-logout" onClick={handleLogout}>
                    Log Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <button className="navbar-login" onClick={() => setModal('login')}>Login</button>
              <button className="navbar-register" onClick={() => setModal('register')}>Register</button>
            </>
          )}
          <Link href="/basket" className="navbar-basket">
            <ShoppingBasket size={22} />
          </Link>
        </div>

        <div className="navbar-mobile-right">
          <Link href="/basket" className="navbar-basket">
            <ShoppingBasket size={22} />
          </Link>
          <button className="navbar-burger" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {menuOpen && (
          <div className="navbar-mobile-menu">
            <Link href="/" onClick={() => setMenuOpen(false)}>Home</Link>
            <Link href="/shop" onClick={() => setMenuOpen(false)}>Shop</Link>
            <Link href="/about" onClick={() => setMenuOpen(false)}>About</Link>
            <Link href="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>
            {isLoggedIn ? (
              <>
                <Link href="/profile" onClick={() => setMenuOpen(false)}>My Account</Link>
                <Link href="/orders" onClick={() => setMenuOpen(false)}>My Orders</Link>
                <button className="navbar-login" onClick={handleLogout}>Log Out</button>
              </>
            ) : (
              <>
                <button className="navbar-login" onClick={() => { setModal('login'); setMenuOpen(false); }}>Login</button>
                <button className="navbar-register" onClick={() => { setModal('register'); setMenuOpen(false); }}>Register</button>
              </>
            )}
          </div>
        )}
      </nav>
      {modal === 'register' && (
  <RegisterModal
    onClose={() => setModal(null)}
    onSwitchToLogin={() => setModal('login')}
    onLoginSuccess={() => setIsLoggedIn(true)}
  />
)}
      {modal === 'login' && (
  <LoginModal
    onClose={() => setModal(null)}
    onSwitchToRegister={() => setModal('register')}
    onLoginSuccess={() => setIsLoggedIn(true)}
  />
)}
    </>
  );
}