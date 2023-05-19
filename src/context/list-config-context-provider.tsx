import React, { ReactNode, createContext, useState } from "react";
import { ListConfig } from "../types/list-config";

interface ListConfigContextValue {
  listConfig: ListConfig | null;
  setListConfig: (listConfig: ListConfig) => void;
}

export const ListConfigContext = createContext<ListConfigContextValue>({
  listConfig: null,
  setListConfig: () => {},
});

interface Props {
  children?: ReactNode;
}

const ListConfigProvider: React.FC<Props> = ({ children }) => {
  const [listConfig, setListConfig] = useState<ListConfig | null>(null);

  return (
    <ListConfigContext.Provider value={{ listConfig, setListConfig }}>
      {children}
    </ListConfigContext.Provider>
  );
};

export default ListConfigProvider;
