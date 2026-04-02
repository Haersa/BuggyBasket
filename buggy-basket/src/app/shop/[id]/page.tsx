'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useBasket } from '../../context/BasketContext';
import { toast } from 'react-toastify';
import { ArrowLeft, ShoppingBasket, Tag, Ruler, Weight, Layers } from 'lucide-react';

type Product = {
  id: number;
  name: string;
  description: string | null;
  price: number;
  category: string | null;
  colour: string | null;
  image_url: string | null;
  quantity: number;
  featured: number;
  out_of_stock: number;
  dimensions: string | null;
  weight: string | null;
  material: string | null;
  created_at: string;
};

export default function ProductDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { addItem } = useBasket();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    fetch(`/api/products/single?id=${id}`)
      .then((res) => {
        if (!res.ok) router.push('/shop');
        return res.json();
      })
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch(() => router.push('/shop'));
  }, [id]);

  const handleAddToBasket = async () => {
    if (!product) return;
    setAdding(true);
    const success = await addItem(product.id, quantity, {
      name: product.name,
      price: product.price,
      image_url: product.image_url,
    });
    if (success) {
      toast.success('Item added to basket!');
    } else {
      toast.error('Failed to add item to basket.');
    }
    setAdding(false);
  };

  if (loading) {
    return (
      <div className="product-detail-loading">
        <p>Loading...</p>
      </div>
    );
  }

  if (!product) return null;

  return (
    <div className="product-detail-page">
      <div className="product-detail-container">

        {/* Back link */}
        <Link href="/shop" className="product-detail-back">
          <ArrowLeft size={16} />
          Back to Shop
        </Link>

        <div className="product-detail-layout">

          {/* Image */}
          <div className="product-detail-image">
            {product.image_url ? (
              <img src={product.image_url} alt={product.name} />
            ) : (
              <div className="product-detail-image-placeholder" />
            )}
            {product.out_of_stock ? (
              <span className="product-detail-badge out-of-stock">Out of Stock</span>
            ) : product.featured ? (
              <span className="product-detail-badge featured">Featured</span>
            ) : null}
          </div>

          {/* Info */}
          <div className="product-detail-info">
            {product.category && (
              <p className="product-detail-category">{product.category}</p>
            )}
            <h1 className="product-detail-name">{product.name}</h1>
            <p className="product-detail-price">£{product.price.toFixed(2)}</p>

            {product.description && (
              <p className="product-detail-description">{product.description}</p>
            )}

            {/* Specs */}
            {(product.colour || product.material || product.dimensions || product.weight) && (
              <div className="product-detail-specs">
                <h3 className="product-detail-specs-title">Product Details</h3>
                <div className="product-detail-specs-grid">
                  {product.colour && (
                    <div className="product-detail-spec">
                      <Tag size={14} />
                      <span className="spec-label">Colour</span>
                      <span className="spec-value">{product.colour}</span>
                    </div>
                  )}
                  {product.material && (
                    <div className="product-detail-spec">
                      <Layers size={14} />
                      <span className="spec-label">Material</span>
                      <span className="spec-value">{product.material}</span>
                    </div>
                  )}
                  {product.dimensions && (
                    <div className="product-detail-spec">
                      <Ruler size={14} />
                      <span className="spec-label">Dimensions</span>
                      <span className="spec-value">{product.dimensions}</span>
                    </div>
                  )}
                  {product.weight && (
                    <div className="product-detail-spec">
                      <Weight size={14} />
                      <span className="spec-label">Weight</span>
                      <span className="spec-value">{product.weight}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Quantity + Add to Basket */}
            {!product.out_of_stock ? (
              <div className="product-detail-actions">
                <div className="product-detail-qty">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    disabled={quantity <= 1}
                    className="qty-btn"
                  >
                    −
                  </button>
                  <span className="qty-value">{quantity}</span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="qty-btn"
                  >
                    +
                  </button>
                </div>
                <button
                  className="product-detail-add-btn"
                  onClick={handleAddToBasket}
                  disabled={adding}
                >
                  <ShoppingBasket size={18} />
                  {adding ? 'Adding...' : 'Add to Basket'}
                </button>
              </div>
            ) : (
              <div className="product-detail-out-of-stock">
                <p>This product is currently out of stock.</p>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}