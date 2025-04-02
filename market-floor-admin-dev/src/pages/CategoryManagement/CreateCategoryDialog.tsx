import React, { useEffect, useState } from 'react';

//styles
import { Dialog, DialogContent, IconButton, Tooltip } from '@mui/material';
import { XMarkIcon } from '@heroicons/react/20/solid';
import axios from 'axios';

import { PencilIcon, PlusCircleIcon, TrashIcon } from '@heroicons/react/24/outline';
import Button from '../../designs/Button';
import LoadingSkeleton from '../../components/LoadingSkeleton';
import SelectCustomFieldComponent from '../../components/SelectCustomField';

interface ICreateCategoryDialogProps {
  onClose: () => void;
  open: boolean;
  onOpenCustomFields: (item: IProductCategoryProperty) => void;
  onCreateCategory: (params: Omit<IProductCategory, 'id'>, actionSuccess: () => void) => void;
}

const CreateCategoryDialog: React.FC<ICreateCategoryDialogProps> = ({
  onClose,
  open,
  onOpenCustomFields,
  onCreateCategory: onUpdateFields,
}) => {
  const [propertyValues, setPropertyValues] = useState<
    {
      displayName: string;
      name: string;
      type: string;
      options?: string[];
    }[]
  >([]);
  const [isRefresh, setIsRefresh] = useState<boolean>(false);
  const [nameValue, setNameValue] = useState<string>('');
  const nameInputRef = React.useRef(null);

  const handleRemoveProperty = (index: number) => {
    let updatedProperties = [...propertyValues];
    updatedProperties.splice(index, 1);
    setPropertyValues(updatedProperties);
  };

  const handleAddProperty = () => {
    let updatedProperties = [...propertyValues];
    updatedProperties.push({
      displayName: '',
      name: '',
      type: 'string',
      options: [],
    });
    setPropertyValues(updatedProperties);
  };

  return (
    <>
      <Dialog onClose={onClose} open={open} className="rounded-lg" maxWidth="lg" fullWidth={true}>
        {isRefresh ? (
          <DialogContent className="max-h-[800px]">
            <LoadingSkeleton />
          </DialogContent>
        ) : (
          <DialogContent className="max-h-[800px]">
            {false ? (
              <div>
                <h1 className="mb-4 text-2xl font-bold text-gray-600">
                  Quản lý các trường của danh mục
                </h1>
                <div className="h-[40px] w-full animate-pulse rounded-lg bg-gray-200"></div>
                <div className="mt-4 h-[40px] w-full animate-pulse rounded-lg bg-gray-200"></div>
                <div className="mt-4 h-[40px] w-full animate-pulse rounded-lg bg-gray-200"></div>
                <div className="mt-4 h-[40px] w-full animate-pulse rounded-lg bg-gray-200"></div>
                <div className="mt-4 h-[40px] w-full animate-pulse rounded-lg bg-gray-200"></div>
                <div className="mt-4 h-[40px] w-full animate-pulse rounded-lg bg-gray-200"></div>
              </div>
            ) : (
              <div className="flex flex-col gap-y-5">
                <div className="flex items-center justify-between">
                  <h1 className="mb-2 text-2xl font-bold text-gray-600">Thêm danh mục</h1>
                  <Tooltip onClick={onClose} title="Đóng">
                    <XMarkIcon className="h-8 w-8 cursor-pointer rounded-full p-1 hover:bg-gray-200" />
                  </Tooltip>
                </div>

                <div>
                  <p className="text-md mb-2 font-semibold text-gray-600">Tên danh mục</p>
                  <input
                    placeholder="Nhập tên danh mục"
                    title="Tên danh mục"
                    defaultValue={''}
                    value={nameValue}
                    onChange={(e) => setNameValue(e.target.value)}
                    className="border-1 h-[40px] w-full rounded-lg bg-gray-100 px-4 py-1 text-gray-900 focus-within:border-gray-500 focus:border-gray-500"
                  />
                </div>

                <div className="mt-4 flex flex-col">
                  <p className="text-md mb-2 font-semibold text-gray-600">
                    Các trường của danh mục
                  </p>
                  <>
                    <div
                      className="flex w-full items-center justify-between gap-x-5 rounded-t-lg border border-gray-300 bg-white px-4 py-2 shadow-lg"
                      key="header"
                    >
                      <div className="w-1/4">
                        <p className="font-semibold text-gray-600">Tên hiển thị</p>
                      </div>
                      <div className="w-1/4">
                        <p className="font-semibold text-gray-600">Tên trường</p>
                      </div>
                      <div className="w-1/4">
                        <p className="font-semibold text-gray-600">Kiểu dữ liệu</p>
                      </div>
                      <div className="w-1/4">
                        <p className="font-semibold text-gray-600">Hành động</p>
                      </div>
                    </div>
                    <>
                      {propertyValues?.length > 0 &&
                        propertyValues?.map((item: any, index: number) => (
                          <div>
                            <div className="flex w-full items-center justify-between gap-x-5 border-b border-l border-r border-gray-300 bg-white px-4 py-2">
                              <div className="w-1/4">
                                <input
                                  ref={nameInputRef}
                                  value={propertyValues[index].displayName}
                                  className="rounded-lg border border-gray-300 py-1 pl-4"
                                  onChange={(e) => {
                                    const newValue = e.target.value;
                                    setPropertyValues((prevValues) =>
                                      prevValues.map((prevValue, idx) =>
                                        idx === index
                                          ? {
                                              ...prevValue,
                                              displayName: newValue,
                                            }
                                          : prevValue,
                                      ),
                                    );
                                  }}
                                />
                              </div>
                              <div className="w-1/4">
                                <input
                                  ref={nameInputRef}
                                  value={propertyValues[index].name}
                                  className="rounded-lg border border-gray-300 py-1 pl-4"
                                  onChange={(e) => {
                                    const newValue = e.target.value;
                                    setPropertyValues((prevValues) =>
                                      prevValues.map((prevValue, idx) =>
                                        idx === index
                                          ? { ...prevValue, name: newValue }
                                          : prevValue,
                                      ),
                                    );
                                  }}
                                />
                              </div>
                              <div className="w-1/4">
                                <SelectCustomFieldComponent
                                  placeholder={`Chọn trường`}
                                  name={'type'}
                                  label={``}
                                  options={['string', 'number', 'boolean']}
                                  optionSelected={propertyValues?.[index].type}
                                  onSelect={(option) => {
                                    let clonedPropertyValue = [...propertyValues];
                                    clonedPropertyValue[index].type = option;
                                    setPropertyValues([...clonedPropertyValue]);
                                  }}
                                />
                              </div>
                              <div className="flex w-1/4 items-center">
                                <IconButton title="Xoá" onClick={() => handleRemoveProperty(index)}>
                                  <TrashIcon className="h-4 w-4 font-bold text-gray-600" />
                                </IconButton>
                              </div>
                            </div>
                          </div>
                        ))}

                      <button className="flex w-full items-center justify-center gap-x-5 rounded-b-lg border-b border-l border-r border-gray-300 bg-white px-4 py-2">
                        <IconButton onClick={() => handleAddProperty()}>
                          <PlusCircleIcon className="h-6 w-6 font-bold text-gray-600" />
                        </IconButton>
                      </button>
                    </>

                    <div className="mt-8 flex w-full justify-between">
                      <div></div>
                      <div className="flex gap-x-2">
                        <Button variant="secondary" title="Đóng" onClick={() => onClose()} />
                        <Button
                          title="Cập nhật"
                          onClick={() => {
                            onUpdateFields(
                              {
                                name: nameValue,
                                properties: propertyValues,
                              },
                              () => onClose(),
                            );
                          }}
                        />
                      </div>
                    </div>
                  </>
                </div>
              </div>
            )}
          </DialogContent>
        )}
      </Dialog>
    </>
  );
};

export default CreateCategoryDialog;
