"use client";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ProductGrid from "@/components/organisms/ProductGrid";
import Carousel from "@/components/molecules/Carousel";
import useCategory from "@/hooks/useCategories";
import ProductScroll from "@/components/organisms/ProductScroll";
import PopularProducts from "@/components/organisms/PopularProduct";

export default function Home() {
  const { listCategory } = useCategory();

  return (
    <div className="flex w-full flex-col flex-wrap items-center justify-center">
      <Carousel />
      <div className="mx-auto flex w-full flex-col gap-y-20 px-10 py-20 desktop:w-[1200px] desktop:px-0">
        <PopularProducts />
        {listCategory?.map((category: any) => (
          <ProductGrid category={category} key={category?.id} />
        ))}
        <ProductScroll />
      </div>
    </div>
  );
}
