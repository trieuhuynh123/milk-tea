"use client";

import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const useAuth = () => {
  const { accessToken, user } = useSelector((state: any) => state.auth);
  const [isAuthenticated, setIsAuthenticated] = React.useState<boolean>(false);

  const logOut = async () => {
    try {
      await localStorage.clear();
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    if (accessToken) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [accessToken]);



  return {
    isAuthenticated,
    accessToken,
    user,
    logOut,

  };
};

export default useAuth;
