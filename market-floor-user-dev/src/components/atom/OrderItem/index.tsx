"use client";

import React from "react";
import { CircularProgress, Divider } from "@mui/material";
import { IOrder } from "@/@types";
import useOrder from "@/hooks/useOrder";

interface IOrderItemProps {
  orderItem: IOrder;
}

const OrderItem: React.FC<IOrderItemProps> = ({ orderItem }) => {
  const { createdAt, orderDetails, orderAddress, status } = orderItem;
  const { cancelOrder, actionLoading } = useOrder();

  const renderOrderStatus = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <span className="text-yellow-600 font-bold text-sm">
            Đang chờ xử lý
          </span>
        );

      case "received":
        return (
          <span className="text-blue-600 font-bold text-sm">Đã nhận đơn</span>
        );

      case "processing":
        return (
          <span className="text-lime-600 font-bold text-sm">Đang xử lý</span>
        );

      case "shipping":
        return (
          <span className="text-blue-600 font-bold text-sm">
            Đang giao hàng
          </span>
        );

      case "delivered":
        return (
          <span className="text-cyan-600 font-bold text-sm">Đã giao hàng</span>
        );

      case "cancelled":
        return <span className="text-red-600 font-bold text-sm">Đã hủy</span>;
    }
  };

  const totalValue = () => {
    let total = 0;
    orderDetails?.forEach((item) => {
      total += Number(item?.price) * item?.quantity;
    });
    return total;
  };

  return (
    <div className="flex w-full justify-between items-center px-8 py-4 border-secondary-600 rounded-lg border cursor-pointer">
      <div className="flex flex-col gap-y-4">
        <p className="text-sm text-secondary-900 font-bold">
          Trạng thái đơn hàng: {renderOrderStatus(status)}
        </p>

        <p className="text-sm  text-secondary-900 font-bold">
          Đặt hàng vào ngày:{" "}
          <span className="text-regular text-secondary-800 ">
            {(orderItem?.createdAt as string)?.prettyDateTime()}
          </span>
        </p>
        <Divider />

        {orderAddress && (
          <p className="text-sm  text-secondary-900 font-bold">
            Địa chỉ giao hàng:{" "}
            <span className="text-regular text-secondary-800 text-sm">
              {orderAddress?.address}, {orderAddress?.ward},{" "}
              {orderAddress?.district},{orderAddress?.province}
            </span>
          </p>
        )}

        {/* <p className="text-sm text-secondary-900 font-bold">
          Tổng số lượng:{" "}
          <span className="text-regular text-secondary-800 text-sm">
            {orderDetails?.length} sản phẩm
          </span>
        </p> */}
        <p className="text-sm  text-secondary-900 font-bold">
          Tổng giá trị:{" "}
          <span className="text-regular text-green-600 ">
            {`${totalValue()}000`?.toString().prettyMoney()} VND
          </span>
        </p>
      </div>
      {status == "pending" && (
        <div className="w-full max-w-[30%] flex flex-col gap-y-2 items-center">
          <button
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              alert("hH");
              // cancelOrder(orderItem?.id);
            }}
            className="text-red-500 border rounded-full px-4 py-2 hover:opacity-50 bg-white border-red-500"
          >
            {actionLoading ? <CircularProgress size={20} /> : "Hủy đơn hàng"}
          </button>
          {/* <p className="text-gray-800 text-xs italic text-regular text-center">
            *Bạn chỉ có thể hủy đơn hàng ở trạng thái đang chờ
          </p> */}
        </div>
      )}
    </div>
  );
};

export default OrderItem;
