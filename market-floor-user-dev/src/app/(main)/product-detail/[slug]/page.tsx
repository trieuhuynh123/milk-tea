"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductDetailTemplate from "@/components/template/ProductDetail";
import { apiURL } from "@/constanst";
import useStore from "@/hooks/useStore";

const ProductDetailPage = (props: any) => {
  const { currentStore } = useStore(); // lấy currentStore từ hook
  const [product, setProduct] = useState<IStoreProduct | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<any[]>([]);

  useEffect(() => {
    const fetchProductDetails = async () => {
      const upc = props?.params?.slug?.split("-").pop();
      try {
        const response = await axios.get(
          `${apiURL}/products/detail?upc=${upc}&storeId=${currentStore?.id}`,
        );
        if (response?.data?.success) {
          setProduct(response?.data?.data?.storeProduct);
          setRelatedProducts(response?.data?.data?.relatedProducts);
        } else {
          setProduct(null);
        }
      } catch (error) {
        console.log("Error fetching product details", error);
        setProduct(null);
        setRelatedProducts([]);
      }
    };

    if (currentStore) {
      fetchProductDetails(); // fetch khi currentStore có giá trị
    }
  }, [props?.params?.slug, currentStore]); // thêm `currentStore` và `slug` vào dependency array

  if (!product) {
    return <div>Sản phẩm không tồn tại</div>; // Hiển thị loading trong khi chờ dữ liệu
  }

  return (
    <ProductDetailTemplate product={product} relatedProduct={relatedProducts} />
  );
};

export default ProductDetailPage;
