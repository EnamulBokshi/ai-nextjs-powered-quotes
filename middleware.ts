import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
export {default} from 'next-auth/middleware'
import { getToken } from 'next-auth/jwt'
// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
    const token = await getToken({req:request});
    const url = request.nextUrl;
    console.log(url.pathname)
    console.log("token: ",token)
    if (token &&(
        url.pathname.startsWith('/sign-up')||
        url.pathname.startsWith('/sign-in') ||
        url.pathname.startsWith('/verify') 

    )){
        return NextResponse.redirect(new URL('/dashboard',request.url))
    }

  return NextResponse.redirect(new URL('/home', request.url))
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/',
    '/sign-up',
    '/sign-in',
    '/dashboard/:path*',
    '/verify/:path*',
  ],
}