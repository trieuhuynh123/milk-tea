"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import { apiURL } from "@/constanst";
import useCart from "@/hooks/useCart";
import useOrder from "@/hooks/useOrder";

export default function PaymentResultPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { getUserCart } = useCart();
  const { createOrder, actionLoading } = useOrder();

  useEffect(() => {
    console.log("📡 Gọi verifyPayment");

    const verifyPayment = async () => {
      try {
        const queryString = searchParams.toString(); // Lấy full query trên URL

        const res = await axios.post(`${apiURL}/payment/verify?${queryString}`); // Gửi request xuống backend
        if (res.data.data.status === "success") {
          alert("✅ Thanh toán thành công!");
          const raw = localStorage.getItem("pendingOrder");
          if (!raw) {
            return;
          }
          const data = JSON.parse(raw);
          await createOrder(data, async () => {
            await getUserCart();
            router.push("/orders");
          });
        } else {
          alert("❌ Thanh toán thất bại hoặc bị hủy!");
          router.push("/cart");
        }
      } catch (error) {
        console.log(error);
        alert("⚠️ Không xác minh được kết quả thanh toán.");
        router.push("/cart");
      }
    };

    verifyPayment();
  }, [searchParams]);

  return <p>⏳ Đang xử lý thanh toán...</p>;
}
