import { Suspense } from "react";
import CartClient from "@/components/CartClient";

export default function CartPage() {
  return (
    <Suspense fallback={<div>Loading cart...</div>}>
      <CartClient />
    </Suspense>
  );
}
