import React from "react";

interface ILoadingProps {}

const Loading: React.FC<ILoadingProps> = (props) => {
  return (
    <div className="mx-auto w-full max-w-[1200px] px-4 pb-20">
      <div className="flex flex-col gap-5 py-10 md:flex-row">
        <div className="mt-10 h-[480px] w-full animate-pulse bg-secondary-600 pt-20 md:w-[480px]"></div>
        <div className="flex w-full flex-col gap-5">
          <div className="mt-10 h-[80px] w-full animate-pulse bg-secondary-600 pt-20"></div>
          <div className="mt-10 h-[30px] w-full animate-pulse bg-secondary-600 pt-20"></div>
          <div className="mt-10 h-[120px] w-full animate-pulse bg-secondary-600 pt-20"></div>
        </div>
      </div>

      <div>
        <div className="mt-10 h-[40px] w-full animate-pulse bg-secondary-600"></div>
        <div className="mt-10 flex flex-col gap-5 md:flex-row">
          <div className="mt-10 h-[450px] w-full animate-pulse bg-secondary-600 pt-20 md:w-[280px]"></div>
          <div className="mt-10 h-[450px] w-full animate-pulse bg-secondary-600 pt-20 md:w-[280px]"></div>
          <div className="mt-10 h-[450px] w-full animate-pulse bg-secondary-600 pt-20 md:w-[280px]"></div>
          <div className="mt-10 h-[450px] w-full animate-pulse bg-secondary-600 pt-20 md:w-[280px]"></div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
