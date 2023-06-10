import { useCallback, useMemo } from "react";
import { Field } from "../types/field";
import { Item } from "../types/item";
import { useIsMobile } from "./mobile";

export const useFieldsVisibility = (fields: Field[]) => {
  const { isMobile } = useIsMobile();

  const visibleFields = useMemo<Field[]>(() => {
    return fields.filter(
      (field) => !field.hidden && (!field.hiddenOnMobile || !isMobile)
    );
  }, [fields, isMobile]);

  const writableFieldType = useMemo(
    () => ["text", "multiline-text", "long-text", "number"],
    []
  );

  const hasHiddenContent = useCallback(
    (item: Item) => {
      return fields.some(
        (field) =>
          writableFieldType.includes(field.type) &&
          (field.hidden || (isMobile && field.hiddenOnMobile)) &&
          !!item[field._id]
      );
    },
    [fields, isMobile]
  );

  return {
    visibleFields,
    hasHiddenContent,
  };
};
