import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useList } from "../hooks/api/list";
import { Field } from "../types/field";
import { List } from "../types/list";
import TableList from "../components/table-list";
import debounce from "lodash/debounce";
import Loader from "../components/loader";
import ListEmptyState from "../components/empty-states/list-empty-state";
import Button from "../components/common/button";
import { PlusIcon, Cog8ToothIcon } from "@heroicons/react/24/outline";

const getFieldConfig = (list: List, field: Field) => {
  const defaultConfig = { hidden: false };
  if (!list.views || !list.views.tableView) {
    return defaultConfig;
  }
  return list.views.tableView[field._id] || defaultConfig;
};

const ListDetail = () => {
  const navigate = useNavigate();
  const { id = "" } = useParams();
  const { list, loading, error, updateItemField, addItem, removeItem } =
    useList(id);

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

  const { fields = [], items = [] } = list;

  const visibleFields = fields.filter(
    (field) => getFieldConfig(list, field).hidden !== true
  );

  const debouncedUpdateItemField = debounce(
    (itemId: string, fieldId: string, value: string) => {
      updateItemField(itemId, fieldId, value);
    },
    700
  );

  const handleUpdateItemField = (
    itemId: string,
    fieldId: string,
    value: string
  ) => {
    debouncedUpdateItemField(itemId, fieldId, value);
  };

  const handleAddItem = () => {
    addItem();
  };

  const handleRemoveItem = (itemId: string) => {
    removeItem(itemId);
  };

  const handleConfigList = () => {
    navigate(`/lists/${id}/edit`);
  };

  return (
    <>
      <span className="flex my-8 justify-between">
        <h1 className="text-2xl">{list.name}</h1>
        <span className="flex items-center">
          <button
            className="bg-gray-0 hover:bg-gray-100 p-1.5 m-1 rounded-full mr-3"
            onClick={handleConfigList}
          >
            <Cog8ToothIcon className="h-6 w-6 text-gray-800" />
          </button>
          <Button onClick={handleAddItem}>
            <PlusIcon className="h-4 w-4 text-white" />
            Nuevo item
          </Button>
        </span>
      </span>
      <TableList
        fields={visibleFields}
        items={items}
        onUpdateItemField={handleUpdateItemField}
        onRemoveItem={handleRemoveItem}
      />
    </>
  );
};

export default ListDetail;
