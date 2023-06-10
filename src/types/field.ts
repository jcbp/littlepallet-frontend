export interface Option {
  [key: string]: string;
}

export type FieldType =
  | "boolean"
  | "date"
  | "text"
  | "long-text"
  | "multiline-text"
  | "options"
  | "combo-list"
  | "time"
  | "color"
  | "color-picker"
  | "traffic-light"
  | "number"
  | "rating"
  | "user"
  | "chips"
  | "options-list";

export interface Field {
  _id: string;
  name: string;
  type: FieldType;
  options?: Option[];
  defaultValue?: string | number | boolean | null;
  help?: string;
  importance?: string;
  width?: string;
  hidden?: boolean;
  hiddenOnMobile?: boolean;
}
