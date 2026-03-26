'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { PackageSearch } from 'lucide-react';
import Link from 'next/link';

const placeholderOrders = [
  {
    id: 'BB-001234',
    date: '12 March 2026',
    status: 'Delivered',
    total: '£74.98',
    items: [
      { name: 'Classic Pram Basket', qty: 1, price: '£29.99' },
      { name: 'Urban Pram Basket', qty: 1, price: '£44.99' },
    ],
  },
  {
    id: 'BB-001198',
    date: '28 February 2026',
    status: 'Processing',
    total: '£39.99',
    items: [
      { name: 'Deluxe Storage Basket', qty: 1, price: '£39.99' },
    ],
  },
  {
    id: 'BB-001102',
    date: '14 January 2026',
    status: 'Delivered',
    total: '£49.99',
    items: [
      { name: 'Premium Wicker Basket', qty: 1, price: '£49.99' },
    ],
  },
];

const STATUS_STYLES: Record<string, string> = {
  Delivered: 'order-status-delivered',
  Processing: 'order-status-processing',
  Cancelled: 'order-status-cancelled',
};

export default function OrdersPage() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) router.push('/');
  }, []);

  return (
    <div className="orders-page">
      <div className="orders-container">

        <div className="orders-header">
          <h1 className="orders-title">My Orders</h1>
          <p className="orders-subtitle">Your order history.</p>
        </div>

        <div className="orders-notice">
          <PackageSearch size={18} />
          <p>These are placeholder orders for demonstration purposes. To give you an idea on what it could look like.</p>
        </div>

        <div className="orders-list">
          {placeholderOrders.map((order) => (
            <div key={order.id} className="order-card">
              <div className="order-card-header">
                <div className="order-card-meta">
                  <p className="order-id">Order {order.id}</p>
                  <p className="order-date">{order.date}</p>
                </div>
                <div className="order-card-right">
                  <span className={`order-status ${STATUS_STYLES[order.status]}`}>{order.status}</span>
                  <p className="order-total">{order.total}</p>
                </div>
              </div>
              <div className="order-items">
                {order.items.map((item, i) => (
                  <div key={i} className="order-item">
                    <div className="order-item-image" />
                    <div className="order-item-details">
                      <p className="order-item-name">{item.name}</p>
                      <p className="order-item-qty">Qty: {item.qty}</p>
                    </div>
                    <p className="order-item-price">{item.price}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="orders-cta">
          <Link href="/shop" className="orders-shop-btn">Continue Shopping</Link>
        </div>

      </div>
    </div>
  );
}