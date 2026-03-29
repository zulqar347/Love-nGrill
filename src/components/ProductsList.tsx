import { ProductsType } from "@/types";
import Categories from "./Categories";
import ProductCard from "./ProductCard";
import Link from "next/link";
import Filter from "./Filter";
import { connectDB } from "@/lib/db";
import Product from "@/lib/models/Products";

const ProductsList = async ({
  category,
  page,
}: {
  category: string | undefined;
  page: "homePage" | "productsPage";
}) => {
  let products: ProductsType;
  try {
    await connectDB();
    const rawProducts = await Product.find().lean();
    products = JSON.parse(JSON.stringify(rawProducts));
    // console.log(products);
  } catch (error) {
    console.error("Products fetch error:", error);
    return [];
  }

  return (
    <div>
      <Categories />
      {page === "productsPage" && <Filter />}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
      <div className="flex justify-end p-4">
        <Link
          href={category ? `/products/?category=${category}` : "/products"}
          className="hover:underline"
        >
          View All Products
        </Link>
      </div>
    </div>
  );
};

export default ProductsList;
