import { NextResponse } from 'next/server';
import db from '../../../../lib/db';
import bcrypt from 'bcryptjs';

export async function POST(request) {
  const { email, password, newsletter } = await request.json();

  const existingUser = db.prepare('SELECT id FROM users WHERE email = ?').get(email);

  if (existingUser) {
    return NextResponse.json({ error: 'An account with this email already exists.' }, { status: 409 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const stmt = db.prepare(`
    INSERT INTO users (email, password, newsletter)
    VALUES (?, ?, ?)
  `);

  const result = stmt.run(email, hashedPassword, newsletter ? 1 : 0);
  return NextResponse.json({ id: result.lastInsertRowid }, { status: 201 });
}