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
    imageUrl: "https://picsum.photos/seed/shampoo/300/300",
    category: "Grooming",
  },
  {
    id: 2,
    name: "Grooming Brush",
    price: 14.99,
    imageUrl: "https://picsum.photos/seed/brush/300/300",
    category: "Grooming",
  },
  {
    id: 3,
    name: "Nail Clippers",
    price: 9.9,
    imageUrl: "https://picsum.photos/seed/clippers/300/300",
    category: "Grooming",
  },
  {
    id: 4,
    name: "Pet Perfume",
    price: 24.99,
    imageUrl: "https://picsum.photos/seed/perfume/300/300",
    category: "Care",
  },
  {
    id: 5,
    name: "Coat Conditioner",
    price: 17.99,
    imageUrl: "https://picsum.photos/seed/conditioner/300/300",
    category: "Care",
  },
  {
    id: 6,
    name: "Ear Cleaning Solution",
    price: 12.99,
    imageUrl: "https://picsum.photos/seed/ear/300/300",
    category: "Care",
  },
  {
    id: 7,
    name: "Dental Care Kit",
    price: 29.99,
    imageUrl: "https://picsum.photos/seed/dental/300/300",
    category: "Care",
  },
  {
    id: 8,
    name: "Paw Balm",
    price: 11.99,
    imageUrl: "https://picsum.photos/seed/paw/300/300",
    category: "Care",
  },
  {
    id: 9,
    name: "Flea & Tick Collar",
    price: 35.5,
    imageUrl: "httpsum.photos/seed/collar/300/300",
    category: "Accessories",
  },
  {
    id: 10,
    name: "Plush Toy",
    price: 8.9,
    imageUrl: "https://picsum.photos/seed/toy/300/300",
    category: "Accessories",
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
  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);
  const { addToCart } = useCart();
  // Toggle selecting products
  const handleToggleProduct = (productId: number) => {
    setSelectedProducts((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  // 🚀 NEW: Add real product objects to the cart
  const handleAddToCart = () => {
    const selectedItems = allProducts.filter((p) =>
      selectedProducts.includes(p.id)
    );

    selectedItems.forEach((product) => addToCart(product));

    alert(`Added ${selectedItems.length} product(s) to cart!`);
    setSelectedProducts([]);
  };

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
    <div className="flex justify-center py-5">
      <div className="layout-content-container flex flex-col w-full max-w-[960px] flex-1 px-4">
        {/* Search Bar */}
        <div className="px-4 py-3">
          <label className="flex flex-col min-w-40 h-12 w-full">
            <div className="flex w-full flex-1 items-stretch rounded-lg h-full">
              <div className="text-[#4c9a66] flex border-none bg-[#e7f3eb] items-center justify-center pl-4 rounded-l-lg border-r-0">
                🔍
              </div>
              <input
                placeholder="Search for products"
                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-r-lg text-[#0d1b12] focus:outline-0 focus:ring-0 border-none bg-[#e7f3eb] h-full placeholder:text-[#4c9a66] px-4 text-base font-normal leading-normal"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </label>
        </div>

        {/* Filters */}
        <div className="flex gap-3 p-3 flex-wrap">
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
          <div className="w-80">
            <PriceRangeFilter
              minPrice={priceRange.min}
              maxPrice={priceRange.max}
              onPriceChange={(min, max) => setPriceRange({ min, max })}
            />
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              isSelected={selectedProducts.includes(product.id)}
              onToggleSelect={() => handleToggleProduct(product.id)}
            />
          ))}
        </div>

        {/* Add To Cart Button (appears when items selected) */}
        {selectedProducts.length > 0 && (
          <div className="fixed bottom-5 right-5 z-40">
            <button
              onClick={handleAddToCart}
              className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-6 bg-[#13ec5b] text-[#0d1b12] text-sm font-bold leading-normal tracking-[0.015em] shadow-lg hover:opacity-90 transition-opacity"
            >
              <span className="truncate">
                Add {selectedProducts.length} to Cart
              </span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;
