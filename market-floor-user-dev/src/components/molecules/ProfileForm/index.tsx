"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Input from "@/components/atom/Input";
import Button from "@/components/atom/Button";
import { Divider } from "@mui/material";
import { UserIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/slices/auth";

interface IProfileFormProps {
  user: any;
  accessToken: string;
  onProfileUpdated?: () => void;
}

const ProfileForm: React.FC<IProfileFormProps> = ({
  user,
  accessToken,
  onProfileUpdated,
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const dispatch = useDispatch();

  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      username: user?.username || "",
      email: user?.email || "",
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      phoneNumber: user?.phoneNumber || "",
    },
  });

  const handleUpdateProfile = async (data: any) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(null);

      const response = await axios.put("/api/update-profile", data, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.data.success) {
        setSuccess("Cập nhật thông tin cá nhân thành công!");
        // Update user in redux store
        dispatch(setUser({ ...user, ...data }));
        if (onProfileUpdated) {
          onProfileUpdated();
        }
      } else {
        setError(response.data.message || "Có lỗi xảy ra khi cập nhật thông tin.");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Có lỗi xảy ra khi cập nhật thông tin.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center gap-4 mb-6">
        <div className="bg-primary-600 w-[64px] h-[64px] rounded-full flex items-center justify-center">
          <p className="text-secondary-600 text-2xl font-bold">
            {user?.username?.[0]?.toUpperCase() || "U"}
          </p>
        </div>
        <div>
          <h1 className="text-xl font-bold text-secondary-900">
            Thông tin cá nhân
          </h1>
          <p className="text-sm text-secondary-500">
            Chỉnh sửa thông tin cá nhân của bạn
          </p>
        </div>
      </div>

      <Divider className="my-4" />

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md">
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit(handleUpdateProfile)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            control={control}
            name="username"
            label="Tên đăng nhập"
            disabled
          />
          <Input
            control={control}
            name="phoneNumber"
            label="Số điện thoại"
            disabled
          />
          <Input
            control={control}
            name="firstName"
            label="Họ"
            rules={{ required: "Vui lòng nhập họ" }}
          />
          <Input
            control={control}
            name="lastName"
            label="Tên"
            rules={{ required: "Vui lòng nhập tên" }}
          />
          <Input
            control={control}
            name="email"
            label="Email"
            rules={{
              required: "Vui lòng nhập email",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Email không hợp lệ",
              },
            }}
            className="md:col-span-2"
          />
        </div>

        <div className="flex justify-end">
          <Button
            type="submit"
            className="px-6"
            loading={loading}
            disabled={loading}
          >
            Cập nhật thông tin
          </Button>
        </div>
      </form>

      <Divider className="my-6" />

      <div className="mt-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="bg-green-100 p-2 rounded-full">
            <UserIcon className="w-5 h-5 text-green-600" />
          </div>
          <p className="text-sm font-medium text-secondary-900">Điểm tích lũy</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <p className="text-green-600 font-bold text-xl">{user?.savePoints || 0} điểm</p>
          <p className="text-sm text-secondary-500">
            Dùng điểm tích lũy để nhận ưu đãi khi mua hàng
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfileForm; 