import { useRequest } from "../use-request";
import { apiEndpoints } from "../../api-endpoints";
import { useCallback, useContext, useEffect } from "react";
import { Field } from "../../types/field";
import { ListConfig } from "../../types/list-config";
import { ListConfigContext } from "../../context/list-config";
import { clamp, debounce } from "lodash";

type FieldWithoutId = Omit<Field, "_id">;

export const useGetListConfig = (listId: string) => {
  const { listConfig, setListConfig } = useContext(ListConfigContext);

  const {
    loading,
    error: errorFetchingListConfig,
    request: fetchListConfig,
  } = useRequest<ListConfig>("GET");

  useEffect(() => {
    fetchListConfig(apiEndpoints.getListConfig(listId)).then((responseData) => {
      if (responseData) {
        setListConfig(responseData);
      }
    });
  }, [listId]);

  return {
    listConfig,
    loading,
    error: errorFetchingListConfig,
  };
};

export const useAddField = (listId: string) => {
  const { listConfig, setListConfig } = useContext(ListConfigContext);

  const {
    loading: creatingField,
    error: errorCreatingField,
    request: requestAddField,
  } = useRequest<Field>("POST");

  const addField = async (
    field?: FieldWithoutId | null,
    callback?: (newField: Field) => void
  ) => {
    const newField = await requestAddField(
      apiEndpoints.createField(listId),
      field || {}
    );
    if (listConfig && newField) {
      setListConfig({
        ...listConfig,
        fields: [...listConfig.fields, newField],
      });
      if (callback) {
        callback(newField);
      }
    }
  };

  return {
    creatingField,
    error: errorCreatingField,
    addField,
  };
};

export const useRemoveField = (listId: string) => {
  const { listConfig, setListConfig } = useContext(ListConfigContext);

  const {
    loading: deletingField,
    error: errorDeletingField,
    request: requestDeleteField,
  } = useRequest<Field>("DELETE");

  const removeField = async (fieldId: string) => {
    const deletedField = await requestDeleteField(
      apiEndpoints.deleteField(listId, fieldId)
    );
    if (listConfig && deletedField) {
      const updatedFields = listConfig.fields.filter(
        (field) => field._id !== deletedField._id
      );
      setListConfig({
        ...listConfig,
        fields: updatedFields,
      });
    }
  };

  return {
    deletingField,
    error: errorDeletingField,
    removeField,
  };
};

export const useUpdateField = (listId: string) => {
  const { listConfig, setListConfig } = useContext(ListConfigContext);

  const {
    loading: savingField,
    error: errorSavingField,
    request: requestUpdateField,
  } = useRequest<Field>("PATCH");

  const debouncedUpdateField = useCallback(
    debounce(async (fieldId: string, attr: string, value: any) => {
      await requestUpdateField(apiEndpoints.updateField(listId, fieldId), {
        attr,
        value,
      });
    }, 700),
    [listId, requestUpdateField]
  );

  const updateField = async (
    fieldId: string,
    attr: string,
    value: any,
    callback?: (field: Field) => void
  ) => {
    if (listConfig) {
      const fields = [...listConfig.fields];
      const itemIndex = fields.findIndex((field) => field._id === fieldId);
      const field = { ...fields[itemIndex] };
      field[attr as keyof Field] = value as never;
      fields[itemIndex] = field;
      if (callback) {
        callback(field);
      }
      setListConfig({
        ...listConfig,
        fields: fields,
      });
    }
    debouncedUpdateField(fieldId, attr, value);
  };

  return {
    savingField,
    error: errorSavingField,
    updateField,
  };
};

export const useMoveField = (listId: string) => {
  const { listConfig, setListConfig } = useContext(ListConfigContext);

  const {
    loading,
    error,
    request: requestMoveField,
  } = useRequest<Field>("PATCH");

  const moveField = async (
    fieldId: string,
    shift: number,
    callback?: () => void
  ) => {
    if (listConfig) {
      const currentIndex = listConfig.fields.findIndex(
        (field) => field._id == fieldId
      );
      const maxIndex = listConfig.fields.length - 1;
      const position = clamp(currentIndex + shift, 0, maxIndex);

      await requestMoveField(
        apiEndpoints.moveFieldAtPosition(listId, fieldId, position)
      );

      const updatedListConfig = { ...listConfig };
      const field = updatedListConfig.fields.splice(currentIndex, 1).pop();
      if (field) {
        updatedListConfig.fields.splice(position, 0, field);
        setListConfig(updatedListConfig);
        if (callback) {
          callback();
        }
      }
    }
  };

  return {
    loading,
    error,
    moveField,
  };
};

export const useUpdateList = (listId: string, debounceDelay: number) => {
  const { listConfig, setListConfig } = useContext(ListConfigContext);

  const {
    loading,
    error,
    request: requestUpdateList,
  } = useRequest<ListConfig>("PATCH");

  const debouncedUpdateList = useCallback(
    debounce(async (updates: Partial<ListConfig>) => {
      await requestUpdateList(apiEndpoints.updateList(listId), updates);
    }, debounceDelay),
    [listId, requestUpdateList]
  );

  const updateList = (updates: Partial<ListConfig>) => {
    if (listConfig) {
      setListConfig({
        ...listConfig,
        ...updates,
      });
      debouncedUpdateList(updates);
    }
  };

  return {
    loading,
    error,
    updateList,
  };
};
