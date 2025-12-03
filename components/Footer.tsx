import React from "react";
<<<<<<< HEAD
<<<<<<< HEAD
import Link from "next/link";
=======
>>>>>>> f4c0b518f790dd226d4a428698a44b109e98390f
=======
>>>>>>> d7e1328f736a776113c8a92ee9221726aeb22ee3
import FacebookIcon from "./icons/FacebookIcon";
import InstagramIcon from "./icons/InstagramIcon";
import TwitterIcon from "./icons/TwitterIcon";

const Footer: React.FC = () => {
  return (
    <footer className="flex justify-center border-t-2 border-solid border-t-gray-300">
      <div className="flex w-full max-w-[960px] flex-1 flex-col">
        <div className="flex flex-col gap-6 px-5 py-10 text-center rounded-tl-2xl rounded-tr-2xl">
          <div className="flex flex-wrap justify-center gap-4">
            <a href="#" className="text-[#1877F2] hover:text-[#1877F2]/80">
              <FacebookIcon width="24" height="24" color="#1877F2" />
            </a>
            <a href="#" className="text-[#E4405F] hover:text-[#E4405F]/80">
              <InstagramIcon width="24" height="24" color="#E4405F" />
            </a>
            <a href="#" className="text-[#1DA1F2] hover:text-[#1DA1F2]/80">
              <TwitterIcon width="24" height="24" color="#1DA1F2" />
            </a>
          </div>
          <p className="text-[#4c9a66] text-base font-normal leading-normal">
            © 2025 Petshoppe. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
