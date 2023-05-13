import { Form } from "react-bootstrap";
import React, { FC } from "react";
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
    item && item.value ? item : { text: item[0], value: item[0] }
  );

  return (
    <div>
      <Form.Select
        className="border-0 bg-transparent"
        defaultValue={value || getDefaultValue(field)}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="" disabled>
          - {field.name} -
        </option>
        {normalizedOptions?.map((option, index) => (
          <option key={index} value={option.value}>
            {option.text}
          </option>
        ))}
      </Form.Select>
    </div>
  );
};

export default OptionsField;
