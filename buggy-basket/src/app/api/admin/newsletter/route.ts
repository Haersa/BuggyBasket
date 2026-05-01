import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function GET() {
  try {
    const accountSubscribers = db.prepare(`
      SELECT email, created_at as subscribed_at, 'account' as source
      FROM users
      WHERE newsletter = 1
    `).all();

    const newsletterSubscribers = db.prepare(`
      SELECT email, subscribed_at, 'newsletter' as source
      FROM newsletter_subscribers
    `).all();

    const combined = [...accountSubscribers, ...newsletterSubscribers]
      .sort((a: any, b: any) => new Date(b.subscribed_at).getTime() - new Date(a.subscribed_at).getTime());

    return NextResponse.json(combined);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch subscribers.' }, { status: 500 });
  }
}