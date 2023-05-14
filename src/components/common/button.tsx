import React, { ButtonHTMLAttributes } from "react";
import clsx from "clsx";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "light";
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "default",
  className,
  ...rest
}) => {
  const buttonClasses = clsx(
    "font-medium py-1.5 px-3 rounded-full flex items-center",
    {
      "bg-gray-50 hover:bg-gray-200 text-black": variant === "light",
      "bg-blue-500 hover:bg-blue-600 text-white": variant !== "light",
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
