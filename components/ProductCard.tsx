"use client";

import React from "react";
import type { Product } from "@/types";

interface ProductCardProps {
  product: Product;
  isSelected: boolean;
  onToggleSelect: (id: number) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isSelected,
  onToggleSelect,
}) => {
  return (
    <div
      className={`flex flex-col gap-3 pb-3 cursor-pointer group rounded-lg transition-all ${
        isSelected ? "ring-2 ring-[#13ec5b] shadow-lg" : ""
      }`}
      onClick={() => onToggleSelect(product.id)}
    >
      <div className="w-full bg-black aspect-square rounded-lg overflow-hidden"></div>
      <div>
        <p className="text-[#0d1b12] text-base font-medium leading-normal">
          {product.name}
        </p>
        <p className="text-[#4c9a66] text-sm font-normal leading-normal">
          ${product.price.toFixed(2)}
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
