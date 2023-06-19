import FieldView from "../field-view";
import { Field } from "../../types/field";
import { useState } from "react";
import Button from "../common/button";
import { XMarkIcon } from "@heroicons/react/24/outline";

interface Props {
  fields: Field[];
  onChange: (field: Field, value: any) => void;
}

const Filters: React.FC<Props> = ({ fields, onChange }) => {
  const [currentField, setCurrentField] = useState<Field | undefined>(
    fields.length > 0 ? fields[0] : undefined
  );
  const [filterValue, setFilterValue] = useState<any>(null);

  const handleChangeField = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const field = fields.find(
      (field) => field._id.toString() === e.target.value
    );
    if (field) {
      setCurrentField(field);
      setFilterValue(null);
      onChange(field, null);
    }
  };

  const handleChangeValue = (value: any) => {
    if (currentField) {
      setFilterValue(value);
      onChange(currentField, value);
    }
  };

  const handleClearFilter = () => {
    if (currentField) {
      setFilterValue("");
      onChange(currentField, "");
    }
  };

  return (
    <div className="sm:flex items-center px-4 py-3 rounded-md sm:h-14 border-none bg-gray-100 border-gray-200">
      <label className="whitespace-nowrap text-sm font-medium me-3">
        Filtrar por
      </label>
      <select
        className="px-3 py-2 w-full sm:w-64 border border-gray-200 bg-white rounded-lg"
        onChange={handleChangeField}
      >
        {fields.map((field) => (
          <option key={field._id} value={field._id}>
            {field.name}
          </option>
        ))}
      </select>
      {currentField && (
          <div className="flex items-center w-full sm:w-72 sm:ms-3 mt-2 sm:mt-0 border border-gray-200 bg-white rounded-lg child-shadow-focus h-[38px]">
            <FieldView
              field={currentField}
              value={filterValue}
              onChange={handleChangeValue}
            />
            <div className="ms-auto rounded-r-lg px-1">
              <Button
                variant="light"
                className="bg-transparent"
                onClick={handleClearFilter}
              >
                <XMarkIcon className="h-5 w-5 text-gray-800" />
              </Button>
            </div>
          </div>
      )}
    </div>
  );
};

export default Filters;
