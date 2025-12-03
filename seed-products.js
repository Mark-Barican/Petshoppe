<<<<<<< HEAD
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
    {
      name: "Premium Cat Food",
      description: "Nutritious and delicious cat food for all life stages",
      price: 24.99,
      stock: 40,
      image: "/cat-food.jpg",
      category: "Food",
    },
    {
      name: "Dog Bed Large",
      description: "Comfortable orthopedic bed for large dogs",
      price: 49.99,
      stock: 20,
      image: "/dog-bed.jpg",
      category: "Housing",
    },
    {
      name: "Fish Tank Decorations",
      description: "Decorative set for enhancing fish tank aesthetics",
      price: 19.99,
      stock: 35,
      image: "/tank-decorations.jpg",
      category: "Aquatic",
    },
    {
      name: "Hamster Wheel",
      description: "Silent running wheel for hamsters and small pets",
      price: 15.99,
      stock: 25,
      image: "/hamster-wheel.jpg",
      category: "Toys",
    },
    {
      name: "Rabbit Hutch",
      description: "Spacious outdoor hutch for rabbits",
      price: 89.99,
      stock: 8,
      image: "/rabbit-hutch.jpg",
      category: "Housing",
    },
    {
      name: "Dog Collar with ID Tag",
      description: "Adjustable collar with attached ID tag for dogs",
      price: 9.99,
      stock: 60,
      image: "/dog-collar.jpg",
      category: "Accessories",
    },
    {
      name: "Bird Perch",
      description: "Natural wood perch for birds",
      price: 12.49,
      stock: 30,
      image: "/bird-perch.jpg",
      category: "Accessories",
    },
    {
      name: "Aquarium Heater",
      description: "Submersible heater for tropical fish tanks",
      price: 22.99,
      stock: 15,
      image: "/aquarium-heater.jpg",
      category: "Aquatic",
    },
    {
      name: "Cat Scratching Post",
      description: "Multi-level scratching post for cats",
      price: 39.99,
      stock: 18,
      image: "/cat-scratching-post.jpg",
      category: "Toys",
    },
    {
      name: "Small Animal Carrier",
      description: "Ventilated carrier for safe pet transport",
      price: 34.99,
      stock: 12,
      image: "/pet-carrier.jpg",
      category: "Accessories",
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
=======
async function seedProducts() {
  const dotenv = await import("dotenv");
  dotenv.config();

  const { PrismaClient } = await import("@prisma/client");
  const { fallbackProducts } = await import("./data/products");

  const prisma = new PrismaClient();

  try {
    console.log("Seeding products...");

    for (const product of fallbackProducts) {
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
  } catch (error) {
    console.error("Error seeding products:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

seedProducts();
>>>>>>> f4c0b518f790dd226d4a428698a44b109e98390f
