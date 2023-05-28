import React, { ReactNode, createContext, useState } from "react";
import { List } from "../types/list";

interface ListsContextValue {
  lists: Record<string, List>;
  updateList: (listId: string, newList: List) => void;
  getList: (listId: string) => List | null;
}

export const ListContext = createContext<ListsContextValue>({
  lists: {},
  updateList: () => {},
  getList: () => null,
});

interface Props {
  children?: ReactNode;
}

const ListProvider: React.FC<Props> = ({ children }) => {
  const [lists, setLists] = useState<Record<string, List>>({});

  const updateList = (listId: string, newList: List) => {
    setLists((prevState) => ({
      ...prevState,
      [listId]: newList,
    }));
  };

  const getList = (listId: string) => {
    return lists[listId] || null;
  };

  return (
    <ListContext.Provider value={{ lists, updateList, getList }}>
      {children}
    </ListContext.Provider>
  );
};

export default ListProvider;
