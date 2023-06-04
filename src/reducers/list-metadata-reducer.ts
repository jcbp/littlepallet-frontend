import { useReducer } from "react";
import { ListMetadata } from "../types/list-metadata";
import { Field } from "../types/field";
import { clamp } from "lodash";

export enum ActionType {
  SetListMetadata,
  AddField,
  RemoveField,
  UpdateField,
  MoveField,
}

export type Action =
  | { type: ActionType.SetListMetadata; payload: ListMetadata }
  | { type: ActionType.AddField; payload: Field }
  | { type: ActionType.RemoveField; payload: string }
  | {
      type: ActionType.UpdateField;
      payload: { fieldId: string; updates: Partial<Field> };
    }
  | {
      type: ActionType.MoveField;
      payload: { fieldId: string; position: number };
    };

export type ListMetadataStore = {
  listMetadata: ListMetadata | null;
};

const reducer = (
  state: ListMetadataStore,
  action: Action
): ListMetadataStore => {
  switch (action.type) {
    case ActionType.SetListMetadata:
      return {
        ...state,
        listMetadata: action.payload,
      };
    case ActionType.AddField:
      if (state.listMetadata) {
        return {
          ...state,
          listMetadata: {
            ...state.listMetadata,
            fields: [...state.listMetadata.fields, action.payload],
          },
        };
      }
      return state;
    case ActionType.RemoveField:
      if (state.listMetadata) {
        const updatedFields = state.listMetadata.fields.filter(
          (field) => field._id !== action.payload
        );
        return {
          ...state,
          listMetadata: {
            ...state.listMetadata,
            fields: updatedFields,
          },
        };
      }
      return state;
    case ActionType.UpdateField:
      if (state.listMetadata) {
        const { fieldId, updates } = action.payload;
        const updatedFields = state.listMetadata.fields.map((field) => {
          if (field._id === fieldId) {
            return {
              ...field,
              ...updates,
            };
          }
          return field;
        });
        return {
          ...state,
          listMetadata: {
            ...state.listMetadata,
            fields: updatedFields,
          },
        };
      }
      return state;
    case ActionType.MoveField:
      if (state.listMetadata) {
        const { fieldId, position } = action.payload;
        const currentIndex = state.listMetadata.fields.findIndex(
          (field) => field._id === fieldId
        );
        const updatedFields = [...state.listMetadata.fields];
        const field = updatedFields.splice(currentIndex, 1).pop();
        if (field) {
          updatedFields.splice(position, 0, field);
        }
        return {
          ...state,
          listMetadata: {
            ...state.listMetadata,
            fields: updatedFields,
          },
        };
      }
      return state;
    default:
      return state;
  }
};

export const useListMetadataReducer = () => {
  const initialState: ListMetadataStore = {
    listMetadata: null,
  };

  return useReducer(reducer, initialState);
};
