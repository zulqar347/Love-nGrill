import ProductsList from "@/components/ProductsList";
import React from "react";

const page = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const category = (await searchParams).category;
  return (
    <div>
      <ProductsList category={category} page="productsPage" />
    </div>
  );
};

export default page;
