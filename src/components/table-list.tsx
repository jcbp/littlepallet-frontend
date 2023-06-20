import { CSSProperties, useCallback, useMemo } from "react";
import { useIsMobile } from "../hooks/mobile";
import { Field } from "../types/field";
import { Item } from "../types/item";
import FieldView from "./field-view";
import ItemMenu from "./item-menu";
import { MagnifyingGlassIcon, HashtagIcon } from "@heroicons/react/24/outline";
import { useFieldsVisibility } from "../hooks/table-list";

interface ListCardProps {
  fields: Field[];
  items: Item[];
  highlightItem?: string | null;
  highlightColor?: "green" | "red";
  stickyHeadTop?: string;
  onUpdateItemField: (itemId: string, fieldId: string, value: any) => void;
  onRemoveItem?: (itemId: string) => void;
  onMoveItem?: (itemId: string, shift: number) => void;
  onViewItem?: (item: Item) => void;
}

const TableList: React.FC<ListCardProps> = ({
  fields,
  items,
  highlightItem,
  highlightColor,
  stickyHeadTop,
  onUpdateItemField,
  onRemoveItem,
  onMoveItem,
  onViewItem,
}) => {
  const { isMobile } = useIsMobile();

  const formatId = useCallback((id: string) => {
    // 160 es el código decimal para "&nbsp;"
    const paddedNum = String(id).padStart(3, String.fromCharCode(160));
    return paddedNum;
  }, []);

  const { visibleFields, hasHiddenContent } = useFieldsVisibility(fields);

  const thPosition = useMemo<CSSProperties>(() => {
    return stickyHeadTop ? { position: "sticky", top: stickyHeadTop } : {};
  }, [stickyHeadTop]);

  return (
    <table className="table-auto w-full">
      <thead>
        <tr>
          {!isMobile && (
            <th
              className="border-b border-slate-200 pb-3 pl-3.5 text-left text-gray-500 w-[58px]"
              style={thPosition}
            >
              <HashtagIcon className="h-4 w-4 text-gray-500" />
            </th>
          )}
          {visibleFields.map((field) => (
            <th
              key={field._id}
              className="border-b border-slate-200 pb-3 text-left ps-0.5 pe-2"
              style={thPosition}
            >
              {field.name}
            </th>
          ))}
          <th className="border-b border-slate-200" style={thPosition}></th>
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
            {!isMobile && (
              <td className="font-mono text-sm text-gray-500 border-b border-slate-200">
                {formatId(item._id)}
              </td>
            )}
            {visibleFields.map((field) => (
              <td key={field._id} className="border-b border-slate-200 ps-0.5">
                <div className="flex items-center h-full pe-2">
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
                {onViewItem && (
                  <button
                    className="bg-gray-50 hover:bg-gray-100 p-1.5 m-1 rounded-full relative"
                    onClick={() => onViewItem(item)}
                  >
                    <MagnifyingGlassIcon className="h-5 w-5 text-gray-500" />
                    {hasHiddenContent(item) && (
                      <span className="absolute top-0 right-0 w-1.5 h-1.5 bg-orange-500 rounded-full" />
                    )}
                  </button>
                )}
                {onRemoveItem && onMoveItem && (
                  <ItemMenu
                    onRemoveItem={() => onRemoveItem(item._id)}
                    onMoveUp={() => {
                      onMoveItem(item._id, -1);
                    }}
                    onMoveDown={() => {
                      onMoveItem(item._id, 1);
                    }}
                  />
                )}
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableList;
