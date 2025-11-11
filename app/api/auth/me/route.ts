export const dynamic = "force-dynamic";
export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt, { TokenExpiredError, JsonWebTokenError } from "jsonwebtoken";
import prisma from "@/lib/prisma";

const JWT_SECRET = process.env.JWT_SECRET!;
if (!JWT_SECRET) {
  throw new Error(" Missing JWT_SECRET in environment variables");
}

export async function GET() {
  try {
    const token = cookies().get("token")?.value;
    if (!token) {
      return NextResponse.json({ user: null, message: "No token found" }, { status: 401 });
    }

    const decoded = jwt.verify(token, JWT_SECRET) as { id: number; email?: string; role?: string };
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: { id: true, email: true, role: true },
    });

    if (!user) {
      return NextResponse.json({ user: null, message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ user }, { status: 200 });
  } catch (err) {
    console.error("AUTH ME ERROR:", err);

    if (err instanceof TokenExpiredError) {
      return NextResponse.json({ user: null, message: "Token expired" }, { status: 401 });
    }
    if (err instanceof JsonWebTokenError) {
      return NextResponse.json({ user: null, message: "Invalid token" }, { status: 401 });
    }
    return NextResponse.json({ user: null, message: "Internal server error" }, { status: 500 });
  }
}
