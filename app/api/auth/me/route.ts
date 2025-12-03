export const dynamic = "force-dynamic";
export const revalidate = 0;
export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import prisma from "@/lib/prisma";
<<<<<<< HEAD
<<<<<<< HEAD

const JWT_SECRET = process.env.JWT_SECRET!;
=======
import { getJwtSecret } from "@/lib/env";
>>>>>>> f4c0b518f790dd226d4a428698a44b109e98390f
=======
import { getJwtSecret } from "@/lib/env";
>>>>>>> d7e1328f736a776113c8a92ee9221726aeb22ee3

export async function GET() {
  try {
    const token = cookies().get("token")?.value;

    if (!token) {
      return NextResponse.json({ user: null }, { status: 401 });
    }

<<<<<<< HEAD
<<<<<<< HEAD
    const decoded = jwt.verify(token, JWT_SECRET) as { id: number };
=======
=======
>>>>>>> d7e1328f736a776113c8a92ee9221726aeb22ee3
    const jwtSecret = getJwtSecret();
    if (!jwtSecret) {
      return NextResponse.json(
        { user: null, error: "Server configuration error" },
        { status: 500 }
      );
    }

    const decoded = jwt.verify(token, jwtSecret) as { id: number };
<<<<<<< HEAD
>>>>>>> f4c0b518f790dd226d4a428698a44b109e98390f
=======
>>>>>>> d7e1328f736a776113c8a92ee9221726aeb22ee3

    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: { id: true, email: true, name: true, role: true },
    });

    if (!user) {
      return NextResponse.json({ user: null }, { status: 404 });
    }

    return NextResponse.json({ user }, { status: 200 });
  } catch (err) {
    console.error("AUTH ME ERROR:", err);

    return NextResponse.json({ user: null }, { status: 401 });
  }
}
