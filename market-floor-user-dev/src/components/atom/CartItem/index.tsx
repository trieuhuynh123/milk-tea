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
      className="flex w-full justify-between items-center px-8 py-4 border-secondary-600 rounded-lg border cursor-pointer"
    >
      <div className="flex w-fit gap-x-4">
        <Image
          src={cartItem?.product?.thumbnail || EmptyImage}
          width={200}
          height={200}
          alt={name}
          className="w-20 h-20 object-cover rounded-lg mr-4 box-border"
        />
        <div className="flex flex-col gap-y-1">
          <p className="text-lg text-secondary-900 font-bold">
            {cartItem?.product?.name}
          </p>
          <p className="text-md text-green-600 font-bold">
            {`${
              cartItem?.product?.price?.price * cartItem?.quantity 
            }`.prettyMoney()}
          </p>
        </div>
      </div>
      <div className="">
        <h2 className="text-lg font-semibold text-primary-800 max-w-2/3 w-2/3">
          {name}
        </h2>
        <p className="text-primary-600">{price}</p>
        <div className="flex items-center mt-2">
          {loading ? (
            <CircularProgress
              size={24}
              sx={{ color: "black", margin: "0 auto" }}
            />
          ) : (
            <>
              {currentQuantity > 1 ? (
                <IconButton
                  className="px-2 py-1 border-secondary-800 rounded-l-lg"
                  onClick={() => handleDecreaseQuantity()}
                >
                  <MinusIcon className="w-4 h-4 text-secondary-900" />
                </IconButton>
              ) : (
                <IconButton
                  className="px-2 py-1 border-secondary-800rounded-l-lg"
                  onClick={() => handleRemoveProduct()}
                >
                  <TrashIcon className="w-4 h-4 text-secondary-900" />
                </IconButton>
              )}
              <input
                value={currentQuantity}
                disabled
                className="text-center w-12 bg-white disabled:cursor-not-allowed"
              />
              <IconButton
                className="px-2 py-1 rounded-r-lg "
                onClick={() => handleIncreaseQuantity()}
              >
                <PlusIcon className="w-4 h-4 text-secondary-900" />
              </IconButton>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartItem;
