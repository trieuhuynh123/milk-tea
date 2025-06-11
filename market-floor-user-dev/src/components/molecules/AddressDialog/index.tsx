import useAddress from "@/hooks/useAddress";
import React, { useEffect } from "react";
import CustomDialog from "../CustomDialog";
import { Menu, MenuItem, Select, Tooltip } from "@mui/material";
import { set, useForm } from "react-hook-form";
import SelectComponent from "@/components/atom/Select";
import Button from "@/components/atom/Button";
import Input from "@/components/atom/Input";
import { InformationCircleIcon } from "@heroicons/react/24/outline";

interface IFormValue {
  province: any;
  district: any;
  ward: any;
  address: string;
  shippingFee: number;
}

interface IAddressDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmited?: (values: IFormValue) => void;
}

const AddressDialog: React.FC<IAddressDialogProps> = (props) => {
  const { open, onClose } = props;
  const {
    getListProvince,
    listProvinces,
    listDistrict,
    getListDistricts,
    listWard,
    calculateShippingFee,
    shippingFee,
    getListWars,
    selectedProvince,
  } = useAddress();

  const [provinceSelected, setProvinceSelected] = React.useState<any>(null);
  const [districtSelected, setDistrictSelected] = React.useState<any>(null);
  const [wardSelected, setWardSelected] = React.useState<any>(null);
  const { control, getValues, handleSubmit } = useForm();

  useEffect(() => {
    getListProvince();
  }, []);

  useEffect(() => {
    if (provinceSelected) {
      getListDistricts(provinceSelected?.ProvinceID);
    }
  }, [provinceSelected]);

  useEffect(() => {
    if (districtSelected) {
      getListWars(districtSelected?.DistrictID);
    }
  }, [districtSelected]);

  useEffect(() => {
    if (provinceSelected && districtSelected && wardSelected) {
      calculateShippingFee(provinceSelected, districtSelected, wardSelected);
    }
  }, [wardSelected]);

  // Xác định màu sắc cho phí ship dựa trên giá trị
  const getShippingFeeColor = () => {
    if (shippingFee <= 80000) return "text-green-600";
    if (shippingFee <= 100000) return "text-blue-600";
    if (shippingFee <= 120000) return "text-primary-500";
    return "text-red-500";
  };

  return (
    <>
      {open ? (
        <CustomDialog title="Địa chỉ" open={open} onClose={onClose}>
          <div className="flex flex-col gap-y-2">
            <SelectComponent
              options={listProvinces}
              label="Tỉnh thành"
              optionSelected={provinceSelected}
              placeholder="Chọn tỉnh thành"
              name="province"
              keyValue="id"
              onSelect={(value) => {
                setProvinceSelected(value);
                setDistrictSelected(null);
              }}
              keyLabel="ProvinceName"
            />

            <SelectComponent
              options={listDistrict}
              label="Huyện"
              optionSelected={districtSelected}
              placeholder="Chọn huyện"
              name="district"
              keyValue="DistrictID"
              onSelect={(value) => setDistrictSelected(value)}
              keyLabel="DistrictName"
            />

            <SelectComponent
              options={listWard}
              label="Xã"
              optionSelected={wardSelected}
              placeholder="Chọn xã"
              name="ward"
              keyValue="WardID"
              onSelect={(value) => setWardSelected(value)}
              keyLabel="WardName"
            />

            <div className="mt-4">
              <Input
                name="address"
                control={control}
                label="Địa chỉ"
                placeholder="Nhập địa chỉ cụ thể"
              />
            </div>

            <div className="mt-4 flex w-full items-center justify-between">
              <div className="flex items-center">
                <p className="text-sm font-bold text-secondary-900 mr-1">
                  Phí vận chuyển
                </p>
                <Tooltip title="Phí vận chuyển được tính dựa trên khu vực địa lý. Các khu vực gần trung tâm như TP.HCM, Hà Nội có mức phí thấp hơn.">
                  <InformationCircleIcon className="h-4 w-4 text-gray-500 cursor-pointer" />
                </Tooltip>
              </div>
              <p className={`text-sm font-bold ${getShippingFeeColor()}`}>
                {shippingFee?.toString().prettyMoney()}
              </p>
            </div>

            {provinceSelected && (
              <div className="mt-2 text-xs text-gray-500 italic">
                Khu vực {provinceSelected?.ProvinceName} có mức phí vận chuyển {shippingFee?.toString().prettyMoney()}
              </div>
            )}

            <div className="mt-16 flex gap-x-2">
              <Button onClick={onClose} variant="secondary">
                Đóng
              </Button>
              <Button
                onClick={() => {
                  if (
                    provinceSelected &&
                    districtSelected &&
                    wardSelected &&
                    shippingFee &&
                    !!getValues("address")
                  ) {
                    props.onSubmited?.({
                      province: provinceSelected?.ProvinceName,
                      district: districtSelected?.DistrictName,
                      ward: wardSelected?.WardName,
                      address: getValues("address"),
                      shippingFee,
                    });
                  }
                }}
              >
                Xác nhận
              </Button>
            </div>
          </div>
        </CustomDialog>
      ) : null}
    </>
  );
};

export default AddressDialog;
