import Link from 'next/link';

export const metadata = {
  title: 'About Us — Buggy Basket',
  description: 'Learn about Buggy Basket — a UK-based family startup creating practical, well-designed pram baskets for modern families.',
};

export default function AboutPage() {
  return (
    <main>

      {/* Hero */}
      <section className="about-hero">
        <div className="about-hero-content">
          <p className="about-eyebrow">About Us</p>
          <h1 className="about-hero-title">Thoughtful design that transforms everyday parenting.</h1>
          <p className="about-hero-body">At Buggy Basket, we believe thoughtful design can transform everyday parenting. Born from real-life experience as parents of two, we set out to solve a simple but persistent frustration.</p>
        </div>
      </section>

      {/* Origin Story */}
      <section className="about-origin">
        <div className="about-origin-content">
          <p className="about-section-eyebrow">Our story</p>
          <h2 className="about-section-title">A frustration that became a solution.</h2>
          <p className="about-section-body">Shopping with a buggy should be easy, yet it rarely is. Limited storage, awkwardly balanced bags, and the constant challenge of managing essentials on the move made even the simplest trips feel unnecessarily difficult.</p>
          <p className="about-section-body">We knew there had to be a better solution. Buggy Basket was created to bring ease, balance, and practicality back into everyday routines — designed to attach seamlessly to your buggy handle, providing a considered, reliable storage solution that works in harmony with modern pushchairs and strollers.</p>
          <p className="about-section-body">Crafted from durable, high-quality mesh and reinforced materials, the Buggy Basket is built to offer both strength and structure, while remaining lightweight and unobtrusive. Every detail has been carefully considered — from secure attachment to balanced weight distribution.</p>
        </div>
        <div className="about-origin-image">
          {/* Replace with <Image> when product image is available */}
          <div className="about-image-placeholder">Product / lifestyle image</div>
        </div>
      </section>

      {/* Designed with Purpose */}
      <section className="about-purpose">
        <div className="about-purpose-inner">
          <div className="about-purpose-text">
            <p className="about-section-eyebrow">Designed with purpose</p>
            <h2 className="about-section-title">A UK-based family startup with a clear belief.</h2>
            <p className="about-section-body">We are a UK-based family startup, built on the belief that small innovations can make a meaningful difference.</p>
            <blockquote className="about-purpose-quote">
              Our approach is simple: create products that are practical, well-designed, and genuinely useful. No unnecessary complexity. No over-engineering. Just solutions that work — beautifully and reliably.
            </blockquote>
          </div>
          <div className="about-purpose-visual">
            {/* Replace with <Image> when product image is available */}
            <div className="about-image-placeholder">Product image</div>
          </div>
        </div>
      </section>

      {/* A Better Way to Carry */}
      <section className="about-carry">
        <div className="about-carry-inner">
          <div className="about-carry-visual">
            {/* Replace with <Image> when lifestyle image is available */}
            <div className="about-image-placeholder">Lifestyle image</div>
          </div>
          <div className="about-carry-text">
            <p className="about-section-eyebrow">A better way to carry</p>
            <h2 className="about-section-title">More than an accessory.</h2>
            <p className="about-section-body">Buggy Basket is more than an accessory — it&apos;s a smarter way to move through daily life.</p>
            <p className="about-section-body">Whether you&apos;re navigating supermarket aisles, walking through town, or managing a full day out, our basket keeps your shopping secure, accessible, and effortlessly within reach.</p>
          </div>
        </div>
      </section>

      {/* Why Buggy Basket */}
      <section className="about-why">
        <div className="about-why-inner">
          <div className="about-why-header">
            <p className="about-why-eyebrow">Why Buggy Basket?</p>
            <h2 className="about-why-title">Everything you need, nothing you don&apos;t.</h2>
          </div>
          <div className="about-why-grid">
            {[
              'Seamlessly attaches to buggy handles',
              'Designed for shopping, groceries, and everyday essentials',
              'Durable mesh construction with reinforced support',
              'Compatible with most pushchairs, prams, and strollers',
              'Lightweight, functional, and considered in every detail',
              'Created by parents, designed for modern family life',
            ].map((item, i) => (
              <div key={i} className="about-why-item">
                <div className="about-why-dot" />
                <p className="about-why-text">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="about-cta">
        <h2 className="about-cta-title">Ready to find your perfect basket?</h2>
        <p className="about-cta-body">Browse our full range of premium pram baskets, designed for modern families.</p>
        <div className="about-cta-btns">
          <Link href="/shop" className="about-btn-primary">Shop Now</Link>
          <Link href="/contact" className="about-btn-secondary">Contact Us</Link>
        </div>
      </section>

    </main>
  );
}