import React, { ButtonHTMLAttributes, useState } from "react";
import clsx from "clsx";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "light";
  disabled?: boolean;
  toggle?: boolean;
  isActive?: boolean;
  startIcon?: React.ComponentType;
  endIcon?: React.ComponentType;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "default",
  className,
  disabled,
  toggle,
  isActive,
  startIcon: StartIcon,
  endIcon: EndIcon,
  ...rest
}) => {
  const renderIcon = (
    Icon: React.ComponentType<React.SVGProps<SVGSVGElement>> | undefined
  ) => Icon && <Icon className={clsx("h-5 w-5", variant === "light" ? "text-gray-800" : "")} />;

  const buttonClasses = clsx(
    "p-1.5 rounded-full flex items-center justify-center h-9 min-w-[2.25rem] text-sm",
    {
      "bg-gray-50 hover:bg-gray-200 text-black border border-gray-200":
        !disabled && variant === "light" && !isActive,
      "bg-blue-500 hover:bg-blue-600 text-white":
        !disabled && variant !== "light" && !isActive,
      "bg-blue-200/90 hover:bg-blue-600/30 text-blue-100 hover:text-blue-100":
        variant === "light" && (disabled || isActive),
      "bg-blue-500/40 hover:bg-blue-500/40 text-gray-100 hover:text-gray-100":
        variant !== "light" && (disabled || isActive),
    },
    className
  );

  return (
    <button className={buttonClasses} {...rest}>
      {StartIcon && renderIcon(StartIcon)}
      {children}
      {EndIcon && renderIcon(EndIcon)}
    </button>
  );
};

export default Button;
