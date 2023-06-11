import { Button, ButtonBaseProps, SxProps } from "@mui/material";
import React, { ReactNode } from "react";

interface CustomButtonProps extends ButtonBaseProps{
  size?: "small" | "medium" | "large";
  label?: string;
  icon?: ReactNode;
  background?: string;
  color?: string;
  sx?: SxProps;
  variant?: "contained" | "outlined";
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}

const CustomButton = (props: CustomButtonProps) => {
  const {
    size = "small",
    variant = "contained",
    label,
    icon,
    background,
    color,
    sx,
    onClick,
    type,
    ...passProps
  } = props;

  return (
    <Button
      type={type}
      variant={variant}
      size={size}
      startIcon={icon}
      onClick={onClick}
      sx={{
        color: color,
        background: background,
        px: "12px",
        py: "6px",
        textTransform: "none",
        fontSize: "14px",
        fontWeight: 500,
        ...sx,
      }}
      {...passProps}
    >
      {label}
    </Button>
  );
};

export default CustomButton;