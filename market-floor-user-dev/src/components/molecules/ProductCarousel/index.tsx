"use client";

import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import EmptyImage from "@/assets/images/EmptyImage.png";
import Image from "next/image";
import ProductCard from "@/components/molecules/ProductCard";
import { IStoreProduct } from "@/@types";

interface ISimilarProduct {
  listProduct: IStoreProduct[];
}

const ProductCarousel: React.FC<ISimilarProduct> = ({ listProduct }) => {
  const router = useRouter();
  const [slidesToShow, setSlidesToShow] = useState<number>(4);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setSlidesToShow(1);
      } else if (window.innerWidth <= 1024) {
        setSlidesToShow(2);
      } else if (window.innerWidth <= 1278) {
        setSlidesToShow(3);
      } else {
        setSlidesToShow(4);
      }
    };

    // Initial setup
    handleResize();

    // Listen for resize events
    window.addEventListener("resize", handleResize);

    // Clean up event listener on unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const settings = {
    nextArrow: (
      <ChevronRight
        sx={{
          color: "black",
          ":hover": {
            color: "black",
          },
        }}
      />
    ),
    prevArrow: (
      <ChevronLeft
        sx={{
          color: "black",
          ":hover": {
            color: "black",
          },
        }}
      />
    ),
    arrows: true,
    dot: false,
    speed: 500,
    dots: false,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
    adaptiveHeight: true,
    responsive: [
      {
        breakpoint: 1300,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
          infinite: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
        },
      },
    ],
  };

  const handleItemClick = (item: any) => {
    let splits = (item?.name as string)?.split(" ");
    let final = "";

    const prefix = splits?.map((key: any, index: number) => {
      if (index == splits?.length - 1) {
        final = final + `${key}`;
      } else {
        final = final + `${key}-`;
      }
    });

    router.push(`/product-detail/${final}-${item?.upc}`, { scroll: true });
    window.scrollTo(0, 0);
  };

  return (
    <div className="max-w-[360px] tablet:max-w-[600px] laptop:max-w-[960px] h-[600px] desktop:max-w-[1200px] mx-auto mb-10">
      {listProduct?.length > 4 && (
        <div className="h-full rounded-lg bg-white w-full px-8 pt-4 grid grid-cols-1">
          <Slider {...settings}>
            {listProduct.map((item, index) => (
              <div
                key={`card-${index}`}
                className="border-r border-b border-t border-gray-300 p-2 h-full flex items-stretch"
              >
                <ProductCard
                  item={item}
                  index={index}
                  key={`card-${index}`}
                  handleItemClick={() => handleItemClick(item)}
                />
              </div>
            ))}
          </Slider>
        </div>
      )}
    </div>
  );
};

export default ProductCarousel;
