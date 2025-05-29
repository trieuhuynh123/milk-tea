"use client";

import React from "react";
import EmptyImage from "@/assets/images/EmptyImage.png";
import Image from "next/image";
import useCart from "@/hooks/useCart";
import { MinusIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import { CircularProgress, IconButton } from "@mui/material";
import useNavigation from "@/hooks/useNavigation";

interface CartItemProps {
  cartItem: any;
}

const CartItem: React.FC<CartItemProps> = ({ cartItem }) => {
  const { name, price } = cartItem;
  const {
    currentQuantity,
    handleIncreaseQuantity,
    handleDecreaseQuantity,
    handleRemoveProduct,
    loading,
  } = useCart(cartItem?.product);
  const { navigateToProductDetail } = useNavigation();

  return (
    <div
      onClick={() => navigateToProductDetail(cartItem?.product)}
      className="flex w-full cursor-pointer items-center justify-between rounded-lg border border-secondary-600 px-8 py-4"
    >
      <div className="flex w-fit gap-x-4">
        <Image
          src={cartItem?.product?.thumbnail || EmptyImage}
          width={200}
          height={200}
          alt={name}
          className="mr-4 box-border h-20 w-20 rounded-lg object-cover"
        />
        <div className="flex flex-col gap-y-1">
          <p className="text-lg font-bold text-secondary-900">
            {cartItem?.product?.name}
          </p>
          <p className="text-md font-bold text-green-600">
            {`${
              cartItem?.product?.price?.price * cartItem?.quantity
            }`.prettyMoney()}
          </p>
        </div>
      </div>
      <div className="">
        <h2 className="max-w-2/3 w-2/3 text-lg font-semibold text-primary-800">
          {name}
        </h2>
        <p className="text-primary-600">{price}</p>
        <div className="mt-2 flex items-center">
          {loading ? (
            <CircularProgress
              size={24}
              sx={{ color: "black", margin: "0 auto" }}
            />
          ) : (
            <>
              {currentQuantity > 1 ? (
                <IconButton
                  className="rounded-l-lg border-secondary-800 px-2 py-1"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDecreaseQuantity();
                  }}
                >
                  <MinusIcon className="h-4 w-4 text-secondary-900" />
                </IconButton>
              ) : (
                <IconButton
                  className="border-secondary-800rounded-l-lg px-2 py-1"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveProduct();
                  }}
                >
                  <TrashIcon className="h-4 w-4 text-secondary-900" />
                </IconButton>
              )}
              <input
                value={currentQuantity}
                disabled
                className="w-12 bg-white text-center disabled:cursor-not-allowed"
              />
              <IconButton
                className="rounded-r-lg px-2 py-1"
                onClick={(e) => {
                  e.stopPropagation();
                  handleIncreaseQuantity();
                }}
              >
                <PlusIcon className="h-4 w-4 text-secondary-900" />
              </IconButton>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartItem;
