import { CSSProperties, useCallback, useMemo, useState } from "react";
import { useIsMobile } from "../hooks/mobile";
import { Field } from "../types/field";
import { Item } from "../types/item";
import FieldView from "./field-view";
import ItemMenu from "./item-menu";
import MoveItemModal from "./move-item-modal";
import { MagnifyingGlassIcon, HashtagIcon, ChevronUpIcon, ChevronDownIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useFieldsVisibility } from "../hooks/table-list";
import { sortItems, SortDirection } from "../helpers/sort";
import {
  getFieldHeaderAlignClassName,
  getFieldHeaderContentClassName,
  getFieldHeaderDisplayConfig,
  getFieldHeaderStyle,
} from "../helpers/field-display";

interface ListCardProps {
  fields: Field[];
  items: Item[];
  highlightItem?: string | null;
  highlightColor?: "green" | "red";
  stickyHeadTop?: string;
  onUpdateItemField: (itemId: string, fieldId: string, value: any) => void;
  onRemoveItem?: (itemId: string) => void;
  onMoveItem?: (itemId: string, shift: number) => void;
  onMoveItemToPosition?: (itemId: string, position: number) => void;
  onAddItemBefore?: (itemId: string) => void;
  onAddItemAfter?: (itemId: string) => void;
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
  onMoveItemToPosition,
  onAddItemBefore,
  onAddItemAfter,
  onViewItem,
}) => {
  const { isMobile } = useIsMobile();
  const [moveTargetItemId, setMoveTargetItemId] = useState<string | null>(null);

  const formatId = useCallback((id: string) => {
    // 160 es el código decimal para "&nbsp;"
    const paddedNum = String(id).padStart(3, String.fromCharCode(160));
    return paddedNum;
  }, []);

  const { visibleFields, hasHiddenContent } = useFieldsVisibility(fields);

  const [sortConfig, setSortConfig] = useState<{ key: string, direction: SortDirection } | null>(null);

  const sortedItems = sortConfig
    ? sortItems(items, sortConfig.key, sortConfig.direction)
    : items;

  const requestSort = (key: string) => {
    let direction: SortDirection = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const thPosition = useMemo<CSSProperties>(() => {
    return stickyHeadTop ? { position: "sticky", top: stickyHeadTop } : {};
  }, [stickyHeadTop]);

  return (
    <>
    <table className="table-auto w-full">
      <thead>
        <tr>
          {!isMobile && (
            <th
              className="border-b border-slate-200 pb-3 pl-3.5 text-left text-gray-500 w-[58px] cursor-pointer hover:text-slate-700 transition-colors select-none"
              style={thPosition}
              onClick={() => requestSort('_id')}
            >
              <HashtagIcon className="h-4 w-4 text-gray-500" />
            </th>
          )}
          {visibleFields.map((field) => {
            const headerConfig = getFieldHeaderDisplayConfig(field);
            const headerAlign = headerConfig.align ?? "left";

            return (
              <th
                key={field._id}
                className={`border-b border-slate-200 pb-3 ps-0.5 cursor-pointer hover:text-slate-700 transition-colors select-none ${getFieldHeaderAlignClassName(
                  headerAlign
                )}`}
                style={getFieldHeaderStyle(headerConfig, thPosition)}
                onClick={() => requestSort(field._id)}
              >
                <div
                  className={`flex w-full items-center gap-1 group ${getFieldHeaderContentClassName(
                    headerAlign
                  )}`}
                >
                  {field.name}
                  <span className="text-slate-400 group-hover:text-slate-600">
                    {sortConfig?.key === field._id ? (
                      sortConfig.direction === 'asc' ? (
                        <ChevronUpIcon className="h-4 w-4" />
                      ) : (
                        <ChevronDownIcon className="h-4 w-4" />
                      )
                    ) : (
                      // Placeholder space to prevent layout shift on hover
                      <span className="w-4 inline-block" />
                    )}
                  </span>
                </div>
              </th>
            );
          })}
          <th className="border-b border-slate-200" style={thPosition}></th>
        </tr>
      </thead>
      <tbody>
        {sortedItems.map((item) => (
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
                <div className="flex min-w-0 items-center h-full pe-2">
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
                    onMoveToPosition={() => {
                      if (onMoveItemToPosition) {
                        setMoveTargetItemId(item._id);
                      }
                    }}
                    onAddBefore={() => {
                      if (onAddItemBefore) {
                        onAddItemBefore(item._id);
                      }
                    }}
                    onAddAfter={() => {
                      if (onAddItemAfter) {
                        onAddItemAfter(item._id);
                      }
                    }}
                  />
                )}
                {onRemoveItem && !onMoveItem && (
                  <button
                    className="text-red-500 hover:text-red-700 hover:bg-red-50 p-1.5 m-1 rounded-full transition-colors"
                    onClick={() => onRemoveItem(item._id)}
                    title="Eliminar"
                  >
                    <TrashIcon className="w-5 h-5" />
                  </button>
                )}
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>

    <MoveItemModal
      isOpen={!!moveTargetItemId}
      itemId={moveTargetItemId}
      onClose={() => setMoveTargetItemId(null)}
      onConfirm={(position) => {
        if (moveTargetItemId && onMoveItemToPosition) {
          onMoveItemToPosition(moveTargetItemId, position);
        }
        setMoveTargetItemId(null);
      }}
    />
    </>
  );
};

export default TableList;
