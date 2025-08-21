import { NextResponse, type NextRequest } from 'next/server';
import { useAuthStore } from '@/stores/auth.store';
 
// Este es un middleware de ejemplo. La lógica real de acceso a stores no funciona aquí.
// Se debe usar un token (ej. en cookies) para obtener el rol.
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('auth-token')?.value;
  
  // Asumir que el token contiene el rol, en un caso real se decodifica el JWT
  const userRole = token ? JSON.parse(atob(token.split('.')[1])).role : null;

  if (pathname.startsWith('/dashboard')) {
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    if (pathname.startsWith('/dashboard/admin') && userRole !== 'admin') {
      return NextResponse.redirect(new URL('/unauthorized', request.url));
    }
    if (pathname.startsWith('/dashboard/doctor') && userRole !== 'doctor') {
        return NextResponse.redirect(new URL('/unauthorized', request.url));
    }
    if (pathname.startsWith('/dashboard/pharmacy') && userRole !== 'pharmacist') {
        return NextResponse.redirect(new URL('/unauthorized', request.url));
    }
  }
 
  return NextResponse.next();
}
 
export const config = {
  matcher: [
    '/dashboard/:path*',
  ],
};
