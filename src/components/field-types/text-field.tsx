import { Form } from "react-bootstrap";
import React, { FC } from "react";
import { Field } from "../../types/field";

interface Props {
  value: string;
  field: Field;
  onChange: (value: string) => void;
}

const TextField: FC<Props> = ({ value, field, onChange }) => {
  return (
    <Form.Control
      type="text"
      className="border-0 ps-0 bg-transparent"
      defaultValue={value}
      placeholder={`- ${field.name} -`}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

export default TextField;
