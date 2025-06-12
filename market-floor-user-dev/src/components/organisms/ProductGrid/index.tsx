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
  const { getAllProducts, storeProducts, loading, setStoreProducts } = useProducts();
  const { currentStore } = useStore();

  useEffect(() => {
    // Reset products and page when category changes
    setStoreProducts([]);
    setCurrentPage(1);
    
    if (currentStore && category?.id) {
      getAllProducts({ categoryId: category.id, page: 1 });
    }
  }, [category?.id, currentStore]);

  useEffect(() => {
    if (currentPage > 1 && currentStore && category?.id) {
      getAllProducts({ categoryId: category.id, page: currentPage });
    }
  }, [currentPage]);

  const handleLoadMore = () => {
    setCurrentPage(currentPage + 1);
  };

  return (
    <>
      {loading && storeProducts.length === 0 ? (
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
          {storeProducts?.length > 0 ? (
            <div>
              <div className="grid w-full grid-cols-1 gap-4 tablet:grid-cols-2 laptop:grid-cols-4">
                {storeProducts?.map((item: any, index: number) => (
                  <div
                    key={`card-${index}`}
                    className="border border-gray-300 p-2 rounded-lg hover:shadow-lg transition-shadow"
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
                    onClick={handleLoadMore}
                    className="text-md rounded-full border-transparent bg-primary-500 px-4 py-2 text-center font-semibold text-secondary-500 hover:bg-primary-600 transition-colors"
                  >
                    Xem thêm
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="flex h-[300px] w-full items-center justify-center">
              <p className="text-xl font-semibold text-gray-500">Không có sản phẩm trong danh mục này</p>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default ProductGrid;
