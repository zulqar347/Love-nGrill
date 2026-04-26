"use client";
import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="rounded-2xl p-10 flex items-center bg-gradient-to-br from-orange-50 via-white to-red-50 px-6 sm:px-10">
      <div className="max-w-6xl mx-auto w-full grid lg:grid-cols-2 gap-10 items-center">
        {/* LEFT */}
        <div className="flex flex-col gap-6">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight">
            Love & Grill
          </h1>

          <p className="text-lg text-gray-600 max-w-md">
            Fresh fast food made with love. Hot, juicy, and ready to satisfy
            your cravings.
          </p>

          {/* Buttons */}
          <div className="flex gap-4">
            <Link
              href="#"
              className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-6 py-3 rounded-lg shadow hover:scale-105 transition"
            >
              Order Now
            </Link>

            <Link
              href="#menu"
              className="border border-orange-300 text-orange-600 px-6 py-3 rounded-lg hover:bg-orange-100 transition"
            >
              View Menu
            </Link>
          </div>
        </div>

        {/* RIGHT */}
        <div className="relative flex justify-center">
          {/* Soft glow behind image */}
          <div className="absolute w-72 h-72 bg-orange-200 rounded-full blur-3xl opacity-40"></div>

          <Image
            src="/burger.png" // replace with your image
            alt="Food"
            width={450}
            height={450}
            className="relative z-10 object-contain drop-shadow-2xl hover:scale-105 transition duration-500"
          />
        </div>
      </div>
    </section>
  );
}
