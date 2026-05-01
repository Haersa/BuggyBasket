import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';
import bcrypt from 'bcryptjs';

export async function GET() {
  try {
    const users = db.prepare(`
      SELECT id, email, newsletter, role, created_at FROM users
    `).all();
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const { email, password, role } = await req.json();

  if (!email || !password || !role) {
    return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
  }

  const existing = db.prepare('SELECT id FROM users WHERE email = ?').get(email);
  if (existing) {
    return NextResponse.json({ error: 'Email already in use.' }, { status: 409 });
  }

  try {
    const hashed = await bcrypt.hash(password, 10);

    const result = db.prepare(`
      INSERT INTO users (email, password, role, newsletter)
      VALUES (?, ?, ?, 0)
    `).run(email, hashed, role);

    const created = db.prepare(`
      SELECT id, email, newsletter, role, created_at FROM users WHERE id = ?
    `).get(result.lastInsertRowid);

    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create user.' }, { status: 500 });
  }
}