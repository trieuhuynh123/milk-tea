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
  const { searchResults } = useSearch();

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
      <div className="fixed inset-x-0 bottom-0 bg-white rounded-t-lg shadow-lg min-h-[100vh] px-2 py-4">
        <div>
          <div className="mb-4 flex flex-row-reverse w-full">
            <IconButton onClick={() => onClose()}>
              <XMarkIcon className="text-primary-800 w-6 h-6" />
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
