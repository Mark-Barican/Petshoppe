"use client";

import React, { useState, useMemo } from "react";
import type { Product } from "../../types";
import ProductCard from "../../components/ProductCard";
import Dropdown from "../../components/Dropdown";
import PriceRangeFilter from "../../components/PriceRangeFilter";

// Use the global cart context from providers
import { useCart } from "../../app/providers";

const allProducts: Product[] = [
  {
    id: 1,
    name: "Luxury Shampoo",
    price: 19.99,
    imageUrl: "",
    category: "Grooming",
    description:
      "Premium shampoo for pets with sensitive skin. Contains natural ingredients that nourish and protect your pet's coat.",
  },
  {
    id: 2,
    name: "Grooming Brush",
    price: 14.99,
    imageUrl: "",
    category: "Grooming",
    description:
      "Ergonomic brush designed to remove loose fur and distribute natural oils for a healthy, shiny coat.",
  },
  {
    id: 3,
    name: "Nail Clippers",
    price: 9.9,
    imageUrl: "",
    category: "Grooming",
    description:
      "Precision nail clippers with safety guard to prevent over-cutting. Ideal for pets of all sizes.",
  },
  {
    id: 4,
    name: "Pet Perfume",
    price: 24.99,
    imageUrl: "",
    category: "Care",
    description:
      "Gentle, long-lasting fragrance specifically formulated for pets. Made with pet-safe ingredients.",
  },
  {
    id: 5,
    name: "Coat Conditioner",
    price: 17.99,
    imageUrl: "",
    category: "Care",
    description:
      "Deep conditioning treatment that detangles and moisturizes your pet's fur, leaving it soft and manageable.",
  },
  {
    id: 6,
    name: "Ear Cleaning Solution",
    price: 12.99,
    imageUrl: "",
    category: "Care",
    description:
      "Gentle solution for cleaning and maintaining healthy ears. Safe for regular use to prevent infections.",
  },
  {
    id: 7,
    name: "Dental Care Kit",
    price: 29.99,
    imageUrl: "",
    category: "Care",
    description:
      "Complete dental care kit including toothbrush and toothpaste to maintain your pet's oral hygiene.",
  },
  {
    id: 8,
    name: "Paw Balm",
    price: 11.99,
    imageUrl: "",
    category: "Care",
    description:
      "Nourishing balm to soothe and protect your pet's paws from dryness and cracking.",
  },
  {
    id: 9,
    name: "Flea & Tick Collar",
    price: 35.5,
    imageUrl: "",
    category: "Accessories",
    description:
      "Long-lasting protection against fleas and ticks. Waterproof and safe for daily wear.",
  },
  {
    id: 10,
    name: "Plush Toy",
    price: 8.9,
    imageUrl: "",
    category: "Accessories",
    description:
      "Soft and durable plush toy designed for safe play. Perfect for interactive games with your pet.",
  },
];

const categories = [
  { value: "All", label: "All Categories" },
  { value: "Grooming", label: "Grooming" },
  { value: "Care", label: "Care" },
  { value: "Accessories", label: "Accessories" },
];

const ProductsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [priceRange, setPriceRange] = useState({
    min: Math.min(...allProducts.map((p) => p.price)),
    max: Math.max(...allProducts.map((p) => p.price)),
  });
  const { addToCart } = useCart();

  // Filtering logic
  const filteredProducts = useMemo(() => {
    return allProducts.filter((product) => {
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
            Discover our premium selection of pet care products designed to keep
            your furry friends happy and healthy.
          </p>
        </div>

        {/* Search Bar and Filters */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Bar */}
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

            {/* Filters */}
            <div className="flex gap-4">
              {/* Category Filter */}
              <div className="w-48">
                <Dropdown
                  options={categories}
                  selectedValue={selectedCategory}
                  onChange={setSelectedCategory}
                  placeholder="Category"
                />
              </div>

              {/* Price Range Filter */}
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
