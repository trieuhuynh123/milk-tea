"use client";

import React, { useEffect } from "react";

import { CircularProgress, Dialog, IconButton } from "@mui/material";
import useNavigation from "@/hooks/useNavigation";
import useSearch from "@/hooks/useSearch";
import useCategory from "@/hooks/useCategories";

interface IPopularSearchesProps {
  open: boolean;
  onClose: () => void;
}

const SearchDropdown: React.FC<IPopularSearchesProps> = (props) => {
  const { open, onClose } = props;
  const { searchResults, isLoading } = useSearch();
  const { listCategory } = useCategory();

  const { navigateToProductDetail } = useNavigation();

  return (
    <>
      {isLoading ? (
        <div className="w-full flex justify-center">
          <CircularProgress size={30} sx={{ color: "black" }} />
        </div>
      ) : (
        <>
          {searchResults?.length > 0 ? (
            <div className="flex flex-col gap-y-6">
              {searchResults?.map((item: any, index: number) => {
                return (
                  <div
                    key={index}
                    onClick={(e) => {
                      navigateToProductDetail(item);
                      e?.preventDefault();

                      onClose();
                    }}
                    className="flex items-center gap-x-4 cursor-pointer hover:opacity-80"
                  >
                    <div>
                      <img
                        src={item?.thumbnail}
                        className="w-[40px] h-[40px]"
                        alt={item?.name}
                      />
                    </div>
                    <div>
                      <p className="text-secondary-900 text-sm text-regular">
                        {item?.name}
                      </p>
                      <p className="mt-2 text-green-600 text-xs">
                        {item?.price?.displayPrice}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <>
              <h2 className="text-md text-seconday-900 font-bold mb-4">
                Các danh mục
              </h2>
              <div className="w-full flex flex-wrap gap-y-4 gap-x-2">
                {listCategory?.map((cat: any) => (
                  <div className="px-4 py-2 border-secondary-600 border rounded-full text-sm text-seconday-900 text-regular">
                    {cat?.name}
                  </div>
                ))}
              </div>
            </>
          )}
        </>
      )}
    </>
  );
};

export default SearchDropdown;
