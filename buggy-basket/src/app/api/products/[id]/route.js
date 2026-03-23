import { NextResponse } from 'next/server';
import db from '../../../../lib/db';

// GET single product
export async function GET(request, { params }) {
  const product = db.prepare('SELECT * FROM products WHERE id = ?').get(params.id);

  if (!product) {
    return NextResponse.json({ error: 'Product not found.' }, { status: 404 });
  }

  return NextResponse.json(product);
}

// PUT - update a product (admin only)
export async function PUT(request, { params }) {
  const { name, description, price, category, image_url, quantity, featured } = await request.json();

  const existing = db.prepare('SELECT id FROM products WHERE id = ?').get(params.id);

  if (!existing) {
    return NextResponse.json({ error: 'Product not found.' }, { status: 404 });
  }

  const stmt = db.prepare(`
    UPDATE products
    SET name = ?, description = ?, price = ?, category = ?, image_url = ?, quantity = ?, featured = ?
    WHERE id = ?
  `);

  stmt.run(
    name,
    description || null,
    price,
    category || null,
    image_url || null,
    quantity ?? 0,
    featured ? 1 : 0,
    params.id
  );

  return NextResponse.json({ success: true });
}

// DELETE - delete a product (admin only)
export async function DELETE(request, { params }) {
  const existing = db.prepare('SELECT id FROM products WHERE id = ?').get(params.id);

  if (!existing) {
    return NextResponse.json({ error: 'Product not found.' }, { status: 404 });
  }

  db.prepare('DELETE FROM products WHERE id = ?').run(params.id);

  return NextResponse.json({ success: true });
}