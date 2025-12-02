const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function seedProducts() {
  console.log("Seeding products...");

  const products = [
    {
      name: "Premium Dog Food",
      description: "High-quality dog food with all essential nutrients",
      price: 29.99,
      stock: 50,
      image: "/dog-food.jpg",
      category: "Food",
    },
    {
      name: "Cat Toy Set",
      description: "Set of 5 interactive toys for cats",
      price: 14.99,
      stock: 30,
      image: "/cat-toys.jpg",
      category: "Toys",
    },
    {
      name: "Dog Leash",
      description: "Strong and comfortable leash for dogs",
      price: 12.99,
      stock: 25,
      image: "/dog-leash.jpg",
      category: "Accessories",
    },
    {
      name: "Aquarium Filter",
      description: "High-efficiency filter for fish tanks",
      price: 34.99,
      stock: 15,
      image: "/aquarium-filter.jpg",
      category: "Aquatic",
    },
    {
      name: "Bird Cage",
      description: "Spacious cage for small birds",
      price: 59.99,
      stock: 10,
      image: "/bird-cage.jpg",
      category: "Housing",
    },
  ];

  for (const product of products) {
    const existingProduct = await prisma.product.findFirst({
      where: { name: product.name },
    });

    if (!existingProduct) {
      await prisma.product.create({
        data: product,
      });
      console.log(`✅ Created product: ${product.name}`);
    } else {
      console.log(`ℹ️  Product already exists: ${product.name}`);
    }
  }

  console.log("🎉 Products seeding completed!");
  await prisma.$disconnect();
}

seedProducts().catch((e) => {
  console.error("Error seeding products:", e);
  process.exit(1);
});
