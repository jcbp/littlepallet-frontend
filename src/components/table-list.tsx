import { Field } from "../types/field";
import { Item } from "../types/item";
import FieldView from "./field-view";
import ItemMenu from "./item-menu";
import { MagnifyingGlassIcon, HashtagIcon } from "@heroicons/react/24/outline";

interface ListCardProps {
  fields: Field[];
  items: Item[];
  highlightItem?: string | null;
  highlightColor?: "green" | "red";
  onUpdateItemField: (itemId: string, fieldId: string, value: string) => void;
  onRemoveItem: (itemId: string) => void;
  onMoveItem: (itemId: string, shift: number) => void;
}

const TableList: React.FC<ListCardProps> = ({
  fields,
  items,
  onUpdateItemField,
  onRemoveItem,
  onMoveItem,
  highlightItem,
  highlightColor,
}) => {
  const formatId = (id: string) => {
    const paddedNum = String(id).padStart(3, String.fromCharCode(160)); // 160 es el código decimal para "&nbsp;"
    return paddedNum;
  };
  return (
    <table className="table-auto w-full mb-48">
      <thead>
        <tr>
          <th className="border-b border-slate-200 pb-3 pl-3.5 text-left text-gray-500 w-[58px]">
            <HashtagIcon className="h-4 w-4 text-gray-500" />
          </th>
          {fields.map((field) => (
            <th
              key={field._id}
              className="border-b border-slate-200 pb-3 text-left"
            >
              {field.name}
            </th>
          ))}
          <th className="border-b border-slate-200"></th>
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <tr
            key={item._id}
            className={
              highlightItem === item._id ? `highlight-${highlightColor}` : ""
            }
          >
            <td className="font-mono text-sm text-gray-500 border-b border-slate-200">
              {formatId(item._id)}
            </td>
            {fields.map((field) => (
              <td key={field._id} className="border-b border-slate-200">
                <div className="flex items-center h-full">
                  <FieldView
                    field={field}
                    value={item[field._id]}
                    onChange={(value) =>
                      onUpdateItemField(item._id, field._id, value)
                    }
                  />
                </div>
              </td>
            ))}
            <td className="border-b border-slate-200">
              <div className="flex items-center justify-end h-100 me-1">
                <button className="bg-gray-50 hover:bg-gray-100 p-1.5 m-1 rounded-full">
                  <MagnifyingGlassIcon className="h-5 w-5 text-gray-500" />
                </button>
                <ItemMenu
                  onRemoveItem={() => onRemoveItem(item._id)}
                  onMoveUp={() => {
                    onMoveItem(item._id, -1);
                  }}
                  onMoveDown={() => {
                    onMoveItem(item._id, 1);
                  }}
                />
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableList;
