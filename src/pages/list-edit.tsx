import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Field } from "../types/field";
import { List } from "../types/list";
import TableList from "../components/table-list";
import debounce from "lodash/debounce";
import Loader from "../components/loader";
import ListEmptyState from "../components/empty-states/list-empty-state";
import { builInListFields } from "../built-in-tables/list-fields";
import { useListConfig } from "../hooks/api/list-config";
import { Item } from "../types/item";
import { PlusIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import Button from "../components/common/button";

const getFieldConfig = (list: List, field: Field) => {
  const defaultConfig = { hidden: false };
  if (!list.views || !list.views.tableView) {
    return defaultConfig;
  }
  return list.views.tableView[field._id] || defaultConfig;
};

const ListEdit = () => {
  const navigate = useNavigate();
  const { id = "" } = useParams();
  const { list, loading, error, addField, removeField, updateField } =
    useListConfig(id);

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
    removeField(fieldId);
  };

  const visibleFields = builInListFields.fields.filter(
    (field) => getFieldConfig(builInListFields, field).hidden !== true
  );

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
            {list.name}
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
          fields={visibleFields}
          items={list.fields as unknown as Item[]}
          onUpdateItemField={handleUpdateItemField}
          onRemoveItem={handleRemoveField}
        />
      </div>
    </>
  );
};

export default ListEdit;
