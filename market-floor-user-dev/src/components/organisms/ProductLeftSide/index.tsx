"use client";

import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import Image from "next/image";
import EmptyImage from "@/assets/images/EmptyImage.png";

interface ILeftSideProps {
  storeProduct?: IStoreProduct;
}

const ProductLeftSide: React.FC<ILeftSideProps> = ({ storeProduct }) => {
  const [isMobile, setIsMobile] = useState(false);
  const sliderRef = useRef(null);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
  };

  const carouselImages = [
    storeProduct?.product?.thumbnail,
    ...(storeProduct?.product?.images || []),
  ];

  return (
    <div className="max-w-[340px] tablet:max-w-[240px] laptop:max-w-[420px] desktop:max-w-[480px] mx-auto">
      <div className="w-full h-full  bg-white">
        {carouselImages?.length > 1 ? (
          <Slider ref={sliderRef} {...settings} className="rounded-lg mx-auto">
            {carouselImages?.map((item: any, index: number) => (
              <div
                key={index}
                className="flex justify-center items-center h-[420px] w-full rounded-lg cursor-pointer hover:opacity-80"
              >
                {item ? (
                  <img
                    src={item}
                    className="w-full h-full object-cover rounded-xl border border-gray-300"
                    alt={`Product image ${index + 1}`}
                  />
                ) : (
                  <Image
                    src={EmptyImage}
                    className="w-full h-full object-cover rounded-xl"
                    alt={`Product image ${index + 1}`}
                  />
                )}
              </div>
            ))}
          </Slider>
        ) : (
          <Image
            width={400}
            height={400}
            src={carouselImages[0] as string}
            className="w-full h-full object-cover rounded-xl"
            alt={`Product image`}
          />
        )}

        <div className="flex flex-wrap gap-4 mt-8 justify-center">
          {carouselImages?.length > 1 &&
            carouselImages?.map((item: any, index: number) => (
              <div
                key={index}
                className="p-2 border border-secondary-700 rounded-xl cursor-pointer hover:opacity-50"
                onClick={() => (sliderRef.current as any)?.slickGoTo(index)}
              >
                <img
                  src={item}
                  width="400"
                  height="400"
                  className="w-[40px] h-[40px] laptop:w-[80px] laptop:h-[80px] object-cover rounded-lg"
                  alt={`Thumbnail ${index + 1}`}
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ProductLeftSide;
