'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { SlidersHorizontal, X } from 'lucide-react';
import { useBasket } from '../context/BasketContext';
import { toast } from 'react-toastify';
import Link from 'next/link';

const CATEGORIES = ['All', 'Newborn', 'Toddler', 'Accessories'];
const COLOURS = ['All', 'Black', 'Brown', 'Beige', 'Grey', 'Natural'];
const SORT_OPTIONS = [
  { label: 'Newest', value: 'newest' },
  { label: 'Oldest', value: 'oldest' },
  { label: 'Price: Low to High', value: 'price_asc' },
  { label: 'Price: High to Low', value: 'price_desc' },
  { label: 'Most Popular', value: 'popular' },
];

export default function ShopPage() {
  const { addItem } = useBasket();
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [filters, setFilters] = useState({
    category: 'All',
    colour: 'All',
    minPrice: '',
    maxPrice: '',
    inStockOnly: false,
    sort: 'newest',
  });

  const searchParams = useSearchParams();

  useEffect(() => {
    fetch('/api/products')
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setFiltered(data);
      });
  }, []);

  useEffect(() => {
    const category = searchParams.get('category');
    if (category) {
      const capitalised = category.charAt(0).toUpperCase() + category.slice(1);
      setFilters((prev) => ({ ...prev, category: capitalised }));
    }
  }, [searchParams]);

  useEffect(() => {
    let result = [...products];

    if (filters.category !== 'All') {
      result = result.filter((p) => p.category?.toLowerCase() === filters.category.toLowerCase());
    }

    if (filters.colour !== 'All') {
      result = result.filter((p) => p.colour?.toLowerCase() === filters.colour.toLowerCase());
    }

    if (filters.minPrice !== '') {
      result = result.filter((p) => p.price >= parseFloat(filters.minPrice));
    }

    if (filters.maxPrice !== '') {
      result = result.filter((p) => p.price <= parseFloat(filters.maxPrice));
    }

    if (filters.inStockOnly) {
      result = result.filter((p) => !p.out_of_stock);
    }

    switch (filters.sort) {
      case 'newest':
        result.sort((a, b) => b.id - a.id);
        break;
      case 'oldest':
        result.sort((a, b) => a.id - b.id);
        break;
      case 'price_asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price_desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'popular':
        result.sort((a, b) => b.featured - a.featured);
        break;
    }

    setFiltered(result);
  }, [filters, products]);

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

  const resetFilters = () => {
    setFilters({
      category: 'All',
      colour: 'All',
      minPrice: '',
      maxPrice: '',
      inStockOnly: false,
      sort: 'newest',
    });
  };

  const activeFilterCount = [
    filters.category !== 'All',
    filters.colour !== 'All',
    filters.minPrice !== '',
    filters.maxPrice !== '',
    filters.inStockOnly,
  ].filter(Boolean).length;

  return (
    <div className="shop-page">

      {/* Mobile filter overlay */}
      {sidebarOpen && (
        <div className="shop-sidebar-overlay" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`shop-sidebar ${sidebarOpen ? 'shop-sidebar-open' : ''}`}>
        <div className="shop-sidebar-header">
          <h2 className="shop-sidebar-title">Filters</h2>
          <div className="shop-sidebar-header-actions">
            {activeFilterCount > 0 && (
              <button className="shop-clear-filters" onClick={resetFilters}>
                Clear all
              </button>
            )}
            <button className="shop-sidebar-close" onClick={() => setSidebarOpen(false)}>
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Price Range */}
<div className="shop-filter-section">
  <h3 className="shop-filter-label">Price Range</h3>
  <div className="shop-price-range">
    <input
      type="number"
      placeholder="£0"
      className="shop-price-input"
      value={filters.minPrice}
      onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
    />
    <span className="shop-price-separator">—</span>
    <input
      type="number"
      placeholder="£500"
      className="shop-price-input"
      value={filters.maxPrice}
      onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
    />
  </div>
</div>

{/* Category */}
<div className="shop-filter-section">
  <h3 className="shop-filter-label">Category</h3>
  <div className="shop-filter-options">
    {CATEGORIES.map((cat) => (
      <button
        key={cat}
        className={`shop-filter-option ${filters.category === cat ? 'active' : ''}`}
        onClick={() => setFilters({ ...filters, category: cat })}
      >
        {cat}
      </button>
    ))}
  </div>
</div>

{/* Colour */}
<div className="shop-filter-section">
  <h3 className="shop-filter-label">Colour</h3>
  <div className="shop-filter-options">
    {COLOURS.map((colour) => (
      <button
        key={colour}
        className={`shop-filter-option ${filters.colour === colour ? 'active' : ''}`}
        onClick={() => setFilters({ ...filters, colour: colour })}
      >
        {colour}
      </button>
    ))}
  </div>
</div>

{/* In Stock */}
<div className="shop-filter-section">
  <label className="shop-filter-toggle">
    <input
      type="checkbox"
      checked={filters.inStockOnly}
      onChange={(e) => setFilters({ ...filters, inStockOnly: e.target.checked })}
    />
    <span>In stock only</span>
  </label>
</div>
      </aside>

      {/* Main Content */}
      <div className="shop-main">
      <div className="shop-toolbar">
  <div className="shop-toolbar-left">
    <button className="shop-filter-btn" onClick={() => setSidebarOpen(true)}>
      <SlidersHorizontal size={16} />
      Filters
      {activeFilterCount > 0 && (
        <span className="shop-filter-count">{activeFilterCount}</span>
      )}
    </button>
    <p className="shop-results-count">{filtered.length} products</p>
  </div>
  <div className="shop-toolbar-right">
    <select
      className="shop-sort-select"
      value={filters.sort}
      onChange={(e) => setFilters({ ...filters, sort: e.target.value })}
    >
      {SORT_OPTIONS.map((opt) => (
        <option key={opt.value} value={opt.value}>{opt.label}</option>
      ))}
    </select>
  </div>
</div>

        {filtered.length === 0 ? (
          <div className="shop-empty">
            <p>No products match your filters.</p>
            <button className="shop-clear-filters" onClick={resetFilters}>Clear filters</button>
          </div>
        ) : (
          <div className="shop-grid">
            {filtered.map((product) => (
              <Link href={`/shop/${product.id}`} key={product.id} className="product-card">
  <div className="product-card-image">
    {product.out_of_stock ? (
      <span className="product-card-tag" style={{ background: 'var(--error)', color: '#fff' }}>Out of Stock</span>
    ) : product.featured ? (
      <span className="product-card-tag">Featured</span>
    ) : null}
  </div>
  <div className="product-card-body">
    <h3 className="product-card-name">{product.name}</h3>
    {product.colour && (
      <p className="product-card-colour">{product.colour}</p>
    )}
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
            ))}
          </div>
        )}
      </div>
    </div>
  );
}