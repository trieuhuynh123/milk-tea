"use client";

import React, { useState } from "react";
import PersonalInformationDialog from "@/components/molecules/PeronsalInformationDialog";
import AddressDialog from "@/components/molecules/AddressDialog";
import useAuth from "@/hooks/useAuth";
import useOrder from "@/hooks/useOrder";
import Button from "@/components/atom/Button";
import { useRouter } from "next/navigation";
import OrderSummary from "@/components/organisms/OrderSummary";
import CartSummary from "@/components/organisms/CartSummary";
import { useToast } from "@/hooks/useToast";
import { Radio, Tooltip } from "@mui/material";
import useStore from "@/hooks/useStore";
import useCart from "@/hooks/useCart";
import axios from "axios";
import { apiURL } from "@/constanst";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/slices/auth";
import { InformationCircleIcon } from "@heroicons/react/24/outline";

// Component hiển thị thông tin về phí ship theo khu vực
const ShippingFeeInfo = () => {
  return (
    <div className="border-secodary-600 mt-4 w-full rounded-2xl border px-8 py-4">
      <div className="mb-2 flex items-center">
        <h3 className="mr-2 text-xl font-semibold text-secondary-900">
          Thông tin phí vận chuyển
        </h3>
        <Tooltip title="Phí vận chuyển được tính dựa trên khu vực địa lý">
          <InformationCircleIcon className="h-5 w-5 cursor-pointer text-gray-500" />
        </Tooltip>
      </div>

      <div className="mt-2 grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <h4 className="mb-1 font-semibold text-secondary-800">
            Khu vực miền Bắc:
          </h4>
          <ul className="text-sm text-gray-600">
            <li>Hà Nội: 80.000đ</li>
            <li>Hải Phòng, Bắc Ninh, Hải Dương, Hưng Yên: 90.000đ</li>
            <li>
              Quảng Ninh, Vĩnh Phúc, Hà Nam, Nam Định, Thái Bình: 100.000đ
            </li>
            <li>Ninh Bình: 110.000đ</li>
          </ul>
        </div>

        <div>
          <h4 className="mb-1 font-semibold text-secondary-800">
            Khu vực miền Nam:
          </h4>
          <ul className="text-sm text-gray-600">
            <li>TP. Hồ Chí Minh: 70.000đ</li>
            <li>Bình Dương, Đồng Nai: 80.000đ</li>
            <li>Bà Rịa - Vũng Tàu, Long An: 90.000đ</li>
            <li>Tây Ninh, Tiền Giang, Cần Thơ: 100.000đ</li>
          </ul>
        </div>

        <div>
          <h4 className="mb-1 font-semibold text-secondary-800">
            Khu vực miền Trung:
          </h4>
          <ul className="text-sm text-gray-600">
            <li>Thanh Hóa: 110.000đ</li>
            <li>Nghệ An, Hà Tĩnh, Đà Nẵng: 120.000đ</li>
            <li>
              Quảng Bình, Quảng Trị, Thừa Thiên Huế, Quảng Nam, Quảng Ngãi, Bình
              Thuận: 130.000đ
            </li>
            <li>Bình Định, Phú Yên, Khánh Hòa, Ninh Thuận: 140.000đ</li>
          </ul>
        </div>

        <div>
          <h4 className="mb-1 font-semibold text-secondary-800">
            Khu vực khác:
          </h4>
          <ul className="text-sm text-gray-600">
            <li>Tây Nguyên (Đắk Lắk, Đắk Nông, Gia Lai, Kon Tum): 140.000đ</li>
            <li>Lâm Đồng: 130.000đ</li>
            <li>Các tỉnh khác: 120.000đ (mặc định)</li>
          </ul>
        </div>
      </div>

      <p className="mt-4 text-xs italic text-gray-500">
        * Phí vận chuyển có thể thay đổi tùy theo chính sách của đơn vị vận
        chuyển và khoảng cách.
      </p>
    </div>
  );
};

interface ICreateOrderProps {}

const CreateOrder: React.FC<ICreateOrderProps> = (props) => {
  const [openUserInfo, setOpenUserInfo] = React.useState<boolean>(false);
  const [openAddress, setOpenAddress] = React.useState<boolean>(false);
  const [isApplyUserSavePoints, setIsApplyUserSavePoints] =
    useState<boolean>(false);
  const { createOrder, actionLoading } = useOrder();
  const { user, accessToken } = useAuth() || {};
  const router = useRouter();
  const toast = useToast();
  const { currentStore } = useStore();
  const { getUserCart } = useCart();
  const [finalPrice, setFinalPrice] = useState(0);
  const [orderUserInfo, setOrderUserInfo] =
    useState<ICreateOrderUserInfo | null>(null);
  const [orderAddress, setOrderAddress] = useState<ICreateOrderAddress | null>(
    null,
  );
  const dispatch = useDispatch();

  const updateUserSavePoints = async (points: number) => {
    try {
      const response = await axios.put(
        `${apiURL}/auth/profile`,
        {
          savePoints: user?.savePoints - (user?.savePoints * 70) / 100,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      if (response?.data?.success) {
        dispatch(setUser(response?.data?.data));
      }
    } catch (error) {
      console.error("Get order detail error", error);
    } finally {
    }
  };

  const handleClickCreateOrder = async (data: ICreateOrder) => {
    const res = await axios.post(`${apiURL}/payment/create-url`, {
      amount: finalPrice,
    });
    const url = res.data?.data;
    if (url) {
      localStorage.setItem("pendingOrder", JSON.stringify(data));
      window.location.href = url;
    } else {
      alert("Không tạo được link thanh toán");
    }
  };

  return (
    <>
      <div className="flex w-full flex-col gap-10 tablet:flex-row">
        <div className="flex w-full flex-col gap-y-4 tablet:w-[70%]">
          <div className="border-secodary-600 grid w-full grid-cols-3 rounded-2xl border px-8 py-4">
            <p className="text-xl font-semibold text-secondary-900">
              Thông tin người nhận
            </p>

            <div className="flex flex-col gap-y-2">
              <p className="text-secondary-900">
                {orderUserInfo?.firstName || user?.firstName}
              </p>
              <p className="text-secondary-900">
                {orderUserInfo?.lastName || user?.lastName}
              </p>
              <p className="text-secondary-900">
                {orderUserInfo?.email || user?.email}
              </p>
              <p className="text-secondary-900">
                {orderUserInfo?.phoneNumber || user?.phoneNumber}
              </p>
              <button
                onClick={() => setOpenUserInfo(true)}
                border-none
                className="text-left font-bold text-primary-500"
              >
                Nhập thông tin người nhận
              </button>
            </div>
          </div>

          <div className="border-secodary-600 grid w-full grid-cols-3 rounded-2xl border px-8 py-4">
            <p className="text-xl font-semibold text-secondary-900">
              Địa chỉ nhận hàng
            </p>

            <div className="flex flex-col gap-y-2">
              <p className="text-secondary-900">
                {orderAddress?.province || "Tỉnh: Không rõ"}
              </p>
              <p className="text-secondary-900">
                {orderAddress?.district || "Huyện: Không rõ"}
              </p>
              <p className="text-secondary-900">
                {orderAddress?.ward || "Quận: Không rõ"}
              </p>
              <p className="text-secondary-900">
                {orderAddress?.address || "Địa chỉ: Không rõ"}
              </p>
            </div>

            <button
              onClick={() => setOpenAddress(true)}
              border-none
              className="text-right font-bold text-primary-500"
            >
              Chỉnh sửa
            </button>
          </div>

          <div className="border-secodary-600 hidden w-full grid-cols-3 rounded-2xl border px-8 py-4">
            <p className="text-xl font-semibold text-secondary-900">
              Thanh toán
            </p>

            <div className="flex flex-col gap-y-2">
              <p className="text-secondary-900">Thanh toán khi nhận hàn</p>
            </div>

            <button
              border-none
              className="text-right font-bold text-primary-500"
            >
              Chỉnh sửa
            </button>
          </div>

          {/* Hiển thị thông tin phí ship theo khu vực */}
          <ShippingFeeInfo />
        </div>
        <div className="w-full cursor-pointer flex-col gap-y-4 rounded-lg border border-secondary-600 px-8 py-4 tablet:w-[30%] laptop:flex">
          <CartSummary
            setFinalPrice={setFinalPrice}
            isApplyUserSavePoints={isApplyUserSavePoints}
            shippingFee={orderAddress?.shippingFee}
          />

          {/* {user?.savePoints && (
            <button className="ml-[-4px] flex items-center text-left text-secondary-900">
              <Radio
                // onBlur={() => setIsApplyUserSavePoints(false)}
                checked={isApplyUserSavePoints}
                onChange={() =>
                  setIsApplyUserSavePoints(!isApplyUserSavePoints)
                }
              />
              Sử dụng điểm tích lũy:
              {((user?.savePoints * 70) / 100)?.toFixed(0) || 0} tương ứng
              {Number(((user?.savePoints * 70) / 100) * 1000)
                ?.toString()
                .prettyMoney()}
            </button>
          )} */}

          <Button
            isLoading={actionLoading}
            onClick={() => {
              if (!orderAddress) {
                toast.sendToast(
                  "Thất bại",
                  "Vui lòng chọn địa chỉ nhận hàng",
                  "error",
                );
              } else {
                handleClickCreateOrder({
                  orderAddress: orderAddress,
                  storeId: currentStore?.id,
                  orderUserInfo: orderUserInfo || {
                    firstName: user?.firstName,
                    lastName: user?.lastName,
                    email: user?.email,
                    phoneNumber: user?.phoneNumber,
                  },
                  isApplyUserSavePoints: isApplyUserSavePoints,
                });
              }
            }}
            className="mt-12"
          >
            Đặt hàng
          </Button>
        </div>
      </div>

      {openUserInfo ? (
        <PersonalInformationDialog
          onSave={(data) => setOrderUserInfo(data)}
          open={openUserInfo}
          onClose={() => setOpenUserInfo(false)}
        />
      ) : null}

      {openAddress ? (
        <AddressDialog
          open={openAddress}
          onSubmited={(data) => {
            setOpenAddress(false);
            setOrderAddress(data);
          }}
          onClose={() => setOpenAddress(false)}
        />
      ) : null}
    </>
  );
};

export default CreateOrder;
