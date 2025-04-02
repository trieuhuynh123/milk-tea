"use client";

import useStore from "@/hooks/useStore";
import { BuildingStorefrontIcon, ClockIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";

interface IStoreListProps {
  onSelectedStore: (store: any) => void;
}

const StoreList: React.FC<IStoreListProps> = ({ onSelectedStore }) => {
  const { listStore, dispatchSetCurrentStore, isStoreOpen } = useStore();
  const router = useRouter();
  const formatTime = (time: number): string => {
    const hours = time % 24;
    const period = hours < 12 ? "AM" : "PM";
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
    const formattedMinutes = "00";
    return `${formattedHours
      .toString()
      .padStart(2, "0")}:${formattedMinutes} ${period}`;
  };

  return (
    <div className="flex flex-col gap-y-4">
      {listStore?.map((store: any) => (
        <div
          onClick={() => {
            dispatchSetCurrentStore(store);
            onSelectedStore(store);
            router.refresh();
          }}
          key={store.id}
          className="flex cursor-pointer flex-col gap-y-2 rounded-lg border border-secondary-600 p-4 hover:shadow-md"
        >
          <h1 className="text-lg font-bold text-primary-800">{store.name}</h1>

          <div className="flex w-full items-center gap-x-2">
            <ClockIcon className="h-4 w-4 font-bold text-primary-800" />
            <p className="text-sm font-bold text-secondary-900">
              Giờ hoạt động
            </p>
            <p className="text-sm text-secondary-900">
              {formatTime(store?.openTime)}
            </p>

            <p className="text-seoncary-900 text-sm">
              {formatTime(store?.closeTime)}
            </p>
          </div>

          <div className="flex items-center gap-x-2">
            {isStoreOpen(store?.openTime, store?.closeTime) ? (
              <>
                <BuildingStorefrontIcon className="h-4 w-4 text-green-500" />
                <p className="text-sm font-bold text-green-600">Đang mở cửa</p>
              </>
            ) : (
              <>
                <BuildingStorefrontIcon className="h-4 w-4 text-red-500" />
                <p className="text-sm font-bold text-red-600">Đã đóng cửa</p>
              </>
            )}
          </div>

          <div className="flex w-full items-center gap-x-2">
            <p className="w-[80px] text-sm font-bold text-primary-800">
              Địa chỉ
            </p>
            <span className="text-sm text-secondary-900">
              124 Đường Hoàng Diệu 2, Lich Chiểu, Thủ Đức thành phố Hồ Chí Minh
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StoreList;
