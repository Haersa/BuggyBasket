import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';
import { writeFile, unlink } from 'fs/promises';
import path from 'path';

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

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

    const existing = db.prepare('SELECT * FROM products WHERE id = ?').get(id) as any;
    if (!existing) return NextResponse.json({ error: 'Product not found.' }, { status: 404 });

    let image_url = existing.image_url;

    if (image && image.size > 0) {
      // Delete old image if it exists
      if (existing.image_url) {
        try {
          const oldPath = path.join(process.cwd(), 'public', existing.image_url);
          await unlink(oldPath);
        } catch {
          // Old file may not exist, ignore
        }
      }
      const bytes = await image.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const ext = image.name.split('.').pop();
      const filename = `${Date.now()}-${name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.${ext}`;
      const filepath = path.join(process.cwd(), 'public', 'images', 'products', filename);
      await writeFile(filepath, buffer);
      image_url = `/images/products/${filename}`;
    }

    db.prepare(`
      UPDATE products SET name = ?, description = ?, price = ?, category = ?, colour = ?, image_url = ?, quantity = ?, featured = ?
      WHERE id = ?
    `).run(name, description, price, category, colour, image_url, quantity, featured, id);

    const updated = db.prepare('SELECT * FROM products WHERE id = ?').get(id);
    return NextResponse.json(updated);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to update product.' }, { status: 500 });
  }
}

export async function DELETE(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  try {
    const existing = db.prepare('SELECT * FROM products WHERE id = ?').get(id) as any;
    if (!existing) return NextResponse.json({ error: 'Product not found.' }, { status: 404 });

    if (existing.image_url) {
      try {
        const imagePath = path.join(process.cwd(), 'public', existing.image_url);
        await unlink(imagePath);
      } catch {
        // File may not exist, ignore
      }
    }

    db.prepare('DELETE FROM basket WHERE product_id = ?').run(id);
    db.prepare('DELETE FROM products WHERE id = ?').run(id);

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete product.' }, { status: 500 });
  }
}