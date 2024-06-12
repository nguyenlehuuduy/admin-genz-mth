import type { NextRequest } from 'next/server';
import { COOKIE_ACCESS_TOKEN_KEY } from './app/lib/constant';

export function middleware(request: NextRequest) {
    const currentUser = request.cookies.get(COOKIE_ACCESS_TOKEN_KEY)?.value;
    if (!currentUser && !request.nextUrl.pathname.startsWith('/login')) {
        return Response.redirect(new URL('/auth/login', request.url));
    }
}

export const config = {
    matcher: '/((?!api|static|.*\\..*|_next|auth/login).*)'
};
