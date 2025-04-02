import { FlagIcon, GlobeAltIcon, StarIcon } from "@heroicons/react/24/outline";
import React from "react";

interface ITopBarProps {}

const TopBar: React.FC<ITopBarProps> = ({}) => {
  return (
    <div className="w-full flex space-x-4  tablet:space-x-6 laptop:space-x-6 desktop:space-x-8 items-center justify-between px-8 py-2">
      <p className="text-secondary-500 font-semibold text-md">
        On sale this week
      </p>
      <div className="flex items-center gap-x-4">
        <div className="flex items-center gap-x-2 cursor-pointer">
          <GlobeAltIcon className="text-secondary-500 w-4 h-4" />
          <p className="text-secondary-500 font-semibold text-md">English</p>
        </div>

        <div className="flex items-center gap-x-2 cursor-pointer">
          <FlagIcon className="text-secondary-500 w-4 h-4" />
          <p className="text-secondary-500 font-semibold text-md">My List</p>
        </div>

        <div className="flex items-center gap-x-2 cursor-pointer">
          <StarIcon className="text-secondary-500 w-4 h-4" />
          <p className="text-secondary-500 font-semibold text-md">My Reward</p>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
