import React, { FC } from "react";
import { Field } from "../../types/field";

interface Props {
  value: boolean;
  field: Field;
  onChange: (value: boolean) => void;
}

const BooleanField: FC<Props> = ({ value, field, onChange }) => {
  return (
    <input
      type="checkbox"
      className="rounded ml-3 cursor-pointer outline-none shadow-focus w-5 h-5 appearance-none bg-white border border-gray-300 checked:bg-blue-500 checked:border-white"
      checked={value}
      onChange={(e) => onChange(e.target.checked)}
    />
  );
};

export default BooleanField;
