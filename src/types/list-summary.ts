import { User } from "./user";

export interface ListSummary {
  _id: string;
  name: string;
  description: string;
  owner: string;
  users?: User[];
  updatedAt?: string;
}
