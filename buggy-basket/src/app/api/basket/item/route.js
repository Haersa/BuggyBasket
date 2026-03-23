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

// PUT - update quantity (?itemId=)
export async function PUT(request) {
  const user = getUserFromToken(request);
  if (!user) return NextResponse.json({ error: 'Unauthorised.' }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const itemId = searchParams.get('itemId');
  const { quantity } = await request.json();

  if (!itemId) return NextResponse.json({ error: 'Item ID required.' }, { status: 400 });
  if (quantity < 1) return NextResponse.json({ error: 'Quantity must be at least 1.' }, { status: 400 });

  const item = db.prepare('SELECT id FROM basket WHERE id = ? AND user_id = ?').get(itemId, user.id);
  if (!item) return NextResponse.json({ error: 'Item not found.' }, { status: 404 });

  db.prepare('UPDATE basket SET quantity = ? WHERE id = ?').run(quantity, itemId);
  return NextResponse.json({ success: true });
}

// DELETE - remove single item (?itemId=)
export async function DELETE(request) {
  const user = getUserFromToken(request);
  if (!user) return NextResponse.json({ error: 'Unauthorised.' }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const itemId = searchParams.get('itemId');

  if (!itemId) return NextResponse.json({ error: 'Item ID required.' }, { status: 400 });

  const item = db.prepare('SELECT id FROM basket WHERE id = ? AND user_id = ?').get(itemId, user.id);
  if (!item) return NextResponse.json({ error: 'Item not found.' }, { status: 404 });

  db.prepare('DELETE FROM basket WHERE id = ?').run(itemId);
  return NextResponse.json({ success: true });
}