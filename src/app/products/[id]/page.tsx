import ProductInteraction from "@/components/ProductInteraction";
import { CartItem, ProductType } from "@/types";
import Image from "next/image";
import React from "react";

// Temporary
const product: ProductType = {
  id: 3,
  name: "Nike Air Essentials Pullover",
  shortDescription:
    "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
  description:
    "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
  price: 69.9,
  sizes: ["s", "m", "l"],
  colors: ["green", "blue", "black"],
  images: {
    green: "/products/3gr.png",
    blue: "/products/3b.png",
    black: "/products/3bl.png",
  },
};

export const generateMetaData = async ({
  params,
}: {
  params: { id: string };
}) => {
  // Get the product from db

  // temp
  return { title: product.name, description: product.description };
};

const ProductPage = async ({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ color?: string; size?: string }>;
}) => {
  const { size, color } = await searchParams;
  const selectedColor = color || product.colors[0];
  const selectedSize = size || product.sizes[0];
  return (
    <div className="flex flex-col md:flex-row gap-4 md:gap-12">
      {/* Image */}
      <div className="w-full md:w-5/12 relative aspect-[2/3]">
        <Image src={product.images[selectedColor!]} alt={product.name} fill />
      </div>
      {/* Details */}
      <div className="w-full md:w-7/12 text-sm flex flex-col gap-2 p-2">
        <h1 className="text-lg font-medium">{product.name}</h1>
        <p className="">{product.description}</p>
        <p className="text-md font-medium">${product.price}</p>
        {/* Interactive part */}
        <ProductInteraction
          product={product}
          selectedColor={selectedColor}
          selectedSize={selectedSize}
        />
        {/* Last Part */}
        <div className="flex flex-row gap-2">
          <Image
            src={"/cards.png"}
            alt="cards"
            height={48}
            width={48}
            className="rounded-sm"
          />
          <Image
            src={"/klarna.png"}
            alt="klarna"
            height={48}
            width={48}
            className="rounded-sm"
          />
          <Image
            src={"/stripe.png"}
            alt="stripe"
            height={48}
            width={48}
            className="rounded-sm"
          />
        </div>
        <p>By clicking You agree to terms and conditions</p>
      </div>
    </div>
  );
};

export default ProductPage;
