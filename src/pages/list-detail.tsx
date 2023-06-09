import React, { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetList,
  useAddItem,
  useRemoveItem,
  useUpdateItemField,
  useMoveItem,
} from "../hooks/api/list";
import TableList from "../components/table-list";
import Loader from "../components/loader";
import ListEmptyState from "../components/empty-states/list-empty-state";
import Button from "../components/common/button";
import { Cog8ToothIcon } from "@heroicons/react/24/outline";
import { PlusIcon, ArrowLeftIcon } from "@heroicons/react/24/solid";
import { useHighlightItem } from "../hooks/highlight-item";
import { useFieldsVisibility } from "../hooks/list";
import ModalDialog from "../components/common/modal-dialog";
import { Item } from "../types/item";
import ItemDetailDialog from "../components/item-detail-dialog";
import Fab from "../components/common/fab";
import clsx from "clsx";

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
  const [currentItemId, setCurrentItemId] = useState<string | null>(null);
  const visibleFields = useFieldsVisibility(list);

  const handleUpdateItemField = (
    itemId: string,
    fieldId: string,
    value: string
  ) => {
    updateItemField(itemId, fieldId, value);
  };

  const handleAddItem = () => {
    addItem({}, (newItem) => {
      window.scrollTo(0, document.body.scrollHeight);
      highlightItem(newItem._id, "green");
    });
  };

  const handleRemoveItem = (itemId: string) => {
    highlightItem(itemId, "red", removeItem);
  };

  const handleMoveItem = (itemId: string, shift: number) => {
    highlightItem(itemId, "red", () => {
      moveItem(itemId, shift, () => {
        highlightItem(itemId, "green");
      });
    });
  };

  const handleViewItem = (item: Item) => {
    setCurrentItemId(item._id);
  };

  const handleBack = () => {
    navigate("/");
  };

  const handleConfigList = () => {
    navigate(`/lists/${id}/edit`);
  };

  const currentItem = useMemo<Item | undefined>(() => {
    return currentItemId
      ? list?.items.find((item) => item._id === currentItemId)
      : undefined;
  }, [list, currentItemId]);

  return (
    <Loader
      loading={loading}
      error={error}
      isEmpty={!list}
      emptyState={<ListEmptyState />}
    >
      {list && (
        <>
          <div className="pt-5 pb-5 sticky top-[51px] bg-white z-20">
            <div className="grid grid-cols-6">
              <div className="col-span-2 xl:col-span-1">
                <Button
                  variant="light"
                  onClick={handleBack}
                  className="sm:ps-2 sm:pe-4"
                >
                  <ArrowLeftIcon className="h-6 w-6 text-gray-800 sm:mr-2" />
                  <span className="hidden sm:inline">Volver</span>
                </Button>
              </div>
              <div className="col-span-2 xl:col-span-4 flex justify-center">
                <h1 className="text-2xl">{list.name}</h1>
              </div>
              <div className="col-span-2 xl:col-span-1 flex justify-end">
                <Button
                  variant="light"
                  className="sm:mr-3"
                  onClick={handleConfigList}
                >
                  <Cog8ToothIcon className="h-6 w-6 text-gray-800" />
                </Button>
                <Fab
                  text="Nuevo item"
                  startIcon={PlusIcon}
                  disabled={addingItem}
                  onClick={handleAddItem}
                  className={clsx(addingItem ? "cursor-progress" : "")}
                />
              </div>
            </div>
          </div>
          <div className="mb-48">
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
          </div>

          <ModalDialog
            title={`Ver item #${currentItemId}`}
            isOpen={!!currentItemId}
            onClose={() => setCurrentItemId(null)}
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
      )}
    </Loader>
  );
};

export default ListDetail;
