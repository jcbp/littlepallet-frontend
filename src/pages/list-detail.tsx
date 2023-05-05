import React from "react";
import { useParams } from "react-router-dom";
import { useGetList } from "../hooks/list";
import { Field } from "../types/field";
import { List } from "../types/list";

function getColumnWidth(field: Field): string {
  if (field.width && parseInt(field.width) > 0) {
    return field.width;
  }

  switch (field.type) {
    case "boolean":
      return "50px";
    case "traffic-light":
    case "color":
      return "70px";
    case "date":
    case "time":
      return "100px";
    case "options":
    case "user":
      return "80px";
    default:
      return "260px";
  }
}

const getFieldConfig = (list: List, field: Field) => {
  const defaultConfig = { hidden: false };
  if (!list.views || !list.views.tableView) {
    return defaultConfig;
  }
  return list.views.tableView[field._id] || defaultConfig;
};

const ListDetail = () => {
  const { id = "" } = useParams();
  const { data: list, isLoading, error } = useGetList(id);

  if (isLoading || !list) {
    return <div>cargando...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const { fields = [], items = [] } = list!;

  // Obtener solo los campos visibles
  const visibleFields = fields.filter(
    (field) => getFieldConfig(list, field).hidden !== true
  );

  return (
    <table>
      <thead>
        <tr>
          {visibleFields.map((field) => (
            <th key={field._id} style={{ width: getColumnWidth(field) }}>
              {field.name}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <tr key={item._id}>
            {visibleFields.map((field) => (
              <td key={field._id}>{item[field._id]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ListDetail;
