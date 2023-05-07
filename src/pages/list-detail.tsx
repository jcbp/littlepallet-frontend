import React from "react";
import { useParams } from "react-router-dom";
import { useGetList } from "../hooks/api/list";
import { useUpdateItemField } from "../hooks/api/item";
import { Field } from "../types/field";
import { List } from "../types/list";
import TableList from "../components/table-list";
import debounce from "lodash/debounce";
import Loader from "../components/loader";
import ListEmptyState from "../components/empty-states/list-empty-state";

const getFieldConfig = (list: List, field: Field) => {
  const defaultConfig = { hidden: false };
  if (!list.views || !list.views.tableView) {
    return defaultConfig;
  }
  return list.views.tableView[field._id] || defaultConfig;
};

const ListDetail = () => {
  const { id = "" } = useParams();
  const { responseData: list, isLoading, error } = useGetList(id);
  const {
    updateItemField,
    isLoading: savingItemField,
    error: errorSavingItemField,
  } = useUpdateItemField();

  if (!list || isLoading || error) {
    return (
      <Loader
        loading={isLoading}
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
      updateItemField(list._id, itemId, fieldId, value);
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

  return (
    <>
      <h1 className="fs-3 text-center mb-5">{list.name}</h1>
      <TableList
        fields={visibleFields}
        items={items}
        onUpdateItemField={handleUpdateItemField}
      />
    </>
  );
};

export default ListDetail;
