"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogoIcon, CartIcon, MenuIcon, CloseIcon } from "./icons";
import { useCart } from "../app/providers";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const { cartCount } = useCart();

  const linkStyle =
    "text-[#0d1b12] text-sm font-medium leading-normal hover:text-[#4c9a66] transition-colors";
  const activeLinkStyle = "text-[#13ec5b]";

  const isActive = (path: string) => pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-[#f8fcf9]/80 backdrop-blur-sm">
      <div className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#e7f3eb] px-4 sm:px-10 py-3">
        <Link href="/" className="flex items-center gap-4 text-[#0d1b12]">
          <div className="size-6">
            <LogoIcon />
          </div>
          <h2 className="text-[#0d1b12] text-lg font-bold leading-tight tracking-[-0.015em]">
            Petshoppe
          </h2>
        </Link>
        <nav className="hidden md:flex items-center gap-9">
          <Link
            href="/"
            className={`${linkStyle} ${isActive("/") ? activeLinkStyle : ""}`}
          >
            Home
          </Link>
          <Link
            href="/booking"
            className={`${linkStyle} ${
              isActive("/booking") ? activeLinkStyle : ""
            }`}
          >
            Services
          </Link>
          <Link
            href="/products"
            className={`${linkStyle} ${
              isActive("/products") ? activeLinkStyle : ""
            }`}
          >
            Products
          </Link>
          <Link
            href="/"
            className={`${linkStyle} ${isActive("/") ? activeLinkStyle : ""}`}
          >
            Contact
          </Link>
        </nav>
        <div className="flex items-center gap-2">
          <button className="relative flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 bg-[#e7f3eb] text-[#0d1b12] gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-2.5">
            <div className="text-[#0d1b12]">
              <CartIcon />
            </div>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#13ec5b] text-xs font-bold text-[#0d1b12]">
                {cartCount}
              </span>
            )}
          </button>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 bg-[#e7f3eb] text-[#0d1b12] gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-2.5"
          >
            {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden bg-[#f8fcf9] border-b border-solid border-b-[#e7f3eb] py-4 px-10">
          <nav className="flex flex-col items-start gap-4">
            <Link
              href="/"
              className={`${linkStyle} ${isActive("/") ? activeLinkStyle : ""}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/booking"
              className={`${linkStyle} ${
                isActive("/booking") ? activeLinkStyle : ""
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Services
            </Link>
            <Link
              href="/products"
              className={`${linkStyle} ${
                isActive("/products") ? activeLinkStyle : ""
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Products
            </Link>
            <Link
              href="/"
              className={`${linkStyle} ${isActive("/") ? activeLinkStyle : ""}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
