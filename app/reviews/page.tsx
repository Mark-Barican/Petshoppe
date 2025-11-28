"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import TestimonialCard from "../../components/TestimonialCard";

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadReviews() {
      try {
        const res = await fetch("/api/reviews", { cache: "no-store" });
        const data = await res.json();
        setReviews(data);
      } catch (err) {
        console.error("Failed to fetch reviews:", err);
      } finally {
        setLoading(false);
      }
    }

    loadReviews();
  }, []);

  return (
    <div className="flex justify-center py-5">
      <div className="layout-content-container flex flex-col w-full max-w-[960px] flex-1 px-4 sm:px-0 rounded-bl-2xl rounded-br-2xl">

        {/* Back Button */}
        <div className="px-4 pb-3 pt-6">
          <a
            href="/"
            className="text-[#0d1b12] text-base font-medium hover:text-[#4c9a66] flex items-center gap-2"
          >
            <span>←</span>
            <span>Back to home page</span>
          </a>
        </div>

        {/* Title */}
        <h1 className="text-[#0d1b12] text-[28px] font-bold leading-tight px-4 pb-3 pt-2">
          All Customer Reviews
        </h1>

        {/* Write Review Button */}
        <div className="px-4 pb-5">
          <Link href="/reviews/new">
            <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
              ➕ Write a Review
            </button>
          </Link>
        </div>

        {/* Loading */}
        {loading && (
          <p className="text-center text-gray-600 p-4">Loading reviews...</p>
        )}

        {/* No reviews */}
        {!loading && reviews.length === 0 && (
          <p className="text-center text-gray-600 p-4">
            No reviews yet. Be the first to write one!
          </p>
        )}

        {/* Reviews grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-4">
          {reviews.map((review: any) => {
            const displayName =
              review.user?.name ||
              review.user?.email ||
              "Anonymous";

            return (
              <TestimonialCard
                key={review.id}
                testimonial={{
                  name: displayName,
                  time: new Date(review.createdAt).toLocaleDateString(),
                  rating: review.rating,
                  review: review.comment,
                  avatarUrl:
                    review.user?.avatar ||
                    `https://api.dicebear.com/7.x/initials/svg?seed=${displayName}`,
                }}
              />
            );
          })}
        </div>

      </div>
    </div>
  );
}
