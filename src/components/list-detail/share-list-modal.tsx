import React, { useMemo, useCallback, useRef } from "react";
import { debounce } from "lodash";
import ModalDialog from "../common/modal-dialog";
import TableList from "../table-list";
import { builtInUserListMetadata } from "../../built-in-tables/user-list";
import { List } from "../../types/list";
import { User } from "../../types/user";
import { Item } from "../../types/item";
import Button from "../common/button";
import { PlusIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import {
  useAddListUser,
  useUpdateListUser,
  useDeleteListUser,
} from "../../hooks/api/list-users";
import { useListDispatch } from "../../context/list-store";
import { ActionType } from "../../reducers/list-reducer";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  list: List;
}

const ShareListModal: React.FC<Props> = ({ isOpen, onClose, list }) => {
  const { mutate: addUser, isPending: creatingUser } = useAddListUser(list._id);
  const { mutate: updateUserField } = useUpdateListUser(list._id);
  const { mutate: deleteUser } = useDeleteListUser(list._id);
  const dispatch = useListDispatch();

  const handleAddUser = () => {
    // Minimal payload
    addUser({});
  };

  const debouncedUpdateUserField = useMemo(() => {
    const fn = debounce(
      (userId: string, attr: string, value: any) => {
        updateUserField({ userId, attr, value });
      },
      700
    );

    return fn;
  }, [updateUserField]);

  // cleanup
  React.useEffect(() => {
    return () => {
      debouncedUpdateUserField.cancel();
    };
  }, [debouncedUpdateUserField]);

  const currentUserId = useRef("");
  const currentAttr = useRef("");

  const handleUpdateUserField = (
    userId: string,
    fieldId: string,
    value: any
  ) => {
    const userToUpdate = list.users?.find((u) => u._id.toString() === userId.toString());
    if (userToUpdate) {
      dispatch({
        type: ActionType.UpdateUser,
        payload: { ...userToUpdate, [fieldId]: value },
      });
    }

    if (
      userId !== currentUserId.current ||
      fieldId !== currentAttr.current
    ) {
      debouncedUpdateUserField.flush();
      currentUserId.current = userId;
      currentAttr.current = fieldId;
    }

    debouncedUpdateUserField(userId, fieldId, value);
  };

  const handleRemoveUser = (userId: string) => {
    dispatch({
      type: ActionType.RemoveUser,
      payload: userId.toString(),
    });
    deleteUser(userId);
  };

  const tableFields = useMemo(() => {
    return builtInUserListMetadata.fields;
  }, []);

  const tableItems: Item[] = useMemo(() => {
    if (!list.users) return [];
    return list.users.map((u) => u as unknown as Item);
  }, [list.users]);

  return (
    <ModalDialog
      title="Compartir Lista"
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="mb-6 mt-4 p-4 bg-gray-50 rounded-lg border border-gray-100">
        <label className="text-sm text-gray-500 font-medium block">Propietario</label>
        <span className="text-gray-900 font-medium font-mono">{list.owner}</span>
      </div>

      <div className="flex justify-between items-center mb-4">
        <h3 className="text-md font-medium text-gray-900">Usuarios con acceso</h3>
        {tableItems.length > 0 && (
          <Button
            startIcon={PlusIcon}
            onClick={handleAddUser}
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
              onUpdateItemField={handleUpdateUserField}
              onRemoveItem={handleRemoveUser}
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
            onClick={handleAddUser}
            disabled={creatingUser}
          >
            Agregar usuario
          </Button>
        </div>
      )}
    </ModalDialog>
  );
};

export default ShareListModal;
