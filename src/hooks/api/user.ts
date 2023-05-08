import { useRequest } from "../use-request";
import { CurrentUser } from "../../types/current-user";
import { apiEndpoints } from "../../api-endpoints";

export const useCurrentUser = () => {
  return useRequest<CurrentUser>(
    "GET",
    {
      requiresAuth: true,
    },
    apiEndpoints.getCurrentUser()
  );
};
