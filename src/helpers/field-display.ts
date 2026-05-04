import { CSSProperties } from "react";
import { Field, FieldType } from "../types/field";

export type FieldHeaderAlign = "left" | "center" | "right";

export interface FieldHeaderDisplayConfig {
  align?: FieldHeaderAlign;
  maxWidth?: string;
}

const fieldTypeHeaderDisplayConfig: Partial<
  Record<FieldType, FieldHeaderDisplayConfig>
> = {
  boolean: {
    maxWidth: "100px",
  },
  money: {
    align: "right",
    maxWidth: "250px",
  },
  "traffic-light": {
    maxWidth: "100px",
  },
  date: {
    maxWidth: "200px",
  },
};

export const getFieldHeaderDisplayConfig = (
  field: Field
): FieldHeaderDisplayConfig => {
  // In the future we may allow per-field overrides here, once the model/backend
  // can persist display settings on the field itself.
  return fieldTypeHeaderDisplayConfig[field.type] ?? {};
};

export const getFieldHeaderAlignClassName = (
  align: FieldHeaderAlign = "left"
) => {
  switch (align) {
    case "center":
      return "text-center";
    case "right":
      return "text-right";
    default:
      return "text-left";
  }
};

export const getFieldHeaderContentClassName = (
  align: FieldHeaderAlign = "left"
) => {
  switch (align) {
    case "center":
      return "justify-center";
    case "right":
      return "justify-end";
    default:
      return "justify-start";
  }
};

export const getFieldHeaderStyle = (
  config: FieldHeaderDisplayConfig,
  stickyStyle: CSSProperties
): CSSProperties => {
  return {
    ...stickyStyle,
    width: config.maxWidth,
    maxWidth: config.maxWidth,
  };
};
