import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        <div className="footer-brand">
          <span className="footer-logo">Buggy Basket</span>
          <p className="footer-tagline">The smarter way to shop for baby.</p>
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
  <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="payment-icon" />
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