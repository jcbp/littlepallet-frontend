import React from "react";
import { useParams } from "react-router-dom";
import { useList } from "../hooks/api/list";
import { Field } from "../types/field";
import { List } from "../types/list";
import TableList from "../components/table-list";
import debounce from "lodash/debounce";
import Loader from "../components/loader";
import ListEmptyState from "../components/empty-states/list-empty-state";
import { Button } from "react-bootstrap";
import { builInListFields } from "../built-in-tables/list-fields";
import { useListConfig } from "../hooks/api/list-config";
import { Item } from "../types/item";

const getFieldConfig = (list: List, field: Field) => {
  const defaultConfig = { hidden: false };
  if (!list.views || !list.views.tableView) {
    return defaultConfig;
  }
  return list.views.tableView[field._id] || defaultConfig;
};

const ListEdit = () => {
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

  const debouncedUpdateField = debounce(
    (fieldId: string, fieldAttribute: string, value: string) => {
      updateField(fieldId, fieldAttribute, value);
    },
    700
  );

  const handleUpdateItemField = (
    fieldId: string,
    fieldAttribute: string,
    value: string
  ) => {
    debouncedUpdateField(fieldId, fieldAttribute, value);
  };

  const handleAddField = () => {
    addField();
  };

  const handleRemoveField = (fieldId: string) => {
    removeField(fieldId);
  };

  const visibleFields = builInListFields.fields.filter(
    (field) => getFieldConfig(builInListFields, field).hidden !== true
  );

  return (
    <>
      <h1 className="fs-3 mb-5">
        {list.name} <span className="fs-4 text-secondary">| Editar</span>
      </h1>

      <Button onClick={handleAddField} className="ms-auto d-block mb-2">
        Nuevo campo
      </Button>

      <TableList
        fields={visibleFields}
        items={list.fields as unknown as Item[]}
        onUpdateItemField={handleUpdateItemField}
        onRemoveItem={handleRemoveField}
      />
    </>
  );
};

export default ListEdit;
