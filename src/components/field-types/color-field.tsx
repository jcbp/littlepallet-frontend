import React, { FC } from "react";
import { Field } from "../../types/field";

interface Props {
  value: string;
  field: Field;
  onChange: (value: string) => void;
}

const ColorField: FC<Props> = ({ value, field, onChange }) => {
  return (
    <input
      type="color"
      className="rounded-md px-2 py-1.5 outline-none shadow-focus w-full"
      value={value ?? ""}
      placeholder={`- ${field.name} -`}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

export default ColorField;
