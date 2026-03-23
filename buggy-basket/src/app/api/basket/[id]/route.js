import { NextResponse } from 'next/server';
import db from '../../../../lib/db';
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

// PUT - update quantity of a basket item
export async function PUT(request, { params }) {
  const user = getUserFromToken(request);
  if (!user) return NextResponse.json({ error: 'Unauthorised.' }, { status: 401 });

  const { quantity } = await request.json();

  if (quantity < 1) {
    return NextResponse.json({ error: 'Quantity must be at least 1.' }, { status: 400 });
  }

  const item = db.prepare('SELECT id FROM basket WHERE id = ? AND user_id = ?').get(params.id, user.id);
  if (!item) return NextResponse.json({ error: 'Item not found.' }, { status: 404 });

  db.prepare('UPDATE basket SET quantity = ? WHERE id = ?').run(quantity, params.id);
  return NextResponse.json({ success: true });
}

// DELETE - remove a single item from basket
export async function DELETE(request, { params }) {
  const user = getUserFromToken(request);
  if (!user) return NextResponse.json({ error: 'Unauthorised.' }, { status: 401 });

  const item = db.prepare('SELECT id FROM basket WHERE id = ? AND user_id = ?').get(params.id, user.id);
  if (!item) return NextResponse.json({ error: 'Item not found.' }, { status: 404 });

  db.prepare('DELETE FROM basket WHERE id = ?').run(params.id);
  return NextResponse.json({ success: true });
}