import { NextRequest } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { prisma } from "../../../lib/prisma";
<<<<<<< HEAD
<<<<<<< HEAD

const JWT_SECRET = process.env.JWT_SECRET!;

export async function GET(request: NextRequest) {
=======
=======
>>>>>>> d7e1328f736a776113c8a92ee9221726aeb22ee3
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
<<<<<<< HEAD
>>>>>>> f4c0b518f790dd226d4a428698a44b109e98390f
=======
>>>>>>> d7e1328f736a776113c8a92ee9221726aeb22ee3
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

<<<<<<< HEAD
<<<<<<< HEAD
    const body = await request.json();
=======
>>>>>>> f4c0b518f790dd226d4a428698a44b109e98390f
=======
>>>>>>> d7e1328f736a776113c8a92ee9221726aeb22ee3
    const {
      items,
      total,
      tax,
      finalTotal,
      firstName,
      lastName,
<<<<<<< HEAD
<<<<<<< HEAD
      email,
=======
      email: customerEmail,
>>>>>>> f4c0b518f790dd226d4a428698a44b109e98390f
=======
      email: customerEmail,
>>>>>>> d7e1328f736a776113c8a92ee9221726aeb22ee3
      phone,
      address,
      city,
      state,
      zipCode,
      country,
      paymentMethod,
<<<<<<< HEAD
<<<<<<< HEAD
    } = body;
=======
=======
>>>>>>> d7e1328f736a776113c8a92ee9221726aeb22ee3
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
<<<<<<< HEAD
>>>>>>> f4c0b518f790dd226d4a428698a44b109e98390f
=======
>>>>>>> d7e1328f736a776113c8a92ee9221726aeb22ee3

    // Create the order
    const order = await prisma.order.create({
      data: {
        userId: decoded.id,
        total: finalTotal,
        status: "PAID", // Since payment is processed in checkout
        items: {
<<<<<<< HEAD
<<<<<<< HEAD
          create: items.map((item: any) => ({
=======
          create: items.map((item) => ({
>>>>>>> f4c0b518f790dd226d4a428698a44b109e98390f
=======
          create: items.map((item) => ({
>>>>>>> d7e1328f736a776113c8a92ee9221726aeb22ee3
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
<<<<<<< HEAD
    return new Response(JSON.stringify(order), {
=======
    return new Response(JSON.stringify({ order, shippingDetails }), {
>>>>>>> f4c0b518f790dd226d4a428698a44b109e98390f
=======
    return new Response(JSON.stringify({ order, shippingDetails }), {
>>>>>>> d7e1328f736a776113c8a92ee9221726aeb22ee3
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
