import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { parse } from 'cookie';
import { refreshSession } from './lib/api/server/auth/authServerApi';

const privateRoutes = ['/transactions'];
const publicRoutes = ['/login', '/register'];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const cookieStore = await cookies();

  const accessToken = cookieStore.get('accessToken')?.value;
  const refreshToken = cookieStore.get('refreshToken')?.value;

  const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route));
  const isPrivateRoute = privateRoutes.some(route =>
    pathname.startsWith(route),
  );

  
  if (!accessToken && refreshToken) {
    try {
      const res = await refreshSession();
      const setCookie = res.headers['set-cookie'];

      if (setCookie) {
        
        const response = isPublicRoute
          ? NextResponse.redirect(new URL('/', request.url))
          : NextResponse.next();

        const cookieArray = Array.isArray(setCookie) ? setCookie : [setCookie];

        for (const cookieStr of cookieArray) {
          const parsed = parse(cookieStr);
          const entries = Object.entries(parsed);

          if (entries.length === 0) continue;

          const [name, value] = entries[0];
          const cookieOptions = parsed as Record<string, string>;

          
          if (
            (name === 'accessToken' || name === 'refreshToken') &&
            value !== undefined
          ) {
            response.cookies.set(name, value, {
              path: cookieOptions.Path || '/',
              httpOnly: true,
              secure: process.env.NODE_ENV === 'production',
              sameSite: 'lax',
              maxAge: cookieOptions['Max-Age']
                ? parseInt(cookieOptions['Max-Age'], 10)
                : undefined,
              expires: cookieOptions.Expires
                ? new Date(cookieOptions.Expires)
                : undefined,
            });
          }
        }

        return response;
      }
    } catch (error) {
      console.error('Refresh failed:', error);
      if (isPrivateRoute) {
        return NextResponse.redirect(new URL('/login', request.url));
      }
    }
  }

  // 2. Стандартная проверка прав доступа
  if (!accessToken) {
    if (isPrivateRoute) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
    return NextResponse.next();
  }

  if (isPublicRoute) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/transactions/:path*', '/login', '/register'],
};
