import { Table, DropdownButton, Dropdown, Button } from "react-bootstrap";
import { Field } from "../types/field";
import { Item } from "../types/item";
import FieldView from "./field-view";

interface ListCardProps {
  fields: Field[];
  items: Item[];
  onUpdateItemField: (itemId: string, fieldId: string, value: string) => void;
  onRemoveItem: (itemId: string) => void;
}

const TableList: React.FC<ListCardProps> = ({
  fields,
  items,
  onUpdateItemField,
  onRemoveItem,
}) => {
  return (
    <Table>
      <thead>
        <tr>
          {fields.map((field) => (
            <th key={field._id}>{field.name}</th>
          ))}
          <th></th>
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <tr key={item._id}>
            {fields.map((field) => (
              <td key={field._id}>
                <div className="d-flex align-items-center h-100">
                  <FieldView
                    field={field}
                    value={item[field._id]}
                    onChange={(value) =>
                      onUpdateItemField(item._id, field._id, value)
                    }
                  />
                </div>
              </td>
            ))}
            <td>
              <div className="d-flex align-items-center justify-content-end h-100 ms-3">
                <Button variant="light" className="me-1">
                  <i className="bi bi-search text-secondary" />
                </Button>
                <DropdownButton
                  className="hide-dropdown-icon p-0"
                  id="dropdown-basic-button"
                  title={
                    <i className="bi bi-three-dots-vertical text-secondary" />
                  }
                  variant="light"
                >
                  <Dropdown.Item href="#">Mover hacia arriba</Dropdown.Item>
                  <Dropdown.Item href="#">Mover hacia abajo</Dropdown.Item>
                  <Dropdown.Item
                    href="#"
                    onClick={() => onRemoveItem(item._id)}
                  >
                    Eliminar
                  </Dropdown.Item>
                </DropdownButton>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default TableList;
