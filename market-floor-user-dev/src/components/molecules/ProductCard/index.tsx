"use client";

import React from "react";
import Image from "next/image";
import EmptyImage from "@/assets/images/EmptyImage.png";
import useNavigation from "@/hooks/useNavigation";
import QuantityButton from "../QuantityButton";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { IProduct, IStoreProduct } from "@/@types";
import { IconButton } from "@mui/material";

interface IProductCardProps {
  handleItemClick: (product: IProduct) => void;
  item: IStoreProduct;
  index: number;
}

const ProductCard: React.FC<IProductCardProps> = (props) => {
  const { handleItemClick, item, index } = props;

  const { navigateToProductDetail } = useNavigation();

  return (
    <div
      className="h-aut o z-0 my-8 flex min-h-[500px] cursor-pointer flex-col items-center justify-between border-gray-200 p-4 laptop:my-2"
      onClick={() => navigateToProductDetail(item?.product)}
    >
      <div className="ml-auto h-[50px]">
        <IconButton>
          <Bars3Icon className="h-8 w-8 text-secondary-900" />
        </IconButton>
      </div>
      {!!item?.product?.thumbnail ? (
        <img
          src={item.product?.thumbnail}
          className="h-auto w-full rounded-xl object-cover desktop:min-h-[200px] desktop:max-w-[250px]"
          alt={`Product ${index + 1}`}
        />
      ) : (
        <Image
          src={EmptyImage}
          className="h-auto w-full rounded-xl object-cover desktop:h-[200px] desktop:max-w-[250px]"
          alt={`Product ${index + 1}`}
        />
      )}
      <div className="mt-6 flex w-full flex-col gap-x-4 gap-y-4">
        <div className="w-[200px]">
          <QuantityButton storeProduct={item} mode={"card" as any} />
        </div>
        <div className="h-[100px]">
          <div>
            <p className="w-full text-left text-lg font-bold text-gray-600">
              {item?.product?.name}
            </p>
            <p
              className={`text-sxs w-full text-left font-bold text-gray-600 ${
                item?.price?.salePrice ? "line-through" : ""
              }`}
            >
              {item?.product?.price?.displayPrice}
            </p>
            {item.price?.salePrice && (
              <p
                className={`text-md mt-2 w-full text-left font-bold text-red-500`}
              >
                {item?.price?.displaySalePrice}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
