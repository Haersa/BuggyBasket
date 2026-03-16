'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ShoppingBasket, CircleUserRound, Menu, X } from 'lucide-react';
import RegisterModal from './RegisterModal';

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

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
            <Link href="/profile" className="navbar-profile">
              <CircleUserRound size={26} />
            </Link>
          ) : (
            <>
              <button className="navbar-login" onClick={() => {}}>Login</button>
              <button className="navbar-register" onClick={() => setShowRegister(true)}>Register</button>
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
              <Link href="/profile" onClick={() => setMenuOpen(false)}>Profile</Link>
            ) : (
              <>
                <button className="navbar-login" onClick={() => setMenuOpen(false)}>Login</button>
                <button className="navbar-register" onClick={() => { setShowRegister(true); setMenuOpen(false); }}>Register</button>
              </>
            )}
          </div>
        )}
      </nav>

      {showRegister && <RegisterModal onClose={() => setShowRegister(false)} />}
    </>
  );
}