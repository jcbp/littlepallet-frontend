import { useRequest } from "../use-request";
import { apiEndpoints } from "../../api-endpoints";
import { useCallback, useEffect } from "react";
import { Field } from "../../types/field";
import { ListMetadata } from "../../types/list-metadata";
import {
  useListMetadataDispatch,
  useListMetadataStore,
} from "../../context/list-metadata-store";
import { clamp, debounce } from "lodash";
import { ActionType } from "../../reducers/list-metadata-reducer";

type FieldWithoutId = Omit<Field, "_id">;

export const useGetListMetadata = (listId: string) => {
  const { listMetadata } = useListMetadataStore();
  const dispatch = useListMetadataDispatch();

  const {
    loading,
    error: errorFetchingListMetadata,
    request: fetchListMetadata,
  } = useRequest<ListMetadata>("GET");

  useEffect(() => {
    fetchListMetadata(apiEndpoints.getListMetadata(listId)).then(
      (responseData) => {
        if (responseData) {
          dispatch({ type: ActionType.SetListMetadata, payload: responseData });
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
  const { listMetadata } = useListMetadataStore();
  const dispatch = useListMetadataDispatch();

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
      dispatch({ type: ActionType.AddField, payload: newField });
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
  const { listMetadata } = useListMetadataStore();
  const dispatch = useListMetadataDispatch();

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
      dispatch({ type: ActionType.RemoveField, payload: fieldId });
    }
  };

  return {
    deletingField,
    error: errorDeletingField,
    removeField,
  };
};

export const useUpdateField = (listId: string) => {
  const dispatch = useListMetadataDispatch();

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

  const updateField = async (fieldId: string, attr: string, value: any) => {
    dispatch({
      type: ActionType.UpdateField,
      payload: {
        fieldId,
        updates: {
          [attr as keyof Field]: value as never,
        },
      },
    });
    debouncedUpdateField(fieldId, attr, value);
  };

  return {
    savingField,
    error: errorSavingField,
    updateField,
  };
};

export const useMoveField = (listId: string) => {
  const { listMetadata } = useListMetadataStore();
  const dispatch = useListMetadataDispatch();

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

      dispatch({ type: ActionType.MoveField, payload: { fieldId, position } });
      if (callback) {
        callback();
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
  const { listMetadata } = useListMetadataStore();
  const dispatch = useListMetadataDispatch();

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
      dispatch({
        type: ActionType.SetListMetadata,
        payload: { ...listMetadata, ...updates },
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
