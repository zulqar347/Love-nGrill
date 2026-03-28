"use client";
import useCartStore from "@/stores/cartStores";
import { ProductType } from "@/types";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import React from "react";
import { toast } from "react-toastify";

const ProductInteraction = ({
  product,
  selectedColor,
  selectedSize,
}: {
  product: ProductType;
  selectedColor: string;
  selectedSize: string;
}) => {
  const { addToCart } = useCartStore();
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const [quantity, setQuantity] = React.useState(1);

  const handleAddToCart = () => {
    addToCart({
      ...product,
      quantity: quantity,
      selectedColor: selectedColor,
      selectedSize: selectedSize,
    });
    toast.success("Product Added To Cart!");
  };

  const handleParamChange = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(key, value);
    router.push(`${pathName}?${params.toString()}`, { scroll: false });
  };
  return (
    <div className="flex flex-col gap-2">
      {/* Size */}
      <div className="flex flex-col justify-center items-start gap-1">
        <label htmlFor="sizes" className="text-gray-500">
          Sizes
        </label>
        <div className="flex gap-2 " key={"sizes"}>
          {product.sizes.map((size) => (
            <div
              key={size}
              className={`h-4 w-4 border border-gray-600 flex items-center justify-center p-1 cursor-pointer ${selectedSize === size && "bg-gray-800 text-gray-200"}`}
              onClick={() => handleParamChange("size", size)}
            >
              {size.toUpperCase()}
            </div>
          ))}
        </div>
      </div>
      {/* Color */}
      <div className="flex flex-col justify-center items-start gap-1">
        <label htmlFor="colors" className="text-gray-500">
          Colors
        </label>
        <div className="flex gap-2" key={"colors"}>
          {product.colors.map((color) => (
            <div
              key={color}
              style={{ backgroundColor: color }}
              className={`h-4 w-4 cursor-pointer m-1 ${selectedColor === color && "outline-2 outline-gray-500"}`}
              onClick={() => handleParamChange("color", color)}
            ></div>
          ))}
        </div>
      </div>
      {/* Quantity */}
      <div className="flex flex-col justify-center items-start gap-1">
        <label htmlFor="quantity" className="text-gray-500">
          Quantity
        </label>
        <div className="flex gap-2" key={"quantity"}>
          <button
            className="cursor-pointer border-1 border-gray-300"
            onClick={() => quantity > 1 && setQuantity(quantity - 1)}
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="w-4 h-4 flex items-center justify-center border-1 border-gray-300">
            {quantity}
          </span>
          <button
            className="cursor-pointer border-1 border-gray-300"
            onClick={() => setQuantity(quantity + 1)}
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>
      {/* add to cart */}
      <button
        onClick={handleAddToCart}
        className="flex items-center justify-center gap-1 hover:bg-gray-800 cursor-pointer bg-gray-700 text-gray-200 p-1 w-full rounded-lg"
      >
        <Plus className="h-4 w-4" /> Add To Cart
      </button>
      {/* Buy this item */}
      <button className="flex items-center justify-center gap-1 border-1 border-gray-500 cursor-pointer hover:bg-gray-200 p-1 w-full rounded-lg">
        Buy This Item
        <ShoppingCart className="h-4 w-4" />
      </button>
    </div>
  );
};

export default ProductInteraction;
