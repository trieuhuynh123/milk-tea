"use client";

import React, { useEffect } from "react";
import { BuildingStorefrontIcon, TruckIcon } from "@heroicons/react/24/outline";
import { Divider, Popover } from "@mui/material";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import useStore from "@/hooks/useStore";
import CustomDialog from "@/components/molecules/CustomDialog";
import Button from "@/components/atom/Button";
import StoreList from "@/components/molecules/StoreList";

interface IFulfillmentMangementProps {}

const FulfillmentMangement: React.FC<IFulfillmentMangementProps> = (props) => {
  const [openPopup, setOpenPopup] = React.useState<boolean>(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const {
    currentStore,
    getListStore,
    isStoreOpen,
    listStore,
    dispatchSetCurrentStore,
  } = useStore();
  const [openSelectStore, setOpenSelectStore] = React.useState<boolean>(false);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setOpenPopup(true);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setOpenPopup(false);
  };

  useEffect(() => {
    getStoreByLocation();
  }, []);

  useEffect(() => {
    if (listStore) {
      if (!currentStore) {
        dispatchSetCurrentStore(listStore[0]);
      }
    }
  }, [listStore]);

  const getStoreByLocation = async () => {
    if (navigator.geolocation) {
      let lng;
      let lat;

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          lng = longitude;
          lat = latitude;
        },
        (error) => {
          console.error("Error getting geolocation:", error);
        },
      );
      await getListStore(lng, lat);
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  return (
    <>
      <button
        onClick={handleClick}
        className="text-black-500 flex w-fit items-center justify-center gap-x-2 rounded-full bg-transparent p-2 desktop:max-w-[250px]"
      >
        <TruckIcon className="mr-1 h-8 w-8 text-secondary-500" />
        <div>
          <p className="font-regular hidden truncate text-secondary-500 desktop:flex">
            Bạn đang chọn
          </p>
          <p className="font-regular hidden max-w-[100px] truncate text-secondary-500 desktop:flex">
            {currentStore?.name ?? `Cửa hàng: ${currentStore?.name}`}
          </p>
        </div>
      </button>

      <Popover
        open={openPopup}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        transformOrigin={{ vertical: -14, horizontal: "center" }}
        sx={{ width: "200px", height: "500px" }}
        slotProps={{
          paper: {
            sx: {
              borderRadius: "var(--border-radius-large, 16px)",
              overflow: "visible",
              maxWidth: 327,
              boxShadow: "0px 8px 28px 0px rgba(0, 0, 0, 0.28)",
              "&:before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: "50%",
                left: "50%",
                width: 20,
                height: 20,
                backgroundColor: "rgb(249 250 251)",
                transform: "translateY(-50%) rotate(45deg)",
                boxShadow: "-3px -3px 5px -2px rgba(0,0,0,0.1)",
              },
            },
          },
        }}
      >
        <div className="flex min-h-[400px] w-[280px] flex-col gap-y-4 rounded-lg border border-secondary-100 bg-secondary-50 px-4 py-8 shadow-sm">
          <div>
            <p className="text-sm font-normal text-secondary-900">
              Bạn đang mua sắm ở
            </p>
            <strong className="text-lg text-primary-600">
              {currentStore?.name}
            </strong>
          </div>

          <Divider sx={{ height: 4, width: "100%", margin: "4px 0" }} />

          <div>
            <div className="flex items-center gap-x-2">
              {isStoreOpen(currentStore?.openTime, currentStore?.closeTime) ? (
                <>
                  <BuildingStorefrontIcon className="h-4 w-4 text-green-500" />
                  <p className="text-sm font-bold text-green-600">
                    Đang mở cửa
                  </p>
                </>
              ) : (
                <>
                  <BuildingStorefrontIcon className="h-4 w-4 text-red-500" />
                  <p className="text-sm font-bold text-red-600">Đã đóng cửa</p>
                </>
              )}
            </div>
            <strong className="text-sm font-normal text-secondary-900">
              5201 4th St #7, Lubbock, TX 79416
            </strong>
          </div>

          <a className="cursor-pointer text-sm font-semibold text-secondary-900 no-underline hover:underline">
            Store Detail
          </a>

          <Divider sx={{ height: 4, width: "100%", margin: "4px 0" }} />

          <div>
            <div className="flex items-center gap-x-2">
              <ShoppingBagIcon className="h-8 w-8 text-primary-500" />
              <div>
                <p className="text-sm font-semibold text-secondary-800">
                  Free for orders over $30{" "}
                </p>
                <p className="text-sm font-normal text-secondary-800">
                  Varies by location
                </p>
              </div>
            </div>
          </div>

          <Button
            onClick={() => {
              setOpenPopup(false);
              setOpenSelectStore(true);
            }}
            className="mt-4"
          >
            Danh sách cửa hàng
          </Button>
        </div>
      </Popover>

      {openSelectStore && (
        <CustomDialog
          maxWidth="sm"
          title="Chọn cửa hàng bạn muốn mua hàng"
          open={openSelectStore}
          onClose={() => setOpenSelectStore(false)}
        >
          <StoreList onSelectedStore={() => setOpenSelectStore(false)} />
        </CustomDialog>
      )}
    </>
  );
};

export default FulfillmentMangement;
