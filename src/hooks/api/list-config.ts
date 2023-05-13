import { useRequest } from "../use-request";
import { List } from "../../types/list";
import { apiEndpoints } from "../../api-endpoints";
import { useEffect, useState } from "react";
import { Field } from "../../types/field";

type ListWithoutItems = Omit<List, "items">;
type FieldWithoutId = Omit<Field, "_id">;

export const useListConfig = (listId: string) => {
  const [list, setList] = useState<ListWithoutItems | null>(null);

  const {
    loading,
    error: errorFetchingListConfig,
    request: fetchListConfig,
  } = useRequest<ListWithoutItems>("GET");

  const {
    loading: creatingField,
    error: errorCreatingField,
    request: requestAddField,
  } = useRequest<Field>("POST");

  const {
    loading: deletingField,
    error: errorDeletingField,
    request: requestDeleteField,
  } = useRequest<Field>("DELETE");

  const {
    loading: savingField,
    error: errorSavingField,
    request: requestUpdateField,
  } = useRequest<Field>("PATCH");

  useEffect(() => {
    fetchListConfig(apiEndpoints.getListConfig(listId)).then((responseData) => {
      if (responseData) {
        setList(responseData);
      }
    });
  }, [listId]);

  const addField = async (field?: FieldWithoutId) => {
    const newField = await requestAddField(
      apiEndpoints.createField(listId),
      field || {}
    );
    if (list && newField) {
      setList({
        ...list,
        fields: [...list.fields, newField],
      });
    }
  };

  const removeField = async (fieldId: string) => {
    const deletedField = await requestDeleteField(
      apiEndpoints.deleteField(listId, fieldId)
    );
    if (list && deletedField) {
      const updatedFields = list.fields.filter(
        (field) => field._id !== deletedField._id
      );
      setList({
        ...list,
        fields: updatedFields,
      });
    }
  };

  const updateField = (fieldId: string, attr: string, value: any) => {
    requestUpdateField(apiEndpoints.updateField(listId, fieldId), {
      attr,
      value,
    });
  };

  return {
    list,
    loading,
    saving: savingField,
    deleting: deletingField,
    error: errorFetchingListConfig,
    addField,
    removeField,
    updateField,
  };
};
