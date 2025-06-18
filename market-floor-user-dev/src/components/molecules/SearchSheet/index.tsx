import React from "react";
import { Dialog, IconButton } from "@mui/material";
import SearchBar from "../SearchBar";
import { XMarkIcon } from "@heroicons/react/24/outline";
import SearchDropdown from "../SearchDropdown";
import useSearch from "@/hooks/useSearch";

interface BottomSheetProps {
  open: boolean;
  onClose: () => void;
}

const BottomSheet: React.FC<BottomSheetProps> = ({ open, onClose }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      className="fixed inset-0 z-50 overflow-hidden"
    >
      <div
        className="fixed inset-0 bg-black bg-opacity-50"
        aria-hidden="true"
      />
      <div className="fixed inset-x-0 bottom-0 min-h-[100vh] rounded-t-lg bg-white px-2 py-4 shadow-lg">
        <div>
          <div className="mb-4 flex w-full flex-row-reverse">
            <IconButton onClick={() => onClose()}>
              <XMarkIcon className="h-6 w-6 text-primary-800" />
            </IconButton>
          </div>
          <SearchBar
            placeholder="Search for anythings, anywords"
            onChange={() => {}}
            autoFocus
          />

          <div className="mt-8 px-4">
            <SearchDropdown open={true} onClose={() => onClose()} />
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default BottomSheet;
