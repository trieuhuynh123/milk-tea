"use client";

import Button from "@/components/atom/Button";
import ProductCard from "@/components/molecules/ProductCard";
import useProducts from "@/hooks/useProducts";
import useStore from "@/hooks/useStore";
import { CircularProgress } from "@mui/material";
import React, { useEffect, useRef } from "react";

interface IProductScrollProps {}

const ProductScroll: React.FC<IProductScrollProps> = (props) => {
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const { getAllProducts, storeProducts, loading, total } = useProducts();
  const { currentStore } = useStore();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    currentStore && getAllProducts({ page: currentPage });
  }, [currentStore]);

  useEffect(() => {
    if (currentPage >= 1) {
      currentStore && getAllProducts({ page: currentPage });
    }
  }, [currentPage]);

  

  const handleScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight) {
      if (storeProducts?.length < total) {
        // setCurrentPage((prev) => prev + 1);
        window.removeEventListener("scroll", handleScroll);
      }
    }
  };

  useEffect(() => {
    if (!loading) {
      window.addEventListener("scroll", handleScroll);
    }
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [loading]);

  return (
    <div ref={scrollRef}>
      {storeProducts?.length > 0 && (
        <div>
          <h1 className="mb-16 text-4xl font-bold text-secondary-900">
            Tất cả sản phẩm
          </h1>
          <div className="grid w-full tablet:grid-cols-2 laptop:grid-cols-4">
            {storeProducts?.map((item: any, index: number) => (
              <div
                key={`card-${index}`}
                className="border-b border-r border-t border-gray-300 p-2"
              >
                <ProductCard
                  key={`card-${index}`}
                  handleItemClick={() => {}}
                  item={item}
                  index={index}
                />
              </div>
            ))}
          </div>

          {loading && (
            <div className="grid w-full grid-cols-4 gap-4">
              {Array(total - storeProducts?.length)
                .fill(1)
                ?.map((item, index) => (
                  <div
                    key={`loading-${index}`}
                    className="h-[360px] w-full animate-pulse bg-primary-200"
                  ></div>
                ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductScroll;
