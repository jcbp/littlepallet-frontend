import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetList,
  useAddItem,
  useRemoveItem,
  useUpdateItemField,
  useMoveItem,
} from "../hooks/api/list";
import TableList from "../components/table-list";
import { debounce } from "lodash";
import Loader from "../components/loader";
import ListEmptyState from "../components/empty-states/list-empty-state";
import Button from "../components/common/button";
import { PlusIcon, Cog8ToothIcon } from "@heroicons/react/24/outline";
import { useHighlightItem } from "../hooks/highlight-item";
import { getVisibleFields } from "../helpers/list-config";
import ModalDialog from "../components/common/modal-dialog";
import { Item } from "../types/item";
import ItemDetailDialog from "../components/item-detail-dialog";

const ListDetail = () => {
  const navigate = useNavigate();
  const { id = "" } = useParams();
  const { list, loading, error } = useGetList(id);
  const { addItem, addingItem } = useAddItem(id);
  const { removeItem } = useRemoveItem(id);
  const { moveItem } = useMoveItem(id);
  const { updateItemField } = useUpdateItemField(id);
  const { highlightedItemId, highlightColor, highlightItem } =
    useHighlightItem();
  const [currentItem, setCurrentItem] = useState<Item | null>(null);

  if (!list || loading || error) {
    return (
      <Loader
        loading={loading}
        error={error}
        isEmpty={!list}
        emptyState={<ListEmptyState />}
      />
    );
  }

  const visibleFields = getVisibleFields(list);

  const handleUpdateItemField = debounce(
    (itemId: string, fieldId: string, value: string) => {
      updateItemField(itemId, fieldId, value);
    },
    700
  );

  const handleAddItem = () => {
    addItem({}, (newItem) => {
      window.scrollTo(0, document.body.scrollHeight);
      highlightItem(newItem._id, "green");
    });
  };

  const handleRemoveItem = (itemId: string) => {
    highlightItem(itemId, "red", removeItem);
  };

  const handleConfigList = () => {
    navigate(`/lists/${id}/edit`);
  };

  const handleMoveItem = (itemId: string, shift: number) => {
    highlightItem(itemId, "red", () => {
      moveItem(itemId, shift, () => {
        highlightItem(itemId, "green");
      });
    });
  };

  const handleViewItem = (item: Item) => {
    setCurrentItem(item);
  };

  return (
    <>
      <div className="flex my-4 pt-4 pb-2 justify-between sticky top-[56px] bg-white z-20">
        <h1 className="text-2xl">{list.name}</h1>
        <span className="flex items-center">
          <button
            className="bg-gray-0 hover:bg-gray-100 p-1.5 m-1 rounded-full mr-3"
            onClick={handleConfigList}
          >
            <Cog8ToothIcon className="h-6 w-6 text-gray-800" />
          </button>
          <Button
            onClick={handleAddItem}
            disabled={addingItem}
            className={addingItem ? "cursor-progress" : ""}
          >
            <PlusIcon className="h-4 w-4 text-white" />
            Nuevo item
          </Button>
        </span>
      </div>
      <TableList
        highlightItem={highlightedItemId}
        highlightColor={highlightColor}
        fields={visibleFields}
        items={list.items}
        onUpdateItemField={handleUpdateItemField}
        onRemoveItem={handleRemoveItem}
        onMoveItem={handleMoveItem}
        onViewItem={handleViewItem}
      />

      <ModalDialog
        title={`Ver item #${currentItem?._id}`}
        isOpen={!!currentItem}
        onClose={() => setCurrentItem(null)}
      >
        {currentItem && (
          <ItemDetailDialog
            fields={list.fields}
            item={currentItem}
            onUpdateItemField={handleUpdateItemField}
          />
        )}
      </ModalDialog>
    </>
  );
};

export default ListDetail;
