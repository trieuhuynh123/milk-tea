"use client";

import React from "react";
import { CircularProgress, Divider } from "@mui/material";
import { IOrder } from "@/@types";
import useOrder from "@/hooks/useOrder";

interface IOrderItemProps {
  orderItem: IOrder;
}

const OrderItem: React.FC<IOrderItemProps> = ({ orderItem }) => {
  const { createdAt, orderDetails, orderAddress, status, totalAmount } =
    orderItem;
  const { cancelOrder, actionLoading } = useOrder();

  const renderOrderStatus = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <span className="text-sm font-bold text-yellow-600">
            Đang chờ xử lý
          </span>
        );

      case "received":
        return (
          <span className="text-sm font-bold text-blue-600">Đã nhận đơn</span>
        );

      case "processing":
        return (
          <span className="text-sm font-bold text-lime-600">Đang xử lý</span>
        );

      case "shipping":
        return (
          <span className="text-sm font-bold text-blue-600">
            Đang giao hàng
          </span>
        );

      case "delivered":
        return (
          <span className="text-sm font-bold text-cyan-600">Đã giao hàng</span>
        );

      case "cancelled":
        return <span className="text-sm font-bold text-red-600">Đã hủy</span>;
    }
  };

  return (
    <div className="flex w-full cursor-pointer items-center justify-between rounded-lg border border-secondary-600 px-8 py-4">
      <div className="flex flex-col gap-y-4">
        <p className="text-sm font-bold text-secondary-900">
          Trạng thái đơn hàng: {renderOrderStatus(status)}
        </p>

        <p className="text-sm font-bold text-secondary-900">
          Đặt hàng vào ngày:{" "}
          <span className="text-regular text-secondary-800">
            {(orderItem?.createdAt as string)?.prettyDateTime()}
          </span>
        </p>
        <Divider />

        {orderAddress && (
          <p className="text-sm font-bold text-secondary-900">
            Địa chỉ giao hàng:{" "}
            <span className="text-regular text-sm text-secondary-800">
              {orderAddress?.address}, {orderAddress?.ward},{" "}
              {orderAddress?.district},{orderAddress?.province}
            </span>
          </p>
        )}

        <p className="text-sm font-bold text-secondary-900">
          Tổng giá trị:
          <span className="text-regular text-green-600">
            {`${totalAmount}`?.toString().prettyMoney()} VND
          </span>
        </p>
      </div>
    </div>
  );
};

export default OrderItem;
