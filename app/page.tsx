"use client";

import React from "react";
import type { Testimonial } from "@/types";
import TestimonialCard from "../components/TestimonialCard";
import { useAuth } from "@/hooks/useAuth";

const testimonials: Testimonial[] = [
  {
    name: "Sophia Clark",
    time: "2 months ago",
    rating: 5,
    review:
      "My dog, Max, always comes back happy and looking great! The groomers are so caring and professional.",
    avatarUrl: "https://picsum.photos/id/1027/100/100",
  },
  {
    name: "Ethan Miller",
    time: "3 months ago",
    rating: 4,
    review:
      "The service was excellent, and my cat, Whiskers, was very relaxed throughout the grooming session.",
    avatarUrl: "https://picsum.photos/id/1005/100/100",
  },
  {
    name: "Olivia Davis",
    time: "4 months ago",
    rating: 5,
    review:
      "I've been bringing my pets here for years, and they always do an amazing job. Highly recommend!",
    avatarUrl: "https://picsum.photos/id/1011/100/100",
  },
];

const HomePage: React.FC = () => {
  const { user, loading } = useAuth();

  // Show loading state while checking auth
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-lg font-semibold">
        Checking session...
      </div>
    );
  }

  // Updated logout function
  const handleLogout = async () => {
    try {
      const res = await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include", // ensures cookie is sent with the request
      });

      if (res.ok) {
        localStorage.clear();
        sessionStorage.clear();
        window.location.reload();
      }
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <div className="flex justify-center py-5">
      <div className="layout-content-container flex flex-col w-full max-w-[960px] flex-1 px-4 sm:px-0">
        {/* 🔹 Top-right Auth Controls */}
        <div className="flex justify-end gap-3 mb-4">
          {user ? (
            <>
              <span className="text-sm font-medium text-gray-700 flex items-center">
                Welcome, <span className="ml-1 font-semibold">{user.email}</span>
              </span>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm font-semibold bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <a
                href="/login"
                className="px-4 py-2 text-sm font-semibold bg-[#e7f3eb] text-[#0d1b12] rounded-full hover:bg-[#d8e9df] transition-colors"
              >
                Login
              </a>
              <a
                href="/register"
                className="px-4 py-2 text-sm font-semibold bg-[#13ec5b] text-[#0d1b12] rounded-full hover:opacity-90 transition-opacity"
              >
                Register
              </a>
            </>
          )}
        </div>

        {/* 🔹 Main content */}
        <div className="relative flex items-center justify-center bg-black aspect-video rounded-lg overflow-hidden"></div>
        <h1 className="text-[#0d1b12] tracking-light text-2xl md:text-[32px] font-bold leading-tight px-4 text-center pb-3 pt-6">
          Your Pet's Grooming Partner
        </h1>

        <div className="flex flex-col sm:flex-row justify-center gap-4 my-4">
          <a
            href="/booking"
            className="flex min-w-[120px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 bg-[#13ec5b] text-[#0d1b12] text-sm font-bold leading-normal tracking-[0.015em] hover:opacity-90 transition-opacity"
          >
            <span className="truncate">Book Appointment</span>
          </a>
          <a
            href="/products"
            className="flex min-w-[120px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 bg-[#e7f3eb] text-[#0d1b12] text-sm font-bold leading-normal tracking-[0.015em] hover:bg-[#d8e9df] transition-colors"
          >
            <span className="truncate">Shop Products</span>
          </a>
        </div>

        {/* 🔹 Testimonials section */}
        <h2 className="text-[#0d1b12] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
          Customer Testimonials
        </h2>
        <div className="flex flex-col gap-8 overflow-x-hidden p-4">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
