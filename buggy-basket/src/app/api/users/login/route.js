import { NextResponse } from 'next/server';
import db from '../../../../lib/db';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function POST(request) {
  const { email, password } = await request.json();

  // Find the user by email
  const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email);

  if (!user) {
    return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
  }

  // Compare the password against the stored hash
  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
  }

  // Generate JWT token
  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '4d' } // stores user login session for 4 days
  );

  return NextResponse.json({
    token,
    user: {
      id: user.id,
      email: user.email,
      created_at: user.created_at
    }
  });
}