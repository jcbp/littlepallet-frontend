import clsx from "clsx";
import React, { FC, ChangeEvent } from "react";

interface Props {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

const InputText: FC<Props> = ({ value, onChange, className }) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <input
      type="text"
      className={clsx(
        "appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm shadow-focus placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-transparent sm:text-md",
        className
      )}
      value={value ?? ""}
      onChange={handleChange}
    />
  );
};

export default InputText;
