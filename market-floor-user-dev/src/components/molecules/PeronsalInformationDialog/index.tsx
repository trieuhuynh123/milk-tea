"use client";

import { useForm } from "react-hook-form";
import CustomDialog from "../CustomDialog";
import Input from "@/components/atom/Input";
import Button from "@/components/atom/Button";
import { Divider } from "@mui/material";
import { ICreateOrderUserInfo } from "@/@types";

interface IPersonalInformationDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (values: ICreateOrderUserInfo) => void;
  defaultValues?: any;
}

const PersonalInformationDialog: React.FC<IPersonalInformationDialogProps> = (
  props,
) => {
  const { open, onClose, onSave, defaultValues } = props;
  const { control, getValues, handleSubmit } = useForm();

  const handleSave = (values: ICreateOrderUserInfo) => {
    console.log("values", values);
    onSave(values);
    onClose();
  };

  return (
    <CustomDialog
      title="Thông tin người nhận"
      onClose={onClose}
      open={open}
      children={
        <div className="mb-10 flex w-full flex-col gap-y-4">
          <div className="grid w-full grid-cols-2 gap-x-6 gap-y-8">
            <Input control={control} name="phoneNumber" label="Số điện thoại" />
            <Input control={control} name="email" label="Địa chỉ email" />
          </div>
          <Divider />
          <div className="mt-4 grid w-full grid-cols-1 gap-x-6 gap-y-6">
            <Input control={control} name="firstName" label="Họ người nhận" />
            <Input control={control} name="lastName" label="Tên người nhận" />
          </div>

          <div className="mt-10 flex w-full flex-row-reverse">
            <div className="flex w-fit gap-x-2">
              <Button onClick={() => onClose()} variant="secondary">
                Đóng
              </Button>
              <Button
                type="submit"
                onClick={handleSubmit((data) =>
                  handleSave(data as ICreateOrderUserInfo),
                )}
              >
                Xác nhận
              </Button>
            </div>
          </div>
        </div>
      }
    />
  );
};

export default PersonalInformationDialog;
