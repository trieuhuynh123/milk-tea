"use client";

import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Rating,
  TextField,
  Box,
  Typography,
} from "@mui/material";
import { IOrderDetail, IRating } from "@/@types";
import Image from "next/image";
import StarIcon from '@mui/icons-material/Star';
import useRating from "@/hooks/useRating";

interface RatingDialogProps {
  open: boolean;
  onClose: () => void;
  orderDetail: IOrderDetail;
  orderId: number;
  onRatingSuccess: () => void;
}

const labels: { [index: string]: string } = {
  1: 'Rất tệ',
  2: 'Tệ',
  3: 'Bình thường',
  4: 'Tốt',
  5: 'Rất tốt',
};

const RatingDialog: React.FC<RatingDialogProps> = ({
  open,
  onClose,
  orderDetail,
  orderId,
  onRatingSuccess,
}) => {
  const [ratingValue, setRatingValue] = useState<number | null>(3);
  const [comment, setComment] = useState<string>("");
  const [hover, setHover] = useState(-1);
  const { submitRating, actionLoading } = useRating();

  const handleRatingChange = (
    event: React.SyntheticEvent,
    newValue: number | null
  ) => {
    setRatingValue(newValue);
  };

  const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setComment(event.target.value);
  };

  const handleSubmit = async () => {
    if (!ratingValue) return;

    console.log("Product ID type:", typeof orderDetail.product.id, "Value:", orderDetail.product.id);
    
    const ratingData: IRating = {
      productId: Number(orderDetail.product.id),
      orderDetailId: orderDetail.id,
      orderId: orderId,
      rating: ratingValue,
      comment: comment,
    };

    console.log("Rating data:", ratingData);

    await submitRating(ratingData, () => {
      onRatingSuccess();
      onClose();
    });
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Đánh giá sản phẩm</DialogTitle>
      <DialogContent>
        <Box className="flex items-center gap-4 mb-4">
          <Image
            src={orderDetail.product.thumbnail || ""}
            alt={orderDetail.product.name}
            width={80}
            height={80}
            className="rounded-lg object-cover"
          />
          <Box>
            <Typography variant="h6">{orderDetail.product.name}</Typography>
            <Typography variant="body2">
              Giá: {orderDetail.price.toString().prettyMoney()} đ
            </Typography>
          </Box>
        </Box>

        <Box className="flex flex-col items-center my-6">
          <Rating
            name="product-rating"
            value={ratingValue}
            precision={1}
            onChange={handleRatingChange}
            size="large"
            onChangeActive={(event, newHover) => {
              setHover(newHover);
            }}
            emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
          />
          <Box sx={{ ml: 2 }} className="mt-2">
            {ratingValue !== null && (
              <Typography variant="body2">
                {labels[hover !== -1 ? hover : ratingValue]}
              </Typography>
            )}
          </Box>
        </Box>

        <TextField
          autoFocus
          margin="dense"
          id="comment"
          label="Nhận xét của bạn về sản phẩm"
          type="text"
          fullWidth
          multiline
          rows={4}
          value={comment}
          onChange={handleCommentChange}
          variant="outlined"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Hủy bỏ
        </Button>
        <Button 
          onClick={handleSubmit} 
          color="primary" 
          variant="contained"
          disabled={!ratingValue || actionLoading}
        >
          {actionLoading ? "Đang gửi..." : "Gửi đánh giá"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RatingDialog; 