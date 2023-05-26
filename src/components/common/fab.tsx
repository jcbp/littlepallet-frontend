import React, { ButtonHTMLAttributes, FC } from "react";
import clsx from "clsx";
import { useIsMobile } from "../../hooks/mobile";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
  startIcon?: React.ComponentType;
  endIcon?: React.ComponentType;
  className?: string;
  variant?: "default" | "light";
  disabled?: boolean;
}

const Fab: FC<Props> = ({
  text,
  startIcon: StartIcon,
  endIcon: EndIcon,
  className,
  variant = "default",
  disabled = false,
  ...rest
}) => {
  const { isMobile } = useIsMobile();

  const renderIcon = (
    Icon: React.ComponentType<React.SVGProps<SVGSVGElement>> | undefined
  ) => Icon && <Icon className="h-5 w-5" />;

  const buttonClasses = clsx(
    "font-medium rounded-full flex items-center",
    {
      "bg-gray-50 hover:bg-gray-200 text-black":
        !disabled && variant === "light",
      "bg-blue-500 hover:bg-blue-600 text-white":
        !disabled && variant !== "light",
      "bg-blue-500/40 hover:bg-blue-500/40 text-gray-100 hover:text-gray-100":
        disabled,
      "py-1.5 px-3": !isMobile,
      "fixed bottom-5 right-5 rounded-full p-3": isMobile,
    },
    className
  );

  return (
    <button className={buttonClasses} disabled={disabled} {...rest}>
      {isMobile ? (
        <>{renderIcon(StartIcon || EndIcon)}</>
      ) : (
        <>
          {StartIcon && renderIcon(StartIcon)}
          {text}
          {EndIcon && renderIcon(EndIcon)}
        </>
      )}
    </button>
  );
};

export default Fab;
