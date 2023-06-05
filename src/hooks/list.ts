import { useMemo } from "react";
import { Field } from "../types/field";
import { ListMetadata } from "../types/list-metadata";
import { useIsMobile } from "./mobile";

export const useFieldsVisibility = (
  listMetadata: ListMetadata | null
): Field[] => {
  const { isMobile } = useIsMobile();

  return useMemo<Field[]>(() => {
    if (listMetadata) {
      return listMetadata.fields.filter(
        (field) => !field.hidden && (!field.hiddenOnMobile || !isMobile)
      );
    }
    return [];
  }, [listMetadata, isMobile]);
};
