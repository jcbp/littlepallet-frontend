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

const getFieldConfig = (list: List, field: Field) => {
  const defaultConfig = { hidden: false };
  if (!list.views || !list.views.tableView) {
    return defaultConfig;
  }
  return list.views.tableView[field._id] || defaultConfig;
};

const ListDetail = () => {
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

  return (
    <>
      <h1 className="fs-3 text-center mb-5">{list.name}</h1>
      <Button onClick={handleAddItem} className="ms-auto d-block mb-2">
        Nuevo item
      </Button>
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
