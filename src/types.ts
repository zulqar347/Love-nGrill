import { z } from "zod";
import { DefaultSession } from "next-auth";
export type ProductType = {
  _id: any;
  name: string;
  shortDescription: string;
  description: string;
  price: number;
  sizes: string[];
  colors: string[];
  images: Record<string, string>;
  createdAt?: Date;
  updatedAt?: Date;
};

export type ProductsType = ProductType[];

export type CartItem = ProductType & {
  quantity: number;
  selectedColor: string;
  selectedSize: string;
};

export type CartItemsType = CartItem[];

export const shippingFormSchema = z.object({
  name: z.string().min(1, "Name is Required!"),
  email: z.email().min(1, "Email is Required"),
  phone: z
    .string()
    .min(7, "Phone number must be between 7 to 11 characters!")
    .max(11, "Phone number must be between 7 to 11 characters!")
    .regex(/^\d+$/, "Phone number should only contain numbers"),
  address: z.string().min(1, "Adress is Required"),
  city: z.string().min(1, "City is Required"),
});

export type ShippingFormInputs = z.infer<typeof shippingFormSchema>;

export const paymentFormSchema = z.object({
  cardHolder: z.string().min(1, "Card holder is required"),
  cardNumber: z
    .string()
    .min(16, "Card number is required")
    .max(16, "Card number is required"),
  expiryDate: z
    .string()
    .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Expiry Date should be in format MM/YY"),
  cvv: z.string().min(3, "CVV is required").max(3, "CVV is required"),
});

export type PaymentFormInputs = z.infer<typeof paymentFormSchema>;

export type CartStoreStateType = {
  cart: CartItemsType;
  // hasHydrated: boolean
};

export type CartStoreActionsType = {
  addToCart: (product: CartItem) => void;
  removeFromCart: (product: CartItem) => void;
  clearCart: () => void;
};

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: string;
    } & DefaultSession["user"];
  }

  interface User {
    role?: string;
  }
}
