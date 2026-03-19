'use client';

import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const placeholderProducts = [
  { id: 1, name: 'Classic Pram Basket', price: '£29.99', tag: 'Best Seller' },
  { id: 2, name: 'Deluxe Storage Basket', price: '£39.99', tag: 'New' },
  { id: 3, name: 'Compact Carry Basket', price: '£24.99', tag: null },
  { id: 4, name: 'Premium Wicker Basket', price: '£49.99', tag: 'New' },
  { id: 5, name: 'Travel Lite Basket', price: '£34.99', tag: null },
  { id: 6, name: 'Urban Pram Basket', price: '£44.99', tag: 'Best Seller' },
];

export default function Home() {
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
          <h1 className="hero-title">For your baby's needs.</h1>
          <p className="hero-subtitle">Premium pram baskets designed for modern families. Built to last, styled to impress.</p>
          <div className="hero-actions">
            <Link href="/shop" className="hero-btn-primary">Shop Now</Link>
            <Link href="/about" className="hero-btn-secondary">Learn More</Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="featured">
        <div className="featured-header">
          <h2 className="featured-title">Featured Products</h2>
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
          {placeholderProducts.map((product) => (
            <SwiperSlide key={product.id}>
              <div className="product-card">
                <div className="product-card-image">
                  {product.tag && (
                    <span className="product-card-tag">{product.tag}</span>
                  )}
                </div>
                <div className="product-card-body">
                  <h3 className="product-card-name">{product.name}</h3>
                  <div className="product-card-footer">
                    <span className="product-card-price">{product.price}</span>
                    <button className="product-card-btn">Add to Basket</button>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </main>
  );
}