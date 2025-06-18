import useDebounce from "@/hooks/useDebounce";
import useSearch from "@/hooks/useSearch";
import useStore from "@/hooks/useStore";
import {
  MagnifyingGlassCircleIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { TextField, Box } from "@mui/material";
import React, { forwardRef, useEffect } from "react";

interface ISearchBarProps {
  placeholder?: string;
  onChange?: (value: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  autoFocus?: boolean;
}

//@ts-ignore
const SearchBar = forwardRef<HTMLInputElement, ISearchBarProps>(
  (props, ref) => {
    const { onChange, onBlur, onFocus, placeholder, autoFocus = false } = props;
    const [keyword, setKeyword] = React.useState<string>("");
    const { searchingByKeyword } = useSearch();
    const { currentStore } = useStore();
    useEffect(() => {
      if (keyword !== "") {
        searchingByKeyword(keyword, currentStore.id);
      }
    }, [keyword]);

    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          backgroundColor: "white",
          paddingRight: "16px",
          borderRadius: "20px",
        }}
      >
        <TextField
          autoFocus={autoFocus}
          inputRef={ref}
          onBlur={() => onBlur?.()}
          onFocus={() => onFocus?.()}
          InputProps={{
            sx: { height: 40 },
            classes: {
              notchedOutline: "no-border",
            },
          }}
          placeholder={placeholder}
          fullWidth
          id="input"
          onChange={(e) => {
            setKeyword(e.target.value);
          }}
          sx={{
            backgroundColor: "white",
            borderRadius: "20px",
            padding: "0px 16px",
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                border: "none",
              },
            },
            "& .MuiOutlinedInput-notchedOutline": {
              border: "none",
            },
            "& .MuiInputLabel-root": {
              top: "-4px", // Adjust the label position if needed
            },
          }}
        />

        <MagnifyingGlassIcon className="h-6 w-6 text-secondary-900" />
      </Box>
    );
  },
);
SearchBar.displayName = "SearchBar";
export default SearchBar;
