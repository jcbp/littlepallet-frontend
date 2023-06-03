import { ListMetadata } from "../types/list-metadata";
import { useIsMobile } from "./mobile";

export const useVisibilityFilter = () => {
  const { isMobile } = useIsMobile();

  const getVisibleFields = (listMetadata: ListMetadata) => {
    return listMetadata.fields.filter(
      (field) => !field.hidden && (!field.hiddenOnMobile || !isMobile)
    );
  };

  return { getVisibleFields };
};
