import React from "react";
import { useParams } from "react-router-dom";
import useList from "../hooks/use-list";
import { Field } from "../types/field";

function getColumnWidth(field: Field): string {
  if (field.width) {
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
      return "160px";
    default:
      return "200px";
  }
}

const ListDetail = () => {
  const { id = "" } = useParams();
  const { list, isLoading, error } = useList(id);

  if (isLoading || !list) {
    return <div>cargando...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const { fields = [], items = [] } = list!;

  return (
    <table>
      <thead>
        <tr>
          {fields.map((field) => (
            <th key={field._id} style={{ width: getColumnWidth(field) }}>
              {field.name}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <tr key={item._id}>
            {fields.map((field, index) => (
              <td key={index}>{item[index + 1]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ListDetail;
