import { NextResponse } from 'next/server';
import db from '../../../lib/db';
import jwt from 'jsonwebtoken';

function getUserFromToken(request) {
  const auth = request.headers.get('authorization');
  if (!auth) return null;
  try {
    const token = auth.split(' ')[1];
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch {
    return null;
  }
}

// GET basket items for logged in user
export async function GET(request) {
  const user = getUserFromToken(request);
  if (!user) return NextResponse.json({ error: 'Unauthorised.' }, { status: 401 });

  const items = db.prepare(`
    SELECT basket.id, basket.quantity, products.name, products.price, 
           products.image_url, products.out_of_stock, products.id as product_id
    FROM basket
    JOIN products ON basket.product_id = products.id
    WHERE basket.user_id = ?
  `).all(user.id);

  return NextResponse.json(items);
}

// POST - add item to basket
export async function POST(request) {
  const user = getUserFromToken(request);
  if (!user) return NextResponse.json({ error: 'Unauthorised.' }, { status: 401 });

  const { product_id, quantity } = await request.json();

  // Check if item already in basket
  const existing = db.prepare('SELECT id, quantity FROM basket WHERE user_id = ? AND product_id = ?').get(user.id, product_id);

  if (existing) {
    db.prepare('UPDATE basket SET quantity = ? WHERE id = ?').run(existing.quantity + (quantity || 1), existing.id);
  } else {
    db.prepare('INSERT INTO basket (user_id, product_id, quantity) VALUES (?, ?, ?)').run(user.id, product_id, quantity || 1);
  }

  return NextResponse.json({ success: true }, { status: 201 });
}

// DELETE - clear entire basket
export async function DELETE(request) {
  const user = getUserFromToken(request);
  if (!user) return NextResponse.json({ error: 'Unauthorised.' }, { status: 401 });

  db.prepare('DELETE FROM basket WHERE user_id = ?').run(user.id);
  return NextResponse.json({ success: true });
}