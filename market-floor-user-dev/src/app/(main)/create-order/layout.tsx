import React from "react";

const CreateOrderLayout = ({ children }: any) => {
  return (
    <div className="flex w-full justify-center">
      <div className="mx-auto min-h-[800px] bg-white py-16 laptop:min-w-[960px] desktop:min-w-[1200px]">
        {children}
      </div>
    </div>
  );
};

export default CreateOrderLayout;
