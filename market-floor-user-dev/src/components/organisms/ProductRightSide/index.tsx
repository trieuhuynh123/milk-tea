"use client";

import QuantityButton from "@/components/molecules/QuantityButton";
import React from "react";

interface IProductRightSideProps {
  storeProduct: IStoreProduct;
}

const ProductRightSide: React.FC<IProductRightSideProps> = (props) => {
  const { storeProduct } = props;

  return (
    <div className="flex h-full w-[320px] flex-col gap-y-8 tablet:w-[360px] laptop:h-full laptop:w-[400px] desktop:h-full desktop:w-[480px]">
      <h1 className="text-3xl font-bold text-secondary-900">
        {storeProduct?.product?.name}
      </h1>

      <div className="flex flex-col">
        <div className="flex items-center">
          <h3 className="text-lg text-secondary-800">Giá bán: </h3>
          <h3 className="ml-2 cursor-pointer text-xl font-semibold text-green-600">
            {storeProduct?.price.displayPrice}
          </h3>
        </div>
        <div className="mt-2 flex items-center">
          <h3 className="text-lg text-secondary-800">Danh mục: </h3>
          <h3 className="ml-2 cursor-pointer text-lg font-bold text-secondary-900">
            {storeProduct?.product?.category?.name}
          </h3>
        </div>
        {storeProduct?.product?.properties &&
          Object.entries(storeProduct?.product?.properties).map(
            ([key, value]: [string, any]) => (
              <div key={key} className="flex items-center">
                <h3 className="text-lg text-secondary-900">
                  {storeProduct?.product?.category?.properties?.map(
                    (property: any) => {
                      if (property?.name == key) {
                        return `${property?.displayName} :`;
                      }
                      console.log(value);
                    },
                  )}
                </h3>
                <h3 className="ml-2 cursor-pointer text-lg text-secondary-800">
                  {typeof value === "boolean" ? (value ? "có" : "kh") : value}
                </h3>
              </div>
            ),
          )}
      </div>

      <QuantityButton storeProduct={storeProduct} />

      <div className="flex flex-col gap-y-2">
        <h1 className="text-lg font-bold text-secondary-900">
          Mô tả về sản phẩm
        </h1>
        <p className="text-sm text-secondary-800">
          {storeProduct?.product?.fullDescription}
        </p>
      </div>
    </div>
  );
};

export default ProductRightSide;
