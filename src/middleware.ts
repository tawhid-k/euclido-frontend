import { cookies } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
    const cookieStore = await cookies()
    const isLoggedIn = cookieStore.has('XSRF-TOKEN')
    const userType = cookieStore.get('userType')?.value
    let isEmailVerified = cookieStore.get('isEmailVerified')?.value === 'true'

    if (request.nextUrl.pathname.startsWith('/auth') && isLoggedIn && request.nextUrl.pathname !== '/auth/code-verification') {
        return NextResponse.redirect(new URL('/', request.url))
    }
    if (request.nextUrl.pathname.startsWith('/jobs/dashboard') && userType !== 'recruiter') {
        return NextResponse.redirect(new URL('/', request.url))
    }
    if (userType === 'recruiter') {
        if (request.nextUrl.pathname.startsWith('/profile')) {
            return NextResponse.redirect(new URL('/jobs/dashboard', request.url))
        }
    }
    else if (request.nextUrl.pathname.startsWith('/profile') && !isLoggedIn && request.nextUrl.pathname !== '/auth/code-verification') {
        return NextResponse.redirect(new URL('/auth/signin', request.url))
    }
    else if (request.nextUrl.pathname.startsWith('/degree-details')) {
        const requestHeaders = new Headers(request.headers)
        requestHeaders.set('x-is-authenticated', isLoggedIn ? 'true' : 'false')
        return NextResponse.next({
            request: {
                headers: requestHeaders,
            },
        })
    }
    else if (request.nextUrl.pathname.startsWith('/profile')) {
        try {
            if (!isEmailVerified) {
                return NextResponse.redirect(new URL('/auth/code-verification', request.url))
            } 
        } catch(error) {
            console.log('An error occured in the middleware')
            console.log(error)
        }
    }
    return NextResponse.next()
}
