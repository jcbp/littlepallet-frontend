import { List } from "../types/list";
import { Item } from "../types/item";
import { clamp } from "lodash";

type State = {
  list: List | null;
};

export enum ActionType {
  SetList,
  AddItem,
  RemoveItem,
  MoveItem,
  UpdateItemField,
}

export type Action =
  | { type: ActionType.SetList; payload: List }
  | { type: ActionType.AddItem; payload: Item }
  | { type: ActionType.RemoveItem; payload: Item['_id'] }
  | { type: ActionType.MoveItem; payload: { itemId: string; shift: number } }
  | {
      type: ActionType.UpdateItemField;
      payload: { itemId: string; fieldId: string; value: any };
    };

export const initialState: State = {
  list: null,
};

const listReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ActionType.SetList:
      return {
        ...state,
        list: action.payload,
      };
    case ActionType.AddItem:
      if (state.list) {
        return {
          ...state,
          list: {
            ...state.list,
            items: [...state.list.items, action.payload],
          },
        };
      }
      return state;
    case ActionType.RemoveItem:
      if (state.list) {
        return {
          ...state,
          list: {
            ...state.list,
            items: state.list.items.filter(
              (item) => item._id !== action.payload
            ),
          },
        };
      }
      return state;
    case ActionType.MoveItem:
      if (state.list) {
        const { itemId, shift } = action.payload;
        const currentIndex = state.list.items.findIndex(
          (item) => item._id === itemId
        );
        const maxIndex = state.list.items.length - 1;
        const position = clamp(currentIndex + shift, 0, maxIndex);
        const updatedList = { ...state.list };
        const item = updatedList.items.splice(currentIndex, 1).pop();
        if (item) {
          updatedList.items.splice(position, 0, item);
        }
        return {
          ...state,
          list: updatedList,
        };
      }
      return state;
    case ActionType.UpdateItemField:
      if (state.list) {
        const { itemId, fieldId, value } = action.payload;
        const updatedList = { ...state.list };
        const itemIndex = updatedList.items.findIndex(
          (item) => item._id === itemId
        );
        const item = { ...updatedList.items[itemIndex] };
        item[fieldId] = value;
        updatedList.items[itemIndex] = item;
        return {
          ...state,
          list: updatedList,
        };
      }
      return state;
    default:
      return state;
  }
};

export default listReducer;
