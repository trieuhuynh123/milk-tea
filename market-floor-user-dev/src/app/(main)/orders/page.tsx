"use client";

import { IOrder } from "@/@types";
import OrderItem from "@/components/atom/OrderItem";
import useOrder from "@/hooks/useOrder";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { Divider } from "@mui/material";
import Link from "next/link";
import React, { useEffect } from "react";

interface IOrderPageProps {}

const Orders: React.FC<IOrderPageProps> = (props) => {
  const {} = props;
  const { getAllOrders, orders, loading } = useOrder();

  useEffect(() => {
    getAllOrders();
  }, []);

  return (
    <div className="flex w-full flex-col gap-10 tablet:flex-row">
      <div className="flex w-full flex-col gap-y-4 tablet:w-[70%]">
        {loading ? (
          <>
            <div className="h-[200px] w-full animate-pulse bg-gray-100"></div>
            <div className="h-[200px] w-full animate-pulse bg-gray-100"></div>
            <div className="h-[200px] w-full animate-pulse bg-gray-100"></div>
          </>
        ) : (
          <div className="h-[600px] overflow-auto flex flex-col gap-y-4">
          {orders?.length > 0 ?  
             <>
              {orders?.map((item: any, index: number) => (
                <Link href={`/orders/${item.id}`} key={index}>
                  <OrderItem key={index} orderItem={item} />
                </Link>
               ))}
            </> : 
            <div className="flex flex-col w-screen   h-[700px] items-center justify-center">
              <InformationCircleIcon className="w-32 h-32 text-secondary-900" />
              <p className="text-secondary-800 text-2xl mt-4">Không có đơn hàng nào</p>
            </div>
          }
       
          </div>
        )}
      </div>
      {loading ? (
        <div className="h-[500px] w-[30%] animate-pulse bg-gray-100"></div>
      ) : (
        <>
          {orders?.length > 0 && (
            <div className="w-full h-fit cursor-pointer flex-col gap-y-4 rounded-lg border border-secondary-600 px-8 py-4 tablet:w-[30%] laptop:flex">
              <h1 className="text-2xl font-bold text-secondary-900">
                Thống kê
              </h1>
              <Divider />
              <div className="flex w-full justify-between">
                <p className="font-semibold text-green-600">
                  Số đơn hàng đã mua
                </p>
                <p className="font-regular text-gray-600">{orders?.length}</p>
              </div>

              <div className="flex w-full justify-between">
                <p className="font-semibold text-yellow-600">Đang đợi</p>
                <p className="font-regular text-gray-600">
                  {
                    orders.filter(
                      (order: IOrder) => order?.status === "processing",
                    )?.length
                  }
                </p>
              </div>

              <div className="flex w-full justify-between">
                <p className="font-semibold text-blue-600">Cửa hàng đã nhận</p>
                <p className="font-regular text-gray-600">
                  {
                    orders.filter(
                      (order: IOrder) => order?.status === "received",
                    )?.length
                  }
                </p>
              </div>

              <div className="flex w-full justify-between">
                <p className="font-semibold text-red-600">Đang xử lý</p>
                <p className="font-regular text-gray-600">
                  {
                    orders.filter(
                      (order: IOrder) => order?.status === "processing",
                    )?.length
                  }
                </p>
              </div>

              <div className="flex w-full justify-between">
                <p className="font-semibold text-cyan-600">Đang vận chuyển</p>
                <p className="font-regular text-gray-600">
                  {
                    orders.filter(
                      (order: IOrder) => order?.status === "shipping",
                    )?.length
                  }
                </p>
              </div>

              <div className="flex w-full justify-between">
                <p className="font-semibold text-green-600">Đã giao hàng</p>
                <p className="font-regular text-gray-600">
                  {
                    orders.filter(
                      (order: IOrder) => order?.status === "delivered",
                    )?.length
                  }
                </p>
              </div>

              <div className="flex w-full justify-between">
                <p className="font-semibold text-cyan-600">Đã hủy</p>
                <p className="font-regular text-gray-600">
                  {
                    orders.filter(
                      (order: IOrder) => order?.status === "cacelled",
                    )?.length
                  }
                </p>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Orders;
