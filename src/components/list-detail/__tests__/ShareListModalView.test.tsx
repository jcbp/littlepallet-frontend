import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ShareListModalView from "../ShareListModalView";
import { Field } from "../../../types/field";
import { Item } from "../../../types/item";

// ── Mocks ────────────────────────────────────────────────────────────────────

// Mock de ModalDialog: renderiza un contenedor simple para evitar dependencias
// de @headlessui/react (Dialog/Transition) en tests unitarios.
jest.mock("../../common/modal-dialog", () => {
  const MockModal: React.FC<{
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
  }> = ({ isOpen, title, children }) => {
    if (!isOpen) return null;
    return (
      <div data-testid="modal">
        {title && <h3>{title}</h3>}
        {children}
      </div>
    );
  };
  MockModal.displayName = "MockModalDialog";
  return MockModal;
});

// Mock de TableList: renderiza una tabla simple con los datos recibidos.
jest.mock("../../table-list", () => {
  const MockTableList: React.FC<{
    fields: Field[];
    items: Item[];
  }> = ({ items }) => (
    <table data-testid="table-list">
      <tbody>
        {items.map((item) => (
          <tr key={item._id}>
            <td>{item.email as string}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
  MockTableList.displayName = "MockTableList";
  return MockTableList;
});

// ── Helpers ──────────────────────────────────────────────────────────────────

const defaultFields: Field[] = [
  { _id: "email", name: "Correo electrónico", type: "text", defaultValue: "" },
  {
    _id: "role",
    name: "Rol",
    type: "options",
    options: [
      { value: "viewer", text: "Viewer" },
      { value: "editor", text: "Editor" },
    ],
    defaultValue: "viewer",
  },
];

const defaultProps = {
  isOpen: true,
  onClose: jest.fn(),
  owner: "owner@test.com",
  tableFields: defaultFields,
  tableItems: [] as Item[],
  creatingUser: false,
  onAddUser: jest.fn(),
  onUpdateUserField: jest.fn(),
  onRemoveUser: jest.fn(),
};

// ── Tests ────────────────────────────────────────────────────────────────────

describe("ShareListModalView", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("no renderiza nada cuando isOpen es false", () => {
    render(<ShareListModalView {...defaultProps} isOpen={false} />);

    expect(screen.queryByTestId("modal")).not.toBeInTheDocument();
  });

  it("muestra el título 'Compartir Lista'", () => {
    render(<ShareListModalView {...defaultProps} />);

    expect(screen.getByText("Compartir Lista")).toBeInTheDocument();
  });

  it("muestra el owner de la lista", () => {
    render(<ShareListModalView {...defaultProps} owner="admin@example.com" />);

    expect(screen.getByText("admin@example.com")).toBeInTheDocument();
  });

  it("muestra la etiqueta 'Propietario'", () => {
    render(<ShareListModalView {...defaultProps} />);

    expect(screen.getByText("Propietario")).toBeInTheDocument();
  });

  describe("cuando no hay usuarios", () => {
    it("muestra el estado vacío con texto 'Sin usuarios invitados'", () => {
      render(<ShareListModalView {...defaultProps} tableItems={[]} />);

      expect(screen.getByText("Sin usuarios invitados")).toBeInTheDocument();
      expect(
        screen.getByText("Agrega usuarios a esta lista para colaborar.")
      ).toBeInTheDocument();
    });

    it("muestra el botón 'Agregar usuario'", () => {
      render(<ShareListModalView {...defaultProps} tableItems={[]} />);

      expect(
        screen.getByRole("button", { name: /agregar usuario/i })
      ).toBeInTheDocument();
    });

    it("llama a onAddUser al hacer clic en 'Agregar usuario'", async () => {
      const onAddUser = jest.fn();
      render(
        <ShareListModalView
          {...defaultProps}
          tableItems={[]}
          onAddUser={onAddUser}
        />
      );

      await userEvent.click(
        screen.getByRole("button", { name: /agregar usuario/i })
      );

      expect(onAddUser).toHaveBeenCalledTimes(1);
    });
  });

  describe("cuando hay usuarios", () => {
    const usersAsItems: Item[] = [
      { _id: "1", email: "user1@test.com", role: "editor" },
      { _id: "2", email: "user2@test.com", role: "viewer" },
    ];

    it("renderiza la tabla de usuarios", () => {
      render(
        <ShareListModalView {...defaultProps} tableItems={usersAsItems} />
      );

      expect(screen.getByTestId("table-list")).toBeInTheDocument();
    });

    it("no muestra el estado vacío", () => {
      render(
        <ShareListModalView {...defaultProps} tableItems={usersAsItems} />
      );

      expect(
        screen.queryByText("Sin usuarios invitados")
      ).not.toBeInTheDocument();
    });

    it("muestra el encabezado 'Usuarios con acceso'", () => {
      render(
        <ShareListModalView {...defaultProps} tableItems={usersAsItems} />
      );

      expect(screen.getByText("Usuarios con acceso")).toBeInTheDocument();
    });

    it("muestra el botón 'Agregar usuario' en la parte superior", async () => {
      const onAddUser = jest.fn();
      render(
        <ShareListModalView
          {...defaultProps}
          tableItems={usersAsItems}
          onAddUser={onAddUser}
        />
      );

      const button = screen.getByRole("button", {
        name: /agregar usuario/i,
      });
      expect(button).toBeInTheDocument();

      await userEvent.click(button);
      expect(onAddUser).toHaveBeenCalledTimes(1);
    });
  });
});
