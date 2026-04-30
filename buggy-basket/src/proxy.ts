import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

export async function proxy(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/admin-panel')) {
    if (!token) {
      return NextResponse.redirect(new URL('/', request.url));
    }
    try {
      const { payload } = await jwtVerify(token, SECRET);
      if (payload.role !== 'admin') {
        return NextResponse.redirect(new URL('/', request.url));
      }
    } catch {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  if (pathname.startsWith('/api/admin')) {
    if (!token) {
      return NextResponse.json({ error: 'Unauthorised' }, { status: 401 });
    }
    try {
      const { payload } = await jwtVerify(token, SECRET);
      if (payload.role !== 'admin') {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
      }
    } catch {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin-panel/:path*', '/api/admin/:path*'],
};