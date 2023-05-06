import React, { FC } from "react";
import { Form } from "react-bootstrap";
import { Field } from "../../types/field";

interface Props {
  value: boolean;
  field: Field;
  onChange: (value: boolean) => void;
}

const BooleanField: FC<Props> = ({ value, field, onChange }) => {
  return (
    <Form.Check
      className="ps-3"
      type="checkbox"
      defaultChecked={value}
      onChange={(e) => onChange(e.target.checked)}
    />
  );
};

export default BooleanField;
