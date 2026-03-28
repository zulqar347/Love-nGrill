import { ShippingFormInputs, shippingFormSchema } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";

const ShippingAdress = ({
  setShippingForm,
}: {
  setShippingForm: (data: ShippingFormInputs) => void;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ShippingFormInputs>({
    resolver: zodResolver(shippingFormSchema),
  });
  const router = useRouter();

  const handleShippingForm: SubmitHandler<ShippingFormInputs> = (data) => {
    setShippingForm(data);
    router.push("/cart?step=3", { scroll: false });
  };
  return (
    <form
      className="flex flex-col gap-2"
      onSubmit={handleSubmit(handleShippingForm)}
    >
      {/* Name */}
      <div className="flex flex-col text-sm gap-1 p-1">
        <label htmlFor="name" className="text-gray-500">
          Name
        </label>
        <input
          className="border border-gray-400 rounded-lg p-1"
          type="text"
          id="name"
          placeholder="John Doe..."
          {...register("name")}
        />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
      </div>
      {/* Emial */}
      <div className="flex flex-col text-sm gap-1 p-1">
        <label htmlFor="email" className="text-gray-500">
          Email
        </label>
        <input
          className="border border-gray-400 rounded-lg p-1"
          type="email"
          id="email"
          placeholder="johndoe@gmail.com"
          {...register("email")}
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
      </div>
      {/* Phone NO */}
      <div className="flex flex-col text-sm gap-1 p-1">
        <label htmlFor="phone" className="text-gray-500">
          Phone No
        </label>
        <input
          className="border border-gray-400 rounded-lg p-1"
          type="number"
          id="phone"
          placeholder="123456789"
          {...register("phone")}
        />
        {errors.phone && <p className="text-red-500">{errors.phone.message}</p>}
      </div>
      {/* Address */}
      <div className="flex flex-col text-sm gap-1 p-1">
        <label htmlFor="address" className="text-gray-500">
          Address
        </label>
        <input
          className="border border-gray-400 rounded-lg p-1"
          type="text"
          id="address"
          placeholder="123 Main Haripur"
          {...register("address")}
        />
        {errors.address && (
          <p className="text-red-500">{errors.address.message}</p>
        )}
      </div>
      {/* City */}
      <div className="flex flex-col text-sm gap-1 p-1">
        <label htmlFor="city" className="text-gray-500">
          City
        </label>
        <input
          className="border border-gray-400 rounded-lg p-1"
          type="text"
          id="city"
          placeholder="Haripur"
          {...register("city")}
        />
        {errors.city && <p className="text-red-500">{errors.city.message}</p>}
      </div>
      {/* Submit Form on Continue */}
      <button
        type="submit"
        className="flex items-center mt-2 justify-center w-full bg-gray-700 text-gray-200 p-1 rounded-lg"
      >
        Continue <ArrowRight />
      </button>
    </form>
  );
};

export default ShippingAdress;
