"use client";

import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Image from 'next/image';
import AdminSidebar from '../components/AdminSidebar';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  colour: string;
  image_url: string | null;
  quantity: number;
  featured: number;
}

interface EditForm {
  name: string;
  description: string;
  price: string;
  category: string;
  colour: string;
  quantity: string;
  featured: boolean;
}

export default function ProductsList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [editForm, setEditForm] = useState<EditForm | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [submitting, setSubmitting] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Product | null>(null);

  useEffect(() => {
    fetch('/api/admin/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      });
  }, []);

  const handleEditClick = (product: Product) => {
    setSelectedProduct(product);
    setEditForm({
      name: product.name,
      description: product.description || '',
      price: String(product.price),
      category: product.category || '',
      colour: product.colour || '',
      quantity: String(product.quantity),
      featured: product.featured === 1,
    });
    setImageFile(null);
    setImagePreview(product.image_url || '');
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
    setEditForm(null);
    setImageFile(null);
    setImagePreview('');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const target = e.target;
    const { name, value, type } = target;
    const checked = (target as HTMLInputElement).checked;
    const files = (target as HTMLInputElement).files;

    if (type === 'file' && files && files[0]) {
      const file = files[0];
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (e) => setImagePreview(e.target?.result as string);
      reader.readAsDataURL(file);
    } else {
      setEditForm(prev => prev ? ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value,
      }) : null);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProduct || !editForm) return;
    setSubmitting(true);

    try {
      const data = new FormData();
      data.append('name', editForm.name);
      data.append('description', editForm.description);
      data.append('price', editForm.price);
      data.append('category', editForm.category);
      data.append('colour', editForm.colour);
      data.append('quantity', editForm.quantity);
      data.append('featured', String(editForm.featured));
      if (imageFile) data.append('image', imageFile);

      const res = await fetch(`/api/admin/products/${selectedProduct.id}`, {
        method: 'PATCH',
        body: data,
      });

      if (res.ok) {
        const updated = await res.json();
        setProducts(prev => prev.map(p => p.id === updated.id ? updated : p));
        toast.success('Product updated successfully.');
        handleCloseModal();
      } else {
        const err = await res.json();
        toast.error(err.error || 'Failed to update product.');
      }
    } catch {
      toast.error('Network error. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;

    const res = await fetch(`/api/admin/products/${deleteTarget.id}`, { method: 'DELETE' });
    if (res.ok) {
      setProducts(prev => prev.filter(p => p.id !== deleteTarget.id));
      toast.success('Product deleted.');
      setDeleteTarget(null);
    } else {
      toast.error('Failed to delete product.');
    }
  };

  return (
    <main>
      <div className="page">
        <div className="page-container">
          <AdminSidebar />
          <section className="admin-panel">
            <section className="admin-users-header">
              <h2>Manage Products</h2>
            </section>

            {loading ? (
              <p>Loading products...</p>
            ) : (
              <div className="admin-products-grid">
                {products.map(product => (
                  <div key={product.id} className="admin-product-card">
                    <div className="admin-product-card-image">
                      {product.image_url ? (
                        <Image
                          src={product.image_url}
                          alt={product.name}
                          fill
                          style={{ objectFit: 'cover' }}
                        />
                      ) : (
                        <div className="admin-product-card-placeholder" />
                      )}
                      {product.featured === 1 && (
                        <span className="admin-product-badge admin-product-badge-featured">Featured</span>
                      )}
                      {product.quantity === 0 && (
                        <span className="admin-product-badge admin-product-badge-oos">Out of Stock</span>
                      )}
                    </div>
                    <div className="admin-product-card-body">
                      <div className="admin-product-card-info">
                        <h3>{product.name}</h3>
                        <p className="admin-product-card-meta">
                          {product.category && <span>{product.category.charAt(0).toUpperCase() + product.category.slice(1)}</span>}
                          {product.colour && <span>{product.colour.charAt(0).toUpperCase() + product.colour.slice(1)}</span>}
                        </p>
                        <p className="admin-product-card-price">£{product.price.toFixed(2)}</p>
                        <p className="admin-product-card-qty">Qty: {product.quantity}</p>
                      </div>
                      <div className="admin-product-card-actions">
                        <button
                          className="admin-users-button"
                          onClick={() => handleEditClick(product)}
                        >
                          Edit
                        </button>
                        <button
                          className="admin-product-delete-btn"
                          onClick={() => setDeleteTarget(product)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>

      {selectedProduct && editForm && (
        <>
          <div className="admin-modal-overlay" onClick={handleCloseModal} />
          <div className="admin-modal">
            <div className="admin-modal-header">
              <h3>Edit Product</h3>
              <button className="admin-modal-close" onClick={handleCloseModal}>✕</button>
            </div>
            <div className="admin-modal-body">
              <form onSubmit={handleSave} className="admin-product-form">
                <div className="modal-field">
                  <label className="modal-label" htmlFor="edit-name">Product Name</label>
                  <input
                    type="text"
                    className="modal-input"
                    id="edit-name"
                    name="name"
                    value={editForm.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="modal-field">
                  <label className="modal-label" htmlFor="edit-description">Description</label>
                  <textarea
                    className="modal-input"
                    id="edit-description"
                    name="description"
                    value={editForm.description}
                    onChange={handleInputChange}
                    rows={3}
                  />
                </div>
                <div className="admin-product-form-row">
                  <div className="modal-field">
                    <label className="modal-label" htmlFor="edit-price">Price (£)</label>
                    <input
                      type="number"
                      className="modal-input"
                      id="edit-price"
                      name="price"
                      value={editForm.price}
                      onChange={handleInputChange}
                      step="0.01"
                      min="0"
                      required
                    />
                  </div>
                  <div className="modal-field">
                    <label className="modal-label" htmlFor="edit-quantity">Quantity</label>
                    <input
                      type="number"
                      className="modal-input"
                      id="edit-quantity"
                      name="quantity"
                      value={editForm.quantity}
                      onChange={handleInputChange}
                      min="0"
                      required
                    />
                  </div>
                </div>
                <div className="admin-product-form-row">
                  <div className="modal-field">
                    <label className="modal-label" htmlFor="edit-category">Category</label>
                    <select
                      className="modal-input"
                      id="edit-category"
                      name="category"
                      value={editForm.category}
                      onChange={handleInputChange}
                    >
                      <option value="">Select a category</option>
                      <option value="newborn">Newborn</option>
                      <option value="toddler">Toddler</option>
                      <option value="accessories">Accessories</option>
                    </select>
                  </div>
                  <div className="modal-field">
                    <label className="modal-label" htmlFor="edit-colour">Colour</label>
                    <select
                      className="modal-input"
                      id="edit-colour"
                      name="colour"
                      value={editForm.colour}
                      onChange={handleInputChange}
                    >
                      <option value="">Select a colour</option>
                      <option value="black">Black</option>
                      <option value="brown">Brown</option>
                      <option value="beige">Beige</option>
                      <option value="grey">Grey</option>
                      <option value="natural">Natural</option>
                    </select>
                  </div>
                </div>
                <div className="modal-field">
                  <label className="modal-label">Current Image</label>
                  {imagePreview ? (
                    <div className="admin-modal-image-preview">
                      <Image
                        src={imagePreview}
                        alt="Product"
                        fill
                        style={{ objectFit: 'cover' }}
                      />
                    </div>
                  ) : (
                    <div className="admin-modal-image-preview admin-modal-image-empty" />
                  )}
                </div>
                <div className="modal-field">
                  <label className="modal-label" htmlFor="edit-image">Replace Image</label>
                  <input
                    type="file"
                    className="modal-input"
                    id="edit-image"
                    name="image"
                    accept="image/*"
                    onChange={handleInputChange}
                  />
                </div>
                <div className="admin-product-form-check">
                  <label className="modal-label" htmlFor="edit-featured">
                    <input
                      type="checkbox"
                      id="edit-featured"
                      name="featured"
                      checked={editForm.featured}
                      onChange={handleInputChange}
                    />
                    Featured product
                  </label>
                </div>
                <div className="admin-modal-footer">
                  <button type="button" className="admin-modal-cancel-btn" onClick={handleCloseModal}>
                    Cancel
                  </button>
                  <button type="submit" className="admin-users-button" disabled={submitting}>
                    {submitting ? (
                      <>
                        <span className="admin-btn-spinner" />
                        Saving...
                      </>
                    ) : 'Save Changes'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}

      {deleteTarget && (
        <>
          <div className="admin-modal-overlay" onClick={() => setDeleteTarget(null)} />
          <div className="admin-modal admin-modal-confirm">
            <div className="admin-modal-header">
              <h3>Delete Product</h3>
              <button className="admin-modal-close" onClick={() => setDeleteTarget(null)}>✕</button>
            </div>
            <div className="admin-modal-body">
              <p className="admin-modal-confirm-text">
                Are you sure you want to delete <strong>{deleteTarget.name}</strong>? This action cannot be undone.
              </p>
              <div className="admin-modal-footer">
                <button
                  type="button"
                  className="admin-modal-cancel-btn"
                  onClick={() => setDeleteTarget(null)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="admin-product-delete-btn admin-product-delete-btn-confirm"
                  onClick={handleDelete}
                >
                  Delete Product
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </main>
  );
}