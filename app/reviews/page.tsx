"use client";

import React from "react";
import type { Testimonial } from "@/types";
import TestimonialCard from "../../components/TestimonialCard";

const allTestimonials: Testimonial[] = [
  {
    name: "Sophia Clark",
    time: "2 months ago",
    rating: 5,
    review:
      "My dog, Max, always comes back happy and looking great! The groomers are so caring and professional.",
    avatarUrl: "https://picsum.photos/id/1027/100",
  },
  {
    name: "Ethan Miller",
    time: "3 months ago",
    rating: 4,
    review:
      "The service was excellent, and my cat, Whiskers, was very relaxed throughout the grooming session.",
    avatarUrl: "https://picsum.photos/id/1005/100",
  },
  {
    name: "Olivia Davis",
    time: "4 months ago",
    rating: 5,
    review:
      "I've been bringing my pets here for years, and they always do an amazing job. Highly recommend!",
    avatarUrl: "https://picsum.photos/id/1011/100/100",
  },
  {
    name: "James Wilson",
    time: "1 month ago",
    rating: 5,
    review:
      "The staff is incredibly knowledgeable and patient with my anxious dog. The grooming results are always fantastic!",
    avatarUrl: "https://picsum.photos/id/1018/100",
  },
  {
    name: "Ava Thompson",
    time: "3 weeks ago",
    rating: 4,
    review:
      "Great experience overall. My puppy's nails were trimmed carefully and she was so gentle during the process.",
    avatarUrl: "https://picsum.photos/id/1012/100/100",
  },
  {
    name: "Noah Johnson",
    time: "5 weeks ago",
    rating: 5,
    review:
      "Professional service and my pet looks so healthy and clean after each visit. I trust them completely with my pets.",
    avatarUrl: "https://picsum.photos/id/1008/100/100",
  },
  {
    name: "Mia Rodriguez",
    time: "6 weeks ago",
    rating: 5,
    review:
      "The grooming service exceeded my expectations. My pet was treated with care and came back looking adorable.",
    avatarUrl: "https://picsum.photos/id/1015/100/100",
  },
  {
    name: "Liam Martinez",
    time: "2 months ago",
    rating: 5,
    review:
      "Fantastic service! My pets always come back looking and smelling wonderful. The team really cares about each animal.",
    avatarUrl: "https://picsum.photos/id/1025/100/100",
  },
  {
    name: "Emma Garcia",
    time: "1 month ago",
    rating: 4,
    review:
      "Very professional and thorough grooming service. My pet was comfortable throughout the entire process.",
    avatarUrl: "https://picsum.photos/id/1016/100",
  },
  {
    name: "Oliver Hernandez",
    time: "3 weeks ago",
    rating: 5,
    review:
      "Outstanding care and attention to detail. The groomers really know how to handle different temperaments and needs.",
    avatarUrl: "https://picsum.photos/id/1020/100/100",
  },
  {
    name: "Isabella Lopez",
    time: "4 weeks ago",
    rating: 5,
    review:
      "My go-to pet grooming service. They always do a great job and my pet enjoys the experience too!",
    avatarUrl: "https://picsum.photos/id/1013/100",
  },
  {
    name: "William Gonzalez",
    time: "2 months ago",
    rating: 4,
    review:
      "Reliable and trustworthy service. The staff is friendly and knowledgeable about pet care.",
    avatarUrl: "https://picsum.photos/id/1009/10/100",
  },
  {
    name: "Charlotte Wilson",
    time: "1 month ago",
    rating: 5,
    review:
      "The grooming transformed my pet! They look so much better and healthier after each visit. Highly recommended!",
    avatarUrl: "https://picsum.photos/id/1019/100/100",
  },
  {
    name: "Benjamin Anderson",
    time: "5 weeks ago",
    rating: 5,
    review:
      "Excellent service from start to finish. The facility is clean and the staff treats pets like family.",
    avatarUrl: "https://picsum.photos/id/1003/100",
  },
];

const ReviewsPage: React.FC = () => {
  return (
    <div className="flex justify-center py-5">
      <div className="layout-content-container flex flex-col w-full max-w-[960px] flex-1 px-4 sm:px-0 rounded-bl-2xl rounded-br-2xl">
        <h1 className="text-[#0d1b12] text-[28px] font-bold leading-tight px-4 pb-3 pt-6">
          All Customer Reviews
        </h1>

        <div className="flex flex-col gap-8 overflow-x-hidden p-4">
          {allTestimonials.map((testimonial, index) => (
            <TestimonialCard key={index} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReviewsPage;
