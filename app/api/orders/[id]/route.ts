import { NextRequest } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { prisma } from "../../../../lib/prisma";
<<<<<<< HEAD

const JWT_SECRET = process.env.JWT_SECRET!;
=======
import { getJwtSecret } from "@/lib/env";
>>>>>>> f4c0b518f790dd226d4a428698a44b109e98390f

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
    const decoded = jwt.verify(token, JWT_SECRET) as {
=======
    const jwtSecret = getJwtSecret();
    if (!jwtSecret) {
      return new Response("Server configuration error", { status: 500 });
    }

    const decoded = jwt.verify(token, jwtSecret) as {
>>>>>>> f4c0b518f790dd226d4a428698a44b109e98390f
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
