import { Dialog, DialogContent } from "@mui/material";
import React from "react";
import Button from "../../designs/Button";

interface ILogoutConfirmDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const LogoutConfirmDialog: React.FC<ILogoutConfirmDialogProps> = (props) => {
  const { open, onClose, onConfirm } = props;
  return (
    <Dialog
      onClose={onClose}
      open={open}
      className="rounded-lg"
      maxWidth="xs"
      fullWidth={true}
    >
      <DialogContent>
        <h1 className="text-gray-600 font-bold text-xl mb-2 ">
          Admin xác nhận sẽ đăng xuất chứ
        </h1>
        <div className="flex justify-between">
          <div></div>

          <div className="flex gap-x-2 mt-5">
            <Button variant="secondary" title="Đóng" onClick={onClose} />
            <Button variant="primary" title="Xác nhận" onClick={onConfirm} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LogoutConfirmDialog;
