import { NextRequest, NextResponse } from 'next/server';
import { rootDomain } from '@/config/constants';
import { cookies } from 'next/headers';

const unAuthWorkspaceRoutes = ["/login"]

function extractSubdomain(request: NextRequest): string | null {
  const url = request.url;
  const host = request.headers.get('host') || '';
  const hostname = host.split(':')[0];

  if (url.includes('localhost') || url.includes('127.0.0.1')) {
    const fullUrlMatch = url.match(/http:\/\/([^.]+)\.localhost/);
    if (fullUrlMatch && fullUrlMatch[1]) {
      return fullUrlMatch[1];
    }

    if (hostname.includes('.localhost')) {
      return hostname.split('.')[0];
    }

    return null;
  }

  const rootDomainFormatted = rootDomain.split(':')[0];

  if (hostname.includes('---') && hostname.endsWith('.vercel.app')) {
    const parts = hostname.split('---');
    return parts.length > 0 ? parts[0] : null;
  }

  const isSubdomain =
    hostname !== rootDomainFormatted &&
    hostname !== `www.${rootDomainFormatted}` &&
    hostname.endsWith(`.${rootDomainFormatted}`);

  return isSubdomain ? hostname.replace(`.${rootDomainFormatted}`, '') : null;
}

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const subdomain = extractSubdomain(request);
  const cookiesList = await cookies();
  const access = cookiesList.get("access")?.value;

  if (subdomain) {
    if (pathname.startsWith('/admin')) {
      return NextResponse.redirect(new URL('/', request.url));
    }

    const unAuthorized = unAuthWorkspaceRoutes.includes(pathname)

    if (!access && !unAuthorized) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    const workspace = cookiesList.get("workspace")?.value
    if (subdomain !== workspace && !unAuthorized) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    if (subdomain === workspace && pathname === "/login" && access) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    if (pathname === '/') {
      return NextResponse.rewrite(new URL(`/s/${subdomain}`, request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next|[\\w-]+\\.\\w+).*)'
  ]
};