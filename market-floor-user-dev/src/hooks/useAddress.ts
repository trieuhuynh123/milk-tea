"use client";

import axios from "axios";
import { get } from "http";
import { useState } from "react";

// Định nghĩa các mức phí ship theo khu vực
const SHIPPING_FEE_BY_REGION = {
  // Khu vực miền Bắc
  "Thành phố Hà Nội": 80000,
  "Hải Phòng": 90000,
  "Quảng Ninh": 100000,
  "Bắc Ninh": 90000,
  "Hải Dương": 90000,
  "Hưng Yên": 90000,
  "Vĩnh Phúc": 100000,
  "Hà Nam": 100000,
  "Nam Định": 100000,
  "Thái Bình": 100000,
  "Ninh Bình": 110000,
  
  // Khu vực miền Trung
  "Thanh Hóa": 110000,
  "Nghệ An": 120000,
  "Hà Tĩnh": 120000,
  "Quảng Bình": 130000,
  "Quảng Trị": 130000,
  "Thừa Thiên Huế": 130000,
  "Đà Nẵng": 120000,
  "Quảng Nam": 130000,
  "Quảng Ngãi": 130000,
  "Bình Định": 140000,
  "Phú Yên": 140000,
  "Khánh Hòa": 140000,
  "Ninh Thuận": 140000,
  "Bình Thuận": 130000,
  
  // Khu vực miền Nam
  "Thành phố Hồ Chí Minh": 70000,
  "Bà Rịa - Vũng Tàu": 90000,
  "Bình Dương": 80000,
  "Đồng Nai": 80000,
  "Tây Ninh": 100000,
  "Long An": 90000,
  "Tiền Giang": 100000,
  "Bến Tre": 110000,
  "Vĩnh Long": 110000,
  "Trà Vinh": 110000,
  "Đồng Tháp": 110000,
  "An Giang": 120000,
  "Kiên Giang": 120000,
  "Cần Thơ": 100000,
  "Hậu Giang": 110000,
  "Sóc Trăng": 120000,
  "Bạc Liêu": 130000,
  "Cà Mau": 130000,
  
  // Khu vực Tây Nguyên
  "Đắk Lắk": 140000,
  "Đắk Nông": 140000,
  "Gia Lai": 140000,
  "Kon Tum": 140000,
  "Lâm Đồng": 130000,
  
  // Mức phí mặc định
  "default": 120000
};

const useAddress = () => {
  const [listProvinces, setListProvinces] = useState([]);
  const [listDistrict, setListDistrict] = useState([]);
  const [listWard, setListWard] = useState([]);
  const [initialLoading, setInitialLoading] = useState(false);
  const [shippingFee, setShippingFee] = useState(0);
  const [selectedProvince, setSelectedProvince] = useState(null);

  const getListDistricts = async (province_id: number) => {
    const apiUrl =
      "https://online-gateway.ghn.vn/shiip/public-api/master-data/district";

    const headers = {
      token: "09b46603-9193-11ee-b394-8ac29577e80e",
      "Content-Type": "application/json",
    };

    const requestData = {
      province_id,
    };
    try {
      const response = await axios.get(apiUrl, {
        headers,
        params: requestData,
      });
      if (response?.status == 200) {
        const { data } = response?.data;
        setListDistrict(data);
      }
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  const getListProvince = async () => {
    const apiUrl =
      "https://online-gateway.ghn.vn/shiip/public-api/master-data/province";

    const headers = {
      token: "09b46603-9193-11ee-b394-8ac29577e80e",
      "Content-Type": "application/json",
    };

    try {
      const response = await axios.get(apiUrl, {
        headers,
      });
      if (response?.status == 200) {
        const { data } = response?.data;
        setListProvinces(data);
      }
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  const getListWars = async (districtId: string) => {
    const apiUrl =
      "https://online-gateway.ghn.vn/shiip/public-api/master-data/ward";
    const headers = {
      token: "09b46603-9193-11ee-b394-8ac29577e80e",
      "Content-Type": "application/json",
    };
    const requestData = {
      district_id: districtId,
    };
    try {
      const response = await axios.get(apiUrl, {
        headers,
        params: requestData,
      });
      if (response?.status == 200) {
        const { data } = response?.data;
        setListWard(data);
      }
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  // Tính phí ship dựa trên khu vực đã chọn
  const calculateShippingFee = async (
    province: any,
    district: any,
    ward: any
  ) => {
    // Lưu thông tin tỉnh/thành phố đã chọn
    setSelectedProvince(province);
    
    // Lấy phí ship tùy chỉnh theo tỉnh/thành phố
    const customFee = SHIPPING_FEE_BY_REGION[province?.ProvinceName] || SHIPPING_FEE_BY_REGION.default;
    
    // Áp dụng phí ship tùy chỉnh
    setShippingFee(customFee);
    
    // Nếu muốn vẫn gọi API GHN để so sánh hoặc ghi log, có thể giữ lại đoạn code bên dưới
    // và comment lại dòng setShippingFee bên trên
    const data = {
      service_type_id: 5,
      from_district_id: 3695,
      from_ward_code: "90742",
      to_province_id: province?.ProvinceID,
      to_district_id: district?.DistrictID,
      to_ward_code: `${ward?.WardCode}`,
      height: 20,
      length: 30,
      weight: 10,
      width: 40,
      insurance_value: 0,
      coupon: null,
      items: [
        {
          name: "TEST1",
          quantity: 1,
          height: 20,
          weight: 20,
          length: 20,
          width: 20,
        },
      ],
    };

    const headers = {
      "Content-Type": "application/json",
      token: "09b46603-9193-11ee-b394-8ac29577e80e",
      ShopId: 4740288,
    };

    try {
      await axios
        .post(
          "https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee",
          data,
          { headers }
        )
        .then((response) => {
          console.log("GHN shipping fee:", response.data);
          // Nếu muốn sử dụng phí của GHN thay vì phí tùy chỉnh, bỏ comment dòng dưới
          // setShippingFee(response?.data?.data?.total);
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (error) {
      console.log("SHIPPING FEE ERROR", error);
    }
  };

  return {
    listDistrict,
    listWard,
    listProvinces,
    getListDistricts,
    getListWars,
    getListProvince,
    calculateShippingFee,
    shippingFee,
    selectedProvince,
  };
};

export default useAddress;
