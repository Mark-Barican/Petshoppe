"use client";

import React, { useState, useMemo } from "react";
import type { Product } from "../../types";
import ProductCard from "../../components/ProductCard";
import { SearchIcon, CaretDownIcon } from "../../components/icons";

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
    imageUrl: "https://picsum.photos/seed/collar/300/300",
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

const categories = ["All", "Grooming", "Care", "Accessories"];
const priceRanges = ["All", "Under $15", "$15 - $25", "Over $25"];

const ProductsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedPrice, setSelectedPrice] = useState("All");
  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);
  const { addToCart } = useCart();

  const handleToggleProduct = (productId: number) => {
    setSelectedProducts((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const handleAddToCart = () => {
    addToCart(selectedProducts.length);
    alert(`Added ${selectedProducts.length} product(s) to cart!`);
    setSelectedProducts([]);
  };

  const filteredProducts = useMemo(() => {
    return allProducts.filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === "All" || product.category === selectedCategory;
      const matchesPrice =
        selectedPrice === "All" ||
        (selectedPrice === "Under $15" && product.price < 15) ||
        (selectedPrice === "$15 - $25" &&
          product.price >= 15 &&
          product.price <= 25) ||
        (selectedPrice === "Over $25" && product.price > 25);

      return matchesSearch && matchesCategory && matchesPrice;
    });
  }, [searchQuery, selectedCategory, selectedPrice]);

  return (
    <div className="flex justify-center py-5">
      <div className="layout-content-container flex flex-col w-full max-w-[960px] flex-1 px-4">
        <div className="px-4 py-3">
          <label className="flex flex-col min-w-40 h-12 w-full">
            <div className="flex w-full flex-1 items-stretch rounded-lg h-full">
              <div className="text-[#4c9a66] flex border-none bg-[#e7f3eb] items-center justify-center pl-4 rounded-l-lg border-r-0">
                <SearchIcon />
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

        <div className="flex gap-3 p-3 flex-wrap">
          <div className="relative">
            <select
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="appearance-none cursor-pointer flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-[#e7f3eb] pl-4 pr-8 text-[#0d1b12] text-sm font-medium leading-normal focus:outline-none focus:ring-2 focus:ring-[#13ec5b]"
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c === "All" ? "Category" : c}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 text-[#0d1b12]">
              <CaretDownIcon />
            </div>
          </div>
          <div className="relative">
            <select
              onChange={(e) => setSelectedPrice(e.target.value)}
              className="appearance-none cursor-pointer flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-[#e7f3eb] pl-4 pr-8 text-[#0d1b12] text-sm font-medium leading-normal focus:outline-none focus:ring-2 focus:ring-[#13ec5b]"
            >
              {priceRanges.map((p) => (
                <option key={p} value={p}>
                  {p === "All" ? "Price Range" : p}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 text-[#0d1b12]">
              <CaretDownIcon />
            </div>
          </div>
        </div>

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
