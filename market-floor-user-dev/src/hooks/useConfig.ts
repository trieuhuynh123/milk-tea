"use client";
import { apiURL } from "@/constanst";
import { setTenantConfig } from "@/redux/slices/config";
import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const useConfig = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const { accessToken } = useSelector((state: any) => state.auth);
  const { tenantConfigs } = useSelector((state: any) => state.config);

  const getTenantConfig = async () => {};

  return {
    getTenantConfig,
    tenantConfigs,
  };
};

export default useConfig;
