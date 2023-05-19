import { useRequest } from "../use-request";
import { apiEndpoints } from "../../api-endpoints";
import { useContext, useEffect, useState } from "react";
import { Field } from "../../types/field";
import { ListConfig } from "../../types/list-config";
import { ListConfigContext } from "../../context/list-config-context-provider";

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

  const addField = async (field?: FieldWithoutId) => {
    const newField = await requestAddField(
      apiEndpoints.createField(listId),
      field || {}
    );
    if (listConfig && newField) {
      setListConfig({
        ...listConfig,
        fields: [...listConfig.fields, newField],
      });
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
  const {
    loading: savingField,
    error: errorSavingField,
    request: requestUpdateField,
  } = useRequest<Field>("PATCH");

  const updateField = (fieldId: string, attr: string, value: any) => {
    requestUpdateField(apiEndpoints.updateField(listId, fieldId), {
      attr,
      value,
    });
  };

  return {
    savingField,
    error: errorSavingField,
    updateField,
  };
};
