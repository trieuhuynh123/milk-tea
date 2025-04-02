import React from "react";

const OrderLayout = ({ children }: any) => {
  return (
    <div className="flex w-full justify-center">
      <div className="py-16 bg-white desktop:min-w-[1200px] laptop:min-w-[960px] mx-auto min-h-[800px]">
        {children}
      </div>
    </div>
  );
};

export default OrderLayout;
