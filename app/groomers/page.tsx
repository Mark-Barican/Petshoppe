"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

interface GroomerReview {
  id: number;
  rating: number;
  comment: string | null;
  createdAt: string;
  user: {
    name: string | null;
    email: string;
  } | null;
  appointmentId: number;
  petName: string;
  ownerName: string;
}

interface Groomer {
  name: string;
  appointments: number;
  reviews: GroomerReview[];
  averageRating: number;
  totalReviews: number;
}

export default function GroomersPage() {
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const groomerParam = searchParams?.get("groomer");

  // Construct services URL with groomer parameter if present
  const servicesLink = groomerParam
    ? `/services?groomer=${groomerParam}`
    : "/services";

  // Static groomer data with fake reviews
  const groomers = [
    {
      name: "Jessica",
      appointments: 28,
      reviews: [
        {
          id: 1,
          rating: 5,
          comment:
            "Jessica is amazing with my anxious dog. She's so patient and gentle!",
          createdAt: new Date(
            Date.now() - 2 * 24 * 60 * 60 * 1000
          ).toISOString(),
          user: { name: "Maria Santos", email: "maria@example.com" },
          appointmentId: 1,
          petName: "Buddy",
          ownerName: "Maria Santos",
        },
        {
          id: 2,
          rating: 4,
          comment: "Great job on the grooming. My dog looked beautiful!",
          createdAt: new Date(
            Date.now() - 5 * 24 * 60 * 60 * 1000
          ).toISOString(),
          user: { name: "James Wilson", email: "james@example.com" },
          appointmentId: 2,
          petName: "Charlie",
          ownerName: "James Wilson",
        },
        {
          id: 3,
          rating: 5,
          comment: "Professional and caring. Highly recommend Jessica!",
          createdAt: new Date(
            Date.now() - 10 * 24 * 60 * 60 * 1000
          ).toISOString(),
          user: { name: "Robert Lee", email: "robert@example.com" },
          appointmentId: 3,
          petName: "Luna",
          ownerName: "Robert Lee",
        },
      ],
      averageRating: 4.7,
      totalReviews: 3,
    },
    {
      name: "Mike",
      appointments: 35,
      reviews: [
        {
          id: 4,
          rating: 5,
          comment:
            "Mike has been grooming my pets for years. Always does a great job!",
          createdAt: new Date(Date.now() - 1 * 24 * 60 * 1000).toISOString(),
          user: { name: "Emily Parker", email: "emily@example.com" },
          appointmentId: 4,
          petName: "Max",
          ownerName: "Emily Parker",
        },
        {
          id: 5,
          rating: 4,
          comment:
            "Experienced groomer. My cat was comfortable the whole time.",
          createdAt: new Date(Date.now() - 7 * 24 * 60 * 1000).toISOString(),
          user: { name: "David Kim", email: "david@example.com" },
          appointmentId: 5,
          petName: "Whiskers",
          ownerName: "David Kim",
        },
      ],
      averageRating: 4.5,
      totalReviews: 2,
    },
    {
      name: "Sandra",
      appointments: 22,
      reviews: [
        {
          id: 6,
          rating: 5,
          comment:
            "Sandra is wonderful with all types of pets. Very professional!",
          createdAt: new Date(Date.now() - 3 * 24 * 60 * 1000).toISOString(),
          user: { name: "Lisa Johnson", email: "lisa@example.com" },
          appointmentId: 6,
          petName: "Rocky",
          ownerName: "Lisa Johnson",
        },
        {
          id: 7,
          rating: 5,
          comment: "Did an excellent job on my long-haired cat. So pleased!",
          createdAt: new Date(Date.now() - 8 * 24 * 60 * 1000).toISOString(),
          user: { name: "Michael Chen", email: "michael@example.com" },
          appointmentId: 7,
          petName: "Princess",
          ownerName: "Michael Chen",
        },
        {
          id: 8,
          rating: 4,
          comment: "Great attention to detail. My pet looked fantastic!",
          createdAt: new Date(Date.now() - 15 * 24 * 60 * 1000).toISOString(),
          user: { name: "Sarah Williams", email: "sarah@example.com" },
          appointmentId: 8,
          petName: "Bella",
          ownerName: "Sarah Williams",
        },
      ],
      averageRating: 4.7,
      totalReviews: 3,
    },
    {
      name: "Alex",
      appointments: 19,
      reviews: [
        {
          id: 9,
          rating: 5,
          comment:
            "Alex is fantastic with nervous pets. Very gentle and caring.",
          createdAt: new Date(
            Date.now() - 4 * 24 * 60 * 60 * 1000
          ).toISOString(),
          user: { name: "Thomas Brown", email: "thomas@example.com" },
          appointmentId: 9,
          petName: "Cooper",
          ownerName: "Thomas Brown",
        },
        {
          id: 10,
          rating: 4,
          comment: "Professional service and great results. Will book again.",
          createdAt: new Date(
            Date.now() - 12 * 24 * 60 * 60 * 1000
          ).toISOString(),
          user: { name: "Jennifer Davis", email: "jennifer@example.com" },
          appointmentId: 10,
          petName: "Daisy",
          ownerName: "Jennifer Davis",
        },
      ],
      averageRating: 4.5,
      totalReviews: 2,
    },
    {
      name: "Taylor",
      appointments: 31,
      reviews: [
        {
          id: 11,
          rating: 5,
          comment:
            "Taylor is an expert groomer. My dog loves going to see them!",
          createdAt: new Date(
            Date.now() - 2 * 24 * 60 * 60 * 1000
          ).toISOString(),
          user: { name: "Christopher Miller", email: "chris@example.com" },
          appointmentId: 11,
          petName: "Bear",
          ownerName: "Christopher Miller",
        },
        {
          id: 12,
          rating: 5,
          comment: "Outstanding service. Very pleased with the results.",
          createdAt: new Date(
            Date.now() - 6 * 24 * 60 * 60 * 1000
          ).toISOString(),
          user: { name: "Amanda Taylor", email: "amanda@example.com" },
          appointmentId: 12,
          petName: "Lucky",
          ownerName: "Amanda Taylor",
        },
        {
          id: 13,
          rating: 4,
          comment: "Professional and efficient. Great with my energetic pup.",
          createdAt: new Date(
            Date.now() - 9 * 24 * 60 * 60 * 1000
          ).toISOString(),
          user: { name: "Kevin Garcia", email: "kevin@example.com" },
          appointmentId: 13,
          petName: "Rusty",
          ownerName: "Kevin Garcia",
        },
      ],
      averageRating: 4.7,
      totalReviews: 3,
    },
  ];

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <span
        key={i}
        className={
          i < Math.floor(rating)
            ? "text-[#13ec5b] text-lg"
            : "text-[#add7bb] text-lg"
        }
      >
        ★
      </span>
    ));
  };

  return (
    <div className="flex justify-center py-8">
      <div className="layout-content-container flex flex-col w-full max-w-6xl flex-1 px-4 sm:px-0">
        {/* Back Button */}
        <div className="px-4 pb-3 pt-6">
          <Link
            href={servicesLink}
            className="text-[#0d1b12] text-base font-medium hover:text-[#4c9a66] flex items-center gap-2 transition-colors duration-200"
          >
            <span className="text-lg">←</span>
            <span>Back to services page</span>
          </Link>
        </div>

        {/* Title */}
        <h1 className="text-[#0d1b12] text-3xl font-bold leading-tight px-4 pb-3 pt-2 text-center">
          Meet Our Professional Groomers
        </h1>
        <p className="text-center text-gray-600 px-4 pb-6 max-w-2xl">
          Our experienced groomers are passionate about caring for your pets.
          Each professional has been carefully selected for their expertise and
          love for animals.
        </p>

        {/* Loading */}
        {loading && (
          <div className="flex justify-center items-center p-16">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#13ec5b] mb-4"></div>
              <p className="text-gray-600 text-lg">
                Loading our professional groomers...
              </p>
            </div>
          </div>
        )}

        {/* No groomers */}
        {!loading && groomers.length === 0 && (
          <div className="text-center p-12 bg-gray-50 rounded-xl mx-4 max-w-2xl self-center">
            <h3 className="text-xl font-semibold text-[#0d1b12] mb-2">
              No Groomers Available
            </h3>
            <p className="text-gray-600 mb-4">
              We're currently updating our team of professional groomers. Please
              check back soon!
            </p>
            <Link
              href="/"
              className="inline-block px-6 py-2 bg-[#13ec5b] text-[#0d1b12] font-medium rounded-lg hover:bg-green-500 transition-colors"
            >
              Return to Home
            </Link>
          </div>
        )}

        {/* Groomers grid */}
        {!loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-4">
            {groomers.map((groomer) => (
              <div
                key={groomer.name}
                className="flex flex-col gap-4 p-6 border border-gray-100 rounded-xl bg-gradient-to-br from-white to-gray-50 shadow-sm relative overflow-hidden"
              >
                <div className="flex items-center gap-4">
                  <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 flex items-center justify-center">
                    <span className="text-gray-500 text-xs font-medium">
                      {groomer.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#0d1b12]">
                      {groomer.name}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex">
                        {renderStars(groomer.averageRating)}
                      </div>
                      <span className="text-[#0d1b12] text-sm font-medium">
                        {groomer.averageRating.toFixed(1)}
                      </span>
                      <span className="text-gray-500 text-sm">
                        ({groomer.totalReviews} reviews)
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-2">
                  <p className="text-[#0d1b12] text-base">
                    <span className="font-semibold">
                      Completed Appointments:
                    </span>{" "}
                    {groomer.appointments}
                  </p>
                  <p className="text-[#0d1b12] text-base mt-1">
                    <span className="font-semibold">Experience:</span>{" "}
                    Professional pet groomer with attention to detail
                  </p>
                </div>

                {/* Reviews Section */}
                <div className="mt-4">
                  <h4 className="text-lg font-semibold text-[#0d1b12] mb-2">
                    Recent Reviews
                  </h4>
                  {groomer.reviews.length > 0 ? (
                    <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
                      {groomer.reviews.slice(0, 3).map((review) => (
                        <div
                          key={review.id}
                          className="border-b border-gray-100 pb-2 last:border-0 last:pb-0"
                        >
                          <div className="flex items-center gap-2">
                            <div className="flex">
                              {renderStars(review.rating)}
                            </div>
                            <span className="text-sm text-gray-500">
                              {new Date(review.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                          <p className="text-[#0d1b12] text-sm mt-1">
                            "{review.comment || "No comment provided"}"
                          </p>
                          <p className="text-gray-600 text-xs mt-1">
                            by {review.ownerName} for {review.petName}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-sm">No reviews yet</p>
                  )}
                </div>

                <div className="mt-auto pt-4">
                  <Link
                    href={`/services?groomer=${encodeURIComponent(
                      groomer.name
                    )}`}
                  >
                    <button className="w-full px-4 py-2 bg-[#13ec5b] text-[#0d1b12] text-sm font-bold rounded-lg hover:bg-green-500 transition-colors">
                      Book Appointment with {groomer.name.split(" ")[0]}
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
