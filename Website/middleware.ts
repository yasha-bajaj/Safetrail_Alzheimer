import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Get the pathname of the request
  const path = request.nextUrl.pathname

  // Check if the path is public (sign-in page or welcome page)
  const isPublicPath = path === "/sign-in" || path === "/welcome"

  // Get the token from cookies
  const token = request.cookies.get("safetrail-auth")?.value

  // If the path is sign-in and the user is authenticated, redirect to home
  if (path === "/sign-in" && token) {
    return NextResponse.redirect(new URL("/", request.url))
  }

  // If the path is not public and the user is not authenticated, redirect to sign-in
  if (!isPublicPath && !token && path !== "/_next" && !path.includes("/static/")) {
    return NextResponse.redirect(new URL("/sign-in", request.url))
  }

  return NextResponse.next()
}

// Configure the middleware to run on specific paths
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}

