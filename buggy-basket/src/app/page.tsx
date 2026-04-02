'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { Truck, RotateCcw, ShieldCheck, Star } from 'lucide-react';
import { useBasket } from './context/BasketContext';
import { toast } from 'react-toastify';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';


export default function Home() {
  const { addItem } = useBasket();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('/api/products')
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error('Failed to fetch products:', err));
  }, []);

  const handleAddToBasket = async (product) => {
    const success = await addItem(product.id, 1, {
      name: product.name,
      price: product.price,
      image_url: product.image_url,
    });
    if (success) {
      toast.success('Item added to basket!');
    } else {
      toast.error('Failed to add item to basket.');
    }
  };

  return (
    <main>

      {/* Hero */}
      <section className="hero">
        <video className="hero-video" autoPlay muted loop playsInline>
          <source src="/hero.mp4" type="video/mp4" />
        </video>
        <div className="hero-overlay" />
        <div className="hero-content">
          <p className="hero-eyebrow">New Collection 2026</p>
          <h1 className="hero-title">For your baby&apos;s needs.</h1>
          <p className="hero-subtitle">Premium pram baskets designed for modern families. Built to last, styled to impress.</p>
          <div className="hero-actions">
            <Link href="/shop" className="hero-btn-primary">Shop Now</Link>
            <Link href="/about" className="hero-btn-secondary">Learn More</Link>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <div className="trust-bar">
        <div className="trust-item">
          <Truck size={20} />
          <span>Free Delivery Over £50</span>
        </div>
        <div className="trust-item">
          <RotateCcw size={20} />
          <span>30 Day Returns</span>
        </div>
        <div className="trust-item">
          <ShieldCheck size={20} />
          <span>Secure Checkout</span>
        </div>
        <div className="trust-item">
          <Star size={20} />
          <span>Trusted by 500+ Families</span>
        </div>
      </div>

      {/* Featured Products */}
      <section className="featured">
        <div className="featured-header">
          <h2 className="featured-title">Shop our Range</h2>
          <Link href="/shop" className="featured-view-all">View All</Link>
        </div>
        <Swiper
          modules={[Navigation, Pagination]}
          navigation
          pagination={{ clickable: true }}
          spaceBetween={24}
          slidesPerView={1}
          breakpoints={{
            480: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
          }}
          className="featured-swiper"
        >
          {products.map((product) => (
            <SwiperSlide key={product.id}>
            <Link href={`/shop/${product.id}`} className="product-card">
              <div className="product-card-image">
                {product.out_of_stock ? (
                  <span className="product-card-tag" style={{ background: 'var(--error)', color: '#fff' }}>Out of Stock</span>
                ) : null}
              </div>
              <div className="product-card-body">
                <h3 className="product-card-name">{product.name}</h3>
                <div className="product-card-footer">
                  <span className="product-card-price">£{product.price.toFixed(2)}</span>
                  <button
                    className="product-card-btn"
                    onClick={(e) => {
                      e.preventDefault();
                      handleAddToBasket(product);
                    }}
                    disabled={!!product.out_of_stock}
                  >
                    {product.out_of_stock ? 'Out of Stock' : 'Add to Basket'}
                  </button>
                </div>
              </div>
            </Link>
          </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* Categories */}
      <section className="categories">
        <div className="categories-header">
          <h2 className="categories-title">Shop by Category</h2>
        </div>
        <div className="categories-grid">
          <Link href="/shop?category=newborn" className="category-card">
            <div className="category-card-bg" />
            <div className="category-card-content">
              <h3 className="category-card-title">Newborn</h3>
              <span className="category-card-link">Shop Now →</span>
            </div>
          </Link>
          <Link href="/shop?category=toddler" className="category-card">
            <div className="category-card-bg" />
            <div className="category-card-content">
              <h3 className="category-card-title">Toddler</h3>
              <span className="category-card-link">Shop Now →</span>
            </div>
          </Link>
          <Link href="/shop?category=accessories" className="category-card">
            <div className="category-card-bg" />
            <div className="category-card-content">
              <h3 className="category-card-title">Accessories</h3>
              <span className="category-card-link">Shop Now →</span>
            </div>
          </Link>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials">
        <div className="testimonials-header">
          <p className="testimonials-eyebrow">Customer Reviews</p>
          <h2 className="testimonials-title">What families are saying</h2>
        </div>
        <div className="testimonials-grid">
          <div className="testimonial-card">
            <div className="testimonial-stars">★★★★★</div>
            <p className="testimonial-text">&quot;Absolutely love our Buggy Basket. It fits perfectly on our pram and holds everything we need for a day out. The quality is outstanding.&quot;</p>
            <div className="testimonial-author">
              <div className="testimonial-avatar">S</div>
              <div>
                <p className="testimonial-name">Sarah M.</p>
                <p className="testimonial-location">Edinburgh, Scotland</p>
              </div>
            </div>
          </div>
          <div className="testimonial-card">
            <div className="testimonial-stars">★★★★★</div>
            <p className="testimonial-text">&quot;Bought this as a gift for my sister and she absolutely loves it. Looks great, super sturdy and delivery was really fast.&quot;</p>
            <div className="testimonial-author">
              <div className="testimonial-avatar">J</div>
              <div>
                <p className="testimonial-name">James T.</p>
                <p className="testimonial-location">Glasgow, Scotland</p>
              </div>
            </div>
          </div>
          <div className="testimonial-card">
            <div className="testimonial-stars">★★★★★</div>
            <p className="testimonial-text">&quot;We&apos;ve tried a few pram baskets and this is by far the best. The design is sleek and it&apos;s so practical for everyday use.&quot;</p>
            <div className="testimonial-author">
              <div className="testimonial-avatar">E</div>
              <div>
                <p className="testimonial-name">Emma R.</p>
                <p className="testimonial-location">London, England</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Story */}
      <section className="brand-story">
        <div className="brand-story-inner">
          <p className="brand-story-eyebrow">Our Story</p>
          <h2 className="brand-story-title">We believe every family deserves better.</h2>
          <div className="brand-story-columns">
            <p className="brand-story-text">Buggy Basket was born out of a simple idea — parents deserve products that are as practical as they are beautiful. We design premium pram baskets that fit seamlessly into your everyday life.</p>
            <p className="brand-story-text">Every basket is crafted with care, built to last, and designed with the modern family in mind. From busy city streets to countryside walks, we&apos;ve got you covered.</p>
          </div>
          <Link href="/about" className="brand-story-btn">Read More</Link>
        </div>
      </section>

      {/* Product Spotlight */}
      <section className="spotlight">
        <div className="spotlight-bg" />
        <div className="spotlight-content">
          <p className="spotlight-eyebrow">Featured Product</p>
          <h2 className="spotlight-title">The Classic.<br />Reimagined.</h2>
          <p className="spotlight-text">Our best-selling pram basket. Handcrafted, lightweight, and built to go wherever you go.</p>
          <div className="spotlight-actions">
            <Link href="/shop" className="spotlight-btn-primary">Shop Now</Link>
            <Link href="/shop" className="spotlight-btn-secondary">Learn More</Link>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="newsletter">
        <div className="newsletter-content">
          <p className="newsletter-eyebrow">Stay in the loop</p>
          <h2 className="newsletter-title">Get exclusive deals &amp; updates</h2>
          <p className="newsletter-text">Join thousands of families who get our latest products, offers and parenting tips straight to their inbox.</p>
          <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Enter your email address"
              className="newsletter-input"
              required
            />
            <button type="submit" className="newsletter-btn">Subscribe</button>
          </form>
          <p className="newsletter-disclaimer">No spam, ever. Unsubscribe at any time.</p>
        </div>
      </section>

    </main>
  );
}