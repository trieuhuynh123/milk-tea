"use client";

import React from "react";
import ProfileForm from "@/components/molecules/ProfileForm";
import { useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";

interface IProfilePageProps {}

const ProfilePage: React.FC<IProfilePageProps> = () => {
  const { user, accessToken, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  React.useEffect(() => {
    // Chỉ chuyển hướng khi đã hoàn thành việc kiểm tra xác thực và không có xác thực
    if (!isLoading && !isAuthenticated) {
      router.replace("/login");
    }
  }, [isAuthenticated, isLoading, router]);

  // Hiển thị loading khi đang kiểm tra xác thực
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  // Hiển thị loading khi chưa có user data nhưng đã xác thực
  if (isAuthenticated && !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  // Không hiển thị nội dung nếu không có xác thực
  if (!isAuthenticated) {
    return null; // Router sẽ chuyển hướng, không cần hiển thị nội dung
  }

  return (
    <div className="container mx-auto py-12 px-4">
      <ProfileForm 
        user={user} 
        accessToken={accessToken || ""} 
      />
    </div>
  );
};

export default ProfilePage; 