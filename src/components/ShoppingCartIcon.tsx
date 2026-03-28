"use client";
import useCartStore from "@/stores/cartStores";
import { ShoppingCart } from "lucide-react";
import React from "react";

const ShoppingCartIcon = () => {
  const { cart } = useCartStore();
  return (
    <div className="relative">
      <ShoppingCart className="w-4 h-4" />
      <div className="w-3 h-3 absolute -top-3 -right-3 bg-amber-400 flex items-center justify-center p-2 rounded-full text-sm">
        {cart.length}
      </div>
    </div>
  );
};

export default ShoppingCartIcon;
