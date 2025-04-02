import { SelectChangeEvent, Select, MenuItem } from '@mui/material';
import { useField } from 'formik';
import React, { ReactNode, useEffect, useRef } from 'react';

interface ISelectProps<T = any> {
  name: string;
  label: string;
  placeholder: string;
  options: T[];
  optionSelected: T;
  disabled?: boolean;
  onSelect: (option: T) => void;
  keyValue?: string;
  keyLabel?: string;
  renderOption?: (item: T[]) => ReactNode;
  error?: string;
}
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 3 + ITEM_PADDING_TOP,
    },
  },
};

const SelectComponent: React.FC<ISelectProps> = (props) => {
  const ref = useRef();
  const {
    name,
    label,
    placeholder = '',
    options,
    optionSelected,
    disabled = false,
    keyValue = 'id',
    keyLabel = 'name',
    onSelect,
    renderOption,
    error = '',
  } = props;

  return (
    <div className="flex flex-col gap-y-1">
      <p className="mb-1 mr-1 text-sm font-bold text-gray-600">{label}</p>
      <Select
        ref={ref}
        name={name}
        disabled={disabled}
        placeholder={placeholder}
        value={optionSelected}
        style={{
          width: '100%',
          height: 40,
          borderWidth: 0,
          borderColor: 'transparent',
          background: '#f3f4f6',
          borderRadius: 7,
          maxHeight: 100,
        }}
        renderValue={(value) => (
          <div className="flex h-full items-center">
            <p className="items-center text-sm text-gray-900">{optionSelected[keyLabel]}</p>
          </div>
        )}
        sx={{
          boxShadow: 'none',
          '.MuiOutlinedInput-notchedOutline': { border: 0 },
        }}
      >
        {renderOption
          ? renderOption(options)
          : options.map((option, index) => (
              <MenuItem
                value={option[keyValue]}
                onClick={() => onSelect(option)}
                key={index.toString()}
              >
                {option[keyLabel]}
              </MenuItem>
            ))}
      </Select>
      {error && <p className="mt-1 text-xs font-semibold text-red-500">{error}</p>}
    </div>
  );
};

export default SelectComponent;
