import { Copyright } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <div className="bg-gray-800 rounded-lg p-4 md:p-6 mt-10 text-gray-200 gap-5 flex flex-col items-center sm:items-start sm:flex-row sm:gap-0 sm:justify-between">
      <div className="">
        <Link href={"/"} className="flex items-center">
          <Image
            src={"/logo.png"}
            alt="Love'n Grill"
            height={36}
            width={36}
            className="w-6 h-6 md:w-9 md:h-9"
          />
          <p className=" text-md font-medium tracking-wider">Love'n Grill</p>
        </Link>
        <p className="text-gray-400 flex items-center gap-1">
          <Copyright className="w-4 h-4" />
          2026 Love'n Grill
        </p>
        <p className="text-gray-400">All Rights Reserved</p>
      </div>
      <div className="flex items-start text-gray-400 flex-col">
        <p className="text-gray-200 font-medium">Links</p>
        <Link href={"/"}>HomePage</Link>
        <Link href={"/"}>Contact</Link>
        <Link href={"/"}>Terms of Service</Link>
        <Link href={"/"}>Privacy Policy</Link>
      </div>
      <div className="flex items-start text-gray-400 flex-col">
        <p className="text-gray-200 font-medium">Products</p>
        <Link href={"/"}>All Products</Link>
        <Link href={"/"}>New Arrival</Link>
        <Link href={"/"}>Best Sellers</Link>
        <Link href={"/"}>Sale</Link>
      </div>
      <div className="flex items-start text-gray-400 flex-col">
        <p className="text-gray-200 font-medium">Company</p>
        <Link href={"/"}>About</Link>
        <Link href={"/"}>Contact</Link>
        <Link href={"/"}>Terms of Service</Link>
        <Link href={"/"}>Privacy Policy</Link>
      </div>
    </div>
  );
};

export default Footer;
