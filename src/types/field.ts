interface Option {
  [key: string]: string;
}

export interface Field {
  _id: string;
  name: string;
  type:
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
  // visible: string;
  // section: string;
  options?: Option[]; // Puede ser undefined
  defaultValue?: string | number | boolean | null;
  help?: string; // Puede ser undefined
  importance?: string; // Puede ser undefined
  width?: string; // Puede ser undefined
}
