import { User } from "./user";
import { Field } from "./field";
import { Item } from "./item";

interface Filter {
  name: string;
  _id: number;
  action: string;
  field: string;
  when: string;
  value: string;
}

export interface List {
  _id: string;
  name: string;
  owner: string;
  fields: Field[];
  items: Item[];
  isTemplate?: boolean;
  fieldLastIndex?: number;
  filterLastIndex?: number;
  conditions?: unknown[]; // No se especifica el tipo de datos en la respuesta
  filters?: Filter[];
  category?: string;
  commentsEnabled?: boolean;
  users?: User[];
  updatedAt?: string;
}
