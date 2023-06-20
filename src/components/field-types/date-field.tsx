import React, { FC, ChangeEvent } from "react";
import { Field } from "../../types/field";
import clsx from "clsx";

interface Props {
  value: string;
  field: Field;
  onChange: (value: string) => void;
}

const DateField: FC<Props> = ({ value, field, onChange }) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <input
      type="date"
      className={clsx(
        "rounded-md px-2 py-1.5 outline-none shadow-focus w-full",
        value ? "text-black" : "text-gray-400"
      )}
      value={value ?? ""}
      placeholder={`- ${field.name} -`}
      onChange={handleChange}
    />
  );
};

export default DateField;
