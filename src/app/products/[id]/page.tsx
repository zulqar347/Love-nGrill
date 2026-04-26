import ProductInteraction from "@/components/ProductInteraction";
import { connectDB } from "@/lib/db";
import Product from "@/lib/models/Products";
import { CartItem, ProductType } from "@/types";
import Image from "next/image";
import React from "react";

let product: ProductType;
try {
  await connectDB();
  const rawProduct = await Product.find().lean();
  product = JSON.parse(JSON.stringify(rawProduct));
} catch (error) {
  console.error(error);
}

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
