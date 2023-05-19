import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import TableList from "../components/table-list";
import debounce from "lodash/debounce";
import Loader from "../components/loader";
import ListEmptyState from "../components/empty-states/list-empty-state";
import { builInListConfigFields } from "../built-in-tables/list-config-fields";
import {
  useGetListConfig,
  useAddField,
  useRemoveField,
  useUpdateField,
} from "../hooks/api/list-config";
import { Item } from "../types/item";
import { PlusIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import Button from "../components/common/button";
import { getVisibleFields } from "../helpers/list-config";
import { useNewItemEvent } from "../hooks/new-item-event";
import { useHighlightItem } from "../hooks/highlight-item";
import { List } from "../types/list";

const ListEdit = () => {
  const navigate = useNavigate();
  const { id = "" } = useParams();
  const { listConfig, loading, error } = useGetListConfig(id);
  const { addField } = useAddField(id);
  const { removeField } = useRemoveField(id);
  const { updateField } = useUpdateField(id);

  const listLike: List | null = listConfig && {
    ...listConfig,
    items: listConfig?.fields as unknown as Item[],
  };

  const { subscribeNewItemEvent } = useNewItemEvent(listLike);
  const { highlightedItemId, highlightItem } = useHighlightItem();

  subscribeNewItemEvent((newItem) => {
    window.scrollTo(0, document.body.scrollHeight);
    highlightItem(newItem._id);
  });

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

  const visibleFields = getVisibleFields(builInListConfigFields);

  const handleUpdateItemField = debounce(
    (fieldId: string, fieldAttribute: string, value: string) => {
      updateField(fieldId, fieldAttribute, value);
    },
    700
  );

  const handleAddField = () => {
    addField();
  };

  const handleRemoveField = (fieldId: string) => {
    highlightItem(fieldId, removeField);
  };

  const handleBackToList = () => {
    navigate(`/lists/${id}`);
  };

  return (
    <>
      <span className="flex my-8 justify-between">
        <h1 className="text-xl flex items-center">
          <span
            className="text-gray-500 cursor-pointer hover:bg-gray-100 px-2 rounded py-1 hover:text-gray-700"
            onClick={handleBackToList}
          >
            {listConfig.name}
          </span>
          <ChevronRightIcon className="h-4 w-4 text-black mr-2" />
          <span className="text-gray-900">Editar</span>
        </h1>

        <Button onClick={handleAddField}>
          <PlusIcon className="h-4 w-4 text-white" />
          Nuevo campo
        </Button>
      </span>

      <div className="pl-2">
        <TableList
          highlightItem={highlightedItemId}
          fields={visibleFields}
          items={listLike!.items}
          onUpdateItemField={handleUpdateItemField}
          onRemoveItem={handleRemoveField}
        />
      </div>
    </>
  );
};

export default ListEdit;
