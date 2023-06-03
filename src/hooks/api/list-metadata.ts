import { useRequest } from "../use-request";
import { apiEndpoints } from "../../api-endpoints";
import { useCallback, useContext, useEffect } from "react";
import { Field } from "../../types/field";
import { ListMetadata } from "../../types/list-metadata";
import { ListMetadataContext } from "../../context/list-metadata";
import { clamp, debounce } from "lodash";

type FieldWithoutId = Omit<Field, "_id">;

export const useGetListMetadata = (listId: string) => {
  const { listMetadata, setListMetadata } = useContext(ListMetadataContext);

  const {
    loading,
    error: errorFetchingListMetadata,
    request: fetchListMetadata,
  } = useRequest<ListMetadata>("GET");

  useEffect(() => {
    fetchListMetadata(apiEndpoints.getListMetadata(listId)).then(
      (responseData) => {
        if (responseData) {
          setListMetadata(responseData);
        }
      }
    );
  }, [listId]);

  return {
    listMetadata,
    loading,
    error: errorFetchingListMetadata,
  };
};

export const useAddField = (listId: string) => {
  const { listMetadata, setListMetadata } = useContext(ListMetadataContext);

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
    if (listMetadata && newField) {
      setListMetadata({
        ...listMetadata,
        fields: [...listMetadata.fields, newField],
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
  const { listMetadata, setListMetadata } = useContext(ListMetadataContext);

  const {
    loading: deletingField,
    error: errorDeletingField,
    request: requestDeleteField,
  } = useRequest<Field>("DELETE");

  const removeField = async (fieldId: string) => {
    const deletedField = await requestDeleteField(
      apiEndpoints.deleteField(listId, fieldId)
    );
    if (listMetadata && deletedField) {
      const updatedFields = listMetadata.fields.filter(
        (field) => field._id !== deletedField._id
      );
      setListMetadata({
        ...listMetadata,
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
  const { listMetadata, setListMetadata } = useContext(ListMetadataContext);

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
    if (listMetadata) {
      const fields = [...listMetadata.fields];
      const itemIndex = fields.findIndex((field) => field._id === fieldId);
      const field = { ...fields[itemIndex] };
      field[attr as keyof Field] = value as never;
      fields[itemIndex] = field;
      if (callback) {
        callback(field);
      }
      setListMetadata({
        ...listMetadata,
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
  const { listMetadata, setListMetadata } = useContext(ListMetadataContext);

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
    if (listMetadata) {
      const currentIndex = listMetadata.fields.findIndex(
        (field) => field._id == fieldId
      );
      const maxIndex = listMetadata.fields.length - 1;
      const position = clamp(currentIndex + shift, 0, maxIndex);

      await requestMoveField(
        apiEndpoints.moveFieldAtPosition(listId, fieldId, position)
      );

      const updatedListMetadata = { ...listMetadata };
      const field = updatedListMetadata.fields.splice(currentIndex, 1).pop();
      if (field) {
        updatedListMetadata.fields.splice(position, 0, field);
        setListMetadata(updatedListMetadata);
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
  const { listMetadata, setListMetadata } = useContext(ListMetadataContext);

  const {
    loading,
    error,
    request: requestUpdateList,
  } = useRequest<ListMetadata>("PATCH");

  const debouncedUpdateList = useCallback(
    debounce(async (updates: Partial<ListMetadata>) => {
      await requestUpdateList(apiEndpoints.updateList(listId), updates);
    }, debounceDelay),
    [listId, requestUpdateList]
  );

  const updateList = (updates: Partial<ListMetadata>) => {
    if (listMetadata) {
      setListMetadata({
        ...listMetadata,
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
