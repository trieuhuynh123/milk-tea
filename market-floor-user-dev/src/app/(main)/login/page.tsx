// app/login/page.tsx
"use client";

import { apiURL } from "@/constanst";
import { setAccessToken, setUser } from "@/redux/slices/auth";
import axios from "axios";
import { signIn, signOut, useSession } from "next-auth/react"; // Import useSession và signOut
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export default function LoginPage() {
  const { data: session, status } = useSession(); // Sử dụng useSession để truy cập session
  const dispatch = useDispatch();
  const router = useRouter();
  useEffect(() => {
    const fetchUserData = async () => {
      if (status === "authenticated" && session?.user?.email) {
        try {
          const res = await axios.post(`${apiURL}/auth/signin-google`, {
            email: session.user.email,
          });

          const { accessToken, user } = res.data.data;

          dispatch(setAccessToken(accessToken));
          dispatch(setUser(user));
          router.replace("/");
          console.log("✅ Lưu accessToken và user vào Redux thành công");
        } catch (err) {
          console.error("❌ Lỗi khi gọi API lấy token/user:", err);
        }
      }
    };

    fetchUserData();
  }, [session, status, dispatch]);

  const handleGoogleSignIn = () => {
    signIn("google");
  };

  return (
    <div
      style={{
        padding: "20px",
        fontFamily: "Arial, sans-serif",
        textAlign: "center",
      }}
    >
      {status === "loading" && <p>Đang kiểm tra trạng thái đăng nhập...</p>}

      <div>
        <h1>Đăng nhập vào ứng dụng</h1>
        <p>Vui lòng đăng nhập bằng tài khoản Google của bạn.</p>
        <button
          onClick={handleGoogleSignIn}
          style={{
            padding: "10px 20px",
            backgroundColor: "#4285F4",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            display: "inline-flex",
            alignItems: "center",
            gap: "10px",
            marginTop: "20px",
          }}
        >
          <img
            src="https://img.icons8.com/color/24/000000/google-logo.png"
            alt="Google logo"
          />
          Đăng nhập với Google
        </button>
      </div>
    </div>
  );
}
