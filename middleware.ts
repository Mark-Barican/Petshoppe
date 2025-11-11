import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "supersecretkey");

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  // Public routes
  if (req.nextUrl.pathname.startsWith("/login") || 
      req.nextUrl.pathname.startsWith("/register") || 
      req.nextUrl.pathname === "/") {
    return NextResponse.next();
  }

  // If no token, redirect
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    await jwtVerify(token, JWT_SECRET);
    return NextResponse.next(); // token valid
  } catch (err) {
    console.error("Invalid token:", err);
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: ["/booking/:path*", "/services/:path*", "/products/:path*", "/profile/:path*"],
};
