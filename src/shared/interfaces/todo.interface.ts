import { Filter } from "../types";

export interface Todo {
  id?: number;
  content?: string;
  done: boolean;
  editMode: boolean;
  filter: Filter;
}
