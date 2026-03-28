"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";

const Filter = () => {
  const router = useRouter();
  const path = usePathname();
  const searchParams = useSearchParams();
  //   const category = params.get("category");

  function handleFilter(value: string) {
    const params = new URLSearchParams(searchParams);
    params.set("sort", value);
    router.push(`${path}?${params.toString()}`, { scroll: false });
  }
  return (
    <div className="flex gap-1 justify-end items-center pb-4 text-sm">
      <span>Sort By:</span>
      <select
        className="border rounded-md border-gray-600 bg-gray-100 px-1"
        onChange={(e) => handleFilter(e.target.value)}
      >
        <option value={"newest"}>Newest</option>
        <option value={"oldest"}>Oldest</option>
        <option value={"asc"}>Price: Low To High</option>
        <option value={"desc"}>Price: High To Low</option>
      </select>
    </div>
  );
};

export default Filter;
