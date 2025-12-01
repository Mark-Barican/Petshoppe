"use client";

import { useCart } from "../providers";

export default function CheckoutPage() {
  const { cartItems, cartCount, clearCart } = useCart();

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    alert("Payment Successful! 🐾 Thank you!");
    clearCart();
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>

      {cartCount === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul className="space-y-3">
            {cartItems.map((item) => (
              <li
                key={item.id}
                className="flex justify-between border-b pb-2"
              >
                <span>
                  {item.name} × {item.quantity}
                </span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </li>
            ))}
          </ul>

          <div className="text-xl font-semibold mt-4">
            Total: ${total.toFixed(2)}
          </div>

          <button
            onClick={handleCheckout}
            className="mt-6 bg-green-500 text-white px-6 py-2 rounded-lg"
          >
            Pay Now
          </button>
        </>
      )}
    </div>
  );
}
