import { NextResponse } from 'next/server';
import db from '../../../../lib/db';
import bcrypt from 'bcryptjs';
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

// get current user details
export async function GET(request) {
  const user = getUserFromToken(request);
  if (!user) return NextResponse.json({ error: 'Unauthorised.' }, { status: 401 });

  const data = db.prepare('SELECT id, email, newsletter, role, created_at FROM users WHERE id = ?').get(user.id);
  if (!data) return NextResponse.json({ error: 'User not found.' }, { status: 404 });

  return NextResponse.json(data);
}

//  update user details
export async function PUT(request) {
  const user = getUserFromToken(request);
  if (!user) return NextResponse.json({ error: 'Unauthorised.' }, { status: 401 });

  const { type, email, currentPassword, newPassword, newsletter } = await request.json();

  if (type === 'email') {
    const existing = db.prepare('SELECT id FROM users WHERE email = ? AND id != ?').get(email, user.id);
    if (existing) return NextResponse.json({ error: 'Email already in use.' }, { status: 409 });
    db.prepare('UPDATE users SET email = ? WHERE id = ?').run(email, user.id);
    return NextResponse.json({ success: true });
  }

  if (type === 'password') {
    const userData = db.prepare('SELECT password FROM users WHERE id = ?').get(user.id);
    const match = await bcrypt.compare(currentPassword, userData.password);
    if (!match) return NextResponse.json({ error: 'Current password is incorrect.' }, { status: 401 });
    const hashed = await bcrypt.hash(newPassword, 10);
    db.prepare('UPDATE users SET password = ? WHERE id = ?').run(hashed, user.id);
    return NextResponse.json({ success: true });
  }

  if (type === 'newsletter') {
    db.prepare('UPDATE users SET newsletter = ? WHERE id = ?').run(newsletter ? 1 : 0, user.id);
    return NextResponse.json({ success: true });
  }

  return NextResponse.json({ error: 'Invalid update type.' }, { status: 400 });
}

// delete account
export async function DELETE(request) {
  const user = getUserFromToken(request);
  if (!user) return NextResponse.json({ error: 'Unauthorised.' }, { status: 401 });

  const { password } = await request.json();
  const userData = db.prepare('SELECT password FROM users WHERE id = ?').get(user.id);
  const match = await bcrypt.compare(password, userData.password);
  if (!match) return NextResponse.json({ error: 'Password is incorrect.' }, { status: 401 });

  db.prepare('DELETE FROM basket WHERE user_id = ?').run(user.id);
  db.prepare('DELETE FROM users WHERE id = ?').run(user.id);

  return NextResponse.json({ success: true });
}