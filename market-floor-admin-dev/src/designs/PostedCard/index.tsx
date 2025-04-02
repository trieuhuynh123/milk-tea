import React from "react";
import { ClockIcon } from "@heroicons/react/24/outline";

interface IPostedCardProps {
  title: string;
  status: IPostedStatus;
}

type IPostedStatus = "success" | "pending";

const PostedCard: React.FC<IPostedCardProps> = (props) => {
  const { title, status } = props;
  return (
    <div className="rounded-lg border border-gray-300 px-2 py-2 flex flex-col gap-y-5 w-full cursor-pointer hover:opacity-80">
      <div className="flex gap-x-3 items-center">
        <img
          src="https://sneakerdaily.vn/wp-content/uploads/2022/04/giay-air-jordan-1-retro-high-obsidian-unc-575441-140-10.png.webp"
          width={80}
          height={80}
        />
        <div className="flex flex-col gap-y-2">
          <p className="text-sm text-gray-600 font-semibold">{title}</p>
          <div className="flex gap-x-1 items-center">
            <ClockIcon className="w-4 h-4 text-gray-600" />
            <p className="text-xs text-gray-600">11/12/2022</p>
          </div>
          {status === "success" && (
            <div className="rounded-full bg-green-200 text-green-800 font-semibold px-[5px] py-[2px] text-[8px] w-fit">
              Đã bán thành công
            </div>
          )}
          {status === "pending" && (
            <div className="rounded-full bg-yellow-100 text-yellow-800 font-semibold px-[5px] py-[2px] text-[8px] w-fit">
              Đang đấu giá
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostedCard;
