import React, { ReactNode, createContext, useState } from "react";
import { ListSummary } from "../types/list-summary";

interface ListsContextValue {
  lists: ListSummary[];
  setLists: (lists: ListSummary[]) => void;
}

export const ListsContext = createContext<ListsContextValue>({
  lists: [],
  setLists: () => {},
});

interface Props {
  children?: ReactNode;
}

const ListsProvider: React.FC<Props> = ({ children }) => {
  const [lists, setLists] = useState<ListSummary[]>([]);

  return (
    <ListsContext.Provider value={{ lists, setLists }}>
      {children}
    </ListsContext.Provider>
  );
};

export default ListsProvider;
