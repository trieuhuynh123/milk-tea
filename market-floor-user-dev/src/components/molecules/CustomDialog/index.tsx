"use client";

import { XMarkIcon } from "@heroicons/react/24/outline";

import { Dialog, DialogContent, IconButton } from "@mui/material";
import React from "react";

interface ICustomDialogProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title: string;
  maxWidth?: "xs" | "sm" | "md" | "lg" | "xl";
}

const CustomDialog: React.FC<ICustomDialogProps> = (props) => {
  const { open, onClose, children, title, maxWidth = "md" } = props;

  return (
    <Dialog
      onClose={onClose}
      open={open}
      className="rounded-lg"
      maxWidth={maxWidth}
      fullWidth={true}
    >
      <DialogContent className="max-h-[1200px] bg-white">
        <div className="flex justify-between pt-4 pb-6">
          <h1 className="text-secondary-900 font-bold text-2xl mb-2">
            {title}
          </h1>
          <IconButton onClick={onClose}>
            <XMarkIcon className="w-8 h-8 text-primary-800" />
          </IconButton>
        </div>
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default CustomDialog;
