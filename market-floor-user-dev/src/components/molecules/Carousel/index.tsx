"use client";

import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import Image from "next/image";
import FirstCarousel from "@/assets/images/Carousel1.png";
import SecondCarousel from "@/assets/images/Carousel2.png";
import ThirdCarousel from "@/assets/images/Carousel3.png";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface ISimilarProduct {}

const Carousel: React.FC<ISimilarProduct> = ({}) => {
  const router = useRouter();
  const [slidesToShow, setSlidesToShow] = useState<number>(1);

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
    dots: false,
    speed: 500,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
    adaptiveHeight: true,
    infinite: true,
  };

  return (
    <div className="h-fit w-full overflow-hidden rounded-lg bg-white px-8 pt-4">
      <Slider {...settings}>
        <div>
          <Image
            src={FirstCarousel}
            className="w-full h-[400px] rounded-xl object-cover"
            alt={`Product `}
            layout="responsive"
            width={1200}
            height={400}
          />
        </div>
        <div>
          <Image
            src={SecondCarousel}
            className="w-full h-[400px] rounded-xl object-cover"
            alt={`Product `}
            layout="responsive"
            width={1200}
            height={400}
          />
        </div>
        <div>
          <Image
            src={ThirdCarousel}
            className="w-full h-[400px] rounded-xl object-cover"
            alt={`Product `}
            layout="responsive"
            width={1200}
            height={400}
          />
        </div>
      </Slider>
    </div>
  );
};

export default Carousel;
