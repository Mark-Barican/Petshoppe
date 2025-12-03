import { NextRequest } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { prisma } from "../../../lib/prisma";
<<<<<<< HEAD

const JWT_SECRET = process.env.JWT_SECRET!;

export async function GET(request: NextRequest) {
=======
import { getJwtSecret } from "@/lib/env";

type CheckoutItem = {
  id: number;
  quantity: number;
  price: number;
};

type CheckoutPayload = {
  items: CheckoutItem[];
  total: number;
  tax: number;
  finalTotal: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  paymentMethod: string;
};

export async function GET() {
>>>>>>> f4c0b518f790dd226d4a428698a44b109e98390f
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

    const orders = await prisma.order.findMany({
      where: {
        userId: decoded.id,
      },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return new Response(JSON.stringify(orders), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}

export async function POST(request: NextRequest) {
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

<<<<<<< HEAD
    const body = await request.json();
=======
>>>>>>> f4c0b518f790dd226d4a428698a44b109e98390f
    const {
      items,
      total,
      tax,
      finalTotal,
      firstName,
      lastName,
<<<<<<< HEAD
      email,
=======
      email: customerEmail,
>>>>>>> f4c0b518f790dd226d4a428698a44b109e98390f
      phone,
      address,
      city,
      state,
      zipCode,
      country,
      paymentMethod,
<<<<<<< HEAD
    } = body;
=======
    } = (await request.json()) as CheckoutPayload;

    const shippingDetails = {
      firstName,
      lastName,
      email: customerEmail,
      phone,
      address,
      city,
      state,
      zipCode,
      country,
      paymentMethod,
    };

    if (Math.abs(total + tax - finalTotal) > 0.01) {
      return new Response("Invalid totals supplied", { status: 400 });
    }
>>>>>>> f4c0b518f790dd226d4a428698a44b109e98390f

    // Create the order
    const order = await prisma.order.create({
      data: {
        userId: decoded.id,
        total: finalTotal,
        status: "PAID", // Since payment is processed in checkout
        items: {
<<<<<<< HEAD
          create: items.map((item: any) => ({
=======
          create: items.map((item) => ({
>>>>>>> f4c0b518f790dd226d4a428698a44b109e98390f
            productId: item.id, // This should be the database product ID
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    // Update product stock
    for (const item of items) {
      await prisma.product.update({
        where: { id: item.id },
        data: {
          stock: { decrement: item.quantity },
        },
      });
    }

<<<<<<< HEAD
    return new Response(JSON.stringify(order), {
=======
    return new Response(JSON.stringify({ order, shippingDetails }), {
>>>>>>> f4c0b518f790dd226d4a428698a44b109e98390f
      status: 201,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error creating order:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
