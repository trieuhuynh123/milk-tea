"use client";

import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { apiURL } from "@/constanst";

const useComments = (productDetail: any) => {
  const [listComments, setListComments] = useState<any[]>([]);
  const [loadComments, setLoadComments] = useState<boolean>(false);
  const { accessToken } = useSelector((state: any) => state.auth);
  const [isPosting, setIsPosting] = useState<boolean>(false);

  const getListComments = async () => {
    try {
      setLoadComments(true);
      const response = await axios.get(
        `${apiURL}/products/${productDetail?.id}/comments`
      );

      if (response) {
        console.log(response?.data?.data);
      }
      if (response?.data?.success) {
        setLoadComments(false);
        let comments = response?.data?.data;
        setListComments(comments);
      }
    } catch (error) {
      setLoadComments(false);
      console.log(error);
    } finally {
      setLoadComments(false);
    }
  };

  return { listComments, loadComments, getListComments };
};

export default useComments;
