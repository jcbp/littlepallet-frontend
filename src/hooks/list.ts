import { ListConfig } from "../types/list-config";
import { useIsMobile } from "./mobile";

export const useVisibilityFilter = () => {
  const { isMobile } = useIsMobile();

  const getVisibleFields = (listConfig: ListConfig) => {
    return listConfig.fields.filter(
      (field) => !field.hidden && (!field.hiddenOnMobile || !isMobile)
    );
  };

  return { getVisibleFields };
};
