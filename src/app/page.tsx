import ProductsList from "@/components/ProductsList";
import Image from "next/image";

const Homepage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const category = (await searchParams).category;
  // console.log(param);
  return (
    <div>
      <div className="relative aspect-[3/1] mb-12">
        <Image src={"/featured.png"} alt="featured_image" fill />
      </div>
      <ProductsList category={category} page="homePage" />
    </div>
  );
};

export default Homepage;
