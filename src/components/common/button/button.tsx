import { ButtonBaseProps, SxProps } from '@mui/material';
import Button, { ButtonPropsColorOverrides } from '@mui/material/Button';
import { OverridableStringUnion } from '@mui/types';
import React, { ReactNode } from 'react';

interface CustomButtonProps extends ButtonBaseProps {
  size?: 'small' | 'medium' | 'large';
  label?: string;
  icon?: ReactNode;
  background?: string;
  color?: OverridableStringUnion<
    | 'inherit'
    | 'primary'
    | 'secondary'
    | 'success'
    | 'error'
    | 'info'
    | 'warning',
    ButtonPropsColorOverrides
  >;
  sx?: SxProps;
  variant?: 'contained' | 'outlined';
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}

export const CustomButton = (props: CustomButtonProps) => {
  const {
    size = 'small',
    variant = 'contained',
    label,
    icon,
    background,
    color = 'primary',
    sx,
    onClick,
    type
  } = props;

  return (
    <Button
      type={type}
      variant={variant}
      color={color}
      size={size}
      startIcon={icon}
      sx={{
        background: background,
        px: '12px',
        py: '6px',
        textTransform: 'none',
        fontSize: '14px',
        fontWeight: 500,
        ...sx
      }}
      onClick={onClick}
    >
      {label}
    </Button>
  );
};
