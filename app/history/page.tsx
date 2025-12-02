"use client";

import { useState, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import { Order } from "../../types";

export default function OrderHistoryPage() {
  const { user, loading } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [hasLoadedOrders, setHasLoadedOrders] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      if (user) {
        try {
          const response = await fetch("/api/orders", {
            credentials: "include",
          });
          if (response.ok) {
            const data = await response.json();
            setOrders(data);
          } else {
            console.error("Failed to fetch orders:", response.status);
          }
        } catch (error) {
          console.error("Error fetching orders:", error);
        } finally {
          setLoadingOrders(false);
          setHasLoadedOrders(true);
        }
      } else {
        setLoadingOrders(false);
      }
    };

    fetchOrders();
  }, [user]);

  if (loading || loadingOrders) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-green-500 mb-4"></div>
          <p className="text-gray-600">Loading order history...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] p-6 max-w-4xl mx-auto">
        <div className="text-center">
          <p className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
            Please log in to view your order history
          </p>
          <a
            href="/login"
            className="text-2xl text-green-600 hover:underline transition-colors duration-300"
          >
            Login
          </a>
        </div>
      </div>
    );
  }

  if (orders.length === 0 && !loadingOrders && hasLoadedOrders) {
    return (
      <div className="p-4 md:p-6 max-w-6xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold mb-6">Order History</h1>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <p className="text-gray-600 text-center py-8">
            You haven't placed any orders yet.
          </p>
          <div className="text-center mt-6">
            <a
              href="/products"
              className="inline-block bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition-colors"
            >
              Start Shopping
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl md:text-3xl font-bold mb-6">Order History</h1>

      <div className="space-y-6">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
          >
            <div className="flex justify-between items-center mb-4">
              <a href={`/history/${order.id}`} className="hover:underline">
                <h2 className="text-xl font-semibold">Order # {order.id}</h2>
              </a>
              <div className="text-sm text-gray-500">
                <p>{new Date(order.createdAt).toLocaleDateString()}</p>
                <span
                  className={`inline-block px-2 py-1 rounded-full text-xs font-medium mt-1 ${
                    order.status === "PAID"
                      ? "bg-green-100 text-green-800"
                      : order.status === "SHIPPED"
                      ? "bg-blue-100 text-blue-800"
                      : order.status === "COMPLETED"
                      ? "bg-purple-100 text-purple-800"
                      : order.status === "CANCELLED"
                      ? "bg-red-100 text-red-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {order.status}
                </span>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-gray-600">
                Total:{" "}
                <span className="font-semibold">${order.total.toFixed(2)}</span>
              </p>
            </div>

            <div className="space-y-4">
              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center border-b pb-4 last:border-0 last:pb-0"
                >
                  <div className="w-16 h-16 bg-gray-20 rounded-md mr-4 flex items-center justify-center">
                    <span className="text-gray-500 text-xs">Image</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">{item.product.name}</h3>
                    <p className="text-sm text-gray-500">
                      Price: ${item.price.toFixed(2)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">
                      Qty: {item.quantity}
                    </p>
                    <p className="font-medium">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
