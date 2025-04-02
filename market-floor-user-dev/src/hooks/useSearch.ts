"use client";

import { apiURL } from "@/constanst";
import { setLoading, setSearchResults } from "@/redux/slices/search";
import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const useSearch = () => {
  const { searchResults, isLoading } = useSelector(
    (state: any) => state.search
  );

  const dispatch = useDispatch();

  const dispatchSetSearchResult = (data: any) => {
    dispatch(setSearchResults(data));
  };

  const searchingByKeyword = async (keyword: string) => {
    try {
      dispatch(setLoading(true));
      const searchResponse = await axios.post(`${apiURL}/products/search`, {
        keyword: keyword,
      });

      if (searchResponse) {
        dispatch(setLoading(false));
        if (searchResponse?.data?.data?.length > 0) {
          dispatchSetSearchResult(searchResponse?.data?.data);
        }
      }
    } catch (error) {
      console.log("searching error", error);
      dispatchSetSearchResult([]);
      dispatch(setLoading(false));
    } finally {
      dispatch(setLoading(false));
    }
  };

  return {
    searchingByKeyword,
    dispatchSetSearchResult,
    searchResults,
    isLoading,
  };
};

export default useSearch;
