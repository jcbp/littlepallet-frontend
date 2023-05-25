import React, { FC, ChangeEvent } from "react";
import { Field } from "../../types/field";

interface Props {
  value: string;
  field: Field;
  onChange: (value: string) => void;
}

const TextField: FC<Props> = ({ value, field, onChange }) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <input
      type="text"
      className="rounded-md px-2 py-1.5 mr-2 outline-none shadow-focus w-full"
      value={value ?? ""}
      placeholder={`- ${field.name} -`}
      onChange={handleChange}
    />
  );
};

export default TextField;
