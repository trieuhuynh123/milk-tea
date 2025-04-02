"use client";

import React from "react";
import { Avatar, Divider, Popover } from "@mui/material";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import { Cog6ToothIcon, UserIcon } from "@heroicons/react/24/solid";
import Button from "@/components/atom/Button";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface IAccountButtonProps {}

const AccountButton: React.FC<IAccountButtonProps> = (props) => {
  const [openPopup, setOpenPopup] = React.useState<boolean>(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const router = useRouter();
  const { user, isAuthenticated, logOut } = useAuth();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setOpenPopup(true);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setOpenPopup(false);
  };

  return (
    <>
      {!isAuthenticated ? (
        <button
          className=" rounded-xl px-4 py-2 text-center text-primary-600  text-sm w-fit flex space-x-1 items-center hover:opacity-80"
          onClick={() => router.replace("/login")}
        >
          <UserIcon className="w-8 h-8 text-secondary-500" />
        </button>
      ) : (
        <button
          onClick={handleClick}
          className="py-2 text-black-500 rounded-full w-fit px-4 bg-transparent justify-center items-center flex"
        >
          <div className="bg-primary-600 w-[40px] h-[40px] cursor-pointer rounded-full flex items-center justify-center box-border">
            <p className="text-secondary-600 font-bold">
              {user?.username?.[0]?.toUpperCase() || "U"}
            </p>
          </div>
        </button>
      )}

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
        <div className="w-[280px] min-h-[400px] shadow-md bg-secondary-50 px-4 py-8 rounded-lg flex flex-col gap-y-4">
          <div>
            <p className="text-secondary-900 text-sm font-normal">Xin chào</p>
            <strong className="text-primary-600 text-lg">
              {user?.username}
            </strong>
          </div>

          <div className="flex flex-row items-center gap-x-2">
            <p className="text-secondary-900 text-sm font-normal">
              Điểm tích lũy
            </p>
            <strong className="text-green-600 text-lg">
              {user?.savePoints}
            </strong>
          </div>

          <Divider sx={{ height: 4, width: "100%", margin: "4px 0" }} />

          <a className="no-underline text-secondary-900 text-sm font-semibold cursor-pointer hover:underline">
            Thông tin cá nhân
          </a>

          <Link href="/orders" onClick={() => setOpenPopup(false)}>
            <p className="no-underline text-secondary-900 text-sm font-semibold cursor-pointer hover:underline">
              Đơn hàng của tôi
            </p>
          </Link>

          <Divider sx={{ height: 4, width: "100%", margin: "4px 0" }} />

          <div>
            <div className="flex items-center gap-x-2 cursor-pointer">
              <Cog6ToothIcon className="w-8 h-8 text-secondary-900" />
              <div>
                <p className="text-secondary-900 text-sm font-semibold">
                  Cài đặt tài khoản
                </p>
              </div>
            </div>
          </div>

          <Button
            onClick={() => {
              logOut();
              setOpenPopup(false);
              location.reload();
              window.location.href = "/";
            }}
            className="mt-4"
          >
            Đăng xuất
          </Button>
        </div>
      </Popover>
    </>
  );
};

export default AccountButton;
