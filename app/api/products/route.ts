import { NextRequest } from "next/server";
import { prisma } from "../../../lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const products = await prisma.product.findMany({
      orderBy: {
        id: "asc",
      },
    });

    // Transform the products to match the frontend Product type
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
  }
}
