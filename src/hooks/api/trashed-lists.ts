import { useContext } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { apiEndpoints } from "../../api-endpoints";
import { ListSummary } from "../../types/list-summary";
import { AuthContext } from "../../context/auth-context";

export const useGetTrashedLists = () => {
  const { authData } = useContext(AuthContext);

  return useQuery({
    queryKey: ["trashed-lists"],
    queryFn: async () => {
      const { data } = await axios.get<ListSummary[]>(
        apiEndpoints.getTrashedLists(),
        {
          headers: { Authorization: authData.token ?? "" },
        }
      );
      return data;
    },
    enabled: !!authData.token, // Solo ejecutar cuando hay token
  });
};

export const useHardDeleteList = () => {
  const { authData } = useContext(AuthContext);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      await axios.delete(apiEndpoints.hardDeleteList(id), {
        headers: { Authorization: authData.token ?? "" },
      });
    },
    onSuccess: () => {
      // Invalidar para recargar la vista después de un delete exitoso
      queryClient.invalidateQueries({ queryKey: ["trashed-lists"] });
    },
  });
};
