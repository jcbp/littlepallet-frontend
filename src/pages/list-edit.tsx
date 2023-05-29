import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TableList from "../components/table-list";
import Loader from "../components/loader";
import ListEmptyState from "../components/empty-states/list-empty-state";
import { builtInListConfig } from "../built-in-tables/list-config";
import {
  useGetListConfig,
  useUpdateList,
  useAddField,
  useRemoveField,
  useUpdateField,
  useMoveField,
} from "../hooks/api/list-config";
import { Item } from "../types/item";
import { PlusIcon, ArrowLeftIcon } from "@heroicons/react/24/solid";
import Button from "../components/common/button";
import { useVisibilityFilter } from "../hooks/list";
import { useHighlightItem } from "../hooks/highlight-item";
import { List } from "../types/list";
import ModalDialog from "../components/common/modal-dialog";
import ItemDetailDialog from "../components/item-detail-dialog";
import clsx from "clsx";
import InputText from "../components/common/input-text";
import Fab from "../components/common/fab";

const ListEdit = () => {
  const navigate = useNavigate();
  const { id = "" } = useParams();
  const { listConfig, loading, error } = useGetListConfig(id);
  const { updateList } = useUpdateList(id, 700);
  const { addField, creatingField } = useAddField(id);
  const { removeField } = useRemoveField(id);
  const { updateField } = useUpdateField(id);
  const { moveField } = useMoveField(id);
  const { highlightedItemId, highlightColor, highlightItem } =
    useHighlightItem();
  const [currentItem, setCurrentItem] = useState<Item | null>(null);
  const { getVisibleFields } = useVisibilityFilter();

  if (!listConfig || loading || error) {
    return (
      <Loader
        loading={loading}
        error={error}
        isEmpty={!listConfig}
        emptyState={<ListEmptyState />}
      />
    );
  }

  const list: List = {
    ...listConfig,
    fields: builtInListConfig.fields,
    items: listConfig.fields as unknown as Item[],
  };

  const visibleFields = getVisibleFields(list);

  const handleUpdateItemField = (
    fieldId: string,
    fieldAttribute: string,
    value: string
  ) => {
    updateField(fieldId, fieldAttribute, value, (field) => {
      if (currentItem) {
        setCurrentItem(field as unknown as Item);
      }
    });
  };

  const handleAddField = () => {
    addField(null, (newField) => {
      window.scrollTo(0, document.body.scrollHeight);
      highlightItem(newField._id, "green");
    });
  };

  const handleRemoveField = (fieldId: string) => {
    highlightItem(fieldId, "red", removeField);
  };

  const handleMoveField = (fieldId: string, shift: number) => {
    highlightItem(fieldId, "red", () => {
      moveField(fieldId, shift, () => {
        highlightItem(fieldId, "green");
      });
    });
  };

  const handleViewItem = (item: Item) => {
    setCurrentItem(item);
  };

  const handleUpdateListName = (name: string) => {
    updateList({ name });
  };

  const handleBackToList = () => {
    navigate(`/lists/${id}`);
  };

  return (
    <>
      <div className="grid grid-cols-3 pt-5">
        <div>
          <Button
            variant="light"
            onClick={handleBackToList}
            className="sm:ps-2 sm:pe-4"
          >
            <ArrowLeftIcon className="h-6 w-6 text-gray-800 sm:mr-2" />
            <span className="hidden sm:inline">Volver</span>
          </Button>
        </div>
        <div className="flex justify-center">
          <h1 className="text-2xl ml-4 text-gray-900">Ajustes</h1>
        </div>
      </div>
      <span className="flex mt-4 mb-9 justify-between items-end">
        <div className="ml-2 xl:w-1/3">
          <label className="flex text-sm font-medium text-gray-600">
            Nombre de la lista
          </label>
          <InputText
            value={listConfig.name}
            onChange={handleUpdateListName}
            className="bg-gray-100"
          />
        </div>
        <Fab
          text="Nuevo campo"
          startIcon={PlusIcon}
          disabled={creatingField}
          onClick={handleAddField}
          className={clsx(creatingField ? "cursor-progress" : "")}
        />
      </span>

      <div className="pl-2">
        <TableList
          highlightItem={highlightedItemId}
          highlightColor={highlightColor}
          fields={visibleFields}
          items={list.items}
          onUpdateItemField={handleUpdateItemField}
          onRemoveItem={handleRemoveField}
          onMoveItem={handleMoveField}
          onViewItem={handleViewItem}
        />
      </div>

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

export default ListEdit;
