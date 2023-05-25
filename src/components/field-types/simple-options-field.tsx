import React, { FC, ChangeEvent } from "react";
import { Field } from "../../types/field";

interface Props {
  value: string;
  field: Field;
  onChange: (value: string) => void;
}

const getDefaultValue = (field: Field): string => {
  return typeof field.defaultValue === "string" ? field.defaultValue : "";
};

const OptionsField: FC<Props> = ({ value, field, onChange }) => {
  const normalizedOptions = field.options?.map((item) =>
    item && item.value
      ? item
      : { text: item[0], value: item[0], color: item[1] ?? "" }
  );

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value);
  };

  return (
    <select
      className="bg-gray-50 hover:bg-gray-100 rounded-lg px-3 py-2 mr-5 outline-none shadow-focus w-full"
      value={value || getDefaultValue(field)}
      onChange={handleChange}
    >
      <option value="" disabled>
        - {field.name} -
      </option>
      {normalizedOptions?.map((option, index) => (
        <option key={index} value={option.value}>
          {option.text}
        </option>
      ))}
    </select>
  );
};

export default OptionsField;
