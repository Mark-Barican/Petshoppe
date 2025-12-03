"use client";

import React from "react";
<<<<<<< HEAD
<<<<<<< HEAD
import type { Product } from "@/types";
=======
>>>>>>> f4c0b518f790dd226d4a428698a44b109e98390f
=======
>>>>>>> d7e1328f736a776113c8a92ee9221726aeb22ee3

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
<<<<<<< HEAD
<<<<<<< HEAD
    <div className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg animate-fadeDown min-w-[200px] transition-all duration-300">
=======
    <div className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg animate-fadeDown min-w-[200px] transition-all duration-300 flex items-center justify-between gap-2">
>>>>>>> f4c0b518f790dd226d4a428698a44b109e98390f
=======
    <div className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg animate-fadeDown min-w-[200px] transition-all duration-300 flex items-center justify-between gap-2">
>>>>>>> d7e1328f736a776113c8a92ee9221726aeb22ee3
      <div className="flex items-center gap-2">
        <span className="font-medium">{productName}</span>
        <span>added to cart!</span>
      </div>
<<<<<<< HEAD
<<<<<<< HEAD
=======
=======
>>>>>>> d7e1328f736a776113c8a92ee9221726aeb22ee3
      <button
        type="button"
        aria-label="Dismiss notification"
        onClick={() => onRemove(id)}
        className="text-white/80 hover:text-white"
      >
        &times;
      </button>
<<<<<<< HEAD
>>>>>>> f4c0b518f790dd226d4a428698a44b109e98390f
=======
>>>>>>> d7e1328f736a776113c8a92ee9221726aeb22ee3
    </div>
  );
};

export default CartNotification;
