"use client";

import React from "react";
import { CircularProgress } from "@mui/material";
import useNavigation from "@/hooks/useNavigation";
import useSearch from "@/hooks/useSearch";

interface IPopularSearchesProps {
  open: boolean;
  onClose: () => void;
}

const SearchDropdown: React.FC<IPopularSearchesProps> = (props) => {
  const { open, onClose } = props;
  const { searchResults, isLoading } = useSearch();
  const { navigateToProductDetail } = useNavigation();

  return (
    <>
      {isLoading ? (
        <div className="flex w-full justify-center">
          <CircularProgress size={30} sx={{ color: "black" }} />
        </div>
      ) : (
        <>
          {searchResults?.length > 0 ? (
            <div className="flex flex-col gap-y-6">
              {searchResults.map((item: any, index: number) => (
                <div
                  key={index}
                  onClick={(e) => {
                    navigateToProductDetail(item);
                    e?.preventDefault();
                    onClose();
                  }}
                  className="flex cursor-pointer items-center gap-x-4 hover:opacity-80"
                >
                  <div>
                    <img
                      src={item?.thumbnail}
                      className="h-[40px] w-[40px]"
                      alt={item?.name}
                    />
                  </div>
                  <div>
                    <p className="text-regular text-sm text-secondary-900">
                      {item?.name}
                    </p>
                    <p className="mt-2 text-xs text-green-600">
                      {item?.price?.displayPrice}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : null}
        </>
      )}
    </>
  );
};

export default SearchDropdown;
