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

interface ViewSection {
  section: string;
  hidden?: boolean;
  width?: string;
}

interface Views {
  boardView: {
    [key: string]: ViewSection;
  };
  cardView: {
    [key: string]: ViewSection;
  };
  tableView: {
    [key: string]: ViewSection;
  };
  itemView: {
    [key: string]: ViewSection;
  };
}

export interface List {
  _id: string;
  name: string;
  owner: string;
  isTemplate: boolean;
  fieldLastIndex: number;
  filterLastIndex: number;
  conditions: unknown[]; // No se especifica el tipo de datos en la respuesta
  filters: Filter[];
  fields: Field[];
  items: Item[];
  views?: Views;
  category: string;
  commentsEnabled: boolean;
  users: User[];
  updatedAt?: string;
}
