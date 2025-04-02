"use client";

import useProducts from "@/hooks/useProducts";
import { Divider } from "@mui/material";
import React, { useEffect, useState } from "react";
import ProductCarousel from "@/components/molecules/ProductCarousel";
import useStore from "@/hooks/useStore";

interface IPopularProductProps {}

const PopularProducts: React.FC<IPopularProductProps> = (props) => {
  const { popularProducts, getAllPopularProducts } = useProducts();
  const { currentStore } = useStore();
  const [currentPage, setCurrentPage] = useState<number>(0);

  useEffect(() => {
    currentStore && getAllPopularProducts({ page: currentPage });
  }, []);

  return (
    <>
      {popularProducts?.length > 0 ? (
        <div className="mt-16 flex w-full flex-col justify-center">
          <h1 className="mb-8 text-3xl font-bold text-secondary-900">
            Sản phẩm bán chạy
          </h1>
          <ProductCarousel listProduct={popularProducts} />
        </div>
      ) : (
        <>
          <div className="h-[40px] w-[300px] animate-pulse bg-secondary-600"></div>
          <div className="grid grid-cols-1 gap-x-4 gap-y-8 tablet:grid-cols-2 laptop:grid-cols-4">
            {Array(4)
              .fill(1)
              ?.map((item, index) => (
                <div
                  key={index}
                  className="h-[450px] w-full animate-pulse bg-secondary-600"
                ></div>
              ))}
          </div>
        </>
      )}
    </>
  );
};

export default PopularProducts;
