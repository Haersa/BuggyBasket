import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="not-found">
      <h1 className="not-found-code">404</h1>
      <h2 className="not-found-title">Page not found</h2>
      <p className="not-found-text">Oops, we couldn't find the page you were looking for.</p>
      <Link href="/" className="not-found-btn">Back to Home</Link>
    </div>
  );
}