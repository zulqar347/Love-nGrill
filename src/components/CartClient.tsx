"use client";

import PaymentDetails from "@/components/PaymentDetails";
import ShippingAdress from "@/components/ShippingAdress";
import useCartStore from "@/stores/cartStores";
import { ShippingFormInputs } from "@/types";
import { ArrowRight, Trash2 } from "lucide-react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";

const steps = [
  { id: "1", name: "Shopping Cart" },
  { id: "2", name: "Shipping Address" },
  { id: "3", name: "Payment Method" },
];

export default function CartClient() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const activeStep = searchParams.get("step") || "1";

  const [shippingForm, setShippingForm] = useState<ShippingFormInputs>();

  const { cart, removeFromCart } = useCartStore();

  return (
    <div>
      {/* Heading */}
      <div className="flex justify-center items-center text-xl text-gray-900 font-semibold mb-6">
        <h1>Your Shopping Cart</h1>
      </div>

      {/* Steps */}
      <div className="flex items-center mb-10 justify-center gap-4 flex-col md:flex-row md:justify-around">
        {steps.map((step) => (
          <div
            onClick={() =>
              router.push(`/cart?step=${step.id}`, { scroll: false })
            }
            key={step.id}
            className="flex items-center gap-2 cursor-pointer"
          >
            <div
              className={`rounded-full px-3 py-2 text-sm ${
                activeStep === step.id ? "bg-gray-600" : "bg-gray-300"
              }`}
            >
              {step.id}
            </div>

            <p
              className={`pb-1 ${
                activeStep === step.id
                  ? "text-gray-800 border-b-4 border-gray-600"
                  : "text-gray-400 border-b-4 border-gray-300"
              }`}
            >
              {step.name}
            </p>
          </div>
        ))}
      </div>

      {/* Main Section */}
      <div className="flex flex-col md:flex-row gap-2 text-sm">
        {/* Left Section */}
        <div className="w-full md:w-7/12 shadow shadow-gray-300 p-4">
          {/* Step 1 */}
          {activeStep === "1" && (
            <div className="flex flex-col gap-2">
              {cart.length === 0 && <p>Your cart is empty</p>}

              {cart.map((item) => (
                <div
                  key={item._id + item.selectedColor + item.selectedSize}
                  className="flex items-center"
                >
                  {/* Image */}
                  <div className="relative w-32 h-32">
                    <Image
                      src={item.images[item.selectedColor]}
                      alt="Product Image"
                      fill
                    />
                  </div>

                  {/* Details */}
                  <div className="flex justify-between w-full">
                    <div className="flex flex-col gap-1 p-2">
                      <h1>{item.name}</h1>
                      <p>quantity: {item.quantity}</p>
                      <p>color: {item.selectedColor}</p>
                      <p>size: {item.selectedSize}</p>
                      <p className="font-medium">${item.price}</p>
                    </div>

                    <Trash2
                      className="w-4 h-4 cursor-pointer text-red-500"
                      onClick={() => removeFromCart(item)}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Step 2 */}
          {activeStep === "2" && (
            <ShippingAdress setShippingForm={setShippingForm} />
          )}

          {/* Step 3 */}
          {activeStep === "3" && <PaymentDetails />}
        </div>

        {/* Right Section */}
        <div className="w-full md:w-5/12 shadow shadow-gray-300 p-4 flex flex-col gap-3">
          <h1 className="font-bold text-gray-900">Cart Details</h1>

          {/* Subtotal */}
          <div className="flex justify-between">
            <p>SubTotal</p>
            <p>
              $
              {cart
                .reduce((acc, item) => acc + item.price * item.quantity, 0)
                .toFixed(2)}
            </p>
          </div>

          {/* Discounts */}
          <div className="flex justify-between">
            <p>Discounts</p>
            <p>$10</p>
          </div>

          {/* Shipping */}
          <div className="flex justify-between">
            <p>Shipping Fee</p>
            <p>$10</p>
          </div>

          <hr />

          {/* Total */}
          <div className="flex justify-between font-semibold">
            <p>Total</p>
            <p>
              $
              {cart
                .reduce((acc, item) => acc + item.price * item.quantity, 0)
                .toFixed(2)}
            </p>
          </div>

          {/* Continue Button */}
          {activeStep === "1" && (
            <button
              onClick={() => router.push(`/cart?step=2`)}
              className="flex items-center justify-center bg-gray-700 text-white p-2 rounded"
            >
              Continue <ArrowRight />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
