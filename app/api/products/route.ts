<<<<<<< HEAD
import { NextRequest } from "next/server";
import { prisma } from "../../../lib/prisma";

export async function GET(request: NextRequest) {
=======
import fallbackProducts from "@/data/products";
import type { Product as ProductResponse } from "@/types";
import { prisma } from "../../../lib/prisma";

const jsonResponse = (
  payload: ProductResponse[],
  status = 200
): Response => {
  return new Response(JSON.stringify(payload), {
    status,
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export async function GET() {
  if (!process.env.DATABASE_URL) {
    console.warn("DATABASE_URL missing; serving fallback products.");
    return jsonResponse(fallbackProducts);
  }

>>>>>>> f4c0b518f790dd226d4a428698a44b109e98390f
  try {
    const products = await prisma.product.findMany({
      orderBy: {
        id: "asc",
      },
    });

    // Transform the products to match the frontend Product type
<<<<<<< HEAD
    const transformedProducts = products.map((product) => ({
      id: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.image || "",
      category: product.category || "",
      description: product.description || "",
    }));

    return new Response(JSON.stringify(transformedProducts), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    return new Response("Internal Server Error", { status: 500 });
=======
    const transformedProducts: ProductResponse[] = products.map(
      (product: (typeof products)[number]): ProductResponse => ({
        id: product.id,
        name: product.name,
        price: product.price,
        imageUrl: product.image || "",
        category: product.category || "",
        description: product.description || "",
      })
    );

    return jsonResponse(transformedProducts);
  } catch (error) {
    console.error("Error fetching products:", error);
    return jsonResponse(fallbackProducts);
>>>>>>> f4c0b518f790dd226d4a428698a44b109e98390f
  }
}
