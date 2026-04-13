"use client";

import { useState } from "react";
import { PackageSearch } from "lucide-react";
import { PackagePlus } from "lucide-react";
import { BadgePoundSterling } from "lucide-react";
import { UserRoundCog } from "lucide-react";
import { UserSearch } from "lucide-react";
import { FileClock } from "lucide-react";
import { LayoutDashboard } from "lucide-react";

export default function ProductsList() {
  const placeholderimagelink = "https://picsum.photos/id/237/250";

  const products = [
    {
      id: 1,
      name: "Product 1",
      description: "Description of Product 1",
      price: 19.99,
      category: "Category A",
      image: placeholderimagelink,
    },
    {
      id: 2,
      name: "Product 2",
      description: "Description of Product 2",
      price: 29.99,
      category: "Category B",
      image: placeholderimagelink,
    },
    {
      id: 3,
      name: "Product 3",
      description: "Description of Product 3",
      price: 39.99,
      category: "Category A",
      image: placeholderimagelink,
    },
    {
      id: 4,
      name: "Product 4",
      description: "Description of Product 4",
      price: 49.99,
      category: "Category C",
      image: placeholderimagelink,
    },
    {
      id: 5,
      name: "Product 5",
      description: "Description of Product 5",
      price: 59.99,
      category: "Category B",
      image: placeholderimagelink,
    },
    {
      id: 6,
      name: "Product 6",
      description: "Description of Product 6",
      price: 69.99,
      category: "Category A",
      image: placeholderimagelink,
    },
  ];

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
                  <a href="/admin-panel/products">
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
                  <a href="/admin-panel/analytics">
                    <BadgePoundSterling />
                    Sales Analytics
                  </a>
                </li>
                <li>
                  <a href="/admin-panel/manage-users">
                    <UserRoundCog />
                    Manage Users
                  </a>
                </li>
                <li>
                  <a href="/admin-panel/user-audit">
                    <UserSearch />
                    User Audit
                  </a>
                </li>
                <li>
                  <a href="/admin-panel/edit-log">
                    <FileClock />
                    Admin Edit Log
                  </a>
                </li>
              </ul>
            </nav>
          </section>
          <section className="admin-panel">
            <section className="admin-content">
              <div className="products-container">
                <h2>Products</h2>
                
                  <ul className="products-list">
                    {products.map((product) => (
                      <li key={product.id} className="product-item">
                        <h3>{product.name}</h3>
                        <img src={product.image} alt={product.name} />
                        <p>{product.description}</p>
                        <p>£{product.price.toFixed(2)}</p>
                        <p>Category: {product.category}</p>
                        <div className="product-buttons">
                          <button className="product-card-btn">Edit</button>
                          <button className="product-card-btn">Delete</button>
                        </div>
                      </li>
                    ))}
                  </ul>
                
              </div>
              <div className="edit-product-form">
                <h2>Edit Product</h2>
                <form className="admin-form">
                  <label htmlFor="product-name">Product Name:</label>
                  <input type="text" id="product-name" name="product-name" className="modal-input" />
                  <label htmlFor="product-description">Description:</label>
                  <textarea id="product-description" name="product-description" className="modal-input"></textarea>
                  <label htmlFor="product-price">Price:</label>
                  <input type="number" id="product-price" name="product-price" step="0.01" className="modal-input" />
                  <label htmlFor="product-category">Category:</label>
                  <input type="text" id="product-category" name="product-category" className="modal-input" />
                  <button type="submit" className="product-card-btn">Save Changes</button>
                </form>
              </div>
            </section>
          </section>
        </div>
      </div>
    </main>
  );
}
