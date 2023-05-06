import { Field } from "../types/field";
import { Item } from "../types/item";
import FieldView from "./field-view";

function getColumnWidth(field: Field): string {
  if (field.width && parseInt(field.width) > 0) {
    return field.width;
  }

  switch (field.type) {
    case "boolean":
      return "70px";
    case "traffic-light":
    case "color":
      return "70px";
    case "date":
    case "time":
      return "100px";
    case "options":
    case "user":
      return "180px";
    default:
      return "260px";
  }
}

interface ListCardProps {
  fields: Field[];
  items: Item[];
  onUpdateItemField: (itemId: string, fieldId: string, value: string) => void;
}

const TableList: React.FC<ListCardProps> = ({
  fields,
  items,
  onUpdateItemField,
}) => {
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
            {fields.map((field) => (
              <td key={field._id}>
                <FieldView
                  field={field}
                  value={item[field._id]}
                  onChange={(value) =>
                    onUpdateItemField(item._id, field._id, value)
                  }
                />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableList;
