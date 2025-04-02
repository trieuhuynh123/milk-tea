"use client";

import useCart from "@/hooks/useCart";
import useOrder from "@/hooks/useOrder";
import { Divider } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

interface IOrderSummaryProps {}

const OrderSummary: React.FC<IOrderSummaryProps> = (props) => {
  const { currentOrder } = useOrder();
  const { user } = useSelector((state: any) => state.auth);

  return (
    <div className="flex flex-col">
      <h1 className="text-2xl font-bold text-secondary-900">
        Thông tin đơn hàng
      </h1>
      <div className="mt-8 flex flex-col gap-y-4">
        <div className="flex w-full items-center justify-between">
          <p className="text-md font-bold text-secondary-900">Tạm tính</p>
          <p className="text-md font-bold text-green-600"></p>
        </div>
        <div className="flex w-full items-center justify-between">
          <p className="text-md font-bold text-secondary-900">
            Giảm giá ( bằng điểm )
          </p>
          <p className="text-md font-bold text-red-600"></p>
        </div>
        <Divider />

        <div className="flex w-full items-center justify-between">
          <p className="text-md font-bold text-secondary-900">
            Tạm tính sau giảm giá
          </p>
          <p className="text-md font-bold text-green-600"></p>
        </div>

        <Divider />

        <div className="flex w-full items-center justify-between">
          <p className="text-md font-bold text-secondary-900">Phí giao hàng</p>
          <p className="text-md font-bold text-green-600"></p>
        </div>

        <div className="flex w-full items-center justify-between">
          <p className="text-md font-bold text-secondary-900">Phí dịch vụ</p>
          <p className="text-md font-bold text-green-600"></p>
        </div>

        <Divider />

        <div className="flex w-full items-center justify-between">
          <p className="text-md font-bold text-secondary-900">Tổng ước tính</p>
          <p className="text-md font-bold text-green-600"></p>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
