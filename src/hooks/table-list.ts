import { useCallback, useMemo } from "react";
import { Field } from "../types/field";
import { Item } from "../types/item";
import { useIsMobile } from "./mobile";
import { List } from "../types/list";

export type ItemsFilter = { field: Field; value: any };

const isWritableFieldType = (field: Field) => {
  return (
    !field.type ||
    ["text", "multiline-text", "long-text", "number"].includes(field.type)
  );
};

export const useFieldsVisibility = (fields: Field[]) => {
  const { isMobile } = useIsMobile();

  const visibleFields = useMemo<Field[]>(() => {
    return fields.filter(
      (field) => !field.hidden && (!field.hiddenOnMobile || !isMobile)
    );
  }, [fields, isMobile]);

  const hasHiddenContent = useCallback(
    (item: Item) => {
      return fields.some(
        (field) =>
          isWritableFieldType(field) &&
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

export const useFilteredItems = (
  list: List | null,
  filter: ItemsFilter | null
): Item[] => {
  return useMemo(() => {
    if (!list) {
      return [];
    }
    if (!filter) {
      return list.items;
    }
    return list.items.filter((item) => {
      const fieldValue = item[filter.field._id];

      if (isWritableFieldType(filter.field)) {
        return (
          !filter.value ||
          (fieldValue &&
            fieldValue
              .toString()
              .toLowerCase()
              .includes(filter.value.toLowerCase()))
        );
      }

      if (filter.field.type === "options") {
        const defaultValue =
          filter.field.defaultValue ?? filter.field.options?.[0]?.[0];
        const normalizedFieldValue = fieldValue || defaultValue;
        const normalizedFilterValue = filter.value || defaultValue;
        return normalizedFieldValue === normalizedFilterValue;
      }

      return fieldValue === filter.value;
    });
  }, [list, filter]);
};
