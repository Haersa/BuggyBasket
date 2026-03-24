const db = require('./db');

db.exec(`
  -- USERS TABLE
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    newsletter INTEGER DEFAULT 0,
    role TEXT DEFAULT 'customer',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  -- PRODUCTS TABLE
  CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT,
    price REAL NOT NULL,
    colour TEXT,
    date_added DATETIME DEFAULT CURRENT_TIMESTAMP,
    weekly_popularity INTEGER DEFAULT 0
  );

  -- PRODUCT IMAGES TABLE
  CREATE TABLE IF NOT EXISTS product_images (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    product_id INTEGER NOT NULL,
    image_url TEXT NOT NULL,
    alt_text TEXT,
    FOREIGN KEY (product_id) REFERENCES products(id)
  );

  -- BASKET TABLE
  CREATE TABLE IF NOT EXISTS basket (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    session_id TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
  );

  -- BASKET ITEMS TABLE
  CREATE TABLE IF NOT EXISTS basket_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    basket_id INTEGER NOT NULL,
    product_id INTEGER NOT NULL,
    quantity INTEGER DEFAULT 1,
    unit_price REAL NOT NULL,
    image_url TEXT,
    FOREIGN KEY (basket_id) REFERENCES basket(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
  );
`);

console.log('Database schema initialised');
