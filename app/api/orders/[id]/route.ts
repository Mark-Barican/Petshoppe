import { NextRequest } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { prisma } from "../../../../lib/prisma";
<<<<<<< HEAD
<<<<<<< HEAD

const JWT_SECRET = process.env.JWT_SECRET!;
=======
import { getJwtSecret } from "@/lib/env";
>>>>>>> f4c0b518f790dd226d4a428698a44b109e98390f
=======
import { getJwtSecret } from "@/lib/env";
>>>>>>> d7e1328f736a776113c8a92ee9221726aeb22ee3

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const token = cookies().get("token")?.value;
    if (!token) {
      return new Response("Unauthorized", { status: 401 });
    }

<<<<<<< HEAD
<<<<<<< HEAD
    const decoded = jwt.verify(token, JWT_SECRET) as {
=======
=======
>>>>>>> d7e1328f736a776113c8a92ee9221726aeb22ee3
    const jwtSecret = getJwtSecret();
    if (!jwtSecret) {
      return new Response("Server configuration error", { status: 500 });
    }

    const decoded = jwt.verify(token, jwtSecret) as {
<<<<<<< HEAD
>>>>>>> f4c0b518f790dd226d4a428698a44b109e98390f
=======
>>>>>>> d7e1328f736a776113c8a92ee9221726aeb22ee3
      id: number;
      email?: string;
      role?: string;
    };

    const orderId = parseInt(params.id);
    if (isNaN(orderId)) {
      return new Response("Invalid order ID", { status: 400 });
    }

    const order = await prisma.order.findFirst({
      where: {
        id: orderId,
        userId: decoded.id,
      },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    if (!order) {
      return new Response("Order not found", { status: 404 });
    }

    return new Response(JSON.stringify(order), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error fetching order:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
