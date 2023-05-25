import React, { FC } from "react";
import { Field, Option } from "../../types/field";
import TableList from "../table-list";
import { builtInOptions } from "../../built-in-tables/options";
import { List } from "../../types/list";
import { Item } from "../../types/item";
import Button from "../common/button";
import { PlusIcon } from "@heroicons/react/24/outline";

interface Props {
  value: Option[];
  field: Field;
  onChange: (value: Option[]) => void;
}

const OptionsList: FC<Props> = ({ value, field, onChange }) => {
  const options = value || [];

  const list: List = {
    ...builtInOptions,
    items: options as Item[],
  };

  const getNewId = () => {
    return (
      Math.max.apply(null, [
        -1,
        ...options.map((option) => parseInt(option._id)),
      ]) + 1
    ).toString();
  };

  const handleAddOption = () => {
    onChange([...options, { _id: getNewId() }]);
  };

  const handleUpdateOption = (
    optionId: string,
    optionFieldId: string,
    value: string
  ) => {
    const updatedOptions = [...options];
    const optionIndex = updatedOptions.findIndex(
      (option) => option._id === optionId
    );
    updatedOptions[optionIndex] = { ...updatedOptions[optionIndex] };
    updatedOptions[optionIndex][optionFieldId] = value;
    onChange(updatedOptions);
  };

  const handleRemoveOption = (optionId: string) => {
    const updatedOptions = options.filter((option) => option._id !== optionId);
    onChange(updatedOptions);
  };

  const handleMoveOption = (optionId: string, shift: number) => {
    const optionIndex = options.findIndex((option) => option._id === optionId);
    const newIndex = optionIndex + shift;

    if (newIndex < 0 || newIndex >= options.length) {
      // Invalid shift, do nothing
      return;
    }

    const updatedOptions = [...options];
    const [movedOption] = updatedOptions.splice(optionIndex, 1);
    updatedOptions.splice(newIndex, 0, movedOption);

    onChange(updatedOptions);
  };

  return (
    <div className="ps-2 pt-1">
      {options.length > 0 && (
        <TableList
          highlightItem={null}
          // highlightColor={highlightColor}
          fields={list.fields}
          items={list.items}
          onUpdateItemField={handleUpdateOption}
          onRemoveItem={handleRemoveOption}
          onMoveItem={handleMoveOption}
        />
      )}
      <Button onClick={handleAddOption} className="text-xs mt-2 ms-auto">
        <PlusIcon className="h-4 w-4 text-white" />
        Agregar
      </Button>
    </div>
  );
};

export default OptionsList;
