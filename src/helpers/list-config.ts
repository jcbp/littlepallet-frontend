import { Field } from "../types/field";
import { ListConfig } from "../types/list-config";

export const getFieldConfig = (listConfig: ListConfig, field: Field) => {
  const defaultConfig = { hidden: false };
  if (!listConfig.views || !listConfig.views.tableView) {
    return defaultConfig;
  }
  return listConfig.views.tableView[field._id] || defaultConfig;
};

export const getVisibleFields = (listConfig: ListConfig) => {
  return listConfig.fields.filter(
    (field) => getFieldConfig(listConfig, field).hidden !== true
  );
};
