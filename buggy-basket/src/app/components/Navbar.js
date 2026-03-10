'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ShoppingBasket, CircleUserRound, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <Link href="/" className="navbar-logo">Buggy Basket</Link>

      {/* Desktop Links */}
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
            <Link href="/login" className="navbar-login">Login</Link>
            <Link href="/register" className="navbar-register">Register</Link>
          </>
        )}
        <Link href="/basket" className="navbar-basket">
          <ShoppingBasket size={22} />
        </Link>
      </div>

      {/* Mobile Right Side */}
      <div className="navbar-mobile-right">
        <Link href="/basket" className="navbar-basket">
          <ShoppingBasket size={22} />
        </Link>
        <button className="navbar-burger" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
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
              <Link href="/login" onClick={() => setMenuOpen(false)}>Login</Link>
              <Link href="/register" onClick={() => setMenuOpen(false)}>Register</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}