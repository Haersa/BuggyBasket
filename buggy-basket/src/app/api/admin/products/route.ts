import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';
import { writeFile } from 'fs/promises';
import path from 'path';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const name = formData.get('name') as string;
    const description = formData.get('description') as string;
    const price = parseFloat(formData.get('price') as string);
    const category = formData.get('category') as string;
    const colour = formData.get('colour') as string;
    const quantity = parseInt(formData.get('quantity') as string) || 0;
    const featured = formData.get('featured') === 'true' ? 1 : 0;
    const image = formData.get('image') as File | null;

    if (!name || !price || !category) {
      return NextResponse.json({ error: 'Name, price and category are required.' }, { status: 400 });
    }

    let image_url = null;

    if (image && image.size > 0) {
      const bytes = await image.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const ext = image.name.split('.').pop();
      const filename = `${Date.now()}-${name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.${ext}`;
      const filepath = path.join(process.cwd(), 'public', 'images', 'products', filename);
      await writeFile(filepath, buffer);
      image_url = `/images/products/${filename}`;
    }

    const result = db.prepare(`
      INSERT INTO products (name, description, price, category, colour, image_url, quantity, featured)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `).run(name, description, price, category, colour, image_url, quantity, featured);

    const product = db.prepare('SELECT * FROM products WHERE id = ?').get(result.lastInsertRowid);

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to add product.' }, { status: 500 });
  }
}