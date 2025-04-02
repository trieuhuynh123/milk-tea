import React, { useEffect, useState } from "react";

//styles
import Image from "next/image";
import { CheckBadgeIcon } from "@heroicons/react/20/solid";

//utils and types
import axios from "axios";

interface ICartList {}

export interface ICartItem {
  id: number;
  product: {
    id: number;
    name: string;
    startPrice: 126;
    imagePath: string;
    userName: string;
    bidClosingDate: string;
  };
  priceWin: number;
  status: "PENDING" | "APPROVED";
}

const CartList: React.FC<ICartList> = (props) => {
  return (
    <div className="h-fit laptop:min-h-[600px] laptop:w-4/5 w-full bg-white rounded-lg border border-primary-200 shadow-lg px-8 py-4">
      <h3 className="text-xl laptop:text-2xl text-blue-500 font-bold">
        Giỏ hàng của bạn ()
      </h3>
      <div className="flex flex-col gap-y-5 mt-10">
        <div className="grid grid-cols-3 laptop:grid-cols-4 gap-x-10 py-2 px-4 border border-primary-200 rounded-lg">
          <p className="text-primary-600 font-semibold text-xs laptop:text-lg ">
            Tên
          </p>

          <p className="text-primary-600 font-semibold text-lg flex laptop:flex">
            Hình ảnh
          </p>
          <p className="text-primary-600 font-semibold text-lg hidden laptop:flex">
            Mua từ
          </p>
          <p className="text-primary-600 font-semibold text-xs laptop:text-lg">
            Giá
          </p>
        </div>
      </div>
    </div>
  );
};

export default CartList;
