import { NextResponse } from 'next/server';
import db from '../../../../lib/db';
import bcrypt from 'bcryptjs';

export async function POST(request) {
  const { email, password } = await request.json();

  // Check if email already exists
  const existingUser = db.prepare('SELECT id FROM users WHERE email = ?').get(email);

  if (existingUser) {
    return NextResponse.json({ error: 'An account with this email already exists.' }, { status: 409 });
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  const stmt = db.prepare(`
    INSERT INTO users (email, password)
    VALUES (?, ?)
  `);

  const result = stmt.run(email, hashedPassword);
  return NextResponse.json({ id: result.lastInsertRowid }, { status: 201 });
}