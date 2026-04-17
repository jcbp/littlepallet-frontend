import React from "react";
import ModalDialog from "../common/modal-dialog";
import TableList from "../table-list";
import Button from "../common/button";
import { PlusIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import { Field } from "../../types/field";
import { Item } from "../../types/item";

interface ShareListModalViewProps {
  isOpen: boolean;
  onClose: () => void;
  owner: string;
  tableFields: Field[];
  tableItems: Item[];
  creatingUser: boolean;
  onAddUser: () => void;
  onUpdateUserField: (userId: string, fieldId: string, value: any) => void;
  onRemoveUser: (userId: string) => void;
}

const ShareListModalView: React.FC<ShareListModalViewProps> = ({
  isOpen,
  onClose,
  owner,
  tableFields,
  tableItems,
  creatingUser,
  onAddUser,
  onUpdateUserField,
  onRemoveUser,
}) => {
  return (
    <ModalDialog
      title="Compartir Lista"
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="mb-6 mt-4 p-4 bg-gray-50 rounded-lg border border-gray-100">
        <label className="text-sm text-gray-500 font-medium block">Propietario</label>
        <span className="text-gray-900 font-medium font-mono">{owner}</span>
      </div>

      <div className="flex justify-between items-center mb-4">
        <h3 className="text-md font-medium text-gray-900">Usuarios con acceso</h3>
        {tableItems.length > 0 && (
          <Button
            startIcon={PlusIcon}
            onClick={onAddUser}
            disabled={creatingUser}
          >
            Agregar usuario
          </Button>
        )}
      </div>

      {tableItems.length > 0 ? (
        <div className="relative border border-slate-200 rounded">
          <div className="max-h-96">
            <TableList
              fields={tableFields}
              items={tableItems}
              onUpdateItemField={onUpdateUserField}
              onRemoveItem={onRemoveUser}
            />
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center p-8 bg-gray-50 border border-gray-200 border-dashed rounded text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 mb-4">
            <UserPlusIcon className="h-6 w-6 text-blue-600" aria-hidden="true" />
          </div>
          <h3 className="mt-2 text-sm font-semibold text-gray-900">Sin usuarios invitados</h3>
          <p className="mt-1 mb-4 text-sm text-gray-500">Agrega usuarios a esta lista para colaborar.</p>
          <Button
            startIcon={PlusIcon}
            onClick={onAddUser}
            disabled={creatingUser}
          >
            Agregar usuario
          </Button>
        </div>
      )}
    </ModalDialog>
  );
};

export default ShareListModalView;
