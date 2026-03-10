import { NextResponse } from 'next/server';
import db from '../../../../lib/db';
import bcrypt from 'bcryptjs';

// GET all users
export async function GET() {
  const users = db.prepare('SELECT id, email, created_at FROM users').all();
  return NextResponse.json(users);
}

// POST - register a new user
export async function POST(request) {
  const { email, password } = await request.json();

  // Hash the password with a salt round of 10
  const hashedPassword = await bcrypt.hash(password, 10);

  const stmt = db.prepare(`
    INSERT INTO users (email, password)
    VALUES (?, ?)
  `);

  const result = stmt.run(email, hashedPassword);
  return NextResponse.json({ id: result.lastInsertRowid }, { status: 201 });
}