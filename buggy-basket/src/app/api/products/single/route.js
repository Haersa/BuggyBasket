import { NextResponse } from 'next/server';
import db from '../../../../lib/db';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) return NextResponse.json({ error: 'ID required.' }, { status: 400 });

  const product = db.prepare('SELECT * FROM products WHERE id = ?').get(id);

  if (!product) return NextResponse.json({ error: 'Product not found.' }, { status: 404 });

  return NextResponse.json(product);
}