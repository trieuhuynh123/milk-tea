import { apiURL } from "@/constanst";
import { setCurrentStore, setListStore } from "@/redux/slices/store";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

const useStore = () => {
  const { currentStore, listStore } = useSelector((state: any) => state.store);
  const { product } = useSelector((state: any) => state.product);

  const dispatch = useDispatch();

  const dispatchSetCurrentStore = (data: any) => {
    dispatch(setCurrentStore(data));
  };

  const dispatchSetListStore = (data: any) => {
    dispatch(setListStore(data));
  };

  const isStoreOpen = (openTime: number, closeTime: number): boolean => {
    const currentTime = new Date().getHours();
    return currentTime >= openTime && currentTime < closeTime;
  };

  const getListStore = async (longtitude?: number, latitude?: number) => {
    try {
      let url = `${apiURL}/store`;

      if (longtitude !== undefined && latitude !== undefined) {
        url += `?currentLng=${longtitude}&currentLat=${latitude}`;
      }

      const response = await axios.get(url);

      if (response?.data?.success) {
        console.log("GET LIST STORE RESPONSE", response?.data?.data);
        dispatch(setListStore(response?.data?.data?.results));
      }
    } catch (error) {
      console.log("GET LIST STORE ERROR", error);
    }
  };
  return {
    currentStore,
    dispatchSetCurrentStore,
    getListStore,
    listStore,
    dispatchSetListStore,
    isStoreOpen,
  };
};

export default useStore;
