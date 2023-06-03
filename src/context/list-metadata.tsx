import React, { ReactNode, createContext, useState } from "react";
import { ListMetadata } from "../types/list-metadata";

interface ListMetadataContextValue {
  listMetadata: ListMetadata | null;
  setListMetadata: (listMetadata: ListMetadata) => void;
}

export const ListMetadataContext = createContext<ListMetadataContextValue>({
  listMetadata: null,
  setListMetadata: () => {},
});

interface Props {
  children?: ReactNode;
}

const ListMetadataProvider: React.FC<Props> = ({ children }) => {
  const [listMetadata, setListMetadata] = useState<ListMetadata | null>(null);

  return (
    <ListMetadataContext.Provider value={{ listMetadata, setListMetadata }}>
      {children}
    </ListMetadataContext.Provider>
  );
};

export default ListMetadataProvider;
