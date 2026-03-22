import Link from 'next/link';
import { Instagram, Facebook } from 'lucide-react';
import { FaTiktok } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        <div className="footer-brand">
          <span className="footer-logo">Buggy Basket</span>
          <p className="footer-tagline">The smarter way to shop for baby.</p>
          <div className="footer-socials">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="footer-social-link">
              <Instagram size={18} />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="footer-social-link">
              <Facebook size={18} />
            </a>
            <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="footer-social-link">
              <FaTiktok size={16} />
            </a>
          </div>
        </div>

        <div className="footer-links">
          <div className="footer-col">
            <h3 className="footer-col-title">Shop</h3>
            <Link href="/shop">All Products</Link>
            <Link href="/shop">New Arrivals</Link>
            <Link href="/shop">Best Sellers</Link>
          </div>
          <div className="footer-col">
            <h3 className="footer-col-title">Company</h3>
            <Link href="/about">About Us</Link>
            <Link href="/contact">Contact</Link>
          </div>
          <div className="footer-col">
            <h3 className="footer-col-title">Legal</h3>
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/terms">Terms & Conditions</Link>
          </div>
        </div>

      </div>

      <div className="footer-bottom">
        <div className="footer-payments">
          <img src="https://upload.wikimedia.org/wikipedia/commons/5/5c/Visa_Inc._logo_(2021%E2%80%93present).svg" alt="Visa" className="payment-icon" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="payment-icon" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" alt="Apple Pay" className="payment-icon" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/f/f2/Google_Pay_Logo.svg" alt="Google Pay" className="payment-icon" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="payment-icon" />
        </div>
        <p>&copy; {new Date().getFullYear()} Buggy Basket. All rights reserved.</p>
      </div>
    </footer>
  );
}