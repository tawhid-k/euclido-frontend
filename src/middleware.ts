import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
    // Mock mode: pass all requests through, no auth enforcement
    if (request.nextUrl.pathname.startsWith('/degree-details')) {
        const requestHeaders = new Headers(request.headers)
        requestHeaders.set('x-is-authenticated', 'true')
        return NextResponse.next({ request: { headers: requestHeaders } })
    }
    return NextResponse.next()
}
