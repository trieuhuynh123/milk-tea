"use client";

import CommentCard from "@/components/molecules/CommentCard";
import CommentInput from "@/components/atom/CommentInput";
import { Divider } from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useToast } from "@/hooks/useToast";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import useComments from "@/hooks/useComments";
import { apiURL } from "@/constanst";
import useAuth from "@/hooks/useAuth";

interface IProductCommentsProps {
  productDetail: any;
}

const ProductComments: React.FC<IProductCommentsProps> = (props) => {
  const { productDetail } = props;
  const { accessToken } = useSelector((state: any) => state.auth);
  const [isPosting, setIsPosting] = React.useState<boolean>(false);
  const toast = useToast();
  const { listComments, getListComments, loadComments } =
    useComments(productDetail);

  const { register, control, handleSubmit, watch, setValue } = useForm();
  const { isAuthenticated } = useAuth();

  const handlePostComment = async () => {
    try {
      setIsPosting(true);
      if (watch("comment")?.length > 0) {
        const response = await axios.post(
          `${apiURL}/products/comments`,
          {
            content: watch("comment") || "",
            parentId: null,
            productId: Number(productDetail?.id),
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        const { success } = response?.data;
        if (success) {
          setValue("comment", "");
          toast.sendToast("success", "Bình luận thành công");
          getListComments();
        }
      }
    } catch (error: any) {
      if (error?.response?.status == 401) {
        toast.sendToast(
          "error",
          "Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại"
        );
      }
    } finally {
      setIsPosting(false);
    }
  };

  useEffect(() => {
    getListComments();
  }, []);

  return (
    <div className="mt-16 flex flex-col justify-center w-full">
      <h1 className="text-secondary-900 font-bold text-3xl">
        Bình luận về sản phẩm
      </h1>
      <Divider sx={{ marginY: 4 }} />

      <>
        {listComments?.length > 0 ? (
          <>
            <div className="mt-2 flex flex-col gap-y-2 ">
              {listComments?.map((item, index) => (
                <CommentCard
                  key={index}
                  commentMode="view"
                  {...item}
                  productDetail={props.productDetail}
                  onReplyingSuccess={() => {
                    getListComments();
                  }}
                />
              ))}
            </div>

            <div className="mt-4">
              {!!isAuthenticated ? (
                <CommentInput
                  {...register("comment", {
                    required: {
                      value: true,
                      message: "Không được để trống phần comment",
                    },
                  })}
                  control={control}
                  label="Đăng bình luận"
                  onPostComment={handleSubmit(handlePostComment)}
                  isPosting={isPosting}
                />
              ) : null}
            </div>
          </>
        ) : (
          <>
            <div className="flex items-center gap-x-1  mt-4">
              <InformationCircleIcon className="text-secondary-900 w-[20px] h-[20px]" />
              <p className="text-secondary-900 font-bold italic text-sm">
                Sản phẩm chưa có bình luận nào
              </p>
            </div>
            <div className="mt-8">
              {!!isAuthenticated ? (
                <CommentInput
                  {...register("comment", {
                    required: {
                      value: true,
                      message: "Không được để trống phần comment",
                    },
                  })}
                  control={control}
                  label="Đăng bình luận"
                  onPostComment={handleSubmit(handlePostComment)}
                  isPosting={isPosting}
                />
              ) : null}
            </div>
          </>
        )}
      </>
    </div>
  );
};

export default ProductComments;
