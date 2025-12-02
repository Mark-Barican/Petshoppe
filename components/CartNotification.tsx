"use client";

import React from "react";
import type { Product } from "@/types";

interface CartNotificationProps {
  id: string;
  productName: string;
  isVisible: boolean;
  onRemove: (id: string) => void;
}

const CartNotification: React.FC<CartNotificationProps> = ({
  id,
  productName,
  isVisible,
  onRemove,
}) => {
  if (!isVisible) return null;

  return (
    <div className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg animate-fadeDown min-w-[200px] transition-all duration-300">
      <div className="flex items-center gap-2">
        <span className="font-medium">{productName}</span>
        <span>added to cart!</span>
      </div>
    </div>
  );
};

export default CartNotification;
