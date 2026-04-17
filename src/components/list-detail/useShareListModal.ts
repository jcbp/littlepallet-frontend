import { useMemo, useCallback, useRef, useEffect } from "react";
import { debounce } from "lodash";
import { builtInUserListMetadata } from "../../built-in-tables/user-list";
import { List } from "../../types/list";
import { Field } from "../../types/field";
import { Item } from "../../types/item";
import {
  useAddListUser,
  useUpdateListUser,
  useDeleteListUser,
} from "../../hooks/api/list-users";
import { useListDispatch } from "../../context/list-store";
import { ActionType } from "../../reducers/list-reducer";

interface UseShareListModalReturn {
  tableFields: Field[];
  tableItems: Item[];
  creatingUser: boolean;
  handleAddUser: () => void;
  handleUpdateUserField: (userId: string, fieldId: string, value: any) => void;
  handleRemoveUser: (userId: string) => void;
}

const useShareListModal = (list: List): UseShareListModalReturn => {
  const { mutate: addUser, isPending: creatingUser } = useAddListUser(list._id);
  const { mutate: updateUserField } = useUpdateListUser(list._id);
  const { mutate: deleteUser } = useDeleteListUser(list._id);
  const dispatch = useListDispatch();

  const handleAddUser = useCallback(() => {
    addUser({});
  }, [addUser]);

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
  useEffect(() => {
    return () => {
      debouncedUpdateUserField.cancel();
    };
  }, [debouncedUpdateUserField]);

  const currentUserId = useRef("");
  const currentAttr = useRef("");

  const handleUpdateUserField = useCallback(
    (userId: string, fieldId: string, value: any) => {
      const userToUpdate = list.users?.find(
        (u) => u._id.toString() === userId.toString()
      );
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
    },
    [list.users, dispatch, debouncedUpdateUserField]
  );

  const handleRemoveUser = useCallback(
    (userId: string) => {
      dispatch({
        type: ActionType.RemoveUser,
        payload: userId.toString(),
      });
      deleteUser(userId);
    },
    [dispatch, deleteUser]
  );

  const tableFields = useMemo(() => {
    return builtInUserListMetadata.fields;
  }, []);

  const tableItems: Item[] = useMemo(() => {
    if (!list.users) return [];
    return list.users.map((u) => u as unknown as Item);
  }, [list.users]);

  return {
    tableFields,
    tableItems,
    creatingUser,
    handleAddUser,
    handleUpdateUserField,
    handleRemoveUser,
  };
};

export default useShareListModal;
