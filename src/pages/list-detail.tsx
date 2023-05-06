import React from "react";
import { useParams } from "react-router-dom";
import { useGetList } from "../hooks/api/list";
import { useUpdateItemField } from "../hooks/api/item";
import { Field } from "../types/field";
import { List } from "../types/list";
import TableList from "../components/table-list";

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

  if (isLoading) {
    return <div>cargando...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!list) {
    return null;
  }

  const { fields = [], items = [] } = list!;

  const visibleFields = fields.filter(
    (field) => getFieldConfig(list, field).hidden !== true
  );

  const handleUpdateItemField = (itemId: string, fieldId: string, value: string) => {
  // const { responseData, isLoading} = useUpdateItemField()

  }

  return (
    <>
      <h1 className="fs-3 text-center mb-5">{list.name}</h1>
      <TableList fields={visibleFields} items={items} onUpdateItemField={handleUpdateItemField} />
    </>
  );
};

export default ListDetail;
