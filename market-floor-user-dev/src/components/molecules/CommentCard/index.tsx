"use client";

import React, { useState } from "react";
import axios from "axios";
import CommentInput from "@/components/atom/CommentInput";
import { useForm } from "react-hook-form";

import { useToast } from "@/hooks/useToast";
import { useSelector } from "react-redux";
import ConfirmDialog from "@/components/molecules/ConfirmDialog";
import { apiURL } from "@/constanst";
import useAuth from "@/hooks/useAuth";

interface IProductCommentCardProps {
  productDetail: any;
  onReplyingSuccess?: () => void;
}

type ICommentMode = "view" | "edit";

const CommentCard: React.FC<any> = (props) => {
  const {
    content,
    parentId,
    replies,
    user: commentUser,
    onReplyingSuccess,
    id,
  } = props;
  const { productDetail } = props;

  const { register, control, handleSubmit, watch, setValue } = useForm();
  const [isReplying, setIsReplying] = React.useState<boolean>(false);
  const [isTurningOnReply, setIsTurningOnReply] =
    React.useState<boolean>(false);
  const { accessToken, user } = useSelector((state: any) => state.auth);
  const [openConfirmDialog, setOpenConfirmDialog] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [isCommenting, setIsCommenting] = useState<boolean>(false);
  const [commentMode, setCommentMode] = useState<ICommentMode>("view");
  const toast = useToast();
  const { isAuthenticated } = useAuth();

  const handlePostReply = async () => {
    try {
      setIsReplying(true);
      if (watch("reply")?.length > 0) {
        const response = await axios.post(
          `${apiURL}/products/comments`,
          {
            content: watch("reply") || "",
            parentComment: id || null,
            productId: productDetail.id,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        if (response?.data?.success) {
          setIsTurningOnReply(false);
          onReplyingSuccess?.();
          toast?.sendToast("success", "Trả lời bình luận thành công");
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
      setIsReplying(false);
    }
  };

  const handleDeleteComment = async () => {
    try {
      setIsDeleting(true);
      const response = await axios.delete(
        `${apiURL}/products/${productDetail?.id}/comments/${id}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (response?.data?.success) {
        setIsDeleting(false);
        onReplyingSuccess?.();
        toast.sendToast("success", "Xóa bình luận thành công");
      }
    } catch (error) {
      setIsDeleting(false);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleTurnOnEdit = () => {
    setCommentMode("edit");
    setValue("edit", content);
  };

  const handleSubmitEdit = async () => {
    try {
      setIsCommenting(true);
      const response = await axios.put(
        `${apiURL}/products/${productDetail?.id}/comments/${id}`,
        {
          comment: watch("edit") || "",
          parentId: parentId,
          productId: productDetail?.id,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (response?.data?.success) {
        setIsCommenting(false);
        onReplyingSuccess?.();
        toast?.sendToast("success", "Chỉnh sửa bình luận thành công");
      }
    } catch (error: any) {
      setIsCommenting(false);
      if (error?.response?.status == 401) {
        toast.sendToast(
          "error",
          "Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại"
        );
      }
    } finally {
      setIsCommenting(false);
    }
  };

  const handleTurnOnReply = () => {
    setIsTurningOnReply(true);
  };

  return (
    <>
      {openConfirmDialog && (
        <ConfirmDialog
          title="Bạn xác nhận sẽ xóa bình luận"
          description="Hành động này không thể được hoàn tác"
          open={openConfirmDialog}
          onClose={() => setOpenConfirmDialog(false)}
          onConfirm={handleDeleteComment}
          isConfirmLoadingButton={isDeleting}
        />
      )}
      <div className="my-2 py-3 pl-4 rounded-xl bg-secondary-100 h-fit">
        <>
          {commentMode == "view" ? (
            <div className="flex justify-between w-full">
              <div className="flex items-center gap-x-2">
                <div className="bg-primary-600 text-center text-secondary-500 w-[40px] h-[40px] cursor-pointer rounded-full flex items-center justify-center box-border">
                  {commentUser?.username?.[0]}
                </div>
                <div>
                  <div className="flex flex-col tablet:flex-row tablet:items-center">
                    <p className="text-sm tablet:text-lg font-semibold text-secondary-900">
                      {commentUser?.username}
                    </p>
                    {props?.createdAt && (
                      <p className="text-secondary-800 text-[10px] tablet:text-xs text-sm tablet:ml-1">
                        vào ngày{" "}
                        {props.createdAt?.toString()?.prettyDateTime() || ""}
                      </p>
                    )}
                  </div>

                  <p className="text-secondary-900 text-sm">{content}</p>
                  <div className="items-center flex mt-1">
                    {!!isAuthenticated && (
                      <button
                        className="text-secondary-900 hover:text-secondary-900 font-regular text-xs"
                        onClick={handleTurnOnReply}
                      >
                        Trả lời
                      </button>
                    )}
                    {props.userName == user?.username && (
                      <button
                        className="text-secondary-900 hover:opacity-80 font-regular text-xs ml-2"
                        onClick={() => setOpenConfirmDialog(true)}
                      >
                        Xóa bình luận
                      </button>
                    )}
                    {props.userName == user?.username && (
                      <button
                        className="text-secondary-900 hover:opacity-80 font-regular text-xs ml-2"
                        onClick={handleTurnOnEdit}
                      >
                        Chỉnh sửa
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <CommentInput
              key={id}
              {...register("edit", {
                required: {
                  value: true,
                  message: "Không được để trống phần trả lời",
                },
              })}
              control={control}
              label="Chinh sửa bình luận"
              onPostComment={handleSubmit(handleSubmitEdit)}
              isPosting={isCommenting}
              isClosable
              onClose={() => setCommentMode("view")}
            />
          )}
        </>

        {isTurningOnReply && commentMode == "view" ? (
          <div className="ml-12 mt-4 ease-in duration-300">
            <CommentInput
              key={id}
              {...register("reply", {
                required: {
                  value: true,
                  message: "Không được để trống phần trả lời",
                },
              })}
              control={control}
              label="Bình luận của bạn"
              onPostComment={handleSubmit(handlePostReply)}
              isPosting={isReplying}
              isClosable
              onClose={() => setIsTurningOnReply(false)}
            />
          </div>
        ) : null}

        <div>
          {replies?.map((reply: any, replyIndex: number) => {
            return (
              <div className="relative ml-2" key={`reply-${replyIndex}`}>
                <svg
                  className="absolute left-0 top-0 h-full"
                  width="40"
                  height="100%"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10 0 v50 M10 50 h30"
                    stroke="#cbd5e0"
                    strokeWidth="0.5"
                  />
                </svg>
                <div className="ml-8 mt-2 border-t border-secondary-200 pl-4">
                  <CommentCard
                    key={replyIndex}
                    productDetail={productDetail}
                    {...reply}
                    onReplyingSuccess={() => onReplyingSuccess?.()}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default CommentCard;
