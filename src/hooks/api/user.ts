import { useEndpoint } from "../use-endpoint";
import { CurrentUser } from "../../types/current-user";
import { Endpoints } from "../../endpoints";

export const useCurrentUser = () => {
  return useEndpoint<CurrentUser>(Endpoints.getCurrentUser(), "GET", {
    requiresAuth: true,
  });
};
