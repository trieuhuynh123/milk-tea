"use client";


import { useRouter } from "next/navigation";

const useNavigation = () => {
  const router = useRouter();

  const navigateToProductDetail = (item: IProduct) => {
    let splits = (item?.name as string)?.split(" ");
    let final = "";

    const prefix = splits?.map((key: any, index: number) => {
      if (index == splits?.length - 1) {
        final = final + `${key}`;
      } else {
        final = final + `${key}-`;
      }
    });

    router.push(`/product-detail/${final}-${item?.upc}`);
  };

  return {
    navigateToProductDetail,
  };
};

export default useNavigation;
