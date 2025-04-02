"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "./useToast";
import { setCurrentCart } from "@/redux/slices/cart";
import { apiURL } from "@/constanst";
import { IProduct } from "@/@types";

const useCart = (currentProduct?: IProduct) => {
  const { accessToken } = useSelector((state: any) => state.auth);
  const { currentCart } = useSelector((state: any) => state.cart);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentQuantity, setCurrentQuantity] = useState<number>(0);
  const toast = useToast();

  const dispatch = useDispatch();

  const getUserCart = async () => {
    try {
      const response = await axios.get(`${apiURL}/cart/`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response?.data?.success) {
        dispatch(setCurrentCart(response?.data?.data));
      }
    } catch (error) {
      console.log("GET CART BY ID ERROR", error);
    }
  };

  const handleAddToCart = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        `${apiURL}/cart/add-product`,
        {
          productId: currentProduct?.id,
          quantity: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (response?.data?.success) {
        toast.sendToast(
          "Thành công",
          "Thêm sản phẩm vào giỏ hàng thành công",
          "success"
        );
        getUserCart();
        dispatch(setCurrentCart(response?.data?.data?.cart));
      }
    } catch (error) {
      console.warn("GET PRODUCT RESPONSE ERROR", error);
    } finally {
      setLoading(false);
    }
  };

  const handleIncreaseQuantity = async () => {
    try {
      setLoading(true);
      setCurrentQuantity((prevQuantity) => {
        const newQuantity = prevQuantity + 1;
        axios
          .post(
            `${apiURL}/cart/change-quantity`,
            {
              cartDetailId: currentCart?.cartDetails?.find(
                (item: any) => item.product?.id == currentProduct?.id
              )?.id,
              quantity: newQuantity,
            },
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          )
          .then((response) => {
            if (response?.data?.success) {
              toast.sendToast(
                "Thành công",
                "Tăng số lượng thành công",
                "success"
              );
              getUserCart();
            }
          })
          .catch((error) => {
            console.warn("GET PRODUCT RESPONSE", error);
          })
          .finally(() => {
            setLoading(false);
          });

        return newQuantity;
      });
    } catch (error) {
      console.warn("GET PRODUCT RESPONSE", error);
      setLoading(false);
    }
  };

  const handleDecreaseQuantity = async () => {
    try {
      setLoading(true);
      setCurrentQuantity((prevQuantity) => {
        const newQuantity = prevQuantity - 1;
        axios
          .post(
            `${apiURL}/cart/change-quantity`,
            {
              cartDetailId: currentCart?.cartDetails?.find(
                (item: any) => item.product?.id == currentProduct?.id
              )?.id,
              quantity: newQuantity,
            },
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          )
          .then((response) => {
            if (response?.data?.success) {
              toast.sendToast(
                "Thành công",
                "Giảm số lượng thành công",
                "success"
              );
              getUserCart();
            }
          })
          .catch((error) => {
            console.warn("GET PRODUCT RESPONSE", error);
          })
          .finally(() => {
            setLoading(false);
          });

        return newQuantity;
      });
    } catch (error) {
      console.warn("GET PRODUCT RESPONSE", error);
      setLoading(false);
    }
  };

  const handleRemoveProduct = async () => {
    try {
      let currentCartDetailId = currentCart?.cartDetails?.find(
        (item: any) => item.product?.id == currentProduct?.id
      )?.id;
      setLoading(true);
      axios
        .delete(`${apiURL}/cart/remove-product/${currentCartDetailId || ""}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((response) => {
          if (response?.data?.success) {
            toast.sendToast(
              "Thành công",
              "Xóa sản phẩm khỏi giỏ hàng thành công",
              "success"
            );
            getUserCart();
          }
        })
        .catch((error) => {
          console.warn("GET PRODUCT RESPONSE", error);
        })
        .finally(() => {
          setLoading(false);
        });
    } catch (error) {
      console.log("REMOVE PRODUCT ERROR", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (currentCart && currentProduct) {
      const findedQuantity = currentCart?.cartDetails?.find(
        (item: any) => item.product?.id == currentProduct?.id
      )?.quantity;
      setCurrentQuantity(findedQuantity || 0);
    }
  }, [currentCart, currentProduct]);

  return {
    getUserCart,
    currentCart,
    handleAddToCart,
    handleIncreaseQuantity,
    handleDecreaseQuantity,
    handleRemoveProduct,
    currentQuantity,
    loading,
  };
};

export default useCart;
