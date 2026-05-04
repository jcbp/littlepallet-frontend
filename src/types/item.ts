import { User } from "./user";

export interface MoneyValue {
  value?: string | number;
  currency?: string;
}

export interface Item {
  _id: string;
  [key: string]: string | number | boolean | MoneyValue;
  // [key: string]: string | number | Comment[] | boolean;
}

interface Comment {
  text: string;
  date: number;
  user: User;
}
