import React from "react";
import Link from "next/link";
import { FacebookIcon, InstagramIcon, TwitterIcon } from "./icons";

const Footer: React.FC = () => {
  return (
    <footer className="flex justify-center border-t border-solid border-t-[#e7f3eb]">
      <div className="flex w-full max-w-[960px] flex-1 flex-col">
        <div className="flex flex-col gap-6 px-5 py-10 text-center">
          <div className="flex flex-wrap items-center justify-center gap-6 sm:justify-around">
            <Link
              className="text-[#4c9a66] text-base font-normal leading-normal min-w-40 hover:text-[#13ec5b]"
              href="/"
            >
              Home
            </Link>
            <Link
              className="text-[#4c9a66] text-base font-normal leading-normal min-w-40 hover:text-[#13ec5b]"
              href="/products"
            >
              Products
            </Link>
            <Link
              className="text-[#4c9a66] text-base font-normal leading-normal min-w-40 hover:text-[#13ec5b]"
              href="/booking"
            >
              Appointments
            </Link>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="#" className="text-[#4c9a66] hover:text-[#0d1b12]">
              <FacebookIcon />
            </a>
            <a href="#" className="text-[#4c9a66] hover:text-[#0d1b12]">
              <InstagramIcon />
            </a>
            <a href="#" className="text-[#4c9a66] hover:text-[#0d1b12]">
              <TwitterIcon />
            </a>
          </div>
          <p className="text-[#4c9a66] text-base font-normal leading-normal">
            © 2024 Petshoppe. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
