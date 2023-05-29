import React, { ButtonHTMLAttributes } from "react";
import clsx from "clsx";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "light";
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "default",
  className,
  disabled,
  ...rest
}) => {
  const buttonClasses = clsx(
    "p-1.5 rounded-full flex items-center",
    {
      "bg-gray-50 hover:bg-gray-200 text-black": !disabled && variant === "light",
      "bg-blue-500 hover:bg-blue-600 text-white": !disabled && variant !== "light",
      "bg-blue-500/40 hover:bg-blue-500/40 text-gray-100 hover:text-gray-100": disabled,
    },
    className
  );

  return (
    <button className={buttonClasses} {...rest}>
      {children}
    </button>
  );
};

export default Button;
