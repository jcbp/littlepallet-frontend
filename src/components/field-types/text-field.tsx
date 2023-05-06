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
    <div>
      <Form.Control
        type="text"
        className="border-0 ps-0"
        defaultValue={value}
        placeholder={`- ${field.name} -`}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default TextField;
