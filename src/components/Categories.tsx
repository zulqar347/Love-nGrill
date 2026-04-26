"use client";
import { Pizza, Sandwich, Coffee, Drumstick } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const categories = [
  {
    name: "All",
    icon: <Pizza className="w-4 h-4" />,
    slug: "all",
  },
  {
    name: "Pizza",
    icon: <Pizza className="w-4 h-4" />,
    slug: "pizza",
  },
  {
    name: "Burgers",
    icon: <Sandwich className="w-4 h-4" />,
    slug: "burgers",
  },
  {
    name: "Chicken",
    icon: <Drumstick className="w-4 h-4" />,
    slug: "chicken",
  },
  {
    name: "Beverages",
    icon: <Coffee className="w-4 h-4" />,
    slug: "beverages",
  },
];

const Categories = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const path = usePathname();
  const param = searchParams.get("category");

  const handleChange = (slug: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("category", slug);
    router.push(`${path}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4 mb-12">
      {categories.map((category) => (
        <div
          onClick={() => handleChange(category.slug)}
          className={
            param !== category.slug
              ? "flex items-center text-sm gap-1 rounded-md px-2 py-1 bg-gray-100 text-gray-600 cursor-pointer"
              : "flex items-center text-sm gap-1 rounded-md px-2 py-1 bg-gray-500 text-gray-200 cursor-pointer"
          }
          key={category.name}
        >
          {category.icon}
          {category.name}
        </div>
      ))}
    </div>
  );
};

export default Categories;
