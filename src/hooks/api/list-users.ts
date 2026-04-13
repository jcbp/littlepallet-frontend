import { useContext } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { apiEndpoints } from "../../api-endpoints";
import { AuthContext } from "../../context/auth-context";
import { useListDispatch } from "../../context/list-store";
import { ActionType } from "../../reducers/list-reducer";
import { User } from "../../types/user";

export const useAddListUser = (listId: string) => {
  const { authData } = useContext(AuthContext);
  const dispatch = useListDispatch();

  return useMutation({
    mutationFn: async (user: Partial<User>) => {
      const { data } = await axios.post<User>(
        apiEndpoints.addUserToList(listId),
        user,
        {
          headers: { Authorization: authData.token ?? "" },
        }
      );
      return data;
    },
    onSuccess: (newUser) => {
      dispatch({
        type: ActionType.AddUser,
        payload: newUser,
      });
    },
  });
};

export const useUpdateListUser = (listId: string) => {
  const { authData } = useContext(AuthContext);
  const dispatch = useListDispatch();

  return useMutation({
    mutationFn: async ({
      userId,
      attr,
      value,
    }: {
      userId: string;
      attr: string;
      value: any;
    }) => {
      const { data } = await axios.patch<User>(
        apiEndpoints.updateUserInList(listId, userId),
        { attr, value },
        {
          headers: { Authorization: authData.token ?? "" },
        }
      );
      return data;
    },
  });
};

export const useDeleteListUser = (listId: string) => {
  const { authData } = useContext(AuthContext);
  const dispatch = useListDispatch();

  return useMutation({
    mutationFn: async (userId: string) => {
      await axios.delete(apiEndpoints.deleteUserFromList(listId, userId), {
        headers: { Authorization: authData.token ?? "" },
      });
      return userId;
    },
    onSuccess: (deletedUserId) => {
      dispatch({
        type: ActionType.RemoveUser,
        payload: deletedUserId,
      });
    },
  });
};
