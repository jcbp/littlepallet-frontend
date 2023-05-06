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
  return (
    <div>
      <Form.Select
        className="border-0"
        defaultValue={value || getDefaultValue(field)}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="" disabled>
          - {field.name} -
        </option>
        {field.options?.map((option) => (
          <option key={option._id} value={option[0]}>
            {option[0]}
          </option>
        ))}
      </Form.Select>
    </div>
  );
};

export default OptionsField;
