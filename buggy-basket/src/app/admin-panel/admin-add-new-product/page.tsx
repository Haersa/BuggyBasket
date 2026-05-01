'use client';

import { useState } from 'react';
import { toast } from 'react-toastify';
import Image from 'next/image';
import AdminSidebar from '../components/AdminSidebar';

export default function AddNewProduct() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    colour: '',
    quantity: '',
    featured: false,
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [submitting, setSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const target = e.target;
    const { name, value, type } = target;
    const checked = (target as HTMLInputElement).checked || false;
    const files = (target as HTMLInputElement).files;

    if (type === 'file' && files && files[0]) {
      const file = files[0];
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (e) => setImagePreview(e.target?.result as string);
      reader.readAsDataURL(file);
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const data = new FormData();
      data.append('name', formData.name);
      data.append('description', formData.description);
      data.append('price', formData.price);
      data.append('category', formData.category);
      data.append('colour', formData.colour);
      data.append('quantity', formData.quantity);
      data.append('featured', String(formData.featured));
      if (imageFile) data.append('image', imageFile);

      const res = await fetch('/api/admin/products', {
        method: 'POST',
        body: data,
      });

      if (res.ok) {
        toast.success('Product added successfully.');
        setFormData({ name: '', description: '', price: '', category: '', colour: '', quantity: '', featured: false });
        setImageFile(null);
        setImagePreview('');
      } else {
        const err = await res.json();
        toast.error(err.error || 'Failed to add product.');
      }
    } catch (err) {
      toast.error('Network error. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const outOfStock = parseInt(formData.quantity) === 0;

  return (
    <main>
      <div className="page">
        <div className="page-container">
          <AdminSidebar />
          <section className="admin-panel">
            <section className="admin-add-product-layout">
              <div className="admin-add-product">
                <h2>Add a New Product</h2>
                <form onSubmit={handleSubmit} className="admin-product-form">
                  <div className="modal-field">
                    <label className="modal-label" htmlFor="product-name">Product Name</label>
                    <input
                      type="text"
                      className="modal-input"
                      id="product-name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="modal-field">
                    <label className="modal-label" htmlFor="product-description">Description</label>
                    <textarea
                      className="modal-input"
                      id="product-description"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows={4}
                      required
                    />
                  </div>
                  <div className="admin-product-form-row">
                    <div className="modal-field">
                      <label className="modal-label" htmlFor="product-price">Price (£)</label>
                      <input
                        type="number"
                        className="modal-input"
                        id="product-price"
                        name="price"
                        value={formData.price}
                        onChange={handleInputChange}
                        step="0.01"
                        min="0"
                        required
                      />
                    </div>
                    <div className="modal-field">
                      <label className="modal-label" htmlFor="product-quantity">Quantity</label>
                      <input
                        type="number"
                        className="modal-input"
                        id="product-quantity"
                        name="quantity"
                        value={formData.quantity}
                        onChange={handleInputChange}
                        min="0"
                        required
                      />
                    </div>
                  </div>
                  <div className="admin-product-form-row">
                    <div className="modal-field">
                      <label className="modal-label" htmlFor="product-category">Category</label>
                      <select
                        className="modal-input"
                        id="product-category"
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">Select a category</option>
                        <option value="newborn">Newborn</option>
                        <option value="toddler">Toddler</option>
                        <option value="accessories">Accessories</option>
                      </select>
                    </div>
                    <div className="modal-field">
                      <label className="modal-label" htmlFor="product-colour">Colour</label>
                      <select
                        className="modal-input"
                        id="product-colour"
                        name="colour"
                        value={formData.colour}
                        onChange={handleInputChange}
                        required
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
                    <label className="modal-label" htmlFor="product-image">Product Image</label>
                    <input
                      type="file"
                      className="modal-input"
                      id="product-image"
                      name="image"
                      accept="image/*"
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="admin-product-form-check">
                    <label className="modal-label" htmlFor="product-featured">
                      <input
                        type="checkbox"
                        id="product-featured"
                        name="featured"
                        checked={formData.featured}
                        onChange={handleInputChange}
                      />
                      Featured product
                    </label>
                  </div>
                  <button className="admin-users-button" type="submit" disabled={submitting}>
                    {submitting ? (
                      <>
                        <span className="admin-btn-spinner" />
                        Adding...
                      </>
                    ) : 'Add Product'}
                  </button>
                </form>
              </div>

              <div className="preview-product">
                <h3>Product Preview</h3>
                <div className="product-card">
                  <div className="product-card-image">
                    {imagePreview ? (
                      <Image
                        src={imagePreview}
                        alt="Product preview"
                        fill
                        style={{ objectFit: 'cover' }}
                      />
                    ) : (
                      <div className="product-card-image-placeholder" />
                    )}
                    {outOfStock && (
                      <span className="product-card-tag" style={{ background: '#EF626C', color: '#fff' }}>
                        Out of Stock
                      </span>
                    )}
                  </div>
                  <div className="product-card-body">
                    <h3 className="product-card-name">{formData.name || 'Product Name'}</h3>
                    {formData.colour && (
                      <p className="product-card-colour">{formData.colour.charAt(0).toUpperCase() + formData.colour.slice(1)}</p>
                    )}
                    <div className="product-card-footer">
                      <span className="product-card-price">
                        £{formData.price ? parseFloat(formData.price).toFixed(2) : '0.00'}
                      </span>
                      <button className="product-card-btn" disabled={outOfStock}>
                        {outOfStock ? 'Out of Stock' : 'Add to Basket'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </section>
        </div>
      </div>
    </main>
  );
}