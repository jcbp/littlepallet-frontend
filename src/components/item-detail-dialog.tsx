import { Field } from "../types/field";
import { Item } from "../types/item";
import FieldView from "./field-view";
import clsx from "clsx";

interface Props {
  fields: Field[];
  item: Item;
  onUpdateItemField: (itemId: string, fieldId: string, value: string) => void;
}

const ItemDetailDialog: React.FC<Props> = ({
  fields,
  item,
  onUpdateItemField,
}) => {
  const visibleFields = fields.filter(
    (field) => field.type !== "options-list" || item.type === "options"
  );
  return (
    <div className="my-8">
      {item &&
        visibleFields.map((field) => (
          <div
            key={field._id}
            className={clsx("mb-5 pb-1 ", {
              "flex items-center pb-2": field.type === "boolean",
              "border-b border-gray-200":
                field.type !== "boolean" && field.type !== "options-list",
            })}
          >
            <label className="text-sm text-gray-700">{field.name}</label>
            <FieldView
              field={field}
              value={item[field._id]}
              onChange={(value) =>
                onUpdateItemField(item._id, field._id, value)
              }
            />
          </div>
        ))}
    </div>
  );
};

export default ItemDetailDialog;
