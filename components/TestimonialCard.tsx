"use client";

import React from "react";
import type { Testimonial } from "@/types";

interface TestimonialCardProps {
  testimonial: Testimonial;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial }) => {
  return (
    <div className="flex flex-col gap-3 p-6 border border-gray-200 rounded-xl">
      <div className="flex items-center gap-3">
        <div
          className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
          style={{ backgroundImage: `url(${testimonial.avatarUrl})` }}
        ></div>
        <div className="flex-1">
          <p className="text-[#0d1b12] text-base font-medium leading-normal">
            {testimonial.name}
          </p>
          <p className="text-[#4c9a66] text-sm font-normal leading-normal">
            {testimonial.time}
          </p>
        </div>
      </div>
      <div className="flex gap-0.5">
        {[...Array(5)].map((_, i) => (
          <span
            key={i}
            className={
              i < testimonial.rating ? "text-[#13ec5b]" : "text-[#add7bb]"
            }
          >
            ★
          </span>
        ))}
      </div>
      <p className="text-[#0d1b12] text-base font-normal leading-normal">
        "{testimonial.review}"
      </p>
    </div>
  );
};

export default TestimonialCard;
