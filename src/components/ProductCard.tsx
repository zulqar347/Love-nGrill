"use client";
import useCartStore from "@/stores/cartStores";
import { ProductType } from "@/types";
import { ShoppingCart } from "lucide-react";

import Image from "next/image";
import Link from "next/link";
import React, { ChangeEvent, useState } from "react";
import { toast } from "react-toastify";

const ProductCard = ({ product }: { product: ProductType }) => {
  const [productType, setProductType] = useState({
    size: product.sizes[0],
    color: product.colors[0],
  });
  const handleChange = ({
    name,
    value,
  }: {
    name: "size" | "color";
    value: string;
  }) => {
    setProductType((prev) => ({
      ...prev,
      [name]: value,
    }));
    // console.log({ name, value });
  };
  const { addToCart } = useCartStore();
  const handleAddCart = () => {
    addToCart({
      ...product,
      quantity: 1,
      selectedSize: productType.size,
      selectedColor: productType.color,
    });
    toast.success("Product added to Cart");
  };
  return (
    <div className="flex flex-col rounded-lg shadow overflow-hidden ">
      <Link href={`/products/${product._id}`}>
        <div className="relative aspect-[2/3] hover:scale-105 transition-transform duration-200">
          <Image
            src={product.images[productType.color]}
            alt={"Product Image"}
            fill
            sizes="2 2"
          />
        </div>
      </Link>
      {/* PRODUCT DETAILS  */}
      <div className="flex flex-col gap-3 p-2">
        <h1 className="font-semibold">{product.name}</h1>
        <p className="text-gray-500">{product.description}</p>
        {/* Color And Sizes Div With Interactivity */}
        <div className="text-sm flex justify-between items-center text-gray-500">
          {/* SIZES */}
          <div>
            <p className="text-gray-500">Size</p>
            <select
              onChange={(e) =>
                handleChange({ name: "size", value: e.target.value })
              }
              className="border border-gray-400 rounded-lg px-2 cursor-pointer"
            >
              {product.sizes.map((size) => (
                <option key={size} value={size}>
                  {size.toUpperCase()}
                </option>
              ))}
            </select>
          </div>
          {/* COLORS */}
          <div>
            <span>Colors</span>
            <div className="flex gap-2">
              {product.colors.map((color) => (
                <div
                  onClick={() => handleChange({ name: "color", value: color })}
                  key={color}
                  className={
                    productType.color === color
                      ? "h-4 w-4 rounded-full cursor-pointer outline-2 outline-gray-600 "
                      : "h-4 w-4 rounded-full cursor-pointer "
                  }
                  style={{ backgroundColor: `${color}` }}
                ></div>
              ))}
            </div>
          </div>
        </div>
        {/* Price and Add TO cart */}
        <div className="flex justify-between mt-2">
          <p className="text-gray-900">${product.price.toFixed(2)}</p>
          <button
            onClick={handleAddCart}
            className=" cursor-pointer bg-gray-200 px-3 py-1 rounded-md flex items-center text-sm gap-1 active:bg-gray-900 hover:bg-gray-700 hover:text-gray-200 transition duration-200"
          >
            <ShoppingCart className="h-4 w-4" />
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
