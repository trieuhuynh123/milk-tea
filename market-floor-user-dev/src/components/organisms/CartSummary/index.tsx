"use client";

import useAuth from "@/hooks/useAuth";
import useCart from "@/hooks/useCart";
import { Divider } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

interface ICartSummaryProps {
  shippingFee?: number;
  isApplyUserSavePoints?: boolean;
}

const CartSummary: React.FC<ICartSummaryProps> = (props) => {
  const { isApplyUserSavePoints = false } = props;
  const { currentCart } = useCart();
  const { user } = useAuth() || {}

  const totalPrice = () => {
    let total = 0;
    currentCart?.cartDetails?.map((item: any, index: number) => {
      total = total + item?.product?.price?.price * item?.quantity;
    });

    return `${total}`?.prettyMoney();
  };

  const afterTotalPrice = () => {
    let afterTotal = 0;
    currentCart?.cartDetails?.map((item: any, index: number) => {
      afterTotal = afterTotal + item?.product?.price?.price * item?.quantity;
    });

    if (user?.savePoints > 0) {
      if (isApplyUserSavePoints) {
        afterTotal = afterTotal - (Number(( user?.savePoints * 70/100)?.toFixed(0)));
      }
    }

    return `${afterTotal}`?.prettyMoney();
  };

  const finalPrice = () => {
    let finalPrice = 0;
    currentCart?.cartDetails?.map((item: any, index: number) => {
      finalPrice = finalPrice + item?.product?.price?.price * item?.quantity;
    });

    if (user?.savePoints > 0) {
      if (isApplyUserSavePoints) {
        finalPrice = finalPrice - (Number(( user?.savePoints * 70/100)?.toFixed(0)))
      }
    }

    if (props?.shippingFee) {
      finalPrice = finalPrice + props?.shippingFee;
    }


    return `${finalPrice}`?.prettyMoney();
  };

  return (
    <div className="flex flex-col">
      <h1 className="text-2xl font-bold text-secondary-900">
        Thông tin giỏ hàng
      </h1>
      <div className="mt-8 flex flex-col gap-y-4">
        <div className="flex w-full items-center justify-between">
          <p className="text-md font-bold text-secondary-900">Tạm tính</p>
          <p className="text-md font-bold text-green-600">{totalPrice()}</p>
        </div>

        {isApplyUserSavePoints && (
          <div className="flex w-full items-center justify-between">
            <p className="text-md font-bold text-secondary-900">
              Giảm giá ( bằng điểm )
            </p>
            <p className="text-md font-bold text-red-600">
              -{((user?.savePoints * 70/100 * 1000)?.toFixed(0))?.toString()?.prettyMoney()}
            </p>
          </div>
        )}

        <Divider />

        <div className="flex w-full items-center justify-between">
          <p className="text-md font-bold text-secondary-900">
            Tạm tính sau giảm giá
          </p>
          <p className="text-md font-bold text-green-600">
            {afterTotalPrice()}
          </p>
        </div>

        {props?.shippingFee && (
          <div className="flex w-full items-center justify-between">
            <p className="text-md font-bold text-secondary-900">
              Phí vận chuyển
            </p>
            <p className="text-md font-bold text-green-600">
              +{props?.shippingFee?.toString()?.prettyMoney()}
            </p>
          </div>
        )}

        <Divider />

   

        <div className="flex w-full items-center justify-between">
          <p className="text-md font-bold text-secondary-900">Tổng ước tính</p>
          <p className="text-md font-bold text-green-600">{finalPrice()}</p>
        </div>
      </div>
    </div>
  );
};

export default CartSummary;
