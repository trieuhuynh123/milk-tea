"use client";

import QuantityButton from "@/components/molecules/QuantityButton";
import React from "react";

interface IProductRightSideProps {
  storeProduct: IStoreProduct;
}

const ProductRightSide: React.FC<IProductRightSideProps> = (props) => {
  const { storeProduct } = props;

  return (
    <div className="w-[320px] h-full tablet:w-[360px] laptop:w-[400px] laptop:h-full desktop:w-[480px] desktop:h-full flex flex-col gap-y-8">
      <h1 className="text-secondary-900 font-bold text-3xl">
        {storeProduct?.product?.name}
      </h1>

      <div className="flex flex-col">
        <div className="flex items-center">
          <h3 className="text-secondary-800 text-lg">Giá bán: </h3>
          <h3 className="text-green-600 text-xl ml-2 cursor-pointer font-semibold">
            {storeProduct?.price.displayPrice}
          </h3>
        </div>
        <div className="flex items-center mt-2">
          <h3 className="text-secondary-800 text-lg">Danh mục: </h3>
          <h3 className="text-secondary-900 font-bold text-lg ml-2 cursor-pointer">
            {storeProduct?.product?.category?.name}
          </h3>
        </div>
        {storeProduct?.product?.properties &&
          Object.entries(storeProduct?.product?.properties).map(
            ([key, value]: [string, any]) => (
              <div key={key} className="flex items-center">
                <h3 className="text-secondary-900 text-lg">
                  {storeProduct?.product?.category?.properties?.map(
                    (property: any) => {
                      if (property?.name == key) {
                        return `${property?.displayName} :`;
                      }
                    }
                  )}
                </h3>
                <h3 className="text-secondary-800 ml-2 text-lg cursor-pointer">
                  {value}
                </h3>
              </div>
            )
          )}
      </div>

      <QuantityButton storeProduct={storeProduct} />

      <div className="flex flex-col gap-y-2">
        <h1 className="text-secondary-900 font-bold text-lg">
          Mô tả về sản phẩm
        </h1>
        <p className="text-secondary-800 text-sm">
          {storeProduct?.product?.fullDescription}
        </p>
      </div>
    </div>
  );
};

export default ProductRightSide;
