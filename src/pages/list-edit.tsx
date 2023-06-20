import React, { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TableList from "../components/table-list";
import Loader from "../components/loader";
import ListEmptyState from "../components/empty-states/list-empty-state";
import { builtInListMetadata } from "../built-in-tables/list-metadata";
import {
  useGetListMetadata,
  useUpdateList,
  useAddField,
  useRemoveField,
  useUpdateField,
  useMoveField,
} from "../hooks/api/list-metadata";
import { Item } from "../types/item";
import { PlusIcon, ArrowLeftIcon } from "@heroicons/react/24/solid";
import Button from "../components/common/button";
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
  const { listMetadata, loading, error } = useGetListMetadata(id);
  const { updateList } = useUpdateList(id, 700);
  const { addField, creatingField } = useAddField(id);
  const { removeField } = useRemoveField(id);
  const { updateField } = useUpdateField(id);
  const { moveField } = useMoveField(id);
  const { highlightedItemId, highlightColor, highlightItem } =
    useHighlightItem();
  const [currentItemId, setCurrentItemId] = useState<string | null>(null);

  const list: List | null = listMetadata
    ? {
        ...listMetadata,
        fields: builtInListMetadata.fields,
        items: listMetadata.fields as unknown as Item[],
      }
    : null;

  const handleUpdateItemField = (
    fieldId: string,
    fieldAttribute: string,
    value: string
  ) => {
    updateField(fieldId, fieldAttribute, value);
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
    setCurrentItemId(item._id);
  };

  const handleUpdateListName = (name: string) => {
    updateList({ name });
  };

  const handleBackToList = () => {
    navigate(`/lists/${id}`);
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
      isEmpty={!listMetadata}
      emptyState={<ListEmptyState />}
    >
      {listMetadata && list && (
        <>
          <div className="flex items-center pt-5">
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
            <div className="sm:flex items-center ml-2">
              <label className="whitespace-nowrap text-sm font-medium text-gray-800 me-3">
                Nombre de la lista
              </label>
              <InputText
                value={listMetadata.name}
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
              stickyHeadTop="50px"
              fields={list.fields}
              items={list.items}
              onUpdateItemField={handleUpdateItemField}
              onRemoveItem={handleRemoveField}
              onMoveItem={handleMoveField}
              onViewItem={handleViewItem}
            />
          </div>

          <ModalDialog
            title={`Item #${currentItemId}`}
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

export default ListEdit;
