"use client";

import React, { useEffect, useState } from "react";
import PersonalInformationDialog from "@/components/molecules/PeronsalInformationDialog";
import AddressDialog from "@/components/molecules/AddressDialog";
import CartSummary from "@/components/organisms/CartSummary";
import useOrder from "@/hooks/useOrder";
import Button from "@/components/atom/Button";
import Image from "next/image";
import RatingDialog from "@/components/molecules/RatingDialog";
import { IOrderDetail } from "@/@types";
import { StarIcon as StarIconOutline } from "@heroicons/react/24/outline";
import { StarIcon as StarIconSolid } from "@heroicons/react/24/solid";

interface IOrderDetailTemplateProps {
  orderId: number;
}

const OrderDetailTemplate: React.FC<IOrderDetailTemplateProps> = (props) => {
  const { currentOrder, getOrderById } = useOrder();
  const [selectedOrderDetail, setSelectedOrderDetail] = useState<IOrderDetail | null>(null);
  const [openRatingDialog, setOpenRatingDialog] = useState<boolean>(false);

  useEffect(() => {
    getOrderById(props.orderId);
  }, []);

  const handleOpenRating = (orderDetail: IOrderDetail) => {
    setSelectedOrderDetail(orderDetail);
    setOpenRatingDialog(true);
  };

  const handleRatingSuccess = () => {
    getOrderById(props.orderId);
  };

  const renderOrderStatus = () => {
    switch (currentOrder?.status) {
      case "pending":
        return (
          <span className="text-2xl font-bold text-yellow-600">
            Đang chờ xử lý
          </span>
        );

      case "received":
        return (
          <span className="text-2xl font-bold text-blue-600">Đã nhận đơn</span>
        );

      case "processing":
        return (
          <span className="text-2xl font-bold text-lime-600">Đang xử lý</span>
        );

      case "shipping":
        return (
          <span className="text-2xl font-bold text-blue-600">
            Đang giao hàng
          </span>
        );

      case "delivered":
        return (
          <span className="text-2xl font-bold text-cyan-600">Đã giao hàng</span>
        );

      case "cancelled":
        return <span className="text-2xl font-bold text-red-600">Đã hủy</span>;
    }
  };
  
  const canRateProducts = currentOrder?.status === "delivered";

  return (
    <div className="px-10">
      <div className="mb-8 flex items-center gap-x-2">
        <h1 className="text-2xl font-bold text-secondary-900">Trạng thái:</h1>
        {renderOrderStatus()}
      </div>
      <div className="flex w-[100%] flex-col gap-10 laptop:flex-row">
        <div className="flex w-[100%] flex-col gap-y-4 laptop:w-[70%]">
          <div className="border-secodary-600 grid w-full grid-cols-3 rounded-2xl border px-8 py-4">
            <p className="text-xl font-semibold text-secondary-900">
              Thông tin người nhận
            </p>

            <div className="flex flex-col gap-y-2">
              <p className="text-secondary-900">
                {currentOrder?.orderUserInfo?.firstName || "Kiet"}
              </p>
              <p className="text-secondary-900">heysir@yopmail.com</p>
              <p className="text-secondary-900">0819190227</p>
            </div>
          </div>

          <div className="border-secodary-600 grid w-full grid-cols-3 rounded-2xl border px-8 py-4">
            <p className="text-xl font-semibold text-secondary-900">
              Địa chỉ nhận hàng
            </p>

            <div className="flex flex-col gap-y-2">
              <p className="text-secondary-900">
                Tỉnh {currentOrder?.orderAddress?.province}
              </p>
              <p className="text-secondary-900">
                {currentOrder?.orderAddress?.district}
              </p>
              <p className="text-secondary-900">
                {currentOrder?.orderAddress?.ward}
              </p>
              <p className="text-secondary-900">
                Địa chỉ {currentOrder?.orderAddress?.address}
              </p>
            </div>
          </div>

          <div className="border-secodary-600 grid w-full grid-cols-3 rounded-2xl border px-8 py-4">
            <p className="text-xl font-semibold text-secondary-900">
              Thanh toán
            </p>

            <div className="flex flex-col gap-y-2">
              <p className="text-secondary-900">Thanh toán khi nhận hàng</p>
            </div>
          </div>
          <div className="grid gap-4">
            {currentOrder?.orderDetails.map((item: any) => (
              <div
                key={item.id}
                className="flex flex-col rounded-xl border p-4 shadow-sm"
              >
                <div className="flex items-center gap-4">
                  <Image
                    src={item.product.thumbnail}
                    alt={item.product.name}
                    width={80}
                    height={80}
                    className="rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold">{item.product.name}</h3>
                    <p>Số lượng: {item.quantity}</p>
                    <p>Giá: {item.price.toString().prettyMoney()} đ</p>
                  </div>
                </div>
                
                {/* Rating button - only show for delivered orders and unrated items */}
                {canRateProducts && (
                  <div className="mt-3 flex justify-end">
                    {item.isRated ? (
                      <div className="flex items-center text-yellow-500">
                        <StarIconSolid className="h-5 w-5 mr-1" />
                        <span>Đã đánh giá</span>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleOpenRating(item)}
                        className="flex items-center text-primary-500 font-semibold hover:text-primary-600 transition"
                      >
                        <StarIconOutline className="h-5 w-5 mr-1" />
                        Đánh giá sản phẩm
                      </button>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* <div className="w-[100%] cursor-pointer flex-col gap-y-4 rounded-lg border border-secondary-600 px-8 py-4 laptop:flex laptop:w-[30%]">
          <CartSummary />
        </div> */}
      </div>

      {openRatingDialog && selectedOrderDetail && (
        <RatingDialog
          open={openRatingDialog}
          onClose={() => setOpenRatingDialog(false)}
          orderDetail={selectedOrderDetail}
          orderId={props.orderId}
          onRatingSuccess={handleRatingSuccess}
        />
      )}
    </div>
  );
};

export default OrderDetailTemplate;
