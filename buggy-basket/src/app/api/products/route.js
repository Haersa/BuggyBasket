import { NextResponse } from 'next/server';
import db from '../../../lib/db';

// GET all products
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const featured = searchParams.get('featured');

  let query = 'SELECT * FROM products';
  const params = [];

  if (category && featured) {
    query += ' WHERE category = ? AND featured = ?';
    params.push(category, 1);
  } else if (category) {
    query += ' WHERE category = ?';
    params.push(category);
  } else if (featured) {
    query += ' WHERE featured = 1';
  }

  query += ' ORDER BY created_at DESC';

  const products = db.prepare(query).all(...params);
  return NextResponse.json(products);
}

// POST - create a product (admin only)
export async function POST(request) {
  const { name, description, price, category, image_url, quantity, featured } = await request.json();

  if (!name || !price) {
    return NextResponse.json({ error: 'Name and price are required.' }, { status: 400 });
  }

  const stmt = db.prepare(`
    INSERT INTO products (name, description, price, category, image_url, quantity, featured)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

  const result = stmt.run(
    name,
    description || null,
    price,
    category || null,
    image_url || null,
    quantity ?? 0,
    featured ? 1 : 0
  );

  return NextResponse.json({ id: result.lastInsertRowid }, { status: 201 });
}