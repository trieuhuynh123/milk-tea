"use client";

import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setAccessToken, setUser } from "@/redux/slices/auth";

const useAuth = () => {
  const { accessToken, user } = useSelector((state: any) => state.auth);
  const [isAuthenticated, setIsAuthenticated] = React.useState<boolean>(false);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const checkAuth = async () => {
      setIsLoading(true);
      try {
        // Check if token exists in redux store
        if (accessToken) {
          setIsAuthenticated(true);
        } else {
          // Try to get token from localStorage as backup
          const storedToken = localStorage.getItem("accessToken");
          const storedUser = localStorage.getItem("user");
          
          if (storedToken) {
            dispatch(setAccessToken(storedToken));
            if (storedUser) {
              dispatch(setUser(JSON.parse(storedUser)));
            }
            setIsAuthenticated(true);
          } else {
            setIsAuthenticated(false);
          }
        }
      } catch (error) {
        console.error("Auth check error:", error);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [accessToken, dispatch]);

  const logOut = async () => {
    try {
      dispatch(setAccessToken(null));
      dispatch(setUser(null));
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
      setIsAuthenticated(false);
    } catch (error) {
      console.log("error", error);
    }
  };

  return {
    isAuthenticated,
    accessToken,
    user,
    logOut,
    isLoading,
  };
};

export default useAuth;
