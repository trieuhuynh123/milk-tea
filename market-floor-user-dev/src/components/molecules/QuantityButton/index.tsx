"use client";

import { AddShoppingCart } from "@mui/icons-material";
import { CircularProgress, IconButton } from "@mui/material";
import React from "react";

import { MinusIcon, PlusIcon } from "@heroicons/react/24/solid";
import { TrashIcon } from "@heroicons/react/24/outline";
import useCart from "@/hooks/useCart";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

enum Mode {
  card = "card",
  detail = "detail",
}

interface IQuantityButtonProps {
  storeProduct: IStoreProduct;
  mode?: Mode;
}

const QuantityButton: React.FC<IQuantityButtonProps> = (props) => {
  const { storeProduct, mode = Mode.detail } = props;

  const {
    currentQuantity,
    currentCart,
    handleAddToCart,
    handleDecreaseQuantity,
    handleIncreaseQuantity,
    getUserCart,
    loading,
    handleRemoveProduct,
  } = useCart(storeProduct?.product);
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  return (
    <div className="flex items-center z-20">
      {currentQuantity > 0 ? (
        <button
          className={`items-center rounded-full ${
            mode == Mode.detail ? "px-6 py-3" : "px-2 py-1"
          } ${
            mode == Mode.detail ? "min-w-[300px]" : "min-w-[130px]"
          } justify-center text-center w-fit flex hover:opacity-50 bg-white text-black border border-secondary-800 font-semibold text-lg opactiy-50`}
          onClick={(e) => e.stopPropagation()}
        >
          <>
            {loading ? (
              <CircularProgress size={12} sx={{ color: "black" }} />
            ) : (
              <div className="w-full flex justify-between items-center">
                <IconButton
                  onClick={(e) => {
                    e.stopPropagation();
                    if (currentQuantity > 1) {
                      handleDecreaseQuantity();
                    } else {
                      handleRemoveProduct();
                    }
                  }}
                >
                  {currentQuantity > 1 ? (
                    <MinusIcon className="w-4 h-4 text-secondary-800" />
                  ) : (
                    <TrashIcon className="w-4 h-4 text-secondary-800" />
                  )}
                </IconButton>
                <span>{currentQuantity}</span>
                <IconButton
                  className="z-20"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleIncreaseQuantity();
                  }}
                >
                  <PlusIcon className="w-4 h-4 text-secondary-800" />
                </IconButton>
              </div>
            )}
          </>
        </button>
      ) : (
        <button
          onClick={(e) => {
            e.stopPropagation();
            if (isAuthenticated) {
              handleAddToCart();
            } else {
              router?.push("/login");
            }
          }}
          className={`items-center disabled:opacity-50 rounded-full  ${
            mode == Mode.detail ? "px-6 py-3" : "px-2 py-2"
          } ${
            mode == Mode.detail ? "min-w-[300px]" : "min-w-[100px]"
          }  justify-center text-center w-fit flex hover:opacity-50 bg-primary-500 text-white font-semibold text-lg `}
        >
          <>
            {loading ? (
              <CircularProgress size={32} />
            ) : (
              <>
                {mode == Mode.detail && <AddShoppingCart />}
                <p>{mode == Mode.detail ? "Thêm vào giỏ hàng" : "+ Add"}</p>
              </>
            )}
          </>
        </button>
      )}
    </div>
  );
};

export default QuantityButton;
