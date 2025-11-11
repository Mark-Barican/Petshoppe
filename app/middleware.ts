import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

// Protect only specific routes
const protectedRoutes = ["/booking", "/dashboard", "/profile"];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Skip middleware for public routes
  if (!protectedRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  const token = req.cookies.get("token")?.value;

  // If no token, redirect to login
  if (!token) {
    const loginUrl = new URL("/login", req.url);
    return NextResponse.redirect(loginUrl);
  }

  try {
    jwt.verify(token, JWT_SECRET);
    return NextResponse.next(); // token valid
  } catch (err) {
    console.error("JWT Verification Error:", err);
    const loginUrl = new URL("/login", req.url);
    return NextResponse.redirect(loginUrl);
  }
}

// Required for middleware to apply
export const config = {
  matcher: ["/booking/:path*", "/dashboard/:path*", "/profile/:path*"],
};
