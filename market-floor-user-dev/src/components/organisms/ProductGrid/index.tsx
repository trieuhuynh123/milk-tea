"use client";

import Button from "@/components/atom/Button";
import ProductCard from "@/components/molecules/ProductCard";
import useProducts from "@/hooks/useProducts";
import useStore from "@/hooks/useStore";
import { CircularProgress } from "@mui/material";
import React, { useEffect } from "react";

interface IProductGridProps {
  category: any;
}

const ProductGrid: React.FC<IProductGridProps> = (props) => {
  const { category } = props;
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const { getAllProducts, storeProducts, loading } = useProducts();
  const { currentStore } = useStore();

  useEffect(() => {
    if (currentPage >= 1) {
      currentStore &&
        getAllProducts({ categoryId: category.id, page: currentPage });
    }
  }, [currentPage, currentStore]);

  return (
    <>
      {loading ? (
        <>
          <div className="h-[40px] w-[300px] animate-pulse bg-secondary-600"></div>
          <div className="grid grid-cols-1 gap-x-4 gap-y-8 tablet:grid-cols-2 laptop:grid-cols-4">
            {Array(8)
              .fill(1)
              ?.map((item, index) => (
                <div
                  key={`loading-${index}`}
                  className="h-[450px] w-full animate-pulse bg-secondary-600"
                ></div>
              ))}
          </div>
        </>
      ) : (
        <>
          {storeProducts?.length > 0 && (
            <div>
              <h1 className="mb-16 text-4xl font-bold text-secondary-900">
                Danh mục {category?.name}
              </h1>
              <div className="grid w-full tablet:grid-cols-2 laptop:grid-cols-4">
                {storeProducts?.map((item: any, index: number) => (
                  <div
                    key={`card-${index}`}
                    className="border-b border-r border-t border-gray-300 p-2"
                  >
                    <ProductCard
                      handleItemClick={() => {}}
                      item={item}
                      index={index}
                    />
                  </div>
                ))}
              </div>

              <div className="mt-8 flex w-full justify-center">
                {loading ? (
                  <CircularProgress size={36} sx={{ color: "black" }} />
                ) : (
                  <button
                    onClick={() => setCurrentPage(currentPage + 1)}
                    className="text-md rounded-full border-transparent bg-primary-500 px-4 py-2 text-center font-semibold text-secondary-500"
                  >
                    Xem thêm
                  </button>
                )}
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default ProductGrid;
