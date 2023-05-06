import { User } from "./user";

export interface Item {
  _id: string;
  [key: string]: string | number | boolean;
  // [key: string]: string | number | Comment[] | boolean;
}

interface Comment {
  text: string;
  date: number;
  user: User;
}
