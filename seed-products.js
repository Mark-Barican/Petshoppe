require("dotenv").config();

const { PrismaClient } = require("@prisma/client");
const products = require("./data/products.json");

const prisma = new PrismaClient();

async function seedProducts() {
  console.log("Seeding products...");

  for (const product of products) {
    await prisma.product.upsert({
      where: { name: product.name },
      update: {
        description: product.description,
        price: product.price,
        image: product.imageUrl,
        category: product.category,
        stock: product.stock ?? 0,
      },
      create: {
        name: product.name,
        description: product.description,
        price: product.price,
        image: product.imageUrl,
        category: product.category,
        stock: product.stock ?? 0,
      },
    });

    console.log(`✓ Seeded product: ${product.name}`);
  }

  console.log("✔️ Products seeding completed!");
}

seedProducts()
  .catch((e) => {
    console.error("Error seeding products:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
