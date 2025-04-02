import React from "react";

const Loading = () => {
  return (
    <div className="flex items-center gap-x-10">
      <div className="flex w-[70%] flex-col gap-y-4">
        <div className="w h-[200px] animate-pulse bg-gray-100"></div>
        <div className="w h-[200px] animate-pulse bg-gray-100"></div>
        <div className="w h-[200px] animate-pulse bg-gray-100"></div>
      </div>
    </div>
  );
};

export default Loading;
