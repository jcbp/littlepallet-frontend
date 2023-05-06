import React, { FC, useState } from "react";
import { ButtonGroup, Dropdown } from "react-bootstrap";
import { Field } from "../../types/field";

interface Props {
  value: string;
  field: Field;
  onChange: (value: string) => void;
}

const TrafficLightField: FC<Props> = ({ value, field, onChange }) => {
  const [selectedValue, setSelectedValue] = useState<string>(
    value ?? "default"
  );

  const handleSelect = (newValue: string) => {
    setSelectedValue(newValue);
    onChange(newValue);
  };

  const getCircleClass = (color: string): string => {
    switch (color) {
      case "green":
        return "light-green";
      case "yellow":
        return "light-yellow";
      case "red":
        return "light-red";
      default:
        return "light-default";
    }
  };

  return (
    <div>
      <Dropdown as={ButtonGroup}>
        <Dropdown.Toggle variant="light">
          <div className={`${getCircleClass(selectedValue)} me-2`} />
        </Dropdown.Toggle>
        <Dropdown.Menu variant="outline-secondary">
          <Dropdown.Item eventKey="green" onClick={() => handleSelect("green")}>
            <div className={`${getCircleClass("green")} me-2`} />
            Green
          </Dropdown.Item>
          <Dropdown.Item
            eventKey="yellow"
            onClick={() => handleSelect("yellow")}
          >
            <div className={`${getCircleClass("yellow")} me-2`} />
            Yellow
          </Dropdown.Item>
          <Dropdown.Item eventKey="red" onClick={() => handleSelect("red")}>
            <div className={`${getCircleClass("red")} me-2`} />
            Red
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default TrafficLightField;
