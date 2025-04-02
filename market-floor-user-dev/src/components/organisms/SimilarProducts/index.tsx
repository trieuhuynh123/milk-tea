"use client";

import ProductCarousel from "@/components/molecules/ProductCarousel";
import { Divider } from "@mui/material";
import React from "react";

interface ISimilarProductProps {
  listProduct: IStoreProduct[];
}

const SimilarProducts: React.FC<ISimilarProductProps> = (props) => {
  const { listProduct: relatedProduct } = props;
  return (
    <div className="mt-16 flex flex-col justify-center w-full">
      <h1 className="text-secondary-900 font-bold text-3xl">
        Sản phẩm tương tự
      </h1>
      <Divider sx={{ marginY: 4 }} />
      {!!relatedProduct && <ProductCarousel listProduct={relatedProduct} />}
    </div>
  );
};

export default SimilarProducts;
