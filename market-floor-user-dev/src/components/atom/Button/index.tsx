import React from "react";
import { CircularProgress } from "@mui/material";
import "./ripple.css"; // Import the ripple effect CSS

type IButtonVariant = "primary" | "secondary" | "error";
type IButtonType = "button" | "submit";

interface IButtonProps {
  onClick?: () => void;
  variant?: IButtonVariant;
  className?: string;
  type?: IButtonType;
  title?: string;
  isLoading?: boolean;
  disable?: boolean;
  children?: React.ReactNode;
}

const Button: React.FC<IButtonProps> = (props) => {
  const {
    onClick,
    variant = "primary",
    className,
    type = "submit",
    title = "",
    isLoading = false,
    disable = false,
    children,
  } = props;

  return (
    <button
      className={`ripple items-center min-w-[120px] justify-center rounded-lg px-4 py-2 text-center w-full flex ${
        disable ? "opacity-10" : ""
      } ${className} ${
        variant === "primary" && "bg-primary-500 hover:bg-primary-600"
      } ${variant === "secondary" && "bg-white hover:bg-secondary-500"}
      ${variant === "error" && "bg-red-500 hover:bg-red-400"} ${
        variant === "secondary" ? "text-secondary-900" : "text-white"
      } border ${
        variant === "secondary" ? "border-secondary-900" : "border-transparent"
      } font-semibold text-lg`}
      onClick={() => (disable ? {} : onClick?.())}
      type={type}
      disabled={disable}
    >
      {isLoading ? (
        <CircularProgress sx={{ color: "white" }} size={24} />
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
