"use client";

import axios from "axios";
import { get } from "http";
import { useState } from "react";

const useAddress = () => {
  const [listProvinces, setListProvinces] = useState([]);
  const [listDistrict, setListDistrict] = useState([]);
  const [listWard, setListWard] = useState([]);
  const [initialLoading, setInitialLoading] = useState(false);
  const [shippingFee, setShippingFee] = useState(0);

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

  const calculateShippingFee = async (
    province: any,
    district: any,
    ward: any
  ) => {
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
          console.log(response.data);
          setShippingFee(response?.data?.data?.total);
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
  };
};

export default useAddress;
