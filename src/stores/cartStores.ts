import { CartStoreActionsType, CartStoreStateType } from "@/types";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { v4 as uuidv4 } from "uuid";

const useCartStore = create<CartStoreStateType & CartStoreActionsType>()(
  persist(
    (set, get) => ({
      cart: [],

      addToCart: (product) =>
        set((state) => {
          const existing = state.cart.find(
            (p) =>
              p.id === product.id &&
              p.selectedColor === product.selectedColor &&
              p.selectedSize === product.selectedSize,
          );

          if (existing) {
            // increase quantity
            return {
              cart: state.cart.map((p) =>
                p.id === product.id &&
                p.selectedColor === product.selectedColor &&
                p.selectedSize === product.selectedSize
                  ? { ...p, quantity: (p.quantity || 1) + 1 }
                  : p,
              ),
            };
          }

          return {
            cart: [
              ...state.cart,
              { ...product, quantity: product.quantity || 1 },
            ],
          };
        }),

      removeFromCart: (product) =>
        set((state) => {
          const existing = state.cart.find(
            (p) =>
              p.id === product.id &&
              p.selectedColor === product.selectedColor &&
              p.selectedSize === product.selectedSize,
          );
          if (!existing) {
            return {};
          }

          if (existing?.quantity > 1) {
            return {
              cart: state.cart.map((p) =>
                p.id === product.id &&
                p.selectedColor === product.selectedColor &&
                p.selectedSize === product.selectedSize
                  ? { ...p, quantity: p.quantity - 1 }
                  : p,
              ),
            };
          }

          return {
            cart: state.cart.filter(
              (p) =>
                !(
                  p.id === product.id &&
                  p.selectedColor === product.selectedColor &&
                  p.selectedSize === product.selectedSize
                ),
            ),
          };
        }),

      clearCart: () => set({ cart: [] }),
    }),
    {
      name: "cart-storage",

      // ✅ Safe for Next.js
      storage:
        typeof window !== "undefined"
          ? createJSONStorage(() => localStorage)
          : undefined,
    },
  ),
);

export default useCartStore;
