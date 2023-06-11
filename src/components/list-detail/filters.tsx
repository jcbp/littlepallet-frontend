import FieldView from "../field-view";
import { Field } from "../../types/field";
import { useState } from "react";

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
        <div className="w-full sm:w-72 sm:ms-3 mt-2 sm:mt-0 border border-gray-200 bg-white rounded-lg">
          <FieldView
            field={currentField}
            value={filterValue}
            onChange={handleChangeValue}
          />
        </div>
      )}
    </div>
  );
};

export default Filters;
