"use client";

import React, { useState, useMemo } from "react";
import ProductCard from "../../components/ProductCard";
import Dropdown from "../../components/Dropdown";
import PriceRangeFilter from "../../components/PriceRangeFilter";

const allProductsData = [
  {
    id: 1,
    name: "Premium Dog Food",
    description: "Healthy dog food for all breeds.",
    price: 19.99,
    category: "Food",
    imageUrl: "/products/pet-food-solid-background.jpg",
  },
  {
    id: 2,
    name: "Cat Scratching Post",
    description: "Durable scratching post for cats.",
    price: 39.99,
    category: "Toys",
    imageUrl: "/products/cat.jpg",
  },
  {
    id: 3,
    name: "Bird Cage",
    description: "Spacious cage for small birds.",
    price: 59.99,
    category: "Accessories",
    imageUrl: "/products/bird.jpg",
  },
  {
    id: 4,
    name: "Dog Leash",
    description: "Strong leash for daily walks.",
    price: 14.99,
    category: "Accessories",
    imageUrl: "/products/leash.jpg",
  },
  {
    id: 5,
    name: "Cat Toy Ball",
    description: "Fun toy for your cat.",
    price: 9.99,
    category: "Toys",
    imageUrl: "/products/cball.jpg",
  },
  {
    id: 6,
    name: "Dog Shampoo",
    description: "Gentle shampoo for dogs.",
    price: 12.99,
    category: "Care",
    imageUrl: "/products/dshampoo.jpg",
  },
  {
    id: 7,
    name: "Cat Litter",
    description: "Clumping litter for cats.",
    price: 18.99,
    category: "Care",
    imageUrl: "/products/litter.jpg",
  },
  {
    id: 8,
    name: "Bird Seed Mix",
    description: "Nutritious seed mix for birds.",
    price: 11.99,
    category: "Food",
    imageUrl: "/products/mixseed.jpg",
  },
  {
    id: 9,
    name: "Dog Bed",
    description: "Comfortable bed for your dog.",
    price: 49.99,
    category: "Accessories",
    imageUrl: "/products/dbed.jpg",
  },
  {
    id: 10,
    name: "Cat Tree",
    description: "Fun climbing tree for cats.",
    price: 79.99,
    category: "Toys",
    imageUrl: "/products/cat3.jpg",
  },
  {
    id: 11,
    name: "Fish Tank",
    description: "20-gallon aquarium for fish.",
    price: 99.99,
    category: "Accessories",
    imageUrl: "/products/tank.jpg",
  },
  {
    id: 12,
    name: "Dog Treats",
    description: "Delicious treats for dogs.",
    price: 7.99,
    category: "Food",
    imageUrl: "/products/treat.jpg",
  },
  {
    id: 13,
    name: "Cat Food",
    description: "Nutritious food for cats.",
    price: 21.99,
    category: "Food",
    imageUrl: "/products/cfood.jpg",
  },
  {
    id: 14,
    name: "Bird Perch",
    description: "Comfortable perch for birds.",
    price: 5.99,
    category: "Accessories",
    imageUrl: "/products/perch.jpg",
  },
  {
    id: 15,
    name: "Dog Collar",
    description: "Stylish collar for dogs.",
    price: 12.49,
    category: "Accessories",
    imageUrl: "/products/collar.jpg",
  },
  {
    id: 16,
    name: "Cat Blanket",
    description: "Soft blanket for your cat.",
    price: 14.99,
    category: "Accessories",
    imageUrl: "/products/cblanket.jpg",
  },
  {
    id: 17,
    name: "Fish Food",
    description: "Nutritious flakes for fish.",
    price: 4.99,
    category: "Food",
    imageUrl: "/products/ffood.jpg",
  },
  {
    id: 18,
    name: "Dog Chew Toy",
    description: "Durable chew toy for dogs.",
    price: 8.99,
    category: "Toys",
    imageUrl: "/products/chew.jpg",
  },
  {
    id: 19,
    name: "Catnip Toy",
    description: "Catnip-filled toy for cats.",
    price: 6.99,
    category: "Toys",
    imageUrl: "/products/nip.jpg",
  },
  {
    id: 20,
    name: "Bird Bath",
    description: "Outdoor bath for birds.",
    price: 15.99,
    category: "Accessories",
    imageUrl: "/products/bath.jpg",
  },
  {
    id: 21,
    name: "Dog Jacket",
    description: "Warm jacket for dogs in winter.",
    price: 29.99,
    category: "Accessories",
    imageUrl: "/products/jacket.jpg",
  },
  {
    id: 22,
    name: "Cat Carrier",
    description: "Safe carrier for traveling cats.",
    price: 34.99,
    category: "Accessories",
    imageUrl: "/products/carrier.jpg",
  },
];

const defaultCategories = [{ value: "All", label: "All Categories" }];

const ProductsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState("All");
  const [priceRange, setPriceRange] = React.useState({ min: 0, max: 100 });

  // Compute categories dynamically
  const categoryOptions = React.useMemo(() => {
    const uniqueCategories = Array.from(
      new Set(allProductsData.map((p) => p.category))
    ).sort();
    return [defaultCategories[0], ...uniqueCategories.map((c) => ({ value: c, label: c }))];
  }, []);

  // Compute min/max prices
  React.useEffect(() => {
    if (allProductsData.length > 0) {
      const prices = allProductsData.map((p) => p.price);
      setPriceRange({ min: Math.min(...prices), max: Math.max(...prices) });
    }
  }, []);

  // Filtering logic
  const filteredProducts = useMemo(() => {
    return allProductsData.filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === "All" || product.category === selectedCategory;
      const matchesPrice =
        product.price >= priceRange.min && product.price <= priceRange.max;

      return matchesSearch && matchesCategory && matchesPrice;
    });
  }, [searchQuery, selectedCategory, priceRange]);

  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Our Products
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our premium selection of pet care products designed to keep your furry friends happy and healthy.
          </p>
        </div>

        {/* Search & Filters */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="flex flex-col w-full">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    🔍
                  </div>
                  <input
                    placeholder="Search for products..."
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </label>
            </div>

            <div className="flex gap-4">
              <div className="w-48">
                <Dropdown
                  options={categoryOptions}
                  selectedValue={selectedCategory}
                  onChange={setSelectedCategory}
                  placeholder="Category"
                />
              </div>

              <div className="w-64">
                <PriceRangeFilter
                  minPrice={priceRange.min}
                  maxPrice={priceRange.max}
                  onPriceChange={(min, max) => setPriceRange({ min, max })}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No products found
            </h3>
            <p className="text-gray-500">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;
