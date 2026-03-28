import {
  PaymentFormInputs,
  paymentFormSchema,
  shippingFormSchema,
} from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

const PaymentDetails = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PaymentFormInputs>({
    resolver: zodResolver(paymentFormSchema),
  });

  const handlePaymentForm: SubmitHandler<PaymentFormInputs> = (data) => {};
  return (
    <form
      className="flex flex-col gap-2 text-sm"
      onSubmit={handleSubmit(handlePaymentForm)}
    >
      {/* cardHolder */}
      <div className="flex flex-col justify-center gap-1">
        <label htmlFor="cardholder">Card Holder</label>
        <input
          id="cardholder"
          type="text"
          placeholder="John Doe..."
          className="border border-gray-400 rounded-lg px-1"
          {...register("cardHolder")}
        />
        {errors.cardHolder && (
          <p className="text-red-500">{errors.cardHolder.message}</p>
        )}
      </div>
      {/* CardNumber */}
      <div className="flex flex-col justify-center gap-1">
        <label htmlFor="cardnumber">Card Holder</label>
        <input
          id="cardnumber"
          type="text"
          placeholder="1234567891011123"
          className="border border-gray-400 rounded-lg px-1"
          {...register("cardNumber")}
        />
        {errors.cardNumber && (
          <p className="text-red-500">{errors.cardNumber.message}</p>
        )}
      </div>
      {/* Expiry Date */}
      <div className="flex flex-col justify-center gap-1">
        <label htmlFor="expiry">Card Holder</label>
        <input
          id="expiry"
          type="text"
          placeholder="MM/YY"
          className="border border-gray-400 rounded-lg px-1"
          {...register("expiryDate")}
        />
        {errors.expiryDate && (
          <p className="text-red-500">{errors.expiryDate.message}</p>
        )}
      </div>
      {/* CVV */}
      <div className="flex flex-col justify-center gap-1">
        <label htmlFor="cvv">Card Holder</label>
        <input
          id="cvv"
          type="text"
          placeholder="531"
          className="border border-gray-400 rounded-lg px-1"
          {...register("cvv")}
        />
        {errors.cvv && <p className="text-red-500">{errors.cvv.message}</p>}
      </div>
      {/* Card Images */}
      <div className="flex gap-2 mt-4">
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
      <button
        onClick={() => toast.success("Order Placed Successfully")}
        type="submit"
        className="flex items-center mt-2 justify-center w-full bg-gray-700 text-gray-200 p-1 rounded-lg"
      >
        Continue <ArrowRight />
      </button>
    </form>
  );
};

export default PaymentDetails;
