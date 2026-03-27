'use client';

import { useState } from 'react';
import { PackageSearch } from "lucide-react";
import { PackagePlus } from "lucide-react";
import { BadgePoundSterling } from "lucide-react";
import { UserRoundCog } from "lucide-react";
import { UserSearch } from "lucide-react";
import { FileClock } from "lucide-react";
import { LayoutDashboard } from "lucide-react";

export default function AddNewProduct() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    image: '',
    featured: false,
    outOfStock: false,
  });
  const [imagePreview, setImagePreview] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const target = e.target;
    const { name, value, type, files } = target as any;
    const checked = (target as HTMLInputElement).checked || false;

    if (type === 'file' && files && files[0]) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
      setFormData(prev => ({
        ...prev,
        [name]: file,
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value,
      }));
    }
  };

  return (
    <main>
      <div className="page">
        <div className="page-container">
          <section className="admin-sidenav">
            <nav className="admin-nav">
              <ul>
                <li>
                  <a href="/admin-panel">
                    <LayoutDashboard />
                    Dashboard
                  </a>
                </li>
                <li>
                  <a href="/admin/products">
                    <PackageSearch />
                    Manage Products
                  </a>
                </li>
                <li>
                  <a href="/admin-panel/admin-add-new-product">
                    <PackagePlus />
                    Add Product
                  </a>
                </li>
                <li>
                  <a href="/admin/analytics">
                    <BadgePoundSterling />
                    Sales Analytics
                  </a>
                </li>
                <li>
                  <a href="/admin/manage-users">
                    <UserRoundCog />
                    Manage Users
                  </a>
                </li>
                <li>
                  <a href="/admin/user-audit">
                    <UserSearch />
                    User Audit
                  </a>
                </li>
                <li>
                  <a href="/admin/edit-log">
                    <FileClock />
                    Admin Edit Log
                  </a>
                </li>
              </ul>
            </nav>
          </section>
          <section className="admin-panel">
            <section className="admin-content">
              <div className="admin-form">
                <h2>Add a New Product</h2>
                <form className="admin-form">
                  <label htmlFor="product-name">Product Name:</label>
                  <input
                    type="text"
                    className="modal-input"
                    id="product-name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                  <label htmlFor="product-description">Description:</label>
                  <textarea
                    className="modal-input"
                    id="product-description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                  ></textarea>
                  <label htmlFor="product-price">Price:</label>
                  <input
                    type="number"
                    className="modal-input"
                    id="product-price"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    required
                  />
                  <label htmlFor="product-category">Category:</label>
                  <input
                    type="text"
                    className="modal-input"
                    id="product-category"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                  />
                  <label htmlFor="product-image">Product Image:</label>
                  <input
                    type="file"
                    className="modal-input"
                    id="product-image"
                    name="image"
                    accept="image/*"
                    onChange={handleInputChange}
                    required
                  />
                  <label htmlFor="product-featured">Featured:</label>
                  <input
                    type="checkbox"
                    className="modal-input"
                    id="product-featured"
                    name="featured"
                    checked={formData.featured}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="product-out-of-stock">Out of Stock:</label>
                  <input
                    type="checkbox"
                    className="modal-input"
                    id="product-out-of-stock"
                    name="outOfStock"
                    checked={formData.outOfStock}
                    onChange={handleInputChange}
                  />
                  <button className="product-card-btn" type="submit">
                    Add Product
                  </button>
                </form>
              </div>

              <div className="preview-product">
                <h3>Product Preview</h3>
                <div className="product-card" style={{ backgroundImage: `url(${imagePreview})` }}>
                  <div className="product-card-image">
                    {formData.outOfStock ? (
                      <span className="product-card-tag" style={{ background: '#EF626C', color: '#fff' }}>Out of Stock</span>
                    ) : null}
                  </div>
                  <div className="product-card-body">
                    <h3 className="product-card-name">{formData.name || 'Product Name'}</h3>
                    <div className="product-card-footer">
                      <span className="product-card-price">£{formData.price ? parseFloat(formData.price).toFixed(2) : '0.00'}</span>
                      <button
                        className="product-card-btn"
                        disabled={formData.outOfStock}
                      >
                        {formData.outOfStock ? 'Out of Stock' : 'Add to Basket'}
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